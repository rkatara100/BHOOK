import { createContext, useState } from "react";
import { food_list } from "../assets/assets";
import { useEffect } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

      const [cartItems, setCartItems] = useState({});
      const [token, setToken] = useState("");

      const url = "http://localhost:4000"

      const addToCart = (itemId) => {
            if (!cartItems[itemId]) {
                  setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
            }
            else {
                  setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
            }
      }

      const removefromCart = (itemId) => {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
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
            if (localStorage.getItem("token")) {
                  setToken(localStorage.getItem("token"));
            }
      }, [])



      return (
            <StoreContext.Provider value={contextValue}>
                  {props.children}
            </StoreContext.Provider>
      )
}


export default StoreContextProvider;