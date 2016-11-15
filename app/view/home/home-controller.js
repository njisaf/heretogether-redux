'use strict';

require('./_home.scss');

module.exports = ['$log', '$rootScope', 'statusService', 'hospitalService', HomeController];

function HomeController($log, $rootScope, statusService, hospitalService){
  $log.debug('init homeCtrl');

  let exampleHospital = {
    name: 'Seattle Children\'s Hospital',
  };

  this.statuses = [];
  this.currentStatus = null;

  this.fetchStatuses = function() {
    return statusService.fetchStatuses()
    .then(statuses => {
      this.statuses = statuses;
      return statuses;
    });
  };
  if(!hospitalService.hospitalID) {
    hospitalService.createHospital(exampleHospital)
    .then(() => {
      this.fetchStatuses();
      this.statuses =  statusService.statuses;
    });
  } else {
    this.fetchStatuses();
    this.statuses =  statusService.statuses;
  }

  $rootScope.$on('$locationChangeSuccess', () => {
    this.fetchStatuses();
  });
}
