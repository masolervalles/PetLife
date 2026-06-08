import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Search, Filter, Edit2, Trash2, Check, ChevronDown } from 'lucide-react'

const allReservations = [
  { id: 1, client: 'Manisaral',   pet: 'Labrador',    service: 'Servicio',     state: 'confirmed', date: '20 jun', time: '09:00' },
  { id: 2, client: 'Mascatra',    pet: 'Veterinaria',  service: 'Peluquería',   state: 'pending',   date: '20 jun', time: '10:30' },
  { id: 3, client: 'Masssca',     pet: 'Perro',        service: 'Pelunaría',    state: 'confirmed', date: '20 jun', time: '11:00' },
  { id: 4, client: 'Dadlinna',    pet: 'Profesionales',service: 'Veterinaria',  state: 'pending',   date: '21 jun', time: '09:00' },
  { id: 5, client: 'Genkile',     pet: 'Perro',        service: 'Servicio',     state: 'confirmed', date: '21 jun', time: '10:00' },
  { id: 6, client: 'Snumtloris',  pet: 'Peluquería',   service: 'Servicio',     state: 'pending',   date: '21 jun', time: '11:30' },
  { id: 7, client: 'Aina Sernan', pet: 'Perro',        service: 'Veterinaria',  state: 'cancelled', date: '22 jun', time: '09:00' },
  { id: 8, client: 'Paula Roca',  pet: 'Gato',         service: 'Consulta',     state: 'confirmed', date: '22 jun', time: '10:00' },
  { id: 9, client: 'Tomás Gil',   pet: 'Conejo',       service: 'Revisión',     state: 'pending',   date: '23 jun', time: '09:30' },
]

type State = 'confirmed' | 'pending' | 'cancelled'

const statusConfig: Record<State, { bg: string; text: string; border: string; label: string }> = {
  confirmed: { bg: '#DCFCE7', text: '#166534', border: '#86EFAC', label: 'Confirmada' },
  pending:   { bg: '#FEF9C3', text: '#854D0E', border: '#FDE047', label: 'Pendiente' },
  cancelled: { bg: '#FEE2E2', text: '#991B1B', border: '#FCA5A5', label: 'Cancelada' },
}

const stateFilters = ['Todas', 'Confirmadas', 'Pendientes', 'Canceladas']
const stateMap: Record<string, State | null> = {
  'Todas': null, 'Confirmadas': 'confirmed', 'Pendientes': 'pending', 'Canceladas': 'cancelled'
}

