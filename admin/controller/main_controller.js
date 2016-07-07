app.controller("Main_Controller",function($scope,$state,$localStorage,userService){
  /*******************************************************/
  /*************This is use for check user login**********/
  /*******************************************************/
  $scope.getUseDetails = function(){
    if(localStorage.getItem('accessToken')){
      $scope.is_loggedin = true;
    }
    else{
      $scope.is_loggedin = false;
    }
  }
  /*******************************************************/
  /*************This is use for user login****************/
  /*******************************************************/
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
  /*******************************************************/
  /*************This is use for user signout**************/
  /*******************************************************/
  $scope.signOut = function(){
    localStorage.setItem('accessToken','');
    // call the web service to make signOut and remove the token
    // redirec to the login page
    $scope.is_loggedin = false;
    $state.go("login");
  }
});
app.controller("userController",function($scope,$state,$localStorage,userService,$stateParams){
  /*******************************************************/
  /*************This is use for get the user list*********/
  /*******************************************************/
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
  /*******************************************************/
  /*************This is use for fo to edit page***********/
  /*******************************************************/
  $scope.goToEdit = function(id){
    // localStorage.setItem('user_id',id);
    $state.go('edituser',{id:id});
  }
  /*******************************************************/
  /*************This is use for load user details*********/
  /*******************************************************/
  $scope.loadUserDetails = function(){
    var obj = {
      "id":$stateParams.id
    }
    userService.manageUser(obj,'get').then(function(pRes) {
      if(pRes.status == 200){
        $scope.userDetails = pRes.data.data[0];
        console.log($scope.userDetails);
      }
    },
    function(err) {
      console.log(">>>>>>>>>>>>>   ",err);
    })
  }
  /*******************************************************/
  /*************This is use for delete user***************/
  /*******************************************************/
  $scope.deleteUser = function(id){
    var obj = {
      "id":id
    }
    userService.manageUser(obj,'delete').then(function(pRes) {
      if(pRes.status == 200){
        $scope.getUserList();
      }
    },
    function(err) {
      console.log(">>>>>>>>>>>>>   ",err);
    })
  }
  /*******************************************************/
  /*************This is use for change user status********/
  /*******************************************************/
  $scope.changeStatus = function(id,status,index){
    var obj = {
      "id":id,
      "status":status
    }
    userService.manageUser(obj,'update').then(function(pRes) {
      console.log(pRes);
      if(pRes.status == 200){
        $scope.userList[index].status = status.toString();
      }
    },
    function(err) {
      console.log(">>>>>>>>>>>>>   ",err);
    })
  }
  /*******************************************************/
  /***********This is use for update user details*********/
  /*******************************************************/
  $scope.updateUser = function(){
    var obj = {
      "id":$scope.userDetails.id,
      "first_name":$scope.userDetails.first_name,
      "last_name":$scope.userDetails.last_name,
      "email":$scope.userDetails.email,
      "mobile":$scope.userDetails.mobile,
    }
    userService.updateUser(obj,'update').then(function(pRes) {
      console.log(pRes);
      if(pRes.status == 200){
        console.log('yes');
      }
    },
    function(err) {
      console.log(">>>>>>>>>>>>>   ",err);
    })
  }
  /*******************************************************/
  /*************This is use for add new user**************/
  /*******************************************************/
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
