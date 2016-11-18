'use strict';

module.exports = {
  template: require('./mock-hospital.html'),
  controller: ['$log', 'hospitalService', MockHospitalController],
  controllerAs: 'mockHospitalCtrl',
};

function MockHospitalController($log, hospitalService){

  this.mockHospitals = [];

  let exampleHospital1 = {
    name: 'Seattle Children\'s Hospital',
  };

  let exampleHospital2 = {
    name: 'Providence',
  };

  let exampleHospital3 = {
    name: 'Evergreen',
  };

  let exampleHospital4 = {
    name: 'St. Francis',
  };

  let exampleHospital5 = {
    name: 'UW Medical Center',
  };

  this.createMockHospitals = function(){
    hospitalService.createHospital(exampleHospital1)
    .then((hospital) => {
      return hospital;
    });
    hospitalService.createHospital(exampleHospital2)
    .then((hospital) => {
      return hospital;
    });
    hospitalService.createHospital(exampleHospital3)
    .then((hospital) => {
      return hospital;
    });
    hospitalService.createHospital(exampleHospital4)
    .then((hospital) => {
      return hospital;
    });
    hospitalService.createHospital(exampleHospital5)
    .then((hospital) => {
      return hospital;
    })
    .then(() => {
      hospitalService.fetchHospitals()
      .then((hospitals) => {
        this.mockHospitals = hospitals.data;
      });
    });
  };

  this.createMockHospitals();
  console.log('what', this.hospitalID);


}
