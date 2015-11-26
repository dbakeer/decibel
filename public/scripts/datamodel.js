var app = angular.module("FriendApp", []);

app.controller("facebookCtrl", function($scope) {

	$scope.fbStatus = "";

	$scope.username = "";

});

var setScopeVar = function(variable, value) {
	var scope = angular.element($("#facebookCtrl")).scope();

	scope.$apply(function() {
		scope[variable] = value;
	});
};


var setFacebookStatus = function(status) {
	setScopeVar("fbStatus", status);
};
