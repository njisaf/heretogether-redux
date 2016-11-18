'use strict';

module.exports = ['$q', '$log', 'Upload', '$http', '$window', 'authService', 'hospitalService', statusService];

function statusService($q, $log, Upload, $http, $window, authService, hospitalService) {
  $log.debug('Initializing statusService');

  let service = {};

  service.statuses = [];
  // service.fileURI = null;

  //creating status with an attached file
  service.createFileStatus = function(status){

    if(!status.hospitalID) status.hospitalID = hospitalService.hospitalID;

    $log.debug('statusService.createFileStatus hit');

    return authService.getToken()
    .then((token) => {
      let url = `${__API_URL__}/api/hospital/${hospitalService.hospitalID}/statusfile`;
      let headers = {
        Authorization: `Bearer ${token}`,
      };

      return Upload.upload({
        url,
        method: 'POST',
        data: {
          text: status.text,
          file: status.file,
        },
        headers,
      });
    })
    .then((res) => {
      service.statuses.unshift(res.data);
      return res.data;
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.createStatus = function(status) {
    $log.debug('statusService.createStatus()', status);


    // let fileData = null;
    //
    if(!status.hospitalID) status.hospitalID = hospitalService.hospitalID;
    //
    // if(status.file) {
    //   fileData = status.file;
    // }

    // console.log('FILEDATA:', fileData);

    return authService.getToken()
    .then(token => {
      let url = `${__API_URL__}/api/hospital/${hospitalService.hospitalID}/status`;
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
      $log.debug('Status successfully instantiated');
      let status = res.data;
      service.statuses.unshift(status);
      $log.debug('HERES OUR STATUSES', service.statuses);
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
      let url = `${__API_URL__}/api/hospital/${hospitalService.hospitalID}/status/${statusID}`;
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

  service.updateStatus = function(statusID, status) {
    $log.debug('statusService.updateStatus()');

    return authService.getToken()
    .then(token => {
      let url = `${__API_URL__}/api/hospital/${hospitalService.hospitalID}/status/${statusID}`;
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

  service.fetchUserStatuses = function(userID) {
    $log.debug('Fetching all statuses for one user');

    return authService.getToken()
    .then(token => {
      console.log('did we get token?');
      let url = `${__API_URL__}/api/hospital/${hospitalService.hospitalID}/all/status/${userID}`;
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
      $log.log('User statuses fetched', res.data);
      service.statuses = res.data;
      return service.statuses.sort((a, b) => {
        return (new Date(b.created)) - (new Date(a.created));
      });
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
      // if(!hospitalService.hopsitalID){
      //   hospitalService.hospitalID = $window.localStorage.getItem('hospitalID');
      // }
      console.log('did we get token?');
      let url = `${__API_URL__}/api/hospital/${hospitalService.hospitalID}/all/status/`;
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
      $log.log('Statuses fetched', res.data);
      service.statuses = res.data;
      return service.statuses.sort((a, b) => {
        return (new Date(b.created)) - (new Date(a.created));
      });
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  return service;

}
