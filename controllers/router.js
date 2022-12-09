const express = require('express');
const router = express.Router();

const login = require('./routes/login');
const swapi = require('./routes/swapi');

router.use("/login/", login);
router.use("/swapi/", swapi);

module.exports = router;