const express = require('express');
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Todo usuário será admin
const Character = new Schema({
    name: { 
        type: String, required: true
     },
     link: {
        type: String, required: true
     },
});

module.exports = mongoose.model("Character", Character);