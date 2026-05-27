import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Navbar from './components/Navbar'
import Homepage from './pages/Homepage'
import HotelDetails from './pages/HotelDetails'
import Footer from './components/Footer'
import AddRoom from './pages/AddRoom'
const App = () => {
  return (
  

     <BrowserRouter> 
     <div>
     <Navbar />
     <Routes>
      <Route path='/' element={<Homepage />} />
      <Route path='/rooms/:id' element={<HotelDetails />} />
      <Route path='/add-room' element={<AddRoom/>} />
     </Routes>
     <Footer />
    </div>
    </BrowserRouter>
  )
}

export default App