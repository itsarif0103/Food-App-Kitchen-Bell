import express from 'express';
import {addtoCart, removefromCart, getCartData} from '../Controllers/CartController.js';
import {authMiddleware} from '../Middleware/Auth.js'

const cartRouter = express.Router();

cartRouter.post('/add', authMiddleware, addtoCart)
cartRouter.post('/remove', authMiddleware, removefromCart)
cartRouter.post('/get', authMiddleware, getCartData)

export default cartRouter;