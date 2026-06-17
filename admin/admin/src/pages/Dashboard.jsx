import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { backendUrl } from '../App'
import { MdHotel, MdOutlineEventAvailable, MdRoomPreferences } from 'react-icons/md'
import { FaPlus, FaListUl } from 'react-icons/fa'

const Dashboard = () => {
  const [rooms, setRooms] = useState([])
  const [reservations, setReservations] = useState([])

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [roomsResponse, reservationsResponse] = await Promise.all([
          axios.get(`${backendUrl}/api/hotel/list`),
          axios.get(`${backendUrl}/api/reservations/get`),
        ])

        setRooms(roomsResponse.data?.hotels || [])
        setReservations(reservationsResponse.data?.reservations || [])
      } catch (error) {
        console.error('Failed to load dashboard data:', error)
      }
    }

    fetchDashboard()
  }, [])

  const stats = [
    {
      title: 'Rooms',
      value: rooms.length,
      icon: <MdHotel className='text-3xl text-fuchsia-600' />,
      note: 'Rooms currently in inventory',
    },
    {
      title: 'Reservations',
      value: reservations.length,
      icon: <MdOutlineEventAvailable className='text-3xl text-emerald-600' />,
      note: 'Guest bookings submitted online',
    },
    {
      title: 'Amenities',
      value: rooms.reduce((count, room) => count + (room.amenities?.length || 0), 0),
      icon: <MdRoomPreferences className='text-3xl text-sky-600' />,
      note: 'Total amenity entries across rooms',
    },
  ]

  return (
    <div className='space-y-8'>
      <div className='rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-fuchsia-900 p-8 text-white shadow-lg'>
        <p className='text-sm uppercase tracking-[0.35em] text-fuchsia-200'>Admin Dashboard</p>
        <h1 className='mt-3 text-4xl font-bold'>Room management at a glance</h1>
        <p className='mt-3 max-w-2xl text-slate-200'>
          Track rooms, monitor reservations, and keep amenities organized from a single control center.
        </p>

        <div className='mt-6 flex flex-wrap gap-3'>
          <Link to='/add' className='inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 font-semibold text-slate-900 transition hover:bg-slate-100'>
            <FaPlus /> Add room
          </Link>
          <Link to='/list' className='inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 font-semibold text-white transition hover:bg-white/15'>
            <FaListUl /> Manage rooms
          </Link>
        </div>
      </div>

      <div className='grid grid-cols-1 gap-5 lg:grid-cols-3'>
        {stats.map((stat) => (
          <div key={stat.title} className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
            <div className='flex items-center justify-between'>
              <p className='text-sm font-semibold uppercase tracking-[0.2em] text-slate-500'>{stat.title}</p>
              {stat.icon}
            </div>
            <p className='mt-3 text-4xl font-bold text-slate-900'>{stat.value}</p>
            <p className='mt-2 text-sm text-slate-500'>{stat.note}</p>
          </div>
        ))}
      </div>

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
        <div className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
          <div className='mb-4 flex items-center justify-between'>
            <h2 className='text-xl font-semibold text-slate-900'>Recent rooms</h2>
            <Link to='/list' className='text-sm font-medium text-fuchsia-700 hover:text-fuchsia-800'>View all</Link>
          </div>
          <div className='space-y-3'>
            {rooms.slice(0, 4).length === 0 ? (
              <p className='text-sm text-slate-500'>No rooms added yet.</p>
            ) : (
              rooms.slice(0, 4).map((room) => (
                <div key={room._id} className='flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3'>
                  <div>
                    <p className='font-semibold text-slate-900'>{room.name}</p>
                    <p className='text-sm text-slate-500'>${room.price}</p>
                  </div>
                  <span className='rounded-full bg-fuchsia-50 px-3 py-1 text-xs font-medium text-fuchsia-700'>
                    {room.amenities?.length || 0} amenities
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
          <div className='mb-4 flex items-center justify-between'>
            <h2 className='text-xl font-semibold text-slate-900'>Recent reservations</h2>
            <Link to='/reservation' className='text-sm font-medium text-fuchsia-700 hover:text-fuchsia-800'>View all</Link>
          </div>
          <div className='space-y-3'>
            {reservations.slice(0, 4).length === 0 ? (
              <p className='text-sm text-slate-500'>No reservations yet.</p>
            ) : (
              reservations.slice(0, 4).map((reservation) => (
                <div key={reservation._id} className='rounded-2xl bg-slate-50 px-4 py-3'>
                  <div className='flex items-center justify-between gap-3'>
                    <div>
                      <p className='font-semibold text-slate-900'>{reservation.roomName}</p>
                      <p className='text-sm text-slate-500'>{reservation.name} · {reservation.guests} guests</p>
                    </div>
                    <span className='text-sm text-slate-500'>{reservation.checkin}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard