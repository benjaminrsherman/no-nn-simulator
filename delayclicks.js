$(document).ready(function() {
	addHeader("Slow internet brought to you by your ISP!");
});

function addHeader(string) {
	$('.nnn-header').remove();
	$(document.body).append('<div class="nnn-header"><h2>' + string + '</h2></div>');
}

$('a').on('click', function(event) {
	event.preventDefault();
	addHeader("Next page loading... (Your ISP throttles your data speed, so this might take a few seconds)");
	setTimeout(function(){window.location.href = event.target;}, Math.floor(Math.random() * (3000 - 1000 + 1)) + 500);
});
