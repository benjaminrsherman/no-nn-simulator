$.getJSON("https://raw.githubusercontent.com/benjaminrsherman/no-nn-simulator/master/special_websites.json", function(data) {
	var url = window.location.href;

	loop:
		for (b in data["blocked"]) {
			var replace = false;
			var block = data["blocked"][b];
			for (u in block["name"]) {
				var URL = block["name"][u];
				if (url.indexOf(URL) !== -1) {
					replace = true;
					window.alert("This website does not function correctly on your ISP's service, please use " + block["alternatename"] + " instead.");
					break loop;
				}
			}
		}

	$(document.body).append("<div class='nnn-header'><h2>Your internet is being throttled, courtesy of your ISP!</h2></div>");
});
