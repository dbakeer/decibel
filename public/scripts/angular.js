var app = angular.module('friendApp', ['ngRoute']);

// defining some posts
app.factory('posts', [function(){
  var list = {
    posts: []
  };
  return list;
}]);




app.controller('MainCtrl', ['$scope', 'posts', function($scope, posts){

  $scope.posts = posts.posts;

  $scope.addPost = function(){
    if(!$scope.artist || $scope.artist === ''){ return; }

    $scope.posts.push({
      artist: $scope.artist,
      location: $scope.location,
      show_date: $scope.show_date,
      body: $scope.body,
      attendance: 0,
      comments: [
        {author: 'eh', body: 'eh'},
        {author: '1', body: '1'}
      ]
    });
    $scope.artist = '';
    $scope.location = '';
    $scope.show_date = '';
    $scope.body = '';
  };

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




app.controller('PostsCtrl', ['$scope', '$routeParams', 'posts', function($scope, $routeParams, posts){

  $scope.post = posts.posts[$routeParams.id];


}]);



app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
  $locationProvider.html5Mode({enabled:true});

  $routeProvider.
  when('/main', {
    templateUrl: '../views/main.ejs',
    controller: 'MainCtrl'
  }).when('/posts/{id}', {
    templateUrl: '../views/partials/posts.ejs',
    controller: 'PostsCtrl'
  }).otherwise({
    redirectTo: '../views/profile.ejs'
  });
}]);
