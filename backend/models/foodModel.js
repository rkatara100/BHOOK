import mongoose from "mongoose";

// Define the food schema
const foodSchema = new mongoose.Schema({
      name: {
            type: String,
            required: true,
      },
      description: {
            type: String,
            required: true,
      },
      price: {
            type: Number,
            required: true,
      },
      image: {
            type: String,
            required: true
      },
      category: {
            type: String,
            required: true,
      },
});

// Create the food model, ensuring it's only created once
const foodModel = mongoose.models.Food || mongoose.model("Food", foodSchema);

export default foodModel;
