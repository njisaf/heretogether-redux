'use strict';

module.exports = ['$q', '$log', '$http', '$window', hospitalService];

function hospitalService($q, $log, $http, $window) {
  $log.debug('Initializing hospitalService');

  let service = {};

  service.hospitalID = null;

  service.hospitals = [];

  service.createHospital = function(hospital) {
    $log.debug('Hit hospitalService.createHospital()');

    let url = `${__API_URL__}/api/hospital`;
    let config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    return $http.post(url, hospital, config)
    .then(res => {
      $log.log('Hospital created');
      let hospital = res.data;
      service.hospitalID = res.data._id;
      $window.localStorage.setItem('hospitalID', service.hospitalID);
      return hospital;
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });


  };
  service.fetchHospitals = function(){
    $log.debug('hit fetchHospitals()');

    let url = `${__API_URL__}/api/hospital`;
    let config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    return $http.get(url, config)
    .then((res) => {
      $log.log('Hospitals fetched', res);
      service.hospitals = res;
      return service.hospitals;
    })
    .catch((err) => {
      $log.error(err.message);
      return $q.reject(err.message);
    });
  };

  service.setHospitalID = function(hospitalID){
    $log.debug('hit hospitalService.setHospitalID()');
    service.hospitalID = hospitalID;
  };
  return service;
}
