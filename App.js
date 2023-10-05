const express = require('express');
const http=require('http');
const mysql = require('mysql');
var path = require('path');
const multer = require('multer');

try {
    const express = require('express');
    console.log('Express.js is installed.');
   } 
   catch (error) {
    console.error('Express.js is not installed.');
   }

const app = express();
const bodyParser = require('body-parser');
const dbConfig = {
    host: 'penguin',
    user: 'root',
    password: 'butthina445@==',
    database: 'yourdb',
  };
  const connection = mysql.createConnection(dbConfig);
  module.exports = connection;
  connection.connect(function(err) {
    if (err) 
    {
      return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
});
const BusesRouter=require('./Routes/Buses')
const CitiesRouter=require('./Routes/Cities')
const routes_Router=require('./Routes/C_Routes')
const timings_Router=require('./Routes/Timings')
const bookings_Router=require('./Routes/Booking_basic')
const book_Router=require('./Routes/Bookings')
const prices_Router=require('./Routes/Price')
app.use('/buses',BusesRouter);
app.use('/cities',CitiesRouter);
app.use('/c_routes',routes_Router);
app.use('/timings',timings_Router);
app.use('/bookings',bookings_Router);
app.use('/book',book_Router);
app.use('/prices',prices_Router);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/'); 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extension); 
  },
});

const upload = multer({ storage });
const port = process.env.PORT || 4002;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});