import React, { useState } from 'react'
import './LoginPopup/LoginPopup.css';
import { assets } from '../../assets/assets';

const LoginPopup = ({ setShowLogin }) => {

      const [currState, setCurrState] = useState("SignUp");

      return (
            <div className='login-popup'>
                  <form action="" className="login-popup-container">
                        <div className="login-popup-title">
                              <h2>{currState}</h2>
                              <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="cross-icon" />
                        </div>

                        <div className="login-popup-inputs">
                              {currState === "Login" ? "" : <><input type="text" placeholder='Your name' required /></>}
                              <input type="text" placeholder='Your Email' required />
                              <input type="text" placeholder='Password' required />
                        </div>

                        <button>{currState === "SignUp" ? "Create Account" : "Login"}</button>

                        <div className="login-popup-condition">
                              <input type="checkbox" required />
                              <p>By continuing, i agree to the terms of use & privacy policy.</p>
                        </div>
                        {
                              currState === "Login"
                                    ? <p>Create a new Account? <span onClick={() => setCurrState("SignUp")}>Click here</span> </p>
                                    : <p>Already have an account?<span onClick={() => setCurrState("Login")}>Login here</span></p>
                        }



                  </form>
            </div>
      )
}

export default LoginPopup