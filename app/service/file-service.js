'use strict';

module.exports = ['$q', '$log', '$http', 'Upload', 'authService', fileService];

function fileService($q, $log, $http, Upload, authService){
  $log.debug('Initializing fileService');

  let service = {};


  service.uploadStatusFile = function (statusID, fileData){
    $log.debug('fileService.uploadFile()');


    return authService.getToken()
    .then((token) => {

      let url = `${__API_URL__}/api/status/${statusID}/file`;
      let headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      };

      return Upload.upload({
        url,
        headers,
        method: 'POST',
        data: {
          file: fileData,
        },
      });
    })
    .then((res) => {
      $log.log('File uploaded successfully', res);
      let file = res.data;
      return file;
    })
    .catch((err) => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };
  return service;
}
