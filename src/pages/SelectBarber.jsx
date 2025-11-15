import { useNavigate } from 'react-router-dom'
import { useBooking } from '../context/BookingContext'

const barbers = [
  {
    id: 1,
    name: 'João',
    nickname: 'Navalha de Ouro',
    avatar: '/barber-joao.svg', // Troque pelo SVG ou JPG na pasta public/
    specialty: 'Fade, clássico',
  },
  {
    id: 2,
    name: 'Lucas',
    nickname: 'Clean Fade',
    avatar: '/barber-lucas.svg', // Troque pelo SVG ou JPG na pasta public/
    specialty: 'Moderno, freestyle',
  },
]

export default function SelectBarber() {
  const navigate = useNavigate()
  const { setSelectedBarber } = useBooking()

  function handleSelect(barber) {
    setSelectedBarber(barber.name)
    navigate('/horario')
  }

  return (
    <div className="mobile-container" style={{
      minHeight: '100vh',
      background: 'linear-gradient(125deg,#181818 70%,#FFD70011)',
      padding: '36px 0'
    }}>
      <h2 style={{
        fontFamily: 'Bebas Neue, Montserrat, sans-serif',
        fontSize: 32,
        color: '#FFD700',
        textAlign: 'center',
        marginBottom: 32
      }}>
        Escolha seu barbeiro
      </h2>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 28
      }}>
        {barbers.map(b => (
          <div key={b.id} style={{
            background: 'rgba(25,25,25,0.97)',
            color: '#fff',
            borderRadius: 20,
            boxShadow: '0 2px 12px #0006',
            width: '100%',
            maxWidth: 340,
            padding: 27,
            display: 'flex',
            alignItems: 'center',
            gap: 18
          }}>
            <img src={b.avatar} alt={b.name}
              style={{ width: 66, height: 66, borderRadius: '50%', background: '#222' }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 20, fontWeight: 700 }}>{b.name}</div>
              <span style={{ fontSize: 15, color: '#FFD700', fontWeight: 500 }}>{b.nickname}</span>
              <div style={{ fontSize: 14, color: '#DDD' }}>{b.specialty}</div>
            </div>
            <button onClick={() => handleSelect(b)}
              style={{
                background: '#FFD700',
                color: '#191919',
                borderRadius: 7,
                border: 'none',
                fontSize: 16,
                fontWeight: 700,
                padding: '9px 18px',
                cursor: 'pointer'
              }}>
              Selecionar
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
