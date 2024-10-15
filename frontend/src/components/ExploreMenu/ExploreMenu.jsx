import React from 'react'
import '../ExploreMenu/ExploreMenu.css';
import { menu_list } from '../../assets/assets';

const ExploreMenu = ({ category, setCategory }) => {
      return (
            <div className='explore-menu' id='explore-menu'>
                  <h1>Explore with our Menu</h1>
                  <p className='explore-menu-text'>choose your delicious food from our diverse menu.</p>
                  <div className='explore-menu-list'>
                        {
                              menu_list.map((item, index) => {
                                    return (
                                          <div onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} className='explore-menu-list-item'>
                                                <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt="menu-image" />
                                                <p>{item.menu_name}</p>
                                          </div>
                                    )
                              })
                        }

                  </div>
                  <hr />
            </div>
      )
}

export default ExploreMenu
