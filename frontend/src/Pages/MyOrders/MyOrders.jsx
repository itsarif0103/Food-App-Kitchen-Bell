import React from 'react'
import './MyOrders.css'
import { useState } from 'react'
import { useContext } from 'react';
import { storeContext } from '../../Context/StoreContext';
import axios from 'axios';
import { useEffect } from 'react';

const MyOrders = () => {
    const [data, setData] = useState([]);
    const {url, token} = useContext(storeContext);

    const fetchOrders = async () =>{
        const response = await axios.post(url + "/api/order/usersOrder", {}, {headers: {token}});
        setData(response.data.data);
    }

    useEffect(() =>{
        if(token){
            fetchOrders();
        }
    }, [token])
  return (
    <div>
      
    </div>
  )
}

export default MyOrders
