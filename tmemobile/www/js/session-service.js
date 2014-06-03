angular.module('starter.session-service', [])

/**
 *
 */
.factory('Session', function() {

  var _currentUserId = 5;
  var _feed = null;

  return {

    getCurrentUserId: function() {
      return _currentUserId; 
    },
        
    updateFeed: function(feed) {
      _feed = feed;
      return feed; 
    },
    
    getUserFromFeed: function(userId) {
      if (_feed == null) { 
        return null;
      }
      console.log(_feed);
      // Simple index lookup      
      for (var i = 0; i < _feed.length; i++) { 
        item =_feed[i];
        if (item.id == userId) {
          return item;
        }
      }
      return null;
    }
  }
})
;
