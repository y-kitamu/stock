/* var echarts = require("echarts"); */

var chartDom = document.getElementById("chart_main");
var myChart = echarts.init(chartDom);
var option = {};
var data = {};
var volumes = {};

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";


function splitData(rawData) {
    const categoryData = [];
    const values = [];
    for (var i = 0; i < rawData.length; i++) {
        categoryData.push(rawData[i].splice(0, 1)[0]);
        values.push(rawData[i]);
    }
    return {
        categoryData: categoryData,
        values: values,
    };
}

function calculateMA(dayCount, stock_data) {
    var result = [];
    for (var i = 0, len = stock_data.values.length; i < len; i++) {
        if (i < dayCount) {
            result.push("-");
            continue;
        }
        var sum = 0;
        for (var j = 0; j < dayCount; j++) {
            sum += +stock_data.values[i - j][1];
        }
        result.push(sum / dayCount);
    }
    return result;
}



const draw_chart = (ticker) => {
    option[ticker] && myChart.setOption(option[ticker]);
};