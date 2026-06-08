import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Star, MapPin, Clock, ChevronRight, Filter, X, CheckCircle2 } from 'lucide-react'
import MobileLayout from '../components/MobileLayout'

const categories = ['Todos', 'Veterinaria', 'Peluquería', 'Guardería', 'Adiestramiento', 'Tienda']

const partners = [
  {
    id: 1, name: 'Clínica Veterinaria Norte', category: 'Veterinaria',
    rating: 4.9, reviews: 142, distance: '0.8 km', available: true, todaySlot: '10:00',
    price: 'Desde 40€', icon: '🏥', specialties: ['Urgencias 24h', 'Cirugía', 'Radiología'],
  },
  {
    id: 2, name: 'Paws Style Peluquería', category: 'Peluquería',
    rating: 4.7, reviews: 89, distance: '1.2 km', available: true, todaySlot: '15:30',
    price: 'Desde 25€', icon: '✂️', specialties: ['Baño completo', 'Corte de pelo'],
  },
  {
    id: 3, name: 'Dr. García - Especialista', category: 'Veterinaria',
    rating: 5.0, reviews: 53, distance: '2.1 km', available: false, todaySlot: null,
    price: 'Desde 60€', icon: '👨‍⚕️', specialties: ['Dermatología', 'Cardiología'],
  },
  {
    id: 4, name: 'Happy Paws Guardería', category: 'Guardería',
    rating: 4.8, reviews: 204, distance: '0.5 km', available: true, todaySlot: '08:00',
    price: 'Desde 20€/día', icon: '🏠', specialties: ['Día completo', 'Fines de semana'],
  },
  {
    id: 5, name: 'K9 Training Valencia', category: 'Adiestramiento',
    rating: 4.6, reviews: 67, distance: '3.0 km', available: true, todaySlot: '11:00',
    price: 'Desde 35€', icon: '🐾', specialties: ['Obediencia básica', 'Agility'],
  },
]

const steps = ['Servicio', 'Fecha / Hora', 'Confirmación']

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(s => (
        <Star key={s} size={10} fill={s <= Math.round(rating) ? '#D4A757' : 'none'} color="#D4A757" />
      ))}
    </div>
  )
}

