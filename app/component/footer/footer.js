'use strict';

require('./_footer.scss');

module.exports = {
  template: require('./footer.html'),
  controller: ['$log', '$location', '$window', '$rootScope', 'profileService', FooterController],
  controllerAs: 'footerCtrl',
};

function FooterController($log, $location, $window, $rootScope, profileService){
  $log.debug('init FooterController');

  this.pageLoadHandler = function(){
    $log.debug('footerCtrl.pageLoadHandler()');
    let path = $location.path();

    if (path === '/join'){
      this.hideFooter = true;
    } else {
      this.hideFooter = false;
    }
  };

  this.goToUserProfile = function(){

    profileService.getOneProfileNoID()
    .then((profile) => {
      $location.url(`/profile/id=${profile._id}`);
    })
    .catch((err) => {
      $log.error(err.message);
    });
  };



  $window.onload = this.pageLoadHandler.bind(this);
  $rootScope.$on('$stateChangeStart', this.pageLoadHandler.bind(this));


}
