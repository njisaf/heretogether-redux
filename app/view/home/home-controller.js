'use strict';

require('./_home.scss');

module.exports = ['$log', '$rootScope', '$window', 'statusService', 'hospitalService', HomeController];

function HomeController($log, $rootScope, $window, statusService, hospitalService){
  $log.debug('init homeCtrl');

  //TODO DONE: localStorage works here
  if(!hospitalService.hospitalID) hospitalService.hospitalID = $window.localStorage.getItem('hospitalID');

  //TODO: No need to have this example hospital again, already handled in signup.js
  // let exampleHospital = {
  //   name: 'Seattle Children\'s Hospital',
  // };

  this.statuses = [];
  this.currentStatus = null;

  this.fetchStatuses = function() {
    return statusService.fetchStatuses()
    .then(statuses => {
      this.statuses = statuses;
      return statuses;
    });
  };
  //TODO: Just commented out to reference what we had before
  // if(!hospitalService.hospitalID) {
  //   hospitalService.createHospital(exampleHospital)
  //   .then(() => {
  //     $log.log('hit line 30 of homeCtrl?');
  //     this.fetchStatuses();
  //     this.statuses =  statusService.statuses;
  //   });
  // } else {
  //   $log.log('hit line 35 of homeCtrl?');
  //   this.fetchStatuses();
  //   this.statuses =  statusService.statuses;
  // }
  this.fetchStatuses();
  // this.statuses =  statusService.statuses;

  $rootScope.$on('$locationChangeSuccess', () => {
    this.fetchStatuses();
  });
}
