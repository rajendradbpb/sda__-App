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
      var _serializedData = $.param({"reqmethod": 'getUsers'});
      var response = $http({
          method: 'POST',
          url: CONFIG.HTTP_HOST,
          reqmethod : _serializedData,
      });
      return response;
    }
  }
});
