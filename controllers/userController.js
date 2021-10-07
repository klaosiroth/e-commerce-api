
// Protected Route / Admin Only
// Get All Users   =>    GET /api/v1/users

const getAllUsers = async (req, res) => {
  res.send('get all users');
};

// Protected Route / Admin or User
// Get Single User   =>    GET /api/v1/users/:id

const getSingleUser = async (req, res) => {
  res.send(req.params);
};

// Protected Route / Admin or User
// Show Current User   =>    GET /api/v1/users/showMe

const showCurrentUser = async (req, res) => {
  res.send('show current user');
};

const updateUser = async (req, res) => {
  res.send('update user');
};

const updateUserPassword = async (req, res) => {
  res.send('update user password');
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
