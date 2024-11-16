import React, { useState } from 'react';
import './Add.css';
import { assets } from '../../admin_assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = () => {
      const [image, setImage] = useState(null);
      const [data, setData] = useState({
            name: "",
            description: "",
            price: "",
            category: "Salad"
      });

      const url = "http://localhost:4000";

      const onChangeHandler = (event) => {
            const name = event.target.name;
            const value = event.target.value;
            setData((prevData) => ({ ...prevData, [name]: value }));
      };

      const onSubmitHandler = async (e) => {
            e.preventDefault();

            // Debugging the data
            console.log("Submitting data:", data);
            console.log("Submitting image:", image);

            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("description", data.description);
            formData.append("price", Number(data.price));
            formData.append("category", data.category);

            // Append image if available
            if (image) {
                  formData.append("image", image);
            }

            try {
                  const response = await axios.post(`${url}/api/food/add`, formData);
                  if (response.data.success) {
                        setData({
                              name: "",
                              description: "",
                              price: "",
                              category: "Salad",
                        });
                        setImage(null);
                        toast.success(response.data.message);
                  } else {
                        console.log("Item not added");
                  }
            } catch (error) {
                  toast.error(response.data.message);

            }
      };

      return (
            <div className='add'>
                  <form className='flex-col' onSubmit={onSubmitHandler}>
                        <div className="add-img-upload flex-col">
                              <p>Upload Image</p>
                              <label htmlFor='image'>
                                    <img
                                          src={image ? URL.createObjectURL(image) : assets.upload_area}
                                          alt="upload-area"
                                    />
                              </label>

                              <input
                                    onChange={(e) => setImage(e.target.files[0])}
                                    type="file"
                                    id='image'
                                    hidden
                                    required
                              />
                        </div>

                        <div className="add-product-name flex-col">
                              <p>Product name</p>
                              <input
                                    onChange={onChangeHandler}
                                    value={data.name}
                                    type="text"
                                    name='name'
                                    placeholder='Type here'
                                    required
                              />
                        </div>

                        <div className="add-product-description flex-col">
                              <p>Product Description</p>
                              <textarea
                                    onChange={onChangeHandler}
                                    value={data.description}
                                    name="description"
                                    rows="6"
                                    placeholder='Write content here'
                                    required
                              ></textarea>
                        </div>

                        <div className="add-category-price">
                              <div className="add-category flex-col">
                                    <p>Product Category</p>
                                    <select
                                          name="category"
                                          value={data.category}
                                          onChange={onChangeHandler}
                                    >
                                          <option value="Salad">Salad</option>
                                          <option value="Rolls">Rolls</option>
                                          <option value="Deserts">Deserts</option>
                                          <option value="Sandwich">Sandwich</option>
                                          <option value="Cake">Cake</option>
                                          <option value="Pure veg">Pure veg</option>
                                          <option value="Pasta">Pasta</option>
                                          <option value="Noodles">Noodles</option>
                                    </select>
                              </div>

                              <div className="add-price flex-col">
                                    <p>Product price</p>
                                    <input
                                          onChange={onChangeHandler}
                                          value={data.price}
                                          type="number"
                                          name="price"
                                          min={0}
                                          placeholder='$20'
                                          required
                                    />
                              </div>
                        </div>

                        <button type='submit' className='add-btn'>
                              ADD
                        </button>
                  </form>
            </div>
      );
};

export default Add;
