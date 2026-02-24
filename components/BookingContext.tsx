'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

interface BookingContextType {
    isOpen: boolean
    open: () => void
    close: () => void
}

const BookingContext = createContext<BookingContextType>({
    isOpen: false,
    open: () => { },
    close: () => { },
})

export const useBooking = () => useContext(BookingContext)

export function BookingProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false)
    const open = useCallback(() => setIsOpen(true), [])
    const close = useCallback(() => setIsOpen(false), [])

    return (
        <BookingContext.Provider value={{ isOpen, open, close }}>
            {children}
        </BookingContext.Provider>
    )
}
