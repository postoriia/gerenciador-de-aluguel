import { Outlet } from 'react-router-dom'
import { Sidebar } from './sidebar'

export function AppLayout() {
  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <Sidebar />
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}
