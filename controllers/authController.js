const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const Category = require('../models/Category');
const Cours = require('../models/Course');

exports.createUser = async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.status(201).redirect('/login');
    } catch (error) { // Add the 'error' parameter here
     const errors = validationResult(req);

     for (let i = 0; i <errors.array().length; i++){
      req.flash("error", `${errors.array()[i].msg}`);
     }

     
     res.status(400).redirect('/register');
    }
  };

 // kursun kodlari 
  exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //mongoose 6
    const user = await User.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, same) => {
        if (same) {
          // USER SESSION
          req.session.userID = user._id;
          res.status(200).redirect('/users/dashboard');
        } else {
          req.flash('error', 'Your password is not correct!');
          res.status(400).redirect('/login');
        }
      });
    } else {
      req.flash('error', 'User is not exist!');
      res.status(400).redirect('/login');
    }
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};
  
// benim kodum
// exports.loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });

//     if (!user) {
//       // Kullanıcı bulunamazsa bir yanıt döndürün
//       return res.status(401).json({ mesaj: 'Kullanıcı bulunamadı' });
//     }

//     // bcrypt.compare'ı async/await bağlamında kullanın
//     const parolaEslesme = await bcrypt.compare(password, user.password);

//      if (parolaEslesme) {
//       req.session.userID = user._id;
//       res.status(200).redirect('/users/dashboard');
//      } 
//      else {
//       req.flash("error", `Your password is not correct!`);
//       res.status(400).redirect('/login');
//    }
//   } catch (hata) {
//     // Oluşan hataları işleyin
//     res.status(500).json({
//       durum: 'hata',
//       mesaj: 'Bir hata oluştu',
//       hata: hata.message, // Anlamlı bir hata mesajı sağlayın
//     });
//   }
// };

exports.logoutUser = (req, res) =>{
  req.session.destroy(()=> {
    res.redirect('/')
  })
}

exports.getDashboardPage =  async(req, res) => {
  const user = await User.findOne({_id:req.session.userID}).populate('courses');
  const categories = await Category.find();
  const courses = await Cours.find({user: req.session.userID});
  const users = await User.find();
  res.status(200).render('dashboard',{
      page_name: 'dashboard',
      user,
      categories,
      courses,
      users
  });
};

exports.deleteUser = async (req, res) => {
  try {

    await User.findByIdAndRemove(req.params.id);
    await Cours.deleteMany({user:req.params.id});

    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    // Add the 'error' parameter here
    res.status(400).json({
      status: 'fail',
      error, // Now 'error' is defined and contains the actual error object
    });
  }
};