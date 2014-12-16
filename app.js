var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

/* define mongoose*/
var mongoose = require('mongoose'); // step 1

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('port', process.env.PORT || 8000);
app.set('views', path.join(__dirname, 'views'));
app.set('views',__dirname+'/views');
//app.set('view engine', 'ejs');
app.engine('.html',require('ejs').renderFile);
app.set('view engine','html');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(favicon(__dirname+'/public/images/houselove_favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

mongoose.connect('mongodb://localhost/houseloveuser'); //step 2



http.createServer(app,function(req,res){
		res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
	}).listen(app.get('port'), function(req,res){
		console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
