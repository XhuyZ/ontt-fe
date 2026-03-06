import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { useProjects, PROJECT_CATEGORY_MAP } from '../hooks/useProjects'
import { Lightbox } from '../components/Lightbox'
import type { Project } from '../hooks/useProjects'

const PLACEHOLDER_IMG = 'https://placehold.co/400x300/f5f5f4/a8a29e?text=No+Image'

export const Route = createFileRoute('/cong-trinh-da-thi-cong')({
  validateSearch: (search: Record<string, unknown>) => ({
    categoryId: typeof search.categoryId === 'string' ? search.categoryId : undefined,
    categoryName: typeof search.categoryName === 'string' ? search.categoryName : undefined,
  }),
  component: ProjectsPage,
})

function SkeletonCard() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/60 bg-white">
      <div className="skeleton aspect-[4/3] w-full" />
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <div className="skeleton h-4 w-3/4 rounded" />
        <div className="skeleton mt-2 h-3 w-1/2 rounded" />
        <div className="mt-auto flex gap-2 pt-3 sm:pt-4">
          <div className="skeleton h-8 flex-1 rounded-lg sm:h-10" />
          <div className="skeleton h-8 flex-1 rounded-lg sm:h-10" />
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ project, index, onViewImage }: { project: Project; index: number; onViewImage: (src: string, alt: string) => void }) {
  const imgUrl = project.images[0]?.imgUrl ?? PLACEHOLDER_IMG

  return (
    <article
      className="animate-card-in group flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <button
        type="button"
        className="relative aspect-[4/3] w-full cursor-zoom-in overflow-hidden bg-slate-100"
        onClick={() => onViewImage(imgUrl, project.name)}
      >
        <img
          src={imgUrl}
          alt={project.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <span className="absolute left-2 top-2 rounded-full bg-stone-600 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur-sm sm:left-3 sm:top-3 sm:px-3 sm:py-1">
          {project.projectCategory.name}
        </span>
      </button>
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <h3 className="line-clamp-2 text-sm font-semibold text-slate-900 sm:text-base">{project.name}</h3>
        <div className="mt-auto flex gap-2 pt-3 sm:pt-4">
          <a
            href="tel:0347916199"
            className="flex-1 rounded-lg bg-stone-600 px-2 py-2 text-center text-xs font-medium text-white transition-colors hover:bg-stone-700 sm:px-3 sm:py-2.5 sm:text-sm"
          >
            Liên hệ
          </a>
          <button
            type="button"
            onClick={() => onViewImage(imgUrl, project.name)}
            className="flex-1 rounded-lg border border-stone-500 px-2 py-2 text-center text-xs font-medium text-stone-700 transition-colors hover:bg-stone-50 sm:px-3 sm:py-2.5 sm:text-sm"
          >
            Xem chi tiết
          </button>
        </div>
      </div>
    </article>
  )
}

function ProjectsPage() {
  const { categoryId, categoryName } = Route.useSearch()
  const { data: projects, isLoading, isError, error } = useProjects(categoryId)
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)

  const categoryEntries = Object.entries(PROJECT_CATEGORY_MAP)

  return (
    <section className="space-y-4 sm:space-y-6">
      <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
        <h2 className="text-xl font-bold text-slate-900 sm:text-2xl md:text-3xl">Công trình đã thi công</h2>
        <p className="mt-1 text-xs text-slate-500 sm:text-sm">
          {categoryName ? `Phân loại: ${categoryName}` : 'Tất cả công trình'}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-4 sm:gap-2">
          <Link
            to="/cong-trinh-da-thi-cong"
            search={{ categoryId: undefined, categoryName: undefined }}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors sm:px-4 sm:py-1.5 sm:text-sm ${
              !categoryId
                ? 'border-stone-600 bg-stone-600 text-white'
                : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
            }`}
          >
            Tất cả
          </Link>
          {categoryEntries.map(([name, id]) => (
            <Link
              key={id}
              to="/cong-trinh-da-thi-cong"
              search={{ categoryId: id, categoryName: name }}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors sm:px-4 sm:py-1.5 sm:text-sm ${
                categoryId === id
                  ? 'border-stone-600 bg-stone-600 text-white'
                  : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
              }`}
            >
              {name}
            </Link>
          ))}
        </div>
      </div>

      {isLoading && (
        <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {isError && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-center sm:p-6">
          <p className="text-xs text-red-700 sm:text-sm">Không thể tải công trình. Vui lòng thử lại sau.</p>
          <p className="mt-1 text-xs text-red-500">{error?.message}</p>
        </div>
      )}

      {projects && projects.length === 0 && (
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm sm:p-10">
          <p className="text-sm text-slate-500">Không có công trình nào trong danh mục này.</p>
        </div>
      )}

      {projects && projects.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onViewImage={(src, alt) => setLightbox({ src, alt })}
            />
          ))}
        </div>
      )}

      {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />}
    </section>
  )
}
