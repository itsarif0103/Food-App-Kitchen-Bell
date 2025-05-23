import React from 'react'
import './Cart.css'
import { useContext } from 'react'
import { storeContext } from '../../Context/StoreContext'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
    const{cartItems, food_list, removeFromCart, getTotalItems} = useContext(storeContext);
    const navigate = useNavigate();
  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((food, index)=>{
            if(cartItems[food._id]>0){
                return (
                    <div>
                    <div className="cart-items-title cart-items-item" key={index}>
                        <img src={food.image} alt="" />
                        <p>{food.name}</p>
                        <p>${food.price}</p>
                        <p>{cartItems[food._id]}</p>
                        <p>${(cartItems[food._id] * food.price).toFixed(2)}</p>
                        <p className='cross' onClick={()=>{removeFromCart(food._id)}}>X</p>
                    </div>
                    <hr />
                    </div>
                )
            }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
                <div className="cart-total-details">
                    <p>Sub Total</p>
                    <p>{"$" + getTotalItems()}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                    <p>Delivery Fee</p>
                    <p>{getTotalItems() === 0 ? 0 : "$" + 2}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                    <b>Total</b><b>{getTotalItems() === 0 ? 0 : "$" + getTotalItems()+2}</b>
                </div>
            </div>
            <button onClick={() => navigate('/placeOrder')}>Proceed to Checkout</button>
        </div>
        <div className="cart-promo-code">
            <div>
                <p>If you have a promo code, Enter it here</p>
                <div className='cart-promo-code-input'>
                    <input type="text" placeholder='Promo Code' />
                    <button>Submit</button>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
