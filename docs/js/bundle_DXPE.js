/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_DXPE");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/03', 32.62, 32.86, 32.99, 32.12],
    ['2022/08/04', 32.7, 34.05, 34.11, 32.7],
    ['2022/08/05', 34.0, 34.23, 34.74, 33.93],
    ['2022/08/08', 34.23, 31.85, 34.6, 31.74],
    ['2022/08/09', 31.62, 28.51, 31.62, 26.94],
    ['2022/08/10', 28.85, 28.17, 29.62, 28.15],
    ['2022/08/11', 28.22, 27.9, 28.96, 27.83],
    ['2022/08/12', 27.9, 28.45, 29.0, 27.43],
    ['2022/08/15', 27.89, 28.2, 28.29, 27.6],
    ['2022/08/16', 28.34, 28.72, 28.8, 28.1],
    ['2022/08/17', 28.46, 28.54, 28.82, 28.12],
    ['2022/08/18', 28.84, 29.14, 29.16, 28.5],
    ['2022/08/19', 28.78, 28.58, 28.92, 27.97],
    ['2022/08/22', 28.43, 28.02, 28.43, 27.62],
    ['2022/08/23', 28.07, 27.8, 28.54, 27.76],
    ['2022/08/24', 27.53, 27.79, 28.18, 27.5],
    ['2022/08/25', 27.82, 28.33, 28.54, 27.7],
    ['2022/08/26', 28.5, 27.96, 28.82, 27.91],
    ['2022/08/29', 27.87, 27.53, 27.97, 27.45],
    ['2022/08/30', 27.68, 26.7, 27.68, 26.51],
    ['2022/08/31', 26.69, 26.58, 27.17, 25.82],
    ['2022/09/01', 26.33, 26.59, 26.9, 26.15],
    ['2022/09/02', 26.94, 26.7, 27.52, 26.52],
    ['2022/09/06', 26.67, 26.77, 26.94, 26.42],
    ['2022/09/07', 26.56, 26.38, 26.73, 25.87],
    ['2022/09/08', 26.32, 26.33, 26.53, 25.45],
    ['2022/09/09', 26.54, 26.59, 27.12, 26.46],
    ['2022/09/12', 26.87, 27.1, 27.23, 25.8],
    ['2022/09/13', 26.56, 25.91, 26.83, 25.49],
    ['2022/09/14', 25.88, 26.66, 26.67, 25.88],
    ['2022/09/15', 26.5, 26.44, 26.87, 25.82],
    ['2022/09/16', 26.21, 26.44, 26.5, 25.68],
    ['2022/09/19', 26.38, 25.96, 26.86, 25.96],
    ['2022/09/20', 25.87, 25.94, 25.95, 25.1],
    ['2022/09/21', 26.13, 25.6, 26.34, 25.6],
    ['2022/09/22', 25.35, 24.64, 25.5, 24.64],
    ['2022/09/23', 24.29, 24.19, 24.29, 23.54],
    ['2022/09/26', 24.12, 24.01, 24.39, 23.7],
    ['2022/09/27', 24.16, 23.72, 24.4, 23.65],
    ['2022/09/28', 23.63, 23.97, 24.21, 23.5],
    ['2022/09/29', 23.63, 23.7, 23.7, 23.14],
    ['2022/09/30', 23.68, 23.68, 24.36, 23.42],
    ['2022/10/03', 23.97, 24.99, 25.22, 23.44],
    ['2022/10/04', 25.25, 25.69, 25.81, 25.25],
    ['2022/10/05', 25.27, 25.74, 25.8, 24.8],
    ['2022/10/06', 26.34, 25.6, 26.34, 25.52],
    ['2022/10/07', 25.31, 24.97, 25.81, 24.85],
    ['2022/10/10', 25.25, 25.14, 25.42, 24.98],
    ['2022/10/11', 24.92, 25.26, 25.58, 23.26],
    ['2022/10/12', 25.14, 24.62, 25.36, 24.6],
    ['2022/10/13', 24.14, 25.05, 25.27, 23.65],
    ['2022/10/14', 25.05, 24.59, 25.1, 24.4],
    ['2022/10/17', 24.86, 25.44, 25.59, 24.86],
    ['2022/10/18', 25.71, 25.64, 25.98, 25.42],
    ['2022/10/19', 25.54, 25.93, 25.93, 25.41],
    ['2022/10/20', 25.84, 25.33, 25.96, 24.87],
    ['2022/10/21', 25.56, 25.94, 26.06, 25.48],
    ['2022/10/24', 25.97, 26.34, 26.55, 25.78],
    ['2022/10/25', 26.39, 26.66, 27.02, 26.39],
    ['2022/10/26', 26.86, 26.96, 27.31, 26.2],
    ['2022/10/27', 27.29, 27.23, 27.75, 27.13],
    ['2022/10/28', 27.43, 28.1, 28.14, 27.37],
    ['2022/10/31', 27.85, 28.61, 28.82, 27.45],
    ['2022/11/01', 28.98, 28.78, 29.04, 28.43],
    ['2022/11/02', 28.63, 28.39, 29.82, 28.27],
    ['2022/11/03', 28.01, 28.17, 28.73, 27.61],
    ['2022/11/04', 28.39, 29.15, 29.15, 28.38],
    ['2022/11/07', 29.19, 29.55, 29.55, 29.08],
    ['2022/11/08', 29.79, 30.11, 30.18, 29.47],
    ['2022/11/09', 29.63, 25.83, 29.93, 25.43],
    ['2022/11/10', 26.35, 27.41, 28.15, 26.35],
    ['2022/11/11', 27.28, 26.72, 28.29, 26.52],
    ['2022/11/14', 26.41, 26.72, 27.04, 26.03],
    ['2022/11/15', 27.06, 26.18, 27.13, 26.11],
    ['2022/11/16', 26.0, 25.97, 26.51, 25.65],
    ['2022/11/17', 25.87, 26.1, 26.11, 25.29],
    ['2022/11/18', 26.62, 26.74, 27.09, 26.25],
    ['2022/11/21', 26.49, 26.65, 26.98, 26.46],
    ['2022/11/22', 26.13, 26.82, 27.05, 26.13],
    ['2022/11/23', 26.82, 26.36, 27.21, 26.26],
    ['2022/11/25', 26.76, 26.17, 26.76, 26.17],
    ['2022/11/28', 26.01, 25.19, 26.01, 25.15],
    ['2022/11/29', 25.33, 25.29, 25.5, 25.02],
    ['2022/11/30', 25.44, 25.83, 25.85, 24.69],
    ['2022/12/01', 25.83, 26.11, 26.21, 25.39],
    ['2022/12/02', 26.0, 26.54, 26.83, 25.69],
    ['2022/12/05', 26.25, 26.13, 26.7, 25.41],
    ['2022/12/06', 26.19, 26.0, 26.93, 25.69],
    ['2022/12/07', 25.8, 25.43, 26.29, 25.38],
    ['2022/12/08', 25.6, 25.76, 26.18, 25.6],
    ['2022/12/09', 25.5, 25.18, 25.77, 25.14],
    ['2022/12/12', 25.41, 25.9, 26.05, 25.41],
    ['2022/12/13', 26.64, 26.71, 26.8, 26.15],
    ['2022/12/14', 26.83, 27.09, 27.6, 26.63],
    ['2022/12/15', 27.19, 26.66, 29.43, 26.18],
    ['2022/12/16', 26.2, 27.94, 28.6, 26.2],
    ['2022/12/19', 27.7, 26.86, 27.7, 25.8],
    ['2022/12/20', 26.84, 27.66, 27.86, 26.27],
    ['2022/12/21', 27.71, 27.47, 28.08, 26.63],
    ['2022/12/22', 27.29, 27.28, 27.36, 26.9],
    ['2022/12/23', 27.26, 27.9, 27.99, 27.26],
    ['2022/12/27', 27.81, 27.89, 28.18, 27.45],
    ['2022/12/28', 27.89, 26.94, 28.16, 26.85],
    ['2022/12/29', 27.09, 27.56, 27.99, 26.88],
    ['2022/12/30', 27.49, 27.55, 27.75, 27.42],
    ['2023/01/03', 27.7, 27.14, 27.74, 27.03],
    ['2023/01/04', 27.36, 27.75, 28.1, 27.27],
    ['2023/01/05', 27.72, 27.77, 27.78, 27.16],
    ['2023/01/06', 28.18, 28.7, 28.96, 28.12],
    ['2023/01/09', 28.79, 28.74, 29.32, 28.64],
    ['2023/01/10', 28.71, 29.34, 29.47, 28.7],
    ['2023/01/11', 29.36, 29.3, 29.78, 29.26],
    ['2023/01/12', 29.57, 30.11, 30.22, 29.51],
    ['2023/01/13', 29.95, 30.23, 31.55, 29.95],
    ['2023/01/17', 30.08, 29.79, 30.13, 29.67],
    ['2023/01/18', 29.8, 29.35, 29.97, 29.17],
    ['2023/01/19', 29.01, 29.16, 29.21, 28.8],
    ['2023/01/20', 29.26, 29.0, 29.38, 28.97],
    ['2023/01/23', 28.95, 29.01, 29.5, 28.65],
    ['2023/01/24', 28.66, 29.19, 29.43, 28.66],
    ['2023/01/25', 28.88, 29.42, 29.5, 28.88],
    ['2023/01/26', 29.79, 29.81, 30.02, 29.56],
    ['2023/01/27', 29.8, 29.6, 29.94, 29.47],
    ['2023/01/30', 29.47, 29.39, 29.94, 29.35],
    ['2023/01/31', 29.37, 30.3, 30.39, 29.37],
    ['2023/02/01', 30.29, 30.56, 31.0, 30.1],
    ['2023/02/02', 30.88, 31.0, 31.25, 30.81],
    ['2023/02/03', 31.03, 31.12, 31.41, 30.81],
    ['2023/02/06', 30.98, 30.98, 31.27, 30.44],
    ['2023/02/07', 30.81, 31.0, 31.1, 30.58],
    ['2023/02/08', 30.91, 30.74, 31.2, 30.61],
    ['2023/02/09', 31.04, 30.32, 31.04, 30.2],
    ['2023/02/10', 30.22, 30.7, 30.78, 29.96],
    ['2023/02/13', 30.69, 30.89, 31.0, 30.5],
    ['2023/02/14', 30.82, 30.41, 30.82, 30.28],
    ['2023/02/15', 30.17, 30.3, 30.48, 29.54],
    ['2023/02/16', 29.95, 30.1, 30.34, 29.83],
    ['2023/02/17', 30.18, 29.91, 30.18, 28.46],
    ['2023/02/21', 29.53, 28.47, 29.62, 28.39],
    ['2023/02/22', 29.23, 28.95, 29.3, 28.5],
    ['2023/02/23', 29.11, 29.56, 29.58, 28.98],
    ['2023/02/24', 29.09, 29.15, 29.41, 28.9],
    ['2023/02/27', 29.6, 29.25, 29.8, 29.11],
    ['2023/02/28', 29.17, 28.91, 29.29, 28.9],
    ['2023/03/01', 28.83, 29.69, 29.71, 28.57],
    ['2023/03/02', 29.56, 30.15, 30.15, 29.15],
    ['2023/03/03', 30.29, 30.06, 30.29, 29.74],
    ['2023/03/06', 30.19, 29.25, 30.33, 28.74],
    ['2023/03/07', 29.23, 29.41, 29.53, 28.91],
    ['2023/03/08', 29.5, 29.07, 29.64, 28.87],
    ['2023/03/09', 29.01, 28.62, 29.14, 28.13],
    ['2023/03/10', 28.4, 27.48, 28.4, 27.27],
    ['2023/03/13', 27.05, 25.9, 27.05, 25.74],
    ['2023/03/14', 26.55, 26.85, 27.18, 26.55],
    ['2023/03/15', 26.15, 25.92, 26.21, 24.98],
    ['2023/03/16', 25.45, 26.11, 26.43, 25.02],
    ['2023/03/17', 25.78, 25.45, 26.04, 25.14],
    ['2023/03/20', 25.89, 25.75, 26.77, 25.75],
    ['2023/03/21', 26.32, 26.59, 27.67, 26.16],
    ['2023/03/22', 26.73, 26.39, 27.11, 26.3],
    ['2023/03/23', 26.48, 26.23, 26.78, 26.04],
    ['2023/03/24', 25.52, 26.45, 26.56, 25.13],
    ['2023/03/27', 26.9, 27.43, 27.67, 26.75],
    ['2023/03/28', 27.4, 27.61, 28.08, 27.24],
    ['2023/03/29', 27.92, 26.83, 27.92, 26.77],
    ['2023/03/30', 27.0, 26.69, 27.06, 26.47],
    ['2023/03/31', 26.92, 26.92, 27.02, 26.42],
    ['2023/04/03', 27.0, 27.35, 27.44, 26.79],
    ['2023/04/04', 27.53, 26.44, 27.73, 26.21],
    ['2023/04/05', 26.16, 26.5, 26.53, 26.12],
    ['2023/04/06', 26.58, 26.13, 26.58, 25.42],
    ['2023/04/10', 26.15, 26.48, 27.05, 26.15],
    ['2023/04/11', 26.48, 26.75, 27.18, 26.48],
    ['2023/04/12', 27.05, 26.68, 27.4, 26.58],
    ['2023/04/13', 26.71, 26.63, 26.79, 26.33],
    ['2023/04/14', 26.72, 26.16, 27.15, 26.01],
    ['2023/04/17', 27.15, 26.51, 27.81, 26.29],
    ['2023/04/18', 26.73, 25.4, 26.9, 25.38],
    ['2023/04/19', 25.21, 26.28, 26.78, 25.02],
    ['2023/04/20', 26.14, 26.22, 26.63, 26.0],
    ['2023/04/21', 26.16, 25.32, 26.41, 25.21],
    ['2023/04/24', 25.14, 25.11, 25.45, 25.05],
    ['2023/04/25', 24.83, 24.75, 25.15, 24.44],
    ['2023/04/26', 24.55, 24.52, 24.74, 24.19],
    ['2023/04/27', 24.54, 24.73, 25.22, 24.3],
    ['2023/04/28', 24.65, 25.2, 25.78, 24.65],
    ['2023/05/01', 25.41, 26.45, 26.55, 25.39],
    ['2023/05/02', 26.31, 26.28, 26.33, 25.59],
    ['2023/05/03', 26.31, 25.45, 26.57, 25.36],
    ['2023/05/04', 25.26, 24.07, 25.3, 23.9],
    ['2023/05/05', 24.59, 24.61, 24.76, 24.1],
    ['2023/05/08', 24.81, 24.46, 25.93, 24.08],
    ['2023/05/09', 24.37, 24.52, 25.29, 24.06],
    ['2023/05/10', 25.22, 23.61, 25.22, 22.06],
    ['2023/05/11', 26.16, 26.06, 27.16, 25.43],
    ['2023/05/12', 26.1, 27.62, 27.63, 26.1],
    ['2023/05/15', 27.97, 30.52, 31.06, 27.97],
    ['2023/05/16', 30.35, 29.79, 30.5, 29.3],
    ['2023/05/17', 30.12, 31.39, 31.47, 29.91],
    ['2023/05/18', 31.34, 31.97, 32.24, 30.91],
    ['2023/05/19', 32.49, 31.73, 32.52, 31.31],
    ['2023/05/22', 31.99, 32.01, 32.27, 31.64],
    ['2023/05/23', 32.01, 31.98, 32.39, 31.67],
    ['2023/05/24', 31.96, 31.99, 32.38, 31.51],
    ['2023/05/25', 31.94, 31.87, 32.15, 31.5],
    ['2023/05/26', 31.99, 32.52, 32.78, 31.98],
    ['2023/05/30', 32.7, 32.41, 32.85, 31.81],
    ['2023/05/31', 32.18, 31.97, 32.27, 31.34],
    ['2023/06/01', 31.96, 31.93, 32.41, 31.46],
    ['2023/06/02', 32.43, 33.75, 34.05, 32.28],
    ['2023/06/05', 33.46, 33.32, 33.46, 31.83],
    ['2023/06/06', 33.3, 33.81, 34.17, 33.08],
    ['2023/06/07', 34.17, 34.06, 34.51, 34.02],
    ['2023/06/08', 33.93, 35.38, 35.44, 33.76],
    ['2023/06/09', 35.33, 35.72, 35.81, 35.0],
    ['2023/06/12', 35.59, 35.93, 36.17, 35.21],
    ['2023/06/13', 35.85, 35.95, 36.73, 35.85],
    ['2023/06/14', 36.0, 35.56, 36.07, 35.36],
    ['2023/06/15', 35.52, 36.16, 36.16, 35.52],
    ['2023/06/16', 36.36, 35.95, 36.64, 35.63],
    ['2023/06/20', 35.95, 36.67, 36.7, 35.79],
    ['2023/06/21', 36.38, 36.3, 36.99, 36.25],
    ['2023/06/22', 36.09, 36.15, 36.42, 35.64],
    ['2023/06/23', 35.59, 36.2, 36.29, 35.59],
    ['2023/06/26', 36.21, 36.09, 37.2, 36.08],
    ['2023/06/27', 36.14, 36.2, 36.55, 36.02],
    ['2023/06/28', 36.11, 36.38, 36.45, 35.96],
    ['2023/06/29', 36.3, 36.88, 37.08, 36.3],
    ['2023/06/30', 37.09, 36.41, 37.09, 36.36],
    ['2023/07/03', 36.5, 37.35, 37.45, 36.44],
    ['2023/07/05', 37.25, 36.93, 37.38, 36.77],
    ['2023/07/06', 36.75, 36.41, 36.88, 36.04],
    ['2023/07/07', 36.41, 36.85, 37.25, 36.41],
    ['2023/07/10', 36.75, 37.14, 37.31, 36.75],
    ['2023/07/11', 37.16, 37.5, 37.75, 37.02],
    ['2023/07/12', 37.98, 37.69, 37.98, 37.21],
    ['2023/07/13', 37.85, 37.3, 37.88, 37.26],
    ['2023/07/14', 37.27, 37.32, 37.55, 36.9],
    ['2023/07/17', 37.19, 37.77, 38.27, 37.19],
    ['2023/07/18', 37.77, 37.75, 38.35, 37.27],
    ['2023/07/19', 37.66, 37.79, 38.03, 36.79],
    ['2023/07/20', 37.88, 39.34, 39.89, 37.88],
    ['2023/07/21', 39.77, 38.22, 39.82, 37.74],
    ['2023/07/24', 38.35, 38.75, 39.3, 38.23],
    ['2023/07/25', 38.75, 38.35, 38.98, 38.31],
    ['2023/07/26', 38.46, 38.13, 38.81, 38.0],
    ['2023/07/27', 38.21, 37.39, 38.28, 37.17],
    ['2023/07/28', 37.72, 37.99, 38.3, 37.65],
    ['2023/07/31', 38.2, 37.98, 38.59, 37.9],
    ['2023/08/01', 37.66, 38.31, 38.42, 37.45],
    ['2023/08/02', 37.87, 38.03, 38.59, 37.84],
]);
var volumes = [
    138300.0,
    116900.0,
    93800.0,
    112800.0,
    309700.0,
    96700.0,
    61200.0,
    110800.0,
    76900.0,
    80700.0,
    70100.0,
    69900.0,
    95100.0,
    49300.0,
    64000.0,
    55300.0,
    75900.0,
    106200.0,
    53600.0,
    55800.0,
    177500.0,
    126200.0,
    130700.0,
    107300.0,
    81200.0,
    100800.0,
    69200.0,
    76200.0,
    129900.0,
    106900.0,
    84400.0,
    443200.0,
    66900.0,
    67400.0,
    62700.0,
    50900.0,
    87900.0,
    71800.0,
    88000.0,
    43900.0,
    42700.0,
    56400.0,
    92900.0,
    51100.0,
    44000.0,
    28900.0,
    30700.0,
    40700.0,
    44500.0,
    42400.0,
    76200.0,
    70800.0,
    57400.0,
    62300.0,
    46900.0,
    67200.0,
    33700.0,
    31400.0,
    59100.0,
    62400.0,
    45500.0,
    63400.0,
    88100.0,
    68400.0,
    89900.0,
    35000.0,
    45000.0,
    69100.0,
    67100.0,
    107400.0,
    59200.0,
    69000.0,
    53400.0,
    48500.0,
    156300.0,
    76400.0,
    47900.0,
    39600.0,
    20000.0,
    20300.0,
    9200.0,
    56800.0,
    61900.0,
    79600.0,
    44900.0,
    49600.0,
    68800.0,
    81300.0,
    31800.0,
    32700.0,
    22100.0,
    48900.0,
    68000.0,
    77800.0,
    123100.0,
    391700.0,
    76800.0,
    43200.0,
    68000.0,
    43100.0,
    29200.0,
    60100.0,
    56900.0,
    63000.0,
    85500.0,
    89500.0,
    56500.0,
    41300.0,
    54600.0,
    36800.0,
    41100.0,
    35200.0,
    41100.0,
    40900.0,
    81000.0,
    37400.0,
    51300.0,
    46100.0,
    54100.0,
    26200.0,
    19000.0,
    23700.0,
    27400.0,
    26100.0,
    106500.0,
    48500.0,
    62900.0,
    112100.0,
    41100.0,
    56700.0,
    27000.0,
    48100.0,
    24500.0,
    18500.0,
    50700.0,
    28700.0,
    40200.0,
    33700.0,
    48800.0,
    46000.0,
    40400.0,
    39200.0,
    27000.0,
    66700.0,
    50800.0,
    23900.0,
    55800.0,
    119900.0,
    58100.0,
    42000.0,
    48800.0,
    70800.0,
    55100.0,
    57200.0,
    81600.0,
    65900.0,
    304100.0,
    114600.0,
    199500.0,
    96000.0,
    78600.0,
    71500.0,
    76400.0,
    109400.0,
    120700.0,
    97600.0,
    127300.0,
    168700.0,
    88000.0,
    67800.0,
    61600.0,
    81500.0,
    71800.0,
    123300.0,
    76700.0,
    123900.0,
    148900.0,
    76600.0,
    119100.0,
    93200.0,
    66500.0,
    42600.0,
    53900.0,
    70300.0,
    85500.0,
    104700.0,
    134700.0,
    74800.0,
    69200.0,
    51700.0,
    56400.0,
    36500.0,
    48100.0,
    104500.0,
    150500.0,
    137200.0,
    348300.0,
    155000.0,
    150100.0,
    129200.0,
    175200.0,
    122400.0,
    167700.0,
    152800.0,
    170600.0,
    151400.0,
    105500.0,
    109700.0,
    155200.0,
    222400.0,
    136100.0,
    224200.0,
    192900.0,
    161200.0,
    152200.0,
    138600.0,
    111300.0,
    143900.0,
    121400.0,
    675700.0,
    89100.0,
    73700.0,
    67900.0,
    217500.0,
    83500.0,
    47600.0,
    49400.0,
    76000.0,
    55600.0,
    63200.0,
    85700.0,
    121800.0,
    125200.0,
    94300.0,
    80200.0,
    74800.0,
    61300.0,
    54700.0,
    157100.0,
    56600.0,
    280100.0,
    463100.0,
    139500.0,
    107800.0,
    52000.0,
    50000.0,
    62500.0,
    95800.0,
    76600.0,
    162400.0,
    75200.0,
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
        text: "DXPE",
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