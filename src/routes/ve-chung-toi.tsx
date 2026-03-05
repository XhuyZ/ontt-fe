import { createFileRoute } from '@tanstack/react-router'

const commitments = [
  'Thi công nhanh chóng, độ hoàn thiện cao',
  'Mẫu mã đa dạng, sang trọng',
  'Vật liệu chống ẩm mốc – chống thấm nước – chống mối mọt tốt nhất hiện nay',
  'Không bắt lửa – không cháy lan – không cong vênh trong quá trình sử dụng',
  'Chống trầy xước – mài mòn – không phai màu – không bám bụi – dễ lau chùi',
  'Nhựa nguyên sinh, độ dày 9mm',
  'Bảo hành 20 năm kể từ ngày bàn giao',
]

const highlights = [
  { title: 'Kinh nghiệm lâu năm', desc: 'Đội ngũ thợ thi công chuyên nghiệp với nhiều năm trong nghề' },
  { title: 'Đa dạng mẫu mã', desc: 'Hàng trăm mẫu ốp tường, ốp trần cho bạn lựa chọn' },
  { title: 'Bảo hành 20 năm', desc: 'Cam kết chất lượng dài hạn, yên tâm sử dụng' },
  { title: 'Thi công nhanh gọn', desc: 'Hoàn thiện đúng tiến độ, không ảnh hưởng sinh hoạt' },
]

export const Route = createFileRoute('/ve-chung-toi')({
  component: AboutPage,
})

function AboutPage() {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Giới thiệu */}
      <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-10 md:p-14">
        <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl md:text-4xl">Về chúng tôi</h2>
        <div className="mt-4 max-w-2xl space-y-3 text-sm leading-relaxed text-slate-600 sm:text-base md:text-lg">
          <p>
            <span className="font-semibold text-slate-800">Trang Trí Nội Thất Tuấn Kiệt</span> chuyên thi công, thiết kế
            nhựa ốp tường, ốp trần nano, PVC, tấm lam sóng và các vật liệu trang trí nội thất hiện đại.
          </p>
          <p>
            Với đội ngũ thợ nhiều năm kinh nghiệm trong nghề, chúng tôi tự tin mang đến cho quý khách hàng
            những không gian sống đẹp, bền vững và đẳng cấp.
          </p>
        </div>
      </section>

      {/* Điểm nổi bật */}
      <section className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
        {highlights.map((h) => (
          <div key={h.title} className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
            <h3 className="text-sm font-bold text-slate-800 sm:text-base">{h.title}</h3>
            <p className="mt-1.5 text-xs text-slate-500 sm:text-sm">{h.desc}</p>
          </div>
        ))}
      </section>

      {/* Cam kết */}
      <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-8">
        <h3 className="text-lg font-bold text-slate-800 sm:text-xl md:text-2xl">Cam kết của chúng tôi</h3>
        <p className="mt-1 text-xs text-slate-400 sm:text-sm">Chất lượng là uy tín – Uy tín là thương hiệu</p>

        <ul className="mt-5 space-y-3 sm:mt-6">
          {commitments.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-400" />
              <span className="text-sm text-slate-600 sm:text-base">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Liên hệ */}
      <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center shadow-sm sm:p-8">
        <h3 className="text-lg font-bold text-slate-800 sm:text-xl">Bạn cần tư vấn?</h3>
        <p className="mt-1 text-xs text-slate-500 sm:text-sm">Liên hệ ngay để được tư vấn miễn phí và báo giá nhanh nhất</p>
        <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <a
            href="tel:0347916199"
            className="rounded-full bg-slate-800 px-6 py-2.5 text-sm font-semibold text-white shadow transition-colors hover:bg-slate-700 sm:text-base"
          >
            Gọi ngay: 0347 916 199
          </a>
          <a
            href="https://zalo.me/0347916199"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-slate-300 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 shadow transition-colors hover:bg-slate-50 sm:text-base"
          >
            Nhắn tin Zalo
          </a>
        </div>
      </section>
    </div>
  )
}
