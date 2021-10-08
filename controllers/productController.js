const path = require('path');
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
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ count: products.length, products });
};

// Public Route
// Get Single Product => GET /api/v1/products/:id

const getSingleProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId });

  if (!product) {
    throw new CustomError.NotFoundError(`No product with id: ${productId}`);
  }

  res.status(StatusCodes.OK).json({ product });
};

// Protected Route / Admin Only
// Update Product => PATCH /api/v1/products/:id

const updateProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    throw new CustomError.NotFoundError(`No product with id : ${productId}`);
  }

  res.status(StatusCodes.OK).json({ product });
};

// Protected Route / Admin Only
// Delete Product => DELETE /api/v1/products/:id

const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId });

  if (!product) {
    throw new CustomError.NotFoundError(`No product with id : ${productId}`);
  }

  product.remove();
  res.status(StatusCodes.OK).json({ msg: 'Success! Product Removed' });
};

// Protected Route / Admin Only
// Upload Image => POST /api/v1/products/uploadImage

const uploadImage = async (req, res) => {
  // check if file exists
  if (!req.files) {
    throw new CustomError.BadRequestError('No File Uploaded');
  }

  const productImage = req.files.image;

  // check format
  if (!productImage.mimetype.startsWith('image')) {
    throw new CustomError.BadRequestError('Please Upload Image');
  }

  const maxSize = 1024 * 1024;

  // check size
  if (productImage.size > maxSize) {
    throw new CustomError.BadRequestError('Please upload image smaller 1MB');
  }

  const imagePath = path.join(
    __dirname,
    '../public/uploads/' + `${productImage.name}`
  );

  await productImage.mv(imagePath);
  return res
    .status(StatusCodes.OK)
    .json({ image: `/uploads/${productImage.name}` });
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
