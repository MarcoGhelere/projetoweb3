const express = require('express');
const character = require('../../models/characters');
const router = express.Router();
const jwt = require("jsonwebtoken");

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

router.get("/", tokenCheck, async (req, res) => {

    const { name } = req.query;
    if (!name) {
        return res.status(400).json({ msg: "Name input cannot be empty" });
    }

    //Buscar por personagem (o "i" torna a busca case insensitive)
    const swCharacter = await character.find({
        name: { $regex: name, $options: "i" },
    }).exec();

    if (!swCharacter) {
        return res.status(400).json({ error: "There are no Star Wars characters that match the search :(" });
    }

    res.status(200).json(swCharacter);
});

module.exports = router;