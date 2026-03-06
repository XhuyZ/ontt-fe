import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useProducts } from '../hooks/useProducts'
import { useProjects, PROJECT_CATEGORY_MAP, PROJECT_CATEGORY_ORDER } from '../hooks/useProjects'
import { CATEGORY_MAP, PRODUCT_CATEGORY_ORDER } from '../hooks/useProducts'
import { Lightbox } from '../components/Lightbox'
import type { Product } from '../hooks/useProducts'
import type { Project } from '../hooks/useProjects'

const heroImages = ['/heropic1.jpg', '/heropic2.jpg', '/heropic3.jpg', '/heropic4.jpg']
const PLACEHOLDER_IMG = 'https://placehold.co/400x300/f5f5f4/a8a29e?text=No+Image'

const YOUTUBE_SHORTS = [
  { id: 'qk3sBFK7b1A', url: 'https://www.youtube.com/shorts/qk3sBFK7b1A' },
  { id: 'z7OrgqEuiS4', url: 'https://www.youtube.com/shorts/z7OrgqEuiS4' },
  { id: 'QW1x7LBPPCg', url: 'https://www.youtube.com/shorts/QW1x7LBPPCg' },
  { id: 'RyQuML1goTM', url: 'https://www.youtube.com/shorts/RyQuML1goTM' },
]

const commitments = [
  'Thi công nhanh chóng, độ hoàn thiện cao',
  'Mẫu mã đa dạng, sang trọng',
  'Vật liệu chống ẩm mốc – chống thấm nước – chống mối mọt tốt nhất hiện nay',
  'Không bắt lửa – không cháy lan – không cong vênh trong quá trình sử dụng',
  'Chống trầy xước – mài mòn – không phai màu – không bám bụi – dễ lau chùi',
  'Nhựa nguyên sinh, độ dày 9mm',
  'Bảo hành 20 năm kể từ ngày bàn giao',
]

export const Route = createFileRoute('/')({
  validateSearch: (search: Record<string, unknown>) => ({
    scrollTo: typeof search.scrollTo === 'string' ? search.scrollTo : undefined,
  }),
  component: HomePage,
})

/* ------------------------------------------------------------------ */
/*  Scroll-triggered reveal                                            */
/* ------------------------------------------------------------------ */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.15 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, visible }
}

/* ------------------------------------------------------------------ */
/*  Horizontal scroll slider                                           */
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

/* ------------------------------------------------------------------ */
/*  Skeleton card for slider loading                                   */
/* ------------------------------------------------------------------ */
function SliderSkeleton() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="w-44 flex-shrink-0 overflow-hidden rounded-2xl border border-slate-200/60 bg-white sm:w-56 md:w-64">
          <div className="skeleton aspect-[4/3] w-full" />
          <div className="p-3 sm:p-4">
            <div className="skeleton h-3.5 w-3/4 rounded" />
            <div className="skeleton mt-2 h-3 w-1/2 rounded" />
            <div className="mt-3 flex gap-1.5 sm:gap-2">
              <div className="skeleton h-7 flex-1 rounded-lg sm:h-8" />
              <div className="skeleton h-7 flex-1 rounded-lg sm:h-8" />
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

/* ------------------------------------------------------------------ */
/*  Cards                                                              */
/* ------------------------------------------------------------------ */
function ProductCard({ product, onViewImage }: { product: Product; onViewImage: (src: string, alt: string) => void }) {
  const imgUrl = product.images[0]?.imgUrl ?? PLACEHOLDER_IMG
  return (
    <article className="flex h-full w-44 flex-shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm transition-shadow hover:shadow-lg sm:w-56 md:w-64">
      <button type="button" className="relative aspect-[4/3] w-full cursor-zoom-in overflow-hidden bg-slate-100" onClick={() => onViewImage(imgUrl, product.name)}>
        <img src={imgUrl} alt={product.name} className="h-full w-full object-cover transition-transform duration-300 hover:scale-105" loading="lazy" />
        <span className="absolute left-2 top-2 rounded-full bg-stone-600 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm sm:px-2.5 sm:text-xs">
          {product.category.name}
        </span>
      </button>
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <h3 className="line-clamp-2 text-xs font-semibold text-slate-900 sm:text-sm">{product.name}</h3>
        <div className="mt-auto flex gap-1.5 pt-2.5 sm:gap-2 sm:pt-3">
          <a href="tel:0347916199" className="flex-1 rounded-lg bg-stone-600 py-1.5 text-center text-[10px] font-medium text-white transition-colors hover:bg-stone-700 sm:py-2 sm:text-xs">
            Liên hệ
          </a>
          <Link
            to="/san-pham/$productId"
            params={{ productId: product.id }}
            className="flex-1 rounded-lg border border-stone-500 py-1.5 text-center text-[10px] font-medium text-stone-700 transition-colors hover:bg-stone-50 sm:py-2 sm:text-xs"
          >
            Xem chi tiết
          </Link>
        </div>
      </div>
    </article>
  )
}

