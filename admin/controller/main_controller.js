app.controller("Main_Controller",function($scope,$rootScope,$state,$localStorage,userService,Util){
  /*******************************************************/
  /*************This is use for check user login**********/
  /*******************************************************/
  $scope.getUseDetails = function(){
    if(localStorage.getItem('accessToken')){
      $scope.is_loggedin = true;
      $rootScope.user_type = localStorage.getItem('userType');
      console.log($rootScope.user_type);
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
        $rootScope.user_type = pRes.data.data[0].user_type;
        console.log(pRes.data.data[0]);
        localStorage.setItem('accessToken',pRes.data.data[0].token);
        localStorage.setItem('userType',pRes.data.data[0].user_type);
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
    userService.logout(localStorage.getItem('accessToken')).then(function(pRes) {
      if(pRes.status == 200){
        console.log(pRes.data.message);
        $scope.is_loggedin = false;
        localStorage.setItem('accessToken','');
        $state.go("login");
      }
    },
    function(err) {
      console.log(">>>>>>>>>>>>>   ",err);
    })
  }
});
app.controller("userController",function($scope,$state,$localStorage,userService,$stateParams,Util){
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
      if(pRes.status == 200){
        $scope.userList[index].status = status.toString();
      }
    },
    function(err) {
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
    userService.manageUser(obj,'update').then(function(pRes) {
      if(pRes.status == 200){
        Util.alertMessage('success', pRes.data.message);
      }
    },
    function(err) {
      Util.alertMessage('danger', pRes.data.message);
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
  /*******************************************************/
  /*************This is use for add new user**************/
  /*******************************************************/
  $scope.currentTab = 'myprofile';
  $scope.changeTab = function(tab){
    $scope.currentTab = tab;
  }
  /*******************************************************/
  /*************This is use for add new user**************/
  /*******************************************************/
  $scope.currentTab = 'myprofile';
  $scope.checkCurrentPassword = function(pwd){
    console.log(pwd);
    var obj = {
      "token":localStorage.getItem('accessToken'),
      "password":pwd
    }
    userService.checkPassword(obj).then(function(pRes) {
      console.log(pRes);
      $scope.is_correct_pwd = (pRes.data.statusCode == 200) ? true : false;
    },function(err) {
      console.log(">>>>>>>>>>>>>   ",err);
    })
  }
});
app.controller("BuildingPlanController",function($scope,$rootScope,$state,$localStorage,userService){
  console.log($rootScope.user_type);
});
