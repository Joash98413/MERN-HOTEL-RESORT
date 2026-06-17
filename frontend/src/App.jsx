import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Navbar from './components/Navbar'
import Homepage from './pages/Homepage'
import HotelDetails from './pages/HotelDetails'
import Footer from './components/Footer'
import AddHotel from './pages/AddHotel'

 export const backendUrl ='http://localhost:5000'
const App = () => {

 
  return (
  

     <BrowserRouter> 
     <div>
     <Navbar />
     <Routes>
      <Route path='/' element={<Homepage />} />
      <Route path='/hotel/:id' element={<HotelDetails />} />
      <Route path='/add-hotel' element={<AddHotel/>} />
     </Routes>
     <Footer />
    </div>
    </BrowserRouter>
  )
}

export default App