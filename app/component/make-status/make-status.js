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
      // make request to route that only creates a status

      return;
    }

    // else make a request that makes a file
    statusService.createFileStatus(this.status)
    .then((status) => {
      console.log(status);
      this.status = {};
    });
  };
}
