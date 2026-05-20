import React from 'react'
import Hero from '../components/Hero'
import Hotellist from '../components/Hotellist'
import Facility from '../components/Facility'

const Homepage = () => {
  return (
    <div>
      <Hero/>
      <Hotellist/>
      <Facility />
    </div>
  )
}

export default Homepage;