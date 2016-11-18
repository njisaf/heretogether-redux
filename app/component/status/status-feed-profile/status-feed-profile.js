'use strict';

require('./_status-feed-profile.scss');

module.exports = {
  template: require('./status-feed-profile.html'),
  controller: ['$log', StatusFeedProfileController],
  controllerAs: 'statusFeedProfileCtrl',
  bindings: {
    profile: '<',
  },
};

function StatusFeedProfileController($log){
  $log.debug('init StatusFeedProfileController()', this.profile);

  if (!this.profile.picID) {
    this.profilePic = require('../../../assets/imgs/heretogether-mobile-logo.png');
  } else {
    this.profilePic = this.profile.picID.picURI;
  }
}
