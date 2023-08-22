const express = require('express');
const mongoose = require('mongoose');
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute')

const app = express();

// Connect DB
mongoose.connect('mongodb://localhost/smartedu-db')
.then(()=> {
  console.log('DB Connercted successfuly');
})


//Template Engine
app.set("view engine", "ejs");

//Middlewares
app.use(express.static("public"));
app.use(express.json()) // for parsing application/json body den gelen veri yakalamak icin olmazi gerekiyo
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.use('/', pageRoute);
app.use('/courses', courseRoute);


const port = 3000;
app.listen(port, () => {
  console.log(`App Started on port ${port}`);
});
