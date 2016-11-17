'use strict';

require('./_navbar.scss');

module.exports = {
  template: require('./navbar.html'),
  controller: ['$log', '$location', '$rootScope', 'authService', 'hospitalService', NavController],
  controllerAs: 'navCtrl',
  bindings: {
    appTitle: '@',
  },
};

function NavController($log, $location, $rootScope, authService, hospitalService){
  $log.debug('init navCtrl');

  this.checkPath = function(){
    let path = $location.path();
    if (path === '/join'){
      this.hideButtons = true;
      authService.getToken()
      .then(() => {
        $location.url('/join');
      });
    }

    if(path !== '/join'){
      this.hideButtons = false;
      authService.getToken()
      .catch( () => {
        $location.url('/join#login');
      });
    }
  };

  this.checkPath();

  $rootScope.$on('$locationChangeSuccess', () => {
    this.checkPath();
  });


  this.logout = function(){
    $log.log('navCtrl.logout()');
    this.hideButtons = true;
    authService.logout()
    .then(() => {
      hospitalService.hospitalID = null;
      $location.url('/');
    });
  };
}
