app.controller("Main_Controller",function($scope,$state,$localStorage,userService){
  $scope.user = {};
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
    console.log($scope.user);
    userService.login($scope.user).then(function(response){
      console.log(response);
    })
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
app.controller("userController",function($scope,$state,$localStorage,loginService){
  $scope.user = {};
  $scope.addUser = function(){

  }
  $scope.goToEdit = function(){
    $state.go('edituser');
  }
});
app.controller("BuildingPlanController",function($scope,$state,$localStorage,loginService){
  $scope.uploadBuildingPlan = function(){
    console.log(1212121);
    console.log($scope.myFile);
  }
});
