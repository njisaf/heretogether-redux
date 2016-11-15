'use strict';

module.exports = {
  template: require('./create-status.html'),
  controller: ['$log', 'statusService', CreateStatusController],
  controllerAs: 'createStatusCtrl',
};

function CreateStatusController($log, statusService){
  $log.debug('Initialize createStatusCtrl');

  this.status = {};

  this.createStatus = function(){
    statusService.createStatus(this.status)
    .then(() => {
      this.status.text = null;
    });
  };
}
