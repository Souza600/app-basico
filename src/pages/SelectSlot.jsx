import { useBooking } from '../context/BookingContext'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../utils/supabaseClient'
import '../App.css'

function gerarSlotsDoDia(dataStr) {
  const slots = []
  for (let hora = 8; hora < 12; hora++) {
    slots.push(`${hora.toString().padStart(2, '0')}:00`)
    slots.push(`${hora.toString().padStart(2, '0')}:30`)
  }
  slots.push('12:00')
  for (let hora = 13; hora < 21; hora++) {
    if (hora === 13) slots.push('13:30');
    else {
      slots.push(`${hora.toString().padStart(2, '0')}:00`)
      slots.push(`${hora.toString().padStart(2, '0')}:30`)
    }
  }
  slots.push('21:00');
  return slots.map(horario => `${dataStr}T${horario}:00`)
}

export default function SelectSlot() {
  const { selectedService, selectedBarber, setSelectedDatetime, name, setName, contact, setContact } = useBooking()
  const [data, setData] = useState(() => new Date().toISOString().split('T')[0])
  const [bookedSlots, setBookedSlots] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    supabase
      .from('bookings')
      .select('datetime')
      .eq('barber', selectedBarber)
      .gte('datetime', `${data}T00:00:00`).lte('datetime', `${data}T23:59:59`)
      .then(({ data: agendados }) => {
        setBookedSlots(agendados ? agendados.map(a => a.datetime.slice(0,16)) : [])
        setLoading(false)
      })
  }, [data, selectedBarber])

  if (!selectedService || !selectedBarber) {
    return (
      <div className="mobile-container" style={{ padding: 34 }}>
        Selecione o serviço e o barbeiro primeiro.
      </div>
    )
  }

  const slots = gerarSlotsDoDia(data)
  const slotsLivres = slots.filter(slot => !bookedSlots.includes(slot))

  function handleAgendar(slot) {
    if (!name || !contact) {
      setMessage('Preencha nome e contato')
      return
    }
    setSelectedDatetime(slot)
    navigate('/confirmar')
  }

  return (
    <div className="mobile-container" style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg,#181818 65%,#FFD70011)',
      paddingTop: 28
    }}>
      <h2 className="titulo-grande" style={{ marginBottom: 18 }}>
        Escolha seu horário
      </h2>
      <div style={{ textAlign:'center', marginBottom:14 }}>
        <label style={{ color:'#FFD700', fontWeight:600, fontSize:15 }}>
          Data:
          <input type="date" value={data}
            onChange={e => setData(e.target.value)}
            style={{
              marginLeft:13, padding:6, borderRadius:6,
              border:'1px solid #FFD700', color:'#181818', fontWeight:700
            }}/>
        </label>
      </div>
      <div style={{ textAlign:'center', marginBottom:16 }}>
        <input placeholder="Seu nome" value={name} onChange={e => setName(e.target.value)}
          style={{
            padding:9, margin:4, border:'none', borderRadius:7,
            width:'90%', maxWidth:360, marginBottom:5
          }} />
        <input placeholder="Telefone ou e-mail" value={contact} onChange={e => setContact(e.target.value)}
          style={{
            padding:9, margin:4, border:'none', borderRadius:7,
            width:'90%', maxWidth:360
          }} />
      </div>
      {loading
        ? <p style={{textAlign:'center', color:'#FFD700'}}>Carregando horários...</p>
        : slotsLivres.length === 0
          ? <div style={{ color:'#FFD700', textAlign:'center', fontWeight:600 }}>Nenhum horário disponível para este dia.</div>
          : <div className="horarios-grid">
              {slotsLivres.map(slot =>
                <button key={slot}
                  onClick={() => handleAgendar(slot)}
                  style={{
                    background:'#FFD700', color:'#191919', border:'none',
                    borderRadius:8, padding:'14px 0',
                    fontWeight:700, fontSize:15,
                    boxShadow:'0 2px 10px #0001',
                    width:'70px', minHeight:'42px', margin:0
                  }}>
                  {new Date(slot).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </button>
              )}
            </div>
      }
      {message && <p style={{ color: 'red', textAlign:'center', marginTop:10 }}>{message}</p>}
    </div>
  )
}
