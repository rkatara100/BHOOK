import React from 'react';
import "./Navbar.css"
import { assets } from "../../admin_assets/assets";

const Navbar = () => {
      return (
            <div className='navbar'>
                  <img className="logo" src={assets.logo} alt="logo_image" />
                  <img className="profile" src={assets.profile_image} alt="profile_image" />
            </div>
      )
}

export default Navbar
