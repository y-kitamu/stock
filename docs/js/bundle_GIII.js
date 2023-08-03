/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_GIII");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/03', 22.0, 22.68, 22.73, 21.9],
    ['2022/08/04', 22.6, 22.52, 22.65, 22.16],
    ['2022/08/05', 22.32, 22.61, 22.69, 22.32],
    ['2022/08/08', 22.96, 23.47, 23.8, 22.71],
    ['2022/08/09', 23.27, 22.4, 23.47, 22.07],
    ['2022/08/10', 23.15, 23.24, 23.64, 23.0],
    ['2022/08/11', 23.66, 23.49, 24.12, 23.18],
    ['2022/08/12', 23.75, 24.05, 24.05, 23.46],
    ['2022/08/15', 23.64, 23.87, 23.91, 23.51],
    ['2022/08/16', 23.95, 24.92, 25.23, 23.8],
    ['2022/08/17', 24.41, 24.42, 24.7, 24.13],
    ['2022/08/18', 24.24, 24.65, 24.79, 23.83],
    ['2022/08/19', 24.25, 23.99, 24.5, 23.77],
    ['2022/08/22', 23.43, 23.14, 23.65, 22.97],
    ['2022/08/23', 23.19, 23.43, 23.92, 23.15],
    ['2022/08/24', 23.33, 22.99, 23.33, 22.9],
    ['2022/08/25', 22.94, 23.64, 23.89, 22.9],
    ['2022/08/26', 23.61, 22.47, 23.77, 22.47],
    ['2022/08/29', 22.12, 22.02, 22.55, 21.92],
    ['2022/08/30', 22.06, 22.08, 22.34, 21.67],
    ['2022/08/31', 22.01, 21.07, 22.02, 21.06],
    ['2022/09/01', 20.68, 20.57, 20.79, 20.06],
    ['2022/09/02', 20.59, 19.6, 20.59, 19.26],
    ['2022/09/06', 19.82, 19.84, 20.29, 19.09],
    ['2022/09/07', 19.82, 18.73, 19.82, 18.27],
    ['2022/09/08', 18.41, 18.0, 18.7, 17.65],
    ['2022/09/09', 18.12, 18.57, 18.74, 18.12],
    ['2022/09/12', 18.86, 18.12, 19.41, 18.04],
    ['2022/09/13', 17.4, 16.27, 17.6, 16.23],
    ['2022/09/14', 16.26, 15.94, 16.26, 15.24],
    ['2022/09/15', 15.68, 15.99, 16.64, 15.67],
    ['2022/09/16', 15.75, 16.31, 16.38, 15.58],
    ['2022/09/19', 16.18, 17.09, 17.17, 16.18],
    ['2022/09/20', 16.87, 17.06, 17.45, 16.77],
    ['2022/09/21', 17.14, 16.63, 17.35, 16.59],
    ['2022/09/22', 16.61, 15.89, 16.63, 15.88],
    ['2022/09/23', 15.49, 15.68, 15.75, 15.23],
    ['2022/09/26', 15.49, 15.08, 15.81, 14.98],
    ['2022/09/27', 15.19, 15.07, 15.48, 14.8],
    ['2022/09/28', 15.1, 15.36, 15.6, 15.05],
    ['2022/09/29', 14.93, 15.07, 15.1, 14.54],
    ['2022/09/30', 14.85, 14.95, 15.46, 14.37],
    ['2022/10/03', 15.33, 15.29, 15.55, 15.05],
    ['2022/10/04', 15.75, 16.26, 16.27, 15.75],
    ['2022/10/05', 15.77, 16.23, 16.27, 15.45],
    ['2022/10/06', 16.16, 16.33, 16.55, 15.94],
    ['2022/10/07', 15.97, 15.88, 16.3, 15.6],
    ['2022/10/10', 15.91, 15.64, 16.12, 15.35],
    ['2022/10/11', 15.67, 16.01, 16.42, 15.51],
    ['2022/10/12', 15.99, 15.68, 16.07, 15.66],
    ['2022/10/13', 15.36, 16.21, 16.28, 14.96],
    ['2022/10/14', 16.41, 15.92, 16.57, 15.83],
    ['2022/10/17', 16.24, 16.78, 16.84, 16.18],
    ['2022/10/18', 17.34, 17.23, 17.58, 17.09],
    ['2022/10/19', 16.93, 17.05, 17.16, 16.7],
    ['2022/10/20', 17.06, 16.63, 17.71, 16.61],
    ['2022/10/21', 16.72, 17.29, 17.34, 16.65],
    ['2022/10/24', 17.43, 17.51, 17.59, 16.9],
    ['2022/10/25', 17.47, 18.57, 18.71, 17.47],
    ['2022/10/26', 18.54, 18.55, 19.11, 18.1],
    ['2022/10/27', 18.84, 18.78, 19.1, 18.55],
    ['2022/10/28', 18.97, 19.4, 19.4, 18.28],
    ['2022/10/31', 19.26, 19.5, 19.73, 18.97],
    ['2022/11/01', 19.8, 19.7, 20.08, 19.36],
    ['2022/11/02', 19.56, 18.59, 19.69, 18.59],
    ['2022/11/03', 18.56, 18.21, 18.7, 17.96],
    ['2022/11/04', 18.7, 18.89, 19.19, 18.22],
    ['2022/11/07', 19.12, 18.86, 19.14, 18.44],
    ['2022/11/08', 19.07, 18.98, 19.4, 18.6],
    ['2022/11/09', 18.79, 17.62, 18.85, 17.57],
    ['2022/11/10', 18.73, 19.43, 19.79, 18.61],
    ['2022/11/11', 19.5, 20.75, 20.79, 19.5],
    ['2022/11/14', 20.5, 20.48, 20.93, 20.18],
    ['2022/11/15', 21.17, 21.19, 21.66, 20.98],
    ['2022/11/16', 20.57, 20.2, 20.89, 19.4],
    ['2022/11/17', 19.76, 20.61, 20.7, 19.75],
    ['2022/11/18', 21.18, 21.11, 21.32, 20.54],
    ['2022/11/21', 21.05, 20.78, 21.13, 20.38],
    ['2022/11/22', 21.14, 21.48, 21.54, 20.76],
    ['2022/11/23', 21.24, 21.51, 21.69, 21.05],
    ['2022/11/25', 21.56, 21.42, 21.64, 21.33],
    ['2022/11/28', 21.13, 21.01, 21.47, 20.85],
    ['2022/11/29', 20.96, 21.25, 21.52, 20.86],
    ['2022/11/30', 21.13, 21.63, 21.71, 20.89],
    ['2022/12/01', 13.58, 11.97, 13.62, 11.62],
    ['2022/12/02', 11.94, 12.79, 12.83, 11.6],
    ['2022/12/05', 12.51, 12.26, 13.05, 12.13],
    ['2022/12/06', 13.07, 13.58, 13.71, 12.87],
    ['2022/12/07', 13.5, 13.81, 13.99, 13.33],
    ['2022/12/08', 13.96, 14.1, 14.8, 13.94],
    ['2022/12/09', 13.93, 13.4, 14.1, 13.35],
    ['2022/12/12', 13.25, 13.35, 13.46, 13.06],
    ['2022/12/13', 13.92, 14.26, 14.37, 13.91],
    ['2022/12/14', 14.25, 14.0, 14.35, 13.8],
    ['2022/12/15', 13.72, 13.55, 13.98, 13.43],
    ['2022/12/16', 13.48, 13.03, 13.5, 12.96],
    ['2022/12/19', 13.22, 13.31, 13.44, 13.03],
    ['2022/12/20', 13.3, 13.43, 13.53, 13.13],
    ['2022/12/21', 13.59, 13.15, 13.66, 13.1],
    ['2022/12/22', 13.01, 12.95, 13.02, 12.73],
    ['2022/12/23', 12.95, 13.06, 13.12, 12.83],
    ['2022/12/27', 13.11, 13.19, 13.25, 12.9],
    ['2022/12/28', 13.16, 12.97, 13.23, 12.86],
    ['2022/12/29', 13.13, 13.49, 13.54, 13.13],
    ['2022/12/30', 13.44, 13.71, 13.75, 13.26],
    ['2023/01/03', 13.94, 13.97, 14.33, 13.74],
    ['2023/01/04', 14.14, 14.44, 14.61, 14.11],
    ['2023/01/05', 14.24, 14.09, 14.43, 13.83],
    ['2023/01/06', 14.23, 14.72, 14.79, 14.14],
    ['2023/01/09', 14.76, 14.92, 15.04, 14.36],
    ['2023/01/10', 14.9, 15.53, 15.55, 14.64],
    ['2023/01/11', 15.62, 15.66, 15.69, 15.5],
    ['2023/01/12', 15.81, 15.42, 15.91, 15.27],
    ['2023/01/13', 15.28, 15.58, 15.76, 15.17],
    ['2023/01/17', 15.45, 15.41, 15.54, 15.28],
    ['2023/01/18', 15.53, 15.29, 15.99, 15.29],
    ['2023/01/19', 15.04, 15.21, 15.26, 14.85],
    ['2023/01/20', 15.25, 15.58, 15.6, 15.11],
    ['2023/01/23', 15.61, 16.2, 16.21, 15.5],
    ['2023/01/24', 16.03, 15.71, 16.11, 15.71],
    ['2023/01/25', 15.47, 15.92, 15.93, 15.29],
    ['2023/01/26', 16.06, 16.1, 16.38, 15.92],
    ['2023/01/27', 16.04, 16.34, 16.38, 16.0],
    ['2023/01/30', 16.27, 16.26, 16.51, 15.95],
    ['2023/01/31', 16.34, 16.92, 16.93, 16.16],
    ['2023/02/01', 16.85, 17.22, 17.32, 16.66],
    ['2023/02/02', 17.32, 17.05, 17.62, 16.92],
    ['2023/02/03', 16.66, 17.0, 17.29, 16.57],
    ['2023/02/06', 16.79, 16.57, 16.84, 16.43],
    ['2023/02/07', 16.53, 16.53, 16.61, 16.18],
    ['2023/02/08', 16.17, 14.93, 16.24, 14.81],
    ['2023/02/09', 15.26, 14.99, 15.56, 14.92],
    ['2023/02/10', 14.89, 15.16, 15.23, 14.57],
    ['2023/02/13', 15.17, 15.72, 15.76, 14.94],
    ['2023/02/14', 15.65, 15.82, 15.91, 15.44],
    ['2023/02/15', 15.62, 16.2, 16.25, 15.57],
    ['2023/02/16', 16.11, 16.14, 16.35, 15.72],
    ['2023/02/17', 16.15, 16.55, 16.56, 15.92],
    ['2023/02/21', 16.3, 15.76, 16.31, 15.61],
    ['2023/02/22', 15.79, 16.15, 16.27, 15.61],
    ['2023/02/23', 16.11, 16.35, 16.38, 15.8],
    ['2023/02/24', 16.05, 16.22, 16.24, 15.9],
    ['2023/02/27', 16.49, 16.39, 16.5, 16.25],
    ['2023/02/28', 16.39, 16.61, 16.77, 16.39],
    ['2023/03/01', 16.54, 16.28, 16.82, 16.24],
    ['2023/03/02', 16.2, 16.79, 16.98, 16.0],
    ['2023/03/03', 16.93, 17.12, 17.22, 16.73],
    ['2023/03/06', 17.15, 16.13, 17.17, 16.05],
    ['2023/03/07', 16.16, 16.58, 16.93, 16.15],
    ['2023/03/08', 16.53, 16.45, 16.53, 16.15],
    ['2023/03/09', 16.47, 15.85, 16.48, 15.77],
    ['2023/03/10', 15.74, 15.84, 16.19, 15.55],
    ['2023/03/13', 15.41, 15.02, 15.65, 14.93],
    ['2023/03/14', 15.63, 15.33, 15.87, 15.22],
    ['2023/03/15', 14.57, 15.47, 15.52, 14.54],
    ['2023/03/16', 14.05, 15.27, 15.56, 13.59],
    ['2023/03/17', 15.1, 15.03, 15.45, 15.0],
    ['2023/03/20', 15.24, 15.0, 15.28, 14.76],
    ['2023/03/21', 15.39, 14.84, 15.62, 14.38],
    ['2023/03/22', 14.69, 14.39, 15.02, 14.38],
    ['2023/03/23', 14.51, 14.32, 14.9, 14.12],
    ['2023/03/24', 14.0, 14.23, 14.36, 13.73],
    ['2023/03/27', 14.38, 14.04, 14.4, 13.95],
    ['2023/03/28', 14.3, 14.82, 14.82, 14.23],
    ['2023/03/29', 14.96, 15.32, 15.32, 14.69],
    ['2023/03/30', 15.47, 15.39, 15.6, 15.28],
    ['2023/03/31', 15.54, 15.55, 15.59, 15.27],
    ['2023/04/03', 15.67, 15.56, 15.84, 15.32],
    ['2023/04/04', 15.6, 15.45, 15.69, 15.19],
    ['2023/04/05', 15.24, 14.9, 15.41, 14.81],
    ['2023/04/06', 14.79, 14.97, 15.07, 14.63],
    ['2023/04/10', 14.9, 15.47, 15.5, 14.9],
    ['2023/04/11', 15.69, 15.87, 15.99, 15.54],
    ['2023/04/12', 16.1, 15.64, 16.1, 15.59],
    ['2023/04/13', 15.76, 15.94, 15.98, 15.64],
    ['2023/04/14', 16.09, 16.23, 16.42, 16.09],
    ['2023/04/17', 16.24, 16.12, 16.24, 16.04],
    ['2023/04/18', 16.24, 16.25, 16.44, 16.07],
    ['2023/04/19', 16.14, 16.21, 16.3, 15.94],
    ['2023/04/20', 16.06, 16.02, 16.29, 16.0],
    ['2023/04/21', 15.99, 16.2, 16.32, 15.98],
    ['2023/04/24', 16.17, 16.45, 16.46, 15.99],
    ['2023/04/25', 16.16, 15.25, 16.16, 15.25],
    ['2023/04/26', 15.25, 15.35, 15.7, 15.25],
    ['2023/04/27', 15.51, 15.55, 15.58, 15.15],
    ['2023/04/28', 15.47, 15.7, 15.73, 15.43],
    ['2023/05/01', 15.75, 15.8, 16.09, 15.74],
    ['2023/05/02', 15.68, 15.17, 15.69, 14.81],
    ['2023/05/03', 15.13, 14.95, 15.34, 14.87],
    ['2023/05/04', 14.82, 14.75, 14.9, 14.49],
    ['2023/05/05', 15.11, 15.69, 15.8, 15.11],
    ['2023/05/08', 15.81, 16.2, 16.37, 15.73],
    ['2023/05/09', 16.02, 16.13, 16.31, 15.74],
    ['2023/05/10', 16.42, 16.14, 16.52, 15.94],
    ['2023/05/11', 16.18, 16.48, 16.52, 15.99],
    ['2023/05/12', 16.59, 16.21, 16.81, 16.12],
    ['2023/05/15', 16.35, 16.66, 16.8, 16.33],
    ['2023/05/16', 16.92, 16.27, 16.92, 16.03],
    ['2023/05/17', 16.27, 16.92, 16.93, 16.04],
    ['2023/05/18', 16.9, 17.31, 17.35, 16.86],
    ['2023/05/19', 17.29, 16.44, 17.29, 16.1],
    ['2023/05/22', 16.48, 16.75, 16.79, 16.46],
    ['2023/05/23', 16.75, 17.12, 17.44, 16.66],
    ['2023/05/24', 17.33, 16.94, 17.43, 16.68],
    ['2023/05/25', 17.0, 16.78, 17.17, 16.58],
    ['2023/05/26', 16.83, 17.32, 17.37, 16.83],
    ['2023/05/30', 17.47, 17.05, 17.6, 16.92],
    ['2023/05/31', 16.84, 16.08, 16.97, 15.94],
    ['2023/06/01', 16.08, 16.02, 16.3, 15.83],
    ['2023/06/02', 16.44, 16.84, 16.96, 16.44],
    ['2023/06/05', 16.59, 16.39, 16.66, 16.23],
    ['2023/06/06', 18.0, 20.98, 21.0, 17.76],
    ['2023/06/07', 21.15, 20.33, 21.94, 19.79],
    ['2023/06/08', 20.41, 20.29, 20.52, 19.88],
    ['2023/06/09', 20.62, 20.19, 20.98, 20.09],
    ['2023/06/12', 20.18, 19.98, 20.24, 19.8],
    ['2023/06/13', 19.88, 20.0, 20.19, 19.68],
    ['2023/06/14', 20.13, 19.94, 20.44, 19.66],
    ['2023/06/15', 19.75, 19.98, 20.07, 19.7],
    ['2023/06/16', 20.09, 19.54, 20.27, 19.32],
    ['2023/06/20', 19.66, 20.1, 20.22, 19.38],
    ['2023/06/21', 20.03, 20.19, 20.35, 19.93],
    ['2023/06/22', 20.11, 19.95, 20.15, 19.74],
    ['2023/06/23', 19.58, 19.37, 19.82, 19.18],
    ['2023/06/26', 19.21, 19.28, 19.84, 19.21],
    ['2023/06/27', 19.51, 19.75, 19.8, 19.26],
    ['2023/06/28', 19.76, 19.9, 19.94, 19.56],
    ['2023/06/29', 20.09, 20.55, 20.75, 20.03],
    ['2023/06/30', 20.63, 19.27, 20.79, 19.2],
    ['2023/07/03', 19.4, 19.94, 19.97, 19.39],
    ['2023/07/05', 19.72, 19.29, 19.72, 19.07],
    ['2023/07/06', 19.02, 18.92, 19.14, 18.53],
    ['2023/07/07', 18.9, 18.74, 19.1, 18.71],
    ['2023/07/10', 18.89, 19.53, 19.53, 18.79],
    ['2023/07/11', 19.71, 20.09, 20.13, 19.54],
    ['2023/07/12', 20.51, 20.18, 20.51, 20.06],
    ['2023/07/13', 20.28, 19.88, 20.28, 19.84],
    ['2023/07/14', 19.98, 20.21, 20.22, 19.55],
    ['2023/07/17', 20.15, 20.01, 20.42, 19.7],
    ['2023/07/18', 20.08, 20.45, 20.59, 20.0],
    ['2023/07/19', 20.54, 20.69, 20.89, 20.22],
    ['2023/07/20', 20.66, 20.88, 20.9, 20.43],
    ['2023/07/21', 21.0, 20.16, 21.0, 20.01],
    ['2023/07/24', 20.35, 20.4, 20.64, 20.18],
    ['2023/07/25', 20.31, 20.31, 20.66, 20.11],
    ['2023/07/26', 20.26, 20.54, 20.73, 20.21],
    ['2023/07/27', 20.57, 20.38, 20.81, 20.25],
    ['2023/07/28', 20.58, 20.66, 20.8, 20.43],
    ['2023/07/31', 20.65, 20.71, 20.81, 20.31],
    ['2023/08/01', 20.6, 20.9, 20.94, 20.44],
    ['2023/08/02', 20.62, 20.46, 20.71, 20.19],
]);
var volumes = [
    262500.0,
    261500.0,
    225400.0,
    309700.0,
    460900.0,
    402800.0,
    471300.0,
    262300.0,
    310200.0,
    318000.0,
    335900.0,
    306700.0,
    311600.0,
    335400.0,
    475900.0,
    308500.0,
    298000.0,
    283700.0,
    336000.0,
    457800.0,
    596600.0,
    912500.0,
    1047900.0,
    988300.0,
    2038700.0,
    1401900.0,
    805400.0,
    1205500.0,
    1152400.0,
    1252900.0,
    984300.0,
    1424800.0,
    895600.0,
    961600.0,
    765700.0,
    673900.0,
    809100.0,
    619900.0,
    614200.0,
    601000.0,
    516300.0,
    762000.0,
    754700.0,
    674500.0,
    491900.0,
    422600.0,
    451300.0,
    414800.0,
    571300.0,
    477200.0,
    682500.0,
    391700.0,
    459000.0,
    494900.0,
    499000.0,
    457400.0,
    390600.0,
    459100.0,
    473000.0,
    477500.0,
    573600.0,
    538900.0,
    513400.0,
    532400.0,
    618800.0,
    783000.0,
    704900.0,
    595000.0,
    419200.0,
    658100.0,
    915600.0,
    881700.0,
    702600.0,
    1141200.0,
    672100.0,
    616000.0,
    559200.0,
    594800.0,
    653800.0,
    321900.0,
    170500.0,
    473400.0,
    989200.0,
    2075600.0,
    13673300.0,
    4908800.0,
    2658400.0,
    3251900.0,
    1344700.0,
    2828200.0,
    1707700.0,
    1585600.0,
    2167200.0,
    1003500.0,
    1660500.0,
    2953000.0,
    1335100.0,
    1428300.0,
    830600.0,
    1105200.0,
    693700.0,
    704200.0,
    597300.0,
    670900.0,
    546600.0,
    1001700.0,
    944500.0,
    621400.0,
    620400.0,
    701700.0,
    779100.0,
    540000.0,
    873700.0,
    666300.0,
    489300.0,
    538800.0,
    463400.0,
    364500.0,
    857300.0,
    504400.0,
    721000.0,
    318600.0,
    276900.0,
    463900.0,
    605200.0,
    542100.0,
    648600.0,
    618700.0,
    449000.0,
    477500.0,
    876400.0,
    781600.0,
    602100.0,
    431300.0,
    647900.0,
    574500.0,
    528300.0,
    462200.0,
    909100.0,
    633300.0,
    439600.0,
    470600.0,
    402100.0,
    604600.0,
    449600.0,
    430000.0,
    522400.0,
    573000.0,
    610100.0,
    434000.0,
    574200.0,
    689900.0,
    830700.0,
    809700.0,
    1036300.0,
    1072000.0,
    1429500.0,
    895800.0,
    1233100.0,
    1103100.0,
    895500.0,
    744900.0,
    933200.0,
    1277200.0,
    649500.0,
    343800.0,
    736500.0,
    606100.0,
    668100.0,
    681800.0,
    550900.0,
    575500.0,
    514400.0,
    574700.0,
    385700.0,
    519900.0,
    430700.0,
    506600.0,
    578200.0,
    606900.0,
    373500.0,
    470300.0,
    681900.0,
    506800.0,
    411200.0,
    477200.0,
    515900.0,
    417700.0,
    426400.0,
    523400.0,
    351300.0,
    460700.0,
    369400.0,
    323900.0,
    356500.0,
    302200.0,
    375200.0,
    303000.0,
    310800.0,
    316100.0,
    418900.0,
    310700.0,
    350600.0,
    435400.0,
    358600.0,
    238200.0,
    408700.0,
    798000.0,
    401900.0,
    443500.0,
    560600.0,
    2360500.0,
    1210600.0,
    533500.0,
    464000.0,
    521900.0,
    442500.0,
    502000.0,
    441700.0,
    1487400.0,
    532000.0,
    366900.0,
    650700.0,
    994200.0,
    353600.0,
    399100.0,
    513200.0,
    545200.0,
    610900.0,
    300400.0,
    519600.0,
    381400.0,
    516200.0,
    352200.0,
    358900.0,
    532900.0,
    315700.0,
    409300.0,
    506000.0,
    377300.0,
    477900.0,
    303700.0,
    388900.0,
    324500.0,
    205600.0,
    240900.0,
    295600.0,
    223900.0,
    340800.0,
    379900.0,
    385500.0,
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
        text: "GIII",
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