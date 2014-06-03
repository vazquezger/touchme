var application_root = __dirname,
	express = require("express"),
	path = ("path"),
	mongoose = require("mongoose"),
  http = require("http");

var app = express();

// db

mongoose.connect('mongodb://localhost/touchme');

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

// config
app.configure(function() {
		app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
		app.use(express.logger('dev')); 						// log every request to the console
		app.use(express.bodyParser()); 							// pull information from html in POST
		app.use(allowCrossDomain);
	});


var feed = [ 
               {'id': 0, 'name': "name A", 'match': false} 
              ,{'id': 1, 'name': "name B", 'match': false}
              ,{'id': 2, 'name': "name C", 'match': false}
              ,{'id': 3, 'name': "name D", 'match': false}  
              ,{'id': 4, 'name': "name E", 'match': false}  
              ,{'id': 5, 'name': "name F", 'match': false}
           ];
var matches = new Object();   
matches['3'] = 5;

app.get('/api/v0/feed/:location/users/:id', function (req, res, next) {
    location = req.params.location; // location is "latitude,longitude"
    id = req.params.id;
    console.log(location + ' - ' + id); 
    res.setHeader('Content-Type', 'application/json');    
    res.json({ feed: feed });
    next();
});

app.post('/api/v0/users/:id/like/:targetId', function (req, res, next) {
    id = req.params.id;
    targetId = req.params.targetId;
    console.log('like from: ' + id +  ' to: ' + targetId); 
    res.setHeader('Content-Type', 'application/json');
    matches[""+id] = targetId;
    match = matches[""+targetId] == id;
    feed[id].match = match;
    feed[targetId].match = match;
    res.json({
                'match': match
             });
    next();
});


// launch server
var server = app.listen(8008, function() {    
    console.log('Listening on port %d', server.address().port);
});

