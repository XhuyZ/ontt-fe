import { createFileRoute } from '@tanstack/react-router'

const commitments = [
  'Thi cong nhanh chong, do hoan thien cao',
  'Mau ma da dang, sang trong',
  'Vat lieu chong am moc - chong tham nuoc - chong moi mot tot nhat hien nay',
  'Khong bat lua - khong chay lan - khong cong venh trong qua trinh su dung',
  'Chong tray xuoc - mai mon - khong phai mau - khong bam bui - de lau chui',
  'Nhua nguyen sinh, do day 9mm',
  'Bao hanh 20 nam ke tu ngay ban giao',
]

export const Route = createFileRoute('/ve-chung-toi')({
  component: AboutPage,
})

function AboutPage() {
  return (
    <section className="space-y-6 rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="text-3xl font-bold text-slate-900">Ve chung toi</h2>

      <div className="space-y-4 text-slate-700">
        <p>
          Trang Tri Noi That Phong Tran chuyen thi cong thiet ke nhua op tuong, op tran nano, PVC,
          tam lam song...
        </p>
        <p>Voi doi ngu tho nhieu nam kinh nghiem trong nghe, chung toi cam ket:</p>
      </div>

      <ul className="space-y-2 text-slate-700">
        {commitments.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-1 h-2 w-2 rounded-full bg-blue-600" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
