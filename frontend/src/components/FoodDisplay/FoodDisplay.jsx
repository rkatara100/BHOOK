import React, { useContext } from 'react';
import '../FoodDisplay/FoodDisplay.css';
import { StoreContext } from '../../context/storeContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {
      const { food_list } = useContext(StoreContext);

      return (
            <div className='food-display' id='food-display'>
                  <h2>Top dishes around you to Taste.</h2>
                  <div className='food-display-list'>
                        {food_list.map((item) => {
                              if (category === 'All' || category === item.category) {
                                    return (
                                          <FoodItem
                                                key={item._id}
                                                id={item._id}
                                                name={item.name}
                                                description={item.description}
                                                price={item.price}
                                                image={item.image}
                                          />
                                    );
                              }
                        })}
                  </div>
            </div>
      );
};

export default FoodDisplay;
