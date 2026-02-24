import type { Metadata } from 'next'
import ServicesClient from './ServicesClient'

export const metadata: Metadata = {
    title: 'Dental Services',
    description: 'Explore the full range of dental services at SmileBright Dental Clinic — from teeth whitening and veneers to implants and emergency care in Ludhiana.',
}

export default function ServicesPage() {
    return <ServicesClient />
}
