const Cours = require('../models/Course');

exports.createCourse = async (req, res) => {
  try {
    const course = await Cours.create(req.body);
    res.status(201).json({
      status: 'success',
      course,
    });
  } catch (error) { // Add the 'error' parameter here
    res.status(400).json({
      status: 'fail',
      error, // Now 'error' is defined and contains the actual error object
    });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Cours.find().sort('-createAt');
    res.status(200).render('courses',{
      courses,
      page_name: 'courses',
    });
  } catch (error) { // Add the 'error' parameter here
    res.status(400).json({
      status: 'fail',
      error, // Now 'error' is defined and contains the actual error object
    });
  }
};