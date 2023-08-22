const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
    try {
      const category = await Category.create(req.body);
      res.status(201).json({
        status: 'success',
        category,
      });
    } catch (error) { // Add the 'error' parameter here
      res.status(400).json({
        status: 'fail',
        error, // Now 'error' is defined and contains the actual error object
      });
    }
  };