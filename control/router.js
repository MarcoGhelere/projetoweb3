const express = require('express');
const router = express.Router();

router.use("/login/", login);

module.exports = router;