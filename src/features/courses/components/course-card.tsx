import Link from 'next/link'
import type { CSSProperties } from 'react'
import type { Course } from '@/features/courses/data/courses'

type CourseCardProps = {
  course: Course
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Link className="course-card" href={`/courses/${course.slug}`}>
      <div className="course-card-top">
        <span
          className="course-dot"
          style={{ '--course-accent': course.accent } as CSSProperties}
        />
        <span>{course.category}</span>
      </div>

      <h3>{course.title}</h3>
      <p>{course.description}</p>

      <div className="course-meta">
        <span>{course.module}</span>
        <strong>View course {'->'}</strong>
      </div>
    </Link>
  )
}
