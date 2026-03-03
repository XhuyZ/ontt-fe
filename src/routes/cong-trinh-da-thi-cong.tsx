import { createFileRoute } from '@tanstack/react-router'

const projects = [
  {
    title: 'Can ho cao cap',
    image:
      'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&w=1000&q=80',
  },
  {
    title: 'Nha pho hien dai',
    image:
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=80',
  },
  {
    title: 'Showroom trung bay',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
  },
  {
    title: 'Khach san mini',
    image:
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1000&q=80',
  },
]

export const Route = createFileRoute('/cong-trinh-da-thi-cong')({
  component: ProjectsPage,
})

function ProjectsPage() {
  return (
    <section className="space-y-6 rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="text-3xl font-bold text-slate-900">Cong trinh da thi cong</h2>
      <p className="text-slate-600">Mot so hinh anh cong trinh thuc te da hoan thanh.</p>

      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <article key={project.title} className="overflow-hidden rounded-xl border border-slate-200">
            <img src={project.image} alt={project.title} className="h-52 w-full object-cover" />
            <div className="p-3">
              <h3 className="font-semibold text-slate-900">{project.title}</h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
