// STEP 1 - Include Dependencies
// Include react
import React from "react";

// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Include the chart type
import Chart from "fusioncharts/fusioncharts.charts";

// Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);



// STEP 3 - Creating the JSON object to store the chart configurations

const ChartComponent = ({ data }) => {
  const chartConfigs = {
    type: "bar3d", // The chart type
    width: "100%", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        //Set the chart caption
        caption: "Most Forked",
        //Set the chart subcaption
        subCaption: "",
        //Set the x-axis name
        xAxisName: "Repos",
        //Set the y-axis name
        yAxisName: "Forks",
        xAxisNameFontSize: '16px',
        yAxisNameFontSize: '16px',
        numberSuffix: "",
        //Set the theme for your chart
        // theme: "fusion",
        // decimals: 0,
        // pieRadius: '30%',
        // if you add custom colors 
        // make sure you have enough hex colors for your chart or colors will get reused
        //paletteColors:''

      },
      // Chart Data
      // data is = to data prop being passed in
      // data:data can also be written -->
      data,
    }
  };
  return (<ReactFC {...chartConfigs} />);
}


export default ChartComponent;


;
