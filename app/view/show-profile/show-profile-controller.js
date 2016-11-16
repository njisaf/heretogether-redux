'use strict';

require('./show-profile.html');

module.exports = ['$log', '$location', 'profileService', ShowProfileController];

function ShowProfileController($log, $location, profileService) {
  $log.debug('Initializing ShowProfileController');

  this.profile = {};

  let profileString = $location.url();
  let query = profileString.split('=')[1];

  console.log('sdsdgsdfsdfsdfsdfsdfsdfsdfsdfsdf', query);

}
