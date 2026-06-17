import React, {useState} from 'react'
import { FaFacebook, FaYoutube, FaInstagram } from 'react-icons/fa'

const Footer = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // handle signup here
    console.log('Email:', email)
    setEmail('')
  }

  return (
    <footer className='bg-black text-white pt-12 pb-6'>
      <div className='max-w-6xl max-auto px-4 text-center mb-12'>
        <h2 className='text-3xl  md:text-4xl font-bold mb-4'>Sign Up For Exclusive Offers</h2>

        <form onSubmit={handleSubmit} className='flex justify-center mt-6'>
          <div className='flex w-full max-w-md bg-gray-800 rounded-full overflow-hidden'>
          <input
            type='email'
            placeholder='Enter your email address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='flex-1 px-6 py-3 bg-gray-800 text-white outline-none'
            required
          />
          <button type='submit' className='bg-lime-400 text-black font-semibold px-6 py-3 hover:bg-lime-600 transition'>
            Join now

          </button>
          </div>

        </form>

      </div>

      <div className='max-w-6xl mx-auto px-4 border-t border-gray-800 pt-8'>
        <div className='flex flex-col md:flex-row justify-between items-center gap-6'>

          <div className='text-center md:text-left'>
            <h3 className='text-xl font-bold text-lime-400 mb-3'>DELUXE RESORTS</h3>
            <div className='flex-gap-4 justify-center md:justify-start'>
              <a href="#" className='text-gray-300 hover:text-lime-400 transition'><FaFacebook /></a>
              <a href="#" className='text-gray-300 hover:text-lime-400 transition'><FaYoutube /></a>
              <a href="#" className='text-gray-300 hover:text-lime-400 transition'><FaInstagram /></a>
            </div>
          </div>

          <div className='flex gap-6 text-gray-300'>
            <a href="#" className='hover:text-lime-400 transition'>HOME</a>
            <a href="bookings" className='hover:text-lime-400 transition'>BOOKINGS</a>
            <a href="rooms" className='hover:text-lime-400 transition'>ROOMS</a>
            <a href="contact" className='hover:text-lime-400 transition'>CONTACT</a>
          </div>
        </div>

        <div className='text-center text-gray-500 text-sm mt-8'>
          &copy; 2026 DELUXE RESORTS. All rights reserved.

        </div>

      </div>
    </footer>
  )
}



export default Footer