/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_OMAB");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/10', 55.03, 54.94, 56.14, 54.13],
    ['2022/08/11', 55.51, 55.26, 55.51, 54.79],
    ['2022/08/12', 55.09, 55.39, 55.48, 54.86],
    ['2022/08/15', 55.03, 54.81, 55.79, 54.49],
    ['2022/08/16', 54.82, 54.83, 55.21, 54.28],
    ['2022/08/17', 54.16, 54.6, 54.6, 53.58],
    ['2022/08/18', 54.33, 54.8, 55.23, 53.73],
    ['2022/08/19', 54.69, 53.86, 54.69, 53.27],
    ['2022/08/22', 53.17, 51.78, 53.21, 51.37],
    ['2022/08/23', 51.87, 54.12, 54.12, 51.87],
    ['2022/08/24', 53.91, 54.12, 54.55, 53.91],
    ['2022/08/25', 54.31, 55.04, 55.24, 53.99],
    ['2022/08/26', 55.1, 55.57, 55.93, 54.73],
    ['2022/08/29', 55.75, 53.66, 55.86, 53.66],
    ['2022/08/30', 54.13, 52.49, 55.41, 51.56],
    ['2022/08/31', 52.73, 52.27, 52.93, 52.13],
    ['2022/09/01', 52.0, 52.51, 52.61, 51.56],
    ['2022/09/02', 52.87, 53.14, 53.38, 52.69],
    ['2022/09/06', 53.53, 52.06, 53.53, 51.66],
    ['2022/09/07', 52.1, 53.47, 53.82, 52.04],
    ['2022/09/08', 53.18, 53.86, 54.2, 52.82],
    ['2022/09/09', 54.55, 55.22, 55.26, 54.55],
    ['2022/09/12', 55.45, 56.81, 56.87, 55.45],
    ['2022/09/13', 55.45, 54.79, 56.26, 54.76],
    ['2022/09/14', 55.17, 56.34, 57.22, 54.61],
    ['2022/09/15', 56.07, 57.12, 57.43, 55.13],
    ['2022/09/16', 56.49, 55.33, 56.49, 54.23],
    ['2022/09/19', 54.83, 57.94, 57.94, 54.83],
    ['2022/09/20', 57.67, 57.3, 57.73, 56.38],
    ['2022/09/21', 56.34, 56.46, 57.45, 56.34],
    ['2022/09/22', 56.75, 55.86, 57.2, 55.7],
    ['2022/09/23', 54.99, 53.45, 54.99, 52.61],
    ['2022/09/26', 53.09, 52.09, 53.55, 51.94],
    ['2022/09/27', 52.29, 52.68, 53.12, 52.29],
    ['2022/09/28', 52.49, 53.44, 53.88, 52.22],
    ['2022/09/29', 53.08, 51.34, 53.08, 51.22],
    ['2022/09/30', 50.82, 50.14, 51.92, 50.14],
    ['2022/10/03', 50.73, 52.15, 52.3, 50.02],
    ['2022/10/04', 53.26, 53.7, 53.7, 52.65],
    ['2022/10/05', 53.3, 52.55, 53.58, 52.22],
    ['2022/10/06', 52.1, 52.35, 52.94, 51.51],
    ['2022/10/07', 52.08, 53.43, 53.93, 52.08],
    ['2022/10/10', 53.38, 54.48, 54.54, 52.86],
    ['2022/10/11', 54.11, 53.9, 55.86, 53.47],
    ['2022/10/12', 53.8, 53.52, 54.52, 53.52],
    ['2022/10/13', 52.89, 55.62, 55.67, 52.68],
    ['2022/10/14', 55.81, 55.05, 56.26, 54.66],
    ['2022/10/17', 55.95, 55.62, 56.25, 55.24],
    ['2022/10/18', 56.6, 56.0, 57.09, 54.97],
    ['2022/10/19', 55.98, 56.92, 57.4, 55.31],
    ['2022/10/20', 56.93, 57.69, 58.26, 56.61],
    ['2022/10/21', 57.53, 58.2, 58.9, 57.5],
    ['2022/10/24', 58.71, 61.07, 61.86, 58.39],
    ['2022/10/25', 61.55, 62.34, 62.4, 61.0],
    ['2022/10/26', 62.55, 63.12, 63.78, 62.0],
    ['2022/10/27', 63.44, 63.43, 64.29, 62.67],
    ['2022/10/28', 63.73, 63.74, 64.8, 62.7],
    ['2022/10/31', 63.74, 63.77, 64.28, 62.6],
    ['2022/11/01', 64.51, 64.46, 64.96, 63.93],
    ['2022/11/02', 64.48, 63.75, 64.82, 63.65],
    ['2022/11/03', 63.07, 64.21, 64.91, 63.07],
    ['2022/11/04', 65.35, 65.19, 67.16, 64.67],
    ['2022/11/07', 65.39, 65.41, 66.1, 65.0],
    ['2022/11/08', 66.17, 65.43, 66.17, 65.2],
    ['2022/11/09', 65.56, 65.08, 65.87, 65.08],
    ['2022/11/10', 66.82, 67.07, 67.32, 66.52],
    ['2022/11/11', 67.21, 66.96, 67.34, 66.08],
    ['2022/11/14', 67.09, 67.86, 69.27, 66.69],
    ['2022/11/15', 68.36, 69.46, 69.47, 67.9],
    ['2022/11/16', 69.45, 70.57, 70.72, 68.5],
    ['2022/11/17', 69.42, 69.99, 70.07, 68.05],
    ['2022/11/18', 70.62, 69.79, 70.62, 69.49],
    ['2022/11/21', 69.55, 69.69, 69.88, 68.92],
    ['2022/11/22', 69.52, 70.06, 70.18, 69.46],
    ['2022/11/23', 69.77, 71.45, 71.51, 69.77],
    ['2022/11/25', 71.86, 70.76, 71.86, 70.69],
    ['2022/11/28', 70.01, 68.5, 70.7, 68.26],
    ['2022/11/29', 68.43, 67.83, 69.42, 67.54],
    ['2022/11/30', 68.4, 69.52, 69.6, 67.58],
    ['2022/12/01', 69.71, 71.04, 71.33, 69.31],
    ['2022/12/02', 70.4, 69.83, 70.4, 69.27],
    ['2022/12/05', 70.1, 67.42, 70.31, 67.16],
    ['2022/12/06', 67.8, 69.33, 69.78, 67.51],
    ['2022/12/07', 69.0, 68.63, 69.77, 68.52],
    ['2022/12/08', 68.9, 68.44, 69.16, 67.11],
    ['2022/12/09', 68.44, 65.56, 68.44, 65.39],
    ['2022/12/12', 65.74, 66.4, 66.61, 65.0],
    ['2022/12/13', 66.57, 66.26, 66.77, 65.18],
    ['2022/12/14', 64.02, 63.42, 64.79, 62.38],
    ['2022/12/15', 63.3, 62.83, 63.45, 62.28],
    ['2022/12/16', 62.4, 60.73, 62.4, 60.72],
    ['2022/12/19', 63.0, 61.69, 63.26, 61.21],
    ['2022/12/20', 61.95, 60.84, 62.23, 60.62],
    ['2022/12/21', 61.17, 62.9, 62.98, 61.01],
    ['2022/12/22', 63.34, 62.79, 63.34, 61.86],
    ['2022/12/23', 63.28, 65.62, 65.62, 63.1],
    ['2022/12/27', 66.07, 64.91, 66.07, 64.75],
    ['2022/12/28', 65.0, 64.62, 66.04, 64.5],
    ['2022/12/29', 65.29, 63.54, 65.29, 63.42],
    ['2022/12/30', 63.19, 61.84, 63.19, 61.58],
    ['2023/01/03', 62.0, 63.53, 63.66, 62.0],
    ['2023/01/04', 64.12, 65.8, 65.84, 64.12],
    ['2023/01/05', 65.84, 66.29, 66.29, 65.28],
    ['2023/01/06', 67.18, 68.53, 69.28, 66.41],
    ['2023/01/09', 69.02, 70.22, 70.55, 68.93],
    ['2023/01/10', 70.33, 69.45, 70.96, 69.06],
    ['2023/01/11', 69.92, 69.98, 70.4, 69.71],
    ['2023/01/12', 70.45, 70.63, 71.14, 69.62],
    ['2023/01/13', 70.63, 71.98, 73.57, 69.82],
    ['2023/01/17', 72.49, 71.98, 73.25, 71.84],
    ['2023/01/18', 72.11, 71.68, 73.52, 71.46],
    ['2023/01/19', 71.39, 72.47, 72.81, 70.98],
    ['2023/01/20', 72.82, 73.48, 73.88, 72.71],
    ['2023/01/23', 73.99, 75.0, 75.5, 73.98],
    ['2023/01/24', 74.41, 76.18, 76.29, 74.41],
    ['2023/01/25', 76.21, 75.23, 76.59, 75.13],
    ['2023/01/26', 75.41, 76.09, 76.09, 74.56],
    ['2023/01/27', 76.17, 74.22, 76.27, 73.88],
    ['2023/01/30', 73.81, 72.03, 73.81, 70.32],
    ['2023/01/31', 71.8, 73.05, 73.05, 71.52],
    ['2023/02/01', 73.08, 75.79, 76.35, 73.08],
    ['2023/02/02', 76.0, 74.19, 76.52, 74.19],
    ['2023/02/03', 73.42, 73.74, 73.94, 73.13],
    ['2023/02/06', 73.58, 73.88, 74.15, 72.77],
    ['2023/02/07', 73.34, 74.45, 74.62, 73.04],
    ['2023/02/08', 74.93, 74.65, 75.5, 73.52],
    ['2023/02/09', 75.76, 74.68, 76.05, 74.62],
    ['2023/02/10', 74.36, 73.74, 74.59, 73.27],
    ['2023/02/13', 73.6, 76.24, 76.27, 73.6],
    ['2023/02/14', 76.24, 76.25, 77.37, 76.01],
    ['2023/02/15', 76.16, 76.55, 76.55, 75.28],
    ['2023/02/16', 75.51, 76.85, 77.71, 75.51],
    ['2023/02/17', 76.25, 78.5, 78.86, 76.25],
    ['2023/02/21', 77.56, 77.17, 78.24, 76.61],
    ['2023/02/22', 77.44, 76.92, 77.7, 76.06],
    ['2023/02/23', 77.69, 76.76, 78.0, 76.49],
    ['2023/02/24', 75.89, 76.54, 76.69, 75.49],
    ['2023/02/27', 77.27, 76.62, 77.8, 76.5],
    ['2023/02/28', 77.17, 77.99, 78.35, 76.93],
    ['2023/03/01', 78.68, 79.83, 81.17, 78.22],
    ['2023/03/02', 78.16, 77.73, 78.5, 76.25],
    ['2023/03/03', 79.5, 80.49, 80.55, 78.83],
    ['2023/03/06', 81.0, 81.1, 81.31, 79.74],
    ['2023/03/07', 81.62, 80.56, 81.62, 80.29],
    ['2023/03/08', 81.07, 82.05, 82.19, 80.86],
    ['2023/03/09', 82.56, 81.23, 83.11, 81.02],
    ['2023/03/10', 81.21, 79.89, 81.21, 79.5],
    ['2023/03/13', 79.88, 79.48, 80.11, 77.14],
    ['2023/03/14', 80.18, 82.33, 82.63, 80.18],
    ['2023/03/15', 81.54, 80.76, 81.63, 79.94],
    ['2023/03/16', 80.54, 83.51, 83.7, 79.76],
    ['2023/03/17', 82.93, 81.96, 83.5, 81.02],
    ['2023/03/20', 82.25, 81.91, 82.94, 81.43],
    ['2023/03/21', 82.62, 83.38, 84.01, 82.5],
    ['2023/03/22', 83.09, 84.21, 85.2, 82.77],
    ['2023/03/23', 84.99, 85.03, 86.47, 84.75],
    ['2023/03/24', 84.34, 85.07, 85.43, 83.26],
    ['2023/03/27', 85.77, 86.31, 86.53, 84.85],
    ['2023/03/28', 86.2, 88.29, 88.46, 86.2],
    ['2023/03/29', 88.55, 89.63, 89.63, 88.55],
    ['2023/03/30', 88.66, 88.54, 89.4, 87.42],
    ['2023/03/31', 88.17, 89.51, 89.64, 87.92],
    ['2023/04/03', 89.39, 88.83, 89.39, 87.12],
    ['2023/04/04', 89.05, 90.21, 91.0, 89.05],
    ['2023/04/05', 90.26, 86.57, 90.52, 86.31],
    ['2023/04/06', 86.98, 86.9, 87.64, 86.45],
    ['2023/04/10', 86.83, 87.62, 87.96, 86.33],
    ['2023/04/11', 88.1, 90.19, 90.73, 87.68],
    ['2023/04/12', 90.65, 89.91, 91.73, 89.62],
    ['2023/04/13', 90.13, 90.15, 91.06, 89.52],
    ['2023/04/14', 90.2, 90.12, 90.4, 88.89],
    ['2023/04/17', 89.64, 90.22, 90.4, 88.4],
    ['2023/04/18', 89.86, 86.42, 90.72, 85.59],
    ['2023/04/19', 85.69, 86.22, 87.22, 85.69],
    ['2023/04/20', 86.0, 83.21, 86.0, 83.1],
    ['2023/04/21', 83.21, 78.56, 83.4, 77.94],
    ['2023/04/24', 77.76, 81.51, 81.97, 77.76],
    ['2023/04/25', 81.4, 82.04, 82.77, 80.5],
    ['2023/04/26', 82.7, 82.41, 83.58, 81.41],
    ['2023/04/27', 83.81, 85.16, 85.48, 83.14],
    ['2023/04/28', 85.5, 87.48, 89.14, 85.44],
    ['2023/05/01', 87.38, 85.99, 87.38, 85.55],
    ['2023/05/02', 86.33, 88.07, 88.41, 85.75],
    ['2023/05/03', 88.07, 86.81, 88.3, 85.87],
    ['2023/05/04', 86.75, 82.1, 86.85, 81.51],
    ['2023/05/05', 82.89, 84.88, 85.24, 82.56],
    ['2023/05/08', 85.37, 85.17, 85.7, 84.42],
    ['2023/05/09', 85.25, 86.36, 86.91, 84.48],
    ['2023/05/10', 87.35, 88.66, 89.04, 86.34],
    ['2023/05/11', 88.64, 87.86, 88.64, 87.29],
    ['2023/05/12', 87.99, 87.59, 88.12, 86.89],
    ['2023/05/15', 87.49, 88.68, 88.87, 87.02],
    ['2023/05/16', 88.67, 90.93, 91.6, 88.58],
    ['2023/05/17', 91.54, 91.55, 92.45, 90.17],
    ['2023/05/18', 91.28, 90.74, 92.8, 90.27],
    ['2023/05/19', 90.74, 88.63, 91.76, 88.23],
    ['2023/05/22', 88.83, 85.49, 89.54, 85.34],
    ['2023/05/23', 85.49, 84.21, 85.58, 84.12],
    ['2023/05/24', 84.32, 84.49, 84.82, 83.14],
    ['2023/05/25', 84.86, 84.34, 84.87, 83.84],
    ['2023/05/26', 84.61, 87.02, 87.18, 84.53],
    ['2023/05/30', 88.02, 84.4, 88.02, 83.85],
    ['2023/05/31', 84.05, 82.65, 84.05, 81.56],
    ['2023/06/01', 82.65, 83.53, 84.37, 82.65],
    ['2023/06/02', 84.31, 83.93, 85.63, 83.89],
    ['2023/06/05', 83.84, 83.05, 83.87, 81.77],
    ['2023/06/06', 82.87, 87.03, 87.29, 82.87],
    ['2023/06/07', 87.14, 86.27, 87.77, 86.13],
    ['2023/06/08', 86.27, 84.99, 86.3, 84.56],
    ['2023/06/09', 85.36, 86.94, 87.74, 85.36],
    ['2023/06/12', 86.88, 87.12, 87.5, 85.94],
    ['2023/06/13', 86.93, 87.47, 87.65, 86.36],
    ['2023/06/14', 87.5, 89.16, 90.0, 87.5],
    ['2023/06/15', 88.5, 89.63, 90.12, 88.5],
    ['2023/06/16', 90.04, 89.26, 90.14, 88.97],
    ['2023/06/20', 87.33, 83.72, 87.73, 83.49],
    ['2023/06/21', 83.72, 84.93, 85.2, 82.4],
    ['2023/06/22', 85.14, 83.55, 85.14, 82.21],
    ['2023/06/23', 83.55, 83.69, 84.2, 82.07],
    ['2023/06/26', 83.84, 83.43, 84.85, 82.22],
    ['2023/06/27', 84.07, 85.61, 85.82, 83.79],
    ['2023/06/28', 85.82, 85.65, 86.0, 84.98],
    ['2023/06/29', 86.06, 85.3, 86.06, 84.63],
    ['2023/06/30', 85.98, 84.84, 85.98, 84.27],
    ['2023/07/03', 84.91, 86.59, 87.4, 84.91],
    ['2023/07/05', 86.33, 85.22, 86.33, 84.57],
    ['2023/07/06', 84.58, 85.03, 85.84, 83.92],
    ['2023/07/07', 85.37, 85.85, 87.11, 85.37],
    ['2023/07/10', 85.77, 86.58, 86.92, 85.77],
    ['2023/07/11', 86.91, 87.47, 87.51, 85.27],
    ['2023/07/12', 88.29, 87.72, 88.97, 87.49],
    ['2023/07/13', 88.39, 88.87, 89.4, 87.65],
    ['2023/07/14', 89.3, 88.97, 89.3, 87.83],
    ['2023/07/17', 88.9, 89.23, 89.5, 87.95],
    ['2023/07/18', 89.56, 93.22, 93.33, 89.56],
    ['2023/07/19', 93.5, 92.88, 94.22, 92.09],
    ['2023/07/20', 93.39, 89.47, 93.39, 88.75],
    ['2023/07/21', 89.88, 87.75, 89.9, 87.61],
    ['2023/07/24', 87.75, 85.29, 87.76, 84.62],
    ['2023/07/25', 85.07, 83.59, 85.07, 82.81],
    ['2023/07/26', 83.69, 87.22, 87.22, 83.59],
    ['2023/07/27', 87.22, 88.74, 89.89, 86.77],
    ['2023/07/28', 89.52, 90.34, 91.33, 89.46],
    ['2023/07/31', 91.4, 90.6, 91.4, 89.74],
    ['2023/08/01', 91.1, 87.95, 91.1, 87.61],
    ['2023/08/02', 87.94, 85.47, 87.94, 85.06],
    ['2023/08/03', 85.35, 84.52, 86.04, 84.31],
    ['2023/08/04', 85.0, 87.12, 87.39, 85.0],
    ['2023/08/07', 87.09, 88.85, 89.32, 87.09],
    ['2023/08/08', 88.85, 88.53, 88.85, 85.83],
]);
var volumes = [
    55700.0,
    36000.0,
    31100.0,
    119800.0,
    23800.0,
    26100.0,
    21700.0,
    20600.0,
    28200.0,
    37100.0,
    29800.0,
    40500.0,
    95900.0,
    99700.0,
    45500.0,
    81100.0,
    36000.0,
    16500.0,
    14600.0,
    32100.0,
    25800.0,
    14700.0,
    22800.0,
    31000.0,
    101000.0,
    149400.0,
    62800.0,
    144100.0,
    98000.0,
    50800.0,
    32100.0,
    45300.0,
    49700.0,
    30700.0,
    32900.0,
    54700.0,
    48800.0,
    38400.0,
    65700.0,
    23600.0,
    30500.0,
    62600.0,
    148300.0,
    169100.0,
    55100.0,
    42100.0,
    34500.0,
    33400.0,
    45900.0,
    219700.0,
    170000.0,
    89300.0,
    115000.0,
    56400.0,
    144200.0,
    145500.0,
    134600.0,
    146500.0,
    113400.0,
    76300.0,
    227800.0,
    255300.0,
    98300.0,
    72500.0,
    75100.0,
    67300.0,
    92400.0,
    156100.0,
    86400.0,
    99500.0,
    66600.0,
    109700.0,
    84400.0,
    114000.0,
    54000.0,
    30700.0,
    104100.0,
    60100.0,
    118600.0,
    90600.0,
    36200.0,
    64500.0,
    98200.0,
    44200.0,
    39800.0,
    54500.0,
    32800.0,
    84000.0,
    236700.0,
    125000.0,
    64900.0,
    75400.0,
    85300.0,
    61700.0,
    51900.0,
    60500.0,
    51000.0,
    49300.0,
    47400.0,
    62100.0,
    33700.0,
    38600.0,
    54100.0,
    57900.0,
    61000.0,
    51100.0,
    47800.0,
    53100.0,
    65900.0,
    50200.0,
    39900.0,
    67300.0,
    46300.0,
    54100.0,
    52800.0,
    37100.0,
    56200.0,
    41300.0,
    44700.0,
    49400.0,
    84600.0,
    41500.0,
    37500.0,
    18000.0,
    25100.0,
    96800.0,
    45400.0,
    62000.0,
    39100.0,
    43000.0,
    30200.0,
    43200.0,
    49100.0,
    58000.0,
    98300.0,
    42600.0,
    25900.0,
    43500.0,
    29700.0,
    45500.0,
    58600.0,
    55300.0,
    41200.0,
    40600.0,
    41400.0,
    76200.0,
    109900.0,
    108700.0,
    60300.0,
    103700.0,
    84700.0,
    77700.0,
    36000.0,
    83400.0,
    78200.0,
    89200.0,
    86700.0,
    61800.0,
    66500.0,
    104300.0,
    108400.0,
    164200.0,
    83600.0,
    69700.0,
    46900.0,
    51800.0,
    34300.0,
    95300.0,
    63800.0,
    107500.0,
    73800.0,
    70200.0,
    103900.0,
    175700.0,
    102100.0,
    157100.0,
    237300.0,
    178700.0,
    104500.0,
    96400.0,
    129800.0,
    48900.0,
    96800.0,
    60200.0,
    189600.0,
    69900.0,
    43100.0,
    31900.0,
    130500.0,
    392300.0,
    88100.0,
    57900.0,
    111400.0,
    61700.0,
    77800.0,
    84900.0,
    138800.0,
    84100.0,
    149000.0,
    39500.0,
    31100.0,
    60700.0,
    89500.0,
    40000.0,
    31000.0,
    42300.0,
    48600.0,
    48500.0,
    35000.0,
    58700.0,
    46900.0,
    50900.0,
    61000.0,
    54000.0,
    69800.0,
    72000.0,
    54100.0,
    30300.0,
    43500.0,
    54800.0,
    41400.0,
    40500.0,
    26900.0,
    38100.0,
    23100.0,
    21100.0,
    55700.0,
    27200.0,
    31300.0,
    43400.0,
    29000.0,
    24200.0,
    25600.0,
    42300.0,
    52300.0,
    39100.0,
    56300.0,
    34300.0,
    125800.0,
    114500.0,
    59400.0,
    33900.0,
    59600.0,
    48000.0,
    61300.0,
    41400.0,
    40200.0,
    84300.0,
    37300.0,
    48900.0,
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
     *     text: "OMAB",
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