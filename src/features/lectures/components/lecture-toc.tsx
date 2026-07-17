'use client'

import { useState } from 'react'
import type { LectureSection } from '@/features/courses/data/courses'
import { getChildSectionId, getSectionId } from '@/features/courses/utils/lecture'

type LectureTocProps = {
  sections: LectureSection[]
}

export function LectureToc({ sections }: LectureTocProps) {
  const [isOpen, setIsOpen] = useState(false)

  function closeMenu() {
    setIsOpen(false)
  }

  return (
    <aside className="lecture-toc" aria-label="Lecture contents">
      <button
        aria-controls="lecture-contents-menu"
        aria-expanded={isOpen}
        className="lecture-toc-toggle"
        onClick={() => setIsOpen((current) => !current)}
        type="button"
      >
        <span className="lecture-toc-toggle-icon" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span>
          <strong>On this page</strong>
          <small>Browse titles and subtitles</small>
        </span>
        <span className="lecture-toc-chevron" aria-hidden="true" />
      </button>

      <div
        className={`lecture-toc-menu ${isOpen ? 'is-open' : ''}`}
        id="lecture-contents-menu"
      >
        <p>On this page</p>

        <ol>
          {sections.map((section, index) => (
            <li key={`${section.title}-${index}`}>
              <a
                href={`#${getSectionId(section.title, index)}`}
                onClick={closeMenu}
              >
                {index + 1}. {section.title}
              </a>

              {section.children?.length ? (
                <ol>
                  {section.children.map((child, childIndex) => (
                    <li key={`${child.title}-${index}-${childIndex}`}>
                      <a
                        href={`#${getChildSectionId(index, child.title, childIndex)}`}
                        onClick={closeMenu}
                      >
                        {index + 1}.{childIndex + 1} {child.title}
                      </a>
                    </li>
                  ))}
                </ol>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </aside>
  )
}
