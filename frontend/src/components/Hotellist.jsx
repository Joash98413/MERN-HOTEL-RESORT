import React, {useContext} from "react";
import {RoomContext} from "../context/RoomContext";
import {FaBath, FaWifi, FaBed, FaUserFriends} from "react-icons/fa";
import{Link, useParams} from "react-router-dom";



const amenitieslist = [
    {label: '1-2 persons', icon: <FaUserFriends className="text-gray-600"/>},
    {label: 'Bathtub', icon: <FaBath className="text-gray-600"/>},
    {label: 'King Size Bed', icon: <FaBed className="text-gray-600"/>},
    {label: 'Free Wi-Fi', icon: <FaWifi className="text-gray-600"/>},
]

const Hotellist = () => {
    const{id} =useParams();
    const {rooms} = useContext(RoomContext);
   console.log("rooms", rooms);
    return (
        <div className="bg-[#f70eb] py-16 px-4">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-serif text-center mb-12 text-gray-800">Book your stay and <br />relax in luxury</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {
                        rooms&& rooms.length > 0 ? (
                            rooms.map((room, index) => {
                                const {id, name, description, price} = room;
                                return (
                                    <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <Link to= {`/rooms/${id}`}>
                                    <img src={room.image} alt={room.name} className="w-full h-80 object-cover" />
                                    </Link>

                                        <div className="p-4">
                                    
                                        <h3 className="text-2xl font-semibold text-gray-800 mb-1">{room.name}</h3>
                                        <p className="text-3xl font-bold text-blue-500">${price.toFixed(2)}</p>
                                         
                                         <div className="grid grid-cols-2 gap-4 text-base text-gray-700">
                                        
                                          {  room.amenities?.map((amenity, i) => (
                                            <div key={i} className="flex items-center space-x-2">
                                                {amenity.icon} 
                                                <span className="ml-2" >{amenity.label}</span>
                                            </div>
                                         
                                           ))} 
                                        </div>
                                    </div>
                                </div>
                                    
                                )
                            })
                        ) : (
                         <p className="text-gray-600 text-center col-span-full">No rooms available</p>
                        
                        )
                    }
                </div>
            </div>
                </div>
    )
}


export default Hotellist