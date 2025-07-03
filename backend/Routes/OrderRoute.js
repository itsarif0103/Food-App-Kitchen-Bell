import express from 'express';
import { authMiddleware } from '../Middleware/Auth.js';
import { placeOrder, usersOrder, verifyOrder } from '../Controllers/OrderContoller.js';

const orderRouter = express.Router();

// Route to place an order
orderRouter.post('/place', authMiddleware, placeOrder);
orderRouter.post('/verify', verifyOrder);
orderRouter.post('/userOrders', authMiddleware, usersOrder);

export default orderRouter;