// Food Composition Graph
var itemHeight = 40;

var svgFood = d3.select("#food"); // select the elements that have the class 'target'
var parent = d3.select(this.parentNode);

d3.csv(
  "https://raw.githubusercontent.com/nabaroa/weight-cycle-graph/main/docs/data/composition-of-foods-test.csv",

  function (d) {
    return {
      name: d.name,
      carbohydrate: d.carbohydrate,
      protein: d.protein,
      energy: d.energy,
      fat: d.fat,
    };
  },
  function (data) {
    // Add Y axis
    // var y = d3.scaleLinear().range([itemHeight, "+20"]);
    // svg.append("g").call(d3.axisLeft(y));

    var p = d3.scaleLinear().range([0, 5]);
    svgFood
      .selectAll("dot")
      .data(data)
      .enter()
      .append("div")
      .attr("class", "food-element")
      // .style("font-size", "16px")
      .append("p")
      .text(function (d) {
        return d.name;
      });

    // Energy
    d3.selectAll(".food-element")
      .append("svg")
      .attr("width", "100%")
      .attr("height", "20")
      .append("g")
      .attr("class", "energy-graph")
      .append("rect")
      .attr("width", function (d) {
        return p(d.energy);
      })
      .attr("height", "20")
      .attr("fill", "#666666");

    // Energy text
    d3.selectAll(".energy-graph")
      .append("text")
      .attr("x", function (d) {
        return p(d.energy) + 10;
      })
      .attr("y", "16")
      .text(function (d) {
        return p(d.energy) + " kcal";
      });

    //Protein
    d3.selectAll(".food-element")
      .append("svg")
      .attr("width", "100%")
      .attr("height", "20")
      .append("g")
      .attr("class", "protein-graph")
      .append("rect")
      .attr("width", function (d) {
        return p(d.protein);
      })
      .attr("height", "20")
      .attr("fill", "#c44f7a");

    // Protein text
    d3.selectAll(".protein-graph")
      .append("text")
      .attr("x", function (d) {
        return p(d.protein) + 10;
      })
      .attr("y", "16")
      .text(function (d) {
        return p(d.protein) + " g";
      });

    //carbohydrate
    d3.selectAll(".food-element")
      .append("svg")
      .attr("width", "100%")
      .attr("height", "20")
      .append("g")
      .attr("class", "carbohydrate-graph")
      .append("rect")
      .attr("width", function (d) {
        return p(d.carbohydrate);
      })
      .attr("height", "16")
      .attr("fill", "#5ca9ad");

    // carbohydrate text
    d3.selectAll(".carbohydrate-graph")
      .append("text")
      .attr("x", function (d) {
        return p(d.carbohydrate) + 10;
      })
      .attr("y", "16")
      .text(function (d) {
        if (d.carbohydrate != "Tr") {
          return p(d.carbohydrate) + " g";
        }
        else {
          return ("Traces of carbs")
        }
      });

    //fat
    d3.selectAll(".food-element")
      .append("svg")
      .attr("width", "100%")
      .attr("height", "20")
      .append("g")
      .attr("class", "fat-graph")
      .append("rect")
      .attr("width", function (d) {
        return p(d.fat);
      })
      .attr("height", "16")
      .attr("fill", "#d5ad26");

    // fat text
    d3.selectAll(".fat-graph")
      .append("text")
      .attr("x", function (d) {
        return p(d.fat) + 10;
      })
      .attr("y", "16")
      .text(function (d) {
        return p(d.fat) + " g";
      });

    svgFood;
    // .append("text")
    // .data(data)
    // .attr("x", "0")
    // .attr("y", "20")
    // .text("Food name")
    // .style("font-size", "20px");

    // Protein

    // svgFood
    //   .selectAll("dot")
    //   .data(data)
    //   .enter()
    //   .append("rect")
    //   .attr("x", function (d) {
    //     return p(d.protein);
    //   })
    //   .attr("y", "50")
    //   .attr("width", function (d) {
    //     return p(d.protein);
    //   })
    //   .attr("height", "50")
    //   .attr("fill", "#c44f7a");

    // svgFood
    //   .append("text")
    //   .attr("x", "20")
    //   .attr("y", "80")
    //   .text("prot")
    //   .style("font-size", "20px")
    //   .style("fill", "white");

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
