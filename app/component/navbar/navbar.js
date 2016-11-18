'use strict';

require('./_navbar.scss');

module.exports = {
  template: require('./navbar.html'),
  controller: ['$log', '$location', '$window', '$rootScope', 'authService',  NavController],
  controllerAs: 'navCtrl',
};

function NavController($log, $location, $window, $rootScope, authService){
  $log.debug('init navCtrl');

  this.pageLoadHandler = function(){
    $log.debug('navCtrl.pageLoadHandler()');
    let path = $location.path();

    if (path === '/join'){
      this.hideLogout = true;
      this.logoPic = require('../../assets/imgs/heretogether-logo.png');
    } else {
      this.hideLogout = false;
      this.logoPic = require('../../assets/imgs/heretogether-mobile-logo.png');
    }

    authService.getToken()
     .then(() => {
       if(path === '/join'){
         $location.url('/home');
       }
     })
     .catch(() => {
       let query = $location.search();
       if (query.token) {
         return authService.setToken(query.token)
         .then(() => {
           $location.url('/home');
         });
       }
       if (path !== '/join' ){
         $location.url('/join');
       }
     });
  };

  this.logout = function() {
    $log.log('navbarCtrl.logout()');
    this.hideLogout = true;
    authService.logout()
      .then(() => {
        $location.url('/join');
      });
  };

  $window.onload = this.pageLoadHandler.bind(this);
  $rootScope.$on('$stateChangeStart', this.pageLoadHandler.bind(this));
}
