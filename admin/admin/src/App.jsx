import { useState, useEffect } from "react";
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Sidebar from'./Components/Sidebar'
import AddHotel from './Pages/AddHotel'
import ListHotel from './Pages/ListHotel'
import Reservation from './Pages/Reservation'
import Login from './Components/Login'
import Dashboard from './Pages/Dashboard'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const backendUrl = 'http://localhost:5000'

const App =() => {
    const [token, setToken] = useState('')
    console.log("App render, token state:", token)

    useEffect(() => {
        const savedToken = localStorage.getItem('token')
        if(savedToken) setToken(savedToken)


    },[])

    useEffect(() => {
        if(token) localStorage.setItem('token', token)
            else localStorage.removeItem('token')
    },[token])


    return(
        <BrowserRouter>
            <ToastContainer />
    
       {token ? (
            <div className="flex items-start min-h-screen">
                <Sidebar setToken={setToken} />
                <div className="flex-1 ml-[max(5vw,25px)] my-8 text-black text-base">
                    <Routes>
                         <Route path="/" element={<Navigate to="/dashboard" replace/>} />
                        <Route path="/dashboard" element={<Dashboard token={token} />} />
                        <Route path="/add" element={<AddHotel token={token} />} />
                        <Route path="/list" element={<ListHotel token={token} />} />
                        <Route path="/reservation" element={<Reservation token={token} />} />
                        <Route path="*" element={<Navigate to="/dashboard" replace/>} />

                    </Routes>

                </div>

            </div>

        ) : (
            <Login setToken={setToken} />

        )}

    </BrowserRouter>
        
    )

    } 

    export default App


      
       