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

  service.getProfile = function(profileID){
    $log.debug('Initializing service.getProfile()');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/hospital/${hospitalService.hospitalID}/profile/${profileID}`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      return $http.get(url, config);
    })
    .then(res => {
      $log.log('getProfile res', res);
      let profile = res.data;
      return profile;
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });


  };
  return service;

}
