'use strict';

require('./_footer.scss');

module.exports = {
  template: require('./footer.html'),
  controller: ['$log', '$location', '$rootScope', 'authService', FooterController],
  controllerAs: 'footerCtrl',
};

function FooterController($log, $location, $rootScope, authService){
  $log.debug('init FooterController');

  this.checkPath = function(){
    let path = $location.path();

    if(path === '/join'){
      this.hideFooter = true;
    } else {
      this.hideFooter = false;
    }
  };

  this.checkPath();

  $rootScope.$on('$locationChangeSuccess', () => {
    this.checkPath();
  });
}
