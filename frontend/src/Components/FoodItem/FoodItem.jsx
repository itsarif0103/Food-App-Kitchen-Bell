import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/frontend_assets/assets'
import { storeContext } from '../../Context/StoreContext';

const FoodItem = ({id, name, price, description, image}) => {
    const {cartItems, removeFromCart, addToCart} = useContext(storeContext);
  return (
    <div className='food-item'>
      <div className="food-item-image-container">
        <img src={image} alt={name} className='food-item-image' />
        {!cartItems[id] ? <img src={assets.add_icon_white} alt="" className='food-item-add-icon' onClick={()=> addToCart(id)} /> : <div className="food-item-count">
                <img src={assets.remove_icon_red} alt="" onClick={()=> removeFromCart(id)} />
                <p>{cartItems[id]}</p>
                <img src={assets.add_icon_green} alt="" onClick={()=> addToCart(id)} />
            </div>
        }
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className="food-item-description">{description}</p>
            <p className="food-item-price">${price}</p>
        </div>
      </div>
    </div>
  )
}

export default FoodItem
