import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../App";
import { FaWifi, FaTv, FaUtensils, FaSwimmingPool, FaConciergeBell } from "react-icons/fa";

const HotelDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loadingRoom, setLoadingRoom] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchRoomDetails = async () => {
      setLoadingRoom(true);
      try {
        const response = await axios.get(`${backendUrl}/api/hotel/rooms/${id}`);
        // backend returns { success: true, data: hotel }
        setRoom(response.data?.data || null);
      } catch (error) {
        console.error("Failed to fetch hotel details:", error);
        setRoom(null);
      } finally {
        setLoadingRoom(false);
      }
    };

    if (id) fetchRoomDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !checkin || !checkout || !guests) {
      setMessage("Please fill in all booking fields.");
      return;
    }

    try {
      const response = await axios.post(`${backendUrl}/api/reservations/create`, {
        name,
        email,
        phone,
        checkin,
        checkout,
        guests,
        roomName: room?.name || "",
        roomId: room?._id || id,
      });

      if (response.data && response.data.reservation) {
        setMessage("Reservation created successfully.");
        setName("");
        setEmail("");
        setPhone("");
        setCheckin("");
        setCheckout("");
        setGuests(1);
      } else {
        setMessage("Unable to create reservation. Please try again.");
      }
    } catch (error) {
      console.error("Reservation error:", error);
      setMessage("Reservation failed. Please try again later.");
    }
  };

  if (loadingRoom) {
    return <div className="p-6 text-center text-lg text-slate-700">Loading hotel details...</div>;
  }

  if (!room) {
    return <div className="p-6 text-center text-lg text-red-600">Hotel not found.</div>;
  }

  return (
    <div className="max-auto max-w-7xl p-6 grid grid-cols-1 gap-8">
      {/* left side */}
      <div className="md:col-span-2 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{room.name}</h1>
          <p className="text-xl text-lime-500 mt-1">${Number(room.price || 0).toFixed(2)}</p>
        </div>
        <img src={room.image} alt={room.name} className="w-full rounded-lg shadow-md" />
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
       <h2 className="text-2xl font-semibold mb-3">Amenities</h2>
        <div className="grid grid-cols-2 gap-4 text-gray-700">
          {room.amenities?.length > 0 ? (
            room.amenities.map((amenity, index) => (
              <div key={index} className="flex items-center gap-2">
                <span>{typeof amenity === 'string' ? amenity : amenity.label}</span>
              </div>
            ))
          ) : (
            <div className="text-slate-600">No amenities listed.</div>
          )}
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Room Description</h2>
          <p className="text-gray-800">{room.description || "No description available."}</p>
        </div>
      </div>
    </div>
      {/* right side */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Book Your Stay</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="w-full border border-gray-300 p-3 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full border border-gray-300 p-3 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number"
              className="w-full border border-gray-300 p-3 rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="checkin" className="block text-sm font-semibold text-slate-700 mb-2">Check-In</label>
            <input
              type="date"
              name="checkin"
              id="checkin"
              value={checkin}
              onChange={(e) => setCheckin(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="checkout" className="block text-sm font-semibold text-slate-700 mb-2">Check-Out</label>
            <input
              type="date"
              name="checkout"
              id="checkout"
              value={checkout}
              onChange={(e) => setCheckout(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="guests" className="block text-sm font-semibold text-slate-700 mb-2">Number of Guests</label>
            <select
              name="guests"
              id="guests"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full border rounded-lg p-3 focus:ring focus:ring-blue-500"
            >
              {[...Array(6).keys()].map((num) => (
                <option key={num + 1} value={num + 1}>
                  {num + 1} Guest{num + 1 > 1 ? 's' : ''}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="w-full bg-lime-400 text-white p-3 rounded-lg hover:bg-lime-300 transition duration-300">
            Book Now
          </button>
          {message && <p className="text-sm text-slate-600">{message}</p>}
        </form>
      </div>
    </div>
  )
}

export default HotelDetails;