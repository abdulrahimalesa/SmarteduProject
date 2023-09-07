const nodemailer = require("nodemailer");
const User = require('../models/User');
const Cours = require("../models/Course");

exports.getIndexPage = async (req, res) => {
  // console.log(req.session.userID);
    
    const courses = await Cours.find().sort('-createAt').limit(2);
    const totalCourses = await Cours.find().countDocuments();
    const totalStudents = await User.find().countDocuments({role: 'student'});
    const totalTeacher = await User.find().countDocuments({role: 'teacher'});
    res.status(200).render('index', {
      page_name: 'index',
      courses,
      totalCourses,
      totalStudents,
      totalTeacher,
    });
  };

exports.getAboutPage =  (req, res) => {
    res.status(200).render('about',{
        page_name: 'about'
    });
  };

  exports.getRegisterPage =  (req, res) => {
    res.status(200).render('register',{
        page_name: 'register'
    });
  };

  exports.getLoginPage =  (req, res) => {
    res.status(200).render('login',{
        page_name: 'login'
    });
  };

  exports.getContactPage =  (req, res) => {
    res.status(200).render('contact',{
        page_name: 'contact'
    });
  };

  exports.sendEmail =  async (req, res) => {

    try {
      
    

    const outputMessage = `
    
    <h1>Mail Details </h1>
    <ul>
    <li>Name: ${req.body.name}</li>
    <li>Email: ${req.body.email}</li>
    </ul>
    <h1>Message</h1>
    <p>${req.body.message}</p>

    `


    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: 'abdulrahimalesa507@gmail.com', // gmail account
        pass: 'hnrisiuqowmafokc' // gmail password  

      }
    });
    
    // async..await is not allowed in global scope, must use a wrapper
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Deneme projeden gonderiyorum " <abdulrahimalesa507@gmail.com>', // sender address
        to: "abdulrahimalesa@gmail.com", // list of receivers
        subject: "Hello Deneme New Message", // Subject line
        html: outputMessage, // html body
      });
    
      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      req.flash("success", "We Reeived your message sucesflly");


    res.status(200).redirect('contact');

  } catch (err) {
    req.flash("error", `Something happened!`);
    res.status(200).redirect('contact');
  }

  };
  