
var activeScene = 0;
var activePage = 1;

//var btnContainer = document.getElementById("navigation");
//var btns = btnContainer.getElementsByClassName("btn");

var tooltip = d3.select("#navbar")
 .append("div")
 .attr("class", "toolTip")

var data = [];
var factors = [];
var infoPoints = [];

var margin = {top: 40, right: 20, bottom: 100, left: 100},
    width = 1000 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var y = d3.scaleLinear()
    .range([ height,0]);  


var x = d3.scaleBand().padding(0.1)
    .range([0,width]);

var x_scatter = d3.scaleLinear()
    .range([0,width]); 

var svg = d3.select(".scene").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var svg_scatter = d3.select(".scene_scatter").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var div = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);

var divInfo = d3.select("body").append("div")	
    .attr("class", "infotip")				
    .style("opacity", 0);

var select_scatter = d3.select('#dropdown_scatter')
    .append('select')
        .attr('class','select_scatter')
        .on('change',onchange_scatter)

var select_bar = d3.select('#dropdown_bar')
    .append('select')
        .attr('class','select_bar')
        .on('change',onchange_bar)

createDropDownData = function() {
    var factors = [];
    for (i=1;i<scenes.length;i++) {
        factors.push ({value : i, name :scenes[i].subtitle})
    }
    return factors
}


function onchange_scatter() {
    selectValue = d3.select('.select_scatter').property('value')
    activeScene = parseInt(selectValue);
    transitionScatterChart();
};

function onchange_bar() {
    selectValue = d3.select('.select_bar').property('value')
    activeScene = parseInt(selectValue);
    transitionBarChart();
};




function updateAnnotations(svg,scene,x,y){


    elem = svg.selectAll(".cir").remove();

    infoPoints = []
    annotations.forEach(function (element) {
        if (element.scene == scene & element.page == activePage) {
            infoPoints.push(element);
        }
    })

    
    
    elem = svg.selectAll(".cir").data(infoPoints)



    var elemEnter = elem.enter()
        .append("g")
        .attr("class", "cir")
        .attr("transform", function(d){return "translate("+x(d.px)+","+y(d.py)+")"})
        .style("opacity",1)
        .on("mouseover", function(d) {
            divInfo.transition()		
                .duration(200)		
                .style("opacity", .9);
            divInfo.html("<strong>"+d.text+"</strong>")
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY) + "px")
                .style("display", "inline-block");
        })
        .on("mouseout", function(d) {		
            divInfo.transition()		
                .duration(500)		
                .style("opacity", 0)	
        });
    
    elem.exit().remove()

    var circle = elemEnter.append("ellipse")
        .attr("rx",20)
        .attr("ry",10)
        .attr("stroke","black")
        .attr("fill", "#a1b7cc")
        .style("opacity", .3)

    elemEnter.append("text")
        .attr("dx", -12)
        .attr("dy", 5)
        .text("Info")
}


transitionScatterChart = function() {
    console.log('Transition');
    data = [];
    
    var onlyValuesY = scene.map(function(obj){ return obj[activeScene+1]; });
    var onlyValuesX = scene.map(function(obj){ return obj[1]; });

    var minValueX = Math.min.apply(null, onlyValuesX),
            maxValueX = Math.max.apply(null, onlyValuesX),
            avgValueX = (minValueX + maxValueX)/2;

    var minValueY = Math.min.apply(null, onlyValuesY),
            maxValueY = Math.max.apply(null, onlyValuesY),
            avgValueY = (minValueY + maxValueY)/2;

    var paletteScale = d3.scaleLinear()
        .domain([minValueX,avgValueX,maxValueX])
        .range(series_pallet[0])
    
    scene.forEach(function(item){ //
        var px = item[1],
                py = item[activeScene+1],
                country = item[0];
        //data[iso] = { index: value, fillColor: paletteScale(value) };
        data.push({x : px,y : py, fillColor: paletteScale(px), country : country  })
    });

    x_scatter.domain([minValueX*.95,maxValueX*1.05]);
    y.domain([minValueY-.1*avgValueY,maxValueY+.1*avgValueY]);

    // Add the Y Axis

    svg_scatter.selectAll(".yAxis").remove()
    
    svg_scatter.append("g")
        .attr("class","yAxis")
        .call(d3.axisLeft(y));


    var bars = svg_scatter.selectAll(".bar").data(data)
    bars.exit().remove();

    bars.enter()
        .append('circle')
        .attr("class", "bar")
    bars.transition()
        .duration(750)
        .attr("r", 10)
        .attr('fill', function(d,i){return d.fillColor})         
        .attr("cx", function(d) { return x_scatter(d.x); })
        .attr("cy", function(d) { return y(d.y); })

    bars.exit().remove();


    updateAnnotations(svg_scatter,activeScene,x_scatter,y);

}

