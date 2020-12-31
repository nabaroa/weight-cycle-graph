// I am using https://www.d3-graph-gallery.com/index.html

var data1 = [
  { date: 1, kilos: 56.1, cycle: 0, swimming: 0 },
  { date: 2, kilos: 55.5, cycle: 0, swimming: 5 },
  { date: 3, kilos: 56.2, cycle: 5, swimming: 5 },
  { date: 4, kilos: 56.2, cycle: 15, swimming: 5 },
  { date: 5, kilos: 56.8, cycle: 10, swimming: 5 },
  { date: 6, kilos: 55.4, cycle: 5, swimming: 5 },
  { date: 7, kilos: 55.7, cycle: 0, swimming: 0 },
  { date: 8, kilos: 56.1, cycle: 0, swimming: 5 },
  { date: 9, kilos: 55.8, cycle: 0, swimming: 0 },
  { date: 10, kilos: 55.3, cycle: 0, swimming: 0 },
  { date: 11, kilos: 55.9, cycle: 0, swimming: 5 },
  { date: 12, kilos: 55.5, cycle: 0, swimming: 0 },
  { date: 13, kilos: 55.5, cycle: 0, swimming: 5 },
  { date: 14, kilos: 56.2, cycle: 0, swimming: 0 },
  { date: 15, kilos: 55.6, cycle: 0, swimming: 5 },
  { date: 16, kilos: 55.9, cycle: 0, swimming: 0 },
  { date: 17, kilos: 55.6, cycle: 0, swimming: 5 },
  { date: 18, kilos: 55.7, cycle: 0, swimming: 0 },
  { date: 19, kilos: 55.7, cycle: 0, swimming: 5 },
  { date: 20, kilos: 54.9, cycle: 0, swimming: 0 },
  { date: 21, kilos: 55.4, cycle: 0, swimming: 5 },
  { date: 22, kilos: 56.1, cycle: 0, swimming: 0 },
  { date: 23, kilos: 55.3, cycle: 0, swimming: 5 },
  { date: 24, kilos: 55.5, cycle: 0, swimming: 0 },
  { date: 25, kilos: 55.5, cycle: 0, swimming: 0 },
  { date: 26, kilos: 56.4, cycle: 0, swimming: 5 },
  { date: 27, kilos: 56.4, cycle: 0, swimming: 0 },
  { date: 28, kilos: 56.4, cycle: 0, swimming: 5 },
  { date: 29, kilos: 55.3, cycle: 0, swimming: 0 },
  { date: 30, kilos: 55.1, cycle: 0, swimming: 5 },
  { date: 31, kilos: 55.4, cycle: 5, swimming: 0 },
];

var margin = { top: 10, right: 30, bottom: 70, left: 50 },
  width = 800 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

var svg = d3
  .select("#graph")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleLinear().range([0, width]);
var xAxis = d3.axisBottom().scale(x);
svg
  .append("g")
  .attr("transform", "translate(0," + height + ")")
  .attr("class", "myXaxis");

var y = d3.scaleLinear().range([height, 0]);
var yAxis = d3.axisLeft().scale(y);
svg.append("g").attr("class", "myYaxis");

var z = d3.scaleLinear().range([0, 1]);

function showGraph(data) {
  x.domain([
    1,
    d3.max(data, function (d) {
      return d.date;
    }),
  ]);
  svg.selectAll(".myXaxis").call(xAxis);

  y.domain([
    52,
    d3.max(data, function (d) {
      return d.kilos;
    }),
  ]);
  svg.selectAll(".myYaxis").call(yAxis);

  var show = svg.selectAll(".lineTest").data([data], function (d) {
    return d.date;
  });

  show
    .enter()
    .append("path")
    .attr(
      "d",
      d3
        .line()
        .x(function (d) {
          return x(d.date);
        })
        .y(function (d) {
          return y(d.kilos);
        })
    )
    .attr("fill", "none")
    .attr("stroke", "grey")
    .attr("stroke-width", 1);

  // menstrual cycle tracking
  svg
    .append("g")
    .selectAll("dot")
    .data(data1)
    .enter()
    .append("circle")
    .attr("cx", function (d) {
      return x(d.date);
    })
    .attr("cy", function (d) {
      return y(d.kilos);
    })
    .attr("r", function (d) {
      return z(d.cycle);
    })
    .attr("fill", "red");

  // Top limit line
  svg
    .append("g")
    .selectAll("dot")
    .data(data1)
    .enter()
    .append("line")
    .attr("x1", "0")
    .attr("y1", "13.5%")
    .attr("x2", "100%")
    .attr("y2", "13.5%")
    .attr("fill", "none")
    .attr("stroke", "red")
    .attr("stroke-width", "1")
    .attr("stroke-dasharray", "4 10");

  // Bottom limit line
  svg
    .append("g")
    .selectAll("dot")
    .data(data1)
    .enter()
    .append("line")
    .attr("x1", "0")
    .attr("y1", "63.5%")
    .attr("x2", "100%")
    .attr("y2", "63.5%")
    .attr("fill", "none")
    .attr("stroke", "green")
    .attr("stroke-width", "1")
    .attr("stroke-dasharray", "4 10");

  // swimming tracking
  svg
    .append("g")
    .selectAll("dot")
    .data(data1)
    .enter()
    .append("circle")
    .attr("cx", function (d) {
      return x(d.date);
    })
    .attr("cy", "350")
    .attr("r", function (d) {
      return z(d.swimming);
    })
    .attr("fill", "blue");
}

showGraph(data1);
