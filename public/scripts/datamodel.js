// Angular data model
var app = angular.module("FriendApp", []);

myApp.controller("facebookCtrl", function($scope) {

  // Status of Facebook communications
	$scope.fbStatus = "";

	// Name of the connected person
	$scope.userName = "";

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
