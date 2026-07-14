import { graphqlRequest } from '@/lib/graphql-client'

export type LectureSection = {
  title: string
  body: string
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

type ApiLecture = {
  title: string
  slug: string
  description: string | null
  category: { name: string } | null
  outlineItems: Array<{
    title: string
    sortOrder: number
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
  category {
    name
  }
  outlineItems {
    title
    sortOrder
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

  return data.lecture ? toCourse(data.lecture) : undefined
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
  const sections = lecture.outlineItems.length
    ? [...lecture.outlineItems]
        .sort((first, second) => first.sortOrder - second.sortOrder)
        .map((item) => ({
          title: item.title,
          body: lecture.description ?? 'Lecture section content is managed in the admin dashboard.',
        }))
    : [
        {
          title: lecture.title,
          body: lecture.description ?? 'Lecture content is managed in the admin dashboard.',
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

function accentForCategory(category: string) {
  const palette = ['#18d6a3', '#9b5cff', '#3b82f6', '#06b6d4', '#f59e0b']
  const total = Array.from(category).reduce(
    (sum, character) => sum + character.charCodeAt(0),
    0,
  )

  return palette[total % palette.length]
}
