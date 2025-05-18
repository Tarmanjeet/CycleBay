import { useState } from 'react'
import './App.css'
import { BrowserRouter , Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import SignIn from './Pages/Auth/signin'
import SignUp from './Pages/Auth/signup'
import NavBar from './Components/NavBar'
import Profile from './Pages/Profile'
import About from './Pages/About'
import Sell from './Pages/Sell'

function App() {
  const [count, setCount] = useState(0)

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
        </Routes>
      </BrowserRouter>
  </>
  )
}

export default App
