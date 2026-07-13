import { LectureEditor } from '@/features/lectures/components/lecture-editor'
import { LectureFooter } from '@/features/lectures/components/lecture-footer'
import { LectureHeader } from '@/features/lectures/components/lecture-header'
import { LectureToc } from '@/features/lectures/components/lecture-toc'
import { notFound } from 'next/navigation'
import {
  getCourseBySlug,
  getCourses,
  getNextCourse,
} from '@/features/courses/data/courses'
import { getLectureContent } from '@/features/courses/utils/lecture'

export async function generateStaticParams() {
  const courses = await getCourses()

  return courses.map((course) => ({
    slug: course.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const course = await getCourseBySlug(slug)

  if (!course) {
    return {
      title: 'Course not found',
    }
  }

  return {
    title: `${course.title} | Core.Edu`,
    description: course.description,
  }
}

export default async function CourseLecturePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const course = await getCourseBySlug(slug)

  if (!course) {
    notFound()
  }

  const nextCourse = await getNextCourse(course.slug)
  const lectureContent = getLectureContent(course)

  return (
    <main className="lecture-shell">
      <LectureToc sections={course.sections} />

      <article className="lecture-content">
        <LectureHeader title={course.lectureTitle} />
        <LectureEditor content={lectureContent} />
        <LectureFooter module={course.module} nextCourse={nextCourse} />
      </article>
    </main>
  )
}
