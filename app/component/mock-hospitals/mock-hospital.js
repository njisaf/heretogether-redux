'use strict';

module.exports = {
  template: require('./mock-hospital.html'),
  controller: ['$log', 'hospitalService', 'profileService', MockHospitalController],
  controllerAs: 'mockHospitalCtrl',
};

function MockHospitalController($log, hospitalService, profileService){
  $log.debug('hahahahhah init MockHospitalController');

  this.getHospitals = function(){
    hospitalService.fetchHospitals()
    .then((hospitals) => {
      this.hospitals = hospitals.data;
    });
  };

  this.setHospitalID = function(){
    hospitalService.setHospitalID(this.hospitalID);
    $log.debug('HospitalID set to: ', hospitalService.hospitalID);

    profileService.getOneProfileNoID()
    .then(profile => {
      $log.debug('Fetched profile: ', profile);
    })
    .catch(() => {
      let profile = {
        hospitalID: hospitalService.hospitalID,
      };
      return profileService.createProfile(profile);
    })
    .then(res => {
      $log.debug('Profile created: ', res);
    });
  };

  this.getHospitals();
}
