$('a').on('click', function(event) {
	event.preventDefault();
	setTimeout(function(){window.location.href = event.target;}, Math.floor(Math.random() * (3000 - 1000 + 1)) + 500);
});
