'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
    { href: '/', icon: 'home', label: 'Home' },
    { href: '/services', icon: 'medical_services', label: 'Services' },
    { href: '/#contact', icon: 'location_on', label: 'Clinics' },
    { href: '/#testimonials', icon: 'reviews', label: 'Reviews' },
]

export default function BottomNav() {
    const pathname = usePathname()

    return (
        <nav className="fixed bottom-0 inset-x-0 bg-white/95 dark:bg-background-dark/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-4 pb-6 pt-2 z-50">
            <div className="flex max-w-lg mx-auto">
                {navItems.map((item) => {
                    const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href.replace('/#', '/'))
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex flex-1 flex-col items-center justify-center gap-1 ${isActive ? 'text-primary' : 'text-slate-400'}`}
                        >
                            <span className={`material-symbols-outlined ${isActive ? 'font-fill' : ''}`}>{item.icon}</span>
                            <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>
                        </Link>
                    )
                })}
            </div>
        </nav>
    )
}
