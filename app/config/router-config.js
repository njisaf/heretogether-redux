'use strict';

module.exports = ['$stateProvider', '$urlRouterProvider', routerConfig];

function routerConfig($stateProvider, $urlRouterProvider){
  $urlRouterProvider.when('' , '/home');
  $urlRouterProvider.when('/' , '/home');
  $urlRouterProvider.when('/profile/' , '/profile');


  let states = [
    {
      name: 'home',
      url: '/home',
      controllerAs: 'homeCtrl',
      controller: 'HomeController',
      template: require('../view/home/home.html'),
    },
    {
      name: 'landing',
      url: '/join',
      controllerAs: 'landingCtrl',
      controller: 'LandingController',
      template: require('../view/landing/landing.html'),
    },
    {
      name: 'profile',
      url: '/profile',
      controllerAs: 'profileCtrl',
      controller: 'ProfileController',
      template: require('../view/profile/profile.html'),
    },
    {
      name: 'show-profile',
      url: '/profile/:profileID',
      controllerAs: 'showProfileCtrl',
      controller: 'ShowProfileController',
      template: require('../view/show-profile/show-profile.html'),
    },
  ];

  states.forEach(state => {
    $stateProvider.state(state);
  });
}
