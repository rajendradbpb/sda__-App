var app = angular.module("rda_app", ['ui.router', 'ui.bootstrap','ngResource','ngStorage','ngAnimate']);
app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/login');
  $stateProvider
  // HOME STATES AND NESTED VIEWS ========================================
    .state('dashboard', {
      templateUrl: 'pages/dashboard.html',
      url: '/dashboard',
      onEnter:function($localStorage,$state){
        if(!localStorage.getItem('accessToken')){
          $state.go('login');
        }
      }
    })
    .state('login', {
      templateUrl: 'pages/login.html',
      url: '/login',
      onEnter:function($localStorage,$state){
        if(localStorage.getItem('accessToken')){
          $state.go('dashboard');
        }
      }
    })
    .state('register', {
      templateUrl: 'pages/register.html',
      url: '/register'
    })
    .state('buildingPlan', {
      templateUrl: 'pages/buildingPlan.html',
      url: '/buildingPlan',
      onEnter:function($localStorage,$state){
        if(!localStorage.getItem('accessToken')){
          $state.go('login');
        }
      }
    })
  });
