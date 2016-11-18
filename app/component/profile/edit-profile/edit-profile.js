'use strict';

require('./_edit-profile.scss');

module.exports = {
  template: require('./edit-profile.html'),
  controller: ['$log', 'profileService', 'picService', EditProfileController],
  controllerAs: 'editProfileCtrl',
  bindings: {
    profile: '=',
  },
};

function EditProfileController($log, profileService, picService) {
  $log.debug('Initializing EditProfileController', this.profile);

  this.profilePic = null;

  if (!this.profile.picID) {
    this.profilePic = require('../../../assets/imgs/heretogether-mobile-logo.png');
  } else {
    this.profilePic = this.profile.picID.picURI;
  }


  this.updateProfile = function() {
    $log.debug('EditProfileController.updateProfile; updating profile', this.profile);

    profileService.updateProfile(this.profile)
    .then(newProfile => {
      $log.debug('Profile updated', newProfile);
      this.profile = newProfile;
      return this.profile;
    })
    .catch(err => {
      $log.error(err.message);
    });
  };

  this.uploadPic = function() {
    $log.debug('EditProfileController.uploadPic');
    console.log('this.profile._id', this.profile._id);
    console.log('this.pic', this.pic);

    picService.uploadProfilePic(this.profile._id, this.pic)
    .then(res => {
      $log.debug('Pic uploaded', res);
      this.profile.picID = res;
      this.profilePic = res.imageURI;
      this.pic = {};
    });


  };

}
