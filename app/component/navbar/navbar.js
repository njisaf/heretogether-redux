'use strict';

require('./_navbar.scss');

module.exports = {
  template: require('./navbar.html'),
  controller: ['$log', '$location', '$rootScope', 'authService', 'hospitalService', NavController],
  controllerAs: 'navCtrl',
};

function NavController($log, $location, $rootScope, authService, hospitalService){
  $log.debug('init navCtrl');

  this.logoPic;

  this.checkPath = function(){
    let path = $location.path();
    if(path === '/join'){
      this.hideLogout = true;
      this.logoPic = 'https://s3-us-west-2.amazonaws.com/heretogether-assets/heretogether-logo';
    } else {
      this.hideLogout = false;
      this.logoPic = 'https://s3-us-west-2.amazonaws.com/heretogether-assets/heretogether-mobile-logo';
    }
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
    this.hideLogout = true;
    authService.logout()
    .then(() => {
      hospitalService.hospitalID = null;
      $location.url('/');
    });
  };

  this.home = function(){
    $log.log('navCtrl.home()');

    let path = $location.path();

    if(path ==='/join'){
      return;
    }

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
