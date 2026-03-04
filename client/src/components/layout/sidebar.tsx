import { LayoutDashboard, Building2, DollarSign, Home } from 'lucide-react'
import { NavLink } from 'react-router-dom'

export function Sidebar() {
  return (
    <aside className="w-64 bg-[#115e59] text-white flex flex-col sticky top-0 h-screen">
      <div className="p-6 flex items-center justify-center gap-2">
        <img
          src="habittar-logo-dark.jpeg"
          alt="Habittar"
          className="w-40 rounded-full"
        />
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-xl transition-colors ${
              isActive
                ? 'bg-[#134e4a] text-white'
                : 'text-emerald-100/70 hover:bg-[#134e4a] hover:text-white'
            }`
          }
        >
          <LayoutDashboard size={20} />
          <span className="font-medium">Dashboard</span>
        </NavLink>
        <NavLink
          to="/propriedades"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-xl transition-colors ${
              isActive
                ? 'bg-[#134e4a] text-white'
                : 'text-emerald-100/70 hover:bg-[#134e4a] hover:text-white'
            }`
          }
        >
          <Building2 size={20} />
          <span className="font-medium">Imóveis</span>
        </NavLink>
        <NavLink
          to="/pagamentos"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-xl transition-colors ${
              isActive
                ? 'bg-[#134e4a] text-white'
                : 'text-emerald-100/70 hover:bg-[#134e4a] hover:text-white'
            }`
          }
        >
          <DollarSign size={20} />
          <span className="font-medium">Pagamentos</span>
        </NavLink>
      </nav>

      <div className="p-6 text-xs text-emerald-100/40">© 2025 Habittar</div>
    </aside>
  )
}
