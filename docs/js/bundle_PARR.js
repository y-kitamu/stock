/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_PARR");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/03', 17.22, 16.95, 17.51, 16.88],
    ['2022/08/04', 16.8, 16.27, 16.98, 16.25],
    ['2022/08/05', 15.96, 16.38, 16.83, 15.96],
    ['2022/08/08', 16.28, 16.69, 16.93, 16.28],
    ['2022/08/09', 18.0, 18.07, 18.56, 17.55],
    ['2022/08/10', 18.0, 18.43, 18.7, 17.77],
    ['2022/08/11', 18.92, 19.28, 19.3, 18.38],
    ['2022/08/12', 19.33, 19.55, 19.63, 19.12],
    ['2022/08/15', 18.71, 18.71, 18.98, 18.42],
    ['2022/08/16', 18.99, 18.83, 19.15, 18.61],
    ['2022/08/17', 18.84, 19.1, 19.24, 18.8],
    ['2022/08/18', 18.92, 19.0, 19.42, 18.7],
    ['2022/08/19', 18.82, 18.79, 18.95, 18.53],
    ['2022/08/22', 18.56, 18.58, 18.8, 18.07],
    ['2022/08/23', 18.98, 18.99, 19.34, 18.83],
    ['2022/08/24', 18.94, 18.95, 19.2, 18.62],
    ['2022/08/25', 19.0, 19.45, 19.68, 19.0],
    ['2022/08/26', 19.52, 19.2, 19.74, 19.01],
    ['2022/08/29', 19.2, 19.57, 19.93, 19.03],
    ['2022/08/30', 19.31, 18.78, 19.31, 18.53],
    ['2022/08/31', 18.34, 18.8, 19.09, 18.23],
    ['2022/09/01', 18.55, 18.2, 18.55, 17.87],
    ['2022/09/02', 18.75, 18.64, 18.91, 18.42],
    ['2022/09/06', 18.94, 18.24, 19.36, 18.2],
    ['2022/09/07', 17.89, 18.24, 18.27, 17.69],
    ['2022/09/08', 18.31, 18.05, 18.35, 17.9],
    ['2022/09/09', 18.47, 18.54, 18.71, 18.18],
    ['2022/09/12', 18.8, 18.22, 18.95, 18.14],
    ['2022/09/13', 17.85, 17.85, 18.32, 17.72],
    ['2022/09/14', 17.93, 17.85, 18.27, 17.56],
    ['2022/09/15', 17.55, 17.05, 17.55, 16.75],
    ['2022/09/16', 16.94, 16.81, 17.1, 16.47],
    ['2022/09/19', 16.07, 16.92, 17.0, 16.07],
    ['2022/09/20', 16.7, 16.78, 17.01, 16.61],
    ['2022/09/21', 17.11, 16.37, 17.11, 16.24],
    ['2022/09/22', 16.68, 16.57, 16.97, 16.43],
    ['2022/09/23', 15.93, 14.8, 16.01, 14.75],
    ['2022/09/26', 14.65, 14.52, 15.18, 14.42],
    ['2022/09/27', 15.0, 15.01, 15.36, 14.69],
    ['2022/09/28', 15.26, 16.36, 16.44, 15.16],
    ['2022/09/29', 16.16, 15.89, 16.26, 15.64],
    ['2022/09/30', 15.65, 16.41, 16.65, 15.6],
    ['2022/10/03', 17.06, 17.21, 17.29, 16.39],
    ['2022/10/04', 17.66, 18.37, 18.39, 17.61],
    ['2022/10/05', 18.23, 19.02, 19.11, 18.04],
    ['2022/10/06', 18.82, 19.14, 19.35, 18.69],
    ['2022/10/07', 19.17, 18.58, 19.4, 18.45],
    ['2022/10/10', 18.56, 18.18, 18.78, 17.97],
    ['2022/10/11', 18.05, 18.51, 18.85, 17.63],
    ['2022/10/12', 18.34, 18.61, 18.75, 17.97],
    ['2022/10/13', 18.3, 19.01, 19.13, 18.24],
    ['2022/10/14', 18.88, 18.33, 19.33, 18.25],
    ['2022/10/17', 18.78, 19.17, 19.54, 18.78],
    ['2022/10/18', 19.46, 19.54, 19.81, 19.14],
    ['2022/10/19', 19.61, 19.89, 20.24, 19.61],
    ['2022/10/20', 20.18, 22.09, 22.29, 19.97],
    ['2022/10/21', 22.12, 23.0, 23.14, 21.6],
    ['2022/10/24', 23.49, 22.99, 23.69, 22.47],
    ['2022/10/25', 22.97, 23.05, 23.35, 22.76],
    ['2022/10/26', 23.06, 23.44, 23.56, 23.01],
    ['2022/10/27', 24.04, 22.99, 24.62, 22.96],
    ['2022/10/28', 23.25, 23.11, 23.45, 22.56],
    ['2022/10/31', 22.73, 22.88, 23.67, 22.68],
    ['2022/11/01', 23.06, 23.27, 23.5, 22.25],
    ['2022/11/02', 23.52, 23.04, 24.15, 22.93],
    ['2022/11/03', 22.44, 23.5, 23.95, 22.4],
    ['2022/11/04', 23.99, 23.22, 24.1, 23.1],
    ['2022/11/07', 23.21, 23.35, 23.46, 23.0],
    ['2022/11/08', 23.5, 23.08, 23.5, 22.71],
    ['2022/11/09', 23.07, 22.6, 23.29, 22.55],
    ['2022/11/10', 23.05, 23.46, 24.0, 22.91],
    ['2022/11/11', 24.0, 23.81, 24.53, 23.53],
    ['2022/11/14', 23.83, 23.53, 24.41, 23.52],
    ['2022/11/15', 24.08, 24.05, 25.13, 23.95],
    ['2022/11/16', 23.8, 24.09, 24.56, 23.66],
    ['2022/11/17', 23.59, 24.5, 24.5, 23.52],
    ['2022/11/18', 24.13, 24.75, 24.75, 23.71],
    ['2022/11/21', 24.37, 23.78, 24.37, 23.23],
    ['2022/11/22', 24.25, 24.96, 25.38, 23.81],
    ['2022/11/23', 24.59, 23.91, 24.82, 23.86],
    ['2022/11/25', 23.99, 24.09, 24.68, 23.9],
    ['2022/11/28', 23.5, 23.42, 23.98, 23.26],
    ['2022/11/29', 23.59, 22.79, 23.78, 22.75],
    ['2022/11/30', 23.1, 23.43, 23.44, 22.74],
    ['2022/12/01', 23.68, 22.78, 23.94, 22.77],
    ['2022/12/02', 22.74, 22.26, 22.99, 22.09],
    ['2022/12/05', 22.49, 20.93, 22.57, 20.91],
    ['2022/12/06', 20.74, 20.94, 21.15, 20.55],
    ['2022/12/07', 20.91, 20.82, 21.15, 20.36],
    ['2022/12/08', 21.15, 20.05, 21.2, 19.98],
    ['2022/12/09', 19.98, 19.47, 20.13, 19.46],
    ['2022/12/12', 19.49, 20.48, 20.68, 19.39],
    ['2022/12/13', 20.91, 20.74, 21.19, 20.53],
    ['2022/12/14', 20.82, 20.94, 21.24, 20.58],
    ['2022/12/15', 20.75, 21.17, 21.38, 20.72],
    ['2022/12/16', 20.6, 21.08, 21.15, 20.16],
    ['2022/12/19', 21.13, 20.69, 21.51, 20.61],
    ['2022/12/20', 20.76, 21.07, 21.24, 20.65],
    ['2022/12/21', 21.55, 21.35, 21.56, 21.07],
    ['2022/12/22', 21.29, 20.89, 21.29, 20.39],
    ['2022/12/23', 21.23, 21.84, 21.89, 21.18],
    ['2022/12/27', 21.95, 22.63, 22.63, 21.82],
    ['2022/12/28', 22.64, 22.17, 22.65, 21.98],
    ['2022/12/29', 22.23, 23.11, 23.21, 22.23],
    ['2022/12/30', 22.94, 23.25, 23.52, 22.93],
    ['2023/01/03', 23.21, 22.06, 23.62, 21.9],
    ['2023/01/04', 21.73, 21.75, 22.13, 21.37],
    ['2023/01/05', 21.74, 22.1, 22.35, 21.46],
    ['2023/01/06', 22.47, 22.59, 22.87, 22.38],
    ['2023/01/09', 22.87, 22.49, 23.02, 22.13],
    ['2023/01/10', 22.64, 22.37, 22.8, 21.94],
    ['2023/01/11', 22.64, 22.42, 22.78, 22.23],
    ['2023/01/12', 22.56, 22.91, 23.12, 22.52],
    ['2023/01/13', 22.83, 23.57, 23.81, 22.83],
    ['2023/01/17', 23.66, 23.62, 24.07, 23.5],
    ['2023/01/18', 23.86, 23.76, 24.63, 23.6],
    ['2023/01/19', 23.74, 24.54, 24.9, 23.74],
    ['2023/01/20', 25.28, 26.61, 26.61, 24.78],
    ['2023/01/23', 26.75, 27.69, 27.82, 26.46],
    ['2023/01/24', 27.69, 27.51, 28.0, 27.13],
    ['2023/01/25', 27.55, 27.38, 27.57, 26.66],
    ['2023/01/26', 27.82, 27.88, 28.2, 27.2],
    ['2023/01/27', 27.88, 27.42, 27.99, 27.32],
    ['2023/01/30', 27.39, 26.29, 27.44, 26.26],
    ['2023/01/31', 26.17, 26.73, 26.95, 25.92],
    ['2023/02/01', 26.65, 26.52, 26.77, 25.45],
    ['2023/02/02', 26.52, 26.38, 26.76, 25.94],
    ['2023/02/03', 26.49, 26.93, 27.77, 26.49],
    ['2023/02/06', 26.9, 26.09, 27.07, 25.11],
    ['2023/02/07', 26.2, 27.61, 27.61, 26.2],
    ['2023/02/08', 27.59, 27.4, 27.78, 26.85],
    ['2023/02/09', 27.41, 26.83, 27.5, 26.8],
    ['2023/02/10', 27.37, 28.24, 28.27, 27.02],
    ['2023/02/13', 28.14, 28.08, 28.41, 27.76],
    ['2023/02/14', 28.0, 28.07, 28.6, 27.69],
    ['2023/02/15', 27.7, 28.07, 28.12, 27.15],
    ['2023/02/16', 27.91, 27.47, 28.19, 27.47],
    ['2023/02/17', 27.11, 26.73, 27.11, 26.25],
    ['2023/02/21', 26.42, 26.5, 26.86, 26.29],
    ['2023/02/22', 26.52, 25.84, 26.67, 25.45],
    ['2023/02/23', 26.2, 26.71, 26.99, 25.72],
    ['2023/02/24', 26.12, 27.7, 27.7, 25.57],
    ['2023/02/27', 27.7, 28.34, 28.64, 27.61],
    ['2023/02/28', 28.66, 27.78, 28.99, 27.58],
    ['2023/03/01', 27.8, 29.4, 29.61, 27.67],
    ['2023/03/02', 29.3, 29.15, 29.56, 28.91],
    ['2023/03/03', 28.75, 29.81, 29.89, 28.42],
    ['2023/03/06', 29.73, 29.16, 29.74, 29.14],
    ['2023/03/07', 29.17, 29.16, 29.5, 28.68],
    ['2023/03/08', 29.2, 28.57, 29.57, 28.03],
    ['2023/03/09', 28.57, 27.75, 29.2, 27.71],
    ['2023/03/10', 28.03, 27.57, 28.72, 27.43],
    ['2023/03/13', 26.38, 26.43, 27.18, 25.87],
    ['2023/03/14', 27.0, 27.04, 28.13, 26.63],
    ['2023/03/15', 25.92, 25.7, 26.15, 24.73],
    ['2023/03/16', 25.19, 26.63, 26.85, 25.0],
    ['2023/03/17', 26.48, 26.68, 26.88, 26.14],
    ['2023/03/20', 26.88, 27.44, 27.76, 26.68],
    ['2023/03/21', 28.28, 28.07, 28.49, 27.49],
    ['2023/03/22', 28.05, 28.12, 28.94, 27.76],
    ['2023/03/23', 28.38, 27.43, 28.84, 27.16],
    ['2023/03/24', 26.7, 27.84, 27.92, 26.29],
    ['2023/03/27', 28.46, 28.54, 28.77, 27.78],
    ['2023/03/28', 28.5, 29.34, 29.9, 28.5],
    ['2023/03/29', 29.58, 29.21, 29.81, 29.02],
    ['2023/03/30', 29.47, 29.11, 29.59, 28.95],
    ['2023/03/31', 29.12, 29.2, 29.45, 28.76],
    ['2023/04/03', 30.25, 29.74, 30.49, 29.01],
    ['2023/04/04', 29.63, 27.05, 29.76, 26.97],
    ['2023/04/05', 27.04, 28.38, 28.51, 27.01],
    ['2023/04/06', 28.18, 27.88, 28.5, 27.66],
    ['2023/04/10', 27.93, 28.37, 28.62, 27.93],
    ['2023/04/11', 28.37, 28.3, 28.55, 27.82],
    ['2023/04/12', 28.33, 26.88, 28.36, 26.62],
    ['2023/04/13', 27.09, 26.47, 27.09, 26.39],
    ['2023/04/14', 26.47, 25.61, 26.76, 25.15],
    ['2023/04/17', 25.65, 24.45, 25.73, 23.9],
    ['2023/04/18', 24.23, 24.74, 24.77, 23.82],
    ['2023/04/19', 24.35, 24.34, 24.42, 23.56],
    ['2023/04/20', 23.93, 23.95, 24.29, 23.65],
    ['2023/04/21', 24.02, 23.52, 24.02, 23.16],
    ['2023/04/24', 23.52, 23.97, 24.22, 23.44],
    ['2023/04/25', 23.69, 23.08, 23.73, 22.99],
    ['2023/04/26', 23.08, 22.83, 23.32, 22.68],
    ['2023/04/27', 22.78, 22.63, 23.18, 22.4],
    ['2023/04/28', 22.52, 23.43, 23.54, 22.45],
    ['2023/05/01', 23.11, 23.44, 23.54, 23.0],
    ['2023/05/02', 23.27, 22.51, 23.27, 22.27],
    ['2023/05/03', 22.27, 21.76, 22.5, 21.34],
    ['2023/05/04', 21.67, 21.26, 22.01, 20.74],
    ['2023/05/05', 21.43, 20.66, 21.88, 20.37],
    ['2023/05/08', 21.42, 20.92, 21.98, 20.77],
    ['2023/05/09', 20.53, 21.01, 21.38, 20.3],
    ['2023/05/10', 21.1, 21.42, 21.78, 20.69],
    ['2023/05/11', 21.01, 21.29, 21.64, 20.97],
    ['2023/05/12', 21.49, 21.3, 21.68, 21.02],
    ['2023/05/15', 21.48, 21.86, 21.88, 21.21],
    ['2023/05/16', 21.69, 21.3, 21.88, 21.0],
    ['2023/05/17', 21.61, 21.65, 21.97, 21.33],
    ['2023/05/18', 21.35, 21.65, 21.74, 20.99],
    ['2023/05/19', 21.87, 21.41, 21.88, 21.16],
    ['2023/05/22', 21.5, 21.49, 21.74, 21.32],
    ['2023/05/23', 21.72, 21.55, 22.17, 21.5],
    ['2023/05/24', 21.61, 21.12, 21.78, 20.98],
    ['2023/05/25', 20.76, 21.02, 21.08, 20.53],
    ['2023/05/26', 21.11, 21.68, 21.73, 21.01],
    ['2023/05/30', 21.33, 21.37, 21.49, 21.18],
    ['2023/05/31', 21.01, 21.32, 21.33, 20.81],
    ['2023/06/01', 21.46, 21.48, 21.61, 20.93],
    ['2023/06/02', 21.95, 22.34, 22.5, 21.76],
    ['2023/06/05', 22.5, 21.98, 22.64, 21.62],
    ['2023/06/06', 21.73, 22.92, 23.13, 21.73],
    ['2023/06/07', 23.02, 24.03, 24.26, 23.02],
    ['2023/06/08', 23.97, 23.8, 24.2, 23.56],
    ['2023/06/09', 23.66, 23.85, 24.04, 23.44],
    ['2023/06/12', 23.52, 23.68, 24.18, 23.4],
    ['2023/06/13', 23.94, 23.84, 24.42, 23.77],
    ['2023/06/14', 24.05, 23.48, 24.27, 23.2],
    ['2023/06/15', 23.37, 24.3, 24.34, 23.37],
    ['2023/06/16', 24.58, 24.18, 24.58, 24.04],
    ['2023/06/20', 24.01, 23.75, 24.15, 23.19],
    ['2023/06/21', 23.72, 24.78, 25.18, 23.61],
    ['2023/06/22', 24.29, 24.79, 24.79, 23.92],
    ['2023/06/23', 24.5, 24.45, 25.03, 24.4],
    ['2023/06/26', 24.53, 25.06, 25.87, 24.26],
    ['2023/06/27', 24.95, 25.45, 25.54, 24.9],
    ['2023/06/28', 25.37, 25.94, 26.06, 25.26],
    ['2023/06/29', 25.79, 26.19, 26.48, 25.79],
    ['2023/06/30', 26.4, 26.61, 26.71, 25.93],
    ['2023/07/03', 26.82, 26.76, 27.05, 26.67],
    ['2023/07/05', 27.0, 27.11, 27.32, 26.7],
    ['2023/07/06', 26.9, 26.89, 26.92, 26.05],
    ['2023/07/07', 26.96, 27.75, 27.91, 26.96],
    ['2023/07/10', 27.82, 27.2, 27.91, 27.17],
    ['2023/07/11', 27.14, 27.33, 27.4, 26.5],
    ['2023/07/12', 27.67, 26.69, 27.94, 26.67],
    ['2023/07/13', 26.81, 27.01, 27.42, 26.73],
    ['2023/07/14', 26.72, 26.85, 26.91, 26.26],
    ['2023/07/17', 26.64, 26.63, 27.21, 26.59],
    ['2023/07/18', 26.7, 27.17, 27.62, 26.7],
    ['2023/07/19', 27.41, 27.97, 27.97, 27.26],
    ['2023/07/20', 28.28, 28.7, 28.75, 28.0],
    ['2023/07/21', 28.86, 29.37, 29.5, 28.64],
    ['2023/07/24', 29.48, 30.52, 30.65, 29.3],
    ['2023/07/25', 30.21, 30.16, 30.8, 30.02],
    ['2023/07/26', 30.0, 30.63, 30.83, 29.78],
    ['2023/07/27', 30.7, 30.54, 31.02, 30.44],
    ['2023/07/28', 30.59, 31.07, 31.12, 30.45],
    ['2023/07/31', 31.25, 31.48, 31.59, 30.98],
    ['2023/08/01', 31.32, 31.69, 31.91, 31.22],
    ['2023/08/02', 31.65, 31.75, 32.25, 31.35],
]);
var volumes = [
    545500.0,
    485500.0,
    506700.0,
    456000.0,
    1723100.0,
    627500.0,
    877300.0,
    520800.0,
    460400.0,
    532500.0,
    670400.0,
    582700.0,
    697800.0,
    746300.0,
    691500.0,
    884700.0,
    1125500.0,
    472600.0,
    471000.0,
    696000.0,
    719700.0,
    619100.0,
    615900.0,
    718200.0,
    1114500.0,
    650500.0,
    715300.0,
    720600.0,
    741000.0,
    741000.0,
    862300.0,
    4115000.0,
    581000.0,
    624900.0,
    750800.0,
    824700.0,
    982200.0,
    827500.0,
    811800.0,
    812900.0,
    856800.0,
    1128300.0,
    828400.0,
    757300.0,
    927000.0,
    605500.0,
    829700.0,
    2213700.0,
    863700.0,
    402700.0,
    981700.0,
    437700.0,
    631700.0,
    703600.0,
    744800.0,
    2283300.0,
    1581400.0,
    1829700.0,
    1410700.0,
    836500.0,
    886400.0,
    548700.0,
    937600.0,
    1019700.0,
    1489200.0,
    894600.0,
    835800.0,
    665200.0,
    664200.0,
    522300.0,
    1437100.0,
    1169600.0,
    849300.0,
    1789500.0,
    1238400.0,
    990700.0,
    864200.0,
    1005600.0,
    1852000.0,
    911900.0,
    583700.0,
    717900.0,
    671000.0,
    1886200.0,
    773300.0,
    601000.0,
    778400.0,
    639400.0,
    755000.0,
    731800.0,
    742000.0,
    962900.0,
    983300.0,
    734900.0,
    511600.0,
    1845200.0,
    680500.0,
    445600.0,
    456500.0,
    515200.0,
    415300.0,
    929900.0,
    646400.0,
    564000.0,
    571100.0,
    820200.0,
    760500.0,
    471600.0,
    560700.0,
    532100.0,
    440100.0,
    531100.0,
    387200.0,
    567300.0,
    412700.0,
    612300.0,
    683700.0,
    2333400.0,
    1832100.0,
    725800.0,
    757300.0,
    682200.0,
    716300.0,
    587100.0,
    604900.0,
    809600.0,
    648600.0,
    1261900.0,
    1067000.0,
    675200.0,
    773800.0,
    609300.0,
    827000.0,
    535500.0,
    856800.0,
    632900.0,
    491600.0,
    598400.0,
    735600.0,
    1223100.0,
    1082300.0,
    975300.0,
    1047600.0,
    1167300.0,
    1090700.0,
    590800.0,
    791900.0,
    584100.0,
    698400.0,
    537100.0,
    543400.0,
    872600.0,
    1127100.0,
    764900.0,
    1249600.0,
    789300.0,
    3397200.0,
    1257400.0,
    897900.0,
    795800.0,
    545700.0,
    906300.0,
    1010100.0,
    860900.0,
    554200.0,
    366900.0,
    682900.0,
    898600.0,
    966200.0,
    832000.0,
    596000.0,
    727600.0,
    459000.0,
    947500.0,
    686200.0,
    1272700.0,
    1419700.0,
    1286800.0,
    1186900.0,
    867400.0,
    670500.0,
    786700.0,
    478900.0,
    506000.0,
    559000.0,
    889800.0,
    713600.0,
    769600.0,
    845400.0,
    1138200.0,
    1699900.0,
    1265100.0,
    1185700.0,
    1172700.0,
    761300.0,
    567200.0,
    1043200.0,
    1072100.0,
    2125500.0,
    1318500.0,
    553800.0,
    596200.0,
    1392100.0,
    661500.0,
    759700.0,
    642200.0,
    536800.0,
    1114800.0,
    1039000.0,
    758900.0,
    948700.0,
    982100.0,
    1074200.0,
    813900.0,
    682300.0,
    885200.0,
    811000.0,
    539100.0,
    806300.0,
    3093500.0,
    1497500.0,
    1018300.0,
    1179800.0,
    2956300.0,
    1165500.0,
    604000.0,
    831000.0,
    1042300.0,
    949800.0,
    699100.0,
    864000.0,
    668600.0,
    621300.0,
    499000.0,
    1055500.0,
    677300.0,
    581800.0,
    510500.0,
    602700.0,
    522500.0,
    554200.0,
    400100.0,
    531900.0,
    567300.0,
    579400.0,
    510900.0,
    413000.0,
    359000.0,
    649600.0,
    579400.0,
    708100.0,
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
        text: "PARR",
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