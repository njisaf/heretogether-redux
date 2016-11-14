'use strict';

module.export = ['$q', '$log', '$http', 'authService', profileService];

function profileService($q, $log, $http, authService) {
  $log.debug('Initializing profileService');

  let service = {};

  service.profiles = [];

  service.createProfile = function(profile) {
    $log.debug('Hit profileService.createProfile()');

    return authService.getToken()
    .then(token => {
      let url = `${__API_URL__}/api/profile`
    })

  }

}