updateScatterChart = function() {


    $('#title').text(scenes[activeScene].name);
    data = [];
    
    var onlyValuesY = scene.map(function(obj){ return obj[activeScene+1]; });
    var onlyValuesX = scene.map(function(obj){ return obj[1]; });

    var minValueX = Math.min.apply(null, onlyValuesX),
            maxValueX = Math.max.apply(null, onlyValuesX),
            avgValueX = (minValueX + maxValueX)/2;

    var minValueY = Math.min.apply(null, onlyValuesY),
            maxValueY = Math.max.apply(null, onlyValuesY),
            avgValueY = (minValueY + maxValueY)/2;

    var paletteScale = d3.scaleLinear()
        .domain([minValueX,avgValueX,maxValueX])
        .range(series_pallet[0])
    
    scene.forEach(function(item){ //
        var px = item[1],
                py = item[activeScene+1],
                country = item[0];
        //data[iso] = { index: value, fillColor: paletteScale(value) };
        data.push({x : px,y : py, fillColor: paletteScale(px), country : country  })
    });

    x_scatter.domain([minValueX*.95,maxValueX*1.05]);
    y.domain([minValueY-.1*avgValueY,maxValueY+.1*avgValueY]);

    //var svg_scatter = svg.selectAll(".yAxis")
    //.data(["dummy"]);

    d3.select(".yAxis").remove();
      // Add the X Axis
    svg_scatter.append("g")
        .attr("transform", "translate(0," + height + ")")
        .attr("class","xAxis")
        .call(d3.axisBottom(x_scatter));

    // Add the Y Axis
    svg_scatter.append("g")
        .attr("class","yAxis")
        .call(d3.axisLeft(y));

    svg_scatter.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text(y_axis_label[activePage-1]); 
    
    svg_scatter.append("text")             
        .attr("transform",
              "translate(" + (width/2) + " ," + 
                             (height + margin.top + 20) + ")")
        .style("text-anchor", "middle")
        .text(x_axis_label[activePage-1]);


    var bars = svg_scatter.selectAll(".bar")
        .remove()
        .exit()
        .data(data)
    bars.enter()
        .append('circle')
        .attr("class", "bar") 
        .attr("r", 10)
        .attr('fill', function(d,i){return d.fillColor})         
        .attr("cx", function(d) { return x_scatter(d.x); })
        .attr("cy", function(d) { return y(d.y); })
        .on("mouseover", function(d) {
            div.transition()		
                .duration(200)		
                .style("opacity", .9);
            div.html("<strong>"+d.country+"</strong>")
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY) + "px")
                .style("display", "inline-block")
        })
        .on("mouseout", function(d) {		
            div.transition()		
                .duration(500)		
                .style("opacity", 0)	
        });
    bars.exit().remove();

    dropData = createDropDownData();

    updateAnnotations(svg_scatter,activeScene,x_scatter,y);
     
    var options = select_scatter
    .selectAll('option')
      .data(dropData).enter()
      .append('option')
          .text(function (d) { return d.name; })
          .attr('value', function(d) { return d.value;});

}

