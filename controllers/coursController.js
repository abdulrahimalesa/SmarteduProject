const Cours = require('../models/Course');
const Category = require('../models/Category');
const { query } = require('express');

exports.createCourse = async (req, res) => {
  try {
    const course = await Cours.create(req.body);
    res.status(201).json({
      status: 'success',
      course,
    });
  } catch (error) {
    // Add the 'error' parameter here
    res.status(400).json({
      status: 'fail',
      error, // Now 'error' is defined and contains the actual error object
    });
  }
};

exports.getAllCourses = async (req, res) => {
  try {

    const categorySlug = req.query.categories;

    const category  = await Category.findOne({slug:categorySlug});

    let filter = {};

    if(categorySlug){
      filter = {category:category._id}
    }

    const courses = await Cours.find(filter);
    const categories = await Category.find();

    res.status(200).render('courses', {
      courses,
      categories,
      page_name: 'courses',
    });
  } catch (error) {
    // Add the 'error' parameter here
    res.status(400).json({
      status: 'fail',
      error, // Now 'error' is defined and contains the actual error object
    });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const course = await Cours.findOne({ slug: req.params.slug });

    res.status(200).render('course', {
      course,
      page_name: 'courses',
    });
  } catch (error) {
    // Add the 'error' parameter here
    res.status(400).json({
      status: 'fail',
      error, // Now 'error' is defined and contains the actual error object
    });
  }
};
