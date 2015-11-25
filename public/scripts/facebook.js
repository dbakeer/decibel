function checkLoginState() {
	FB.getLoginStatus(function(response) {
		statusChangeCallback(response);
	});
}

function statusChangeCallback(response) {

	if (response.status === 'connected') {
		loggedOn();
	} else if (response.status === 'not_authorized') {
		setFacebookStatus("Please authorize this application");
	} else {
		setFacebookStatus("Please log into Facebook");
	}
}

window.fbAsyncInit = function() {
	FB.init({
		appId      : '276646189021728',
		cookie     : true,  // enable cookies to allow the server to access
							// the session
		xfbml      : true,  // parse social plugins on this page
		version    : 'v2.2' // use version 2.2
	});

	checkLoginState();
};


(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];

	if (d.getElementById(id)) return;

	js = d.createElement(s); js.id = id;

	js.src = "//connect.facebook.net/en_US/sdk.js";

	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

var loggedOn = function() {
	setFacebookStatus("You're in");
  FB.api('/me', function(response) {
	setScopeVar("userName", response.name);
});
};
