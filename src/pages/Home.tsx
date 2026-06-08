import { useNavigate } from 'react-router-dom'
import { Bell, ShoppingBag, Calendar, Clock, MapPin, Heart, ChevronRight, Zap, AlertTriangle } from 'lucide-react'
import MobileLayout from '../components/MobileLayout'
import PetLifeLogo from '../components/PetLifeLogo'

const quickActions = [
  { icon: Calendar, label: 'Reservar',    path: '/reservas', color: '#21878F', bg: '#E8F4F5' },
  { icon: Clock,    label: 'Historial',   path: '/mascota',  color: '#F3705C', bg: '#FEF0ED' },
  { icon: ShoppingBag, label: 'Marketplace', path: '/mapa',  color: '#D4A757', bg: '#FBF3E2' },
]

const upcomingAppointments = [
  { id: 1, type: 'Veterinaria', partner: 'Clínica Norte Valencia', date: '20 jun 2025', time: '10:00', petName: 'Max', icon: '🏥' },
  { id: 2, type: 'Peluquería',  partner: 'Paws Style',             date: '25 jun 2025', time: '15:30', petName: 'Max', icon: '✂️' },
]

const lostPets = [
  { id: 1, name: 'Luna', breed: 'Beagle', distance: '0.8 km', photo: '🐕', color: 'tricolor' },
  { id: 2, name: 'Mika', breed: 'Gato naranja', distance: '1.2 km', photo: '🐈', color: 'naranja' },
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <MobileLayout>
      {/* Header */}
      <div className="bg-white px-5 pt-12 pb-4 sticky top-0 z-40 border-b border-petlife-border">
        <div className="flex items-center justify-between">
          <PetLifeLogo size="md" />
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-full bg-petlife-primary-light tap-active" onClick={() => navigate('/premium')}>
              <Bell size={20} color="#21878F" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-petlife-coral border border-white" />
            </button>
            {/* Pet avatar */}
            <button onClick={() => navigate('/mascota')} className="w-10 h-10 rounded-full overflow-hidden border-2 border-petlife-primary tap-active flex items-center justify-center text-2xl bg-amber-50">
              🐕
            </button>
          </div>
        </div>
      </div>

      {/* Greeting */}
      <div className="px-5 pt-5 pb-2">
        <p className="text-petlife-mid text-sm font-medium">Buenos días, María 👋</p>
        <h2 className="text-petlife-dark text-xl font-bold">¿Cómo está Max hoy?</h2>
      </div>

      {/* Quick actions */}
      <div className="px-5 py-4">
        <div className="grid grid-cols-3 gap-3">
          {quickActions.map(({ icon: Icon, label, path, color, bg }) => (
            <button
              key={label}
              onClick={() => navigate(path)}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl tap-active shadow-card"
              style={{ background: bg }}
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: color + '20' }}>
                <Icon size={22} color={color} strokeWidth={2} />
              </div>
              <span className="text-xs font-bold" style={{ color }}>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* PetLife+ promo banner */}
      <div className="mx-5 mb-4">
        <button
          onClick={() => navigate('/premium')}
          className="w-full rounded-2xl p-4 tap-active flex items-center gap-3 shadow-card"
          style={{ background: 'linear-gradient(135deg, #D4A757 0%, #B8903E 100%)' }}
        >
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <Zap size={20} color="white" fill="white" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-white text-xs font-semibold opacity-80">Prueba 30 días gratis</p>
            <p className="text-white font-bold text-sm">PetLife+ · Teleconsulta 24/7</p>
          </div>
          <ChevronRight size={18} color="white" />
        </button>
      </div>

      {/* Upcoming appointments */}
      <div className="px-5 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-petlife-dark font-bold text-base">Próximas citas</h3>
          <button onClick={() => navigate('/reservas')} className="text-petlife-primary text-sm font-semibold tap-active">
            Ver todo
          </button>
        </div>
        <div className="space-y-3">
          {upcomingAppointments.map(apt => (
            <div key={apt.id} className="bg-white rounded-2xl p-4 shadow-card flex items-center gap-3 tap-active">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: '#E8F4F5' }}>
                {apt.icon}
              </div>
              <div className="flex-1">
                <p className="text-petlife-dark font-semibold text-sm">{apt.partner}</p>
                <p className="text-petlife-mid text-xs mt-0.5">{apt.petName} · {apt.type}</p>
              </div>
              <div className="text-right">
                <p className="text-petlife-primary font-bold text-sm">{apt.time}</p>
                <p className="text-petlife-mid text-xs">{apt.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pet health summary */}
      <div className="px-5 mb-4">
        <div className="bg-white rounded-2xl p-4 shadow-card">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-petlife-dark font-bold text-sm flex items-center gap-2">
              <Heart size={16} color="#F3705C" fill="#F3705C" />
              Salud de Max
            </h3>
            <button onClick={() => navigate('/mascota')} className="text-petlife-primary text-xs font-semibold">Ver perfil</button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[
              { icon: '💉', label: 'Vacunas', status: 'ok' },
              { icon: '🦷', label: 'Dental',  status: 'ok' },
              { icon: '🐛', label: 'Despar.', status: 'ok' },
              { icon: '❤️', label: 'Corazón', status: 'ok' },
            ].map(item => (
              <div key={item.label} className="flex flex-col items-center gap-1 p-2 rounded-xl bg-petlife-primary-light">
                <span className="text-lg">{item.icon}</span>
                <span className="text-[10px] font-semibold text-petlife-primary">{item.label}</span>
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lost pets alert */}
      <div className="px-5 mb-4">
        <div className="bg-white rounded-2xl p-4 shadow-card border border-amber-100">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={16} color="#D4A757" fill="#FBF3E2" />
            <h3 className="text-petlife-dark font-bold text-sm">Mascotas perdidas cerca de ti</h3>
            <span className="ml-auto badge bg-amber-100 text-amber-700">{lostPets.length}</span>
          </div>
          <div className="space-y-2">
            {lostPets.map(pet => (
              <div key={pet.id} className="flex items-center gap-3 p-2 rounded-xl bg-petlife-light">
                <span className="text-2xl">{pet.photo}</span>
                <div className="flex-1">
                  <p className="text-petlife-dark font-semibold text-xs">{pet.name} · {pet.breed}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <MapPin size={10} color="#94A3B8" />
                    <span className="text-[10px] text-petlife-mid">{pet.distance}</span>
                  </div>
                </div>
                <button className="px-3 py-1 rounded-lg text-[10px] font-bold text-white bg-petlife-coral tap-active">
                  Ver
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Map teaser */}
      <div className="px-5 mb-6">
        <button
          onClick={() => navigate('/mapa')}
          className="w-full rounded-2xl overflow-hidden shadow-card tap-active relative h-32"
        >
          <div className="absolute inset-0 map-bg" />
          {/* Mock roads */}
          <div className="map-road-h" style={{ left: '0%', right: '0%', top: '35%' }} />
          <div className="map-road-h" style={{ left: '0%', right: '0%', top: '65%' }} />
          <div className="map-road-v" style={{ top: '0%', bottom: '0%', left: '50%' }} />
          {/* Pins */}
          <div className="absolute" style={{ top: '25%', left: '45%' }}>
            <div className="w-6 h-6 rounded-full bg-petlife-primary flex items-center justify-center text-white text-xs shadow-lg">🏥</div>
          </div>
          <div className="absolute" style={{ top: '55%', left: '25%' }}>
            <div className="w-5 h-5 rounded-full bg-petlife-coral flex items-center justify-center text-white text-xs shadow-lg">✂️</div>
          </div>
          <div className="absolute" style={{ top: '40%', left: '70%' }}>
            <div className="w-5 h-5 rounded-full bg-petlife-ochre flex items-center justify-center text-white text-xs shadow-lg">🛒</div>
          </div>
          {/* Overlay */}
          <div className="absolute inset-0 flex items-end p-3" style={{ background: 'linear-gradient(to top, rgba(26,42,58,0.6) 0%, transparent 60%)' }}>
            <div className="flex items-center gap-2">
              <MapPin size={14} color="white" />
              <span className="text-white text-xs font-semibold">Explorar mapa pet-friendly →</span>
            </div>
          </div>
        </button>
      </div>
    </MobileLayout>
  )
}
