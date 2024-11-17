import dotenv from 'dotenv';
dotenv.config();

import express from "express"
import cors from "cors"
import { mongodbConnection } from "./config/db.js";
import foodRoute from './Routes/foodRoute.js';
import userRouter from "./routes/userRoute.js";

const app = express();
const port = 4000;

//middleware 
app.use(express.json());
app.use(cors());


//db connection
mongodbConnection();


//api Router
app.use('/api/food', foodRoute);
app.use('/images', express.static('uploads'));
app.use('/api/user', userRouter);



app.get('/', (req, res) => {
      res.send("hii");
})

app.listen(port, (err) => {
      if (err) {
            console.error(`Error starting server: ${err.message}`);
      } else {
            console.log(`Server is running on http://localhost:${port}`);
      }
});

// mongodb+srv://bhook:1212@cluster0.frloj.mongodb.net/?