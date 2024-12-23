import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = () => {
      const [list, setList] = useState([]);
      const url = 'http://localhost:4000';

      const fetchList = async () => {
            try {
                  const response = await axios.get(`${url}/api/food/list`);
                  if (response.data.success) {
                        setList(response.data.data);
                  } else {
                        toast.error('Error fetching food list');
                  }
            } catch (error) {
                  toast.error('Error fetching food list');
            }
      };

      const removeFood = async (FoodId) => {
            try {
                  setList(prevList => prevList.filter(item => item._id !== FoodId));
                  const response = await axios.post(`${url}/api/food/remove`, { id: FoodId });

                  if (!response.data.success) {
                        toast.error('Failed to remove food item');
                        fetchList();
                  } else {
                        toast.success('Food item removed successfully');
                  }
            } catch (error) {
                  toast.error('Error removing food item');
                  fetchList();
            }
      };

      useEffect(() => {
            fetchList();
      }, []);

      return (
            <div className='list add flex-col'>
                  <p>All Foods List</p>
                  <div className="list-table">
                        <div className="list-table-format title">
                              <b>Image</b>
                              <b>Name</b>
                              <b>Category</b>
                              <b>Price</b>
                              <b>Action</b>
                        </div>
                        {list.map((item, index) => (
                              <div key={index} className='list-table-format'>
                                    <img src={`${url}/images/${item.image}`} alt={item.name} />
                                    <p>{item.name}</p>
                                    <p>{item.category}</p>
                                    <p>{item.price}</p>
                                    <p onClick={() => removeFood(item._id)} className='cursor'>
                                          X
                                    </p>
                              </div>
                        ))}
                  </div>
            </div>
      );
};

export default List;
