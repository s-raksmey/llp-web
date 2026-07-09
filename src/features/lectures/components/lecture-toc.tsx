import type { LectureSection } from '@/features/courses/data/courses'
import { getSectionId } from '@/features/courses/utils/lecture'

type LectureTocProps = {
  sections: LectureSection[]
}

export function LectureToc({ sections }: LectureTocProps) {
  return (
    <aside className="lecture-toc" aria-label="Lecture contents">
      <p>On this page</p>

      <ol>
        {sections.map((section, index) => (
          <li key={section.title}>
            <a href={`#${getSectionId(section.title)}`}>
              {index + 1}. {section.title}
            </a>
          </li>
        ))}
      </ol>
    </aside>
  )
}
