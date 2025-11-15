import { BookingProvider } from './context/BookingContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Welcome from './pages/Welcome'
import SelectService from './pages/SelectService'
import SelectBarber from './pages/SelectBarber'
import SelectSlot from './pages/SelectSlot'
import ConfirmBooking from './pages/ConfirmBooking'
import './App.css'

function App() {
  return (
    <BookingProvider>
      <Router>
        <div className="mobile-container">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/servico" element={<SelectService />} />
            <Route path="/barbeiro" element={<SelectBarber />} />
            <Route path="/horario" element={<SelectSlot />} />
            <Route path="/confirmar" element={<ConfirmBooking />} />
          </Routes>
        </div>
      </Router>
    </BookingProvider>
  )
}

export default App
