'use client'

import { useBooking } from './BookingContext'

export default function FAB() {
    const { open } = useBooking()

    return (
        <button
            onClick={open}
            aria-label="Book appointment"
            className="fixed right-6 bottom-24 bg-primary text-white size-14 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-90 transition-transform z-40"
        >
            <span className="material-symbols-outlined text-3xl">calendar_add_on</span>
        </button>
    )
}
