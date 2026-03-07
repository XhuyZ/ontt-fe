import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useRef, useCallback } from 'react'
import { useProduct, useProducts, getDisplayCategoryName } from '../../hooks/useProducts'
import { getProductContent } from '../../data/productContent'
import { Lightbox } from '../../components/Lightbox'
import { VideoShortsSection } from '../../components/VideoShortsSection'
import type { Product } from '../../hooks/useProducts'

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
      className="absolute top-1/2 z-10 -translate-y-1/2 rounded-full border border-stone-200 bg-white/90 p-2 shadow-md backdrop-blur transition-all hover:bg-amber-50 active:scale-90 sm:p-2.5"
      style={{ [dir === 'left' ? 'left' : 'right']: '0.25rem' }}
      aria-label={dir === 'left' ? 'Trước' : 'Sau'}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-4 w-4 text-amber-950 sm:h-5 sm:w-5">
        {dir === 'left' ? (
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        )}
      </svg>
    </button>
  )
}

export const Route = createFileRoute('/san-pham/$productId')({
  component: ProductDetailPage,
})

function ProductCard({ product }: { product: Product }) {
  const imgUrl = product.images[0]?.imgUrl ?? PLACEHOLDER_IMG
  return (
    <article className="group flex h-full w-44 flex-shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm transition-shadow hover:shadow-lg sm:w-56 md:w-64">
      <Link to="/san-pham/$productId" params={{ productId: product.id }}>
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
          <img
            src={imgUrl}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <span className="absolute left-2 top-2 rounded-full bg-amber-900 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
            {getDisplayCategoryName(product.category.name)}
          </span>
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <Link to="/san-pham/$productId" params={{ productId: product.id }}>
          <h3 className="line-clamp-2 text-xs font-semibold text-slate-900 hover:text-amber-950 sm:text-sm">
            {product.name}
          </h3>
        </Link>
        <div className="mt-auto flex gap-1.5 pt-2.5 sm:gap-2 sm:pt-3">
          <a
            href="tel:0347916199"
            className="flex-1 rounded-lg bg-amber-900 py-1.5 text-center text-[10px] font-medium text-white transition-colors hover:bg-amber-950 sm:py-2 sm:text-xs"
          >
            Liên hệ
          </a>
          <Link
            to="/san-pham/$productId"
            params={{ productId: product.id }}
            className="flex-1 rounded-lg border border-amber-800 py-1.5 text-center text-[10px] font-medium text-amber-950 transition-colors hover:bg-amber-50 sm:py-2 sm:text-xs"
          >
            Xem chi tiết
          </Link>
        </div>
      </div>
    </article>
  )
}

