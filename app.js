const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session')
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override')
const flash = require('connect-flash');
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/category');
const userRoute = require('./routes/userRoute');

const app = express();

// Connect DB
mongoose.connect('mongodb+srv://abdulrahimalesa:9CxjQkyHYNryn5so@cluster0.eoovqsb.mongodb.net/smart-db?retryWrites=true&w=majority')
.then(()=> {
  console.log('DB Connercted successfuly');
})


//Template Engine
app.set("view engine", "ejs");

// Global Variable 
global.userIN = null;

//Middlewares
app.use(express.static("public"));
app.use(express.json()) // for parsing application/json body den gelen veri yakalamak icin olmazi gerekiyo
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(session({
  secret: 'my_keyboard_cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: 'mongodb+srv://abdulrahimalesa:9CxjQkyHYNryn5so@cluster0.eoovqsb.mongodb.net/smart-db?retryWrites=true&w=majority' })
}));

app.use(flash());
app.use((req, res, next)=> {
  res.locals.flashMessages = req.flash();
  next();
});

app.use(
  methodOverride('_method',{
    methods: ['POST', 'GET'],
  })
);


// Routes
app.use('*', (req, res, next) => {
  userIN = req.session.userID;
  next();
})
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App Started on port ${port}`);
});
