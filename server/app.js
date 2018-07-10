var express = require('express')
, load = require('express-load')
, path = require('path')
, util    = require('util')
, compression = require('compression')
, requestTimeout = require('express-timeout')
, responseTime = require('response-time')
, buffer = require('buffer')
, events = require('events')
, archiver = require('archiver')
, fs    = require('fs')
, mime = require('mime')
, async = require('async')
, timeout = require('connect-timeout')
, bodyParser = require('body-parser')
, multer = require('multer');

var app = express();
var http = require('http').Server(app);

load('config.js', {'verbose': false})
.then('libs')
.then('views')
.then('controllers')
.then('routes')
.then('middleware')
.into(app);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

/*app.use(requestTimeout({
		'timeout': 1000 * 60 * 30,
		'callback': function(err, options) {
			var response = options.res;
			if (err) {
				util.log('Timeout: ' + err);
			}
			response.end();
		}
}));*/

var static = express.static(app.config.clientDir);

app.use(static);
app.use('/home', static);
app.use('/map', static);
app.use('/about', static);
app.use('/sicar', static);

http.listen(app.config.port, function() {
	console.log('LAPIG-MAPS Server @ [port %s] [pid %s]', app.config.port, process.pid.toString());
	app.middleware.jobs.start();
});


process.on('uncaughtException', function (err) {
	console.error(err.stack);
});
