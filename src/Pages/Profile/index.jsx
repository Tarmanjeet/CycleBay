import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../Components/NavBar';

function Profile() {
    return (
        <>
            <NavBar/>
            <h1>your profile</h1>
        </>
    )
}

export default Profile;