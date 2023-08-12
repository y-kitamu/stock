/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_MPX");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/15', 11.5, 11.45, 11.6, 11.21],
    ['2022/08/16', 11.5, 11.5, 11.68, 11.39],
    ['2022/08/17', 11.25, 11.26, 11.61, 11.25],
    ['2022/08/18', 11.18, 11.28, 11.31, 10.86],
    ['2022/08/19', 11.07, 11.13, 11.31, 10.86],
    ['2022/08/22', 11.11, 10.86, 11.4, 10.78],
    ['2022/08/23', 10.97, 10.84, 11.0, 10.78],
    ['2022/08/24', 10.84, 10.59, 10.87, 10.49],
    ['2022/08/25', 10.67, 10.62, 10.67, 10.41],
    ['2022/08/26', 10.7, 10.45, 10.7, 10.3],
    ['2022/08/29', 10.25, 10.24, 10.39, 10.16],
    ['2022/08/30', 10.28, 10.03, 10.46, 9.9],
    ['2022/08/31', 10.05, 9.93, 10.15, 9.62],
    ['2022/09/01', 9.77, 10.15, 10.24, 9.63],
    ['2022/09/02', 10.35, 10.47, 10.5, 10.3],
    ['2022/09/06', 10.41, 10.47, 10.51, 10.09],
    ['2022/09/07', 10.5, 10.38, 10.5, 10.23],
    ['2022/09/08', 10.2, 10.2, 10.28, 9.98],
    ['2022/09/09', 10.36, 10.44, 10.49, 10.18],
    ['2022/09/12', 10.46, 10.13, 10.46, 10.08],
    ['2022/09/13', 10.15, 9.58, 10.15, 9.53],
    ['2022/09/14', 9.58, 9.22, 9.6, 9.2],
    ['2022/09/15', 9.3, 9.56, 9.77, 9.26],
    ['2022/09/16', 9.41, 8.78, 9.54, 8.77],
    ['2022/09/19', 9.16, 9.16, 9.24, 8.86],
    ['2022/09/20', 9.18, 8.78, 9.18, 8.78],
    ['2022/09/21', 8.93, 8.85, 9.0, 8.66],
    ['2022/09/22', 8.88, 8.86, 9.03, 8.8],
    ['2022/09/23', 8.79, 8.6, 8.87, 8.54],
    ['2022/09/26', 8.68, 8.34, 8.68, 8.27],
    ['2022/09/27', 8.34, 8.59, 8.76, 8.26],
    ['2022/09/28', 8.74, 8.57, 8.74, 8.43],
    ['2022/09/29', 8.41, 8.5, 8.58, 8.29],
    ['2022/09/30', 8.53, 8.46, 8.6, 8.43],
    ['2022/10/03', 8.53, 8.8, 8.87, 7.75],
    ['2022/10/04', 8.99, 9.15, 9.28, 8.86],
    ['2022/10/05', 8.97, 9.09, 9.16, 8.97],
    ['2022/10/06', 9.14, 9.32, 9.6, 9.09],
    ['2022/10/07', 9.08, 8.76, 9.15, 8.57],
    ['2022/10/10', 8.79, 8.7, 9.11, 8.56],
    ['2022/10/11', 8.83, 9.05, 9.23, 8.55],
    ['2022/10/12', 9.17, 8.95, 9.17, 8.95],
    ['2022/10/13', 8.86, 8.82, 8.88, 8.64],
    ['2022/10/14', 8.78, 8.58, 8.78, 8.51],
    ['2022/10/17', 8.78, 8.77, 8.88, 8.64],
    ['2022/10/18', 8.99, 8.35, 9.13, 8.27],
    ['2022/10/19', 8.35, 8.11, 8.35, 7.91],
    ['2022/10/20', 8.1, 8.33, 8.38, 8.1],
    ['2022/10/21', 8.47, 8.68, 8.78, 8.39],
    ['2022/10/24', 8.7, 8.48, 8.7, 8.4],
    ['2022/10/25', 8.77, 8.91, 8.94, 8.56],
    ['2022/10/26', 9.38, 9.53, 9.93, 9.3],
    ['2022/10/27', 9.51, 9.63, 9.83, 9.51],
    ['2022/10/28', 9.78, 10.13, 10.13, 9.58],
    ['2022/10/31', 10.13, 10.0, 10.22, 10.0],
    ['2022/11/01', 9.95, 10.44, 10.46, 9.9],
    ['2022/11/02', 10.23, 10.57, 10.82, 10.18],
    ['2022/11/03', 10.5, 10.55, 10.76, 10.5],
    ['2022/11/04', 10.73, 10.81, 10.83, 10.58],
    ['2022/11/07', 10.97, 11.13, 11.19, 10.84],
    ['2022/11/08', 11.15, 11.28, 11.48, 11.15],
    ['2022/11/09', 11.1, 10.9, 11.15, 10.71],
    ['2022/11/10', 11.0, 11.82, 11.92, 10.97],
    ['2022/11/11', 11.91, 11.5, 11.91, 11.37],
    ['2022/11/14', 11.44, 11.45, 11.63, 11.36],
    ['2022/11/15', 11.44, 11.55, 11.73, 11.44],
    ['2022/11/16', 11.48, 11.38, 11.72, 11.37],
    ['2022/11/17', 11.16, 11.04, 11.16, 10.9],
    ['2022/11/18', 11.22, 11.1, 11.26, 10.9],
    ['2022/11/21', 10.99, 10.96, 11.11, 10.88],
    ['2022/11/22', 10.93, 11.19, 11.28, 10.93],
    ['2022/11/23', 11.09, 11.08, 11.2, 10.99],
    ['2022/11/25', 11.14, 11.3, 11.4, 11.14],
    ['2022/11/28', 11.4, 11.33, 11.75, 11.11],
    ['2022/11/29', 11.31, 11.65, 11.65, 11.31],
    ['2022/11/30', 11.37, 11.65, 11.72, 11.36],
    ['2022/12/01', 11.7, 11.46, 11.7, 11.33],
    ['2022/12/02', 11.43, 11.53, 11.88, 11.43],
    ['2022/12/05', 11.39, 10.99, 11.63, 10.87],
    ['2022/12/06', 11.09, 10.65, 11.09, 10.32],
    ['2022/12/07', 10.65, 10.93, 10.93, 10.62],
    ['2022/12/08', 11.01, 10.98, 11.03, 10.98],
    ['2022/12/09', 11.07, 11.34, 11.42, 11.03],
    ['2022/12/12', 11.33, 11.24, 11.35, 10.9],
    ['2022/12/13', 11.31, 11.16, 11.77, 10.07],
    ['2022/12/14', 11.25, 11.41, 11.52, 11.25],
    ['2022/12/15', 11.31, 11.55, 11.66, 11.31],
    ['2022/12/16', 11.39, 11.05, 11.46, 11.05],
    ['2022/12/19', 11.19, 11.15, 11.38, 11.04],
    ['2022/12/20', 11.04, 12.06, 12.18, 10.91],
    ['2022/12/21', 12.06, 12.3, 12.37, 11.79],
    ['2022/12/22', 12.25, 12.05, 12.25, 11.88],
    ['2022/12/23', 11.9, 11.78, 11.9, 11.74],
    ['2022/12/27', 11.66, 11.89, 11.97, 11.66],
    ['2022/12/28', 11.89, 11.3, 11.98, 11.3],
    ['2022/12/29', 11.41, 11.66, 11.77, 11.4],
    ['2022/12/30', 11.67, 11.77, 12.08, 11.36],
    ['2023/01/03', 11.8, 11.54, 11.86, 11.38],
    ['2023/01/04', 11.74, 11.74, 11.99, 11.74],
    ['2023/01/05', 11.65, 11.6, 11.65, 11.49],
    ['2023/01/06', 11.79, 12.13, 12.14, 11.67],
    ['2023/01/09', 12.19, 12.29, 12.33, 11.83],
    ['2023/01/10', 12.26, 12.59, 12.59, 12.14],
    ['2023/01/11', 12.7, 12.74, 12.75, 12.56],
    ['2023/01/12', 12.7, 13.15, 13.22, 12.63],
    ['2023/01/13', 13.15, 13.61, 13.61, 12.76],
    ['2023/01/17', 13.77, 13.91, 13.93, 13.67],
    ['2023/01/18', 13.82, 13.58, 13.98, 13.52],
    ['2023/01/19', 13.44, 13.37, 13.63, 13.1],
    ['2023/01/20', 13.47, 13.66, 13.75, 13.46],
    ['2023/01/23', 13.78, 13.45, 13.78, 13.25],
    ['2023/01/24', 13.58, 13.23, 13.58, 13.15],
    ['2023/01/25', 13.69, 13.2, 13.69, 12.98],
    ['2023/01/26', 13.12, 12.99, 13.16, 12.74],
    ['2023/01/27', 13.06, 12.85, 13.06, 12.76],
    ['2023/01/30', 12.85, 12.6, 12.92, 12.51],
    ['2023/01/31', 12.6, 13.3, 13.33, 12.6],
    ['2023/02/01', 13.39, 13.61, 13.89, 13.27],
    ['2023/02/02', 13.68, 13.64, 13.94, 13.52],
    ['2023/02/03', 13.64, 13.65, 13.93, 13.43],
    ['2023/02/06', 13.68, 13.7, 14.55, 13.65],
    ['2023/02/07', 13.81, 13.71, 14.2, 13.56],
    ['2023/02/08', 13.62, 13.88, 14.04, 13.62],
    ['2023/02/09', 13.91, 13.58, 14.12, 13.4],
    ['2023/02/10', 13.58, 13.26, 13.59, 13.19],
    ['2023/02/13', 13.23, 13.76, 13.91, 13.23],
    ['2023/02/14', 13.76, 13.73, 14.04, 13.42],
    ['2023/02/15', 13.73, 13.76, 13.96, 13.31],
    ['2023/02/16', 13.56, 13.73, 14.0, 13.53],
    ['2023/02/17', 13.83, 13.72, 13.97, 13.39],
    ['2023/02/21', 13.49, 13.2, 13.49, 13.2],
    ['2023/02/22', 13.37, 13.2, 13.66, 13.01],
    ['2023/02/23', 13.38, 13.32, 13.38, 13.28],
    ['2023/02/24', 13.14, 13.09, 13.17, 12.95],
    ['2023/02/27', 13.21, 12.94, 13.21, 12.94],
    ['2023/02/28', 13.0, 12.8, 13.1, 12.8],
    ['2023/03/01', 12.87, 12.5, 12.89, 12.09],
    ['2023/03/02', 12.32, 13.24, 13.33, 12.32],
    ['2023/03/03', 13.43, 13.52, 13.58, 13.25],
    ['2023/03/06', 13.52, 13.57, 13.89, 13.39],
    ['2023/03/07', 13.45, 13.62, 13.74, 13.36],
    ['2023/03/08', 13.7, 13.54, 13.75, 13.47],
    ['2023/03/09', 13.64, 13.2, 13.77, 13.05],
    ['2023/03/10', 13.16, 12.97, 13.19, 12.92],
    ['2023/03/13', 12.86, 12.82, 13.37, 12.53],
    ['2023/03/14', 13.22, 12.85, 13.29, 12.85],
    ['2023/03/15', 12.5, 12.78, 13.0, 12.5],
    ['2023/03/16', 12.89, 12.95, 13.16, 12.62],
    ['2023/03/17', 12.8, 12.48, 12.92, 12.31],
    ['2023/03/20', 12.49, 12.16, 12.77, 12.0],
    ['2023/03/21', 12.24, 12.58, 12.78, 12.24],
    ['2023/03/22', 12.46, 12.26, 12.76, 12.09],
    ['2023/03/23', 12.26, 11.7, 12.43, 11.53],
    ['2023/03/24', 11.53, 11.82, 11.91, 11.52],
    ['2023/03/27', 12.05, 12.42, 12.52, 11.82],
    ['2023/03/28', 12.26, 12.82, 13.06, 12.26],
    ['2023/03/29', 13.02, 13.02, 13.12, 12.74],
    ['2023/03/30', 13.13, 13.13, 13.3, 12.98],
    ['2023/03/31', 13.37, 13.19, 13.45, 13.05],
    ['2023/04/03', 13.3, 13.07, 13.3, 12.81],
    ['2023/04/04', 13.18, 13.01, 13.2, 12.93],
    ['2023/04/05', 13.07, 13.11, 13.24, 12.9],
    ['2023/04/06', 13.07, 13.01, 13.29, 12.91],
    ['2023/04/10', 13.08, 13.65, 13.65, 12.29],
    ['2023/04/11', 13.58, 13.44, 13.7, 13.3],
    ['2023/04/12', 13.66, 13.29, 13.66, 13.13],
    ['2023/04/13', 13.23, 13.34, 13.46, 13.23],
    ['2023/04/14', 13.38, 13.23, 13.47, 13.02],
    ['2023/04/17', 13.4, 13.41, 13.69, 13.23],
    ['2023/04/18', 13.57, 13.1, 13.57, 13.07],
    ['2023/04/19', 13.16, 13.36, 13.6, 12.98],
    ['2023/04/20', 13.38, 13.37, 13.5, 13.09],
    ['2023/04/21', 13.32, 13.43, 13.7, 13.2],
    ['2023/04/24', 13.16, 13.21, 13.36, 13.08],
    ['2023/04/25', 13.2, 13.22, 13.59, 13.13],
    ['2023/04/26', 13.21, 13.46, 14.05, 13.21],
    ['2023/04/27', 13.46, 13.67, 13.94, 13.46],
    ['2023/04/28', 13.75, 13.77, 14.0, 13.63],
    ['2023/05/01', 14.04, 14.75, 14.86, 14.04],
    ['2023/05/02', 14.79, 13.96, 14.79, 13.85],
    ['2023/05/03', 14.06, 13.85, 14.25, 13.79],
    ['2023/05/04', 13.92, 13.87, 14.14, 13.77],
    ['2023/05/05', 14.03, 14.36, 14.69, 14.03],
    ['2023/05/08', 14.59, 14.5, 14.91, 14.46],
    ['2023/05/09', 14.47, 14.6, 14.79, 14.15],
    ['2023/05/10', 14.7, 14.61, 14.7, 14.13],
    ['2023/05/11', 14.4, 14.48, 14.82, 14.31],
    ['2023/05/12', 14.44, 14.49, 14.67, 14.28],
    ['2023/05/15', 14.63, 14.4, 14.8, 14.16],
    ['2023/05/16', 14.58, 14.3, 14.62, 14.02],
    ['2023/05/17', 14.3, 14.46, 14.46, 14.14],
    ['2023/05/18', 14.48, 14.75, 14.8, 14.32],
    ['2023/05/19', 14.8, 14.46, 14.8, 14.32],
    ['2023/05/22', 14.56, 14.96, 15.0, 14.26],
    ['2023/05/23', 14.9, 15.16, 15.18, 14.7],
    ['2023/05/24', 15.15, 15.2, 15.27, 14.83],
    ['2023/05/25', 15.17, 15.52, 15.64, 14.99],
    ['2023/05/26', 15.6, 15.46, 15.85, 15.38],
    ['2023/05/30', 15.64, 15.44, 15.77, 15.17],
    ['2023/05/31', 15.4, 15.28, 15.4, 15.03],
    ['2023/06/01', 15.28, 14.84, 15.28, 14.83],
    ['2023/06/02', 14.88, 15.67, 15.69, 14.83],
    ['2023/06/05', 15.65, 15.03, 15.71, 15.02],
    ['2023/06/06', 15.13, 16.0, 16.31, 15.1],
    ['2023/06/07', 16.28, 16.43, 16.49, 16.09],
    ['2023/06/08', 16.34, 16.55, 16.8, 16.2],
    ['2023/06/09', 16.48, 16.1, 16.53, 15.89],
    ['2023/06/12', 16.1, 15.8, 16.11, 15.65],
    ['2023/06/13', 15.8, 16.39, 16.45, 15.8],
    ['2023/06/14', 16.29, 15.76, 16.41, 15.68],
    ['2023/06/15', 15.76, 16.58, 16.89, 15.76],
    ['2023/06/16', 16.67, 16.18, 16.69, 16.15],
    ['2023/06/20', 16.2, 16.24, 16.46, 16.08],
    ['2023/06/21', 16.22, 16.33, 16.75, 16.18],
    ['2023/06/22', 16.15, 16.11, 16.32, 15.94],
    ['2023/06/23', 15.91, 16.3, 16.34, 15.91],
    ['2023/06/26', 16.3, 16.34, 16.6, 16.17],
    ['2023/06/27', 16.48, 16.71, 16.89, 16.29],
    ['2023/06/28', 16.77, 16.74, 16.8, 16.63],
    ['2023/06/29', 16.79, 16.84, 16.95, 16.68],
    ['2023/06/30', 16.88, 16.86, 16.9, 16.68],
    ['2023/07/03', 16.79, 17.03, 17.03, 16.68],
    ['2023/07/05', 17.0, 16.95, 17.0, 16.61],
    ['2023/07/06', 16.95, 16.47, 16.95, 16.34],
    ['2023/07/07', 16.43, 16.59, 17.06, 16.19],
    ['2023/07/10', 16.59, 16.56, 16.73, 16.5],
    ['2023/07/11', 16.71, 17.04, 17.1, 16.6],
    ['2023/07/12', 17.19, 17.51, 17.73, 17.1],
    ['2023/07/13', 17.62, 17.45, 17.62, 17.18],
    ['2023/07/14', 17.49, 17.19, 17.49, 16.95],
    ['2023/07/17', 17.21, 17.32, 17.52, 17.09],
    ['2023/07/18', 17.37, 17.41, 17.58, 17.36],
    ['2023/07/19', 17.41, 17.3, 17.52, 17.06],
    ['2023/07/20', 17.38, 17.02, 17.38, 16.93],
    ['2023/07/21', 17.14, 16.83, 17.14, 16.72],
    ['2023/07/24', 16.73, 16.91, 16.94, 16.5],
    ['2023/07/25', 17.03, 16.83, 17.19, 16.66],
    ['2023/07/26', 16.77, 16.98, 16.98, 16.52],
    ['2023/07/27', 17.11, 16.78, 17.11, 16.69],
    ['2023/07/28', 16.91, 17.25, 17.34, 16.78],
    ['2023/07/31', 17.2, 16.04, 17.2, 15.34],
    ['2023/08/01', 16.04, 16.07, 16.31, 15.92],
    ['2023/08/02', 16.0, 16.36, 16.42, 15.79],
    ['2023/08/03', 16.0, 16.18, 16.25, 16.0],
    ['2023/08/04', 16.32, 16.12, 16.34, 16.01],
    ['2023/08/07', 16.21, 15.73, 16.21, 15.6],
    ['2023/08/08', 15.68, 16.27, 16.83, 15.68],
    ['2023/08/09', 16.17, 16.26, 16.36, 15.72],
    ['2023/08/10', 16.2, 16.17, 16.45, 16.06],
    ['2023/08/11', 16.18, 17.35, 17.81, 16.18],
]);
var volumes = [
    17600.0,
    15700.0,
    7100.0,
    11000.0,
    11500.0,
    15200.0,
    10000.0,
    18400.0,
    11900.0,
    11000.0,
    11800.0,
    8400.0,
    10300.0,
    17800.0,
    12300.0,
    17800.0,
    53600.0,
    28500.0,
    36800.0,
    12500.0,
    17700.0,
    24000.0,
    26700.0,
    90100.0,
    25300.0,
    18700.0,
    19000.0,
    10600.0,
    138500.0,
    22800.0,
    51500.0,
    48600.0,
    13900.0,
    37600.0,
    46300.0,
    20200.0,
    8200.0,
    7700.0,
    21300.0,
    17200.0,
    22000.0,
    5200.0,
    20300.0,
    16700.0,
    19900.0,
    32800.0,
    17000.0,
    6400.0,
    14200.0,
    18400.0,
    11500.0,
    30200.0,
    13500.0,
    17700.0,
    27100.0,
    38700.0,
    37000.0,
    9500.0,
    7700.0,
    29300.0,
    19500.0,
    16800.0,
    30200.0,
    18100.0,
    9700.0,
    12400.0,
    7600.0,
    11200.0,
    9600.0,
    7800.0,
    8200.0,
    6000.0,
    2200.0,
    7400.0,
    8200.0,
    10600.0,
    7500.0,
    11200.0,
    15900.0,
    22400.0,
    12100.0,
    2600.0,
    15500.0,
    28000.0,
    141400.0,
    24000.0,
    10900.0,
    49500.0,
    16400.0,
    55600.0,
    12900.0,
    21100.0,
    4900.0,
    8600.0,
    20500.0,
    7300.0,
    38800.0,
    9900.0,
    5900.0,
    14200.0,
    11600.0,
    11200.0,
    27000.0,
    19600.0,
    16400.0,
    13600.0,
    24400.0,
    14400.0,
    16800.0,
    13100.0,
    16300.0,
    20800.0,
    16500.0,
    25200.0,
    16600.0,
    20300.0,
    23000.0,
    26000.0,
    31100.0,
    44500.0,
    115800.0,
    27100.0,
    16400.0,
    24500.0,
    15600.0,
    28900.0,
    22000.0,
    19000.0,
    14500.0,
    15300.0,
    15300.0,
    13200.0,
    3500.0,
    12700.0,
    6500.0,
    17400.0,
    52800.0,
    17500.0,
    9100.0,
    29900.0,
    12700.0,
    10900.0,
    19100.0,
    10400.0,
    18900.0,
    31100.0,
    16500.0,
    11400.0,
    41600.0,
    44900.0,
    32500.0,
    18500.0,
    38600.0,
    18600.0,
    29800.0,
    25000.0,
    16500.0,
    30000.0,
    21400.0,
    27100.0,
    17200.0,
    12000.0,
    14600.0,
    17100.0,
    12500.0,
    10300.0,
    10700.0,
    11500.0,
    15400.0,
    22000.0,
    19200.0,
    9200.0,
    17100.0,
    16200.0,
    7700.0,
    33200.0,
    25500.0,
    14500.0,
    65400.0,
    45100.0,
    22300.0,
    77300.0,
    57300.0,
    77800.0,
    54800.0,
    43600.0,
    56900.0,
    17900.0,
    55400.0,
    42400.0,
    31000.0,
    43300.0,
    32000.0,
    42700.0,
    67400.0,
    60900.0,
    53200.0,
    59500.0,
    31600.0,
    25900.0,
    44900.0,
    57400.0,
    26900.0,
    92800.0,
    52500.0,
    51300.0,
    27200.0,
    35200.0,
    42800.0,
    37700.0,
    58900.0,
    81700.0,
    27800.0,
    50100.0,
    28100.0,
    118700.0,
    26700.0,
    54900.0,
    39400.0,
    34000.0,
    47700.0,
    30400.0,
    38800.0,
    65400.0,
    42500.0,
    28900.0,
    72200.0,
    47400.0,
    27000.0,
    29600.0,
    40500.0,
    26300.0,
    28500.0,
    18300.0,
    21800.0,
    25500.0,
    26000.0,
    32300.0,
    32000.0,
    30200.0,
    152500.0,
    34600.0,
    80800.0,
    28900.0,
    65500.0,
    48400.0,
    88000.0,
    54600.0,
    33400.0,
    143300.0,
]

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

