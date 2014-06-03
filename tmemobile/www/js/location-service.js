angular.module('starter.location-service', [])

/**
 * http://forum.ionicframework.com/t/geolocation-with-angular-google-maps/827/5
 */
.service('Location', ['$timeout', function($timeout) {
  
  var location = {
    center: {
      latitude: null, 
		  longitude: null
    }
  };
    
  var onSuccess = function(position) {
    location.center = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
    };
    console.log('lat: ' + location.center.latitude + ' , lon: ' + location.center.longitude);
  }
  function onError(error) {
     console.log('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
     location.center = null;
  }

  // first time
  navigator.geolocation.getCurrentPosition(onSuccess, onError);  
  // interval every 60 secs
  $timeout(function() { 
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, 
  2000);
  
  // returns current location
  this.getCurrentLocation = function() {
      return location;
    }
  
}])
;
