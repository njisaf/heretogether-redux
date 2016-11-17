'use strict';

require('./show-profile.html');

module.exports = ['$log', '$q', '$location', 'profileService', ShowProfileController];

function ShowProfileController($log, $q, $location, profileService) {
  $log.debug('Initializing ShowProfileController');

  this.profile = {};

  let profileString = $location.url();
  let query = profileString.split('=')[1].toString();

  this.getOneProfile = function(query) {
    $log.debug('Getting user profile', query);

    profileService.getOneProfileWithID(query)
    .then(res => {
      $log.debug('Got a user profile', res);
      this.profile = res;
      return this.profile;
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  this.getOneProfile(query);
}
