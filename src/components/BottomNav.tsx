import { useNavigate, useLocation } from 'react-router-dom'
import { Home, Calendar, MapPin, Users, User } from 'lucide-react'

const navItems = [
  { path: '/home',     icon: Home,     label: 'Inicio' },
  { path: '/reservas', icon: Calendar, label: 'Reservas' },
  { path: '/mapa',     icon: MapPin,   label: 'Mapa' },
  { path: '/comunidad',icon: Users,    label: 'Comunidad' },
  { path: '/mascota',  icon: User,     label: 'Perfil' },
]

export default function BottomNav() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <nav className="bottom-nav fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-petlife-border z-50">
      <div className="flex items-center justify-around px-2 pt-2">
        {navItems.map(({ path, icon: Icon, label }) => {
          const active = pathname === path
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all tap-active"
            >
              <div className={`p-1.5 rounded-xl transition-all ${active ? 'bg-petlife-primary-light' : ''}`}>
                <Icon
                  size={22}
                  strokeWidth={active ? 2.5 : 1.8}
                  color={active ? '#21878F' : '#94A3B8'}
                />
              </div>
              <span className={`text-[10px] font-semibold ${active ? 'text-petlife-primary' : 'text-slate-400'}`}>
                {label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
