import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import ThemeProvider from '@/components/ThemeProvider'
import Header from '@/components/Header'
import BottomNav from '@/components/BottomNav'
import FAB from '@/components/FAB'
import BookingModal from '@/components/BookingModal'
import { BookingProvider } from '@/components/BookingContext'

export const metadata: Metadata = {
    title: {
        default: 'SmileBright Dental - Your Journey to a Perfect Smile',
        template: '%s | SmileBright Dental',
    },
    description: 'SmileBright Dental Clinic offers world-class dental care in Ludhiana. Book your appointment today.',
    keywords: ['dental clinic', 'dentist', 'Ludhiana', 'teeth whitening', 'braces', 'implants'],
    authors: [{ name: 'SmileBright Dental' }],
    openGraph: {
        type: 'website',
        locale: 'en_IN',
        url: 'https://smilebrightdental.in',
        siteName: 'SmileBright Dental',
        title: 'SmileBright Dental - Your Journey to a Perfect Smile',
        description: 'Expert dental care in Ludhiana — gentle, modern & trusted by 1000+ patients.',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'SmileBright Dental',
        description: 'Expert dental care in Ludhiana',
    },
    verification: {
        google: 'X8obKzzEVoCfc9I4g4xBjK--4OD7STz9koKwMlzLtL0',
    },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
                />
            </head>
            <body className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased">
                {/* Google Analytics */}
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-9Z2JV03GWN"
                    strategy="afterInteractive"
                />
                <Script id="ga-init" strategy="afterInteractive">
                    {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9Z2JV03GWN');
          `}
                </Script>

                <ThemeProvider>
                    <BookingProvider>
                        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
                            <Header />
                            <main className="flex-1 pb-24">
                                {children}
                            </main>
                            <FAB />
                            <BottomNav />
                            <BookingModal />
                        </div>
                    </BookingProvider>
                </ThemeProvider>
            </body>
        </html>
    )
}
