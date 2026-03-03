import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <section className="grid gap-6 rounded-2xl bg-white p-6 shadow-sm md:grid-cols-2 md:items-center">
      <div className="space-y-4">
        <img src="/Logo.png" alt="Logo Op nhua Tuan Kiet" className="h-16 w-16 object-contain" />
        <h2 className="text-3xl font-bold text-slate-900">Op nhua Tuan Kiet</h2>
        <p className="text-slate-600">
          Chuyen cung cap va thi cong tam op nhua cho nha o, cua hang va cong trinh.
        </p>
        <div className="space-y-1 text-slate-700">
          <p>
            <span className="font-semibold">So dien thoai:</span> 0900 123 456
          </p>
          <p>
            <span className="font-semibold">Email:</span> opnhuatuankiet@example.com
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <img
          src="https://images.unsplash.com/photo-1616137307420-7519e18f7f75?auto=format&fit=crop&w=800&q=80"
          alt="Tam op nhua noi that"
          className="h-32 w-full rounded-xl object-cover md:h-36"
        />
        <img
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80"
          alt="Khong gian noi that hien dai"
          className="h-32 w-full rounded-xl object-cover md:h-36"
        />
        <img
          src="https://images.unsplash.com/photo-1616594039964-3f8c9b4f5f30?auto=format&fit=crop&w=800&q=80"
          alt="Thi cong tam op tran"
          className="h-32 w-full rounded-xl object-cover md:h-36"
        />
        <img
          src="https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80"
          alt="Phong khach op nhua dep"
          className="h-32 w-full rounded-xl object-cover md:h-36"
        />
      </div>
    </section>
  )
}
