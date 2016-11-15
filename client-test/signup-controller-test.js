// 'use strict';
//
// const camelcase = require('camelcase');
//
// describe('testing signup-controller', function(){
//
//   beforeEach(() => {
//     angular.mock.module(camelcase(__TITLE__));
//     angular.mock.inject(($rootScope, $location, $httpBackend, $componentController, authService, profileService, hospitalService) => {
//       authService.setToken('1234');
//
//       this.$location = $location;
//       this.$rootScope = $rootScope;
//       this.$httpBackend = $httpBackend;
//       this.authService = authService;
//       this.profileService = profileService;
//       this.hospitalService = hospitalService;
//       this.$componentController = $componentController;
//     });
//   });
//
//   afterEach(() => {
//     this.authService.logout();
//   });
//
//   it('testing signup controller', () => {
//
//
//     let user = {
//       username: 'mockUserName',
//       email: 'mockEmail',
//       password: 'mockPassword',
//     };
//
//     let profile = {
//       profileName: user.username,
//       userID: user._id,
//       hospitalID: 'mockHospitalID',
//     };
//
//     let hospital = {
//       name: 'Seattle Children\'s Hospital',
//     };
//
//     let signupURL = 'http://localhost:3000/api/signup';
//
//     let profileURL = 'http://localhost:3000/api/hospital/mockHospitalID/profile';
//
//     let hospitalURL = 'http://localhost:3000/api/hospital';
//
//     let headersWithToken = {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//       Authorization: 'Bearer 1234',
//     };
//
//     let headersNoToken = {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     };
//
//     this.$httpBackend.whenPOST(signupURL, user, headersNoToken)
//     .respond(200, {_id: '1234FIVE', username: 'mockUserName', email: 'mockEmail', password: 'mockPassword'});
//
//     this.$httpBackend.expectPOST(hospitalURL, hospital, headersWithToken)
//     .respond(200, {_id:'1234567890', name: hospital.name, created: Date.now()});
//
//     this.hospitalService.hospitalID = 'mockHospitalID';
//
//
//
//     this.$httpBackend.expectPOST(profileURL, profile, headersWithToken)
//     .respond(200, {_id: user._id, profileName: user.username, userID: profile.userID,  hospitalID: this.hospitalService.hospitalID});
//
//
//     let signupCtrl = this.$componentController('signup');
//
//     signupCtrl.signup(user);
//
//     this.$httpBackend.flush();
//     console.log('hahahahaha', this.hospitalService.hospitalID);
//
//     expect(this.$location.path()).toBe('/home');
//
//     this.$rootScope.$apply();
//   });
// });
