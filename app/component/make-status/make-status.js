'use strict';

module.exports = {
  template: require('./make-status.html'),
  controller: ['$log', 'statusService', MakeStatusController],
  controllerAs: 'makeStatusCtrl',
};

function MakeStatusController($log, statusService){
  $log.debug('init MakeStatusController()');

  this.handleSubmit = function(){

    if (!this.status.file){
      return statusService.createStatus(this.status)
      .then(() => {
        this.status.text = null;
      });
    }
    statusService.createFileStatus(this.status)
    .then((status) => {
      console.log(status);
      this.status = {};
    });
  };
}
