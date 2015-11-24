// Angular data model

// Create a new Angular application
var myApp = angular.module("myApp", []);


// Define the controller for Facebook interaction. The
// controller also contains scope, which includes the
// data model.
myApp.controller("facebookCtrl", function($scope) {

  // Status of Facebook communications
	$scope.fbStatus = "";

	// Name of the connected person
	$scope.userName = "";

});


// This function sets the fbStatus variable to the parameter.
// It is useful to have this function so that the rest of
// the JavaScript code would be able to set the value of
// $scope.fbStatus without having to know anything about
// Angular.
// This function sets the a scope variable to a value.
// It is useful to have this function so that the rest of
// the JavaScript code would be able do this without relying
// on Angular
var setScopeVar = function(variable, value) {
	var scope = angular.element($("#facebookCtrl")).scope();

	// scope.$apply takes a function because of re-entrancy.
	// The browser may not be able to handle changes in the
	// scope variable immediately, in which case the function
	// will be executed later.
	scope.$apply(function() {
		scope[variable] = value;
	});
};


var setFacebookStatus = function(status) {
	setScopeVar("fbStatus", status);
};
