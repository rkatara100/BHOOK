import React from 'react'
import '../Cart/Cart.css';
import { StoreContext } from "../../context/storeContext";
import { useContext } from 'react';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';

const Cart = () => {

      const { food_list, cartItems, removefromCart, getTotalAmmount, url } = useContext(StoreContext);
      const navigate = useNavigate();

      return (
            <div className='cart'>
                  <div className="cart-items">
                        <div className="cart-items-title">
                              <p>Items</p>
                              <p>Title</p>
                              <p>Price</p>
                              <p>Quantity</p>
                              <p>Total</p>
                              <p>Remove</p>
                        </div>
                        <br />
                        <hr />

                        {food_list.map((item, index) => {

                              if (cartItems[item._id] > 0) {
                                    return (
                                          <>
                                                <div className="cart-items-title cart-items-item" key={item._id}>

                                                      <img src={url + "/images/" + item.image} alt="image" />
                                                      <p>{item.name}</p>
                                                      <p>${item.price}</p>
                                                      <p>{cartItems[item._id]}</p>
                                                      <p>${item.price * cartItems[item._id]}</p>
                                                      <p onClick={() => removefromCart(item._id)} className='cross'>x</p>
                                                </div>
                                                <hr />
                                          </>
                                    )
                              }

                        })}

                  </div>

                  <div className="cart-bottom">

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

                        <div className='cart-promocode'>
                              <div>
                                    <p>If you have a promo code,Enter it Here,</p>
                                    <div className="cart-promocode-input">
                                          <input type="text" placeholder='Promo Code' />
                                          <button type='submit'>Submit</button>
                                    </div>
                              </div>
                        </div>

                  </div>

            </div>
      )
}

export default Cart
