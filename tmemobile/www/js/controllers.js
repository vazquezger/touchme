angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
	
})

.controller('FeedCtrl', function($scope, $timeout, Session, Feed, Location) {

  // call regularly to refresh data
  $timeout(function() { $scope.getFeed(); }, 1000);  
  $scope.currentUserId = Session.getCurrentUserId();
  
  // the function
  $scope.getFeed = function() {
    var userId = $scope.currentUserId;
    var location = Location.getCurrentLocation();
    Session.updateFeed(null); 
    $scope.error = true;  
    console.log('userId: ' + userId + ' - location:' + location);
    if (location == null || userId == null) {            
      return;
    }
    Feed.getFeed(location, userId)
      .success(function(data, status) {				
				Session.updateFeed(data.feed); 
				$scope.feed = data.feed;
				$scope.error = false;
			})
			.error(function(current, status, headers, config) {
      });                
    };
   
  // call for first time
  $scope.getFeed();
})

.controller('FeedDetailCtrl', function($scope, $stateParams, Feed, Session, Location) {
  $scope.target = Session.getUserFromFeed($stateParams.userId);

  $scope.like = function(targetId) {
    var userId = Session.getCurrentUserId();
    var location = Location.getCurrentLocation();
    console.log('like userId: ' + userId + ' - targetId:' + targetId);
    Feed.postLike(location, userId, targetId);
  }
})

.controller('AccountCtrl', function($scope) {
	
});
