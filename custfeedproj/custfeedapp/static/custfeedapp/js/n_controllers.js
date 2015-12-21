
var officeControllers = angular.module('officeControllers', []);

/*
officeControllers.controller('OfficeListCtrl', ['$scope', '$http',
  function ($scope, $http) {
	  		$http.get("/custfeedapp/api/offices.json").success(function (response) {
			$scope.offices = response;
    });

    $scope.orderProp = 'id';
  }]);
*/

officeControllers.controller('OfficeListCtrl', ['$scope', 'Office',
  function ($scope, Office) {
			$scope.offices = Office.query();
			$scope.orderProp = 'id';
  }]);



officeControllers.controller('OfficeDetailCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {

		$http.get("/custfeedapp/api/resources.json?office=" + $routeParams.officeId).success(function (response) {
		$scope.resources = response;

	});
  }]);


officeControllers.controller('EvaluationCtrl', ['$scope', '$routeParams', '$http', 'Evaluation',
  function($scope, $routeParams, $http, Evaluation) {

		$http.get("/custfeedapp/api/resources.json?id=" + $routeParams.EvaluationId).success(function (response) {
		$scope.testthis = response;
		$scope.formData = {};
		$scope.formData = {"resource":$routeParams.EvaluationId};
		});

		$scope.submitEvaluation = function(form) {
			alert(form);
			var evaluation = new Evaluation(form[0][0]);
//			var evaluation = new Evaluation({"resource":"1", "grade":"1", "comments":"testme"});
			
		    evaluation.$save(function(){
		    });
//			$scope.formData = {};
		}

/*
	  $scope.submitEvaluation = function(text) {
//	    var evaluation = new Evaluation({text: text});
	    var evaluation = new Evaluation({comment: comment});
	    tweet.$save(function(){
//	      $scope.tweets.unshift(tweet);
	    });
	 }
*/


  }]);
