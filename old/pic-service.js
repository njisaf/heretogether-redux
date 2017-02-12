'use strict';

module.exports = ['$q', '$log', '$http', 'Upload', 'authService', picService];

function picService($q, $log, $http, Upload, authService) {
  $log.debug('Initializing picService');

  let service = {};

  service.uploadProfilePic = function (profileID, picData){
    $log.debug('picService.uploadProfilePic()');

    return authService.getToken()
    .then((token) => {
      let url = `${__API_URL__}/api/profile/${profileID}/pic`;
      let headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      };

      return Upload.upload({
        url,
        headers,
        method: 'POST',
        data: {
          image: picData,
        },
      });
    })
    .then((res) => {
      $log.log('Pic uploaded successfully', res);
      let pic = res.data;
      return pic;
    })
    .catch((err) => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };
  return service;
}
