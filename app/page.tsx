import type { Metadata } from 'next'
import Link from 'next/link'
import BookBtn from '@/components/BookBtn'
import SafeImage from '@/components/SafeImage'

export const metadata: Metadata = {
    title: 'SmileBright Dental - Your Journey to a Perfect Smile',
    description: 'SmileBright Dental Clinic offers world-class dental care in Ludhiana. Gentle, modern & trusted by 1000+ patients. Book your appointment today.',
}

const services = [
    { icon: 'diamond', title: 'Cosmetic Procedures', desc: 'Whitening, veneers, bonding — smile transformations', href: '/services' },
    { icon: 'straighten', title: 'Orthodontics', desc: 'Braces & clear aligners for all ages', href: '/services' },
    { icon: 'local_hospital', title: 'General Dentistry', desc: 'Fillings, cleanings & routine check-ups', href: '/services' },
    { icon: 'healing', title: 'Dental Implants', desc: 'Permanent tooth replacement solutions', href: '/services' },
]

const team = [
    {
        name: 'Dr. Siddharth Sharma',
        role: 'Lead Dentist & Founder',
        photo: 'https://lh3.googleusercontent.com/a/ACg8ocJsHPGSMcLwp_iuyh0eezH9jkPSGEGFwm9wU8YU_FZG7LDU=s96-c',
        exp: '15+ Years',
        specialty: 'Cosmetic & Restorative',
    },
    {
        name: 'Dr. Priya Mehta',
        role: 'Orthodontist',
        photo: 'https://lh3.googleusercontent.com/a/default',
        exp: '10+ Years',
        specialty: 'Braces & Aligners',
    },
]

const testimonials = [
    {
        name: 'Rahul Singh',
        photo: 'https://lh3.googleusercontent.com/a/default',
        rating: 5,
        text: 'Absolutely amazing experience! Dr. Sharma is brilliant and the clinic is spotless. My smile has never looked better after the veneer treatment.',
        date: '2 weeks ago',
    },
    {
        name: 'Priya Kapoor',
        photo: 'https://lh3.googleusercontent.com/a/default',
        rating: 5,
        text: 'I had severe dental anxiety but the team was incredibly patient with me. Super painless root canal — highly recommend!',
        date: '1 month ago',
    },
    {
        name: 'Vikram Patel',
        photo: 'https://lh3.googleusercontent.com/a/default',
        rating: 5,
        text: 'Best dental experience of my life. Same-day appointments, friendly staff, and top-tier results. Worth every rupee.',
        date: '3 weeks ago',
    },
]

