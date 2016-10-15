var express = require('express'),
    mongoose = require("mongoose"),
    Schema = mongoose.Schema;
    
var Films = new Schema(
    {
        title: String,
        year: String,
        imdb: String
    },{collection:'sample'})
    
module.exports = mongoose.model('Films',Films)
    