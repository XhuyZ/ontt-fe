import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useProducts } from '../hooks/useProducts'
import { useProjects } from '../hooks/useProjects'
import type { Product } from '../hooks/useProducts'
import type { Project } from '../hooks/useProjects'

const heroImages = ['/heropic1.jpg', '/heropic2.jpg', '/heropic3.jpg', '/heropic4.jpg']
const PLACEHOLDER_IMG = 'https://placehold.co/400x300/f5f5f4/a8a29e?text=No+Image'

export const Route = createFileRoute('/')({
  component: HomePage,
})

/* ------------------------------------------------------------------ */
/*  Reusable horizontal scroll slider                                  */
/* ------------------------------------------------------------------ */
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
      className="absolute top-1/2 z-10 -translate-y-1/2 rounded-full border border-amber-200 bg-white/90 p-2 shadow-md backdrop-blur transition-colors hover:bg-amber-50 active:scale-95 sm:p-2.5"
      style={{ [dir === 'left' ? 'left' : 'right']: '0.25rem' }}
      aria-label={dir === 'left' ? 'Trước' : 'Sau'}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-4 w-4 text-amber-800 sm:h-5 sm:w-5">
        {dir === 'left' ? (
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        )}
      </svg>
    </button>
  )
}

/* ------------------------------------------------------------------ */
/*  Product card (compact for homepage slider)                         */
/* ------------------------------------------------------------------ */
function ProductCard({ product }: { product: Product }) {
  const imgUrl = product.images[0]?.imgUrl ?? PLACEHOLDER_IMG
  return (
    <article className="w-44 flex-shrink-0 snap-start overflow-hidden rounded-2xl border border-amber-200/60 bg-white shadow-sm transition-shadow hover:shadow-lg sm:w-56 md:w-64">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <img src={imgUrl} alt={product.name} className="h-full w-full object-cover" loading="lazy" />
        <span className="absolute left-2 top-2 rounded-full bg-amber-600/90 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm sm:px-2.5 sm:text-xs">
          {product.category.name}
        </span>
      </div>
      <div className="flex flex-col p-3 sm:p-4">
        <h3 className="line-clamp-2 text-xs font-semibold text-slate-900 sm:text-sm">{product.name}</h3>
        <div className="mt-2.5 flex gap-1.5 sm:mt-3 sm:gap-2">
          <a href="tel:0900123456" className="flex-1 rounded-lg bg-amber-600 py-1.5 text-center text-[10px] font-medium text-white hover:bg-amber-700 sm:py-2 sm:text-xs">
            Mua ngay
          </a>
          <Link
            to="/san-pham"
            search={{ categoryId: product.category.id, categoryName: product.category.name }}
            className="flex-1 rounded-lg border border-amber-600 py-1.5 text-center text-[10px] font-medium text-amber-700 hover:bg-amber-50 sm:py-2 sm:text-xs"
          >
            Chi tiết
          </Link>
        </div>
      </div>
    </article>
  )
}

/* ------------------------------------------------------------------ */
/*  Project card (compact for homepage slider)                         */
/* ------------------------------------------------------------------ */
function ProjectCard({ project }: { project: Project }) {
  const imgUrl = project.images[0]?.imgUrl ?? PLACEHOLDER_IMG
  return (
    <article className="w-44 flex-shrink-0 snap-start overflow-hidden rounded-2xl border border-amber-200/60 bg-white shadow-sm transition-shadow hover:shadow-lg sm:w-56 md:w-64">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <img src={imgUrl} alt={project.name} className="h-full w-full object-cover" loading="lazy" />
        <span className="absolute left-2 top-2 rounded-full bg-amber-600/90 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm sm:px-2.5 sm:text-xs">
          {project.projectCategory.name}
        </span>
      </div>
      <div className="flex flex-col p-3 sm:p-4">
        <h3 className="line-clamp-2 text-xs font-semibold text-slate-900 sm:text-sm">{project.name}</h3>
        <div className="mt-2.5 flex gap-1.5 sm:mt-3 sm:gap-2">
          <a href="tel:0900123456" className="flex-1 rounded-lg bg-amber-600 py-1.5 text-center text-[10px] font-medium text-white hover:bg-amber-700 sm:py-2 sm:text-xs">
            Liên hệ
          </a>
          <Link
            to="/cong-trinh-da-thi-cong"
            search={{ categoryId: project.projectCategory.id, categoryName: project.projectCategory.name }}
            className="flex-1 rounded-lg border border-amber-600 py-1.5 text-center text-[10px] font-medium text-amber-700 hover:bg-amber-50 sm:py-2 sm:text-xs"
          >
            Chi tiết
          </Link>
        </div>
      </div>
    </article>
  )
}

