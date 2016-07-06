app.controller("Main_Controller",function($scope,$state,$localStorage,userService){
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
  $scope.signIn = function(user){
    userService.login(user).then(function(pRes) {
      if(pRes.status == 200){
        $scope.is_loggedin = true;
        localStorage.setItem('accessToken','123456');
        $state.go("dashboard");
      }
    },
    function(err) {
      console.log(">>>>>>>>>>>>>   ",err);
    })
  }
  $scope.signOut = function(){
    localStorage.setItem('accessToken','');
    // call the web service to make signOut and remove the token
    // redirec to the login page
    $scope.is_loggedin = false;
    $state.go("login");
  }
});
app.controller("userController",function($scope,$state,$localStorage,userService){
  $scope.getUserList = function(){
    userService.getUserList().then(function(pRes) {
      if(pRes.status == 200){
        $scope.userList = pRes.data.data;
      }
    },
    function(err) {
      console.log(">>>>>>>>>>>>>   ",err);
    })
  }
  $scope.goToEdit = function(id){
    localStorage.setItem('user_id',id);
    $state.go('edituser');
  }
  $scope.deleteUser = function(id){
    localStorage.setItem('user_id',id);
    $state.go('edituser');
  }
  $scope.changeStatus = function(id,status){
    localStorage.setItem('user_id',id);
    $state.go('edituser');
  }
  $scope.addUser = function(){
    userService.addUser($scope.user).then(function(pRes) {
      if(pRes.status == 200){
        $state.go('users');
      }
    },
    function(err) {
      console.log(">>>>>>>>>>>>>   ",err);
    })
  }
});
app.controller("BuildingPlanController",function($scope,$state,$localStorage,userService){

});
