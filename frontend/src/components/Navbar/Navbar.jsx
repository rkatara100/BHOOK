import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import SmoothScroll from 'smooth-scroll';
import { assets } from '../../assets/assets';
import { useContext } from 'react';
import { StoreContext } from '../../context/storeContext';

const Navbar = ({ setShowLogin }) => {
      const [menu, setMenu] = useState("home");
      const { getTotalAmmount, token, setToken } = useContext(StoreContext);

      const handleFunc = {

      }
      const Logout = () => {
            localStorage.removeItem("token");
            setToken("");
            useNavigate("/");

      }

      //for scrolling
      useEffect(() => {
            const scroll = new SmoothScroll('a[href*="#"]', {
                  speed: 500,
                  speedAsDuration: true,
            });

            return () => scroll.destroy();
      }, []);

      return (
            <div className='navbar'>
                  <Link to='/'><img src={assets.logo} className='logo' alt='logo' /></Link>
                  <ul className='navbar-menu'>
                        <Link to='/' onClick={() => { setMenu("home") }} className={menu === 'home' ? 'active' : ''}>home</Link>
                        <a href='#explore-menu' onClick={() => { setMenu("menu") }} className={menu === 'menu' ? 'active' : ''}>menu</a>
                        <a href='#app-download' onClick={() => { setMenu("mobile-app") }} className={menu === 'mobile-app' ? 'active' : ''}>mobile-app</a>
                        <a href='#footer' onClick={() => { setMenu("contact us") }} className={menu === 'contact us' ? 'active' : ''}>contact us</a>
                  </ul>

                  <div className='navbar-right'>
                        <img src={assets.search_icon} alt="" />
                        <div className="navbar-search-icon">
                              <Link to='/cart'> <img src={assets.basket_icon} alt="basket_icon" className="basket_icon" /></Link>
                              <div className={getTotalAmmount() === 0 ? "" : "dot"}></div>
                        </div>

                        {
                              !token ? <button onClick={() => setShowLogin(true)}>sign in</button>
                                    : <div className='navbar-profile'>
                                          <img src={assets.profile_icon} alt="profile_img" />
                                          <ul className='nav-profile-dropdown'>
                                                <li>
                                                      <img src={assets.bag_icon} alt="bag_icon" />
                                                      <p>Orders</p>
                                                </li>
                                                <hr />

                                                <li onClick={Logout}>
                                                      <img src={assets.logout_icon} alt="logout_icon" />
                                                      <p>Logout</p>
                                                </li>

                                          </ul>
                                    </div>
                        }

                  </div>
            </div>
      );
}

export default Navbar;
