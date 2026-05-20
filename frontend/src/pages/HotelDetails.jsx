import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { RoomContext } from "../context/RoomContext";
import { roomData } from "../assets/asset";
import { FaWifi, FaTv, FaUtensils, FaSwimmingPool, FaConciergeBell } from "react-icons/fa";

const HotelDetails = () => {
  const { id } = useParams();

  const room = roomData.find((room) => {
    return room.id === parseInt(id);
})
  return (
    <div className="max-auto max-w-7xl p-6 grid grid-cols-1 gap-8">
      {/* left side */}
      <div className="md:col-span-2 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{room.name}</h1>
          <p className="text-xl text-lime-500 mt-1">${room.price.toFixed(2)}</p>
        </div>
        <img src={room.image} alt="" className="w-full rounded-lg shadow-md" />
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
       <h2 className="text-2xl font-semibold mb-3">Amenities</h2>
        <div className="grid grid-cols-2 gap-4 text-gray-700">
          <div className="flex items-center gap-2">
            <FaWifi /> Wi-Fi
          </div>
          <div className="flex items-center gap-2">
            <FaTv /> TV
          </div>
          <div className="flex items-center gap-2">
            <FaUtensils /> Resturant
          </div>
          <div className="flex items-center gap-2">
            <FaSwimmingPool /> Swimming Pool
          </div>
          <div className="flex items-center gap-2">
            <FaConciergeBell /> Room Service
          </div>
        </div>
        <div >
          <h2 className="text-lg font-semibold mb-2">Room Description</h2>
          <p className="text-gray-800">{room.description || "No description available."}</p>
          <p className="text-gray-800">{room.description || "No description available."}</p>
          <p className="text-gray-800">{room.description || "No description available."}</p>
          <p className="text-gray-800">{room.description || "No description available."}</p>
        </div>
      </div>
    </div>
      {/* right side */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Book Your Stay</h2>
        <form className="space-y-4">
          <input type="text" name="" placeholder="Name" className="w-full border border-gray-300 p-3 rounded-lg" />
          <input type="email" name="" placeholder="Email"  className="w-full border border-gray-300 p-3 rounded-lg" />
          <input type="text" name="" placeholder="Phone Number" className="w-full border border-gray-300 p-3 rounded-lg" />
          <div>
            <label htmlFor="date" className="font-bold">Check-In</label>
            <input type="date" name="" id="" className="w-full border border-gray-300 p-3 rounded-lg" />
          </div>
          <div>
            <label htmlFor="" className="font-bold">Number of Guests</label>
            <select name="" id="" className="w-full border rounded-lg focus:ring focus:ring-blue-500">
              {[...Array(3).keys()].map((num) => (
                <option key={num+1} value={num + 1}>{num + 1} Guests(s)</option>
              ))}

            </select>
          </div>
          <button type="submit" className="w-full bg-lime-400 text-white p-3 rounded-lg hover:bg-lime-300 transition duration-300">Book Now</button>
        </form>
      </div>
    </div>
  )
}

export default HotelDetails;