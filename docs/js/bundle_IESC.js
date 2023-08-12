/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_IESC");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/15', 33.76, 34.26, 34.3, 33.33],
    ['2022/08/16', 33.46, 33.61, 34.2, 33.39],
    ['2022/08/17', 33.22, 33.13, 33.37, 32.91],
    ['2022/08/18', 33.38, 33.78, 34.08, 33.38],
    ['2022/08/19', 33.31, 33.08, 33.52, 32.76],
    ['2022/08/22', 32.54, 33.18, 33.36, 32.54],
    ['2022/08/23', 33.63, 32.75, 33.75, 32.75],
    ['2022/08/24', 32.52, 32.94, 33.21, 32.52],
    ['2022/08/25', 32.96, 33.35, 33.35, 32.51],
    ['2022/08/26', 33.4, 30.96, 33.4, 30.75],
    ['2022/08/29', 30.53, 30.48, 30.71, 29.52],
    ['2022/08/30', 30.36, 30.45, 30.98, 29.38],
    ['2022/08/31', 30.42, 30.39, 31.07, 30.01],
    ['2022/09/01', 30.24, 29.98, 30.6, 29.5],
    ['2022/09/02', 30.58, 29.68, 31.55, 29.67],
    ['2022/09/06', 30.14, 28.95, 30.45, 28.92],
    ['2022/09/07', 29.12, 29.52, 29.81, 28.95],
    ['2022/09/08', 29.24, 29.28, 30.67, 29.12],
    ['2022/09/09', 29.39, 30.39, 30.63, 28.04],
    ['2022/09/12', 30.77, 30.75, 31.24, 30.37],
    ['2022/09/13', 29.92, 29.2, 30.71, 28.93],
    ['2022/09/14', 29.41, 28.05, 30.0, 27.86],
    ['2022/09/15', 27.95, 28.56, 29.2, 27.95],
    ['2022/09/16', 28.02, 29.06, 29.13, 28.0],
    ['2022/09/19', 28.58, 29.23, 31.04, 28.58],
    ['2022/09/20', 28.89, 29.07, 29.47, 28.7],
    ['2022/09/21', 29.11, 28.22, 29.7, 28.22],
    ['2022/09/22', 28.04, 27.0, 28.18, 26.83],
    ['2022/09/23', 26.49, 25.93, 26.49, 25.22],
    ['2022/09/26', 26.01, 26.89, 27.26, 26.01],
    ['2022/09/27', 27.08, 26.62, 29.0, 26.57],
    ['2022/09/28', 27.11, 28.14, 28.33, 27.11],
    ['2022/09/29', 27.91, 27.49, 28.03, 27.15],
    ['2022/09/30', 27.31, 27.62, 28.89, 27.31],
    ['2022/10/03', 28.24, 28.72, 28.98, 28.04],
    ['2022/10/04', 29.15, 29.29, 29.37, 29.0],
    ['2022/10/05', 29.03, 29.09, 29.5, 28.6],
    ['2022/10/06', 29.01, 28.79, 29.5, 28.58],
    ['2022/10/07', 28.38, 28.38, 28.76, 28.24],
    ['2022/10/10', 28.3, 29.26, 29.57, 28.3],
    ['2022/10/11', 29.05, 28.57, 29.89, 27.86],
    ['2022/10/12', 28.43, 29.03, 29.36, 28.43],
    ['2022/10/13', 28.57, 30.32, 30.63, 28.48],
    ['2022/10/14', 30.62, 29.74, 30.63, 29.59],
    ['2022/10/17', 30.05, 30.64, 31.01, 30.05],
    ['2022/10/18', 31.13, 30.69, 31.61, 30.5],
    ['2022/10/19', 30.04, 30.55, 30.66, 29.6],
    ['2022/10/20', 30.63, 30.18, 31.25, 30.03],
    ['2022/10/21', 30.23, 31.83, 32.05, 30.23],
    ['2022/10/24', 31.81, 32.37, 32.81, 31.81],
    ['2022/10/25', 32.32, 32.51, 32.8, 32.25],
    ['2022/10/26', 32.62, 33.12, 33.48, 32.62],
    ['2022/10/27', 33.43, 33.19, 34.04, 33.07],
    ['2022/10/28', 33.17, 34.25, 34.45, 33.1],
    ['2022/10/31', 34.01, 33.04, 34.04, 32.77],
    ['2022/11/01', 33.15, 33.9, 34.08, 33.13],
    ['2022/11/02', 33.51, 32.85, 33.66, 32.85],
    ['2022/11/03', 32.26, 33.36, 33.56, 32.25],
    ['2022/11/04', 33.53, 33.71, 33.71, 32.89],
    ['2022/11/07', 34.07, 34.11, 34.4, 33.79],
    ['2022/11/08', 33.73, 33.6, 33.97, 33.25],
    ['2022/11/09', 33.17, 32.97, 33.17, 32.77],
    ['2022/11/10', 34.2, 34.99, 35.32, 33.75],
    ['2022/11/11', 35.0, 34.38, 35.47, 34.37],
    ['2022/11/14', 33.92, 33.28, 34.02, 33.22],
    ['2022/11/15', 33.89, 32.22, 33.99, 32.22],
    ['2022/11/16', 32.53, 32.91, 33.03, 32.12],
    ['2022/11/17', 32.72, 33.12, 33.12, 31.87],
    ['2022/11/18', 33.7, 33.17, 33.87, 33.17],
    ['2022/11/21', 33.43, 33.42, 33.6, 33.04],
    ['2022/11/22', 33.74, 33.84, 34.37, 33.15],
    ['2022/11/23', 33.65, 33.04, 33.65, 32.82],
    ['2022/11/25', 32.99, 33.25, 33.25, 32.99],
    ['2022/11/28', 32.99, 33.15, 33.61, 32.8],
    ['2022/11/29', 33.4, 32.83, 33.4, 32.36],
    ['2022/11/30', 32.91, 33.82, 34.1, 32.65],
    ['2022/12/01', 34.1, 33.63, 34.1, 33.32],
    ['2022/12/02', 33.33, 34.5, 34.5, 33.3],
    ['2022/12/05', 34.02, 34.58, 34.58, 33.3],
    ['2022/12/06', 34.69, 35.96, 38.55, 34.69],
    ['2022/12/07', 36.07, 33.98, 36.07, 33.53],
    ['2022/12/08', 34.34, 33.2, 36.31, 32.75],
    ['2022/12/09', 32.84, 31.71, 33.04, 31.65],
    ['2022/12/12', 31.67, 32.07, 32.19, 31.22],
    ['2022/12/13', 32.99, 32.3, 34.22, 32.11],
    ['2022/12/14', 32.46, 31.0, 33.17, 30.65],
    ['2022/12/15', 30.83, 30.71, 31.5, 29.57],
    ['2022/12/16', 29.99, 28.28, 31.05, 27.68],
    ['2022/12/19', 28.28, 31.29, 31.37, 28.28],
    ['2022/12/20', 31.27, 32.05, 33.15, 31.27],
    ['2022/12/21', 32.55, 33.87, 34.03, 32.55],
    ['2022/12/22', 33.89, 34.26, 34.45, 33.4],
    ['2022/12/23', 34.48, 34.2, 35.37, 33.82],
    ['2022/12/27', 34.18, 33.86, 34.18, 33.43],
    ['2022/12/28', 34.06, 34.44, 34.5, 33.53],
    ['2022/12/29', 34.5, 35.51, 35.6, 34.5],
    ['2022/12/30', 34.96, 35.57, 36.22, 34.96],
    ['2023/01/03', 35.3, 36.28, 36.6, 35.0],
    ['2023/01/04', 36.19, 35.55, 36.5, 35.24],
    ['2023/01/05', 35.25, 35.74, 36.01, 35.0],
    ['2023/01/06', 35.95, 36.35, 36.65, 35.95],
    ['2023/01/09', 36.87, 36.71, 37.0, 36.45],
    ['2023/01/10', 36.45, 38.18, 38.2, 35.82],
    ['2023/01/11', 38.11, 39.0, 39.34, 37.94],
    ['2023/01/12', 39.12, 39.06, 39.96, 38.46],
    ['2023/01/13', 38.9, 39.49, 39.61, 37.24],
    ['2023/01/17', 39.25, 39.08, 39.79, 38.71],
    ['2023/01/18', 38.85, 39.11, 40.28, 38.66],
    ['2023/01/19', 38.86, 39.17, 40.0, 38.86],
    ['2023/01/20', 39.43, 39.76, 40.3, 38.8],
    ['2023/01/23', 40.4, 40.27, 40.62, 39.85],
    ['2023/01/24', 39.9, 40.13, 40.67, 39.9],
    ['2023/01/25', 39.72, 39.46, 40.14, 38.32],
    ['2023/01/26', 39.45, 38.63, 39.45, 37.96],
    ['2023/01/27', 38.64, 39.42, 39.56, 38.64],
    ['2023/01/30', 38.67, 37.79, 38.67, 37.53],
    ['2023/01/31', 37.69, 39.81, 40.0, 37.69],
    ['2023/02/01', 39.95, 39.62, 40.59, 39.27],
    ['2023/02/02', 39.6, 40.8, 40.93, 39.03],
    ['2023/02/03', 40.95, 40.87, 41.64, 39.32],
    ['2023/02/06', 39.91, 41.21, 41.49, 39.91],
    ['2023/02/07', 41.35, 42.1, 42.27, 41.02],
    ['2023/02/08', 41.54, 41.88, 42.58, 40.82],
    ['2023/02/09', 41.91, 41.56, 42.59, 40.96],
    ['2023/02/10', 41.29, 40.47, 41.29, 40.46],
    ['2023/02/13', 40.33, 41.27, 41.6, 40.33],
    ['2023/02/14', 40.86, 41.05, 41.32, 40.31],
    ['2023/02/15', 40.51, 41.89, 42.28, 40.51],
    ['2023/02/16', 41.72, 42.24, 44.1, 41.7],
    ['2023/02/17', 42.47, 42.54, 44.0, 41.88],
    ['2023/02/21', 42.0, 40.67, 42.3, 40.63],
    ['2023/02/22', 41.06, 41.52, 41.85, 40.4],
    ['2023/02/23', 41.69, 41.8, 42.3, 40.04],
    ['2023/02/24', 41.43, 42.92, 43.09, 40.6],
    ['2023/02/27', 43.34, 42.2, 43.5, 42.04],
    ['2023/02/28', 42.18, 42.06, 42.58, 41.87],
    ['2023/03/01', 42.4, 43.16, 43.22, 42.3],
    ['2023/03/02', 42.78, 43.56, 43.94, 42.78],
    ['2023/03/03', 44.1, 44.5, 44.98, 43.86],
    ['2023/03/06', 44.27, 43.21, 44.53, 42.94],
    ['2023/03/07', 43.11, 44.89, 45.14, 43.11],
    ['2023/03/08', 45.21, 45.08, 45.57, 44.24],
    ['2023/03/09', 45.24, 44.24, 46.0, 43.9],
    ['2023/03/10', 43.83, 42.12, 43.95, 41.99],
    ['2023/03/13', 41.23, 42.04, 42.27, 40.44],
    ['2023/03/14', 42.95, 43.59, 43.93, 42.49],
    ['2023/03/15', 42.84, 41.9, 42.84, 41.32],
    ['2023/03/16', 41.17, 42.49, 42.94, 40.86],
    ['2023/03/17', 41.91, 41.56, 41.91, 41.27],
    ['2023/03/20', 42.14, 41.67, 42.37, 41.22],
    ['2023/03/21', 42.59, 42.36, 42.59, 41.74],
    ['2023/03/22', 41.92, 41.02, 42.35, 40.98],
    ['2023/03/23', 40.91, 41.47, 42.34, 40.91],
    ['2023/03/24', 41.21, 42.78, 42.87, 40.8],
    ['2023/03/27', 43.46, 43.08, 43.75, 42.2],
    ['2023/03/28', 42.57, 43.51, 43.8, 42.46],
    ['2023/03/29', 43.94, 43.15, 43.94, 42.95],
    ['2023/03/30', 42.98, 41.85, 43.19, 41.55],
    ['2023/03/31', 41.85, 43.09, 43.17, 41.85],
    ['2023/04/03', 43.28, 43.86, 44.16, 43.04],
    ['2023/04/04', 44.08, 41.96, 44.08, 41.85],
    ['2023/04/05', 41.6, 40.47, 41.72, 40.05],
    ['2023/04/06', 40.2, 40.53, 41.26, 40.0],
    ['2023/04/10', 40.16, 40.59, 41.16, 40.16],
    ['2023/04/11', 40.77, 40.9, 41.59, 40.59],
    ['2023/04/12', 40.91, 41.01, 41.57, 40.85],
    ['2023/04/13', 41.38, 41.83, 41.92, 40.71],
    ['2023/04/14', 42.09, 41.91, 42.71, 41.76],
    ['2023/04/17', 42.03, 42.72, 42.85, 41.8],
    ['2023/04/18', 43.02, 42.25, 43.12, 42.13],
    ['2023/04/19', 41.85, 42.35, 42.72, 41.85],
    ['2023/04/20', 42.29, 43.61, 43.61, 42.29],
    ['2023/04/21', 43.49, 42.9, 43.83, 42.83],
    ['2023/04/24', 42.9, 43.21, 43.69, 42.9],
    ['2023/04/25', 42.96, 43.52, 43.97, 42.96],
    ['2023/04/26', 43.2, 42.3, 43.43, 41.6],
    ['2023/04/27', 42.6, 42.96, 43.11, 42.53],
    ['2023/04/28', 42.57, 43.19, 43.84, 42.38],
    ['2023/05/01', 43.42, 43.81, 44.02, 43.21],
    ['2023/05/02', 43.65, 44.3, 44.47, 43.03],
    ['2023/05/03', 44.38, 45.27, 46.7, 43.59],
    ['2023/05/04', 45.27, 43.04, 45.27, 42.44],
    ['2023/05/05', 43.77, 43.75, 44.16, 43.25],
    ['2023/05/08', 43.75, 43.92, 44.61, 43.74],
    ['2023/05/09', 43.91, 44.27, 44.4, 43.2],
    ['2023/05/10', 45.5, 49.12, 49.42, 45.5],
    ['2023/05/11', 49.1, 46.98, 49.1, 46.95],
    ['2023/05/12', 47.32, 46.88, 47.93, 46.58],
    ['2023/05/15', 47.43, 48.25, 48.52, 47.26],
    ['2023/05/16', 48.1, 48.59, 49.2, 47.67],
    ['2023/05/17', 48.69, 50.35, 50.64, 48.62],
    ['2023/05/18', 50.35, 50.23, 50.5, 49.08],
    ['2023/05/19', 50.31, 50.38, 50.83, 49.84],
    ['2023/05/22', 50.43, 49.98, 51.24, 49.8],
    ['2023/05/23', 50.0, 50.37, 51.1, 49.79],
    ['2023/05/24', 50.07, 48.73, 50.07, 48.72],
    ['2023/05/25', 48.74, 48.49, 49.19, 48.16],
    ['2023/05/26', 48.28, 47.88, 48.44, 47.35],
    ['2023/05/30', 48.22, 47.39, 48.4, 47.21],
    ['2023/05/31', 47.3, 47.42, 47.8, 46.46],
    ['2023/06/01', 47.72, 48.46, 48.68, 47.08],
    ['2023/06/02', 49.04, 50.93, 51.25, 48.33],
    ['2023/06/05', 50.84, 50.42, 50.84, 49.4],
    ['2023/06/06', 50.53, 51.98, 52.38, 50.53],
    ['2023/06/07', 52.34, 53.31, 53.46, 52.31],
    ['2023/06/08', 53.29, 52.4, 53.29, 52.03],
    ['2023/06/09', 52.46, 52.98, 53.19, 52.02],
    ['2023/06/12', 53.15, 54.06, 54.31, 52.5],
    ['2023/06/13', 54.24, 54.51, 54.88, 53.61],
    ['2023/06/14', 54.52, 53.95, 54.62, 53.6],
    ['2023/06/15', 53.76, 54.27, 54.41, 53.03],
    ['2023/06/16', 54.61, 53.27, 54.61, 53.21],
    ['2023/06/20', 53.12, 52.58, 53.29, 52.35],
    ['2023/06/21', 52.33, 53.48, 54.1, 52.33],
    ['2023/06/22', 52.96, 53.16, 53.34, 52.55],
    ['2023/06/23', 52.32, 52.74, 53.49, 51.99],
    ['2023/06/26', 52.9, 54.02, 54.56, 52.9],
    ['2023/06/27', 54.07, 54.77, 55.41, 53.87],
    ['2023/06/28', 54.98, 56.31, 57.42, 54.85],
    ['2023/06/29', 56.64, 56.86, 58.13, 56.64],
    ['2023/06/30', 57.25, 56.88, 57.4, 56.5],
    ['2023/07/03', 56.46, 56.94, 56.98, 55.57],
    ['2023/07/05', 56.73, 55.0, 57.79, 54.84],
    ['2023/07/06', 54.4, 53.34, 54.58, 53.0],
    ['2023/07/07', 53.53, 54.36, 54.75, 53.53],
    ['2023/07/10', 54.43, 55.56, 55.8, 53.93],
    ['2023/07/11', 55.86, 56.15, 56.19, 55.06],
    ['2023/07/12', 57.05, 57.48, 57.84, 55.95],
    ['2023/07/13', 57.94, 57.85, 58.23, 57.0],
    ['2023/07/14', 57.95, 57.51, 57.95, 57.12],
    ['2023/07/17', 57.68, 58.44, 58.65, 57.32],
    ['2023/07/18', 58.46, 57.98, 58.68, 57.45],
    ['2023/07/19', 57.98, 56.71, 58.0, 56.42],
    ['2023/07/20', 56.5, 55.91, 56.65, 55.69],
    ['2023/07/21', 56.4, 56.78, 57.8, 56.16],
    ['2023/07/24', 56.78, 56.51, 57.47, 56.32],
    ['2023/07/25', 56.28, 56.77, 57.14, 56.16],
    ['2023/07/26', 57.61, 56.99, 57.75, 56.59],
    ['2023/07/27', 57.38, 55.66, 57.38, 55.6],
    ['2023/07/28', 56.27, 55.97, 56.8, 55.68],
    ['2023/07/31', 56.2, 57.32, 57.9, 56.08],
    ['2023/08/01', 57.0, 57.8, 58.32, 57.0],
    ['2023/08/02', 57.53, 57.36, 57.8, 57.1],
    ['2023/08/03', 56.98, 58.01, 58.03, 56.91],
    ['2023/08/04', 60.0, 66.62, 67.93, 58.78],
    ['2023/08/07', 66.8, 64.53, 66.85, 63.36],
    ['2023/08/08', 63.73, 66.57, 66.58, 63.41],
    ['2023/08/09', 66.59, 69.52, 70.51, 66.51],
    ['2023/08/10', 70.01, 69.78, 70.82, 68.46],
    ['2023/08/11', 69.9, 70.23, 70.82, 69.86],
]);
var volumes = [
    20500.0,
    15400.0,
    16900.0,
    14900.0,
    14700.0,
    40300.0,
    23800.0,
    20500.0,
    28500.0,
    31200.0,
    39000.0,
    54000.0,
    69900.0,
    25900.0,
    20600.0,
    24400.0,
    22100.0,
    17600.0,
    57600.0,
    38100.0,
    41400.0,
    31800.0,
    26800.0,
    62200.0,
    34200.0,
    24500.0,
    31400.0,
    29300.0,
    50600.0,
    33900.0,
    27000.0,
    30700.0,
    24800.0,
    47500.0,
    23900.0,
    20800.0,
    17300.0,
    34300.0,
    25700.0,
    24100.0,
    35600.0,
    18500.0,
    47500.0,
    24300.0,
    25300.0,
    19900.0,
    30800.0,
    19000.0,
    25300.0,
    19100.0,
    21400.0,
    12900.0,
    13400.0,
    37900.0,
    48900.0,
    12500.0,
    18900.0,
    9200.0,
    11500.0,
    14700.0,
    14600.0,
    8400.0,
    23500.0,
    12700.0,
    9900.0,
    21300.0,
    11400.0,
    36200.0,
    9900.0,
    8800.0,
    10600.0,
    4400.0,
    2700.0,
    14900.0,
    13000.0,
    22400.0,
    12900.0,
    11500.0,
    15800.0,
    92900.0,
    42100.0,
    42500.0,
    35300.0,
    58700.0,
    44900.0,
    51100.0,
    58500.0,
    468100.0,
    67500.0,
    34700.0,
    43300.0,
    32500.0,
    17300.0,
    32400.0,
    30100.0,
    24700.0,
    27500.0,
    29700.0,
    15900.0,
    27200.0,
    10400.0,
    14200.0,
    13200.0,
    16300.0,
    20400.0,
    23800.0,
    14500.0,
    26000.0,
    10100.0,
    16000.0,
    13500.0,
    9600.0,
    16000.0,
    11000.0,
    5400.0,
    18600.0,
    15700.0,
    23600.0,
    16700.0,
    29200.0,
    17000.0,
    23600.0,
    34100.0,
    30000.0,
    20400.0,
    20600.0,
    16800.0,
    25300.0,
    29400.0,
    49000.0,
    58900.0,
    21400.0,
    26700.0,
    36100.0,
    36500.0,
    48800.0,
    34700.0,
    32900.0,
    20300.0,
    59900.0,
    42900.0,
    31100.0,
    17200.0,
    23200.0,
    23200.0,
    28700.0,
    21900.0,
    17500.0,
    51800.0,
    33900.0,
    36500.0,
    35300.0,
    34700.0,
    42800.0,
    37800.0,
    50900.0,
    22200.0,
    19900.0,
    62600.0,
    34700.0,
    44800.0,
    39900.0,
    23200.0,
    35100.0,
    35500.0,
    28800.0,
    24500.0,
    40800.0,
    34900.0,
    20300.0,
    16400.0,
    29200.0,
    31700.0,
    15600.0,
    27000.0,
    36800.0,
    15200.0,
    40900.0,
    21200.0,
    42800.0,
    33500.0,
    101000.0,
    24600.0,
    24600.0,
    102200.0,
    33600.0,
    29200.0,
    25500.0,
    125000.0,
    32000.0,
    43900.0,
    30600.0,
    20500.0,
    35300.0,
    27300.0,
    20300.0,
    23000.0,
    38100.0,
    30900.0,
    86100.0,
    22700.0,
    37600.0,
    21200.0,
    35600.0,
    35700.0,
    26800.0,
    21100.0,
    34100.0,
    38200.0,
    36300.0,
    26900.0,
    51700.0,
    30000.0,
    36800.0,
    36900.0,
    207300.0,
    75500.0,
    86300.0,
    119900.0,
    75100.0,
    104000.0,
    28700.0,
    46800.0,
    62500.0,
    49200.0,
    24900.0,
    35100.0,
    36100.0,
    29700.0,
    16000.0,
    25400.0,
    22800.0,
    23800.0,
    36900.0,
    38200.0,
    15900.0,
    14200.0,
    28300.0,
    25700.0,
    28700.0,
    29600.0,
    22800.0,
    19600.0,
    24800.0,
    102700.0,
    53600.0,
    49800.0,
    70500.0,
    51300.0,
    37800.0,
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
     *     text: "IESC",
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