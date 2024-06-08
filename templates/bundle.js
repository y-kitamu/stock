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

{% for ticker in tickers %}
// Each item: open，close，lowest，highest
data["{{ ticker.code }}"] = splitData([
    {%- for data in ticker.daily_data %}
    {{ data }},
    {%- endfor %}
]);
volumes["{{ ticker.code }}"] = [
    {%- for data in ticker.volume_data %}
    {{ data }},
    {%- endfor %}
]

option["{{ ticker.code }}"] = {
    /* title: {
     *     text: "{{ ticker.code }}",
     *     left: 0,
     * }, */
    tooltip: {
        trigger: "axis",
        axisPointer: {
            type: "cross",
        },
    },
    legend: {
        data: ["日K", "MA5", "MA20", "MA30"],
    },
    grid: [
        {
            left: "10%",
            right: "10%",
            top: "5%",
            bottom: "30%",
        },
        {
            left: "10%",
            right: "10%",
            top: "70%",
            bottom: "5%",
        },
    ],
    axisPointer: {
        link: [
            {
                xAxisIndex: [0, 1],
            },
        ],
    },
    xAxis: [
        {
            type: "category",
            gridIndex: 0,
            data: data["{{ ticker.code }}"].categoryData,
            boundaryGap: false,
            axisLine: { onZero: false },
            splitLine: { show: false },
            min: "dataMin",
            max: "dataMax",
        },
        {
            type: "category",
            gridIndex: 1,
            data: data["{{ ticker.code }}"].categoryData,
            boundaryGap: false,
            splitLine: { show: false },
            axisLabel: { show: false },
            axisTick: { show: false },
            axisLine: { lineStyle: { color: "#777" } },
            min: "dataMin",
            max: "dataMax",
        },
    ],
    yAxis: [
      {
            type: "log",
            scale: true,
            gridIndex: 0,
            splitNumber: 5,
            splitArea: {
                show: true,
            },
            min: (value) => {return value.min * 0.9},
            max: (value) => {return value.max * 1.1},
        },
        {
            scale: true,
            gridIndex: 1,
            splitNumber: 2,
            axisLabel: { show: false },
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: { show: false },
        },
    ],
    dataZoom: [
        {
            type: "inside",
            xAxisIndex: [0, 1],
            start: 50,
            end: 100,
        },
    ],
    series: [
        {
            name: "volume",
            type: "bar",
            xAxisIndex: 1,
            yAxisIndex: 1,
            itemStyle: {
                color: "#7fbe9e",
            },
            emphasis: {
                itemStyle: {
                    color: "#140",
                },
            },
            data: volumes["{{ ticker.code }}"],
        },
        {
            name: "日K",
            type: "candlestick",
            data: data["{{ ticker.code }}"].values,
            itemStyle: {
                color: upColor,
                color0: downColor,
                borderColor: upBorderColor,
                borderColor0: downBorderColor,
            },
            markLine: {
                symbol: ["none", "none"],
                data: [
                    {
                        name: "min line on close",
                        type: "min",
                        valueDim: "close",
                    },
                    {
                        name: "max line on close",
                        type: "max",
                        valueDim: "close",
                    },
                ],
            },
        },
        {
            name: "MA5",
            type: "line",
            data: calculateMA(5, data["{{ ticker.code }}"]),
            smooth: true,
            lineStyle: {
                opacity: 0.5,
            },
        },
        {
            name: "MA20",
            type: "line",
            data: calculateMA(20, data["{{ ticker.code }}"]),
            smooth: true,
            lineStyle: {
                opacity: 0.5,
            },
        },
        {
            name: "MA30",
            type: "line",
            data: calculateMA(30, data["{{ ticker.code }}"]),
            smooth: true,
            lineStyle: {
                opacity: 0.5,
            },
        },
    ],
};
{% endfor %}

const draw_chart = (ticker, is_daily) => {
  var option_name = ticker;
  if (!is_daily) {
    option_name = ticker + "_weekly";
  }
  option[option_name] && myChart.setOption(option[option_name]);
};
