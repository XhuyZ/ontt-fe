import { createFileRoute, Link } from '@tanstack/react-router'
import { useProducts, CATEGORY_MAP, PRODUCT_CATEGORY_ORDER, getDisplayCategoryName } from '../../hooks/useProducts'
import type { Product } from '../../hooks/useProducts'

const PLACEHOLDER_IMG = 'https://placehold.co/400x300/f5f5f4/a8a29e?text=No+Image'

export const Route = createFileRoute('/san-pham/')({
  validateSearch: (search: Record<string, unknown>) => ({
    categoryId: typeof search.categoryId === 'string' ? search.categoryId : undefined,
    categoryName: typeof search.categoryName === 'string' ? search.categoryName : undefined,
  }),
  component: ProductsPage,
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

function ProductCard({ product, index }: { product: Product; index: number }) {
  const imgUrl = product.images[0]?.imgUrl ?? PLACEHOLDER_IMG

  return (
    <article
      className="animate-card-in group flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <Link
        to="/san-pham/$productId"
        params={{ productId: product.id }}
        className="relative block aspect-[4/3] w-full overflow-hidden bg-slate-100"
      >
        <img
          src={imgUrl}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <span className="absolute left-2 top-2 rounded-full bg-amber-900 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur-sm sm:left-3 sm:top-3 sm:px-3 sm:py-1">
          {getDisplayCategoryName(product.category.name)}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <Link to="/san-pham/$productId" params={{ productId: product.id }}>
          <h3 className="line-clamp-2 text-sm font-semibold text-slate-900 hover:text-amber-950 sm:text-base">
            {product.name}
          </h3>
        </Link>
        <div className="mt-auto flex gap-2 pt-3 sm:pt-4">
          <a
            href="tel:0347916199"
            className="flex-1 rounded-lg bg-amber-900 px-2 py-2 text-center text-xs font-medium text-white transition-colors hover:bg-amber-950 sm:px-3 sm:py-2.5 sm:text-sm"
          >
            Liên hệ
          </a>
          <Link
            to="/san-pham/$productId"
            params={{ productId: product.id }}
            className="flex-1 rounded-lg border border-amber-800 px-2 py-2 text-center text-xs font-medium text-amber-900 transition-colors hover:bg-amber-50 sm:px-3 sm:py-2.5 sm:text-sm"
          >
            Xem chi tiết
          </Link>
        </div>
      </div>
    </article>
  )
}

function ProductsPage() {
  const { categoryId, categoryName } = Route.useSearch()
  const { data: products, isLoading, isError, error } = useProducts(categoryId)

  const categoryEntries = PRODUCT_CATEGORY_ORDER.map((name) => [name, CATEGORY_MAP[name]] as [string, string])

  return (
    <section className="space-y-4 sm:space-y-6">
      <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
        <h2 className="text-xl font-bold text-slate-900 sm:text-2xl md:text-3xl">Sản phẩm</h2>
        <p className="mt-1 text-xs text-slate-500 sm:text-sm">
          {categoryName ? `Phân loại: ${categoryName}` : 'Tất cả sản phẩm'}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-4 sm:gap-2">
          <Link
            to="/san-pham"
            search={{ categoryId: undefined, categoryName: undefined }}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors sm:px-4 sm:py-1.5 sm:text-sm ${
              !categoryId
                ? 'border-amber-900 bg-amber-900 text-white'
                : 'border-stone-200 bg-white text-amber-900 hover:border-stone-300 hover:bg-amber-50'
            }`}
          >
            Tất cả
          </Link>
          {categoryEntries.map(([name, id]) => (
            <Link
              key={id}
              to="/san-pham"
              search={{ categoryId: id, categoryName: name }}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors sm:px-4 sm:py-1.5 sm:text-sm ${
                categoryId === id
                  ? 'border-amber-900 bg-amber-900 text-white'
                  : 'border-stone-200 bg-white text-amber-900 hover:border-stone-300 hover:bg-amber-50'
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
          <p className="text-xs text-red-700 sm:text-sm">Không thể tải sản phẩm. Vui lòng thử lại sau.</p>
          <p className="mt-1 text-xs text-red-500">{error?.message}</p>
        </div>
      )}

      {products && products.length === 0 && (
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm sm:p-10">
          <p className="text-sm text-slate-500">Không có sản phẩm nào trong danh mục này.</p>
        </div>
      )}

      {products && products.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      )}
    </section>
  )
}
