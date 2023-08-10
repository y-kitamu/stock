/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_ARHS");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/11', 8.35, 7.93, 8.37, 7.52],
    ['2022/08/12', 7.87, 8.01, 8.12, 7.63],
    ['2022/08/15', 7.99, 8.84, 8.93, 7.86],
    ['2022/08/16', 8.85, 9.26, 9.73, 8.77],
    ['2022/08/17', 9.09, 8.92, 9.25, 8.75],
    ['2022/08/18', 8.86, 9.52, 9.55, 8.6],
    ['2022/08/19', 9.43, 8.94, 9.43, 8.78],
    ['2022/08/22', 8.68, 8.95, 8.99, 8.51],
    ['2022/08/23', 8.95, 8.87, 9.15, 8.75],
    ['2022/08/24', 8.89, 8.94, 9.2, 8.84],
    ['2022/08/25', 8.94, 9.23, 9.34, 8.88],
    ['2022/08/26', 9.18, 8.7, 9.29, 8.6],
    ['2022/08/29', 8.56, 8.83, 8.96, 8.56],
    ['2022/08/30', 8.88, 8.8, 9.06, 8.66],
    ['2022/08/31', 8.9, 8.56, 8.92, 8.51],
    ['2022/09/01', 8.5, 8.4, 8.53, 8.08],
    ['2022/09/02', 8.56, 8.55, 8.78, 8.3],
    ['2022/09/06', 8.52, 8.92, 9.2, 8.52],
    ['2022/09/07', 9.12, 9.24, 9.27, 8.99],
    ['2022/09/08', 9.12, 8.9, 9.22, 8.75],
    ['2022/09/09', 9.04, 9.06, 9.31, 8.86],
    ['2022/09/12', 9.12, 8.6, 9.71, 8.55],
    ['2022/09/13', 8.5, 8.24, 8.5, 8.12],
    ['2022/09/14', 8.27, 8.14, 8.39, 7.99],
    ['2022/09/15', 8.04, 8.45, 8.61, 8.04],
    ['2022/09/16', 8.45, 8.42, 8.45, 8.15],
    ['2022/09/19', 8.24, 8.38, 8.46, 8.2],
    ['2022/09/20', 8.31, 8.48, 8.52, 8.11],
    ['2022/09/21', 8.47, 8.57, 8.86, 8.47],
    ['2022/09/22', 8.56, 8.02, 8.56, 7.88],
    ['2022/09/23', 7.94, 7.88, 7.94, 7.73],
    ['2022/09/26', 7.9, 7.88, 8.17, 7.85],
    ['2022/09/27', 7.98, 7.6, 8.25, 7.55],
    ['2022/09/28', 7.58, 7.57, 7.67, 7.43],
    ['2022/09/29', 7.44, 7.39, 7.44, 7.22],
    ['2022/09/30', 7.32, 7.05, 7.38, 7.04],
    ['2022/10/03', 7.15, 7.36, 7.47, 7.02],
    ['2022/10/04', 7.52, 7.56, 7.74, 7.45],
    ['2022/10/05', 7.46, 7.48, 7.53, 7.23],
    ['2022/10/06', 7.56, 7.52, 7.61, 7.38],
    ['2022/10/07', 7.45, 7.27, 7.69, 7.14],
    ['2022/10/10', 7.3, 7.12, 7.3, 6.96],
    ['2022/10/11', 7.12, 7.22, 7.45, 7.0],
    ['2022/10/12', 7.28, 7.17, 7.36, 7.1],
    ['2022/10/13', 6.97, 7.18, 7.25, 6.82],
    ['2022/10/14', 7.41, 7.16, 7.59, 7.1],
    ['2022/10/17', 7.38, 7.64, 7.8, 7.34],
    ['2022/10/18', 7.87, 7.65, 8.01, 7.57],
    ['2022/10/19', 7.63, 7.51, 7.71, 7.37],
    ['2022/10/20', 7.52, 7.43, 7.83, 7.39],
    ['2022/10/21', 7.44, 7.74, 7.77, 7.35],
    ['2022/10/24', 7.79, 7.86, 7.93, 7.52],
    ['2022/10/25', 7.93, 8.47, 8.9, 7.9],
    ['2022/10/26', 8.47, 8.48, 8.8, 8.35],
    ['2022/10/27', 8.59, 8.16, 8.59, 8.14],
    ['2022/10/28', 8.11, 8.36, 8.45, 8.11],
    ['2022/10/31', 8.22, 8.33, 8.44, 8.2],
    ['2022/11/01', 8.54, 8.25, 8.57, 8.21],
    ['2022/11/02', 8.24, 8.07, 8.34, 8.02],
    ['2022/11/03', 8.01, 8.29, 8.35, 7.93],
    ['2022/11/04', 8.44, 8.71, 8.86, 8.39],
    ['2022/11/07', 8.7, 9.37, 9.45, 8.7],
    ['2022/11/08', 9.43, 9.35, 9.65, 8.93],
    ['2022/11/09', 9.39, 9.12, 9.39, 8.99],
    ['2022/11/10', 9.9, 8.93, 9.97, 7.56],
    ['2022/11/11', 8.88, 8.72, 9.0, 8.51],
    ['2022/11/14', 8.61, 8.93, 9.1, 8.61],
    ['2022/11/15', 9.19, 8.96, 9.38, 8.85],
    ['2022/11/16', 8.81, 8.49, 8.98, 8.47],
    ['2022/11/17', 8.33, 8.34, 8.37, 7.99],
    ['2022/11/18', 8.47, 8.55, 8.66, 8.4],
    ['2022/11/21', 8.5, 8.43, 8.52, 8.27],
    ['2022/11/22', 8.43, 8.77, 8.78, 8.43],
    ['2022/11/23', 8.78, 9.06, 9.17, 8.77],
    ['2022/11/25', 9.06, 9.19, 9.27, 9.05],
    ['2022/11/28', 9.2, 9.15, 9.45, 9.06],
    ['2022/11/29', 9.15, 9.36, 9.45, 9.06],
    ['2022/11/30', 9.35, 9.63, 9.7, 9.21],
    ['2022/12/01', 9.69, 9.93, 10.19, 9.6],
    ['2022/12/02', 9.86, 10.26, 10.39, 9.68],
    ['2022/12/05', 10.28, 9.9, 10.44, 9.82],
    ['2022/12/06', 9.88, 9.61, 9.91, 9.55],
    ['2022/12/07', 9.34, 9.55, 9.84, 9.25],
    ['2022/12/08', 9.57, 9.79, 9.83, 9.55],
    ['2022/12/09', 9.7, 9.56, 9.71, 9.41],
    ['2022/12/12', 9.58, 9.57, 9.69, 9.51],
    ['2022/12/13', 9.8, 9.84, 10.19, 9.74],
    ['2022/12/14', 9.77, 9.97, 10.04, 9.59],
    ['2022/12/15', 9.77, 9.51, 9.83, 9.41],
    ['2022/12/16', 9.4, 9.78, 9.91, 9.39],
    ['2022/12/19', 9.78, 9.51, 9.78, 9.4],
    ['2022/12/20', 9.37, 9.56, 9.7, 9.26],
    ['2022/12/21', 9.64, 9.79, 9.89, 9.57],
    ['2022/12/22', 9.74, 9.75, 9.93, 9.51],
    ['2022/12/23', 9.76, 9.24, 9.8, 8.98],
    ['2022/12/27', 9.27, 9.44, 9.48, 9.1],
    ['2022/12/28', 9.45, 9.5, 9.69, 9.22],
    ['2022/12/29', 9.57, 9.75, 9.95, 9.54],
    ['2022/12/30', 9.65, 9.75, 9.81, 9.28],
    ['2023/01/03', 9.76, 9.4, 10.16, 9.35],
    ['2023/01/04', 9.52, 10.09, 10.16, 9.5],
    ['2023/01/05', 10.05, 10.3, 10.58, 9.96],
    ['2023/01/06', 10.3, 10.24, 10.45, 10.02],
    ['2023/01/09', 11.55, 11.64, 12.23, 10.94],
    ['2023/01/10', 11.83, 11.95, 12.09, 11.48],
    ['2023/01/11', 12.1, 12.21, 12.49, 11.81],
    ['2023/01/12', 12.34, 12.87, 13.06, 12.11],
    ['2023/01/13', 12.88, 12.6, 13.13, 12.46],
    ['2023/01/17', 12.58, 13.13, 13.33, 12.26],
    ['2023/01/18', 13.36, 12.52, 13.41, 12.31],
    ['2023/01/19', 12.12, 12.32, 12.63, 12.01],
    ['2023/01/20', 12.4, 12.92, 13.05, 12.2],
    ['2023/01/23', 13.05, 13.92, 14.1, 12.93],
    ['2023/01/24', 13.9, 13.83, 14.19, 13.46],
    ['2023/01/25', 13.55, 13.54, 13.67, 13.03],
    ['2023/01/26', 13.65, 13.35, 13.91, 12.8],
    ['2023/01/27', 13.28, 13.42, 13.65, 13.1],
    ['2023/01/30', 13.3, 13.9, 14.06, 13.05],
    ['2023/01/31', 14.0, 14.15, 14.46, 13.81],
    ['2023/02/01', 14.29, 14.44, 14.59, 13.88],
    ['2023/02/02', 14.58, 14.58, 14.95, 14.01],
    ['2023/02/03', 14.27, 14.54, 15.06, 14.15],
    ['2023/02/06', 14.71, 14.53, 14.95, 14.16],
    ['2023/02/07', 14.43, 14.82, 15.01, 14.28],
    ['2023/02/08', 14.96, 14.49, 14.99, 13.83],
    ['2023/02/09', 14.63, 14.07, 14.64, 14.02],
    ['2023/02/10', 14.0, 13.88, 14.17, 13.67],
    ['2023/02/13', 13.96, 14.26, 14.3, 13.74],
    ['2023/02/14', 14.21, 14.38, 14.53, 13.91],
    ['2023/02/15', 14.39, 14.9, 15.0, 14.3],
    ['2023/02/16', 14.69, 14.58, 15.27, 14.46],
    ['2023/02/17', 14.47, 14.31, 14.53, 14.01],
    ['2023/02/21', 14.27, 13.4, 14.27, 13.35],
    ['2023/02/22', 13.4, 13.71, 13.95, 13.1],
    ['2023/02/23', 13.84, 14.3, 14.34, 13.55],
    ['2023/02/24', 14.1, 14.03, 14.49, 13.92],
    ['2023/02/27', 14.2, 14.41, 14.64, 14.17],
    ['2023/02/28', 14.45, 14.51, 15.13, 14.43],
    ['2023/03/01', 14.65, 13.98, 14.8, 13.97],
    ['2023/03/02', 13.98, 13.94, 14.05, 13.09],
    ['2023/03/03', 13.98, 14.18, 14.4, 13.72],
    ['2023/03/06', 14.27, 13.3, 14.32, 13.13],
    ['2023/03/07', 13.25, 13.11, 13.52, 12.9],
    ['2023/03/08', 13.11, 12.8, 13.33, 12.49],
    ['2023/03/09', 11.21, 10.24, 11.48, 9.97],
    ['2023/03/10', 10.1, 9.44, 10.1, 9.28],
    ['2023/03/13', 9.21, 8.84, 9.24, 8.69],
    ['2023/03/14', 9.17, 8.83, 9.35, 8.78],
    ['2023/03/15', 8.5, 8.59, 8.74, 8.33],
    ['2023/03/16', 8.38, 8.98, 8.99, 8.26],
    ['2023/03/17', 8.96, 8.52, 8.96, 8.34],
    ['2023/03/20', 8.65, 8.52, 8.96, 8.41],
    ['2023/03/21', 8.72, 8.72, 8.86, 8.65],
    ['2023/03/22', 8.69, 8.22, 8.69, 8.22],
    ['2023/03/23', 8.26, 8.32, 8.47, 8.16],
    ['2023/03/24', 8.25, 8.14, 8.25, 7.99],
    ['2023/03/27', 8.17, 8.23, 8.37, 8.12],
    ['2023/03/28', 8.16, 8.37, 8.5, 8.16],
    ['2023/03/29', 8.45, 8.33, 8.49, 8.12],
    ['2023/03/30', 8.45, 8.05, 8.53, 8.04],
    ['2023/03/31', 8.15, 8.29, 8.33, 8.06],
    ['2023/04/03', 8.28, 7.84, 8.4, 7.8],
    ['2023/04/04', 7.84, 7.5, 7.84, 7.2],
    ['2023/04/05', 7.67, 7.51, 7.79, 7.36],
    ['2023/04/06', 7.49, 7.56, 7.67, 7.29],
    ['2023/04/10', 7.49, 7.86, 7.91, 7.45],
    ['2023/04/11', 7.88, 7.87, 7.95, 7.71],
    ['2023/04/12', 7.93, 7.83, 8.11, 7.74],
    ['2023/04/13', 7.87, 7.85, 7.89, 7.75],
    ['2023/04/14', 7.89, 7.84, 8.05, 7.73],
    ['2023/04/17', 7.85, 8.07, 8.09, 7.8],
    ['2023/04/18', 8.08, 8.24, 8.27, 8.05],
    ['2023/04/19', 8.2, 8.16, 8.25, 7.93],
    ['2023/04/20', 8.1, 8.32, 8.37, 7.98],
    ['2023/04/21', 8.27, 8.16, 8.3, 8.11],
    ['2023/04/24', 8.13, 7.98, 8.21, 7.83],
    ['2023/04/25', 7.85, 7.68, 7.85, 7.65],
    ['2023/04/26', 7.62, 7.48, 7.74, 7.41],
    ['2023/04/27', 7.5, 7.83, 7.86, 7.49],
    ['2023/04/28', 7.79, 8.02, 8.05, 7.79],
    ['2023/05/01', 8.0, 7.98, 8.1, 7.88],
    ['2023/05/02', 7.87, 7.65, 7.9, 7.57],
    ['2023/05/03', 7.59, 7.43, 7.85, 7.39],
    ['2023/05/04', 6.9, 7.61, 8.05, 6.89],
    ['2023/05/05', 7.76, 8.19, 8.28, 7.76],
    ['2023/05/08', 8.38, 8.37, 8.43, 8.02],
    ['2023/05/09', 8.42, 8.57, 8.85, 8.38],
    ['2023/05/10', 8.67, 8.72, 8.89, 8.6],
    ['2023/05/11', 8.62, 8.63, 8.73, 8.4],
    ['2023/05/12', 8.65, 8.53, 8.72, 8.26],
    ['2023/05/15', 8.54, 8.44, 8.54, 8.18],
    ['2023/05/16', 8.33, 7.43, 8.43, 7.4],
    ['2023/05/17', 7.47, 7.62, 7.7, 7.43],
    ['2023/05/18', 7.62, 7.55, 7.79, 7.43],
    ['2023/05/19', 7.59, 7.37, 7.61, 7.22],
    ['2023/05/22', 7.47, 7.41, 7.48, 7.22],
    ['2023/05/23', 7.47, 7.42, 7.57, 7.39],
    ['2023/05/24', 7.35, 7.19, 7.39, 7.01],
    ['2023/05/25', 7.19, 7.16, 7.32, 7.01],
    ['2023/05/26', 7.12, 7.19, 7.28, 6.91],
    ['2023/05/30', 7.15, 7.13, 7.36, 7.11],
    ['2023/05/31', 7.1, 7.07, 7.2, 6.95],
    ['2023/06/01', 7.07, 6.81, 7.07, 6.75],
    ['2023/06/02', 6.91, 7.25, 7.26, 6.91],
    ['2023/06/05', 7.25, 7.24, 7.37, 7.2],
    ['2023/06/06', 7.2, 7.55, 7.68, 7.2],
    ['2023/06/07', 7.68, 8.05, 8.27, 7.67],
    ['2023/06/08', 8.06, 8.49, 8.78, 8.04],
    ['2023/06/09', 8.5, 8.44, 8.71, 8.41],
    ['2023/06/12', 8.48, 8.63, 8.65, 8.46],
    ['2023/06/13', 8.73, 9.24, 9.26, 8.7],
    ['2023/06/14', 9.21, 9.04, 9.38, 8.95],
    ['2023/06/15', 9.03, 9.09, 9.13, 8.91],
    ['2023/06/16', 9.09, 8.92, 9.18, 8.83],
    ['2023/06/20', 8.9, 9.13, 9.15, 8.75],
    ['2023/06/21', 9.1, 9.13, 9.31, 8.98],
    ['2023/06/22', 9.12, 9.43, 9.47, 8.96],
    ['2023/06/23', 9.26, 9.24, 9.46, 9.14],
    ['2023/06/26', 9.27, 9.45, 9.62, 9.23],
    ['2023/06/27', 9.8, 10.23, 10.28, 9.76],
    ['2023/06/28', 10.18, 9.97, 10.33, 9.9],
    ['2023/06/29', 9.96, 10.03, 10.14, 9.91],
    ['2023/06/30', 10.15, 10.43, 10.5, 10.04],
    ['2023/07/03', 10.43, 10.45, 10.57, 10.3],
    ['2023/07/05', 10.42, 10.3, 10.43, 10.15],
    ['2023/07/06', 10.11, 10.13, 10.16, 10.0],
    ['2023/07/07', 10.07, 10.16, 10.26, 10.01],
    ['2023/07/10', 10.04, 10.6, 10.86, 10.04],
    ['2023/07/11', 10.69, 11.16, 11.34, 10.63],
    ['2023/07/12', 11.35, 11.25, 11.47, 11.19],
    ['2023/07/13', 11.28, 10.59, 11.34, 10.42],
    ['2023/07/14', 10.67, 10.83, 10.92, 10.62],
    ['2023/07/17', 10.86, 11.25, 11.27, 10.77],
    ['2023/07/18', 11.23, 11.51, 11.56, 11.22],
    ['2023/07/19', 11.58, 11.49, 11.82, 11.42],
    ['2023/07/20', 11.43, 11.29, 11.47, 11.1],
    ['2023/07/21', 11.33, 11.09, 11.39, 11.01],
    ['2023/07/24', 11.09, 11.16, 11.43, 10.98],
    ['2023/07/25', 11.17, 11.36, 11.49, 11.06],
    ['2023/07/26', 11.4, 11.44, 11.46, 11.19],
    ['2023/07/27', 11.53, 11.02, 11.55, 10.91],
    ['2023/07/28', 11.08, 11.04, 11.15, 10.72],
    ['2023/07/31', 11.09, 11.46, 11.48, 11.06],
    ['2023/08/01', 11.32, 11.74, 11.74, 11.25],
    ['2023/08/02', 11.51, 11.56, 11.78, 11.47],
    ['2023/08/03', 11.53, 11.93, 12.02, 11.53],
    ['2023/08/04', 11.97, 12.05, 12.46, 11.84],
    ['2023/08/07', 12.15, 11.73, 12.21, 11.48],
    ['2023/08/08', 11.5, 11.6, 11.81, 11.14],
    ['2023/08/09', 12.0, 12.61, 13.01, 11.98],
]);
var volumes = [
    3900700.0,
    1633800.0,
    1135200.0,
    992800.0,
    501100.0,
    536400.0,
    515600.0,
    285100.0,
    513600.0,
    349800.0,
    289000.0,
    391300.0,
    262700.0,
    234400.0,
    337700.0,
    370900.0,
    213000.0,
    525400.0,
    580500.0,
    275100.0,
    801100.0,
    1035400.0,
    551000.0,
    401800.0,
    531200.0,
    866500.0,
    357000.0,
    562300.0,
    522000.0,
    364600.0,
    244700.0,
    189200.0,
    502000.0,
    246500.0,
    247700.0,
    308300.0,
    242200.0,
    183100.0,
    177500.0,
    121300.0,
    158400.0,
    257800.0,
    208700.0,
    187600.0,
    235300.0,
    281400.0,
    273000.0,
    221500.0,
    179300.0,
    179700.0,
    120100.0,
    213400.0,
    570900.0,
    262200.0,
    225400.0,
    274900.0,
    185300.0,
    195100.0,
    252300.0,
    224000.0,
    292100.0,
    660100.0,
    879300.0,
    770800.0,
    1810000.0,
    913200.0,
    557100.0,
    724100.0,
    645600.0,
    1410500.0,
    372300.0,
    254400.0,
    453900.0,
    542400.0,
    186900.0,
    311900.0,
    327300.0,
    439400.0,
    709800.0,
    1163700.0,
    730700.0,
    357000.0,
    503500.0,
    402000.0,
    460500.0,
    302600.0,
    706300.0,
    327200.0,
    577700.0,
    676300.0,
    199000.0,
    202300.0,
    170400.0,
    160900.0,
    483200.0,
    258000.0,
    236100.0,
    274300.0,
    438500.0,
    611700.0,
    922600.0,
    791700.0,
    421400.0,
    2383100.0,
    1034100.0,
    978100.0,
    1435200.0,
    1024600.0,
    1405100.0,
    1422300.0,
    851200.0,
    984400.0,
    2327100.0,
    850500.0,
    876600.0,
    1280600.0,
    843400.0,
    2145600.0,
    1190400.0,
    1325600.0,
    1237300.0,
    892400.0,
    1062600.0,
    977400.0,
    1131500.0,
    1046600.0,
    733700.0,
    779800.0,
    924300.0,
    502300.0,
    1125900.0,
    688800.0,
    1277700.0,
    1552200.0,
    1406500.0,
    591800.0,
    594200.0,
    1448600.0,
    786000.0,
    1002100.0,
    666600.0,
    2103100.0,
    1757500.0,
    3245300.0,
    6044400.0,
    1932600.0,
    1769300.0,
    1153700.0,
    1480100.0,
    996000.0,
    1308300.0,
    820600.0,
    705700.0,
    775000.0,
    770100.0,
    771700.0,
    601700.0,
    817500.0,
    709500.0,
    1219400.0,
    1426800.0,
    1065600.0,
    1994800.0,
    1069100.0,
    1084800.0,
    683700.0,
    978400.0,
    763200.0,
    495900.0,
    551600.0,
    769700.0,
    540300.0,
    546500.0,
    649100.0,
    651400.0,
    820400.0,
    731300.0,
    1165000.0,
    705400.0,
    349700.0,
    600900.0,
    615000.0,
    962700.0,
    1097700.0,
    1065100.0,
    1190300.0,
    1406800.0,
    992200.0,
    771500.0,
    565800.0,
    655900.0,
    1091700.0,
    755200.0,
    781900.0,
    657100.0,
    483200.0,
    621200.0,
    350800.0,
    536000.0,
    413500.0,
    723200.0,
    843700.0,
    698200.0,
    655200.0,
    561800.0,
    545600.0,
    1031900.0,
    1596900.0,
    679900.0,
    483000.0,
    835800.0,
    700700.0,
    385700.0,
    427700.0,
    571400.0,
    474700.0,
    498500.0,
    801000.0,
    479000.0,
    1222400.0,
    630800.0,
    476500.0,
    632500.0,
    257700.0,
    579000.0,
    486700.0,
    761700.0,
    923500.0,
    958900.0,
    765400.0,
    768700.0,
    475800.0,
    617900.0,
    385100.0,
    697400.0,
    502300.0,
    509000.0,
    462900.0,
    392400.0,
    378700.0,
    639300.0,
    611000.0,
    567700.0,
    482100.0,
    521400.0,
    1370700.0,
    1944700.0,
    1007900.0,
    1191000.0,
    3344000.0,
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
     *     text: "ARHS",
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