function calculateMA(dayCount) {
    var result = [];
    for (var i = 0, len = data.values.length; i < len; i++) {
        if (i < dayCount) {
            result.push("-");
            continue;
        }
        var sum = 0;
        for (var j = 0; j < dayCount; j++) {
            sum += +data.values[i - j][1];
        }
        result.push(sum / dayCount);
    }
    return result;
}

option = {
    /* title: {
     *     text: "MPX",
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
            data: data.categoryData,
            boundaryGap: false,
            axisLine: { onZero: false },
            splitLine: { show: false },
            min: "dataMin",
            max: "dataMax",
        },
        {
            type: "category",
            gridIndex: 1,
            data: data.categoryData,
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
            scale: true,
            gridIndex: 0,
            splitNumber: 2,
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
            data: volumes,
        },
        {
            name: "日K",
            type: "candlestick",
            data: data.values,
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
            data: calculateMA(5),
            smooth: true,
            lineStyle: {
                opacity: 0.5,
            },
        },
        {
            name: "MA20",
            type: "line",
            data: calculateMA(20),
            smooth: true,
            lineStyle: {
                opacity: 0.5,
            },
        },
        {
            name: "MA30",
            type: "line",
            data: calculateMA(30),
            smooth: true,
            lineStyle: {
                opacity: 0.5,
            },
        },
    ],
};

option && myChart.setOption(option);