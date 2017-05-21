$(document).ready(function() {
	var url = window.location.href;
	var string;
	var newurl;
	if (url.indexOf("google") !== -1) {
		if (url.indexOf("mail") !== -1) {
			string = "Yahoo Mail";
			newurl = "mail.yahoo.com";
		} else {
			string = "Bing";
			newurl = "bing.com";
		}
	} else if (url.indexOf("netflix") !== -1) {
		string = "Hulu";
		newurl = "hulu.com";
	} else if (url.indexOf("youtube") !== -1) {
		string = "Vimeo";
		newurl = "vimeo.com";
	} else if (url.indexOf("amazon") !== -1) {
		string = "Alibaba";
		newurl = "alibaba.com";
	} else if (url.indexOf("facebook") !== -1 || url.indexOf("twitter") !== -1 || url.indexOf("reddit") !== -1 || url.indexOf("tumblr") !== -1) {
		string = "Myspace";
		newurl = "myspace.com";
	} else if (url.indexOf("pandora") !== -1 || url.indexOf("spotify")) {
		string = "TIDAL";
		newurl = "tidal.com";
	}

	$(document.body).append("<div class='nnn-overlay'><h1>This website does not function fully on your ISP's service, please go to <a href='https://www." + newurl + "'>" + string + "</a> instead.</br>If you wish to continue using this website, please contact your ISP to determine how it will affect your monthly bill.</h1></br><p>(This message will disappear in 10 seconds)</p></div>");
	$(".nnn-header").hide();

	setTimeout(function() {
		$('.nnn-overlay').remove();
		$(".nnn-header").show();
	}, 10000);
});
