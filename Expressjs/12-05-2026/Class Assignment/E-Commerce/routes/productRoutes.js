const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const { protect, authorize } = require("../middleware/authMiddleware");



router.get("/", async (req, res) => {
   try {
      const products = await Product.find();
      res.status(200).json({ message: "Success", products });
   } catch (error) {
      res.status(500).json({ message: "Failed" });
   }
});

router.get("/:id", async (req, res) => {
   try {
      const product = await Product.findOne({ id: Number(req.params.id) });
      if (!product) return res.status(404).json({ message: "Not found" });
      res.status(200).json({ message: "Success", product });
   } catch (error) {
      res.status(500).json({ message: "Failed" });
   }
});

router.post("/", protect, authorize("admin"), async (req, res) => {
   try {
      const product = await Product.create(req.body);
      res.status(201).json({ message: "Created", product });
   } catch (error) {
      res.status(400).json({ message: "Error" });
   }
});

router.patch("/:id", protect, authorize("admin"), async (req, res) => {
   try {
      const product = await Product.findOneAndUpdate(
         { id: Number(req.params.id) },
         req.body,
         { new: true }
      );
      if (!product) return res.status(404).json({ message: "Not found" });
      res.status(200).json({ message: "Updated", product });
   } catch (error) {
      res.status(400).json({ message: "Error" });
   }
});

router.put("/:id", protect, authorize("admin"), async (req, res) => {
   try {
      const id = Number(req.params.id);

      const product = await Product.findOneAndReplace(
         { id: id },   // kisko dhundhna hai
         req.body,     // DB me sirf ye hi rahega
         { new: true }
      );
      if (!product) return res.status(404).json({ message: "Not found" });
      res.status(200).json({ message: "Replaced", product });
   } catch {
      res.status(400).json({ message: "Error" });
   }
});

// AUTO ID)
router.post("/auto", protect, authorize("admin"), async (req, res) => {
   try {
      const lastProduct = await Product.findOne().sort({ id: -1 });
      const newId = lastProduct ? lastProduct.id + 1 : 1;
      console.log(req.body);
      
      const product = await Product.create({
        id: newId,
         ...req.body
      });
      res.status(201).json({ message: "Created", product });
   } catch(error) {
      console.log(error);
      res.status(400).json({ message: "Failed to create product" });
   }
});

router.delete("/deleteProduct/:id", protect, authorize("admin"), async (req, res) => {
   try {
      const product = await Product.findOneAndDelete({ id: Number(req.params.id) });
      if (!product) return res.status(404).json({ message: "Not found" });
      res.status(200).json({ message: "Deleted" });
   } catch (error) {
      res.status(500).json({ message: "Error" });
   }
});

module.exports = router;