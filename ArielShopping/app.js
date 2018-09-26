// This is a server file written using express and this is also the entry point of our application
// use this a reference as to how to write express/node code and learn the syntax
var express = require('express');

// You can create a custom module which should not be placed in node_module folder
// And usually they should be placed in lib folder. 
// Think of custom modules as classes
var fortune = require('./lib/fortune.js');

var app = express();

var bodyParser = require('body-parser');

// set up handlebars view engine
/// TODO Understanding how section works 
var handlebars = require('express3-handlebars')
        .create({ 
            defaultLayout:'main' ,
            helpers: {
                section: function(name, options) {
                    if(!this._sections) this._sections = {};
                    this._sections[name] = options.fn(this);
                    return null;
                }
            }
    });

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//The static middleware allows you to designate one or more directories as containing
//static resources that are simply to be delivered to the client without any special handling.
//This is where you would put things like images, CSS files, and client-side JavaScript files
app.use(express.static(__dirname + '/public')); 

app.set('port', process.env.PORT || 3000); // process.env will return the environment variable if you have PORT set up

// Since we are using POST for form submission, we will have to link in middleware to parse the URL-encoded body

// This is the new way to implement body parser
// TODO need to understand what this does
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

//define a local variable in response which is available through view
app.use(function(req, res, next){
    res.locals.showTests = app.get('env') !== 'production' && req.query.test == 1;
    next();
});

// partials.exchangeRate is a local variable defined in the views/partials (In this case, exchange rate handlebars) 
// which will carry the data from somewhere else (In this case, fortune.getExchangeRateData()) 
// And the last step would be to use a view to render the views/partials
app.use(function(req, res, next){
    if(!res.locals.partials) res.locals.partials = {}
    res.locals.partials.exchangeRate = fortune.getExchangeRateData();
    next();
})

app.get('/home', function(req, res){
    res.render('home');
});

// getFortune function has been added to the Global Variable exports so it is public to outside
// pageTestScript is a variable that triggers specific testing to happen, if the script location
// is not null, it will run the test script from that specified location
app.get('/about', function(req, res){
    res.render('about', { 
        fortune: fortune.getFortune(),
        pageTestScript: '/qa/tests-about.js'
    });
});

app.get('/jquery-test', function(req, res){
	res.render('jquery-test');
});

app.get('/nutritions/movefree', function(req, res){
    res.render('nutritions/movefree');
});

app.get('/nutritions/request-group-discount', function(req, res){
    res.render('nutritions/request-group-discount');
});


// TODO This is related to client side handlebars 
app.get('/nursery-rhyme', function(req, res){
	res.render('nursery-rhyme');
});

app.get('/data/nursery-rhyme', function(req, res){
	res.json({
		animal: 'squirrel',
		bodyPart: 'tail',
		adjective: 'bushy',
		noun: 'heck',
	});
});
                                                                        
// TODO Understand how this works
app.get('/newsletter', function(req, res){
    // we will learn about CSRF later...for now, we just
    // provide a dummy value
    res.render('newsletter', { csrf: 'CSRF token goes here' });
});

app.post('/process', function(req, res){
    console.log('Form (from querystring): ' + req.query.form);
    console.log('CSRF token (from hidden form field): ' + req.body._csrf);
    console.log('Name (from visible form field): ' + req.body.name);
    console.log('Email (from visible form field): ' + req.body.email);
    res.redirect(303, '/thank-you');
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