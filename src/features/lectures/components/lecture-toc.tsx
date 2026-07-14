import type { LectureSection } from '@/features/courses/data/courses'
import { getChildSectionId, getSectionId } from '@/features/courses/utils/lecture'

type LectureTocProps = {
  sections: LectureSection[]
}

export function LectureToc({ sections }: LectureTocProps) {
  return (
    <aside className="lecture-toc" aria-label="Lecture contents">
      <p>On this page</p>

      <ol>
        {sections.map((section, index) => (
          <li key={`${section.title}-${index}`}>
            <a href={`#${getSectionId(section.title, index)}`}>
              {index + 1}. {section.title}
            </a>

            {section.children?.length ? (
              <ol>
                {section.children.map((child, childIndex) => (
                  <li key={`${child.title}-${index}-${childIndex}`}>
                    <a href={`#${getChildSectionId(index, child.title, childIndex)}`}>
                      {index + 1}.{childIndex + 1} {child.title}
                    </a>
                  </li>
                ))}
              </ol>
            ) : null}
          </li>
        ))}
      </ol>
    </aside>
  )
}
