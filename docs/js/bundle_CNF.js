/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_CNF");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/12', 2.41, 2.37, 2.41, 2.22],
    ['2022/08/15', 2.32, 2.38, 2.39, 2.28],
    ['2022/08/16', 2.33, 2.37, 2.39, 2.27],
    ['2022/08/17', 2.32, 2.41, 2.41, 2.3],
    ['2022/08/18', 2.37, 2.4, 2.47, 2.34],
    ['2022/08/19', 2.43, 2.39, 2.5, 2.29],
    ['2022/08/22', 2.33, 2.38, 2.4, 2.31],
    ['2022/08/23', 2.34, 2.49, 2.5, 2.33],
    ['2022/08/24', 2.49, 2.54, 2.56, 2.33],
    ['2022/08/25', 2.5, 2.62, 2.64, 2.5],
    ['2022/08/26', 2.57, 2.69, 2.69, 2.53],
    ['2022/08/29', 2.64, 2.7, 2.76, 2.61],
    ['2022/08/30', 2.72, 2.73, 2.77, 2.67],
    ['2022/08/31', 2.72, 2.71, 2.78, 2.68],
    ['2022/09/01', 2.71, 2.64, 2.8, 2.56],
    ['2022/09/02', 2.61, 2.65, 2.69, 2.51],
    ['2022/09/06', 2.6, 2.64, 2.7, 2.55],
    ['2022/09/07', 2.59, 2.68, 2.7, 2.55],
    ['2022/09/08', 2.63, 2.64, 2.7, 2.52],
    ['2022/09/09', 2.59, 2.74, 2.8, 2.55],
    ['2022/09/12', 2.69, 2.78, 2.85, 2.63],
    ['2022/09/13', 2.77, 2.68, 2.85, 2.56],
    ['2022/09/14', 2.62, 2.7, 2.72, 2.6],
    ['2022/09/15', 2.64, 2.72, 2.79, 2.64],
    ['2022/09/16', 2.63, 2.73, 2.73, 2.61],
    ['2022/09/19', 2.72, 2.67, 2.74, 2.54],
    ['2022/09/20', 2.6, 2.5, 2.65, 2.38],
    ['2022/09/21', 2.49, 2.62, 2.7, 2.49],
    ['2022/09/22', 2.64, 2.67, 2.8, 2.5],
    ['2022/09/23', 2.61, 2.66, 2.73, 2.61],
    ['2022/09/26', 2.67, 2.61, 2.67, 2.5],
    ['2022/09/27', 2.55, 2.62, 2.72, 2.5],
    ['2022/09/28', 2.67, 2.57, 2.68, 2.5],
    ['2022/09/29', 2.59, 2.57, 2.61, 2.5],
    ['2022/09/30', 2.51, 2.52, 2.64, 2.51],
    ['2022/10/03', 2.46, 2.57, 2.65, 2.45],
    ['2022/10/04', 2.55, 2.66, 2.68, 2.55],
    ['2022/10/05', 2.74, 2.8, 2.8, 2.5],
    ['2022/10/06', 2.77, 2.66, 2.8, 2.56],
    ['2022/10/07', 2.7, 2.41, 2.73, 2.38],
    ['2022/10/10', 2.62, 2.45, 2.62, 2.42],
    ['2022/10/11', 2.48, 2.59, 2.59, 2.46],
    ['2022/10/12', 2.52, 2.6, 2.68, 2.52],
    ['2022/10/13', 2.59, 2.66, 2.66, 2.5],
    ['2022/10/14', 2.71, 2.44, 2.71, 2.37],
    ['2022/10/17', 2.53, 2.45, 2.55, 2.37],
    ['2022/10/18', 2.5, 2.31, 2.7, 2.29],
    ['2022/10/19', 2.25, 2.4, 2.48, 2.25],
    ['2022/10/20', 2.47, 2.44, 2.5, 2.37],
    ['2022/10/21', 2.45, 2.41, 2.53, 2.33],
    ['2022/10/24', 2.44, 2.39, 2.45, 2.3],
    ['2022/10/25', 2.46, 2.3, 2.46, 2.25],
    ['2022/10/26', 2.32, 2.27, 2.32, 2.2],
    ['2022/10/27', 2.26, 2.05, 2.33, 2.05],
    ['2022/10/28', 2.1, 1.84, 2.1, 1.83],
    ['2022/10/31', 1.9, 1.7, 1.9, 1.7],
    ['2022/11/01', 1.72, 1.48, 1.78, 1.48],
    ['2022/11/02', 1.5, 1.41, 1.5, 1.4],
    ['2022/11/03', 1.4, 1.41, 1.49, 1.36],
    ['2022/11/04', 1.38, 1.42, 1.47, 1.36],
    ['2022/11/07', 1.39, 1.41, 1.44, 1.35],
    ['2022/11/08', 1.43, 1.37, 1.43, 1.28],
    ['2022/11/09', 1.41, 1.35, 1.41, 1.28],
    ['2022/11/10', 1.43, 1.37, 1.43, 1.25],
    ['2022/11/11', 1.42, 1.42, 1.42, 1.31],
    ['2022/11/14', 1.43, 1.7, 1.72, 1.43],
    ['2022/11/15', 1.7, 1.92, 1.95, 1.7],
    ['2022/11/16', 1.9, 1.9, 1.95, 1.76],
    ['2022/11/17', 1.92, 2.01, 2.06, 1.88],
    ['2022/11/18', 1.98, 2.03, 2.07, 1.9],
    ['2022/11/21', 1.99, 2.08, 2.08, 1.95],
    ['2022/11/22', 2.0, 2.15, 2.15, 1.92],
    ['2022/11/23', 2.17, 2.21, 2.25, 2.1],
    ['2022/11/25', 2.14, 2.18, 2.25, 2.12],
    ['2022/11/28', 2.12, 2.07, 2.25, 2.04],
    ['2022/11/29', 2.11, 2.24, 2.25, 2.0],
    ['2022/11/30', 2.2, 2.24, 2.25, 1.98],
    ['2022/12/01', 2.23, 2.24, 2.26, 2.13],
    ['2022/12/02', 2.2, 2.13, 2.25, 2.02],
    ['2022/12/05', 2.1, 2.04, 2.16, 1.94],
    ['2022/12/06', 2.09, 2.06, 2.09, 1.94],
    ['2022/12/07', 2.07, 2.05, 2.09, 2.01],
    ['2022/12/08', 2.05, 2.12, 2.18, 1.95],
    ['2022/12/09', 2.07, 2.14, 2.14, 1.85],
    ['2022/12/12', 2.09, 2.09, 2.1, 1.9],
    ['2022/12/13', 2.05, 2.14, 2.16, 1.96],
    ['2022/12/14', 2.11, 2.09, 2.16, 1.88],
    ['2022/12/15', 2.01, 2.06, 2.09, 1.91],
    ['2022/12/16', 1.97, 1.95, 2.14, 1.8],
    ['2022/12/19', 1.9, 1.93, 2.0, 1.81],
    ['2022/12/20', 1.88, 1.83, 1.98, 1.82],
    ['2022/12/21', 1.83, 1.88, 2.0, 1.82],
    ['2022/12/22', 1.9, 1.86, 2.01, 1.84],
    ['2022/12/23', 1.85, 1.74, 1.94, 1.7],
    ['2022/12/27', 1.74, 1.79, 1.9, 1.74],
    ['2022/12/28', 1.78, 1.72, 1.84, 1.72],
    ['2022/12/29', 1.74, 1.69, 1.77, 1.68],
    ['2022/12/30', 1.71, 1.71, 1.81, 1.63],
    ['2023/01/03', 1.66, 1.55, 1.76, 1.55],
    ['2023/01/04', 1.69, 1.62, 1.76, 1.57],
    ['2023/01/05', 1.68, 1.6, 1.73, 1.53],
    ['2023/01/06', 1.59, 1.69, 1.69, 1.59],
    ['2023/01/09', 1.7, 1.75, 1.76, 1.63],
    ['2023/01/10', 1.75, 1.78, 1.83, 1.64],
    ['2023/01/11', 1.72, 1.82, 1.86, 1.72],
    ['2023/01/12', 1.84, 1.81, 1.84, 1.7],
    ['2023/01/13', 1.77, 1.81, 1.84, 1.69],
    ['2023/01/17', 1.71, 1.59, 1.85, 1.59],
    ['2023/01/18', 1.6, 1.64, 1.72, 1.6],
    ['2023/01/19', 1.62, 1.65, 1.71, 1.58],
    ['2023/01/20', 1.6, 1.65, 1.66, 1.58],
    ['2023/01/23', 1.63, 1.64, 1.7, 1.61],
    ['2023/01/24', 1.78, 1.59, 1.78, 1.59],
    ['2023/01/25', 1.6, 1.51, 1.66, 1.41],
    ['2023/01/26', 1.48, 1.48, 1.59, 1.48],
    ['2023/01/27', 1.48, 1.67, 1.73, 1.48],
    ['2023/01/30', 1.61, 1.7, 1.76, 1.59],
    ['2023/01/31', 1.74, 1.99, 2.0, 1.66],
    ['2023/02/01', 1.95, 2.05, 2.07, 1.88],
    ['2023/02/02', 2.13, 2.05, 2.13, 1.95],
    ['2023/02/03', 2.12, 2.03, 2.12, 1.95],
    ['2023/02/06', 2.05, 2.04, 2.12, 1.99],
    ['2023/02/07', 2.08, 2.07, 2.1, 1.92],
    ['2023/02/08', 2.1, 2.12, 2.18, 2.06],
    ['2023/02/09', 2.08, 2.12, 2.16, 2.02],
    ['2023/02/10', 2.04, 2.13, 2.16, 2.04],
    ['2023/02/13', 2.08, 2.1, 2.14, 1.98],
    ['2023/02/14', 2.14, 2.16, 2.2, 2.0],
    ['2023/02/15', 2.2, 2.15, 2.21, 2.08],
    ['2023/02/16', 2.18, 2.17, 2.18, 2.09],
    ['2023/02/17', 2.19, 2.17, 2.21, 2.13],
    ['2023/02/21', 2.18, 2.19, 2.25, 2.13],
    ['2023/02/22', 2.23, 2.21, 2.23, 2.17],
    ['2023/02/23', 2.25, 2.23, 2.25, 2.16],
    ['2023/02/24', 2.24, 2.22, 2.25, 2.18],
    ['2023/02/27', 2.22, 2.18, 2.25, 2.12],
    ['2023/02/28', 2.17, 2.23, 2.25, 2.17],
    ['2023/03/01', 2.2, 2.25, 2.25, 2.19],
    ['2023/03/02', 2.2, 2.24, 2.25, 2.19],
    ['2023/03/03', 2.21, 2.24, 2.25, 2.14],
    ['2023/03/06', 2.24, 2.25, 2.25, 2.16],
    ['2023/03/07', 2.15, 2.23, 2.25, 2.15],
    ['2023/03/08', 2.25, 2.25, 2.25, 2.17],
    ['2023/03/09', 2.25, 2.25, 2.25, 2.24],
    ['2023/03/10', 2.25, 2.25, 2.25, 2.22],
    ['2023/03/13', 2.2, 2.15, 2.25, 2.08],
    ['2023/03/14', 2.05, 2.25, 2.25, 2.03],
    ['2023/03/15', 2.25, 2.25, 2.25, 2.22],
    ['2023/03/16', 2.25, 2.25, 2.25, 2.21],
    ['2023/03/17', 2.14, 2.19, 2.25, 2.14],
    ['2023/03/20', 2.25, 2.2, 2.25, 2.12],
    ['2023/03/21', 2.24, 2.25, 2.25, 2.23],
    ['2023/03/22', 2.25, 2.25, 2.25, 2.18],
    ['2023/03/23', 2.25, 2.25, 2.25, 2.15],
    ['2023/03/24', 2.25, 2.25, 2.25, 2.17],
    ['2023/03/27', 2.25, 2.25, 2.25, 2.16],
    ['2023/03/28', 2.2, 2.25, 2.25, 2.1],
    ['2023/03/29', 2.24, 2.24, 2.24, 2.17],
    ['2023/03/30', 2.24, 2.23, 2.24, 2.18],
    ['2023/03/31', 2.23, 2.47, 2.5, 2.23],
    ['2023/04/03', 2.49, 2.48, 2.5, 2.4],
    ['2023/04/04', 2.47, 2.51, 2.51, 2.4],
    ['2023/04/05', 2.51, 2.64, 2.79, 2.41],
    ['2023/04/06', 2.64, 2.69, 2.7, 2.57],
    ['2023/04/10', 2.7, 2.7, 2.78, 2.64],
    ['2023/04/11', 2.73, 2.72, 2.77, 2.44],
    ['2023/04/12', 2.7, 2.67, 2.72, 2.54],
    ['2023/04/13', 2.7, 2.68, 2.74, 2.6],
    ['2023/04/14', 2.7, 2.69, 2.7, 2.6],
    ['2023/04/17', 2.68, 2.69, 2.7, 2.6],
    ['2023/04/18', 2.7, 2.76, 2.77, 2.5],
    ['2023/04/19', 2.64, 2.69, 2.75, 2.6],
    ['2023/04/20', 2.65, 2.68, 2.72, 2.52],
    ['2023/04/21', 2.71, 2.57, 2.72, 2.57],
    ['2023/04/24', 2.56, 2.64, 2.68, 2.5],
    ['2023/04/25', 2.51, 2.59, 2.65, 2.46],
    ['2023/04/26', 2.54, 2.5, 2.62, 2.3],
    ['2023/04/27', 2.37, 2.61, 2.69, 2.35],
    ['2023/04/28', 2.62, 2.64, 2.68, 2.59],
    ['2023/05/01', 2.5, 2.64, 2.66, 2.5],
    ['2023/05/02', 2.65, 2.56, 2.67, 2.51],
    ['2023/05/03', 2.53, 2.54, 2.61, 2.43],
    ['2023/05/04', 2.58, 2.59, 2.68, 2.52],
    ['2023/05/05', 2.63, 2.58, 2.68, 2.55],
    ['2023/05/08', 2.58, 2.65, 2.67, 2.51],
    ['2023/05/09', 2.54, 2.65, 2.65, 2.53],
    ['2023/05/10', 2.65, 2.71, 2.76, 2.6],
    ['2023/05/11', 2.75, 2.88, 2.91, 2.68],
    ['2023/05/12', 2.85, 3.05, 3.2, 2.8],
    ['2023/05/15', 3.09, 3.07, 3.17, 2.94],
    ['2023/05/16', 3.09, 3.08, 3.15, 3.01],
    ['2023/05/17', 3.14, 3.08, 3.18, 3.0],
    ['2023/05/18', 3.08, 2.96, 3.08, 2.93],
    ['2023/05/19', 2.95, 2.99, 3.13, 2.84],
    ['2023/05/22', 3.0, 3.02, 3.2, 2.95],
    ['2023/05/23', 3.0, 2.97, 3.08, 2.91],
    ['2023/05/24', 3.0, 2.66, 3.0, 2.66],
    ['2023/05/25', 2.62, 2.97, 3.05, 2.48],
    ['2023/05/26', 3.1, 2.95, 3.19, 2.7],
    ['2023/05/30', 3.03, 2.98, 3.19, 2.87],
    ['2023/05/31', 3.0, 2.95, 3.04, 2.86],
    ['2023/06/01', 3.0, 2.95, 3.18, 2.9],
    ['2023/06/02', 3.09, 3.0, 3.19, 2.91],
    ['2023/06/05', 3.07, 2.86, 3.09, 2.86],
    ['2023/06/06', 2.95, 2.9, 3.02, 2.77],
    ['2023/06/07', 2.83, 2.9, 3.07, 2.73],
    ['2023/06/08', 2.9, 2.99, 3.05, 2.85],
    ['2023/06/09', 3.0, 2.95, 3.1, 2.87],
    ['2023/06/12', 2.89, 2.96, 3.01, 2.89],
    ['2023/06/13', 3.0, 2.99, 3.0, 2.91],
    ['2023/06/14', 3.0, 2.86, 3.03, 2.84],
    ['2023/06/15', 2.9, 2.95, 3.04, 2.9],
    ['2023/06/16', 2.9, 2.99, 3.03, 2.85],
    ['2023/06/20', 3.02, 2.96, 3.03, 2.95],
    ['2023/06/21', 2.95, 2.94, 3.01, 2.89],
    ['2023/06/22', 2.99, 2.85, 2.99, 2.76],
    ['2023/06/23', 2.92, 3.01, 3.01, 2.84],
    ['2023/06/26', 3.0, 2.99, 3.02, 2.9],
    ['2023/06/27', 2.95, 3.0, 3.01, 2.91],
    ['2023/06/28', 2.93, 3.04, 3.05, 2.83],
    ['2023/06/29', 3.0, 2.97, 3.0, 2.9],
    ['2023/06/30', 3.0, 2.92, 3.0, 2.81],
    ['2023/07/03', 2.91, 3.04, 3.1, 2.91],
    ['2023/07/05', 3.09, 3.11, 3.29, 3.03],
    ['2023/07/06', 3.16, 3.13, 3.23, 3.1],
    ['2023/07/07', 3.19, 3.11, 3.2, 3.07],
    ['2023/07/10', 3.17, 3.08, 3.2, 3.01],
    ['2023/07/11', 3.08, 3.09, 3.19, 3.04],
    ['2023/07/12', 3.05, 3.08, 3.1, 3.02],
    ['2023/07/13', 3.04, 3.01, 3.1, 3.0],
    ['2023/07/14', 3.05, 3.04, 3.1, 3.01],
    ['2023/07/17', 3.01, 3.05, 3.07, 2.95],
    ['2023/07/18', 3.04, 3.09, 3.11, 3.03],
    ['2023/07/19', 3.1, 3.11, 3.12, 3.08],
    ['2023/07/20', 3.12, 3.12, 3.13, 3.06],
    ['2023/07/21', 3.09, 3.1, 3.11, 3.02],
    ['2023/07/24', 2.99, 3.11, 3.14, 2.98],
    ['2023/07/25', 3.16, 3.1, 3.16, 3.09],
    ['2023/07/26', 3.1, 3.16, 3.16, 3.1],
    ['2023/07/27', 3.15, 3.19, 3.29, 3.14],
    ['2023/07/28', 3.28, 3.28, 3.29, 3.22],
    ['2023/07/31', 3.26, 3.17, 3.28, 3.06],
    ['2023/08/01', 3.17, 3.1, 3.22, 2.98],
    ['2023/08/02', 3.15, 3.1, 3.16, 3.05],
    ['2023/08/03', 3.09, 3.13, 3.15, 3.08],
    ['2023/08/04', 3.05, 3.09, 3.12, 3.02],
    ['2023/08/07', 2.99, 3.03, 3.09, 2.86],
    ['2023/08/08', 3.08, 3.1, 3.12, 3.04],
    ['2023/08/09', 3.11, 3.12, 3.12, 3.08],
    ['2023/08/10', 3.12, 3.18, 3.2, 3.11],
]);
var volumes = [
    114400.0,
    12400.0,
    35500.0,
    36700.0,
    29800.0,
    29800.0,
    42400.0,
    50900.0,
    44800.0,
    28000.0,
    43200.0,
    31800.0,
    20700.0,
    45100.0,
    17400.0,
    71800.0,
    14500.0,
    14700.0,
    117200.0,
    88100.0,
    76300.0,
    131400.0,
    22800.0,
    25700.0,
    67700.0,
    36800.0,
    43800.0,
    48800.0,
    81000.0,
    40600.0,
    124100.0,
    66500.0,
    66800.0,
    43600.0,
    15700.0,
    30300.0,
    24500.0,
    24300.0,
    37400.0,
    44100.0,
    34200.0,
    19200.0,
    26600.0,
    22600.0,
    58000.0,
    23700.0,
    29200.0,
    72200.0,
    67000.0,
    123500.0,
    22900.0,
    158800.0,
    175400.0,
    155500.0,
    50600.0,
    34200.0,
    38500.0,
    24900.0,
    48700.0,
    28700.0,
    31100.0,
    45800.0,
    46900.0,
    75800.0,
    9500.0,
    49700.0,
    46100.0,
    43800.0,
    43900.0,
    18600.0,
    23000.0,
    26300.0,
    68000.0,
    36500.0,
    63000.0,
    84800.0,
    79000.0,
    33000.0,
    118700.0,
    49800.0,
    29000.0,
    37900.0,
    56300.0,
    29900.0,
    25200.0,
    20400.0,
    30900.0,
    24700.0,
    205400.0,
    49100.0,
    19800.0,
    34600.0,
    37400.0,
    68500.0,
    29300.0,
    16800.0,
    56600.0,
    28400.0,
    10200.0,
    9200.0,
    35000.0,
    4700.0,
    12100.0,
    54300.0,
    23700.0,
    33800.0,
    146900.0,
    49600.0,
    15900.0,
    29000.0,
    19200.0,
    7500.0,
    5600.0,
    155300.0,
    8800.0,
    7300.0,
    21000.0,
    30800.0,
    35000.0,
    19500.0,
    35300.0,
    10800.0,
    29900.0,
    22500.0,
    14700.0,
    10400.0,
    18900.0,
    27600.0,
    16100.0,
    15000.0,
    14100.0,
    13600.0,
    8700.0,
    27300.0,
    17000.0,
    15000.0,
    12200.0,
    14000.0,
    7400.0,
    11600.0,
    8100.0,
    7300.0,
    2900.0,
    3000.0,
    3500.0,
    19600.0,
    21700.0,
    4800.0,
    2700.0,
    13300.0,
    8800.0,
    2100.0,
    13100.0,
    19500.0,
    5800.0,
    11000.0,
    23700.0,
    9500.0,
    8100.0,
    29300.0,
    11100.0,
    9700.0,
    30400.0,
    14600.0,
    8100.0,
    66200.0,
    16300.0,
    11400.0,
    10400.0,
    8200.0,
    25800.0,
    38600.0,
    16100.0,
    11800.0,
    18500.0,
    13400.0,
    20500.0,
    17800.0,
    15000.0,
    23500.0,
    18800.0,
    26500.0,
    24400.0,
    19200.0,
    30200.0,
    31300.0,
    31400.0,
    44400.0,
    39900.0,
    33400.0,
    32200.0,
    28900.0,
    33600.0,
    30000.0,
    30100.0,
    32100.0,
    32200.0,
    32200.0,
    25900.0,
    31900.0,
    26100.0,
    25700.0,
    37200.0,
    19100.0,
    33300.0,
    35400.0,
    19300.0,
    43200.0,
    24500.0,
    26500.0,
    16300.0,
    18800.0,
    24000.0,
    29900.0,
    21200.0,
    31500.0,
    21000.0,
    20200.0,
    19200.0,
    49100.0,
    19500.0,
    21600.0,
    11700.0,
    52600.0,
    18300.0,
    33200.0,
    22300.0,
    23400.0,
    13800.0,
    28900.0,
    16000.0,
    18700.0,
    23000.0,
    27200.0,
    26600.0,
    18600.0,
    33800.0,
    21800.0,
    26400.0,
    26700.0,
    26500.0,
    30600.0,
    21600.0,
    13900.0,
    11500.0,
    11300.0,
    11000.0,
    19500.0,
    24500.0,
    26100.0,
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
     *     text: "CNF",
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