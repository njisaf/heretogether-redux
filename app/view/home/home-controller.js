'use strict';

require('./_home.scss');

module.exports = ['$log', '$rootScope', '$window', 'statusService', 'hospitalService', 'profileService', HomeController];

function HomeController($log, $rootScope, $window, statusService, hospitalService, profileService){
  $log.debug('init homeCtrl');

  // if(!hospitalService.hospitalID) hospitalService.hospitalID = $window.localStorage.getItem('hospitalID');

  this.statuses = [];
  this.profiles = [];
  this.combinedData = [];
  this.currentStatus = null;

  this.fetchData = function() {
    return statusService.fetchStatuses()
    .then(statuses => {
      $log.debug('Statuses fetched!', statuses);
      this.statuses = statuses;
      return this.statuses;
    })
    .then(() => {
      return profileService.fetchProfiles();
    })
    .then(profiles => {
      $log.debug('Profiles fetched!', profiles);
      this.profiles = profiles;
      return this.profiles;
    })
    .then(profiles => {

      this.statuses.forEach(status => {
        for (var i = 0; i < profiles.length; ++i) {
          if (profiles[i].userID === status.userID) {
            let obj = {
              status: status,
              profile: profiles[i],
            };
            this.combinedData.push(obj);
          }
        }
      });
      $log.debug('COMBINED DATA', this.combinedData);
    });
  };

  // this.fetchStatuses = function() {
  //   return statusService.fetchStatuses()
  //   .then(statuses => {
  //     $log.debug('Statuses fetched!', statuses);
  //     this.statuses = statuses;
  //     return statuses;
  //   });
  // };
  //
  // this.fetchProfiles = function() {
  //   return profileService.fetchProfiles()
  //   .then(profiles => {
  //     $log.debug('Profiles fetched!', profiles);
  //     this.profiles = profiles;
  //     return profiles;
  //   });
  // };
  //
  // this.combineData = function() {
  //   this.combinedData = this.statuses.map(function(value, index) {
  //     return {
  //       status: value,
  //       profile: this.profiles[index],
  //     };
  //   });
  //   $log.debug('COMBINED DATA', this.combinedData);
  // };
  //
  // this.fetchProfiles();
  // this.fetchStatuses();
  // this.combineData();
  this.fetchData();

  $rootScope.$on('$locationChangeSuccess', () => {
    this.fetchData();
  });
}
