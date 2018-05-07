const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app'); // to use this - on the command line: DEBUG=app node app.js
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('tiny')); 
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static('src/views'));

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    //res.send('Hello World');
    //res.sendFile(path.join(__dirname, 'views/index.html'));
    res.render('index', { list: ['a', 'b'], title: 'My Title' });
});

app.get('/books', function(req, res){
    res.send('Hello Books');
});

app.listen(port, function(err){
    //console.log(`running server on port ${chalk.green(port)}`);
    debug(`running server on port ${chalk.green(port)}`);
});