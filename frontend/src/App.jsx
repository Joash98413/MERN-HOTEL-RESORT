import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Navbar from './Components/Navbar'
import Homepage from './pages/Homepage'
import HotelDetails from './pages/HotelDetails'
import Footer from './Components/Footer'
import MakeReservation from './pages/MakeReservation'
 export const backendUrl ='http://localhost:5000'
const App = () => {

 
  return (

    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/rooms" element={<Homepage />} />
            <Route path='/hotel/:id' element={<HotelDetails />} />
            <Route path="/bookings" element={<MakeReservation />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App