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

  this.profilePic = require('../../../assets/imgs/heretogether-mobile-logo.png');

  if (this.profile.picID) this.profilePic = this.profile.picID.imageURI;

}
