const retrieveData = async (dataUrl) => {
    let data = [];
    return await (await fetch(dataUrl)).json();
}

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

function processAverage(congressmanByGroupData) {
	
}

/*
 * Average mockup
 */
retrieveData('https://cjcarvajal.github.io/cuestion-publica/data/average.json').then(response => {
    const processedData = processAverage(response);
    drawMultiLineChart(processedData, averageY, averageG, averageZ, svgLegendAverage);
    animatePath();
});

/*
 *Financial mockup
 */
retrieveData('https://cjcarvajal.github.io/cuestion-publica/data/financial.json').then(response => {
    drawMultiLineChart(response, financialY, financialG, financialZ, svgLegendFinancial);
    animatePath();
});

/*
 * Congress mockup Begin
 */
retrieveData('https://cjcarvajal.github.io/cuestion-publica/data/congress.json').then(response => {
    drawMultiLineChart(response, congressY, congressG, congressZ, svgLegend);
    animatePath();
});