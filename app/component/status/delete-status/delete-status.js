'use strict';

require('./_delete-status.scss');

module.exports = {
  template: require('./delete-status.html'),
  controller: ['$log', '$q', 'statusService', DeleteStatusController],
  controllerAs: 'deleteStatusCtrl',
  bindings: {
    status: '<',
  },
};

function DeleteStatusController($log, $q, statusService) {
  $log.debug('Initialize DeleteStatusController');

  this.deleteStatus = function() {
    $log.debug('Deleting status!');
    return statusService.deleteStatus(this.status._id)
    .then(() => {
      return $q.resolve('Status deleted!');
    })
    .catch(err => $q.reject(err));
  };
}
