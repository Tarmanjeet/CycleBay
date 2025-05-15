import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../Components/NavBar';
import './home.css'

function Home() {
    return (
        <>
        <div className="home">
            <NavBar/>
            
        </div>
       
        </>
    )
}

export default Home;