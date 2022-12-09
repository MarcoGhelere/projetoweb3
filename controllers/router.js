const express = require('express');
const router = express.Router();

const login = require('./routes/login');
const swapi = require('./routes/swapi');
const addcharacter = require('./routes/addcharacter');

router.use("/login/", login);
router.use("/swapi/", swapi);
router.use("/addcharacter/", addcharacter);

module.exports = router;