import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-[5vw] py-4 bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <Link to="/" className="text-2xl font-bold text-fuchsia-900 tracking-tight">
        DELUXE <span className="text-gray-800">RESORT</span>
      </Link>
      
      <div className="flex items-center gap-8">
        <NavLink to="/rooms" className={({isActive}) => `text-base font-medium transition-colors ${isActive ? 'text-fuchsia-700' : 'text-gray-600 hover:text-fuchsia-600'}`}>
          Rooms
        </NavLink>
        <NavLink to="/bookings" className={({isActive}) => `px-5 py-2 rounded-full text-white text-sm font-bold transition-all ${isActive ? 'bg-fuchsia-800' : 'bg-fuchsia-600 hover:bg-fuchsia-700 shadow-md hover:shadow-lg'}`}>
          Bookings
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;