import { createFileRoute, Link } from '@tanstack/react-router'
import { useProjects, PROJECT_CATEGORY_MAP } from '../hooks/useProjects'
import type { Project } from '../hooks/useProjects'

const PLACEHOLDER_IMG = 'https://placehold.co/400x300/f5f5f4/a8a29e?text=No+Image'

export const Route = createFileRoute('/cong-trinh-da-thi-cong')({
  validateSearch: (search: Record<string, unknown>) => ({
    categoryId: typeof search.categoryId === 'string' ? search.categoryId : undefined,
    categoryName: typeof search.categoryName === 'string' ? search.categoryName : undefined,
  }),
  component: ProjectsPage,
})

function ProjectCard({ project }: { project: Project }) {
  const imgUrl = project.images[0]?.imgUrl ?? PLACEHOLDER_IMG

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-amber-200/60 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <img
          src={imgUrl}
          alt={project.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <span className="absolute left-3 top-3 rounded-full bg-amber-600/90 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
          {project.projectCategory.name}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 text-base font-semibold text-slate-900">{project.name}</h3>
        <div className="mt-auto flex gap-2 pt-4">
          <a
            href="tel:0900123456"
            className="flex-1 rounded-lg bg-amber-600 px-3 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-amber-700"
          >
            Liên hệ
          </a>
          <Link
            to="/cong-trinh-da-thi-cong"
            search={{ categoryId: project.projectCategory.id, categoryName: project.projectCategory.name }}
            className="flex-1 rounded-lg border border-amber-600 px-3 py-2.5 text-center text-sm font-medium text-amber-700 transition-colors hover:bg-amber-50"
          >
            Xem chi tiết
          </Link>
        </div>
      </div>
    </article>
  )
}

function ProjectsPage() {
  const { categoryId, categoryName } = Route.useSearch()
  const { data: projects, isLoading, isError, error } = useProjects(categoryId)

  const categoryEntries = Object.entries(PROJECT_CATEGORY_MAP)

  return (
    <section className="space-y-6">
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Công trình đã thi công</h2>
        <p className="mt-1 text-sm text-slate-500">
          {categoryName ? `Phân loại: ${categoryName}` : 'Tất cả công trình'}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            to="/cong-trinh-da-thi-cong"
            search={{ categoryId: undefined, categoryName: undefined }}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              !categoryId
                ? 'border-amber-600 bg-amber-600 text-white'
                : 'border-amber-200 bg-white text-amber-800 hover:bg-amber-50'
            }`}
          >
            Tất cả
          </Link>
          {categoryEntries.map(([name, id]) => (
            <Link
              key={id}
              to="/cong-trinh-da-thi-cong"
              search={{ categoryId: id, categoryName: name }}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                categoryId === id
                  ? 'border-amber-600 bg-amber-600 text-white'
                  : 'border-amber-200 bg-white text-amber-800 hover:bg-amber-50'
              }`}
            >
              {name}
            </Link>
          ))}
        </div>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-amber-200 border-t-amber-600" />
        </div>
      )}

      {isError && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="text-sm text-red-700">Không thể tải công trình. Vui lòng thử lại sau.</p>
          <p className="mt-1 text-xs text-red-500">{error?.message}</p>
        </div>
      )}

      {projects && projects.length === 0 && (
        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
          <p className="text-slate-500">Không có công trình nào trong danh mục này.</p>
        </div>
      )}

      {projects && projects.length > 0 && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </section>
  )
}