/* ------------------------------------------------------------------ */
/*  Product category row (max 6 products per category)                 */
/* ------------------------------------------------------------------ */
function ProductCategoryRow({
  categoryName,
  categoryId,
  onViewImage,
}: {
  categoryName: string
  categoryId: string
  onViewImage: (src: string, alt: string) => void
}) {
  const slider = useSlider()
  const { data: products, isLoading } = useProducts(categoryId)
  const displayed = (products ?? []).slice(0, 6)

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-slate-800 sm:text-lg">{categoryName}</h3>
        <Link
          to="/san-pham"
          search={{ categoryId, categoryName }}
          className="text-xs font-medium text-stone-600 transition-colors hover:text-stone-800 sm:text-sm"
        >
          Xem thêm →
        </Link>
      </div>
      {isLoading ? (
        <div className="no-scrollbar flex gap-3 overflow-x-auto px-1 py-1 sm:gap-4">
          <SliderSkeleton />
        </div>
      ) : displayed.length > 0 ? (
        <div className="relative">
          <SliderArrow dir="left" onClick={() => slider.scroll('left')} />
          <SliderArrow dir="right" onClick={() => slider.scroll('right')} />
          <div
            ref={slider.ref}
            className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-1 py-1 sm:gap-4"
          >
            {displayed.map((p) => (
              <ProductCard key={p.id} product={p} onViewImage={onViewImage} />
            ))}
          </div>
        </div>
      ) : (
        <p className="py-4 text-center text-sm text-slate-400">Chưa có sản phẩm trong danh mục này.</p>
      )}
    </div>
  )
}

