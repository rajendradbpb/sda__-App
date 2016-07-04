app.controller("Main_Controller",function($scope,$state,$localStorage){
  $scope.getUseDetails = function(){
    if(localStorage.getItem('accessToken')){
      $scope.is_loggedin = true;
    }
    else{
      $scope.is_loggedin = false;
    }
  }
  /*
  * function : signIn
  */
  $scope.signIn = function(){
    localStorage.setItem('accessToken','123456');
    // call the web service to make signIn
    // redirec to the dashboard
    $scope.is_loggedin = true;
    $state.go("dashboard");
  }
  $scope.signOut = function(){
    localStorage.setItem('accessToken','');
    // call the web service to make signOut and remove the token
    // redirec to the login page
    $scope.is_loggedin = false;
    $state.go("login");
  }
});