function ProductDetailPage() {
  const { productId } = Route.useParams()
  const { data: product, isLoading, isError } = useProduct(productId)
  const categoryId = product?.category?.id
  const { data: relatedProducts } = useProducts(categoryId)
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)
  const [selectedImgIdx, setSelectedImgIdx] = useState(0)

  const images = product?.images ?? []
  const displayedImages = images.length > 0 ? images : [{ imgUrl: PLACEHOLDER_IMG, id: '0', url: '' }]
  const selectedImg = displayedImages[selectedImgIdx]?.imgUrl ?? PLACEHOLDER_IMG

  const relatedSlider = useSlider()
  const related = (relatedProducts ?? []).filter((p) => p.id !== productId).slice(0, 6)
  const content = product ? getProductContent(product.category.name) : null

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
          <div className="mt-8 space-y-2">
            <div className="skeleton h-4 w-full rounded" />
            <div className="skeleton h-4 w-full rounded" />
            <div className="skeleton h-4 w-2/3 rounded" />
          </div>
        </div>
      </section>
    )
  }

  if (isError || !product) {
    return (
      <section className="rounded-2xl bg-white p-8 text-center shadow-sm sm:p-12">
        <p className="text-slate-600">Không tìm thấy sản phẩm.</p>
        <Link
          to="/san-pham"
          search={{ categoryId: undefined, categoryName: undefined }}
          className="mt-4 inline-block rounded-lg bg-amber-900 px-4 py-2 text-sm font-medium text-white hover:bg-amber-950"
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
          <div className="flex flex-1 flex-col gap-3 lg:w-1/2">
            <div className="relative aspect-square w-full max-w-lg overflow-hidden rounded-2xl border border-stone-200 bg-slate-50">
              <button
                type="button"
                className="h-full w-full cursor-zoom-in"
                onClick={() => setLightbox({ src: selectedImg, alt: product.name })}
              >
                <img
                  src={selectedImg}
                  alt={product.name}
                  className="h-full w-full object-contain"
                />
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
                      i === selectedImgIdx ? 'border-amber-900' : 'border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    <img src={img.imgUrl} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-1 flex-col gap-4 lg:w-1/2 lg:pl-6 lg:pr-6">
            <div>
              <span className="rounded-full bg-amber-900 px-3 py-1 text-xs font-medium text-white">
                {getDisplayCategoryName(product.category.name)}
              </span>
              <h1 className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl">{product.name}</h1>
            </div>
            <a
              href="tel:0347916199"
              className="flex items-center justify-center gap-2 rounded-xl bg-amber-900 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-amber-950"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              Liên hệ: 0347 916 199
            </a>

            <div className="grid grid-cols-1 gap-4 border-t border-stone-200 pt-4 sm:grid-cols-3">
              <div className="flex flex-col items-center gap-2 text-center">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-amber-200/80 bg-gradient-to-br from-amber-50 to-amber-100/80 shadow-sm">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-amber-800">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </span>
                <span className="text-xs text-slate-600 sm:text-sm">Miễn phí đến tận nơi bảo hành sản phẩm lên tới 20 năm</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-amber-200/80 bg-gradient-to-br from-amber-50 to-amber-100/80 shadow-sm">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-amber-800">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </span>
                <span className="text-xs text-slate-600 sm:text-sm">Miễn phí mang mẫu mã đến tận nơi tư vấn cho căn nhà của bạn</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-amber-200/80 bg-gradient-to-br from-amber-50 to-amber-100/80 shadow-sm">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-amber-800">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </span>
                <span className="text-xs text-slate-600 sm:text-sm">Thanh toán khi công trình đã thi công hoàn thiện</span>
              </div>
            </div>

            {product.category.name.includes('Nhựa Nano') && (
              <div className="mt-4 overflow-hidden rounded-xl border border-stone-200">
                <table className="w-full text-left text-sm">
                  <tbody>
                    <tr className="border-b border-stone-200 bg-stone-50">
                      <th className="px-4 py-2.5 font-semibold text-slate-700">Tên sản phẩm</th>
                      <td className="px-4 py-2.5 text-slate-600">{getDisplayCategoryName(product.category.name)}</td>
                    </tr>
                    <tr className="border-b border-stone-200">
                      <th className="bg-stone-50 px-4 py-2.5 font-semibold text-slate-700">Mã sản phẩm</th>
                      <td className="px-4 py-2.5 text-slate-600">{product.name}</td>
                    </tr>
                    <tr className="border-b border-stone-200">
                      <th className="bg-stone-50 px-4 py-2.5 font-semibold text-slate-700">Nơi sản xuất</th>
                      <td className="px-4 py-2.5 text-slate-600">Việt Nam</td>
                    </tr>
                    <tr className="border-b border-stone-200">
                      <th className="bg-stone-50 px-4 py-2.5 font-semibold text-slate-700">Rộng x dày x dài</th>
                      <td className="px-4 py-2.5 text-slate-600">400 x 9 x 3000mm</td>
                    </tr>
                    <tr className="border-b border-stone-200">
                      <th className="bg-stone-50 px-4 py-2.5 font-semibold text-slate-700">Đóng hộp</th>
                      <td className="px-4 py-2.5 text-slate-600">8 thanh / hộp</td>
                    </tr>
                    <tr>
                      <th className="bg-stone-50 px-4 py-2.5 font-semibold text-slate-700">Qui chuẩn CL</th>
                      <td className="px-4 py-2.5 text-slate-600">CE xuất khẩu Châu Âu</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Nội dung sản phẩm */}
      {content && (
        <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6 md:p-8">
          <h2 className="text-lg font-bold text-slate-800 sm:text-xl">Nội dung sản phẩm</h2>
          <div className="prose prose-slate mt-4 max-w-none">{content}</div>
        </div>
      )}

      {/* Sản phẩm nổi bật cùng phân loại */}
      {related.length > 0 && (
        <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-800 sm:text-xl">
              Sản phẩm nổi bật cùng phân loại
            </h2>
            <Link
              to="/san-pham"
              search={{ categoryId: categoryId ?? undefined, categoryName: product.category.name }}
              className="text-xs font-medium text-amber-950 transition-colors hover:text-amber-950 sm:text-sm"
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
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Video giới thiệu */}
      <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
        <VideoShortsSection />
      </div>

      {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />}
    </section>
  )
}
