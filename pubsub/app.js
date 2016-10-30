'use strict';

var express = require('express');
var app = express();
var badges = require('./controllers/badges');

// Middleware. Parse Json data if in request to string.
app.use(express.json());

// Invokes save, then send. 
app.post('/', badges.save, badges.send);

app.get('/badges', badges.get);

app.listen(8000, function(){
	console.log('Server is listening on port 8000');
});