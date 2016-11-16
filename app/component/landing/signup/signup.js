'use strict';

module.exports = {
  template: require('./signup.html'),
  controller: ['$log', '$location', 'authService', 'profileService', 'hospitalService', SignupController],
  controllerAs: 'signupCtrl',
};

function SignupController($log, $location, authService, profileService, hospitalService){

  let exampleHospital = {
    name: 'Seattle Children\'s Hospital',
  };

  this.signup = function(user){
    $log.debug('IN SIGNUPCONTROLLER!!!');
    authService.signup(user)
    .then(() => {
      $log.debug('IN SIGNUPCONTROLLER');

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
}
