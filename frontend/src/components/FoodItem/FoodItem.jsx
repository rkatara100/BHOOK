import React, { useContext } from 'react'
import '../FoodItem/FoodItem.css';
import { assets } from '../../assets/assets';

const FoodItem = ({ id, name, price, description, image }) => {
      return (
            <div className='food-item'>
                  <div className="food-item-img-container" id={id}>
                        <img src={image} alt="food-item-image" />
                        <div className="food-item-info">
                              <div className="food-item-name-rating">
                                    <p>{name}</p>
                                    <img src={assets.rating_starts} alt="rating rates" />
                              </div>
                              <p className="food-item-description">
                                    {description}
                              </p>
                              <p className='food-item-price'>${price}</p>
                        </div>
                  </div>
            </div>
      )
}

export default FoodItem
