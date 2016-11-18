'use strict';

require('./_status-feed-profile.scss');

module.exports = {
  template: require('./status-feed-profile.html'),
  controller: ['$log', '$location', StatusFeedProfileController],
  controllerAs: 'statusFeedProfileCtrl',
  bindings: {
    profile: '<',
  },
};

function StatusFeedProfileController($log, $location){
  $log.debug('init StatusFeedProfileController()', this.profile);

  if (!this.profile.picID) {
    this.profilePic = require('../../../assets/imgs/heretogether-mobile-logo.png');
  } else {
    this.profilePic = this.profile.picID.picURI;
  }

  this.navigateToProfile = function() {
    $location.url(`/profile/id=${this.profile._id}`);
  };
}
