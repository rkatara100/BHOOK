import foodModel from "../models/foodModel.js";
import fs from "fs";

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

const listFood = async (req, res) => {
      try {
            const foods = await foodModel.find({});
            res.json({ success: true, data: foods });
      } catch (err) {
            console.log(err);
            res.json({ success: false, message: err });
      }
}

const removeFood = async (req, res) => {
      try {
            const fooditem = await foodModel.findById(req.body.id);

            if (!fooditem) {
                  return res.status(404).json({ success: false, message: "Food item not found" });
            }

            fs.unlink(`uploads/${fooditem.image}`, (err) => {
                  if (err) {
                        console.error("Error deleting the file:", err);
                  }
            });

            await foodModel.findByIdAndDelete(req.body.id);

            res.json({ success: true, message: "Food removed successfully" });

      } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: error.message });
      }
}

export { addFood, listFood, removeFood };
