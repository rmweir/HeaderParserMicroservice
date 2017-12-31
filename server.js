 /******************************************************
 * PLEASE DO NOT EDIT THIS FILE
 * the verification process may break
 * ***************************************************/

'use strict';

var fs = require('fs');
var express = require('express');
var app = express();
var useragent = require('useragent');

/*
if (!process.env.DISABLE_XORIGIN) {
  app.use(function(req, res, next) {
    var allowedOrigins = ['https://narrow-plane.gomix.me', 'https://www.freecodecamp.com'];
    var origin = req.headers.origin || '*';
    if(!process.env.XORIG_RESTRICT || allowedOrigins.indexOf(origin) > -1){
         console.log(origin);
         res.setHeader('Access-Control-Allow-Origin', origin);
         res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    }
    next();
  });
}
*/

app.use('/public', express.static(process.cwd() + '/public'));

app.route('/_api/package.json')
  .get(function(req, res, next) {
    console.log('requested');
    fs.readFile(__dirname + '/package.json', function(err, data) {
      if(err) return next(err);
      res.type('txt').send(data.toString());
    });
  });
  
app.get('/tid', function(req, res) {
	console.log("entered");
	var userinfo = useragent.parse(req.headers['user-agent']).source;
	// below we extract the parts of the useragent representation that are useful to us
	var begin = userinfo.indexOf("(");
	var end = userinfo.indexOf(")");
	var software = userinfo.slice(begin + 1, end);
	console.log(userinfo);

	var entireip = req.headers['x-forwarded-for'].slice(0,16);
	var ipv4 = entireip.slice(0, entireip.indexOf(","));
	
	var entirelanguage = req.headers['accept-language'];
	var language = entirelanguage.slice(0, entirelanguage.indexOf(","));
	var useragentjson = { "ipaddress": ipv4, "language": language, "software": software };
	res.type('txt').status(200).send(JSON.stringify(useragentjson)); 
});

app.route('/')
    .get(function(req, res) {
		  res.sendFile(process.cwd() + '/views/index.html');
    })


// Respond not found to all the wrong routes
app.use(function(req, res, next){
  res.status(404);
  res.type('txt').send('Notaaaaaaiaaa found');
});

// Error Middleware
app.use(function(err, req, res, next) {
  if(err) {
    res.status(err.status || 500)
      .type('txt')
      .send(err.message || 'SERVER ERROR');
  }  
})

app.listen(process.env.PORT, function () {
  console.log('Node.js listening ...');
});

