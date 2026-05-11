const express = require('express')
const router = express.Router()

// GET 
router.get("/products", async (req, res) => {
    try {
        const products = await Product.find(); 
        res.status(200).json(products);        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;