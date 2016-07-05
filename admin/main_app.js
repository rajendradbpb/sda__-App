var app = angular.module("rda_app", ['ui.router', 'ui.bootstrap', 'ngResource', 'ngStorage', 'ngAnimate','datePicker']);
app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
    $stateProvider
    // HOME STATES AND NESTED VIEWS ========================================
        .state('dashboard', {
            templateUrl: 'pages/dashboard.html',
            url: '/dashboard',
            onEnter: function($localStorage, $state) {
                if (!localStorage.getItem('accessToken')) {
                    $state.go('login');
                }
            }
        })
        .state('login', {
            templateUrl: 'pages/login.html',
            url: '/login',
            onEnter: function($localStorage, $state) {
                if (localStorage.getItem('accessToken')) {
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
          controller:"BuildingPlanController",
          onEnter: function($localStorage, $state) {
              if (!localStorage.getItem('accessToken')) {
                  $state.go('login');
              }
          }
      })

    .state('users', {
        templateUrl: 'pages/users/usersList.html',
        url: '/users',
        controller: "userController"
    })
    .state('adduser', {
        templateUrl: 'pages/users/adduser.html',
        url: '/adduser',
        controller: "userController"
    })
    .state('edituser', {
        templateUrl: 'pages/users/edituser.html',
        url: '/edituser',
        controller: "userController"
    })
});
app.constant('CONFIG', {
  'HTTP_HOST': '../server/api1.php' //client staging
})
