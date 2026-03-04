import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <section className="grid gap-6 rounded-2xl bg-white p-4 shadow-sm sm:p-6 md:grid-cols-2 md:items-center">
      <div className="space-y-4">
        <img src="/Logo.png" alt="Logo Op nhua Tuan Kiet" className="h-14 w-14 object-contain md:h-16 md:w-16" />
        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Ốp Nhựa Tuấn Kiệt</h2>
        <p className="text-sm text-slate-600 sm:text-base">
          Chuyên cung cấp và thi công tấm ốp nhựa cho nhà ở, cửa hàng và công trình.
        </p>
        <div className="space-y-1 text-sm text-slate-700 sm:text-base">
          <p>
            <span className="font-semibold">Số điện thoại:</span> 0900 123 456
          </p>
          <p>
            <span className="font-semibold">Email:</span> opnhuatuankiet@example.com
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <img
          src="https://images.unsplash.com/photo-1616137307420-7519e18f7f75?auto=format&fit=crop&w=800&q=80"
          alt="Tấm ốp nhựa nội thất"
          className="h-28 w-full rounded-xl object-cover sm:h-32 md:h-36"
        />
        <img
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80"
          alt="Không gian nội thất hiện đại"
          className="h-28 w-full rounded-xl object-cover sm:h-32 md:h-36"
        />
        <img
          src="https://images.unsplash.com/photo-1616594039964-3f8c9b4f5f30?auto=format&fit=crop&w=800&q=80"
          alt="Thi công tấm ốp trần"
          className="h-28 w-full rounded-xl object-cover sm:h-32 md:h-36"
        />
        <img
          src="https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80"
          alt="Phòng khách ốp nhựa đẹp"
          className="h-28 w-full rounded-xl object-cover sm:h-32 md:h-36"
        />
      </div>
    </section>
  )
}
