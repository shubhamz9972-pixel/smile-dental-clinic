'use client'
import { useBooking } from './BookingContext'

interface BookBtnProps {
    children: React.ReactNode
    className?: string
}

export default function BookBtn({ children, className }: BookBtnProps) {
    const { open } = useBooking()
    return (
        <button onClick={open} className={className}>
            {children}
        </button>
    )
}
