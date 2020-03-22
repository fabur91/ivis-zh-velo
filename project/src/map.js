// layout
const canvHeight = 800, canvWidth = 1200;
const layout = [
    {   "class" : "header",
        "columnStart" : 1,
        "columnEnd" :   3,
        "rowStart" :    1,
        "rowEnd" :      1},
    {   "class" : "map",
        "columnStart" : 1,
        "columnEnd" :   1,
        "rowStart" :    2,
        "rowEnd" :      2},
    {   "class" : "map-info",
        "columnStart" : 2,
        "columnEnd" :   2,
        "rowStart" :    2,
        "rowEnd" :      2},
    {   "class" : "progress",
        "columnStart" : 1,
        "columnEnd" :   2,
        "rowStart" :    3,
        "rowEnd" :      3},
];
const grid = d3.select("body").append("div")
    .attr('class', 'grid-container')
    .style('display', 'grid')
    .style('grid-template-columns', '1fr 1fr')
    .style('grid-template-rows', '25px auto');

const gridItems = grid.selectAll('div')
    .data(layout).enter()
    .append('div')
    .attr('class', d => d.class)
    .style('grid-column-start', d => d.columnStart)
    .style('grid-column-end', d => d.columnEnd)
    .style('grid-row-start', d => d.rowStart)
    .style('grid-row-en', d => d.rowEnd)
    .style('min-width', '0')
    .style('min-height', '0')
;

// create svg canvas
const svg = d3.select(".map").append("svg")
    .attr("width", 'auto')
    .attr("height", '100%')
    .attr("preserveAspectRatio", "xMidYMin slice")
    .attr('viewBox', '0 0 1200 800')
    .style('overflow', 'hidden');

const map = svg.append('image')
    .attr('xlink:href', './data/map_zh.svg')
    .attr("width", canvWidth)
    .attr("height", canvHeight)
    .style('display', 'block')
    .on("mousedown", function(d) {
        console.log(event.clientX);
        console.log(event.clientY);
    });

// calc the width and height depending on margins.
const margin = {top: 50, right: 80, bottom: 50, left: 60};
const width = canvWidth - margin.left - margin.right;
const height = canvHeight - margin.top - margin.bottom;

// // chart title
// svg.append("text")
//     .attr("y", 0)
//     .attr("x", margin.left)
//     .attr("dy", "1.5em")
//     .attr("font-family", "sans-serif")
//     .attr("font-size", "24px")
//     .style("text-anchor", "left")
//     .text("Zürich");

// create parent group and add left and top margin
const g = svg.append("g")
    .attr("id", "chart-area")
    .attr("transform", "translate(" +margin.left + "," + margin.top + ")");

var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .style("padding", "6px")
    .style("font-family", "sans-serif")
    .style("color", "white")
    .style("background-color", "#0066CC");

d3.csv("./data/velo_fuss_zh_zaehler_pro_jahr.csv").then(function(data) {
    const xDomain = d3.extent(data, e => Number(e.x));
    const yDomain = d3.extent(data, e => Number(e.y));

    // 1. create scales for x and y direction and for the color coding
    const xScale = d3.scaleLinear().domain(xDomain).rangeRound([0,width]);
    const yScale = d3.scaleLinear().domain(yDomain).rangeRound([height,0]);

    g.selectAll("circle") // this results in an empty selection
        .data(data) // which is joined with the data
        .enter() // and a selection of new elements is created
        .append("circle")
        .attr("cx", d => xScale(d.x)*0.33+295)
        .attr("cy", d => yScale(d.y)*0.55+105)
        .attr("r", d => d.Mean_VELO_IN)
        .style("fill", "BLACK")
        .on("mouseover", function(d){return tooltip.style("visibility", "visible").text(d.bezeichnung);})
        .on("mousemove", function(d){
            return tooltip
                .style("top", (d3.event.pageY-10)+"px")
                .style("left",(d3.event.pageX+10)+"px")
                .text(d.bezeichnung + '\n(' + Math.round(d.Mean_VELO_IN*4) + ' Velos pro Stunde)');})
        .on("mouseout", function(){return tooltip.style("visibility", "hidden");});
        // .append("svg:title")
        // .text(function(d) { return d.bezeichnung; });
});
