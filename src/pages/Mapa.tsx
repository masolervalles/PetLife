import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Navigation, X, Star, MapPin, Clock } from 'lucide-react'
import MobileLayout from '../components/MobileLayout'

const categories = [
  { id: 'all',       label: 'Todos',       color: '#21878F' },
  { id: 'vet',       label: 'Veterinarias', color: '#21878F' },
  { id: 'service',   label: 'Servicios',   color: '#F3705C' },
  { id: 'shop',      label: 'Tiendas',     color: '#D4A757' },
]

const places = [
  { id: 1, type: 'vet',     name: 'Clínica Norte Valencia', rating: 4.9, distance: '0.8 km', open: true,  icon: '🏥', x: 47, y: 38, price: 'Desde 40€' },
  { id: 2, type: 'service', name: 'Paws Style Peluquería',  rating: 4.7, distance: '1.2 km', open: true,  icon: '✂️', x: 28, y: 55, price: 'Desde 25€' },
  { id: 3, type: 'shop',    name: 'PetShop Valencia',       rating: 4.5, distance: '0.4 km', open: true,  icon: '🛒', x: 68, y: 45, price: '' },
  { id: 4, type: 'vet',     name: 'Clínica Sur Mascotas',   rating: 4.6, distance: '1.8 km', open: false, icon: '🏥', x: 35, y: 72, price: 'Desde 35€' },
  { id: 5, type: 'service', name: 'Happy Paws Guardería',   rating: 4.8, distance: '0.5 km', open: true,  icon: '🏠', x: 72, y: 68, price: 'Desde 20€/día' },
  { id: 6, type: 'shop',    name: 'Nutrición Canina',       rating: 4.4, distance: '2.0 km', open: true,  icon: '🦴', x: 55, y: 22, price: '' },
]

const typeColors: Record<string, string> = {
  vet: '#21878F', service: '#F3705C', shop: '#D4A757'
}

