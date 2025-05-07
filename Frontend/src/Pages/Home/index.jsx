import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../Components/NavBar';

function Home() {
    return (
        <>
        <NavBar/>
        <h1>Home</h1>
        </>
    )
}

export default Home;