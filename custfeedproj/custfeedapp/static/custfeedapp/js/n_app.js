var propsApp = angular.module('propsApp', [
	'ngRoute',
	'officeControllers'
]);


propsApp.config(['$routeProvider', '$interpolateProvider',
	function($routeProvider, $interpolateProvider) {

    $interpolateProvider.startSymbol('[[').endSymbol(']]');

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