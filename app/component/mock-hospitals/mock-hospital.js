  'use strict';

  module.exports = {
    template: require('./mock-hospital.html'),
    controller: ['$log', '$window', 'hospitalService', MockHospitalController],
    controllerAs: 'mockHospitalCtrl',
  };

  function MockHospitalController($log, $window, hospitalService){
    $log.debug('init MockHospitalController');

    this.mockHospitals = [];

    // this.mockHospitals = [{ _id: '582e77c3cbc996e7ecb5cc97',
    //   name: 'Seattle Children\'s Hospital',
    // },
    // { _id: '582e77c3cbc996e7ecb5cc98',
    //   name: 'Providence',
    // },
    // { _id: '582e77c3cbc996e7ecb5cc99',
    //   name: 'Evergreen',
    // },
    // { _id: '582e77c3cbc996e7ecb5cc9a',
    //   name: 'St. Francis',
    // },
    // { _id: '582e77c3cbc996e7ecb5cc9b',
    //   name: 'UW Medical Center',
    // } ];

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
      console.log('hospitalID', hospital._id);
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
        this.mockHospitals.push(hospitals.data);
      });
    });
    };

    this.stopCreatingMockHospitals = function(){
      console.log('hit stopCreatingMockHospitals?');
      if(!this.mockHospitals.length){
        hospitalService.fetchHospitals()
      .then((hospitals) => {
        this.mockHospitals = hospitals.data;
      });
      }
    //else
      hospitalService.fetchHospitals();
    };

    this.createMockHospitals();
  // this.stopCreatingMockHospitals();
  // console.log('hahaha', this.hospital);



  }
