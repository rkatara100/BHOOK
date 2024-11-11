import foodModel from "../models/foodModel.js";
import fs from "fs";

//add food item
const addFood = async (req, res) => {
      if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
      }

      let image_filename = `${req.file.filename}`;

      const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: image_filename
      })

      try {
            await food.save();
            res.json({ success: true, message: "Food Added" });
      }
      catch (error) {
            console.log(error);
            res.json({ success: false, message: "Error" });
      }
}

//add food list
const listFood = async (req, res) => {
      try {
            const foods = await foodModel.find({});
            res.json({ success: true, data: foods });

      } catch (err) {
            console.log(err);
            res.json({ sucess: false, message: err });
      }

}

//remove food item
const removeFood = async (req, res) => {
      try {
            const fooditem = await foodModel.findById(req.body.id);
            fs.unlink(`uploads/${food.image}`, () => { });

            await foodModel.findByIdAndDelete(req.body.id);
            res.response({ success: true, message: "Food remove" })

      }
      catch (error) {
            console.log(error);
            res.response({ success: false, message: error });
      }

}

export { addFood, listFood, removeFood };
