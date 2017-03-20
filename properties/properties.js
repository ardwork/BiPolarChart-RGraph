define( [

	'jquery',
	'qlik',
	'ng!$q',
	'ng!$http'


], function ($, qlik, $q, $http) {
    'use strict';
	//Define the current application
	var app = qlik.currApp();

    // *****************************************************************************
    // Dimensions & Measures
    // *****************************************************************************
    var dimensions = {
        uses: "dimensions",
        min: 1,
        max: 1
    };

    var measures = {
        uses: "measures",
        min: 2,
        max: 2
    };

    // *****************************************************************************
    // Appearance Section
    // *****************************************************************************
    var appearanceSection = {
        uses: "settings"
    };
	
	// *****************************************************************************
    // Sorting Section
    // *****************************************************************************
    var sortingSection = {
        uses: "sorting"
    };
	
	// *****************************************************************************
    // Options Section
    // *****************************************************************************

	
	
	var chartEffect = {
			type: "string",
			component: "dropdown",
			label: "Chart Effect",
			ref: "chartEffect",
			options: [{
				value: "2d",
				label: "2D"
			}, {
				value: "3d",
				label: "3D"
			}
			],
			defaultValue: "2d"
	};
	
	

	var chartColor = {
			label: "Bar Color",
			component: "color-picker",
			ref: "chartColor",
			type: "integer",
			defaultValue: 4
		};
		
		
	var colorEffect = {
		type: "boolean",
			component: "switch",
			label: "Color Gradient",
			ref: "colorEffect",
			options: [{
				value: true,
				label: "On"
			}, {
				value: false,
				label: "Off"
			}],
			defaultValue: false
	};
		
	
	var valueLabels = {
		type: "boolean",
			component: "switch",
			label: "Value Labels",
			ref: "valueLabels",
			options: [{
				value: true,
				label: "On"
			}, {
				value: false,
				label: "Off"
			}],
			defaultValue: true
	};	
	
	
	
	
	var Options = {
		type:"items",
		label:"Options",
		items: {
			chartEffect:chartEffect,
			chartColor:chartColor,
			colorEffect:colorEffect,
			valueLabels:valueLabels
			
		}
	
	};
	
    // *****************************************************************************
    // Main property panel definition
    // ~~
    // Only what's defined here will be returned from properties.js
    // *****************************************************************************
	  
	//******************************************************************************

    return {
        type: "items",
        component: "accordion",
        items: {
            //Default Sections
			dimensions: dimensions,
            measures: measures,
            appearance: appearanceSection,
			sorting: sortingSection,
			//Custom Sections
			Options: Options
			//MyColorPicker: MyColorPicker
			//miscSettings: miscSettings

        }
    };

} );
