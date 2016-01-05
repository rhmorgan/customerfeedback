
var officeControllers = angular.module('officeControllers', []);

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


officeControllers.controller('CompleteCtrl', ['$scope', 'Office', 'User', 'AuthUser',
  function ($scope, Office, User, AuthUser) {

//d3.json("/custfeedapp/api/evaluations.json?owner=" + AuthUser.id).success{alert('successme')}

//			d3.json("/custfeedapp/api/evaluations.json?owner=" + AuthUser.id, function(data) {
//			  console.log(data[0]);
			
//			$scope.reviewCount = 10

			var width = 420,
			    barHeight = 20;

			var x = d3.scale.linear()
			    .range([0, width]);

			var chart = d3.select(".chart")
			    .attr("width", width);

				d3.json("/custfeedapp/api/evaluations.json?owner="+ AuthUser.id, function(error, rawdata) {

					var data = d3.nest()
					  .key(function(d) { return d.grade; })
					  .rollup(function(v) { return v.length; })
					  .entries(rawdata);
//					console.log(JSON.stringify(data));

				  x.domain([0, d3.max(data, function(d) { return d.values; })]);
//				  console.log(d3.max(data, function(d) { return d.values; }))

			  	  chart.attr("height", barHeight * data.length);
//				  console.log(barHeight * data.length)
//				  $scope.reviewCount = d3.max(data, function(d) { return d.values; })
				  console.log(d3.max(data, function(d) { return d.values; }))
					
					
	   			  var bar = chart.selectAll("g")
				      .data(data)
				    .enter().append("g")
				      .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });
//				  console.log(function(d, i) { return "translate(0," + i * barHeight + ")"; })

				  bar.append("rect")
				      .attr("width", function(d) { return x(d.values); })
				      .attr("height", barHeight - 1);

				  bar.append("text")
				      .attr("x", function(d) { return x(d.values) - 3; })
				      .attr("y", barHeight / 2)
				      .attr("dy", ".35em")
				      .text(function(d) { return d.values; });

				});
			
	
			function type(d) {
			  d.value = +d.value; // coerce to number
			  return d;
			}

  }]);


officeControllers.controller('EvaluationCtrl', ['$scope', '$routeParams', '$http', 'Evaluation', '$location',
  function($scope, $routeParams, $http, Evaluation, $location) {

		$http.get("/custfeedapp/api/resources.json?id=" + $routeParams.EvaluationId).success(function (response) {
		$scope.testthis = response;
		$scope.formData = {};
		$scope.formData = {"resource":$routeParams.EvaluationId};
		});

		$scope.submitEvaluation = function(form) {
			var evaluation = new Evaluation(form[0][0]);
//			var evaluation = new Evaluation({"resource":"1", "grade":"1", "comments":"testme"});
			
		    evaluation.$save(function(){
				$location.path("/complete/"+evaluation.id);
				alert("ran code");
		    });
		}
  }]);

/*
officeControllers.controller('UserCtrl', function UserCtrl($scope, Tweet, User, AuthUser) {
  $scope.tweets = {};
  id = AuthUser.id;
  User.get({id:id}, function(response) {
    $scope.user = response;
    $scope.tweets = response.tweets;
  });
});
*/