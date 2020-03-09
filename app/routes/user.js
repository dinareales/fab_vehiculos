var express = require('express');
var router = express.Router();
const user = require("../controllers/user");


// Create a new Tutorial
router.post("/", user.create);
module.exports = router;
