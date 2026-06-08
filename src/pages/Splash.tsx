import { useNavigate } from 'react-router-dom'

export default function Splash() {
  const navigate = useNavigate()

  return (
    <div className="min-h-dvh flex flex-col" style={{ background: 'linear-gradient(160deg, #21878F 0%, #1A6E75 60%, #145B61 100%)' }}>
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10" style={{ background: 'white', transform: 'translate(40%, -40%)' }} />
      <div className="absolute bottom-32 left-0 w-48 h-48 rounded-full opacity-10" style={{ background: 'white', transform: 'translate(-40%, 40%)' }} />

      {/* Top badge */}
      <div className="pt-16 px-8 text-center">
        <span className="inline-block text-xs font-semibold tracking-widest text-white/60 uppercase mb-8">
          Propuesta 1 · La 'P Conectada'
        </span>
      </div>

      {/* Logo area */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        {/* Paw + heartbeat icon */}
        <div className="mb-8">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="60" cy="60" r="58" fill="white" fillOpacity="0.12" />
            <ellipse cx="60" cy="76" rx="26" ry="22" fill="white" fillOpacity="0.2"/>
            <ellipse cx="60" cy="76" rx="26" ry="22" stroke="white" strokeWidth="2.5"/>
            <ellipse cx="32" cy="55" rx="10" ry="12" fill="white" fillOpacity="0.2"/>
            <ellipse cx="32" cy="55" rx="10" ry="12" stroke="white" strokeWidth="2.5"/>
            <ellipse cx="47" cy="45" rx="10" ry="12" fill="white" fillOpacity="0.2"/>
            <ellipse cx="47" cy="45" rx="10" ry="12" stroke="white" strokeWidth="2.5"/>
            <ellipse cx="73" cy="45" rx="10" ry="12" fill="white" fillOpacity="0.2"/>
            <ellipse cx="73" cy="45" rx="10" ry="12" stroke="white" strokeWidth="2.5"/>
            <ellipse cx="88" cy="55" rx="10" ry="12" fill="white" fillOpacity="0.2"/>
            <ellipse cx="88" cy="55" rx="10" ry="12" stroke="white" strokeWidth="2.5"/>
            <path d="M40 76 L47 67 L53 85 L60 64 L66 76 L80 76" stroke="#F3705C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <h1 className="text-5xl font-bold text-white mb-2 tracking-tight">PetLife</h1>
        <p className="text-white/70 text-sm font-medium tracking-wide mb-2">Ecosistema digital · Valencia, España</p>

        <div className="mt-6 mb-12">
          <p className="text-white text-xl font-semibold leading-snug">
            Todo el cuidado de tu<br />
            <span className="text-[#F3705C]">mascota</span>, en un solo lugar
          </p>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {['🏥 Veterinarios', '✂️ Peluquería', '🗺️ Mapa pet-friendly', '💊 Historial salud'].map(f => (
            <span key={f} className="px-3 py-1.5 rounded-full text-xs font-semibold text-white/80" style={{ background: 'rgba(255,255,255,0.15)' }}>
              {f}
            </span>
          ))}
        </div>
      </div>

      {/* CTA buttons */}
      <div className="px-6 pb-12 space-y-3">
        <button
          onClick={() => navigate('/home')}
          className="w-full py-4 rounded-2xl font-bold text-white text-base tap-active shadow-lg"
          style={{ background: '#F3705C' }}
        >
          Crear cuenta
        </button>
        <button
          onClick={() => navigate('/home')}
          className="w-full py-4 rounded-2xl font-bold text-white text-base tap-active border-2 border-white/40"
          style={{ background: 'rgba(255,255,255,0.1)' }}
        >
          Ya tengo cuenta
        </button>
        <button
          onClick={() => navigate('/partner')}
          className="w-full py-3 text-white/60 text-sm font-medium tap-active"
        >
          Soy profesional veterinario →
        </button>
      </div>

      {/* Bottom footer */}
      <div className="pb-6 text-center">
        <p className="text-white/40 text-xs">TFM · PetLife · Grupo 3A · Executive MBA EDEM · 2026</p>
      </div>
    </div>
  )
}
