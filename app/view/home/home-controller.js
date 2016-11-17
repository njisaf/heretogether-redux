'use strict';

require('./_home.scss');

module.exports = ['$log', '$rootScope', '$window', 'statusService', 'hospitalService', HomeController];

function HomeController($log, $rootScope, $window, statusService, hospitalService){
  $log.debug('init homeCtrl');

  if(!hospitalService.hospitalID) hospitalService.hospitalID = $window.localStorage.getItem('hospitalID');

  this.statuses = [];
  this.currentStatus = null;

  this.fetchStatuses = function() {
    return statusService.fetchStatuses()
    .then(statuses => {
      this.statuses = statuses;
      return statuses;
    });
  };

  this.fetchStatuses();

  $rootScope.$on('$locationChangeSuccess', () => {
    this.fetchStatuses();
  });
}
