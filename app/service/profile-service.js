'use strict';

module.exports = ['$q', '$log', '$http', '$window', 'authService', 'hospitalService', profileService];

function profileService($q, $log, $http, $window, authService, hospitalService) {
  $log.debug('Initializing profileService');

  let service = {};

  service.profiles = [];

  if(!hospitalService.hospitalID) hospitalService.hospitalID = $window.localStorage.getItem('hospitalID');

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

  service.getOneProfileNoID = function() {
    $log.debug('Hit profileService.getOneProfileNoID; profile will be fetched using bearerAuth alone');

    return authService.getToken()
    .then(token => {
      let url = `${__API_URL__}/api/hospital/${hospitalService.hospitalID}/profile/`;
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
      $log.log('Got a profile', res.data);
      let profile = res.data;
      return profile;
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.getOneProfileWithID = function(profileID) {
    $log.debug('Hit profileService.getOneProfileWithID; will fetch profile directly');

    return authService.getToken()
    .then(token => {
      let url = `${__API_URL__}/api/hospital/${hospitalService.hospitalID}/profile/${profileID}`;
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
      $log.log('Got a profile', res.data);
      let profile = res.data;
      return profile;
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });

  };

  service.fetchProfiles = function() {
    $log.debug('Hit profileService.fetchProfiles. Fetching all profiles');

    return authService.getToken()
    .then(token => {
      let url = `${__API_URL__}/api/hospital/${hospitalService.hospitalID}/all/profile/`;
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
      $log.log('Profiles fetched');
      service.profiles = res.data;
      return service.profiles;
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.deleteProfile = function(profileID) {
    $log.debug('Hit profileService.deleteProfile');

    return authService.getToken()
    .then(token => {
      let url = `${__API_URL__}/api/hospital/${hospitalService.hospitalID}/status/${profileID}`;
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      return $http.delete(url, config);
    })
    .then(() => {
      $log.log('profile deleted');
      for (var i = 0; i < service.profiles.length; ++i) {
        if (profileID === service.profiles[i]._id) service.profiles.splice(i, 1);
      }
      return service.profiles;
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.updateProfile = function(profile) {
    $log.debug('Hit profileService.updateProfile');

    return authService.getToken()
    .then(token => {
      let url = `${__API_URL__}/api/hospital/${hospitalService.hospitalID}/profile/${profile._id}`;
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      return $http.put(url, profile, config);
    })
    .then(res => {
      $log.debug('Profile updated');
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
