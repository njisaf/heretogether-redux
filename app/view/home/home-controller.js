'use strict';

require('./_home.scss');

module.exports = ['$log', '$rootScope', 'statusService', HomeController];

function HomeController($log, $rootScope, statusService){
  $log.debug('init homeCtrl');

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
