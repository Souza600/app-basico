import { useState } from 'react'
import { supabase } from '../utils/supabaseClient'

export default function BookingForm({ services }) {
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [serviceId, setServiceId] = useState(services[0]?.id || '')
  const [datetime, setDatetime] = useState('')
  const [message, setMessage] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    // Simples, sem login:
    const { error } = await supabase
      .from('bookings')
      .insert({
        name,
        contact,
        service_id: serviceId,
        datetime,
        status: 'scheduled'
      })
    if (error) setMessage('Erro ao agendar: ' + error.message)
    else setMessage('Agendamento realizado com sucesso!')
  }

  return (
    <form onSubmit={handleSubmit} style={{margin:'24px 0'}}>
      <h2>Faça seu agendamento</h2>
      <input
        type="text"
        placeholder="Seu nome"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      /><br />
      <input
        type="text"
        placeholder="Telefone ou E-mail"
        value={contact}
        onChange={e => setContact(e.target.value)}
        required
      /><br />
      <select value={serviceId} onChange={e => setServiceId(e.target.value)} required>
        {services.map(s => (
          <option key={s.id} value={s.id}>{s.name} - R$ {s.price}</option>
        ))}
      </select><br />
      <input
        type="datetime-local"
        value={datetime}
        onChange={e => setDatetime(e.target.value)}
        required
      /><br/>
      <button type="submit">Agendar</button>
      {message && <p>{message}</p>}
    </form>
  )
}
