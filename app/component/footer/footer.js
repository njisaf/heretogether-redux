'use strict';

require('./_footer.scss');

module.exports = {
  template: require('./footer.html'),
  controller: ['$log', '$location', '$window', '$rootScope', FooterController],
  controllerAs: 'footerCtrl',
};

function FooterController($log, $location, $window, $rootScope){
  $log.debug('init FooterController');

  this.hideFooter = null;

  this.pageLoadHandler = function(){
    $log.debug('footerCtrl.pageLoadHandler()');
    let path = $location.path();

    if (path === '/join'){
      this.hideFooter = true;
    } else {
      this.hideFooter = false;
    }
  };

  $window.onload = this.pageLoadHandler.bind(this);
  $rootScope.$on('$stateChangeStart', this.pageLoadHandler.bind(this));

}
