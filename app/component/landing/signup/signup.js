'use strict';

module.exports = {
  template: require('./signup.html'),
  controller: ['$log', '$location', 'authService', SignupController],
  controllerAs: 'signupCtrl',
};

function SignupController($log, $location, authService){
  this.signup = function(user){
    authService.signup(user)
    .then(() => {
      $location.path('/home'); // upon sucessful signup, route user to homepage
    })
    .catch(() => {
      console.log('failed to signup');
    });
  };
}
