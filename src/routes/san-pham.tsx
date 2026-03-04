import { createFileRoute, Link } from '@tanstack/react-router'
import { useProducts, CATEGORY_MAP } from '../hooks/useProducts'
import type { Product } from '../hooks/useProducts'

const PLACEHOLDER_IMG = 'https://placehold.co/400x300/f5f5f4/a8a29e?text=No+Image'

export const Route = createFileRoute('/san-pham')({
  validateSearch: (search: Record<string, unknown>) => ({
    categoryId: typeof search.categoryId === 'string' ? search.categoryId : undefined,
    categoryName: typeof search.categoryName === 'string' ? search.categoryName : undefined,
  }),
  component: ProductsPage,
})

function ProductCard({ product }: { product: Product }) {
  const imgUrl = product.images[0]?.imgUrl ?? PLACEHOLDER_IMG

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-amber-200/60 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <img
          src={imgUrl}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <span className="absolute left-3 top-3 rounded-full bg-amber-600/90 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
          {product.category.name}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 text-base font-semibold text-slate-900">{product.name}</h3>
        <div className="mt-auto flex gap-2 pt-4">
          <a
            href={`tel:0900123456`}
            className="flex-1 rounded-lg bg-amber-600 px-3 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-amber-700"
          >
            Mua ngay
          </a>
          <Link
            to="/san-pham"
            search={{ categoryId: product.category.id, categoryName: product.category.name }}
            className="flex-1 rounded-lg border border-amber-600 px-3 py-2.5 text-center text-sm font-medium text-amber-700 transition-colors hover:bg-amber-50"
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

  const categoryEntries = Object.entries(CATEGORY_MAP)

  return (
    <section className="space-y-6">
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Sản phẩm</h2>
        <p className="mt-1 text-sm text-slate-500">
          {categoryName ? `Phân loại: ${categoryName}` : 'Tất cả sản phẩm'}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            to="/san-pham"
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
              to="/san-pham"
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
          <p className="text-sm text-red-700">Không thể tải sản phẩm. Vui lòng thử lại sau.</p>
          <p className="mt-1 text-xs text-red-500">{error?.message}</p>
        </div>
      )}

      {products && products.length === 0 && (
        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
          <p className="text-slate-500">Không có sản phẩm nào trong danh mục này.</p>
        </div>
      )}

      {products && products.length > 0 && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  )
}
