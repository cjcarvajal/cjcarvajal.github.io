function drawMultiLineChart(data, scaleY, chartG, colorScale, svgLegend, chartWidth, chartHeight) {

    var commonXScale = d3.scaleTime().range([0, chartWidth - 20]);
    commonXScale.domain([new Date("2014"), new Date("2016-01-02")]);

    scaleY.domain([
        d3.min(data, function(c) { return d3.min(c.values, function(d) { return d.total; }); }),
        d3.max(data, function(c) { return d3.max(c.values, function(d) { return d.total; }); })
    ]);

    colorScale.domain(data.map(function(c) { return c.id; }));

    var lines = chartG.selectAll(".dataLine")
        .data(data)
        .enter().append("g")
        .attr("class", "dataLine");

    var lineDraw = d3.line()
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

    lines.selectAll("circle")
        .data(d => mapToCircles(d))
        .enter().append("circle")
        .attr("r", 4)
        .attr("stroke", "#fff")
        .attr("stroke-width", "2px")
        .attr("fill", (d) => { return colorScale(d.id) })
        .attr("cx", d => commonXScale(new Date(d.fecha)))
        .attr("cy", d => scaleY(d.total));

    function mapToCircles(d, i) {
        const mappedValues = d.values.map(row => ({ ...row }));
        mappedValues.forEach(row => row.id = d.id);
        return mappedValues;
    }

    // gridlines in y axis function
    function make_y_gridlines() {
        return d3.axisLeft(scaleY)
            .ticks(5)
    }

    // add the Y gridlines
    chartG.append("g")
        .attr("class", "grid")
        .call(make_y_gridlines()
            .tickSize(-chartWidth)
            .tickFormat("")
        );

    // add the X Axis
    chartG.append("g")
        .attr("transform", "translate(0," + chartHeight + ")")
        .call(d3.axisBottom(commonXScale)
            .ticks(d3.timeYear.every(1))
            .tickFormat(d3.timeFormat("%Y")));

    // add the Y Axis
    chartG.append("g")
        .call(d3.axisLeft(scaleY));

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