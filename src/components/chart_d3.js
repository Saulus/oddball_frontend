import * as d3 from "d3";

export default function chart_d3(canvas_ref,source1,source2) {
    var margin = {top: 50, right: 70, bottom: 50, left: 70},
    width = parseInt(d3.select(canvas_ref).style("width"), 10) - margin.left - margin.right,
    height = parseInt(d3.select(canvas_ref).style("height"), 10) - margin.top - margin.bottom;

    var xScale = d3.scalePoint()
        .domain(source1.values.map(function(d){return d.date}))
        .range([0, width]);
    
    var yScale1 = d3.scaleLinear()
        .domain([0, d3.max(source1.values, d => d.value)])
        .range([height, 0])

    var yScale2 = d3.scaleLinear()
        .domain([0, d3.max(source2.values, d => d.value)])
        .range([height, 0])

    var line1 = d3.line()
        .x(function(d) { return xScale(d.date); })
        .y(function(d) { return yScale1(d.value); })
        .curve(d3.curveMonotoneX) // apply smoothing to the line;
        
    var line2 = d3.line()
        .x(function(d) { return xScale(d.date); })
        .y(function(d) { return yScale2(d.value); })
        .curve(d3.curveMonotoneX) // apply smoothing to the line;

    // Create an axis component with d3.axisBottom    
    var xAxis = d3.axisBottom(xScale);

    // Create an axis component with d3.axisLeft
    var yAxisLeft = d3.axisLeft(yScale1);
    
    var yAxisRight = d3.axisRight(yScale2); 

    const svg = d3.select(canvas_ref)
        .append("svg")
        .attr("class", "canvas")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // 3. Call the x axis in a group tag
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis); 
    
    // 4. Call the y axis in a group tag
    svg.append("g")
        .attr("class", "y1 axis")
        .call(yAxisLeft);

    // 4. Call the y axis in a group tag
    svg.append("g")
        .attr("class", "y2 axis")
        .attr("transform", "translate(" + width + " ,0)")	
        .call(yAxisRight);

    // 9. Append the path, bind the data, and call the line generator 
    svg.append("path")
        .datum(source1.values) // 10. Binds data to the line 
        .attr("class", "y1 line") // Assign a class for styling 
        .attr("d", line1); // 11. Calls the line generator 

    // 9. Append the path, bind the data, and call the line generator 
    svg.append("path")
        .datum(source2.values) // 10. Binds data to the line 
        .attr("class", "y2 line") // Assign a class for styling 
        .attr("d", line2); // 11. Calls the line generator 

    //return svg.node();
  }