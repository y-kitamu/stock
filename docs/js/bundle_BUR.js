/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_BUR");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/03', 10.7, 10.74, 10.83, 10.62],
    ['2022/08/04', 10.8, 10.75, 10.88, 10.75],
    ['2022/08/05', 10.58, 10.65, 10.68, 10.47],
    ['2022/08/08', 10.75, 10.75, 10.81, 10.67],
    ['2022/08/09', 10.39, 10.36, 10.53, 10.33],
    ['2022/08/10', 10.17, 10.52, 10.59, 10.09],
    ['2022/08/11', 10.58, 10.3, 10.6, 10.29],
    ['2022/08/12', 10.17, 10.4, 10.41, 10.1],
    ['2022/08/15', 10.04, 10.18, 10.32, 9.92],
    ['2022/08/16', 9.99, 10.11, 10.13, 9.99],
    ['2022/08/17', 9.86, 9.89, 9.93, 9.73],
    ['2022/08/18', 9.96, 9.84, 9.96, 9.81],
    ['2022/08/19', 9.69, 9.61, 9.76, 9.54],
    ['2022/08/22', 9.53, 9.45, 9.69, 9.44],
    ['2022/08/23', 9.47, 9.44, 9.63, 9.43],
    ['2022/08/24', 9.44, 9.44, 9.47, 9.36],
    ['2022/08/25', 9.5, 9.7, 9.74, 9.49],
    ['2022/08/26', 9.69, 9.41, 9.69, 9.24],
    ['2022/08/29', 9.39, 9.37, 9.41, 9.28],
    ['2022/08/30', 9.41, 9.38, 9.44, 9.23],
    ['2022/08/31', 9.42, 9.22, 9.42, 9.19],
    ['2022/09/01', 9.01, 8.94, 9.02, 8.76],
    ['2022/09/02', 9.03, 8.96, 9.15, 8.92],
    ['2022/09/06', 8.98, 8.84, 8.98, 8.78],
    ['2022/09/07', 8.34, 8.59, 8.64, 8.3],
    ['2022/09/08', 8.22, 8.34, 8.42, 8.16],
    ['2022/09/09', 8.31, 8.43, 8.44, 8.27],
    ['2022/09/12', 8.43, 8.65, 8.7, 8.37],
    ['2022/09/13', 8.34, 8.26, 8.38, 8.15],
    ['2022/09/14', 8.01, 8.07, 8.11, 7.95],
    ['2022/09/15', 8.0, 8.14, 8.24, 8.0],
    ['2022/09/16', 7.99, 8.0, 8.04, 7.93],
    ['2022/09/19', 7.9, 7.98, 8.1, 7.85],
    ['2022/09/20', 7.75, 7.69, 7.75, 7.66],
    ['2022/09/21', 7.59, 7.65, 7.76, 7.54],
    ['2022/09/22', 7.53, 7.45, 7.55, 7.44],
    ['2022/09/23', 7.26, 7.33, 7.34, 7.22],
    ['2022/09/26', 7.16, 7.15, 7.39, 7.11],
    ['2022/09/27', 7.12, 7.05, 7.15, 6.98],
    ['2022/09/28', 6.9, 7.33, 7.36, 6.87],
    ['2022/09/29', 7.28, 7.27, 7.31, 7.08],
    ['2022/09/30', 7.19, 7.41, 7.47, 7.19],
    ['2022/10/03', 7.51, 7.81, 7.84, 7.46],
    ['2022/10/04', 7.53, 8.01, 8.06, 7.52],
    ['2022/10/05', 7.85, 8.11, 8.12, 7.85],
    ['2022/10/06', 7.93, 7.9, 8.0, 7.85],
    ['2022/10/07', 7.84, 7.82, 7.91, 7.81],
    ['2022/10/10', 7.77, 7.56, 7.8, 7.56],
    ['2022/10/11', 7.23, 7.38, 7.4, 7.12],
    ['2022/10/12', 6.97, 7.01, 7.07, 6.95],
    ['2022/10/13', 6.89, 7.12, 7.21, 6.85],
    ['2022/10/14', 7.25, 7.1, 7.3, 7.09],
    ['2022/10/17', 7.42, 7.51, 7.61, 7.4],
    ['2022/10/18', 7.64, 7.68, 7.68, 7.57],
    ['2022/10/19', 7.63, 7.6, 7.68, 7.54],
    ['2022/10/20', 7.57, 7.52, 7.69, 7.49],
    ['2022/10/21', 7.33, 7.52, 7.52, 7.31],
    ['2022/10/24', 7.61, 7.65, 7.67, 7.52],
    ['2022/10/25', 7.69, 7.87, 7.89, 7.69],
    ['2022/10/26', 8.03, 8.11, 8.22, 8.0],
    ['2022/10/27', 8.07, 7.88, 8.08, 7.87],
    ['2022/10/28', 7.88, 7.97, 8.01, 7.88],
    ['2022/10/31', 7.9, 7.99, 8.05, 7.87],
    ['2022/11/01', 8.02, 7.93, 8.02, 7.89],
    ['2022/11/02', 8.02, 8.05, 8.23, 8.0],
    ['2022/11/03', 7.72, 7.86, 7.89, 7.71],
    ['2022/11/04', 8.1, 8.23, 8.24, 8.06],
    ['2022/11/07', 8.48, 8.56, 8.64, 8.46],
    ['2022/11/08', 8.52, 8.42, 8.63, 8.34],
    ['2022/11/09', 8.29, 8.38, 8.44, 8.29],
    ['2022/11/10', 8.66, 8.8, 8.97, 8.63],
    ['2022/11/11', 9.0, 8.88, 9.0, 8.76],
    ['2022/11/14', 8.79, 8.63, 8.82, 8.54],
    ['2022/11/15', 8.75, 8.79, 8.84, 8.64],
    ['2022/11/16', 8.65, 8.66, 8.77, 8.57],
    ['2022/11/17', 8.35, 8.74, 8.77, 8.3],
    ['2022/11/18', 8.82, 8.99, 8.99, 8.81],
    ['2022/11/21', 8.77, 8.73, 8.84, 8.59],
    ['2022/11/22', 8.78, 8.89, 8.92, 8.74],
    ['2022/11/23', 8.91, 9.0, 9.05, 8.91],
    ['2022/11/25', 8.96, 9.0, 9.04, 8.94],
    ['2022/11/28', 8.96, 8.96, 9.04, 8.92],
    ['2022/11/29', 8.88, 8.99, 9.01, 8.8],
    ['2022/11/30', 9.03, 9.17, 9.21, 8.91],
    ['2022/12/01', 9.25, 9.15, 9.33, 9.07],
    ['2022/12/02', 8.99, 8.9, 8.99, 8.83],
    ['2022/12/05', 8.86, 8.61, 8.86, 8.51],
    ['2022/12/06', 8.61, 8.43, 8.61, 8.43],
    ['2022/12/07', 8.38, 8.54, 8.62, 8.36],
    ['2022/12/08', 8.52, 8.66, 8.67, 8.52],
    ['2022/12/09', 8.72, 8.69, 8.82, 8.64],
    ['2022/12/12', 8.8, 8.82, 8.87, 8.48],
    ['2022/12/13', 8.96, 8.74, 9.13, 8.74],
    ['2022/12/14', 8.74, 8.56, 8.77, 8.52],
    ['2022/12/15', 8.56, 8.3, 8.58, 8.27],
    ['2022/12/16', 8.09, 7.98, 8.12, 7.94],
    ['2022/12/19', 8.06, 7.86, 8.12, 7.86],
    ['2022/12/20', 7.86, 7.96, 8.03, 7.85],
    ['2022/12/21', 8.06, 8.0, 8.14, 7.94],
    ['2022/12/22', 7.96, 7.86, 7.96, 7.79],
    ['2022/12/23', 7.86, 7.84, 7.93, 7.81],
    ['2022/12/27', 7.8, 7.81, 7.88, 7.62],
    ['2022/12/28', 7.97, 8.01, 8.08, 7.95],
    ['2022/12/29', 8.04, 8.02, 8.09, 7.94],
    ['2022/12/30', 7.99, 8.11, 8.13, 7.96],
    ['2023/01/03', 8.43, 8.31, 8.61, 8.28],
    ['2023/01/04', 8.4, 8.44, 8.51, 8.39],
    ['2023/01/05', 8.55, 8.49, 8.58, 8.41],
    ['2023/01/06', 8.53, 8.66, 8.71, 8.46],
    ['2023/01/09', 8.72, 8.65, 8.82, 8.62],
    ['2023/01/10', 8.69, 9.04, 9.1, 8.66],
    ['2023/01/11', 9.11, 9.18, 9.18, 9.0],
    ['2023/01/12', 9.23, 9.13, 9.29, 9.06],
    ['2023/01/13', 9.03, 9.09, 9.14, 9.02],
    ['2023/01/17', 8.8, 8.88, 9.0, 8.78],
    ['2023/01/18', 8.98, 8.8, 9.07, 8.78],
    ['2023/01/19', 8.68, 8.69, 8.73, 8.59],
    ['2023/01/20', 8.59, 8.84, 8.88, 8.55],
    ['2023/01/23', 8.78, 9.09, 9.18, 8.77],
    ['2023/01/24', 9.19, 9.2, 9.29, 9.09],
    ['2023/01/25', 9.07, 9.3, 9.3, 9.01],
    ['2023/01/26', 9.17, 9.18, 9.22, 9.06],
    ['2023/01/27', 8.93, 8.99, 9.09, 8.87],
    ['2023/01/30', 9.0, 9.11, 9.22, 8.97],
    ['2023/01/31', 9.06, 9.09, 9.09, 8.86],
    ['2023/02/01', 9.3, 9.06, 9.36, 9.05],
    ['2023/02/02', 9.11, 8.87, 9.18, 8.81],
    ['2023/02/03', 8.53, 8.54, 8.7, 8.49],
    ['2023/02/06', 8.5, 8.41, 8.5, 8.37],
    ['2023/02/07', 8.22, 8.35, 8.35, 8.18],
    ['2023/02/08', 8.32, 8.33, 8.42, 8.22],
    ['2023/02/09', 8.33, 8.2, 8.33, 8.2],
    ['2023/02/10', 8.24, 8.21, 8.24, 8.15],
    ['2023/02/13', 8.38, 8.3, 8.42, 8.29],
    ['2023/02/14', 8.32, 8.32, 8.42, 8.28],
    ['2023/02/15', 8.26, 8.32, 8.34, 8.22],
    ['2023/02/16', 8.12, 8.23, 8.26, 8.05],
    ['2023/02/17', 8.18, 8.21, 8.24, 8.12],
    ['2023/02/21', 8.14, 8.02, 8.19, 8.02],
    ['2023/02/22', 7.95, 7.99, 8.02, 7.85],
    ['2023/02/23', 8.1, 8.07, 8.14, 8.01],
    ['2023/02/24', 7.93, 8.0, 8.02, 7.89],
    ['2023/02/27', 8.08, 8.1, 8.21, 8.08],
    ['2023/02/28', 8.14, 8.11, 8.15, 8.08],
    ['2023/03/01', 8.13, 8.1, 8.17, 8.07],
    ['2023/03/02', 8.06, 8.25, 8.26, 7.99],
    ['2023/03/03', 8.2, 8.23, 8.23, 8.09],
    ['2023/03/06', 8.23, 8.37, 8.47, 8.2],
    ['2023/03/07', 8.06, 8.11, 8.16, 8.03],
    ['2023/03/08', 8.08, 8.17, 8.21, 8.05],
    ['2023/03/09', 8.18, 8.01, 8.18, 7.96],
    ['2023/03/10', 7.96, 7.86, 8.03, 7.8],
    ['2023/03/13', 7.78, 7.71, 7.78, 7.62],
    ['2023/03/14', 7.81, 7.77, 7.93, 7.69],
    ['2023/03/15', 7.46, 7.63, 7.66, 7.43],
    ['2023/03/16', 6.11, 7.0, 7.18, 6.06],
    ['2023/03/17', 6.69, 6.72, 6.81, 6.62],
    ['2023/03/20', 6.66, 6.61, 6.84, 6.58],
    ['2023/03/21', 7.1, 6.93, 7.1, 6.92],
    ['2023/03/22', 6.87, 7.06, 7.26, 6.82],
    ['2023/03/23', 7.1, 7.0, 7.21, 6.85],
    ['2023/03/24', 6.87, 7.05, 7.07, 6.84],
    ['2023/03/27', 7.08, 7.2, 7.24, 7.05],
    ['2023/03/28', 7.02, 7.15, 7.15, 6.81],
    ['2023/03/29', 7.07, 7.06, 7.13, 6.94],
    ['2023/03/30', 7.1, 7.19, 7.29, 7.07],
    ['2023/03/31', 7.11, 11.01, 11.81, 7.08],
    ['2023/04/03', 11.91, 11.01, 11.96, 10.62],
    ['2023/04/04', 10.93, 11.63, 11.76, 10.88],
    ['2023/04/05', 11.63, 11.67, 11.88, 11.57],
    ['2023/04/06', 11.7, 12.21, 12.49, 11.63],
    ['2023/04/10', 12.21, 12.7, 12.81, 12.04],
    ['2023/04/11', 12.45, 12.44, 12.54, 12.26],
    ['2023/04/12', 12.04, 12.49, 12.6, 12.04],
    ['2023/04/13', 12.49, 12.6, 12.7, 12.28],
    ['2023/04/14', 12.63, 12.62, 12.8, 12.36],
    ['2023/04/17', 12.64, 12.56, 12.75, 12.52],
    ['2023/04/18', 12.52, 12.45, 12.73, 12.44],
    ['2023/04/19', 12.42, 12.6, 12.67, 12.35],
    ['2023/04/20', 12.58, 12.8, 13.19, 12.58],
    ['2023/04/21', 12.86, 12.92, 13.04, 12.81],
    ['2023/04/24', 12.91, 12.83, 12.96, 12.76],
    ['2023/04/25', 12.7, 12.54, 12.75, 12.38],
    ['2023/04/26', 12.54, 12.77, 12.87, 12.51],
    ['2023/04/27', 12.73, 12.89, 12.97, 12.51],
    ['2023/04/28', 12.96, 13.26, 13.31, 12.9],
    ['2023/05/01', 13.3, 13.24, 13.36, 13.03],
    ['2023/05/02', 13.12, 12.95, 13.16, 12.73],
    ['2023/05/03', 13.19, 13.41, 13.53, 13.18],
    ['2023/05/04', 13.33, 13.06, 13.42, 12.88],
    ['2023/05/05', 13.1, 13.36, 13.42, 13.02],
    ['2023/05/08', 13.4, 13.5, 13.52, 13.21],
    ['2023/05/09', 13.46, 13.62, 13.78, 13.35],
    ['2023/05/10', 13.53, 13.53, 13.57, 13.36],
    ['2023/05/11', 13.36, 13.39, 13.49, 13.26],
    ['2023/05/12', 13.57, 13.39, 13.7, 13.38],
    ['2023/05/15', 13.46, 13.58, 13.75, 13.41],
    ['2023/05/16', 13.55, 13.63, 13.97, 13.49],
    ['2023/05/17', 13.81, 13.68, 13.84, 13.51],
    ['2023/05/18', 13.66, 13.75, 13.78, 13.56],
    ['2023/05/19', 13.76, 13.46, 13.92, 13.34],
    ['2023/05/22', 13.38, 13.0, 13.45, 12.77],
    ['2023/05/23', 13.14, 13.48, 13.51, 13.14],
    ['2023/05/24', 13.19, 13.05, 13.21, 12.99],
    ['2023/05/25', 13.13, 13.46, 13.48, 13.12],
    ['2023/05/26', 13.52, 13.52, 13.61, 13.39],
    ['2023/05/30', 13.43, 13.14, 13.54, 13.13],
    ['2023/05/31', 13.23, 13.26, 13.37, 13.16],
    ['2023/06/01', 13.7, 13.52, 13.84, 13.47],
    ['2023/06/02', 13.9, 13.41, 13.92, 13.31],
    ['2023/06/05', 13.41, 13.29, 13.45, 13.17],
    ['2023/06/06', 13.39, 13.47, 13.67, 13.35],
    ['2023/06/07', 13.4, 13.28, 13.4, 13.2],
    ['2023/06/08', 13.21, 13.2, 13.3, 13.15],
    ['2023/06/09', 13.23, 13.15, 13.29, 13.08],
    ['2023/06/12', 13.14, 13.03, 13.2, 12.99],
    ['2023/06/13', 13.26, 13.05, 13.38, 13.01],
    ['2023/06/14', 12.91, 12.74, 13.24, 12.61],
    ['2023/06/15', 12.59, 12.67, 12.69, 12.37],
    ['2023/06/16', 12.75, 12.67, 12.94, 12.56],
    ['2023/06/20', 12.68, 12.94, 12.97, 12.6],
    ['2023/06/21', 12.94, 12.66, 12.98, 12.55],
    ['2023/06/22', 12.71, 12.68, 12.73, 12.55],
    ['2023/06/23', 12.58, 12.35, 12.58, 12.2],
    ['2023/06/26', 12.38, 12.19, 12.47, 12.12],
    ['2023/06/27', 11.98, 12.16, 12.25, 11.9],
    ['2023/06/28', 11.86, 11.91, 12.07, 11.79],
    ['2023/06/29', 11.79, 12.01, 12.08, 11.78],
    ['2023/06/30', 12.09, 12.18, 12.38, 12.07],
    ['2023/07/03', 12.22, 12.38, 12.5, 12.21],
    ['2023/07/05', 12.25, 12.36, 12.55, 12.25],
    ['2023/07/06', 12.12, 12.12, 12.2, 12.01],
    ['2023/07/07', 12.13, 12.24, 12.31, 12.0],
    ['2023/07/10', 12.22, 12.14, 12.3, 12.1],
    ['2023/07/11', 12.11, 12.02, 12.25, 11.94],
    ['2023/07/12', 11.98, 12.05, 12.14, 11.83],
    ['2023/07/13', 12.21, 12.17, 12.55, 12.09],
    ['2023/07/14', 12.16, 11.95, 12.16, 11.9],
    ['2023/07/17', 11.99, 12.34, 12.37, 11.95],
    ['2023/07/18', 12.39, 12.23, 12.39, 12.18],
    ['2023/07/19', 12.34, 12.25, 12.6, 12.13],
    ['2023/07/20', 12.26, 12.6, 12.84, 12.15],
    ['2023/07/21', 12.59, 12.54, 12.67, 12.43],
    ['2023/07/24', 12.66, 12.79, 12.88, 12.58],
    ['2023/07/25', 12.89, 13.01, 13.11, 12.86],
    ['2023/07/26', 13.33, 13.38, 13.48, 13.09],
    ['2023/07/27', 13.44, 13.14, 13.44, 13.06],
    ['2023/07/28', 13.22, 13.58, 13.7, 13.22],
    ['2023/07/31', 13.58, 13.48, 13.74, 13.32],
    ['2023/08/01', 13.04, 13.89, 13.95, 13.03],
    ['2023/08/02', 13.6, 13.53, 13.64, 13.47],
]);
var volumes = [
    173200.0,
    68300.0,
    185500.0,
    268000.0,
    58600.0,
    126600.0,
    159300.0,
    141100.0,
    170900.0,
    120200.0,
    147900.0,
    177200.0,
    206400.0,
    57100.0,
    91900.0,
    64200.0,
    128500.0,
    143400.0,
    50600.0,
    154300.0,
    90400.0,
    194500.0,
    55100.0,
    170700.0,
    125100.0,
    286100.0,
    228200.0,
    162800.0,
    216400.0,
    230700.0,
    377600.0,
    84800.0,
    83800.0,
    555900.0,
    163100.0,
    115800.0,
    168300.0,
    212100.0,
    235400.0,
    352600.0,
    171700.0,
    231300.0,
    297400.0,
    541500.0,
    299200.0,
    447100.0,
    318100.0,
    226600.0,
    455600.0,
    828300.0,
    536800.0,
    119400.0,
    158800.0,
    319600.0,
    124200.0,
    123800.0,
    68500.0,
    73300.0,
    45300.0,
    154800.0,
    107100.0,
    114300.0,
    119900.0,
    163600.0,
    116900.0,
    147200.0,
    154300.0,
    150000.0,
    160100.0,
    102600.0,
    247500.0,
    216100.0,
    273200.0,
    133500.0,
    82800.0,
    143400.0,
    105900.0,
    99400.0,
    131900.0,
    113600.0,
    59500.0,
    115700.0,
    118000.0,
    178100.0,
    134500.0,
    151000.0,
    80100.0,
    66000.0,
    121900.0,
    103300.0,
    80700.0,
    217400.0,
    157800.0,
    142000.0,
    159300.0,
    323200.0,
    466200.0,
    246500.0,
    329200.0,
    106400.0,
    437900.0,
    343000.0,
    136100.0,
    186900.0,
    200900.0,
    131100.0,
    71600.0,
    74000.0,
    152400.0,
    300200.0,
    229000.0,
    193600.0,
    156600.0,
    175200.0,
    119600.0,
    170600.0,
    83400.0,
    92100.0,
    264000.0,
    283700.0,
    297400.0,
    272900.0,
    128200.0,
    152800.0,
    188300.0,
    271000.0,
    223100.0,
    325700.0,
    328500.0,
    451100.0,
    386100.0,
    191000.0,
    248900.0,
    275300.0,
    375900.0,
    262100.0,
    185300.0,
    182000.0,
    193200.0,
    221900.0,
    120200.0,
    215500.0,
    887700.0,
    1332600.0,
    402200.0,
    1341200.0,
    193800.0,
    493900.0,
    500300.0,
    295200.0,
    296000.0,
    343100.0,
    395500.0,
    178800.0,
    491000.0,
    3574500.0,
    899300.0,
    607800.0,
    857700.0,
    773900.0,
    436400.0,
    348500.0,
    282100.0,
    821500.0,
    300300.0,
    367700.0,
    16396800.0,
    5108600.0,
    2636700.0,
    1156800.0,
    2241800.0,
    1144300.0,
    917300.0,
    1076000.0,
    533300.0,
    657800.0,
    882500.0,
    589500.0,
    511200.0,
    939100.0,
    305700.0,
    241800.0,
    550400.0,
    523100.0,
    325800.0,
    447100.0,
    283800.0,
    333700.0,
    774600.0,
    989400.0,
    597500.0,
    552500.0,
    601400.0,
    724100.0,
    462500.0,
    538400.0,
    679800.0,
    770500.0,
    465900.0,
    505600.0,
    511700.0,
    1314200.0,
    643000.0,
    549100.0,
    480800.0,
    306500.0,
    349800.0,
    331300.0,
    770500.0,
    554900.0,
    397000.0,
    567900.0,
    339500.0,
    304100.0,
    360000.0,
    345400.0,
    551100.0,
    919600.0,
    725000.0,
    845800.0,
    1080400.0,
    419400.0,
    524000.0,
    580900.0,
    440800.0,
    603800.0,
    523900.0,
    516800.0,
    470700.0,
    244800.0,
    590500.0,
    345100.0,
    270800.0,
    221100.0,
    423700.0,
    441900.0,
    817500.0,
    247300.0,
    324300.0,
    287000.0,
    546900.0,
    572500.0,
    358500.0,
    411800.0,
    431900.0,
    592600.0,
    884000.0,
    667000.0,
    728900.0,
    858100.0,
    695400.0,
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
        text: "BUR",
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