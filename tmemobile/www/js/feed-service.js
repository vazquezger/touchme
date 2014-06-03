angular.module('starter.feed-service', [])

/**
 * A simple example service that returns some data.
 */
.service('Feed', ['$http', function($http) {
	
   	this.getFeed = function(location, userId) {
   	    var latitude = location.latitude;
   	    var longitude = location.longitude;
   	    var locationParam = latitude + "," + longitude;
        return $http.get("http://localhost:8008/api/v0/feed/"+ locationParam + "/users/" + userId);
    	};
    	
    this.postLike = function(location, userId, targetUserId) {
        return $http.post("http://localhost:8008/api/v0/users/" + userId + "/like/" + targetUserId);
    	};
    	    
  }]
);

