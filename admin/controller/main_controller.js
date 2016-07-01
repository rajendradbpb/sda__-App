app.controller("Main_Controller",function($scope,$state){
  console.log(121212121212);
  $scope.is_loggedin = false;

  /*
  * function : signIn
  */
  $scope.signIn = function(){
    // call the web service to make signIn

    // redirec to the dashboard
    $scope.is_loggedin = true;
    $state.go("dashboard");
  }
  $scope.signOut = function(){
    // call the web service to make signOut and remove the token

    // redirec to the login page
    $scope.is_loggedin = false;
    $state.go("login");
  }
});
