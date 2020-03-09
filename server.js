const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var path = require('path');
const db = require("./app/models");


var indexRouter = require('./app/routes/index');
//var tutoRouter = require('./app/routes/tutorial.routes');
var userRouter = require('./app/routes/user');

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(cookieParser());

// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'app/public')));

db.sequelize.sync();
require('./app/seeders');

// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

app.use('/', indexRouter);
//app.use('/api/tutorials', tutoRouter);
app.use('/api/user', userRouter);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
