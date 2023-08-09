/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_DOLE");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/10', 9.26, 9.38, 9.42, 9.17],
    ['2022/08/11', 9.47, 9.34, 9.57, 9.31],
    ['2022/08/12', 9.4, 9.3, 9.45, 9.29],
    ['2022/08/15', 9.3, 9.32, 9.38, 9.22],
    ['2022/08/16', 9.36, 9.29, 9.37, 9.14],
    ['2022/08/17', 9.28, 9.1, 9.28, 9.06],
    ['2022/08/18', 9.11, 9.18, 9.22, 9.02],
    ['2022/08/19', 9.12, 9.1, 9.16, 9.04],
    ['2022/08/22', 9.05, 8.99, 9.09, 8.87],
    ['2022/08/23', 9.0, 8.84, 9.03, 8.62],
    ['2022/08/24', 8.8, 8.64, 8.85, 8.51],
    ['2022/08/25', 8.7, 8.89, 9.0, 8.68],
    ['2022/08/26', 8.94, 8.9, 9.03, 8.81],
    ['2022/08/29', 9.0, 9.1, 9.29, 8.94],
    ['2022/08/30', 9.48, 9.22, 9.52, 9.05],
    ['2022/08/31', 9.25, 9.05, 9.27, 9.02],
    ['2022/09/01', 9.05, 9.11, 9.23, 8.87],
    ['2022/09/02', 9.17, 9.21, 9.28, 9.08],
    ['2022/09/06', 9.28, 9.14, 9.31, 9.09],
    ['2022/09/07', 9.15, 9.06, 9.23, 9.02],
    ['2022/09/08', 9.0, 9.13, 9.14, 8.91],
    ['2022/09/09', 9.16, 9.4, 9.52, 9.09],
    ['2022/09/12', 9.52, 9.5, 9.57, 9.35],
    ['2022/09/13', 9.37, 9.3, 9.39, 9.21],
    ['2022/09/14', 9.31, 9.23, 9.39, 9.15],
    ['2022/09/15', 9.07, 8.84, 9.24, 8.84],
    ['2022/09/16', 8.75, 8.5, 8.8, 8.45],
    ['2022/09/19', 8.44, 8.45, 8.53, 8.33],
    ['2022/09/20', 8.37, 8.36, 8.46, 8.24],
    ['2022/09/21', 8.37, 7.97, 8.39, 7.94],
    ['2022/09/22', 8.01, 7.99, 8.06, 7.87],
    ['2022/09/23', 7.9, 7.91, 7.94, 7.77],
    ['2022/09/26', 7.92, 7.56, 8.03, 7.54],
    ['2022/09/27', 7.6, 7.56, 7.78, 7.49],
    ['2022/09/28', 7.55, 7.75, 7.79, 7.47],
    ['2022/09/29', 7.66, 7.3, 7.68, 7.21],
    ['2022/09/30', 7.33, 7.3, 7.51, 7.23],
    ['2022/10/03', 7.42, 7.61, 7.68, 7.2],
    ['2022/10/04', 7.75, 7.99, 7.99, 7.73],
    ['2022/10/05', 7.91, 7.77, 7.93, 7.66],
    ['2022/10/06', 7.7, 7.68, 7.83, 7.6],
    ['2022/10/07', 7.71, 7.45, 7.71, 7.42],
    ['2022/10/10', 7.51, 7.63, 7.67, 7.44],
    ['2022/10/11', 7.62, 7.61, 7.71, 7.45],
    ['2022/10/12', 7.61, 7.68, 7.73, 7.52],
    ['2022/10/13', 7.51, 7.73, 7.77, 7.45],
    ['2022/10/14', 7.8, 7.65, 7.93, 7.63],
    ['2022/10/17', 7.77, 7.78, 7.84, 7.72],
    ['2022/10/18', 7.81, 7.81, 7.96, 7.76],
    ['2022/10/19', 7.8, 7.74, 7.83, 7.63],
    ['2022/10/20', 7.75, 7.6, 7.87, 7.55],
    ['2022/10/21', 7.5, 7.67, 7.72, 7.5],
    ['2022/10/24', 7.76, 7.68, 7.83, 7.66],
    ['2022/10/25', 7.7, 7.96, 8.03, 7.68],
    ['2022/10/26', 8.0, 7.98, 8.17, 7.94],
    ['2022/10/27', 8.01, 8.16, 8.22, 7.98],
    ['2022/10/28', 8.21, 8.51, 8.53, 8.17],
    ['2022/10/31', 8.42, 8.55, 8.63, 8.42],
    ['2022/11/01', 8.6, 8.58, 8.7, 8.53],
    ['2022/11/02', 8.58, 8.57, 8.69, 8.48],
    ['2022/11/03', 8.53, 8.54, 8.59, 8.36],
    ['2022/11/04', 8.77, 8.63, 8.77, 8.48],
    ['2022/11/07', 8.61, 8.89, 8.92, 8.61],
    ['2022/11/08', 8.93, 8.78, 9.05, 8.74],
    ['2022/11/09', 8.73, 8.49, 8.78, 8.49],
    ['2022/11/10', 8.77, 8.86, 8.99, 8.77],
    ['2022/11/11', 8.95, 9.05, 9.07, 8.84],
    ['2022/11/14', 9.02, 8.94, 9.13, 8.94],
    ['2022/11/15', 9.13, 9.2, 9.27, 9.1],
    ['2022/11/16', 9.11, 9.15, 9.32, 9.09],
    ['2022/11/17', 9.5, 9.73, 9.89, 9.29],
    ['2022/11/18', 9.75, 10.21, 10.32, 9.72],
    ['2022/11/21', 10.15, 10.28, 10.4, 9.94],
    ['2022/11/22', 10.37, 10.56, 10.61, 10.37],
    ['2022/11/23', 10.53, 10.76, 10.77, 10.46],
    ['2022/11/25', 10.71, 10.16, 10.71, 10.09],
    ['2022/11/28', 10.12, 10.19, 10.26, 10.02],
    ['2022/11/29', 10.19, 10.19, 10.43, 10.11],
    ['2022/11/30', 10.18, 10.3, 10.33, 10.1],
    ['2022/12/01', 10.38, 10.46, 10.54, 10.31],
    ['2022/12/02', 10.31, 10.42, 10.49, 10.19],
    ['2022/12/05', 10.33, 10.37, 10.46, 10.24],
    ['2022/12/06', 10.45, 10.41, 10.5, 10.3],
    ['2022/12/07', 10.41, 10.2, 10.45, 10.15],
    ['2022/12/08', 10.18, 10.41, 10.44, 10.18],
    ['2022/12/09', 10.38, 10.39, 10.49, 10.26],
    ['2022/12/12', 10.23, 10.35, 10.45, 10.03],
    ['2022/12/13', 10.7, 10.62, 10.93, 10.59],
    ['2022/12/14', 10.57, 10.32, 10.69, 10.26],
    ['2022/12/15', 10.2, 10.1, 10.35, 10.07],
    ['2022/12/16', 9.95, 9.97, 10.08, 9.89],
    ['2022/12/19', 9.97, 9.73, 9.98, 9.71],
    ['2022/12/20', 9.71, 9.66, 9.88, 9.58],
    ['2022/12/21', 9.7, 9.53, 9.71, 9.32],
    ['2022/12/22', 9.52, 9.65, 9.69, 9.42],
    ['2022/12/23', 9.65, 9.78, 9.8, 9.65],
    ['2022/12/27', 9.79, 9.84, 9.9, 9.67],
    ['2022/12/28', 9.82, 9.76, 9.91, 9.69],
    ['2022/12/29', 9.79, 9.8, 10.02, 9.76],
    ['2022/12/30', 9.7, 9.65, 9.77, 9.55],
    ['2023/01/03', 9.74, 9.61, 9.88, 9.5],
    ['2023/01/04', 9.68, 9.88, 9.9, 9.66],
    ['2023/01/05', 9.85, 9.81, 9.92, 9.75],
    ['2023/01/06', 9.75, 9.92, 10.02, 9.75],
    ['2023/01/09', 9.9, 9.92, 10.22, 9.86],
    ['2023/01/10', 9.9, 9.89, 10.0, 9.81],
    ['2023/01/11', 9.9, 9.9, 9.95, 9.8],
    ['2023/01/12', 9.92, 10.2, 10.21, 9.9],
    ['2023/01/13', 10.09, 10.32, 10.36, 10.09],
    ['2023/01/17', 10.35, 10.25, 10.45, 10.2],
    ['2023/01/18', 10.28, 10.14, 10.4, 10.13],
    ['2023/01/19', 10.04, 10.09, 10.13, 9.98],
    ['2023/01/20', 10.13, 10.11, 10.14, 10.07],
    ['2023/01/23', 10.15, 10.5, 10.53, 10.15],
    ['2023/01/24', 10.55, 10.46, 10.6, 10.38],
    ['2023/01/25', 10.35, 10.66, 10.67, 10.35],
    ['2023/01/26', 10.71, 10.48, 10.76, 10.47],
    ['2023/01/27', 10.49, 10.65, 10.73, 10.42],
    ['2023/01/30', 10.57, 10.7, 10.78, 10.5],
    ['2023/01/31', 11.32, 11.53, 11.89, 11.3],
    ['2023/02/01', 11.53, 11.73, 11.83, 11.53],
    ['2023/02/02', 11.78, 11.53, 11.89, 11.53],
    ['2023/02/03', 11.48, 11.49, 11.53, 11.37],
    ['2023/02/06', 11.4, 11.52, 11.59, 11.39],
    ['2023/02/07', 11.47, 11.54, 11.6, 11.39],
    ['2023/02/08', 11.5, 11.34, 11.53, 11.27],
    ['2023/02/09', 11.37, 11.17, 11.42, 11.16],
    ['2023/02/10', 11.11, 11.15, 11.27, 11.0],
    ['2023/02/13', 11.15, 11.2, 11.33, 11.1],
    ['2023/02/14', 11.15, 11.25, 11.3, 11.1],
    ['2023/02/15', 11.25, 11.34, 11.43, 11.23],
    ['2023/02/16', 11.32, 11.4, 11.53, 11.2],
    ['2023/02/17', 11.43, 11.45, 11.58, 11.39],
    ['2023/02/21', 11.37, 11.33, 11.44, 11.26],
    ['2023/02/22', 11.3, 11.65, 11.74, 11.29],
    ['2023/02/23', 11.72, 11.82, 11.98, 11.61],
    ['2023/02/24', 11.7, 11.86, 11.93, 11.56],
    ['2023/02/27', 11.92, 11.91, 11.98, 11.85],
    ['2023/02/28', 11.9, 11.73, 11.93, 11.66],
    ['2023/03/01', 11.7, 11.88, 12.0, 11.7],
    ['2023/03/02', 11.82, 12.08, 12.15, 11.81],
    ['2023/03/03', 12.09, 12.29, 12.31, 11.97],
    ['2023/03/06', 12.29, 12.09, 12.3, 12.0],
    ['2023/03/07', 12.1, 11.83, 12.24, 11.45],
    ['2023/03/08', 11.75, 11.89, 11.96, 11.75],
    ['2023/03/09', 11.91, 12.21, 12.34, 11.91],
    ['2023/03/10', 12.18, 11.98, 12.24, 11.81],
    ['2023/03/13', 11.76, 11.76, 12.02, 11.75],
    ['2023/03/14', 11.93, 11.72, 12.0, 11.68],
    ['2023/03/15', 11.66, 11.79, 11.8, 11.5],
    ['2023/03/16', 11.75, 11.63, 11.75, 11.55],
    ['2023/03/17', 11.51, 11.34, 11.58, 11.31],
    ['2023/03/20', 11.42, 11.34, 11.5, 11.31],
    ['2023/03/21', 11.49, 11.47, 11.63, 11.42],
    ['2023/03/22', 11.5, 11.53, 11.64, 11.5],
    ['2023/03/23', 11.56, 11.43, 11.56, 11.31],
    ['2023/03/24', 11.34, 11.38, 11.39, 11.22],
    ['2023/03/27', 11.48, 11.59, 11.72, 11.43],
    ['2023/03/28', 11.58, 11.61, 11.69, 11.56],
    ['2023/03/29', 11.66, 11.67, 11.74, 11.6],
    ['2023/03/30', 11.65, 11.72, 11.86, 11.62],
    ['2023/03/31', 11.74, 11.74, 11.83, 11.68],
    ['2023/04/03', 11.8, 12.16, 12.2, 11.8],
    ['2023/04/04', 12.15, 11.84, 12.15, 11.81],
    ['2023/04/05', 11.8, 11.81, 11.83, 11.64],
    ['2023/04/06', 11.79, 11.79, 11.88, 11.73],
    ['2023/04/10', 11.76, 11.88, 11.89, 11.71],
    ['2023/04/11', 11.89, 11.97, 12.05, 11.78],
    ['2023/04/12', 12.0, 12.0, 12.06, 11.97],
    ['2023/04/13', 12.02, 12.22, 12.31, 12.02],
    ['2023/04/14', 12.2, 12.1, 12.2, 12.09],
    ['2023/04/17', 12.11, 12.2, 12.26, 12.05],
    ['2023/04/18', 12.2, 12.25, 12.3, 12.12],
    ['2023/04/19', 12.22, 12.67, 12.69, 12.11],
    ['2023/04/20', 12.68, 12.62, 12.97, 12.5],
    ['2023/04/21', 12.68, 12.92, 12.97, 12.32],
    ['2023/04/24', 12.86, 12.64, 12.86, 12.52],
    ['2023/04/25', 12.62, 12.25, 12.62, 12.18],
    ['2023/04/26', 12.19, 12.23, 12.28, 12.14],
    ['2023/04/27', 12.26, 12.41, 12.46, 12.15],
    ['2023/04/28', 12.33, 12.32, 12.36, 12.18],
    ['2023/05/01', 12.32, 12.45, 12.58, 12.32],
    ['2023/05/02', 12.37, 12.36, 12.45, 12.13],
    ['2023/05/03', 12.42, 12.36, 12.46, 12.27],
    ['2023/05/04', 12.23, 12.2, 12.35, 12.15],
    ['2023/05/05', 12.2, 12.11, 12.3, 12.03],
    ['2023/05/08', 12.07, 12.16, 12.19, 12.07],
    ['2023/05/09', 12.1, 12.14, 12.19, 11.93],
    ['2023/05/10', 12.25, 12.14, 12.29, 12.06],
    ['2023/05/11', 12.06, 11.98, 12.06, 11.8],
    ['2023/05/12', 11.98, 11.9, 12.03, 11.8],
    ['2023/05/15', 11.91, 12.04, 12.18, 11.84],
    ['2023/05/16', 11.97, 11.91, 12.04, 11.89],
    ['2023/05/17', 11.99, 11.93, 11.99, 11.88],
    ['2023/05/18', 12.5, 12.92, 13.29, 12.36],
    ['2023/05/19', 13.06, 13.15, 13.26, 13.01],
    ['2023/05/22', 12.95, 12.94, 12.97, 12.63],
    ['2023/05/23', 12.94, 13.04, 13.26, 12.87],
    ['2023/05/24', 13.05, 13.18, 13.28, 12.94],
    ['2023/05/25', 13.37, 13.27, 13.41, 13.04],
    ['2023/05/26', 13.39, 13.46, 13.84, 13.31],
    ['2023/05/30', 13.47, 13.35, 13.62, 13.32],
    ['2023/05/31', 13.33, 13.36, 13.55, 13.05],
    ['2023/06/01', 13.42, 13.64, 13.8, 13.38],
    ['2023/06/02', 13.64, 13.64, 13.75, 13.51],
    ['2023/06/05', 13.6, 13.53, 13.63, 13.35],
    ['2023/06/06', 13.53, 13.67, 13.75, 13.43],
    ['2023/06/07', 13.64, 13.93, 14.01, 13.61],
    ['2023/06/08', 13.92, 13.86, 13.93, 13.76],
    ['2023/06/09', 13.85, 13.85, 13.98, 13.76],
    ['2023/06/12', 13.83, 13.61, 13.84, 13.48],
    ['2023/06/13', 13.63, 13.67, 13.79, 13.57],
    ['2023/06/14', 13.59, 13.66, 13.82, 13.59],
    ['2023/06/15', 13.5, 13.66, 13.74, 13.5],
    ['2023/06/16', 13.68, 13.88, 13.91, 13.63],
    ['2023/06/20', 13.82, 13.69, 13.9, 13.69],
    ['2023/06/21', 13.59, 13.49, 13.66, 13.41],
    ['2023/06/22', 13.44, 13.61, 13.67, 13.28],
    ['2023/06/23', 13.53, 13.32, 13.67, 13.2],
    ['2023/06/26', 13.24, 13.26, 13.31, 12.99],
    ['2023/06/27', 13.21, 13.5, 13.55, 13.17],
    ['2023/06/28', 13.42, 13.68, 13.73, 13.35],
    ['2023/06/29', 13.69, 13.54, 13.7, 13.51],
    ['2023/06/30', 13.64, 13.52, 13.64, 13.5],
    ['2023/07/03', 13.42, 13.43, 13.52, 13.31],
    ['2023/07/05', 13.3, 13.16, 13.31, 13.14],
    ['2023/07/06', 13.03, 12.89, 13.06, 12.79],
    ['2023/07/07', 12.91, 12.89, 13.02, 12.87],
    ['2023/07/10', 12.86, 12.9, 13.07, 12.86],
    ['2023/07/11', 12.94, 12.84, 13.0, 12.81],
    ['2023/07/12', 12.93, 12.67, 13.01, 12.64],
    ['2023/07/13', 12.66, 12.78, 12.78, 12.5],
    ['2023/07/14', 12.71, 12.56, 12.88, 12.51],
    ['2023/07/17', 12.58, 12.74, 12.84, 12.55],
    ['2023/07/18', 12.73, 12.87, 12.92, 12.73],
    ['2023/07/19', 12.93, 12.84, 13.04, 12.8],
    ['2023/07/20', 12.96, 12.92, 12.99, 12.76],
    ['2023/07/21', 12.97, 13.05, 13.07, 12.91],
    ['2023/07/24', 12.9, 12.95, 13.1, 12.87],
    ['2023/07/25', 12.9, 13.06, 13.08, 12.82],
    ['2023/07/26', 13.04, 13.2, 13.21, 13.03],
    ['2023/07/27', 13.25, 13.34, 13.49, 13.17],
    ['2023/07/28', 13.41, 13.26, 13.45, 13.23],
    ['2023/07/31', 13.3, 13.21, 13.38, 13.15],
    ['2023/08/01', 13.25, 13.3, 13.32, 13.15],
    ['2023/08/02', 13.33, 13.25, 13.38, 13.23],
    ['2023/08/03', 13.24, 13.28, 13.34, 13.15],
    ['2023/08/04', 13.23, 13.28, 13.4, 13.21],
    ['2023/08/07', 13.31, 13.34, 13.37, 13.2],
    ['2023/08/08', 13.3, 13.43, 13.44, 13.18],
]);
var volumes = [
    406800.0,
    412800.0,
    472800.0,
    541300.0,
    532700.0,
    435600.0,
    444900.0,
    355000.0,
    709300.0,
    2197200.0,
    1135800.0,
    925900.0,
    991600.0,
    1972700.0,
    1142900.0,
    1060100.0,
    1197000.0,
    839500.0,
    582300.0,
    623700.0,
    924800.0,
    1372200.0,
    939100.0,
    693300.0,
    464400.0,
    696300.0,
    1220500.0,
    651200.0,
    892900.0,
    1206600.0,
    648800.0,
    731300.0,
    554600.0,
    733900.0,
    457800.0,
    1245900.0,
    956400.0,
    1603700.0,
    812500.0,
    243800.0,
    381100.0,
    522500.0,
    350900.0,
    364100.0,
    329700.0,
    552200.0,
    354800.0,
    407300.0,
    330500.0,
    294500.0,
    342100.0,
    338900.0,
    387000.0,
    596800.0,
    531700.0,
    530500.0,
    586400.0,
    325700.0,
    360800.0,
    318300.0,
    245900.0,
    364400.0,
    280100.0,
    372100.0,
    242900.0,
    267300.0,
    339400.0,
    474800.0,
    359000.0,
    411400.0,
    864400.0,
    791500.0,
    570200.0,
    745800.0,
    543900.0,
    384300.0,
    316100.0,
    321500.0,
    239000.0,
    300900.0,
    235400.0,
    223000.0,
    275200.0,
    190600.0,
    251700.0,
    240000.0,
    406800.0,
    583700.0,
    327400.0,
    211000.0,
    520300.0,
    224900.0,
    405200.0,
    465200.0,
    227500.0,
    235100.0,
    301200.0,
    295100.0,
    388600.0,
    254700.0,
    207800.0,
    168900.0,
    126000.0,
    261800.0,
    285100.0,
    113600.0,
    212800.0,
    302600.0,
    303300.0,
    319100.0,
    307500.0,
    370200.0,
    381700.0,
    385100.0,
    348200.0,
    369700.0,
    335100.0,
    422600.0,
    466200.0,
    1417200.0,
    785800.0,
    489900.0,
    451000.0,
    299800.0,
    353800.0,
    493900.0,
    492400.0,
    207600.0,
    327900.0,
    173800.0,
    517900.0,
    348300.0,
    239000.0,
    243100.0,
    601500.0,
    631200.0,
    422700.0,
    359200.0,
    364100.0,
    335500.0,
    371800.0,
    633900.0,
    560300.0,
    757000.0,
    308100.0,
    429400.0,
    491300.0,
    495500.0,
    337700.0,
    520900.0,
    241300.0,
    911600.0,
    229200.0,
    193200.0,
    256400.0,
    210100.0,
    281700.0,
    370000.0,
    210400.0,
    309700.0,
    304800.0,
    359600.0,
    396700.0,
    351400.0,
    283800.0,
    211500.0,
    194100.0,
    274700.0,
    203200.0,
    335800.0,
    321400.0,
    414500.0,
    515700.0,
    1160700.0,
    1002000.0,
    581900.0,
    376900.0,
    427900.0,
    379200.0,
    327100.0,
    294500.0,
    459600.0,
    350100.0,
    364200.0,
    285800.0,
    628600.0,
    233200.0,
    252100.0,
    241900.0,
    269700.0,
    214200.0,
    359100.0,
    309300.0,
    317000.0,
    1790000.0,
    1277700.0,
    705800.0,
    870400.0,
    754300.0,
    1014500.0,
    1145500.0,
    732800.0,
    1625400.0,
    907500.0,
    669400.0,
    461300.0,
    1179100.0,
    1071700.0,
    676100.0,
    765200.0,
    563200.0,
    430700.0,
    328600.0,
    425300.0,
    646600.0,
    594200.0,
    837500.0,
    740800.0,
    10957000.0,
    1325400.0,
    555400.0,
    839700.0,
    558900.0,
    401800.0,
    255500.0,
    516800.0,
    511300.0,
    458500.0,
    421600.0,
    464800.0,
    640000.0,
    1008900.0,
    478000.0,
    587600.0,
    396000.0,
    862300.0,
    580100.0,
    333000.0,
    274600.0,
    305500.0,
    320800.0,
    619700.0,
    253600.0,
    468100.0,
    419700.0,
    319800.0,
    282000.0,
    294600.0,
    265100.0,
    433600.0,
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
     *     text: "DOLE",
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