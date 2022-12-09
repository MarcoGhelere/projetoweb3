const express = require('express');
const app = express();
var path = require('path');
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const router = require("./controllers/router");

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
    credentials: true
  }
app.use(cors(corsOptions));
app.use(express.json());

dotenv.config();

const mongoDB = process.env.MONGO_ATLAS_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use("/", router);
//app.use(express.static(path.join(__dirname + "/public")));

app.listen(3000);