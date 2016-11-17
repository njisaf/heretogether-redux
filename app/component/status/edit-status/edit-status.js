'use strict';

module.exports = {
  template: require('./edit-status.html'),
  controller: ['$log', '$q', '$window', '$location', 'statusService', EditStatusController],
  controllerAs: 'editStatusCtrl',
  bindings: {
    status: '<',
  },
};

function EditStatusController($log, $q, $window, $location, statusService){
  $log.debug('init EditStatusController()');

  this.editStatus = function(){
    return statusService.updateStatus(this.status._id, this.status)
    .then((editedStatus) => {
      editedStatus = this.status;
      return $q.resolve(editedStatus);
    })
    .catch((err) => {
      return $q.reject(err.message);
    });
  };




}
