/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_VEL");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/08', 11.98, 11.67, 12.05, 11.61],
    ['2022/08/09', 12.0, 11.47, 12.1, 11.47],
    ['2022/08/10', 11.75, 12.02, 12.02, 11.65],
    ['2022/08/11', 11.91, 11.81, 12.07, 11.64],
    ['2022/08/12', 11.9, 12.3, 12.3, 11.9],
    ['2022/08/15', 12.04, 12.0, 12.24, 11.73],
    ['2022/08/16', 12.12, 12.2, 12.54, 11.96],
    ['2022/08/17', 11.97, 12.02, 12.22, 11.88],
    ['2022/08/18', 12.19, 12.13, 12.28, 11.9],
    ['2022/08/19', 11.94, 12.2, 12.27, 11.87],
    ['2022/08/22', 11.95, 11.9, 12.12, 11.9],
    ['2022/08/23', 12.0, 11.9, 12.02, 11.84],
    ['2022/08/24', 11.73, 11.92, 12.05, 11.67],
    ['2022/08/25', 11.93, 12.01, 12.01, 11.71],
    ['2022/08/26', 11.8, 11.72, 11.8, 11.72],
    ['2022/08/29', 11.71, 12.16, 12.24, 11.55],
    ['2022/08/30', 12.19, 11.77, 12.19, 11.7],
    ['2022/08/31', 12.4, 11.42, 12.4, 11.42],
    ['2022/09/01', 11.52, 11.6, 11.7, 11.41],
    ['2022/09/02', 11.8, 11.57, 11.8, 11.57],
    ['2022/09/06', 11.8, 11.6, 11.89, 11.3],
    ['2022/09/07', 11.25, 12.12, 12.23, 11.18],
    ['2022/09/08', 11.88, 11.7, 12.05, 11.7],
    ['2022/09/09', 11.99, 12.22, 12.22, 11.8],
    ['2022/09/12', 12.07, 12.15, 12.31, 12.07],
    ['2022/09/13', 12.09, 11.53, 12.24, 11.53],
    ['2022/09/14', 11.82, 11.44, 12.18, 11.44],
    ['2022/09/15', 11.71, 11.74, 11.99, 11.71],
    ['2022/09/16', 11.68, 13.0, 13.6, 11.68],
    ['2022/09/19', 12.91, 12.58, 12.91, 12.02],
    ['2022/09/20', 12.63, 12.36, 12.63, 12.07],
    ['2022/09/21', 12.33, 12.26, 12.49, 12.04],
    ['2022/09/22', 12.23, 11.88, 12.3, 11.85],
    ['2022/09/23', 11.88, 11.38, 11.94, 11.16],
    ['2022/09/26', 11.62, 11.25, 11.88, 11.11],
    ['2022/09/27', 11.31, 11.05, 11.42, 10.9],
    ['2022/09/28', 10.65, 11.12, 11.34, 10.65],
    ['2022/09/29', 11.11, 10.7, 11.11, 10.63],
    ['2022/09/30', 10.55, 10.84, 11.03, 10.55],
    ['2022/10/03', 11.0, 11.14, 11.14, 10.88],
    ['2022/10/04', 11.25, 11.74, 11.77, 11.25],
    ['2022/10/05', 11.3, 11.33, 11.52, 11.02],
    ['2022/10/06', 11.29, 11.2, 11.31, 10.89],
    ['2022/10/07', 11.1, 10.85, 11.1, 10.85],
    ['2022/10/10', 11.11, 11.02, 11.12, 10.9],
    ['2022/10/11', 10.84, 10.77, 10.84, 10.77],
    ['2022/10/12', 10.9, 10.76, 10.9, 10.76],
    ['2022/10/13', 10.22, 10.93, 10.93, 10.22],
    ['2022/10/14', 10.67, 10.43, 10.67, 10.4],
    ['2022/10/17', 10.49, 10.71, 10.71, 10.14],
    ['2022/10/18', 10.48, 10.98, 10.98, 10.41],
    ['2022/10/19', 10.73, 10.15, 10.73, 10.15],
    ['2022/10/20', 10.07, 10.06, 10.53, 10.01],
    ['2022/10/21', 10.23, 10.0, 10.45, 9.99],
    ['2022/10/24', 10.04, 9.92, 10.08, 9.87],
    ['2022/10/25', 9.69, 10.0, 10.13, 9.69],
    ['2022/10/26', 10.05, 9.75, 10.1, 9.75],
    ['2022/10/27', 10.04, 9.98, 10.11, 9.87],
    ['2022/10/28', 9.87, 10.0, 10.07, 9.87],
    ['2022/10/31', 9.67, 9.71, 10.05, 9.63],
    ['2022/11/01', 9.8, 9.38, 9.86, 9.38],
    ['2022/11/02', 9.64, 9.46, 9.77, 9.41],
    ['2022/11/03', 9.3, 9.22, 9.44, 9.04],
    ['2022/11/04', 9.16, 9.12, 9.4, 9.05],
    ['2022/11/07', 9.23, 8.44, 9.23, 8.32],
    ['2022/11/08', 8.63, 8.83, 9.05, 8.15],
    ['2022/11/09', 8.7, 9.45, 9.49, 8.7],
    ['2022/11/10', 9.85, 10.78, 10.83, 9.85],
    ['2022/11/11', 10.75, 10.25, 10.75, 10.07],
    ['2022/11/14', 10.25, 10.1, 10.3, 10.1],
    ['2022/11/15', 9.94, 10.17, 10.59, 9.94],
    ['2022/11/16', 10.14, 10.08, 10.16, 9.95],
    ['2022/11/17', 10.01, 9.88, 10.01, 9.75],
    ['2022/11/18', 10.15, 9.93, 10.15, 9.78],
    ['2022/11/21', 9.93, 9.89, 10.1, 9.72],
    ['2022/11/22', 10.28, 10.19, 10.61, 10.19],
    ['2022/11/23', 10.35, 10.53, 10.74, 10.11],
    ['2022/11/25', 10.39, 10.15, 10.39, 10.15],
    ['2022/11/28', 10.2, 10.07, 10.2, 10.02],
    ['2022/11/29', 10.09, 10.06, 10.09, 9.99],
    ['2022/11/30', 9.99, 10.17, 10.42, 9.9],
    ['2022/12/01', 10.19, 10.11, 10.2, 9.76],
    ['2022/12/02', 10.14, 10.14, 10.14, 10.14],
    ['2022/12/05', 9.78, 9.82, 9.96, 9.78],
    ['2022/12/06', 9.83, 10.21, 10.39, 9.72],
    ['2022/12/07', 10.16, 9.89, 10.16, 9.89],
    ['2022/12/08', 9.88, 9.89, 9.89, 9.88],
    ['2022/12/09', 9.63, 9.68, 9.78, 9.61],
    ['2022/12/12', 9.75, 9.78, 9.86, 9.65],
    ['2022/12/13', 10.05, 9.68, 10.17, 9.68],
    ['2022/12/14', 9.8, 9.52, 10.12, 9.52],
    ['2022/12/15', 9.6, 9.63, 9.63, 9.6],
    ['2022/12/16', 9.47, 9.65, 10.03, 9.36],
    ['2022/12/19', 9.52, 9.27, 9.59, 9.27],
    ['2022/12/20', 9.38, 9.46, 9.6, 9.38],
    ['2022/12/21', 9.5, 9.7, 9.93, 9.5],
    ['2022/12/22', 9.74, 9.5, 9.74, 9.24],
    ['2022/12/23', 9.76, 9.55, 9.76, 9.55],
    ['2022/12/27', 9.77, 9.35, 9.77, 8.9],
    ['2022/12/28', 9.6, 9.25, 9.61, 9.25],
    ['2022/12/29', 9.52, 9.8, 9.81, 9.52],
    ['2022/12/30', 9.94, 9.65, 10.18, 8.54],
    ['2023/01/03', 9.75, 9.5, 9.75, 9.35],
    ['2023/01/04', 9.76, 9.73, 9.76, 9.65],
    ['2023/01/05', 9.45, 9.45, 9.45, 9.45],
    ['2023/01/06', 9.83, 10.02, 10.02, 9.83],
    ['2023/01/09', 9.99, 10.15, 10.29, 9.99],
    ['2023/01/10', 10.0, 10.1, 10.16, 9.87],
    ['2023/01/11', 10.09, 9.86, 10.1, 9.86],
    ['2023/01/12', 9.8, 9.98, 10.0, 9.8],
    ['2023/01/13', 10.0, 10.0, 10.03, 10.0],
    ['2023/01/17', 9.88, 9.87, 9.88, 9.87],
    ['2023/01/18', 9.87, 9.9, 10.0, 9.87],
    ['2023/01/19', 9.77, 9.81, 10.0, 9.71],
    ['2023/01/20', 9.95, 10.0, 10.04, 9.8],
    ['2023/01/23', 9.84, 9.96, 10.02, 9.84],
    ['2023/01/24', 9.93, 9.96, 10.0, 9.93],
    ['2023/01/25', 9.91, 9.99, 9.99, 9.91],
    ['2023/01/26', 10.0, 9.89, 10.02, 9.89],
    ['2023/01/27', 9.9, 10.0, 10.02, 9.77],
    ['2023/01/30', 9.81, 9.76, 10.0, 9.66],
    ['2023/01/31', 9.87, 10.09, 12.3, 9.8],
    ['2023/02/01', 10.07, 10.5, 10.79, 10.07],
    ['2023/02/02', 10.69, 10.6, 10.95, 10.56],
    ['2023/02/03', 10.42, 10.33, 10.81, 10.32],
    ['2023/02/06', 10.46, 10.27, 10.59, 10.0],
    ['2023/02/07', 10.25, 10.09, 10.45, 9.77],
    ['2023/02/08', 10.39, 10.15, 10.39, 10.15],
    ['2023/02/09', 10.39, 10.31, 10.43, 10.16],
    ['2023/02/10', 10.07, 10.15, 10.27, 10.07],
    ['2023/02/13', 10.27, 10.13, 10.42, 10.09],
    ['2023/02/14', 10.28, 10.03, 10.28, 9.95],
    ['2023/02/15', 9.9, 9.9, 9.99, 9.65],
    ['2023/02/16', 9.95, 9.84, 9.95, 9.81],
    ['2023/02/17', 9.9, 9.75, 9.91, 9.75],
    ['2023/02/21', 9.74, 9.62, 9.8, 9.62],
    ['2023/02/22', 9.63, 9.71, 9.81, 9.63],
    ['2023/02/23', 9.84, 9.68, 9.84, 9.68],
    ['2023/02/24', 9.57, 9.73, 9.73, 9.55],
    ['2023/02/27', 9.87, 9.72, 9.89, 9.7],
    ['2023/02/28', 9.79, 9.64, 9.8, 9.62],
    ['2023/03/01', 9.61, 9.73, 9.77, 9.47],
    ['2023/03/02', 9.57, 9.57, 9.76, 9.43],
    ['2023/03/03', 9.68, 9.5, 9.8, 9.48],
    ['2023/03/06', 9.55, 9.3, 9.64, 9.14],
    ['2023/03/07', 9.32, 9.3, 9.4, 9.22],
    ['2023/03/08', 9.19, 9.0, 9.34, 8.89],
    ['2023/03/09', 8.99, 8.84, 9.09, 8.65],
    ['2023/03/10', 8.56, 8.37, 8.8, 8.19],
    ['2023/03/13', 8.23, 7.95, 8.62, 7.95],
    ['2023/03/14', 8.42, 7.93, 9.03, 7.81],
    ['2023/03/15', 7.95, 8.62, 9.03, 7.95],
    ['2023/03/16', 8.5, 8.75, 9.0, 8.5],
    ['2023/03/17', 8.69, 8.39, 8.87, 8.21],
    ['2023/03/20', 8.6, 8.42, 8.71, 8.25],
    ['2023/03/21', 8.78, 8.91, 9.0, 8.51],
    ['2023/03/22', 8.8, 8.71, 8.8, 8.69],
    ['2023/03/23', 8.92, 8.61, 8.96, 8.41],
    ['2023/03/24', 8.75, 9.13, 9.15, 8.75],
    ['2023/03/27', 9.15, 8.99, 9.34, 8.87],
    ['2023/03/28', 8.85, 8.89, 9.02, 8.79],
    ['2023/03/29', 9.04, 9.0, 9.15, 8.85],
    ['2023/03/30', 9.03, 8.95, 9.08, 8.91],
    ['2023/03/31', 9.05, 9.03, 9.15, 8.81],
    ['2023/04/03', 8.95, 8.95, 9.02, 8.88],
    ['2023/04/04', 8.75, 8.72, 9.06, 8.72],
    ['2023/04/05', 8.88, 8.92, 8.99, 8.88],
    ['2023/04/06', 9.0, 8.91, 9.05, 8.78],
    ['2023/04/10', 8.87, 8.93, 9.0, 8.87],
    ['2023/04/11', 8.86, 8.96, 9.06, 8.86],
    ['2023/04/12', 9.09, 8.96, 9.09, 8.91],
    ['2023/04/13', 8.93, 8.95, 9.03, 8.92],
    ['2023/04/14', 9.07, 8.94, 9.07, 8.7],
    ['2023/04/17', 8.89, 8.96, 9.12, 8.89],
    ['2023/04/18', 8.9, 8.91, 9.05, 8.9],
    ['2023/04/19', 8.93, 8.93, 9.01, 8.88],
    ['2023/04/20', 8.94, 8.98, 9.03, 8.84],
    ['2023/04/21', 8.95, 8.98, 9.14, 8.95],
    ['2023/04/24', 8.97, 8.94, 9.1, 8.94],
    ['2023/04/25', 8.91, 8.21, 8.94, 8.11],
    ['2023/04/26', 8.28, 8.79, 8.79, 8.28],
    ['2023/04/27', 8.81, 8.97, 9.08, 8.57],
    ['2023/04/28', 9.05, 9.12, 9.24, 8.87],
    ['2023/05/01', 9.05, 8.8, 9.05, 8.8],
    ['2023/05/02', 8.8, 8.51, 9.0, 8.51],
    ['2023/05/03', 8.73, 8.65, 8.73, 8.62],
    ['2023/05/04', 8.68, 8.55, 8.7, 8.42],
    ['2023/05/05', 9.11, 8.99, 9.11, 8.88],
    ['2023/05/08', 9.05, 8.89, 9.05, 8.86],
    ['2023/05/09', 8.76, 8.96, 9.0, 8.76],
    ['2023/05/10', 9.08, 8.92, 9.08, 8.87],
    ['2023/05/11', 8.84, 8.84, 9.0, 8.81],
    ['2023/05/12', 8.89, 8.89, 9.02, 8.89],
    ['2023/05/15', 9.04, 9.05, 9.07, 8.92],
    ['2023/05/16', 8.84, 8.84, 8.84, 8.83],
    ['2023/05/17', 9.0, 8.97, 9.13, 8.87],
    ['2023/05/18', 8.9, 9.05, 9.13, 8.9],
    ['2023/05/19', 9.14, 9.01, 9.14, 8.95],
    ['2023/05/22', 9.0, 9.05, 9.09, 8.96],
    ['2023/05/23', 8.95, 8.99, 9.11, 8.95],
    ['2023/05/24', 9.0, 8.88, 9.0, 8.88],
    ['2023/05/25', 8.97, 8.97, 9.02, 8.94],
    ['2023/05/26', 9.0, 9.0, 9.02, 8.98],
    ['2023/05/30', 9.06, 8.94, 9.06, 8.94],
    ['2023/05/31', 9.05, 8.97, 9.18, 8.81],
    ['2023/06/01', 9.02, 8.74, 9.1, 8.74],
    ['2023/06/02', 8.96, 9.37, 9.63, 8.96],
    ['2023/06/05', 9.38, 9.47, 10.01, 9.11],
    ['2023/06/06', 9.59, 10.77, 11.25, 9.59],
    ['2023/06/07', 10.99, 11.24, 11.44, 10.99],
    ['2023/06/08', 11.2, 11.09, 11.57, 11.09],
    ['2023/06/09', 11.21, 10.99, 11.21, 10.88],
    ['2023/06/12', 10.92, 11.07, 11.22, 10.79],
    ['2023/06/13', 11.46, 11.47, 11.56, 11.11],
    ['2023/06/14', 11.72, 10.56, 11.9, 10.56],
    ['2023/06/15', 11.01, 11.5, 11.63, 11.01],
    ['2023/06/16', 11.67, 11.65, 12.36, 11.41],
    ['2023/06/20', 11.56, 11.34, 11.92, 11.2],
    ['2023/06/21', 11.19, 11.35, 11.5, 11.19],
    ['2023/06/22', 11.4, 11.34, 11.4, 11.22],
    ['2023/06/23', 11.49, 12.5, 12.5, 11.49],
    ['2023/06/26', 12.38, 12.25, 12.57, 12.25],
    ['2023/06/27', 12.38, 11.76, 12.38, 11.72],
    ['2023/06/28', 11.68, 11.71, 12.2, 11.45],
    ['2023/06/29', 12.01, 12.13, 12.13, 11.61],
    ['2023/06/30', 13.0, 11.53, 13.0, 10.78],
    ['2023/07/03', 11.3, 11.78, 12.33, 11.02],
    ['2023/07/05', 11.51, 11.94, 12.28, 10.96],
    ['2023/07/06', 11.43, 11.03, 11.52, 11.0],
    ['2023/07/07', 11.2, 11.28, 11.55, 10.87],
    ['2023/07/10', 11.21, 12.0, 12.05, 11.21],
    ['2023/07/11', 12.01, 11.84, 12.05, 11.41],
    ['2023/07/12', 11.96, 11.84, 11.99, 11.71],
    ['2023/07/13', 11.89, 11.91, 12.0, 11.86],
    ['2023/07/14', 11.76, 11.84, 12.05, 11.76],
    ['2023/07/17', 12.03, 12.05, 12.14, 11.95],
    ['2023/07/18', 12.07, 12.14, 12.2, 11.4],
    ['2023/07/19', 12.34, 12.4, 12.58, 12.34],
    ['2023/07/20', 12.4, 12.09, 12.4, 12.09],
    ['2023/07/21', 12.24, 12.16, 12.41, 12.16],
    ['2023/07/24', 12.19, 12.05, 12.24, 11.8],
    ['2023/07/25', 12.05, 12.46, 12.67, 12.05],
    ['2023/07/26', 12.46, 12.31, 12.76, 12.09],
    ['2023/07/27', 12.39, 12.17, 12.75, 11.7],
    ['2023/07/28', 12.22, 12.1, 12.68, 11.92],
    ['2023/07/31', 12.25, 12.38, 12.55, 12.24],
    ['2023/08/01', 12.38, 12.4, 12.61, 12.14],
    ['2023/08/02', 12.31, 12.48, 12.69, 12.26],
    ['2023/08/03', 12.47, 12.06, 12.48, 12.03],
    ['2023/08/04', 12.8, 13.0, 14.5, 12.5],
]);
var volumes = [
    12500.0,
    24500.0,
    15400.0,
    8100.0,
    6100.0,
    17800.0,
    14700.0,
    5900.0,
    7000.0,
    9500.0,
    12800.0,
    7700.0,
    8700.0,
    6300.0,
    3600.0,
    9600.0,
    44200.0,
    6900.0,
    17100.0,
    8300.0,
    6800.0,
    14500.0,
    8800.0,
    5900.0,
    3400.0,
    9900.0,
    14600.0,
    6700.0,
    36300.0,
    32700.0,
    19900.0,
    9200.0,
    20000.0,
    71900.0,
    19800.0,
    16100.0,
    62800.0,
    12800.0,
    23700.0,
    9700.0,
    23000.0,
    15500.0,
    5100.0,
    18200.0,
    11500.0,
    6200.0,
    2200.0,
    8500.0,
    12400.0,
    25200.0,
    19000.0,
    17700.0,
    21900.0,
    30400.0,
    7900.0,
    15800.0,
    8000.0,
    9200.0,
    12000.0,
    20900.0,
    116900.0,
    40500.0,
    33800.0,
    22400.0,
    26300.0,
    93800.0,
    21500.0,
    18300.0,
    5100.0,
    9300.0,
    13500.0,
    3600.0,
    3700.0,
    14000.0,
    11800.0,
    2700.0,
    18300.0,
    1200.0,
    9300.0,
    7700.0,
    21400.0,
    10600.0,
    2200.0,
    9200.0,
    30400.0,
    3500.0,
    2000.0,
    9400.0,
    9800.0,
    25700.0,
    16700.0,
    6300.0,
    44400.0,
    14400.0,
    8300.0,
    19800.0,
    12900.0,
    7900.0,
    60600.0,
    9400.0,
    6500.0,
    85700.0,
    16600.0,
    3500.0,
    2200.0,
    6700.0,
    27000.0,
    9600.0,
    14600.0,
    9500.0,
    5300.0,
    1200.0,
    2900.0,
    4500.0,
    28900.0,
    14500.0,
    6300.0,
    1800.0,
    16600.0,
    121900.0,
    50900.0,
    80400.0,
    15900.0,
    28500.0,
    19400.0,
    15100.0,
    33000.0,
    17300.0,
    3100.0,
    11800.0,
    18400.0,
    22100.0,
    34600.0,
    22500.0,
    22700.0,
    30200.0,
    16800.0,
    21800.0,
    18900.0,
    17100.0,
    16400.0,
    20400.0,
    13300.0,
    15500.0,
    56100.0,
    17800.0,
    28600.0,
    28800.0,
    63300.0,
    129100.0,
    116100.0,
    36200.0,
    29100.0,
    58900.0,
    28100.0,
    85700.0,
    5300.0,
    27400.0,
    14100.0,
    56300.0,
    10700.0,
    31100.0,
    8900.0,
    66900.0,
    7900.0,
    28900.0,
    5500.0,
    10900.0,
    11500.0,
    24700.0,
    10900.0,
    19000.0,
    6700.0,
    19600.0,
    8300.0,
    9700.0,
    4500.0,
    13200.0,
    13300.0,
    16400.0,
    8700.0,
    12700.0,
    22500.0,
    9200.0,
    35800.0,
    8700.0,
    8900.0,
    20500.0,
    4700.0,
    8000.0,
    14200.0,
    3700.0,
    3600.0,
    17600.0,
    2700.0,
    26300.0,
    13500.0,
    7100.0,
    24400.0,
    26300.0,
    4700.0,
    5100.0,
    15800.0,
    8900.0,
    28100.0,
    33400.0,
    29400.0,
    17200.0,
    25300.0,
    27200.0,
    14600.0,
    6800.0,
    13800.0,
    22600.0,
    19100.0,
    20800.0,
    92600.0,
    16200.0,
    13500.0,
    4700.0,
    89600.0,
    9500.0,
    10500.0,
    11700.0,
    10100.0,
    128800.0,
    8100.0,
    21800.0,
    13600.0,
    51500.0,
    12700.0,
    13600.0,
    6600.0,
    5100.0,
    8700.0,
    8400.0,
    15700.0,
    8900.0,
    8300.0,
    8000.0,
    13800.0,
    8700.0,
    5500.0,
    14200.0,
    20500.0,
    11500.0,
    3600.0,
    6200.0,
    9800.0,
    14000.0,
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
        text: "VEL",
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