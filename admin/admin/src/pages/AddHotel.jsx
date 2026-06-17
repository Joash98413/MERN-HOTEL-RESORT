import React, { useState } from 'react'
import default_img from "../assets/Double.jpg"
import axios from 'axios'
import { backendUrl } from '../App'

const AddHotel=({token})=> {
  const [image, setImage] = useState(null)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [amenities, setAmenities] = useState("")

  const [errorMessage, setErrorMessage] = useState("")

  const roomSubmission = async (e) => {
    e.preventDefault()
    setErrorMessage("")

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      const amenityList = amenities
        .split(/\n|,/) 
        .map((item) => item.trim())
        .filter(Boolean)
        .map((label) => ({ label }));
      formData.append("amenities", JSON.stringify(amenityList));

      if (image) formData.append("image", image)

      const response = await axios.post(`${backendUrl}/api/hotel/add`, formData)

      if (response.data.success) {
        console.log(response.data.message);
        setName("")
        setDescription("")
        setPrice("")
        setAmenities("")
        setImage(null)
      } else {
        setErrorMessage(response.data.message || "Failed to add room")
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || error.message || "Failed to add room")
      console.error(error)
    }
  }
  return ( 
    <div>
      <form onSubmit={roomSubmission} className='space-y-6'>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-[180px_1fr] items-start'>
          <label htmlFor='image' className='text-xl font-semibold'>Upload Image</label>
          <div>
            <label htmlFor='image' className='inline-block cursor-pointer'>
              <img
                src={image instanceof File ? URL.createObjectURL(image) : default_img}
                alt='upload'
                className='w-32 h-32 object-cover rounded-lg border border-gray-300'
              />
              <input type='file' id='image' hidden accept='image/*' onChange={(e)=> setImage(e.target.files[0])} />
            </label>
          </div>
        </div>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-[180px_1fr] items-center'>
          <label htmlFor='name' className='text-xl font-semibold'>Room Name</label>
          <input
            id='name'
            type='text'
            placeholder='Enter room name'
            value={name}
            onChange={(e)=> setName(e.target.value)}
            className='w-full max-w-[500px] p-4 border border-gray-300 rounded'
          />
        </div>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-[180px_1fr] items-center'>
          <label htmlFor='description' className='text-xl font-semibold'>Room Description</label>
          <input
            id='description'
            type='text'
            placeholder='Enter room description'
            value={description}
            onChange={(e)=> setDescription(e.target.value)}
            className='w-full max-w-[500px] p-4 border border-gray-300 rounded'
          />
        </div>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-[180px_1fr] items-center'>
          <label htmlFor='price' className='text-xl font-semibold'>Price</label>
          <input
            id='price'
            type='number'
            placeholder='40'
            value={price}
            onChange={(e)=> setPrice(e.target.value)}
            className='w-full max-w-[500px] p-4 border border-gray-300 rounded'
          />
        </div>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-[180px_1fr] items-start'>
          <label htmlFor='amenities' className='text-xl font-semibold'>Amenities</label>
          <div className='w-full max-w-[500px] space-y-2'>
            <textarea
              id='amenities'
              rows='4'
              placeholder='Free Wi-Fi, Pool Access, Flat-screen TV'
              value={amenities}
              onChange={(e)=> setAmenities(e.target.value)}
              className='w-full p-4 border border-gray-300 rounded resize-y'
            />
            <p className='text-sm text-slate-500'>Separate amenities with commas or new lines.</p>
          </div>
        </div>

        <button type='submit' className='mt-6 px-20 py-3 bg-fuchsia-600 text-white rounded'>Add Room</button>
        {errorMessage && (
          <p className='text-sm text-red-600 mt-3'>{errorMessage}</p>
        )}
      </form>
    </div>
  )
}

export default AddHotel