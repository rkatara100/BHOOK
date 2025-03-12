import { createContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = ({children}) => {

      const [cartItems, setCartItems] = useState({});
      const [token, setToken] = useState("");
      const [food_list, setFoodList] = useState([]);

      const url = "https://bhook-backend.onrender.com";

      const addToCart = async (itemId) => {
            if (!cartItems[itemId]) {
                  setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
            }
            else {
                  setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
            }

            if (token) {
                  await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
            }

      }

      const removefromCart = async (itemId) => {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
            if (token) {
                  await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
            }
      }

      const getTotalAmmount = (items) => {
            let totalAmmount = 0;
            for (const item in cartItems) {
                  if (cartItems[item] > 0) {
                        let info = food_list.find((product) => product._id === item);
                        totalAmmount += info.price * cartItems[item];
                  }
            }

            return totalAmmount;
      }

      const fetchFoodList = async () => {
            const response = await axios.get(url + "/api/food/list");
            console.log(response.data.data);
            setFoodList(response.data.data);
      }

      const loadCartData = async (token) => {
            const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
            // console.log(response.data.cartData);
            setCartItems(response.data.cartData);
      }


      const contextValue = {
            food_list,
            cartItems,
            setCartItems,
            addToCart,
            removefromCart,
            getTotalAmmount,
            url,
            token,
            setToken
      }

      useEffect(() => {
            async function loadData() {
                  await fetchFoodList();
                  if (localStorage.getItem("token")) {
                        setToken(localStorage.getItem("token"));
                        await loadCartData(localStorage.getItem("token"));
                  }
            }
            loadData();
      }, [])



      return (
            <StoreContext.Provider value={contextValue}>
                  {children}
            </StoreContext.Provider>
      )
}


export default StoreContextProvider;
