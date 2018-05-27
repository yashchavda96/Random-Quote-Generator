function generateQuote() {
	$.ajax({
		type: "GET",
		url: "https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en",
		dataType: "jsonp",
		jsonp: "jsonp",
		jsonpCallback: "callback",
		crossDomain: true,
		success: function (data) {
			$("#quote-text").html('<span class="fa fa-quote-left"></span>&nbsp;&nbsp;' + data.quoteText);
			if(data.quoteAuthor !== "") {
				$("#quote-author").html("- " + data.quoteAuthor);
			} else {
				$("#quote-author").html("- Unknown");
			}
			changeBgColor();
		}
	});
	
}
function postTweet() {
	var author = $("#quote-author").html();
	var textToTweet = $("#quote-text").html().slice(50);
	textToTweet += " " + author;
 	window.open('https://twitter.com/intent/tweet?hashtags=quotes&text=' + encodeURIComponent(textToTweet),'_blank');
}
function changeBgColor() {
	var color = "";
	var r = Math.floor( Math.random() * 128);
	var g = Math.floor( Math.random() * 128);
	var b = Math.floor( Math.random() * 128);
	color = "rgb(" + r + ", " + g + ", " + b + ")";
	$("body").css("background-color", color);
	$(".card").css("color", color);
	$("button").css("background-color", color);
}

$(document).ready(function() {
	generateQuote();
	$("#tweet").on("click", postTweet);
	$("#new-quote").on("click", function() {
		$("#quote-text, #quote-author").fadeOut(200);
		setTimeout(function() {
    	$("#quote-text, #quote-author").fadeIn(200);
  	}, 800);
		generateQuote();
	});
});
