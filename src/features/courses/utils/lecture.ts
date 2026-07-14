import type { JSONContent } from '@tiptap/react'
import type { Course } from '@/features/courses/data/courses'

export function getSectionId(title: string, index?: number) {
  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  const baseId = slug || 'section'

  return index === undefined ? baseId : `${baseId}-${index + 1}`
}

export function getLectureContent(course: Course) {
  return {
    type: 'doc',
    content: course.sections.flatMap((section, index) => [
      {
        type: 'heading',
        attrs: {
          level: 2,
          id: getSectionId(section.title, index),
        },
        content: [
          {
            type: 'text',
            text: section.title,
          },
        ],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: section.body,
          },
        ],
      },
    ]),
  } satisfies JSONContent
}
