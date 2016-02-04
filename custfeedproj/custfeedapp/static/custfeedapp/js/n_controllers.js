
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

officeControllers.controller('DashboardCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
		$http.get("/custfeedapp/api/topemployees.json?limit=5").success(function (response) {
		$scope.topEmployees = response;
		
		
		
		
		function topBottomEmployees(restLink, chartName){

		var barHeight = 40,
			width = barHeight*7;			
//			spaceForLabels = 40;
			
		var color = d3.scale.ordinal()
		    .range(["#88C700", "#012877"])
			.domain(["Average", "Remaining"]);
		
		//Make Dynamic	
//		d3.json("/custfeedapp/api/topemployees.json?limit=5", function(error, rawdata) {
		d3.json(restLink, function(error, rawdata) {
			

			var data = rawdata['results'];
			
			data.forEach(function(d) {
			  d.ages = [{name: 'Average', population: +d.get_grades.avg_grades}
						,{name: 'Remaining', population: 5 -d.get_grades.avg_grades}];
			});

			
			
			var numRows = data.length;
				radius = Math.min(barHeight) / 2;
		
			var arc = d3.svg.arc()
			    .outerRadius(radius)
			    .innerRadius(radius/1.5);
			
			var pie = d3.layout.pie()
			    .sort(null)
			    .value(function(d) { return d.population; });			
			
			
			//Make Dyanamic			
//			var chart = d3.select(".topEmployees")
			var chart = d3.select(chartName)
			    .attr("width", width)
				.attr("height", barHeight * numRows);

			var row = chart.selectAll("g")
			    .data(data)
				.attr("class", "piechart")			    
			    .enter().append("g")
			    .attr("transform", function(d, i) { 
								return "translate(" + barHeight*3 + "," + (i === 0 ? .5 * barHeight : (i+.5)* barHeight)  + ")"; });


		  var g = row.selectAll(".arc")
			      .data(function(d) { return pie(d.ages); })
			    .enter().append("path")
			      .attr("class", "arc")
			      .attr("d", arc)
			      .style("fill", function(d) { return color(d.data.name); });
		
				 row.append("text")
				      .attr("dy", ".35em")
				      .style("text-anchor", "middle")
				      .text(function(d) { return Math.round(d.get_grades.avg_grades * 10) / 10; });
		
			//Put in labels		
			var rowText = chart.selectAll(".label")
			    .data(data)
			    .enter().append("g")
				.attr("class", "label")
			    .attr("transform", function(d, i) { 
								return "translate(" + barHeight/8 + "," + (i === 0 ? barHeight/2 : ((i+.5)* barHeight))  + ")"; });

			var LabelText = rowText.append("text")
			  .attr("class", "name")
//			  .text(function(d){return  d.first_name + " " + d.last_name ;})
		      .attr("y", 0)
			  .attr("x", 0)
		      .attr("dy", ".35em")
			 
			 LabelText.append("tspan")
				.attr("class", "empName")
				.attr("dy", "-.5em")
				.text(function(d){return  d.first_name + " " + d.last_name ;});

			 LabelText.append("tspan")
				.attr("class", "empPosition")
				.attr("dy", "1.2em")
				.attr("x", "0")
				.attr("text-align", "left")
				.text(function(d){return  d.position ;});
				



			//Put in Bars
			var x = d3.scale.linear()
			    .range([0, barHeight*2])
				.domain([0, d3.max(data, function(d) { return d.get_grades.count_grades; })]);
		
		  	var bar = chart.selectAll(".bar")
		      .data(data)
		      .enter().append("g")
			  .attr("class", "bar")
		      .attr("transform", function(d, i) { return "translate(" + barHeight*4 + "," + i * barHeight + ")"; });

			  bar.append("rect")
			      .attr("width", function(d) { return x(d.get_grades.count_grades); })
			      .attr("height", barHeight - 5);
 		
			  bar.append("text")
			      .attr("x", function(d) { return x(d.get_grades.count_grades)+1; })
			      .attr("y", barHeight / 2)
			      .attr("dy", ".35em")
				  .attr("class", "label")
			      .text(function(d) { return d.get_grades.count_grades; });


				})

			} //End Function
			
		    topBottomEmployees("/custfeedapp/api/topemployees.json?limit=5", ".topEmployees");	
			
		    topBottomEmployees("/custfeedapp/api/topemployees.json?limit=5", ".bottomEmployees");	
			
			
			function trendReport(){
				
				var margin = {top: 20, right: 20, bottom: 30, left: 50},
				    width = 400 - margin.left - margin.right,
				    height = 200 - margin.top - margin.bottom;


				var formatDate = d3.time.format("%Y-%m-%d");
				
				var x = d3.time.scale()
					.range([0, width]);

//					.rangeRoundBands([0, width], .1);

				var y = d3.scale.linear()
				    .range([height, 0]);

				var y2 = d3.scale.linear()
				    .range([height, 0]);	

				var xAxis = d3.svg.axis()
				    .scale(x)
				    .orient("bottom")
					.ticks(3);

				var yAxis = d3.svg.axis()
				    .scale(y)
				    .orient("left")
					.ticks(5);

				var yAxisRight = d3.svg.axis()
				    .scale(y2)
				    .orient("right");

				
				var line = d3.svg.line()
				    .x(function(d) { 
						return x(d.dateConv); 
						})
				    .y(function(d) { return y(d.values.avg_grade); });

				var line2 = d3.svg.line()
				    .x(function(d) { 
						return x(d.dateConv); 
						})
				    .y(function(d) { return y2(d.values.cnt_grade); });

					

				var svg = d3.select(".trendReport")
				    .attr("width", width + margin.left + margin.right)
				    .attr("height", height + margin.top + margin.bottom)
				  .append("g")
				    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
			
//				var svg = d3.select(".trendReport").append("svg")
//				    .attr("width", width + margin.left + margin.right)
//				    .attr("height", height + margin.top + margin.bottom)
//				  .append("g")
//				    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		
				
				d3.json("/custfeedapp/api/evaluations.json",   function(error, data) {
					if (error) throw error;
					

					data.forEach(function(d) {
					  d.convDate = d.datecreated.substring(0,10);//formatDate.parse(d.datecreated.substring(0,10));
					});



					var data2 = d3.nest()
					  .key(function(d) { 
										return formatDate.parse(d.convDate)//d.convDate//Date(formatDate.parse(d.datecreated.substring(0,10))); 
										})
					  .rollup(function(v) { return {"cnt_grade": v.length,
													"sum_grade": d3.sum(v, function(v) {return v.grade;}),
													"avg_grade": d3.mean(v, function(v) {return v.grade;})
										  } 
										})
					  .entries(data);
					
					data2.forEach(function(d) {
					  d.dateConv = new Date(d.key);
					});
					
					
	//			    var parseTime = d3.time.format("%Y%m%d");
	
					
				  xMin = d3.min(data2, function(element) {
			        time = new Date(element.dateConv);
//					console.log(time);
			        time.setDate(time.getDate() - 1);
			        return time
			      });

		
			      xMax = d3.max(data2, function(element2) {
			        time2 = new Date(element2.dateConv);
			        time2.setDate(time2.getDate() + 1);
			        return time2
			      });
		
					console.log(xMin);
					console.log(xMax);
					
					
					  x.domain([xMin, xMax])
					  y.domain([1,5]);
					  y2.domain([0, d3.max(data2, function(d) { return d.values.cnt_grade; })]);



					
					  svg.append("g")
					      .attr("class", "x axis")
					      .attr("transform", "translate(0," + height + ")")
					      .call(xAxis);
					
					 svg.append("g")
					      .attr("class", "y axis")
					      .call(yAxis)
					    .append("text")
					      .attr("transform", "rotate(-90)")
					      .attr("y", 6)
					      .attr("dy", ".71em")
					      .style("text-anchor", "end")
					      .text("Grade");


   				   svg.append("g")				
				        .attr("class", "y axis")	
				        .attr("transform", "translate(" + (width - 4) + " ,0)")	
				        .style("fill", "black")		
				        .call(yAxisRight)
					    .append("text")
					      .attr("transform", "rotate(-90)")
					      .attr("y", -15)
					      .attr("dy", ".71em")
					      .style("text-anchor", "end")
					      .text("Count");

					  svg.append("path")
					      .datum(data2)
					      .attr("class", "line")
					      .attr("d", line);

//					  svg.append("path")
//					      .datum(data2)
//						  .style("stroke", "red")
//					      .attr("class", "line2")
//					      .attr("d", line2);
					
					
					var barWidth = width / (data2.length + 2)
					
					 svg.selectAll(".bar")
					      .data(data2)
					    .enter().append("rect")
					      .attr("class", "bar")
						  .attr("fill-opacity", ".08")
					      .attr("x", function(d) { return x(d.dateConv)-barWidth/2; })
					      .attr("width", barWidth)
					      .attr("y", function(d) { return y2(d.values.cnt_grade); })
					      .attr("height", function(d) { return height - y2(d.values.cnt_grade); });
					
					
//					alert('stop');
					
				});				

//			function type(d) {
//				  d.datecreatednew = d.datecreated.substring(0,10)
//				  d.close = +d.close;
//				  return d;
//				}

			}

			trendReport();
		
		
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