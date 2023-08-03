/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_LSEA");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/03', 6.9, 7.07, 7.07, 6.88],
    ['2022/08/04', 7.44, 7.39, 7.44, 6.89],
    ['2022/08/05', 7.28, 7.06, 7.33, 6.89],
    ['2022/08/08', 7.06, 6.93, 7.19, 6.69],
    ['2022/08/09', 6.86, 6.65, 6.95, 6.57],
    ['2022/08/10', 7.03, 6.94, 7.04, 6.89],
    ['2022/08/11', 7.05, 6.68, 7.11, 6.6],
    ['2022/08/12', 6.9, 7.06, 7.19, 6.9],
    ['2022/08/15', 7.08, 7.34, 7.63, 6.95],
    ['2022/08/16', 7.25, 7.22, 7.47, 7.17],
    ['2022/08/17', 7.16, 7.3, 7.43, 7.01],
    ['2022/08/18', 7.3, 7.47, 7.5, 7.3],
    ['2022/08/19', 7.31, 7.29, 7.34, 7.12],
    ['2022/08/22', 7.21, 6.87, 7.26, 6.82],
    ['2022/08/23', 6.83, 6.78, 7.09, 6.72],
    ['2022/08/24', 6.73, 6.82, 6.89, 6.73],
    ['2022/08/25', 6.78, 6.85, 6.91, 6.75],
    ['2022/08/26', 6.8, 6.78, 6.95, 6.72],
    ['2022/08/29', 6.78, 6.72, 6.86, 6.72],
    ['2022/08/30', 6.91, 6.71, 6.91, 6.7],
    ['2022/08/31', 6.71, 6.7, 6.8, 6.69],
    ['2022/09/01', 6.79, 6.72, 6.84, 6.7],
    ['2022/09/02', 6.82, 6.57, 6.82, 6.42],
    ['2022/09/06', 6.54, 6.11, 6.54, 6.0],
    ['2022/09/07', 6.05, 6.1, 6.22, 5.68],
    ['2022/09/08', 6.01, 6.03, 6.14, 5.76],
    ['2022/09/09', 6.13, 6.01, 6.13, 5.81],
    ['2022/09/12', 6.1, 5.85, 6.25, 5.8],
    ['2022/09/13', 5.85, 5.62, 6.18, 5.51],
    ['2022/09/14', 5.61, 5.4, 5.74, 5.36],
    ['2022/09/15', 5.34, 5.37, 5.57, 5.18],
    ['2022/09/16', 5.37, 5.53, 5.7, 5.14],
    ['2022/09/19', 5.43, 5.32, 5.59, 5.25],
    ['2022/09/20', 5.34, 5.05, 5.65, 4.95],
    ['2022/09/21', 5.03, 5.42, 5.79, 5.03],
    ['2022/09/22', 5.48, 5.15, 5.48, 4.98],
    ['2022/09/23', 5.12, 5.12, 5.28, 4.97],
    ['2022/09/26', 5.03, 5.07, 5.22, 4.93],
    ['2022/09/27', 5.07, 5.03, 5.2, 4.99],
    ['2022/09/28', 5.13, 5.05, 5.23, 4.95],
    ['2022/09/29', 4.96, 4.99, 5.12, 4.89],
    ['2022/09/30', 4.75, 4.77, 5.05, 4.75],
    ['2022/10/03', 4.81, 4.94, 5.06, 4.7],
    ['2022/10/04', 4.95, 5.12, 5.16, 4.95],
    ['2022/10/05', 5.17, 5.09, 5.17, 5.03],
    ['2022/10/06', 5.4, 4.99, 5.4, 4.91],
    ['2022/10/07', 4.96, 4.77, 5.0, 4.74],
    ['2022/10/10', 4.74, 4.69, 4.83, 4.64],
    ['2022/10/11', 4.68, 4.73, 4.9, 4.54],
    ['2022/10/12', 4.73, 4.7, 4.8, 4.6],
    ['2022/10/13', 4.67, 4.76, 5.05, 4.59],
    ['2022/10/14', 4.77, 4.56, 4.84, 4.48],
    ['2022/10/17', 4.68, 4.86, 4.9, 4.68],
    ['2022/10/18', 4.76, 4.73, 4.9, 4.64],
    ['2022/10/19', 4.75, 4.83, 4.9, 4.75],
    ['2022/10/20', 4.85, 4.68, 4.89, 4.57],
    ['2022/10/21', 4.73, 4.76, 4.78, 4.64],
    ['2022/10/24', 4.8, 4.86, 4.95, 4.61],
    ['2022/10/25', 4.81, 5.13, 5.36, 4.81],
    ['2022/10/26', 5.21, 5.04, 5.35, 5.0],
    ['2022/10/27', 5.08, 5.02, 5.26, 4.92],
    ['2022/10/28', 4.9, 5.0, 5.14, 4.9],
    ['2022/10/31', 4.92, 4.86, 5.03, 4.81],
    ['2022/11/01', 4.9, 4.87, 4.99, 4.81],
    ['2022/11/02', 4.94, 4.7, 4.96, 4.64],
    ['2022/11/03', 4.71, 4.8, 4.89, 4.61],
    ['2022/11/04', 4.85, 5.13, 5.13, 4.82],
    ['2022/11/07', 5.12, 5.06, 5.14, 4.92],
    ['2022/11/08', 5.06, 5.1, 5.24, 4.94],
    ['2022/11/09', 5.2, 4.99, 5.2, 4.94],
    ['2022/11/10', 5.13, 5.35, 5.44, 5.1],
    ['2022/11/11', 5.29, 5.37, 5.43, 5.25],
    ['2022/11/14', 5.42, 5.39, 5.5, 5.21],
    ['2022/11/15', 5.4, 5.48, 5.75, 5.34],
    ['2022/11/16', 5.46, 5.58, 5.6, 5.46],
    ['2022/11/17', 5.48, 5.61, 5.76, 5.44],
    ['2022/11/18', 5.71, 5.81, 5.87, 5.56],
    ['2022/11/21', 5.82, 5.26, 5.97, 5.21],
    ['2022/11/22', 5.31, 5.44, 5.5, 5.31],
    ['2022/11/23', 5.4, 5.37, 5.44, 5.23],
    ['2022/11/25', 5.43, 5.51, 5.59, 5.35],
    ['2022/11/28', 5.51, 5.37, 5.63, 5.36],
    ['2022/11/29', 5.39, 5.27, 5.93, 5.25],
    ['2022/11/30', 5.25, 5.49, 5.57, 5.25],
    ['2022/12/01', 5.47, 5.79, 5.9, 5.43],
    ['2022/12/02', 5.74, 5.46, 5.81, 5.42],
    ['2022/12/05', 5.46, 5.39, 5.55, 5.32],
    ['2022/12/06', 5.4, 5.54, 5.64, 5.33],
    ['2022/12/07', 5.54, 5.35, 5.66, 5.3],
    ['2022/12/08', 5.42, 5.36, 5.55, 5.36],
    ['2022/12/09', 5.38, 5.37, 5.46, 5.34],
    ['2022/12/12', 5.41, 5.37, 5.5, 5.35],
    ['2022/12/13', 5.47, 5.68, 6.0, 5.4],
    ['2022/12/14', 5.66, 5.83, 5.97, 5.66],
    ['2022/12/15', 5.7, 5.68, 5.91, 5.5],
    ['2022/12/16', 5.6, 5.66, 5.75, 5.55],
    ['2022/12/19', 5.6, 5.62, 5.8, 5.53],
    ['2022/12/20', 5.65, 5.56, 5.74, 5.52],
    ['2022/12/21', 5.62, 5.45, 5.65, 5.3],
    ['2022/12/22', 5.34, 5.43, 5.46, 5.3],
    ['2022/12/23', 5.55, 5.45, 5.59, 5.39],
    ['2022/12/27', 5.47, 5.46, 5.55, 5.35],
    ['2022/12/28', 5.46, 5.37, 5.62, 5.33],
    ['2022/12/29', 5.41, 5.35, 5.51, 5.3],
    ['2022/12/30', 5.22, 5.21, 5.5, 5.15],
    ['2023/01/03', 5.24, 5.57, 5.62, 5.18],
    ['2023/01/04', 5.62, 5.46, 5.64, 5.46],
    ['2023/01/05', 5.42, 5.42, 5.51, 5.33],
    ['2023/01/06', 5.53, 5.34, 5.53, 5.25],
    ['2023/01/09', 5.41, 5.52, 5.61, 5.17],
    ['2023/01/10', 5.4, 5.77, 5.9, 5.4],
    ['2023/01/11', 5.72, 5.92, 6.03, 5.7],
    ['2023/01/12', 5.99, 5.9, 5.99, 5.7],
    ['2023/01/13', 5.79, 6.35, 6.49, 5.71],
    ['2023/01/17', 6.32, 6.42, 6.45, 6.0],
    ['2023/01/18', 6.49, 6.43, 6.94, 6.18],
    ['2023/01/19', 6.4, 6.34, 6.92, 6.28],
    ['2023/01/20', 6.4, 6.33, 6.4, 6.28],
    ['2023/01/23', 6.39, 6.33, 6.51, 6.32],
    ['2023/01/24', 6.34, 6.14, 6.68, 6.03],
    ['2023/01/25', 6.15, 6.25, 6.26, 6.0],
    ['2023/01/26', 6.4, 6.33, 6.5, 6.1],
    ['2023/01/27', 6.34, 6.44, 6.5, 6.34],
    ['2023/01/30', 6.47, 6.34, 6.51, 6.05],
    ['2023/01/31', 6.43, 6.63, 6.67, 6.32],
    ['2023/02/01', 6.66, 6.84, 6.97, 6.56],
    ['2023/02/02', 6.9, 7.0, 7.13, 6.84],
    ['2023/02/03', 6.97, 6.96, 7.11, 6.81],
    ['2023/02/06', 6.98, 6.91, 7.07, 6.8],
    ['2023/02/07', 6.98, 6.93, 7.0, 6.87],
    ['2023/02/08', 6.84, 6.8, 6.93, 6.75],
    ['2023/02/09', 6.8, 6.8, 6.99, 6.8],
    ['2023/02/10', 6.8, 6.88, 7.1, 6.8],
    ['2023/02/13', 6.89, 6.95, 7.06, 6.77],
    ['2023/02/14', 6.83, 6.86, 6.94, 6.83],
    ['2023/02/15', 6.84, 6.92, 7.08, 6.74],
    ['2023/02/16', 6.86, 6.77, 6.93, 6.7],
    ['2023/02/17', 6.82, 6.93, 6.95, 6.7],
    ['2023/02/21', 6.88, 6.66, 6.88, 6.59],
    ['2023/02/22', 6.71, 6.53, 6.71, 6.21],
    ['2023/02/23', 6.6, 6.52, 6.6, 6.44],
    ['2023/02/24', 6.5, 6.47, 6.5, 6.25],
    ['2023/02/27', 6.49, 6.46, 6.57, 6.4],
    ['2023/02/28', 6.42, 6.53, 6.63, 6.39],
    ['2023/03/01', 6.56, 6.58, 6.91, 6.56],
    ['2023/03/02', 6.58, 6.6, 6.75, 6.45],
    ['2023/03/03', 6.72, 6.73, 6.8, 6.61],
    ['2023/03/06', 6.79, 6.74, 6.8, 6.63],
    ['2023/03/07', 6.8, 6.8, 7.04, 6.72],
    ['2023/03/08', 6.79, 6.81, 6.9, 6.68],
    ['2023/03/09', 6.81, 6.78, 6.9, 6.76],
    ['2023/03/10', 6.81, 6.5, 6.83, 6.37],
    ['2023/03/13', 6.44, 6.28, 6.73, 6.07],
    ['2023/03/14', 6.36, 6.54, 6.72, 6.3],
    ['2023/03/15', 6.54, 6.52, 6.59, 6.35],
    ['2023/03/16', 6.41, 6.65, 6.68, 6.35],
    ['2023/03/17', 6.59, 6.48, 6.62, 6.4],
    ['2023/03/20', 6.42, 5.94, 6.42, 5.8],
    ['2023/03/21', 5.94, 6.33, 6.45, 5.94],
    ['2023/03/22', 6.27, 6.2, 6.27, 6.1],
    ['2023/03/23', 6.21, 6.16, 6.51, 5.95],
    ['2023/03/24', 6.0, 6.14, 6.24, 5.95],
    ['2023/03/27', 6.25, 6.38, 6.42, 6.21],
    ['2023/03/28', 6.3, 6.08, 6.38, 6.08],
    ['2023/03/29', 6.12, 6.15, 6.19, 6.01],
    ['2023/03/30', 6.08, 6.02, 6.08, 5.93],
    ['2023/03/31', 5.94, 6.06, 6.12, 5.87],
    ['2023/04/03', 6.06, 6.5, 6.75, 6.06],
    ['2023/04/04', 6.57, 6.29, 6.86, 6.13],
    ['2023/04/05', 6.31, 6.2, 6.39, 6.15],
    ['2023/04/06', 6.11, 6.1, 6.32, 6.09],
    ['2023/04/10', 6.12, 6.04, 6.12, 6.03],
    ['2023/04/11', 6.1, 6.2, 6.35, 6.1],
    ['2023/04/12', 6.24, 6.04, 6.3, 6.04],
    ['2023/04/13', 6.1, 6.14, 6.17, 6.06],
    ['2023/04/14', 6.19, 6.2, 6.34, 6.12],
    ['2023/04/17', 6.13, 6.06, 6.22, 6.01],
    ['2023/04/18', 6.15, 6.15, 6.27, 6.1],
    ['2023/04/19', 6.08, 6.17, 6.17, 6.08],
    ['2023/04/20', 6.2, 6.36, 6.74, 6.2],
    ['2023/04/21', 6.31, 6.41, 6.59, 6.29],
    ['2023/04/24', 6.4, 6.21, 6.4, 6.18],
    ['2023/04/25', 6.27, 6.31, 6.41, 6.27],
    ['2023/04/26', 6.64, 6.38, 6.64, 6.23],
    ['2023/04/27', 6.45, 6.42, 6.55, 6.29],
    ['2023/04/28', 6.41, 6.6, 6.69, 6.41],
    ['2023/05/01', 6.49, 6.68, 6.83, 6.49],
    ['2023/05/02', 6.7, 6.14, 6.73, 6.1],
    ['2023/05/03', 6.14, 5.92, 6.21, 5.85],
    ['2023/05/04', 5.85, 5.83, 6.18, 5.74],
    ['2023/05/05', 5.91, 5.97, 6.1, 5.84],
    ['2023/05/08', 6.04, 6.05, 6.15, 5.85],
    ['2023/05/09', 6.05, 6.24, 6.37, 6.05],
    ['2023/05/10', 6.35, 6.23, 6.35, 6.11],
    ['2023/05/11', 6.24, 6.27, 6.33, 6.15],
    ['2023/05/12', 6.45, 6.4, 6.8, 6.21],
    ['2023/05/15', 6.33, 6.56, 6.64, 6.33],
    ['2023/05/16', 6.56, 6.64, 6.84, 6.43],
    ['2023/05/17', 6.74, 6.9, 6.93, 6.58],
    ['2023/05/18', 6.96, 7.03, 7.05, 6.93],
    ['2023/05/19', 7.12, 7.02, 7.14, 6.95],
    ['2023/05/22', 7.08, 7.09, 7.36, 7.03],
    ['2023/05/23', 6.9, 7.33, 7.43, 6.68],
    ['2023/05/24', 7.31, 6.88, 7.35, 6.88],
    ['2023/05/25', 6.95, 7.19, 7.41, 6.94],
    ['2023/05/26', 7.17, 7.36, 7.55, 7.17],
    ['2023/05/30', 7.36, 7.38, 7.53, 7.28],
    ['2023/05/31', 7.3, 7.2, 7.33, 7.12],
    ['2023/06/01', 6.84, 7.51, 7.61, 6.84],
    ['2023/06/02', 7.64, 7.26, 7.64, 7.12],
    ['2023/06/05', 7.16, 7.15, 7.3, 7.03],
    ['2023/06/06', 7.21, 7.14, 7.25, 6.96],
    ['2023/06/07', 7.23, 7.5, 7.6, 7.23],
    ['2023/06/08', 7.56, 7.61, 7.9, 7.49],
    ['2023/06/09', 7.7, 7.88, 8.06, 7.7],
    ['2023/06/12', 8.06, 8.39, 8.45, 7.96],
    ['2023/06/13', 7.8, 7.57, 7.85, 7.51],
    ['2023/06/14', 7.55, 7.55, 7.79, 7.55],
    ['2023/06/15', 7.82, 7.75, 7.93, 7.61],
    ['2023/06/16', 7.85, 7.95, 8.09, 7.76],
    ['2023/06/20', 8.1, 8.43, 8.46, 7.98],
    ['2023/06/21', 8.42, 8.58, 8.6, 8.3],
    ['2023/06/22', 8.65, 8.24, 8.65, 8.16],
    ['2023/06/23', 8.29, 8.27, 8.48, 8.09],
    ['2023/06/26', 8.23, 8.54, 8.71, 8.23],
    ['2023/06/27', 8.61, 8.53, 8.7, 8.38],
    ['2023/06/28', 8.52, 8.8, 8.84, 8.52],
    ['2023/06/29', 8.83, 8.81, 8.83, 8.76],
    ['2023/06/30', 8.85, 9.34, 9.53, 8.85],
    ['2023/07/03', 9.38, 9.94, 10.15, 9.38],
    ['2023/07/05', 10.0, 9.66, 10.06, 9.61],
    ['2023/07/06', 9.76, 9.67, 10.1, 9.6],
    ['2023/07/07', 9.64, 9.7, 9.89, 9.6],
    ['2023/07/10', 9.75, 10.17, 10.24, 9.75],
    ['2023/07/11', 10.25, 10.43, 10.57, 10.2],
    ['2023/07/12', 10.56, 10.48, 10.75, 10.41],
    ['2023/07/13', 10.5, 10.5, 10.52, 10.41],
    ['2023/07/14', 10.5, 10.38, 10.5, 10.25],
    ['2023/07/17', 10.35, 10.25, 10.37, 10.16],
    ['2023/07/18', 10.23, 10.51, 10.55, 10.23],
    ['2023/07/19', 10.5, 10.44, 10.65, 10.12],
    ['2023/07/20', 10.38, 9.68, 10.5, 9.6],
    ['2023/07/21', 9.76, 9.69, 9.84, 9.6],
    ['2023/07/24', 9.64, 9.64, 9.78, 9.53],
    ['2023/07/25', 9.64, 9.74, 9.88, 9.39],
    ['2023/07/26', 9.6, 9.56, 9.71, 9.45],
    ['2023/07/27', 9.58, 9.52, 9.74, 9.45],
    ['2023/07/28', 9.61, 9.75, 9.8, 9.61],
    ['2023/07/31', 9.75, 9.87, 10.1, 9.67],
    ['2023/08/01', 10.09, 10.43, 11.07, 10.0],
    ['2023/08/02', 10.59, 10.91, 11.47, 10.57],
]);
var volumes = [
    27500.0,
    42900.0,
    20600.0,
    53800.0,
    55100.0,
    33500.0,
    58000.0,
    45000.0,
    112600.0,
    40600.0,
    36500.0,
    80900.0,
    107800.0,
    52700.0,
    38700.0,
    26400.0,
    21300.0,
    20100.0,
    42600.0,
    31900.0,
    88600.0,
    45000.0,
    63200.0,
    106100.0,
    171400.0,
    76200.0,
    87200.0,
    69700.0,
    143800.0,
    125400.0,
    84000.0,
    197200.0,
    81000.0,
    286600.0,
    121200.0,
    174800.0,
    66000.0,
    59700.0,
    76500.0,
    75800.0,
    68300.0,
    32300.0,
    72000.0,
    35300.0,
    22500.0,
    29000.0,
    45600.0,
    46400.0,
    36600.0,
    63500.0,
    42500.0,
    17300.0,
    37900.0,
    22100.0,
    68800.0,
    69900.0,
    24700.0,
    72300.0,
    71400.0,
    56000.0,
    34200.0,
    98300.0,
    53900.0,
    113900.0,
    138900.0,
    37000.0,
    36600.0,
    24700.0,
    17100.0,
    32800.0,
    64000.0,
    32200.0,
    60000.0,
    84600.0,
    62700.0,
    111100.0,
    62700.0,
    40300.0,
    24300.0,
    27700.0,
    20700.0,
    51300.0,
    44400.0,
    165700.0,
    82200.0,
    75400.0,
    55200.0,
    75700.0,
    56600.0,
    40200.0,
    40600.0,
    26600.0,
    123500.0,
    33000.0,
    36700.0,
    48400.0,
    42700.0,
    21400.0,
    40200.0,
    6800.0,
    14100.0,
    29400.0,
    12100.0,
    17600.0,
    41300.0,
    34100.0,
    10800.0,
    9000.0,
    13000.0,
    89500.0,
    27000.0,
    26100.0,
    39200.0,
    29800.0,
    41300.0,
    53700.0,
    29600.0,
    23800.0,
    32200.0,
    75300.0,
    36100.0,
    37400.0,
    60100.0,
    20200.0,
    25100.0,
    54900.0,
    68200.0,
    35100.0,
    22500.0,
    50600.0,
    49400.0,
    22100.0,
    13400.0,
    14300.0,
    13000.0,
    15800.0,
    11200.0,
    18600.0,
    23700.0,
    47500.0,
    12000.0,
    21900.0,
    15100.0,
    13000.0,
    20000.0,
    10700.0,
    20200.0,
    71400.0,
    24900.0,
    48500.0,
    18300.0,
    32100.0,
    35300.0,
    21600.0,
    22400.0,
    26600.0,
    47200.0,
    116000.0,
    35700.0,
    25800.0,
    21300.0,
    13200.0,
    27000.0,
    12400.0,
    21900.0,
    13800.0,
    32700.0,
    53900.0,
    51000.0,
    13600.0,
    19900.0,
    11300.0,
    9900.0,
    7500.0,
    6800.0,
    13900.0,
    20300.0,
    12300.0,
    6300.0,
    53400.0,
    14900.0,
    26500.0,
    27600.0,
    14400.0,
    13200.0,
    21400.0,
    27700.0,
    55800.0,
    103500.0,
    85300.0,
    44800.0,
    147100.0,
    34100.0,
    26900.0,
    9800.0,
    19200.0,
    26400.0,
    46400.0,
    39800.0,
    27500.0,
    28900.0,
    58600.0,
    45000.0,
    41800.0,
    35900.0,
    59800.0,
    41800.0,
    40400.0,
    64300.0,
    72900.0,
    49100.0,
    73400.0,
    75300.0,
    86200.0,
    59400.0,
    86300.0,
    974100.0,
    287600.0,
    176700.0,
    228600.0,
    313600.0,
    193100.0,
    177400.0,
    534300.0,
    227400.0,
    213500.0,
    231900.0,
    157900.0,
    230600.0,
    291100.0,
    298300.0,
    303900.0,
    295400.0,
    204400.0,
    251700.0,
    227900.0,
    188600.0,
    106000.0,
    261200.0,
    266700.0,
    219100.0,
    244400.0,
    152200.0,
    122200.0,
    85000.0,
    112300.0,
    96600.0,
    97700.0,
    122900.0,
    375700.0,
    313700.0,
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
        text: "LSEA",
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