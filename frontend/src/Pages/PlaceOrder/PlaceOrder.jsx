import React from 'react'
import './PlaceOrder.css'
import { useContext } from 'react'
import { storeContext } from '../../Context/StoreContext'

const PlaceOrder = () => {
  const {getTotalItems} = useContext(storeContext);
  return (
    <form className='place-order'>
      <div className='place-order-left'>
        <p className='title'>Delivery Information</p>
        <div className="multi-fields">
          <input type="text" placeholder='First Name' /><input type="text" placeholder='Last Name' />
        </div>
        <input type="email" placeholder='Email Address' /><input type="text" placeholder='Street' />
        <div className="multi-fields">
        <input type="text" placeholder='City' /><input type="text" placeholder='State' />
        </div>
          <div className="multi-fields">
          <input type="text" placeholder='Zip code' /><input type="text" placeholder='Country' />
        </div>
        <input type="text" placeholder='Phone' />
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
                    <b>Total</b><b>{getTotalItems() === 0 ? 0 : "$" + getTotalItems()+2}</b>
                </div>
            </div>
            <button>Proceed to Payment</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