export default function Mapa() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedPlace, setSelectedPlace] = useState<typeof places[0] | null>(null)

  const filteredPlaces = places.filter(p => activeCategory === 'all' || p.type === activeCategory)

  return (
    <MobileLayout noPadding>
      {/* Search bar overlay */}
      <div className="absolute top-0 left-0 right-0 z-30 px-4 pt-12 pb-3">
        <div className="bg-white rounded-2xl shadow-card-hover flex items-center gap-2 px-4 py-3">
          <Search size={17} color="#94A3B8" />
          <input
            className="flex-1 text-sm text-petlife-dark placeholder-slate-400 outline-none bg-transparent"
            placeholder="Buscar veterinarios, tiendas..."
            readOnly
          />
          <button className="p-1.5 bg-petlife-primary rounded-lg tap-active">
            <Navigation size={14} color="white" />
          </button>
        </div>
      </div>

      {/* Category tabs */}
      <div className="absolute z-30 left-0 right-0 px-4" style={{ top: 100 }}>
        <div className="scroll-tabs">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold tap-active transition-all shadow-sm ${
                activeCategory === cat.id ? 'text-white' : 'bg-white text-petlife-mid'
              }`}
              style={activeCategory === cat.id ? { background: cat.color } : {}}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Map area */}
      <div className="absolute inset-0 map-bg" onClick={() => setSelectedPlace(null)}>
        {/* Mock roads */}
        <div className="map-road-h" style={{ left: '0%', right: '0%', top: '30%' }} />
        <div className="map-road-h" style={{ left: '0%', right: '0%', top: '50%', height: 12 }} />
        <div className="map-road-h" style={{ left: '0%', right: '0%', top: '70%' }} />
        <div className="map-road-v" style={{ top: '0%', bottom: '0%', left: '30%' }} />
        <div className="map-road-v" style={{ top: '0%', bottom: '0%', left: '55%', width: 12 }} />
        <div className="map-road-v" style={{ top: '0%', bottom: '0%', left: '78%' }} />
        {/* Green park areas */}
        <div className="absolute rounded-xl opacity-60" style={{ background: '#C8E6C9', left: '60%', top: '15%', width: 80, height: 60 }} />
        <div className="absolute rounded-xl opacity-60" style={{ background: '#C8E6C9', left: '10%', top: '55%', width: 60, height: 50 }} />

        {/* Location pins */}
        {filteredPlaces.map(place => (
          <button
            key={place.id}
            className="absolute tap-active transform -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-110"
            style={{ left: `${place.x}%`, top: `${place.y}%` }}
            onClick={e => { e.stopPropagation(); setSelectedPlace(place) }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-lg border-2 border-white transition-all"
              style={{
                background: typeColors[place.type],
                transform: selectedPlace?.id === place.id ? 'scale(1.2)' : 'scale(1)',
                boxShadow: selectedPlace?.id === place.id ? `0 4px 20px ${typeColors[place.type]}80` : undefined,
              }}
            >
              {place.icon}
            </div>
            {!place.open && (
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-slate-400 border border-white" />
            )}
          </button>
        ))}

        {/* My location */}
        <div className="absolute transform -translate-x-1/2 -translate-y-1/2" style={{ left: '50%', top: '50%' }}>
          <div className="w-5 h-5 rounded-full bg-petlife-primary border-3 border-white shadow-lg flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white" />
          </div>
          <div className="absolute inset-0 rounded-full bg-petlife-primary opacity-20 animate-ping" />
        </div>
      </div>

      {/* Legend */}
      <div className="absolute z-20 right-4 top-36 bg-white rounded-xl p-2 shadow-card space-y-1.5">
        {[
          { color: '#21878F', label: 'Vet' },
          { color: '#F3705C', label: 'Serv.' },
          { color: '#D4A757', label: 'Tienda' },
        ].map(l => (
          <div key={l.label} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ background: l.color }} />
            <span className="text-[10px] font-semibold text-petlife-mid">{l.label}</span>
          </div>
        ))}
      </div>

      {/* Selected place card */}
      {selectedPlace && (
        <div className="absolute bottom-24 left-4 right-4 z-40">
          <div className="bg-white rounded-2xl shadow-card-hover p-4">
            <button className="absolute top-3 right-3 p-1 tap-active" onClick={() => setSelectedPlace(null)}>
              <X size={16} color="#94A3B8" />
            </button>
            <div className="flex items-start gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: typeColors[selectedPlace.type] + '20' }}
              >
                {selectedPlace.icon}
              </div>
              <div className="flex-1 pr-6">
                <h3 className="text-petlife-dark font-bold text-sm">{selectedPlace.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1">
                    <Star size={11} fill="#D4A757" color="#D4A757" />
                    <span className="text-xs font-bold text-petlife-dark">{selectedPlace.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={11} color="#94A3B8" />
                    <span className="text-xs text-petlife-mid">{selectedPlace.distance}</span>
                  </div>
                  <span className={`badge text-[10px] ${selectedPlace.open ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                    {selectedPlace.open ? 'Abierto' : 'Cerrado'}
                  </span>
                </div>
                {selectedPlace.price && (
                  <p className="text-petlife-mid text-xs mt-1">{selectedPlace.price}</p>
                )}
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <button className="flex-1 py-2.5 rounded-xl border border-petlife-primary text-petlife-primary font-bold text-sm tap-active">
                Cómo llegar
              </button>
              <button
                className="flex-1 py-2.5 rounded-xl text-white font-bold text-sm tap-active"
                style={{ background: '#21878F' }}
                onClick={() => navigate('/reservas')}
              >
                Reservar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom categories summary */}
      <div className="absolute bottom-24 left-4 right-4 z-20 pointer-events-none" style={{ display: selectedPlace ? 'none' : 'block' }}>
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-card">
          <div className="grid grid-cols-3 gap-2 text-center">
            {[
              { icon: '🏥', count: places.filter(p=>p.type==='vet').length,     label: 'Veterinarias', color: '#21878F' },
              { icon: '✂️', count: places.filter(p=>p.type==='service').length, label: 'Servicios',    color: '#F3705C' },
              { icon: '🛒', count: places.filter(p=>p.type==='shop').length,    label: 'Tiendas',      color: '#D4A757' },
            ].map(item => (
              <div key={item.label}>
                <p className="text-lg">{item.icon}</p>
                <p className="font-bold text-sm" style={{ color: item.color }}>{item.count}</p>
                <p className="text-[10px] text-petlife-mid">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MobileLayout>
  )
}
