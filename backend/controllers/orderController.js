import dotenv from 'dotenv';
dotenv.config();

import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
      const Frontend_url = "https://bhook-frontend.onrender.com";
      try {
            const newOrder = new orderModel({
                  userId: req.body.userId,
                  items: req.body.items,
                  amount: req.body.amount,
                  address: req.body.address,
                  payment: false
            });

            await newOrder.save();
            await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

            const line_items = req.body.items.map((item) => ({
                  price_data: {
                        currency: "inr",
                        product_data: {
                              name: item.name
                        },
                        unit_amount: item.price * 100 * 80,
                  },
                  quantity: item.quantity
            }));

            line_items.push({
                  price_data: {
                        currency: "inr",
                        product_data: { name: "Delivery Charges" },
                        unit_amount: 2 * 100 * 80,
                  },
                  quantity: 1
            });

            const session = await stripe.checkout.sessions.create({
                  line_items: line_items,
                  mode: "payment",
                  success_url: `${Frontend_url}/verify?success=true&&orderId=${newOrder._id}`,
                  cancel_url: `${Frontend_url}/verify?success=false&&orderId=${newOrder._id}`,
            });

            res.status(200).json({ success: true, session_url: session.url });
      } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Error processing order" });
      }
};

const verifyOrder = async (req, res) => {
      const { orderId, success } = req.body;
      try {
            if (success == "true") {
                  await orderModel.findByIdAndUpdate(orderId, { payment: true });
                  res.json({ success: true, message: "Paid" });
            }
            else {
                  await orderModel.findByIdAndDelete(orderId);
                  res.json({ success: false, message: "Not Paid" });
            }
      } catch (error) {
            console.log(error);
            res.json({ success: false, message: "Error" });
      }

}

//user orders for Frontend

const userOrders = async (req, res) => {
      try {
            console.log("hii form myorders!!!")
            const orders = await orderModel.find({ userId: req.body.userId });
            res.json({ success: true, data: orders });

      } catch (error) {
            console.log(error);
            res.json({ success: false, message: "error" });
      }
}

//Listing orders for admin panel

const listorders = async (req, res) => {

      try {
            const orders = await orderModel.find({});
            console.log('list mai pahuche');
            res.json({ success: true, data: orders });

      }
      catch (error) {
            console.log(error);
            res.json({ succes: true, message: "Error" });

      }

}

const orderStatus = async (req, res) => {

      try {
            const orderId = req.body.orderId;
            await orderModel.findByIdAndUpdate(orderId, { status: req.body.status });
            res.json({ success: true, message: "Status Updated" });

      } catch (error) {
            console.log(error);
            res.json({ success: false, message: "Error" });

      }
}



export { placeOrder, verifyOrder, userOrders, listorders, orderStatus };