export default function Reservas() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [search, setSearch] = useState('')
  const [bookingStep, setBookingStep] = useState<number | null>(null)
  const [selectedPartner, setSelectedPartner] = useState<typeof partners[0] | null>(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')

  const filteredPartners = partners.filter(p => {
    const matchCat = activeCategory === 'Todos' || p.category === activeCategory
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const openBooking = (partner: typeof partners[0]) => {
    setSelectedPartner(partner)
    setBookingStep(0)
  }

  const times = ['09:00','10:00','10:30','11:00','15:00','15:30','16:00','17:00']
  const dates = [
    { label: 'Hoy',      value: '2025-06-20' },
    { label: 'Mañana',   value: '2025-06-21' },
    { label: 'Lun 23',   value: '2025-06-23' },
    { label: 'Mar 24',   value: '2025-06-24' },
    { label: 'Mié 25',   value: '2025-06-25' },
  ]

  return (
    <MobileLayout>
      {/* Header */}
      <div className="bg-white px-5 pt-12 pb-4 sticky top-0 z-40 border-b border-petlife-border">
        <h1 className="text-petlife-dark font-bold text-xl mb-4">Reservas y servicios</h1>
        {/* Search bar */}
        <div className="flex gap-2">
          <div className="flex-1 flex items-center gap-2 bg-petlife-light rounded-xl px-3 py-2.5">
            <Search size={16} color="#94A3B8" />
            <input
              className="flex-1 bg-transparent text-sm text-petlife-dark placeholder-slate-400 outline-none"
              placeholder="Buscar veterinario, servicio..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <button className="p-2.5 rounded-xl bg-petlife-primary-light tap-active">
            <Filter size={18} color="#21878F" />
          </button>
        </div>
      </div>

      {/* Category tabs */}
      <div className="bg-white px-5 py-3 border-b border-petlife-border">
        <div className="scroll-tabs">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold tap-active transition-all ${
                activeCategory === cat
                  ? 'bg-petlife-primary text-white shadow-md'
                  : 'bg-petlife-light text-petlife-mid'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="px-5 py-3 flex items-center justify-between">
        <span className="text-petlife-mid text-sm">{filteredPartners.length} resultados · Valencia</span>
        <button className="text-petlife-primary text-sm font-semibold tap-active">Ordenar</button>
      </div>

      {/* Partner list */}
      <div className="px-5 space-y-4 pb-4">
        {filteredPartners.map(partner => (
          <div key={partner.id} className="bg-white rounded-2xl shadow-card overflow-hidden tap-active" onClick={() => openBooking(partner)}>
            <div className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-14 h-14 rounded-xl bg-petlife-primary-light flex items-center justify-center text-3xl flex-shrink-0">
                  {partner.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-petlife-dark font-bold text-sm leading-tight">{partner.name}</h3>
                    {partner.available && (
                      <span className="badge bg-green-100 text-green-700 flex-shrink-0">Disponible hoy</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex items-center gap-1">
                      <StarRating rating={partner.rating} />
                      <span className="text-xs font-bold text-petlife-dark ml-1">{partner.rating}</span>
                      <span className="text-xs text-petlife-mid">({partner.reviews})</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-1.5">
                    <div className="flex items-center gap-1">
                      <MapPin size={11} color="#94A3B8" />
                      <span className="text-xs text-petlife-mid">Distancia · {partner.distance}</span>
                    </div>
                    {partner.todaySlot && (
                      <div className="flex items-center gap-1">
                        <Clock size={11} color="#21878F" />
                        <span className="text-xs text-petlife-primary font-semibold">{partner.todaySlot}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Specialties */}
              <div className="flex gap-1.5 mt-3 flex-wrap">
                {partner.specialties.map(s => (
                  <span key={s} className="px-2 py-0.5 bg-petlife-light rounded-full text-[10px] font-semibold text-petlife-mid">{s}</span>
                ))}
              </div>

              <div className="flex items-center justify-between mt-3">
                <span className="text-petlife-dark text-sm font-bold">{partner.price}</span>
                <button
                  className="px-4 py-2 rounded-xl text-sm font-bold text-white tap-active"
                  style={{ background: partner.available ? '#21878F' : '#94A3B8' }}
                  onClick={e => { e.stopPropagation(); openBooking(partner) }}
                >
                  {partner.available ? 'Reservar' : 'Ver agenda'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Booking modal */}
      {bookingStep !== null && selectedPartner && (
        <div className="fixed inset-0 z-50 flex flex-col" style={{ maxWidth: 430, margin: '0 auto' }}>
          <div className="absolute inset-0 bg-black/40" onClick={() => setBookingStep(null)} />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl overflow-hidden" style={{ maxHeight: '85dvh' }}>
            {/* Progress steps */}
            <div className="px-5 pt-5 pb-4 border-b border-petlife-border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-petlife-dark font-bold text-base">Reservar cita</h2>
                <button onClick={() => setBookingStep(null)} className="p-1 tap-active">
                  <X size={20} color="#94A3B8" />
                </button>
              </div>
              <div className="flex items-center gap-2">
                {steps.map((step, i) => (
                  <div key={step} className="flex items-center gap-2 flex-1">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        i < bookingStep ? 'bg-green-400 text-white' :
                        i === bookingStep ? 'bg-petlife-primary text-white' : 'bg-petlife-light text-petlife-mid'
                      }`}>
                        {i < bookingStep ? '✓' : i + 1}
                      </div>
                      <span className={`text-xs font-semibold ${i === bookingStep ? 'text-petlife-primary' : 'text-petlife-mid'}`}>{step}</span>
                    </div>
                    {i < steps.length - 1 && <div className={`h-0.5 flex-1 rounded ${i < bookingStep ? 'bg-green-400' : 'bg-petlife-border'}`} />}
                  </div>
                ))}
              </div>
            </div>

            <div className="overflow-y-auto hide-scrollbar p-5" style={{ maxHeight: '60dvh' }}>
              {/* Step 0: Service selection */}
              {bookingStep === 0 && (
                <div className="space-y-3">
                  <p className="text-petlife-dark font-semibold text-sm mb-4">{selectedPartner.name}</p>
                  {selectedPartner.specialties.map(s => (
                    <button key={s} onClick={() => setBookingStep(1)} className="w-full flex items-center gap-3 p-4 rounded-2xl border-2 border-petlife-border tap-active hover:border-petlife-primary transition-colors">
                      <div className="w-10 h-10 rounded-xl bg-petlife-primary-light flex items-center justify-center text-xl">{selectedPartner.icon}</div>
                      <div className="flex-1 text-left">
                        <p className="text-petlife-dark font-bold text-sm">{s}</p>
                        <p className="text-petlife-mid text-xs mt-0.5">{selectedPartner.price}</p>
                      </div>
                      <ChevronRight size={16} color="#94A3B8" />
                    </button>
                  ))}
                </div>
              )}

              {/* Step 1: Date & time */}
              {bookingStep === 1 && (
                <div>
                  <p className="text-petlife-dark font-semibold text-sm mb-4">Selecciona fecha</p>
                  <div className="scroll-tabs mb-5">
                    {dates.map(d => (
                      <button key={d.value} onClick={() => setSelectedDate(d.value)}
                        className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold tap-active transition-all ${
                          selectedDate === d.value ? 'bg-petlife-primary text-white' : 'bg-petlife-light text-petlife-mid'
                        }`}>
                        {d.label}
                      </button>
                    ))}
                  </div>
                  <p className="text-petlife-dark font-semibold text-sm mb-3">Horario disponible</p>
                  <div className="grid grid-cols-4 gap-2 mb-6">
                    {times.map(t => (
                      <button key={t} onClick={() => setSelectedTime(t)}
                        className={`py-2.5 rounded-xl text-sm font-bold tap-active transition-all ${
                          selectedTime === t ? 'bg-petlife-primary text-white shadow-md' : 'bg-petlife-light text-petlife-dark'
                        }`}>
                        {t}
                      </button>
                    ))}
                  </div>
                  <button
                    disabled={!selectedDate || !selectedTime}
                    onClick={() => setBookingStep(2)}
                    className="w-full py-4 rounded-2xl font-bold text-white text-base tap-active disabled:opacity-40"
                    style={{ background: '#21878F' }}>
                    Continuar
                  </button>
                </div>
              )}

              {/* Step 2: Confirmation */}
              {bookingStep === 2 && (
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={40} color="#22C55E" fill="#22C55E" />
                  </div>
                  <h3 className="text-petlife-dark font-bold text-lg mb-2">¡Reserva confirmada!</h3>
                  <p className="text-petlife-mid text-sm mb-6">Recibirás confirmación por push y email</p>

                  <div className="bg-petlife-light rounded-2xl p-4 text-left mb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{selectedPartner.icon}</span>
                      <div>
                        <p className="text-petlife-dark font-bold text-sm">{selectedPartner.name}</p>
                        <p className="text-petlife-mid text-xs">{selectedPartner.category}</p>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-sm">
                        <span className="text-petlife-mid">Mascota</span>
                        <span className="text-petlife-dark font-semibold">Max 🐕</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-petlife-mid">Fecha</span>
                        <span className="text-petlife-dark font-semibold">{selectedDate || '20 jun 2025'}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-petlife-mid">Hora</span>
                        <span className="text-petlife-primary font-bold">{selectedTime || '10:00'}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => { setBookingStep(null); navigate('/home') }}
                    className="w-full py-4 rounded-2xl font-bold text-white tap-active"
                    style={{ background: '#21878F' }}>
                    Ver en inicio
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </MobileLayout>
  )
}
