'use strict';

require('./_profile-status-feed.scss');

module.exports = {
  template: require('./profile-status-feed.html'),
  controller: ['$log', ProfileStatusFeedController],
  controllerAs: 'profileStatusFeedCtrl',
  bindings: {
    status: '<',
  },
};

function ProfileStatusFeedController($log) {
  $log.debug('Initializing ProfileStatusFeedController');

  this.showEditStatus = false;




  //editStatus needed
}
