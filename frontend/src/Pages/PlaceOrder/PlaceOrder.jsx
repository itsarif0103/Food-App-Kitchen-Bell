import React from 'react'
import './PlaceOrder.css'
import { useContext } from 'react'
import { storeContext } from '../../Context/StoreContext'
import { useState } from 'react'
import axios from 'axios'

const PlaceOrder = () => {
  const {getTotalItems, token, food_list, cartItems, url} = useContext(storeContext);
  const [data,setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: ""
  })

  const onChangeHandler = (e) => {
    const {name, value} = e.target;
    setData({
      ...data,
      [name]: value
    })
  }
  const placeOrderHandler = async (e) => {
    e.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if(cartItems[item._id]>0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }})
      let orderData = {
        address: data,
        items: orderItems,
        amount: getTotalItems() + 2, // Adding delivery fee of $2
    }
    let response = await axios.post(url+"/api/order/place", orderData, {headers: {token}}
  );
    if(response.data.success) {
      const sessionUrl = response.data.session_url;
        window.location.replace(sessionUrl); // Redirect to Stripe checkout
    } else {
      alert("Error placing order. Please try again.");
    }
  }
  return (
    <form  onSubmit={placeOrderHandler} className='place-order'>
      <div className='place-order-left'>
        <p className='title'>Delivery Information</p>
        <div className="multi-fields">
          <input required name= "firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' /><input required name= "lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' />
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email Address' /><input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
        <div className="multi-fields">
        <input required name='city' onChange={onChangeHandler} value={data.city}type="text" placeholder='City' /><input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
        </div>
          <div className="multi-fields">
          <input required name='zip' onChange={onChangeHandler} value={data.zip} type="text" placeholder='Zip code' /><input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
      </div>
      <div className='place-order-right'>
                <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
                <div className="cart-total-details">
                    <p>Sub Total</p>
                    <p>${getTotalItems()}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                    <p>Delivery Fee</p>
                    <p>{getTotalItems() === 0 ? 0 : "$" + 2}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                    <b>Total</b><b>{getTotalItems() === 0 ? 0 : "$" + (getTotalItems()+2)}</b>
                </div>
            </div>
            <button type='submit'>Proceed to Payment</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
