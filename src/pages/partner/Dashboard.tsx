import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Home, Calendar, MapPin, Users, Briefcase, Bell, TrendingUp,
  Star, ChevronRight, Clock, CheckCircle2, AlertCircle, LogOut, BarChart3
} from 'lucide-react'
import PetLifeLogo from '../../components/PetLifeLogo'

const navItems = [
  { path: '/partner',          icon: Home,       label: 'Inicio' },
  { path: '/partner/reservas', icon: Calendar,   label: 'Reservas' },
  { path: '/mapa',             icon: MapPin,      label: 'Mapa' },
  { path: '/comunidad',        icon: Users,       label: 'Comunidad' },
  { path: '/partner/servicios',icon: Briefcase,   label: 'Servicios' },
]

const weekData = [
  { day: 'Dom', value: 60 }, { day: 'Lun', value: 80 }, { day: 'Mar', value: 55 },
  { day: 'Mié', value: 90 }, { day: 'Jue', value: 70 }, { day: 'Vie', value: 100 },
  { day: 'Sáb', value: 65 },
]

const todayAppointments = [
  { id: 1, client: 'Mascons 20 Manesa', date: 'May 20, February, 2024', pet: '🐕 Labrador', status: 'confirmed', time: '09:00' },
  { id: 2, client: 'Masscors 20 Sentina', date: 'May 20, February, 2024', pet: '🐈 Gato', status: 'pending',   time: '10:30' },
  { id: 3, client: 'Meccoms 20 January',  date: 'May 20, January, 2024',  pet: '🐕 Perro', status: 'confirmed', time: '11:00' },
  { id: 4, client: 'Mexamos 20 March',    date: 'May 20, March, 2024',    pet: '🐇 Conejo', status: 'pending',  time: '12:00' },
]

const notifications = [
  { id: 1, text: 'Nueva reserva confirmada — María García para Max', time: '2m', type: 'booking' },
  { id: 2, text: 'Valoración 5⭐ recibida de Carlos R.', time: '1h', type: 'review' },
  { id: 3, text: 'Recordatorio: cita a las 15:30 con Luna', time: '2h', type: 'reminder' },
]

const statusColors: Record<string, { bg: string; text: string; label: string }> = {
  confirmed: { bg: '#DCFCE7', text: '#166534', label: 'Confirmada' },
  pending:   { bg: '#FEF9C3', text: '#854D0E', label: 'Pendiente' },
  cancelled: { bg: '#FEE2E2', text: '#991B1B', label: 'Cancelada' },
}

