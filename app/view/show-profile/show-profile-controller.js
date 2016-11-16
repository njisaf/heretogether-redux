'use strict';

require('./show-profile.html');

module.exports = ['$log', '$location', ShowProfileController];

function ShowProfileController($log, $location) {
  $log.debug('Initializing ShowProfileController');

  this.profile = {};

  let profileString = $location.url();
  let query = profileString.split('=')[1];

  console.log('sdsdgsdfsdfsdfsdfsdfsdfsdfsdfsdf', query);

}
