import React from 'react';
import '../PlaceOrder/PlaceOrder.css';
import { StoreContext } from '../../context/storeContext';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

const PlaceOrder = () => {
      const navigate = useNavigate();
      const { getTotalAmmount } = useContext(StoreContext);

      return (
            <form action="" className='place-order'>
                  <div className="place-order-left">
                        <p className='title'>Delivery Information</p>
                        <div className='multi-fields'>
                              <input type="text" placeholder='First-name' />
                              <input type="text" placeholder='Last-name' />
                        </div>
                        <input type="email" placeholder='Email-address' />
                        <input type="text" placeholder='Street' />

                        <div className='multi-fields'>
                              <input type="text" placeholder='City' />
                              <input type="text" placeholder='State' />
                        </div>

                        <div className='multi-fields'>
                              <input type="text" placeholder='Country' />
                              <input type="text" placeholder='Zip code' />
                        </div>
                        <input type="text" placeholder='Phone' />
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
                              <button onClick={() => navigate('/order')} >PROCEED TO CHECKOUT</button>
                        </div>
                  </div>
            </form>
      )
}

export default PlaceOrder
