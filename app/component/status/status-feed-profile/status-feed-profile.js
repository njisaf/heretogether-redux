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

  this.profilePic = require('../../../assets/imgs/heretogether-mobile-logo.png');

  if (this.profile.picID) this.profilePic = this.profile.picID.imageURI;

}
