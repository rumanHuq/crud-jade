var mongoose = require("mongoose"),
    db = mongoose.connect('mongodb://localhost:27017/m101'),
    Film = require('./models/filmModel'),
    express = require ('express'), // server
    app = express(), //instance of express to use url
    rootRouter = express.Router(),
    pug = require('pug'), //Template engine
    bodyParser = require('body-parser'),
    assert = require('assert'); // unit testing module

// set view engine
app.set('views', './views');
app.set('view engine', 'pug');

// serve static contents (css, js)
app.use(function(req,res,next){
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,PATCH,DELETE');
    res.header('Access-Control-Allow-Headers','Content-Type');
    next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser({}));
app.use(express.static('./public'));
app.use(express.static('node_modules/bootstrap/dist'));
app.use('/',rootRouter); // -- router has to be passed in as middleware in order to use --

var rootRoute = require("./Routes/rootRoute")(express,rootRouter,Film,assert);
    
app.listen(5000, function(){
    console.log('running...');
})