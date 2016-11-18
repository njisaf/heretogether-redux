'use strict';

require('./show-profile.html');

module.exports = ['$log', '$q', '$location', 'profileService', 'statusService', ShowProfileController];

function ShowProfileController($log, $q, $location, profileService, statusService) {
  $log.debug('Initializing ShowProfileController');

  this.profile = {};
  this.userProfiles = [];
  let userID = null;
  this.editButtonText = 'Edit Profile';
  this.editToggle = false;

  let profileString = $location.url();
  let query = profileString.split('=')[1].toString();

  this.getProfileAndStatuses = function(query) {
    $log.debug('Getting user profile', query);

    profileService.getOneProfileWithID(query)
    .then(res => {
      $log.debug('Got a user profile', res);
      this.profile = res;
      userID = this.profile.userID.toString();
      this.fetchUserStatuses(userID);
      return this.profile;
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };


  this.fetchUserStatuses = function(userID) {
    $log.debug(`Fetching statuses for user ${userID}`);

    statusService.fetchUserStatuses(userID)
    .then(res => {
      $log.debug('Got statuses!', res);
      this.userProfiles = res;
      return this.userProfiles;
    })
    .catch(err => {
      $log.error(err.message);
    });
  };

  this.editToggler = function() {

    if (this.editToggle === false) {
      this.editToggle = true;
      this.editButtonText = 'Done Editing';
    } else {
      this.editToggle = false;
      this.editButtonText = 'Edit Profile';
    }
  };

  this.getProfileAndStatuses(query);
}
