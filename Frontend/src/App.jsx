
import './App.css'
import { BrowserRouter , Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import SignIn from './Pages/Auth/signin'
import SignUp from './Pages/Auth/signup'
import LikedProducts from './Pages/Liked/index.jsx'
import Profile from './Pages/Profile'
import About from './Pages/About'
import Sell from './Pages/Sell'
import ProductDetail from './Pages/ProductDetail'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {


  return (
  <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} /> 
            <Route path="/about" element={<About />} />
            <Route path="/sell" element={<Sell/>} />
            <Route path="/likedProducts" element={<LikedProducts/>} />
            <Route path="/product/:id" element={<ProductDetail/>}/>
        </Routes>
      </BrowserRouter>
  </>
  )
}

export default App
