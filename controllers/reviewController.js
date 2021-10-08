const Review = require('../models/Review');
const Product = require('../models/Product');

const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { checkPermissions } = require('../utils');

// Protected Route / Admin or User
// Create Review => POST /api/v1/reviews

const createReview = async (req, res) => {
  const { product: productId } = req.body;

  const isValidProduct = await Product.findOne({ _id: productId });

  if (!isValidProduct) {
    throw new CustomError.NotFoundError(`No product with id: ${productId}`);
  }

  const alreadySubmitted = await Review.findOne({
    product: productId,
    user: req.user.userId,
  });

  if (alreadySubmitted) {
    throw new CustomError.BadRequestError(
      'Already submitted review for this product'
    );
  }

  req.body.user = req.user.userId;
  const review = await Review.create(req.body);
  res.status(StatusCodes.CREATED).json({ review });
};

// Public Route
// Get All Reviews => GET /api/v1/reviews

const getAllReviews = async (req, res) => {
  res.send('get all review');
};

// Public Route
// Get Single Review => GET /api/v1/reviews/:id

const getReview = async (req, res) => {
  res.send('get single review');
};

// Protected Route / Admin or User
// Update Review => PATCH /api/v1/reviews/:id

const updateReview = async (req, res) => {
  res.send('update review');
};

// Protected Route / Admin or User
// Delete Review => DELETE /api/v1/reviews/:id

const deleteReview = async (req, res) => {
  res.send('delete review');
};

module.exports = {
  createReview,
  getAllReviews,
  getReview,
  updateReview,
  deleteReview,
};
