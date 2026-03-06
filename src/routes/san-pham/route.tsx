import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/san-pham')({
  component: SanPhamLayout,
})

function SanPhamLayout() {
  return <Outlet />
}
