'use strict';

require('./_profile-top.scss');

module.exports = {
  template: require('./profile-top.html'),
  controller: ['$log', ProfileTopController],
  controllerAs: 'profileTopCtrl',
  bindings: {
    profile: '<',
  },
};

function ProfileTopController($log) {
  $log.debug('Initializing ProfileTopController');

  this.profilePic = null;

  if (!this.profile.picID) {
    this.profilePic = 'https://s3-us-west-2.amazonaws.com/heretogether-assets/heretogether-mobile-logo';
  } else {
    this.profilePic = this.profile.picID.picURI;
  }

}