export default function PartnerReservas() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [filterState, setFilterState] = useState('Todas')
  const [reservations, setReservations] = useState(allReservations)

  const filtered = reservations.filter(r => {
    const matchSearch = r.client.toLowerCase().includes(search.toLowerCase()) ||
                        r.service.toLowerCase().includes(search.toLowerCase())
    const targetState = stateMap[filterState]
    const matchState = targetState === null || r.state === targetState
    return matchSearch && matchState
  })

  const updateState = (id: number, newState: State) => {
    setReservations(prev => prev.map(r => r.id === id ? { ...r, state: newState } : r))
  }

  const deleteReservation = (id: number) => {
    setReservations(prev => prev.filter(r => r.id !== id))
  }

  return (
    <div className="min-h-dvh bg-petlife-light flex flex-col">
      {/* Header */}
      <div className="bg-white px-5 pt-10 pb-4 border-b border-petlife-border sticky top-0 z-40">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate('/partner')} className="p-2 rounded-xl bg-petlife-light tap-active">
            <ArrowLeft size={20} color="#1A2A3A" />
          </button>
          <h1 className="text-petlife-dark font-bold text-xl flex-1">Gestión de Reservas</h1>
          <button className="p-2 rounded-xl bg-petlife-light tap-active">
            <Filter size={18} color="#21878F" />
          </button>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 bg-petlife-light rounded-xl px-3 py-2.5 mb-3">
          <Search size={16} color="#94A3B8" />
          <input
            className="flex-1 bg-transparent text-sm text-petlife-dark placeholder-slate-400 outline-none"
            placeholder="Buscar cliente o servicio..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* State filter tabs */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
          {stateFilters.map(f => (
            <button
              key={f}
              onClick={() => setFilterState(f)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold tap-active transition-all ${
                filterState === f ? 'bg-petlife-primary text-white' : 'bg-petlife-light text-petlife-mid'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Summary stats */}
      <div className="px-5 py-3 flex gap-3">
        {[
          { label: 'Total', count: reservations.length, color: '#21878F' },
          { label: 'Confirmadas', count: reservations.filter(r=>r.state==='confirmed').length, color: '#22C55E' },
          { label: 'Pendientes',  count: reservations.filter(r=>r.state==='pending').length,   color: '#EAB308' },
          { label: 'Canceladas',  count: reservations.filter(r=>r.state==='cancelled').length, color: '#EF4444' },
        ].map(s => (
          <div key={s.label} className="flex-1 bg-white rounded-xl p-2 shadow-card text-center">
            <p className="font-bold text-base" style={{ color: s.color }}>{s.count}</p>
            <p className="text-[9px] text-petlife-mid font-semibold">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Table header */}
      <div className="mx-5 bg-petlife-primary rounded-t-2xl">
        <div className="grid grid-cols-12 px-4 py-3 text-white text-xs font-bold gap-2">
          <span className="col-span-3">Cliente</span>
          <span className="col-span-2">Mascota</span>
          <span className="col-span-2">Servicio</span>
          <span className="col-span-2">Hora</span>
          <span className="col-span-2">Estado</span>
          <span className="col-span-1">⚙️</span>
        </div>
      </div>

      {/* Table rows */}
      <div className="mx-5 bg-white rounded-b-2xl shadow-card overflow-hidden mb-6">
        {filtered.length === 0 ? (
          <div className="py-12 text-center text-petlife-mid text-sm">Sin resultados</div>
        ) : (
          filtered.map((r, i) => {
            const s = statusConfig[r.state as State]
            return (
              <div
                key={r.id}
                className={`grid grid-cols-12 px-4 py-3 gap-2 items-center text-xs tap-active ${i % 2 === 0 ? 'bg-white' : 'bg-petlife-light/40'} border-b border-petlife-border last:border-0`}
              >
                <div className="col-span-3 flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded-full bg-petlife-primary-light flex items-center justify-center text-xs font-bold text-petlife-primary flex-shrink-0">
                    {r.client[0]}
                  </div>
                  <span className="text-petlife-dark font-semibold truncate text-[11px]">{r.client}</span>
                </div>
                <div className="col-span-2 text-petlife-mid truncate text-[11px]">{r.pet}</div>
                <div className="col-span-2 text-petlife-mid truncate text-[11px]">{r.service}</div>
                <div className="col-span-2">
                  <p className="text-petlife-dark font-bold text-[11px]">{r.time}</p>
                  <p className="text-petlife-mid text-[9px]">{r.date}</p>
                </div>
                <div className="col-span-2">
                  <span
                    className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold"
                    style={{ background: s.bg, color: s.text }}
                  >
                    {s.label}
                  </span>
                </div>
                <div className="col-span-1 flex items-center gap-1">
                  {r.state === 'pending' && (
                    <button
                      onClick={() => updateState(r.id, 'confirmed')}
                      className="p-1 rounded-lg bg-green-100 tap-active"
                      title="Confirmar"
                    >
                      <Check size={11} color="#166534" strokeWidth={3} />
                    </button>
                  )}
                  {r.state !== 'cancelled' && (
                    <button
                      onClick={() => deleteReservation(r.id)}
                      className="p-1 rounded-lg bg-red-50 tap-active"
                      title="Cancelar"
                    >
                      <Trash2 size={11} color="#991B1B" />
                    </button>
                  )}
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Footer info */}
      <div className="px-5 pb-8 text-center">
        <p className="text-petlife-mid text-xs">{filtered.length} reservas mostradas</p>
      </div>
    </div>
  )
}
