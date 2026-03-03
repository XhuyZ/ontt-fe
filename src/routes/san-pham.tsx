import { createFileRoute } from '@tanstack/react-router'

const categories = ['Than tre', 'Tấm PVC', 'Lam sóng', 'Nhựa Nano']

export const Route = createFileRoute('/san-pham')({
  validateSearch: (search: Record<string, unknown>) => ({
    category: typeof search.category === 'string' ? search.category : undefined,
  }),
  component: ProductsPage,
})

function ProductsPage() {
  const { category } = Route.useSearch()
  const displayedCategories = category ? categories.filter((item) => item === category) : categories

  return (
    <section className="space-y-6 rounded-2xl bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-3xl font-bold text-slate-900">Sản phẩm</h2>
        <div className="mt-3 text-sm text-slate-700">
          <span className="font-medium">Phân loại: </span>
          <span>{category ?? 'Tất cả'}</span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {displayedCategories.map((item) => (
          <article key={item} className="rounded-xl border border-slate-200 p-4">
            <h3 className="font-semibold text-slate-900">{item}</h3>
            <p className="mt-2 text-sm text-slate-600">
              Giai phap op tuong va op tran tham my, do ben cao, phu hop cho nhieu khong gian.
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
