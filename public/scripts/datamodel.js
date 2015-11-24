// Angular data model

// Create a new Angular application
var myApp = angular.module("myApp", []);


// Define the controller for Facebook interaction. The
// controller also contains scope, which includes the
// data model.
myApp.controller("facebookCtrl", function($scope) {

	// For now, have one string in the data model,
	// fbStatus. It will contain the status of the
	// Facebook communication
	$scope.fbStatus = "";
});


// This function sets the fbStatus variable to the parameter.
// It is useful to have this function so that the rest of
// the JavaScript code would be able to set the value of
// $scope.fbStatus without having to know anything about
// Angular.
var setFacebookStatus = function(status) {
	var scope = angular.element($("#facebookCtrl")).scope();

	// scope.$apply takes a function because of re-entrancy.
	// The browser may not be able to handle changes in the
	// scope variable immediately, in which case the function
	// will be executed later.
	scope.$apply(function() {
		scope.fbStatus = status;
	});
};
