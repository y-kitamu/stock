/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_SQSP");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/08', 24.4, 23.05, 24.81, 23.03],
    ['2022/08/09', 22.11, 21.41, 22.64, 20.97],
    ['2022/08/10', 22.31, 22.45, 22.94, 21.91],
    ['2022/08/11', 22.77, 21.81, 23.11, 21.77],
    ['2022/08/12', 21.8, 21.78, 22.11, 21.47],
    ['2022/08/15', 21.75, 22.21, 22.24, 21.75],
    ['2022/08/16', 22.06, 22.36, 22.39, 21.51],
    ['2022/08/17', 22.15, 21.87, 22.42, 21.54],
    ['2022/08/18', 21.97, 22.07, 22.15, 21.31],
    ['2022/08/19', 21.83, 21.05, 21.83, 21.0],
    ['2022/08/22', 20.68, 21.16, 21.25, 20.68],
    ['2022/08/23', 21.28, 21.1, 21.47, 20.99],
    ['2022/08/24', 21.15, 21.36, 21.64, 21.06],
    ['2022/08/25', 21.53, 21.29, 21.55, 21.0],
    ['2022/08/26', 21.32, 20.93, 21.4, 20.88],
    ['2022/08/29', 20.58, 20.83, 21.24, 20.58],
    ['2022/08/30', 21.15, 20.93, 21.41, 20.65],
    ['2022/08/31', 21.02, 21.0, 21.41, 20.99],
    ['2022/09/01', 20.56, 20.79, 20.8, 20.22],
    ['2022/09/02', 20.84, 21.14, 21.35, 20.77],
    ['2022/09/06', 21.27, 21.65, 21.75, 21.09],
    ['2022/09/07', 21.57, 22.03, 22.17, 21.57],
    ['2022/09/08', 21.66, 22.58, 22.89, 21.66],
    ['2022/09/09', 22.99, 23.48, 23.66, 22.62],
    ['2022/09/12', 23.62, 23.89, 24.8, 23.62],
    ['2022/09/13', 22.83, 22.81, 23.59, 22.78],
    ['2022/09/14', 22.69, 22.72, 23.17, 22.16],
    ['2022/09/15', 22.57, 22.94, 23.36, 22.37],
    ['2022/09/16', 22.57, 20.98, 22.59, 20.98],
    ['2022/09/19', 20.92, 22.32, 22.34, 20.92],
    ['2022/09/20', 22.32, 21.57, 22.51, 21.57],
    ['2022/09/21', 21.58, 21.3, 22.05, 21.16],
    ['2022/09/22', 21.28, 20.93, 21.52, 20.92],
    ['2022/09/23', 20.59, 21.18, 21.2, 20.52],
    ['2022/09/26', 21.0, 20.98, 21.75, 20.85],
    ['2022/09/27', 21.46, 21.16, 21.65, 20.7],
    ['2022/09/28', 21.36, 22.28, 22.35, 21.19],
    ['2022/09/29', 21.91, 22.37, 22.4, 21.48],
    ['2022/09/30', 22.28, 21.36, 22.61, 21.31],
    ['2022/10/03', 21.74, 22.0, 22.0, 20.9],
    ['2022/10/04', 22.56, 23.25, 23.86, 22.34],
    ['2022/10/05', 21.93, 22.01, 22.2, 20.68],
    ['2022/10/06', 21.83, 22.14, 22.49, 21.64],
    ['2022/10/07', 21.74, 21.19, 21.74, 21.0],
    ['2022/10/10', 21.25, 20.95, 21.25, 20.33],
    ['2022/10/11', 20.94, 21.2, 21.67, 20.07],
    ['2022/10/12', 21.22, 21.24, 21.49, 20.87],
    ['2022/10/13', 20.62, 21.09, 21.34, 20.01],
    ['2022/10/14', 21.33, 20.87, 21.6, 20.82],
    ['2022/10/17', 21.38, 21.38, 21.63, 21.0],
    ['2022/10/18', 21.93, 21.63, 22.08, 21.03],
    ['2022/10/19', 21.49, 21.12, 21.81, 20.98],
    ['2022/10/20', 21.19, 21.96, 22.01, 21.19],
    ['2022/10/21', 21.97, 21.57, 21.97, 21.12],
    ['2022/10/24', 21.5, 21.57, 21.63, 20.6],
    ['2022/10/25', 21.75, 22.5, 22.74, 21.56],
    ['2022/10/26', 22.43, 22.22, 22.83, 21.25],
    ['2022/10/27', 22.52, 22.15, 22.84, 21.99],
    ['2022/10/28', 21.84, 22.36, 22.49, 21.57],
    ['2022/10/31', 22.31, 22.21, 22.36, 21.72],
    ['2022/11/01', 22.59, 21.54, 22.6, 21.52],
    ['2022/11/02', 21.35, 20.92, 21.69, 20.9],
    ['2022/11/03', 20.45, 20.79, 21.3, 20.41],
    ['2022/11/04', 20.88, 19.69, 20.99, 19.23],
    ['2022/11/07', 19.9, 19.67, 20.0, 19.06],
    ['2022/11/08', 17.6, 19.55, 19.9, 16.86],
    ['2022/11/09', 19.78, 20.29, 21.25, 19.45],
    ['2022/11/10', 21.42, 21.87, 21.89, 21.28],
    ['2022/11/11', 20.45, 20.49, 20.74, 19.8],
    ['2022/11/14', 20.49, 20.64, 20.77, 19.81],
    ['2022/11/15', 20.88, 21.24, 21.38, 20.43],
    ['2022/11/16', 21.0, 20.81, 21.17, 20.43],
    ['2022/11/17', 20.55, 20.52, 20.97, 20.34],
    ['2022/11/18', 20.94, 20.13, 20.94, 19.8],
    ['2022/11/21', 21.09, 20.83, 21.42, 20.61],
    ['2022/11/22', 20.78, 20.09, 20.81, 20.02],
    ['2022/11/23', 20.08, 20.63, 20.69, 19.9],
    ['2022/11/25', 20.46, 20.61, 20.91, 20.39],
    ['2022/11/28', 20.58, 20.16, 20.7, 20.07],
    ['2022/11/29', 20.2, 20.05, 20.76, 19.99],
    ['2022/11/30', 20.09, 20.49, 20.56, 20.08],
    ['2022/12/01', 20.64, 20.73, 21.17, 20.64],
    ['2022/12/02', 20.47, 21.5, 21.61, 20.47],
    ['2022/12/05', 21.46, 20.93, 21.46, 20.69],
    ['2022/12/06', 20.92, 20.09, 20.92, 19.87],
    ['2022/12/07', 19.89, 19.75, 20.04, 19.58],
    ['2022/12/08', 19.77, 20.07, 20.39, 19.63],
    ['2022/12/09', 19.93, 20.13, 20.34, 19.86],
    ['2022/12/12', 20.12, 20.36, 20.67, 19.92],
    ['2022/12/13', 20.83, 20.36, 21.1, 20.0],
    ['2022/12/14', 20.42, 20.73, 21.08, 20.21],
    ['2022/12/15', 20.54, 20.9, 21.04, 20.52],
    ['2022/12/16', 20.8, 21.09, 21.5, 20.1],
    ['2022/12/19', 21.18, 20.34, 21.18, 20.17],
    ['2022/12/20', 20.29, 20.84, 21.17, 20.18],
    ['2022/12/21', 20.77, 21.73, 21.98, 20.61],
    ['2022/12/22', 21.55, 22.07, 22.15, 21.42],
    ['2022/12/23', 22.06, 21.55, 22.12, 21.42],
    ['2022/12/27', 21.41, 20.94, 21.43, 20.93],
    ['2022/12/28', 20.85, 20.68, 21.16, 20.66],
    ['2022/12/29', 20.72, 21.87, 21.99, 20.72],
    ['2022/12/30', 21.51, 22.17, 22.22, 21.51],
    ['2023/01/03', 22.31, 22.78, 22.88, 22.18],
    ['2023/01/04', 22.25, 21.48, 22.25, 20.71],
    ['2023/01/05', 21.01, 21.04, 21.64, 20.85],
    ['2023/01/06', 21.24, 21.4, 21.64, 20.82],
    ['2023/01/09', 21.37, 22.0, 22.1, 21.36],
    ['2023/01/10', 21.98, 22.04, 22.37, 21.84],
    ['2023/01/11', 22.27, 22.14, 22.27, 21.76],
    ['2023/01/12', 22.16, 22.06, 22.17, 21.66],
    ['2023/01/13', 21.94, 22.26, 22.29, 21.77],
    ['2023/01/17', 22.13, 21.79, 22.46, 21.63],
    ['2023/01/18', 22.01, 22.36, 22.52, 21.89],
    ['2023/01/19', 22.44, 22.93, 23.02, 22.42],
    ['2023/01/20', 21.43, 21.11, 21.6, 20.51],
    ['2023/01/23', 21.12, 22.46, 22.51, 21.12],
    ['2023/01/24', 22.45, 22.26, 22.53, 22.08],
    ['2023/01/25', 22.05, 22.87, 23.03, 21.74],
    ['2023/01/26', 23.13, 23.1, 23.26, 22.56],
    ['2023/01/27', 23.16, 23.37, 23.61, 22.98],
    ['2023/01/30', 23.19, 23.46, 23.54, 22.91],
    ['2023/01/31', 23.61, 23.72, 23.77, 23.24],
    ['2023/02/01', 23.77, 23.92, 24.03, 23.4],
    ['2023/02/02', 24.14, 25.24, 25.28, 23.92],
    ['2023/02/03', 24.63, 24.5, 25.07, 24.11],
    ['2023/02/06', 24.4, 24.3, 24.53, 24.03],
    ['2023/02/07', 23.08, 22.9, 23.13, 22.06],
    ['2023/02/08', 23.06, 23.05, 23.19, 22.81],
    ['2023/02/09', 22.89, 22.69, 23.23, 22.53],
    ['2023/02/10', 22.67, 22.89, 22.98, 22.34],
    ['2023/02/13', 23.01, 23.41, 23.66, 22.88],
    ['2023/02/14', 23.33, 23.33, 23.55, 22.89],
    ['2023/02/15', 23.27, 23.73, 23.76, 23.09],
    ['2023/02/16', 23.4, 23.25, 24.05, 23.18],
    ['2023/02/17', 23.12, 23.22, 23.33, 22.65],
    ['2023/02/21', 22.96, 23.3, 23.51, 22.67],
    ['2023/02/22', 24.05, 23.96, 24.47, 23.81],
    ['2023/02/23', 24.07, 24.07, 24.1, 23.63],
    ['2023/02/24', 23.68, 23.06, 23.82, 22.94],
    ['2023/02/27', 23.26, 23.25, 23.56, 23.11],
    ['2023/02/28', 23.1, 23.41, 23.56, 23.1],
    ['2023/03/01', 23.19, 23.18, 23.43, 23.08],
    ['2023/03/02', 22.93, 23.41, 23.43, 22.73],
    ['2023/03/03', 23.41, 23.9, 24.0, 23.31],
    ['2023/03/06', 24.3, 24.04, 24.96, 23.99],
    ['2023/03/07', 26.13, 27.54, 27.95, 25.5],
    ['2023/03/08', 26.98, 27.25, 27.83, 26.41],
    ['2023/03/09', 27.41, 26.8, 27.45, 26.2],
    ['2023/03/10', 26.72, 26.33, 27.05, 25.78],
    ['2023/03/13', 25.99, 26.45, 26.72, 25.78],
    ['2023/03/14', 26.94, 26.99, 27.19, 26.45],
    ['2023/03/15', 26.88, 27.12, 27.17, 26.45],
    ['2023/03/16', 27.19, 27.52, 27.71, 26.97],
    ['2023/03/17', 27.3, 27.92, 28.14, 26.85],
    ['2023/03/20', 27.71, 28.01, 28.16, 27.22],
    ['2023/03/21', 28.35, 28.63, 28.9, 28.2],
    ['2023/03/22', 28.6, 29.08, 29.5, 28.37],
    ['2023/03/23', 29.46, 30.03, 30.26, 29.28],
    ['2023/03/24', 30.22, 30.02, 30.37, 29.71],
    ['2023/03/27', 30.05, 30.55, 30.76, 29.99],
    ['2023/03/28', 30.48, 30.65, 30.74, 30.13],
    ['2023/03/29', 30.88, 30.82, 31.16, 30.65],
    ['2023/03/30', 31.04, 31.18, 31.36, 30.89],
    ['2023/03/31', 31.35, 31.77, 31.77, 31.25],
    ['2023/04/03', 31.56, 31.78, 31.98, 31.34],
    ['2023/04/04', 31.78, 32.74, 33.05, 31.66],
    ['2023/04/05', 32.64, 32.08, 32.81, 31.88],
    ['2023/04/06', 31.99, 32.42, 32.68, 31.65],
    ['2023/04/10', 31.96, 32.56, 32.75, 31.73],
    ['2023/04/11', 32.47, 32.16, 32.7, 31.8],
    ['2023/04/12', 32.69, 32.52, 33.31, 32.2],
    ['2023/04/13', 32.72, 32.64, 33.41, 32.64],
    ['2023/04/14', 32.39, 32.38, 33.08, 31.86],
    ['2023/04/17', 32.15, 32.29, 32.58, 32.13],
    ['2023/04/18', 32.35, 32.3, 32.76, 32.2],
    ['2023/04/19', 32.01, 31.59, 32.43, 31.58],
    ['2023/04/20', 31.4, 31.39, 31.75, 31.02],
    ['2023/04/21', 31.35, 31.65, 31.82, 31.27],
    ['2023/04/24', 31.36, 30.71, 31.8, 30.65],
    ['2023/04/25', 33.15, 31.45, 33.2, 31.26],
    ['2023/04/26', 32.19, 31.3, 32.75, 31.19],
    ['2023/04/27', 31.55, 31.5, 31.62, 30.68],
    ['2023/04/28', 30.9, 31.1, 31.49, 30.64],
    ['2023/05/01', 30.97, 31.84, 31.88, 30.97],
    ['2023/05/02', 31.78, 31.13, 31.9, 30.96],
    ['2023/05/03', 30.51, 26.39, 30.59, 26.13],
    ['2023/05/04', 26.53, 26.22, 27.0, 25.93],
    ['2023/05/05', 26.26, 27.48, 27.61, 25.59],
    ['2023/05/08', 27.55, 27.66, 28.04, 27.35],
    ['2023/05/09', 29.18, 27.65, 29.7, 27.1],
    ['2023/05/10', 28.09, 28.84, 29.38, 28.01],
    ['2023/05/11', 28.74, 28.08, 28.83, 27.91],
    ['2023/05/12', 27.84, 28.09, 28.46, 27.48],
    ['2023/05/15', 28.0, 28.24, 28.84, 27.82],
    ['2023/05/16', 28.1, 28.26, 29.15, 27.63],
    ['2023/05/17', 28.59, 28.28, 28.99, 27.34],
    ['2023/05/18', 28.28, 29.47, 29.49, 28.2],
    ['2023/05/19', 29.47, 29.6, 29.63, 29.11],
    ['2023/05/22', 29.46, 29.61, 30.18, 29.37],
    ['2023/05/23', 29.41, 29.8, 30.29, 29.32],
    ['2023/05/24', 29.6, 29.64, 30.14, 29.42],
    ['2023/05/25', 29.81, 29.25, 29.88, 29.17],
    ['2023/05/26', 29.13, 29.12, 29.97, 29.0],
    ['2023/05/30', 29.08, 28.68, 29.42, 28.45],
    ['2023/05/31', 28.66, 29.39, 29.45, 28.54],
    ['2023/06/01', 29.1, 29.45, 29.7, 28.45],
    ['2023/06/02', 29.72, 29.97, 30.16, 29.47],
    ['2023/06/05', 29.8, 29.72, 30.01, 29.29],
    ['2023/06/06', 29.65, 30.81, 30.97, 29.53],
    ['2023/06/07', 30.85, 29.79, 31.39, 29.69],
    ['2023/06/08', 29.74, 29.93, 30.37, 29.63],
    ['2023/06/09', 29.73, 29.64, 30.4, 29.48],
    ['2023/06/12', 29.92, 30.75, 30.75, 29.73],
    ['2023/06/13', 31.0, 31.14, 31.75, 30.78],
    ['2023/06/14', 30.84, 30.65, 31.01, 30.23],
    ['2023/06/15', 30.44, 31.39, 31.52, 29.78],
    ['2023/06/16', 33.74, 32.76, 34.38, 32.45],
    ['2023/06/20', 32.76, 31.25, 33.08, 31.24],
    ['2023/06/21', 31.17, 30.45, 31.44, 30.25],
    ['2023/06/22', 30.24, 29.71, 30.36, 29.53],
    ['2023/06/23', 29.3, 28.9, 29.73, 28.69],
    ['2023/06/26', 28.62, 27.43, 28.7, 27.26],
    ['2023/06/27', 27.66, 27.75, 28.2, 27.51],
    ['2023/06/28', 28.77, 29.91, 30.22, 28.59],
    ['2023/06/29', 29.78, 30.69, 30.75, 29.75],
    ['2023/06/30', 30.99, 31.54, 31.6, 30.95],
    ['2023/07/03', 31.95, 32.0, 32.46, 31.65],
    ['2023/07/05', 31.81, 31.46, 31.97, 31.12],
    ['2023/07/06', 31.29, 31.01, 31.29, 30.3],
    ['2023/07/07', 31.09, 31.08, 31.59, 30.83],
    ['2023/07/10', 30.86, 31.34, 31.57, 30.83],
    ['2023/07/11', 31.03, 31.82, 31.99, 31.03],
    ['2023/07/12', 31.74, 31.8, 31.84, 31.04],
    ['2023/07/13', 31.88, 32.32, 32.67, 31.88],
    ['2023/07/14', 32.15, 32.19, 32.78, 32.01],
    ['2023/07/17', 32.17, 33.12, 33.19, 31.73],
    ['2023/07/18', 32.96, 33.36, 33.61, 32.6],
    ['2023/07/19', 33.37, 31.35, 33.71, 30.62],
    ['2023/07/20', 31.21, 30.7, 31.55, 30.46],
    ['2023/07/21', 30.97, 30.19, 31.31, 30.0],
    ['2023/07/24', 30.25, 29.5, 30.63, 29.38],
    ['2023/07/25', 29.89, 30.69, 30.86, 29.89],
    ['2023/07/26', 30.52, 31.3, 31.42, 30.5],
    ['2023/07/27', 32.17, 31.52, 32.73, 31.28],
    ['2023/07/28', 31.86, 32.18, 32.48, 31.86],
    ['2023/07/31', 32.31, 33.14, 33.21, 32.31],
    ['2023/08/01', 32.79, 32.88, 33.19, 32.63],
    ['2023/08/02', 32.49, 32.3, 32.74, 31.68],
    ['2023/08/03', 32.82, 32.9, 33.56, 32.42],
    ['2023/08/04', 32.84, 31.95, 32.93, 31.88],
]);
var volumes = [
    562900.0,
    1046400.0,
    643100.0,
    356300.0,
    327300.0,
    351900.0,
    383300.0,
    301700.0,
    348200.0,
    387800.0,
    375800.0,
    236200.0,
    196100.0,
    247800.0,
    332600.0,
    301700.0,
    394500.0,
    477700.0,
    556300.0,
    480800.0,
    410400.0,
    1051500.0,
    343800.0,
    337500.0,
    890300.0,
    589600.0,
    599700.0,
    617700.0,
    2431500.0,
    490800.0,
    303900.0,
    330400.0,
    309500.0,
    482100.0,
    261600.0,
    350500.0,
    244900.0,
    266200.0,
    274700.0,
    384700.0,
    404200.0,
    984200.0,
    400100.0,
    292800.0,
    505100.0,
    337600.0,
    267500.0,
    445600.0,
    329600.0,
    395900.0,
    295600.0,
    228100.0,
    199100.0,
    287500.0,
    199600.0,
    379200.0,
    800900.0,
    434200.0,
    360500.0,
    352600.0,
    264000.0,
    343700.0,
    362300.0,
    710500.0,
    928500.0,
    1370500.0,
    783500.0,
    666300.0,
    1026500.0,
    639900.0,
    853600.0,
    362000.0,
    330400.0,
    275500.0,
    487600.0,
    280100.0,
    454500.0,
    81600.0,
    320300.0,
    215800.0,
    449100.0,
    561300.0,
    670200.0,
    228000.0,
    384800.0,
    326700.0,
    459600.0,
    158200.0,
    425000.0,
    403700.0,
    768900.0,
    643600.0,
    2586400.0,
    647000.0,
    550800.0,
    480200.0,
    413400.0,
    309100.0,
    243400.0,
    357500.0,
    312300.0,
    324000.0,
    404200.0,
    1112100.0,
    774800.0,
    442500.0,
    811100.0,
    470600.0,
    387000.0,
    436700.0,
    426100.0,
    539800.0,
    750800.0,
    629100.0,
    1742000.0,
    796200.0,
    399900.0,
    745800.0,
    483900.0,
    740800.0,
    321800.0,
    633200.0,
    583700.0,
    711100.0,
    515900.0,
    228600.0,
    1416600.0,
    626900.0,
    442600.0,
    433100.0,
    420400.0,
    363000.0,
    619800.0,
    590400.0,
    554900.0,
    463400.0,
    651900.0,
    357800.0,
    568200.0,
    283300.0,
    337300.0,
    281800.0,
    362300.0,
    344500.0,
    1177500.0,
    3735400.0,
    1515200.0,
    1085000.0,
    903300.0,
    758000.0,
    1670500.0,
    996600.0,
    1021000.0,
    1505800.0,
    620300.0,
    1017500.0,
    688800.0,
    805400.0,
    829100.0,
    548100.0,
    485000.0,
    513600.0,
    348800.0,
    798400.0,
    458100.0,
    914600.0,
    762100.0,
    462200.0,
    664500.0,
    770700.0,
    597100.0,
    546700.0,
    524700.0,
    442200.0,
    462700.0,
    449100.0,
    495700.0,
    365000.0,
    612200.0,
    846800.0,
    687400.0,
    459000.0,
    632100.0,
    558100.0,
    1060100.0,
    2183300.0,
    1223700.0,
    1143600.0,
    1066200.0,
    1142300.0,
    623100.0,
    950200.0,
    578400.0,
    767800.0,
    730000.0,
    632400.0,
    602600.0,
    543000.0,
    419300.0,
    550500.0,
    429100.0,
    524300.0,
    470800.0,
    426700.0,
    1259900.0,
    556900.0,
    498600.0,
    455000.0,
    793800.0,
    543700.0,
    448700.0,
    445000.0,
    497500.0,
    999500.0,
    526400.0,
    754200.0,
    2022200.0,
    903500.0,
    624300.0,
    533400.0,
    3112600.0,
    931700.0,
    877600.0,
    1038200.0,
    675400.0,
    875600.0,
    437400.0,
    543300.0,
    676300.0,
    662100.0,
    390100.0,
    349200.0,
    525800.0,
    410800.0,
    373700.0,
    438500.0,
    394700.0,
    1240900.0,
    452800.0,
    421600.0,
    370600.0,
    353300.0,
    359500.0,
    545500.0,
    335800.0,
    365400.0,
    636900.0,
    523700.0,
    494400.0,
    501300.0,
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
        text: "SQSP",
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