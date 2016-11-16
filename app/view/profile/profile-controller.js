'use strict';

require('./profile.html');

module.exports = ['$log', '$q', '$rootScope', 'profileService', ProfileController];

function ProfileController($log, $q, $rootScope, profileService) {
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

  this.fetchProfiles();

  $rootScope.$on('$locationChangeSuccess', () => {
    this.fetchProfiles();
  });

}
