var http = require('http');
var express = require('express');
var socket_io = require('socket.io');

var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);


var users = [];

io.on('connection', function (socket) {
	// socket.broadcast.emit('drawing', 'Drawing') {
	// 	console.log('drawing');
	// 	socket.on('drawing', function(draw){

	// 	});
	// };
	
	var userID = socket.client.id;
	users.push(userID);
	console.log(users);

	socket.on('draw', function(position) {
        console.log('Received draw', position);
        socket.broadcast.emit('draw', position);
    });

    socket.on('guess', function(guess){
    	// console.log(guess.id);
    	socket.broadcast.emit('guess', guess);
    });

    socket.on('disconnect', function(){
        console.log('user disconnected ' + numUsers.client.id);
    });
});



server.listen(process.env.PORT || 8080);

// Emit a draw event from your mousemove function to the Socket.IO server.
// The event should contain the position object as data.
// In server.js, listen for the draw event, and broadcast it out to all other clients.
// Listen for the broadcast draw event in public/main.js, and call the draw function when it is received

