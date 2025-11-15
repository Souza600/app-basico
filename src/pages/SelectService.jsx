import { useNavigate } from 'react-router-dom'
import { useBooking } from '../context/BookingContext'
import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabaseClient'
import '../App.css'

export default function SelectService() {
  const navigate = useNavigate()
  const { setSelectedService } = useBooking()
  const [services, setServices] = useState([])
  const [selectedServices, setSelectedServices] = useState([])

  useEffect(() => {
    supabase
      .from('services')
      .select('id, name, price')
      .then(({ data }) => setServices(data))
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

  const total = selectedServices.reduce(
    (a, s) => a + parseFloat(s.price ?? 0),
    0
  )

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg,#181818 70%,#FFD70022)',
      padding: '40px 0'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 36
      }}>
        <img src="/scissor.svg" alt="Tesoura" style={{
          width: 38,
          height: 38,
          marginRight: 12,
          filter: 'invert(1) brightness(2)' // deixa branco!
        }} />
        <h2 className="titulo-grande" style={{ margin: 0 }}>
          Escolha seus serviços
        </h2>
      </div>
      <div className="servicos-grid">
        {services.map(s => (
          <div
            key={s.id}
            style={{
              background: selectedServices.some(sel => sel.id === s.id)
                ? 'rgba(35,35,35,0.98)'
                : 'rgba(25,25,25,0.92)',
              border: selectedServices.some(sel => sel.id === s.id)
                ? '2px solid #FFD700'
                : '2px solid transparent',
              color: '#fff',
              padding: 18,
              borderRadius: 14,
              boxShadow: '0 4px 18px #0003',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              minWidth: 0,
              cursor: 'pointer'
            }}
            onClick={() => toggleService(s)}
          >
            <img
              src="/scissor.svg"
              alt="Serviço"
              style={{
                width: 26,
                marginBottom: 10,
                filter: 'invert(1) brightness(2)'
              }}
            />
            <div style={{
              fontWeight: 700,
              fontSize: 17,
              marginBottom: 7
            }}>{s.name}</div>
            <div style={{
              color: '#FFD700',
              fontWeight: 600,
              fontSize: 18,
              marginBottom: 13
            }}>
              R$ {Number(s.price).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
      <div style={{
        marginTop: 38,
        background: '#222',
        borderRadius: 10,
        boxShadow: '0 2px 18px #0003',
        color: '#fff',
        padding: '18px 22px',
        maxWidth: 350,
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
        <div style={{
          fontWeight: 700,
          fontSize: 17,
          marginBottom: 8,
          color: '#FFD700'
        }}>Serviços selecionados:</div>
        <ul style={{ paddingLeft: 16, marginBottom: 10 }}>
          {selectedServices.map(s => (
            <li key={s.id} style={{ fontSize: 15 }}>
              {s.name} — R$ {Number(s.price).toFixed(2)}
            </li>
          ))}
          {selectedServices.length === 0 &&
            <li style={{ color: '#888' }}>Nenhum serviço selecionado</li>
          }
        </ul>
        <div style={{
          fontWeight: 900,
          fontSize: 19,
          textAlign: 'right',
          color: '#FFD700'
        }}>
          Total: R$ {total.toFixed(2)}
        </div>
        <button
          disabled={selectedServices.length === 0}
          onClick={handleContinue}
          style={{
            marginTop: 16,
            background: selectedServices.length === 0 ? '#bbb' : '#FFD700',
            color: '#191919',
            borderRadius: 8,
            border: 'none',
            fontSize: 17,
            fontWeight: 800,
            padding: '10px 36px',
            cursor: selectedServices.length === 0 ? 'not-allowed' : 'pointer',
            boxShadow: '0 2px 8px #0002',
            width: '100%',
            maxWidth: 180,
            transition: 'background 0.2s'
          }}>
          Continuar
        </button>
      </div>
    </div>
  )
}
