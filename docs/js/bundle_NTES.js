/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_NTES");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/03', 88.93, 88.84, 89.64, 87.08],
    ['2022/08/04', 87.87, 87.36, 88.61, 85.98],
    ['2022/08/05', 85.8, 87.34, 87.56, 85.69],
    ['2022/08/08', 87.34, 87.81, 88.9, 86.9],
    ['2022/08/09', 87.36, 87.73, 88.47, 86.92],
    ['2022/08/10', 86.27, 88.16, 88.31, 86.27],
    ['2022/08/11', 89.76, 89.83, 91.55, 89.16],
    ['2022/08/12', 87.6, 90.19, 90.33, 87.6],
    ['2022/08/15', 88.86, 90.73, 91.06, 88.58],
    ['2022/08/16', 89.32, 91.46, 91.81, 89.32],
    ['2022/08/17', 90.43, 89.89, 91.27, 89.61],
    ['2022/08/18', 93.06, 84.52, 93.24, 83.44],
    ['2022/08/19', 83.84, 83.14, 84.24, 82.69],
    ['2022/08/22', 84.26, 84.14, 85.89, 83.96],
    ['2022/08/23', 85.0, 85.94, 86.37, 84.24],
    ['2022/08/24', 84.57, 86.56, 88.22, 84.47],
    ['2022/08/25', 89.19, 90.48, 91.21, 88.16],
    ['2022/08/26', 94.04, 88.4, 94.44, 88.16],
    ['2022/08/29', 87.3, 85.94, 88.54, 85.78],
    ['2022/08/30', 85.73, 85.35, 86.68, 84.49],
    ['2022/08/31', 89.22, 87.24, 90.47, 87.05],
    ['2022/09/01', 87.17, 86.86, 88.21, 86.18],
    ['2022/09/02', 88.27, 87.25, 88.66, 86.99],
    ['2022/09/06', 86.92, 85.54, 87.94, 85.45],
    ['2022/09/07', 84.67, 85.97, 86.2, 84.49],
    ['2022/09/08', 83.13, 84.27, 84.39, 81.91],
    ['2022/09/09', 85.65, 86.23, 87.36, 85.33],
    ['2022/09/12', 86.25, 86.2, 86.78, 85.31],
    ['2022/09/13', 85.97, 86.14, 87.55, 85.56],
    ['2022/09/14', 85.38, 84.19, 85.95, 83.47],
    ['2022/09/15', 83.74, 82.99, 84.36, 82.75],
    ['2022/09/16', 82.66, 81.52, 82.9, 80.97],
    ['2022/09/19', 80.22, 81.61, 81.67, 79.71],
    ['2022/09/20', 82.26, 82.77, 83.82, 82.04],
    ['2022/09/21', 79.81, 78.61, 80.68, 78.05],
    ['2022/09/22', 78.73, 77.82, 79.97, 77.82],
    ['2022/09/23', 76.73, 76.44, 76.96, 75.17],
    ['2022/09/26', 76.84, 76.76, 77.97, 76.68],
    ['2022/09/27', 77.38, 76.85, 78.89, 76.37],
    ['2022/09/28', 75.2, 76.93, 77.34, 75.02],
    ['2022/09/29', 74.29, 74.1, 74.96, 73.34],
    ['2022/09/30', 74.23, 74.51, 75.66, 74.07],
    ['2022/10/03', 74.05, 75.36, 75.97, 73.95],
    ['2022/10/04', 76.99, 78.77, 79.98, 76.57],
    ['2022/10/05', 79.0, 78.96, 80.61, 78.15],
    ['2022/10/06', 78.96, 78.65, 80.33, 78.56],
    ['2022/10/07', 77.51, 76.9, 78.06, 76.27],
    ['2022/10/10', 76.16, 74.08, 76.28, 73.91],
    ['2022/10/11', 72.61, 71.83, 72.94, 70.55],
    ['2022/10/12', 71.25, 70.86, 72.52, 70.5],
    ['2022/10/13', 67.32, 70.15, 70.82, 66.81],
    ['2022/10/14', 69.7, 67.62, 70.21, 66.85],
    ['2022/10/17', 68.64, 70.15, 71.65, 68.64],
    ['2022/10/18', 71.64, 69.67, 72.12, 68.84],
    ['2022/10/19', 67.77, 66.08, 68.49, 65.89],
    ['2022/10/20', 63.46, 63.76, 66.29, 62.13],
    ['2022/10/21', 59.84, 61.53, 61.85, 59.61],
    ['2022/10/24', 54.8, 55.47, 56.42, 52.33],
    ['2022/10/25', 57.15, 56.5, 58.6, 56.26],
    ['2022/10/26', 56.54, 57.98, 59.09, 56.41],
    ['2022/10/27', 56.47, 55.91, 57.77, 55.37],
    ['2022/10/28', 53.34, 54.61, 54.74, 53.09],
    ['2022/10/31', 54.22, 54.82, 55.77, 53.93],
    ['2022/11/01', 58.5, 58.71, 59.3, 57.19],
    ['2022/11/02', 58.85, 58.44, 60.09, 58.14],
    ['2022/11/03', 56.52, 58.3, 59.28, 56.48],
    ['2022/11/04', 62.62, 61.62, 63.33, 60.55],
    ['2022/11/07', 62.87, 61.73, 63.72, 60.85],
    ['2022/11/08', 60.15, 61.24, 62.13, 58.77],
    ['2022/11/09', 59.89, 58.37, 60.31, 58.15],
    ['2022/11/10', 61.21, 61.38, 62.39, 60.95],
    ['2022/11/11', 63.66, 63.83, 64.58, 62.99],
    ['2022/11/14', 65.05, 64.3, 65.93, 63.57],
    ['2022/11/15', 68.68, 70.57, 71.65, 68.34],
    ['2022/11/16', 73.69, 70.31, 73.88, 69.75],
    ['2022/11/17', 71.65, 69.98, 73.9, 68.46],
    ['2022/11/18', 68.01, 66.47, 68.03, 65.38],
    ['2022/11/21', 65.11, 65.33, 66.11, 63.99],
    ['2022/11/22', 63.13, 64.56, 64.85, 62.34],
    ['2022/11/23', 66.04, 65.67, 67.04, 65.26],
    ['2022/11/25', 64.57, 64.69, 65.89, 64.56],
    ['2022/11/28', 64.29, 66.0, 67.69, 64.29],
    ['2022/11/29', 68.64, 67.79, 70.31, 67.45],
    ['2022/11/30', 69.59, 70.1, 70.95, 68.13],
    ['2022/12/01', 68.34, 67.68, 68.8, 66.78],
    ['2022/12/02', 67.02, 70.31, 71.2, 66.87],
    ['2022/12/05', 70.71, 68.45, 71.8, 67.8],
    ['2022/12/06', 68.42, 67.64, 68.8, 66.72],
    ['2022/12/07', 65.84, 67.83, 68.93, 65.77],
    ['2022/12/08', 70.98, 70.62, 72.34, 70.24],
    ['2022/12/09', 70.62, 69.59, 71.49, 69.46],
    ['2022/12/12', 69.51, 68.77, 69.86, 67.36],
    ['2022/12/13', 71.03, 69.41, 72.22, 68.91],
    ['2022/12/14', 70.55, 72.37, 72.99, 70.25],
    ['2022/12/15', 72.95, 70.71, 74.3, 70.45],
    ['2022/12/16', 70.71, 70.71, 71.45, 69.69],
    ['2022/12/19', 70.72, 70.37, 71.15, 69.77],
    ['2022/12/20', 67.58, 69.13, 69.21, 67.4],
    ['2022/12/21', 69.37, 71.68, 72.02, 69.13],
    ['2022/12/22', 72.38, 71.58, 73.46, 71.01],
    ['2022/12/23', 71.54, 70.5, 72.15, 70.0],
    ['2022/12/27', 71.58, 72.53, 73.36, 71.37],
    ['2022/12/28', 73.1, 71.08, 73.72, 70.75],
    ['2022/12/29', 71.21, 72.54, 72.85, 70.81],
    ['2022/12/30', 71.99, 72.03, 73.33, 71.48],
    ['2023/01/03', 75.58, 75.82, 77.31, 74.75],
    ['2023/01/04', 79.83, 81.89, 82.25, 78.78],
    ['2023/01/05', 79.91, 81.38, 82.09, 79.56],
    ['2023/01/06', 80.59, 80.83, 82.31, 80.44],
    ['2023/01/09', 82.31, 78.86, 82.52, 78.78],
    ['2023/01/10', 80.43, 81.92, 82.4, 80.26],
    ['2023/01/11', 80.76, 83.4, 84.14, 80.65],
    ['2023/01/12', 83.38, 84.56, 84.75, 82.88],
    ['2023/01/13', 85.51, 87.63, 88.72, 85.29],
    ['2023/01/17', 86.38, 88.32, 89.1, 86.28],
    ['2023/01/18', 90.57, 87.77, 91.2, 87.75],
    ['2023/01/19', 87.87, 88.51, 89.73, 87.87],
    ['2023/01/20', 89.14, 88.35, 89.55, 87.42],
    ['2023/01/23', 88.82, 89.53, 90.87, 88.76],
    ['2023/01/24', 89.11, 89.2, 90.49, 88.9],
    ['2023/01/25', 89.01, 89.55, 89.7, 88.11],
    ['2023/01/26', 91.91, 91.52, 92.42, 90.32],
    ['2023/01/27', 91.08, 90.89, 91.38, 90.21],
    ['2023/01/30', 88.88, 88.84, 89.95, 88.34],
    ['2023/01/31', 88.83, 87.88, 89.06, 87.67],
    ['2023/02/01', 90.52, 91.01, 91.68, 89.21],
    ['2023/02/02', 90.14, 89.98, 90.92, 88.96],
    ['2023/02/03', 90.5, 89.15, 90.79, 89.1],
    ['2023/02/06', 86.7, 87.63, 88.24, 86.56],
    ['2023/02/07', 89.07, 87.59, 89.36, 86.6],
    ['2023/02/08', 89.37, 87.63, 89.59, 87.03],
    ['2023/02/09', 89.95, 88.46, 91.04, 88.16],
    ['2023/02/10', 87.04, 85.98, 87.83, 85.91],
    ['2023/02/13', 87.63, 87.13, 88.34, 87.06],
    ['2023/02/14', 86.67, 86.04, 86.67, 85.26],
    ['2023/02/15', 84.85, 85.65, 85.86, 84.11],
    ['2023/02/16', 86.68, 87.08, 88.16, 86.47],
    ['2023/02/17', 85.58, 85.13, 86.18, 84.61],
    ['2023/02/21', 84.06, 84.5, 85.58, 83.2],
    ['2023/02/22', 84.6, 85.34, 85.71, 84.2],
    ['2023/02/23', 87.27, 82.2, 89.06, 79.5],
    ['2023/02/24', 78.34, 77.99, 80.06, 77.03],
    ['2023/02/27', 78.94, 78.33, 79.29, 77.45],
    ['2023/02/28', 76.51, 77.0, 77.6, 76.21],
    ['2023/03/01', 82.46, 80.84, 82.66, 80.6],
    ['2023/03/02', 82.46, 84.88, 85.85, 82.13],
    ['2023/03/03', 85.42, 85.19, 87.15, 85.07],
    ['2023/03/06', 85.52, 85.74, 86.56, 84.86],
    ['2023/03/07', 84.85, 83.11, 84.89, 82.54],
    ['2023/03/08', 81.67, 82.64, 83.13, 81.66],
    ['2023/03/09', 80.94, 81.0, 82.8, 80.78],
    ['2023/03/10', 80.97, 82.41, 83.16, 80.97],
    ['2023/03/13', 82.12, 83.34, 84.49, 82.12],
    ['2023/03/14', 82.52, 84.88, 84.9, 82.27],
    ['2023/03/15', 83.31, 83.4, 84.41, 82.08],
    ['2023/03/16', 82.45, 85.08, 85.1, 82.45],
    ['2023/03/17', 86.46, 85.43, 87.03, 84.73],
    ['2023/03/20', 84.18, 85.43, 86.14, 84.04],
    ['2023/03/21', 85.14, 85.64, 85.79, 84.63],
    ['2023/03/22', 85.59, 84.74, 86.23, 84.47],
    ['2023/03/23', 88.45, 89.64, 90.43, 88.03],
    ['2023/03/24', 88.59, 88.95, 90.0, 88.39],
    ['2023/03/27', 87.23, 87.9, 88.05, 86.97],
    ['2023/03/28', 89.54, 90.23, 90.73, 88.99],
    ['2023/03/29', 88.3, 87.93, 88.44, 86.98],
    ['2023/03/30', 87.19, 88.14, 88.65, 87.17],
    ['2023/03/31', 87.63, 87.99, 89.03, 87.63],
    ['2023/04/03', 87.99, 89.3, 89.63, 87.99],
    ['2023/04/04', 89.04, 89.83, 90.42, 89.04],
    ['2023/04/05', 89.84, 88.18, 90.08, 87.81],
    ['2023/04/06', 88.75, 89.3, 89.6, 88.27],
    ['2023/04/10', 88.33, 88.57, 89.11, 88.05],
    ['2023/04/11', 89.35, 88.55, 89.61, 88.46],
    ['2023/04/12', 88.49, 87.59, 89.24, 87.26],
    ['2023/04/13', 89.34, 89.6, 90.09, 89.13],
    ['2023/04/14', 91.53, 89.98, 91.92, 89.55],
    ['2023/04/17', 92.04, 94.02, 94.51, 91.84],
    ['2023/04/18', 93.63, 92.08, 93.85, 91.78],
    ['2023/04/19', 89.63, 90.73, 92.09, 89.21],
    ['2023/04/20', 90.84, 90.86, 92.19, 90.29],
    ['2023/04/21', 89.76, 89.74, 90.66, 89.46],
    ['2023/04/24', 90.82, 89.82, 91.28, 89.74],
    ['2023/04/25', 87.41, 84.12, 87.45, 83.32],
    ['2023/04/26', 85.77, 85.44, 86.43, 85.24],
    ['2023/04/27', 85.44, 88.08, 88.53, 85.44],
    ['2023/04/28', 88.15, 88.68, 89.46, 87.95],
    ['2023/05/01', 87.73, 88.58, 89.11, 87.73],
    ['2023/05/02', 88.11, 88.6, 88.82, 87.33],
    ['2023/05/03', 88.44, 87.54, 88.49, 86.77],
    ['2023/05/04', 87.47, 88.36, 89.21, 87.24],
    ['2023/05/05', 87.94, 88.44, 88.91, 87.17],
    ['2023/05/08', 89.31, 90.68, 90.79, 89.22],
    ['2023/05/09', 87.19, 86.89, 88.01, 86.15],
    ['2023/05/10', 88.09, 88.29, 89.38, 86.94],
    ['2023/05/11', 87.67, 87.94, 88.23, 86.14],
    ['2023/05/12', 86.52, 84.75, 86.71, 84.46],
    ['2023/05/15', 87.26, 89.42, 89.6, 86.67],
    ['2023/05/16', 87.79, 89.18, 89.21, 87.75],
    ['2023/05/17', 87.93, 87.72, 88.35, 87.02],
    ['2023/05/18', 88.84, 86.6, 88.9, 86.28],
    ['2023/05/19', 87.66, 86.99, 87.81, 86.44],
    ['2023/05/22', 89.17, 88.08, 89.44, 88.08],
    ['2023/05/23', 85.69, 83.34, 85.83, 83.23],
    ['2023/05/24', 82.8, 83.07, 83.65, 81.93],
    ['2023/05/25', 83.08, 85.29, 87.05, 80.38],
    ['2023/05/26', 87.03, 89.05, 90.56, 86.95],
    ['2023/05/30', 87.3, 84.54, 89.33, 83.7],
    ['2023/05/31', 84.31, 84.65, 84.75, 82.47],
    ['2023/06/01', 83.47, 85.34, 85.85, 83.47],
    ['2023/06/02', 87.21, 86.17, 88.26, 85.98],
    ['2023/06/05', 85.29, 86.29, 86.95, 84.79],
    ['2023/06/06', 87.52, 90.92, 91.17, 87.12],
    ['2023/06/07', 90.75, 90.95, 93.49, 90.75],
    ['2023/06/08', 91.22, 92.2, 92.37, 91.22],
    ['2023/06/09', 93.34, 92.3, 93.62, 92.11],
    ['2023/06/12', 92.23, 93.37, 93.66, 92.23],
    ['2023/06/13', 95.78, 95.42, 96.96, 94.69],
    ['2023/06/14', 97.03, 98.64, 99.09, 96.48],
    ['2023/06/15', 98.39, 98.14, 99.28, 97.64],
    ['2023/06/16', 98.14, 98.45, 99.78, 97.9],
    ['2023/06/20', 96.8, 95.25, 96.96, 95.12],
    ['2023/06/21', 94.88, 94.98, 96.15, 94.88],
    ['2023/06/22', 94.96, 94.48, 95.11, 94.16],
    ['2023/06/23', 93.0, 93.07, 93.21, 92.35],
    ['2023/06/26', 92.79, 92.5, 94.27, 92.26],
    ['2023/06/27', 97.05, 96.84, 97.46, 95.89],
    ['2023/06/28', 96.49, 96.14, 97.79, 95.78],
    ['2023/06/29', 96.46, 97.99, 98.03, 96.36],
    ['2023/06/30', 97.47, 96.69, 98.19, 96.3],
    ['2023/07/03', 99.24, 99.31, 100.66, 98.81],
    ['2023/07/05', 98.14, 98.13, 98.49, 97.59],
    ['2023/07/06', 97.03, 95.78, 97.03, 95.31],
    ['2023/07/07', 95.37, 96.45, 96.91, 95.15],
    ['2023/07/10', 96.26, 97.36, 97.83, 96.09],
    ['2023/07/11', 97.36, 98.65, 100.07, 97.36],
    ['2023/07/12', 101.81, 102.8, 102.82, 101.29],
    ['2023/07/13', 104.82, 104.95, 105.16, 104.09],
    ['2023/07/14', 106.0, 105.34, 106.12, 104.8],
    ['2023/07/17', 104.41, 106.22, 106.32, 103.7],
    ['2023/07/18', 105.32, 103.25, 105.8, 102.05],
    ['2023/07/19', 103.75, 102.91, 104.34, 102.79],
    ['2023/07/20', 101.97, 102.49, 102.63, 101.31],
    ['2023/07/21', 102.32, 102.21, 102.81, 101.78],
    ['2023/07/24', 101.63, 105.58, 105.76, 101.39],
    ['2023/07/25', 107.0, 106.19, 107.43, 105.44],
    ['2023/07/26', 107.0, 108.99, 109.84, 106.68],
    ['2023/07/27', 109.31, 107.0, 109.48, 106.57],
    ['2023/07/28', 108.94, 108.5, 108.94, 107.0],
    ['2023/07/31', 107.99, 108.74, 109.88, 107.58],
    ['2023/08/01', 108.63, 109.67, 110.8, 108.18],
    ['2023/08/02', 107.09, 106.81, 107.44, 105.54],
]);
var volumes = [
    2182900.0,
    1709900.0,
    1259100.0,
    1206700.0,
    950600.0,
    1139100.0,
    946200.0,
    1121900.0,
    1010000.0,
    1534100.0,
    1413400.0,
    3301900.0,
    1540100.0,
    2186300.0,
    1392200.0,
    840600.0,
    1689100.0,
    2063500.0,
    1046000.0,
    1281200.0,
    1755000.0,
    1574500.0,
    1197400.0,
    950000.0,
    1123300.0,
    1594300.0,
    902900.0,
    1202700.0,
    1762600.0,
    1916900.0,
    1308500.0,
    2214000.0,
    938700.0,
    1025200.0,
    1601000.0,
    1045500.0,
    1418000.0,
    1170500.0,
    927000.0,
    1334700.0,
    1602800.0,
    1218600.0,
    1080800.0,
    1270700.0,
    787700.0,
    1133000.0,
    863100.0,
    1107200.0,
    1655100.0,
    1163900.0,
    1187200.0,
    1434900.0,
    1471900.0,
    1231700.0,
    1285300.0,
    3485100.0,
    3790500.0,
    5906400.0,
    2865400.0,
    4070900.0,
    1889000.0,
    2436000.0,
    1865100.0,
    2916100.0,
    2739200.0,
    1504300.0,
    3519700.0,
    1593300.0,
    1349800.0,
    1678400.0,
    1915900.0,
    1555200.0,
    1331200.0,
    3121100.0,
    3585300.0,
    4510300.0,
    2536100.0,
    1491200.0,
    1161400.0,
    1202700.0,
    994800.0,
    1591700.0,
    2446700.0,
    3378500.0,
    1774500.0,
    2102700.0,
    2459200.0,
    1988100.0,
    1808000.0,
    1861900.0,
    1171200.0,
    1559300.0,
    1698200.0,
    2217300.0,
    2230300.0,
    9540900.0,
    1314400.0,
    1737400.0,
    1557300.0,
    1048000.0,
    1110000.0,
    1466300.0,
    1811100.0,
    1332800.0,
    1110900.0,
    2376500.0,
    2095400.0,
    1125000.0,
    2166100.0,
    2473200.0,
    1909800.0,
    3019700.0,
    1135600.0,
    2354400.0,
    3982000.0,
    1512300.0,
    858800.0,
    1358600.0,
    911900.0,
    944400.0,
    873500.0,
    1071500.0,
    815800.0,
    1364700.0,
    1262500.0,
    1156300.0,
    1323500.0,
    1044100.0,
    1959400.0,
    1894000.0,
    2386000.0,
    1583900.0,
    905100.0,
    1150900.0,
    1019100.0,
    1174200.0,
    1786200.0,
    716200.0,
    1882100.0,
    1588300.0,
    3580300.0,
    2801400.0,
    1490400.0,
    1531500.0,
    3741100.0,
    2833800.0,
    1381500.0,
    1012100.0,
    1957800.0,
    954900.0,
    1651600.0,
    1026300.0,
    906700.0,
    807600.0,
    1221500.0,
    967100.0,
    1193700.0,
    987600.0,
    682900.0,
    824300.0,
    1561600.0,
    695700.0,
    848200.0,
    1275200.0,
    1716600.0,
    1107200.0,
    913100.0,
    1393800.0,
    1267900.0,
    888100.0,
    811600.0,
    720200.0,
    708100.0,
    1248800.0,
    1750100.0,
    1737900.0,
    1693500.0,
    1493700.0,
    1755300.0,
    574000.0,
    866200.0,
    1045300.0,
    2185300.0,
    852000.0,
    1467900.0,
    799100.0,
    430900.0,
    1359400.0,
    793200.0,
    1210700.0,
    608700.0,
    746500.0,
    1070300.0,
    1111100.0,
    1347600.0,
    1028000.0,
    2005500.0,
    846500.0,
    802700.0,
    861500.0,
    1478200.0,
    1062300.0,
    1431900.0,
    1956400.0,
    1901400.0,
    1199600.0,
    1958900.0,
    1244900.0,
    1558500.0,
    1144900.0,
    826000.0,
    1317400.0,
    978600.0,
    526100.0,
    998200.0,
    552100.0,
    924900.0,
    1707200.0,
    1787900.0,
    1372400.0,
    946600.0,
    670200.0,
    1004700.0,
    642500.0,
    640500.0,
    2784100.0,
    1514100.0,
    1409000.0,
    1425700.0,
    765700.0,
    733800.0,
    874000.0,
    960100.0,
    763700.0,
    850600.0,
    1547000.0,
    1490200.0,
    1501000.0,
    958200.0,
    1117200.0,
    890700.0,
    848200.0,
    1294100.0,
    1317300.0,
    1330600.0,
    939200.0,
    606200.0,
    1126000.0,
    737800.0,
    644000.0,
    796200.0,
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
        text: "NTES",
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