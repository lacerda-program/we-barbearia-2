import { useState } from 'react'
import { Preloader } from '@/components/Preloader'
import { Hero } from '@/components/Hero'
import { FaceShapeFinder } from '@/components/FaceShapeFinder'
import { BeforeAfter } from '@/components/BeforeAfter'
import { Services } from '@/components/Services'
import { Booking } from '@/components/Booking'
import { Team } from '@/components/Team'
import { Reviews } from '@/components/Reviews'
import { Gallery } from '@/components/Gallery'
import { Location } from '@/components/Location'
import { FAQ } from '@/components/FAQ'
import { Policies } from '@/components/Policies'
import { ThemeToggle } from '@/components/ThemeToggle'
import { WhatsAppFloat } from '@/components/WhatsAppFloat'
import { Footer } from '@/components/Footer'

export default function App() {
  const [loading, setLoading] = useState(true)

  return (
    <>
      {loading && <Preloader onDone={() => setLoading(false)} />}
      <ThemeToggle />
      <main className="relative">
        <Hero />
        <FaceShapeFinder />
        <BeforeAfter />
        <Services />
        <Team />
        <Booking />
        <Reviews />
        <Gallery />
        <Location />
        <FAQ />
        <Policies />
        <Footer />
      </main>
      <WhatsAppFloat />
    </>
  )
}
