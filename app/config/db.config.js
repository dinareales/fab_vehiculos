module.exports = {
  HOST: "ordenes-empresa.crj8n0kft7nl.us-east-1.rds.amazonaws.com",
  USER: "admin",
  PASSWORD: "UqKpM2cQCfUgk2Qa",
  DB: "fab_autos",
  dialect: "mssql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
