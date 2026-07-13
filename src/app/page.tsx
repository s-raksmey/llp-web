import { CourseListSection } from '@/features/courses/components/course-list-section'
import { getCourses } from '@/features/courses/data/courses'

export default async function HomePage() {
  const courses = await getCourses()

  return (
    <main>
      <CourseListSection initialCourses={courses} />
    </main>
  )
}
