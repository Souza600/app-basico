import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabaseClient'
import BookingForm from './BookingForm'

export default function ServiceList() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchServices() {
      let { data, error } = await supabase
        .from('services')
        .select('id, name, price')
        .order('name', { ascending: true })
      if (error) {
        console.error('Erro ao buscar serviços:', error)
      } else {
        setServices(data)
      }
      setLoading(false)
    }
    fetchServices()
  }, [])

  if (loading) return <div>Carregando serviços...</div>

  return (
    <div>
      <BookingForm services={services} />
      <h2>Serviços disponíveis</h2>
      <ul>
        {services.map(servico => (
          <li key={servico.id}>
            {servico.name} - R$ {servico.price.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  )
}
