import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/cong-trinh-da-thi-cong')({
  component: CongTrinhLayout,
})

function CongTrinhLayout() {
  return <Outlet />
}
