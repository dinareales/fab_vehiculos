// Seed the data
const sequelize_fixtures = require('sequelize-fixtures');

var path = require('path');
var models = require('../models/');

sequelize_fixtures.loadFiles([
    './app/seeders/business.js',
    './app/seeders/schedule.js',
    './app/seeders/cars.js'
], models).then(function(){
    console.log('Seed data loaded!');
});
