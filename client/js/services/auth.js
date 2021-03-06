// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-getting-started-intermediate
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular
  .module('app')
  .factory('AuthService', ['Usuario', '$q', '$rootScope', '$state', function(
      Usuario, $q, $rootScope, $state) {
    function login(email, password) {
      return Usuario
        .login({email: email, password: password})
        .$promise
        .then(function(response) {
          $rootScope.currentUser = {
            id: response.user.id,
            tokenId: response.id,
            email: email
          };
        });
    }

    function logout() {
      return Usuario
       .logout()
       .$promise
       .then(function() {
         $rootScope.currentUser = null;
       });
    }

    function register(nombre, apellidos, email, password) {
      return Usuario
        .create({
          nombre: nombre,
          apellidos: apellidos,
          email: email,
          password: password
        })
        .$promise;
    }

    function refresh(accessTokenId) {
      return Usuario
        .getCurrent(function(userResource) {
          $rootScope.currentUser = {
            id: userResource.id,
            tokenId: accessTokenId,
            email: userResource.email
          };
        });
    }
    return {
      login: login,
      logout: logout,
      register: register,
      refresh: refresh
    };
  }]);
