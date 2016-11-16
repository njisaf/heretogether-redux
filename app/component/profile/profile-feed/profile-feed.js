'use strict';

require('./_profile-feed.scss');

module.exports = {
  template: require('./profile-feed.html'),
  controller: ['$log', 'profileService','fileService', ProfileFeedController],
  controllerAs: 'profileFeedCtrl',
  bindings: {
    profile: '<',
  },
};

function ProfileFeedController($log) {
  $log.debug('Initializing ProfileFeedController');
}
