const User = require('../models/User');
const bcrypt = require('bcrypt')

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

  // exports.loginUser = async (req, res) => {
  //   try {
  //     const {email, password} = req.body;

  //     await User.findOne({email}, (err, user) => {
  //       if (user){
  //         bcrypt.compare(password, user.password, (err, same) => {
  //           if (same){
  //             res.status(200).send('You Are Login In');
  //           }
  //         })
  //       }
  //     })
      
  //   } catch (error) { // Add the 'error' parameter here
  //     res.status(400).json({
  //       status: 'fail',
  //       error, // Now 'error' is defined and contains the actual error object
  //     });
  //   }
  // };
  
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      // Kullanıcı bulunamazsa bir yanıt döndürün
      return res.status(401).json({ mesaj: 'Kullanıcı bulunamadı' });
    }

    // bcrypt.compare'ı async/await bağlamında kullanın
    const parolaEslesme = await bcrypt.compare(password, user.password);

    if (parolaEslesme) {
      req.session.userID = user._id;
      res.status(200).redirect('/');
    } else {
      res.status(401).json({ mesaj: 'Yanlış şifre' });
    }
  } catch (hata) {
    // Oluşan hataları işleyin
    res.status(500).json({
      durum: 'hata',
      mesaj: 'Bir hata oluştu',
      hata: hata.message, // Anlamlı bir hata mesajı sağlayın
    });
  }
};

exports.logoutUser = (req, res) =>{
  req.session.destroy(()=> {
    res.redirect('/')
  })
}