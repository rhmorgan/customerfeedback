
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

			var width = 350,
			    barHeight = 20;
				spaceForLabels = 150
			
			
			var x = d3.scale.linear()
			    .range([0, width-spaceForLabels]);

			var chart = d3.select(".chart")
			    .attr("width", width);

				d3.json("/custfeedapp/api/evaluations.json?owner="+ AuthUser.id, function(error, rawdata) {
					
//					b = [{key:"0", values:0}, {key:"1", values:0}, {key:"2", values:0}, {key:"3", values:0}, {key:"4", values:0}, {key:"5", values:0}]
					//Ensure we have bars for each option
					var initialdata = [];
					var i;
					for (i = 1; i < 6; i++) {
					    initialdata.push({key:i, values:0});
					}
					
					var data = d3.nest()
					  .key(function(d) { return d.grade; })
					  .rollup(function(v) { return v.length; })
					  .entries(rawdata);

					data = data.concat(initialdata)

					data = d3.nest()
							.key(function(d){return d.key;})
							.rollup(function(d){
								return d3.sum(d, function(g) {return g.values; });
							}).entries(data);



					console.log('rhodri')
					console.log(JSON.stringify(data));

				  x.domain([0, d3.max(data, function(d) { return d.values; })]);
//				  console.log(d3.max(data, function(d) { return d.values; }))

			  	  chart.attr("height", barHeight * data.length);
//				  console.log(barHeight * data.length)
//				  $scope.reviewCount = d3.max(data, function(d) { return d.values; })
				  console.log(d3.max(data, function(d) { return d.values; }))
					
					
	   			  var bar = chart.selectAll("g")
				      .data(data)
				    .enter().append("g")
				      .attr("transform", function(d, i) { return "translate(" + spaceForLabels + "," + i * barHeight + ")"; });
//				  console.log(function(d, i) { return "translate(0," + i * barHeight + ")"; })

				  bar.append("rect")
				      .attr("width", function(d) { return x(d.values); })
				      .attr("height", barHeight - 1);

				  bar.append("text")
				      .attr("x", function(d) { return x(d.values)  - 3; })
				      .attr("y", barHeight / 2)
				      .attr("dy", ".35em")
					  .attr("class", "label")
				      .text(function(d) { return d.values; });
				
				  bar.append("text")
					  .attr("class", "y-axis")
					  .text(function(d){return d.key; 		})
				      .attr("y", barHeight / 2)
					  .attr("x", -10)
				      .attr("dy", ".35em");
				
/*				
				bar.append("svg:text").
				  attr("x", function(datum, index) { return x(index) + barWidth; }).
				  attr("y", height).
				  attr("dx", -barWidth/2).
				  attr("text-anchor", "middle").
				  attr("style", "font-size: 12; font-family: Helvetica, sans-serif").
				  text(function(datum) { return datum.year;}).
				  attr("transform", "translate(0, 18)").
				  attr("class", "yAxis");
*/				

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