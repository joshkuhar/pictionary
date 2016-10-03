var http = require('http');
var express = require('express');
var socket_io = require('socket.io');

var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);

io.on('connection', function (socket) {
	// socket.broadcast.emit('drawing', 'Drawing') {
	// 	console.log('drawing');
	// 	socket.on('drawing', function(draw){

	// 	});
	// };

	socket.on('draw', function(position) {
        console.log('Received drawing', position);
        socket.broadcast.emit('drawing', position);
    });
});


server.listen(process.env.PORT || 8080);

// Emit a draw event from your mousemove function to the Socket.IO server.
// The event should contain the position object as data.
// In server.js, listen for the draw event, and broadcast it out to all other clients.
// Listen for the broadcast draw event in public/main.js, and call the draw function when it is received

