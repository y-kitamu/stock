/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_PKX");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/03', 44.92, 45.31, 45.41, 44.63],
    ['2022/08/04', 44.88, 45.05, 45.42, 44.56],
    ['2022/08/05', 45.47, 45.96, 46.44, 45.42],
    ['2022/08/08', 46.05, 46.11, 46.39, 45.98],
    ['2022/08/09', 47.02, 46.8, 47.04, 46.7],
    ['2022/08/10', 47.68, 48.68, 48.9, 47.68],
    ['2022/08/11', 49.8, 49.86, 50.47, 49.65],
    ['2022/08/12', 50.16, 50.2, 50.3, 49.78],
    ['2022/08/15', 49.56, 49.68, 49.84, 49.34],
    ['2022/08/16', 49.29, 49.74, 50.06, 49.29],
    ['2022/08/17', 48.82, 48.69, 49.11, 48.56],
    ['2022/08/18', 48.4, 48.23, 48.47, 48.18],
    ['2022/08/19', 47.65, 47.16, 47.65, 46.99],
    ['2022/08/22', 46.14, 45.88, 46.14, 45.7],
    ['2022/08/23', 46.15, 46.55, 46.97, 46.04],
    ['2022/08/24', 45.82, 45.71, 46.05, 45.58],
    ['2022/08/25', 46.83, 47.03, 47.03, 46.39],
    ['2022/08/26', 46.87, 45.49, 47.01, 45.43],
    ['2022/08/29', 45.06, 45.43, 45.62, 44.93],
    ['2022/08/30', 46.94, 46.04, 46.94, 45.55],
    ['2022/08/31', 47.02, 47.02, 47.21, 46.49],
    ['2022/09/01', 46.44, 46.13, 46.54, 45.62],
    ['2022/09/02', 45.59, 44.91, 45.65, 44.74],
    ['2022/09/06', 45.47, 45.55, 45.85, 45.28],
    ['2022/09/07', 44.65, 45.13, 45.22, 44.29],
    ['2022/09/08', 43.96, 43.69, 43.97, 43.28],
    ['2022/09/09', 44.19, 44.59, 44.76, 44.17],
    ['2022/09/12', 45.22, 44.97, 45.5, 44.84],
    ['2022/09/13', 44.25, 43.4, 44.48, 43.24],
    ['2022/09/14', 43.05, 42.4, 43.05, 42.03],
    ['2022/09/15', 41.75, 41.46, 42.15, 41.2],
    ['2022/09/16', 41.1, 41.68, 41.72, 40.95],
    ['2022/09/19', 41.32, 42.28, 42.37, 41.19],
    ['2022/09/20', 42.87, 42.82, 42.99, 42.34],
    ['2022/09/21', 42.74, 42.37, 43.6, 42.37],
    ['2022/09/22', 42.27, 42.03, 42.34, 41.75],
    ['2022/09/23', 41.33, 40.61, 41.38, 40.21],
    ['2022/09/26', 39.47, 39.02, 39.74, 38.85],
    ['2022/09/27', 40.07, 39.58, 40.2, 39.23],
    ['2022/09/28', 39.48, 40.13, 40.27, 39.34],
    ['2022/09/29', 38.21, 38.0, 38.42, 37.58],
    ['2022/09/30', 37.1, 36.61, 37.53, 36.53],
    ['2022/10/03', 37.18, 38.27, 38.4, 36.97],
    ['2022/10/04', 39.5, 39.96, 40.12, 39.41],
    ['2022/10/05', 39.23, 39.37, 39.65, 38.95],
    ['2022/10/06', 39.32, 39.24, 39.69, 39.11],
    ['2022/10/07', 39.55, 39.18, 39.67, 39.03],
    ['2022/10/10', 39.17, 39.45, 39.52, 38.59],
    ['2022/10/11', 40.02, 39.7, 40.49, 39.5],
    ['2022/10/12', 41.0, 41.39, 41.47, 40.68],
    ['2022/10/13', 40.44, 41.85, 42.04, 40.15],
    ['2022/10/14', 42.74, 41.81, 42.82, 41.53],
    ['2022/10/17', 43.11, 43.25, 43.54, 43.0],
    ['2022/10/18', 43.85, 43.36, 43.96, 43.0],
    ['2022/10/19', 43.71, 43.99, 44.06, 43.58],
    ['2022/10/20', 43.88, 44.1, 44.91, 43.87],
    ['2022/10/21', 43.36, 44.94, 44.96, 43.29],
    ['2022/10/24', 43.48, 42.45, 43.72, 42.39],
    ['2022/10/25', 41.96, 42.35, 42.56, 41.8],
    ['2022/10/26', 42.04, 42.24, 42.62, 41.96],
    ['2022/10/27', 43.62, 42.94, 43.88, 42.94],
    ['2022/10/28', 42.83, 42.93, 43.09, 42.28],
    ['2022/10/31', 42.96, 43.38, 43.66, 42.82],
    ['2022/11/01', 44.98, 44.74, 45.09, 44.46],
    ['2022/11/02', 45.2, 43.85, 45.2, 43.77],
    ['2022/11/03', 44.5, 45.13, 45.15, 44.19],
    ['2022/11/04', 45.82, 46.94, 47.09, 45.72],
    ['2022/11/07', 49.48, 48.72, 49.56, 48.3],
    ['2022/11/08', 48.93, 49.42, 49.55, 48.72],
    ['2022/11/09', 51.11, 49.84, 51.2, 49.73],
    ['2022/11/10', 51.61, 52.64, 52.67, 51.61],
    ['2022/11/11', 53.57, 54.35, 54.36, 53.52],
    ['2022/11/14', 54.93, 55.64, 55.72, 54.6],
    ['2022/11/15', 56.4, 55.09, 56.4, 54.67],
    ['2022/11/16', 53.83, 53.75, 54.29, 53.75],
    ['2022/11/17', 52.24, 53.38, 53.38, 52.24],
    ['2022/11/18', 54.11, 53.96, 54.11, 53.61],
    ['2022/11/21', 52.91, 53.24, 53.34, 52.65],
    ['2022/11/22', 53.85, 54.32, 54.45, 53.85],
    ['2022/11/23', 53.74, 54.55, 54.66, 53.74],
    ['2022/11/25', 55.1, 55.3, 55.53, 55.1],
    ['2022/11/28', 54.83, 54.55, 55.21, 54.45],
    ['2022/11/29', 55.24, 55.34, 55.64, 55.11],
    ['2022/11/30', 56.42, 57.06, 57.47, 56.06],
    ['2022/12/01', 57.38, 57.03, 57.5, 56.61],
    ['2022/12/02', 56.35, 56.94, 57.22, 56.03],
    ['2022/12/05', 56.56, 55.68, 56.89, 55.57],
    ['2022/12/06', 54.77, 54.52, 55.12, 54.28],
    ['2022/12/07', 54.91, 55.02, 55.31, 54.78],
    ['2022/12/08', 54.66, 54.66, 55.05, 54.43],
    ['2022/12/09', 54.26, 53.92, 54.78, 53.86],
    ['2022/12/12', 54.22, 54.17, 54.22, 53.56],
    ['2022/12/13', 55.5, 55.35, 56.06, 55.11],
    ['2022/12/14', 54.86, 54.33, 54.87, 53.93],
    ['2022/12/15', 53.46, 53.03, 53.64, 52.84],
    ['2022/12/16', 52.71, 52.94, 53.09, 52.61],
    ['2022/12/19', 53.85, 53.36, 53.98, 53.03],
    ['2022/12/20', 54.12, 54.41, 54.69, 53.86],
    ['2022/12/21', 55.64, 55.69, 55.77, 55.29],
    ['2022/12/22', 55.8, 55.33, 55.8, 54.6],
    ['2022/12/23', 55.81, 55.76, 55.96, 55.56],
    ['2022/12/27', 56.79, 56.53, 56.93, 56.42],
    ['2022/12/28', 57.36, 56.43, 57.36, 56.24],
    ['2022/12/29', 55.0, 54.96, 55.05, 54.6],
    ['2022/12/30', 54.74, 54.47, 55.04, 54.32],
    ['2023/01/03', 53.7, 53.44, 53.89, 53.12],
    ['2023/01/04', 54.42, 54.88, 54.92, 54.17],
    ['2023/01/05', 54.49, 54.83, 55.24, 54.41],
    ['2023/01/06', 56.8, 57.82, 57.99, 56.61],
    ['2023/01/09', 58.26, 58.76, 58.88, 58.09],
    ['2023/01/10', 59.0, 59.54, 59.55, 58.46],
    ['2023/01/11', 59.21, 59.19, 59.35, 58.82],
    ['2023/01/12', 59.34, 59.74, 59.98, 58.79],
    ['2023/01/13', 61.39, 61.43, 61.59, 61.08],
    ['2023/01/17', 61.47, 61.29, 61.75, 61.16],
    ['2023/01/18', 61.39, 60.63, 61.45, 60.61],
    ['2023/01/19', 60.96, 61.12, 61.33, 60.75],
    ['2023/01/20', 62.33, 62.85, 62.85, 61.86],
    ['2023/01/23', 63.31, 62.95, 63.31, 62.59],
    ['2023/01/24', 62.88, 62.91, 62.97, 62.24],
    ['2023/01/25', 60.98, 61.99, 61.99, 60.89],
    ['2023/01/26', 63.94, 64.16, 64.29, 63.32],
    ['2023/01/27', 63.12, 62.74, 63.45, 62.6],
    ['2023/01/30', 61.77, 62.04, 62.19, 61.74],
    ['2023/01/31', 60.83, 61.91, 61.91, 60.83],
    ['2023/02/01', 61.91, 63.02, 63.32, 61.74],
    ['2023/02/02', 62.5, 62.02, 62.55, 61.6],
    ['2023/02/03', 61.22, 60.88, 61.71, 60.72],
    ['2023/02/06', 59.46, 59.17, 59.55, 58.8],
    ['2023/02/07', 59.36, 59.49, 59.65, 58.8],
    ['2023/02/08', 59.25, 58.9, 59.37, 58.9],
    ['2023/02/09', 61.01, 60.02, 61.11, 59.82],
    ['2023/02/10', 59.27, 59.39, 59.42, 59.02],
    ['2023/02/13', 59.85, 60.13, 60.37, 59.7],
    ['2023/02/14', 60.35, 61.06, 61.08, 60.04],
    ['2023/02/15', 63.11, 63.07, 63.16, 62.56],
    ['2023/02/16', 63.1, 64.25, 64.64, 62.98],
    ['2023/02/17', 64.55, 64.04, 64.69, 63.99],
    ['2023/02/21', 65.74, 65.14, 66.18, 65.01],
    ['2023/02/22', 63.44, 63.26, 63.73, 63.07],
    ['2023/02/23', 63.61, 63.44, 63.95, 63.07],
    ['2023/02/24', 60.94, 61.5, 61.5, 60.64],
    ['2023/02/27', 61.29, 61.32, 61.68, 61.15],
    ['2023/02/28', 60.94, 60.99, 61.44, 60.38],
    ['2023/03/01', 61.92, 62.58, 63.08, 61.71],
    ['2023/03/02', 63.81, 64.53, 64.56, 63.19],
    ['2023/03/03', 64.14, 64.61, 64.65, 63.83],
    ['2023/03/06', 63.52, 62.91, 63.55, 62.72],
    ['2023/03/07', 63.82, 62.63, 63.93, 62.32],
    ['2023/03/08', 62.57, 62.62, 62.74, 62.32],
    ['2023/03/09', 61.33, 60.59, 61.58, 60.49],
    ['2023/03/10', 61.27, 60.28, 61.56, 60.14],
    ['2023/03/13', 61.44, 61.28, 61.66, 60.81],
    ['2023/03/14', 60.64, 60.73, 61.16, 60.21],
    ['2023/03/15', 60.36, 59.77, 60.59, 58.65],
    ['2023/03/16', 60.69, 62.03, 62.04, 60.37],
    ['2023/03/17', 61.32, 60.82, 61.49, 60.82],
    ['2023/03/20', 61.12, 61.63, 61.72, 61.07],
    ['2023/03/21', 61.5, 61.34, 61.98, 61.13],
    ['2023/03/22', 62.99, 62.8, 64.01, 62.74],
    ['2023/03/23', 63.73, 63.09, 64.16, 62.53],
    ['2023/03/24', 61.46, 61.85, 62.05, 61.0],
    ['2023/03/27', 63.68, 63.82, 63.97, 63.27],
    ['2023/03/28', 64.79, 65.11, 65.47, 64.7],
    ['2023/03/29', 65.58, 65.13, 65.58, 65.01],
    ['2023/03/30', 65.43, 65.71, 65.71, 65.31],
    ['2023/03/31', 70.11, 69.69, 70.63, 69.56],
    ['2023/04/03', 73.68, 73.82, 74.13, 73.4],
    ['2023/04/04', 69.91, 68.02, 69.96, 67.81],
    ['2023/04/05', 70.48, 69.74, 70.69, 69.0],
    ['2023/04/06', 68.48, 67.93, 68.48, 67.78],
    ['2023/04/10', 75.28, 74.28, 75.35, 73.62],
    ['2023/04/11', 74.6, 74.47, 75.5, 74.26],
    ['2023/04/12', 75.36, 75.08, 76.31, 75.08],
    ['2023/04/13', 74.73, 74.39, 75.25, 74.21],
    ['2023/04/14', 79.09, 78.03, 79.47, 77.42],
    ['2023/04/17', 79.99, 79.74, 80.03, 79.32],
    ['2023/04/18', 79.15, 79.4, 79.55, 78.63],
    ['2023/04/19', 77.57, 77.18, 77.95, 76.71],
    ['2023/04/20', 77.0, 76.99, 77.65, 76.73],
    ['2023/04/21', 74.85, 74.72, 75.0, 74.32],
    ['2023/04/24', 74.82, 75.18, 75.33, 74.78],
    ['2023/04/25', 71.23, 70.38, 71.29, 70.24],
    ['2023/04/26', 69.68, 69.66, 70.13, 69.41],
    ['2023/04/27', 71.88, 72.02, 72.29, 71.24],
    ['2023/04/28', 70.57, 71.12, 71.16, 70.39],
    ['2023/05/01', 71.15, 70.61, 71.19, 70.45],
    ['2023/05/02', 70.89, 70.84, 71.02, 70.42],
    ['2023/05/03', 70.72, 70.77, 71.48, 70.64],
    ['2023/05/04', 70.87, 70.53, 71.11, 70.22],
    ['2023/05/05', 71.2, 72.46, 72.49, 70.95],
    ['2023/05/08', 70.2, 70.07, 70.2, 69.59],
    ['2023/05/09', 70.2, 70.01, 70.35, 69.91],
    ['2023/05/10', 70.0, 69.65, 70.02, 69.01],
    ['2023/05/11', 67.88, 68.27, 68.36, 67.55],
    ['2023/05/12', 68.18, 68.04, 68.37, 67.8],
    ['2023/05/15', 69.05, 69.04, 69.11, 68.71],
    ['2023/05/16', 68.66, 68.24, 68.93, 68.21],
    ['2023/05/17', 69.1, 69.59, 69.64, 68.96],
    ['2023/05/18', 69.65, 69.72, 69.8, 69.35],
    ['2023/05/19', 68.57, 68.42, 68.64, 68.09],
    ['2023/05/22', 69.83, 70.0, 70.14, 69.71],
    ['2023/05/23', 71.0, 70.52, 71.06, 70.32],
    ['2023/05/24', 69.81, 69.41, 69.93, 69.22],
    ['2023/05/25', 68.33, 68.62, 68.79, 68.21],
    ['2023/05/26', 68.23, 68.7, 68.74, 68.11],
    ['2023/05/30', 68.88, 68.21, 69.02, 68.02],
    ['2023/05/31', 67.86, 67.88, 68.06, 67.42],
    ['2023/06/01', 68.15, 69.05, 69.23, 68.09],
    ['2023/06/02', 72.37, 73.46, 73.46, 72.36],
    ['2023/06/05', 74.02, 73.58, 74.19, 73.27],
    ['2023/06/06', 73.57, 74.57, 74.57, 73.57],
    ['2023/06/07', 74.63, 74.4, 75.04, 74.36],
    ['2023/06/08', 74.7, 75.25, 75.29, 74.7],
    ['2023/06/09', 76.16, 76.05, 76.69, 75.88],
    ['2023/06/12', 75.85, 76.05, 76.09, 75.46],
    ['2023/06/13', 76.53, 76.9, 76.94, 76.52],
    ['2023/06/14', 76.92, 77.13, 77.26, 76.57],
    ['2023/06/15', 75.66, 76.45, 76.59, 75.59],
    ['2023/06/16', 76.71, 75.98, 76.99, 75.78],
    ['2023/06/20', 74.61, 74.71, 74.8, 74.29],
    ['2023/06/21', 73.63, 74.24, 74.63, 73.48],
    ['2023/06/22', 75.87, 76.34, 76.34, 75.78],
    ['2023/06/23', 75.11, 74.61, 75.11, 74.5],
    ['2023/06/26', 76.23, 76.54, 76.91, 76.23],
    ['2023/06/27', 77.49, 77.7, 77.8, 77.27],
    ['2023/06/28', 74.4, 74.6, 74.75, 74.21],
    ['2023/06/29', 73.89, 73.74, 74.05, 73.58],
    ['2023/06/30', 74.07, 73.95, 74.22, 73.86],
    ['2023/07/03', 76.47, 76.89, 76.89, 76.28],
    ['2023/07/05', 77.14, 76.44, 77.14, 76.12],
    ['2023/07/06', 74.46, 74.61, 74.75, 73.67],
    ['2023/07/07', 76.4, 77.28, 77.35, 76.3],
    ['2023/07/10', 76.04, 77.05, 77.05, 75.99],
    ['2023/07/11', 76.75, 77.04, 77.05, 76.36],
    ['2023/07/12', 81.04, 81.98, 82.42, 81.04],
    ['2023/07/13', 84.45, 84.53, 84.53, 83.77],
    ['2023/07/14', 87.44, 86.5, 87.66, 86.09],
    ['2023/07/17', 93.28, 93.55, 94.06, 92.9],
    ['2023/07/18', 95.56, 97.18, 97.25, 95.41],
    ['2023/07/19', 98.7, 98.2, 98.7, 97.45],
    ['2023/07/20', 97.33, 96.87, 97.64, 96.59],
    ['2023/07/21', 105.68, 105.69, 106.85, 105.53],
    ['2023/07/24', 124.35, 118.19, 125.39, 116.04],
    ['2023/07/25', 128.15, 131.86, 133.09, 127.42],
    ['2023/07/26', 125.15, 127.75, 128.82, 125.08],
    ['2023/07/27', 116.66, 115.02, 116.69, 114.17],
    ['2023/07/28', 120.94, 120.9, 121.0, 119.3],
    ['2023/07/31', 125.0, 125.49, 125.51, 124.53],
    ['2023/08/01', 120.12, 118.89, 120.5, 118.25],
    ['2023/08/02', 112.53, 112.3, 113.72, 111.94],
]);
var volumes = [
    146900.0,
    178000.0,
    121300.0,
    146000.0,
    141500.0,
    224200.0,
    396100.0,
    114900.0,
    76200.0,
    133600.0,
    194700.0,
    130600.0,
    127700.0,
    183700.0,
    296600.0,
    243700.0,
    254100.0,
    183900.0,
    336000.0,
    279200.0,
    601700.0,
    385400.0,
    379100.0,
    234900.0,
    238900.0,
    283100.0,
    263500.0,
    192000.0,
    352200.0,
    272900.0,
    272500.0,
    399900.0,
    256500.0,
    384900.0,
    482900.0,
    472300.0,
    287100.0,
    310500.0,
    377800.0,
    291900.0,
    367400.0,
    386600.0,
    331200.0,
    276400.0,
    246600.0,
    296500.0,
    251500.0,
    709900.0,
    381100.0,
    308200.0,
    281300.0,
    427800.0,
    286500.0,
    227000.0,
    286400.0,
    243300.0,
    260500.0,
    340700.0,
    302900.0,
    288800.0,
    268100.0,
    240400.0,
    280300.0,
    281100.0,
    434000.0,
    287900.0,
    385900.0,
    377400.0,
    333700.0,
    525500.0,
    442000.0,
    226600.0,
    418600.0,
    245400.0,
    269200.0,
    196800.0,
    103200.0,
    123000.0,
    122800.0,
    115500.0,
    65700.0,
    174000.0,
    125500.0,
    379400.0,
    156100.0,
    160100.0,
    217700.0,
    227200.0,
    222000.0,
    190600.0,
    179200.0,
    221900.0,
    248100.0,
    188300.0,
    144600.0,
    249400.0,
    152700.0,
    163500.0,
    177000.0,
    146000.0,
    101700.0,
    110700.0,
    209100.0,
    202800.0,
    195900.0,
    230300.0,
    216800.0,
    162200.0,
    171700.0,
    310800.0,
    208100.0,
    172900.0,
    370400.0,
    360700.0,
    173900.0,
    139400.0,
    118300.0,
    286300.0,
    157700.0,
    145000.0,
    180200.0,
    208000.0,
    145800.0,
    157800.0,
    194000.0,
    131300.0,
    139200.0,
    174500.0,
    163800.0,
    141900.0,
    148900.0,
    142200.0,
    75000.0,
    113900.0,
    126000.0,
    261600.0,
    321600.0,
    386500.0,
    292200.0,
    206200.0,
    161800.0,
    163600.0,
    227200.0,
    239900.0,
    279300.0,
    208400.0,
    164900.0,
    143400.0,
    175200.0,
    114800.0,
    179200.0,
    193600.0,
    295100.0,
    290200.0,
    578000.0,
    347300.0,
    311800.0,
    124000.0,
    257300.0,
    213600.0,
    212800.0,
    136300.0,
    250500.0,
    171100.0,
    129600.0,
    97400.0,
    412400.0,
    497600.0,
    603000.0,
    626700.0,
    388500.0,
    840400.0,
    665600.0,
    736800.0,
    388200.0,
    895000.0,
    872500.0,
    514600.0,
    246900.0,
    375100.0,
    293500.0,
    250500.0,
    308700.0,
    496800.0,
    496800.0,
    305700.0,
    163100.0,
    228100.0,
    225100.0,
    238400.0,
    323800.0,
    208900.0,
    202600.0,
    332000.0,
    146600.0,
    126900.0,
    187900.0,
    123500.0,
    199000.0,
    164400.0,
    191200.0,
    326600.0,
    289100.0,
    252700.0,
    113300.0,
    106500.0,
    97400.0,
    167900.0,
    124000.0,
    258200.0,
    263100.0,
    194800.0,
    110300.0,
    96600.0,
    158900.0,
    149600.0,
    121900.0,
    165000.0,
    112300.0,
    439100.0,
    95900.0,
    135700.0,
    274900.0,
    123900.0,
    168500.0,
    175300.0,
    211100.0,
    188700.0,
    101900.0,
    141300.0,
    209400.0,
    162300.0,
    246100.0,
    74000.0,
    173900.0,
    280700.0,
    300100.0,
    418800.0,
    746300.0,
    563700.0,
    676400.0,
    226000.0,
    984400.0,
    2880300.0,
    2069200.0,
    1214500.0,
    761500.0,
    579800.0,
    528400.0,
    408900.0,
    566400.0,
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
        text: "PKX",
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