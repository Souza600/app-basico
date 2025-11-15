import { useBooking } from '../context/BookingContext'
import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabaseClient'
import '../App.css'

// SVG de confirmação ("check")
function CheckIcon({ size = 38, color = "#46df9c", style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" style={style}>
      ircle cx="16" cy="16" r="15" fill="none" stroke={color} strokeWidthth="3"/>
      <polyline points="10,17 15,22 22,11" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
// SVG de erro
function ErrorIcon({ size = 32, color = "#fa315b", style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" style={style}>
      ircle cx="16" cy="16" r="15" fill="none" stroke={color} strokeWidthth="3"/>
      <line x1="10" y1="10" x2="22" y2="22" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <line x1="22" y1="10" x2="10" y2="22" stroke={color} strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

export default function ConfirmBooking() {
  const { selectedService, selectedBarber, selectedDatetime, name, contact } = useBooking()
  const [saving, setSaving] = useState(true)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const whatsappNumber = '5500000000000'
  const resumoMsg = `Olá, gostaria de confirmar meu agendamento para ${new Date(selectedDatetime).toLocaleString()} com ${selectedBarber}, serviço ${selectedService?.name}. Nome: ${name}, Contato: ${contact}`

  useEffect(() => {
    async function salvarBooking() {
      setSaving(true)
      setError('')
      const { error } = await supabase.from('bookings').insert({
        name, contact, barber: selectedBarber, service_id: selectedService?.id, datetime: selectedDatetime, status: 'scheduled'
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
        minHeight: "100vh", background: "var(--background-main)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"
      }}>
        <div style={{ color: "var(--accent)", fontWeight: 800, fontSize: 22, marginBottom: 25 }}>
          Confirmando Agendamento...
        </div>
        <div className="loader" style={{
          border: "3px solid var(--accent)", borderRadius: "50%",
          borderTopColor: "#232d48", width: 38, height: 38, animation: "spin 1s linear infinite"
        }} />
        <style>{`@keyframes spin {to {transform: rotate(360deg);} }`}</style>
      </div>
    )
  }

  return (
    <div className="mobile-container" style={{
      minHeight: "100vh", background: "var(--background-main)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"
    }}>
      <h2 className="titulo-grande" style={{ marginTop: 26, marginBottom: 20 }}>Confirmação</h2>
      {success && (
        <>
          <CheckIcon size={70} style={{ marginBottom: 18 }} />
          <div style={{
            background: "#232d48", color: "#fff", borderRadius: 14, boxShadow: "0 2px 14px #162337",
            padding: "24px 18px", textAlign: "center", maxWidth: 455
          }}>
            <div style={{ fontWeight: 700, fontSize: 19, marginBottom: 9 }}>Agendamento confirmado!</div>
            <div style={{ fontSize: 16, color: "var(--accent)", marginBottom: 6 }}>
              {new Date(selectedDatetime).toLocaleString()}
            </div>
            <div style={{ fontSize: 16, marginBottom: 6 }}>
              <b>Profissional</b>: {selectedBarber}
            </div>
            <div style={{ fontSize: 16, marginBottom: 6 }}>
              <b>Serviço</b>: {selectedService?.name}
            </div>
            <div style={{ color: "#9fd", marginBottom: 5 }}>
              <b>Cliente:</b> {name}, <b>Contato:</b> {contact}
            </div>
            <div style={{ fontSize: 14, color: "#cfd9e5", marginTop: 12 }}>
              Pronto! Você pode compartilhar no WhatsApp:
            </div>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(resumoMsg)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                background: "var(--accent)",
                color: "#fff",
                borderRadius: 7,
                fontWeight: 700,
                fontSize: 15,
                marginTop: 8,
                padding: "8px 22px",
                textDecoration: "none"
              }}
            >
              Enviar confirmação
            </a>
          </div>
        </>
      )}
      {!!error && (
        <>
          <ErrorIcon size={54} style={{ marginBottom: 12 }} />
          <div style={{
            background: "#232d48", color: "#fa315b", borderRadius: 14,
            boxShadow: "0 2px 14px #162337", padding: "22px 12px", fontSize: 16,
            textAlign: "center"
          }}>
            Erro ao agendar: {error}
          </div>
        </>
      )}
    </div>
  )
}
