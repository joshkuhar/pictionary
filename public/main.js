var socket = io();

var pictionary = function(){

	var WORDS = [
    "word", "letter", "number", "person", "pen", "class", "people",
    "sound", "water", "side", "place", "man", "men", "woman", "women", "boy",
    "girl", "year", "day", "week", "month", "name", "sentence", "line", "air",
    "land", "home", "hand", "house", "picture", "animal", "mother", "father",
    "brother", "sister", "world", "head", "page", "country", "question",
    "answer", "school", "plant", "food", "sun", "state", "eye", "city", "tree",
    "farm", "story", "sea", "night", "day", "life", "north", "south", "east",
    "west", "child", "children", "example", "paper", "music", "river", "car",
    "foot", "feet", "book", "science", "room", "friend", "idea", "fish",
    "mountain", "horse", "watch", "color", "face", "wood", "list", "bird",
    "body", "dog", "family", "song", "door", "product", "wind", "ship", "area",
    "rock", "order", "fire", "problem", "piece", "top", "bottom", "king",
    "space"
	];

	var guessBox;
	var drawing = false;

	var onKeyDown = function(event) {
    	if (event.keyCode != 13) { // Enter
        	return;
    	}

    	console.log(guessBox.val());
    	socket.emit('guess', guessBox.val());
    	guessBox.val('');
	};

	var updateGuess = function(guess){
		$('#guesses').text(guess);
	};

	guessBox = $('#guess input');
	guessBox.on('keydown', onKeyDown);


	var canvas, context;

	var draw = function(position) {
		context.beginPath();
		context.arc(position.x, position.y, 6, 0, 2 * Math.PI);
		context.fill();
	};

	canvas = $('canvas');
	context = canvas[0].getContext('2d');
	canvas[0].width = canvas[0].offsetWidth;
	canvas[0].height = canvas[0].offsetHeight;
	


	canvas.mousedown(function(){
		drawing = true;
	});

	canvas.mouseup(function(){
		drawing = false;
	});
		

	canvas.on('mousemove', function(event) {
		var offset = canvas.offset();
		var position = {x: event.pageX - offset.left,
						y: event.pageY - offset.top};
		if (drawing){
			draw(position);
			// socket.emit('draw', socket.client.id);
			socket.emit('draw', position);
			}
	});
	socket.on('draw', draw);
	socket.on('guess', onKeyDown);
	socket.on('guess', updateGuess);
};

$(document).ready(function() {
	pictionary();
});

// Listen for the mousedown event
// When the event is fired, set a variable called drawing to true
// Listen for the mouseup event
// When the event is fired, set the drawing variable to false
// Only perform the mousemove actions when drawing is set to true


// Emit a draw event from your mousemove function to the Socket.IO server.
// The event should contain the position object as data.
// In server.js, listen for the draw event, and broadcast it out to all other clients.
// Listen for the broadcast draw event in public/main.js, and call the draw function when it is received