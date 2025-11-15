import { useNavigate } from 'react-router-dom'
import { useBooking } from '../context/BookingContext'
import '../App.css'

// SVG avatar masculino
function BarberIcon({ size = 40, color = "#3fbdfa", style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={style}>
      <ellipse cx="16" cy="16" rx="14" ry="13" stroke={color} strokeWidth="2.2" fill="none"/>
      <ellipse cx="16" cy="16" rx="7.5" ry="8.5" stroke={color} strokeWidth="1.4" fill="none"/>
      <circle cx="13" cy="16" r="2.1" fill={color}/>
      <circle cx="19" cy="16" r="2.1" fill={color}/>
      <path d="M12 21 Q16 26 20 21" stroke={color} strokeWidth="1.8" fill="none"/>
    </svg>
  )
}

const barbers = [
  {
    id: 1,
    name: 'João',
    nickname: 'Navalha de Ouro',
    specialty: 'Fade, clássico'
  },
  {
    id: 2,
    name: 'Lucas',
    nickname: 'Clean Fade',
    specialty: 'Moderno, freestyle'
  }
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
      paddingTop: 50,
      background: 'var(--background-main)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <h2 className="titulo-grande" style={{ marginBottom: 35 }}>
        Escolha o Barbeiro
      </h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 30,
        marginBottom: 42,
        width: '92%'
      }}>
        {barbers.map(b => (
          <div key={b.id}
            style={{
              background: 'var(--background-card)',
              borderRadius: 14,
              boxShadow: '0 4px 18px #0004',
              padding: 20,
              color: 'var(--primary)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              border: `2px solid var(--border-accent)`,
              transition: 'background 0.18s'
            }}
            onClick={() => handleSelect(b)}
          >
            <BarberIcon size={47} color="#3fbdfa" style={{ marginBottom: 10 }}/>
            <div style={{ fontWeight: 700, fontSize: 20 }}>{b.name}</div>
            <div style={{ color: 'var(--accent)', fontWeight: 700, fontSize: 14, marginBottom: 3 }}>
              {b.nickname}
            </div>
            <div style={{ fontSize: 13, color: 'var(--secondary)', fontWeight: 600 }}>
              {b.specialty}
            </div>
            <button style={{
              background: 'var(--accent)',
              color: '#fff',
              marginTop: 15,
              border: 'none',
              fontWeight: 700,
              fontSize: 16,
              borderRadius: 7,
              padding: '8px 18px',
              boxShadow: '0 1px 10px #071c28',
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
