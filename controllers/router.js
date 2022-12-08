const express = require('express');
const router = express.Router();

const login = require('./routes/login');

router.use("/login/", login);

module.exports = router;