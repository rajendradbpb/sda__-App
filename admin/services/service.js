app.factory("userService", function ($http,CONFIG) {
  return{
    login: function (data) {
      var _serializedData = $.param({"reqmethod": 'login', "user_name":data.username,"password":data.password});
      var response = $http({
          method: 'POST',
          url: CONFIG.HTTP_HOST,
          data : _serializedData,
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          }
      });
      return response;
    },
    logout: function (data) {
      var _serializedData = $.param({"reqmethod": 'logout', "token":data});
      var response = $http({
          method: 'POST',
          url: CONFIG.HTTP_HOST,
          data : _serializedData,
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          }
      });
      return response;
    },
    checkPassword: function (data) {
      console.log(data);
      var _serializedData = $.param({"reqmethod": 'checkPassword', "token":data.token,"password":data.password});
      var response = $http({
          method: 'POST',
          url: CONFIG.HTTP_HOST,
          data : _serializedData,
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          }
      });
      return response;
    },
    addUser: function (data) {
      console.log(data);
      var _serializedData = $.param({"reqmethod": 'register', "user_data":data});
      var response = $http({
          method: 'POST',
          url: CONFIG.HTTP_HOST,
          data : _serializedData,
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          }
      });
      return response;
    },
    getUserList: function () {
      var response = $http.get(CONFIG.HTTP_HOST+"/?reqmethod=getUsers");
      return response;
    },
    getUser: function (id) {
      var response = $http.get(CONFIG.HTTP_HOST+"/?reqmethod=getUserById&id="+id);
      return response;
    },
    manageUser: function (data,option) {
      var _serializedData = $.param({"reqmethod": 'user',"operation":option, "user_data":data});
      var response = $http({
          method: 'POST',
          url: CONFIG.HTTP_HOST,
          data : _serializedData,
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          }
      });
      return response;
    }
  }
});
