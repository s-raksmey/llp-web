import type { JSONContent } from '@tiptap/react'
import { graphqlRequest } from '@/lib/graphql-client'

export type LectureSection = {
  title: string
  body: string
  content?: JSONContent | null
  children?: LectureSection[]
}

export type Course = {
  slug: string
  title: string
  category: string
  module: string
  accent: string
  description: string
  lectureTitle: string
  sections: LectureSection[]
}

type ApiLectureContent = {
  content: unknown
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
}

type ApiLectureSummary = {
  title: string
  slug: string
  description: string | null
  category: { name: string } | null
}

type ApiLectureDetail = ApiLectureSummary & {
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
  outlineItems: Array<{
    id: string
    parentId: string | null
    title: string
    sortOrder: number
    content: ApiLectureContent | null
  }>
}

type PublishedLecturesQuery = {
  lectures: ApiLectureSummary[]
}

export const courses: Course[] = []

const publicLectureListFields = `
  title
  slug
  description
  category {
    name
  }
`

const publicLectureDetailFields = `
  ${publicLectureListFields}
  status
  outlineItems {
    id
    parentId
    title
    sortOrder
    content {
      content
      status
    }
  }
`

export async function getCourses() {
  const data = await graphqlRequest<PublishedLecturesQuery>(`
    query PublicCourses {
      lectures(status: PUBLISHED) {
        ${publicLectureListFields}
      }
    }
  `)

  return data.lectures.map(toCourseSummary)
}

type PublicLectureQuery = {
  lecture: ApiLectureDetail | null
}

export async function getCourseBySlug(slug: string) {
  const data = await graphqlRequest<PublicLectureQuery>(
    `
      query PublicCourse($slug: String!) {
        lecture(slug: $slug) {
          ${publicLectureDetailFields}
        }
      }
    `,
    { slug },
  )

  if (!data.lecture || data.lecture.status !== 'PUBLISHED') {
    return undefined
  }

  return toCourseDetail(data.lecture)
}

export async function getNextCourse(slug: string) {
  const items = await getCourses()
  const currentIndex = items.findIndex((course) => course.slug === slug)

  if (currentIndex === -1) {
    return undefined
  }

  return items[currentIndex + 1] ?? items[0]
}

function toCourseSummary(lecture: ApiLectureSummary, index = 0): Course {
  const category = lecture.category?.name ?? 'Lecture'

  return {
    slug: lecture.slug,
    title: lecture.title,
    category,
    module: `Module ${index + 1}`,
    accent: accentForCategory(category),
    description: lecture.description ?? 'Published lecture from the learning platform.',
    lectureTitle: lecture.title,
    sections: [],
  }
}

function toCourseDetail(lecture: ApiLectureDetail, index = 0): Course {
  const course = toCourseSummary(lecture, index)
  const sections = toPublishedSections(lecture)

  return {
    ...course,
    sections: sections.length
      ? sections
      : [
          {
            title: lecture.title,
            body: 'This lecture does not have published section content yet.',
            content: null,
          },
        ],
  }
}

function toPublishedSections(lecture: ApiLectureDetail): LectureSection[] {
  const publishedItems = [...lecture.outlineItems]
    .sort((first, second) => first.sortOrder - second.sortOrder)
    .filter((item) => item.content?.status === 'PUBLISHED')

  return publishedItems
    .filter((item) => !item.parentId)
    .map((item) => ({
      title: item.title,
      body: lecture.description ?? '',
      content: toJsonContent(item.content?.content),
      children: publishedItems
        .filter((child) => child.parentId === item.id)
        .map((child) => ({
          title: child.title,
          body: lecture.description ?? '',
          content: toJsonContent(child.content?.content),
        })),
    }))
}

function toJsonContent(value: unknown): JSONContent | null {
  if (
    value &&
    typeof value === 'object' &&
    'type' in value &&
    typeof (value as { type?: unknown }).type === 'string'
  ) {
    return value as JSONContent
  }

  return null
}

function accentForCategory(category: string) {
  const palette = ['#18d6a3', '#9b5cff', '#3b82f6', '#06b6d4', '#f59e0b']
  const total = Array.from(category).reduce(
    (sum, character) => sum + character.charCodeAt(0),
    0,
  )

  return palette[total % palette.length]
}
