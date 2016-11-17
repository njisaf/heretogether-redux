'use strict';

require('./profile.html');

module.exports = ['$log', '$q', '$rootScope', '$location', 'profileService', ProfileController];

function ProfileController($log, $q, $rootScope, $location, profileService) {
  $log.debug('Initializing ProfileController');

  this.profiles = [];
  this.currentProfile = null;

  this.fetchProfiles = function() {
    return profileService.fetchProfiles()
    .then(profiles => {
      this.profiles = profiles;
      return profiles;
    });
  };

  // this.enterProfile = function() {
  //   $location.path(`/profile/${this.profile._id}`);
  // };

  this.fetchProfiles();

  $rootScope.$on('$locationChangeSuccess', () => {
    this.fetchProfiles();
  });

}
