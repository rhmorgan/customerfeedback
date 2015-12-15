var propsApp = angular.module('propsApp', [
	'ngRoute',
	'officeControllers'
]);

//propsApp.config(function($interpolateProvider) {
//  $interpolateProvider.startSymbol('[[');
//  $interpolateProvider.endSymbol(']]');
//});


propsApp.config(['$routeProvider',
  function($routeProvider, $interpolateProvider) {

	$interpolateProvider.startSymbol('[[');
	$interpolateProvider.endSymbol(']]');


    $routeProvider.
      when('/offices', {
        templateUrl: 'partials/office-list.html',
        controller: 'customersCtrl'
      }).
      when('/offices/:officeId', {
        templateUrl: 'partials/office-detail.html',
        controller: 'OfficeDetailCtrl'
      }).
      otherwise({
        redirectTo: '/offices'
      });
  }]);