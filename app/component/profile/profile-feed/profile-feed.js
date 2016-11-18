'use strict';

require('./_profile-feed.scss');

module.exports = {
  template: require('./profile-feed.html'),
  controller: ['$log', '$location', ProfileFeedController],
  controllerAs: 'profileFeedCtrl',
  bindings: {
    profile: '<',
  },
};

function ProfileFeedController($log, $location) {
  $log.debug('Initializing ProfileFeedController');

  if (!this.profile.picID) {
    this.profilePic = require('../../../assets/imgs/heretogether-mobile-logo.png');
  } else {
    this.profilePic = this.profile.picID.picURI;
  }
  
  this.showProfile = function() {
    $log.debug('Navigating to profile...');

    $location.path(`/profile/id=${this.profile._id}`);
  };

}
