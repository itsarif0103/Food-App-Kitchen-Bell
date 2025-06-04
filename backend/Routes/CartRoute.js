import express from 'express';
import {addtoCart, removefromCart, getCartData} from '../Controllers/CartController.js';


const cartRouter = express.Router();

cartRouter.post('/add', addtoCart)
cartRouter.post('/remove', removefromCart)
cartRouter.post('/get', getCartData)

export default cartRouter;