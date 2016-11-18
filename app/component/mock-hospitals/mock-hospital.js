  'use strict';

  module.exports = {
    template: require('./mock-hospital.html'),
    controller: ['$log', '$window', 'hospitalService', MockHospitalController],
    controllerAs: 'mockHospitalCtrl',
  };

  function MockHospitalController($log, $window, hospitalService){
    $log.debug('hahahahhah init MockHospitalController');

    this.getHospitals = function(){
      hospitalService.fetchHospitals()
      .then((hospitals) => {
        this.hospitals = hospitals.data;
      });
    };

    this.setHospitalID = function(){
      console.log('lulwat')
      hospitalService.setHospitalID(this.hospitalID);
    };

    this.getHospitals();
    };
