var attachedTabs = {};
var version = "1.0";
var allowedURLs = [];

$(document).ready(function() {
	allowedURLs = data["allowed"];
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	var debuggeeId = {tabId:tabId};
	if (changeInfo.url.charAt(0) === 'c') {
		return;
	}

	var url = changeInfo.url;
	var throttled = true;
	for (testURL in allowedURLs) {
		if (url.indexOf(allowedURLs[testURL]) !== -1) {
			throttled = false;
		}
	}
	if (throttled && !attachedTabs[tabId])
		chrome.debugger.attach(debuggeeId, version, onAttach.bind(null, debuggeeId));
	else if (!throttled && attachedTabs[tabId])
		chrome.debugger.sendCommand(debuggeeId, "Network.disable");
		chrome.debugger.detach(debuggeeId, version, onDetach.bind(null, debuggeeId));
});

function onAttach(debuggeeId) {
	var tabId = debuggeeId.tabId;
	attachedTabs[tabId] = true;
	chrome.debugger.sendCommand(debuggeeId, "Network.enable", null, function() {
		chrome.debugger.sendCommand(debuggeeId, "Network.emulateNetworkConditions", {"offline": false, "latency": 350, "downloadThroughput": 250, "uploadThroughput": 75});
	});
}

function onDetach(debuggeeId) {
	var tabId = debuggeeId.tabId;
	attachedTabs[tabId] = false;
}

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
