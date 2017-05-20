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

$(document).ready(toggle);
