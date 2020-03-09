const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.js")(sequelize, Sequelize);
db.business = require("./business.js")(sequelize, Sequelize);
db.schedule = require("./schedule.js")(sequelize, Sequelize);
db.cars = require("./cars.js")(sequelize, Sequelize);
db.available_schedule = require("./available_schedules")(sequelize, Sequelize);
db.order = require("./order")(sequelize, Sequelize);

module.exports = db;
