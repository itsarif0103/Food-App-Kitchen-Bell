import React, { useContext, useState } from 'react'
import './FoodDisplay.css'
import { storeContext } from '../../Context/StoreContext'
import { food_list } from '../../assets/frontend_assets/assets'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({category}) => {
    const {food_list} = useContext(storeContext);
  return (
    <div className='food-display' id='food-display'>
        <h2>Top Dishes near you</h2>
        <div className="food-display-list">
            {food_list.map((food, index)=>{
                if(category === "All" || category === food.category){
                    return ( <FoodItem key={index} id={food._id} name={food.name} price={food.price} description={food.description} image={food.image} />)
                }
            })}
        </div>
    </div>
  )
}

export default FoodDisplay
