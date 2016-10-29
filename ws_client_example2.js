/*
   web client example using web sockets events 
   
   ref [Writing WebSocket client applications (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_client_applications
)
*/
    var ws = new WebSocket("ws://" + process.env.REACT_APP_API_SERVER + '/pasws'); 
  
    ws.onOpen = function(event) {
      console.log('connected');
      ws.send(Date.now().toString(), {mask: true});
    }
        // Display messages received from the server
    ws.onmessage = function message(data, flags) {
      console.log('Roundtrip time: ' + (Date.now() - parseInt(data, 10)) + 'ms', flags);

      setTimeout(function timeout() {
        ws.send(Date.now().toString(), {mask: true});
      }, 500);

		  //var data = JSON.parse(event.data);
      //message.textContent = "Server Says: " + ((data) ? data.msg : '');
    }

    // Display any errors that occur
    ws.onerror = function(event) {
      message.textContent = "Error: " + event;
    }

    ws.onclose = function(event) {
        open.disabled = false;
        status.textContent = "Not Connected";
    }
