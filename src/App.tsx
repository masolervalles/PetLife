import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Splash from './pages/Splash'
import Home from './pages/Home'
import MascotaProfile from './pages/MascotaProfile'
import Reservas from './pages/Reservas'
import Mapa from './pages/Mapa'
import PetLifePlus from './pages/PetLifePlus'
import Comunidad from './pages/Comunidad'
import PartnerDashboard from './pages/partner/Dashboard'
import PartnerReservas from './pages/partner/GestionReservas'

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/home" element={<Home />} />
          <Route path="/mascota" element={<MascotaProfile />} />
          <Route path="/reservas" element={<Reservas />} />
          <Route path="/mapa" element={<Mapa />} />
          <Route path="/premium" element={<PetLifePlus />} />
          <Route path="/comunidad" element={<Comunidad />} />
          <Route path="/partner" element={<PartnerDashboard />} />
          <Route path="/partner/reservas" element={<PartnerReservas />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
