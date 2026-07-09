# Project Structure

This repo is the public student website for the Lecture Learning Platform.

```text
src/
  app/                  Next.js routes, layouts, loading, and error files
  components/
    layout/             Shared layout components
    ui/                 Reusable UI primitives
  config/               App-level configuration
  constants/            Shared constants
  features/
    courses/            Course listing and detail feature code
    lectures/           Lecture detail and lecture navigation feature code
    search/             Public search feature code
  lib/
    apollo/             Apollo Client setup and GraphQL helpers
    format/             Date, number, and text formatting helpers
    seo/                Metadata and SEO helpers
  styles/               Shared style helpers when global CSS is not enough
  types/                Shared TypeScript types
```

Feature folders can own their local components, GraphQL documents, hooks, and types. Keep
route files thin by composing feature code from `src/features`.
