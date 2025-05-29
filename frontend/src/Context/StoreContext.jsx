import { createContext, useEffect } from "react";
import React, { useState } from "react";
import axios from "axios";

export const storeContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFoodList] = useState([])

  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const getTotalItems = () => {
    let total = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((food) => food._id === item);
        total += itemInfo.price * cartItems[item];
      }
    }
    return total;
  };

  const url = "http://localhost:4000";

  const [token, setToken] = useState("");

  useEffect(() => {

    async function loadData(){
      fetchFoodList();
          const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
    }
    loadData();
  }, []);

  const fetchFoodList = async  () =>{
    const response = await axios.get(url+"/api/food/list")
    setFoodList(response.data.data)
  }

  const contextValue = {
    food_list,
    addToCart,
    removeFromCart,
    cartItems,
    setCartItems, getTotalItems, url, token, setToken
  };
  return (
    <storeContext.Provider value={contextValue}>
      {props.children}
    </storeContext.Provider>
  );
};

export default StoreContextProvider;
