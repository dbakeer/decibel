// defining AngularJS logic

var app = angular.module('friendApp', []);

/////////////////////////////////
///// INFORMATION CONTROLLER ////
/////////////////////////////////

// this controller takes care of observing the matches you prefer
app.controller('infoCtrl', ['$scope', 'filterFilter', '$http', function($scope, filterFilter, $http){

  $scope.gender = [
    'Male',
    'Female',
    'Other',
    'Prefer Not to Say'
  ];

  $scope.interests = [];

  $scope.about = '';

  $scope.friend_types = [
    { desc: 'New Friends', selected: false },
    { desc: 'Best Friend', selected: false },
    { desc: 'Drinking Buddy', selected: false },
    { desc: 'Gaming Buddy', selected: false },
    { desc: 'Party Friend', selected: false },
    { desc: 'Friend with Benefits', selected: false },
    { desc: 'New Locals', selected: false }
  ];

  $scope.selection = [];

  $scope.selectedFriendTypes = function selectedFriendTypes(){
    return filterFilter($scope.friend_types, { selected: true });
  };

  $scope.$watch('friend_types|filter:{selected:true}', function (nv){
    $scope.selection = nv.map(function(friend_type){
      return friend_type.desc;
    });
  }, true);

  $scope.getInfo = function(){
    $http.get('/user').success(function(data){
      $scope.current_user_info = data;
      console.log(data);
      console.log(data.user);
    });
  };

  $scope.getInfo();

  $scope.addInfo = function(infoData){

    console.log(infoData);
    $scope.current_user_info.push({
      info: {age: $scope.age,
      location: $scope.location,
      gender: $scope.gender,
      interests: $scope.interests,
      friend_types: $scope.friend_types,
      about: $scope.bio
    }
    });

    $http.post('/user', {
      info: {
        age: $scope.age,
        location: $scope.location,
        gender: $scope.gender,
        interests: $scope.interests,
        friend_types: $scope.friend_types,
        about: $scope.bio
      }
    }).success(function(data){
      console.log(data);
      $scope.getInfo();
    });

    // $scope.deleteInfo = function(){
    //   $http.delete('/info', + id).success(function(data){
    //     $scope.info = data;
    //     console.log(data);
    //   }).error(function(data){
    //     console.log('Error: ', + data);
    //   });
    // };
  };
}]);
