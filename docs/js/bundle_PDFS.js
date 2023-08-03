/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_PDFS");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/03', 27.03, 27.69, 27.72, 26.85],
    ['2022/08/04', 27.67, 28.0, 28.02, 27.45],
    ['2022/08/05', 27.57, 27.67, 27.96, 27.43],
    ['2022/08/08', 27.79, 26.96, 28.14, 26.71],
    ['2022/08/09', 26.72, 26.24, 27.24, 25.93],
    ['2022/08/10', 27.09, 27.21, 27.32, 26.56],
    ['2022/08/11', 27.57, 27.38, 28.99, 26.94],
    ['2022/08/12', 27.62, 28.38, 30.31, 27.62],
    ['2022/08/15', 28.12, 29.11, 29.17, 28.0],
    ['2022/08/16', 28.45, 27.63, 28.78, 27.18],
    ['2022/08/17', 27.0, 27.26, 27.63, 26.8],
    ['2022/08/18', 27.02, 27.54, 27.73, 27.02],
    ['2022/08/19', 27.14, 27.04, 27.16, 26.79],
    ['2022/08/22', 26.71, 26.75, 26.82, 26.46],
    ['2022/08/23', 26.65, 26.76, 27.15, 26.52],
    ['2022/08/24', 26.93, 27.04, 27.19, 26.6],
    ['2022/08/25', 27.22, 28.13, 28.16, 27.22],
    ['2022/08/26', 27.9, 27.08, 28.2, 27.08],
    ['2022/08/29', 27.06, 26.78, 27.31, 26.73],
    ['2022/08/30', 26.54, 26.27, 26.95, 25.04],
    ['2022/08/31', 26.56, 26.38, 26.78, 25.89],
    ['2022/09/01', 25.87, 25.31, 25.87, 24.87],
    ['2022/09/02', 25.36, 25.0, 25.61, 24.85],
    ['2022/09/06', 25.0, 24.78, 25.0, 24.23],
    ['2022/09/07', 24.97, 25.75, 25.97, 24.78],
    ['2022/09/08', 25.47, 25.86, 26.01, 24.71],
    ['2022/09/09', 25.9, 26.29, 26.47, 25.81],
    ['2022/09/12', 26.29, 26.42, 26.45, 26.02],
    ['2022/09/13', 25.61, 25.22, 26.17, 25.17],
    ['2022/09/14', 25.25, 25.25, 25.52, 24.94],
    ['2022/09/15', 25.09, 24.96, 25.19, 24.59],
    ['2022/09/16', 24.58, 25.36, 25.48, 24.3],
    ['2022/09/19', 25.06, 25.2, 25.31, 24.48],
    ['2022/09/20', 25.02, 24.7, 25.24, 24.49],
    ['2022/09/21', 24.9, 24.8, 25.39, 24.5],
    ['2022/09/22', 24.76, 24.07, 24.76, 23.75],
    ['2022/09/23', 23.82, 23.5, 23.82, 23.25],
    ['2022/09/26', 23.36, 23.3, 23.85, 23.22],
    ['2022/09/27', 23.67, 23.99, 24.13, 23.46],
    ['2022/09/28', 23.99, 24.62, 24.76, 23.7],
    ['2022/09/29', 24.23, 24.84, 25.05, 23.72],
    ['2022/09/30', 24.55, 24.53, 25.5, 24.45],
    ['2022/10/03', 24.57, 25.37, 25.69, 24.57],
    ['2022/10/04', 26.06, 26.17, 26.34, 25.95],
    ['2022/10/05', 25.88, 26.22, 26.38, 25.79],
    ['2022/10/06', 26.21, 26.44, 26.7, 26.21],
    ['2022/10/07', 25.88, 24.85, 26.26, 24.63],
    ['2022/10/10', 24.68, 24.07, 24.8, 23.81],
    ['2022/10/11', 23.92, 23.49, 24.0, 23.17],
    ['2022/10/12', 23.57, 22.52, 23.57, 22.48],
    ['2022/10/13', 21.91, 22.63, 22.77, 21.46],
    ['2022/10/14', 22.91, 21.44, 23.15, 21.36],
    ['2022/10/17', 21.85, 22.23, 22.42, 21.47],
    ['2022/10/18', 22.67, 21.97, 22.91, 21.59],
    ['2022/10/19', 21.7, 21.78, 22.06, 21.5],
    ['2022/10/20', 21.76, 22.25, 22.71, 21.42],
    ['2022/10/21', 22.45, 23.1, 23.31, 22.28],
    ['2022/10/24', 23.13, 22.96, 23.26, 22.57],
    ['2022/10/25', 23.06, 23.53, 23.91, 23.06],
    ['2022/10/26', 23.41, 23.41, 24.01, 23.39],
    ['2022/10/27', 23.47, 23.01, 23.63, 22.93],
    ['2022/10/28', 23.21, 23.99, 24.18, 23.21],
    ['2022/10/31', 23.73, 23.58, 23.9, 23.51],
    ['2022/11/01', 23.82, 24.22, 24.33, 23.65],
    ['2022/11/02', 24.25, 23.14, 24.38, 23.09],
    ['2022/11/03', 22.71, 22.84, 23.46, 22.34],
    ['2022/11/04', 23.26, 23.43, 23.47, 22.7],
    ['2022/11/07', 23.61, 23.65, 23.79, 23.07],
    ['2022/11/08', 23.94, 23.56, 23.94, 23.23],
    ['2022/11/09', 23.4, 23.26, 23.5, 22.85],
    ['2022/11/10', 24.48, 25.09, 25.09, 23.97],
    ['2022/11/11', 26.74, 29.79, 31.13, 26.59],
    ['2022/11/14', 29.59, 29.76, 30.66, 28.82],
    ['2022/11/15', 29.82, 29.95, 30.15, 29.06],
    ['2022/11/16', 29.32, 30.17, 30.42, 29.11],
    ['2022/11/17', 29.64, 30.48, 30.69, 29.32],
    ['2022/11/18', 30.95, 29.63, 30.99, 29.47],
    ['2022/11/21', 29.51, 29.8, 29.92, 29.25],
    ['2022/11/22', 29.84, 30.03, 30.15, 29.21],
    ['2022/11/23', 29.91, 30.4, 30.48, 29.66],
    ['2022/11/25', 30.14, 30.24, 30.56, 29.92],
    ['2022/11/28', 30.14, 30.03, 30.39, 29.8],
    ['2022/11/29', 30.18, 30.17, 30.29, 29.85],
    ['2022/11/30', 30.1, 31.37, 31.37, 29.85],
    ['2022/12/01', 31.33, 31.8, 32.56, 31.25],
    ['2022/12/02', 31.18, 31.61, 31.9, 30.85],
    ['2022/12/05', 31.34, 31.53, 31.63, 30.98],
    ['2022/12/06', 31.6, 30.64, 31.98, 30.23],
    ['2022/12/07', 30.46, 30.07, 30.95, 30.03],
    ['2022/12/08', 30.27, 30.47, 30.96, 30.06],
    ['2022/12/09', 30.42, 29.93, 30.42, 29.77],
    ['2022/12/12', 29.92, 30.13, 30.36, 29.67],
    ['2022/12/13', 31.03, 30.98, 31.79, 30.56],
    ['2022/12/14', 30.87, 30.73, 31.48, 30.31],
    ['2022/12/15', 30.1, 29.35, 30.1, 28.5],
    ['2022/12/16', 29.15, 28.87, 29.49, 28.77],
    ['2022/12/19', 29.01, 29.52, 29.63, 28.53],
    ['2022/12/20', 29.38, 29.75, 30.31, 29.05],
    ['2022/12/21', 29.99, 29.83, 30.21, 29.5],
    ['2022/12/22', 29.47, 28.83, 29.47, 28.26],
    ['2022/12/23', 28.74, 28.55, 29.12, 28.34],
    ['2022/12/27', 28.55, 28.15, 28.61, 28.04],
    ['2022/12/28', 28.0, 27.72, 28.07, 27.51],
    ['2022/12/29', 27.94, 28.37, 28.61, 27.93],
    ['2022/12/30', 28.02, 28.52, 28.87, 27.95],
    ['2023/01/03', 29.0, 27.88, 29.02, 27.62],
    ['2023/01/04', 28.12, 27.65, 28.12, 27.39],
    ['2023/01/05', 27.56, 27.44, 28.07, 27.23],
    ['2023/01/06', 27.67, 28.68, 28.76, 27.51],
    ['2023/01/09', 29.01, 29.24, 29.61, 28.5],
    ['2023/01/10', 29.38, 29.86, 30.24, 29.31],
    ['2023/01/11', 30.16, 30.06, 30.33, 29.59],
    ['2023/01/12', 30.19, 30.32, 30.37, 29.32],
    ['2023/01/13', 30.2, 30.59, 30.59, 30.1],
    ['2023/01/17', 30.64, 30.5, 30.8, 30.45],
    ['2023/01/18', 30.69, 30.18, 30.97, 30.0],
    ['2023/01/19', 30.07, 30.02, 30.31, 29.94],
    ['2023/01/20', 30.44, 31.25, 31.58, 30.27],
    ['2023/01/23', 31.34, 31.05, 31.77, 30.57],
    ['2023/01/24', 30.85, 31.72, 31.76, 30.76],
    ['2023/01/25', 31.3, 32.43, 32.49, 31.0],
    ['2023/01/26', 32.63, 32.45, 32.7, 31.69],
    ['2023/01/27', 32.04, 31.84, 32.6, 31.6],
    ['2023/01/30', 31.47, 31.59, 31.92, 31.4],
    ['2023/01/31', 31.76, 31.78, 32.45, 31.72],
    ['2023/02/01', 32.02, 32.65, 32.89, 31.77],
    ['2023/02/02', 33.07, 32.85, 33.62, 32.5],
    ['2023/02/03', 32.19, 32.31, 32.87, 32.19],
    ['2023/02/06', 32.07, 33.03, 33.29, 32.0],
    ['2023/02/07', 33.12, 33.72, 33.83, 32.98],
    ['2023/02/08', 33.62, 34.0, 34.19, 33.62],
    ['2023/02/09', 34.62, 34.02, 35.0, 33.76],
    ['2023/02/10', 33.7, 32.98, 33.71, 32.56],
    ['2023/02/13', 33.08, 33.26, 33.53, 32.25],
    ['2023/02/14', 33.21, 33.29, 33.6, 32.93],
    ['2023/02/15', 32.93, 33.65, 33.85, 32.9],
    ['2023/02/16', 33.08, 34.02, 34.44, 33.08],
    ['2023/02/17', 37.21, 37.38, 37.66, 34.2],
    ['2023/02/21', 37.32, 37.4, 37.59, 36.7],
    ['2023/02/22', 36.87, 36.49, 37.05, 36.11],
    ['2023/02/23', 36.98, 36.93, 37.4, 36.02],
    ['2023/02/24', 36.56, 37.14, 37.19, 36.3],
    ['2023/02/27', 37.87, 37.1, 37.87, 36.86],
    ['2023/02/28', 37.03, 37.44, 37.66, 36.94],
    ['2023/03/01', 37.44, 37.22, 38.0, 37.17],
    ['2023/03/02', 36.69, 37.47, 37.47, 36.38],
    ['2023/03/03', 37.44, 38.38, 38.39, 37.26],
    ['2023/03/06', 38.41, 38.08, 38.66, 37.72],
    ['2023/03/07', 38.16, 38.34, 38.4, 37.99],
    ['2023/03/08', 38.45, 38.87, 38.89, 38.29],
    ['2023/03/09', 38.68, 37.76, 39.01, 37.73],
    ['2023/03/10', 37.85, 37.08, 37.88, 36.75],
    ['2023/03/13', 36.64, 36.65, 37.28, 36.25],
    ['2023/03/14', 37.16, 38.37, 38.39, 37.16],
    ['2023/03/15', 37.81, 37.94, 38.18, 36.48],
    ['2023/03/16', 37.94, 39.44, 39.45, 36.96],
    ['2023/03/17', 39.38, 39.21, 39.72, 39.03],
    ['2023/03/20', 39.25, 40.12, 40.16, 38.92],
    ['2023/03/21', 40.59, 40.6, 41.15, 39.73],
    ['2023/03/22', 40.57, 39.79, 40.74, 39.78],
    ['2023/03/23', 40.27, 41.23, 42.08, 40.26],
    ['2023/03/24', 40.87, 41.48, 41.52, 40.6],
    ['2023/03/27', 41.72, 41.63, 42.2, 41.17],
    ['2023/03/28', 41.48, 40.91, 42.09, 40.33],
    ['2023/03/29', 41.32, 41.7, 41.92, 40.8],
    ['2023/03/30', 42.05, 41.73, 42.16, 41.56],
    ['2023/03/31', 41.68, 42.4, 42.5, 41.65],
    ['2023/04/03', 42.11, 42.9, 42.94, 41.82],
    ['2023/04/04', 43.25, 42.42, 43.25, 42.22],
    ['2023/04/05', 42.2, 42.27, 42.49, 41.73],
    ['2023/04/06', 42.13, 41.23, 42.13, 41.15],
    ['2023/04/10', 41.04, 42.57, 42.57, 40.56],
    ['2023/04/11', 42.55, 41.11, 42.93, 41.08],
    ['2023/04/12', 41.55, 41.17, 41.91, 40.91],
    ['2023/04/13', 41.28, 41.23, 41.49, 40.58],
    ['2023/04/14', 41.21, 41.28, 41.86, 41.06],
    ['2023/04/17', 41.16, 40.8, 41.48, 40.25],
    ['2023/04/18', 41.01, 40.81, 41.52, 40.42],
    ['2023/04/19', 40.6, 39.72, 40.6, 39.63],
    ['2023/04/20', 39.31, 40.01, 40.57, 39.06],
    ['2023/04/21', 39.94, 40.09, 40.41, 39.74],
    ['2023/04/24', 39.97, 39.38, 40.35, 39.28],
    ['2023/04/25', 39.06, 37.57, 39.22, 37.53],
    ['2023/04/26', 37.68, 37.85, 38.26, 37.17],
    ['2023/04/27', 37.79, 36.45, 37.79, 36.38],
    ['2023/04/28', 36.39, 36.05, 36.8, 35.92],
    ['2023/05/01', 36.05, 36.28, 36.67, 36.05],
    ['2023/05/02', 36.38, 36.42, 36.78, 35.89],
    ['2023/05/03', 36.27, 36.6, 36.99, 36.24],
    ['2023/05/04', 36.35, 36.96, 37.18, 36.17],
    ['2023/05/05', 37.27, 38.71, 38.85, 37.23],
    ['2023/05/08', 38.47, 38.78, 38.99, 37.84],
    ['2023/05/09', 38.33, 37.98, 38.8, 37.79],
    ['2023/05/10', 38.6, 33.72, 39.83, 33.67],
    ['2023/05/11', 33.58, 35.59, 35.6, 32.25],
    ['2023/05/12', 35.25, 35.8, 36.42, 34.75],
    ['2023/05/15', 35.77, 35.4, 36.1, 35.37],
    ['2023/05/16', 35.01, 37.06, 37.06, 34.92],
    ['2023/05/17', 37.21, 38.9, 39.0, 36.77],
    ['2023/05/18', 38.95, 39.03, 40.02, 38.89],
    ['2023/05/19', 39.36, 39.69, 39.73, 38.77],
    ['2023/05/22', 39.44, 39.64, 40.16, 39.17],
    ['2023/05/23', 39.41, 39.28, 39.9, 38.8],
    ['2023/05/24', 38.76, 38.45, 39.19, 37.86],
    ['2023/05/25', 39.14, 40.62, 40.83, 39.03],
    ['2023/05/26', 40.9, 42.53, 42.69, 40.9],
    ['2023/05/30', 43.0, 42.19, 43.33, 41.95],
    ['2023/05/31', 41.72, 42.25, 42.54, 41.4],
    ['2023/06/01', 42.28, 42.88, 43.0, 41.74],
    ['2023/06/02', 42.96, 42.85, 43.25, 41.58],
    ['2023/06/05', 42.29, 42.13, 42.33, 41.46],
    ['2023/06/06', 41.89, 42.83, 43.37, 41.77],
    ['2023/06/07', 43.0, 43.06, 44.37, 42.7],
    ['2023/06/08', 43.21, 43.87, 43.95, 42.9],
    ['2023/06/09', 44.29, 43.98, 44.29, 43.64],
    ['2023/06/12', 44.33, 44.71, 44.8, 43.78],
    ['2023/06/13', 45.0, 44.84, 45.46, 44.51],
    ['2023/06/14', 44.5, 44.85, 44.9, 44.19],
    ['2023/06/15', 44.53, 44.42, 44.81, 43.94],
    ['2023/06/16', 44.91, 43.81, 45.11, 43.66],
    ['2023/06/20', 43.83, 44.76, 44.78, 43.21],
    ['2023/06/21', 44.62, 44.7, 45.02, 44.28],
    ['2023/06/22', 44.65, 45.04, 45.33, 44.47],
    ['2023/06/23', 44.47, 43.63, 45.66, 43.28],
    ['2023/06/26', 43.67, 42.88, 44.49, 42.83],
    ['2023/06/27', 43.08, 43.94, 44.91, 42.06],
    ['2023/06/28', 43.38, 43.58, 43.85, 43.15],
    ['2023/06/29', 43.76, 45.24, 45.45, 43.55],
    ['2023/06/30', 45.63, 45.1, 45.8, 44.94],
    ['2023/07/03', 45.66, 45.64, 45.81, 44.66],
    ['2023/07/05', 45.6, 44.59, 45.6, 44.07],
    ['2023/07/06', 44.05, 44.78, 44.91, 43.51],
    ['2023/07/07', 44.92, 45.36, 46.46, 44.92],
    ['2023/07/10', 45.52, 47.6, 47.77, 45.52],
    ['2023/07/11', 47.73, 44.59, 48.02, 43.81],
    ['2023/07/12', 45.22, 45.4, 45.89, 45.07],
    ['2023/07/13', 45.52, 46.06, 46.29, 45.52],
    ['2023/07/14', 46.06, 45.49, 46.49, 45.19],
    ['2023/07/17', 45.57, 46.34, 46.74, 45.57],
    ['2023/07/18', 46.45, 45.76, 46.45, 45.42],
    ['2023/07/19', 45.67, 44.6, 45.67, 44.19],
    ['2023/07/20', 44.2, 43.65, 44.48, 43.49],
    ['2023/07/21', 44.19, 43.78, 44.58, 43.51],
    ['2023/07/24', 43.91, 43.51, 43.96, 42.74],
    ['2023/07/25', 43.64, 44.16, 44.62, 43.52],
    ['2023/07/26', 43.96, 43.7, 44.48, 43.6],
    ['2023/07/27', 44.28, 44.46, 45.46, 44.19],
    ['2023/07/28', 44.46, 46.06, 46.22, 44.44],
    ['2023/07/31', 46.06, 45.99, 46.11, 45.45],
    ['2023/08/01', 45.55, 45.83, 45.86, 45.22],
    ['2023/08/02', 45.32, 44.46, 45.42, 43.92],
]);
var volumes = [
    224400.0,
    89400.0,
    78500.0,
    99600.0,
    129300.0,
    185000.0,
    115700.0,
    232000.0,
    155100.0,
    243500.0,
    98700.0,
    104900.0,
    57200.0,
    110800.0,
    53300.0,
    83600.0,
    94700.0,
    80300.0,
    69100.0,
    82800.0,
    220200.0,
    85300.0,
    69500.0,
    134200.0,
    151300.0,
    58800.0,
    77400.0,
    90600.0,
    119000.0,
    70900.0,
    85300.0,
    265500.0,
    82900.0,
    81400.0,
    83600.0,
    74900.0,
    190600.0,
    89500.0,
    85900.0,
    157400.0,
    180500.0,
    226100.0,
    129800.0,
    94500.0,
    79600.0,
    81000.0,
    89500.0,
    87700.0,
    193500.0,
    92200.0,
    170000.0,
    117400.0,
    121700.0,
    125900.0,
    127200.0,
    113400.0,
    169000.0,
    82300.0,
    104800.0,
    75700.0,
    73800.0,
    80600.0,
    142900.0,
    93500.0,
    88400.0,
    60900.0,
    96300.0,
    93600.0,
    129800.0,
    89800.0,
    201000.0,
    509700.0,
    171300.0,
    277200.0,
    183500.0,
    141200.0,
    93600.0,
    102200.0,
    95000.0,
    115900.0,
    38700.0,
    103500.0,
    79100.0,
    266900.0,
    216600.0,
    80700.0,
    123400.0,
    73900.0,
    65100.0,
    102400.0,
    73300.0,
    139400.0,
    158100.0,
    113600.0,
    83800.0,
    528500.0,
    99400.0,
    72100.0,
    93000.0,
    63300.0,
    55800.0,
    45100.0,
    56400.0,
    84700.0,
    79600.0,
    64900.0,
    76000.0,
    64500.0,
    73800.0,
    60900.0,
    99200.0,
    77300.0,
    82100.0,
    75000.0,
    42500.0,
    126700.0,
    79300.0,
    235700.0,
    80500.0,
    98000.0,
    76100.0,
    93800.0,
    59700.0,
    68400.0,
    152500.0,
    165100.0,
    109100.0,
    119700.0,
    114800.0,
    165300.0,
    138400.0,
    238500.0,
    71800.0,
    81500.0,
    113700.0,
    100900.0,
    234700.0,
    606900.0,
    235400.0,
    341200.0,
    156000.0,
    181100.0,
    128100.0,
    495000.0,
    154300.0,
    132100.0,
    222000.0,
    221700.0,
    188000.0,
    186700.0,
    159500.0,
    144600.0,
    100900.0,
    384500.0,
    222300.0,
    457400.0,
    504800.0,
    217900.0,
    279600.0,
    181800.0,
    224600.0,
    207000.0,
    177100.0,
    76000.0,
    117600.0,
    78000.0,
    380300.0,
    197000.0,
    184400.0,
    207700.0,
    179700.0,
    436400.0,
    162900.0,
    125800.0,
    97200.0,
    82500.0,
    68700.0,
    111200.0,
    190700.0,
    139800.0,
    82700.0,
    78300.0,
    127100.0,
    120700.0,
    202700.0,
    135000.0,
    68500.0,
    105300.0,
    173300.0,
    153800.0,
    157600.0,
    100800.0,
    168200.0,
    432300.0,
    463500.0,
    229500.0,
    242900.0,
    172800.0,
    261200.0,
    152700.0,
    129600.0,
    139500.0,
    140300.0,
    164000.0,
    220700.0,
    197800.0,
    143200.0,
    673300.0,
    162900.0,
    149000.0,
    223600.0,
    236900.0,
    183700.0,
    162000.0,
    107600.0,
    124200.0,
    184200.0,
    101300.0,
    102900.0,
    343000.0,
    106800.0,
    103400.0,
    129200.0,
    394800.0,
    139600.0,
    106700.0,
    109200.0,
    173000.0,
    275500.0,
    78600.0,
    178900.0,
    131200.0,
    310900.0,
    239200.0,
    241900.0,
    125800.0,
    145700.0,
    127900.0,
    134200.0,
    89300.0,
    148200.0,
    96100.0,
    150200.0,
    93800.0,
    89200.0,
    139200.0,
    95500.0,
    92800.0,
    127400.0,
    61000.0,
    67500.0,
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
        text: "PDFS",
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