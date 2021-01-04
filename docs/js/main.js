// set the dimensions and margins of the graph
var margin = { top: 10, right: 30, bottom: 180, left: 60 },
  width = 900 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3
  .select("#graph")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//Read the data
d3.csv(
  "https://raw.githubusercontent.com/nabaroa/weight-cycle-graph/main/docs/data.csv?v=2",

  // When reading the csv, I must format variables:
  function (d) {
    return {
      date: d3.timeParse("%Y-%m-%d")(d.date),
      kilos: d.kilos,
      cycle: d.cycle,
      swimming: d.swimming,
      yoga: d.yoga,
      walking: d.walking,
      headache: d.headache,
      healthyfood: d.healthyfood,
    };
  },
  // Now I can use this dataset:
  function (data) {
    // Add X axis --> it is a date format
    var x = d3
      .scaleTime()
      .domain(
        d3.extent(data, function (d) {
          return d.date;
        })
      )
      .range([0, width]);
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear().domain([52, 57]).range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    // Add the kilos line
    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#69b3a2")
      .attr("stroke-width", 1.5)
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
      );
    // Add the menstrual cycle points
    var z = d3.scaleLinear().range([0, 1]);
    svg
      .append("g")
      .selectAll("dot")
      .data(data)
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
      .attr("fill", "#bb2a5c");

    // Top limit line
    svg
      .append("g")
      .selectAll("dot")
      .data(data)
      .enter()
      .append("line")
      .attr("x1", "0")
      .attr("y1", "10.5%")
      .attr("x2", "100%")
      .attr("y2", "10.5%")
      .attr("fill", "none")
      .attr("stroke", "#bb2a5c")
      .attr("stroke-width", "1")
      .attr("stroke-dasharray", "4 10");

    // Bottom limit line
    svg
      .append("g")
      .selectAll("dot")
      .data(data)
      .enter()
      .append("line")
      .attr("x1", "0")
      .attr("y1", "42%")
      .attr("x2", "100%")
      .attr("y2", "42%")
      .attr("fill", "none")
      .attr("stroke", "green")
      .attr("stroke-width", "1")
      .attr("stroke-dasharray", "4 10");

    // swimming tracking
    svg
      .append("g")
      .attr("class", "swimming")
      .text("sd")
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", function (d) {
        return x(d.date);
      })
      .attr("cy", "310")
      .attr("r", function (d) {
        return z(d.swimming);
      })
      .attr("fill", "#6db5ba");

    // yoga tracking
    svg
      .append("g")
      .attr("class", "yoga")
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", function (d) {
        return x(d.date);
      })
      .attr("cy", "340")
      .attr("r", function (d) {
        return z(d.yoga);
      })
      .attr("fill", "#e5cc70");

    // walking tracking
    svg
      .append("g")
      .attr("class", "walking")
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", function (d) {
        return x(d.date);
      })
      .attr("cy", "280")
      .attr("r", function (d) {
        return z(d.walking);
      })
      .attr("fill", "#ccc");

    // headache tracking
    svg
      .append("g")
      .attr("class", "headache")
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", function (d) {
        return x(d.date);
      })
      .attr("cy", "370")
      .attr("r", function (d) {
        return z(d.headache);
      })
      .attr("fill", "black");

    // healthyfood tracking
    svg
      .append("g")
      .attr("class", "healthyfood")
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", function (d) {
        return x(d.date);
      })
      .attr("cy", "250")
      .attr("r", function (d) {
        return z(d.healthyfood);
      })
      .attr("fill", "green");
  }
);
