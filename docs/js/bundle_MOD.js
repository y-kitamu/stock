/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_MOD");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/03', 13.32, 13.43, 13.53, 13.16],
    ['2022/08/04', 14.29, 14.52, 14.94, 13.94],
    ['2022/08/05', 14.25, 14.82, 14.89, 14.01],
    ['2022/08/08', 15.03, 15.65, 15.86, 15.0],
    ['2022/08/09', 15.63, 15.72, 15.87, 15.56],
    ['2022/08/10', 16.0, 16.23, 16.56, 15.83],
    ['2022/08/11', 16.45, 15.5, 16.59, 15.47],
    ['2022/08/12', 15.71, 16.68, 16.74, 15.71],
    ['2022/08/15', 16.61, 17.14, 17.16, 16.4],
    ['2022/08/16', 17.03, 17.32, 17.52, 17.01],
    ['2022/08/17', 16.93, 17.19, 17.35, 16.71],
    ['2022/08/18', 17.21, 17.39, 17.49, 17.15],
    ['2022/08/19', 17.23, 16.85, 17.26, 16.77],
    ['2022/08/22', 16.41, 16.06, 16.62, 16.01],
    ['2022/08/23', 16.09, 16.07, 16.37, 16.02],
    ['2022/08/24', 16.0, 16.21, 16.32, 15.95],
    ['2022/08/25', 16.22, 16.56, 16.66, 16.22],
    ['2022/08/26', 16.45, 16.16, 16.81, 16.11],
    ['2022/08/29', 15.87, 15.59, 16.0, 15.57],
    ['2022/08/30', 15.66, 15.05, 15.73, 14.97],
    ['2022/08/31', 15.09, 14.98, 15.27, 14.89],
    ['2022/09/01', 14.79, 14.86, 14.98, 14.69],
    ['2022/09/02', 15.1, 14.79, 15.17, 14.69],
    ['2022/09/06', 14.77, 14.49, 14.89, 14.42],
    ['2022/09/07', 14.42, 14.94, 15.01, 14.42],
    ['2022/09/08', 14.67, 14.96, 14.96, 14.53],
    ['2022/09/09', 15.01, 15.31, 15.42, 15.01],
    ['2022/09/12', 15.54, 15.78, 15.8, 15.54],
    ['2022/09/13', 15.38, 15.38, 15.79, 15.34],
    ['2022/09/14', 15.33, 15.16, 15.33, 14.78],
    ['2022/09/15', 15.07, 15.26, 15.76, 15.07],
    ['2022/09/16', 15.0, 14.8, 15.09, 14.62],
    ['2022/09/19', 14.53, 15.37, 15.49, 14.43],
    ['2022/09/20', 15.14, 14.96, 15.18, 14.91],
    ['2022/09/21', 15.01, 14.58, 15.1, 14.54],
    ['2022/09/22', 14.5, 14.57, 14.63, 14.33],
    ['2022/09/23', 14.28, 13.8, 14.39, 13.51],
    ['2022/09/26', 13.72, 14.01, 14.31, 13.72],
    ['2022/09/27', 14.18, 13.48, 14.25, 13.36],
    ['2022/09/28', 13.56, 13.7, 13.88, 13.32],
    ['2022/09/29', 13.38, 13.05, 13.39, 12.85],
    ['2022/09/30', 12.98, 12.94, 13.32, 12.87],
    ['2022/10/03', 13.14, 13.44, 13.6, 12.98],
    ['2022/10/04', 13.82, 14.08, 14.1, 13.76],
    ['2022/10/05', 13.75, 14.05, 14.18, 13.59],
    ['2022/10/06', 13.93, 13.66, 14.19, 13.64],
    ['2022/10/07', 13.49, 13.23, 13.62, 13.15],
    ['2022/10/10', 13.35, 13.39, 13.46, 13.17],
    ['2022/10/11', 13.28, 13.58, 13.85, 13.17],
    ['2022/10/12', 13.56, 13.59, 13.78, 13.34],
    ['2022/10/13', 13.33, 14.34, 14.38, 13.1],
    ['2022/10/14', 14.39, 13.82, 14.52, 13.81],
    ['2022/10/17', 14.3, 14.58, 14.62, 14.2],
    ['2022/10/18', 15.0, 14.84, 15.19, 14.64],
    ['2022/10/19', 14.66, 14.76, 14.85, 14.5],
    ['2022/10/20', 14.79, 14.6, 14.88, 14.47],
    ['2022/10/21', 14.73, 15.28, 15.32, 14.7],
    ['2022/10/24', 15.38, 15.51, 15.64, 15.03],
    ['2022/10/25', 15.41, 16.04, 16.1, 15.24],
    ['2022/10/26', 16.36, 16.42, 16.7, 16.22],
    ['2022/10/27', 16.58, 16.86, 17.18, 16.5],
    ['2022/10/28', 16.82, 17.77, 17.8, 16.82],
    ['2022/10/31', 17.64, 17.92, 18.13, 17.29],
    ['2022/11/01', 18.09, 18.19, 18.3, 17.75],
    ['2022/11/02', 18.25, 16.84, 18.38, 16.77],
    ['2022/11/03', 18.01, 18.87, 19.0, 17.01],
    ['2022/11/04', 19.59, 21.02, 21.1, 19.52],
    ['2022/11/07', 21.02, 20.74, 21.14, 18.9],
    ['2022/11/08', 21.11, 20.56, 21.26, 20.13],
    ['2022/11/09', 20.17, 20.44, 20.7, 20.02],
    ['2022/11/10', 21.24, 20.99, 21.31, 20.64],
    ['2022/11/11', 20.99, 20.96, 21.49, 20.82],
    ['2022/11/14', 20.9, 21.21, 21.53, 20.69],
    ['2022/11/15', 21.52, 21.34, 22.13, 21.18],
    ['2022/11/16', 21.23, 21.09, 21.31, 20.69],
    ['2022/11/17', 20.8, 20.87, 20.87, 20.25],
    ['2022/11/18', 21.32, 21.56, 21.6, 20.81],
    ['2022/11/21', 21.25, 20.88, 21.35, 20.61],
    ['2022/11/22', 21.02, 21.47, 21.53, 20.89],
    ['2022/11/23', 21.3, 21.1, 21.55, 21.06],
    ['2022/11/25', 21.09, 21.27, 21.48, 21.05],
    ['2022/11/28', 20.96, 20.36, 21.04, 20.28],
    ['2022/11/29', 20.39, 20.6, 20.68, 20.17],
    ['2022/11/30', 20.58, 21.17, 21.17, 20.14],
    ['2022/12/01', 21.1, 21.13, 21.4, 20.99],
    ['2022/12/02', 20.74, 21.22, 21.4, 20.5],
    ['2022/12/05', 20.89, 20.53, 20.92, 20.44],
    ['2022/12/06', 21.08, 20.68, 21.26, 20.27],
    ['2022/12/07', 20.44, 20.48, 20.87, 20.29],
    ['2022/12/08', 20.61, 20.24, 20.66, 20.19],
    ['2022/12/09', 20.02, 19.68, 20.24, 19.68],
    ['2022/12/12', 19.56, 19.98, 20.0, 18.8],
    ['2022/12/13', 20.49, 20.29, 20.5, 20.13],
    ['2022/12/14', 20.1, 20.73, 20.87, 19.88],
    ['2022/12/15', 20.59, 20.3, 20.63, 20.04],
    ['2022/12/16', 20.07, 20.17, 20.48, 19.81],
    ['2022/12/19', 20.25, 20.35, 20.58, 20.25],
    ['2022/12/20', 20.24, 20.22, 20.39, 20.17],
    ['2022/12/21', 20.45, 21.39, 21.46, 20.45],
    ['2022/12/22', 21.2, 19.6, 21.2, 19.45],
    ['2022/12/23', 19.43, 19.64, 19.77, 19.11],
    ['2022/12/27', 19.7, 20.11, 20.15, 19.57],
    ['2022/12/28', 20.17, 19.55, 20.32, 19.52],
    ['2022/12/29', 19.84, 20.17, 20.17, 19.72],
    ['2022/12/30', 20.01, 19.86, 20.28, 19.83],
    ['2023/01/03', 20.13, 20.11, 20.28, 19.88],
    ['2023/01/04', 20.07, 20.15, 20.61, 19.95],
    ['2023/01/05', 20.07, 20.85, 21.0, 19.88],
    ['2023/01/06', 21.0, 21.35, 21.41, 20.86],
    ['2023/01/09', 21.53, 22.39, 22.83, 21.52],
    ['2023/01/10', 22.33, 22.6, 22.7, 22.22],
    ['2023/01/11', 22.68, 22.17, 22.76, 21.93],
    ['2023/01/12', 22.21, 23.12, 23.45, 22.02],
    ['2023/01/13', 22.8, 23.21, 23.28, 22.35],
    ['2023/01/17', 23.35, 22.44, 23.57, 22.43],
    ['2023/01/18', 22.6, 22.14, 23.12, 22.08],
    ['2023/01/19', 22.0, 21.23, 22.0, 21.09],
    ['2023/01/20', 21.29, 21.78, 21.79, 21.16],
    ['2023/01/23', 21.84, 22.1, 22.12, 21.61],
    ['2023/01/24', 22.0, 22.41, 22.65, 21.63],
    ['2023/01/25', 22.1, 22.49, 22.49, 21.89],
    ['2023/01/26', 22.63, 22.13, 22.8, 21.94],
    ['2023/01/27', 22.1, 22.55, 22.64, 22.1],
    ['2023/01/30', 22.35, 22.98, 23.38, 22.28],
    ['2023/01/31', 23.17, 23.89, 23.89, 23.0],
    ['2023/02/01', 23.87, 24.12, 24.43, 23.54],
    ['2023/02/02', 22.31, 22.66, 22.74, 19.5],
    ['2023/02/03', 22.92, 23.01, 23.32, 22.5],
    ['2023/02/06', 22.71, 23.66, 23.69, 22.42],
    ['2023/02/07', 23.4, 23.21, 23.5, 22.7],
    ['2023/02/08', 23.01, 23.09, 23.13, 22.74],
    ['2023/02/09', 23.33, 23.01, 23.47, 22.86],
    ['2023/02/10', 22.86, 22.58, 22.86, 22.36],
    ['2023/02/13', 22.58, 22.71, 22.71, 22.22],
    ['2023/02/14', 22.41, 22.99, 23.05, 22.27],
    ['2023/02/15', 22.66, 23.25, 23.28, 22.51],
    ['2023/02/16', 22.99, 24.05, 24.13, 22.62],
    ['2023/02/17', 24.04, 24.61, 24.66, 23.71],
    ['2023/02/21', 24.66, 25.05, 26.29, 24.6],
    ['2023/02/22', 24.98, 25.0, 25.46, 24.43],
    ['2023/02/23', 25.13, 24.72, 25.56, 24.48],
    ['2023/02/24', 24.31, 24.24, 24.67, 24.17],
    ['2023/02/27', 24.33, 24.17, 24.39, 23.92],
    ['2023/02/28', 24.23, 24.41, 25.01, 24.23],
    ['2023/03/01', 24.41, 25.39, 25.41, 24.36],
    ['2023/03/02', 25.05, 25.55, 25.65, 24.81],
    ['2023/03/03', 25.76, 26.54, 26.69, 25.6],
    ['2023/03/06', 26.6, 25.53, 26.9, 25.36],
    ['2023/03/07', 25.5, 25.52, 25.74, 25.37],
    ['2023/03/08', 25.59, 25.58, 25.9, 25.32],
    ['2023/03/09', 25.47, 24.94, 25.69, 24.92],
    ['2023/03/10', 24.77, 23.97, 24.85, 23.67],
    ['2023/03/13', 23.22, 22.83, 23.41, 22.6],
    ['2023/03/14', 23.31, 23.29, 23.91, 23.13],
    ['2023/03/15', 22.37, 22.21, 22.61, 21.56],
    ['2023/03/16', 21.83, 22.56, 22.83, 21.65],
    ['2023/03/17', 22.09, 21.03, 22.27, 20.85],
    ['2023/03/20', 21.19, 21.86, 22.17, 21.19],
    ['2023/03/21', 22.54, 22.96, 23.06, 22.49],
    ['2023/03/22', 22.9, 22.24, 23.09, 22.18],
    ['2023/03/23', 22.43, 22.28, 22.76, 21.98],
    ['2023/03/24', 22.0, 21.8, 22.0, 21.16],
    ['2023/03/27', 22.13, 21.78, 22.21, 21.71],
    ['2023/03/28', 21.77, 21.92, 21.96, 21.53],
    ['2023/03/29', 22.14, 22.01, 22.45, 21.85],
    ['2023/03/30', 22.22, 22.48, 22.56, 22.01],
    ['2023/03/31', 22.6, 23.05, 23.1, 22.4],
    ['2023/04/03', 22.95, 22.94, 23.34, 22.81],
    ['2023/04/04', 22.95, 20.96, 23.12, 20.6],
    ['2023/04/05', 20.74, 20.32, 20.89, 20.19],
    ['2023/04/06', 20.39, 20.58, 20.69, 19.94],
    ['2023/04/10', 20.46, 20.78, 21.06, 20.35],
    ['2023/04/11', 20.94, 21.02, 21.39, 20.74],
    ['2023/04/12', 21.27, 21.4, 21.54, 21.09],
    ['2023/04/13', 21.5, 21.6, 21.67, 21.08],
    ['2023/04/14', 21.7, 21.72, 22.08, 21.48],
    ['2023/04/17', 21.71, 21.98, 21.99, 21.47],
    ['2023/04/18', 22.13, 21.96, 22.37, 21.69],
    ['2023/04/19', 21.83, 21.73, 21.89, 21.5],
    ['2023/04/20', 21.24, 21.55, 21.73, 21.12],
    ['2023/04/21', 21.47, 21.25, 21.65, 21.05],
    ['2023/04/24', 21.26, 21.44, 21.59, 21.26],
    ['2023/04/25', 21.07, 20.68, 21.12, 20.67],
    ['2023/04/26', 20.58, 20.7, 20.89, 20.45],
    ['2023/04/27', 20.81, 20.8, 21.03, 20.4],
    ['2023/04/28', 20.73, 20.91, 21.04, 20.68],
    ['2023/05/01', 20.94, 21.12, 21.7, 20.91],
    ['2023/05/02', 21.0, 21.64, 21.7, 20.79],
    ['2023/05/03', 21.65, 21.03, 21.77, 20.99],
    ['2023/05/04', 20.88, 19.5, 21.23, 19.41],
    ['2023/05/05', 19.96, 20.01, 20.35, 19.94],
    ['2023/05/08', 20.3, 20.31, 20.42, 19.99],
    ['2023/05/09', 20.12, 20.37, 20.42, 20.01],
    ['2023/05/10', 20.87, 20.67, 20.88, 20.24],
    ['2023/05/11', 20.39, 20.39, 20.57, 20.01],
    ['2023/05/12', 20.34, 20.49, 20.61, 20.24],
    ['2023/05/15', 20.58, 20.57, 20.7, 20.39],
    ['2023/05/16', 20.32, 20.19, 20.55, 20.15],
    ['2023/05/17', 20.38, 21.18, 21.25, 20.38],
    ['2023/05/18', 21.06, 21.54, 21.59, 20.8],
    ['2023/05/19', 21.79, 21.24, 22.12, 21.02],
    ['2023/05/22', 21.27, 21.1, 21.47, 21.06],
    ['2023/05/23', 20.98, 20.64, 21.17, 20.46],
    ['2023/05/24', 20.37, 19.73, 20.37, 19.54],
    ['2023/05/25', 23.43, 24.42, 24.5, 22.28],
    ['2023/05/26', 25.0, 27.43, 27.5, 24.8],
    ['2023/05/30', 27.5, 28.24, 28.47, 27.32],
    ['2023/05/31', 28.0, 27.29, 28.03, 26.15],
    ['2023/06/01', 27.33, 27.14, 27.95, 26.59],
    ['2023/06/02', 27.68, 30.44, 30.59, 27.44],
    ['2023/06/05', 30.12, 29.68, 30.2, 28.94],
    ['2023/06/06', 29.4, 30.75, 31.04, 29.4],
    ['2023/06/07', 31.59, 32.56, 32.73, 31.32],
    ['2023/06/08', 32.4, 32.81, 33.33, 31.7],
    ['2023/06/09', 32.81, 32.15, 33.08, 32.08],
    ['2023/06/12', 32.15, 32.78, 33.22, 31.87],
    ['2023/06/13', 33.06, 32.8, 34.01, 32.79],
    ['2023/06/14', 32.8, 31.95, 33.07, 31.56],
    ['2023/06/15', 31.74, 31.62, 32.06, 31.25],
    ['2023/06/16', 31.86, 31.0, 32.0, 30.52],
    ['2023/06/20', 30.96, 30.98, 31.43, 30.72],
    ['2023/06/21', 30.93, 31.7, 32.07, 30.59],
    ['2023/06/22', 31.44, 31.86, 31.88, 30.64],
    ['2023/06/23', 31.55, 31.58, 31.98, 31.0],
    ['2023/06/26', 31.5, 31.2, 32.91, 30.84],
    ['2023/06/27', 31.2, 31.97, 32.24, 30.83],
    ['2023/06/28', 31.79, 32.93, 32.94, 31.38],
    ['2023/06/29', 32.94, 33.01, 33.29, 32.6],
    ['2023/06/30', 33.27, 33.02, 33.3, 32.76],
    ['2023/07/03', 33.26, 34.61, 34.68, 33.26],
    ['2023/07/05', 34.26, 33.13, 34.42, 32.87],
    ['2023/07/06', 32.95, 32.61, 33.19, 32.17],
    ['2023/07/07', 32.57, 32.77, 33.54, 32.57],
    ['2023/07/10', 32.77, 32.9, 33.33, 32.59],
    ['2023/07/11', 33.0, 32.97, 33.18, 32.46],
    ['2023/07/12', 33.8, 35.39, 35.97, 33.8],
    ['2023/07/13', 35.41, 36.67, 36.77, 34.91],
    ['2023/07/14', 36.72, 37.69, 37.74, 36.51],
    ['2023/07/17', 37.41, 37.19, 37.98, 36.55],
    ['2023/07/18', 37.21, 37.97, 37.97, 37.21],
    ['2023/07/19', 38.0, 37.34, 38.09, 36.76],
    ['2023/07/20', 37.44, 36.52, 37.49, 36.27],
    ['2023/07/21', 36.92, 36.63, 37.1, 36.14],
    ['2023/07/24', 36.6, 35.64, 36.92, 35.62],
    ['2023/07/25', 36.11, 36.12, 36.48, 35.88],
    ['2023/07/26', 35.95, 35.93, 36.7, 35.62],
    ['2023/07/27', 36.04, 35.39, 36.22, 35.12],
    ['2023/07/28', 35.75, 36.0, 36.38, 35.49],
    ['2023/07/31', 36.09, 37.56, 37.58, 35.93],
    ['2023/08/01', 37.1, 38.07, 38.34, 36.62],
    ['2023/08/02', 37.65, 38.18, 38.45, 37.34],
]);
var volumes = [
    252500.0,
    638700.0,
    687900.0,
    876700.0,
    586600.0,
    638000.0,
    664800.0,
    573000.0,
    468000.0,
    419400.0,
    384300.0,
    251500.0,
    450300.0,
    339700.0,
    268600.0,
    244300.0,
    278000.0,
    227800.0,
    430200.0,
    293800.0,
    471600.0,
    332100.0,
    326900.0,
    311800.0,
    272800.0,
    243500.0,
    275600.0,
    387400.0,
    588900.0,
    411100.0,
    348200.0,
    450300.0,
    268900.0,
    302200.0,
    288700.0,
    371600.0,
    414100.0,
    461700.0,
    309500.0,
    293100.0,
    269200.0,
    252700.0,
    307600.0,
    306400.0,
    285800.0,
    176600.0,
    221700.0,
    262900.0,
    292600.0,
    224500.0,
    432800.0,
    336600.0,
    354900.0,
    343200.0,
    270700.0,
    305200.0,
    392300.0,
    442700.0,
    278200.0,
    334100.0,
    471800.0,
    600500.0,
    604200.0,
    378400.0,
    550000.0,
    829200.0,
    813400.0,
    1329800.0,
    696000.0,
    577300.0,
    464400.0,
    496200.0,
    492100.0,
    535000.0,
    495700.0,
    427600.0,
    459600.0,
    493800.0,
    231300.0,
    264100.0,
    96000.0,
    244600.0,
    238400.0,
    445700.0,
    327900.0,
    234900.0,
    281800.0,
    677100.0,
    573900.0,
    251200.0,
    250600.0,
    524900.0,
    486300.0,
    430200.0,
    458100.0,
    797300.0,
    250000.0,
    242900.0,
    482700.0,
    409900.0,
    261600.0,
    253300.0,
    256200.0,
    218600.0,
    189500.0,
    283100.0,
    341600.0,
    484900.0,
    467300.0,
    741600.0,
    408600.0,
    588400.0,
    619100.0,
    441900.0,
    417000.0,
    427400.0,
    385400.0,
    366800.0,
    300400.0,
    272200.0,
    254200.0,
    243400.0,
    240000.0,
    735600.0,
    523900.0,
    531100.0,
    2237100.0,
    787900.0,
    573800.0,
    640100.0,
    379700.0,
    452000.0,
    399800.0,
    389800.0,
    394100.0,
    238600.0,
    492100.0,
    629800.0,
    855700.0,
    738400.0,
    505200.0,
    541400.0,
    358600.0,
    504500.0,
    414400.0,
    290500.0,
    594900.0,
    635800.0,
    382400.0,
    259200.0,
    298200.0,
    688900.0,
    507500.0,
    369600.0,
    578600.0,
    400200.0,
    844400.0,
    315500.0,
    431000.0,
    323900.0,
    393500.0,
    285100.0,
    361700.0,
    355000.0,
    318400.0,
    305500.0,
    432600.0,
    443100.0,
    485100.0,
    334900.0,
    422400.0,
    657900.0,
    262100.0,
    194700.0,
    162400.0,
    302000.0,
    181500.0,
    193200.0,
    307000.0,
    194700.0,
    251000.0,
    251700.0,
    241900.0,
    311600.0,
    297600.0,
    255200.0,
    350100.0,
    496000.0,
    344600.0,
    322900.0,
    351800.0,
    284000.0,
    208400.0,
    267500.0,
    264200.0,
    222900.0,
    199800.0,
    257400.0,
    224400.0,
    242900.0,
    371500.0,
    237200.0,
    306800.0,
    374300.0,
    1037700.0,
    926900.0,
    613600.0,
    801300.0,
    581600.0,
    772900.0,
    435200.0,
    575200.0,
    694800.0,
    584700.0,
    470900.0,
    449300.0,
    492300.0,
    477200.0,
    411700.0,
    1156200.0,
    355400.0,
    337400.0,
    574100.0,
    1953200.0,
    467100.0,
    423600.0,
    371100.0,
    397200.0,
    517800.0,
    338100.0,
    374800.0,
    295600.0,
    308400.0,
    332000.0,
    438600.0,
    978600.0,
    819800.0,
    1018300.0,
    701200.0,
    1005400.0,
    707600.0,
    387900.0,
    532700.0,
    408500.0,
    496400.0,
    388200.0,
    441600.0,
    647800.0,
    499200.0,
    614800.0,
    664800.0,
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
        text: "MOD",
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