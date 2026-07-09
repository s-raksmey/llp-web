import Link from 'next/link'
import type { Course } from '@/features/courses/data/courses'

type LectureFooterProps = {
  module: string
  nextCourse?: Course
}

export function LectureFooter({ module, nextCourse }: LectureFooterProps) {
  return (
    <footer className="lecture-footer">
      <span>End of {module}</span>

      {nextCourse ? (
        <Link className="next-link" href={`/courses/${nextCourse.slug}`}>
          Next Module {'->'}
        </Link>
      ) : null}
    </footer>
  )
}
