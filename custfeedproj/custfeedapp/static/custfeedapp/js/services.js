// Resources have the following methods by default:
// get(), query(), save(), remove(), delete()

angular.module('propsApp.services', ['ngResource'])
  .factory('Office', function($resource) {
    return $resource('/api/offices/:id/'); 
  })
  .factory('User', function($resource) {
    return $resource('/api/users/:id/'); 
  });
