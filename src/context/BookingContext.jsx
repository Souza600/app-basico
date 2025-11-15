import { createContext, useContext, useState } from 'react'

const BookingContext = createContext()

export function BookingProvider({ children }) {
  const [selectedService, setSelectedService] = useState(null)
  const [selectedBarber, setSelectedBarber] = useState(null)
  const [selectedDatetime, setSelectedDatetime] = useState('')
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')

  const value = {
    selectedService, setSelectedService,
    selectedBarber, setSelectedBarber,
    selectedDatetime, setSelectedDatetime,
    name, setName,
    contact, setContact
  }

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  return useContext(BookingContext)
}
