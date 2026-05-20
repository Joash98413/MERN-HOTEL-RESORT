import React from 'react'
import bgImage from '../assets/hero2.jpg'

function Hero() {
  return (
    <div className='relative h-[100vh] w-full bg-cover bg-center bg-no-repeat' style={{ backgroundImage: `url(${bgImage})` }}>
      <div className='absolute inset-0 bg-gray-900 opacity-25 z-8'></div>
      <div className='relative z-10 flex-col items-center justify-center h-full text-center text-white px-3'>
        <h1 className='text-3xl font-bold mb-4'>Where Luxury Meets Diner</h1>
        <h2 className='text-4xl font-bold mb-6'>DELUXE RESORT</h2>
        <button className='bg-lime-400 text-black font-bold py-3 px-6 rounded-lg hover:bg-lime-500 transition-shadow'>BOOK YOUR STAY</button>
      </div>
    </div>
  )
}

export default Hero