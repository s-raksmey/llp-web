'use client'

import { useMemo, useState } from 'react'
import { CourseCard } from '@/features/courses/components/course-card'
import { courses } from '@/features/courses/data/courses'

export function CourseListSection() {
  const [search, setSearch] = useState('')

  const filteredCourses = useMemo(() => {
    const query = search.trim().toLowerCase()

    if (!query) {
      return courses
    }

    return courses.filter((course) => {
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
  }, [search])

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
            {filteredCourses.length}/{courses.length}
          </p>
        </div>
      </div>

      <div className="course-grid">
        {filteredCourses.map((course) => (
          <CourseCard key={course.title} course={course} />
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
