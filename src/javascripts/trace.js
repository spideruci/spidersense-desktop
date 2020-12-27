function visualizeTrace(orig_trace_data, graph_nodes) {
	
	d3.select('#trace').select('svg').remove();
	
	if(orig_trace_data === null) {
		return;
	}

	var trace_data = null;

	if(graph_nodes === null || graph_nodes === undefined) {
		trace_data = orig_trace_data.map(function (element) {
			return {"value" : element, "color" : "grey"};
		});
	} else {
		trace_data = orig_trace_data.map(function (element) {
			var color;
			if(element == 0) {
				color = "grey";
			} else {
				var node = graph_nodes[element - 1];
				color = module_color2(node, "cluster");
			}

			return {"value" : element, "color" : color};
		});
	}

	var width = 300,
	    barHeight = 5;

	var x = d3.scale.linear()
	    .domain([0, d3.max(trace_data, function(d) { return d.value; })])
	    .range([0, width]);



	var chart = d3.select("#trace").append("svg")
	    .attr("width", width)
	    .attr("height", (trace_data.length * barHeight))
	    .style("background-color", "white")

	// chart.call(d3.behavior.zoom().on("zoom", redraw2));;

	var bar = chart.selectAll("g")
	    .data(trace_data)
	  .enter().append("g")
	    .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

	bar.append("rect")
	    .attr("width", function(d) { return x(d.value); })
	    .attr("height", barHeight)
	    .style("fill", function (d) {
	    	return d.color;
	    })
	    .style("border", function (d) {
	    	return d.color;
	    });
}

// function redraw2() {
// 	var chart = d3.select("#trace").select("svg")

//     translate_x = d3.event.translate[0];
//     translate_y = d3.event.translate[1];
//     chart.attr("transform",
//       "translate(" + d3.event.translate + ")"
//       + " scale(" + d3.event.scale + ")");
// }

