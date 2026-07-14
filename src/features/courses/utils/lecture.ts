import type { JSONContent } from '@tiptap/react'
import type { Course, LectureSection } from '@/features/courses/data/courses'

export function getSectionId(title: string, index?: number) {
  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  const baseId = slug || 'section'

  return index === undefined ? baseId : `${baseId}-${index + 1}`
}

export function getChildSectionId(parentIndex: number, childTitle: string, childIndex: number) {
  return `${getSectionId(childTitle)}-${parentIndex + 1}-${childIndex + 1}`
}

export function getLectureContent(course: Course) {
  return {
    type: 'doc',
    content: course.sections.flatMap((section, index) => [
      ...getSectionNodes(section, index),
      ...(section.children ?? []).flatMap((child, childIndex) =>
        getChildSectionNodes(child, index, childIndex),
      ),
    ]),
  } satisfies JSONContent
}

function getSectionNodes(section: LectureSection, index: number) {
  return [
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
    ...getSectionContent(section.content, section.body),
  ]
}

function getChildSectionNodes(section: LectureSection, parentIndex: number, childIndex: number) {
  return [
    {
      type: 'heading',
      attrs: {
        level: 3,
        id: getChildSectionId(parentIndex, section.title, childIndex),
      },
      content: [
        {
          type: 'text',
          text: section.title,
        },
      ],
    },
    ...getSectionContent(section.content, section.body),
  ]
}

function getSectionContent(content: JSONContent | null | undefined, fallback: string) {
  if (Array.isArray(content?.content) && content.content.length > 0) {
    return content.content
  }

  return [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: fallback,
        },
      ],
    },
  ]
}
