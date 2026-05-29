import { useState } from "react"

const AddRoom = () => {
    const [formData, setFoemData] = useState({
        name: "",
        price: "",
        description: ""
    })
}

const handleSubmit = async (e) => {
    e.preventDefault()

    const res = await fetch("http://localhost:5000/api/hotel/add",{
        method:"POST",
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify(formData)
    })

    const data = await res.json()
    console.log(data)
}

return(
    <div>
        <h2>AddRoom</h2>
        <form OnSubmit={handleSubmit}>
            <input 
            type="text" 
            placeholder="Room name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            <button type="submit">Add Room</button>
        </form>
    </div>
)


export default AddRoom