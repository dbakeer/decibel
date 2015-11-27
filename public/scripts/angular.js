// defining AngularJS logic

var app = angular.module('friendApp', []);

app.controller('profileCtrl', ['$scope', 'filterFilter', '$http', '$location', function($scope, filterFilter, $http, $location){


  // // managing the friend types
  // $scope.friend_types = [
  //   { desc: 'New Friends', selected: false },
  //   { desc: 'Best Friend', selected: false },
  //   { desc: 'Drinking Buddy', selected: false },
  //   { desc: 'Gaming Buddy', selected: false },
  //   { desc: 'Party Friend', selected: false },
  //   { desc: 'Friend with Benefits', selected: false },
  //   { desc: 'New Locals', selected: false }
  // ];
  //
  // $scope.selection = [];
  //
  // $scope.selectedFriendTypes = function selectedFriendTypes(){
  //   return filterFilter($scope.friend_types, { selected: true });
  // };
  //
  // $scope.$watch('friend_types|filter:{selected:true}', function (nv){
  //   $scope.selection = nv.map(function(friend_type){
  //     return friend_type.desc;
  //   });
  // }, true);
  //
  // // getting the current user's data
  // $scope.getProfile = function(){
  //   $http.get('/users/:id').success(function(data){
  //     $scope.current_user = data;
  //     $scope.current_user_profile = data.profiles;
  //     console.log(data);
  //     console.log(data.profiles);
  //   });
  // };
  //
  // $scope.getProfile();
  //
  // $scope.createProfile = function(){
  //   console.log($scope.current_user_profile);
  //
  //   var profileData = {
  //     age: $scope.age,
  //     location: $scope.location,
  //     gender: $scope.gender,
  //     interests: $scope.interests,
  //     friend_types: $scope.friend_types,
  //     about: $scope.bio
  //   };
  //
  //   $http.post('/users/' + $scope.current_user._id, profileData).success(function(data){
  //     $scope.current_user_profile.push(profileData);
  //     console.log($scope.current_user_profile);
  //     console.log(data);
  //   });
  // };
}]);