/* ------------------------------------------------------------------ */
/*  Home page                                                          */
/* ------------------------------------------------------------------ */
function HomePage() {
  const [heroIdx, setHeroIdx] = useState(0)
  const productSlider = useSlider()
  const projectSlider = useSlider()

  const { data: products, isLoading: productsLoading } = useProducts()
  const { data: projects, isLoading: projectsLoading } = useProjects()

  useEffect(() => {
    const id = setInterval(() => setHeroIdx((prev) => (prev + 1) % heroImages.length), 4000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="space-y-8 sm:space-y-12">
      {/* ==================== FRAME 1 — HERO ==================== */}
      <section className="relative isolate overflow-hidden rounded-2xl shadow-sm">
        {/* Background slideshow */}
        <div className="absolute inset-0 -z-10">
          {heroImages.map((src, i) => (
            <img
              key={src}
              src={src}
              alt=""
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${i === heroIdx ? 'opacity-100' : 'opacity-0'}`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-950/80 via-amber-950/60 to-amber-950/30" />
        </div>

        <div className="relative flex min-h-[60vh] flex-col items-start justify-center px-6 py-12 sm:min-h-[65vh] sm:px-10 md:min-h-[70vh] md:px-16">
          <img src="/Logo.png" alt="Logo" className="mb-4 h-14 w-14 object-contain drop-shadow-lg sm:h-16 sm:w-16 md:h-20 md:w-20" />
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-5xl">Ốp Nhựa Tuấn Kiệt</h2>
          <p className="mt-3 max-w-md text-sm text-amber-100/90 sm:text-base md:text-lg">
            Chuyên cung cấp và thi công tấm ốp nhựa cho nhà ở, cửa hàng và công trình.
          </p>
          <div className="mt-4 space-y-1 text-xs text-amber-100/80 sm:text-sm">
            <p>
              <span className="font-semibold text-white">Số điện thoại:</span> 0900 123 456
            </p>
            <p>
              <span className="font-semibold text-white">Email:</span> opnhuatuankiet@example.com
            </p>
          </div>

          <button
            type="button"
            onClick={() => document.getElementById('featured-products')?.scrollIntoView({ behavior: 'smooth' })}
            className="mt-8 flex items-center gap-2 rounded-full bg-amber-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-amber-400 hover:shadow-xl active:scale-95 sm:px-8 sm:py-3 sm:text-base"
          >
            Khám phá
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-4 w-4 animate-bounce sm:h-5 sm:w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dots indicator */}
          <div className="mt-6 flex gap-2">
            {heroImages.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setHeroIdx(i)}
                className={`h-2 rounded-full transition-all duration-300 ${i === heroIdx ? 'w-6 bg-amber-400' : 'w-2 bg-white/50 hover:bg-white/70'}`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FRAME 2 — SẢN PHẨM NỔI BẬT ==================== */}
      <section id="featured-products" className="scroll-mt-20">
        <div className="mb-4 flex items-center justify-between sm:mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl md:text-3xl">Sản phẩm nổi bật</h2>
            <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">Các sản phẩm được yêu thích nhất</p>
          </div>
          <Link
            to="/san-pham"
            search={{ categoryId: undefined, categoryName: undefined }}
            className="rounded-full border border-amber-300 bg-amber-50 px-4 py-1.5 text-xs font-medium text-amber-800 transition-colors hover:bg-amber-100 sm:text-sm"
          >
            Xem tất cả
          </Link>
        </div>

        {productsLoading ? (
          <div className="flex justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-amber-200 border-t-amber-600" />
          </div>
        ) : products && products.length > 0 ? (
          <div className="relative">
            <SliderArrow dir="left" onClick={() => productSlider.scroll('left')} />
            <SliderArrow dir="right" onClick={() => productSlider.scroll('right')} />
            <div
              ref={productSlider.ref}
              className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-1 py-1 sm:gap-4"
            >
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        ) : (
          <p className="py-8 text-center text-sm text-slate-400">Chưa có sản phẩm.</p>
        )}
      </section>

      {/* ==================== FRAME 3 — CÔNG TRÌNH THI CÔNG ==================== */}
      <section>
        <div className="mb-4 flex items-center justify-between sm:mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl md:text-3xl">Công trình đã thi công</h2>
            <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">Hình ảnh thực tế các công trình hoàn thành</p>
          </div>
          <Link
            to="/cong-trinh-da-thi-cong"
            search={{ categoryId: undefined, categoryName: undefined }}
            className="rounded-full border border-amber-300 bg-amber-50 px-4 py-1.5 text-xs font-medium text-amber-800 transition-colors hover:bg-amber-100 sm:text-sm"
          >
            Xem tất cả
          </Link>
        </div>

        {projectsLoading ? (
          <div className="flex justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-amber-200 border-t-amber-600" />
          </div>
        ) : projects && projects.length > 0 ? (
          <div className="relative">
            <SliderArrow dir="left" onClick={() => projectSlider.scroll('left')} />
            <SliderArrow dir="right" onClick={() => projectSlider.scroll('right')} />
            <div
              ref={projectSlider.ref}
              className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-1 py-1 sm:gap-4"
            >
              {projects.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </div>
        ) : (
          <p className="py-8 text-center text-sm text-slate-400">Chưa có công trình.</p>
        )}
      </section>
    </div>
  )
}
