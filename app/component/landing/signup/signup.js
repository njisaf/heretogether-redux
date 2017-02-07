'use strict';

module.exports = {
  template: require('./signup.html'),
  controller: ['$log', '$location', 'authService', 'profileService', SignupController],
  controllerAs: 'signupCtrl',
};

function SignupController($log, $location, authService, profileService){
  $log.debug('IN SIGNUPCONTROLLER');
  
  this.signup = function(user){
    authService.signup(user)
    .then(() => {
      let profile = {
        profileName: user.username,
      };

      profileService.createProfile(profile);
      $location.path('/home'); // upon sucessful signup, route user to homepage
    })

    .catch(() => {
      console.log('failed to signup');
    });
  };
}
