import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast, ToastContainer } from 'react-toastify';

const MakeReservation = () => {
  const [rooms, setRooms] = useState([]);
  const [formData, setFormData] = useState({
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    roomId: '',
    checkIn: '',
    checkOut: ''
  });
  const [loading, setLoading] = useState(false);

  // Fetch available rooms from the backend to populate the selection list
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/hotel/list`);
        if (response.data.success) {
          setRooms(response.data.hotels || []);
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };
    fetchRooms();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // This assumes you have a backend endpoint to handle reservations
      const response = await axios.post(`${backendUrl}/api/reservation/add`, formData);
      if (response.data.success) {
        toast.success("Your reservation has been confirmed!");
        setFormData({
          guestName: '',
          guestEmail: '',
          guestPhone: '',
          roomId: '',
          checkIn: '',
          checkOut: ''
        });
      } else {
        toast.error(response.data.message || "Booking failed. Please try again.");
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Server error: Unable to process booking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg my-10 border border-gray-100">
      <ToastContainer />
      <h1 className="text-3xl font-bold text-center text-fuchsia-900 mb-8">Book Your Stay</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input type="text" name="guestName" value={formData.guestName} onChange={handleChange} required className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-fuchsia-500 focus:border-fuchsia-500 outline-none" placeholder="John Doe" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input type="email" name="guestEmail" value={formData.guestEmail} onChange={handleChange} required className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-fuchsia-500 focus:border-fuchsia-500 outline-none" placeholder="john@example.com" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input type="tel" name="guestPhone" value={formData.guestPhone} onChange={handleChange} required className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-fuchsia-500 focus:border-fuchsia-500 outline-none" placeholder="+1 234 567 890" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Select Room</label>
            <select name="roomId" value={formData.roomId} onChange={handleChange} required className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-fuchsia-500 focus:border-fuchsia-500 outline-none bg-white">
              <option value="">Choose a room...</option>
              {rooms.map(room => (
                <option key={room._id} value={room._id}>
                  {room.name} - ${room.price}/night
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Check-in Date</label>
            <input type="date" name="checkIn" value={formData.checkIn} onChange={handleChange} required className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-fuchsia-500 focus:border-fuchsia-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Check-out Date</label>
            <input type="date" name="checkOut" value={formData.checkOut} onChange={handleChange} required className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-fuchsia-500 focus:border-fuchsia-500 outline-none" />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white font-bold bg-fuchsia-600 hover:bg-fuchsia-700 focus:outline-none transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Processing...' : 'Confirm Booking'}
        </button>
      </form>
    </div>
  );
};

export default MakeReservation;