import React from 'react'
import '../Footer/Footer.css';
import { assets } from '../../assets/assets';

const Footer = () => {
      return (
            <div className='footer' id='footer'>
                  <div className="footer-content">
                        <div className="footer-content-left">
                              <img className='logo' src={assets.logo} alt="logo" />
                              <p></p>

                              <div className="footer-social-icons">
                                    <img src={assets.linkedin_icon} alt="linkedin_icon" />
                                    <img src={assets.twitter_icon} alt="twitter_icon" />
                                    <img src={assets.facebook_icon} alt="facebook_icon" />
                              </div>
                        </div>
                        <div className="footer-content-center">
                              <h2>Company</h2>
                              <ul>
                                    <li>Home</li>
                                    <li>About Us</li>
                                    <li>Delivery</li>
                                    <li>Privacy Policy</li>
                              </ul>
                        </div>
                        <div className="footer-content-right">
                              <h2>Get In Touch</h2>
                              <ul>
                                    <li>+91 9368XXXX</li>
                                    <li>bhook@ac.in</li>
                              </ul>
                        </div>
                  </div>

                  <hr />
                  <p className='footer-copyright'>Copyright 2024 &copy; BHOOK. All rights reserved. </p>
            </div>
      )
}

export default Footer
