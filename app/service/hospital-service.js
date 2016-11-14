'use strict';

module.export = ['$q', '$log', '$http', 'authService', hospitalService];

function hospitalService($q, $log, $http, authService) {
  $log.debug('Initializing hospitalService');

  let service = {};

  let exampleHospital = {
    name: 'Seattle Children\'s Hospital',
  };

  service.createHospital(exampleHospital);

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
      return hospital;
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });

  };

}
