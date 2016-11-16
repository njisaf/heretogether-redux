'use strict';

module.exports = ['$q', '$log', '$http', '$window', 'authService', hospitalService];

function hospitalService($q, $log, $http, $window, authService) {
  $log.debug('Initializing hospitalService');

  let service = {};

  service.hospitalID = null;

  service.createHospital = function(hospital) {
    $log.debug('Hit hospitalService.createHospital()');

    return authService.getToken()
    .then(token => {
      let url = `${__API_URL__}/api/hospital`;
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      return $http.post(url, hospital, config);
    })
    .then(res => {
      $log.log('Hospital created');
      let hospital = res.data;
      service.hospitalID = res.data._id;
      //TODO: DONE Put hospital ID in local storage
      $window.localStorage.setItem('hospitalID', service.hospitalID);
      return hospital;
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });

  };
  return service;
}
