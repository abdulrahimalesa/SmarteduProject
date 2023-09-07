const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
    try {
      await Category.create(req.body);
      
      res.status(200).redirect('/users/dashboard');
    } catch (error) { // Add the 'error' parameter here
      res.status(400).json({
        status: 'fail',
        error, // Now 'error' is defined and contains the actual error object
      });
    }
  };

  exports.deleteCategory = async (req, res) => {
    try {
  
      await Category.findByIdAndRemove(req.params.id);
  
      res.status(200).redirect('/users/dashboard');
    } catch (error) {
      // Add the 'error' parameter here
      res.status(400).json({
        status: 'fail',
        error, // Now 'error' is defined and contains the actual error object
      });
    }
  };