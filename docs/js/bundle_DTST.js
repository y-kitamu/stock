/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_DTST");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/08', 2.72, 2.88, 2.88, 2.61],
    ['2022/08/09', 2.94, 2.78, 2.94, 2.72],
    ['2022/08/10', 2.81, 2.64, 2.85, 2.63],
    ['2022/08/11', 2.55, 2.74, 2.76, 2.51],
    ['2022/08/12', 2.71, 2.64, 2.72, 2.6],
    ['2022/08/15', 2.62, 2.59, 2.74, 2.58],
    ['2022/08/16', 2.74, 2.44, 2.74, 2.44],
    ['2022/08/17', 2.42, 2.41, 2.5, 2.36],
    ['2022/08/18', 2.4, 2.46, 2.53, 2.4],
    ['2022/08/19', 2.41, 2.38, 2.5, 2.32],
    ['2022/08/22', 2.36, 2.33, 2.38, 2.28],
    ['2022/08/23', 2.31, 2.35, 2.41, 2.31],
    ['2022/08/24', 2.34, 2.42, 2.42, 2.31],
    ['2022/08/25', 2.41, 2.32, 2.44, 2.3],
    ['2022/08/26', 2.38, 2.4, 2.41, 2.34],
    ['2022/08/29', 2.4, 2.4, 2.41, 2.34],
    ['2022/08/30', 2.34, 2.37, 2.37, 2.29],
    ['2022/08/31', 2.3, 2.38, 2.39, 2.3],
    ['2022/09/01', 2.3, 2.33, 2.35, 2.3],
    ['2022/09/02', 2.3, 2.29, 2.34, 2.27],
    ['2022/09/06', 2.27, 2.25, 2.34, 2.24],
    ['2022/09/07', 2.24, 2.3, 2.3, 2.22],
    ['2022/09/08', 2.23, 2.34, 2.35, 2.23],
    ['2022/09/09', 2.37, 2.32, 2.38, 2.22],
    ['2022/09/12', 2.28, 2.29, 2.34, 2.24],
    ['2022/09/13', 2.25, 2.31, 2.34, 2.25],
    ['2022/09/14', 2.29, 2.29, 2.34, 2.29],
    ['2022/09/15', 2.32, 2.29, 2.37, 2.29],
    ['2022/09/16', 2.28, 2.25, 2.3, 2.25],
    ['2022/09/19', 2.25, 2.23, 2.3, 2.22],
    ['2022/09/20', 2.21, 2.19, 2.24, 2.18],
    ['2022/09/21', 2.22, 2.18, 2.24, 2.18],
    ['2022/09/22', 2.15, 2.13, 2.2, 2.12],
    ['2022/09/23', 2.1, 2.11, 2.15, 2.08],
    ['2022/09/26', 2.08, 2.07, 2.11, 2.05],
    ['2022/09/27', 2.05, 2.09, 2.13, 2.05],
    ['2022/09/28', 2.09, 2.08, 2.13, 2.04],
    ['2022/09/29', 2.04, 2.05, 2.09, 2.02],
    ['2022/09/30', 1.99, 2.04, 2.08, 1.99],
    ['2022/10/03', 1.98, 2.09, 2.12, 1.98],
    ['2022/10/04', 2.12, 2.2, 2.25, 2.12],
    ['2022/10/05', 2.14, 2.16, 2.27, 2.13],
    ['2022/10/06', 2.18, 2.29, 2.29, 2.14],
    ['2022/10/07', 2.22, 2.13, 2.24, 2.09],
    ['2022/10/10', 2.17, 2.07, 2.24, 2.01],
    ['2022/10/11', 2.02, 2.0, 2.07, 1.99],
    ['2022/10/12', 1.97, 2.01, 2.05, 1.97],
    ['2022/10/13', 1.98, 1.98, 2.03, 1.93],
    ['2022/10/14', 1.99, 1.99, 2.0, 1.91],
    ['2022/10/17', 1.99, 2.1, 2.1, 1.99],
    ['2022/10/18', 2.08, 2.01, 2.1, 2.01],
    ['2022/10/19', 2.01, 1.97, 2.01, 1.97],
    ['2022/10/20', 1.97, 1.98, 2.01, 1.94],
    ['2022/10/21', 2.01, 2.04, 2.06, 2.01],
    ['2022/10/24', 2.04, 1.96, 2.14, 1.95],
    ['2022/10/25', 1.94, 1.99, 2.09, 1.94],
    ['2022/10/26', 1.96, 2.02, 2.05, 1.95],
    ['2022/10/27', 2.02, 2.01, 2.05, 2.01],
    ['2022/10/28', 2.04, 2.02, 2.05, 1.99],
    ['2022/10/31', 2.05, 2.0, 2.05, 1.98],
    ['2022/11/01', 2.11, 2.02, 2.11, 2.02],
    ['2022/11/02', 2.05, 1.98, 2.06, 1.96],
    ['2022/11/03', 1.98, 2.03, 2.03, 1.91],
    ['2022/11/04', 2.11, 1.96, 2.11, 1.94],
    ['2022/11/07', 1.95, 2.01, 2.01, 1.94],
    ['2022/11/08', 1.96, 1.97, 2.01, 1.96],
    ['2022/11/09', 1.96, 1.97, 2.01, 1.96],
    ['2022/11/10', 1.96, 2.03, 2.14, 1.96],
    ['2022/11/11', 2.05, 2.08, 2.08, 2.0],
    ['2022/11/14', 2.08, 2.12, 2.12, 1.96],
    ['2022/11/15', 2.12, 2.05, 2.24, 2.03],
    ['2022/11/16', 2.06, 2.02, 2.13, 2.02],
    ['2022/11/17', 2.05, 2.0, 2.1, 2.0],
    ['2022/11/18', 2.0, 1.94, 2.04, 1.86],
    ['2022/11/21', 1.92, 1.9, 1.94, 1.89],
    ['2022/11/22', 1.89, 1.74, 1.98, 1.67],
    ['2022/11/23', 1.79, 1.8, 1.82, 1.71],
    ['2022/11/25', 1.8, 1.85, 1.85, 1.8],
    ['2022/11/28', 1.83, 1.9, 1.91, 1.79],
    ['2022/11/29', 1.86, 1.8, 1.9, 1.79],
    ['2022/11/30', 1.91, 1.83, 1.91, 1.81],
    ['2022/12/01', 1.87, 1.87, 1.92, 1.84],
    ['2022/12/02', 1.8, 1.79, 1.84, 1.79],
    ['2022/12/05', 1.81, 1.8, 1.85, 1.77],
    ['2022/12/06', 1.77, 1.77, 1.9, 1.77],
    ['2022/12/07', 1.85, 1.84, 1.85, 1.77],
    ['2022/12/08', 1.8, 1.78, 1.85, 1.76],
    ['2022/12/09', 1.82, 1.8, 1.86, 1.8],
    ['2022/12/12', 1.76, 1.73, 1.84, 1.72],
    ['2022/12/13', 1.78, 1.84, 1.84, 1.78],
    ['2022/12/14', 1.88, 1.77, 1.88, 1.77],
    ['2022/12/15', 1.73, 1.73, 1.77, 1.73],
    ['2022/12/16', 1.75, 1.74, 1.75, 1.69],
    ['2022/12/19', 1.72, 1.69, 1.75, 1.69],
    ['2022/12/20', 1.7, 1.69, 1.7, 1.68],
    ['2022/12/21', 1.73, 1.68, 1.73, 1.68],
    ['2022/12/22', 1.69, 1.53, 1.7, 1.39],
    ['2022/12/23', 1.53, 1.59, 1.66, 1.53],
    ['2022/12/27', 1.5, 1.53, 1.59, 1.5],
    ['2022/12/28', 1.54, 1.5, 1.54, 1.48],
    ['2022/12/29', 1.48, 1.49, 1.54, 1.4],
    ['2022/12/30', 1.39, 1.48, 1.54, 1.39],
    ['2023/01/03', 1.54, 1.52, 1.6, 1.4],
    ['2023/01/04', 1.46, 1.53, 1.58, 1.46],
    ['2023/01/05', 1.55, 1.51, 1.55, 1.48],
    ['2023/01/06', 1.59, 1.57, 1.59, 1.47],
    ['2023/01/09', 1.59, 1.57, 1.6, 1.53],
    ['2023/01/10', 1.6, 1.6, 1.6, 1.58],
    ['2023/01/11', 1.6, 1.59, 1.6, 1.55],
    ['2023/01/12', 1.58, 1.61, 1.64, 1.58],
    ['2023/01/13', 1.65, 1.61, 1.65, 1.6],
    ['2023/01/17', 1.67, 1.71, 1.72, 1.65],
    ['2023/01/18', 1.7, 1.69, 1.82, 1.69],
    ['2023/01/19', 1.78, 1.65, 1.78, 1.65],
    ['2023/01/20', 1.7, 1.63, 1.73, 1.63],
    ['2023/01/23', 1.66, 1.7, 1.77, 1.64],
    ['2023/01/24', 1.7, 1.74, 1.8, 1.64],
    ['2023/01/25', 1.82, 1.72, 1.82, 1.72],
    ['2023/01/26', 1.75, 1.75, 1.75, 1.67],
    ['2023/01/27', 1.75, 1.73, 1.75, 1.68],
    ['2023/01/30', 1.73, 1.72, 1.75, 1.66],
    ['2023/01/31', 1.75, 1.74, 1.75, 1.72],
    ['2023/02/01', 1.75, 1.8, 1.88, 1.75],
    ['2023/02/02', 1.87, 1.87, 1.88, 1.8],
    ['2023/02/03', 1.87, 1.82, 1.88, 1.8],
    ['2023/02/06', 1.87, 1.77, 1.87, 1.76],
    ['2023/02/07', 1.88, 1.83, 1.88, 1.77],
    ['2023/02/08', 1.87, 1.87, 1.87, 1.76],
    ['2023/02/09', 1.87, 1.87, 1.88, 1.77],
    ['2023/02/10', 1.79, 1.86, 1.87, 1.77],
    ['2023/02/13', 1.87, 1.93, 1.98, 1.76],
    ['2023/02/14', 1.99, 1.96, 2.05, 1.87],
    ['2023/02/15', 2.0, 1.97, 2.0, 1.92],
    ['2023/02/16', 1.98, 1.89, 1.98, 1.88],
    ['2023/02/17', 1.9, 1.86, 1.9, 1.83],
    ['2023/02/21', 1.88, 1.87, 1.92, 1.84],
    ['2023/02/22', 1.82, 1.84, 1.92, 1.78],
    ['2023/02/23', 1.81, 1.86, 1.86, 1.81],
    ['2023/02/24', 1.86, 1.86, 1.86, 1.81],
    ['2023/02/27', 1.8, 1.78, 1.87, 1.72],
    ['2023/02/28', 1.74, 1.8, 1.8, 1.74],
    ['2023/03/01', 1.78, 1.78, 1.88, 1.73],
    ['2023/03/02', 1.78, 1.78, 1.88, 1.77],
    ['2023/03/03', 1.86, 1.79, 1.88, 1.75],
    ['2023/03/06', 1.78, 1.75, 1.78, 1.71],
    ['2023/03/07', 1.71, 1.72, 1.74, 1.7],
    ['2023/03/08', 1.71, 1.79, 1.84, 1.71],
    ['2023/03/09', 1.76, 1.81, 1.84, 1.73],
    ['2023/03/10', 1.79, 1.72, 1.79, 1.69],
    ['2023/03/13', 1.69, 1.72, 1.74, 1.69],
    ['2023/03/14', 1.77, 1.7, 1.78, 1.7],
    ['2023/03/15', 1.7, 1.66, 1.73, 1.66],
    ['2023/03/16', 1.71, 1.66, 1.71, 1.66],
    ['2023/03/17', 1.67, 1.67, 1.71, 1.67],
    ['2023/03/20', 1.77, 1.61, 1.77, 1.61],
    ['2023/03/21', 1.72, 1.63, 1.72, 1.62],
    ['2023/03/22', 1.61, 1.61, 1.65, 1.6],
    ['2023/03/23', 1.7, 1.6, 1.7, 1.6],
    ['2023/03/24', 1.61, 1.63, 1.66, 1.6],
    ['2023/03/27', 1.65, 1.63, 1.66, 1.62],
    ['2023/03/28', 1.63, 1.61, 1.66, 1.61],
    ['2023/03/29', 1.6, 1.68, 1.68, 1.6],
    ['2023/03/30', 1.7, 1.71, 1.75, 1.67],
    ['2023/03/31', 1.83, 1.82, 1.84, 1.71],
    ['2023/04/03', 1.8, 1.83, 1.84, 1.73],
    ['2023/04/04', 1.84, 1.76, 1.84, 1.76],
    ['2023/04/05', 1.78, 1.76, 1.83, 1.76],
    ['2023/04/06', 1.81, 1.8, 1.81, 1.75],
    ['2023/04/10', 1.77, 1.8, 1.81, 1.77],
    ['2023/04/11', 1.81, 1.8, 1.81, 1.77],
    ['2023/04/12', 1.77, 1.78, 1.85, 1.77],
    ['2023/04/13', 1.84, 1.83, 1.84, 1.79],
    ['2023/04/14', 1.84, 1.88, 1.89, 1.82],
    ['2023/04/17', 1.89, 1.91, 1.94, 1.84],
    ['2023/04/18', 1.93, 1.94, 1.94, 1.88],
    ['2023/04/19', 1.9, 1.93, 1.95, 1.88],
    ['2023/04/20', 1.92, 1.94, 1.95, 1.89],
    ['2023/04/21', 1.83, 1.86, 1.91, 1.78],
    ['2023/04/24', 1.79, 1.88, 1.91, 1.79],
    ['2023/04/25', 1.9, 1.83, 1.9, 1.81],
    ['2023/04/26', 1.78, 1.71, 1.83, 1.71],
    ['2023/04/27', 1.76, 1.78, 1.8, 1.66],
    ['2023/04/28', 1.72, 1.75, 1.76, 1.72],
    ['2023/05/01', 1.79, 1.74, 1.8, 1.74],
    ['2023/05/02', 1.79, 1.75, 1.8, 1.72],
    ['2023/05/03', 1.8, 1.74, 1.8, 1.72],
    ['2023/05/04', 1.76, 1.7, 1.76, 1.7],
    ['2023/05/05', 1.78, 1.79, 1.79, 1.7],
    ['2023/05/08', 1.78, 1.8, 1.81, 1.73],
    ['2023/05/09', 1.82, 1.79, 1.82, 1.75],
    ['2023/05/10', 1.79, 1.93, 1.94, 1.75],
    ['2023/05/11', 1.94, 1.85, 1.95, 1.83],
    ['2023/05/12', 1.83, 1.91, 2.17, 1.8],
    ['2023/05/15', 2.0, 1.96, 2.05, 1.81],
    ['2023/05/16', 1.95, 1.89, 1.97, 1.8],
    ['2023/05/17', 1.89, 1.89, 1.93, 1.85],
    ['2023/05/18', 1.86, 1.89, 1.93, 1.84],
    ['2023/05/19', 1.96, 1.93, 1.96, 1.88],
    ['2023/05/22', 1.95, 2.03, 2.08, 1.94],
    ['2023/05/23', 2.03, 2.02, 2.07, 2.01],
    ['2023/05/24', 1.97, 2.0, 2.04, 1.91],
    ['2023/05/25', 2.03, 1.95, 2.04, 1.86],
    ['2023/05/26', 1.9, 1.94, 1.97, 1.9],
    ['2023/05/30', 1.94, 1.91, 1.97, 1.9],
    ['2023/05/31', 1.94, 1.9, 1.94, 1.89],
    ['2023/06/01', 1.94, 1.84, 1.95, 1.78],
    ['2023/06/02', 1.98, 1.93, 1.98, 1.88],
    ['2023/06/05', 1.93, 1.96, 1.97, 1.87],
    ['2023/06/06', 1.96, 1.93, 2.0, 1.89],
    ['2023/06/07', 1.91, 1.95, 1.99, 1.9],
    ['2023/06/08', 1.95, 1.99, 1.99, 1.9],
    ['2023/06/09', 1.99, 2.05, 2.18, 1.97],
    ['2023/06/12', 2.01, 2.02, 2.09, 2.01],
    ['2023/06/13', 2.03, 1.98, 2.05, 1.98],
    ['2023/06/14', 2.04, 1.99, 2.04, 1.99],
    ['2023/06/15', 2.02, 2.07, 2.1, 2.02],
    ['2023/06/16', 2.07, 2.07, 2.08, 2.0],
    ['2023/06/20', 2.07, 2.04, 2.07, 1.98],
    ['2023/06/21', 2.03, 2.06, 2.06, 1.98],
    ['2023/06/22', 2.06, 2.06, 2.06, 2.01],
    ['2023/06/23', 2.05, 2.05, 2.07, 2.04],
    ['2023/06/26', 2.04, 2.07, 2.07, 1.97],
    ['2023/06/27', 2.07, 2.09, 2.09, 2.0],
    ['2023/06/28', 2.07, 2.15, 2.18, 2.06],
    ['2023/06/29', 2.09, 2.37, 2.4, 2.09],
    ['2023/06/30', 2.32, 2.33, 2.41, 2.21],
    ['2023/07/03', 2.33, 2.27, 2.39, 2.25],
    ['2023/07/05', 2.28, 2.33, 2.34, 2.23],
    ['2023/07/06', 2.3, 2.4, 2.45, 2.25],
    ['2023/07/07', 2.45, 2.6, 2.62, 2.41],
    ['2023/07/10', 2.67, 2.49, 2.69, 2.34],
    ['2023/07/11', 2.47, 2.54, 2.57, 2.44],
    ['2023/07/12', 2.6, 2.54, 2.6, 2.51],
    ['2023/07/13', 2.61, 2.56, 2.65, 2.45],
    ['2023/07/14', 2.61, 2.54, 2.61, 2.49],
    ['2023/07/17', 2.59, 2.59, 2.63, 2.54],
    ['2023/07/18', 2.64, 2.65, 2.65, 2.6],
    ['2023/07/19', 2.64, 2.56, 2.65, 2.52],
    ['2023/07/20', 2.62, 2.55, 2.62, 2.5],
    ['2023/07/21', 2.65, 2.92, 3.08, 2.55],
    ['2023/07/24', 3.09, 2.9, 3.1, 2.71],
    ['2023/07/25', 2.96, 2.88, 2.96, 2.77],
    ['2023/07/26', 2.81, 2.75, 2.94, 2.62],
    ['2023/07/27', 2.88, 2.84, 2.88, 2.76],
    ['2023/07/28', 2.78, 2.9, 2.92, 2.78],
    ['2023/07/31', 2.96, 2.86, 2.97, 2.76],
    ['2023/08/01', 2.78, 2.82, 2.86, 2.78],
    ['2023/08/02', 2.78, 2.78, 2.8, 2.66],
    ['2023/08/03', 2.68, 2.68, 2.77, 2.63],
    ['2023/08/04', 2.68, 2.65, 2.69, 2.6],
]);
var volumes = [
    70100.0,
    22500.0,
    32600.0,
    117900.0,
    27500.0,
    26200.0,
    43500.0,
    34600.0,
    53700.0,
    55400.0,
    17900.0,
    25900.0,
    17900.0,
    68300.0,
    26200.0,
    8700.0,
    10700.0,
    13100.0,
    17200.0,
    18600.0,
    25100.0,
    10100.0,
    11400.0,
    39500.0,
    11700.0,
    12800.0,
    3400.0,
    4400.0,
    14000.0,
    52400.0,
    39000.0,
    7200.0,
    24400.0,
    14900.0,
    17000.0,
    2600.0,
    16700.0,
    13000.0,
    7800.0,
    23100.0,
    9000.0,
    14200.0,
    4500.0,
    11600.0,
    46000.0,
    16800.0,
    2600.0,
    8600.0,
    9000.0,
    2500.0,
    6800.0,
    8700.0,
    33200.0,
    3700.0,
    15500.0,
    64300.0,
    9800.0,
    5000.0,
    6100.0,
    5800.0,
    11500.0,
    6700.0,
    28300.0,
    19600.0,
    4300.0,
    8700.0,
    9000.0,
    27900.0,
    12200.0,
    22500.0,
    36200.0,
    12600.0,
    13300.0,
    43100.0,
    5800.0,
    56000.0,
    41900.0,
    3600.0,
    10000.0,
    8500.0,
    2100.0,
    3400.0,
    11500.0,
    11700.0,
    16800.0,
    5500.0,
    20700.0,
    1200.0,
    25400.0,
    20800.0,
    10400.0,
    3400.0,
    16800.0,
    6400.0,
    13800.0,
    10300.0,
    69100.0,
    6300.0,
    15600.0,
    9800.0,
    35900.0,
    107200.0,
    40900.0,
    9000.0,
    6600.0,
    29200.0,
    5900.0,
    4900.0,
    17100.0,
    10200.0,
    16800.0,
    22600.0,
    32100.0,
    12200.0,
    27500.0,
    19700.0,
    34400.0,
    14900.0,
    4100.0,
    9800.0,
    12300.0,
    19200.0,
    60000.0,
    25400.0,
    17300.0,
    26300.0,
    23400.0,
    11700.0,
    11400.0,
    13000.0,
    78000.0,
    66500.0,
    27300.0,
    42800.0,
    23100.0,
    19000.0,
    10400.0,
    10700.0,
    9900.0,
    63100.0,
    6000.0,
    19000.0,
    10700.0,
    9500.0,
    8500.0,
    8000.0,
    20300.0,
    4400.0,
    13200.0,
    11800.0,
    4700.0,
    3400.0,
    2800.0,
    1800.0,
    5600.0,
    12000.0,
    23700.0,
    6200.0,
    12700.0,
    6500.0,
    3200.0,
    8300.0,
    20900.0,
    29900.0,
    17300.0,
    10400.0,
    10700.0,
    5500.0,
    10200.0,
    11500.0,
    14900.0,
    20800.0,
    34800.0,
    54400.0,
    10400.0,
    21300.0,
    5900.0,
    27400.0,
    3400.0,
    7500.0,
    24500.0,
    11800.0,
    20900.0,
    19900.0,
    19500.0,
    11500.0,
    4700.0,
    11100.0,
    10200.0,
    5300.0,
    106000.0,
    34800.0,
    410300.0,
    107300.0,
    49800.0,
    9500.0,
    49500.0,
    43100.0,
    70900.0,
    25200.0,
    85600.0,
    56700.0,
    17300.0,
    14100.0,
    7600.0,
    56500.0,
    43800.0,
    45100.0,
    65800.0,
    46600.0,
    35900.0,
    74600.0,
    33100.0,
    13500.0,
    9800.0,
    24700.0,
    22600.0,
    40400.0,
    5100.0,
    10000.0,
    13300.0,
    21500.0,
    26100.0,
    41600.0,
    139100.0,
    74400.0,
    40700.0,
    22200.0,
    76800.0,
    101500.0,
    126200.0,
    65300.0,
    19700.0,
    78700.0,
    21200.0,
    28500.0,
    19800.0,
    27800.0,
    17300.0,
    341600.0,
    184600.0,
    50100.0,
    87300.0,
    33900.0,
    27500.0,
    54800.0,
    8600.0,
    12700.0,
    10900.0,
    17900.0,
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
        text: "DTST",
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