'use client'

import { useState } from 'react'
import { useBooking } from './BookingContext'

export default function BookingModal() {
    const { isOpen, close } = useBooking()
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

    const FORMSPREE_URL = 'https://formspree.io/f/mlgwpejv'

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setStatus('loading')
        const form = e.currentTarget
        try {
            const formData = new FormData(form)
            const resp = await fetch(FORMSPREE_URL, {
                method: 'POST',
                body: formData,
                headers: { Accept: 'application/json' },
            })
            if (resp.ok) {
                setStatus('success')
                form.reset()
                setTimeout(() => {
                    close()
                    setStatus('idle')
                }, 3000)
            } else {
                setStatus('error')
            }
        } catch {
            setStatus('error')
        }
    }

    if (!isOpen) return null

    return (
        <div
            className="fixed inset-0 z-[70] bg-black/50 flex items-center justify-center p-4"
            onClick={(e) => { if (e.target === e.currentTarget) { close(); setStatus('idle') } }}
        >
            <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md p-6 relative">
                <button
                    onClick={() => { close(); setStatus('idle') }}
                    className="absolute top-4 right-4 size-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800"
                >
                    <span className="material-symbols-outlined">close</span>
                </button>

                <h3 className="text-xl font-bold mb-4">Book Appointment</h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input name="name" type="text" required placeholder="Your name"
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Phone</label>
                        <input name="phone" type="tel" required placeholder="+91 98765 43210"
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Service</label>
                        <select name="service" required
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary outline-none"
                        >
                            <option value="">Select service</option>
                            <option>General Dentistry</option>
                            <option>Cosmetic Procedures</option>
                            <option>Orthodontics</option>
                            <option>Root Canal</option>
                            <option>Dental Implants</option>
                        </select>
                    </div>

                    {status === 'success' && (
                        <div className="text-center py-3 rounded-xl text-sm font-bold bg-green-100 text-green-700">
                            ✅ Appointment booked! We&apos;ll contact you shortly.
                        </div>
                    )}
                    {status === 'error' && (
                        <div className="text-center py-3 rounded-xl text-sm font-bold bg-red-100 text-red-700">
                            ❌ Something went wrong. Please try again or call us.
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={status === 'loading' || status === 'success'}
                        className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                        {status === 'loading' ? (
                            <>
                                <span className="material-symbols-outlined text-lg animate-spin">progress_activity</span>
                                Sending...
                            </>
                        ) : status === 'success' ? (
                            <>
                                <span className="material-symbols-outlined text-lg">check_circle</span>
                                Booked!
                            </>
                        ) : (
                            <>
                                <span className="material-symbols-outlined text-lg">calendar_month</span>
                                Book Now
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
}
