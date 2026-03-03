import { Link, Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import type { QueryClient } from '@tanstack/react-query'

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootLayout,
})

function RootLayout() {
  const navLinkClass = 'rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-100'
  const navLinkActiveClass = 'bg-blue-600 text-white hover:bg-blue-700'

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
          <h1 className="text-base font-semibold text-slate-900">Op nhua Tuan Kiet</h1>
          <nav className="flex items-center gap-1">
            <Link to="/" className={navLinkClass} activeProps={{ className: `${navLinkClass} ${navLinkActiveClass}` }}>
              Trang chu
            </Link>
            <Link
              to="/san-pham"
              className={navLinkClass}
              activeProps={{ className: `${navLinkClass} ${navLinkActiveClass}` }}
            >
              San pham
            </Link>
            <Link
              to="/cong-trinh-da-thi-cong"
              className={navLinkClass}
              activeProps={{ className: `${navLinkClass} ${navLinkActiveClass}` }}
            >
              Cong trinh da thi cong
            </Link>
            <Link
              to="/ve-chung-toi"
              className={navLinkClass}
              activeProps={{ className: `${navLinkClass} ${navLinkActiveClass}` }}
            >
              Ve chung toi
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}
