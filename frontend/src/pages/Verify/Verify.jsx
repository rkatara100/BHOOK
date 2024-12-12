import React, { useEffect, useState } from 'react';
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useContext } from 'react';
import { StoreContext } from '../../context/storeContext';

const Verify = () => {
      const [searchParams, setSearchParams] = useSearchParams();
      const success = searchParams.get("success");
      const orderId = searchParams.get("orderId");

      console.log(success, orderId);

      const navigate = useNavigate();

      const { url } = useContext(StoreContext);

      const verifyPayment = async () => {
            const response = await axios.post(url + "/api/order/verify", { success, orderId });
            if (response.data.success) {
                  navigate("/myorders");
            }
            else {
                  navigate("/");
            }
      }

      useEffect(() => {
            verifyPayment();
      }, []);

      return (
            <div className='verify'>
                  <div className="spinner">

                  </div>

            </div>
      )
}

export default Verify
