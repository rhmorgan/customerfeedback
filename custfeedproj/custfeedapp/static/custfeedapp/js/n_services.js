angular.module('custfeedappServices', ['ngResource'])
  .factory('Evaluation', function($resource) {
    return $resource('custfeedapp/api/evaluations/'); 
  })
  .factory('Office', function($resource) {
    return $resource('custfeedapp/api/offices/:id/'); 
  })
  .factory('User', function($resource) {
    return $resource('/api/users/:id/'); 
  });
