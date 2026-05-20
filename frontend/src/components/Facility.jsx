import React from 'react'
import {FaBath, FaCar, FaCocktail, FaConciergeBell, FaShuttleVan, FaSwimmingPool} from 'react-icons/fa'


const services = [
  {
    icon: <FaShuttleVan size={30} color="#fff" />,
    title:"Airport Pickup",
    desc:"We'll pick up from airport while you relax on your ride"
  },
  {
    icon: <FaCar size={30} color="#fff" />,
   title:"Car Rental",
    desc:"Rent a car with us and explore the city at your own pace"
  },
  {
    icon: <FaCocktail size={30} color="#fff" />,
    title:"Bar and Restaurant",
    desc:"Enjoy our bar and restaurant with your loved ones and have a great time"
  },
  {
    icon: <FaBath size={30} color="#fff" />,
    title:"Spa and Wellness",
    desc:"Relax and rejuvenate with our spa and wellness services"
  },
  {
    icon: <FaConciergeBell size={30} color="#fff" />,
    title:"Concierge Service",
    desc:"Our concierge team is here to assist you with any requests or arrangements you may need during your stay"
  },
  {
    icon: <FaSwimmingPool size={30} color="#fff" />,
    title:"Swimming Pool",
    desc:"Take a refreshing dip in our swimming pool and unwind after a long day"
  }
  
]


const Facility = () => {

  return (
    <div className='py-12 bg-gray-900'>
      <div className='max-w-6xl mx-auto px-4'>
        <div className='text-center mb-8'>
          <p className='text-blue-400'>Services</p>
          <h2 className='text-4xl font-bold text-white'>Facilities $ Services</h2>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {services.map((service, index) => (
            <div key={index} className='text-center bg-gray-800 p-6 rounded-lg'>
              <div className='flex justify-center mb-4'>{service.icon}</div>
              <h3 className='text-xl font-semibold text-white mt-4'>{service.title}</h3>
              <p className='text-gray-300'>{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Facility