import React from 'react'
import './Navbar.css'
import logo from '../../assets/logo.jpg'
import navProfile from '../../assets/profile.jpg'


const Navbar = () => {
    return (
        <div className='navbar'>
            <p>hi</p>
            <img src={logo} alt='' className='nav-logo' />
            <img src={navProfile} alt='' className='nav-profile' />
        </div>
    )
}

export default Navbar