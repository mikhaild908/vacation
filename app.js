var express = require('express');
var chalk = require('chalk');
var debug = require('debug')('app'); // to use this - on the command line: DEBUG=app node app.js
var morgan = require('morgan');
var path = require('path');

var app = express();

var port = 3000;

app.use(morgan('tiny')); 
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static('src/views'));

app.get('/', function(req, res){
    //res.send('Hello World');
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.get('/books', function(req, res){
    res.send('Hello Books');
});

app.listen(port, function(err){
    //console.log(`running server on port ${chalk.green(port)}`);
    debug(`running server on port ${chalk.green(port)}`);
});