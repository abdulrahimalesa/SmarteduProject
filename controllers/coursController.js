const Cours = require('../models/Course');
const Category = require('../models/Category');
const User = require('../models/User');


exports.createCourse = async (req, res) => {
  try {
    const course = await Cours.create({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      user: req.session.userID
    });
    
    req.flash("success", `${course.name} has been create successfuly`);
    res.status(201).redirect('/courses')
  } catch (error) {
    req.flash("error", `Something happened!`);
    res.status(201).redirect('/courses')
  }
};

exports.getAllCourses = async (req, res) => {
  try {

    const categorySlug = req.query.categories;
    const query = req.query.search;

    const category  = await Category.findOne({slug:categorySlug});

    let filter = {};

    if(categorySlug){
      filter = {category:category._id}
    }
    if (query) {
      filter = {name:query}
    }
    if (!query && ! categorySlug) {
      filter.name = "",
      filter.category = null
    }

    const courses = await Cours.find({
      $or:[
        {name: {$regex: '.*' + filter.name + '.*', $options: 'i'}},
        {category: filter.category}
        
      ]
    }).sort('-createAt').populate('user');
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
    const user = await User.findById(req.session.userID);
    const course = await Cours.findOne({ slug: req.params.slug }).populate('user');
    const categories  = await Category.find();
    res.status(200).render('course', {
      course,
      page_name: 'courses',
      user,
      categories,
    });
  } catch (error) {
    // Add the 'error' parameter here
    res.status(400).json({
      status: 'fail',
      error, // Now 'error' is defined and contains the actual error object
    });
  }
};


exports.enrollCourse = async (req, res) => {
  try {

    const user = await User.findById(req.session.userID);
    await user.courses.push({_id:req.body.course_id});
    await user.save();
    res.status(200).redirect('/users/dashboard')
  } catch (error) {
    // Add the 'error' parameter here
    res.status(400).json({
      status: 'fail',
      error, // Now 'error' is defined and contains the actual error object
    });
  }
};

exports.releaseCourse = async (req, res) => {
  try {

    const user = await User.findById(req.session.userID);
    await user.courses.pull({_id:req.body.course_id});
    await user.save();
    res.status(200).redirect('/users/dashboard')
  } catch (error) {
    // Add the 'error' parameter here
    res.status(400).json({
      status: 'fail',
      error, // Now 'error' is defined and contains the actual error object
    });
  }
};

