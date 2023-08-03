/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_AMWD");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/03', 49.76, 49.7, 50.48, 49.2],
    ['2022/08/04', 49.88, 49.78, 50.22, 49.1],
    ['2022/08/05', 49.12, 49.54, 49.65, 48.4],
    ['2022/08/08', 49.64, 50.73, 51.12, 49.64],
    ['2022/08/09', 50.74, 48.19, 50.74, 47.87],
    ['2022/08/10', 48.94, 49.2, 50.12, 48.94],
    ['2022/08/11', 49.94, 51.86, 52.18, 49.28],
    ['2022/08/12', 52.21, 52.61, 52.94, 51.6],
    ['2022/08/15', 51.86, 53.13, 53.41, 51.01],
    ['2022/08/16', 53.04, 53.92, 54.11, 52.68],
    ['2022/08/17', 53.4, 53.79, 53.85, 52.18],
    ['2022/08/18', 52.56, 52.23, 53.51, 51.49],
    ['2022/08/19', 52.72, 51.13, 52.72, 51.04],
    ['2022/08/22', 50.38, 50.16, 50.92, 49.83],
    ['2022/08/23', 50.18, 49.0, 50.63, 48.81],
    ['2022/08/24', 48.55, 49.3, 50.03, 48.29],
    ['2022/08/25', 49.21, 51.07, 51.07, 48.76],
    ['2022/08/26', 51.07, 47.82, 51.07, 47.72],
    ['2022/08/29', 47.1, 47.44, 48.15, 46.82],
    ['2022/08/30', 52.17, 52.44, 55.46, 50.51],
    ['2022/08/31', 53.17, 51.83, 54.1, 51.83],
    ['2022/09/01', 51.6, 52.59, 53.09, 50.93],
    ['2022/09/02', 53.19, 51.43, 53.77, 51.27],
    ['2022/09/06', 51.3, 50.15, 51.72, 49.16],
    ['2022/09/07', 50.19, 51.46, 51.65, 49.79],
    ['2022/09/08', 51.0, 51.05, 51.48, 49.99],
    ['2022/09/09', 51.27, 52.73, 52.77, 51.27],
    ['2022/09/12', 52.73, 52.83, 53.58, 52.46],
    ['2022/09/13', 52.13, 49.47, 52.13, 49.27],
    ['2022/09/14', 49.25, 48.22, 50.0, 47.61],
    ['2022/09/15', 48.36, 47.46, 48.88, 47.29],
    ['2022/09/16', 46.69, 48.42, 48.48, 45.91],
    ['2022/09/19', 48.87, 49.89, 50.04, 47.85],
    ['2022/09/20', 49.3, 48.91, 49.46, 47.98],
    ['2022/09/21', 49.26, 48.84, 50.5, 48.79],
    ['2022/09/22', 48.84, 46.81, 48.84, 46.26],
    ['2022/09/23', 46.48, 45.88, 46.48, 45.09],
    ['2022/09/26', 45.62, 44.28, 46.8, 44.15],
    ['2022/09/27', 44.63, 43.89, 45.18, 43.01],
    ['2022/09/28', 44.49, 45.79, 46.05, 44.0],
    ['2022/09/29', 45.31, 44.35, 45.31, 43.71],
    ['2022/09/30', 44.27, 43.86, 45.47, 43.79],
    ['2022/10/03', 44.95, 46.03, 46.43, 44.3],
    ['2022/10/04', 46.79, 47.9, 48.37, 46.79],
    ['2022/10/05', 46.93, 46.44, 47.5, 46.19],
    ['2022/10/06', 45.86, 47.2, 47.76, 45.86],
    ['2022/10/07', 46.7, 45.16, 46.7, 44.81],
    ['2022/10/10', 45.43, 45.82, 46.25, 44.92],
    ['2022/10/11', 45.65, 45.97, 46.41, 45.08],
    ['2022/10/12', 45.69, 44.97, 45.69, 44.75],
    ['2022/10/13', 44.06, 45.14, 45.7, 42.55],
    ['2022/10/14', 46.06, 43.68, 46.06, 43.63],
    ['2022/10/17', 44.76, 45.1, 47.16, 44.44],
    ['2022/10/18', 46.15, 46.06, 47.13, 45.2],
    ['2022/10/19', 45.62, 44.33, 45.64, 43.21],
    ['2022/10/20', 43.72, 41.81, 44.35, 41.05],
    ['2022/10/21', 42.1, 42.81, 43.36, 41.17],
    ['2022/10/24', 42.93, 43.59, 44.13, 42.29],
    ['2022/10/25', 43.76, 45.36, 46.06, 43.5],
    ['2022/10/26', 45.76, 44.99, 46.13, 44.18],
    ['2022/10/27', 45.32, 44.72, 46.27, 44.51],
    ['2022/10/28', 44.9, 46.22, 46.41, 44.13],
    ['2022/10/31', 45.53, 45.35, 46.23, 45.18],
    ['2022/11/01', 46.35, 46.9, 47.49, 45.84],
    ['2022/11/02', 46.81, 45.27, 47.82, 45.16],
    ['2022/11/03', 45.07, 43.71, 46.76, 43.6],
    ['2022/11/04', 44.33, 44.65, 45.49, 43.27],
    ['2022/11/07', 45.09, 44.93, 45.09, 43.86],
    ['2022/11/08', 45.55, 46.54, 46.87, 44.37],
    ['2022/11/09', 46.12, 46.32, 46.8, 46.06],
    ['2022/11/10', 48.72, 50.56, 52.32, 46.75],
    ['2022/11/11', 51.12, 52.89, 53.58, 50.95],
    ['2022/11/14', 52.78, 51.61, 53.71, 51.61],
    ['2022/11/15', 52.38, 54.28, 54.84, 51.96],
    ['2022/11/16', 54.02, 53.78, 54.02, 52.73],
    ['2022/11/17', 52.79, 53.08, 53.91, 50.32],
    ['2022/11/18', 54.27, 55.3, 55.55, 53.4],
    ['2022/11/21', 55.7, 54.35, 56.12, 53.79],
    ['2022/11/22', 56.0, 54.73, 59.49, 54.04],
    ['2022/11/23', 54.69, 56.7, 57.32, 54.69],
    ['2022/11/25', 56.87, 56.0, 56.87, 55.62],
    ['2022/11/28', 55.49, 53.62, 55.86, 53.21],
    ['2022/11/29', 53.8, 53.41, 55.16, 53.02],
    ['2022/11/30', 53.34, 54.2, 54.28, 51.63],
    ['2022/12/01', 54.29, 54.94, 55.49, 53.66],
    ['2022/12/02', 53.8, 54.52, 54.92, 53.01],
    ['2022/12/05', 53.31, 52.37, 53.83, 52.15],
    ['2022/12/06', 52.37, 52.46, 53.43, 51.62],
    ['2022/12/07', 52.43, 50.85, 53.41, 50.84],
    ['2022/12/08', 51.19, 53.33, 53.7, 50.86],
    ['2022/12/09', 52.97, 53.82, 54.11, 52.91],
    ['2022/12/12', 54.29, 55.82, 56.24, 54.02],
    ['2022/12/13', 58.46, 56.09, 59.47, 55.92],
    ['2022/12/14', 55.96, 55.78, 56.85, 54.92],
    ['2022/12/15', 54.89, 54.0, 54.89, 52.94],
    ['2022/12/16', 53.29, 54.28, 55.73, 52.53],
    ['2022/12/19', 54.4, 53.39, 54.74, 52.77],
    ['2022/12/20', 52.99, 51.85, 53.07, 51.74],
    ['2022/12/21', 52.43, 52.1, 52.72, 51.43],
    ['2022/12/22', 51.49, 51.04, 51.77, 50.21],
    ['2022/12/23', 50.91, 50.99, 51.13, 50.0],
    ['2022/12/27', 51.02, 51.05, 55.36, 49.95],
    ['2022/12/28', 51.13, 49.04, 51.45, 48.89],
    ['2022/12/29', 49.27, 49.56, 50.33, 49.27],
    ['2022/12/30', 49.21, 48.86, 49.5, 48.51],
    ['2023/01/03', 49.3, 49.32, 50.01, 48.74],
    ['2023/01/04', 50.02, 51.39, 51.6, 49.5],
    ['2023/01/05', 50.83, 50.18, 50.99, 49.03],
    ['2023/01/06', 50.88, 51.56, 54.96, 50.02],
    ['2023/01/09', 52.37, 51.34, 53.35, 51.15],
    ['2023/01/10', 51.1, 51.84, 52.09, 51.1],
    ['2023/01/11', 52.32, 53.18, 53.18, 51.76],
    ['2023/01/12', 53.64, 53.79, 54.06, 52.51],
    ['2023/01/13', 53.15, 54.02, 54.4, 52.89],
    ['2023/01/17', 54.07, 54.08, 54.69, 53.8],
    ['2023/01/18', 54.5, 54.01, 55.74, 53.95],
    ['2023/01/19', 53.71, 51.76, 53.71, 51.69],
    ['2023/01/20', 52.29, 52.57, 52.66, 51.0],
    ['2023/01/23', 52.54, 52.99, 53.63, 52.33],
    ['2023/01/24', 52.72, 53.23, 53.75, 52.0],
    ['2023/01/25', 52.87, 53.31, 53.33, 52.62],
    ['2023/01/26', 53.49, 52.93, 53.93, 51.86],
    ['2023/01/27', 52.84, 54.06, 54.28, 52.84],
    ['2023/01/30', 53.61, 54.31, 54.97, 53.61],
    ['2023/01/31', 54.58, 57.29, 57.45, 54.58],
    ['2023/02/01', 56.84, 57.98, 58.56, 55.56],
    ['2023/02/02', 58.47, 60.26, 60.78, 58.22],
    ['2023/02/03', 59.2, 59.24, 60.56, 58.38],
    ['2023/02/06', 58.57, 57.75, 59.01, 57.49],
    ['2023/02/07', 57.75, 58.21, 58.64, 56.68],
    ['2023/02/08', 57.73, 57.56, 58.39, 56.55],
    ['2023/02/09', 58.17, 56.93, 59.3, 56.36],
    ['2023/02/10', 56.55, 57.03, 59.03, 55.52],
    ['2023/02/13', 57.17, 58.7, 58.7, 57.17],
    ['2023/02/14', 58.27, 58.36, 58.81, 57.55],
    ['2023/02/15', 57.89, 59.47, 59.75, 57.0],
    ['2023/02/16', 58.39, 59.21, 59.75, 58.03],
    ['2023/02/17', 59.48, 58.54, 59.48, 58.06],
    ['2023/02/21', 57.64, 56.87, 58.02, 56.63],
    ['2023/02/22', 57.0, 57.41, 58.37, 56.83],
    ['2023/02/23', 57.58, 57.83, 58.24, 56.96],
    ['2023/02/24', 56.58, 58.14, 58.68, 56.58],
    ['2023/02/27', 58.7, 58.62, 59.47, 58.19],
    ['2023/02/28', 55.42, 50.98, 57.42, 49.98],
    ['2023/03/01', 51.8, 52.61, 53.48, 50.4],
    ['2023/03/02', 51.93, 55.66, 55.95, 51.93],
    ['2023/03/03', 56.09, 57.36, 57.76, 54.6],
    ['2023/03/06', 57.17, 54.79, 57.57, 53.53],
    ['2023/03/07', 54.84, 54.06, 55.11, 53.65],
    ['2023/03/08', 53.97, 54.14, 54.4, 53.3],
    ['2023/03/09', 54.29, 53.71, 55.16, 53.23],
    ['2023/03/10', 53.5, 53.02, 54.17, 52.3],
    ['2023/03/13', 52.19, 51.52, 52.93, 51.35],
    ['2023/03/14', 52.83, 51.82, 52.98, 51.13],
    ['2023/03/15', 50.6, 50.31, 51.72, 49.88],
    ['2023/03/16', 49.86, 51.49, 52.32, 49.28],
    ['2023/03/17', 50.72, 50.61, 51.72, 49.9],
    ['2023/03/20', 51.09, 50.88, 51.96, 50.87],
    ['2023/03/21', 51.96, 52.09, 52.62, 51.3],
    ['2023/03/22', 51.81, 51.3, 52.9, 51.22],
    ['2023/03/23', 51.59, 50.59, 52.2, 49.71],
    ['2023/03/24', 50.16, 49.84, 50.27, 48.94],
    ['2023/03/27', 50.56, 50.25, 50.87, 50.01],
    ['2023/03/28', 50.16, 50.28, 51.16, 49.87],
    ['2023/03/29', 51.0, 50.13, 51.04, 49.94],
    ['2023/03/30', 50.64, 50.1, 51.02, 49.73],
    ['2023/03/31', 50.54, 52.07, 52.34, 50.42],
    ['2023/04/03', 52.26, 52.15, 52.68, 51.33],
    ['2023/04/04', 52.35, 50.12, 52.35, 49.76],
    ['2023/04/05', 49.92, 49.4, 49.92, 49.1],
    ['2023/04/06', 49.57, 49.42, 49.81, 48.65],
    ['2023/04/10', 49.2, 49.7, 50.0, 49.09],
    ['2023/04/11', 50.02, 50.55, 51.08, 49.58],
    ['2023/04/12', 51.22, 50.3, 51.47, 50.21],
    ['2023/04/13', 50.81, 51.16, 51.36, 49.97],
    ['2023/04/14', 51.24, 50.81, 52.09, 50.53],
    ['2023/04/17', 51.02, 51.46, 51.59, 50.83],
    ['2023/04/18', 51.58, 51.48, 51.93, 51.17],
    ['2023/04/19', 51.38, 51.55, 51.95, 50.71],
    ['2023/04/20', 51.4, 51.55, 52.28, 51.12],
    ['2023/04/21', 51.45, 51.36, 51.88, 50.89],
    ['2023/04/24', 51.41, 51.34, 52.13, 50.76],
    ['2023/04/25', 50.72, 49.55, 51.29, 49.46],
    ['2023/04/26', 49.29, 48.03, 49.78, 48.02],
    ['2023/04/27', 48.13, 49.14, 49.47, 47.98],
    ['2023/04/28', 49.14, 50.52, 50.92, 49.14],
    ['2023/05/01', 50.52, 50.76, 51.68, 50.4],
    ['2023/05/02', 50.62, 50.23, 50.62, 49.1],
    ['2023/05/03', 50.47, 50.74, 51.91, 50.47],
    ['2023/05/04', 50.45, 49.06, 50.58, 48.52],
    ['2023/05/05', 50.0, 50.34, 50.94, 49.42],
    ['2023/05/08', 50.33, 50.76, 50.85, 50.07],
    ['2023/05/09', 50.49, 50.54, 51.48, 50.43],
    ['2023/05/10', 51.45, 51.43, 52.16, 50.9],
    ['2023/05/11', 51.04, 51.68, 51.76, 50.98],
    ['2023/05/12', 51.95, 51.58, 52.48, 51.2],
    ['2023/05/15', 51.67, 52.43, 52.74, 51.28],
    ['2023/05/16', 51.83, 51.79, 52.63, 51.39],
    ['2023/05/17', 52.14, 53.54, 53.71, 52.14],
    ['2023/05/18', 53.15, 54.31, 54.61, 53.15],
    ['2023/05/19', 55.02, 54.88, 55.02, 54.21],
    ['2023/05/22', 55.05, 54.15, 55.24, 53.99],
    ['2023/05/23', 54.08, 54.22, 55.79, 54.08],
    ['2023/05/24', 54.44, 53.99, 54.85, 53.8],
    ['2023/05/25', 57.2, 58.67, 63.02, 56.82],
    ['2023/05/26', 59.18, 64.13, 64.47, 59.18],
    ['2023/05/30', 64.5, 62.66, 64.5, 62.57],
    ['2023/05/31', 62.49, 59.5, 62.85, 58.92],
    ['2023/06/01', 59.35, 59.7, 60.18, 58.49],
    ['2023/06/02', 60.78, 63.43, 63.84, 60.78],
    ['2023/06/05', 62.99, 63.59, 64.01, 61.45],
    ['2023/06/06', 63.11, 65.86, 66.91, 63.11],
    ['2023/06/07', 66.5, 68.38, 69.07, 66.5],
    ['2023/06/08', 68.01, 68.56, 69.02, 67.84],
    ['2023/06/09', 68.66, 68.31, 69.3, 67.37],
    ['2023/06/12', 68.91, 69.56, 70.13, 67.96],
    ['2023/06/13', 69.97, 69.85, 70.46, 69.56],
    ['2023/06/14', 69.85, 68.85, 70.45, 68.33],
    ['2023/06/15', 68.7, 70.2, 70.33, 68.7],
    ['2023/06/16', 70.3, 70.56, 70.85, 69.62],
    ['2023/06/20', 70.61, 72.28, 72.58, 70.53],
    ['2023/06/21', 71.98, 71.88, 73.0, 71.79],
    ['2023/06/22', 71.88, 71.56, 72.09, 71.05],
    ['2023/06/23', 70.61, 69.85, 72.08, 69.64],
    ['2023/06/26', 69.88, 70.55, 71.12, 69.71],
    ['2023/06/27', 70.53, 72.23, 73.15, 70.51],
    ['2023/06/28', 72.02, 72.39, 72.65, 71.83],
    ['2023/06/29', 72.72, 75.25, 75.28, 72.69],
    ['2023/06/30', 75.87, 76.37, 77.54, 75.64],
    ['2023/07/03', 76.37, 76.12, 77.11, 75.52],
    ['2023/07/05', 75.6, 74.01, 75.6, 73.91],
    ['2023/07/06', 72.85, 72.26, 74.2, 71.76],
    ['2023/07/07', 72.43, 72.81, 74.04, 72.43],
    ['2023/07/10', 72.82, 74.47, 74.52, 72.82],
    ['2023/07/11', 74.94, 74.61, 75.32, 73.75],
    ['2023/07/12', 76.0, 74.53, 76.72, 74.52],
    ['2023/07/13', 74.95, 74.43, 74.99, 73.6],
    ['2023/07/14', 74.17, 74.28, 74.3, 72.5],
    ['2023/07/17', 74.06, 74.67, 75.07, 73.58],
    ['2023/07/18', 74.15, 74.97, 75.18, 73.62],
    ['2023/07/19', 75.17, 75.44, 75.93, 74.83],
    ['2023/07/20', 75.68, 77.16, 77.26, 75.14],
    ['2023/07/21', 77.77, 74.11, 77.93, 73.92],
    ['2023/07/24', 74.47, 75.38, 76.3, 74.47],
    ['2023/07/25', 75.0, 75.48, 77.05, 75.0],
    ['2023/07/26', 74.99, 76.73, 77.09, 74.04],
    ['2023/07/27', 77.12, 76.82, 78.22, 76.35],
    ['2023/07/28', 77.45, 76.75, 77.85, 76.36],
    ['2023/07/31', 76.95, 76.64, 77.34, 75.49],
    ['2023/08/01', 76.39, 77.16, 77.5, 76.32],
    ['2023/08/02', 76.55, 77.13, 77.51, 76.24],
]);
var volumes = [
    56900.0,
    60200.0,
    43600.0,
    76300.0,
    75900.0,
    85900.0,
    50500.0,
    54700.0,
    50600.0,
    57100.0,
    103100.0,
    84400.0,
    51700.0,
    49700.0,
    56500.0,
    61500.0,
    61500.0,
    80800.0,
    89800.0,
    309600.0,
    177300.0,
    134900.0,
    105100.0,
    133400.0,
    67800.0,
    73800.0,
    91200.0,
    71800.0,
    75300.0,
    93300.0,
    134100.0,
    301400.0,
    141500.0,
    99000.0,
    83400.0,
    82000.0,
    87600.0,
    105700.0,
    136100.0,
    282600.0,
    89400.0,
    116200.0,
    92500.0,
    76600.0,
    74100.0,
    75500.0,
    65000.0,
    52500.0,
    93800.0,
    50100.0,
    54700.0,
    59900.0,
    79800.0,
    72700.0,
    68600.0,
    138000.0,
    69700.0,
    90600.0,
    71300.0,
    54500.0,
    89800.0,
    83300.0,
    68400.0,
    94300.0,
    73600.0,
    70600.0,
    39100.0,
    66300.0,
    81700.0,
    64000.0,
    211100.0,
    115700.0,
    81500.0,
    100800.0,
    49200.0,
    111300.0,
    101300.0,
    136000.0,
    247000.0,
    108800.0,
    38100.0,
    116400.0,
    153900.0,
    160300.0,
    89700.0,
    59400.0,
    84600.0,
    124000.0,
    116000.0,
    111500.0,
    111300.0,
    98800.0,
    89100.0,
    54200.0,
    101100.0,
    305800.0,
    140000.0,
    84700.0,
    259400.0,
    87000.0,
    79100.0,
    88300.0,
    103500.0,
    80900.0,
    56200.0,
    68200.0,
    118500.0,
    98900.0,
    82700.0,
    78300.0,
    89400.0,
    132000.0,
    104200.0,
    78900.0,
    92600.0,
    57400.0,
    97100.0,
    83300.0,
    46900.0,
    55500.0,
    53800.0,
    99800.0,
    57300.0,
    67200.0,
    111200.0,
    143100.0,
    84600.0,
    97000.0,
    61700.0,
    79300.0,
    81300.0,
    124400.0,
    67300.0,
    60100.0,
    92200.0,
    63500.0,
    87600.0,
    59800.0,
    116600.0,
    113100.0,
    123600.0,
    85100.0,
    114700.0,
    310300.0,
    217200.0,
    134800.0,
    188500.0,
    204400.0,
    132900.0,
    97900.0,
    107300.0,
    131900.0,
    135300.0,
    124400.0,
    128600.0,
    91100.0,
    565000.0,
    96300.0,
    143900.0,
    102000.0,
    152700.0,
    111100.0,
    137800.0,
    66900.0,
    94600.0,
    53400.0,
    142400.0,
    108900.0,
    94800.0,
    68300.0,
    72200.0,
    150500.0,
    155900.0,
    97000.0,
    102000.0,
    59500.0,
    57700.0,
    69800.0,
    68200.0,
    56600.0,
    62800.0,
    38500.0,
    81800.0,
    47500.0,
    66200.0,
    75700.0,
    50500.0,
    56500.0,
    64600.0,
    89600.0,
    84800.0,
    53500.0,
    60800.0,
    87200.0,
    82800.0,
    61800.0,
    53500.0,
    68400.0,
    62000.0,
    85900.0,
    116800.0,
    93800.0,
    125900.0,
    95500.0,
    245800.0,
    206200.0,
    112500.0,
    119000.0,
    116600.0,
    208600.0,
    108200.0,
    184900.0,
    211500.0,
    112200.0,
    178400.0,
    176300.0,
    154600.0,
    126500.0,
    177900.0,
    380800.0,
    123600.0,
    74400.0,
    88000.0,
    164700.0,
    113900.0,
    98400.0,
    67000.0,
    127400.0,
    169100.0,
    76800.0,
    125000.0,
    106800.0,
    76700.0,
    79500.0,
    64500.0,
    71200.0,
    65600.0,
    80400.0,
    83300.0,
    131000.0,
    162700.0,
    145000.0,
    83600.0,
    77500.0,
    64100.0,
    66500.0,
    88600.0,
    85100.0,
    99300.0,
    102800.0,
    74200.0,
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
    title: {
        text: "AMWD",
        left: 0,
    },
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
            start: 40,
            end: 70,
            top: 30,
            height: 20,
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