import { Link, Outlet, createRootRouteWithContext, useRouter } from '@tanstack/react-router'
import { useState, useEffect, useRef } from 'react'
import type { QueryClient } from '@tanstack/react-query'
import { CATEGORY_MAP, PRODUCT_CATEGORY_ORDER } from '../hooks/useProducts'
import { PROJECT_CATEGORY_MAP } from '../hooks/useProjects'

const productCategories = PRODUCT_CATEGORY_ORDER
const projectCategories = Object.keys(PROJECT_CATEGORY_MAP)
const phoneNumber = '0347916199'

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
	component: RootLayout,
})

function RootLayout() {
	const router = useRouter()
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
	const [isProductMenuOpen, setIsProductMenuOpen] = useState(false)
	const [isProjectMenuOpen, setIsProjectMenuOpen] = useState(false)
	const navRef = useRef<HTMLElement>(null)

	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (navRef.current && !navRef.current.contains(e.target as Node)) {
				setIsProductMenuOpen(false)
				setIsProjectMenuOpen(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	const closeAll = () => {
		setIsMobileMenuOpen(false)
		setIsProductMenuOpen(false)
		setIsProjectMenuOpen(false)
	}

	const navLinkClass = 'block px-3 py-2 text-sm font-medium text-amber-900 rounded-lg hover:bg-amber-100/60 transition-colors md:px-1 md:py-1 md:rounded-none md:hover:bg-transparent'
	const navLinkActiveClass = 'bg-amber-100 text-amber-700 md:bg-transparent md:border-b-2 md:border-amber-700'

	return (
		<div className="min-h-screen bg-amber-50/40">
			<header className="sticky top-0 z-30 border-b border-amber-200/80 bg-amber-50/95 backdrop-blur">
				<div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
					<Link to="/" search={{ scrollTo: undefined }} onClick={closeAll} className="flex items-center gap-3 hover:opacity-90 transition-opacity">
						<img src="/Logo.png" alt="Logo Ốp Nhựa Tuấn Kiệt" className="h-11 w-11 object-contain md:h-12 md:w-12" />
						<h1 className="text-base font-semibold tracking-wide text-amber-950 md:text-lg">Ốp Nhựa Tuấn Kiệt</h1>
					</Link>

					{/* Hamburger button - mobile only */}
					<button
						type="button"
						onClick={() => setIsMobileMenuOpen((prev) => !prev)}
						className="flex h-10 w-10 items-center justify-center rounded-lg text-amber-900 hover:bg-amber-100 md:hidden"
						aria-label="Menu"
						aria-expanded={isMobileMenuOpen}
					>
						{isMobileMenuOpen ? (
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6">
								<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>
						) : (
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6">
								<path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
							</svg>
						)}
					</button>

					{/* Desktop nav */}
					<nav ref={navRef} className="hidden items-center gap-5 md:flex">
						<Link to="/" search={{ scrollTo: undefined }} className={navLinkClass} activeProps={{ className: `${navLinkClass} ${navLinkActiveClass}` }} onClick={closeAll}>
							Trang chủ
						</Link>

						{/* Product dropdown */}
						<div className="relative">
							<button
								type="button"
								onClick={() => { setIsProductMenuOpen((prev) => !prev); setIsProjectMenuOpen(false) }}
								className={`${navLinkClass} flex items-center gap-1`}
								aria-expanded={isProductMenuOpen}
							>
								<span>Sản phẩm</span>
								<svg viewBox="0 0 20 20" fill="currentColor" className={`h-4 w-4 transition-transform duration-200 ${isProductMenuOpen ? 'rotate-180' : ''}`} aria-hidden="true">
									<path fillRule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z" clipRule="evenodd" />
								</svg>
							</button>
							<div className={`absolute left-0 top-full mt-2 min-w-48 origin-top rounded-lg border border-stone-200 bg-white p-2 shadow-md transition-all duration-200 ${isProductMenuOpen ? 'pointer-events-auto translate-y-0 scale-100 opacity-100' : 'pointer-events-none -translate-y-1 scale-95 opacity-0'}`}>
								<Link to="/san-pham" search={{ categoryId: undefined, categoryName: undefined }} onClick={closeAll} className="mb-1 block rounded-md border border-stone-200 bg-stone-50 px-3 py-2 text-sm text-stone-900 transition-colors hover:bg-stone-100" activeProps={{ className: 'mb-1 block rounded-md border border-stone-600 bg-stone-100 px-3 py-2 text-sm font-medium text-stone-800' }}>
									Tất cả
								</Link>
								{productCategories.map((name) => (
									<Link key={name} to="/san-pham" search={{ categoryId: CATEGORY_MAP[name], categoryName: name }} onClick={closeAll} className="mb-1 block rounded-md border border-stone-200 bg-white px-3 py-2 text-sm text-stone-900 transition-colors hover:bg-stone-50 last:mb-0" activeProps={{ className: 'mb-1 block rounded-md border border-stone-600 bg-stone-100 px-3 py-2 text-sm font-medium text-stone-800 last:mb-0' }}>
										{name}
									</Link>
								))}
							</div>
						</div>

						{/* Project dropdown */}
						<div className="relative">
							<button
								type="button"
								onClick={() => { setIsProjectMenuOpen((prev) => !prev); setIsProductMenuOpen(false) }}
								className={`${navLinkClass} flex items-center gap-1`}
								aria-expanded={isProjectMenuOpen}
							>
								<span>Công trình đã thi công</span>
								<svg viewBox="0 0 20 20" fill="currentColor" className={`h-4 w-4 transition-transform duration-200 ${isProjectMenuOpen ? 'rotate-180' : ''}`} aria-hidden="true">
									<path fillRule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z" clipRule="evenodd" />
								</svg>
							</button>
							<div className={`absolute left-0 top-full mt-2 min-w-48 origin-top rounded-lg border border-amber-200 bg-white p-2 shadow-md transition-all duration-200 ${isProjectMenuOpen ? 'pointer-events-auto translate-y-0 scale-100 opacity-100' : 'pointer-events-none -translate-y-1 scale-95 opacity-0'}`}>
								<Link to="/cong-trinh-da-thi-cong" search={{ categoryId: undefined, categoryName: undefined }} onClick={closeAll} className="mb-1 block rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900" activeProps={{ className: 'mb-1 block rounded-md border border-amber-700 bg-amber-100 px-3 py-2 text-sm font-medium text-amber-700' }}>
									Tất cả
								</Link>
								{projectCategories.map((name) => (
									<Link key={name} to="/cong-trinh-da-thi-cong" search={{ categoryId: PROJECT_CATEGORY_MAP[name], categoryName: name }} onClick={closeAll} className="mb-1 block rounded-md border border-amber-200 bg-white px-3 py-2 text-sm text-amber-900 last:mb-0" activeProps={{ className: 'mb-1 block rounded-md border border-amber-700 bg-amber-100 px-3 py-2 text-sm font-medium text-amber-700 last:mb-0' }}>
										{name}
									</Link>
								))}
							</div>
						</div>

						<button
							type="button"
							onClick={() => {
								closeAll()
								if (router.state.location.pathname === '/') {
									document.getElementById('ve-chung-toi')?.scrollIntoView({ behavior: 'smooth' })
								} else {
									router.navigate({ to: '/', search: { scrollTo: 've-chung-toi' } })
								}
							}}
							className={navLinkClass}
						>
							Về chúng tôi
						</button>
					</nav>
				</div>

				{/* Mobile menu */}
				<div className={`overflow-hidden border-t border-amber-200/60 transition-all duration-300 md:hidden ${isMobileMenuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0 border-t-0'}`}>
					<nav className="space-y-1 px-4 py-3">
						<Link to="/" search={{ scrollTo: undefined }} className={navLinkClass} activeProps={{ className: `${navLinkClass} ${navLinkActiveClass}` }} onClick={closeAll}>
							Trang chủ
						</Link>

						{/* Product accordion */}
						<div>
							<button
								type="button"
								onClick={() => { setIsProductMenuOpen((prev) => !prev); setIsProjectMenuOpen(false) }}
								className={`${navLinkClass} flex w-full items-center justify-between gap-1`}
							>
								<span>Sản phẩm</span>
								<svg viewBox="0 0 20 20" fill="currentColor" className={`h-4 w-4 transition-transform duration-200 ${isProductMenuOpen ? 'rotate-180' : ''}`} aria-hidden="true">
									<path fillRule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z" clipRule="evenodd" />
								</svg>
							</button>
							<div className={`overflow-hidden transition-all duration-200 ${isProductMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
								<div className="ml-3 space-y-1 border-l-2 border-stone-200 pl-3 pt-1">
									<Link to="/san-pham" search={{ categoryId: undefined, categoryName: undefined }} onClick={closeAll} className="block rounded-md px-3 py-2 text-sm text-stone-900 hover:bg-stone-100/60">
										Tất cả
									</Link>
									{productCategories.map((name) => (
										<Link key={name} to="/san-pham" search={{ categoryId: CATEGORY_MAP[name], categoryName: name }} onClick={closeAll} className="block rounded-md px-3 py-2 text-sm text-stone-900 hover:bg-stone-100/60">
											{name}
										</Link>
									))}
								</div>
							</div>
						</div>

						{/* Project accordion */}
						<div>
							<button
								type="button"
								onClick={() => { setIsProjectMenuOpen((prev) => !prev); setIsProductMenuOpen(false) }}
								className={`${navLinkClass} flex w-full items-center justify-between gap-1`}
							>
								<span>Công trình đã thi công</span>
								<svg viewBox="0 0 20 20" fill="currentColor" className={`h-4 w-4 transition-transform duration-200 ${isProjectMenuOpen ? 'rotate-180' : ''}`} aria-hidden="true">
									<path fillRule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z" clipRule="evenodd" />
								</svg>
							</button>
							<div className={`overflow-hidden transition-all duration-200 ${isProjectMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
								<div className="ml-3 space-y-1 border-l-2 border-amber-200 pl-3 pt-1">
									<Link to="/cong-trinh-da-thi-cong" search={{ categoryId: undefined, categoryName: undefined }} onClick={closeAll} className="block rounded-md px-3 py-2 text-sm text-amber-900 hover:bg-amber-100/60">
										Tất cả
									</Link>
									{projectCategories.map((name) => (
										<Link key={name} to="/cong-trinh-da-thi-cong" search={{ categoryId: PROJECT_CATEGORY_MAP[name], categoryName: name }} onClick={closeAll} className="block rounded-md px-3 py-2 text-sm text-amber-900 hover:bg-amber-100/60">
											{name}
										</Link>
									))}
								</div>
							</div>
						</div>

						<button
							type="button"
							onClick={() => {
								closeAll()
								if (router.state.location.pathname === '/') {
									document.getElementById('ve-chung-toi')?.scrollIntoView({ behavior: 'smooth' })
								} else {
									router.navigate({ to: '/', search: { scrollTo: 've-chung-toi' } })
								}
							}}
							className={navLinkClass}
						>
							Về chúng tôi
						</button>
					</nav>
				</div>
			</header>

			<main className="mx-auto w-full max-w-6xl px-4 py-6 md:py-8">
				<Outlet />
			</main>

			<div className="fixed bottom-4 right-3 z-20 flex flex-col gap-2.5 md:bottom-5 md:right-4 md:gap-3">
				<a
					href={`tel:${phoneNumber}`}
					aria-label="Điện thoại"
					title="Điện thoại"
					className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/80 bg-white shadow-[0_10px_25px_rgba(0,0,0,0.2)] transition duration-300 hover:-translate-y-1 hover:scale-105 md:h-14 md:w-14"
				>
					<span className="absolute h-12 w-12 rounded-full bg-amber-400/20 animate-pulse md:h-14 md:w-14" />
					<img src="/phone-logo.png" alt="Điện thoại" className="relative z-10 h-6 w-6 object-contain md:h-7 md:w-7" />
				</a>
				<a
					href={`https://zalo.me/${phoneNumber}`}
					target="_blank"
					rel="noreferrer"
					aria-label="Liên hệ Zalo"
					title="Liên hệ Zalo"
					className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-white/80 bg-white shadow-[0_10px_25px_rgba(0,0,0,0.2)] transition duration-300 hover:-translate-y-1 hover:scale-105 md:h-14 md:w-14"
				>
					<span className="absolute h-12 w-12 rounded-full bg-sky-400/20 animate-pulse [animation-delay:150ms] md:h-14 md:w-14" />
					<img src="/zalo-logo.png" alt="Liên hệ Zalo" className="relative z-10 h-7 w-7 object-contain md:h-8 md:w-8" />
				</a>
			</div>
		</div>
	)
}
