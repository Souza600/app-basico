import { useBooking } from '../context/BookingContext'
import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabaseClient'

export default function ConfirmBooking() {
  const {
    selectedService, selectedBarber, selectedDatetime,
    name, contact
  } = useBooking()
  const [saving, setSaving] = useState(true)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  // Troque para o número do WhatsApp da barbearia fictícia/exemplo
  const whatsappNumber = '5500000000000'
  const resumoMsg = `Olá, gostaria de confirmar meu agendamento para ${new Date(selectedDatetime).toLocaleString()} com ${selectedBarber}, serviço ${selectedService?.name}. Nome: ${name}, Contato: ${contact}`

  useEffect(() => {
    async function salvarBooking() {
      setSaving(true)
      setError('')
      const { error } = await supabase.from('bookings').insert({
        name, contact,
        barber: selectedBarber,
        service_id: selectedService?.id,
        datetime: selectedDatetime,
        status: 'scheduled'
      })
      setSaving(false)
      if (!error) setSuccess(true)
      else setError(error.message)
    }
    if (selectedService && selectedBarber && selectedDatetime && name && contact)
      salvarBooking()
  }, [selectedService, selectedBarber, selectedDatetime, name, contact])

  if (saving) {
    return (
      <div className="mobile-container" style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg,#181818 65%,#FFD70011)',
        display:'flex',justifyContent:'center',alignItems:'center'
      }}>
        <div style={{ color:'#FFD700', textAlign:'center', fontSize:22 }}>Salvando agendamento...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mobile-container" style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg,#181818 65%,#FFD70011)',
        display:'flex',justifyContent:'center',alignItems:'center'
      }}>
        <div style={{ color:'red', textAlign:'center', fontSize:18 }}>Erro ao salvar agendamento: {error}</div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="mobile-container" style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg,#181818 65%,#FFD70011)',
        display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'
      }}>
        <img src="/whatsapp.svg" alt="Whatsapp" style={{ width: 62, marginBottom: 18 }} />
        <h2 style={{
          fontFamily: "Bebas Neue, Montserrat, sans-serif",
          fontSize: 34,
          color: "#25D366",
          textAlign: "center",
          marginBottom: 12
        }}>
          Agendamento realizado!
        </h2>
        <div style={{
          background:'#222', color:'#fff', borderRadius:16, padding:18, marginBottom:18,
          boxShadow:'0 3px 22px #0003', width:'100%', maxWidth:340, textAlign:'center'
        }}>
          <div style={{fontWeight:700, fontSize:18}}>{selectedService?.name}</div>
          <div style={{margin:'8px 0',color:'#FFD700'}}>
            {new Date(selectedDatetime).toLocaleString()}
          </div>
          <div style={{fontWeight:500, fontSize:15}}>Barbeiro: <span style={{color:'#FFD700'}}>{selectedBarber}</span></div>
          <div style={{fontSize:14,margin:'10px 0 0 0'}}>
            Cliente: <b>{name}</b><br/>
            Contato: <span>{contact}</span>
          </div>
        </div>
        <a
          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(resumoMsg)}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding:'14px 46px',
            background:'#25D366',
            color:'#191919',
            borderRadius:50,
            fontWeight:800,
            fontSize:18,
            textDecoration:'none',
            boxShadow:'0 1px 14px #25d36644',
          }}
        >
          Confirmar via WhatsApp
        </a>
        <div style={{color:'#FFD700',fontSize:12,marginTop:18,textAlign:'center'}}>Basta clicar e enviar a mensagem no WhatsApp.</div>
      </div>
    )
  }

  return null
}
