
var officeControllers = angular.module('officeControllers', []);

officeControllers.controller('OfficeListCtrl', ['$scope', '$http',
  function ($scope, $http) {
	  		$http.get("/custfeedapp/api/offices.json").success(function (response) {
			$scope.offices = response;
    });

    $scope.orderProp = 'id';
  }]);

/*officeControllers.controller('OfficeDetailCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
    $scope.officeId = $routeParams.officeId;
  }]);
*/


officeControllers.controller('OfficeDetailCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {

		$http.get("/custfeedapp/api/resources.json?office=" + $routeParams.officeId).success(function (response) {
		$scope.resources = response;

	});
  }]);

officeControllers.controller('EvaluationCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {

		$http.get("/custfeedapp/api/resources.json?id=" + $routeParams.EvaluationId).success(function (response) {
		$scope.testthis = response;

	});
  }]);