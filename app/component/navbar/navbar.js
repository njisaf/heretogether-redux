'use strict';

require('./_navbar.scss');

module.exports = {
  template: require('./navbar.html'),
  controller: ['$log', '$location', '$rootScope', 'authService', NavController],
  controllerAs: 'navCtrl',
  bindings: {
    appTitle: '@',
  },
};

function NavController($log, $location, $rootScope, authService){
  $log.debug('init navCtrl');

  this.checkPath = function(){
    let path = $location.path();
    if (path === '/join'){
      authService.getToken()
      .then(() => {
        $location.url('/join');
      });
    }

    if(path !== '/join'){
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
    authService.logout()
    .then(() => {
      $location.url('/');
    });
  };

  this.home = function(){
    $log.log('navCtrl.home()');
    let path = $location.path();
    if (path === '/home'){
      authService.getToken()
      .then(() => {
        $location.url('/home');
      });
    }

    if(path !== '/home'){
      authService.getToken()
      .catch( () => {
        $location.url('/home');
      });
    }
  };
}
