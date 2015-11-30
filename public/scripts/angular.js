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

  list.attendance = function(post){
    return $http.put('/posts/' + post._id + '/attendance').success(function(data){
      post.attendees += 1;
    });
  };

  list.get = function(post){
    return $http.get('/posts/' + post._id).then(function(data){
      return res.data;
    });
  };

  list.addComment = function(post, comment){
    return $http.post('/posts/' + post._id + '/comments', comment).success(function(data){
      list.posts.push(data);
    }).success(console.log('Success'));
  };

  list.getComments = function(comment){
    return $http.get('/comments/' + comment._id).then(function(data){
      return res.data;
    });
  };

    return list;
}]);




app.controller('MainCtrl', ['$scope', '$http', 'posts', function($scope, $http, posts){

  $scope.posts = posts.posts;

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
    posts.attendance(post);
  };

  $scope.addComment = function(){
    if($scope.body === ''){return;}
    console.log($scope.post);

    posts.addComment($scope.post, {
      body: $scope.body,
    }).success(function(comment){
      $scope.post.comments.push(comment);
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
