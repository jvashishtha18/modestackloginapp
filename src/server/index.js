//app.js

const express = require('express');//import dependency of express server
const bodyParser = require('body-parser');//import dependency of body parser

const Subscribers = require('./route/subscribersRoute'); // Imports routes for the subscribers
// Tour Packages json 
const Blogs = require('./route/blogsRoute'); // Imports tourpackages routes for the packages

 // Imports routes
 const app = express();// creating instance of express server to communicate the server
 const mongoose = require('mongoose');//import the dependency of mongoose
 //Transform
 
 
 app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
   res.setHeader('Access-Control-Allow-Credentials', true);
   next();
 });
 
 
 let dev_db_url="mongodb://localhost:27017/mydb";
 //let dev_db_url="mongodb://heroku_xqbsrz0q:india_123@ds035573.mlab.com:35573/heroku_xqbsrz0q";

 const mongoDB = process.env.MONGODB_URI || dev_db_url;
 mongoose.connect(mongoDB);//connecting to the databse by using mongoose
 mongoose.Promise = global.Promise;
 const db = mongoose.connection;
 db.on('error', console.error.bind(console, 'MongoDB connection error:'));
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({extended: false}));

 app.use('/subscribers', Subscribers);
 app.use('/blogs',Blogs);


 let port = 8080;
app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});