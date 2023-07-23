import React from 'react'
import logo from '../Logos/logo.PNG';
import { NavLink } from 'react-router-dom';



const Navbar = () => {
  return (
   <header>
    <nav className='navigation'>
        <div className='nav-left'>
            <img src={logo} alt='logo' />
            <h2>Space Traveler's Hub</h2>
        </div>
        <ul className='nav-list'>
  <li>
    <NavLink to="/">Rockets</NavLink>
  </li>
  <li>
    <NavLink className='mission-link' to="/missions">Missions</NavLink>
  </li>
  <li>
    <NavLink to="/myprofile">My Profile</NavLink>
  </li>
</ul>

    </nav>
    <hr />
   </header>
  )
}

export default Navbar;