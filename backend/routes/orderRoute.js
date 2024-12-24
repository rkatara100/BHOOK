import express from "express";
import authMiddleware from "../middlewares/auth.js";
import { listorders, orderStatus, placeOrder, userOrders, verifyOrder } from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post('/place', authMiddleware, placeOrder);
orderRouter.post('/verify', verifyOrder);
orderRouter.post('/userorders', authMiddleware, userOrders);
orderRouter.get('/list', listorders);
orderRouter.post('/status', orderStatus);

export default orderRouter;
