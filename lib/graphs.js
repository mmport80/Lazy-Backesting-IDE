/*
function resize(){
        window.onresize = function(){
                document.getElementsByTagName("svg")[0].style.width = window.innerWidth * 0.9;
                document.getElementsByTagName("svg")[0].style.height = window.innerHeight * 0.9;
                };
        }
*/
function Graph(){
        //!use check boxes to store this data!
        var graphTimeSeries = ["STRATEGY_return"];

        //**********************************************************************************************
        //setup
        function appendCheckBox(timeSeries, allReturns){
                var p = document.createElement('p');
                var text = document.createTextNode(timeSeries);

                document.getElementById('graph').appendChild(p);

                var input = document.createElement('input');
                input.type="checkbox";

                input   .addEventListener(
                                "change", 
                                function(){
                                        //find whether to add or remove
                                        var index = graphTimeSeries.indexOf(timeSeries);

                                        //add or remove
                                        index === -1 ? graphTimeSeries.push(timeSeries) : graphTimeSeries.splice(index,1);
                
                                        update(allReturns.slice());
                                        }
                                );                        
                //check strategy checkbox by default
                timeSeries === "STRATEGY_return" ? input.checked = true : input.checked = false;

                p.appendChild(input);
                p.appendChild(text);
                }

        function update(allReturns){
                
                var returns = allReturns
                        .filter(
                                function(i){
                                        return graphTimeSeries.indexOf(i.name) != -1;
                                        }
                                );
                                
                //*******************************************
                //update axes
                x.domain(d3.extent(returns[0].values, function(d) { return d.date; }));

                y.domain([
                        d3.min(returns, function(c) { return d3.min(c.values, function(v) { return v.r; }); }),
                        d3.max(returns, function(c) { return d3.max(c.values, function(v) { return v.r; }); })
                        ]);

                var xAxis = d3
                        .svg
                        .axis()
                        .scale(x)
                        .orient("bottom")
                        .ticks(2);

                var yAxis = d3
                        .svg
                        .axis()
                        .scale(y)
                        .orient("left")
                        .ticks(2);
                        
                d3      .select(".x.axis")
                        .transition()
                        .duration(750)
                        .call(xAxis);
                
                d3      .select(".y.axis")
                        .transition()
                        .duration(750)
                        .call(yAxis.tickFormat( formatAxisLabel ));
                        
                //*******************************************
                //return path
                
                //remove all
                d3      .select('#base')
                        .selectAll(".returnPath")
                        .remove();
                
                //append
                d3      .select('#base')
                        .selectAll(".returnPath")
                        .data( returns )
                        .enter()
                        .append("g")
                                .attr("class", "returnPath")
                                .attr("id", function(d){return d.name;})
                        .append("path")
                                .attr("class", "line")
                                .style("stroke", function(d) { return color(d.name); })
                                .attr("d", function(d) { return line(d.values); })
                                .transition()
                                .duration(750);
                }
                
        //******************
        //choose smallest dimension between parent's width and window height
        
        var worh = document.querySelector("#graph").parentNode.offsetWidth;
        
        worh > window.innerHeight ?
                worh = window.innerHeight
                :
                null;
        
        var margin = {
                bottom: worh*0.05, 
                top: worh*0.05, 
                right: worh*0.04, 
                left: worh*0.06
                };

        var width = worh - margin.left - margin.right;

        var height = worh - margin.top - margin.bottom;
        /*
        h.print();
        w.print();        
        height.print();
        width.print();
        
        window.innerWidth.print();
        window.innerHeight.print();
        */
        //******************


        var x = d3
                .time
                .scale()
                .range([0, width]);

        var y = d3
                .scale
                .linear()
                .range([height, 0]);
        //******************


        var color = d3
                .scale
                .category10();
                
        var line = d3
                .svg
                .line()
                .interpolate("basis")
                .x(function(d) { return x(d.date); })
                .y(function(d) { return y(d.r); });
                
        //******************

                
        var formatAxisLabel = function(d){
                  return (d * 100).toLocaleString()+"%";
                  }


        //graph object
        //change domain, lines
        //update lines and axes

        this.draw = function(data, controlsFlag){
                //******************


                var xAxis = d3
                        .svg
                        .axis()
                        .scale(x)
                        .orient("bottom")
                        .ticks(2);

                var yAxis = d3
                        .svg
                        .axis()
                        .scale(y)
                        .orient("left")
                        .ticks(2);

                
                //******************
                
                var parseDate = d3.time.format("%Y-%m-%d").parse;
                
                

                //array with element per time series
                var bisectDate = d3
                          .bisector(function(d) { return d.date; })
                          .left;
                
                
                //**********************************************************************************************
                //setup
                          
                          
                //remove anything pre-existing
                d3      .select("svg")
                        .remove();
                        
                d3      .select("#graph")
                        .selectAll('p')
                        .remove();


                //**********************************************************************************************
                
                var svg = d3
                        .select("#graph")
                        .append("svg")
                        //.attr("viewBox","0 0 "+(width + margin.left + margin.right)+" "+(height + margin.top + margin.bottom))
                        //.attr("preserveAspectRatio","xMidYMid")
                        .attr("width", width + margin.left + margin.right)
                        .attr("height", height + margin.top + margin.bottom)
                        .append("g")
                        //.attr('id','base')
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                
                svg     .append("g")
                        .attr('id','base');
                
                //sets colour(?)
                color   .domain(
                                d3      .keys(data[0])
                                        .filter(
                                                function(key) { 
                                                        return key != "date" && key.indexOf("weight") === -1; 
                                                        }
                                                )
                                );

                //convert date format
                data    .forEach(
                                function(d) {
                                        d.date = parseDate(d.date);
                                        }
                                );


                //generate cumulative demeaned returns
                var allReturns = color
                        .domain()
                        .reduce(
                                function(aa, name) {
                                        //find mean
                                        var av = jStat(
                                                  _.pluck(data,name)
                                                        .map(function(i){return +i;})
                                                  ).mean();
                         
                                        var factor = null;
                                        var origAv = null;
                
                                        aa.length > 0 ? factor = av/aa[0].av : factor = 1;
                                        aa.length > 0 ? origAv = aa[0].av : origAv = av;
                
                                        var data2 = data.slice();
                
                                        return aa.concat(
                                                        {
                                                        name: name,
                                                        av: av,
                                                        values: data2.reverse().reduce(function(a,d) {
                                                                var rr = null;
                                                                if (a.length>0){
                                                                      //cumulative and demean
                                                                      rr = +d[name] / factor + a[a.length-1].r - origAv;
                                                                      }
                                                                else{
                                                                      rr = +d[name] / factor - origAv;
                                                                      }
                                                                return a.concat({date: d.date, r: rr });
                                                                }
                                                        ,[])
                                                        }
                                                );
                                        }
                                , []
                                );
                
                
                
                
                //************************************************************************************
                //************************************************************************************
                //************************************************************************************
                //create object
                //two modes: simple & advanced
                
                
                //initially just show strat returns
                /*
                var returns = allReturns
                        .filter(
                                function(i){
                                        return graphTimeSeries.indexOf(i.name) != -1;
                                        }
                                )
                                ;
                */
                
                if (controlsFlag === true){
                        //append check boxes
                        color   .domain()
                                .reverse()
                                .forEach(
                                        function(i){
                                                appendCheckBox(i, allReturns.slice());
                                                }
                                        );
                        }

                //************************************************************************************
                //************************************************************************************
                //************************************************************************************
                
                
                
                
                //initial axis setup
                
                //xaxis
                svg     .append("g")
                        .attr("class", "x axis")
                        .attr("transform", "translate(0," + height + ")")
                        .call(xAxis);
                //yaxis
                svg     .append("g")
                                .attr("class", "y axis")
                                .call( yAxis.tickFormat( formatAxisLabel ) )
                        .append("text")
                                .attr("transform", "rotate(-90)")
                                .attr("y", 6)
                                .attr("dy", "1em")
                                .style("text-anchor", "end")
                                .text("Cumulative Demeaned");

                
                //************************************************************************************
                //setup check boxes

                update( allReturns.slice() );
                

                //************************************************************************************
                //overlay for mouse movement tracking
                var dateBox = svg
                        .append("g")
                                .attr("class", "focus")
                                .style("display", "none");
                dateBox
                        .append("rect")
                                .attr("width", "8em")
                                .attr("height", "1.1em");
                dateBox
                        .append("text")
                                .attr("x", 9)
                                .attr("dy", "1em");

                var toolTips = svg
                                .append("g")
                                .attr("class", "toolTips");

                //append time series tool tips
                var f = color   .domain()
                                .reduce(
                                        function(a,i){
                                                a[i] = toolTips
                                                        .append("g")
                                                        .attr("class", "focus "+i)
                                                        .style("display", "none");
                                                a[i]    .append("rect")
                                                        .attr("width", "8em")
                                                        .attr("height", "1.1em");
                                                a[i]    .append("text")
                                                        .attr("x", 9)
                                                        .attr("dy", "1em");

                                                return a;
                                                }
                                                , []
                                        );

                //vertical date line
                var dateLine = svg
                        .append("g")
                                .attr("class", "dateLine")
                                .style("display", "none");
                dateLine
                        .append("line")
                		.attr("x1",0)
                		.attr("y1",0)
                		.attr("x2",0)
                		.attr("y2",height);

                //append overlay for mouse movement
                var overlay =  svg
                        .append("rect")
                        .attr("class", "overlay");
                overlay
                        .attr("width", width)
                        .attr("height", height);
                overlay
                        .on("mouseover", 
                                function() { 
                                        //scrub out tool tips
                                        allReturns.forEach(
                                                function(i){
                                                        f[i.name].style("display", "none");
                                                        }
                                                );   
                                        //show relvant tool tips
                                        graphTimeSeries.forEach(
                                                function(i){
                                                        f[i].style("display", null);
                                                        }
                                                );   
                                        dateBox.style("display", null);
                                        dateLine.style("display", null);
                                        }
                                )
                        .on("mousemove", mousemove);
                

                            
                
                //************************************************************************************
                
                

                function mousemove() {
                        var currentDate = x.invert(d3.mouse(this)[0]);

                        //strategy return boxes
                        allReturns.forEach(
                                        function(i){
                                                var index = bisectDate(i.values, currentDate);
                                                var d = i.values[index];
                                                f[i.name].attr("transform", "translate(" + x(d.date) + "," + y(d.r) + ")");

                                                //remove returns and exchanges
                                                var cleanedTickers = (i.name).substring(0,i.name.length-7);
                                
                                                var indexof = cleanedTickers.indexOf("_");
                                                indexof === -1 ? null : cleanedTickers = cleanedTickers.substring(indexof+1);;

                                                //find first underscore
                                                f[i.name]
                                                        .select("text").text(cleanedTickers+": "+Math.round(d.r * 100).toLocaleString()+"%")
                                                        .style("stroke", color(i.name) );
                                                }
                                        );
                
                        dateLine.attr("transform", "translate(" + x(currentDate) + "," + 0 + ")");

                        dateBox .attr("transform", "translate(" + x(currentDate) + "," + 0 + ")")
                                .select("text")
                                .text(currentDate.toLocaleDateString());
                        }
                }
        }
