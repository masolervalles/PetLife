import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Check, X as XIcon, Zap, Video, Shield, BarChart3, Star } from 'lucide-react'

const features = [
  { label: 'Teleconsulta veterinaria 24/7',      free: false, plus: true },
  { label: 'Informes de salud personalizados',   free: false, plus: true },
  { label: 'Recordatorios inteligentes',         free: true,  plus: true },
  { label: 'Historial médico completo',          free: true,  plus: true },
  { label: 'Descuentos en servicios (10%)',      free: false, plus: true },
  { label: 'Acceso prioritario a veterinarios',  free: false, plus: true },
  { label: 'Análisis nutrición IA',             free: false, plus: true },
  { label: 'Reservas sin límite',               free: '3/mes', plus: true },
  { label: 'Soporte 24/7 por chat',             free: false, plus: true },
  { label: 'Acceso al marketplace',             free: true,  plus: true },
]

const testimonials = [
  { name: 'María G.', pet: 'Max, Labrador', text: 'La teleconsulta me salvó una noche de urgencias.', rating: 5 },
  { name: 'Carlos R.', pet: 'Luna, Gato', text: 'Los informes de salud son increíblemente detallados.', rating: 5 },
]

export default function PetLifePlus() {
  const navigate = useNavigate()

  return (
    <div className="min-h-dvh bg-petlife-light overflow-y-auto hide-scrollbar">
      {/* Header hero */}
      <div className="relative" style={{ background: 'linear-gradient(160deg, #D4A757 0%, #B8903E 100%)' }}>
        <button
          onClick={() => navigate(-1)}
          className="absolute top-12 left-5 w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center tap-active"
        >
          <ArrowLeft size={20} color="white" />
        </button>

        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10" style={{ background: 'white', transform: 'translate(40%, -40%)' }} />
        <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full opacity-10" style={{ background: 'white', transform: 'translate(-30%, 30%)' }} />

        <div className="px-5 pt-20 pb-8 text-center relative">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 mb-4">
            <Zap size={14} color="white" fill="white" />
            <span className="text-white text-xs font-bold tracking-wide">PETLIFE+</span>
          </div>
          <h1 className="text-white text-3xl font-bold mb-2">Premium</h1>
          <p className="text-white/80 text-sm">El cuidado completo para tu mascota</p>

          {/* Price */}
          <div className="mt-6 mb-2">
            <div className="inline-block bg-white/15 rounded-2xl px-6 py-4">
              <p className="text-white/70 text-xs font-semibold mb-1">Desde solo</p>
              <div className="flex items-end justify-center gap-1">
                <span className="text-white text-4xl font-bold">9,99</span>
                <span className="text-white/80 text-lg mb-1">€/mes</span>
              </div>
              <p className="text-white/60 text-xs mt-1">Cancela cuando quieras</p>
            </div>
          </div>
        </div>
      </div>

      {/* Key benefits */}
      <div className="px-5 -mt-4 mb-4">
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: Video,    label: 'Teleconsulta',    desc: 'Veterinario 24/7',    color: '#21878F' },
            { icon: BarChart3,label: 'Informes salud',  desc: 'IA personalizada',    color: '#F3705C' },
            { icon: Shield,   label: 'Prioridad',       desc: 'Sin esperas',         color: '#D4A757' },
            { icon: Star,     label: 'Descuentos',      desc: '10% en servicios',    color: '#21878F' },
          ].map(({ icon: Icon, label, desc, color }) => (
            <div key={label} className="bg-white rounded-2xl p-4 shadow-card flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: color + '15' }}>
                <Icon size={20} color={color} />
              </div>
              <div>
                <p className="text-petlife-dark font-bold text-sm">{label}</p>
                <p className="text-petlife-mid text-xs">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature comparison */}
      <div className="px-5 mb-4">
        <h3 className="text-petlife-dark font-bold text-base mb-3">Comparativa de planes</h3>
        <div className="bg-white rounded-2xl shadow-card overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-3 bg-petlife-light px-4 py-3">
            <span className="text-petlife-mid text-xs font-semibold">Funcionalidad</span>
            <span className="text-petlife-mid text-xs font-semibold text-center">Gratis</span>
            <span className="text-petlife-ochre text-xs font-bold text-center">PetLife+</span>
          </div>
          {features.map((f, i) => (
            <div key={f.label} className={`grid grid-cols-3 items-center px-4 py-3 ${i % 2 === 0 ? 'bg-white' : 'bg-petlife-light/50'}`}>
              <span className="text-petlife-dark text-xs font-medium pr-2 leading-tight">{f.label}</span>
              <div className="flex justify-center">
                {f.free === true ? (
                  <Check size={16} color="#22C55E" strokeWidth={3} />
                ) : f.free === false ? (
                  <XIcon size={16} color="#CBD5E1" strokeWidth={3} />
                ) : (
                  <span className="text-[10px] font-bold text-petlife-mid">{f.free}</span>
                )}
              </div>
              <div className="flex justify-center">
                <Check size={16} color="#D4A757" strokeWidth={3} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="px-5 mb-4">
        <h3 className="text-petlife-dark font-bold text-base mb-3">Lo que dicen nuestros usuarios</h3>
        <div className="space-y-3">
          {testimonials.map(t => (
            <div key={t.name} className="bg-white rounded-2xl p-4 shadow-card">
              <div className="flex items-center gap-1 mb-2">
                {[1,2,3,4,5].map(s => <Star key={s} size={12} fill="#D4A757" color="#D4A757" />)}
              </div>
              <p className="text-petlife-dark text-sm italic mb-2">"{t.text}"</p>
              <div>
                <p className="text-petlife-dark font-bold text-xs">{t.name}</p>
                <p className="text-petlife-mid text-xs">{t.pet}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="px-5 pb-10">
        <button
          className="w-full py-4 rounded-2xl font-bold text-white text-base tap-active shadow-lg mb-3"
          style={{ background: 'linear-gradient(135deg, #D4A757 0%, #B8903E 100%)' }}
        >
          Empieza gratis 30 días ✨
        </button>
        <button
          onClick={() => navigate(-1)}
          className="w-full py-3 text-petlife-mid text-sm font-medium tap-active"
        >
          Continuar con plan gratuito
        </button>
        <p className="text-center text-petlife-mid text-xs mt-2">Sin compromiso · Cancela cuando quieras</p>
      </div>
    </div>
  )
}
