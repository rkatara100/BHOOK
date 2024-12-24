import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from "cors";
import { mongodbConnection } from "./config/db.js";
import foodRoute from './Routes/foodRoute.js';
import userRouter from "./routes/userRoute.js";
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

// DB connection
mongodbConnection();

// API Routes
app.use('/api/food', foodRoute);
app.use('/images', express.static('uploads'));
app.use('/api/user', userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get('/', (req, res) => {
      res.send("hii");
});

app.listen(port, (err) => {
      if (err) {
            console.error(`Error starting server: ${err.message}`);
      } else {
            console.log(`Server is running on http://localhost:${port}`);
      }
});
