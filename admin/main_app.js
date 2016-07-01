var app = angular.module("rda_app", ['ui.router', 'ui.bootstrap','ngResource','ngStorage','ngAnimate']);
app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/login');
  $stateProvider
  // HOME STATES AND NESTED VIEWS ========================================
    .state('dashboard', {
      templateUrl: 'pages/dashboard.html',
      url: '/dashboard'
    })
    .state('login', {
      templateUrl: 'pages/login.html',
      url: '/login'
    })
    .state('register', {
      templateUrl: 'pages/register.html',
      url: '/register'
    })
  });
