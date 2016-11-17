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

  this.profilePic = 'https://s3-us-west-2.amazonaws.com/heretogether-assets/heretogether-mobile-logo';

  // this.profilePic = this.profile.picID.picURI || 'https://s3-us-west-2.amazonaws.com/heretogether-assets/heretogether-mobile-logo';

  this.showProfile = function() {
    $log.debug('Navigating to profile...');

    $location.path(`/profile/id=${this.profile._id}`);
  };

}
