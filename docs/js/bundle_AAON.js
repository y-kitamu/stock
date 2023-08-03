/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_AAON");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/03', 59.47, 61.24, 61.57, 59.05],
    ['2022/08/04', 61.04, 62.11, 62.4, 60.74],
    ['2022/08/05', 61.86, 61.29, 61.87, 60.58],
    ['2022/08/08', 61.26, 61.43, 62.81, 61.01],
    ['2022/08/09', 64.14, 59.5, 64.14, 57.61],
    ['2022/08/10', 60.35, 61.24, 62.53, 59.93],
    ['2022/08/11', 61.55, 60.71, 62.03, 60.49],
    ['2022/08/12', 60.3, 61.37, 61.57, 59.21],
    ['2022/08/15', 60.73, 63.01, 63.27, 59.47],
    ['2022/08/16', 62.51, 62.94, 63.31, 62.29],
    ['2022/08/17', 62.78, 62.57, 62.78, 61.65],
    ['2022/08/18', 62.64, 62.52, 62.89, 62.0],
    ['2022/08/19', 62.42, 61.01, 62.42, 60.41],
    ['2022/08/22', 60.35, 59.51, 60.53, 58.9],
    ['2022/08/23', 59.46, 58.88, 60.07, 58.37],
    ['2022/08/24', 59.12, 59.18, 59.39, 58.4],
    ['2022/08/25', 59.38, 60.65, 60.85, 59.21],
    ['2022/08/26', 60.55, 58.67, 60.55, 58.19],
    ['2022/08/29', 58.43, 58.35, 59.06, 57.78],
    ['2022/08/30', 58.43, 57.58, 58.76, 57.08],
    ['2022/08/31', 57.8, 57.16, 58.18, 56.75],
    ['2022/09/01', 56.96, 57.62, 57.92, 56.37],
    ['2022/09/02', 58.24, 56.69, 58.48, 56.39],
    ['2022/09/06', 56.55, 54.81, 56.61, 54.23],
    ['2022/09/07', 55.16, 57.39, 57.84, 55.0],
    ['2022/09/08', 56.68, 56.8, 56.8, 55.91],
    ['2022/09/09', 57.01, 57.23, 57.86, 56.47],
    ['2022/09/12', 57.3, 58.94, 59.09, 57.24],
    ['2022/09/13', 57.85, 56.93, 58.16, 56.5],
    ['2022/09/14', 56.93, 56.88, 56.93, 55.19],
    ['2022/09/15', 57.43, 57.67, 58.5, 57.04],
    ['2022/09/16', 56.76, 56.73, 57.03, 54.46],
    ['2022/09/19', 56.62, 58.0, 58.11, 55.94],
    ['2022/09/20', 57.77, 57.25, 57.81, 56.5],
    ['2022/09/21', 57.45, 56.6, 58.43, 56.48],
    ['2022/09/22', 56.07, 54.22, 56.07, 54.05],
    ['2022/09/23', 53.82, 53.77, 54.52, 52.66],
    ['2022/09/26', 53.58, 54.41, 54.68, 53.2],
    ['2022/09/27', 54.81, 54.35, 54.87, 53.49],
    ['2022/09/28', 54.93, 55.39, 55.97, 54.23],
    ['2022/09/29', 54.57, 54.04, 54.86, 53.13],
    ['2022/09/30', 53.96, 53.58, 55.01, 53.44],
    ['2022/10/03', 54.34, 54.99, 55.65, 53.95],
    ['2022/10/04', 55.82, 55.98, 56.99, 55.43],
    ['2022/10/05', 55.18, 56.03, 56.25, 55.11],
    ['2022/10/06', 55.39, 54.94, 56.06, 54.45],
    ['2022/10/07', 54.51, 52.84, 54.51, 52.51],
    ['2022/10/10', 52.85, 53.5, 53.84, 52.62],
    ['2022/10/11', 53.42, 54.63, 55.42, 53.25],
    ['2022/10/12', 54.81, 53.43, 54.93, 53.1],
    ['2022/10/13', 52.46, 54.87, 54.95, 51.76],
    ['2022/10/14', 55.14, 53.92, 55.14, 53.79],
    ['2022/10/17', 54.53, 55.29, 55.62, 54.53],
    ['2022/10/18', 56.18, 56.01, 57.02, 55.74],
    ['2022/10/19', 55.63, 56.02, 56.1, 54.69],
    ['2022/10/20', 55.79, 53.99, 55.8, 53.92],
    ['2022/10/21', 54.48, 55.94, 56.29, 53.55],
    ['2022/10/24', 56.38, 58.42, 58.69, 56.18],
    ['2022/10/25', 58.58, 61.36, 61.68, 58.58],
    ['2022/10/26', 61.06, 61.02, 62.7, 60.81],
    ['2022/10/27', 61.61, 62.78, 63.8, 61.59],
    ['2022/10/28', 62.68, 64.79, 65.34, 62.63],
    ['2022/10/31', 64.02, 64.13, 64.63, 62.3],
    ['2022/11/01', 64.62, 64.64, 65.2, 63.47],
    ['2022/11/02', 64.77, 62.97, 66.13, 62.97],
    ['2022/11/03', 62.02, 64.02, 64.49, 61.8],
    ['2022/11/04', 64.23, 65.44, 65.53, 63.97],
    ['2022/11/07', 65.14, 65.18, 66.46, 64.99],
    ['2022/11/08', 71.74, 74.33, 80.04, 71.2],
    ['2022/11/09', 73.42, 74.12, 75.65, 72.41],
    ['2022/11/10', 77.27, 78.07, 78.66, 75.44],
    ['2022/11/11', 77.75, 77.58, 79.6, 77.48],
    ['2022/11/14', 76.86, 77.37, 77.89, 76.17],
    ['2022/11/15', 77.86, 79.79, 80.75, 77.23],
    ['2022/11/16', 79.46, 79.82, 80.16, 78.52],
    ['2022/11/17', 78.49, 79.01, 79.01, 77.67],
    ['2022/11/18', 80.44, 78.32, 80.44, 78.03],
    ['2022/11/21', 78.53, 79.47, 79.89, 78.42],
    ['2022/11/22', 79.58, 79.1, 79.81, 78.08],
    ['2022/11/23', 79.1, 78.21, 79.95, 77.99],
    ['2022/11/25', 78.25, 78.36, 79.28, 78.23],
    ['2022/11/28', 77.86, 75.29, 77.86, 75.0],
    ['2022/11/29', 75.4, 76.67, 76.84, 74.45],
    ['2022/11/30', 76.73, 79.06, 79.11, 75.61],
    ['2022/12/01', 79.4, 78.41, 79.84, 77.73],
    ['2022/12/02', 77.26, 80.23, 80.65, 74.83],
    ['2022/12/05', 79.57, 78.41, 79.57, 77.7],
    ['2022/12/06', 78.6, 77.23, 78.6, 76.06],
    ['2022/12/07', 77.15, 77.97, 78.66, 76.37],
    ['2022/12/08', 78.26, 79.72, 79.8, 77.81],
    ['2022/12/09', 79.25, 80.29, 80.48, 77.65],
    ['2022/12/12', 80.17, 79.36, 80.17, 78.97],
    ['2022/12/13', 81.02, 79.45, 82.79, 79.26],
    ['2022/12/14', 79.84, 79.57, 80.71, 78.28],
    ['2022/12/15', 78.46, 78.07, 78.46, 77.13],
    ['2022/12/16', 77.02, 76.14, 77.73, 75.47],
    ['2022/12/19', 76.63, 75.84, 77.3, 74.57],
    ['2022/12/20', 75.79, 75.22, 76.3, 75.06],
    ['2022/12/21', 76.04, 76.9, 77.37, 75.06],
    ['2022/12/22', 76.55, 76.42, 76.88, 75.49],
    ['2022/12/23', 75.57, 75.67, 76.31, 75.34],
    ['2022/12/27', 75.95, 76.7, 77.12, 73.86],
    ['2022/12/28', 76.54, 75.41, 77.55, 75.27],
    ['2022/12/29', 76.02, 76.65, 76.99, 75.69],
    ['2022/12/30', 76.02, 75.13, 76.91, 74.63],
    ['2023/01/03', 75.77, 74.64, 76.28, 73.81],
    ['2023/01/04', 75.06, 71.49, 75.38, 70.28],
    ['2023/01/05', 71.01, 70.32, 71.78, 70.23],
    ['2023/01/06', 71.09, 74.0, 74.14, 71.0],
    ['2023/01/09', 74.3, 74.22, 75.17, 73.88],
    ['2023/01/10', 73.62, 75.42, 75.48, 73.62],
    ['2023/01/11', 75.81, 75.78, 76.34, 75.16],
    ['2023/01/12', 76.04, 76.54, 76.76, 70.13],
    ['2023/01/13', 75.82, 77.67, 78.08, 75.82],
    ['2023/01/17', 77.67, 76.9, 78.84, 76.39],
    ['2023/01/18', 77.4, 75.13, 77.41, 74.79],
    ['2023/01/19', 74.41, 72.92, 74.85, 72.52],
    ['2023/01/20', 73.81, 73.08, 73.81, 72.57],
    ['2023/01/23', 73.0, 73.85, 74.3, 72.35],
    ['2023/01/24', 73.75, 74.61, 75.01, 72.88],
    ['2023/01/25', 74.2, 74.07, 77.3, 73.76],
    ['2023/01/26', 74.6, 73.71, 74.62, 73.3],
    ['2023/01/27', 73.52, 74.31, 75.29, 73.52],
    ['2023/01/30', 73.88, 73.28, 74.51, 73.07],
    ['2023/01/31', 73.81, 76.12, 76.48, 73.81],
    ['2023/02/01', 75.65, 77.56, 78.76, 75.33],
    ['2023/02/02', 77.95, 79.73, 79.73, 77.95],
    ['2023/02/03', 78.8, 80.57, 80.72, 78.8],
    ['2023/02/06', 79.62, 79.36, 81.47, 79.01],
    ['2023/02/07', 78.66, 77.34, 78.75, 76.06],
    ['2023/02/08', 76.72, 76.86, 77.61, 76.27],
    ['2023/02/09', 77.76, 75.83, 77.82, 75.38],
    ['2023/02/10', 75.46, 75.03, 76.21, 74.77],
    ['2023/02/13', 75.51, 77.6, 77.81, 74.87],
    ['2023/02/14', 77.19, 78.05, 78.87, 76.74],
    ['2023/02/15', 77.82, 78.76, 78.79, 77.16],
    ['2023/02/16', 77.8, 78.48, 79.58, 77.3],
    ['2023/02/17', 78.67, 79.8, 80.65, 77.8],
    ['2023/02/21', 78.92, 77.37, 79.4, 77.08],
    ['2023/02/22', 77.66, 77.83, 78.33, 77.05],
    ['2023/02/23', 78.25, 80.16, 80.47, 77.67],
    ['2023/02/24', 79.51, 81.26, 81.44, 78.96],
    ['2023/02/27', 81.26, 81.28, 82.87, 80.22],
    ['2023/02/28', 86.78, 90.73, 94.16, 84.78],
    ['2023/03/01', 90.47, 90.34, 91.37, 89.61],
    ['2023/03/02', 90.03, 91.13, 91.41, 89.49],
    ['2023/03/03', 91.25, 93.68, 93.81, 90.44],
    ['2023/03/06', 93.76, 92.81, 94.21, 92.3],
    ['2023/03/07', 92.8, 92.09, 93.42, 90.89],
    ['2023/03/08', 92.49, 91.86, 92.57, 90.53],
    ['2023/03/09', 92.49, 91.93, 92.99, 91.35],
    ['2023/03/10', 91.56, 90.37, 91.89, 88.84],
    ['2023/03/13', 87.85, 87.82, 89.52, 87.1],
    ['2023/03/14', 89.44, 90.51, 91.28, 88.72],
    ['2023/03/15', 88.5, 88.2, 89.72, 87.59],
    ['2023/03/16', 86.94, 91.65, 92.37, 86.57],
    ['2023/03/17', 90.76, 89.22, 90.79, 88.61],
    ['2023/03/20', 89.59, 89.68, 91.08, 89.5],
    ['2023/03/21', 90.98, 91.55, 92.02, 90.09],
    ['2023/03/22', 91.33, 91.29, 93.04, 90.78],
    ['2023/03/23', 91.53, 92.23, 94.25, 91.05],
    ['2023/03/24', 91.04, 91.14, 91.39, 88.69],
    ['2023/03/27', 92.15, 92.69, 93.89, 91.96],
    ['2023/03/28', 92.68, 94.86, 95.43, 92.6],
    ['2023/03/29', 95.31, 94.66, 96.18, 94.01],
    ['2023/03/30', 94.8, 94.78, 95.44, 93.99],
    ['2023/03/31', 95.48, 96.57, 96.83, 94.96],
    ['2023/04/03', 96.57, 96.89, 97.13, 95.2],
    ['2023/04/04', 96.95, 93.79, 97.04, 92.67],
    ['2023/04/05', 93.11, 92.68, 94.08, 90.89],
    ['2023/04/06', 92.76, 92.63, 93.35, 90.99],
    ['2023/04/10', 91.93, 94.14, 94.52, 90.72],
    ['2023/04/11', 94.7, 94.56, 95.19, 93.74],
    ['2023/04/12', 94.98, 96.37, 96.78, 94.65],
    ['2023/04/13', 96.39, 97.0, 97.4, 95.35],
    ['2023/04/14', 96.57, 95.34, 98.26, 94.5],
    ['2023/04/17', 95.34, 95.86, 97.56, 95.34],
    ['2023/04/18', 96.1, 97.13, 97.27, 95.64],
    ['2023/04/19', 96.75, 98.03, 98.27, 96.66],
    ['2023/04/20', 97.84, 99.14, 99.82, 97.52],
    ['2023/04/21', 98.99, 99.34, 99.64, 98.2],
    ['2023/04/24', 99.33, 98.5, 100.67, 97.13],
    ['2023/04/25', 97.82, 97.51, 99.12, 97.51],
    ['2023/04/26', 96.81, 93.8, 96.84, 93.48],
    ['2023/04/27', 94.78, 99.1, 100.02, 94.77],
    ['2023/04/28', 98.83, 97.88, 99.89, 97.49],
    ['2023/05/01', 97.97, 97.77, 98.87, 97.41],
    ['2023/05/02', 97.89, 98.02, 98.44, 96.51],
    ['2023/05/03', 98.29, 97.43, 99.34, 97.02],
    ['2023/05/04', 97.29, 96.16, 97.85, 95.71],
    ['2023/05/05', 99.28, 103.13, 104.19, 98.97],
    ['2023/05/08', 103.36, 96.83, 103.84, 95.48],
    ['2023/05/09', 96.88, 96.56, 97.57, 95.57],
    ['2023/05/10', 97.26, 97.02, 97.69, 95.72],
    ['2023/05/11', 97.02, 95.67, 97.02, 94.98],
    ['2023/05/12', 95.78, 94.57, 96.95, 93.56],
    ['2023/05/15', 94.72, 94.36, 95.71, 93.78],
    ['2023/05/16', 93.08, 91.29, 93.67, 90.84],
    ['2023/05/17', 91.67, 91.37, 92.68, 91.24],
    ['2023/05/18', 91.37, 91.39, 92.1, 90.05],
    ['2023/05/19', 92.61, 91.31, 92.75, 90.93],
    ['2023/05/22', 91.7, 90.46, 92.16, 90.06],
    ['2023/05/23', 90.35, 89.8, 91.76, 89.43],
    ['2023/05/24', 89.44, 87.96, 89.88, 87.33],
    ['2023/05/25', 87.96, 89.8, 89.98, 87.96],
    ['2023/05/26', 89.81, 90.08, 90.73, 89.0],
    ['2023/05/30', 90.34, 88.25, 90.78, 87.94],
    ['2023/05/31', 87.89, 86.5, 88.25, 85.87],
    ['2023/06/01', 86.41, 87.56, 88.28, 85.49],
    ['2023/06/02', 88.71, 91.47, 91.56, 88.62],
    ['2023/06/05', 90.87, 91.05, 91.06, 89.18],
    ['2023/06/06', 90.71, 92.93, 93.58, 90.59],
    ['2023/06/07', 92.93, 95.46, 95.98, 92.93],
    ['2023/06/08', 94.83, 95.13, 95.66, 94.33],
    ['2023/06/09', 95.13, 95.52, 96.49, 94.46],
    ['2023/06/12', 95.73, 95.17, 96.03, 94.64],
    ['2023/06/13', 95.44, 96.66, 97.48, 95.25],
    ['2023/06/14', 97.1, 94.6, 97.53, 94.14],
    ['2023/06/15', 94.25, 93.85, 94.8, 93.16],
    ['2023/06/16', 94.78, 95.8, 95.97, 93.71],
    ['2023/06/20', 95.8, 97.04, 97.76, 95.45],
    ['2023/06/21', 97.0, 100.05, 100.46, 96.53],
    ['2023/06/22', 100.12, 97.22, 100.27, 97.11],
    ['2023/06/23', 95.71, 95.34, 97.35, 94.77],
    ['2023/06/26', 94.96, 95.59, 96.82, 94.76],
    ['2023/06/27', 95.61, 96.39, 97.6, 95.61],
    ['2023/06/28', 96.26, 95.24, 96.92, 95.14],
    ['2023/06/29', 95.29, 95.54, 96.43, 95.29],
    ['2023/06/30', 95.99, 94.81, 95.99, 94.3],
    ['2023/07/03', 94.32, 95.82, 96.21, 94.05],
    ['2023/07/05', 95.38, 93.34, 95.38, 92.68],
    ['2023/07/06', 92.87, 92.29, 92.87, 90.98],
    ['2023/07/07', 94.46, 94.44, 95.09, 93.2],
    ['2023/07/10', 94.62, 95.18, 96.32, 93.96],
    ['2023/07/11', 95.11, 95.12, 96.08, 94.67],
    ['2023/07/12', 96.3, 96.99, 98.27, 95.35],
    ['2023/07/13', 97.51, 97.4, 98.12, 96.12],
    ['2023/07/14', 97.6, 99.45, 99.81, 96.68],
    ['2023/07/17', 99.56, 103.82, 104.76, 99.56],
    ['2023/07/18', 104.84, 104.9, 106.09, 102.84],
    ['2023/07/19', 105.42, 103.52, 105.64, 102.38],
    ['2023/07/20', 103.63, 102.37, 103.82, 101.3],
    ['2023/07/21', 103.0, 101.04, 103.57, 100.79],
    ['2023/07/24', 101.14, 101.89, 103.97, 101.01],
    ['2023/07/25', 101.16, 101.17, 101.99, 99.07],
    ['2023/07/26', 101.01, 101.09, 104.17, 99.92],
    ['2023/07/27', 101.5, 100.02, 102.0, 98.42],
    ['2023/07/28', 100.96, 103.02, 103.2, 100.8],
    ['2023/07/31', 103.36, 105.26, 105.84, 102.21],
    ['2023/08/01', 104.81, 106.48, 107.07, 103.98],
    ['2023/08/02', 104.91, 106.54, 107.09, 104.56],
]);
var volumes = [
    111800.0,
    197000.0,
    102400.0,
    153300.0,
    350100.0,
    238500.0,
    197900.0,
    200300.0,
    168300.0,
    109100.0,
    86100.0,
    67300.0,
    81300.0,
    95300.0,
    86600.0,
    60500.0,
    111800.0,
    117200.0,
    105200.0,
    107600.0,
    99400.0,
    115800.0,
    92500.0,
    164100.0,
    242300.0,
    104800.0,
    139600.0,
    197600.0,
    111900.0,
    187200.0,
    139800.0,
    258700.0,
    118700.0,
    71800.0,
    123900.0,
    123700.0,
    167000.0,
    172500.0,
    164000.0,
    182500.0,
    163800.0,
    145000.0,
    141000.0,
    177600.0,
    139100.0,
    90600.0,
    127500.0,
    116100.0,
    193300.0,
    135200.0,
    119600.0,
    86800.0,
    144800.0,
    164300.0,
    180700.0,
    174700.0,
    180600.0,
    193200.0,
    156100.0,
    119100.0,
    105700.0,
    117000.0,
    148600.0,
    99400.0,
    111800.0,
    87900.0,
    106300.0,
    107800.0,
    692800.0,
    362600.0,
    353900.0,
    250200.0,
    231000.0,
    250500.0,
    252700.0,
    138300.0,
    185000.0,
    96300.0,
    150200.0,
    141600.0,
    42700.0,
    168600.0,
    309500.0,
    266500.0,
    169700.0,
    216500.0,
    126700.0,
    134100.0,
    173800.0,
    168200.0,
    161700.0,
    124200.0,
    219300.0,
    177100.0,
    139300.0,
    843900.0,
    234100.0,
    122800.0,
    158000.0,
    284200.0,
    146300.0,
    136100.0,
    87300.0,
    188700.0,
    102500.0,
    158500.0,
    303400.0,
    168300.0,
    207000.0,
    184900.0,
    185100.0,
    103600.0,
    182200.0,
    107800.0,
    105900.0,
    181900.0,
    175200.0,
    151500.0,
    237400.0,
    120000.0,
    87000.0,
    112300.0,
    211500.0,
    182400.0,
    248200.0,
    225400.0,
    154700.0,
    164500.0,
    126100.0,
    164900.0,
    100400.0,
    195300.0,
    217200.0,
    138800.0,
    201100.0,
    167100.0,
    153900.0,
    269700.0,
    307400.0,
    321100.0,
    273400.0,
    245000.0,
    435800.0,
    1325200.0,
    377600.0,
    528300.0,
    257100.0,
    423800.0,
    399100.0,
    240200.0,
    184800.0,
    231100.0,
    347300.0,
    563100.0,
    559900.0,
    301900.0,
    612000.0,
    300700.0,
    377500.0,
    354500.0,
    334100.0,
    374000.0,
    238500.0,
    372000.0,
    279900.0,
    245300.0,
    337300.0,
    481500.0,
    461300.0,
    427300.0,
    261000.0,
    431700.0,
    309000.0,
    213800.0,
    335900.0,
    295100.0,
    203000.0,
    398700.0,
    258900.0,
    402600.0,
    211900.0,
    283000.0,
    217100.0,
    440800.0,
    658000.0,
    322400.0,
    328900.0,
    271700.0,
    317400.0,
    297700.0,
    522500.0,
    451700.0,
    264000.0,
    173600.0,
    200800.0,
    300700.0,
    281400.0,
    287900.0,
    254800.0,
    640200.0,
    245600.0,
    367700.0,
    212400.0,
    223200.0,
    178400.0,
    194900.0,
    582000.0,
    409400.0,
    457400.0,
    243400.0,
    320300.0,
    259900.0,
    254600.0,
    390000.0,
    532100.0,
    174100.0,
    676300.0,
    302100.0,
    233200.0,
    568500.0,
    272900.0,
    399900.0,
    303500.0,
    482900.0,
    168600.0,
    330400.0,
    290300.0,
    186600.0,
    283800.0,
    86900.0,
    244700.0,
    170200.0,
    348800.0,
    211700.0,
    202800.0,
    262100.0,
    169800.0,
    231200.0,
    338000.0,
    265300.0,
    180700.0,
    178700.0,
    205900.0,
    257900.0,
    257000.0,
    326100.0,
    272000.0,
    227400.0,
    477200.0,
    433000.0,
    285800.0,
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
        text: "AAON",
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