/////////////////////////////////
/////// FACEBOOK API SETUP //////
/////////////////////////////////
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
		appId      : '1806386009588489',
		cookie     : true,
		xfbml      : true,
		version    : 'v2.2'
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
  FB.api('/me', function(res) {
	setScopeVar("username", res.name);
});
};
