'use strict';


module.exports = {
  template: require('./login.html'),
  controller: ['$log', '$location', 'authService', 'hospitalService', LoginController],
  controllerAs: 'loginCtrl',
};

function LoginController($log, $location, authService, hospitalService){

  this.mockHospitals = [{ _id: '582e77c3cbc996e7ecb5cc97',
    name: 'Seattle Children\'s Hospital',
  },
  { _id: '582e77c3cbc996e7ecb5cc98',
    name: 'Providence',
  },
  { _id: '582e77c3cbc996e7ecb5cc99',
    name: 'Evergreen',
  },
  { _id: '582e77c3cbc996e7ecb5cc9a',
    name: 'St. Francis',
  },
  { _id: '582e77c3cbc996e7ecb5cc9b',
    name: 'UW Medical Center',
  } ];

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


  // this.getHospitalAtLogin();
}
