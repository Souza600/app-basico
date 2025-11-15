import { useNavigate } from 'react-router-dom'
import { useBooking } from '../context/BookingContext'
import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabaseClient'
import '../App.css'

// SVG tesoura como componente para uso direto
function ScissorIcon({ size = 32, color = "#3fbdfa", style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <line x1="20" y1="4" x2="8.12" y2="15.88" />
      <line x1="14.47" y1="14.48" x2="20" y2="20" />
      <line x1="8.12" y1="8.12" x2="12" y2="12" />
    </svg>
  )
}

export default function SelectService() {
  const navigate = useNavigate()
  const { setSelectedService } = useBooking()
  const [services, setServices] = useState([])
  const [selectedServices, setSelectedServices] = useState([])

  useEffect(() => {
    supabase.from('services').select('id, name, price').then(({ data }) => setServices(data))
  }, [])

  function toggleService(service) {
    setSelectedServices(prev =>
      prev.some(s => s.id === service.id)
        ? prev.filter(s => s.id !== service.id)
        : [...prev, service]
    )
  }
  function handleContinue() {
    setSelectedService(selectedServices)
    navigate('/barbeiro')
  }
  const total = selectedServices.reduce((a, s) => a + parseFloat(s.price ?? 0), 0)
  return (
    <div style={{
      minHeight: '100vh',
      padding: '38px 0',
      width: '100%',
      background: 'var(--background-main)',
      display: 'flex', flexDirection: 'column', alignItems: 'center'
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 34
      }}>
        <ScissorIcon size={34} color="#3fbdfa" style={{ marginRight: 10 }} />
        <h2 className="titulo-grande" style={{ margin: 0 }}>Escolha seus serviços</h2>
      </div>
      <div className="servicos-grid" style={{ width: '100%', margin: 0 }}>
        {services.map(s => (
          <div
            key={s.id}
            className={`card-servico${selectedServices.some(sel => sel.id === s.id) ? ' selecionado' : ''}`}
            onClick={() => toggleService(s)}
          >
            <ScissorIcon size={22} color={selectedServices.some(sel => sel.id === s.id) ? "#3fbdfa" : "#ffffff"} style={{ marginBottom:10 }}/>
            <div style={{
              fontWeight: 700,
              fontSize: 15,
              marginBottom: 7
            }}>{s.name}</div>
            <div style={{
              color: 'var(--border-accent)',
              fontWeight: 600,
              fontSize: 15,
              marginBottom: 10
            }}>
              R$ {Number(s.price).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
      <div className="lista-servicos">
        <div style={{
          fontWeight: 700,
          fontSize: 16,
          color: 'var(--accent)',
          marginBottom: 6
        }}>Serviços selecionados:</div>
        <ul>
          {selectedServices.map(s => (
            <li key={s.id} style={{ fontSize: 15 }}>
              {s.name} — R$ {Number(s.price).toFixed(2)}
            </li>
          ))}
          {selectedServices.length === 0 &&
            <li style={{ color: '#888' }}>Nenhum serviço selecionado</li>
          }
        </ul>
        <div className="total">Total: R$ {total.toFixed(2)}</div>
        <button
          disabled={selectedServices.length === 0}
          onClick={handleContinue}>
          Continuar
        </button>
      </div>
    </div>
  )
}