export default function HomePage() {
    return (
        <>
            {/* ─── Hero ─────────────────────────────────────────────── */}
            <section className="relative min-h-[85svh] flex flex-col items-center justify-center overflow-hidden px-4 pt-20 pb-10 text-center">
                {/* Background blobs */}
                <div className="absolute -top-32 -right-32 size-80 rounded-full bg-primary/20 blur-3xl" />
                <div className="absolute -bottom-20 -left-20 size-64 rounded-full bg-primary/10 blur-3xl" />

                <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-semibold">
                        <span className="material-symbols-outlined text-base font-fill">verified</span>
                        Trusted by 1000+ Patients in Ludhiana
                    </div>

                    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-slate-900 dark:text-white">
                        Your Journey to a{' '}
                        <span className="text-primary">Perfect Smile</span>{' '}
                        Starts Here
                    </h1>

                    <p className="text-slate-600 dark:text-slate-400 text-lg max-w-xl mx-auto">
                        World-class dental care — gentle, modern & personalised. From routine check-ups to complete smile makeovers.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <BookBtn className="bg-primary text-white font-bold px-8 py-3.5 rounded-2xl hover:bg-primary/90 transition-all scale-100 hover:scale-105 shadow-lg shadow-primary/30 flex items-center gap-2">
                            <span className="material-symbols-outlined">calendar_month</span>
                            Book Appointment
                        </BookBtn>
                        <Link href="/services" className="bg-white dark:bg-slate-800 text-slate-800 dark:text-white font-bold px-8 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center gap-2">
                            <span className="material-symbols-outlined">medical_services</span>
                            View Services
                        </Link>
                    </div>

                    {/* Trust chips */}
                    <div className="flex flex-wrap justify-center gap-3 pt-2">
                        {['Pain-Free Treatments', 'Same-Day Emergency', 'EMI Available'].map(label => (
                            <span key={label} className="flex items-center gap-1.5 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-bold px-3 py-1.5 rounded-full">
                                <span className="material-symbols-outlined text-sm font-fill">check_circle</span>
                                {label}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Stats ────────────────────────────────────────────── */}
            <section className="bg-primary text-white py-8 px-4">
                <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    {[
                        { value: '1000+', label: 'Happy Patients' },
                        { value: '15+', label: 'Years Experience' },
                        { value: '4.9★', label: 'Google Rating' },
                        { value: '99%', label: 'Success Rate' },
                    ].map(s => (
                        <div key={s.label}>
                            <div className="text-3xl font-extrabold">{s.value}</div>
                            <div className="text-white/70 text-sm mt-1">{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── Philosophy ───────────────────────────────────────── */}
            <section className="py-16 px-4 max-w-5xl mx-auto">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
                        <span className="material-symbols-outlined text-base">favorite</span>
                        Our Philosophy
                    </div>
                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                        Why Choose SmileBright?
                    </h2>
                </div>
                <div className="grid sm:grid-cols-3 gap-6">
                    {[
                        { icon: 'sentiment_satisfied', title: 'Patient-First Care', desc: 'Every treatment plan is tailored to your unique needs, budget, and comfort.' },
                        { icon: 'biotech', title: 'Modern Technology', desc: 'Digital X-rays, painless injections, and laser dentistry for better outcomes.' },
                        { icon: 'shield', title: 'Safety & Hygiene', desc: 'Hospital-grade sterilisation and strict infection-control protocols every time.' },
                    ].map(p => (
                        <div key={p.title} className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700">
                            <div className="size-12 flex items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                                <span className="material-symbols-outlined text-2xl font-fill">{p.icon}</span>
                            </div>
                            <h3 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">{p.title}</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">{p.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── Popular Services ─────────────────────────────────── */}
            <section className="py-10 px-4 max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <div className="text-primary font-bold text-sm mb-1">Our Services</div>
                        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Popular Treatments</h2>
                    </div>
                    <Link href="/services" className="text-primary font-bold text-sm flex items-center gap-1 hover:underline">
                        View all <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </Link>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {services.map(s => (
                        <Link key={s.title} href={s.href} className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-100 dark:border-slate-700 hover:border-primary/50 hover:shadow-md transition-all group">
                            <div className="size-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary mb-3 group-hover:bg-primary group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-xl">{s.icon}</span>
                            </div>
                            <h3 className="font-bold text-sm mb-1 text-slate-900 dark:text-white">{s.title}</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-xs">{s.desc}</p>
                        </Link>
                    ))}
                </div>
            </section>

            {/* ─── Team ─────────────────────────────────────────────── */}
            <section className="py-16 px-4 bg-slate-50 dark:bg-slate-900/50">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
                            <span className="material-symbols-outlined text-base">groups</span>
                            Our Doctors
                        </div>
                        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Meet the Experts</h2>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-6">
                        {team.map(doc => (
                            <div key={doc.name} className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 flex items-center gap-4">
                                <SafeImage
                                    src={doc.photo}
                                    alt={doc.name}
                                    width={64}
                                    height={64}
                                    className="size-16 rounded-full object-cover border-2 border-primary/20"
                                    fallbackName={doc.name}
                                />
                                <div>
                                    <div className="font-extrabold text-slate-900 dark:text-white">{doc.name}</div>
                                    <div className="text-primary text-sm font-semibold">{doc.role}</div>
                                    <div className="flex gap-3 mt-2 text-xs text-slate-500">
                                        <span>{doc.exp}</span>
                                        <span>·</span>
                                        <span>{doc.specialty}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Testimonials ─────────────────────────────────────── */}
            <section className="py-16 px-4 max-w-5xl mx-auto">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
                        <span className="material-symbols-outlined text-base font-fill">star</span>
                        Patient Reviews
                    </div>
                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">What Our Patients Say</h2>
                </div>
                <div className="grid sm:grid-cols-3 gap-5">
                    {testimonials.map(t => (
                        <div key={t.name} className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-100 dark:border-slate-700">
                            <div className="flex items-center gap-3 mb-3">
                                <SafeImage
                                    src={t.photo}
                                    alt={t.name}
                                    width={40}
                                    height={40}
                                    className="size-10 rounded-full border border-slate-200"
                                    fallbackName={t.name}
                                />
                                <div>
                                    <div className="font-bold text-sm text-slate-900 dark:text-white">{t.name}</div>
                                    <div className="text-xs text-slate-400">{t.date}</div>
                                </div>
                            </div>
                            <div className="text-yellow-400 text-xs mb-2">{'★'.repeat(t.rating)}</div>
                            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{t.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── Emergency Banner ─────────────────────────────────── */}
            <section className="px-4 pb-8 max-w-5xl mx-auto">
                <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="size-12 flex items-center justify-center bg-white/20 rounded-xl">
                            <span className="material-symbols-outlined text-2xl font-fill">emergency</span>
                        </div>
                        <div>
                            <div className="font-extrabold text-lg">Dental Emergency?</div>
                            <div className="text-white/80 text-sm">We&apos;re available for same-day emergency appointments</div>
                        </div>
                    </div>
                    <a href="tel:+91-98765-43210" className="bg-white text-red-600 font-bold px-6 py-3 rounded-xl hover:bg-red-50 transition-colors flex items-center gap-2 shrink-0">
                        <span className="material-symbols-outlined">call</span>
                        Call Now
                    </a>
                </div>
            </section>

            {/* ─── Contact Info ─────────────────────────────────────── */}
            <section className="px-4 pb-16 max-w-5xl mx-auto">
                <div className="grid sm:grid-cols-3 gap-5">
                    {[
                        { icon: 'location_on', title: 'Location', lines: ['123 Dental Street', 'Model Town, Ludhiana, Punjab'] },
                        { icon: 'schedule', title: 'Hours', lines: ['Mon–Sat: 9 AM – 8 PM', 'Sun: 10 AM – 2 PM'] },
                        { icon: 'call', title: 'Contact', lines: ['+91 98765 43210', 'info@smilebrightdental.in'] },
                    ].map(c => (
                        <div key={c.title} className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-100 dark:border-slate-700 flex items-start gap-4">
                            <div className="size-10 flex items-center justify-center bg-primary/10 rounded-xl text-primary shrink-0">
                                <span className="material-symbols-outlined font-fill">{c.icon}</span>
                            </div>
                            <div>
                                <div className="font-bold text-sm text-slate-900 dark:text-white mb-1">{c.title}</div>
                                {c.lines.map(l => (
                                    <div key={l} className="text-slate-500 dark:text-slate-400 text-xs">{l}</div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}
