/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_CSPI");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/12', 8.3, 8.54, 8.58, 8.07],
    ['2022/08/15', 8.45, 8.28, 8.6, 8.0],
    ['2022/08/16', 8.38, 8.31, 8.38, 8.31],
    ['2022/08/17', 8.31, 8.14, 8.36, 8.06],
    ['2022/08/18', 8.13, 8.12, 8.13, 8.11],
    ['2022/08/19', 8.08, 8.19, 8.19, 8.0],
    ['2022/08/22', 8.0, 8.2, 8.2, 8.0],
    ['2022/08/23', 8.04, 7.95, 8.13, 7.95],
    ['2022/08/24', 7.95, 8.0, 8.0, 7.95],
    ['2022/08/25', 7.99, 8.0, 8.0, 7.72],
    ['2022/08/26', 7.9, 8.0, 8.0, 7.9],
    ['2022/08/29', 7.79, 7.88, 7.95, 7.79],
    ['2022/08/30', 7.79, 7.96, 7.96, 7.72],
    ['2022/08/31', 7.82, 7.76, 7.98, 7.75],
    ['2022/09/01', 7.73, 7.72, 7.95, 7.72],
    ['2022/09/02', 8.08, 7.86, 8.08, 7.7],
    ['2022/09/06', 7.86, 7.76, 8.01, 7.76],
    ['2022/09/07', 7.71, 7.92, 7.92, 7.7],
    ['2022/09/08', 7.73, 7.9, 7.9, 7.71],
    ['2022/09/09', 7.83, 8.01, 8.05, 7.77],
    ['2022/09/12', 7.85, 8.22, 8.38, 7.84],
    ['2022/09/13', 8.03, 8.26, 8.26, 8.03],
    ['2022/09/14', 8.22, 8.35, 8.5, 8.07],
    ['2022/09/15', 8.4, 8.29, 8.53, 8.2],
    ['2022/09/16', 8.5, 8.43, 8.54, 8.26],
    ['2022/09/19', 8.16, 8.31, 8.31, 8.16],
    ['2022/09/20', 8.24, 8.22, 8.36, 8.22],
    ['2022/09/21', 8.29, 8.06, 8.4, 8.06],
    ['2022/09/22', 8.15, 8.2, 8.32, 8.15],
    ['2022/09/23', 8.01, 7.89, 8.1, 7.82],
    ['2022/09/26', 8.0, 7.68, 8.04, 7.68],
    ['2022/09/27', 7.98, 7.12, 8.32, 7.03],
    ['2022/09/28', 7.19, 7.25, 7.32, 7.19],
    ['2022/09/29', 7.4, 7.24, 7.61, 7.2],
    ['2022/09/30', 7.48, 7.19, 7.75, 7.18],
    ['2022/10/03', 7.34, 7.4, 7.44, 7.21],
    ['2022/10/04', 7.35, 7.35, 7.55, 7.33],
    ['2022/10/05', 7.34, 7.3, 7.38, 7.24],
    ['2022/10/06', 7.48, 7.52, 7.62, 7.48],
    ['2022/10/07', 7.26, 7.29, 7.32, 7.26],
    ['2022/10/10', 7.36, 7.26, 7.38, 7.21],
    ['2022/10/11', 7.23, 7.01, 7.23, 6.82],
    ['2022/10/12', 7.05, 7.02, 7.05, 7.02],
    ['2022/10/13', 7.0, 7.26, 7.49, 6.68],
    ['2022/10/14', 7.17, 7.21, 7.21, 7.05],
    ['2022/10/17', 7.36, 7.19, 7.36, 7.16],
    ['2022/10/18', 7.16, 7.36, 7.5, 7.11],
    ['2022/10/19', 7.26, 7.3, 7.3, 7.26],
    ['2022/10/20', 7.57, 7.38, 7.57, 7.22],
    ['2022/10/21', 7.31, 7.56, 7.56, 7.31],
    ['2022/10/24', 7.36, 7.35, 7.36, 7.35],
    ['2022/10/25', 7.39, 7.43, 7.56, 7.36],
    ['2022/10/26', 7.57, 7.37, 7.68, 7.37],
    ['2022/10/27', 7.4, 7.51, 7.51, 7.4],
    ['2022/10/28', 7.51, 7.51, 7.51, 7.51],
    ['2022/10/31', 7.31, 7.39, 7.39, 7.31],
    ['2022/11/01', 7.44, 7.45, 7.58, 7.44],
    ['2022/11/02', 7.49, 7.46, 7.49, 7.34],
    ['2022/11/03', 7.33, 7.48, 7.48, 7.33],
    ['2022/11/04', 7.47, 7.36, 7.7, 7.36],
    ['2022/11/07', 7.6, 7.65, 7.68, 7.53],
    ['2022/11/08', 7.5, 7.72, 7.72, 7.48],
    ['2022/11/09', 7.72, 7.72, 7.72, 7.72],
    ['2022/11/10', 7.67, 7.69, 7.97, 7.56],
    ['2022/11/11', 7.98, 7.82, 7.98, 7.55],
    ['2022/11/14', 7.71, 7.6, 7.72, 7.58],
    ['2022/11/15', 7.58, 7.48, 7.97, 7.47],
    ['2022/11/16', 7.59, 7.59, 7.59, 7.59],
    ['2022/11/17', 7.41, 7.41, 7.41, 7.08],
    ['2022/11/18', 7.61, 7.66, 7.69, 7.24],
    ['2022/11/21', 7.46, 7.92, 7.95, 7.44],
    ['2022/11/22', 7.58, 7.71, 7.97, 7.54],
    ['2022/11/23', 7.86, 7.84, 7.92, 7.68],
    ['2022/11/25', 7.8, 8.13, 8.26, 7.72],
    ['2022/11/28', 8.14, 7.92, 8.17, 7.92],
    ['2022/11/29', 7.87, 8.34, 8.34, 7.87],
    ['2022/11/30', 8.25, 8.71, 8.85, 8.25],
    ['2022/12/01', 8.7, 8.65, 8.75, 8.0],
    ['2022/12/02', 8.6, 8.35, 8.6, 8.35],
    ['2022/12/05', 8.45, 8.37, 8.45, 8.37],
    ['2022/12/06', 9.03, 8.99, 9.46, 8.52],
    ['2022/12/07', 9.15, 9.16, 9.59, 8.89],
    ['2022/12/08', 9.15, 9.41, 9.43, 9.13],
    ['2022/12/09', 9.51, 9.28, 9.61, 9.27],
    ['2022/12/12', 9.28, 9.2, 9.4, 9.15],
    ['2022/12/13', 9.3, 9.2, 9.3, 9.2],
    ['2022/12/14', 9.27, 9.1, 9.54, 9.1],
    ['2022/12/15', 9.15, 9.1, 9.27, 9.0],
    ['2022/12/16', 9.2, 8.94, 9.2, 8.73],
    ['2022/12/19', 8.94, 9.1, 9.51, 8.6],
    ['2022/12/20', 9.01, 9.05, 9.07, 8.9],
    ['2022/12/21', 8.99, 9.15, 9.41, 8.83],
    ['2022/12/22', 9.31, 9.19, 9.31, 8.56],
    ['2022/12/23', 9.19, 9.45, 9.47, 9.19],
    ['2022/12/27', 9.59, 8.96, 9.59, 8.87],
    ['2022/12/28', 8.87, 8.95, 8.97, 8.67],
    ['2022/12/29', 9.16, 9.28, 9.28, 9.16],
    ['2022/12/30', 9.22, 9.43, 9.43, 8.8],
    ['2023/01/03', 9.48, 9.45, 9.48, 9.07],
    ['2023/01/04', 9.38, 9.43, 9.9, 9.32],
    ['2023/01/05', 9.62, 9.65, 9.72, 9.41],
    ['2023/01/06', 9.6, 9.82, 10.34, 9.57],
    ['2023/01/09', 10.01, 10.24, 10.24, 9.92],
    ['2023/01/10', 9.99, 10.26, 10.3, 9.99],
    ['2023/01/11', 10.43, 10.26, 10.48, 10.01],
    ['2023/01/12', 10.24, 10.12, 10.52, 10.12],
    ['2023/01/13', 10.45, 10.5, 11.45, 10.32],
    ['2023/01/17', 10.5, 10.86, 11.27, 10.37],
    ['2023/01/18', 10.93, 11.1, 11.22, 10.76],
    ['2023/01/19', 11.26, 10.74, 11.26, 10.74],
    ['2023/01/20', 10.96, 10.97, 11.16, 10.43],
    ['2023/01/23', 11.0, 11.02, 11.05, 10.68],
    ['2023/01/24', 10.79, 10.86, 11.03, 10.79],
    ['2023/01/25', 11.0, 10.96, 11.15, 10.88],
    ['2023/01/26', 11.0, 11.05, 11.2, 10.9],
    ['2023/01/27', 10.85, 10.88, 10.93, 10.85],
    ['2023/01/30', 10.75, 10.85, 10.92, 10.75],
    ['2023/01/31', 10.85, 10.85, 10.85, 10.85],
    ['2023/02/01', 10.75, 10.88, 10.94, 10.75],
    ['2023/02/02', 10.95, 11.02, 11.15, 10.94],
    ['2023/02/03', 11.03, 11.05, 11.38, 11.01],
    ['2023/02/06', 11.16, 11.31, 11.4, 11.16],
    ['2023/02/07', 11.33, 11.61, 12.06, 11.3],
    ['2023/02/08', 11.97, 11.2, 12.46, 10.75],
    ['2023/02/09', 11.2, 10.81, 11.27, 10.77],
    ['2023/02/10', 11.11, 10.95, 11.16, 10.94],
    ['2023/02/13', 11.22, 12.08, 12.08, 11.1],
    ['2023/02/14', 12.0, 12.2, 12.3, 11.2],
    ['2023/02/15', 12.3, 12.05, 12.34, 11.54],
    ['2023/02/16', 11.99, 11.99, 12.18, 11.86],
    ['2023/02/17', 11.81, 11.79, 11.97, 11.66],
    ['2023/02/21', 11.67, 11.26, 11.85, 11.26],
    ['2023/02/22', 11.41, 11.25, 11.5, 11.09],
    ['2023/02/23', 11.06, 11.2, 11.65, 11.06],
    ['2023/02/24', 11.82, 11.26, 11.82, 10.89],
    ['2023/02/27', 10.95, 11.33, 11.34, 10.95],
    ['2023/02/28', 11.18, 11.06, 11.18, 11.06],
    ['2023/03/01', 11.18, 11.26, 11.59, 11.17],
    ['2023/03/02', 11.27, 10.97, 11.41, 10.97],
    ['2023/03/03', 11.04, 11.02, 11.21, 10.94],
    ['2023/03/06', 10.96, 11.24, 11.37, 10.9],
    ['2023/03/07', 11.54, 11.15, 11.54, 11.15],
    ['2023/03/08', 11.49, 11.89, 11.9, 11.46],
    ['2023/03/09', 11.99, 11.75, 11.99, 11.55],
    ['2023/03/10', 11.58, 11.5, 11.91, 11.44],
    ['2023/03/13', 11.41, 11.7, 11.8, 11.41],
    ['2023/03/14', 11.77, 11.76, 11.97, 11.67],
    ['2023/03/15', 11.64, 11.96, 11.97, 11.64],
    ['2023/03/16', 11.98, 12.43, 12.61, 11.81],
    ['2023/03/17', 12.45, 11.9, 12.45, 11.9],
    ['2023/03/20', 12.07, 11.86, 12.19, 11.81],
    ['2023/03/21', 12.06, 11.83, 12.5, 11.8],
    ['2023/03/22', 11.83, 11.75, 11.83, 11.7],
    ['2023/03/23', 11.86, 12.01, 12.3, 11.86],
    ['2023/03/24', 12.1, 12.3, 12.33, 12.01],
    ['2023/03/27', 12.44, 13.03, 13.4, 12.39],
    ['2023/03/28', 12.96, 13.2, 13.25, 12.96],
    ['2023/03/29', 13.3, 13.34, 13.4, 13.27],
    ['2023/03/30', 13.4, 13.43, 13.48, 13.13],
    ['2023/03/31', 13.49, 13.59, 13.59, 13.3],
    ['2023/04/03', 13.38, 13.67, 13.67, 13.38],
    ['2023/04/04', 13.69, 13.9, 13.99, 13.69],
    ['2023/04/05', 14.0, 13.9, 14.37, 13.58],
    ['2023/04/06', 14.1, 14.2, 14.24, 13.64],
    ['2023/04/10', 13.83, 14.21, 14.26, 13.83],
    ['2023/04/11', 13.93, 13.76, 14.12, 13.3],
    ['2023/04/12', 13.76, 14.28, 14.28, 13.76],
    ['2023/04/13', 14.28, 14.8, 14.98, 14.16],
    ['2023/04/14', 14.76, 14.71, 14.76, 13.01],
    ['2023/04/17', 14.52, 14.43, 14.7, 14.43],
    ['2023/04/18', 14.5, 14.62, 14.75, 14.06],
    ['2023/04/19', 14.3, 14.41, 14.58, 14.06],
    ['2023/04/20', 14.21, 14.26, 14.26, 14.0],
    ['2023/04/21', 14.04, 14.23, 14.59, 13.96],
    ['2023/04/24', 14.23, 13.39, 14.23, 13.3],
    ['2023/04/25', 13.01, 12.88, 13.39, 12.88],
    ['2023/04/26', 12.98, 12.9, 13.14, 12.41],
    ['2023/04/27', 12.69, 13.28, 13.39, 12.69],
    ['2023/04/28', 12.95, 12.8, 13.18, 12.75],
    ['2023/05/01', 12.51, 12.41, 13.66, 12.21],
    ['2023/05/02', 12.35, 12.41, 12.76, 12.11],
    ['2023/05/03', 12.41, 12.35, 12.8, 12.15],
    ['2023/05/04', 12.38, 11.73, 12.4, 11.44],
    ['2023/05/05', 11.58, 12.6, 12.6, 11.58],
    ['2023/05/08', 12.31, 12.47, 12.6, 12.16],
    ['2023/05/09', 13.13, 12.43, 13.13, 12.35],
    ['2023/05/10', 12.0, 11.36, 12.6, 11.3],
    ['2023/05/11', 11.29, 10.7, 11.58, 10.0],
    ['2023/05/12', 10.6, 10.8, 10.96, 10.32],
    ['2023/05/15', 10.75, 11.18, 11.18, 10.75],
    ['2023/05/16', 11.25, 10.5, 11.28, 10.4],
    ['2023/05/17', 10.46, 11.0, 11.38, 10.46],
    ['2023/05/18', 11.29, 11.0, 11.46, 10.85],
    ['2023/05/19', 11.52, 11.55, 12.37, 11.25],
    ['2023/05/22', 11.75, 11.9, 11.97, 11.71],
    ['2023/05/23', 11.79, 11.7, 12.19, 11.55],
    ['2023/05/24', 11.81, 11.94, 11.96, 10.9],
    ['2023/05/25', 11.98, 12.29, 12.43, 11.95],
    ['2023/05/26', 12.3, 12.21, 12.58, 12.05],
    ['2023/05/30', 12.4, 12.57, 12.57, 12.2],
    ['2023/05/31', 12.22, 12.32, 12.59, 12.1],
    ['2023/06/01', 12.59, 12.34, 13.18, 12.22],
    ['2023/06/02', 12.59, 12.43, 12.97, 12.37],
    ['2023/06/05', 12.41, 12.37, 13.6, 12.17],
    ['2023/06/06', 12.35, 12.48, 13.32, 12.3],
    ['2023/06/07', 12.65, 12.77, 13.24, 12.56],
    ['2023/06/08', 12.97, 12.52, 12.97, 12.3],
    ['2023/06/09', 12.51, 12.87, 12.87, 12.51],
    ['2023/06/12', 12.99, 12.99, 13.2, 12.8],
    ['2023/06/13', 13.0, 13.01, 13.56, 12.56],
    ['2023/06/14', 12.95, 12.92, 13.4, 12.78],
    ['2023/06/15', 12.77, 12.73, 13.21, 12.69],
    ['2023/06/16', 12.76, 13.74, 13.74, 12.63],
    ['2023/06/20', 13.2, 13.4, 13.64, 12.98],
    ['2023/06/21', 13.57, 13.37, 13.9, 13.26],
    ['2023/06/22', 13.3, 13.16, 13.3, 13.16],
    ['2023/06/23', 13.01, 13.65, 13.65, 13.01],
    ['2023/06/26', 13.65, 13.39, 13.65, 13.29],
    ['2023/06/27', 13.13, 13.21, 13.82, 13.13],
    ['2023/06/28', 13.27, 13.0, 13.27, 12.98],
    ['2023/06/29', 13.23, 12.9, 13.23, 12.81],
    ['2023/06/30', 13.08, 11.91, 13.21, 11.33],
    ['2023/07/03', 12.02, 12.11, 12.29, 11.44],
    ['2023/07/05', 12.0, 12.09, 12.2, 11.85],
    ['2023/07/06', 12.04, 11.34, 12.11, 11.0],
    ['2023/07/07', 11.23, 11.63, 12.0, 11.23],
    ['2023/07/10', 11.44, 11.15, 12.01, 11.15],
    ['2023/07/11', 11.45, 10.77, 11.45, 10.77],
    ['2023/07/12', 10.97, 10.15, 11.36, 9.82],
    ['2023/07/13', 10.18, 10.86, 11.06, 10.18],
    ['2023/07/14', 11.0, 10.75, 11.03, 10.75],
    ['2023/07/17', 10.85, 10.76, 11.24, 10.63],
    ['2023/07/18', 10.87, 11.04, 11.32, 10.8],
    ['2023/07/19', 11.01, 11.21, 11.21, 10.85],
    ['2023/07/20', 11.39, 11.5, 11.65, 11.24],
    ['2023/07/21', 11.35, 11.36, 11.7, 11.35],
    ['2023/07/24', 11.25, 11.38, 11.6, 11.2],
    ['2023/07/25', 11.4, 11.65, 12.1, 11.4],
    ['2023/07/26', 11.9, 12.18, 12.3, 11.8],
    ['2023/07/27', 12.34, 12.54, 12.54, 12.29],
    ['2023/07/28', 12.32, 12.61, 12.7, 12.24],
    ['2023/07/31', 12.91, 12.82, 13.2, 12.6],
    ['2023/08/01', 12.91, 13.15, 13.15, 12.6],
    ['2023/08/02', 12.84, 13.25, 13.25, 12.7],
    ['2023/08/03', 12.72, 12.94, 13.06, 12.7],
    ['2023/08/04', 13.33, 13.08, 13.84, 12.96],
    ['2023/08/07', 13.86, 13.0, 13.86, 13.0],
    ['2023/08/08', 13.12, 12.62, 13.15, 12.31],
    ['2023/08/09', 13.1, 13.59, 13.79, 13.1],
    ['2023/08/10', 13.12, 13.57, 13.7, 13.12],
]);
var volumes = [
    8200.0,
    7500.0,
    2300.0,
    6200.0,
    1700.0,
    1100.0,
    2800.0,
    2700.0,
    1000.0,
    5900.0,
    1300.0,
    3900.0,
    1300.0,
    4800.0,
    1700.0,
    1200.0,
    700.0,
    2500.0,
    3200.0,
    9700.0,
    13900.0,
    4300.0,
    9200.0,
    3400.0,
    3800.0,
    1500.0,
    1800.0,
    2600.0,
    4100.0,
    4300.0,
    9800.0,
    36400.0,
    6500.0,
    3900.0,
    20200.0,
    4500.0,
    2200.0,
    2700.0,
    1800.0,
    2600.0,
    7300.0,
    6800.0,
    500.0,
    12900.0,
    2700.0,
    1400.0,
    3300.0,
    800.0,
    2600.0,
    500.0,
    700.0,
    1400.0,
    1800.0,
    600.0,
    500.0,
    1200.0,
    7300.0,
    1900.0,
    1000.0,
    1300.0,
    1300.0,
    2700.0,
    600.0,
    5700.0,
    4800.0,
    1700.0,
    1600.0,
    500.0,
    3400.0,
    5100.0,
    4300.0,
    3300.0,
    2800.0,
    3600.0,
    2500.0,
    2100.0,
    10300.0,
    7300.0,
    2700.0,
    3300.0,
    25900.0,
    10500.0,
    6500.0,
    2500.0,
    4400.0,
    2700.0,
    13800.0,
    3900.0,
    6500.0,
    3100.0,
    3000.0,
    8800.0,
    9900.0,
    7000.0,
    12800.0,
    2200.0,
    2600.0,
    4400.0,
    4300.0,
    12900.0,
    14400.0,
    11900.0,
    12900.0,
    7700.0,
    2200.0,
    5000.0,
    15800.0,
    28700.0,
    11400.0,
    7800.0,
    5800.0,
    8300.0,
    5200.0,
    3700.0,
    4400.0,
    2600.0,
    2700.0,
    600.0,
    8700.0,
    4500.0,
    8000.0,
    6100.0,
    17500.0,
    63400.0,
    15900.0,
    6200.0,
    21100.0,
    16100.0,
    19700.0,
    4300.0,
    4500.0,
    10900.0,
    14100.0,
    8500.0,
    3200.0,
    6800.0,
    3600.0,
    3900.0,
    4000.0,
    4500.0,
    10600.0,
    7800.0,
    5400.0,
    14100.0,
    5200.0,
    4800.0,
    5800.0,
    3700.0,
    32400.0,
    7500.0,
    2800.0,
    7900.0,
    2400.0,
    9000.0,
    7400.0,
    21700.0,
    10200.0,
    7700.0,
    5700.0,
    7900.0,
    8500.0,
    9100.0,
    13000.0,
    5900.0,
    8100.0,
    12400.0,
    8900.0,
    20100.0,
    16500.0,
    3400.0,
    4900.0,
    3800.0,
    2000.0,
    4500.0,
    6200.0,
    5100.0,
    1800.0,
    2000.0,
    4400.0,
    14100.0,
    5700.0,
    9700.0,
    14100.0,
    11600.0,
    11000.0,
    7600.0,
    12300.0,
    8400.0,
    13100.0,
    6200.0,
    11900.0,
    16100.0,
    7600.0,
    13200.0,
    4900.0,
    4500.0,
    37200.0,
    11700.0,
    6100.0,
    5400.0,
    3300.0,
    15200.0,
    5200.0,
    9700.0,
    7400.0,
    5000.0,
    2500.0,
    1700.0,
    2400.0,
    10000.0,
    7000.0,
    6400.0,
    20700.0,
    10900.0,
    11200.0,
    1900.0,
    4300.0,
    4500.0,
    5200.0,
    5000.0,
    5900.0,
    18900.0,
    12300.0,
    4700.0,
    16200.0,
    4300.0,
    3500.0,
    6300.0,
    16000.0,
    20700.0,
    2700.0,
    7600.0,
    1800.0,
    5500.0,
    9400.0,
    4300.0,
    4000.0,
    3000.0,
    10100.0,
    3500.0,
    6300.0,
    3000.0,
    3600.0,
    5900.0,
    3100.0,
    11400.0,
    5500.0,
    15000.0,
    37300.0,
    10000.0,
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
     *     text: "CSPI",
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