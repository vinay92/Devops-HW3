var redis = require('redis')
var multer  = require('multer')
var express = require('express')
var fs      = require('fs')
var serverApp1 = express()
var os = require('os');

// REDIS
var client = redis.createClient(6379, '127.0.0.1', {})
var siteCache  = "siteCache"
var imgQueue = "imgQueue"


if(process.argv.length <3) {
	console.log("Error - wrong number of arguments");
	process.exit();
}

var PORT = process.argv[2];

var server1 = serverApp1.listen(PORT, function () {

  var host = server1.address().address
  var port = server1.address().port

  console.log('Example app listening at http://%s:%s', host, port)
})


//functions for server 1
serverApp1.use(function(req, res, next) 
{
	console.log(req.method, req.url);

	// ... INSERT HERE.
	client.lpush(siteCache, req.url);
	if(siteCache.length > 5) {
		client.ltrim(siteCache, 0, 4);
		
	}

	next(); // Passing the request to the next handler in the stack.
});

serverApp1.post('/upload',[ multer({ dest: './uploads/'}), function(req, res){
    if( req.files.image )
    {
 	   fs.readFile( req.files.image.path, function (err, data) {
 	  		if (err) throw err;
 	  		var img = new Buffer(data).toString('base64');
 	  		client.lpush(imgQueue, img);
 	  		console.log(imgQueue.length);
 		});
 	}

    res.status(204).end()
 }]);

serverApp1.get('/meow', function(req, res) {
	{
		//if (err) throw err
		
		var data;
		client.lpop(imgQueue, function(err, imagedata) {
			if(imagedata == undefined) {
				res.send("This is a HTTP server on port " + PORT + "<br> There are currently no images to  display")
			}
			else {
				res.writeHead(200, {'content-type':'text/html'});
				//console.log(imagedata);
				if(err) {
					console.log(err)
				}
				res.write("<h1>This is a HTTP server on port " + PORT + "\n<img src='data:my_pic.jpg;base64,"+imagedata+"'/>");
				res.end();
			}
		});
		
	}
})

serverApp1.get('/', function(req, res) {
  res.send('This is a HTTP server on port ' + PORT);
})

serverApp1.get('/set', function(req, res) {
	//res.send('This is a HTTP server on port ' + PORT)
  client.set("key", "this message will self-destruct in 10 seconds");
  client.expire("key", 10, function() {
  	console.log("expired");
  })
  res.send('This is a HTTP server on port ' + PORT + '<br> Key has been set on server with port ' + PORT)
})

serverApp1.get('/get', function(req, res) {
	//res.send('This is a HTTP server on port ' + PORT)
  var message;

  client.get("key", function(err,value){ 
  	message = value;
  	if(message != null) {
  	res.send('This is a HTTP server on port ' + PORT + '<br>' + message); console.log(value);
	}
	else {
		res.send('This is a HTTP server on port ' + PORT  );
	}
  })
})

serverApp1.get('/recent', function(req, res) {
	//res.send('This is a HTTP server on port ' + PORT)
  var message;
  client.lrange(siteCache, 0, -1, function(err, message) {
  	console.log(err);
  	res.send('This is a HTTP server on port ' + PORT + '<br>' + "Recently visited sites - " + message);	
  });
  
})

serverApp1.post('/', function (req, res) {
	//res.send('This is a HTTP server on port ' + PORT)
  res.send('This is a HTTP server on port ' + PORT + '<br> POST request to the homepage');
});

