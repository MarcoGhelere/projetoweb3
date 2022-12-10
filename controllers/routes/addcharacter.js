const express = require('express');
const character = require('../../models/characters');
const router = express.Router();
const jwt = require("jsonwebtoken");
const multer = require("multer");
const fetch = require("node-fetch");

function tokenCheck(req, res, next) {
    const token = req.headers.token;
    if (!token) {
        return res.status(400).json({ error: "User is not authenticated" });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (error) => {
        if (error) {
            return res.status(400).json({ error: "User is not authenticated" });
        }

        req.token = token;
        next();
    });
}

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", tokenCheck, upload.single("charPic"), (req, res) => {

    fetch(`${process.env.IMG_LINK}`, {
        method: "POST",
        headers: { "Content-Type": "image/png" },
        body: req.file.buffer,
    })

    .then((response) => response.json())
    .then((data) => {
        const addCharacter = new character({name: req.body.name, link: data.url,});

        addCharacter.save();

        return res.status(200).json({ msg: "Character created" });   
    },
    (error) => {
        console.error('Error:', error);
    }
    );  
});

module.exports = router;