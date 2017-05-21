function toggle() {
	$('video,audio').each(function() {
		if ($(this).get(0).paused) {
			$(this).get(0).play();
		} else {
			$(this).get(0).pause();
		}
	});
	setTimeout(toggle, Math.floor(Math.random() * (5000 - 1000 + 1)) + 500);
}

$(document).ready(async function() {
	var urls = ["google", "netflix", "youtube", "amazon", "pandora", "spotify", "facebook", "reddit", "twitter", "tumblr"];
	var url = window.location.href;
	var execute = true;
	for (s in urls) {
		if (url.substring(s) !== -1) {
			execute = false;
		}
	}
	if (execute) {
		toggle();
	} else {
		$('video,audio').each(function() {
			$(this).get(0).pause();
		});
		setTimeout(toggle, 10000);
	}
});
