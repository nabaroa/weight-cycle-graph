// Food Composition Graph

var svgFood = d3.select("#food");
var space = "50px";

d3.csv(
  "https://raw.githubusercontent.com/nabaroa/weight-cycle-graph/main/docs/data/composition-of-foods-test.csv",

  function (d) {
    return {
      code: "code-" + d.code,
      name: d.name,
      description: d.description,
      carbohydrate: d.carbohydrate,
      protein: d.protein,
      energy: d.energy,
      fat: d.fat,
      water: d.water,
    };
  },
  function (data) {
    var p = d3.scaleLinear().range([0, 1]);
    var p2 = d3.scaleLinear().range([0, 2]);
    svgFood
      .selectAll("dot")
      .data(data)
      .enter()
      .append("div")
      .attr("class", "food-element")
      .attr("id", function (d) {
        return d.code;
      });

    // Name
    d3.selectAll(".food-element")
      .append("p")
      .text(function (d) {
        return d.name;
      });

    // Description
    d3.selectAll(".food-element")
      .append("p")
      .attr("class", "color--k-5 nk-mbl text")
      .text(function (d) {
        return d.description;
      });

    // Energy
    d3.selectAll(".food-element")
      .append("svg")
      .attr("width", function (d) {
        return p(d.energy) + 100;
      })
      .attr("height", "20")
      .append("g")
      .attr("class", "energy-graph")
      .append("rect")
      .attr("width", function (d) {
        return p(d.energy);
      })
      .attr("height", "20")
      .attr("fill", "#b0b0b0");

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
        } else {
          return "Tr";
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

    //water
    d3.selectAll(".food-element")
      .append("svg")
      .attr("width", "100%")
      .attr("height", "20")
      .append("g")
      .attr("class", "water-graph")
      .append("rect")
      .attr("width", function (d) {
        return p(d.water);
      })
      .attr("height", "16")
      .attr("fill", "#72c0e5");

    // water text
    d3.selectAll(".water-graph")
      .append("text")
      .attr("x", function (d) {
        return p(d.water) + 10;
      })
      .attr("y", "16")
      .text(function (d) {
        return p(d.water) + " g";
      });

    // Quantity list
    d3.selectAll(".food-element")
      .append("button")
      .attr("class", "js-30 nk-mrm")
      .attr("type", "button")
      .attr("onclick", "show30g()")
      .text("30 g");

    // Quantity button functions

    // Quantity list
    d3.selectAll(".food-element")
      .append("button")
      .attr("class", "js-50 nk-mrm")
      .attr("type", "button")
      .text("50 g");

    // Quantity list
    d3.selectAll(".food-element")
      .append("button")
      .attr("class", "js-100 nk-mrm")
      .attr("type", "button")
      .text("100 g");

    // Quantity list
    d3.selectAll(".food-element")
      .append("button")
      .attr("class", "js-150 nk-mrm")
      .attr("type", "button")
      .text("150 g");
  },
  function show30g() {
    var element = document.getElementById(d.code);
    element.classList.add("show-30g");
  }
);
