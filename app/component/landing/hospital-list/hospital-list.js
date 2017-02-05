'use strict';

module.exports = {
  template: require('./hospital-list.html'),
  controller: ['$log', '$location', 'hospitalService', HospitalListController],
  controllerAs: 'hospitalListCtrl',
  bindings: {
    hospital: '=',
  },
};

function HospitalListController($log, $location, hospitalService) {
  $log.debug('In HospitalListController');

  this.allHospitals = [];

  this.fetchHospitals = function() {
    hospitalService.fetchHospitals()
    .then(list => {
      console.log('hospitalListCtrl list: ', list);
      this.allHospitals = list.data;
    });
  };
}
