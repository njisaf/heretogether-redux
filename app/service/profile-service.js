'use strict';

module.exports = ['$q', '$log', '$http', 'authService', 'hospitalService', profileService];

function profileService($q, $log, $http, authService, hospitalService) {
  $log.debug('Initializing profileService');

  let service = {};

  service.profiles = [];

  service.createProfile = function(profile) {
    $log.debug('Hit profileService.createProfile()');

    if (!profile.hospitalID) profile.hospitalID = hospitalService.hospitalID;

    $log.debug('PROFILE', profile);
    return authService.getToken()
    .then(token => {
      let url = `${__API_URL__}/api/hospital/${hospitalService.hospitalID}/profile`;
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      return $http.post(url, profile, config);
    })
    .then(res => {
      $log.log('Profile created');
      let profile = res.data;
      return profile;
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.getProfile = function() {
    $log.debug('Hit profileService.getProfile');

    return authService.getToken()
    .then(token => {
      let url = `${__API_URL__}/api/hospital/${hospitalService.hospitalID}/profile`;
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      return $http.get(url, config);
    })
    .then(res => {
      $log.log('Got a profile');
      let profile = res.data;
      return profile;
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  profileService.fetchProfiles = function() {
    $log.debug('Hit profileService.fetchProfiles. Fetching ALL profiles');

    return authService.getToken()
    
  }

  return service;

}
