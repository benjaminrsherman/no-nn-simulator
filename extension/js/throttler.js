var attachedTabs = {};
var version = "1.0";
var allowedURLs = [];

var data;

$.getJSON("http://raw.githubusercontent.com/benjaminrsherman/no-nn-simulator/master/special_websites.json", function(ret) {
	data = ret;

	for (b in data["blocked"]) {
		var replace = false;
		var block = data["blocked"][b];
		for (u in block["name"]) {
			var URL = "*://www." + block["name"][u] + "/*";
			chrome.contentSettings.javascript.set(
				{
					primaryPattern: URL,
					setting: "block"
				}
			);
			chrome.contentSettings.plugins.set(
				{
					primaryPattern: URL,
					setting: "block"
				}
			);
			chrome.contentSettings.images.set(
				{
					primaryPattern: URL,
					secondaryPattern: "<all_urls>",
					setting: "block"
				}
			);
		}
	}

	$(document).ready(function() {
		allowedURLs = data["allowed"];
	});
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
	if (throttled) {
		chrome.tabs.executeScript(tabId, {
			file: "js/jquery.js",
			runAt: "document_start"
		});
		chrome.tabs.executeScript(tabId, {
			file: "js/blockpages.js",
			runAt: "document_start"
		});
		if (!attachedTabs[tabId]) {
			chrome.debugger.attach(debuggeeId, version, onAttach.bind(null, debuggeeId));
		}
	} else if (!throttled && attachedTabs[tabId]) {
		chrome.debugger.sendCommand(debuggeeId, "Network.disable");
		chrome.debugger.detach(debuggeeId, onDetach.bind(null, debuggeeId));
	}
});

function onAttach(debuggeeId) {
	data = $.getJSON("https://raw.githubusercontent.com/benjaminrsherman/no-nn-simulator/master/special_websites.json");
	var tabId = debuggeeId.tabId;
	attachedTabs[tabId] = true;
	chrome.debugger.sendCommand(debuggeeId, "Network.enable", null, function() {
		chrome.debugger.sendCommand(debuggeeId, "Network.emulateNetworkConditions", {"offline": false, "latency": 40, "downloadThroughput": 5000, "uploadThroughput": 750});
	});
}

function onDetach(debuggeeId) {
	var tabId = debuggeeId.tabId;
	attachedTabs[tabId] = false;
}
