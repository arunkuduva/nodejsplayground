var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));

app.use(express.static(__dirname ));
/*
var logger = function(req, res , next){
    console.log('inbsiude logger');
    next();
}

app.use(logger);
*/

app.get('/', function(req, res){

    res.sendFile(path.join(__dirname+'/index.html'));
    res.render()
});



app.get('/ejs', function(req, res){

    var random = Math.random();

    res.render('inex', {
        random1: random
    });

});

app.listen(3000, function(){

console.log('I am inside expreee');
});