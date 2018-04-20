// This is a server file written using express and this is also the entry point of our application
// use this a reference as to how to write express/node code and learn the syntax
var express = require('express');

// You can create a custom module which should not be placed in node_module folder
// And usually they should be placed in lib folder. 
// Think of custom modules as classes
var fortune = require('./lib/fortune.js')

var app = express();

// set up handlebars view engine
var handlebars = require('express3-handlebars')
        .create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//The static middleware allows you to designate one or more directories as containing
//static resources that are simply to be delivered to the client without any special handling.
//This is where you would put things like images, CSS files, and client-side JavaScript files
app.use(express.static(__dirname + '/public')); 

app.set('port', process.env.PORT || 3000); // process.env will return the environment variable if you have PORT set up

app.get('/home', function(req, res){
    res.render('home');
});

// getFortune function has been added to the Global Variable exports so it is public to outside
app.get('/about', function(req, res){
    res.render('about', { fortune: fortune.getFortune() });
});

//Custom 404 page - Middleware
app.use(function(req, res){
    res.status(404);
    res.render('404');
});

//Custom 500 page - Middleware
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function(){
    console.log( 'Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});