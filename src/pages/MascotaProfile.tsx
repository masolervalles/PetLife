import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Share2, FileText, Camera, ChevronRight, CheckCircle2 } from 'lucide-react'
import MobileLayout from '../components/MobileLayout'

const vaccinations = [
  { name: 'Rabia',      date: 'Feb 23', status: 'ok', next: 'Feb 24' },
  { name: 'Moquillo',   date: 'Feb 23', status: 'ok', next: 'Feb 24' },
  { name: 'Parvovirus', date: 'Mar 23', status: 'ok', next: 'Mar 24' },
  { name: 'Bordetella', date: 'Jun 23', status: 'ok', next: 'Jun 24' },
  { name: 'Leishmania', date: 'Jul 23', status: 'ok', next: 'Jul 24' },
]

const documents = [
  { name: 'Cartilla veterinaria.pdf', date: 'Actualizado ene 2025', icon: '📋' },
  { name: 'Microchip certificado.pdf', date: 'Expedido mar 2022',   icon: '📄' },
  { name: 'Póliza seguro Max.pdf',     date: 'Vigente hasta dic 2025', icon: '🛡️' },
]

const healthMetrics = [
  { label: 'Peso',     value: '32 kg', trend: '↑ 0.5 kg', color: '#21878F' },
  { label: 'Edad',     value: '4 años', trend: 'Adulto',  color: '#21878F' },
  { label: 'IMC',      value: 'Normal', trend: 'Saludable', color: '#22C55E' },
]

export default function MascotaProfile() {
  const navigate = useNavigate()

  return (
    <MobileLayout>
      {/* Header */}
      <div className="bg-white px-5 pt-12 pb-4 sticky top-0 z-40 border-b border-petlife-border flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl bg-petlife-light tap-active">
          <ArrowLeft size={20} color="#1A2A3A" />
        </button>
        <h1 className="flex-1 text-petlife-dark font-bold text-lg">Perfil de mascota</h1>
        <button className="p-2 rounded-xl bg-petlife-light tap-active">
          <Camera size={20} color="#21878F" />
        </button>
      </div>

      {/* Pet hero */}
      <div className="bg-white px-5 pb-5 pt-5">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="relative">
            <div className="w-24 h-24 rounded-2xl overflow-hidden border-3 border-petlife-primary-light shadow-card flex items-center justify-center text-5xl bg-amber-50">
              🐕
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-green-400 border-2 border-white flex items-center justify-center">
              <CheckCircle2 size={14} color="white" fill="white" />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1">
            <h2 className="text-petlife-dark text-xl font-bold">Max</h2>
            <p className="text-petlife-mid text-sm">Golden Retriever</p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {[
                { label: 'Especie: Perro' },
                { label: 'Raza: Labrador' },
                { label: 'Talla: Firma' },
                { label: 'Microchip ✓' },
                { label: 'Vacunado ✓' },
              ].map(tag => (
                <span key={tag.label} className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-petlife-primary-light text-petlife-primary">
                  {tag.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Health metrics */}
        <div className="grid grid-cols-3 gap-3 mt-5">
          {healthMetrics.map(m => (
            <div key={m.label} className="bg-petlife-light rounded-xl p-3 text-center">
              <p className="text-petlife-dark font-bold text-base">{m.value}</p>
              <p className="text-petlife-mid text-xs mt-0.5">{m.label}</p>
              <p className="text-[10px] font-semibold mt-1" style={{ color: m.color }}>{m.trend}</p>
            </div>
          ))}
        </div>

        {/* Share button */}
        <button className="w-full mt-4 py-3 rounded-2xl flex items-center justify-center gap-2 font-bold text-sm text-white tap-active shadow-card"
          style={{ background: '#21878F' }}>
          <Share2 size={17} />
          Compartir con veterinario
        </button>
      </div>

      {/* Vaccination timeline */}
      <div className="px-5 mt-4">
        <h3 className="text-petlife-dark font-bold text-base mb-3">Historial vacunal</h3>
        <div className="bg-white rounded-2xl p-4 shadow-card">
          {/* Timeline header */}
          <div className="flex items-center gap-2 mb-4 overflow-x-auto hide-scrollbar">
            {vaccinations.map((v, i) => (
              <div key={v.name} className={`flex-shrink-0 flex flex-col items-center gap-1`}>
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-lg shadow-sm ${
                  v.status === 'ok' ? 'bg-green-50 border-2 border-green-400' : 'bg-amber-50 border-2 border-amber-400'
                }`}>
                  {v.status === 'ok' ? '✅' : '⚠️'}
                </div>
                {i < vaccinations.length - 1 && (
                  <div className="h-0.5 w-8 bg-green-200 absolute" style={{ left: '50%', top: '18px' }} />
                )}
                <span className="text-[9px] text-petlife-mid font-semibold text-center">{v.name}</span>
              </div>
            ))}
          </div>

          {/* Vaccine list */}
          <div className="space-y-2 mt-2">
            {vaccinations.map(v => (
              <div key={v.name} className="flex items-center gap-3 py-2 border-b border-petlife-border last:border-0">
                <div className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
                <span className="flex-1 text-sm font-semibold text-petlife-dark">{v.name}</span>
                <span className="text-xs text-petlife-mid">Adm. {v.date}</span>
                <span className="text-[10px] font-bold text-petlife-primary bg-petlife-primary-light px-2 py-0.5 rounded-full">
                  Próx. {v.next}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Documents */}
      <div className="px-5 mt-4 mb-6">
        <h3 className="text-petlife-dark font-bold text-base mb-3">Documentos</h3>
        <div className="bg-white rounded-2xl shadow-card overflow-hidden">
          {documents.map((doc, i) => (
            <button key={doc.name} className={`w-full flex items-center gap-3 p-4 tap-active ${i < documents.length - 1 ? 'border-b border-petlife-border' : ''}`}>
              <div className="w-10 h-10 rounded-xl bg-petlife-primary-light flex items-center justify-center text-xl">
                {doc.icon}
              </div>
              <div className="flex-1 text-left">
                <p className="text-petlife-dark text-sm font-semibold">{doc.name}</p>
                <p className="text-petlife-mid text-xs mt-0.5">{doc.date}</p>
              </div>
              <ChevronRight size={16} color="#94A3B8" />
            </button>
          ))}
          <button className="w-full flex items-center justify-center gap-2 p-4 tap-active">
            <FileText size={16} color="#21878F" />
            <span className="text-petlife-primary text-sm font-bold">Añadir documento</span>
          </button>
        </div>
      </div>
    </MobileLayout>
  )
}
