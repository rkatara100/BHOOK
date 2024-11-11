import express from "express";
import multer from "multer";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";

const foodRoute = express.Router();

// Define a POST route for adding food items
foodRoute.post("/", addFood);


// Image Storage 
const storage = multer.diskStorage({
      destination: "uploads",
      filename: (req, file, cb) => {
            return cb(null, `${Date.now()}${file.originalname}`);
      }
})

const upload = multer({ storage });

foodRoute.post("/add", upload.single("image"), addFood);
foodRoute.get('/list', listFood);
foodRoute.post('/remove', removeFood);

export default foodRoute;
