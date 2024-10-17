import React from 'react'
import '../Header/Header.css'

const Header = () => {

      const handleFunc = () => {
            const exploreMenu = document.getElementById('explore-menu');

            if (exploreMenu) {
                  exploreMenu.scrollIntoView({ behavior: 'smooth' });
            }
      };

      return (
            <div className='header'>
                  <div className="header-contents">
                        <h2>Order your favourite food here</h2>
                        <p> Choose from a diverse menu get the best dishesh quickly and in time from your nearest restaurant. </p>
                        <button onClick={handleFunc}>View</button>
                  </div>
            </div>
      )
}

export default Header
