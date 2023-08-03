/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_NU");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/03', 4.14, 4.45, 4.45, 4.07],
    ['2022/08/04', 4.42, 4.67, 4.7, 4.33],
    ['2022/08/05', 4.49, 4.49, 4.65, 4.32],
    ['2022/08/08', 4.62, 4.75, 4.96, 4.53],
    ['2022/08/09', 4.55, 4.25, 4.55, 4.15],
    ['2022/08/10', 4.51, 4.42, 4.54, 4.36],
    ['2022/08/11', 4.5, 4.08, 4.58, 4.07],
    ['2022/08/12', 4.15, 4.25, 4.27, 4.03],
    ['2022/08/15', 4.24, 4.68, 4.82, 4.14],
    ['2022/08/16', 5.18, 5.52, 5.88, 5.01],
    ['2022/08/17', 5.35, 5.08, 5.44, 5.0],
    ['2022/08/18', 4.88, 5.04, 5.09, 4.67],
    ['2022/08/19', 4.9, 4.65, 5.04, 4.59],
    ['2022/08/22', 4.54, 4.53, 4.62, 4.43],
    ['2022/08/23', 4.5, 4.56, 4.75, 4.4],
    ['2022/08/24', 4.54, 4.95, 5.18, 4.5],
    ['2022/08/25', 4.9, 4.99, 5.06, 4.84],
    ['2022/08/26', 5.04, 4.94, 5.08, 4.84],
    ['2022/08/29', 4.84, 4.92, 5.09, 4.81],
    ['2022/08/30', 4.97, 4.89, 5.04, 4.81],
    ['2022/08/31', 4.86, 4.9, 4.97, 4.81],
    ['2022/09/01', 4.88, 4.9, 4.96, 4.62],
    ['2022/09/02', 4.84, 4.94, 5.08, 4.83],
    ['2022/09/06', 5.0, 4.72, 5.01, 4.71],
    ['2022/09/07', 4.73, 4.98, 5.01, 4.68],
    ['2022/09/08', 4.94, 5.06, 5.12, 4.86],
    ['2022/09/09', 5.15, 5.39, 5.4, 5.08],
    ['2022/09/12', 5.49, 5.51, 5.59, 5.32],
    ['2022/09/13', 5.16, 5.31, 5.45, 5.06],
    ['2022/09/14', 5.25, 5.42, 5.44, 5.19],
    ['2022/09/15', 5.38, 5.51, 5.81, 5.34],
    ['2022/09/16', 5.31, 5.28, 5.33, 5.0],
    ['2022/09/19', 5.1, 5.33, 5.38, 4.97],
    ['2022/09/20', 5.24, 5.22, 5.32, 5.14],
    ['2022/09/21', 5.24, 5.24, 5.42, 5.08],
    ['2022/09/22', 5.22, 4.98, 5.33, 4.86],
    ['2022/09/23', 4.84, 4.72, 4.89, 4.6],
    ['2022/09/26', 4.57, 4.51, 4.82, 4.5],
    ['2022/09/27', 4.62, 4.56, 4.87, 4.44],
    ['2022/09/28', 4.5, 4.81, 4.86, 4.49],
    ['2022/09/29', 4.68, 4.44, 4.68, 4.39],
    ['2022/09/30', 4.42, 4.4, 4.63, 4.32],
    ['2022/10/03', 4.58, 4.73, 4.81, 4.51],
    ['2022/10/04', 4.88, 4.92, 4.97, 4.61],
    ['2022/10/05', 4.8, 5.01, 5.11, 4.79],
    ['2022/10/06', 4.99, 4.69, 5.1, 4.69],
    ['2022/10/07', 4.67, 4.39, 4.68, 4.34],
    ['2022/10/10', 4.39, 4.29, 4.39, 4.16],
    ['2022/10/11', 4.21, 4.1, 4.22, 4.03],
    ['2022/10/12', 4.09, 4.11, 4.22, 3.95],
    ['2022/10/13', 3.89, 4.17, 4.24, 3.79],
    ['2022/10/14', 4.2, 4.12, 4.38, 4.03],
    ['2022/10/17', 4.24, 4.39, 4.45, 4.15],
    ['2022/10/18', 4.55, 4.4, 4.59, 4.3],
    ['2022/10/19', 4.23, 4.36, 4.45, 4.19],
    ['2022/10/20', 4.33, 4.38, 4.49, 4.29],
    ['2022/10/21', 4.34, 4.53, 4.55, 4.15],
    ['2022/10/24', 4.46, 4.3, 4.47, 4.15],
    ['2022/10/25', 4.3, 4.59, 4.68, 4.3],
    ['2022/10/26', 4.43, 4.39, 4.7, 4.34],
    ['2022/10/27', 4.45, 4.44, 4.49, 4.33],
    ['2022/10/28', 4.42, 4.59, 4.62, 4.41],
    ['2022/10/31', 4.53, 5.0, 5.1, 4.51],
    ['2022/11/01', 5.09, 5.09, 5.24, 4.99],
    ['2022/11/02', 5.08, 4.79, 5.13, 4.76],
    ['2022/11/03', 4.78, 4.93, 5.08, 4.71],
    ['2022/11/04', 5.09, 4.87, 5.1, 4.78],
    ['2022/11/07', 4.9, 4.81, 4.94, 4.75],
    ['2022/11/08', 4.83, 5.11, 5.28, 4.83],
    ['2022/11/09', 5.01, 4.69, 5.03, 4.66],
    ['2022/11/10', 4.91, 4.55, 4.97, 4.51],
    ['2022/11/11', 4.56, 4.44, 4.72, 4.31],
    ['2022/11/14', 4.55, 4.35, 4.57, 4.28],
    ['2022/11/15', 4.88, 4.91, 5.25, 4.84],
    ['2022/11/16', 4.86, 4.78, 4.95, 4.67],
    ['2022/11/17', 4.56, 4.38, 4.57, 4.3],
    ['2022/11/18', 4.49, 4.32, 4.5, 4.25],
    ['2022/11/21', 4.35, 4.31, 4.37, 4.21],
    ['2022/11/22', 4.29, 4.2, 4.3, 4.16],
    ['2022/11/23', 4.19, 4.44, 4.46, 4.13],
    ['2022/11/25', 4.49, 4.45, 4.51, 4.38],
    ['2022/11/28', 4.4, 4.22, 4.5, 4.2],
    ['2022/11/29', 4.26, 4.26, 4.3, 4.21],
    ['2022/11/30', 4.18, 4.45, 4.49, 4.08],
    ['2022/12/01', 4.42, 4.36, 4.44, 4.22],
    ['2022/12/02', 4.28, 4.46, 4.49, 4.19],
    ['2022/12/05', 4.24, 4.06, 4.31, 4.06],
    ['2022/12/06', 4.13, 4.06, 4.14, 4.0],
    ['2022/12/07', 4.05, 3.97, 4.07, 3.89],
    ['2022/12/08', 4.05, 4.07, 4.18, 4.04],
    ['2022/12/09', 4.03, 3.93, 4.05, 3.91],
    ['2022/12/12', 3.91, 4.02, 4.05, 3.83],
    ['2022/12/13', 4.2, 3.88, 4.21, 3.87],
    ['2022/12/14', 3.9, 3.82, 3.91, 3.76],
    ['2022/12/15', 3.8, 3.74, 3.88, 3.72],
    ['2022/12/16', 3.76, 3.9, 3.92, 3.76],
    ['2022/12/19', 3.88, 3.91, 3.94, 3.81],
    ['2022/12/20', 3.88, 3.83, 3.95, 3.83],
    ['2022/12/21', 3.88, 3.91, 3.92, 3.76],
    ['2022/12/22', 3.87, 3.86, 3.9, 3.72],
    ['2022/12/23', 3.86, 3.89, 3.91, 3.78],
    ['2022/12/27', 3.84, 3.82, 3.86, 3.76],
    ['2022/12/28', 3.84, 3.91, 3.93, 3.81],
    ['2022/12/29', 3.95, 4.06, 4.06, 3.87],
    ['2022/12/30', 4.0, 4.07, 4.17, 4.0],
    ['2023/01/03', 3.91, 3.56, 4.03, 3.55],
    ['2023/01/04', 3.61, 3.52, 3.66, 3.5],
    ['2023/01/05', 3.52, 3.48, 3.53, 3.43],
    ['2023/01/06', 3.54, 3.56, 3.61, 3.39],
    ['2023/01/09', 3.57, 3.66, 3.81, 3.54],
    ['2023/01/10', 3.68, 3.66, 3.73, 3.54],
    ['2023/01/11', 3.67, 3.72, 3.75, 3.56],
    ['2023/01/12', 3.73, 3.66, 3.73, 3.58],
    ['2023/01/13', 3.65, 3.68, 3.71, 3.56],
    ['2023/01/17', 3.65, 3.67, 3.75, 3.62],
    ['2023/01/18', 3.71, 3.64, 3.77, 3.56],
    ['2023/01/19', 3.61, 3.62, 3.67, 3.57],
    ['2023/01/20', 3.67, 3.81, 3.86, 3.62],
    ['2023/01/23', 3.81, 3.92, 3.99, 3.8],
    ['2023/01/24', 3.92, 4.03, 4.04, 3.87],
    ['2023/01/25', 3.99, 4.12, 4.15, 3.89],
    ['2023/01/26', 4.26, 4.23, 4.37, 4.2],
    ['2023/01/27', 4.2, 4.37, 4.42, 4.18],
    ['2023/01/30', 4.33, 4.4, 4.43, 4.26],
    ['2023/01/31', 4.44, 4.65, 4.72, 4.41],
    ['2023/02/01', 4.65, 4.77, 4.82, 4.53],
    ['2023/02/02', 4.84, 4.92, 5.01, 4.83],
    ['2023/02/03', 4.8, 4.9, 5.01, 4.72],
    ['2023/02/06', 4.83, 4.9, 4.95, 4.78],
    ['2023/02/07', 4.91, 4.91, 4.94, 4.78],
    ['2023/02/08', 4.91, 5.01, 5.08, 4.84],
    ['2023/02/09', 5.07, 4.83, 5.11, 4.8],
    ['2023/02/10', 4.75, 4.74, 4.85, 4.66],
    ['2023/02/13', 4.77, 4.87, 4.99, 4.73],
    ['2023/02/14', 4.86, 5.0, 5.09, 4.84],
    ['2023/02/15', 5.05, 5.24, 5.44, 5.0],
    ['2023/02/16', 5.04, 5.34, 5.53, 4.88],
    ['2023/02/17', 5.08, 4.99, 5.21, 4.91],
    ['2023/02/21', 4.96, 4.76, 5.02, 4.73],
    ['2023/02/22', 4.82, 4.83, 4.89, 4.74],
    ['2023/02/23', 4.87, 4.89, 4.93, 4.8],
    ['2023/02/24', 4.82, 4.94, 4.96, 4.78],
    ['2023/02/27', 4.98, 4.97, 5.1, 4.93],
    ['2023/02/28', 4.97, 5.04, 5.11, 4.95],
    ['2023/03/01', 4.99, 4.86, 4.99, 4.61],
    ['2023/03/02', 4.78, 4.67, 4.88, 4.65],
    ['2023/03/03', 4.67, 4.68, 4.75, 4.56],
    ['2023/03/06', 4.69, 4.95, 5.0, 4.68],
    ['2023/03/07', 4.89, 4.83, 4.92, 4.69],
    ['2023/03/08', 4.85, 4.99, 5.1, 4.85],
    ['2023/03/09', 4.93, 4.74, 4.97, 4.69],
    ['2023/03/10', 4.72, 4.49, 4.74, 4.45],
    ['2023/03/13', 4.24, 4.52, 4.7, 4.14],
    ['2023/03/14', 4.69, 4.48, 4.73, 4.37],
    ['2023/03/15', 4.3, 4.44, 4.49, 4.29],
    ['2023/03/16', 4.42, 4.61, 4.63, 4.39],
    ['2023/03/17', 4.59, 4.69, 4.71, 4.54],
    ['2023/03/20', 4.67, 4.43, 4.68, 4.41],
    ['2023/03/21', 4.47, 4.43, 4.52, 4.42],
    ['2023/03/22', 4.48, 4.32, 4.55, 4.32],
    ['2023/03/23', 4.4, 4.26, 4.49, 4.24],
    ['2023/03/24', 4.2, 4.17, 4.26, 4.13],
    ['2023/03/27', 4.24, 4.4, 4.46, 4.21],
    ['2023/03/28', 4.37, 4.36, 4.45, 4.29],
    ['2023/03/29', 4.42, 4.58, 4.59, 4.37],
    ['2023/03/30', 4.69, 4.81, 4.83, 4.67],
    ['2023/03/31', 4.84, 4.76, 4.93, 4.73],
    ['2023/04/03', 4.64, 4.52, 4.7, 4.34],
    ['2023/04/04', 4.54, 4.55, 4.6, 4.49],
    ['2023/04/05', 4.52, 4.48, 4.59, 4.4],
    ['2023/04/06', 4.43, 4.48, 4.51, 4.38],
    ['2023/04/10', 4.45, 4.52, 4.54, 4.4],
    ['2023/04/11', 4.54, 4.57, 4.65, 4.52],
    ['2023/04/12', 4.6, 4.42, 4.62, 4.39],
    ['2023/04/13', 4.42, 4.67, 4.78, 4.42],
    ['2023/04/14', 4.72, 4.66, 4.77, 4.59],
    ['2023/04/17', 4.63, 4.55, 4.71, 4.51],
    ['2023/04/18', 4.61, 4.86, 4.9, 4.6],
    ['2023/04/19', 4.8, 4.86, 4.88, 4.77],
    ['2023/04/20', 4.79, 4.89, 4.89, 4.69],
    ['2023/04/21', 4.85, 4.99, 5.02, 4.84],
    ['2023/04/24', 4.94, 4.92, 5.01, 4.85],
    ['2023/04/25', 4.88, 4.92, 4.99, 4.85],
    ['2023/04/26', 4.95, 4.94, 5.03, 4.91],
    ['2023/04/27', 4.98, 5.05, 5.14, 4.94],
    ['2023/04/28', 5.0, 5.16, 5.2, 4.96],
    ['2023/05/01', 5.19, 5.36, 5.39, 5.15],
    ['2023/05/02', 5.35, 5.19, 5.38, 5.16],
    ['2023/05/03', 5.18, 5.18, 5.29, 5.14],
    ['2023/05/04', 5.19, 5.24, 5.31, 5.18],
    ['2023/05/05', 5.33, 5.46, 5.59, 5.3],
    ['2023/05/08', 5.49, 5.92, 5.98, 5.48],
    ['2023/05/09', 5.85, 5.82, 5.88, 5.73],
    ['2023/05/10', 5.86, 5.91, 5.94, 5.8],
    ['2023/05/11', 5.94, 5.91, 5.95, 5.84],
    ['2023/05/12', 5.91, 5.81, 5.99, 5.79],
    ['2023/05/15', 5.85, 6.09, 6.15, 5.79],
    ['2023/05/16', 6.51, 6.1, 6.92, 6.06],
    ['2023/05/17', 6.18, 6.18, 6.22, 5.8],
    ['2023/05/18', 6.03, 6.39, 6.47, 6.02],
    ['2023/05/19', 6.44, 6.52, 6.59, 6.36],
    ['2023/05/22', 6.46, 6.64, 6.74, 6.45],
    ['2023/05/23', 6.64, 6.84, 7.09, 6.62],
    ['2023/05/24', 6.76, 6.81, 6.88, 6.65],
    ['2023/05/25', 6.81, 6.91, 7.07, 6.78],
    ['2023/05/26', 6.92, 6.79, 6.99, 6.72],
    ['2023/05/30', 6.83, 6.75, 6.93, 6.72],
    ['2023/05/31', 6.65, 6.74, 6.8, 6.6],
    ['2023/06/01', 6.65, 6.83, 6.87, 6.61],
    ['2023/06/02', 6.85, 6.97, 7.03, 6.85],
    ['2023/06/05', 6.95, 6.92, 6.98, 6.77],
    ['2023/06/06', 6.94, 7.13, 7.15, 6.91],
    ['2023/06/07', 7.14, 7.39, 7.55, 7.1],
    ['2023/06/08', 7.35, 7.27, 7.45, 7.26],
    ['2023/06/09', 7.3, 7.49, 7.56, 7.23],
    ['2023/06/12', 7.52, 7.62, 7.68, 7.49],
    ['2023/06/13', 7.66, 7.54, 7.67, 7.36],
    ['2023/06/14', 7.53, 7.35, 7.54, 7.2],
    ['2023/06/15', 7.27, 7.41, 7.49, 7.24],
    ['2023/06/16', 7.44, 7.54, 7.58, 7.37],
    ['2023/06/20', 7.55, 7.68, 7.74, 7.54],
    ['2023/06/21', 7.71, 7.71, 7.76, 7.5],
    ['2023/06/22', 7.64, 7.49, 7.72, 7.45],
    ['2023/06/23', 7.4, 7.56, 7.7, 7.36],
    ['2023/06/26', 7.52, 7.31, 7.58, 7.22],
    ['2023/06/27', 7.39, 7.65, 7.7, 7.33],
    ['2023/06/28', 7.63, 7.8, 7.99, 7.58],
    ['2023/06/29', 7.88, 7.79, 7.9, 7.68],
    ['2023/06/30', 7.85, 7.89, 8.06, 7.8],
    ['2023/07/03', 7.93, 7.96, 8.01, 7.82],
    ['2023/07/05', 7.92, 7.88, 7.97, 7.76],
    ['2023/07/06', 7.79, 7.67, 7.86, 7.61],
    ['2023/07/07', 7.71, 7.78, 7.87, 7.65],
    ['2023/07/10', 7.75, 7.82, 7.87, 7.71],
    ['2023/07/11', 7.82, 7.81, 7.84, 7.66],
    ['2023/07/12', 7.88, 7.9, 7.97, 7.83],
    ['2023/07/13', 7.97, 8.18, 8.29, 7.93],
    ['2023/07/14', 8.15, 7.72, 8.15, 7.68],
    ['2023/07/17', 7.75, 7.87, 7.92, 7.64],
    ['2023/07/18', 7.79, 7.64, 7.8, 7.54],
    ['2023/07/19', 7.63, 7.62, 7.7, 7.61],
    ['2023/07/20', 7.57, 7.7, 7.78, 7.54],
    ['2023/07/21', 7.72, 7.92, 7.97, 7.69],
    ['2023/07/24', 7.95, 7.86, 7.97, 7.72],
    ['2023/07/25', 7.93, 7.84, 8.01, 7.8],
    ['2023/07/26', 7.75, 7.85, 7.94, 7.71],
    ['2023/07/27', 7.94, 7.78, 7.94, 7.77],
    ['2023/07/28', 7.89, 7.9, 8.01, 7.86],
    ['2023/07/31', 7.93, 7.96, 8.11, 7.89],
    ['2023/08/01', 7.83, 7.91, 7.99, 7.81],
    ['2023/08/02', 7.87, 7.81, 7.93, 7.65],
]);
var volumes = [
    19715900.0,
    20781100.0,
    16554500.0,
    21243400.0,
    35438300.0,
    23649200.0,
    28825900.0,
    28783000.0,
    60698200.0,
    113746800.0,
    60247100.0,
    61682600.0,
    29308300.0,
    21745200.0,
    35232400.0,
    52965200.0,
    39194100.0,
    29103500.0,
    24504300.0,
    23266300.0,
    16511700.0,
    22356700.0,
    27505600.0,
    21858100.0,
    14102200.0,
    18881800.0,
    27936900.0,
    24600200.0,
    22059000.0,
    18597900.0,
    31673800.0,
    41237400.0,
    26914400.0,
    17222700.0,
    18935800.0,
    27060600.0,
    31548600.0,
    26628400.0,
    25833300.0,
    28529000.0,
    24178100.0,
    29916500.0,
    25010600.0,
    60999200.0,
    30924700.0,
    24763600.0,
    31445100.0,
    20906600.0,
    37428600.0,
    21452400.0,
    44842800.0,
    33544700.0,
    16911800.0,
    27803300.0,
    28161600.0,
    19256800.0,
    25031200.0,
    24895900.0,
    27128000.0,
    27325500.0,
    20389000.0,
    23049400.0,
    62442000.0,
    35945300.0,
    22456600.0,
    30913500.0,
    25595300.0,
    25132600.0,
    31589100.0,
    44424000.0,
    59396600.0,
    41331000.0,
    53556800.0,
    70236600.0,
    32060500.0,
    54379800.0,
    29307700.0,
    31508000.0,
    22074100.0,
    24136100.0,
    13350300.0,
    21542100.0,
    16112200.0,
    39136800.0,
    23172700.0,
    35512200.0,
    48867500.0,
    18694400.0,
    14257100.0,
    23856200.0,
    18387600.0,
    25345800.0,
    22265800.0,
    21050600.0,
    20598200.0,
    25477100.0,
    20723100.0,
    17903000.0,
    16211800.0,
    16324900.0,
    10567700.0,
    13584400.0,
    14837700.0,
    11114900.0,
    12286600.0,
    40845700.0,
    20048100.0,
    22673900.0,
    19557500.0,
    20586900.0,
    34832200.0,
    28448800.0,
    26422800.0,
    15069800.0,
    29421400.0,
    44084400.0,
    21297200.0,
    48985500.0,
    26886800.0,
    21593900.0,
    20224200.0,
    22825300.0,
    26086800.0,
    18106600.0,
    33246700.0,
    34936800.0,
    37026700.0,
    35737900.0,
    23140400.0,
    25485700.0,
    28124400.0,
    27908800.0,
    21210100.0,
    20221800.0,
    53484500.0,
    91319300.0,
    54488700.0,
    40615200.0,
    20886200.0,
    26304600.0,
    18698700.0,
    25022400.0,
    25262900.0,
    20870000.0,
    35312400.0,
    37183100.0,
    34504500.0,
    22119800.0,
    23826700.0,
    26653100.0,
    23917800.0,
    32191000.0,
    27930000.0,
    27009600.0,
    20627000.0,
    17481000.0,
    32831700.0,
    22688000.0,
    13572200.0,
    16519500.0,
    16745200.0,
    21416700.0,
    14899900.0,
    11159000.0,
    17736600.0,
    19305800.0,
    17266200.0,
    24109100.0,
    12768200.0,
    13568800.0,
    8139300.0,
    10005500.0,
    14009800.0,
    20583800.0,
    23693200.0,
    14660700.0,
    14001100.0,
    28916200.0,
    15154900.0,
    14581400.0,
    18448600.0,
    14002200.0,
    14642900.0,
    10409500.0,
    20525100.0,
    25030400.0,
    30118000.0,
    22030200.0,
    16845000.0,
    14701900.0,
    31146400.0,
    46879000.0,
    22077500.0,
    22155500.0,
    14822100.0,
    18761000.0,
    41210700.0,
    103268000.0,
    45323100.0,
    57025900.0,
    37582900.0,
    35871700.0,
    57400600.0,
    40398000.0,
    28642400.0,
    23242100.0,
    17458800.0,
    20538000.0,
    28766200.0,
    25543600.0,
    17560000.0,
    20442400.0,
    36498500.0,
    21280100.0,
    35291300.0,
    16696600.0,
    21665900.0,
    26072200.0,
    22543600.0,
    22102100.0,
    31731800.0,
    27025500.0,
    27952400.0,
    166404700.0,
    21200600.0,
    21089500.0,
    23838400.0,
    13953500.0,
    19386200.0,
    11954200.0,
    18233700.0,
    18086200.0,
    16975000.0,
    8913500.0,
    11762500.0,
    15591700.0,
    34499700.0,
    34297000.0,
    26927400.0,
    20335900.0,
    19830300.0,
    15315800.0,
    20037700.0,
    19623300.0,
    19900400.0,
    22178600.0,
    26929600.0,
    20596900.0,
    20932500.0,
    10979600.0,
    15942600.0,
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
        text: "NU",
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