var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var dotenv=require('dotenv');
//console.log(process.env);
const result = dotenv.config();
mongoose.set('debug', true);
var dbURI = 'mongodb://'+process.env.DB_USER+':'+process.env.DB_PASS+'@ds163232.mlab.com:63232/myshop'; 
mongoose.connect(dbURI.toString(),{
    useMongoClient: true,
  });
mongoose.connection.on('connected', function () {  
    console.log('Mongoose default connection open to ' + dbURI.toString());
  }); 
  
  // If the connection throws an error
  mongoose.connection.on('error',function (err) {  
      console.log(dbURI.toString());
    console.log('Mongoose default connection error: ' + err);
  }); 
  
var index = require('./routes/index');
var apiRoutes = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');





// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
//app.use(busboyBodyParser());
app.use(bodyParser.urlencoded({extended: true}));


app.use(bodyParser.json({limit: '50mb'}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});


app.use('/api', apiRoutes);
// app.use('/adminapi', adminRoutes);
// app.use('/user', userRoutes);
// app.use('/message', messageRoutes);
app.use('/', index);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    return res.render('index');
});


module.exports = app;
