/*
   web client example using web sockets events 
   
   ref [Writing WebSocket client applications (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_client_applications
)
*/
    var ws = new WebSocket("ws://" + process.env.REACT_APP_API_SERVER + '/pasws'); 
  
    ws.onopen = function() {
      console.log('connected');
      ws.send('message from client');
    }
        // Display messages received from the server
    ws.onmessage = function message(message, flags) {
      console.log('message received', message.data);

    }

    // Display any errors that occur
    ws.onerror = function(error) {
      console.error("Websockets Error: " + error);
    }
    
    //web socket closed
    ws.onclose = function() {
      console.log('Websockets closed);		
    }
