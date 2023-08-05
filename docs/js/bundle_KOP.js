/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_KOP");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/08', 23.73, 24.47, 24.58, 23.73],
    ['2022/08/09', 24.33, 24.35, 24.7, 24.05],
    ['2022/08/10', 24.84, 25.07, 25.42, 24.83],
    ['2022/08/11', 25.54, 25.63, 25.87, 25.28],
    ['2022/08/12', 25.83, 26.21, 26.52, 25.61],
    ['2022/08/15', 25.7, 25.8, 26.07, 25.65],
    ['2022/08/16', 25.67, 26.22, 26.36, 25.65],
    ['2022/08/17', 25.84, 25.81, 26.11, 25.56],
    ['2022/08/18', 25.65, 26.46, 26.57, 25.47],
    ['2022/08/19', 26.21, 25.13, 26.21, 24.92],
    ['2022/08/22', 24.69, 24.57, 24.83, 24.39],
    ['2022/08/23', 24.47, 24.9, 25.31, 24.47],
    ['2022/08/24', 25.0, 24.98, 25.27, 24.75],
    ['2022/08/25', 25.07, 25.79, 25.88, 24.89],
    ['2022/08/26', 25.66, 24.45, 25.79, 24.39],
    ['2022/08/29', 24.02, 24.38, 24.61, 23.51],
    ['2022/08/30', 24.26, 23.68, 24.26, 23.63],
    ['2022/08/31', 23.59, 22.83, 23.59, 22.81],
    ['2022/09/01', 22.51, 22.44, 22.58, 22.11],
    ['2022/09/02', 22.87, 22.56, 22.93, 22.29],
    ['2022/09/06', 22.75, 22.18, 22.83, 21.86],
    ['2022/09/07', 22.0, 22.32, 22.41, 21.69],
    ['2022/09/08', 21.98, 22.67, 22.76, 21.9],
    ['2022/09/09', 23.03, 23.11, 23.26, 22.91],
    ['2022/09/12', 23.46, 23.73, 23.77, 23.3],
    ['2022/09/13', 23.03, 22.44, 23.14, 22.26],
    ['2022/09/14', 22.25, 22.21, 22.51, 21.8],
    ['2022/09/15', 21.81, 22.21, 22.51, 21.75],
    ['2022/09/16', 22.0, 21.73, 22.16, 21.47],
    ['2022/09/19', 21.6, 22.06, 22.16, 21.57],
    ['2022/09/20', 21.79, 21.69, 21.95, 21.48],
    ['2022/09/21', 22.02, 21.46, 22.21, 21.46],
    ['2022/09/22', 21.25, 21.26, 21.46, 20.95],
    ['2022/09/23', 21.1, 21.13, 21.4, 20.47],
    ['2022/09/26', 20.91, 20.45, 21.53, 20.33],
    ['2022/09/27', 20.62, 20.41, 20.83, 20.11],
    ['2022/09/28', 20.31, 21.02, 21.23, 20.31],
    ['2022/09/29', 20.68, 20.76, 21.0, 20.24],
    ['2022/09/30', 20.8, 20.78, 21.12, 20.52],
    ['2022/10/03', 21.09, 21.54, 21.84, 20.87],
    ['2022/10/04', 21.9, 22.41, 22.5, 21.9],
    ['2022/10/05', 22.01, 22.58, 22.62, 22.01],
    ['2022/10/06', 22.32, 22.14, 22.7, 22.04],
    ['2022/10/07', 21.98, 21.67, 22.11, 21.52],
    ['2022/10/10', 22.22, 22.44, 22.55, 21.81],
    ['2022/10/11', 22.39, 22.27, 22.69, 22.01],
    ['2022/10/12', 22.18, 21.86, 22.34, 21.83],
    ['2022/10/13', 21.26, 22.3, 22.51, 21.03],
    ['2022/10/14', 22.37, 22.01, 22.37, 21.77],
    ['2022/10/17', 22.77, 22.66, 23.34, 22.44],
    ['2022/10/18', 23.23, 23.07, 23.38, 22.87],
    ['2022/10/19', 22.86, 22.66, 22.99, 22.51],
    ['2022/10/20', 22.5, 22.48, 22.97, 22.27],
    ['2022/10/21', 22.74, 23.29, 23.47, 22.7],
    ['2022/10/24', 23.37, 23.67, 23.92, 23.17],
    ['2022/10/25', 23.85, 24.07, 24.37, 23.61],
    ['2022/10/26', 24.34, 24.22, 24.83, 23.78],
    ['2022/10/27', 24.26, 24.39, 24.87, 24.18],
    ['2022/10/28', 24.32, 25.13, 25.28, 24.27],
    ['2022/10/31', 24.96, 24.96, 25.35, 24.85],
    ['2022/11/01', 25.12, 25.03, 25.22, 24.71],
    ['2022/11/02', 25.07, 24.15, 25.23, 24.13],
    ['2022/11/03', 23.78, 24.13, 24.31, 23.69],
    ['2022/11/04', 24.95, 27.71, 27.78, 24.93],
    ['2022/11/07', 27.75, 28.26, 28.46, 27.51],
    ['2022/11/08', 28.17, 27.72, 28.48, 27.53],
    ['2022/11/09', 27.54, 26.74, 27.6, 26.69],
    ['2022/11/10', 27.85, 27.97, 28.28, 27.4],
    ['2022/11/11', 28.13, 28.32, 28.78, 28.06],
    ['2022/11/14', 28.16, 27.91, 28.37, 27.83],
    ['2022/11/15', 28.43, 28.25, 28.96, 27.98],
    ['2022/11/16', 28.02, 27.98, 28.57, 27.61],
    ['2022/11/17', 27.51, 28.35, 28.44, 27.44],
    ['2022/11/18', 28.93, 29.06, 29.12, 28.54],
    ['2022/11/21', 29.02, 29.24, 29.28, 28.83],
    ['2022/11/22', 29.25, 30.23, 30.32, 29.11],
    ['2022/11/23', 30.05, 29.59, 30.51, 29.42],
    ['2022/11/25', 29.58, 29.51, 30.4, 29.48],
    ['2022/11/28', 29.25, 29.11, 29.73, 28.97],
    ['2022/11/29', 29.03, 29.18, 29.57, 28.98],
    ['2022/11/30', 29.27, 29.79, 29.84, 28.7],
    ['2022/12/01', 30.15, 29.89, 30.26, 29.32],
    ['2022/12/02', 29.63, 30.46, 30.63, 29.15],
    ['2022/12/05', 30.46, 30.31, 30.61, 29.96],
    ['2022/12/06', 30.45, 30.67, 30.82, 30.12],
    ['2022/12/07', 30.5, 30.49, 31.11, 30.36],
    ['2022/12/08', 30.68, 30.77, 30.96, 30.14],
    ['2022/12/09', 30.54, 30.77, 31.25, 30.26],
    ['2022/12/12', 30.94, 31.25, 31.31, 30.67],
    ['2022/12/13', 32.14, 31.62, 32.38, 31.35],
    ['2022/12/14', 31.43, 31.76, 32.31, 31.43],
    ['2022/12/15', 31.32, 30.64, 31.33, 30.53],
    ['2022/12/16', 30.22, 30.07, 30.66, 29.87],
    ['2022/12/19', 30.1, 29.6, 30.69, 29.47],
    ['2022/12/20', 29.6, 29.66, 30.28, 29.6],
    ['2022/12/21', 30.11, 30.18, 30.48, 29.86],
    ['2022/12/22', 29.63, 29.08, 29.67, 28.52],
    ['2022/12/23', 29.17, 29.32, 29.32, 28.72],
    ['2022/12/27', 29.51, 29.08, 29.55, 28.87],
    ['2022/12/28', 29.1, 27.97, 29.1, 27.97],
    ['2022/12/29', 28.27, 28.42, 28.72, 28.27],
    ['2022/12/30', 28.26, 28.2, 28.4, 27.94],
    ['2023/01/03', 28.48, 28.43, 28.98, 28.32],
    ['2023/01/04', 28.75, 28.93, 29.37, 28.68],
    ['2023/01/05', 28.74, 28.58, 28.88, 28.29],
    ['2023/01/06', 28.89, 29.36, 29.56, 28.89],
    ['2023/01/09', 29.69, 29.39, 29.8, 29.27],
    ['2023/01/10', 29.13, 29.77, 29.86, 28.94],
    ['2023/01/11', 30.07, 30.37, 30.43, 29.91],
    ['2023/01/12', 30.61, 31.68, 31.75, 30.59],
    ['2023/01/13', 31.5, 32.06, 32.09, 31.06],
    ['2023/01/17', 32.06, 32.03, 32.48, 31.88],
    ['2023/01/18', 32.06, 31.66, 32.56, 31.52],
    ['2023/01/19', 31.31, 31.44, 31.61, 31.0],
    ['2023/01/20', 31.65, 31.66, 31.86, 31.32],
    ['2023/01/23', 31.56, 31.84, 32.22, 31.5],
    ['2023/01/24', 31.57, 32.54, 32.56, 31.49],
    ['2023/01/25', 32.19, 32.91, 32.92, 32.07],
    ['2023/01/26', 32.78, 32.69, 32.94, 32.24],
    ['2023/01/27', 32.59, 32.38, 32.79, 32.3],
    ['2023/01/30', 32.01, 32.63, 32.74, 32.01],
    ['2023/01/31', 32.84, 34.61, 34.61, 32.8],
    ['2023/02/01', 34.3, 34.48, 34.67, 33.78],
    ['2023/02/02', 34.47, 35.43, 35.45, 34.33],
    ['2023/02/03', 34.62, 35.28, 35.9, 34.62],
    ['2023/02/06', 34.76, 34.2, 34.76, 33.62],
    ['2023/02/07', 33.86, 34.51, 34.84, 33.54],
    ['2023/02/08', 34.09, 34.14, 34.38, 33.96],
    ['2023/02/09', 34.37, 32.85, 34.37, 32.66],
    ['2023/02/10', 32.78, 33.44, 33.55, 32.78],
    ['2023/02/13', 33.41, 34.14, 34.28, 33.41],
    ['2023/02/14', 34.04, 34.03, 34.47, 33.69],
    ['2023/02/15', 33.76, 34.38, 34.58, 33.58],
    ['2023/02/16', 34.01, 34.57, 34.68, 33.83],
    ['2023/02/17', 34.67, 34.69, 34.85, 34.38],
    ['2023/02/21', 34.37, 33.72, 34.37, 33.71],
    ['2023/02/22', 33.93, 34.11, 34.35, 33.73],
    ['2023/02/23', 34.16, 34.42, 34.51, 33.57],
    ['2023/02/24', 33.88, 34.35, 34.35, 33.6],
    ['2023/02/27', 35.97, 35.21, 37.43, 35.13],
    ['2023/02/28', 35.16, 35.89, 36.6, 34.79],
    ['2023/03/01', 35.94, 38.12, 38.42, 35.68],
    ['2023/03/02', 37.61, 37.05, 37.62, 36.72],
    ['2023/03/03', 37.42, 37.55, 37.88, 36.94],
    ['2023/03/06', 37.23, 35.46, 37.45, 35.05],
    ['2023/03/07', 35.48, 35.78, 36.48, 35.48],
    ['2023/03/08', 35.77, 36.11, 36.23, 35.42],
    ['2023/03/09', 36.19, 34.97, 36.36, 34.92],
    ['2023/03/10', 34.73, 33.59, 34.73, 33.36],
    ['2023/03/13', 32.69, 31.82, 32.83, 31.8],
    ['2023/03/14', 32.97, 32.59, 33.55, 32.42],
    ['2023/03/15', 31.59, 32.26, 32.35, 31.33],
    ['2023/03/16', 31.76, 32.52, 33.3, 31.49],
    ['2023/03/17', 32.29, 31.77, 32.44, 31.63],
    ['2023/03/20', 32.33, 32.61, 32.98, 32.33],
    ['2023/03/21', 33.32, 32.94, 34.15, 32.78],
    ['2023/03/22', 32.99, 32.26, 33.42, 32.22],
    ['2023/03/23', 32.44, 32.44, 33.13, 31.92],
    ['2023/03/24', 32.04, 32.82, 32.85, 31.84],
    ['2023/03/27', 33.28, 33.3, 33.54, 32.96],
    ['2023/03/28', 33.1, 33.48, 33.97, 33.1],
    ['2023/03/29', 33.95, 34.18, 34.32, 33.81],
    ['2023/03/30', 34.51, 33.87, 34.74, 33.72],
    ['2023/03/31', 34.06, 34.97, 34.99, 34.06],
    ['2023/04/03', 35.07, 34.82, 35.51, 34.63],
    ['2023/04/04', 34.7, 33.75, 34.7, 33.37],
    ['2023/04/05', 33.35, 33.44, 33.5, 33.05],
    ['2023/04/06', 33.4, 33.27, 33.69, 33.19],
    ['2023/04/10', 33.14, 33.93, 34.11, 33.14],
    ['2023/04/11', 34.1, 34.01, 34.61, 33.8],
    ['2023/04/12', 34.31, 34.52, 34.64, 33.88],
    ['2023/04/13', 34.71, 34.74, 34.89, 34.35],
    ['2023/04/14', 34.53, 34.13, 35.04, 33.9],
    ['2023/04/17', 34.15, 34.37, 34.44, 33.99],
    ['2023/04/18', 34.45, 34.25, 34.52, 33.88],
    ['2023/04/19', 34.08, 34.35, 34.36, 33.89],
    ['2023/04/20', 34.12, 34.07, 34.19, 33.6],
    ['2023/04/21', 34.13, 33.7, 34.13, 33.54],
    ['2023/04/24', 33.97, 33.74, 34.0, 33.65],
    ['2023/04/25', 33.23, 32.45, 33.65, 32.43],
    ['2023/04/26', 32.05, 31.96, 32.36, 31.7],
    ['2023/04/27', 32.08, 32.28, 32.51, 31.53],
    ['2023/04/28', 32.08, 32.81, 33.3, 32.08],
    ['2023/05/01', 32.8, 33.13, 33.45, 32.8],
    ['2023/05/02', 32.8, 32.08, 32.8, 31.52],
    ['2023/05/03', 32.2, 32.04, 33.03, 31.85],
    ['2023/05/04', 31.63, 31.31, 31.63, 30.87],
    ['2023/05/05', 33.65, 33.17, 34.0, 32.77],
    ['2023/05/08', 33.27, 32.37, 33.27, 31.24],
    ['2023/05/09', 32.09, 31.72, 32.12, 31.5],
    ['2023/05/10', 32.24, 31.76, 32.24, 31.41],
    ['2023/05/11', 31.29, 31.25, 31.47, 30.96],
    ['2023/05/12', 31.33, 31.32, 31.61, 31.03],
    ['2023/05/15', 31.46, 31.21, 31.59, 31.11],
    ['2023/05/16', 30.78, 30.73, 31.05, 30.56],
    ['2023/05/17', 30.93, 31.33, 31.57, 30.8],
    ['2023/05/18', 31.23, 32.02, 32.13, 30.94],
    ['2023/05/19', 32.45, 31.92, 32.46, 31.68],
    ['2023/05/22', 31.98, 31.61, 32.2, 31.47],
    ['2023/05/23', 31.55, 31.64, 32.13, 31.55],
    ['2023/05/24', 31.37, 30.88, 31.49, 30.87],
    ['2023/05/25', 30.59, 30.14, 30.8, 30.04],
    ['2023/05/26', 30.22, 29.74, 30.34, 29.65],
    ['2023/05/30', 29.71, 29.1, 29.74, 28.98],
    ['2023/05/31', 29.1, 28.96, 29.1, 28.45],
    ['2023/06/01', 29.06, 29.19, 29.6, 28.8],
    ['2023/06/02', 29.89, 31.61, 31.7, 29.71],
    ['2023/06/05', 31.27, 30.88, 31.27, 30.07],
    ['2023/06/06', 30.88, 31.34, 31.73, 30.88],
    ['2023/06/07', 31.67, 33.36, 33.51, 31.5],
    ['2023/06/08', 33.21, 33.0, 33.21, 32.17],
    ['2023/06/09', 32.74, 32.33, 33.52, 32.02],
    ['2023/06/12', 32.49, 32.98, 33.25, 32.35],
    ['2023/06/13', 32.94, 33.63, 33.9, 32.94],
    ['2023/06/14', 33.83, 33.79, 34.09, 33.44],
    ['2023/06/15', 33.62, 34.3, 34.38, 33.52],
    ['2023/06/16', 34.7, 34.17, 34.7, 33.51],
    ['2023/06/20', 33.83, 33.76, 33.92, 33.53],
    ['2023/06/21', 33.46, 33.78, 34.03, 33.35],
    ['2023/06/22', 33.63, 32.94, 33.63, 32.72],
    ['2023/06/23', 32.29, 32.36, 32.58, 31.92],
    ['2023/06/26', 32.32, 32.44, 32.87, 32.2],
    ['2023/06/27', 32.41, 32.83, 32.98, 32.17],
    ['2023/06/28', 32.79, 32.74, 33.26, 32.44],
    ['2023/06/29', 32.85, 33.68, 33.84, 32.75],
    ['2023/06/30', 34.02, 34.1, 34.81, 33.71],
    ['2023/07/03', 33.98, 34.45, 34.72, 33.98],
    ['2023/07/05', 34.27, 33.58, 34.27, 33.07],
    ['2023/07/06', 33.22, 33.7, 33.84, 32.68],
    ['2023/07/07', 33.72, 34.54, 34.87, 33.61],
    ['2023/07/10', 34.24, 34.48, 34.94, 34.17],
    ['2023/07/11', 34.72, 34.85, 34.93, 34.37],
    ['2023/07/12', 35.0, 35.3, 35.68, 34.87],
    ['2023/07/13', 35.29, 35.78, 35.81, 35.11],
    ['2023/07/14', 35.71, 35.59, 35.75, 34.73],
    ['2023/07/17', 35.45, 35.82, 36.07, 35.04],
    ['2023/07/18', 35.71, 36.62, 36.66, 35.71],
    ['2023/07/19', 36.53, 36.76, 36.94, 36.13],
    ['2023/07/20', 36.89, 36.77, 36.97, 36.17],
    ['2023/07/21', 36.91, 36.44, 36.91, 36.39],
    ['2023/07/24', 36.31, 36.75, 36.97, 36.31],
    ['2023/07/25', 36.68, 37.0, 37.42, 36.68],
    ['2023/07/26', 36.96, 36.93, 37.25, 36.81],
    ['2023/07/27', 36.89, 36.47, 37.13, 36.26],
    ['2023/07/28', 36.78, 37.66, 37.68, 36.78],
    ['2023/07/31', 37.66, 38.26, 38.36, 37.66],
    ['2023/08/01', 37.86, 38.6, 38.72, 37.81],
    ['2023/08/02', 37.57, 37.9, 38.57, 37.37],
    ['2023/08/03', 37.34, 38.4, 38.55, 37.08],
    ['2023/08/04', 38.21, 38.86, 38.98, 38.11],
]);
var volumes = [
    109900.0,
    85500.0,
    85200.0,
    134500.0,
    97500.0,
    354500.0,
    107300.0,
    78500.0,
    93400.0,
    106500.0,
    58900.0,
    65200.0,
    60300.0,
    78900.0,
    43800.0,
    42100.0,
    81200.0,
    70700.0,
    80700.0,
    110000.0,
    96500.0,
    141600.0,
    80000.0,
    52100.0,
    59400.0,
    102700.0,
    90700.0,
    97300.0,
    344300.0,
    143400.0,
    120200.0,
    76800.0,
    88500.0,
    213900.0,
    117000.0,
    97700.0,
    81400.0,
    93900.0,
    113000.0,
    99100.0,
    86000.0,
    94400.0,
    66400.0,
    73100.0,
    75600.0,
    96000.0,
    65000.0,
    90700.0,
    70600.0,
    75900.0,
    50400.0,
    55400.0,
    70000.0,
    63200.0,
    57700.0,
    73400.0,
    62300.0,
    62500.0,
    67700.0,
    85900.0,
    92200.0,
    151400.0,
    54000.0,
    74100.0,
    68800.0,
    87500.0,
    84000.0,
    123000.0,
    88400.0,
    91500.0,
    89900.0,
    74800.0,
    77600.0,
    93000.0,
    64600.0,
    99200.0,
    79100.0,
    35900.0,
    101900.0,
    47400.0,
    74600.0,
    119500.0,
    63700.0,
    118900.0,
    182000.0,
    111500.0,
    118300.0,
    72300.0,
    85200.0,
    241700.0,
    112600.0,
    114500.0,
    331400.0,
    100200.0,
    56100.0,
    50000.0,
    84400.0,
    45800.0,
    41100.0,
    41800.0,
    48600.0,
    42100.0,
    66700.0,
    83000.0,
    60600.0,
    82100.0,
    63600.0,
    136100.0,
    133200.0,
    110300.0,
    129100.0,
    60000.0,
    42400.0,
    60100.0,
    45300.0,
    45200.0,
    56500.0,
    60700.0,
    47400.0,
    39400.0,
    67200.0,
    122600.0,
    169100.0,
    91700.0,
    121600.0,
    89700.0,
    101500.0,
    49100.0,
    96700.0,
    91000.0,
    64500.0,
    64200.0,
    33100.0,
    61100.0,
    54000.0,
    53900.0,
    107100.0,
    93500.0,
    69900.0,
    189000.0,
    157900.0,
    283600.0,
    112100.0,
    73300.0,
    238600.0,
    118100.0,
    85300.0,
    76500.0,
    75700.0,
    107300.0,
    191500.0,
    160100.0,
    159200.0,
    341200.0,
    147300.0,
    101500.0,
    59600.0,
    96200.0,
    87500.0,
    64800.0,
    73600.0,
    94500.0,
    60400.0,
    209000.0,
    137200.0,
    76600.0,
    65100.0,
    40800.0,
    66300.0,
    60000.0,
    71300.0,
    48600.0,
    59100.0,
    27400.0,
    40600.0,
    47900.0,
    64400.0,
    34800.0,
    23000.0,
    34300.0,
    48800.0,
    41600.0,
    71400.0,
    62400.0,
    162400.0,
    113600.0,
    53000.0,
    73300.0,
    55300.0,
    95600.0,
    45700.0,
    35700.0,
    52900.0,
    46800.0,
    41600.0,
    58700.0,
    55600.0,
    37600.0,
    36900.0,
    40200.0,
    48400.0,
    34700.0,
    39300.0,
    33900.0,
    191200.0,
    56100.0,
    82600.0,
    51200.0,
    112300.0,
    100600.0,
    82900.0,
    60200.0,
    62700.0,
    79800.0,
    81100.0,
    87300.0,
    363400.0,
    51300.0,
    53500.0,
    59900.0,
    128800.0,
    65100.0,
    48600.0,
    59800.0,
    50700.0,
    128000.0,
    25800.0,
    66700.0,
    76100.0,
    128800.0,
    63900.0,
    47400.0,
    92200.0,
    60500.0,
    43200.0,
    45900.0,
    39300.0,
    39900.0,
    50600.0,
    56300.0,
    38400.0,
    44900.0,
    50600.0,
    68500.0,
    48100.0,
    59800.0,
    74700.0,
    78900.0,
    94700.0,
    61000.0,
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
        text: "KOP",
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