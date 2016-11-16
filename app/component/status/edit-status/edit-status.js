'use strict';

module.exports = {
  template: require('./edit-status.html'),
  controller: ['$log', '$q', 'statusService', EditStatusController],
  controllerAs: 'editStatusCtrl',
  bindings: {
    status: '<',
  },
};

function EditStatusController($log, $q, statusService){
  $log.debug('init EditStatusController()');

  this.editStatus = function(){
    return statusService.updateStatus(this.status._id, this.status)
    .then((editedStatus) => {
      editedStatus = this.status;
      return editedStatus;
    });
  };

}
