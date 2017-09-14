////////////////////////////////////////////////////
//Version: 	1.1
//Author:  	Richard Byard
//Usage:	Bipolar bar chart using RGraph chart library.
//Date:		13 Sept 2017
////////////////////////////////////////////////////
define( [
        // Load the properties.js file using requireJS
        // Note: If you load .js files, omit the file extension, otherwhise
        // requireJS will not load it correctly 
		'jquery'
		,'qlik'
        ,'./properties/properties'
		,'./properties/initialProperties'
		,'./libraries/RGraph.common.core'
		,'./libraries/RGraph.common.dynamic'
		,'./libraries/RGraph.common.tooltips'
		,'./libraries/RGraph.common.resizing'
		,'./libraries/RGraph.common.key'
		,'./libraries/RGraph.bipolar' 
		//,'css!./css/BiPolarChart-RGraph.css'
		
    ],
	
    function ( $, qlik, props, initProps, styleSheet) {
        'use strict';	
		//Inject Stylesheet into header of current document
		//$( '<style>' ).html(styleSheet).appendTo( 'head' );
        return {
			//Define the properties tab - these are defined in the properties.js file
             definition: props,
			
			//Define the data properties - how many rows and columns to load.
			 initialProperties: initProps,
			
			//Allow export to print object 
			support : { export: true 
			},
			
			//Not sure if there are any other options available here.
			 snapshot: {cantTakeSnapshot: true
			 },

			//paint function creates the visualisation. - this one makes a very basic table with no selections etc.
			paint:  function ($element, layout) {
			//debug propose only, please comment
			//console.log('Data returned: ', layout.qHyperCube);
			
			var app = qlik.currApp(this);
			
			// Get the Number of Dimensions and Measures on the hypercube
			var numberOfDimensions = layout.qHyperCube.qDimensionInfo.length;
			//console.log(numberOfDimensions);
			var numberOfMeasures = layout.qHyperCube.qMeasureInfo.length;
			//console.log(numberOfMeasures);
			
			// Get the Measure Name and the Dimension Name
			var measure1Name = layout.qHyperCube.qMeasureInfo[0].qFallbackTitle;
			var measure2Name = layout.qHyperCube.qMeasureInfo[1].qFallbackTitle;
			var measureName = measure1Name+' vs '+measure2Name;
			//console.log(measureName);
			
			
			var dimensionName = layout.qHyperCube.qDimensionInfo[0].qFallbackTitle;
			//console.log(dimensionName);

			
			// Get the number of fields of a dimension
			var numberOfDimValues = layout.qHyperCube.qDataPages[0].qMatrix.length;
			//console.log(numberOfDimValues);
			
			// Get the values of the dimension
			var dimArray =[];
			var leftArray =[];
				for (var i=0; i<numberOfDimValues;i++){
					dimArray[i] = layout.qHyperCube.qDataPages[0].qMatrix[i][0].qText;
					leftArray[i] = layout.qHyperCube.qDataPages[0].qMatrix[i][1].qText;
				}
			var rightArray =[];
				for (var i=0; i<numberOfDimValues;i++){
					rightArray[i] = layout.qHyperCube.qDataPages[0].qMatrix[i][2].qText;
				}
			//console.log(leftArray);
			//console.log(rightArray);
			

			var dimensionLength=layout.qHyperCube.qDataPages[0].qMatrix.length;
			
			var chart;
			//var chart1;
			
			
			
			
 			//setup Chart Variant
			
			switch(layout.chartEffect) {
				case "2d": var chartVariant = ""; break;
				case "3d": var chartVariant = "3d"; break;
				default: var chartVariant = ""; break;
			} 
			
			
			
			
			// manage color selections
			var palette = [
									"#b0afae",
									"#7b7a78",
									"#545352",
									"#4477aa",
									"#7db8da",
									"#b6d7ea",
									"#46c646",
									"#f93f17",
									"#ffcf02",
									"#276e27",
									"#ffffff",
									"#000000"
								];
			
			// to create a gradient color effect from white to selected color.
			switch(layout.colorEffect) {
				case false: var fillColor = palette[layout.chartColor];	break;
				case true: 
					var str1 = 'Gradient(';
					var str2 = ':white:';
					var str3 = ')';
					var str0 = palette[layout.chartColor];
					var fillColor = str1.concat(str0,str2,str0,str3); break;
			}		
								
			//var fillColor = palette[layout.chartColor];
			//console.log(fillColor);
			
			
 			
		
						
			
			// add tooltips with values
			var valueTooltips = [];
			//var colors   = [];
			
			for (var i=0; i<rightArray.length; i+=1) {valueTooltips.push(dimArray[i] + ': ' + measure2Name + ': ' +  String(rightArray[i])) /*; colors.push('blue')*/ ;}
			for (var i=0; i<leftArray.length; i+=1) {valueTooltips.push(dimArray[i] + ': ' + measure1Name + ': ' +  String(leftArray[i])) /*; colors.push('#f66')*/ ;}
			
			
			var valueLabels = [];
			// set value labels on or off
			if (layout.valueLabels) {
				for (var i=0; i<dimArray.length; i+=1) {valueLabels.push(String(leftArray[i]) + '   ' + dimArray[i] + '   ' +  String(rightArray[i])) ;} //On
			} else {
				for (var i=0; i<dimArray.length; i+=1) {valueLabels.push(dimArray[i]);} //Off
			}
			
			
			//To generate random numbers to allow multiple charts to present on one sheet:
			function guid() {return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();};
			function s4() {return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);};
			var tmpCVSID = guid();
						


			var html = '';			
			var width = $element.width(), height = $element.height();
			// add canvas for chart			
			html+='<div id="canvas-wrapper"><canvas id="' + tmpCVSID + '" width="'+width+'" height="'+height+'">[No canvas support]</canvas></div>';

			$element.html(html);

			
			RGraph.Reset(document.getElementById(tmpCVSID));
		
						
			
			
			chart = new RGraph.Bipolar({
						id: tmpCVSID,
						left: leftArray,
						right: rightArray,
						options: {
							gutterBottom: 50,
							textSize: 10,
							labels: valueLabels,	
							textColor: '#595959',
							strokestyle: 'rgba(0,0,0,0)',
							tooltips: valueTooltips,
							tooltipsEvent: 'onmousemove',										
							colors: [fillColor],
							variant: chartVariant,
							noaxes: true,
							title: measureName,
							titlecolor: '#595959',
							scaleZerostart: true,
							backgroundGrid: false,
							scaleDecimals: 0,
							xlabels: false, // hides the labels as these are not calculating correctly.
							//scaleColor: 'rgba(0,0,0,0)',
							//shadowOffsety: layout.shadowDepth,
							//shadowColor: shadowYN,
							textAccessible: false//,
							//eventsClick: onClickDimension//,
							//eventsMousemove: onMouseMove
						}
					}).draw();

			
			
			
			
			
			
			
			
			
			
			// On Click actions
			function onClickDimension (e, shape)
			{
				var index = shape.index;
				app.field(dimensionName).toggleSelect(dimArray[index], true);
			}	
			
			// On Mouse Over actions
			function onMouseMove (e, shape)
			{
				var index = shape.index;
				//self.backendApi.selectValues(0, dimArray[index], true);
				app.field(dimensionName).toggleSelect(dimArray[index], true);
			}					 
			
			//needed for export
			return qlik.Promise.resolve();
		}	 
			

	}; 

} );

