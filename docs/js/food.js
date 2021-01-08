// Food Composition Graph
var svgFood = d3
  .select("#food") // select the elements that have the class 'target'
  .append("svg")
  .attr("width", "900")
  .attr("height", "400");

d3.csv(
  "https://raw.githubusercontent.com/nabaroa/weight-cycle-graph/main/docs/data/composition-of-foods-test.csv",

  function (d) {
    return {
      carbohydrate: d.carbohydrate,
      protein: d.protein,
    };
  },
  function (data) {
    var p = d3.scaleLinear().range([0, 1]);

    svgFood
      .append("text")
      .data(data)
      .attr("x", "0")
      .attr("y", "20")
      .text("Food name")
      .style("font-size", "20px");

    // Protein
    
    svgFood
      .append("rect")
      .attr("x", "0")
      .attr("y", "50")
      .attr("width", function (d) {
        return p(d.protein);
      })
      .attr("height", "50")
      .attr("fill", "#c44f7a");

    svgFood
      .append("text")
      .attr("x", "20")
      .attr("y", "80")
      .text("prot")
      .style("font-size", "20px")
      .style("fill", "white");

    // carbohydrate
    svgFood
      .append("rect")
      .attr("x", "20%")
      .attr("y", "50")
      .attr("width", "20%")
      .attr("height", "50")
      .attr("fill", "#5ca9ad");

    svgFood
      .append("rect")
      .attr("x", "60%")
      .attr("y", "50")
      .attr("width", "40%")
      .attr("height", "50")
      .attr("fill", "#d5ad26");
  }
);

// console.log("sometext")

// //Read the data
// d3.csv(
//   "https://raw.githubusercontent.com/nabaroa/weight-cycle-graph/main/docs/data/composition-of-foods.csv",

//   // When reading the csv, I must format variables:
//   function (d) {
//     return {
//       Description: d.description,
//     };
//   },
