import { useState } from 'react'
import './App.css'
import { BrowserRouter , Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import SignIn from './Pages/Auth/signin'
import SignUp from './Pages/Auth/signup'
import NavBar from './Components/NavBar'
import Profile from './Pages/Profile'



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
        </Routes>
      </BrowserRouter>
  </>
  )
}

export default App
