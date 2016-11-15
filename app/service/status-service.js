'use strict';

module.exports = ['$q', '$log', '$http', 'authService', 'hospitalService', statusService];

function statusService($q, $log, $http, authService, hospitalService) {
  $log.debug('Initializing statusService');

  let service = {};

  service.statuses = [];

  service.createStatus = function(status) {
    $log.debug('statusService.createStatus()');

    return authService.getToken()
    .then(token => {
      let url = `${__API_URL__}/api/hospita/${hospitalService.hospitalID}/status`;
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      return $http.post(url, status, config);
    })
    .then(res => {
      $log.log('Status successfully instantiated');
      let status = res.data;
      service.statuses.unshift(status);
      return status;
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.deleteStatus = function(statusID) {
    $log.debug('statusService.deleteStatus()');

    return authService.getToken()
    .then(token => {
      let url = `${__API_URL__}/api/hospita/${hospitalService.hospitalID}/status/${statusID}`;
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      return $http.delete(url, config);
    })
    .then(() => {
      for (var i = 0; i < service.statuses.length; ++i) {
        if (statusID === service.statuses[i]._id) service.statuses.splice(i, 1);
      }
      return service.statuses;
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.updateService = function(statusID, status) {
    $log.debug('statusService.updateStatus()');

    return authService.getToken()
    .then(token => {
      let url = `${__API_URL__}/api/hospita/${hospitalService.hospitalID}/status/${statusID}`;
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      return $http.put(url, status, config);
    })
    .then(res => {
      $log.log('Status successfully updated');
      let status = res.data;
      for (var i = 0; i < service.statuses.length; ++i) {
        if (statusID === service.statuses[i]._id) service.statuses[i] = status;
      }
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.fetchStatuses = function() {
    $log.debug('Fetching all statuses');

    return authService.getToken()
    .then(token => {
      let url = `${__API_URL__}/api/hospita/${hospitalService.hospitalID}/status/?sort=dsc`;
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
      $log.log('Statuses fetched');
      service.statuses = res.data;
      return service.statuses;
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  return service;

}
