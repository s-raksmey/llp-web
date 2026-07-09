import type { JSONContent } from '@tiptap/react'
import type { Course } from '@/features/courses/data/courses'

export function getSectionId(title: string) {
  return title.toLowerCase().replaceAll(' ', '-')
}

export function getLectureContent(course: Course) {
  return {
    type: 'doc',
    content: course.sections.flatMap((section) => [
      {
        type: 'heading',
        attrs: {
          level: 2,
          id: getSectionId(section.title),
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
