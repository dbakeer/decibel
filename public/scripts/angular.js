var app = angular.module('friendApp', ['ngRoute', 'ngResource']);

// defining some posts
app.factory('posts', ['$http', function($http){
  var list = {
    posts: []
  };


  list.getAll = function(){
    $http.get('/posts').success(function(data){
      angular.copy(data, list.posts);
    });
  };

  list.create = function(post){
    $http.post('/posts', post).success(function(data){
      list.posts.push(data);
    }).success(console.log('Success'));
  };

    return list;
}]);




app.controller('MainCtrl', ['$scope', '$http', 'posts', function($scope, $http, posts){

  $scope.posts = posts.posts;

  // $scope.getPosts = function(){
  //   $http.get('/posts').success(function(data){
  //     return data;
  //     console.log(data);
  //   });
  // };

  posts.getAll();

  $scope.addPost = function(){
    if(!$scope.artist || $scope.artist === ''){ return; }

    posts.create({
      artist: $scope.artist,
      location: $scope.location,
      show_date: $scope.show_date,
      body: $scope.body,
      attendees: $scope.attendees,
      comments: []
    });
    $scope.artist = '';
    $scope.location = '';
    $scope.show_date = '';
    $scope.body = '';
  };

  $scope.incrementAttendance = function(post){
    post.attendees += 1;
  };

  $scope.addComment = function(){
    console.log($scope);
    if($scope.body === ''){return;}
    $scope.post.comments.push({
      body: $scope.body,
      author: 'user'
    });
    $scope.body = '';
  };

}]);


app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){

  $routeProvider.
  when('/main', {
    template: '../views/main.ejs',
    controller: 'MainCtrl',
  }).otherwise({
    redirectTo: '../views/profile.ejs'
  });

  $locationProvider.html5Mode({enabled:true});
}]);
