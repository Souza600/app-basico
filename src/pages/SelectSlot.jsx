import { useBooking } from '../context/BookingContext'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../utils/supabaseClient'
import '../App.css'

const BARBER_WHATS = {
  'João': '5599999999999',
  'Lucas': '5588888888888'
}

export default function SelectSlot() {
  const {
    selectedService, selectedBarber, setSelectedDatetime,
    name, setName
  } = useBooking()
  const [data, setData] = useState(() => new Date().toISOString().split('T')[0])
  const [bookedSlots, setBookedSlots] = useState([])
  const [loading, setLoading] = useState(false)
  const [slotEscolhido, setSlotEscolhido] = useState('')
  const [message, setMessage] = useState('')

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
    setSlotEscolhido('')
    setMessage('')
  }, [data, selectedBarber])

  if (!selectedService || !selectedBarber) {
    return (
      <div className="mobile-container" style={{ padding: 34 }}>
        Selecione o serviço e o barbeiro primeiro.
      </div>
    )
  }

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
    slots.push('21:00')
    return slots.map(horario => `${dataStr}T${horario}:00`)
  }

  const slots = gerarSlotsDoDia(data)
  const slotsLivres = slots.filter(slot => !bookedSlots.includes(slot))

  function handleConfirmar() {
    if (!name) {
      setMessage('Preencha seu nome')
      return
    }
    if (!slotEscolhido) {
      setMessage('Selecione um horário')
      return
    }
    setSelectedDatetime(slotEscolhido)
    const phone = BARBER_WHATS[selectedBarber] || ''
    const infoServico = Array.isArray(selectedService)
      ? selectedService.map(s => s.name).join(', ')
      : (selectedService?.name || '')
    const texto = `Olá, gostaria de agendar ${infoServico} com ${selectedBarber} no dia ${new Date(slotEscolhido).toLocaleString()} - Nome: ${name}`
    window.location.href = `https://wa.me/${phone}?text=${encodeURIComponent(texto)}`
  }

  return (
    <div className="mobile-container" style={{
      minHeight: '100vh', background: 'var(--background-main)',
      display: 'flex', flexDirection: 'column', alignItems: 'center'
    }}>
      <h2 className="titulo-grande" style={{ marginBottom: 16 }}>
        Escolha seu horário
      </h2>
      <div style={{ textAlign:'center', marginBottom:10 }}>
        <label style={{ color:'var(--accent)', fontWeight:600, fontSize:15 }}>
          Data:
          <input type="date" value={data}
            onChange={e => setData(e.target.value)}
            style={{
              marginLeft:13, padding:6, borderRadius:6,
              border:'1.5px solid var(--accent)', color:'#181818', fontWeight:700
            }}/>
        </label>
      </div>
      {!loading ? (
        slotsLivres.length === 0 ? (
          <div style={{ color:'var(--accent)', textAlign:'center', fontWeight:600 }}>Nenhum horário disponível para este dia.</div>
        ) : (
          <div>
            <div
              className="horarios-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 7,
                maxWidth: 500,
                margin: '0 auto 18px auto'
              }}
            >
              {slotsLivres.map(slot =>
                <button
                  key={slot}
                  onClick={() => setSlotEscolhido(slot)}
                  className="btn-horario"
                  style={{
                    background: slotEscolhido === slot ? 'var(--border-accent)' : 'var(--accent)',
                    color: '#232d48',
                    border: slotEscolhido === slot ? '2px solid #172534' : 'none',
                    fontWeight: 800,
                    fontSize: 14,
                    borderRadius: 8,
                    minWidth: 0,
                    maxWidth: 80,
                    minHeight: 31,
                    padding: 0,
                    transition: 'background 0.18s, border 0.18s'
                  }}
                >
                  {new Date(slot).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </button>
              )}
            </div>
            <div style={{
              width: '100%',
              maxWidth: 370,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              margin: '18px 0'
            }}>
              <input
                placeholder="Seu nome"
                value={name}
                onChange={e => setName(e.target.value)}
                style={{ padding: 9, margin: 4, borderRadius:7, width: '95%', maxWidth: 320 }}
              />
              <button
                onClick={handleConfirmar}
                style={{
                  marginTop: 13,
                  background: 'var(--border-accent)',
                  color: '#191919',
                  borderRadius: 8,
                  border: 'none',
                  fontSize: 18, fontWeight: 800, padding: '9px 30px',
                  cursor: 'pointer', boxShadow: '0 2px 8px #0002'
                }}>
                Confirmar agendamento
              </button>
              {message && (
                <p style={{ color: 'red', textAlign: 'center', marginTop: 9 }}>
                  {message}
                </p>
              )}
            </div>
          </div>
        )
      ) : (
        <p style={{textAlign:'center', color:'var(--accent)'}}>Carregando horários...</p>
      )}
    </div>
  )
}
