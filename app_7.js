// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 500;

// Define the chart's margins as an object
var margin = {
  top: 60,
  right: 60,
  bottom: 60,
  left: 60
};

// Define dimensions of the chart area
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// Select body, append SVG area to it, and set its dimensions
var svg = d3.select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Load data from test.csv
d3.csv("test.csv", function(error, testData) {

  // Throw an error if one occurs
  if (error) throw error;

  // Print the Data
  console.log(testData);

let dataPoints = testData.map(function(d) {
         d.x = +d.x;
         d.y = +d.y;
         d.weights = +d.weights;
         return [d.x, d.y, d.weights];
         

});


var ar = [];
var total = 0;
for (var i = 0; i < dataPoints.length; i++) {
  score = (dataPoints[i][1] * dataPoints[i][2])
  ar.push(score);
  console.log(score);
}
console.log(ar);
var s = 0;
for(var i=0; i<ar.length; i++) {
  s += ar[i];

}
console.log(s);

var x = d3.scaleLinear()
    .rangeRound([0, chartWidth]);

var y = d3.scaleLinear()
    .rangeRound([chartHeight, 0]);

var xAxis = d3.axisBottom(x),
    yAxis = d3.axisLeft(y);

var line = d3.line()
    .x(function(d) { return x(d[0]); })
    .y(function(d) { return y(d[1]); });

// Line generator for constant data
var line2 = d3.line()
    .x(function(d) { return x(d[0]); })
    .y(function(d) { return y(s);   });

      //console.log(ar);
      //console.log(s);

    let drag = d3.drag()
    .on('start', dragstarted)
    .on('drag', dragged)
    .on('end', dragended);
    
svg.append('rect')
.attr('class', 'zoom')
.attr('cursor', 'move')
.attr('fill', 'none')
.attr('pointer-events', 'all')
.attr('width', chartWidth)
.attr('height', chartHeight)
.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

var focus = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

x.domain(d3.extent(dataPoints, function(d) { return d[0]; }));
y.domain(d3.extent(dataPoints, function(d) { return d[1]; }));

focus.append("path")
.datum(dataPoints)
.attr("fill", "none")
.attr("stroke", "steelblue")
.attr("stroke-linejoin", "round")
.attr("stroke-linecap", "round")
.attr("stroke-width", 1.5)
.attr("d", line);

focus.append("path")
.datum(dataPoints)
.attr("id","p2")
.attr("fill", "none")
.attr("stroke", "red")
.attr("stroke-linejoin", "round")
.attr("stroke-linecap", "round")
.attr("stroke-width", 1.5)
.attr("d", line2);


focus.selectAll('circle')
.data(dataPoints)
.enter()
.append('circle')
.attr('r', 5.0)
.attr('cx', function(d) { 
  
  return x(d[0]);  })
.attr('cy', function(d) { return y(d[1]); })
.style('cursor', 'pointer')
.style('fill', 'steelblue');

focus.selectAll('circle')
    .call(drag);
    
focus.append('g')
.attr('class', 'axis axis--x')
.attr('transform', 'translate(0,' + chartHeight + ')')
.call(xAxis);

focus.append('g')
.attr('class', 'axis axis--y')
.call(yAxis);

function dragstarted(d) {
d3.select(this).raise().classed('active', true);
}

function dragged(d) {
d[0] = x.invert(d3.event.x);
d[1] = y.invert(d3.event.y);

d3.select(this)
    .attr('cx', x(d[0]))
    .attr('cy', y(d[1]))
focus.select('path').attr('d', line);


      
}


function dragended(d) {

    d[0] = x.invert(d3.event.x);
    d[1] = y.invert(d3.event.y);
    
    //x = x.invert(d[0]);
    //y = y.invert(d[1]);
    //console.log(x);
    //console.log(y);
    //d3.select(x).dataPoints;
    console.log(dataPoints)
    //return dataPoints;
    
    var ar1 = [];
    var total1 = 0;
    for (var i = 0; i < dataPoints.length; i++) {
    score1 = (dataPoints[i][1] * dataPoints[i][2])
    ar1.push(score1);
    //console.log(score1);
}
    //console.log(ar1);
    var s1 = 0;
    for(var i=0; i<ar1.length; i++) {
    s1 += ar1[i];
}
console.log(s1);

//console.log(line2);
//d3.select("path").style("stroke", "red").remove();

// Line generator for constant data
var line2 = d3.line()
    .x(function(d) { return x(d[0]); })
    .y(function(d) { return y(s1);   });

    //d3.selectAll("path").attr('d', line2);
    //focus.select('path').attr('d', line2);
    //focus.select("path").attr("stroke-width", 1.5).attr("d", line2);
    focus.select("#p2").attr("d",line2);



d3.select(this).classed('active', false);
}



});






