import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'

const Reservation = () => {
  const [reservations, setReservations] = useState([])
  const [isDeleting, setIsDeleting] = useState(null)

  const fetchReservation = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/reservations/get`)
      setReservations(response.data.reservations || [])
    } catch (error) {
      console.error('Failed to fetch reservations:', error)
    }
  }

  useEffect(() => {
    fetchReservation()
  }, [])

  const handleDelete = async (id) => {
    if (!id) return
    setIsDeleting(id)

    try {
      await axios.delete(`${backendUrl}/api/reservations/delete/${id}`)
      setReservations((prev) => prev.filter((reservation) => reservation._id !== id))
    } catch (error) {
      console.error('Failed to delete reservation:', error)
    } finally {
      setIsDeleting(null)
    }
  }

  const formatDate = (value) => {
    if (!value) return '—'
    const date = new Date(value)
    return Number.isNaN(date.getTime()) ? '—' : date.toLocaleDateString()
  }

  return (
    <div className='bg-slate-50 p-6 rounded-3xl shadow-sm min-h-[calc(100vh-5rem)]'>
      <div className='mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between'>
        <div>
          <h2 className='text-3xl font-semibold text-slate-900'>Room Reservations</h2>
          <p className='text-sm text-slate-500'>View and manage all bookings made through the site.</p>
        </div>
        <div className='rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm'>
          {reservations.length} reservation{reservations.length === 1 ? '' : 's'}
        </div>
      </div>

      <div className='overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm'>
        <table className='min-w-[900px] border-collapse'>
          <thead className='bg-slate-50 text-left text-xs uppercase tracking-[0.2em] text-slate-500'>
            <tr>
              <th className='px-6 py-4 whitespace-nowrap'>Room Name</th>
              <th className='px-6 py-4 whitespace-nowrap'>Name</th>
              <th className='px-6 py-4 whitespace-nowrap'>Email</th>
              <th className='px-6 py-4 whitespace-nowrap'>Phone</th>
              <th className='px-6 py-4 whitespace-nowrap'>Guests</th>
              <th className='px-6 py-4 whitespace-nowrap'>Check-in</th>
              <th className='px-6 py-4 whitespace-nowrap'>Check-out</th>
              <th className='px-6 py-4 text-right whitespace-nowrap'>Action</th>
            </tr>
          </thead>
          <tbody>
            {reservations.length === 0 ? (
              <tr>
                <td className='px-6 py-8 text-center text-slate-500' colSpan={8}>
                  No reservations available
                </td>
              </tr>
            ) : (
              reservations.map((res, index) => (
                <tr key={res._id || index} className='border-t border-slate-200 hover:bg-slate-50 transition'>
                  <td className='px-6 py-4 text-slate-900 whitespace-nowrap'>{res.roomName}</td>
                  <td className='px-6 py-4 text-slate-700 whitespace-nowrap'>{res.name}</td>
                  <td className='px-6 py-4 text-slate-700 whitespace-nowrap'>{res.email}</td>
                  <td className='px-6 py-4 text-slate-700 whitespace-nowrap'>{res.phone}</td>
                  <td className='px-6 py-4 text-slate-700 whitespace-nowrap'>{res.guests || '—'}</td>
                  <td className='px-6 py-4 text-slate-700 whitespace-nowrap'>
                    {formatDate(res.checkin)}
                  </td>
                  <td className='px-6 py-4 text-slate-700 whitespace-nowrap'>
                    {formatDate(res.checkout)}
                  </td>
                  <td className='px-6 py-4 text-right'>
                    <button
                      className='rounded-2xl bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50'
                      onClick={() => handleDelete(res._id)}
                      disabled={isDeleting === res._id}
                    >
                      {isDeleting === res._id ? 'Deleting...' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Reservation