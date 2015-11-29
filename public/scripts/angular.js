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
    });
  };

  return list;
}]);




app.controller('MainCtrl', ['$scope', '$http', 'posts', function($scope, $http, posts){

  $scope.posts = posts.posts;

  $scope.getPosts = function(){
    $http.get('/posts').success(function(data){
      console.log(data);
    });
  };

  $scope.getPosts();

  $scope.addPost = function(){
    if(!$scope.artist || $scope.artist === ''){ return; }

    posts.create({
      artist: $scope.artist,
      location: $scope.location,
      show_date: $scope.show_date,
      body: $scope.body,
      attendance: $scope.attendance,
      comments: []
    });

    // $http.post('/posts', {
    //   post: {
    //     artist: $scope.artist,
    //     location: $scope.location,
    //     show_date: $scope.show_date,
    //     body: $scope.body,
    //     attendance: 0,
    //     comments: []
    //   }
    // }).success(function(data){
    //   console.log(data);
    //   $scope.posts.push(data);
    // });
    $scope.artist = '';
    $scope.location = '';
    $scope.show_date = '';
    $scope.body = '';
  };

  $scope.getPosts();

  $scope.incrementAttendance = function(post){
    post.attendance += 1;
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
    templateUrl: '../views/main',
    controller: 'MainCtrl',
    resolve: {
      postPromise: ['posts', function(posts){
        return posts.getAll();
      }]
    }
  }).when('/posts', {
    templateUrl: '../views/partials/posts',
    controller: 'MainCtrl'
  }).otherwise({
    redirectTo: '../views/profile.ejs'
  });

  $locationProvider.html5Mode({enabled:true});
}]);
