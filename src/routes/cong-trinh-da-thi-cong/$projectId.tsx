import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useRef, useCallback } from 'react'
import { useProject, useProjects } from '../../hooks/useProjects'
import { Lightbox } from '../../components/Lightbox'
import type { Project } from '../../hooks/useProjects'

const PLACEHOLDER_IMG = 'https://placehold.co/400x300/f5f5f4/a8a29e?text=No+Image'

function useSlider() {
  const ref = useRef<HTMLDivElement>(null)
  const scroll = useCallback((dir: 'left' | 'right') => {
    if (!ref.current) return
    const amount = ref.current.clientWidth * 0.75
    ref.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' })
  }, [])
  return { ref, scroll }
}

function SliderArrow({ dir, onClick }: { dir: 'left' | 'right'; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute top-1/2 z-10 -translate-y-1/2 rounded-full border border-stone-200 bg-white/90 p-2 shadow-md backdrop-blur transition-all hover:bg-stone-50 active:scale-90 sm:p-2.5"
      style={{ [dir === 'left' ? 'left' : 'right']: '0.25rem' }}
      aria-label={dir === 'left' ? 'Trước' : 'Sau'}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-4 w-4 text-stone-700 sm:h-5 sm:w-5">
        {dir === 'left' ? (
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        )}
      </svg>
    </button>
  )
}

export const Route = createFileRoute('/cong-trinh-da-thi-cong/$projectId')({
  component: ProjectDetailPage,
})

function ProjectCard({ project }: { project: Project }) {
  const imgUrl = project.images[0]?.imgUrl ?? PLACEHOLDER_IMG
  return (
    <article className="group flex h-full w-44 flex-shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm transition-shadow hover:shadow-lg sm:w-56 md:w-64">
      <Link to="/cong-trinh-da-thi-cong/$projectId" params={{ projectId: project.id }}>
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
          <img
            src={imgUrl}
            alt={project.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <span className="absolute left-2 top-2 rounded-full bg-stone-600 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
            {project.projectCategory.name}
          </span>
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <Link to="/cong-trinh-da-thi-cong/$projectId" params={{ projectId: project.id }}>
          <h3 className="line-clamp-2 text-xs font-semibold text-slate-900 hover:text-stone-600 sm:text-sm">
            {project.name}
          </h3>
        </Link>
        <div className="mt-auto flex gap-1.5 pt-2.5 sm:gap-2 sm:pt-3">
          <a
            href="tel:0347916199"
            className="flex-1 rounded-lg bg-stone-600 py-1.5 text-center text-[10px] font-medium text-white transition-colors hover:bg-stone-700 sm:py-2 sm:text-xs"
          >
            Liên hệ
          </a>
          <Link
            to="/cong-trinh-da-thi-cong/$projectId"
            params={{ projectId: project.id }}
            className="flex-1 rounded-lg border border-stone-500 py-1.5 text-center text-[10px] font-medium text-stone-700 transition-colors hover:bg-stone-50 sm:py-2 sm:text-xs"
          >
            Xem chi tiết
          </Link>
        </div>
      </div>
    </article>
  )
}

function ProjectDetailPage() {
  const { projectId } = Route.useParams()
  const { data: project, isLoading, isError } = useProject(projectId)
  const categoryId = project?.projectCategory?.id
  const { data: relatedProjects } = useProjects(categoryId)
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)
  const [selectedImgIdx, setSelectedImgIdx] = useState(0)

  const images = project?.images ?? []
  const displayedImages = images.length > 0 ? images : [{ imgUrl: PLACEHOLDER_IMG, id: '0', url: '' }]
  const selectedImg = displayedImages[selectedImgIdx]?.imgUrl ?? PLACEHOLDER_IMG

  const relatedSlider = useSlider()
  const related = (relatedProjects ?? []).filter((p) => p.id !== projectId).slice(0, 6)

  if (isLoading) {
    return (
      <section className="space-y-6 sm:space-y-8">
        <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
          <div className="skeleton h-8 w-48 rounded" />
          <div className="mt-4 flex flex-col gap-4 sm:flex-row">
            <div className="skeleton aspect-square w-full rounded-2xl sm:w-80" />
            <div className="flex-1 space-y-3">
              <div className="skeleton h-6 w-3/4 rounded" />
              <div className="skeleton h-10 w-32 rounded-lg" />
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (isError || !project) {
    return (
      <section className="rounded-2xl bg-white p-8 text-center shadow-sm sm:p-12">
        <p className="text-slate-600">Không tìm thấy công trình.</p>
        <Link
          to="/cong-trinh-da-thi-cong"
          search={{ categoryId: undefined, categoryName: undefined }}
          className="mt-4 inline-block rounded-lg bg-stone-600 px-4 py-2 text-sm font-medium text-white hover:bg-stone-700"
        >
          Quay lại danh sách
        </Link>
      </section>
    )
  }

  return (
    <section className="space-y-6 sm:space-y-8">
      {/* Preview + Liên hệ */}
      <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          <div className="flex flex-1 flex-col gap-3">
            <div className="relative aspect-square w-full max-w-lg overflow-hidden rounded-2xl border border-stone-200 bg-slate-50">
              <button
                type="button"
                className="h-full w-full cursor-zoom-in"
                onClick={() => setLightbox({ src: selectedImg, alt: project.name })}
              >
                <img src={selectedImg} alt={project.name} className="h-full w-full object-contain" />
              </button>
            </div>
            {displayedImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {displayedImages.map((img, i) => (
                  <button
                    key={img.id}
                    type="button"
                    onClick={() => setSelectedImgIdx(i)}
                    className={`h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                      i === selectedImgIdx ? 'border-stone-600' : 'border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    <img src={img.imgUrl} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-4 lg:min-w-[200px] lg:pl-6 lg:pr-20">
            <div>
              <span className="rounded-full bg-stone-600 px-3 py-1 text-xs font-medium text-white">
                {project.projectCategory.name}
              </span>
              <h1 className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl">{project.name}</h1>
            </div>
            <a
              href="tel:0347916199"
              className="flex items-center justify-center gap-2 rounded-xl bg-stone-600 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-stone-700"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              Liên hệ: 0347 916 199
            </a>
          </div>
        </div>
      </div>

      {/* Công trình thi công nổi bật khác */}
      {related.length > 0 && (
        <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-800 sm:text-xl">
              Công trình thi công nổi bật khác
            </h2>
            <Link
              to="/cong-trinh-da-thi-cong"
              search={{ categoryId: categoryId ?? undefined, categoryName: project.projectCategory.name }}
              className="text-xs font-medium text-stone-600 transition-colors hover:text-stone-800 sm:text-sm"
            >
              Xem thêm →
            </Link>
          </div>
          <div className="relative mt-4">
            <SliderArrow dir="left" onClick={() => relatedSlider.scroll('left')} />
            <SliderArrow dir="right" onClick={() => relatedSlider.scroll('right')} />
            <div
              ref={relatedSlider.ref}
              className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-1 py-1 sm:gap-4"
            >
              {related.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </div>
        </div>
      )}

      {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />}
    </section>
  )
}
