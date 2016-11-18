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
  $log.debug('Initializing ProfileTopController', this.profile);

  this.profilePic = null;

  if (!this.profile.picID.imageURI) {
    this.profilePic = require('../../../assets/imgs/heretogether-mobile-logo.png');
  } else {
    this.profilePic = this.profile.picID.imageURI;
  }




}