transitionBarChart = function() {
    console.log('Transition');
    data = [];
    
    var onlyValues = scene.map(function(obj){ return obj[activeScene+1]; });
    var onlyNames = scene.map(function(obj) { return obj[0];})
    var minValue = Math.min.apply(null, onlyValues),
            maxValue = Math.max.apply(null, onlyValues),
            avgValue = (minValue + maxValue)/2;

    var paletteScale = d3.scaleLinear()
        .domain([minValue,avgValue,maxValue])
        .range(series_pallet[activeScene])
    
    scene.forEach(function(item){ //
        var iso = item[0],
                value = item[activeScene+1];
        data.push({name : iso,index : value, fillColor: paletteScale(value) })
    });

    x.domain(data.map(function(d) { return d.name; }));
    y.domain([minValue*.95,maxValue*1.05]);
    
    var y_axis = svg.selectAll(".yAxis")
        .data(["dummy"]);
    var new_y_axis = y_axis.enter().append("g")
        .attr("class", "yAxis")

    y_axis.merge(new_y_axis).call(d3.axisLeft(y)) 

    var f = d3.format(",.2r")
   
    var bars = svg.selectAll(".bar").data(data)

    bars.exit().remove();

    bars.enter()
        .append('rect')
        .attr("class", "bar")
    bars.transition()
        .duration(750)         
        .attr("x",  function(d,i) {return x(d.name); })
        .attr("width", 10)
        .attr("y", function(d,i){return y(d.index);})
        .attr("height", function(d,i){return height-y(d.index);})
        .attr('fill', function(d,i){return d.fillColor})

    updateAnnotations(svg,activeScene,x,y);

}

updateBarChart = function() {
    console.log('Update');
    $('#title').text(scenes[activeScene].name);
;

    

    data = [];
    
    var onlyValues = scene.map(function(obj){ return obj[activeScene+1]; });
    var onlyNames = scene.map(function(obj) { return obj[0];})
    var minValue = Math.min.apply(null, onlyValues),
            maxValue = Math.max.apply(null, onlyValues),
            avgValue = (minValue + maxValue)/2;

    var paletteScale = d3.scaleLinear()
        .domain([minValue,avgValue,maxValue])
        .range(series_pallet[activeScene])
    
    scene.forEach(function(item){ //
        var iso = item[0],
                value = item[activeScene+1];
        data.push({name : iso,index : value, fillColor: paletteScale(value) })
    });

    x.domain(data.map(function(d) { return d.name; }));
    y.domain([minValue*.95,maxValue*1.05]);
    

    svg.append("g")
        .attr("class", "xAxis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", function(d){
                return "rotate(-65)";
            });

    
    var y_axis = svg.selectAll(".yAxis")
            .data(["dummy"]);
    var new_y_axis = y_axis.enter().append("g")
        .attr("class", "yAxis")

    y_axis.merge(new_y_axis).call(d3.axisLeft(y)) 

    var t = d3.transition()
        .duration(2000);

    var f = d3.format(",.2r")

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left-30)
        .attr("x",0 - (height / 2))
        .attr("dy", "5em")
        .style("text-anchor", "middle")
        .text(y_axis_label[activePage-1]); 

    svg.append("text")             
        .attr("transform",
              "translate(" + (width/2) + " ," + 
                             (height + margin.top + 50) + ")")
        .style("text-anchor", "middle")
        .text(x_axis_label[activePage-1]);

    var bars = svg.selectAll(".bar")
        .remove()
        .exit()
        .data(data)
    bars.enter()
        .append('rect')
        .attr("class", "bar")        
        .attr("x",  function(d,i) {return x(d.name); })
        .attr("width", 10)
        .attr("y", function(d,i){return y(d.index);})
        .attr("height", function(d,i){return height-y(d.index);})
        .attr('fill', function(d,i){return d.fillColor})
        .on("mouseover", function(d) {
            //console.log(d3.event.pageX,d3.event.pageY);
            div.transition()		
                .duration(200)		
                .style("opacity", .9)
            div.html("<strong>"+d.name+":</strong> <span style='color:red'>" + f(d.index) + "</span>")
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY) + "px")
                .style("display", "inline-block")
        })
        .on("mouseout", function(d) {		
            div.transition()		
                .duration(500)		
                .style("opacity", 0)	
        });

    updateAnnotations(svg,activeScene,x,y);

    dropData = createDropDownData();
    
    var options = select_bar
    .selectAll('option')
      .data(dropData).enter()
      .append('option')
          .text(function (d) { return d.name; })
          .attr('value', function(d) { return d.value;});
}




function setup_index() {
    activePage = 1;
    updateBarChart();
}

function setup_factors() {
    activePage = 2;
    activeScene = 1;
    updateBarChart();
}

function setup_corrl() {
    activePage = 3;
    activeScene = 1;
    updateScatterChart()
}

