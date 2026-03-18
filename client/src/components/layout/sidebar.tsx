import { useState } from 'react'
import {
  LayoutDashboard,
  Building2,
  DollarSign,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { clear } from '@/lib/local-storage'
import useAuthStore from '@/store/auth-store'

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  const { setIsAuthenticated, setUser } = useAuthStore()

  const toggleSidebar = () => setIsOpen(!isOpen)

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUser(null)

    clear()

    window.location.href = '/entrar'
  }

  return (
    <>
      {/* Botão de Menu para Mobile */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#115e59] text-white rounded-md"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay para fechar ao clicar fora (Mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar Principal */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-[#115e59] text-white flex flex-col transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:h-screen
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
      >
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
            onClick={() => setIsOpen(false)} // Fecha ao clicar no mobile
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
            onClick={() => setIsOpen(false)}
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
            onClick={() => setIsOpen(false)}
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

        <div className="px-4 mt-auto mb-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-3 rounded-xl text-emerald-100/70 hover:bg-red-500/20 hover:text-red-200 transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Sair</span>
          </button>
        </div>

        <div className="p-6 text-xs text-emerald-100/40">© 2026 Habittar</div>
      </aside>
    </>
  )
}
