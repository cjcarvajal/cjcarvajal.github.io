const retrieveData = async(dataUrl) => {
    let data = [];
    return await (await fetch(dataUrl)).json();
}

var lineConsecutiveId = 0;

var svgAverage = d3.select("#principalAverage"),
    margin = { top: 20, right: 80, bottom: 30, left: 90 },
    averageChartWidth = svgAverage.attr("width") - margin.left - margin.right,
    averageChartHeight = svgAverage.attr("height") - margin.top - margin.bottom,
    averageG = svgAverage.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")"),
    averageY = d3.scaleLinear().range([averageChartHeight, 0]),
    averageZ = d3.scaleOrdinal(d3.schemeCategory10);

var svgEarns = d3.select("#principalEarns"),
    earnsChartWidth = svgEarns.attr("width") - margin.left - margin.right,
    earnsChartHeight = svgEarns.attr("height") - margin.top - margin.bottom,
    earnsG = svgEarns.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")"),
    earnsY = d3.scaleLinear().range([earnsChartHeight, 0]),
    earnsZ = d3.scaleOrdinal(d3.schemeCategory10);

var svgLegendAverage = d3.select("#legendAverage").style("font", "10px sans-serif");
var svgLegendEarns = d3.select("#legendEarns").style("font", "10px sans-serif");

/*
 * Average values congress
 */
retrieveData('https://cjcarvajal.github.io/cuestion-publica/data/financial.json').then(response => {
    drawMultiLineChart(response, averageY, averageG, averageZ, svgLegendAverage, averageChartWidth, averageChartHeight);
    animatePath();
});

/*
 * Assets by congressman
 */
retrieveData('https://cjcarvajal.github.io/cuestion-publica/data/earns.json').then(response => {
    drawMultiLineChart(response, earnsY, earnsG, earnsZ, svgLegendEarns, earnsChartWidth, earnsChartHeight);
    animatePath();
});