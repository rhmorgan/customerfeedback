var propsApp = angular.module('propsApp', [
	'ngRoute',
	'officeControllers',
	'custfeedappServices'
]);


propsApp.config(['$routeProvider', '$interpolateProvider', '$resourceProvider',  '$httpProvider', 
	function($routeProvider, $interpolateProvider, $resourceProvider,  $httpProvider) {

    $interpolateProvider.startSymbol('[[').endSymbol(']]');

    // CSRF Support
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

    // This only works in angular 3!
    // It makes dealing with Django slashes at the end of everything easier.
    $resourceProvider.defaults.stripTrailingSlashes = false;


    $routeProvider.
      when('/offices', {
        templateUrl: 'static/custfeedapp/partials/n_office-list.html',
        controller: 'OfficeListCtrl'
      }).
      when('/offices/:officeId', {
        templateUrl: 'static/custfeedapp/partials/n_office-detail.html',
        controller: 'OfficeDetailCtrl'
      }).
      when('/evaluation/:EvaluationId', {
        templateUrl: 'static/custfeedapp/partials/n_evaluation.html',
        controller: 'EvaluationCtrl'
      }).
      otherwise({
        redirectTo: '/offices'
      });



  }]);