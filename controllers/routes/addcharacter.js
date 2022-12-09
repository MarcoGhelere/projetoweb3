const express = require('express');
const character = require('../../models/characters');
const router = express.Router();
const jwt = require("jsonwebtoken");

function tokenCheck(req, res, next) {
    const token = req.headers.token;
    if (!token) {
        return res.status(400).json({ error: "User is not authenticated" });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
        if (err) return res.status(400).json({ error: "User is not authenticated" });

        req.token = token;
        req.userId = decoded.id;
        next();
    });
}

router.post("/", tokenCheck, (req, res) => {

        const addCharacter = new character({name: req.body.name,});

        addCharacter.save();

        return res.status(200).json({ msg: "Character created" });
});

module.exports = router;