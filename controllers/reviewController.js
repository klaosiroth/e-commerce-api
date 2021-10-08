// Protected Route / Admin or User
// Create Review => POST /api/v1/reviews

const createReview = async (req, res) => {
  res.send('create review');
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
