import React, { useContext } from 'react';
import '../FoodItem/FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/storeContext';

const FoodItem = ({ id, name, price, description, image }) => {
      const { cartItems, addToCart, removefromCart, url } = useContext(StoreContext);

      return (
            <div className='food-item'>
                  <div className="food-item-img-container" id={id}>
                        <div className='food-item-image'>
                              <img className='food-item-image-icon' src={url + "/images/" + image} alt="food-item-image" />
                              {
                                    !cartItems[id]
                                          ? <img
                                                className='add'
                                                onClick={() => addToCart(id)}
                                                src={assets.add_icon_white}
                                                alt='Add item to cart'
                                          />
                                          : <div className="food-item-counter">
                                                <img
                                                      onClick={() => removefromCart(id)}
                                                      src={assets.remove_icon_red}
                                                      alt="Remove item from cart"
                                                />
                                                <p>{cartItems[id]}</p>
                                                <img
                                                      onClick={() => addToCart(id)}
                                                      src={assets.add_icon_green}
                                                      alt="Add more of this item"
                                                />
                                          </div>
                              }
                        </div>

                        <div className="food-item-info">
                              <div className="food-item-name-rating">
                                    <p>{name}</p>
                                    <img src={assets.rating_starts} alt="Rating stars" />
                              </div>
                              <p className="food-item-description">{description}</p>
                              <p className='food-item-price'>${price}</p>
                        </div>
                  </div>
            </div>
      );
};

export default FoodItem;
