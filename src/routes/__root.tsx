import { Link, Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { useState } from 'react'
import type { QueryClient } from '@tanstack/react-query'

const productCategories = ['Than tre', 'Tấm PVC', 'Lam sóng', 'Nhựa Nano']

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
	component: RootLayout,
})

function RootLayout() {
	const navLinkClass = 'px-1 py-1 text-sm font-medium text-amber-900'
	const navLinkActiveClass = 'border-b-2 border-amber-700 text-amber-700'
	const [isProductMenuOpen, setIsProductMenuOpen] = useState(false)

	return (
		<div className="min-h-screen bg-amber-50/40">
			<header className="sticky top-0 z-10 border-b border-amber-200/80 bg-amber-50/95 backdrop-blur">
				<div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
					<div className="flex items-center gap-3">
						<img src="/Logo.png" alt="Logo Op nhua Tuan Kiet" className="h-10 w-10 object-contain" />
						<h1 className="text-base font-semibold tracking-wide text-amber-950">Ốp Nhựa Tuấn Kiệt</h1>
					</div>
					<nav className="flex flex-wrap items-center gap-6">
						<Link to="/" className={navLinkClass} activeProps={{ className: `${navLinkClass} ${navLinkActiveClass}` }}>
							Trang chủ
						</Link>
						<div className="relative">
							<button
								type="button"
								onClick={() => setIsProductMenuOpen((prev) => !prev)}
								className={`${navLinkClass} flex items-center gap-1`}
								aria-expanded={isProductMenuOpen}
								aria-controls="product-menu"
							>
								<span>Sản phẩm</span>
								<svg
									viewBox="0 0 20 20"
									fill="currentColor"
									className={`h-4 w-4 transition-transform duration-200 ${isProductMenuOpen ? 'rotate-180' : ''}`}
									aria-hidden="true"
								>
									<path
										fillRule="evenodd"
										d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
										clipRule="evenodd"
									/>
								</svg>
							</button>
							<div
								id="product-menu"
								className={`absolute left-0 top-full mt-2 min-w-48 origin-top rounded-lg border border-amber-200 bg-white p-2 shadow-md transition-all duration-200 ${
									isProductMenuOpen
										? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
										: 'pointer-events-none -translate-y-1 scale-95 opacity-0'
								}`}
							>
								<Link
									to="/san-pham"
									search={{ category: undefined }}
									onClick={() => setIsProductMenuOpen(false)}
									className="mb-1 block rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900"
									activeProps={{
										className: 'mb-1 block rounded-md border border-amber-700 bg-amber-100 px-3 py-2 text-sm font-medium text-amber-700',
									}}
								>
									Tất cả
								</Link>
								{productCategories.map((category) => (
									<Link
										key={category}
										to="/san-pham"
										search={{ category }}
										onClick={() => setIsProductMenuOpen(false)}
										className="mb-1 block rounded-md border border-amber-200 bg-white px-3 py-2 text-sm text-amber-900 last:mb-0"
										activeProps={{
											className:
												'mb-1 block rounded-md border border-amber-700 bg-amber-100 px-3 py-2 text-sm font-medium text-amber-700 last:mb-0',
										}}
									>
										{category}
									</Link>
								))}
							</div>
						</div>
						<Link
							to="/cong-trinh-da-thi-cong"
							className={navLinkClass}
							activeProps={{ className: `${navLinkClass} ${navLinkActiveClass}` }}
						>
							Công trình đã thi công
						</Link>
						<Link
							to="/ve-chung-toi"
							className={navLinkClass}
							activeProps={{ className: `${navLinkClass} ${navLinkActiveClass}` }}
						>
							Về chúng tôi
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
