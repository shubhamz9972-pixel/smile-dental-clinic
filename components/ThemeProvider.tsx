'use client'

import { useEffect } from 'react'

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const html = document.documentElement
        const stored = localStorage.getItem('theme')
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        if (stored === 'dark' || (!stored && prefersDark)) {
            html.classList.add('dark')
        } else {
            html.classList.remove('dark')
        }
    }, [])

    return <>{children}</>
}
