import { createContext, useEffect } from "react";
import React, { useState } from "react";
import axios from "axios";

export const storeContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFoodList] = useState([])

  const addToCart =  async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if(token) {
      await axios.post(url + "/api/cart/add", {itemId}, {headers:{token}})}
  };

  const removeFromCart =  async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if(token) {
      await axios.post(url + "/api/cart/remove", {itemId}, {headers:{token}})
    }
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
      await fetchFoodList();
          const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      await loadCartData(storedToken);
    }
    }
    loadData();
  }, []);

  const fetchFoodList = async  () =>{
    const response = await axios.get(url+"/api/food/list")
    setFoodList(response.data.data)
  }

  const loadCartData = async (token) =>{
    const response = await axios.post(url + "/api/cart/get",{}, { headers: { token } });
    setCartItems(response.data.cartData);
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
