'use strict';

module.exports = {
  template: require('./signup.html'),
  controller: ['$log', '$location', 'authService', 'profileService', 'hospitalService', SignupController],
  controllerAs: 'signupCtrl',
};

function SignupController($log, $location, authService, profileService, hospitalService){
  $log.debug('IN SIGNUPCONTROLLER');

  let exampleHospital = {
    name: 'Seattle Children\'s Hospital',
  };

  this.hospitals = [];

  this.signup = function(user){
    authService.signup(user)
    .then(() => {

      if (!hospitalService.hospitalID){
        return hospitalService.createHospital(exampleHospital);
      }

    }).then(() => {
      let profile = {
        profileName: user.username,
        hospitalID: hospitalService.hospitalID,
      };

      profileService.createProfile(profile);
      $location.path('/home'); // upon sucessful signup, route user to homepage
    })

    .catch(() => {
      console.log('failed to signup');
    });
  };

  //TODO: Figure this out
  this.getHospitalAtSignup = function(){
    console.log('hello???');
    return hospitalService.createHospital(exampleHospital)
    .then((hospital) => {
      $log.log(hospital, 'lalalalala');
      hospitalService.fetchHospitals()
      .then((hospitals) => {
        this.hospitals = hospitals.data;
        return this.hospitals;
      });
    });
  };

}
