// This is a server file written using express and this is also the entry point of our application
// use this a reference as to how to write express/node code and learn the syntax
var express = require('express');

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

//Dynamic content displayed on the view 
// 1. variables defined in the app.js file
// 2. views implemented with variables
// 3. app.js file defines how to use the variables
var fortunes = ["Conquer your fears or they will conquer you.",
                "Rivers need springs.",
                "Do not fear what you don't know.",
                "You will have a pleasant surprise.",
                "Whenever possible, keep it simple.",
];

app.get('/about', function(req, res){
    var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render('about', { fortune: randomFortune });
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