const express = require("express");
const asyncHandler = require("express-async-handler");
const Product = require("../models/Product");
const productRouter = express.Router();
// GET ALL 
productRouter.get(
   "/products",
   asyncHandler(async (req, res) => {
      const products = await Product.find();
      res.status(200).json({
         message: "Products Fetched",
         success: true,
         count: products.length,
         products
      });

   })
);
// GET SINGLE 
productRouter.get(
   "/products/:id",
   asyncHandler(async (req, res) => {
      const product = await Product.findById(req.params.id);
      if (!product) {
         res.status(404);
         throw new Error("Product not found");
      }
      res.status(200).json({
         success: true,
         product
      });
   })
);
module.exports = productRouter;