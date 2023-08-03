/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_VECO");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/03', 21.83, 22.11, 22.4, 21.71],
    ['2022/08/04', 22.05, 22.38, 22.42, 21.92],
    ['2022/08/05', 22.19, 22.17, 22.38, 21.8],
    ['2022/08/08', 22.04, 21.97, 22.3, 21.53],
    ['2022/08/09', 22.04, 20.99, 22.09, 20.18],
    ['2022/08/10', 21.56, 21.85, 22.07, 21.1],
    ['2022/08/11', 22.06, 22.24, 22.72, 21.91],
    ['2022/08/12', 22.42, 23.24, 23.47, 22.36],
    ['2022/08/15', 23.05, 23.14, 23.46, 22.82],
    ['2022/08/16', 23.0, 23.02, 23.14, 22.74],
    ['2022/08/17', 22.69, 22.34, 22.69, 21.93],
    ['2022/08/18', 22.35, 23.09, 23.35, 22.16],
    ['2022/08/19', 22.77, 22.54, 22.86, 22.27],
    ['2022/08/22', 22.22, 22.09, 22.22, 21.9],
    ['2022/08/23', 22.16, 22.02, 22.54, 21.96],
    ['2022/08/24', 22.3, 22.55, 22.8, 22.12],
    ['2022/08/25', 22.5, 23.63, 23.92, 22.5],
    ['2022/08/26', 23.66, 22.57, 23.66, 22.49],
    ['2022/08/29', 22.23, 22.11, 22.84, 21.97],
    ['2022/08/30', 22.18, 21.61, 22.36, 21.4],
    ['2022/08/31', 21.63, 21.14, 21.63, 20.73],
    ['2022/09/01', 20.6, 20.22, 21.22, 19.81],
    ['2022/09/02', 20.36, 19.73, 20.36, 19.59],
    ['2022/09/06', 19.73, 19.48, 19.8, 19.27],
    ['2022/09/07', 19.48, 19.86, 20.03, 19.45],
    ['2022/09/08', 19.62, 20.46, 20.65, 19.47],
    ['2022/09/09', 20.79, 20.9, 21.13, 20.71],
    ['2022/09/12', 20.99, 21.13, 21.23, 20.8],
    ['2022/09/13', 20.48, 20.16, 20.48, 20.04],
    ['2022/09/14', 20.35, 20.21, 20.48, 19.95],
    ['2022/09/15', 20.06, 19.92, 20.3, 19.77],
    ['2022/09/16', 19.7, 19.61, 20.39, 19.26],
    ['2022/09/19', 19.35, 19.72, 19.78, 19.35],
    ['2022/09/20', 19.51, 19.64, 19.69, 19.31],
    ['2022/09/21', 19.81, 19.32, 20.05, 19.25],
    ['2022/09/22', 19.18, 19.0, 19.29, 18.71],
    ['2022/09/23', 18.72, 18.58, 18.72, 18.28],
    ['2022/09/26', 18.5, 18.47, 18.92, 18.45],
    ['2022/09/27', 18.82, 18.88, 19.1, 18.59],
    ['2022/09/28', 18.63, 18.93, 19.1, 18.55],
    ['2022/09/29', 18.63, 18.68, 18.71, 18.26],
    ['2022/09/30', 18.53, 18.32, 18.89, 18.28],
    ['2022/10/03', 18.53, 19.12, 19.29, 18.45],
    ['2022/10/04', 19.74, 19.85, 20.29, 19.45],
    ['2022/10/05', 19.47, 19.72, 19.82, 19.05],
    ['2022/10/06', 19.71, 19.72, 20.03, 19.56],
    ['2022/10/07', 19.29, 18.69, 19.59, 18.43],
    ['2022/10/10', 18.7, 18.42, 18.7, 18.01],
    ['2022/10/11', 18.11, 18.14, 18.58, 17.81],
    ['2022/10/12', 18.2, 17.13, 18.2, 17.11],
    ['2022/10/13', 16.5, 17.85, 17.98, 16.11],
    ['2022/10/14', 18.11, 17.14, 18.11, 17.08],
    ['2022/10/17', 17.52, 17.61, 17.73, 17.38],
    ['2022/10/18', 18.12, 17.67, 18.29, 17.43],
    ['2022/10/19', 17.6, 17.78, 17.85, 17.48],
    ['2022/10/20', 18.1, 17.93, 18.41, 17.76],
    ['2022/10/21', 17.92, 18.48, 18.55, 17.81],
    ['2022/10/24', 18.48, 18.59, 18.72, 17.88],
    ['2022/10/25', 18.78, 18.96, 19.24, 18.49],
    ['2022/10/26', 18.87, 18.86, 19.44, 18.58],
    ['2022/10/27', 19.03, 18.1, 19.06, 17.97],
    ['2022/10/28', 18.23, 18.56, 18.75, 18.05],
    ['2022/10/31', 18.54, 18.23, 18.54, 18.0],
    ['2022/11/01', 18.53, 18.23, 18.63, 18.16],
    ['2022/11/02', 18.34, 17.76, 18.47, 17.7],
    ['2022/11/03', 17.43, 17.36, 17.49, 17.06],
    ['2022/11/04', 17.9, 18.0, 18.04, 17.64],
    ['2022/11/07', 18.04, 18.0, 18.19, 17.9],
    ['2022/11/08', 17.9, 18.32, 18.93, 17.53],
    ['2022/11/09', 18.03, 18.16, 18.59, 17.92],
    ['2022/11/10', 19.17, 19.6, 19.73, 18.87],
    ['2022/11/11', 19.69, 19.73, 19.97, 19.45],
    ['2022/11/14', 19.64, 19.45, 19.77, 19.41],
    ['2022/11/15', 19.97, 19.73, 19.97, 19.49],
    ['2022/11/16', 19.56, 19.03, 19.61, 18.77],
    ['2022/11/17', 18.68, 19.67, 19.68, 18.66],
    ['2022/11/18', 20.12, 19.63, 20.12, 19.56],
    ['2022/11/21', 19.5, 19.56, 19.61, 19.2],
    ['2022/11/22', 19.55, 19.5, 19.66, 19.27],
    ['2022/11/23', 19.45, 19.6, 19.82, 19.33],
    ['2022/11/25', 19.67, 19.45, 19.87, 19.45],
    ['2022/11/28', 19.23, 18.65, 19.23, 18.5],
    ['2022/11/29', 18.65, 18.67, 19.17, 18.53],
    ['2022/11/30', 18.8, 19.88, 19.88, 18.6],
    ['2022/12/01', 20.01, 19.84, 20.02, 19.56],
    ['2022/12/02', 19.45, 19.74, 19.76, 19.35],
    ['2022/12/05', 19.73, 19.63, 19.82, 19.44],
    ['2022/12/06', 19.63, 19.11, 19.64, 18.94],
    ['2022/12/07', 19.03, 18.87, 19.6, 18.82],
    ['2022/12/08', 19.0, 19.16, 19.25, 18.84],
    ['2022/12/09', 19.08, 19.06, 19.34, 19.02],
    ['2022/12/12', 19.06, 19.0, 19.08, 18.81],
    ['2022/12/13', 19.57, 19.5, 20.19, 19.33],
    ['2022/12/14', 19.42, 19.89, 20.12, 19.3],
    ['2022/12/15', 19.51, 19.24, 19.52, 19.06],
    ['2022/12/16', 18.95, 19.38, 19.48, 18.95],
    ['2022/12/19', 19.26, 18.88, 19.33, 18.71],
    ['2022/12/20', 18.73, 18.7, 19.03, 18.68],
    ['2022/12/21', 18.7, 18.86, 19.11, 18.66],
    ['2022/12/22', 18.5, 18.47, 18.73, 18.02],
    ['2022/12/23', 18.42, 18.37, 18.46, 18.17],
    ['2022/12/27', 18.33, 18.37, 18.4, 18.03],
    ['2022/12/28', 18.29, 18.12, 18.48, 18.05],
    ['2022/12/29', 18.35, 18.57, 18.76, 18.24],
    ['2022/12/30', 18.18, 18.58, 18.62, 18.18],
    ['2023/01/03', 18.89, 18.45, 18.92, 18.22],
    ['2023/01/04', 18.67, 18.67, 18.88, 18.44],
    ['2023/01/05', 18.58, 18.6, 18.84, 18.37],
    ['2023/01/06', 18.9, 19.35, 19.71, 18.76],
    ['2023/01/09', 19.65, 19.81, 20.22, 19.58],
    ['2023/01/10', 19.73, 19.94, 20.09, 19.66],
    ['2023/01/11', 19.94, 20.13, 20.16, 19.92],
    ['2023/01/12', 20.43, 20.67, 20.83, 20.19],
    ['2023/01/13', 20.57, 20.34, 20.7, 20.31],
    ['2023/01/17', 20.3, 20.24, 20.47, 20.17],
    ['2023/01/18', 20.43, 20.12, 20.53, 20.11],
    ['2023/01/19', 20.0, 19.79, 20.2, 19.64],
    ['2023/01/20', 20.03, 20.12, 20.4, 19.84],
    ['2023/01/23', 19.27, 20.16, 20.21, 19.27],
    ['2023/01/24', 20.05, 19.97, 20.07, 19.8],
    ['2023/01/25', 19.75, 20.02, 20.15, 19.35],
    ['2023/01/26', 20.12, 20.29, 20.3, 19.67],
    ['2023/01/27', 20.08, 20.03, 20.24, 19.95],
    ['2023/01/30', 19.85, 19.37, 19.98, 19.36],
    ['2023/01/31', 19.37, 19.86, 19.88, 19.35],
    ['2023/02/01', 20.03, 20.87, 20.95, 19.76],
    ['2023/02/02', 21.13, 21.7, 21.85, 20.87],
    ['2023/02/03', 21.33, 21.24, 21.68, 21.06],
    ['2023/02/06', 20.95, 20.75, 21.09, 20.65],
    ['2023/02/07', 20.71, 21.04, 21.15, 20.48],
    ['2023/02/08', 20.95, 20.38, 20.95, 20.18],
    ['2023/02/09', 20.78, 20.36, 20.99, 20.27],
    ['2023/02/10', 20.29, 20.11, 20.34, 19.86],
    ['2023/02/13', 20.18, 20.33, 20.46, 19.97],
    ['2023/02/14', 20.12, 20.48, 20.58, 19.7],
    ['2023/02/15', 20.26, 20.45, 20.58, 20.21],
    ['2023/02/16', 20.6, 21.72, 22.19, 20.03],
    ['2023/02/17', 21.91, 21.72, 21.94, 21.16],
    ['2023/02/21', 21.33, 21.14, 21.54, 21.03],
    ['2023/02/22', 21.05, 20.68, 21.26, 20.43],
    ['2023/02/23', 21.25, 21.13, 21.38, 20.73],
    ['2023/02/24', 20.67, 20.85, 20.86, 20.52],
    ['2023/02/27', 21.12, 20.92, 21.18, 20.75],
    ['2023/02/28', 20.97, 21.27, 21.82, 20.9],
    ['2023/03/01', 21.42, 21.66, 21.8, 21.39],
    ['2023/03/02', 21.35, 21.59, 21.68, 20.87],
    ['2023/03/03', 21.65, 21.75, 21.79, 21.45],
    ['2023/03/06', 21.85, 21.11, 21.99, 20.95],
    ['2023/03/07', 21.13, 20.62, 21.28, 20.46],
    ['2023/03/08', 20.79, 21.02, 21.19, 20.67],
    ['2023/03/09', 21.19, 21.24, 21.41, 21.02],
    ['2023/03/10', 21.41, 20.82, 21.43, 20.63],
    ['2023/03/13', 20.59, 20.51, 20.73, 20.25],
    ['2023/03/14', 21.0, 21.17, 21.38, 20.82],
    ['2023/03/15', 20.57, 20.84, 20.92, 20.41],
    ['2023/03/16', 20.61, 21.29, 21.39, 20.61],
    ['2023/03/17', 21.32, 20.89, 21.44, 20.87],
    ['2023/03/20', 20.98, 21.11, 21.18, 20.71],
    ['2023/03/21', 21.37, 20.77, 21.5, 20.69],
    ['2023/03/22', 20.74, 20.5, 21.12, 20.48],
    ['2023/03/23', 20.74, 20.85, 21.21, 20.66],
    ['2023/03/24', 20.7, 20.75, 20.76, 20.36],
    ['2023/03/27', 20.85, 20.53, 20.85, 20.47],
    ['2023/03/28', 20.49, 20.47, 20.63, 20.34],
    ['2023/03/29', 20.69, 20.81, 20.91, 20.53],
    ['2023/03/30', 20.95, 20.95, 21.15, 20.83],
    ['2023/03/31', 20.95, 21.13, 21.18, 20.92],
    ['2023/04/03', 21.07, 20.91, 21.28, 20.5],
    ['2023/04/04', 20.88, 20.02, 20.94, 19.85],
    ['2023/04/05', 19.86, 19.85, 19.95, 19.69],
    ['2023/04/06', 19.8, 19.65, 19.84, 19.6],
    ['2023/04/10', 19.54, 20.14, 20.17, 19.52],
    ['2023/04/11', 20.27, 20.12, 20.32, 19.95],
    ['2023/04/12', 20.29, 19.69, 20.33, 19.56],
    ['2023/04/13', 19.77, 19.65, 19.92, 19.56],
    ['2023/04/14', 19.65, 19.6, 19.85, 19.37],
    ['2023/04/17', 19.36, 19.31, 19.48, 19.1],
    ['2023/04/18', 19.37, 19.11, 19.5, 19.0],
    ['2023/04/19', 18.93, 18.96, 19.06, 18.81],
    ['2023/04/20', 18.8, 19.09, 19.32, 18.8],
    ['2023/04/21', 19.03, 18.92, 19.16, 18.76],
    ['2023/04/24', 18.87, 18.95, 19.04, 18.68],
    ['2023/04/25', 18.8, 18.52, 18.86, 18.49],
    ['2023/04/26', 18.55, 18.38, 18.61, 18.25],
    ['2023/04/27', 18.38, 18.36, 18.48, 18.0],
    ['2023/04/28', 18.38, 18.42, 18.49, 18.29],
    ['2023/05/01', 18.47, 18.42, 18.7, 18.38],
    ['2023/05/02', 18.41, 18.4, 18.52, 18.09],
    ['2023/05/03', 18.39, 18.15, 18.58, 18.1],
    ['2023/05/04', 18.01, 17.81, 18.15, 17.7],
    ['2023/05/05', 18.0, 18.56, 18.62, 17.94],
    ['2023/05/08', 18.63, 19.25, 19.46, 18.35],
    ['2023/05/09', 19.51, 20.26, 20.67, 19.05],
    ['2023/05/10', 20.61, 20.81, 21.02, 20.42],
    ['2023/05/11', 20.74, 20.71, 20.92, 20.44],
    ['2023/05/12', 20.79, 20.77, 21.14, 20.57],
    ['2023/05/15', 20.87, 21.63, 21.78, 20.62],
    ['2023/05/16', 21.62, 22.48, 22.64, 21.57],
    ['2023/05/17', 21.57, 22.12, 22.31, 21.25],
    ['2023/05/18', 22.34, 22.9, 22.94, 21.83],
    ['2023/05/19', 23.07, 22.82, 23.07, 22.73],
    ['2023/05/22', 22.69, 23.01, 23.13, 22.69],
    ['2023/05/23', 22.92, 22.74, 23.19, 22.71],
    ['2023/05/24', 22.53, 22.51, 22.84, 22.36],
    ['2023/05/25', 23.12, 23.3, 23.43, 22.77],
    ['2023/05/26', 23.53, 24.59, 24.74, 23.24],
    ['2023/05/30', 25.0, 24.28, 25.0, 24.22],
    ['2023/05/31', 23.98, 24.41, 24.58, 23.74],
    ['2023/06/01', 24.35, 24.85, 25.06, 23.79],
    ['2023/06/02', 25.01, 25.08, 25.22, 24.43],
    ['2023/06/05', 24.75, 24.6, 25.0, 24.17],
    ['2023/06/06', 24.36, 25.14, 25.21, 24.25],
    ['2023/06/07', 25.33, 25.4, 25.87, 25.09],
    ['2023/06/08', 25.43, 25.22, 25.62, 25.21],
    ['2023/06/09', 25.31, 25.13, 25.5, 25.01],
    ['2023/06/12', 25.21, 25.02, 25.31, 24.84],
    ['2023/06/13', 25.23, 25.44, 25.58, 25.02],
    ['2023/06/14', 25.25, 25.07, 25.29, 24.73],
    ['2023/06/15', 24.93, 24.73, 24.93, 24.38],
    ['2023/06/16', 24.77, 24.83, 24.85, 24.34],
    ['2023/06/20', 24.87, 25.18, 25.27, 24.82],
    ['2023/06/21', 25.12, 24.89, 25.3, 24.64],
    ['2023/06/22', 24.79, 24.91, 25.22, 24.31],
    ['2023/06/23', 24.51, 24.21, 24.67, 24.18],
    ['2023/06/26', 24.28, 24.31, 24.64, 24.13],
    ['2023/06/27', 24.32, 25.28, 25.3, 24.32],
    ['2023/06/28', 25.02, 25.02, 25.31, 24.88],
    ['2023/06/29', 25.22, 25.58, 25.83, 25.1],
    ['2023/06/30', 25.89, 25.68, 26.23, 25.68],
    ['2023/07/03', 25.68, 25.8, 25.91, 25.35],
    ['2023/07/05', 25.54, 24.84, 25.57, 24.69],
    ['2023/07/06', 24.52, 24.36, 24.77, 24.13],
    ['2023/07/07', 24.45, 24.23, 24.64, 24.2],
    ['2023/07/10', 24.25, 24.48, 24.51, 23.93],
    ['2023/07/11', 24.63, 24.14, 24.63, 23.97],
    ['2023/07/12', 24.5, 24.16, 24.59, 24.13],
    ['2023/07/13', 24.39, 25.73, 25.81, 24.26],
    ['2023/07/14', 25.73, 25.71, 25.86, 25.43],
    ['2023/07/17', 25.71, 26.71, 27.18, 25.71],
    ['2023/07/18', 26.65, 26.92, 26.99, 26.29],
    ['2023/07/19', 26.9, 26.54, 26.92, 26.31],
    ['2023/07/20', 26.16, 25.75, 26.51, 25.52],
    ['2023/07/21', 26.2, 26.4, 26.55, 26.02],
    ['2023/07/24', 26.31, 26.31, 26.78, 26.06],
    ['2023/07/25', 26.31, 26.57, 26.82, 26.2],
    ['2023/07/26', 26.27, 26.46, 26.7, 26.05],
    ['2023/07/27', 27.11, 26.98, 27.57, 26.89],
    ['2023/07/28', 27.28, 27.53, 27.73, 27.15],
    ['2023/07/31', 27.5, 28.16, 28.25, 27.47],
    ['2023/08/01', 28.0, 28.7, 28.71, 27.86],
    ['2023/08/02', 28.5, 28.48, 28.84, 27.97],
]);
var volumes = [
    612800.0,
    181700.0,
    199100.0,
    250100.0,
    663100.0,
    371500.0,
    232700.0,
    1630300.0,
    234700.0,
    209600.0,
    141100.0,
    395800.0,
    187100.0,
    268800.0,
    305300.0,
    250200.0,
    345800.0,
    296400.0,
    443200.0,
    1315900.0,
    448500.0,
    444400.0,
    453700.0,
    376900.0,
    388800.0,
    287600.0,
    206800.0,
    156200.0,
    375900.0,
    793300.0,
    164100.0,
    481900.0,
    185500.0,
    159400.0,
    459400.0,
    299800.0,
    242800.0,
    217400.0,
    195700.0,
    346500.0,
    270800.0,
    318500.0,
    253700.0,
    313400.0,
    298400.0,
    238700.0,
    334500.0,
    208100.0,
    328600.0,
    252100.0,
    519300.0,
    200500.0,
    333900.0,
    239300.0,
    172800.0,
    247700.0,
    333400.0,
    455300.0,
    425900.0,
    417200.0,
    466900.0,
    403400.0,
    488100.0,
    484100.0,
    534600.0,
    394500.0,
    361700.0,
    643400.0,
    923700.0,
    344000.0,
    510500.0,
    729500.0,
    415800.0,
    639200.0,
    341000.0,
    532100.0,
    562600.0,
    500800.0,
    221300.0,
    225900.0,
    177300.0,
    390900.0,
    1593500.0,
    614700.0,
    324000.0,
    242800.0,
    240200.0,
    240100.0,
    582800.0,
    288800.0,
    214600.0,
    276400.0,
    342700.0,
    578800.0,
    566300.0,
    695600.0,
    253100.0,
    440100.0,
    337700.0,
    361200.0,
    187300.0,
    157800.0,
    246100.0,
    238800.0,
    206100.0,
    249900.0,
    381200.0,
    166300.0,
    293100.0,
    637400.0,
    209300.0,
    559400.0,
    443600.0,
    562400.0,
    225000.0,
    364200.0,
    272800.0,
    178500.0,
    381000.0,
    228300.0,
    242900.0,
    220300.0,
    163800.0,
    215200.0,
    454000.0,
    440700.0,
    539900.0,
    349600.0,
    201000.0,
    451300.0,
    252300.0,
    360500.0,
    421100.0,
    202500.0,
    311000.0,
    279500.0,
    806500.0,
    501900.0,
    369100.0,
    394500.0,
    265300.0,
    231500.0,
    240300.0,
    415400.0,
    270300.0,
    211300.0,
    177600.0,
    241500.0,
    6222100.0,
    363100.0,
    649200.0,
    307600.0,
    331900.0,
    317700.0,
    306600.0,
    232900.0,
    1061600.0,
    291600.0,
    267100.0,
    281400.0,
    350900.0,
    209700.0,
    186800.0,
    254900.0,
    232800.0,
    157800.0,
    490000.0,
    472100.0,
    455000.0,
    493700.0,
    266500.0,
    234800.0,
    189200.0,
    238500.0,
    213100.0,
    224500.0,
    355800.0,
    301500.0,
    216600.0,
    230900.0,
    215500.0,
    199000.0,
    335200.0,
    293400.0,
    244400.0,
    219500.0,
    239800.0,
    342100.0,
    361800.0,
    748900.0,
    504700.0,
    944300.0,
    1010400.0,
    638400.0,
    463500.0,
    371000.0,
    464600.0,
    605700.0,
    4669400.0,
    986500.0,
    462400.0,
    1357500.0,
    432200.0,
    757000.0,
    793400.0,
    1155200.0,
    858000.0,
    2293000.0,
    776600.0,
    623900.0,
    534800.0,
    366700.0,
    512000.0,
    360100.0,
    294000.0,
    679600.0,
    749800.0,
    606400.0,
    555500.0,
    1384200.0,
    423900.0,
    349900.0,
    299600.0,
    1672400.0,
    409600.0,
    337600.0,
    325700.0,
    400000.0,
    323600.0,
    141700.0,
    400600.0,
    289200.0,
    321400.0,
    525600.0,
    441000.0,
    648000.0,
    677200.0,
    372000.0,
    645000.0,
    482800.0,
    293500.0,
    453700.0,
    541600.0,
    259100.0,
    212100.0,
    200200.0,
    267100.0,
    268700.0,
    382800.0,
    393300.0,
    560900.0,
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
        text: "VECO",
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