/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_EXTR");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/12', 13.6, 13.73, 13.76, 13.5],
    ['2022/08/15', 13.57, 14.02, 14.04, 13.46],
    ['2022/08/16', 13.77, 13.63, 14.03, 13.57],
    ['2022/08/17', 13.44, 13.3, 13.52, 13.26],
    ['2022/08/18', 13.48, 14.42, 14.53, 13.43],
    ['2022/08/19', 14.13, 13.79, 14.14, 13.71],
    ['2022/08/22', 13.58, 13.78, 13.81, 13.42],
    ['2022/08/23', 13.72, 14.01, 14.11, 13.72],
    ['2022/08/24', 13.96, 14.04, 14.27, 13.85],
    ['2022/08/25', 14.19, 14.36, 14.55, 14.13],
    ['2022/08/26', 14.28, 14.21, 14.44, 14.02],
    ['2022/08/29', 14.22, 15.35, 15.37, 14.07],
    ['2022/08/30', 15.41, 14.6, 15.62, 14.45],
    ['2022/08/31', 14.6, 14.33, 14.98, 14.28],
    ['2022/09/01', 14.03, 14.2, 14.26, 13.96],
    ['2022/09/02', 14.42, 14.12, 14.84, 14.03],
    ['2022/09/06', 14.09, 13.69, 14.2, 13.41],
    ['2022/09/07', 13.74, 13.97, 13.99, 13.58],
    ['2022/09/08', 13.87, 14.1, 14.16, 13.7],
    ['2022/09/09', 14.27, 14.22, 14.4, 14.18],
    ['2022/09/12', 14.34, 14.2, 14.43, 14.06],
    ['2022/09/13', 13.79, 13.77, 13.95, 13.73],
    ['2022/09/14', 13.99, 13.63, 13.99, 13.41],
    ['2022/09/15', 13.51, 13.13, 13.59, 12.99],
    ['2022/09/16', 12.97, 13.09, 13.11, 12.68],
    ['2022/09/19', 12.98, 13.2, 13.28, 12.71],
    ['2022/09/20', 13.18, 13.1, 13.18, 12.89],
    ['2022/09/21', 13.15, 12.94, 13.38, 12.93],
    ['2022/09/22', 12.86, 12.62, 12.86, 12.54],
    ['2022/09/23', 12.43, 12.34, 12.5, 12.09],
    ['2022/09/26', 12.28, 12.26, 12.73, 12.21],
    ['2022/09/27', 12.42, 12.53, 12.78, 12.27],
    ['2022/09/28', 12.58, 12.94, 13.04, 12.58],
    ['2022/09/29', 12.72, 12.92, 12.95, 12.69],
    ['2022/09/30', 12.9, 13.07, 13.4, 12.9],
    ['2022/10/03', 13.3, 13.1, 13.46, 13.07],
    ['2022/10/04', 13.43, 13.94, 13.95, 13.4],
    ['2022/10/05', 13.75, 14.16, 14.19, 13.52],
    ['2022/10/06', 14.17, 14.28, 14.52, 14.17],
    ['2022/10/07', 14.1, 13.7, 14.18, 13.55],
    ['2022/10/10', 13.64, 13.63, 13.71, 13.26],
    ['2022/10/11', 13.55, 13.23, 13.57, 13.02],
    ['2022/10/12', 13.27, 13.09, 13.51, 12.96],
    ['2022/10/13', 12.82, 13.32, 13.38, 12.62],
    ['2022/10/14', 13.43, 13.23, 13.54, 13.11],
    ['2022/10/17', 13.47, 13.96, 14.01, 13.47],
    ['2022/10/18', 14.29, 14.4, 14.71, 14.08],
    ['2022/10/19', 14.29, 14.13, 14.52, 14.08],
    ['2022/10/20', 14.13, 14.38, 14.97, 14.09],
    ['2022/10/21', 14.66, 15.0, 15.09, 14.38],
    ['2022/10/24', 15.26, 15.28, 15.42, 14.85],
    ['2022/10/25', 15.27, 15.86, 15.91, 15.19],
    ['2022/10/26', 15.76, 15.69, 16.22, 15.55],
    ['2022/10/27', 15.81, 16.56, 17.0, 15.75],
    ['2022/10/28', 16.98, 17.86, 17.87, 16.71],
    ['2022/10/31', 17.35, 17.94, 18.28, 17.35],
    ['2022/11/01', 17.99, 18.26, 18.44, 17.8],
    ['2022/11/02', 18.12, 17.17, 18.16, 16.88],
    ['2022/11/03', 17.0, 17.36, 17.41, 16.89],
    ['2022/11/04', 17.58, 17.87, 17.89, 17.34],
    ['2022/11/07', 17.98, 18.05, 18.15, 17.61],
    ['2022/11/08', 18.23, 18.14, 18.57, 17.82],
    ['2022/11/09', 17.9, 17.44, 18.07, 17.38],
    ['2022/11/10', 18.2, 18.32, 18.43, 18.01],
    ['2022/11/11', 18.45, 17.95, 19.05, 17.91],
    ['2022/11/14', 17.82, 18.22, 18.68, 17.75],
    ['2022/11/15', 18.46, 18.38, 18.66, 18.28],
    ['2022/11/16', 18.21, 18.43, 18.59, 18.09],
    ['2022/11/17', 18.23, 18.75, 19.01, 18.12],
    ['2022/11/18', 19.05, 19.06, 19.5, 18.82],
    ['2022/11/21', 18.9, 19.01, 19.2, 18.9],
    ['2022/11/22', 19.23, 19.73, 19.9, 19.23],
    ['2022/11/23', 19.65, 19.92, 20.25, 19.65],
    ['2022/11/25', 19.92, 20.3, 20.33, 19.92],
    ['2022/11/28', 20.12, 19.9, 20.27, 19.81],
    ['2022/11/29', 19.93, 19.77, 19.98, 19.52],
    ['2022/11/30', 19.9, 20.97, 20.98, 19.89],
    ['2022/12/01', 21.03, 20.0, 21.03, 19.89],
    ['2022/12/02', 19.7, 20.13, 20.42, 19.61],
    ['2022/12/05', 19.98, 20.05, 20.09, 19.7],
    ['2022/12/06', 20.14, 19.59, 20.14, 19.4],
    ['2022/12/07', 19.47, 19.55, 19.72, 19.4],
    ['2022/12/08', 19.8, 20.36, 20.48, 19.8],
    ['2022/12/09', 20.32, 19.72, 20.45, 19.68],
    ['2022/12/12', 19.79, 20.29, 20.33, 19.32],
    ['2022/12/13', 20.86, 20.44, 20.97, 20.14],
    ['2022/12/14', 20.35, 19.97, 20.57, 19.79],
    ['2022/12/15', 19.79, 19.27, 19.83, 19.19],
    ['2022/12/16', 18.86, 18.63, 19.13, 18.25],
    ['2022/12/19', 18.76, 18.53, 18.93, 18.4],
    ['2022/12/20', 18.54, 18.45, 18.71, 18.42],
    ['2022/12/21', 18.66, 18.38, 18.68, 18.3],
    ['2022/12/22', 18.27, 18.49, 18.51, 17.9],
    ['2022/12/23', 18.52, 18.45, 18.68, 18.11],
    ['2022/12/27', 18.61, 18.5, 18.7, 18.37],
    ['2022/12/28', 18.5, 18.17, 18.83, 18.14],
    ['2022/12/29', 18.41, 18.54, 18.59, 18.25],
    ['2022/12/30', 18.4, 18.31, 18.51, 18.0],
    ['2023/01/03', 18.5, 18.43, 18.56, 18.09],
    ['2023/01/04', 18.75, 18.78, 19.31, 18.61],
    ['2023/01/05', 18.64, 18.43, 18.72, 18.26],
    ['2023/01/06', 18.7, 19.02, 19.12, 18.67],
    ['2023/01/09', 19.21, 19.19, 19.58, 19.06],
    ['2023/01/10', 19.12, 19.36, 19.38, 19.0],
    ['2023/01/11', 19.38, 19.24, 19.62, 19.17],
    ['2023/01/12', 19.38, 19.35, 19.51, 19.23],
    ['2023/01/13', 19.23, 19.18, 19.51, 19.14],
    ['2023/01/17', 19.17, 19.77, 20.08, 19.17],
    ['2023/01/18', 19.82, 19.17, 20.02, 19.06],
    ['2023/01/19', 19.11, 18.64, 19.3, 18.61],
    ['2023/01/20', 18.76, 18.88, 19.07, 17.45],
    ['2023/01/23', 18.99, 19.63, 19.88, 18.95],
    ['2023/01/24', 19.55, 19.31, 19.87, 18.8],
    ['2023/01/25', 17.44, 16.5, 17.5, 14.63],
    ['2023/01/26', 17.04, 17.57, 17.69, 16.51],
    ['2023/01/27', 17.53, 17.51, 18.19, 17.25],
    ['2023/01/30', 17.3, 17.49, 17.95, 17.3],
    ['2023/01/31', 17.49, 18.03, 18.06, 17.48],
    ['2023/02/01', 18.01, 18.22, 18.38, 17.62],
    ['2023/02/02', 18.32, 18.81, 19.13, 18.24],
    ['2023/02/03', 18.67, 19.28, 19.37, 18.57],
    ['2023/02/06', 19.21, 18.84, 19.51, 18.8],
    ['2023/02/07', 18.78, 19.25, 19.28, 18.51],
    ['2023/02/08', 19.18, 19.32, 19.51, 18.9],
    ['2023/02/09', 19.6, 19.25, 19.84, 19.1],
    ['2023/02/10', 19.08, 18.51, 19.26, 18.43],
    ['2023/02/13', 18.63, 18.84, 18.9, 18.35],
    ['2023/02/14', 18.65, 18.86, 19.18, 18.64],
    ['2023/02/15', 18.78, 19.08, 19.24, 18.77],
    ['2023/02/16', 18.78, 19.3, 19.56, 18.75],
    ['2023/02/17', 19.3, 19.31, 19.51, 19.0],
    ['2023/02/21', 19.18, 18.75, 19.18, 18.7],
    ['2023/02/22', 18.76, 18.88, 18.97, 18.52],
    ['2023/02/23', 19.09, 19.14, 19.31, 18.56],
    ['2023/02/24', 18.94, 18.84, 18.94, 18.55],
    ['2023/02/27', 19.03, 18.68, 19.07, 18.62],
    ['2023/02/28', 18.7, 18.72, 19.0, 18.53],
    ['2023/03/01', 18.79, 18.27, 18.95, 18.16],
    ['2023/03/02', 18.18, 18.23, 18.25, 17.68],
    ['2023/03/03', 18.44, 18.13, 18.54, 18.0],
    ['2023/03/06', 18.34, 17.83, 18.58, 17.7],
    ['2023/03/07', 17.98, 17.59, 18.21, 17.33],
    ['2023/03/08', 17.61, 17.9, 18.11, 17.49],
    ['2023/03/09', 17.98, 17.62, 18.06, 17.59],
    ['2023/03/10', 17.55, 17.57, 17.92, 17.32],
    ['2023/03/13', 17.3, 17.08, 17.45, 17.03],
    ['2023/03/14', 17.5, 17.46, 17.81, 17.14],
    ['2023/03/15', 17.05, 16.98, 17.22, 16.56],
    ['2023/03/16', 16.82, 17.68, 17.83, 16.73],
    ['2023/03/17', 17.53, 17.62, 17.74, 17.38],
    ['2023/03/20', 17.71, 18.02, 18.11, 17.53],
    ['2023/03/21', 18.27, 18.35, 18.45, 18.08],
    ['2023/03/22', 18.34, 17.9, 18.47, 17.89],
    ['2023/03/23', 18.12, 17.73, 18.39, 17.6],
    ['2023/03/24', 17.58, 17.79, 17.82, 17.36],
    ['2023/03/27', 18.01, 17.96, 18.08, 17.7],
    ['2023/03/28', 17.96, 17.87, 17.99, 17.67],
    ['2023/03/29', 18.12, 17.85, 18.23, 17.73],
    ['2023/03/30', 18.08, 18.22, 18.26, 17.96],
    ['2023/03/31', 18.35, 19.12, 19.26, 18.33],
    ['2023/04/03', 19.0, 18.96, 19.32, 18.73],
    ['2023/04/04', 18.88, 18.73, 19.0, 18.56],
    ['2023/04/05', 18.66, 19.02, 19.07, 18.56],
    ['2023/04/06', 18.66, 18.85, 18.96, 18.36],
    ['2023/04/10', 18.77, 19.44, 19.52, 18.75],
    ['2023/04/11', 19.47, 18.9, 19.51, 18.88],
    ['2023/04/12', 19.06, 18.93, 19.2, 18.84],
    ['2023/04/13', 19.08, 19.4, 19.46, 18.95],
    ['2023/04/14', 19.38, 19.21, 19.56, 19.07],
    ['2023/04/17', 19.19, 18.81, 19.27, 18.8],
    ['2023/04/18', 18.91, 18.4, 19.02, 18.4],
    ['2023/04/19', 16.31, 16.12, 16.36, 14.67],
    ['2023/04/20', 15.87, 15.81, 16.15, 15.64],
    ['2023/04/21', 15.74, 15.71, 15.9, 15.46],
    ['2023/04/24', 15.71, 16.27, 16.36, 15.71],
    ['2023/04/25', 16.1, 15.74, 16.11, 15.71],
    ['2023/04/26', 16.9, 16.32, 17.15, 16.1],
    ['2023/04/27', 16.52, 17.07, 17.37, 16.1],
    ['2023/04/28', 17.03, 17.78, 18.17, 17.03],
    ['2023/05/01', 17.74, 17.44, 17.91, 17.4],
    ['2023/05/02', 17.45, 16.78, 17.53, 16.75],
    ['2023/05/03', 16.73, 16.47, 16.91, 16.43],
    ['2023/05/04', 16.42, 16.43, 16.8, 16.29],
    ['2023/05/05', 16.69, 16.45, 16.88, 16.44],
    ['2023/05/08', 16.61, 16.74, 16.88, 16.44],
    ['2023/05/09', 16.5, 16.45, 16.78, 16.39],
    ['2023/05/10', 16.6, 16.66, 16.9, 16.46],
    ['2023/05/11', 16.61, 16.62, 16.81, 16.46],
    ['2023/05/12', 16.7, 16.68, 16.95, 16.52],
    ['2023/05/15', 16.7, 16.81, 16.85, 16.6],
    ['2023/05/16', 16.73, 16.78, 16.86, 16.59],
    ['2023/05/17', 17.48, 17.76, 17.79, 17.18],
    ['2023/05/18', 17.56, 18.42, 18.6, 17.52],
    ['2023/05/19', 18.61, 18.62, 18.74, 18.47],
    ['2023/05/22', 18.64, 18.89, 18.97, 18.64],
    ['2023/05/23', 18.79, 18.53, 19.09, 18.49],
    ['2023/05/24', 18.48, 18.43, 18.48, 18.05],
    ['2023/05/25', 18.72, 18.41, 18.86, 18.23],
    ['2023/05/26', 18.47, 18.79, 19.05, 18.47],
    ['2023/05/30', 19.08, 19.69, 19.72, 18.82],
    ['2023/05/31', 20.0, 20.6, 21.04, 19.71],
    ['2023/06/01', 20.75, 20.85, 21.03, 20.39],
    ['2023/06/02', 21.0, 21.87, 22.07, 20.9],
    ['2023/06/05', 21.85, 21.36, 21.85, 21.01],
    ['2023/06/06', 21.3, 21.92, 21.93, 21.07],
    ['2023/06/07', 22.14, 22.67, 23.21, 22.14],
    ['2023/06/08', 22.66, 22.82, 23.06, 22.57],
    ['2023/06/09', 23.06, 23.2, 23.38, 23.0],
    ['2023/06/12', 23.55, 24.07, 24.4, 23.45],
    ['2023/06/13', 24.38, 24.36, 24.83, 24.04],
    ['2023/06/14', 24.36, 24.5, 24.69, 24.18],
    ['2023/06/15', 24.14, 24.73, 24.81, 23.88],
    ['2023/06/16', 24.82, 24.89, 25.13, 24.58],
    ['2023/06/20', 24.81, 24.6, 24.93, 24.48],
    ['2023/06/21', 24.45, 24.11, 24.62, 24.04],
    ['2023/06/22', 23.98, 24.24, 24.27, 23.64],
    ['2023/06/23', 23.95, 23.3, 23.95, 23.24],
    ['2023/06/26', 23.4, 22.93, 24.06, 22.92],
    ['2023/06/27', 23.01, 22.81, 23.24, 22.72],
    ['2023/06/28', 23.49, 24.23, 24.79, 23.35],
    ['2023/06/29', 24.37, 25.71, 26.29, 24.35],
    ['2023/06/30', 26.05, 26.05, 26.89, 25.55],
    ['2023/07/03', 26.08, 26.34, 26.44, 25.77],
    ['2023/07/05', 26.12, 26.12, 26.52, 25.84],
    ['2023/07/06', 25.89, 25.9, 26.0, 25.48],
    ['2023/07/07', 26.01, 27.21, 27.3, 25.95],
    ['2023/07/10', 27.0, 27.44, 27.85, 26.98],
    ['2023/07/11', 27.64, 26.77, 27.79, 26.62],
    ['2023/07/12', 27.3, 27.05, 27.37, 26.71],
    ['2023/07/13', 27.05, 27.61, 27.74, 26.89],
    ['2023/07/14', 27.49, 26.72, 27.61, 26.11],
    ['2023/07/17', 26.73, 27.49, 27.72, 26.62],
    ['2023/07/18', 27.41, 28.4, 28.48, 27.27],
    ['2023/07/19', 28.45, 27.67, 28.6, 27.54],
    ['2023/07/20', 27.51, 27.49, 28.15, 27.36],
    ['2023/07/21', 27.9, 27.09, 27.95, 27.01],
    ['2023/07/24', 27.31, 27.03, 27.34, 26.68],
    ['2023/07/25', 27.02, 27.3, 27.54, 27.02],
    ['2023/07/26', 27.4, 27.06, 27.47, 26.88],
    ['2023/07/27', 27.46, 27.34, 27.51, 27.05],
    ['2023/07/28', 27.45, 27.24, 27.5, 26.83],
    ['2023/07/31', 27.37, 26.59, 27.37, 26.43],
    ['2023/08/01', 26.45, 27.85, 28.11, 26.45],
    ['2023/08/02', 28.05, 30.22, 30.65, 27.85],
    ['2023/08/03', 29.32, 29.69, 30.07, 28.8],
    ['2023/08/04', 29.5, 30.44, 31.62, 29.5],
    ['2023/08/07', 30.73, 30.51, 30.99, 29.76],
    ['2023/08/08', 30.32, 31.12, 31.14, 30.29],
    ['2023/08/09', 31.05, 31.3, 31.61, 30.69],
    ['2023/08/10', 31.64, 31.71, 32.73, 31.4],
]);
var volumes = [
    916100.0,
    1122100.0,
    1528300.0,
    869600.0,
    1833900.0,
    1650900.0,
    1226900.0,
    1093600.0,
    741900.0,
    902600.0,
    1245800.0,
    2558000.0,
    1857900.0,
    1664900.0,
    998300.0,
    970700.0,
    915300.0,
    1003900.0,
    541500.0,
    661100.0,
    836300.0,
    862300.0,
    834100.0,
    919500.0,
    2405700.0,
    585400.0,
    521500.0,
    619600.0,
    555300.0,
    574500.0,
    848600.0,
    923700.0,
    938600.0,
    957500.0,
    2779300.0,
    1220200.0,
    1567100.0,
    893400.0,
    782700.0,
    868700.0,
    672100.0,
    779900.0,
    790200.0,
    768900.0,
    667200.0,
    874400.0,
    1094000.0,
    1032300.0,
    1884500.0,
    1232800.0,
    962100.0,
    2187000.0,
    1848600.0,
    2327100.0,
    2928100.0,
    1927400.0,
    1407100.0,
    2123900.0,
    1564300.0,
    862600.0,
    1123100.0,
    1243700.0,
    1012600.0,
    1087800.0,
    1274100.0,
    1026000.0,
    1296700.0,
    796400.0,
    1201600.0,
    1166300.0,
    854100.0,
    1719500.0,
    1114700.0,
    400200.0,
    976600.0,
    1012400.0,
    1787100.0,
    1290600.0,
    1089600.0,
    999400.0,
    917800.0,
    952900.0,
    1086400.0,
    950600.0,
    1009400.0,
    1059200.0,
    1003700.0,
    1148800.0,
    3192300.0,
    774400.0,
    895300.0,
    884300.0,
    1097700.0,
    390500.0,
    581600.0,
    671400.0,
    459100.0,
    887300.0,
    818300.0,
    1199000.0,
    931700.0,
    1009900.0,
    805000.0,
    476100.0,
    588500.0,
    722300.0,
    1023400.0,
    1472000.0,
    1377600.0,
    1024900.0,
    3135500.0,
    1745900.0,
    822600.0,
    9076100.0,
    3415100.0,
    2857600.0,
    1274900.0,
    1397500.0,
    1371300.0,
    1611400.0,
    1682000.0,
    1346400.0,
    1786600.0,
    1032800.0,
    909000.0,
    1146000.0,
    725200.0,
    638800.0,
    900500.0,
    1441900.0,
    956600.0,
    1075900.0,
    982500.0,
    688300.0,
    1014500.0,
    698200.0,
    1028000.0,
    1298500.0,
    1641100.0,
    1480300.0,
    2033400.0,
    2035400.0,
    1100600.0,
    1105000.0,
    1096700.0,
    1306500.0,
    1324600.0,
    1609800.0,
    1069600.0,
    3291100.0,
    1025900.0,
    1204000.0,
    898000.0,
    1062300.0,
    927400.0,
    835500.0,
    733800.0,
    839500.0,
    745700.0,
    2213800.0,
    872200.0,
    817500.0,
    1289900.0,
    1081000.0,
    1299700.0,
    977600.0,
    928200.0,
    769500.0,
    724500.0,
    619100.0,
    1001500.0,
    6513000.0,
    1864600.0,
    1346200.0,
    1376800.0,
    1848200.0,
    2327000.0,
    2210100.0,
    2102600.0,
    1362900.0,
    1601200.0,
    1670200.0,
    1371400.0,
    1205600.0,
    1041600.0,
    1291300.0,
    2113300.0,
    1473900.0,
    1472800.0,
    1080100.0,
    1434800.0,
    2050900.0,
    2036800.0,
    1521500.0,
    1450200.0,
    1187900.0,
    1038900.0,
    1221900.0,
    1894300.0,
    2158200.0,
    5237200.0,
    2555300.0,
    3811100.0,
    2136600.0,
    2062400.0,
    3489500.0,
    1438300.0,
    1657000.0,
    3484700.0,
    2929000.0,
    1930500.0,
    1655200.0,
    2799200.0,
    1630400.0,
    1407900.0,
    2244800.0,
    2396000.0,
    2167100.0,
    1866600.0,
    3357900.0,
    3488000.0,
    3549000.0,
    1220500.0,
    1928100.0,
    1479800.0,
    2507600.0,
    2301300.0,
    2262300.0,
    2131300.0,
    1451400.0,
    2239500.0,
    1313600.0,
    1441400.0,
    2115300.0,
    1526300.0,
    1212800.0,
    999700.0,
    1157300.0,
    1497700.0,
    1663600.0,
    1425000.0,
    2259000.0,
    3372600.0,
    4797500.0,
    2537900.0,
    3179400.0,
    1755000.0,
    1820700.0,
    2506600.0,
    1956800.0,
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
     *     text: "EXTR",
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