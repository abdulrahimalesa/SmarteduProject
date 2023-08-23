const User = require('../models/User');

exports.createUser = async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.status(201).json({
        status: 'success',
        user,
      });
    } catch (error) { // Add the 'error' parameter here
      res.status(400).json({
        status: 'fail',
        error, // Now 'error' is defined and contains the actual error object
      });
    }
  };