/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_HCI");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/05', 70.24, 72.17, 72.5, 69.6],
    ['2022/08/08', 71.97, 71.85, 73.16, 71.51],
    ['2022/08/09', 67.67, 60.37, 69.01, 55.93],
    ['2022/08/10', 60.67, 58.46, 61.0, 58.43],
    ['2022/08/11', 58.86, 58.13, 60.56, 58.05],
    ['2022/08/12', 58.13, 57.77, 60.01, 57.42],
    ['2022/08/15', 58.57, 58.75, 60.14, 58.49],
    ['2022/08/16', 59.13, 58.66, 60.02, 58.27],
    ['2022/08/17', 58.54, 59.1, 60.06, 57.37],
    ['2022/08/18', 58.01, 56.61, 58.59, 56.43],
    ['2022/08/19', 55.94, 53.5, 56.12, 52.91],
    ['2022/08/22', 52.65, 51.75, 53.16, 51.37],
    ['2022/08/23', 51.37, 50.78, 51.52, 49.94],
    ['2022/08/24', 50.89, 50.59, 50.93, 49.87],
    ['2022/08/25', 51.27, 50.98, 51.27, 50.25],
    ['2022/08/26', 51.43, 48.18, 51.43, 48.0],
    ['2022/08/29', 48.0, 46.08, 48.25, 45.98],
    ['2022/08/30', 46.67, 46.66, 46.82, 44.91],
    ['2022/08/31', 47.25, 47.79, 48.89, 46.85],
    ['2022/09/01', 48.09, 48.2, 48.47, 47.12],
    ['2022/09/02', 48.08, 47.47, 48.72, 47.29],
    ['2022/09/06', 47.53, 47.31, 47.54, 46.64],
    ['2022/09/07', 47.61, 48.54, 49.92, 47.53],
    ['2022/09/08', 48.45, 48.39, 48.68, 47.76],
    ['2022/09/09', 48.66, 48.31, 49.0, 48.07],
    ['2022/09/12', 48.5, 48.23, 48.71, 47.94],
    ['2022/09/13', 47.5, 47.88, 47.98, 47.02],
    ['2022/09/14', 47.75, 49.29, 49.33, 47.24],
    ['2022/09/15', 48.87, 50.69, 51.22, 48.5],
    ['2022/09/16', 50.46, 50.99, 52.51, 50.24],
    ['2022/09/19', 50.47, 51.31, 51.39, 49.65],
    ['2022/09/20', 50.68, 48.02, 50.77, 47.84],
    ['2022/09/21', 47.83, 48.13, 49.03, 47.8],
    ['2022/09/22', 48.35, 47.43, 48.35, 46.84],
    ['2022/09/23', 47.0, 44.45, 47.07, 43.63],
    ['2022/09/26', 43.96, 43.59, 44.44, 42.96],
    ['2022/09/27', 43.82, 41.73, 43.84, 40.99],
    ['2022/09/28', 41.65, 41.7, 42.18, 41.01],
    ['2022/09/29', 41.36, 40.53, 41.36, 39.51],
    ['2022/09/30', 40.74, 39.2, 40.74, 39.13],
    ['2022/10/03', 39.8, 38.47, 39.8, 38.39],
    ['2022/10/04', 38.46, 39.93, 40.75, 38.46],
    ['2022/10/05', 39.85, 39.07, 39.85, 38.8],
    ['2022/10/06', 38.97, 35.68, 39.05, 35.63],
    ['2022/10/07', 35.45, 33.25, 35.57, 32.38],
    ['2022/10/10', 33.0, 36.91, 38.24, 32.89],
    ['2022/10/11', 36.56, 35.58, 37.59, 35.26],
    ['2022/10/12', 36.09, 36.55, 36.92, 35.62],
    ['2022/10/13', 36.41, 37.55, 37.99, 36.3],
    ['2022/10/14', 37.67, 37.0, 39.26, 36.19],
    ['2022/10/17', 37.48, 38.73, 39.03, 37.48],
    ['2022/10/18', 39.05, 36.98, 39.75, 36.51],
    ['2022/10/19', 36.32, 34.05, 37.14, 33.91],
    ['2022/10/20', 33.81, 30.96, 33.81, 30.9],
    ['2022/10/21', 31.4, 29.25, 31.4, 29.09],
    ['2022/10/24', 29.21, 28.43, 29.84, 27.65],
    ['2022/10/25', 28.63, 32.24, 32.55, 27.97],
    ['2022/10/26', 32.2, 33.28, 34.03, 31.4],
    ['2022/10/27', 33.57, 34.29, 36.09, 33.57],
    ['2022/10/28', 34.7, 35.1, 35.7, 34.16],
    ['2022/10/31', 35.29, 36.64, 37.21, 35.23],
    ['2022/11/01', 36.56, 37.7, 37.95, 36.17],
    ['2022/11/02', 37.41, 37.09, 38.4, 36.78],
    ['2022/11/03', 36.95, 36.7, 37.74, 36.05],
    ['2022/11/04', 36.86, 35.7, 37.26, 34.92],
    ['2022/11/07', 36.05, 35.73, 36.05, 33.03],
    ['2022/11/08', 35.81, 34.6, 36.24, 33.62],
    ['2022/11/09', 34.86, 37.4, 40.34, 33.24],
    ['2022/11/10', 38.63, 41.51, 41.55, 38.35],
    ['2022/11/11', 41.61, 42.65, 43.34, 41.34],
    ['2022/11/14', 42.37, 43.21, 43.5, 42.05],
    ['2022/11/15', 43.69, 42.12, 43.69, 41.21],
    ['2022/11/16', 41.59, 39.59, 41.59, 39.46],
    ['2022/11/17', 38.81, 38.44, 39.21, 37.84],
    ['2022/11/18', 39.25, 37.7, 39.25, 37.2],
    ['2022/11/21', 37.34, 37.72, 38.1, 36.82],
    ['2022/11/22', 38.12, 38.81, 39.05, 37.39],
    ['2022/11/23', 38.81, 38.51, 39.09, 38.07],
    ['2022/11/25', 38.1, 37.98, 38.64, 37.98],
    ['2022/11/28', 37.91, 36.46, 37.91, 35.66],
    ['2022/11/29', 36.09, 36.81, 37.41, 35.0],
    ['2022/11/30', 37.06, 37.42, 37.59, 35.63],
    ['2022/12/01', 37.21, 37.96, 38.4, 37.2],
    ['2022/12/02', 37.31, 37.86, 38.37, 37.12],
    ['2022/12/05', 37.71, 37.13, 37.71, 35.99],
    ['2022/12/06', 37.47, 37.89, 38.47, 36.0],
    ['2022/12/07', 37.5, 36.12, 38.13, 35.88],
    ['2022/12/08', 36.29, 37.74, 38.0, 35.82],
    ['2022/12/09', 37.99, 34.61, 38.81, 34.09],
    ['2022/12/12', 34.43, 34.82, 35.28, 33.35],
    ['2022/12/13', 36.06, 34.68, 36.86, 34.52],
    ['2022/12/14', 34.8, 34.84, 35.8, 33.47],
    ['2022/12/15', 34.22, 34.02, 35.19, 32.8],
    ['2022/12/16', 33.45, 33.04, 34.2, 32.42],
    ['2022/12/19', 33.14, 34.82, 34.92, 32.59],
    ['2022/12/20', 34.5, 36.49, 36.67, 34.43],
    ['2022/12/21', 36.49, 37.15, 37.39, 36.49],
    ['2022/12/22', 36.57, 38.64, 38.75, 36.53],
    ['2022/12/23', 38.98, 39.56, 40.47, 38.94],
    ['2022/12/27', 39.9, 39.34, 40.08, 38.75],
    ['2022/12/28', 39.47, 38.5, 40.21, 38.07],
    ['2022/12/29', 38.91, 41.22, 41.27, 38.91],
    ['2022/12/30', 40.41, 39.59, 41.11, 38.74],
    ['2023/01/03', 39.63, 39.62, 40.59, 39.01],
    ['2023/01/04', 40.27, 40.28, 40.97, 39.93],
    ['2023/01/05', 39.67, 38.97, 39.85, 38.71],
    ['2023/01/06', 39.45, 39.73, 40.21, 38.49],
    ['2023/01/09', 40.12, 39.9, 40.97, 39.75],
    ['2023/01/10', 40.27, 41.16, 41.44, 39.27],
    ['2023/01/11', 41.31, 41.2, 42.07, 40.03],
    ['2023/01/12', 41.78, 42.64, 43.07, 40.88],
    ['2023/01/13', 42.25, 43.19, 44.08, 41.67],
    ['2023/01/17', 42.87, 45.35, 45.43, 41.87],
    ['2023/01/18', 45.71, 46.5, 46.99, 45.05],
    ['2023/01/19', 47.36, 46.49, 48.01, 46.0],
    ['2023/01/20', 46.87, 47.0, 47.04, 45.0],
    ['2023/01/23', 46.75, 49.0, 49.42, 46.75],
    ['2023/01/24', 49.32, 50.0, 50.21, 48.9],
    ['2023/01/25', 49.75, 49.97, 50.02, 48.61],
    ['2023/01/26', 50.45, 50.43, 51.19, 49.8],
    ['2023/01/27', 50.32, 50.49, 50.77, 49.86],
    ['2023/01/30', 50.19, 49.39, 51.59, 49.04],
    ['2023/01/31', 49.6, 50.21, 50.54, 49.6],
    ['2023/02/01', 50.47, 49.93, 50.69, 49.33],
    ['2023/02/02', 50.6, 51.44, 51.48, 50.19],
    ['2023/02/03', 51.14, 50.46, 51.98, 50.21],
    ['2023/02/06', 50.48, 49.75, 51.2, 48.73],
    ['2023/02/07', 49.25, 50.42, 50.55, 48.7],
    ['2023/02/08', 50.2, 48.31, 50.6, 48.23],
    ['2023/02/09', 48.78, 48.71, 49.42, 48.41],
    ['2023/02/10', 48.81, 49.33, 49.61, 48.25],
    ['2023/02/13', 49.49, 49.73, 50.42, 48.68],
    ['2023/02/14', 50.38, 49.08, 50.41, 48.82],
    ['2023/02/15', 48.74, 51.34, 51.46, 48.57],
    ['2023/02/16', 49.7, 50.21, 50.5, 49.29],
    ['2023/02/17', 50.33, 52.4, 52.44, 49.9],
    ['2023/02/21', 51.34, 50.66, 51.9, 50.05],
    ['2023/02/22', 50.67, 50.01, 51.45, 49.69],
    ['2023/02/23', 50.12, 49.87, 50.8, 48.52],
    ['2023/02/24', 49.08, 51.76, 51.88, 48.9],
    ['2023/02/27', 51.92, 53.49, 54.59, 51.72],
    ['2023/02/28', 53.37, 52.5, 54.45, 52.43],
    ['2023/03/01', 52.51, 52.72, 52.94, 51.72],
    ['2023/03/02', 52.22, 53.56, 53.67, 51.63],
    ['2023/03/03', 53.92, 54.88, 54.9, 53.11],
    ['2023/03/06', 55.0, 55.36, 55.53, 54.36],
    ['2023/03/07', 55.14, 55.3, 55.56, 54.65],
    ['2023/03/08', 55.79, 54.56, 56.19, 54.32],
    ['2023/03/09', 54.49, 52.69, 55.05, 52.44],
    ['2023/03/10', 55.11, 58.17, 59.79, 53.54],
    ['2023/03/13', 57.08, 55.55, 58.55, 54.78],
    ['2023/03/14', 57.18, 58.46, 58.99, 56.49],
    ['2023/03/15', 56.84, 54.83, 58.34, 53.43],
    ['2023/03/16', 54.18, 55.98, 57.17, 53.45],
    ['2023/03/17', 55.43, 53.2, 55.8, 53.08],
    ['2023/03/20', 54.25, 54.78, 56.11, 53.49],
    ['2023/03/21', 55.66, 55.73, 56.15, 54.74],
    ['2023/03/22', 55.62, 53.69, 56.32, 53.69],
    ['2023/03/23', 53.81, 53.31, 54.62, 52.85],
    ['2023/03/24', 53.31, 54.21, 55.1, 53.11],
    ['2023/03/27', 54.89, 54.97, 55.32, 54.15],
    ['2023/03/28', 54.94, 54.36, 55.73, 54.36],
    ['2023/03/29', 54.61, 53.09, 55.01, 52.86],
    ['2023/03/30', 53.43, 52.2, 53.67, 52.0],
    ['2023/03/31', 52.52, 53.6, 53.93, 52.52],
    ['2023/04/03', 53.56, 53.44, 54.22, 52.81],
    ['2023/04/04', 53.66, 52.03, 54.17, 51.2],
    ['2023/04/05', 51.92, 51.88, 52.27, 51.4],
    ['2023/04/06', 51.88, 51.28, 52.44, 51.2],
    ['2023/04/10', 51.03, 51.46, 52.0, 50.95],
    ['2023/04/11', 51.55, 51.42, 52.24, 51.3],
    ['2023/04/12', 51.67, 50.83, 52.06, 50.7],
    ['2023/04/13', 50.98, 52.43, 53.22, 50.98],
    ['2023/04/14', 52.68, 49.59, 52.68, 48.46],
    ['2023/04/17', 49.65, 51.0, 51.25, 49.65],
    ['2023/04/18', 50.97, 51.78, 51.87, 50.64],
    ['2023/04/19', 51.74, 52.95, 53.15, 51.74],
    ['2023/04/20', 52.92, 54.89, 55.03, 52.92],
    ['2023/04/21', 54.76, 54.57, 54.76, 53.37],
    ['2023/04/24', 54.44, 53.72, 54.8, 53.6],
    ['2023/04/25', 52.95, 53.25, 53.31, 52.75],
    ['2023/04/26', 52.87, 51.88, 53.17, 51.49],
    ['2023/04/27', 51.79, 51.24, 52.64, 51.24],
    ['2023/04/28', 51.33, 50.66, 51.9, 50.46],
    ['2023/05/01', 50.61, 50.59, 51.62, 50.53],
    ['2023/05/02', 50.49, 49.3, 50.49, 49.02],
    ['2023/05/03', 49.56, 49.08, 50.29, 49.06],
    ['2023/05/04', 48.96, 48.14, 49.17, 48.08],
    ['2023/05/05', 49.19, 49.72, 50.12, 49.18],
    ['2023/05/08', 49.75, 50.93, 51.33, 49.53],
    ['2023/05/09', 50.48, 50.48, 51.89, 49.32],
    ['2023/05/10', 55.0, 60.0, 60.8, 53.87],
    ['2023/05/11', 59.08, 55.31, 60.0, 54.4],
    ['2023/05/12', 55.21, 56.69, 57.22, 55.21],
    ['2023/05/15', 57.28, 56.68, 57.28, 55.84],
    ['2023/05/16', 56.66, 56.47, 57.3, 56.34],
    ['2023/05/17', 57.25, 57.01, 58.54, 56.32],
    ['2023/05/18', 56.8, 56.44, 57.35, 56.03],
    ['2023/05/19', 57.6, 55.66, 57.6, 55.62],
    ['2023/05/22', 56.54, 56.2, 57.16, 55.75],
    ['2023/05/23', 56.28, 56.74, 57.1, 56.25],
    ['2023/05/24', 56.21, 56.08, 56.45, 54.69],
    ['2023/05/25', 55.83, 55.35, 55.9, 54.31],
    ['2023/05/26', 55.4, 54.72, 56.73, 54.65],
    ['2023/05/30', 54.74, 53.23, 54.99, 53.07],
    ['2023/05/31', 53.29, 52.89, 53.29, 52.36],
    ['2023/06/01', 53.1, 53.39, 54.62, 52.42],
    ['2023/06/02', 53.91, 54.97, 55.23, 52.62],
    ['2023/06/05', 54.43, 54.91, 55.54, 53.25],
    ['2023/06/06', 54.84, 56.13, 57.19, 54.84],
    ['2023/06/07', 56.31, 58.03, 58.1, 56.31],
    ['2023/06/08', 57.79, 58.65, 58.7, 56.91],
    ['2023/06/09', 58.65, 58.49, 59.0, 57.83],
    ['2023/06/12', 58.4, 56.75, 58.55, 56.75],
    ['2023/06/13', 56.94, 57.71, 58.35, 56.41],
    ['2023/06/14', 57.68, 58.33, 58.4, 57.23],
    ['2023/06/15', 58.1, 58.78, 58.78, 56.88],
    ['2023/06/16', 59.43, 57.72, 59.43, 57.51],
    ['2023/06/20', 57.72, 57.97, 58.61, 57.3],
    ['2023/06/21', 57.78, 60.18, 60.57, 57.2],
    ['2023/06/22', 60.27, 60.75, 61.98, 59.41],
    ['2023/06/23', 60.27, 58.92, 60.28, 58.66],
    ['2023/06/26', 58.78, 58.54, 59.34, 58.4],
    ['2023/06/27', 58.89, 60.5, 60.64, 58.38],
    ['2023/06/28', 60.31, 61.83, 62.04, 59.6],
    ['2023/06/29', 62.07, 63.12, 63.5, 61.99],
    ['2023/06/30', 63.58, 61.78, 64.0, 60.38],
    ['2023/07/03', 61.27, 62.0, 62.47, 61.27],
    ['2023/07/05', 61.23, 58.75, 61.47, 58.34],
    ['2023/07/06', 58.5, 58.28, 59.19, 56.66],
    ['2023/07/07', 58.42, 59.23, 59.34, 57.72],
    ['2023/07/10', 58.96, 58.55, 59.81, 57.6],
    ['2023/07/11', 58.79, 59.37, 59.7, 58.24],
    ['2023/07/12', 59.84, 60.52, 61.26, 59.38],
    ['2023/07/13', 60.49, 59.93, 61.09, 59.84],
    ['2023/07/14', 60.17, 58.88, 60.17, 58.66],
    ['2023/07/17', 58.58, 59.35, 59.89, 58.13],
    ['2023/07/18', 59.19, 57.98, 59.93, 57.85],
    ['2023/07/19', 58.56, 58.79, 59.48, 58.02],
    ['2023/07/20', 58.91, 59.14, 59.75, 58.84],
    ['2023/07/21', 59.7, 59.38, 59.74, 58.64],
    ['2023/07/24', 59.53, 60.53, 60.6, 59.07],
    ['2023/07/25', 59.89, 62.73, 62.97, 59.89],
    ['2023/07/26', 62.6, 62.35, 63.88, 62.1],
    ['2023/07/27', 62.54, 60.89, 62.95, 60.28],
    ['2023/07/28', 61.63, 61.29, 63.15, 61.19],
    ['2023/07/31', 61.52, 62.81, 63.12, 61.52],
    ['2023/08/01', 62.14, 62.01, 62.6, 61.79],
    ['2023/08/02', 61.46, 60.93, 62.05, 60.69],
    ['2023/08/03', 60.87, 60.63, 61.7, 60.19],
]);
var volumes = [
    99600.0,
    77800.0,
    665200.0,
    161800.0,
    88800.0,
    74600.0,
    90000.0,
    75000.0,
    82000.0,
    77600.0,
    96400.0,
    84500.0,
    83200.0,
    50400.0,
    54900.0,
    139100.0,
    117900.0,
    165200.0,
    165600.0,
    127800.0,
    117400.0,
    131000.0,
    107000.0,
    76200.0,
    64700.0,
    55500.0,
    61600.0,
    77100.0,
    99400.0,
    375000.0,
    61200.0,
    103200.0,
    66800.0,
    66200.0,
    130000.0,
    127800.0,
    81300.0,
    165800.0,
    96200.0,
    136200.0,
    91300.0,
    113500.0,
    65500.0,
    132700.0,
    169100.0,
    380700.0,
    224000.0,
    64400.0,
    137800.0,
    186300.0,
    132300.0,
    122000.0,
    120700.0,
    145700.0,
    136100.0,
    137000.0,
    334400.0,
    243700.0,
    180700.0,
    160100.0,
    100200.0,
    80500.0,
    171400.0,
    159800.0,
    105800.0,
    203100.0,
    149200.0,
    513400.0,
    214600.0,
    158100.0,
    175000.0,
    120500.0,
    128900.0,
    89800.0,
    62500.0,
    65700.0,
    79200.0,
    38600.0,
    25500.0,
    80700.0,
    183200.0,
    406200.0,
    234900.0,
    99000.0,
    108100.0,
    154800.0,
    166900.0,
    68300.0,
    178300.0,
    191000.0,
    195900.0,
    319400.0,
    176000.0,
    572800.0,
    150600.0,
    167700.0,
    115400.0,
    78200.0,
    119300.0,
    109100.0,
    102100.0,
    99200.0,
    85900.0,
    146300.0,
    91600.0,
    105900.0,
    46900.0,
    41400.0,
    188300.0,
    183000.0,
    186700.0,
    253900.0,
    316400.0,
    340100.0,
    234500.0,
    153900.0,
    106000.0,
    62000.0,
    97400.0,
    53500.0,
    30500.0,
    38700.0,
    74100.0,
    92300.0,
    76000.0,
    81400.0,
    65000.0,
    69300.0,
    77500.0,
    149000.0,
    68200.0,
    68700.0,
    70500.0,
    82900.0,
    70700.0,
    70400.0,
    124000.0,
    68300.0,
    95100.0,
    102200.0,
    143300.0,
    177000.0,
    122300.0,
    71100.0,
    118500.0,
    160100.0,
    76000.0,
    120100.0,
    109300.0,
    211700.0,
    259600.0,
    143700.0,
    198200.0,
    130700.0,
    242700.0,
    134700.0,
    83500.0,
    90100.0,
    62000.0,
    58600.0,
    58200.0,
    55300.0,
    51000.0,
    48200.0,
    75600.0,
    64400.0,
    58200.0,
    37100.0,
    57600.0,
    58200.0,
    79400.0,
    43900.0,
    59500.0,
    97900.0,
    50700.0,
    36600.0,
    35900.0,
    36800.0,
    38800.0,
    26300.0,
    24200.0,
    28800.0,
    84300.0,
    50100.0,
    53700.0,
    70400.0,
    62200.0,
    49600.0,
    46100.0,
    39000.0,
    40300.0,
    166000.0,
    209400.0,
    47300.0,
    46400.0,
    40100.0,
    76400.0,
    43500.0,
    51900.0,
    60800.0,
    64400.0,
    73700.0,
    45000.0,
    40900.0,
    52400.0,
    62400.0,
    110100.0,
    52100.0,
    59900.0,
    114400.0,
    88300.0,
    77100.0,
    48000.0,
    47100.0,
    75900.0,
    74500.0,
    92400.0,
    132500.0,
    56700.0,
    115500.0,
    95000.0,
    105000.0,
    39200.0,
    47300.0,
    58700.0,
    64000.0,
    104000.0,
    32400.0,
    65900.0,
    66200.0,
    91500.0,
    84100.0,
    52900.0,
    38300.0,
    37700.0,
    42700.0,
    95100.0,
    43800.0,
    61100.0,
    36000.0,
    49400.0,
    58000.0,
    63900.0,
    50400.0,
    82600.0,
    44500.0,
    56700.0,
    54200.0,
    69400.0,
    53700.0,
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
        text: "HCI",
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