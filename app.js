const http = require('http');
// Require the libraries:
var SocketIOFileUpload = require('socketio-file-upload'),
    socketio = require('socket.io'),
    express = require('express');

// Make your Express server:
var app = express()
    .use(SocketIOFileUpload.router)
    .use(express.static(__dirname + "/public"));

    const server = http.createServer(app);
    const io = socketio(server);


// Start up Socket.IO:

io.sockets.on("connection", function(socket){

    // Make an instance of SocketIOFileUpload and listen on this socket:
    var uploader = new SocketIOFileUpload();
    uploader.dir = "uploads";
    uploader.listen(socket);

    // Do something when a file is saved:
    uploader.on("saved", function(event){
        console.log(event.file);
    });

    // Error handler:
    uploader.on("error", function(event){
        console.log("Error from uploader", event);
    });
});


const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));