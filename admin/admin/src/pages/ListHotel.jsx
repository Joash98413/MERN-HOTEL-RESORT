import React, { useEffect, useState } from 'react'
import { backendUrl } from '../App'
import { MdDeleteForever } from 'react-icons/md'
import axios from 'axios'

const ListHotel = ({token}) => {
  const [list, setList] = useState([])
  const [deletingId, setDeletingId] = useState('')

  const fetchRoomList = async () => {
    try{
      const response = await axios.get(backendUrl + '/api/hotel/list', {headers: {token}})

      if(response.data.success){
        setList(response.data.hotels)

    } else {
      console.log(response.data.message);

    }
    } catch (error){
      console.log(error);

    }
  }

  const handleDelete = async (id) => {
    if (!id) return
    const shouldDelete = window.confirm('Delete this room?')
    if (!shouldDelete) return

    setDeletingId(id)
    try {
      const response = await axios.post(`${backendUrl}/api/hotel/remove`, { id }, { headers: { token } })
      if (response.data.success) {
        setList((prev) => prev.filter((item) => (item._id || item.id) !== id))
      } else {
        console.log(response.data.message)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setDeletingId('')
    }
  }
  useEffect(()=> {
    fetchRoomList()
  },[])

  const getImageUrl = (image) => {
    if (!image) return ''
    return image.startsWith('http') ? image : `${backendUrl}/images/${image}`
  }

  return (
    <div className='bg-slate-50 min-h-[calc(100vh-5rem)] p-6 rounded-3xl shadow-sm'>
      <div className='mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between'>
        <div>
          <p className='text-3xl font-semibold text-slate-900'>Hotel Rooms List</p>
          <p className='text-sm text-slate-500'>Manage your hotel inventory and room pricing in one place.</p>
        </div>
        <div className='rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm'>
          {list.length} rooms available
        </div>
      </div>

      <div className='overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm'>
        <div className='grid grid-cols-[140px_1fr_120px_80px] gap-6 px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 border-b border-slate-200'>
          <span>Image</span>
          <span>Room Name</span>
          <span>Price</span>
          <span className='text-right'>Actions</span>
        </div>

        {list.length === 0 ? (
          <div className='p-10 text-center text-slate-500'>No rooms available yet.</div>
        ) : (
          list.map((item, index) => (
            <div key={index} className='grid grid-cols-[140px_1fr_120px_80px] gap-6 items-center px-6 py-5 hover:bg-slate-50 transition'>
              <div className='relative h-20 w-full overflow-hidden rounded-3xl border border-slate-200 bg-slate-100'>
                <img
                  src={getImageUrl(item.image)}
                  alt={item.name || 'Hotel image'}
                  className='h-full w-full object-cover'
                />
              </div>

              <div className='space-y-1'>
                <p className='text-base font-semibold text-slate-900'>{item.name || 'Untitled room'}</p>
                <p className='text-sm text-slate-500'>{item.description || 'No description available.'}</p>
                <div className='flex flex-wrap gap-2 pt-2'>
                  {item.amenities?.slice(0, 4).map((amenity, amenityIndex) => (
                    <span key={amenityIndex} className='rounded-full bg-fuchsia-50 px-3 py-1 text-xs font-medium text-fuchsia-700'>
                      {typeof amenity === 'string' ? amenity : amenity.label}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className='text-lg font-semibold text-slate-900'>${item.price}</p>
              </div>

              <div className='flex justify-end'>
                <button
                  onClick={() => handleDelete(item._id || item.id)}
                  disabled={deletingId === (item._id || item.id)}
                  className='inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-red-100 bg-red-50 text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50'
                >
                  <MdDeleteForever size={20} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default ListHotel