export default function PartnerDashboard() {
  const navigate = useNavigate()
  const [activePath, setActivePath] = useState('/partner')

  const maxValue = Math.max(...weekData.map(d => d.value))
  const todayIdx = 5 // Viernes

  return (
    <div className="flex min-h-dvh bg-petlife-light">
      {/* Left sidebar */}
      <aside className="w-16 bg-white border-r border-petlife-border flex flex-col items-center py-6 gap-2 flex-shrink-0 sticky top-0 h-dvh z-40">
        {/* Logo icon */}
        <div className="mb-4">
          <PetLifeLogo variant="icon" size="sm" />
        </div>

        {navItems.map(({ path, icon: Icon, label }) => {
          const active = activePath === path
          return (
            <button
              key={path}
              onClick={() => { setActivePath(path); navigate(path) }}
              className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center gap-1 tap-active transition-all ${active ? 'bg-petlife-primary text-white' : 'text-slate-400 hover:bg-petlife-light'}`}
              title={label}
            >
              <Icon size={20} strokeWidth={active ? 2.5 : 1.8} color={active ? 'white' : '#94A3B8'} />
            </button>
          )
        })}

        <div className="mt-auto">
          <button
            onClick={() => navigate('/')}
            className="w-12 h-12 rounded-xl flex items-center justify-center tap-active text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all"
            title="Salir"
          >
            <LogOut size={18} />
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto hide-scrollbar">
        {/* Top bar */}
        <div className="bg-white px-5 pt-8 pb-4 border-b border-petlife-border sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-petlife-mid text-xs font-medium">Panel de control</p>
              <h1 className="text-petlife-dark font-bold text-lg">Clínica Norte Valencia</h1>
            </div>
            <div className="flex items-center gap-2">
              <button className="relative p-2 rounded-xl bg-petlife-light tap-active">
                <Bell size={18} color="#21878F" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-petlife-coral border border-white" />
              </button>
              <div className="w-9 h-9 rounded-xl bg-petlife-primary flex items-center justify-center">
                <span className="text-white font-bold text-sm">CN</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-5">
          {/* KPI cards */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="bg-white rounded-2xl p-4 shadow-card">
              <div className="flex items-start justify-between mb-2">
                <div className="w-9 h-9 rounded-xl bg-petlife-primary-light flex items-center justify-center">
                  <Calendar size={18} color="#21878F" />
                </div>
                <span className="badge bg-green-100 text-green-700 text-[10px]">+12% ↑</span>
              </div>
              <p className="text-petlife-dark text-2xl font-bold">2,024</p>
              <p className="text-petlife-mid text-xs mt-0.5">Reservas del mes</p>
              <p className="text-petlife-primary text-[10px] font-semibold mt-1">+125 hoy</p>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-card">
              <div className="flex items-start justify-between mb-2">
                <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center">
                  <Star size={18} color="#D4A757" fill="#D4A757" />
                </div>
                <span className="badge bg-amber-100 text-amber-700 text-[10px]">Top 10%</span>
              </div>
              <p className="text-petlife-dark text-2xl font-bold">4.9 ⭐</p>
              <p className="text-petlife-mid text-xs mt-0.5">Valoración media</p>
              <p className="text-petlife-mid text-[10px] mt-1">Valoración media</p>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-card">
              <div className="flex items-start justify-between mb-2">
                <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center">
                  <TrendingUp size={18} color="#22C55E" />
                </div>
              </div>
              <p className="text-petlife-dark text-2xl font-bold">8,450€</p>
              <p className="text-petlife-mid text-xs mt-0.5">Ingresos este mes</p>
              <p className="text-green-600 text-[10px] font-semibold mt-1">+18% vs mes anterior</p>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-card">
              <div className="flex items-start justify-between mb-2">
                <div className="w-9 h-9 rounded-xl bg-petlife-light flex items-center justify-center">
                  <Users size={18} color="#94A3B8" />
                </div>
              </div>
              <p className="text-petlife-dark text-2xl font-bold">342</p>
              <p className="text-petlife-mid text-xs mt-0.5">Clientes activos</p>
              <p className="text-petlife-primary text-[10px] font-semibold mt-1">28 nuevos hoy</p>
            </div>
          </div>

          {/* Weekly activity chart */}
          <div className="bg-white rounded-2xl shadow-card p-4 mb-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-petlife-dark font-bold text-sm flex items-center gap-2">
                <BarChart3 size={16} color="#21878F" />
                Actividad semanal
              </h3>
              <select className="text-xs text-petlife-mid border border-petlife-border rounded-lg px-2 py-1 outline-none">
                <option>Esta semana</option>
                <option>Mes anterior</option>
              </select>
            </div>
            {/* Chart */}
            <div className="flex items-end gap-2 h-24">
              {weekData.map((d, i) => (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t-lg transition-all"
                    style={{
                      height: `${(d.value / maxValue) * 80}px`,
                      background: i === todayIdx ? '#21878F' : 'rgba(33,135,143,0.15)',
                    }}
                  />
                  <span className={`text-[9px] font-semibold ${i === todayIdx ? 'text-petlife-primary' : 'text-petlife-mid'}`}>
                    {d.day}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Today's appointments */}
          <div className="bg-white rounded-2xl shadow-card mb-5">
            <div className="flex items-center justify-between px-4 py-3 border-b border-petlife-border">
              <h3 className="text-petlife-dark font-bold text-sm">Citas de hoy</h3>
              <button onClick={() => navigate('/partner/reservas')} className="text-petlife-primary text-xs font-semibold tap-active flex items-center gap-1">
                Ver todo <ChevronRight size={14} />
              </button>
            </div>
            <div className="divide-y divide-petlife-border">
              {todayAppointments.map(apt => {
                const s = statusColors[apt.status]
                return (
                  <div key={apt.id} className="flex items-center gap-3 px-4 py-3 tap-active">
                    <div className="w-8 h-8 rounded-xl bg-petlife-primary-light flex items-center justify-center text-lg flex-shrink-0">
                      {apt.pet.split(' ')[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-petlife-dark text-sm font-semibold truncate">{apt.client}</p>
                      <p className="text-petlife-mid text-xs">{apt.pet.split(' ').slice(1).join(' ')}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Clock size={11} color="#94A3B8" />
                        <span className="text-petlife-dark text-xs font-bold">{apt.time}</span>
                      </div>
                      <span className="badge text-[10px]" style={{ background: s.bg, color: s.text }}>
                        {s.label}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-2xl shadow-card">
            <div className="flex items-center justify-between px-4 py-3 border-b border-petlife-border">
              <h3 className="text-petlife-dark font-bold text-sm">Notificaciones</h3>
              <span className="badge bg-petlife-coral text-white text-[10px]">{notifications.length} nuevas</span>
            </div>
            <div className="divide-y divide-petlife-border">
              {notifications.map(n => (
                <div key={n.id} className="flex items-start gap-3 px-4 py-3 tap-active">
                  <div className="w-8 h-8 rounded-full bg-petlife-primary-light flex items-center justify-center flex-shrink-0 mt-0.5">
                    {n.type === 'booking' ? <Calendar size={14} color="#21878F" /> :
                     n.type === 'review'  ? <Star size={14} color="#D4A757" /> :
                                            <Clock size={14} color="#F3705C" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-petlife-dark text-xs font-medium leading-relaxed">{n.text}</p>
                    <p className="text-petlife-mid text-[10px] mt-0.5">hace {n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
