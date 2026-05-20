import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Navbar from './components/Navbar'
import Homepage from './pages/Homepage'
import HotelDetails from './pages/HotelDetails'
import Footer from './components/Footer'
const App = () => {
  return (
  

     <BrowserRouter> 
     <div>
     <Navbar />
     <Routes>
      <Route path='/' element={<Homepage />} />
      <Route path='/rooms/:id' element={<HotelDetails />} />
     </Routes>
     <Footer />
    </div>
    </BrowserRouter>
  )
}

export default App