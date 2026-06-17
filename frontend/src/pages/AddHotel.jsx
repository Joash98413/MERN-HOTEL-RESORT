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

  const roomSubmission = async (e) => {
    e.preventDefault()

    try{
      const formData = new FormData();
      formData.append("name",name);
      formData.append("description",description);
      formData.append("price",price);
      const amenityList = amenities
        .split(/\n|,/) 
        .map((item) => item.trim())
        .filter(Boolean)
        .map((label) => ({ label }));
      formData.append("amenities", JSON.stringify(amenityList));

      if(image) formData.append("image", image)

        const response = await axios.post(`${backendUrl}/api/hotel/add`, formData)

        if(response.data.success){
          console.log(response.data.message);
          setName("")
          setDescription("")
          setPrice("")
          setAmenities("")
          setImage(null)
        }
        else{
          console.log(response.data.message)
        }
      
    }catch (error){
      console.log(error);
    

    }
  }
  return ( 
    <div>
      <form onSubmit={roomSubmission} className='flex flex_col items-start gap-1'>
        <div>
          <p>Upload Image</p>
          <div>
            <label htmlFor="image">
              <img src={image instanceof File? URL.createObjectURL(image):default_img} alt="upload" className='w-32 cursor-pointer'/>
              <input type="file" id='image' hidden accept='image/*' onChange={(e)=> setImage(e.target.files[0])} />
            </label>
          </div>
        </div>
        <div className='w-full'>
          <p className='mb-2 text-[22px]'>Room Name</p>
          <input type="text" placeholder='Enter room name' value={name} onChange={(e)=> setName(e.target.value)} className='w-full max-w-[500px] p-4 border border-gray-300 rounded'/>
        </div>

        <div className='w-full'>
          <p className='mb-2 text-[22px]'>Room Description</p>
          <input type="text" placeholder='Enter room description' value={description} onChange={(e)=> setDescription(e.target.value)}className='w-full max-w-[500px] p-4 border border-gray-300 rounded' />
        </div>

        <div className='w-full'>
          <p className='mb-2 text-[22px]'>Price</p>
          <input type="number" placeholder='40' value={price} onChange={(e)=> setPrice(e.target.value)} className='w-full max-w-[500px] p-4 border border-gray-300 rounded'/>
        </div>

        <div className='w-full'>
          <p className='mb-2 text-[22px]'>Amenities</p>
          <textarea
            rows='4'
            placeholder='Free Wi-Fi, Pool Access, Flat-screen TV'
            value={amenities}
            onChange={(e)=> setAmenities(e.target.value)}
            className='w-full max-w-[500px] p-4 border border-gray-300 rounded resize-y'
          />
          <p className='mt-2 text-sm text-slate-500'>Separate amenities with commas or new lines.</p>
        </div>
        <button type='submit'className='mt-6 px-20 py-3 bg-fuchsia-600 rounded' >Add Room</button>
      </form>
    </div>
  )
}

export default AddHotel