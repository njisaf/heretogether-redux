'use strict';

module.exports = {
  template: require('./google-button.html'),
  controller: ['$log', GoogleButtonController],
  controllerAs: 'googleButtonCtrl',
};

function GoogleButtonController($log){
  $log.log('init GoogleButtonController');

  let googleAuthBase = 'https://accounts.google.com/o/oauth2/v2/auth';
  let googleAuthResponseType = 'response_type=code'; //code for server side workflow
  let googleAuthClientID = `client_id=${__GOOGLE_CLIENT_ID__}`;
  let googleAuthScope = 'scope=profile%20email%20openid';
  let googleAuthRedirectURI = 'redirect_uri=http://localhost:3000/api/auth/oauth_callback';
  let googleAuthAccessType = 'access_type=offline';
  let googleAuthPrompt = 'prompt=consent';

  this.googleAuthURL = `${googleAuthBase}?${googleAuthResponseType}&${googleAuthClientID}&${googleAuthScope}&${googleAuthRedirectURI}&${googleAuthAccessType}&${googleAuthPrompt}`;

}
