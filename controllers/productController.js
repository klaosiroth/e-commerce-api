const { StatusCodes } = require('http-status-codes');
const Product = require('../models/Product');
const CustomError = require('../errors');

// Protected Route / Admin Only
// Create Product => POST /api/v1/products

const createProduct = async (req, res) => {
  req.body.user = req.user.userId;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

// Public Route
// Get All Products => GET /api/v1/products

const getAllProducts = async (req, res) => {
  res.send('get all products');
};

// Public Route
// Get Single Product => GET /api/v1/products/:id

const getSingleProduct = async (req, res) => {
  res.send('get single product');
};

// Protected Route / Admin Only
// Update Product => PATCH /api/v1/products/:id

const updateProduct = async (req, res) => {
  res.send('update product');
};

// Protected Route / Admin Only
// Delete Product => DELETE /api/v1/products/:id

const deleteProduct = async (req, res) => {
  res.send('delete product');
};

// Protected Route / Admin Only
// Upload Image => POST /api/v1/products/uploadImage

const uploadImage = async (req, res) => {
  res.send('upload image');
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
