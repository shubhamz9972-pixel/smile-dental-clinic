'use client'

import { useState, useMemo } from 'react'
import BookBtn from '@/components/BookBtn'

const CATEGORIES = ['All', 'Cosmetic', 'General', 'Orthodontics', 'Restorative', 'Emergency']

const SERVICES = [
    {
        icon: 'diamond',
        category: 'Cosmetic',
        title: 'Teeth Whitening',
        desc: 'Professional-grade whitening for a brighter, whiter smile in a single session.',
        duration: '60 min',
        price: '₹3,500+',
        badge: '🔥 Popular',
    },
    {
        icon: 'face_retouching_natural',
        category: 'Cosmetic',
        title: 'Dental Veneers',
        desc: 'Ultra-thin porcelain shells bonded to the front surface to perfect smile aesthetics.',
        duration: '2 visits',
        price: '₹8,000+/tooth',
        badge: '✨ Premium',
    },
    {
        icon: 'straighten',
        category: 'Orthodontics',
        title: 'Braces & Aligners',
        desc: 'Traditional braces and clear aligner options for all ages.',
        duration: '12–18 months',
        price: '₹25,000+',
        badge: null,
    },
    {
        icon: 'local_hospital',
        category: 'General',
        title: 'Preventative Care',
        desc: 'Regular cleanings, fluoride treatments & comprehensive oral exams.',
        duration: '45 min',
        price: '₹800+',
        badge: '💡 Recommended',
    },
    {
        icon: 'healing',
        category: 'Restorative',
        title: 'Root Canal Therapy',
        desc: 'Painless, modern root canal treatment to save your natural tooth.',
        duration: '1–2 visits',
        price: '₹5,000+',
        badge: null,
    },
    {
        icon: 'settings',
        category: 'Restorative',
        title: 'Dental Implants',
        desc: 'Permanent, natural-looking titanium implants for missing teeth.',
        duration: '3–6 months',
        price: '₹40,000+',
        badge: '🏆 Best Result',
    },
    {
        icon: 'emergency',
        category: 'Emergency',
        title: 'Emergency Care',
        desc: 'Same-day emergency appointments for severe pain, broken teeth, or trauma.',
        duration: 'Same Day',
        price: '₹500+ consult',
        badge: '🆘 24/7',
    },
    {
        icon: 'child_care',
        category: 'General',
        title: 'Paediatric Dentistry',
        desc: 'Gentle, child-friendly dental care for kids aged 2 and above.',
        duration: '30 min',
        price: '₹600+',
        badge: '👶 Kids',
    },
]

export default function ServicesClient() {
    const [activeCategory, setActiveCategory] = useState('All')
    const [search, setSearch] = useState('')

    const filtered = useMemo(() => {
        return SERVICES.filter(s => {
            const matchCat = activeCategory === 'All' || s.category === activeCategory
            const matchSearch = s.title.toLowerCase().includes(search.toLowerCase()) ||
                s.desc.toLowerCase().includes(search.toLowerCase())
            return matchCat && matchSearch
        })
    }, [activeCategory, search])

    return (
        <div className="max-w-5xl mx-auto px-4 py-16">
            {/* Page header */}
            <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
                    <span className="material-symbols-outlined text-base">medical_services</span>
                    What We Offer
                </div>
                <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-3">
                    Our Dental Services
                </h1>
                <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
                    From routine cleanings to complete smile makeovers — we offer a full spectrum of dental care.
                </p>
            </div>

            {/* Search */}
            <div className="relative mb-6">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                <input
                    type="text"
                    placeholder="Search services..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-primary"
                />
            </div>

            {/* Category pills */}
            <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
                {CATEGORIES.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`shrink-0 px-4 py-2 rounded-full text-sm font-bold transition-all ${activeCategory === cat
                                ? 'bg-primary text-white shadow-md shadow-primary/30'
                                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-primary/40'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Service cards */}
            {filtered.length === 0 ? (
                <div className="text-center py-16 text-slate-400">
                    <span className="material-symbols-outlined text-4xl mb-3 block">search_off</span>
                    No services found. Try a different search.
                </div>
            ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filtered.map(s => (
                        <div key={s.title} className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 flex flex-col hover:border-primary/50 hover:shadow-md transition-all">
                            <div className="flex items-start justify-between mb-4">
                                <div className="size-12 flex items-center justify-center bg-primary/10 text-primary rounded-xl">
                                    <span className="material-symbols-outlined text-2xl">{s.icon}</span>
                                </div>
                                {s.badge && (
                                    <span className="text-xs font-bold bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 px-2.5 py-1 rounded-full">
                                        {s.badge}
                                    </span>
                                )}
                            </div>

                            <h2 className="font-extrabold text-slate-900 dark:text-white mb-2">{s.title}</h2>
                            <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 flex-1">{s.desc}</p>

                            <div className="flex items-center gap-3 text-xs text-slate-400 mb-4">
                                <span className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">schedule</span>
                                    {s.duration}
                                </span>
                                <span className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">currency_rupee</span>
                                    {s.price}
                                </span>
                            </div>

                            <BookBtn className="w-full bg-primary/10 text-primary font-bold py-2.5 rounded-xl hover:bg-primary hover:text-white transition-colors text-sm flex items-center justify-center gap-1.5">
                                <span className="material-symbols-outlined text-sm">calendar_month</span>
                                Book This Service
                            </BookBtn>
                        </div>
                    ))}
                </div>
            )}

            {/* Bottom CTA */}
            <div className="mt-12 bg-gradient-to-br from-primary to-blue-600 text-white rounded-2xl p-8 text-center">
                <h3 className="text-2xl font-extrabold mb-2">Not Sure Which Service You Need?</h3>
                <p className="text-white/80 mb-6">Book a free consultation. Our doctors will guide you to the best treatment plan.</p>
                <BookBtn className="inline-flex items-center gap-2 bg-white text-primary font-bold px-8 py-3.5 rounded-xl hover:bg-blue-50 transition-colors">
                    <span className="material-symbols-outlined">calendar_month</span>
                    Free Consultation
                </BookBtn>
            </div>
        </div>
    )
}
