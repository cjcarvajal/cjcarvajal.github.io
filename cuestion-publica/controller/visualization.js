var svgAverage = d3.select("#principalAverage"),
    margin = { top: 20, right: 80, bottom: 30, left: 50 },
    chartWidth = svgAverage.attr("width") - margin.left - margin.right,
    chartHeight = svgAverage.attr("height") - margin.top - margin.bottom,
    averageG = svgAverage.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var commonXScale = d3.scaleTime().range([0, chartWidth]),
    averageY = d3.scaleLinear().range([chartHeight, 0]),
    averageZ = d3.scaleOrdinal(d3.schemeCategory10),
    financialY = d3.scaleLinear().range([chartHeight, 0]),
    financialZ = d3.scaleOrdinal(d3.schemeCategory10),
    congressY = d3.scaleLinear().range([chartHeight, 0]),
    congressZ = d3.scaleOrdinal(d3.schemeCategory10),
    lineConsecutiveId = 0;

commonXScale.domain([new Date("2011"), new Date("2018")]);

var svgCongress = d3.select("#principal"),
    congressG = svgCongress.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var svgFinancial = d3.select("#principalFinancial"),
    financialG = svgFinancial.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var svgLegend = d3.select("#legend").style("font", "10px sans-serif");
var svgLegendAverage = d3.select("#legendAverage").style("font", "10px sans-serif");
var svgLegendFinancial = d3.select("#legendFinancial").style("font", "10px sans-serif");

const retrieveData = async (dataUrl) => {
    let data = [];
    return await (await fetch(dataUrl)).json();
}

function manageMouseEvent(chartSVG, scaleY) {

    chartSVG.on("mousemove", function() {

        timeFormater = d3.timeFormat("%Y");

        actualXPos = d3.event.pageX;
        actualYPos = d3.event.pageY;

        outputText = "Año : " + timeFormater(commonXScale.invert(actualXPos)) + " - " + (Math.round(scaleY.invert(actualYPos)) + 719) + " millones de pesos";

        chartSVG.selectAll(".day_label").remove();
        chartSVG.selectAll("rect").remove();

        chartSVG.append("text")
            .attr("x", 50)
            .attr("y", 30)
            .attr("fill", "steelblue")
            .attr("font-weight", "bold")
            .attr("class", "day_label")
            .text(outputText);

        chartSVG.append("rect")
            .attr("x", actualXPos - 321)
            .attr("y", 0)
            .attr("width", 1)
            .attr("height", chartSVG.attr("height"))
            .style("fill", "black")
    });

    chartSVG.on("mouseleave", function() {
        svgFinancial.selectAll(".day_label").remove();
        svgFinancial.selectAll("rect").remove();
    })
}

function drawMultiLineChart(data, scaleY, chartG, colorScale, svgLegend) {

    scaleY.domain([
        d3.min(data, function(c) { return d3.min(c.values, function(d) { return d.total; }); }),
        d3.max(data, function(c) { return d3.max(c.values, function(d) { return d.total; }); })
    ]);

    colorScale.domain(data.map(function(c) { return c.id; }));

    chartG.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + chartHeight + ")")
        .call(d3.axisBottom(commonXScale));

    var lines = chartG.selectAll(".dataLine")
        .data(data)
        .enter().append("g")
        .attr("class", "dataLine");

    var lineDraw = d3.line()
        .curve(d3.curveBasis)
        .x(function(d) { return commonXScale(new Date(d.fecha)); })
        .y(function(d) { return scaleY(d.total); });

    var path = lines.append("path")
        .attr("class", "line")
        .attr("d", function(d) { return lineDraw(d.values); })
        .attr("id", function(d, i) {
            return "line" + ++lineConsecutiveId;
        })
        .style("stroke", function(d) { return colorScale(d.id); })
        .on('mouseover', function(obj) {
            d3.select(this)
                .style('stroke-width', '3.5px');
        })
        .on('mouseout', function(obj) {
            d3.select(this)
                .style('stroke-width', '1.5px');
        });

    g1 = svgLegend.append("g")
        .selectAll("g")
        .data(colorScale.domain().slice().reverse())
        .enter().append("g")
        .attr("transform", (d, i) => `translate(0,${i * 20})`);

    g1.append("rect")
        .attr("width", 19)
        .attr("height", 19)
        .attr("fill", colorScale);

    g1.append("text")
        .attr("x", 24)
        .attr("y", 9.5)
        .attr("dy", "0.35em")
        .text(d => d);
}

function animatePath() {
    var i;
    for (i = 1; i <= lineConsecutiveId; i++) {
        var path = d3.select('#line' + i);
        var totalLength = path.node().getTotalLength();

        d3.selectAll("#line" + i).attr("stroke-dasharray", totalLength + " " + totalLength)
            .attr("stroke-dashoffset", totalLength)
            .transition()
            .duration(4000)
            .delay(0)
            .attr("stroke-dashoffset", 0)
            .style("stroke-width", 3)
    }
}

/*
 *Financial mockup
 */

manageMouseEvent(svgFinancial, financialY);

retrieveData('https://cjcarvajal.github.io/cuestion-publica/data/financial.json').then(response => {
    drawMultiLineChart(response, financialY, financialG, financialZ, svgLegendFinancial);
    animatePath();
});

/*
 * Average mockup
 */

manageMouseEvent(svgAverage, averageY);

retrieveData('https://cjcarvajal.github.io/cuestion-publica/data/average.json').then(response => {
    drawMultiLineChart(response, averageY, averageG, averageZ, svgLegendAverage);
    animatePath();
});

/*
 * Congress mockup Begin
 */

manageMouseEvent(svgCongress, congressY);

retrieveData('https://cjcarvajal.github.io/cuestion-publica/data/congress.json').then(response => {
    drawMultiLineChart(response, congressY, congressG, congressZ, svgLegend);
    animatePath();
});