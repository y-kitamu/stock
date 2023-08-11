/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_KRUS");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/12', 92.0, 93.21, 93.77, 91.47],
    ['2022/08/15', 92.89, 95.69, 96.6, 92.89],
    ['2022/08/16', 95.22, 91.91, 96.34, 90.41],
    ['2022/08/17', 90.58, 91.64, 93.25, 90.11],
    ['2022/08/18', 91.46, 91.11, 92.5, 90.29],
    ['2022/08/19', 90.07, 84.06, 90.44, 83.73],
    ['2022/08/22', 83.28, 83.37, 84.02, 79.33],
    ['2022/08/23', 83.31, 83.11, 85.91, 82.28],
    ['2022/08/24', 83.18, 83.23, 85.3, 82.81],
    ['2022/08/25', 83.74, 84.98, 85.22, 83.3],
    ['2022/08/26', 84.34, 84.25, 86.24, 82.54],
    ['2022/08/29', 83.0, 83.02, 84.88, 82.84],
    ['2022/08/30', 83.31, 74.26, 83.63, 73.72],
    ['2022/08/31', 75.33, 74.76, 77.29, 74.5],
    ['2022/09/01', 73.5, 75.89, 75.89, 71.76],
    ['2022/09/02', 77.0, 76.02, 77.0, 74.15],
    ['2022/09/06', 76.49, 72.12, 76.49, 71.81],
    ['2022/09/07', 72.09, 74.27, 75.12, 72.0],
    ['2022/09/08', 72.99, 73.0, 75.15, 72.02],
    ['2022/09/09', 74.23, 75.39, 76.76, 73.03],
    ['2022/09/12', 76.11, 75.23, 76.63, 74.5],
    ['2022/09/13', 72.5, 72.65, 74.42, 72.0],
    ['2022/09/14', 72.96, 72.94, 73.89, 71.41],
    ['2022/09/15', 72.48, 71.84, 74.43, 71.48],
    ['2022/09/16', 70.64, 71.14, 71.17, 69.0],
    ['2022/09/19', 70.66, 70.67, 71.71, 69.4],
    ['2022/09/20', 70.65, 70.26, 70.65, 68.3],
    ['2022/09/21', 70.26, 70.86, 74.33, 69.08],
    ['2022/09/22', 71.42, 66.18, 71.44, 65.9],
    ['2022/09/23', 66.07, 64.92, 66.77, 64.45],
    ['2022/09/26', 64.82, 67.83, 69.13, 64.82],
    ['2022/09/27', 68.77, 71.47, 72.25, 67.44],
    ['2022/09/28', 71.51, 74.42, 75.55, 71.22],
    ['2022/09/29', 73.72, 73.2, 74.6, 71.53],
    ['2022/09/30', 72.98, 73.58, 74.8, 71.4],
    ['2022/10/03', 74.07, 71.35, 74.67, 69.25],
    ['2022/10/04', 72.88, 75.93, 78.07, 72.09],
    ['2022/10/05', 74.59, 73.79, 75.2, 72.0],
    ['2022/10/06', 74.13, 74.55, 75.96, 72.22],
    ['2022/10/07', 73.29, 73.68, 74.68, 71.5],
    ['2022/10/10', 73.2, 72.49, 74.38, 71.53],
    ['2022/10/11', 72.01, 72.34, 73.58, 69.81],
    ['2022/10/12', 72.0, 69.62, 72.0, 69.46],
    ['2022/10/13', 69.18, 73.81, 76.17, 67.5],
    ['2022/10/14', 74.79, 68.86, 75.2, 68.46],
    ['2022/10/17', 70.82, 72.06, 73.17, 70.69],
    ['2022/10/18', 73.62, 73.48, 76.21, 73.09],
    ['2022/10/19', 73.42, 71.63, 73.82, 70.57],
    ['2022/10/20', 71.29, 72.17, 74.87, 71.29],
    ['2022/10/21', 72.37, 75.41, 76.16, 72.37],
    ['2022/10/24', 75.55, 74.11, 75.88, 71.7],
    ['2022/10/25', 73.7, 78.93, 79.37, 73.7],
    ['2022/10/26', 79.88, 77.81, 82.52, 77.67],
    ['2022/10/27', 78.28, 78.51, 80.14, 76.68],
    ['2022/10/28', 78.42, 79.69, 80.45, 77.1],
    ['2022/10/31', 79.22, 79.03, 81.29, 79.02],
    ['2022/11/01', 80.07, 77.18, 81.49, 76.28],
    ['2022/11/02', 77.19, 73.79, 79.4, 73.69],
    ['2022/11/03', 73.49, 75.02, 81.44, 72.9],
    ['2022/11/04', 76.56, 72.23, 78.51, 68.34],
    ['2022/11/07', 72.2, 66.23, 72.2, 65.67],
    ['2022/11/08', 66.26, 65.0, 68.29, 63.0],
    ['2022/11/09', 64.82, 63.89, 65.83, 63.34],
    ['2022/11/10', 66.76, 71.59, 72.0, 64.5],
    ['2022/11/11', 64.5, 65.82, 72.5, 63.66],
    ['2022/11/14', 65.11, 65.52, 66.42, 58.88],
    ['2022/11/15', 66.1, 64.59, 68.86, 63.76],
    ['2022/11/16', 63.91, 68.31, 69.68, 62.57],
    ['2022/11/17', 67.09, 63.54, 67.42, 61.96],
    ['2022/11/18', 65.29, 63.38, 65.29, 61.8],
    ['2022/11/21', 63.24, 64.59, 65.54, 61.73],
    ['2022/11/22', 63.91, 63.46, 64.85, 63.05],
    ['2022/11/23', 63.69, 65.17, 66.22, 63.05],
    ['2022/11/25', 65.34, 65.45, 66.37, 64.57],
    ['2022/11/28', 64.89, 65.02, 66.2, 64.71],
    ['2022/11/29', 65.02, 63.81, 65.25, 63.05],
    ['2022/11/30', 64.43, 65.7, 67.16, 63.38],
    ['2022/12/01', 66.37, 69.25, 70.09, 65.25],
    ['2022/12/02', 67.59, 69.28, 69.86, 66.51],
    ['2022/12/05', 69.07, 63.94, 69.07, 63.05],
    ['2022/12/06', 64.43, 63.64, 65.0, 63.08],
    ['2022/12/07', 63.54, 63.3, 64.74, 62.67],
    ['2022/12/08', 64.03, 64.28, 65.03, 63.15],
    ['2022/12/09', 63.34, 62.53, 63.94, 61.94],
    ['2022/12/12', 62.65, 62.76, 63.56, 61.6],
    ['2022/12/13', 65.43, 63.47, 66.48, 61.8],
    ['2022/12/14', 63.84, 62.49, 64.11, 60.78],
    ['2022/12/15', 61.49, 61.32, 63.14, 60.5],
    ['2022/12/16', 60.33, 57.33, 61.03, 57.16],
    ['2022/12/19', 57.34, 53.41, 57.69, 51.37],
    ['2022/12/20', 52.65, 52.84, 55.27, 52.65],
    ['2022/12/21', 53.41, 53.09, 53.69, 51.0],
    ['2022/12/22', 52.74, 53.46, 54.88, 52.0],
    ['2022/12/23', 53.24, 51.07, 53.87, 50.82],
    ['2022/12/27', 50.99, 49.22, 51.0, 48.64],
    ['2022/12/28', 49.13, 46.95, 49.24, 46.51],
    ['2022/12/29', 47.02, 47.28, 48.18, 46.76],
    ['2022/12/30', 47.11, 47.68, 48.06, 46.61],
    ['2023/01/03', 48.64, 47.3, 49.99, 46.24],
    ['2023/01/04', 47.68, 50.2, 51.42, 47.35],
    ['2023/01/05', 49.66, 48.39, 50.67, 47.94],
    ['2023/01/06', 40.5, 39.88, 42.56, 37.97],
    ['2023/01/09', 40.92, 43.02, 44.47, 40.73],
    ['2023/01/10', 43.0, 51.22, 53.0, 43.0],
    ['2023/01/11', 52.17, 55.08, 55.32, 51.05],
    ['2023/01/12', 55.17, 54.33, 55.18, 52.8],
    ['2023/01/13', 54.24, 57.46, 58.39, 54.24],
    ['2023/01/17', 57.38, 57.47, 59.46, 56.66],
    ['2023/01/18', 57.87, 54.95, 58.41, 53.46],
    ['2023/01/19', 54.28, 53.2, 55.35, 52.18],
    ['2023/01/20', 54.15, 57.19, 57.91, 53.61],
    ['2023/01/23', 57.23, 58.08, 58.33, 56.04],
    ['2023/01/24', 58.8, 56.52, 58.8, 55.51],
    ['2023/01/25', 55.89, 57.47, 58.23, 53.76],
    ['2023/01/26', 57.87, 57.6, 59.0, 56.73],
    ['2023/01/27', 57.67, 61.54, 62.34, 57.18],
    ['2023/01/30', 60.04, 60.43, 62.45, 59.51],
    ['2023/01/31', 61.3, 62.14, 63.86, 60.69],
    ['2023/02/01', 62.06, 61.89, 62.6, 59.5],
    ['2023/02/02', 62.03, 62.18, 64.35, 61.57],
    ['2023/02/03', 61.18, 61.78, 63.46, 60.48],
    ['2023/02/06', 61.58, 62.36, 63.03, 61.09],
    ['2023/02/07', 61.62, 61.14, 62.71, 59.79],
    ['2023/02/08', 60.87, 58.9, 61.15, 58.6],
    ['2023/02/09', 59.44, 56.53, 59.7, 56.12],
    ['2023/02/10', 56.58, 55.77, 57.14, 55.31],
    ['2023/02/13', 55.98, 56.74, 57.87, 55.16],
    ['2023/02/14', 56.16, 58.16, 58.81, 55.57],
    ['2023/02/15', 59.45, 62.36, 64.1, 58.97],
    ['2023/02/16', 61.35, 60.25, 62.92, 58.54],
    ['2023/02/17', 60.12, 61.62, 62.27, 58.56],
    ['2023/02/21', 60.21, 59.07, 61.62, 58.44],
    ['2023/02/22', 59.18, 61.4, 61.55, 58.11],
    ['2023/02/23', 61.6, 61.85, 63.33, 60.3],
    ['2023/02/24', 60.69, 61.53, 62.74, 59.95],
    ['2023/02/27', 61.86, 60.78, 64.16, 60.59],
    ['2023/02/28', 60.96, 62.62, 64.51, 60.96],
    ['2023/03/01', 62.5, 63.54, 64.87, 62.0],
    ['2023/03/02', 62.66, 63.64, 65.17, 62.66],
    ['2023/03/03', 64.12, 68.02, 68.34, 63.67],
    ['2023/03/06', 68.2, 69.08, 69.98, 68.01],
    ['2023/03/07', 68.89, 66.8, 72.36, 66.61],
    ['2023/03/08', 66.49, 67.19, 67.93, 65.73],
    ['2023/03/09', 67.19, 67.13, 68.68, 66.59],
    ['2023/03/10', 66.9, 66.69, 68.42, 65.54],
    ['2023/03/13', 65.02, 64.0, 67.13, 63.47],
    ['2023/03/14', 65.57, 64.14, 67.7, 62.89],
    ['2023/03/15', 62.55, 64.8, 65.32, 62.5],
    ['2023/03/16', 64.12, 65.63, 66.09, 63.58],
    ['2023/03/17', 65.01, 62.72, 65.61, 61.85],
    ['2023/03/20', 63.13, 61.67, 63.21, 61.45],
    ['2023/03/21', 62.97, 64.24, 64.63, 62.52],
    ['2023/03/22', 63.95, 64.49, 66.64, 61.8],
    ['2023/03/23', 65.5, 66.97, 70.0, 65.5],
    ['2023/03/24', 66.63, 67.39, 68.07, 64.95],
    ['2023/03/27', 67.83, 60.95, 68.0, 59.91],
    ['2023/03/28', 60.59, 61.5, 61.84, 58.9],
    ['2023/03/29', 62.06, 64.68, 65.34, 61.32],
    ['2023/03/30', 65.38, 65.59, 66.98, 64.0],
    ['2023/03/31', 66.05, 65.84, 67.0, 64.85],
    ['2023/04/03', 65.84, 66.44, 67.27, 64.87],
    ['2023/04/04', 67.28, 67.3, 68.25, 65.91],
    ['2023/04/05', 72.05, 56.53, 72.98, 55.23],
    ['2023/04/06', 56.4, 55.5, 57.35, 53.9],
    ['2023/04/10', 55.21, 57.03, 57.7, 54.0],
    ['2023/04/11', 59.42, 72.97, 73.74, 58.1],
    ['2023/04/12', 72.85, 66.17, 73.53, 65.44],
    ['2023/04/13', 66.97, 63.56, 66.97, 62.88],
    ['2023/04/14', 64.73, 64.83, 65.14, 60.37],
    ['2023/04/17', 65.27, 65.7, 68.48, 65.27],
    ['2023/04/18', 66.39, 64.93, 67.79, 64.04],
    ['2023/04/19', 64.55, 66.2, 66.65, 61.98],
    ['2023/04/20', 65.45, 66.64, 67.84, 65.43],
    ['2023/04/21', 66.5, 67.36, 67.79, 65.0],
    ['2023/04/24', 67.27, 66.52, 67.27, 65.67],
    ['2023/04/25', 66.16, 66.89, 67.38, 65.75],
    ['2023/04/26', 66.2, 65.88, 67.55, 65.23],
    ['2023/04/27', 66.4, 65.87, 66.89, 64.52],
    ['2023/04/28', 65.93, 68.92, 69.72, 64.34],
    ['2023/05/01', 68.91, 68.43, 70.53, 67.04],
    ['2023/05/02', 68.83, 65.85, 68.83, 65.84],
    ['2023/05/03', 65.55, 66.0, 66.58, 63.17],
    ['2023/05/04', 66.29, 65.91, 67.77, 65.69],
    ['2023/05/05', 66.39, 65.44, 67.71, 65.25],
    ['2023/05/08', 65.57, 64.11, 66.95, 63.13],
    ['2023/05/09', 63.64, 66.3, 67.41, 63.09],
    ['2023/05/10', 66.82, 65.72, 67.23, 64.94],
    ['2023/05/11', 65.4, 66.26, 66.91, 63.76],
    ['2023/05/12', 66.22, 64.85, 67.14, 61.28],
    ['2023/05/15', 65.11, 66.21, 66.62, 64.78],
    ['2023/05/16', 65.48, 65.0, 66.82, 63.68],
    ['2023/05/17', 65.18, 68.0, 68.8, 64.9],
    ['2023/05/18', 68.71, 68.81, 68.99, 66.22],
    ['2023/05/19', 69.38, 69.48, 69.88, 67.74],
    ['2023/05/22', 69.83, 71.08, 71.9, 66.38],
    ['2023/05/23', 71.19, 71.39, 72.84, 69.94],
    ['2023/05/24', 70.58, 73.46, 73.8, 70.05],
    ['2023/05/25', 73.9, 75.06, 75.36, 72.86],
    ['2023/05/26', 74.95, 80.03, 81.66, 74.55],
    ['2023/05/30', 80.43, 83.22, 83.3, 80.04],
    ['2023/05/31', 83.19, 81.49, 83.37, 80.58],
    ['2023/06/01', 81.13, 84.47, 84.99, 81.13],
    ['2023/06/02', 84.12, 82.29, 85.9, 81.96],
    ['2023/06/05', 82.25, 85.4, 86.14, 81.02],
    ['2023/06/06', 84.68, 83.75, 87.04, 83.42],
    ['2023/06/07', 83.75, 85.67, 88.49, 83.75],
    ['2023/06/08', 85.43, 84.76, 86.34, 84.14],
    ['2023/06/09', 85.37, 84.27, 85.37, 83.22],
    ['2023/06/12', 84.24, 84.11, 85.22, 84.08],
    ['2023/06/13', 84.37, 82.82, 85.4, 82.59],
    ['2023/06/14', 82.6, 84.0, 85.28, 81.46],
    ['2023/06/15', 83.88, 84.69, 85.21, 83.88],
    ['2023/06/16', 85.51, 84.46, 85.51, 83.79],
    ['2023/06/20', 84.26, 88.09, 88.5, 83.6],
    ['2023/06/21', 88.01, 88.96, 90.64, 86.66],
    ['2023/06/22', 88.08, 86.57, 88.52, 85.47],
    ['2023/06/23', 84.99, 86.43, 87.6, 83.02],
    ['2023/06/26', 85.76, 85.76, 87.99, 85.57],
    ['2023/06/27', 85.89, 89.35, 89.64, 85.89],
    ['2023/06/28', 88.93, 90.66, 92.88, 88.93],
    ['2023/06/29', 90.66, 91.65, 93.93, 90.66],
    ['2023/06/30', 92.19, 92.95, 94.09, 91.92],
    ['2023/07/03', 92.87, 91.35, 92.95, 90.03],
    ['2023/07/05', 91.25, 87.57, 91.25, 86.32],
    ['2023/07/06', 87.22, 85.25, 87.22, 85.08],
    ['2023/07/07', 85.7, 100.07, 101.99, 85.2],
    ['2023/07/10', 99.69, 107.4, 108.93, 99.69],
    ['2023/07/11', 107.41, 104.61, 108.31, 101.09],
    ['2023/07/12', 106.07, 103.11, 106.07, 102.11],
    ['2023/07/13', 103.16, 108.92, 108.92, 103.16],
    ['2023/07/14', 108.99, 103.07, 110.0, 101.65],
    ['2023/07/17', 103.45, 103.37, 105.36, 102.65],
    ['2023/07/18', 103.07, 103.2, 104.49, 102.25],
    ['2023/07/19', 103.2, 99.44, 104.59, 99.12],
    ['2023/07/20', 98.77, 95.33, 100.12, 94.46],
    ['2023/07/21', 95.7, 94.99, 95.7, 92.49],
    ['2023/07/24', 94.99, 96.07, 96.84, 92.83],
    ['2023/07/25', 96.08, 95.57, 99.33, 95.22],
    ['2023/07/26', 95.68, 98.48, 99.77, 95.68],
    ['2023/07/27', 98.62, 94.64, 100.41, 94.64],
    ['2023/07/28', 95.55, 95.65, 97.9, 95.21],
    ['2023/07/31', 96.4, 99.51, 99.7, 96.27],
    ['2023/08/01', 98.68, 97.56, 101.18, 96.91],
    ['2023/08/02', 97.3, 95.71, 98.07, 95.17],
    ['2023/08/03', 94.81, 93.75, 95.49, 92.6],
    ['2023/08/04', 94.71, 92.53, 94.71, 92.26],
    ['2023/08/07', 92.66, 94.54, 94.61, 91.89],
    ['2023/08/08', 93.38, 95.37, 96.64, 92.94],
    ['2023/08/09', 95.32, 92.73, 95.59, 92.18],
    ['2023/08/10', 93.53, 94.83, 95.07, 93.03],
]);
var volumes = [
    67000.0,
    72300.0,
    141500.0,
    144000.0,
    121600.0,
    85900.0,
    130000.0,
    59600.0,
    64200.0,
    59400.0,
    86800.0,
    129200.0,
    153300.0,
    63800.0,
    66500.0,
    58400.0,
    76600.0,
    141200.0,
    90100.0,
    44900.0,
    44100.0,
    90900.0,
    70300.0,
    47200.0,
    137300.0,
    110500.0,
    84700.0,
    99200.0,
    87200.0,
    89900.0,
    72900.0,
    107400.0,
    95400.0,
    55500.0,
    126600.0,
    82400.0,
    106800.0,
    48700.0,
    42500.0,
    66100.0,
    57900.0,
    39300.0,
    42800.0,
    82200.0,
    45100.0,
    47400.0,
    48000.0,
    49300.0,
    50600.0,
    55200.0,
    77700.0,
    78100.0,
    74600.0,
    52200.0,
    38800.0,
    53800.0,
    62600.0,
    61000.0,
    85900.0,
    106600.0,
    139100.0,
    148500.0,
    90800.0,
    189100.0,
    301400.0,
    200500.0,
    91300.0,
    89400.0,
    110900.0,
    110500.0,
    68200.0,
    60900.0,
    48400.0,
    25600.0,
    44900.0,
    71200.0,
    140300.0,
    140000.0,
    78900.0,
    108200.0,
    76700.0,
    85100.0,
    90900.0,
    59900.0,
    47400.0,
    78500.0,
    85700.0,
    73900.0,
    117400.0,
    252000.0,
    98300.0,
    202700.0,
    86500.0,
    102200.0,
    123600.0,
    103700.0,
    110000.0,
    179300.0,
    162600.0,
    192100.0,
    242400.0,
    992400.0,
    380000.0,
    535600.0,
    268200.0,
    171300.0,
    160600.0,
    122800.0,
    141500.0,
    139400.0,
    91100.0,
    88900.0,
    167300.0,
    148100.0,
    95900.0,
    127700.0,
    169000.0,
    83500.0,
    148100.0,
    132400.0,
    150700.0,
    97200.0,
    129300.0,
    72000.0,
    99800.0,
    111200.0,
    89600.0,
    117500.0,
    279700.0,
    140500.0,
    251700.0,
    96500.0,
    117700.0,
    136900.0,
    122100.0,
    105900.0,
    152400.0,
    122300.0,
    88800.0,
    179700.0,
    126500.0,
    267600.0,
    120000.0,
    95100.0,
    155000.0,
    145300.0,
    95000.0,
    152600.0,
    113300.0,
    197600.0,
    150900.0,
    196900.0,
    130600.0,
    247800.0,
    219600.0,
    311400.0,
    187300.0,
    114700.0,
    135600.0,
    130400.0,
    142300.0,
    223100.0,
    526600.0,
    443700.0,
    243000.0,
    1816500.0,
    384000.0,
    208900.0,
    362200.0,
    165600.0,
    134100.0,
    141300.0,
    98400.0,
    88900.0,
    64900.0,
    154100.0,
    148500.0,
    81200.0,
    129800.0,
    113900.0,
    92400.0,
    127700.0,
    132600.0,
    91600.0,
    88600.0,
    76700.0,
    84200.0,
    86100.0,
    172100.0,
    80500.0,
    129000.0,
    116200.0,
    116400.0,
    65800.0,
    119600.0,
    83700.0,
    109400.0,
    103500.0,
    135300.0,
    101400.0,
    92800.0,
    121500.0,
    100800.0,
    148400.0,
    102600.0,
    110800.0,
    124000.0,
    85200.0,
    70900.0,
    100000.0,
    136500.0,
    94900.0,
    164500.0,
    107500.0,
    140600.0,
    95500.0,
    281500.0,
    69800.0,
    69300.0,
    83900.0,
    108400.0,
    165200.0,
    58500.0,
    126900.0,
    193400.0,
    441900.0,
    370500.0,
    195800.0,
    145600.0,
    145500.0,
    185500.0,
    105900.0,
    122000.0,
    124000.0,
    147000.0,
    116900.0,
    147400.0,
    112000.0,
    68600.0,
    97200.0,
    68300.0,
    107700.0,
    117300.0,
    70600.0,
    84700.0,
    48500.0,
    61600.0,
    55700.0,
    59800.0,
    47300.0,
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
     *     text: "KRUS",
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