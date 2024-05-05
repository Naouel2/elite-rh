const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

const getAllProducts = async () => {
    return await Product.findAll();
};


router.get('/', function(req, res) {
    getAllProducts().then(prod => res.json(prod));
});



module.exports = router;


