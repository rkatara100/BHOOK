import React, { useContext, useEffect, useState } from 'react';
import './LoginPopup/LoginPopup.css';
import { assets } from '../../assets/assets';
import axios from "axios";
import { StoreContext } from '../../context/storeContext';

const LoginPopup = ({ setShowLogin }) => {
      const { url, setToken } = useContext(StoreContext);

      const [currState, setCurrState] = useState("SignUp");
      const [data, setData] = useState({
            name: "",
            email: "",
            password: ""
      });

      const onChangeHandler = (e) => {
            const name = e.target.name;
            const value = e.target.value;

            setData(data => ({ ...data, [name]: value }));
      }

      const onLogin = async (e) => {
            e.preventDefault();

            // Ensure the URL ends with a slash
            let newURL = url.endsWith("/") ? url : url + "/";

            if (currState === "Login") {
                  newURL += "api/user/login";
            } else {
                  newURL += "api/user/register";
            }

            console.log("Attempting to reach URL:", newURL);  // Log URL for debugging

            try {
                  const response = await axios.post(newURL, data, {
                        headers: {
                              'Content-Type': 'application/json',
                        },
                  });

                  if (response.data && response.data.success) {
                        setToken(response.data.token);
                        localStorage.setItem("token", response.data.token);
                        setShowLogin(false);
                  } else {
                        alert(response.data?.message || "An error occurred.");
                  }
            } catch (error) {
                  console.error("Error during login or signup:", error);

                  if (error.response) {
                        // Server responded with an error
                        console.log("Server Response:", error.response.data);
                  } else if (error.request) {
                        // No response received
                        console.log("No response received:", error.request);
                  } else {
                        // Request was made but failed
                        console.log("Error Message:", error.message);
                  }

                  alert("Network error. Please check your connection or try again.");
            }
      };

      return (
            <div className='login-popup'>
                  <form action="" onSubmit={onLogin} className="login-popup-container">
                        <div className="login-popup-title">
                              <h2>{currState}</h2>
                              <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="cross-icon" />
                        </div>

                        <div className="login-popup-inputs">
                              {currState === "Login" ? "" : <><input name='name' onChange={onChangeHandler} type="text" value={data.name} placeholder='Your name' required /></>}
                              <input name='email' onChange={onChangeHandler} value={data.email} type="text" placeholder='Your Email' required />
                              <input name='password' onChange={onChangeHandler} value={data.password} type="text" placeholder='Password' required />
                        </div>

                        <button type='submit'>{currState === "SignUp" ? "Create Account" : "Login"}</button>

                        <div className="login-popup-condition">
                              <input type="checkbox" required />
                              <p>By continuing, I agree to the terms of use & privacy policy.</p>
                        </div>
                        {
                              currState === "Login"
                                    ? <p>Create a new Account? <span onClick={() => setCurrState("SignUp")}>Click here</span> </p>
                                    : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
                        }
                  </form>
            </div>
      );
}

export default LoginPopup;
