var http      = require('http');
var httpProxy = require('http-proxy');
var exec = require('child_process').exec;
var request = require("request");
var redis = require('redis')
var client = redis.createClient(6379, '127.0.0.1', {})
var serverQueue = "serverQueue"

var SERVER_1 = 'http://127.0.0.1:3000';
var SERVER_2  = 'http://127.0.0.1:3001';

client.flushall();
client.lrange(serverQueue, 0 ,-1, function(err, message) {
  if(err) {
    console.log(err);
  }

  console.log("serverCache - " + message);
})
client.lpush(serverQueue, SERVER_1);
client.lrange(serverQueue, 0, -1, function(err, message) {
  if(err) {
    console.log(err);
  }

  console.log("serverCache - " + message);
})
var TARGET;

var options = {};
var proxy   = httpProxy.createProxyServer(options);

var server  = http.createServer(function(req, res)
{
	client.lpop(serverQueue, function(err, message) {
		TARGET = message;
		//console.log(message);
	
	console.log(TARGET);
 	proxy.web( req, res, {target: TARGET } );
 	if(TARGET == SERVER_1) {
    console.log("Changing server in the proxy");
 		client.lpush(serverQueue,SERVER_2);
 	}
 	else {
 		client.lpush(serverQueue,SERVER_1);
 	}
 	});
});
server.listen(80, "127.0.0.1");

exec('forever start main.js 3000', function(err, out, code) 
    {
      console.log("Launching the server on port 3000");
      if (err instanceof Error)
            throw err;
      if( err )
      {
        console.error( err );
      }
    });

exec('forever start main.js 3001', function(err, out, code) 
    {
      console.log("Launching the server on port 3001");
      if (err instanceof Error)
            throw err;
      if( err )
      {
        console.error( err );
      }
    });

process.on('exit', function(){
	exec('forever stopall', function()
    {
      console.log("Proxy shutdown");
      process.exit();
    });
});

process.on('SIGINT', function(){
	exec('forever stopall', function()
    {
      console.log("Proxy stopped via SIGINT signal");
      process.exit();
    });
});