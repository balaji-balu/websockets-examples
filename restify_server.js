/*
  restify_ws_jwt_server.js
  
	* description: restify, Websockets and Javascript Web Tokens(JWT) 
  
	* run the server: node restify_ws_jwt_server.js
	
	* check ws_client.js for web sockets client example
  
	   connect to this server running on localhost:8080
														  	
		url = "ws://localhost:8080/mywspath?token=" + token;  //replace ws with wss for secure socket connection
														  //mywspath set while initializing the server
														  // server url														  
		socket = new WebSocket(url);   

*/
var restify = require('restify'),
	jwt = require('restify-jwt'),
    WebSocketServer = require('ws').Server;

var server = restify.createServer({name: 'my_node_sever'});

var wsServer = new WebSocketServer({
    server: server,
    path: '/mywspath', //optional
});

wsServer.on('connection', function(ws){

/// JWT token verification
    if (!originIsAllowed(ws.upgradeReq.headers.origin)){
        ws.close();
        return;
    }

    queryparams = url.parse(ws.upgradeReq.url, true);
    console.log('queryparams', queryparams)
    if (!queryparams){
        console.error('queryparams null');
        //res.send(401, 'UnAuthorized');
        ws.close();
        return;
    }

    
    if (!queryparams.query.token) {
        console.error('token is null');
        //res.send(401, 'UnAuthorized');
        ws.close();
        return;
    }

    var token = queryparams.query.token;
    jwt.verify(token, 'shhhhhhared-secret', function (err, decoded) {
        if (err) {
            console.log('unauthorized');
            ws.close()
            return;
        } 
    });
	
   //console.log('connection req', s);
    console.log((new Date()) + ' Connection accepted.');
    ws.on('message', function s(msg, flags) {
        console.log('message received', msg, flags);
        ws.send(msg);
    });
    ws.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + ws.remoteAddress + ' disconnected.');
    });
    
});