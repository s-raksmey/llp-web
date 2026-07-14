import type { JSONContent } from '@tiptap/react'
import { graphqlRequest } from '@/lib/graphql-client'

export type LectureSection = {
  title: string
  body: string
  content?: JSONContent | null
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

type ApiLecture = {
  title: string
  slug: string
  description: string | null
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
  category: { name: string } | null
  outlineItems: Array<{
    title: string
    sortOrder: number
    content: ApiLectureContent | null
  }>
}

type PublishedLecturesQuery = {
  lectures: ApiLecture[]
}

export const courses: Course[] = []

const publicLectureFields = `
  title
  slug
  description
  status
  category {
    name
  }
  outlineItems {
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
        ${publicLectureFields}
      }
    }
  `)

  return data.lectures.map(toCourse)
}

type PublicLectureQuery = {
  lecture: ApiLecture | null
}

export async function getCourseBySlug(slug: string) {
  const data = await graphqlRequest<PublicLectureQuery>(
    `
      query PublicCourse($slug: String!) {
        lecture(slug: $slug) {
          ${publicLectureFields}
        }
      }
    `,
    { slug },
  )

  if (!data.lecture || data.lecture.status !== 'PUBLISHED') {
    return undefined
  }

  return toCourse(data.lecture)
}

export async function getNextCourse(slug: string) {
  const items = await getCourses()
  const currentIndex = items.findIndex((course) => course.slug === slug)

  if (currentIndex === -1) {
    return undefined
  }

  return items[currentIndex + 1] ?? items[0]
}

function toCourse(lecture: ApiLecture, index = 0): Course {
  const category = lecture.category?.name ?? 'Lecture'
  const publishedSections = [...lecture.outlineItems]
    .sort((first, second) => first.sortOrder - second.sortOrder)
    .filter((item) => item.content?.status === 'PUBLISHED')
    .map((item) => ({
      title: item.title,
      body: lecture.description ?? '',
      content: toJsonContent(item.content?.content),
    }))

  const sections = publishedSections.length
    ? publishedSections
    : [
        {
          title: lecture.title,
          body: 'This lecture does not have published section content yet.',
          content: null,
        },
      ]

  return {
    slug: lecture.slug,
    title: lecture.title,
    category,
    module: `Module ${index + 1}`,
    accent: accentForCategory(category),
    description: lecture.description ?? 'Published lecture from the learning platform.',
    lectureTitle: lecture.title,
    sections,
  }
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
