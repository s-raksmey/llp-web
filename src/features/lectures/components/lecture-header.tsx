import Link from 'next/link'

type LectureHeaderProps = {
  title: string
}

export function LectureHeader({ title }: LectureHeaderProps) {
  return (
    <>
      <Link className="back-link" href="/">
        {'<-'} Exit to Dashboard
      </Link>

      <h1>{title}</h1>

      <div className="lecture-divider" />
    </>
  )
}