function ProjectCard({ project, onViewImage }: { project: Project; onViewImage: (src: string, alt: string) => void }) {
  const imgUrl = project.images[0]?.imgUrl ?? PLACEHOLDER_IMG
  return (
    <article className="flex h-full w-44 flex-shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm transition-shadow hover:shadow-lg sm:w-56 md:w-64">
      <button type="button" className="relative aspect-[4/3] w-full cursor-zoom-in overflow-hidden bg-slate-100" onClick={() => onViewImage(imgUrl, project.name)}>
        <img src={imgUrl} alt={project.name} className="h-full w-full object-cover transition-transform duration-300 hover:scale-105" loading="lazy" />
        <span className="absolute left-2 top-2 rounded-full bg-stone-600 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm sm:px-2.5 sm:text-xs">
          {project.projectCategory.name}
        </span>
      </button>
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <h3 className="line-clamp-2 text-xs font-semibold text-slate-900 sm:text-sm">{project.name}</h3>
        <div className="mt-auto flex gap-1.5 pt-2.5 sm:gap-2 sm:pt-3">
          <a href="tel:0347916199" className="flex-1 rounded-lg bg-stone-600 py-1.5 text-center text-[10px] font-medium text-white transition-colors hover:bg-stone-700 sm:py-2 sm:text-xs">
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

/* ------------------------------------------------------------------ */
/*  Project category row (max 6 projects per category)                 */
/* ------------------------------------------------------------------ */
function ProjectCategoryRow({
  categoryName,
  categoryId,
  onViewImage,
}: {
  categoryName: string
  categoryId: string
  onViewImage: (src: string, alt: string) => void
}) {
  const slider = useSlider()
  const { data: projects, isLoading } = useProjects(categoryId)
  const displayed = (projects ?? []).slice(0, 6)

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-slate-800 sm:text-lg">{categoryName}</h3>
        <Link
          to="/cong-trinh-da-thi-cong"
          search={{ categoryId, categoryName }}
          className="text-xs font-medium text-stone-600 transition-colors hover:text-stone-800 sm:text-sm"
        >
          Xem thêm →
        </Link>
      </div>
      {isLoading ? (
        <div className="no-scrollbar flex gap-3 overflow-x-auto px-1 py-1 sm:gap-4">
          <SliderSkeleton />
        </div>
      ) : displayed.length > 0 ? (
        <div className="relative">
          <SliderArrow dir="left" onClick={() => slider.scroll('left')} />
          <SliderArrow dir="right" onClick={() => slider.scroll('right')} />
          <div
            ref={slider.ref}
            className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-1 py-1 sm:gap-4"
          >
            {displayed.map((p) => (
              <ProjectCard key={p.id} project={p} onViewImage={onViewImage} />
            ))}
          </div>
        </div>
      ) : (
        <p className="py-4 text-center text-sm text-slate-400">Chưa có công trình trong danh mục này.</p>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Home page                                                          */
/* ------------------------------------------------------------------ */
function HomePage() {
  const { scrollTo } = Route.useSearch()
  const [heroIdx, setHeroIdx] = useState(0)
  const [heroReady, setHeroReady] = useState(false)
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)
  const productsReveal = useReveal()
  const projectsReveal = useReveal()
  const videosReveal = useReveal()

  useEffect(() => {
    const id = setInterval(() => setHeroIdx((prev) => (prev + 1) % heroImages.length), 4000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    requestAnimationFrame(() => setHeroReady(true))
  }, [])

  useEffect(() => {
    if (scrollTo === 've-chung-toi') {
      setTimeout(() => document.getElementById('ve-chung-toi')?.scrollIntoView({ behavior: 'smooth' }), 50)
    }
  }, [scrollTo])

  return (
    <div className="space-y-8 sm:space-y-12">
      {/* ==================== FRAME 1 — HERO ==================== */}
      <section className="relative isolate overflow-hidden rounded-2xl shadow-sm">
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
          <h2
            className={`text-2xl font-bold tracking-tight text-white transition-all duration-700 sm:text-3xl md:text-5xl ${heroReady ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
          >
            Trang Trí Nội Thất Tuấn Kiệt
          </h2>
          <p
            className={`mt-3 max-w-md text-sm text-amber-100/90 transition-all duration-700 delay-100 sm:text-base md:text-lg ${heroReady ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
          >
            Chuyên cung cấp và thi công tấm ốp nhựa cho nhà ở, cửa hàng và công trình.
          </p>
          <div
            className={`mt-4 space-y-1 text-xs text-amber-100/80 transition-all duration-700 delay-200 sm:text-sm ${heroReady ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
          >
            <p>
              <span className="font-semibold text-white">Số điện thoại:</span> 0347 916 199
            </p>
            <p>
              <span className="font-semibold text-white">Email:</span> kietnguoita123@gmail.com
            </p>
          </div>

          <div
            className={`mt-8 flex flex-wrap gap-3 transition-all duration-700 delay-300 sm:gap-4 ${heroReady ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
          >
            <button
              type="button"
              onClick={() => document.getElementById('featured-products')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2 rounded-full bg-white/90 px-6 py-2.5 text-sm font-semibold text-amber-900 shadow-lg backdrop-blur transition-all hover:bg-white hover:shadow-xl active:scale-95 sm:px-8 sm:py-3 sm:text-base"
            >
              Khám phá
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-4 w-4 animate-bounce sm:h-5 sm:w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => document.getElementById('featured-videos')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2 rounded-full border-2 border-white/80 bg-white/20 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur transition-all hover:bg-white/40 hover:border-white active:scale-95 sm:px-8 sm:py-3 sm:text-base"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 sm:h-5 sm:w-5">
                <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
              </svg>
              Video thi công
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-4 w-4 sm:h-5 sm:w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          <div className={`mt-6 flex gap-2 transition-all duration-500 delay-400 ${heroReady ? 'opacity-100' : 'opacity-0'}`}>
            {heroImages.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setHeroIdx(i)}
                className={`h-2 rounded-full transition-all duration-300 ${i === heroIdx ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'}`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FRAME 2 — SẢN PHẨM NỔI BẬT ==================== */}
      <section
        id="featured-products"
        ref={productsReveal.ref}
        className={`scroll-mt-20 transition-all duration-500 ease-out ${productsReveal.visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
      >
        <div className="mb-6 flex items-center justify-between sm:mb-8">
          <div>
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl md:text-3xl">Sản phẩm nổi bật</h2>
            <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">Các sản phẩm theo phân loại (tối đa 6 sản phẩm/loại)</p>
          </div>
          <Link
            to="/san-pham"
            search={{ categoryId: undefined, categoryName: undefined }}
            className="rounded-full border border-stone-300 bg-stone-50 px-4 py-1.5 text-xs font-medium text-stone-700 transition-colors hover:bg-stone-100 sm:text-sm"
          >
            Xem tất cả
          </Link>
        </div>

        <div className="space-y-8 sm:space-y-10">
          {PRODUCT_CATEGORY_ORDER.map((categoryName) => (
            <ProductCategoryRow
              key={categoryName}
              categoryName={categoryName}
              categoryId={CATEGORY_MAP[categoryName]}
              onViewImage={(src, alt) => setLightbox({ src, alt })}
            />
          ))}
        </div>
      </section>

      {/* ==================== FRAME 3 — CÔNG TRÌNH THI CÔNG ==================== */}
      <section
        ref={projectsReveal.ref}
        className={`transition-all duration-500 ease-out ${projectsReveal.visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
      >
        <div className="mb-6 flex items-center justify-between sm:mb-8">
          <div>
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl md:text-3xl">Công trình đã thi công</h2>
            <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">Các công trình theo phân loại</p>
          </div>
          <Link
            to="/cong-trinh-da-thi-cong"
            search={{ categoryId: undefined, categoryName: undefined }}
            className="rounded-full border border-stone-300 bg-stone-50 px-4 py-1.5 text-xs font-medium text-stone-700 transition-colors hover:bg-stone-100 sm:text-sm"
          >
            Xem tất cả
          </Link>
        </div>

        <div className="space-y-8 sm:space-y-10">
          {PROJECT_CATEGORY_ORDER.map((categoryName) => (
            <ProjectCategoryRow
              key={categoryName}
              categoryName={categoryName}
              categoryId={PROJECT_CATEGORY_MAP[categoryName]}
              onViewImage={(src, alt) => setLightbox({ src, alt })}
            />
          ))}
        </div>
      </section>

      {/* ==================== FRAME 4 — VIDEO GIỚI THIỆU ==================== */}
      <section
        id="featured-videos"
        ref={videosReveal.ref}
        className={`scroll-mt-20 transition-all duration-500 ease-out ${videosReveal.visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
      >
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl font-bold text-slate-900 sm:text-2xl md:text-3xl">Video giới thiệu</h2>
          <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">Xem video thực tế quá trình thi công và sản phẩm</p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {YOUTUBE_SHORTS.map((video) => (
            <div
              key={video.id}
              className="overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-[9/16] w-full overflow-hidden bg-slate-100">
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={`Video giới thiệu ${video.id}`}
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-2 text-center text-xs font-medium text-stone-600 transition-colors hover:text-stone-800 sm:px-4 sm:py-2.5 sm:text-sm"
              >
                Xem trên YouTube →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== FRAME 5 — VỀ CHÚNG TÔI ==================== */}
      <section id="ve-chung-toi" className="scroll-mt-20 rounded-2xl bg-white p-5 shadow-sm sm:p-6 md:p-8">
        <h2 className="text-xl font-bold text-slate-800 sm:text-2xl">Về chúng tôi</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
          <span className="font-semibold text-slate-800">Trang Trí Nội Thất Tuấn Kiệt</span> chuyên thi công, thiết kế
          nhựa ốp tường, ốp trần nano, PVC, tấm lam sóng và các vật liệu trang trí nội thất hiện đại. Với đội ngũ thợ
          nhiều năm kinh nghiệm, chúng tôi tự tin mang đến những không gian sống đẹp, bền vững và đẳng cấp.
        </p>
        <h3 className="mt-5 text-base font-bold text-slate-800 sm:text-lg">Cam kết của chúng tôi</h3>
        <ul className="mt-2 space-y-2">
          {commitments.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
              <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-slate-400" />
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap justify-center gap-3 border-t border-slate-200 pt-6">
          <a href="tel:0347916199" className="rounded-full bg-slate-800 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-700">
            Gọi ngay: 0347 916 199
          </a>
          <a href="https://zalo.me/0347916199" target="_blank" rel="noreferrer" className="rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50">
            Nhắn tin Zalo
          </a>
        </div>
      </section>

      {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />}
    </div>
  )
}
