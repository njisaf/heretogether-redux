'use strict';

require('./_footer.scss');

module.exports = {
  template: require('./footer.html'),
  controller: ['$log', '$location', '$rootScope', 'authService', 'profileService', FooterController],
  controllerAs: 'footerCtrl',
};

function FooterController($log, $location, $rootScope, authService, profileService){
  $log.debug('init FooterController');

  this.checkPath = function(){
    let path = $location.path;

    if(path === '/join'){
      this.hideFooter = true;
    } else {
      this.hideFooter = false;
    }

    if (path === '/join'){
      this.hideFooter = true;
      authService.getToken()
      .then(() => {
        $location.url('/join');
      });
    }
    if(path !== '/join'){
      this.hideFooter = false;
      authService.getToken()
      .catch( () => {
        $location.url('/join#login');
      });
    }
  };

  this.checkPath();

  //Judy and Nassir's additions

  this.goToUserProfile = function(){

    profileService.getOneProfileNoID()
    .then((profile) => {
      $location.url(`/profile/id=${profile._id}`);
    })
    .catch((err) => {
      $log.error(err.message);
    });
  };

  $rootScope.$on('$locationChangeSuccess', () => {
    this.checkPath();
  });
}
