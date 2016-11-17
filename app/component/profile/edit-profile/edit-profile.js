'use strict';

require('./_edit-profile.scss');

module.exports = {
  template: require('./edit-profile.html'),
  controller: ['$log', EditProfileController],
  controllerAs: 'editProfileCtrl',
  bindings: {
    profile: '<',
  },
};

function EditProfileController($log) {
  $log.debug('Initializing EditProfileController', this.profile);

  this.profilePic = null;

  if (!this.profile.picID) {
    this.profilePic = require('../../../assets/imgs/heretogether-mobile-logo.png');
  } else {
    this.profilePic = this.profile.picID.picURI;
  }




}
