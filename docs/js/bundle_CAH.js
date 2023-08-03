/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_CAH");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/03', 58.64, 58.64, 58.88, 57.85],
    ['2022/08/04', 58.87, 58.71, 59.62, 58.62],
    ['2022/08/05', 58.54, 59.95, 59.97, 58.48],
    ['2022/08/08', 60.12, 59.93, 60.65, 59.71],
    ['2022/08/09', 60.12, 60.2, 60.65, 59.94],
    ['2022/08/10', 60.58, 61.16, 61.17, 60.33],
    ['2022/08/11', 59.07, 64.33, 64.52, 58.99],
    ['2022/08/12', 64.15, 67.56, 67.79, 64.15],
    ['2022/08/15', 67.09, 68.19, 69.64, 65.39],
    ['2022/08/16', 68.08, 68.36, 69.31, 67.27],
    ['2022/08/17', 67.61, 67.36, 68.08, 66.98],
    ['2022/08/18', 67.6, 67.05, 67.89, 66.57],
    ['2022/08/19', 67.04, 67.47, 67.85, 66.94],
    ['2022/08/22', 67.32, 66.19, 67.45, 66.13],
    ['2022/08/23', 66.25, 66.26, 66.65, 66.08],
    ['2022/08/24', 66.3, 67.01, 67.19, 66.1],
    ['2022/08/25', 67.04, 67.35, 67.42, 66.72],
    ['2022/08/26', 67.34, 65.88, 67.62, 65.87],
    ['2022/08/29', 65.5, 67.92, 68.21, 65.1],
    ['2022/08/30', 68.1, 68.07, 68.78, 67.46],
    ['2022/08/31', 68.22, 68.93, 69.06, 67.91],
    ['2022/09/01', 68.63, 69.51, 69.73, 68.51],
    ['2022/09/02', 69.7, 69.19, 70.45, 68.97],
    ['2022/09/06', 69.39, 67.75, 69.61, 66.99],
    ['2022/09/07', 67.74, 69.17, 69.29, 67.3],
    ['2022/09/08', 69.17, 68.84, 69.39, 67.96],
    ['2022/09/09', 69.02, 68.12, 69.04, 68.1],
    ['2022/09/12', 68.11, 67.28, 68.35, 67.08],
    ['2022/09/13', 66.85, 65.13, 66.91, 64.96],
    ['2022/09/14', 65.27, 65.05, 65.67, 64.43],
    ['2022/09/15', 65.24, 64.71, 65.65, 64.58],
    ['2022/09/16', 64.46, 65.16, 65.33, 64.23],
    ['2022/09/19', 64.61, 66.47, 66.5, 64.49],
    ['2022/09/20', 66.22, 66.07, 66.58, 65.59],
    ['2022/09/21', 66.86, 65.81, 67.48, 65.79],
    ['2022/09/22', 65.89, 65.56, 66.06, 65.02],
    ['2022/09/23', 65.09, 64.37, 65.26, 63.34],
    ['2022/09/26', 64.06, 64.1, 64.8, 63.77],
    ['2022/09/27', 64.67, 64.53, 65.61, 63.87],
    ['2022/09/28', 67.41, 67.53, 67.83, 65.84],
    ['2022/09/29', 67.47, 66.07, 67.59, 65.53],
    ['2022/09/30', 66.38, 65.47, 66.71, 65.33],
    ['2022/10/03', 65.58, 66.73, 67.07, 64.85],
    ['2022/10/04', 67.29, 68.55, 68.57, 66.9],
    ['2022/10/05', 68.02, 68.13, 68.87, 67.34],
    ['2022/10/06', 67.95, 68.18, 68.66, 67.75],
    ['2022/10/07', 67.55, 66.98, 68.02, 66.5],
    ['2022/10/10', 67.04, 67.53, 67.79, 66.9],
    ['2022/10/11', 67.75, 69.05, 69.83, 67.22],
    ['2022/10/12', 68.82, 66.63, 69.12, 66.63],
    ['2022/10/13', 65.96, 67.62, 68.04, 65.7],
    ['2022/10/14', 68.1, 66.84, 68.44, 66.45],
    ['2022/10/17', 67.75, 66.98, 68.12, 66.77],
    ['2022/10/18', 67.92, 69.37, 69.39, 67.84],
    ['2022/10/19', 69.45, 69.51, 70.59, 69.01],
    ['2022/10/20', 69.43, 69.48, 69.65, 68.53],
    ['2022/10/21', 69.56, 71.7, 71.84, 69.43],
    ['2022/10/24', 72.33, 72.46, 73.16, 71.82],
    ['2022/10/25', 71.67, 72.38, 72.96, 71.42],
    ['2022/10/26', 73.19, 73.55, 74.08, 72.75],
    ['2022/10/27', 74.01, 73.97, 74.72, 73.68],
    ['2022/10/28', 74.3, 75.74, 75.79, 74.23],
    ['2022/10/31', 75.56, 74.52, 75.6, 74.45],
    ['2022/11/01', 74.61, 74.02, 75.11, 73.37],
    ['2022/11/02', 74.05, 73.69, 75.41, 73.67],
    ['2022/11/03', 73.25, 74.29, 74.79, 72.67],
    ['2022/11/04', 76.34, 78.07, 78.45, 75.63],
    ['2022/11/07', 77.86, 79.51, 80.09, 76.62],
    ['2022/11/08', 78.68, 78.65, 79.5, 77.56],
    ['2022/11/09', 78.54, 78.71, 79.73, 78.16],
    ['2022/11/10', 79.92, 76.51, 80.03, 74.66],
    ['2022/11/11', 76.65, 73.9, 76.83, 71.75],
    ['2022/11/14', 74.18, 73.84, 75.54, 73.72],
    ['2022/11/15', 73.97, 72.97, 74.76, 72.66],
    ['2022/11/16', 73.2, 73.81, 74.31, 72.99],
    ['2022/11/17', 73.75, 75.19, 75.3, 73.05],
    ['2022/11/18', 75.71, 76.27, 76.71, 75.49],
    ['2022/11/21', 76.01, 76.31, 77.0, 75.8],
    ['2022/11/22', 77.13, 77.46, 78.05, 76.95],
    ['2022/11/23', 77.45, 77.01, 77.96, 76.55],
    ['2022/11/25', 77.57, 77.51, 78.27, 77.07],
    ['2022/11/28', 77.19, 77.03, 78.11, 76.68],
    ['2022/11/29', 76.95, 77.22, 77.91, 76.68],
    ['2022/11/30', 77.06, 78.71, 78.76, 76.5],
    ['2022/12/01', 78.84, 77.82, 78.87, 77.12],
    ['2022/12/02', 77.74, 79.41, 80.0, 77.2],
    ['2022/12/05', 78.6, 78.03, 78.94, 77.74],
    ['2022/12/06', 77.87, 77.96, 78.5, 77.18],
    ['2022/12/07', 78.2, 78.69, 78.93, 77.86],
    ['2022/12/08', 78.69, 79.31, 79.79, 78.54],
    ['2022/12/09', 79.02, 76.14, 79.31, 75.91],
    ['2022/12/12', 76.48, 78.07, 78.07, 75.88],
    ['2022/12/13', 78.17, 76.84, 78.17, 76.61],
    ['2022/12/14', 77.14, 77.12, 77.53, 76.2],
    ['2022/12/15', 76.63, 77.14, 77.38, 76.2],
    ['2022/12/16', 76.54, 77.84, 77.95, 76.42],
    ['2022/12/19', 77.96, 77.9, 78.67, 77.49],
    ['2022/12/20', 78.07, 78.13, 78.96, 77.59],
    ['2022/12/21', 78.57, 78.54, 79.22, 78.21],
    ['2022/12/22', 78.54, 79.09, 79.43, 78.17],
    ['2022/12/23', 78.99, 78.59, 79.28, 78.18],
    ['2022/12/27', 78.54, 77.71, 78.59, 77.63],
    ['2022/12/28', 77.88, 77.17, 78.15, 77.1],
    ['2022/12/29', 77.61, 76.31, 77.61, 76.08],
    ['2022/12/30', 76.14, 75.96, 76.35, 75.13],
    ['2023/01/03', 75.55, 75.82, 75.84, 74.44],
    ['2023/01/04', 75.8, 76.09, 76.13, 75.05],
    ['2023/01/05', 75.88, 75.71, 76.09, 75.49],
    ['2023/01/06', 76.36, 77.71, 77.73, 76.08],
    ['2023/01/09', 77.73, 76.65, 78.17, 76.55],
    ['2023/01/10', 77.02, 77.2, 77.42, 76.23],
    ['2023/01/11', 77.26, 75.61, 77.42, 75.59],
    ['2023/01/12', 75.46, 75.61, 76.12, 74.99],
    ['2023/01/13', 75.4, 75.96, 76.32, 75.35],
    ['2023/01/17', 75.81, 75.51, 76.66, 75.37],
    ['2023/01/18', 75.3, 75.56, 76.34, 75.24],
    ['2023/01/19', 75.63, 74.58, 75.87, 74.37],
    ['2023/01/20', 75.0, 74.92, 75.72, 73.83],
    ['2023/01/23', 75.06, 74.58, 75.26, 74.39],
    ['2023/01/24', 74.16, 73.96, 74.5, 72.98],
    ['2023/01/25', 73.86, 74.83, 74.91, 73.61],
    ['2023/01/26', 75.04, 76.95, 77.02, 74.69],
    ['2023/01/27', 77.19, 75.57, 77.62, 75.46],
    ['2023/01/30', 75.92, 76.32, 76.61, 75.59],
    ['2023/01/31', 76.57, 76.33, 76.82, 75.32],
    ['2023/02/01', 76.09, 74.82, 76.52, 74.77],
    ['2023/02/02', 76.33, 75.37, 78.03, 73.7],
    ['2023/02/03', 78.43, 77.74, 79.48, 76.3],
    ['2023/02/06', 77.85, 76.11, 78.29, 75.82],
    ['2023/02/07', 76.13, 77.68, 77.81, 75.7],
    ['2023/02/08', 77.48, 78.97, 79.41, 77.48],
    ['2023/02/09', 79.16, 77.33, 79.43, 77.01],
    ['2023/02/10', 77.76, 78.88, 79.23, 77.5],
    ['2023/02/13', 78.85, 78.52, 79.26, 78.07],
    ['2023/02/14', 78.39, 77.81, 78.79, 77.77],
    ['2023/02/15', 77.56, 77.65, 77.85, 77.02],
    ['2023/02/16', 77.3, 77.71, 78.18, 76.8],
    ['2023/02/17', 77.78, 77.84, 78.76, 77.49],
    ['2023/02/21', 77.57, 77.24, 77.76, 76.87],
    ['2023/02/22', 77.37, 76.6, 77.47, 76.49],
    ['2023/02/23', 76.6, 76.78, 77.5, 76.42],
    ['2023/02/24', 76.79, 76.65, 76.99, 76.21],
    ['2023/02/27', 76.86, 76.49, 77.11, 76.17],
    ['2023/02/28', 75.84, 74.81, 76.1, 74.77],
    ['2023/03/01', 74.55, 75.08, 75.23, 74.32],
    ['2023/03/02', 75.02, 73.82, 75.22, 73.64],
    ['2023/03/03', 74.18, 74.31, 74.35, 73.29],
    ['2023/03/06', 74.21, 73.77, 74.46, 73.2],
    ['2023/03/07', 73.9, 72.1, 74.07, 72.07],
    ['2023/03/08', 72.07, 71.79, 72.39, 71.1],
    ['2023/03/09', 72.09, 70.44, 72.09, 70.05],
    ['2023/03/10', 70.44, 70.34, 71.48, 70.21],
    ['2023/03/13', 69.61, 69.27, 70.61, 69.18],
    ['2023/03/14', 70.1, 69.88, 70.19, 68.58],
    ['2023/03/15', 69.04, 68.99, 69.18, 68.14],
    ['2023/03/16', 68.35, 69.67, 69.79, 68.35],
    ['2023/03/17', 69.65, 68.79, 69.65, 68.02],
    ['2023/03/20', 69.24, 70.29, 70.7, 69.04],
    ['2023/03/21', 70.94, 71.4, 71.52, 70.44],
    ['2023/03/22', 71.15, 69.11, 71.61, 69.09],
    ['2023/03/23', 69.02, 68.19, 69.18, 67.87],
    ['2023/03/24', 67.88, 69.53, 69.67, 67.72],
    ['2023/03/27', 70.57, 70.39, 70.72, 69.73],
    ['2023/03/28', 70.57, 71.61, 72.2, 70.44],
    ['2023/03/29', 71.84, 73.71, 73.86, 71.66],
    ['2023/03/30', 74.1, 74.45, 74.54, 73.8],
    ['2023/03/31', 74.87, 75.1, 75.4, 74.48],
    ['2023/04/03', 75.39, 76.3, 76.55, 75.09],
    ['2023/04/04', 76.3, 76.25, 76.66, 75.8],
    ['2023/04/05', 76.63, 79.0, 79.08, 76.52],
    ['2023/04/06', 79.34, 78.81, 80.18, 78.55],
    ['2023/04/10', 78.74, 79.2, 79.23, 78.52],
    ['2023/04/11', 79.47, 79.52, 79.9, 78.98],
    ['2023/04/12', 79.2, 78.73, 79.46, 78.05],
    ['2023/04/13', 79.09, 80.29, 80.76, 78.94],
    ['2023/04/14', 80.25, 80.2, 80.42, 79.68],
    ['2023/04/17', 80.31, 79.63, 80.36, 78.75],
    ['2023/04/18', 79.93, 79.03, 79.95, 78.86],
    ['2023/04/19', 79.56, 78.57, 79.62, 78.1],
    ['2023/04/20', 78.6, 79.66, 79.66, 78.38],
    ['2023/04/21', 80.07, 79.65, 80.17, 79.24],
    ['2023/04/24', 79.56, 80.57, 80.68, 79.26],
    ['2023/04/25', 80.66, 80.45, 80.72, 79.75],
    ['2023/04/26', 80.0, 79.96, 80.56, 79.23],
    ['2023/04/27', 79.75, 81.64, 81.67, 79.75],
    ['2023/04/28', 81.23, 81.66, 82.0, 81.23],
    ['2023/05/01', 81.74, 81.81, 81.87, 80.71],
    ['2023/05/02', 81.62, 81.92, 82.2, 80.71],
    ['2023/05/03', 82.44, 81.2, 82.57, 81.06],
    ['2023/05/04', 78.62, 80.4, 81.01, 77.15],
    ['2023/05/05', 80.62, 82.76, 83.32, 80.54],
    ['2023/05/08', 82.95, 83.7, 83.84, 82.33],
    ['2023/05/09', 84.29, 83.9, 85.47, 83.74],
    ['2023/05/10', 83.99, 84.73, 84.84, 83.6],
    ['2023/05/11', 84.75, 84.39, 84.94, 84.1],
    ['2023/05/12', 84.41, 84.32, 84.62, 83.86],
    ['2023/05/15', 84.27, 84.86, 84.94, 83.74],
    ['2023/05/16', 84.96, 85.34, 85.74, 84.76],
    ['2023/05/17', 85.83, 86.1, 86.57, 85.31],
    ['2023/05/18', 86.0, 85.1, 86.0, 84.25],
    ['2023/05/19', 85.41, 85.47, 86.0, 85.07],
    ['2023/05/22', 85.53, 85.52, 86.05, 84.76],
    ['2023/05/23', 85.32, 84.34, 85.61, 84.23],
    ['2023/05/24', 84.44, 84.51, 85.04, 83.7],
    ['2023/05/25', 84.11, 84.25, 84.66, 83.31],
    ['2023/05/26', 84.25, 82.39, 84.57, 82.16],
    ['2023/05/30', 81.74, 80.9, 82.28, 80.67],
    ['2023/05/31', 80.47, 81.86, 82.37, 80.47],
    ['2023/06/01', 82.4, 82.98, 84.01, 82.31],
    ['2023/06/02', 83.19, 84.14, 84.27, 82.83],
    ['2023/06/05', 84.22, 84.31, 84.62, 83.92],
    ['2023/06/06', 84.34, 83.89, 84.66, 82.75],
    ['2023/06/07', 83.89, 82.83, 83.89, 82.63],
    ['2023/06/08', 83.91, 84.87, 85.67, 83.33],
    ['2023/06/09', 85.97, 86.31, 86.67, 85.06],
    ['2023/06/12', 86.27, 86.71, 86.9, 85.85],
    ['2023/06/13', 86.89, 87.55, 88.12, 86.56],
    ['2023/06/14', 87.06, 86.51, 87.46, 85.64],
    ['2023/06/15', 86.82, 88.68, 88.97, 86.51],
    ['2023/06/16', 89.43, 90.76, 90.78, 89.16],
    ['2023/06/20', 90.65, 90.75, 91.6, 90.42],
    ['2023/06/21', 91.26, 91.5, 91.85, 90.64],
    ['2023/06/22', 91.44, 92.03, 92.08, 90.93],
    ['2023/06/23', 91.83, 91.23, 92.39, 91.11],
    ['2023/06/26', 91.24, 91.8, 92.11, 90.97],
    ['2023/06/27', 90.33, 92.59, 92.81, 89.54],
    ['2023/06/28', 92.68, 93.31, 93.81, 92.43],
    ['2023/06/29', 93.34, 93.42, 93.8, 92.9],
    ['2023/06/30', 93.8, 94.57, 95.1, 93.59],
    ['2023/07/03', 93.83, 94.59, 94.8, 93.42],
    ['2023/07/05', 94.53, 94.63, 94.67, 94.07],
    ['2023/07/06', 94.42, 94.25, 94.55, 93.91],
    ['2023/07/07', 94.08, 93.97, 94.38, 93.61],
    ['2023/07/10', 93.16, 93.69, 93.81, 92.73],
    ['2023/07/11', 93.72, 94.36, 94.49, 93.45],
    ['2023/07/12', 94.02, 93.57, 94.15, 93.18],
    ['2023/07/13', 93.6, 93.42, 94.25, 93.37],
    ['2023/07/14', 93.87, 93.14, 94.41, 92.89],
    ['2023/07/17', 93.05, 93.47, 93.83, 92.9],
    ['2023/07/18', 93.34, 93.19, 93.86, 92.87],
    ['2023/07/19', 93.12, 92.15, 93.46, 91.33],
    ['2023/07/20', 92.91, 94.1, 94.12, 92.68],
    ['2023/07/21', 94.3, 93.19, 94.66, 93.16],
    ['2023/07/24', 93.2, 93.05, 93.93, 92.72],
    ['2023/07/25', 92.95, 93.73, 93.8, 92.59],
    ['2023/07/26', 93.06, 92.28, 93.5, 92.07],
    ['2023/07/27', 92.28, 92.43, 92.98, 92.2],
    ['2023/07/28', 92.52, 91.69, 92.67, 91.57],
    ['2023/07/31', 92.19, 91.47, 92.19, 90.92],
    ['2023/08/01', 91.31, 91.64, 91.95, 91.12],
    ['2023/08/02', 91.59, 93.09, 93.19, 91.41],
]);
var volumes = [
    2867900.0,
    2072700.0,
    1947200.0,
    2706800.0,
    2004600.0,
    2954200.0,
    6881300.0,
    5356600.0,
    10335400.0,
    3552100.0,
    2061800.0,
    1983800.0,
    2907200.0,
    1639200.0,
    2181800.0,
    1743000.0,
    1563900.0,
    1853400.0,
    2150600.0,
    2855100.0,
    3479900.0,
    2233900.0,
    2133800.0,
    3302900.0,
    3105000.0,
    2468200.0,
    2077000.0,
    2392700.0,
    3422300.0,
    4396800.0,
    3542800.0,
    7319400.0,
    2746400.0,
    3500700.0,
    2049500.0,
    1990600.0,
    2140500.0,
    2682500.0,
    3325300.0,
    4236600.0,
    2924800.0,
    3368000.0,
    2618200.0,
    3700500.0,
    2505800.0,
    2314200.0,
    2669100.0,
    2158500.0,
    3185500.0,
    3763000.0,
    3322300.0,
    2200700.0,
    3685500.0,
    3354600.0,
    2035600.0,
    2688500.0,
    3086600.0,
    2286300.0,
    3451500.0,
    2431700.0,
    2187700.0,
    2137000.0,
    7830900.0,
    3287100.0,
    3093600.0,
    3478900.0,
    5580400.0,
    3667500.0,
    3612200.0,
    2320300.0,
    4865800.0,
    6354000.0,
    2932600.0,
    3267400.0,
    2145700.0,
    3750500.0,
    2478600.0,
    3273500.0,
    1883400.0,
    2045900.0,
    1118700.0,
    2587800.0,
    2522800.0,
    6069300.0,
    3337500.0,
    2834700.0,
    2115100.0,
    3043600.0,
    3502700.0,
    2249000.0,
    3839200.0,
    2098600.0,
    4000700.0,
    2722100.0,
    3130900.0,
    8088300.0,
    2428000.0,
    2359600.0,
    1869200.0,
    2024300.0,
    1397100.0,
    1903900.0,
    1670900.0,
    2003700.0,
    2415700.0,
    4060000.0,
    2265800.0,
    2726000.0,
    2534500.0,
    3070200.0,
    1500700.0,
    2227600.0,
    1478300.0,
    2920400.0,
    2225700.0,
    2142100.0,
    1949200.0,
    1950100.0,
    1520900.0,
    1340700.0,
    2329700.0,
    2276100.0,
    2214100.0,
    2436800.0,
    7345900.0,
    3328000.0,
    6160600.0,
    3588600.0,
    2184800.0,
    3556200.0,
    2386100.0,
    2106300.0,
    1352800.0,
    2050400.0,
    2459500.0,
    1574300.0,
    1424700.0,
    5193500.0,
    2305700.0,
    1815800.0,
    2456000.0,
    1838800.0,
    2569300.0,
    5323100.0,
    1902000.0,
    2250000.0,
    1665100.0,
    3206500.0,
    2640300.0,
    2804500.0,
    2954600.0,
    2167100.0,
    3455500.0,
    2521600.0,
    2264900.0,
    1606100.0,
    4479100.0,
    2255600.0,
    2544500.0,
    1925100.0,
    1985700.0,
    1994700.0,
    2212000.0,
    2623400.0,
    3158100.0,
    1696300.0,
    2318300.0,
    1786800.0,
    2624300.0,
    2948800.0,
    1855300.0,
    1658400.0,
    1570400.0,
    1631100.0,
    3776900.0,
    1524300.0,
    1887400.0,
    1317700.0,
    1432300.0,
    1709200.0,
    1691700.0,
    1394300.0,
    1371700.0,
    1982300.0,
    1658200.0,
    2535000.0,
    2021500.0,
    2014100.0,
    2166000.0,
    3309300.0,
    2739200.0,
    1779200.0,
    2105100.0,
    1996900.0,
    1626500.0,
    1185800.0,
    1575800.0,
    1557400.0,
    2466800.0,
    2945700.0,
    1552500.0,
    1795800.0,
    1516900.0,
    1424100.0,
    1878600.0,
    1936500.0,
    2422700.0,
    6129700.0,
    3013900.0,
    2447100.0,
    1469900.0,
    2300700.0,
    2240400.0,
    3092600.0,
    3026200.0,
    1988700.0,
    3133000.0,
    2837500.0,
    2498700.0,
    5134000.0,
    2530400.0,
    2398200.0,
    1991800.0,
    5393800.0,
    3133100.0,
    2003000.0,
    2262400.0,
    1696000.0,
    2384800.0,
    1029700.0,
    1892300.0,
    3613500.0,
    2549000.0,
    2678500.0,
    1495200.0,
    1706400.0,
    1340600.0,
    1735500.0,
    1131000.0,
    1560200.0,
    2543700.0,
    1915600.0,
    1780300.0,
    1514400.0,
    1521400.0,
    2650700.0,
    1618800.0,
    1807700.0,
    1992800.0,
    1528500.0,
    2344500.0,
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
        text: "CAH",
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