'use strict';


module.exports = {
  controllerAs: 'uploadFileCtrl',
  template: require('./upload-file.html'),
  controller: ['$log', 'fileService', UploadFileController],
  bindings: {
    status: '=',
  },
};

function UploadFileController($log){
  $log.debug('Initializing uploadFileCtrl');

  this.file = {};

  this.uploadStatusFile = function(){
    console.log('UploadFileController.uploadStatusFile');
    this.status.file = this.file.file;

    // fileService.uploadStatusFile(this.status._id, this.status.file);

    console.log('this.status.file', this.status.file);
    this.file.file = null;

  };


}
