// 'use strict';
//
// const camelcase = require('camelcase');
//
// describe('testing signup-controller', function(){
//
//   beforeEach(() => {
//     angular.mock.module(camelcase(__TITLE__));
//     angular.mock.inject(($rootScope, $location, $httpBackend, $componentController, authService) => {
//       authService.setToken('1234');
//
//       this.$location = $location;
//       this.$rootScope = $rootScope;
//       this.$httpBackend = $httpBackend;
//       this.authService = authService;
//       this.$componentController = $componentController;
//     });
//   });
//
//   afterEach(() => {
//     this.authService.logout();
//   });
//
//   it('testing signup controller', () => {
//     let user = {
//       username: 'mockUserName',
//       email: 'mockEmail',
//       password: 'mockPassword',
//     };
//
//     let profile = {
//       profileName: 'mockProfileName',
//       userID: '1234FIVE',
//       hospitalID: '6789TEN',
//     };
//
//     let hospital = {
//       name: 'mockHospitalName',
//     };
//
//     let signupURL = 'http://localhost:3000/api/signup';
//
//     let profileURL = 'http://localhost:3000/api/6789TEN/profile';
//
//     let hospitalURL = 'http://localhost:3000/api/hospital';
//
//     let headers = {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     };
//     this.$httpBackend.expectPOST(hospitalURL, hospital, headers)
//     .respond(200, {_id:'1234567890', name: 'mockHospitalName', created: Date.now()});
//
//     this.$httpBackend.expectPOST(signupURL, user, headers)
//     .respond(200, {_id: '1234FIVE', username: 'mockUserName', email: 'mockEmail', password: 'mockPassword'});
//
//     this.$httpBackend.expectPOST(profileURL, profile, headers)
//     .respond(200, {_id:'1234567890', userID: '1234FIVE', profileName: 'mockProfileName', hospitalID: '6789TEN'});
//
//
//     let signupCtrl = this.$componentController('signup');
//
//     signupCtrl.signup(user);
//
//     this.$httpBackend.flush();
//
//     expect(this.$location.path()).toBe('/home');
//
//     this.$rootScope.$apply();
//   });
// });
