'use strict';


module.exports = {
  template: require('./login.html'),
  controller: ['$log', '$location', 'authService', 'hospitalService', LoginController],
  controllerAs: 'loginCtrl',
};

function LoginController($log, $location, authService, hospitalService){

  this.hospitals = [];
  this.login = function(user){
    console.log('hospital', this.hospitalID);
    authService.login(user)
    .then(() => {
      $location.path('/home'); // upon successful login, route user to homepage
      hospitalService.setHospitalID(this.hospitalID);
    })
    .catch(() => {
      console.log('failed to login');
    });
  };

  this.getHospitalAtLogin = function(){
    hospitalService.fetchHospitals()
    .then((hospitals) => {
      this.hospitals = hospitals.data;
      return this.hospitals;
    });
  };

  this.getHospitalAtLogin();
}
