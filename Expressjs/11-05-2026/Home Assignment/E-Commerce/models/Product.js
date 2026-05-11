const { Schema, model } = require("mongoose");
const productSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  category: String,
  image: String,
  rating: { rate: Number, count: Number },
}, { timestamps: true });
module.exports = model("Product", productSchema);