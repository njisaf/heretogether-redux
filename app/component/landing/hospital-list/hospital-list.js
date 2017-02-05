'use strict';

module.exports = {
  template: require('./hospital-list.html'),
  controller: ['$log', '$location', 'hospitalService', HospitalListController],
  controllerAs: 'hospitalListCtrl',
};

function HospitalListController($log, $location, hospitalService) {
  $log.debug('In HospitalListController');

  this.allHospitals = [];

  this.hospitalID = null;

  this.fetchHospitals = function() {
    hospitalService.fetchHospitals()
    .then(list => {
      console.log('hospitalListCtrl list: ', list);
      this.allHospitals = list.data;
    });
  };

  this.setID = function(id) {
    hospitalService.hospitalID = id;
  };
}
