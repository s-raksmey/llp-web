'use client'

import { useMemo, useState } from 'react'
import { CourseCard } from '@/features/courses/components/course-card'
import type { Course } from '@/features/courses/data/courses'

type CourseListSectionProps = {
  initialCourses: Course[]
}

export function CourseListSection({ initialCourses }: CourseListSectionProps) {
  const [search, setSearch] = useState('')

  const filteredCourses = useMemo(() => {
    const query = search.trim().toLowerCase()

    if (!query) {
      return initialCourses
    }

    return initialCourses.filter((course) => {
      const searchableText = [
        course.title,
        course.category,
        course.module,
        course.description,
      ]
        .join(' ')
        .toLowerCase()

      return searchableText.includes(query)
    })
  }, [initialCourses, search])

  return (
    <section className="courses-section">
      <div className="section-header" id="courses">
        <div>
          <h1>Active Curriculum Directory</h1>
          <p>Streamlined tracks optimized for sequential self-paced reading.</p>
        </div>

        <div className="course-toolbar">
          <label className="search-field">
            <span>Search courses</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by title or topic"
            />
          </label>

          <p className="course-count">
            {filteredCourses.length}/{initialCourses.length}
          </p>
        </div>
      </div>

      <div className="course-grid">
        {filteredCourses.map((course) => (
          <CourseCard key={course.slug} course={course} />
        ))}
      </div>

      {filteredCourses.length === 0 ? (
        <div className="empty-state">
          <h3>No courses found</h3>
          <p>Try searching for another title, category, or skill level.</p>
        </div>
      ) : null}
    </section>
  )
}
