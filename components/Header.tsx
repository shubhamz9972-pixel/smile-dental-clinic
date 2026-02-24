'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { useBooking } from './BookingContext'

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false)
    const { open: openBooking } = useBooking()

    const toggleTheme = useCallback(() => {
        const html = document.documentElement
        html.classList.toggle('dark')
        localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light')
    }, [])

    const closeMenu = () => setMenuOpen(false)

    return (
        <>
            <header className="sticky top-0 z-50 flex items-center bg-white/80 dark:bg-background-dark/80 backdrop-blur-md px-4 py-3 justify-between border-b border-slate-200 dark:border-slate-800">
                <Link href="/" className="flex items-center gap-3">
                    <div className="text-primary flex size-10 shrink-0 items-center justify-center bg-primary/10 rounded-lg">
                        <span className="material-symbols-outlined">dentistry</span>
                    </div>
                    <h2 className="text-slate-900 dark:text-slate-100 text-lg font-extrabold leading-tight tracking-tight flex-1">
                        SmileBright <span className="text-primary">Dental</span>
                    </h2>
                </Link>
                <div className="flex w-16 items-center justify-end gap-1">
                    <button
                        onClick={toggleTheme}
                        aria-label="Toggle dark mode"
                        className="flex items-center justify-center rounded-full size-10 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    >
                        <span className="material-symbols-outlined dark:hidden">light_mode</span>
                        <span className="material-symbols-outlined hidden dark:inline">dark_mode</span>
                    </button>
                    <button
                        onClick={() => setMenuOpen(true)}
                        aria-label="Open menu"
                        className="flex items-center justify-center rounded-full size-10 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    >
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div
                onClick={closeMenu}
                className={`fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    className={`absolute right-0 top-0 h-full w-72 bg-white dark:bg-background-dark shadow-2xl p-6 transition-transform duration-300 ${menuOpen ? 'translate-x-0' : 'translate-x-full'
                        }`}
                >
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="font-bold text-lg">Menu</h3>
                        <button
                            onClick={closeMenu}
                            className="size-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center"
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>
                    <nav className="space-y-2">
                        <Link href="/" onClick={closeMenu} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary font-bold text-sm">
                            <span className="material-symbols-outlined font-fill">home</span> Home
                        </Link>
                        <Link href="/services" onClick={closeMenu} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-sm transition-colors">
                            <span className="material-symbols-outlined">medical_services</span> Services
                        </Link>
                        <Link href="/#doctors" onClick={closeMenu} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-sm transition-colors">
                            <span className="material-symbols-outlined">group</span> Our Team
                        </Link>
                        <Link href="/#testimonials" onClick={closeMenu} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-sm transition-colors">
                            <span className="material-symbols-outlined">reviews</span> Reviews
                        </Link>
                        <Link href="/#contact" onClick={closeMenu} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-sm transition-colors">
                            <span className="material-symbols-outlined">location_on</span> Contact
                        </Link>
                    </nav>
                    <div className="mt-8">
                        <a
                            href="tel:+917901934386"
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary text-white font-bold py-3 text-sm shadow-lg shadow-primary/30"
                        >
                            <span className="material-symbols-outlined text-lg">call</span> Call Now
                        </a>
                    </div>
                    <div className="mt-3">
                        <button
                            onClick={() => { closeMenu(); openBooking() }}
                            className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-primary text-primary font-bold py-3 text-sm"
                        >
                            <span className="material-symbols-outlined text-lg">calendar_add_on</span> Book Appointment
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
