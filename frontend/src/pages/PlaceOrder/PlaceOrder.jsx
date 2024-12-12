import React, { useState, useContext } from 'react';
import '../PlaceOrder/PlaceOrder.css';
import { StoreContext } from '../../context/storeContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PlaceOrder = () => {
      const navigate = useNavigate();
      const { getTotalAmmount, token, food_list, cartItems, url } = useContext(StoreContext);
      const [data, setData] = useState({
            firstName: "",
            lastName: "",
            email: "",
            street: "",
            zipcode: "",
            city: "",
            state: "",
            country: "",
            phone: ""
      });

      const onChangeHandler = (e) => {
            const name = e.target.name;
            const value = e.target.value;
            setData((data) => ({ ...data, [name]: value }));
      };

      const placeOrder = async (e) => {
            e.preventDefault();
            let orderItems = [];

            food_list.map((item) => {
                  if (cartItems[item._id] > 0) {
                        let itemInfo = item;
                        itemInfo["quantity"] = cartItems[item._id];
                        orderItems.push(itemInfo);
                  }
            });

            let orderData = {
                  address: data,
                  items: orderItems,
                  amount: getTotalAmmount() + 2,
            };

            try {
                  let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });

                  if (response.data.success) {
                        const { session_url } = response.data;
                        window.location.replace(session_url); // Redirect to the session URL
                  } else {
                        console.error('Error in response data:', response.data);
                        alert("Error: Order could not be placed.");
                  }
            } catch (error) {
                  console.error("Error making the request:", error);
                  alert("There was an error processing your order. Please try again.");
            }
      };

      const handleOnClick = () => {
            navigate('/order'); // Navigate to '/order' route before form submission.
      };

      return (
            <form onSubmit={placeOrder} className='place-order'>
                  <div className="place-order-left">
                        <p className='title'>Delivery Information</p>
                        <div className='multi-fields'>
                              <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First-name' />
                              <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last-name' />
                        </div>
                        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email-address' />
                        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />

                        <div className='multi-fields'>
                              <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
                              <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
                        </div>

                        <div className='multi-fields'>
                              <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
                              <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code' />
                        </div>
                        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
                  </div>

                  <div className="place-order-right">
                        <div className="cart-total">
                              <h2>Cart Total</h2>
                              <div>
                                    <div className="cart-total-details">
                                          <p>SubTotal</p>
                                          <p>${getTotalAmmount()}</p>
                                    </div>
                                    <hr />
                                    <div className="cart-total-details">
                                          <p>Delivery Fee</p>
                                          <p> ${getTotalAmmount() === 0 ? 0 : 2}</p>
                                    </div>
                                    <hr />
                                    <div className="cart-total-details">
                                          <p>Total</p>
                                          <p>${getTotalAmmount() === 0 ? 0 : getTotalAmmount() + 2}</p>
                                    </div>
                                    <hr />
                              </div>
                              <button onClick={handleOnClick} type='submit'>PROCEED TO CHECKOUT</button> {/* Keep onClick here */}
                        </div>
                  </div>
            </form>
      );
};

export default PlaceOrder;

