// Brought in from special_websites.json
data = {
	"allowed": ["bing.com",
	"yahoo.com",
	"hulu.com",
	"vimeo.com",
	"alibaba.com",
	"myspace.com",
	"tidal.com",
	"microsoft.com",
	"christianmingle.com"],

	"blocked": [{ "name": ["mail.google.com"], "alternateurl": "mail.yahoo.com", "alternatename": "Yahoo! Mail" },
	{ "name": ["pandora.com", "spotify.com", "music.google.com", "music.amazon.com"], "alternateurl": "tidal.com", "alternatename": "Tidal" },
	{ "name": ["google.com"],	"alternateurl": "bing.com", "alternatename": "Bing" },
	{ "name": ["netflix.com"], "alternateurl": "hulu.com", "alternatename": "Hulu" },
	{ "name": ["youtube.com"], "alternateurl": "vimeo.com", "alternatename": "Vimeo" },
	{ "name": ["amazon.com", "ebay.com"], "alternateurl": "alibaba.com", "alternatename": "Alibaba" },
	{ "name": ["facebook.com", "twitter.com", "reddit.com", "tumblr.com"], "alternateurl": "myspace.com", "alternatename": "Myspace" },
	{ "name": ["apple.com"], "alternateurl": "microsoft.com", "alternatename": "Microsoft" },
	{ "name": ["pornhub.com", "youporn.com", "xvideos.com", "redtube.com", "tube8.com", "brazzers.com", "pornmd.com", "thumbzilla.com", "realitykings.com", "mydirtyhobby.com", "seancody.com", "men.com", "digitalplayground.com", "mofos.com", "babes.com", "gaytube.com", "twistys.com", "peeperz.com", "sextube.com", "porniq.com", "webcams.com"], "alternateurl": "christianmingle.com", "alternatename": "Christian Mingle"}]
}

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
