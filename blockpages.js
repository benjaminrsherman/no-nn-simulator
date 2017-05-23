$(document).ready(function() {
	var url = window.location.href;
	for (URL in data["allowed"]) {
		if (url.indexOf(URL) !== -1) {
			return;
		}
	}

	for (b in data["blocked"]) {
		var replace = false;
		var block = data["blocked"][b];
		for (u in block["name"]) {
			var URL = block["name"][u];
			if (url.indexOf(URL) !== -1) {
				replace = true;
				break;
			}
		}

		if (replace) {
			$(document.body).append("<div class='nnn-overlay'><h1>This website does not function fully on your ISP's service, please go to <a href='https://www." + block["alternateurl"] + "'>" + block["alternatename"] + "</a> instead.</br>If you wish to continue using this website, please contact your ISP to determine how it will affect your monthly bill.</h1></br><p>(This message will disappear in 10 seconds)</p></div>");

			$(".nnn-header").hide();
				setTimeout(function() {
				$('.nnn-overlay').remove();
				$(".nnn-header").show();
			}, 10000);
		}
	}
});

// Brought in from special_websites.json
data = {
		"allowed": ["bing.com",
					"yahoo.com",
					"hulu.com",
					"vimeo.com",
					"alibaba.com",
					"myspace.com",
					"tidal.com",
					"microsoft.com"],

		"blocked": [{ "name": ["mail.google.com"], "alternateurl": "mail.yahoo.com", "alternatename": "Yahoo! Mail" },
					{ "name": ["pandora.com", "spotify.com", "music.google.com", "music.amazon.com"], "alternateurl": "tidal.com", "alternatename": "Tidal" },
					{ "name": ["google.com"],	"alternateurl": "bing.com", "alternatename": "Bing" },
					{ "name": ["netflix.com"], "alternateurl": "hulu.com", "alternatename": "Hulu" },
					{ "name": ["youtube.com"], "alternateurl": "vimeo.com", "alternatename": "Vimeo" },
					{ "name": ["amazon.com", "ebay.com"], "alternateurl": "alibaba.com", "alternatename": "Alibaba" },
					{ "name": ["facebook.com", "twitter.com", "reddit.com", "tumblr.com"], "alternateurl": "myspace.com", "alternatename": "Myspace" },
					{ "name": ["apple.com"], "alternateurl": "microsoft.com", "alternatename": "Microsoft" }]
		}
