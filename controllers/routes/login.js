const express = require('express');
const userdata = require('../../models/userdata');
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {

    const {email, password} = req.body;

    //Checa se os campos estão devidamente preenchidos:
    if (!email == null || !password == null){
        return res.status(400).json({error: "All inputs must be filled"});
    }

    //Verificar se ja existe user com esse email:
    const existentUser = await userdata.findOne({ email }).exec();

    if (existentUser) {
        return res.status(400).json({ error: "E-mail already registered!" });
    }

    const addUser = new userdata({email,password: bcrypt.hashSync(password, 16)});

    addUser.save();
    res.status(200).json({ message: "User registered" });

})

router.post("/login", async (req, res) => {
    const {email, password} = req.body;

    let token;
   
    //Checa se os campos estão devidamente preenchidos:
    if (!email == null || !password == null){
        return res.status(400).json({error: "All inputs must be filled"});
    }

    //Verificar se ja existe user com esse email:
    const existentUser = await userdata.findOne({ email }).exec();

    if (!existentUser) {
        return res.status(400).json({ error: "User not registered" });
    }
    if (!bcrypt.compareSync(password, existentUser.password)) {
        return res.status(400).json({ error: "Wrong password" });
    }

    token = jwt.sign({ id: existentUser._id }, process.env.JWT_SECRET_KEY);

    res.status(200).json({ name: existentUser.name, token });
})

function validateToken(req, res, next) {
    const token = req.headers.auth;
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

router.get("/userdata", validateToken, async (req, res) => {
    const existentUser = await userdata.findOne({ _id: req.userId }).exec();

    res.status(200).json({name: existentUser.name});
});

module.exports = router;