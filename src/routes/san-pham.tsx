import { createFileRoute } from '@tanstack/react-router'

const categories = ['Nhua Nano', 'Tam PVC', 'Than tre', 'Lam song']

export const Route = createFileRoute('/san-pham')({
  component: ProductsPage,
})

function ProductsPage() {
  return (
    <section className="space-y-6 rounded-2xl bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-3xl font-bold text-slate-900">San pham</h2>
        <p className="mt-2 text-slate-600">
          Phan loai nho:
          <span className="ml-2 inline-flex flex-wrap gap-2 align-middle">
            {categories.map((category) => (
              <span
                key={category}
                className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
              >
                {category}
              </span>
            ))}
          </span>
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {categories.map((category) => (
          <article key={category} className="rounded-xl border border-slate-200 p-4">
            <h3 className="font-semibold text-slate-900">{category}</h3>
            <p className="mt-2 text-sm text-slate-600">
              Giai phap op tuong va op tran tham my, do ben cao, phu hop cho nhieu khong gian.
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
