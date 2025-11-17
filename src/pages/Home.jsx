import React from 'react'
import Hero from '../components/Hero'
import Box from '../components/Box'
import Testimonials from '../components/Testimonials'
import Offer from '../components/Offer'
import Games from '../components/Games'
import Work from '../components/Work'

const Home = () => {
  return (
    <div>
        <Hero />
        <Box />
        <Offer />
        <Games />
        <Work />
        <Testimonials />
    </div>
  )
}

export default Home