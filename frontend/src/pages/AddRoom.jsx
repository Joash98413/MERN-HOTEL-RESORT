import { useState, useContext, useEffect } from "react"
import axios from 'axios'
import {toast} from 'react-toastify'
import {backendUrl} from '../App'
import { use } from "react"


const AddRoom = () => {
    const{backendUrl} = useContext(AdminContext)


    const [image, setImage] = useState(null)
    const [hotelId, setHotelId]= useState('')
    const [hotels, setHotels] = useState([])
    const [loading, setLoading] = useState(false)
}

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: "",
        image: null
    
    })

  
        const fetchHotels = async()=>{
            try{
                const res=await axios.get(`${backendUrl}/api/hotels/list`)
                if(res.data.success){
                    setHotels(res.data.hotels)
                }else{
                    toast.error('Failed to load hotels')
            }
        
        }catch(error){
            toast.error(error.message)
        }

    }
    fetchHotels()




    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    const handleImageChange = (e) => {
        setImage(e.target.files[0])
    }

const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    if(!image){
        toast.error("Please upload room image")
        setLoading(false)
        return
    }
    
    const data = new FormData()
    data.append("hotelId", hotelId)
    data.append("name", formData.name)
    data.append("price", formData.price)
    data.append("description", formData.description)
    data.append("image", image)

    try{

    const res = await axios.post("http://localhost:5000/api/hotel/add-room", data, {
        headers: {'Content-Type': 'multipart/form-data'}
    });
    const result = res.data

    if(result.success){
        toast.success("Room added successfully")
        setFormData({name:"",price:",",description:""})
        setImage(null)
    }else{
        toast.error("Failed to add room")
    }
    }catch(err){
        console.error(err)
        toast.error("An error occurred while adding the room")
    }finally{
        setLoading(false)
    }
};
    
return(
    <div>
        <h2>Add Room</h2>
        <form OnSubmit={handleSubmit}>
            <input 
            type="text" 
            name="name"
            placeholder="Room name"
            value={formData.name}
            onChange={handleChange}
            />
            <input 
            type="text" 
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            />
            <input 
            type="text" 
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            />
            <input 
            type="file" 
            name="image"
            onChange={handleImageChange}
            />
            <button type="submit">Add Hotel</button>
        </form>
    </div>
)

export default AddRoom