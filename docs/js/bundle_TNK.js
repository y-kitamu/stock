/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_TNK");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/03', 21.95, 21.98, 22.21, 21.07],
    ['2022/08/04', 22.5, 21.96, 22.76, 21.91],
    ['2022/08/05', 21.85, 22.08, 22.8, 21.68],
    ['2022/08/08', 22.52, 23.57, 23.91, 22.08],
    ['2022/08/09', 23.85, 24.47, 24.61, 23.73],
    ['2022/08/10', 24.81, 24.03, 24.81, 23.69],
    ['2022/08/11', 24.49, 24.39, 25.21, 24.37],
    ['2022/08/12', 24.61, 24.31, 24.7, 24.29],
    ['2022/08/15', 23.66, 24.06, 24.55, 22.84],
    ['2022/08/16', 24.35, 24.31, 24.73, 24.05],
    ['2022/08/17', 24.11, 24.79, 25.0, 24.06],
    ['2022/08/18', 24.7, 24.44, 24.8, 24.07],
    ['2022/08/19', 24.1, 24.03, 24.15, 23.84],
    ['2022/08/22', 23.74, 24.12, 24.72, 23.64],
    ['2022/08/23', 24.37, 24.03, 24.55, 23.74],
    ['2022/08/24', 24.19, 24.44, 24.58, 23.93],
    ['2022/08/25', 24.64, 24.06, 24.7, 23.61],
    ['2022/08/26', 24.01, 23.97, 24.01, 22.88],
    ['2022/08/29', 23.76, 24.49, 24.68, 23.67],
    ['2022/08/30', 24.39, 23.47, 24.44, 23.08],
    ['2022/08/31', 23.09, 23.83, 24.02, 22.97],
    ['2022/09/01', 23.5, 22.46, 23.62, 22.11],
    ['2022/09/02', 22.85, 23.41, 23.43, 22.5],
    ['2022/09/06', 23.74, 24.52, 24.75, 23.74],
    ['2022/09/07', 24.04, 23.78, 24.13, 23.12],
    ['2022/09/08', 23.74, 25.21, 25.5, 23.67],
    ['2022/09/09', 25.68, 26.33, 26.53, 25.68],
    ['2022/09/12', 26.47, 26.62, 26.85, 26.03],
    ['2022/09/13', 26.27, 26.54, 27.01, 26.24],
    ['2022/09/14', 26.68, 27.98, 27.98, 26.68],
    ['2022/09/15', 27.82, 27.37, 28.12, 27.07],
    ['2022/09/16', 27.04, 26.71, 27.04, 25.95],
    ['2022/09/19', 26.32, 30.04, 30.07, 26.21],
    ['2022/09/20', 30.07, 30.59, 30.9, 29.43],
    ['2022/09/21', 30.88, 29.99, 30.98, 29.96],
    ['2022/09/22', 30.26, 30.01, 30.92, 29.6],
    ['2022/09/23', 29.11, 27.37, 29.11, 27.05],
    ['2022/09/26', 27.07, 27.1, 27.9, 26.76],
    ['2022/09/27', 27.37, 27.66, 27.94, 26.98],
    ['2022/09/28', 27.5, 27.38, 27.56, 26.5],
    ['2022/09/29', 27.23, 25.6, 27.38, 25.33],
    ['2022/09/30', 25.63, 26.68, 27.15, 25.6],
    ['2022/10/03', 27.35, 27.61, 27.89, 26.69],
    ['2022/10/04', 28.07, 26.09, 28.19, 25.71],
    ['2022/10/05', 25.75, 25.75, 26.19, 24.5],
    ['2022/10/06', 26.18, 27.03, 27.48, 25.67],
    ['2022/10/07', 27.01, 26.97, 27.65, 26.53],
    ['2022/10/10', 26.91, 26.0, 27.55, 25.98],
    ['2022/10/11', 25.65, 26.52, 26.69, 25.27],
    ['2022/10/12', 26.4, 27.59, 27.72, 26.0],
    ['2022/10/13', 27.4, 28.54, 28.63, 27.19],
    ['2022/10/14', 28.6, 29.38, 29.5, 28.26],
    ['2022/10/17', 29.61, 30.88, 30.98, 29.1],
    ['2022/10/18', 31.24, 32.16, 32.26, 30.96],
    ['2022/10/19', 31.92, 31.51, 32.29, 30.82],
    ['2022/10/20', 31.86, 31.38, 31.99, 30.76],
    ['2022/10/21', 31.47, 31.57, 31.8, 30.73],
    ['2022/10/24', 31.66, 31.6, 31.78, 30.73],
    ['2022/10/25', 31.48, 31.57, 32.55, 30.08],
    ['2022/10/26', 31.65, 31.19, 31.95, 31.16],
    ['2022/10/27', 31.39, 30.78, 31.59, 30.35],
    ['2022/10/28', 30.98, 29.83, 30.98, 29.56],
    ['2022/10/31', 29.82, 30.51, 30.91, 29.54],
    ['2022/11/01', 31.0, 32.23, 32.29, 30.61],
    ['2022/11/02', 31.89, 32.12, 33.2, 31.71],
    ['2022/11/03', 32.09, 32.12, 34.14, 31.25],
    ['2022/11/04', 34.12, 33.35, 34.33, 32.64],
    ['2022/11/07', 33.71, 32.32, 34.27, 32.29],
    ['2022/11/08', 32.28, 33.8, 34.09, 32.25],
    ['2022/11/09', 33.64, 31.72, 34.08, 31.59],
    ['2022/11/10', 32.47, 30.4, 32.85, 30.24],
    ['2022/11/11', 30.73, 30.36, 31.26, 29.77],
    ['2022/11/14', 30.67, 31.36, 32.31, 30.67],
    ['2022/11/15', 31.77, 32.17, 32.17, 30.98],
    ['2022/11/16', 32.21, 31.6, 32.64, 31.59],
    ['2022/11/17', 31.08, 32.61, 32.68, 30.57],
    ['2022/11/18', 32.54, 33.77, 33.86, 32.22],
    ['2022/11/21', 33.83, 33.37, 34.25, 32.14],
    ['2022/11/22', 33.43, 33.19, 34.17, 33.01],
    ['2022/11/23', 33.15, 31.51, 33.66, 31.32],
    ['2022/11/25', 31.49, 32.25, 32.66, 31.0],
    ['2022/11/28', 31.73, 31.17, 31.88, 31.01],
    ['2022/11/29', 32.3, 32.37, 33.37, 31.88],
    ['2022/11/30', 32.89, 32.69, 33.1, 32.2],
    ['2022/12/01', 32.38, 31.63, 32.54, 31.51],
    ['2022/12/02', 31.49, 33.93, 34.09, 31.34],
    ['2022/12/05', 34.3, 33.27, 35.47, 32.88],
    ['2022/12/06', 33.1, 31.56, 33.38, 31.14],
    ['2022/12/07', 31.36, 28.79, 31.55, 27.96],
    ['2022/12/08', 29.62, 30.1, 30.6, 29.51],
    ['2022/12/09', 29.84, 29.59, 30.53, 29.16],
    ['2022/12/12', 30.04, 32.18, 32.46, 29.9],
    ['2022/12/13', 32.17, 31.56, 32.4, 30.71],
    ['2022/12/14', 31.79, 30.82, 32.07, 29.89],
    ['2022/12/15', 31.08, 32.6, 32.74, 30.86],
    ['2022/12/16', 32.08, 31.92, 32.77, 31.5],
    ['2022/12/19', 31.97, 31.23, 32.09, 30.71],
    ['2022/12/20', 31.49, 31.49, 31.91, 30.85],
    ['2022/12/21', 31.71, 30.77, 31.71, 30.53],
    ['2022/12/22', 30.68, 29.93, 30.68, 29.13],
    ['2022/12/23', 30.11, 30.55, 30.8, 29.36],
    ['2022/12/27', 30.5, 30.48, 30.57, 29.81],
    ['2022/12/28', 30.03, 28.58, 30.07, 28.45],
    ['2022/12/29', 28.57, 29.19, 29.33, 28.41],
    ['2022/12/30', 28.92, 29.85, 30.09, 28.86],
    ['2023/01/03', 29.35, 27.8, 29.76, 27.3],
    ['2023/01/04', 27.46, 25.88, 27.62, 25.85],
    ['2023/01/05', 25.97, 26.51, 27.02, 25.83],
    ['2023/01/06', 26.49, 26.38, 27.02, 26.24],
    ['2023/01/09', 26.75, 25.92, 26.85, 25.58],
    ['2023/01/10', 25.92, 26.98, 27.59, 25.67],
    ['2023/01/11', 26.94, 26.43, 28.12, 26.38],
    ['2023/01/12', 26.55, 27.04, 27.35, 26.25],
    ['2023/01/13', 27.09, 28.12, 28.26, 26.82],
    ['2023/01/17', 28.06, 28.7, 29.19, 28.06],
    ['2023/01/18', 29.19, 27.94, 29.62, 27.93],
    ['2023/01/19', 27.9, 28.03, 28.08, 27.37],
    ['2023/01/20', 28.41, 29.03, 29.11, 28.01],
    ['2023/01/23', 28.86, 27.67, 28.86, 27.55],
    ['2023/01/24', 27.85, 28.08, 28.21, 26.97],
    ['2023/01/25', 27.81, 27.49, 27.81, 26.93],
    ['2023/01/26', 27.81, 27.61, 28.13, 26.9],
    ['2023/01/27', 27.76, 28.78, 29.01, 27.76],
    ['2023/01/30', 28.73, 28.45, 29.5, 28.37],
    ['2023/01/31', 28.44, 29.73, 30.21, 28.18],
    ['2023/02/01', 30.33, 31.8, 32.36, 30.18],
    ['2023/02/02', 31.97, 30.68, 32.22, 30.24],
    ['2023/02/03', 30.65, 31.37, 32.51, 30.65],
    ['2023/02/06', 31.41, 32.74, 33.03, 31.41],
    ['2023/02/07', 32.83, 33.41, 33.6, 32.33],
    ['2023/02/08', 33.64, 33.34, 33.83, 32.81],
    ['2023/02/09', 33.73, 35.31, 35.59, 33.67],
    ['2023/02/10', 35.31, 34.78, 35.75, 34.12],
    ['2023/02/13', 34.78, 36.26, 36.6, 34.53],
    ['2023/02/14', 35.91, 36.46, 36.99, 35.13],
    ['2023/02/15', 36.22, 37.4, 37.62, 35.6],
    ['2023/02/16', 37.2, 37.41, 37.77, 36.12],
    ['2023/02/17', 37.56, 36.43, 37.7, 36.28],
    ['2023/02/21', 36.5, 36.49, 37.54, 36.05],
    ['2023/02/22', 36.45, 36.19, 36.88, 35.59],
    ['2023/02/23', 38.6, 41.0, 41.69, 37.98],
    ['2023/02/24', 40.82, 41.97, 43.05, 40.4],
    ['2023/02/27', 42.16, 42.58, 43.09, 41.68],
    ['2023/02/28', 42.75, 43.74, 44.12, 42.38],
    ['2023/03/01', 44.48, 45.12, 46.03, 44.16],
    ['2023/03/02', 44.65, 46.12, 46.26, 43.96],
    ['2023/03/03', 46.16, 46.07, 46.41, 45.1],
    ['2023/03/06', 45.58, 44.48, 45.64, 44.24],
    ['2023/03/07', 44.44, 45.81, 46.16, 43.42],
    ['2023/03/08', 46.01, 45.85, 46.4, 44.84],
    ['2023/03/09', 46.05, 43.6, 46.55, 43.49],
    ['2023/03/10', 43.71, 43.25, 45.1, 43.24],
    ['2023/03/13', 41.88, 41.94, 42.99, 39.93],
    ['2023/03/14', 42.26, 43.2, 44.38, 42.14],
    ['2023/03/15', 41.65, 41.09, 41.91, 39.77],
    ['2023/03/16', 40.69, 40.28, 41.16, 39.55],
    ['2023/03/17', 40.33, 39.66, 41.53, 39.41],
    ['2023/03/20', 40.07, 40.72, 41.66, 40.02],
    ['2023/03/21', 42.75, 42.36, 43.28, 41.72],
    ['2023/03/22', 42.18, 43.61, 44.97, 41.67],
    ['2023/03/23', 44.03, 41.97, 45.05, 41.52],
    ['2023/03/24', 41.26, 42.05, 42.6, 40.84],
    ['2023/03/27', 42.4, 42.34, 42.78, 41.28],
    ['2023/03/28', 42.65, 42.36, 43.33, 42.27],
    ['2023/03/29', 42.36, 41.94, 43.17, 41.62],
    ['2023/03/30', 42.14, 41.03, 42.14, 39.97],
    ['2023/03/31', 41.23, 41.59, 41.83, 41.03],
    ['2023/04/03', 40.31, 37.69, 40.51, 36.58],
    ['2023/04/04', 37.89, 37.68, 38.27, 36.92],
    ['2023/04/05', 37.44, 38.96, 39.26, 36.77],
    ['2023/04/06', 39.03, 37.57, 39.35, 37.55],
    ['2023/04/10', 37.59, 37.92, 38.75, 37.49],
    ['2023/04/11', 37.88, 38.01, 38.63, 37.86],
    ['2023/04/12', 38.35, 39.09, 39.3, 38.13],
    ['2023/04/13', 39.57, 39.55, 41.15, 39.34],
    ['2023/04/14', 39.65, 39.13, 39.83, 38.58],
    ['2023/04/17', 39.62, 41.88, 42.24, 39.52],
    ['2023/04/18', 41.95, 43.62, 43.69, 41.39],
    ['2023/04/19', 42.89, 42.09, 42.89, 40.71],
    ['2023/04/20', 41.58, 39.57, 41.84, 39.38],
    ['2023/04/21', 39.0, 38.22, 39.16, 37.83],
    ['2023/04/24', 38.84, 41.11, 42.35, 38.74],
    ['2023/04/25', 40.81, 39.74, 41.11, 39.2],
    ['2023/04/26', 39.74, 38.55, 39.91, 38.11],
    ['2023/04/27', 38.46, 38.87, 39.0, 37.82],
    ['2023/04/28', 38.86, 39.23, 39.69, 38.67],
    ['2023/05/01', 39.12, 38.54, 39.21, 37.82],
    ['2023/05/02', 38.22, 37.55, 38.26, 37.07],
    ['2023/05/03', 37.5, 36.19, 37.5, 35.73],
    ['2023/05/04', 35.7, 35.68, 36.05, 35.09],
    ['2023/05/05', 36.53, 36.49, 38.02, 36.33],
    ['2023/05/08', 36.49, 36.16, 36.72, 35.52],
    ['2023/05/09', 36.04, 36.89, 37.26, 35.26],
    ['2023/05/10', 36.83, 37.89, 38.25, 36.34],
    ['2023/05/11', 41.06, 42.68, 43.53, 40.25],
    ['2023/05/12', 43.31, 40.43, 44.79, 40.2],
    ['2023/05/15', 40.92, 39.73, 41.39, 39.71],
    ['2023/05/16', 39.73, 39.68, 41.0, 39.63],
    ['2023/05/17', 39.74, 38.97, 40.39, 38.82],
    ['2023/05/18', 38.85, 38.79, 38.97, 37.64],
    ['2023/05/19', 39.49, 40.02, 41.17, 38.41],
    ['2023/05/22', 40.1, 40.07, 41.72, 39.94],
    ['2023/05/23', 40.15, 38.85, 40.34, 38.84],
    ['2023/05/24', 38.58, 38.94, 39.63, 38.12],
    ['2023/05/25', 38.96, 37.89, 39.2, 37.8],
    ['2023/05/26', 38.22, 39.19, 39.58, 38.11],
    ['2023/05/30', 39.0, 37.39, 39.03, 37.18],
    ['2023/05/31', 36.59, 36.13, 36.8, 35.53],
    ['2023/06/01', 36.2, 36.71, 38.06, 36.13],
    ['2023/06/02', 37.1, 37.79, 37.8, 36.54],
    ['2023/06/05', 36.96, 35.98, 37.1, 35.95],
    ['2023/06/06', 35.6, 36.63, 36.88, 35.0],
    ['2023/06/07', 36.92, 36.74, 37.49, 36.03],
    ['2023/06/08', 36.74, 36.18, 37.21, 36.14],
    ['2023/06/09', 36.63, 36.91, 37.4, 36.31],
    ['2023/06/12', 37.11, 36.5, 37.45, 36.38],
    ['2023/06/13', 36.89, 36.53, 37.44, 36.0],
    ['2023/06/14', 36.71, 38.36, 38.61, 36.71],
    ['2023/06/15', 38.57, 38.34, 38.89, 37.44],
    ['2023/06/16', 38.76, 37.88, 38.76, 37.57],
    ['2023/06/20', 37.65, 37.6, 37.77, 36.39],
    ['2023/06/21', 37.6, 38.1, 38.37, 37.19],
    ['2023/06/22', 37.56, 38.14, 38.15, 37.01],
    ['2023/06/23', 37.02, 37.79, 37.82, 37.02],
    ['2023/06/26', 37.34, 36.21, 37.68, 36.19],
    ['2023/06/27', 36.0, 35.52, 36.35, 35.37],
    ['2023/06/28', 35.44, 36.01, 36.02, 35.1],
    ['2023/06/29', 36.32, 36.72, 37.7, 36.07],
    ['2023/06/30', 37.39, 38.23, 38.49, 36.83],
    ['2023/07/03', 38.5, 38.22, 39.36, 38.21],
    ['2023/07/05', 38.04, 39.3, 39.67, 37.76],
    ['2023/07/06', 38.93, 37.82, 39.21, 37.13],
    ['2023/07/07', 38.44, 39.13, 39.33, 38.12],
    ['2023/07/10', 38.95, 38.97, 39.64, 38.6],
    ['2023/07/11', 39.49, 40.03, 40.25, 38.94],
    ['2023/07/12', 40.14, 40.23, 40.82, 39.86],
    ['2023/07/13', 40.39, 39.91, 40.45, 39.61],
    ['2023/07/14', 39.73, 37.63, 39.73, 37.54],
    ['2023/07/17', 37.5, 38.57, 38.61, 37.49],
    ['2023/07/18', 38.19, 38.03, 38.4, 37.74],
    ['2023/07/19', 38.12, 37.65, 38.16, 37.06],
    ['2023/07/20', 37.98, 37.63, 38.05, 37.03],
    ['2023/07/21', 37.68, 37.46, 37.82, 36.54],
    ['2023/07/24', 37.91, 38.84, 38.85, 37.62],
    ['2023/07/25', 38.94, 40.78, 41.29, 38.94],
    ['2023/07/26', 40.48, 40.2, 40.89, 39.74],
    ['2023/07/27', 40.3, 41.04, 41.43, 39.9],
    ['2023/07/28', 41.31, 42.4, 42.62, 41.14],
    ['2023/07/31', 42.89, 43.61, 43.75, 42.18],
    ['2023/08/01', 43.6, 43.04, 43.6, 42.46],
    ['2023/08/02', 42.5, 43.21, 43.55, 42.2],
]);
var volumes = [
    416800.0,
    618700.0,
    428300.0,
    909100.0,
    789700.0,
    448000.0,
    473200.0,
    481900.0,
    529800.0,
    356200.0,
    559000.0,
    383400.0,
    241200.0,
    763900.0,
    329600.0,
    349300.0,
    337000.0,
    361600.0,
    455400.0,
    520000.0,
    329600.0,
    562900.0,
    405100.0,
    884000.0,
    405900.0,
    602800.0,
    508100.0,
    670300.0,
    462200.0,
    611200.0,
    452600.0,
    559700.0,
    1478300.0,
    862000.0,
    659700.0,
    411000.0,
    1062700.0,
    650700.0,
    490100.0,
    453700.0,
    705100.0,
    673600.0,
    1177000.0,
    734300.0,
    848400.0,
    823100.0,
    615300.0,
    414200.0,
    498700.0,
    348000.0,
    494000.0,
    450200.0,
    706400.0,
    631700.0,
    421400.0,
    286000.0,
    324300.0,
    374700.0,
    845100.0,
    304100.0,
    356300.0,
    294600.0,
    290800.0,
    627800.0,
    528500.0,
    954600.0,
    749400.0,
    451000.0,
    558200.0,
    429200.0,
    481000.0,
    437000.0,
    491400.0,
    370800.0,
    249700.0,
    392400.0,
    403600.0,
    596700.0,
    358800.0,
    442500.0,
    233700.0,
    278100.0,
    471000.0,
    284700.0,
    788500.0,
    604900.0,
    797000.0,
    370200.0,
    742000.0,
    443900.0,
    451400.0,
    589400.0,
    724500.0,
    741700.0,
    359800.0,
    540600.0,
    278400.0,
    461900.0,
    219800.0,
    335100.0,
    183500.0,
    174500.0,
    306800.0,
    291400.0,
    275700.0,
    410600.0,
    607800.0,
    465300.0,
    408500.0,
    350900.0,
    501600.0,
    315600.0,
    427500.0,
    390800.0,
    385400.0,
    433000.0,
    231400.0,
    736600.0,
    425600.0,
    273900.0,
    429700.0,
    283300.0,
    404100.0,
    244900.0,
    487500.0,
    723500.0,
    537800.0,
    315000.0,
    502000.0,
    313900.0,
    307600.0,
    665000.0,
    383100.0,
    652900.0,
    495100.0,
    374500.0,
    717900.0,
    406500.0,
    365500.0,
    387900.0,
    1606500.0,
    993800.0,
    933500.0,
    734400.0,
    720000.0,
    569300.0,
    530500.0,
    533700.0,
    816500.0,
    483700.0,
    472600.0,
    544400.0,
    605100.0,
    441400.0,
    831800.0,
    424600.0,
    708200.0,
    447300.0,
    611500.0,
    636800.0,
    700400.0,
    341700.0,
    249100.0,
    281400.0,
    305900.0,
    383500.0,
    573800.0,
    1403700.0,
    657900.0,
    466200.0,
    312300.0,
    257800.0,
    275100.0,
    434400.0,
    390300.0,
    358900.0,
    810300.0,
    621400.0,
    586000.0,
    378400.0,
    441700.0,
    809000.0,
    442000.0,
    337100.0,
    366400.0,
    375000.0,
    334100.0,
    503100.0,
    363200.0,
    391200.0,
    330800.0,
    366900.0,
    445000.0,
    391200.0,
    1332400.0,
    1092900.0,
    544000.0,
    404000.0,
    618500.0,
    732100.0,
    601200.0,
    510600.0,
    404300.0,
    409800.0,
    393100.0,
    441600.0,
    473200.0,
    493000.0,
    441900.0,
    427000.0,
    353700.0,
    394800.0,
    304200.0,
    430200.0,
    672600.0,
    398400.0,
    313500.0,
    457000.0,
    426900.0,
    458300.0,
    320500.0,
    300300.0,
    268200.0,
    797800.0,
    342800.0,
    406300.0,
    482700.0,
    373800.0,
    480200.0,
    291800.0,
    278200.0,
    324200.0,
    284700.0,
    425700.0,
    329100.0,
    353200.0,
    336400.0,
    418300.0,
    467500.0,
    447100.0,
    479100.0,
    267900.0,
    349000.0,
    409400.0,
    573000.0,
    466900.0,
    420000.0,
    534200.0,
    538200.0,
    385000.0,
    543000.0,
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
        text: "TNK",
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