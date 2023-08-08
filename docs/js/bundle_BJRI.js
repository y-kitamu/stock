/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_BJRI");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/09', 24.87, 24.15, 25.03, 23.98],
    ['2022/08/10', 24.83, 25.37, 25.54, 24.83],
    ['2022/08/11', 25.69, 25.62, 26.15, 25.47],
    ['2022/08/12', 25.82, 26.63, 26.67, 25.77],
    ['2022/08/15', 26.35, 27.36, 27.92, 26.35],
    ['2022/08/16', 27.32, 28.25, 28.41, 27.02],
    ['2022/08/17', 27.48, 28.1, 28.37, 27.4],
    ['2022/08/18', 28.21, 28.0, 28.27, 27.58],
    ['2022/08/19', 27.41, 26.67, 27.54, 26.36],
    ['2022/08/22', 25.57, 25.99, 26.35, 25.57],
    ['2022/08/23', 26.4, 26.35, 26.83, 25.93],
    ['2022/08/24', 25.96, 27.12, 27.46, 25.96],
    ['2022/08/25', 27.25, 27.34, 27.87, 26.7],
    ['2022/08/26', 27.38, 25.87, 27.4, 25.86],
    ['2022/08/29', 25.52, 25.79, 26.01, 25.12],
    ['2022/08/30', 26.31, 25.17, 26.32, 25.16],
    ['2022/08/31', 25.38, 25.08, 25.55, 24.67],
    ['2022/09/01', 24.86, 25.74, 25.76, 24.68],
    ['2022/09/02', 26.11, 25.43, 26.11, 25.24],
    ['2022/09/06', 25.45, 24.73, 25.6, 23.44],
    ['2022/09/07', 24.87, 26.16, 26.35, 24.77],
    ['2022/09/08', 25.82, 26.57, 26.72, 25.58],
    ['2022/09/09', 26.88, 27.08, 27.37, 26.72],
    ['2022/09/12', 27.4, 27.79, 27.89, 27.22],
    ['2022/09/13', 26.98, 26.72, 27.41, 26.53],
    ['2022/09/14', 26.74, 27.58, 27.65, 26.2],
    ['2022/09/15', 27.43, 28.22, 28.87, 27.43],
    ['2022/09/16', 27.59, 28.31, 28.42, 26.94],
    ['2022/09/19', 27.8, 27.99, 28.57, 27.56],
    ['2022/09/20', 27.76, 26.21, 27.76, 25.92],
    ['2022/09/21', 26.23, 26.48, 27.27, 25.99],
    ['2022/09/22', 26.3, 24.89, 26.3, 24.02],
    ['2022/09/23', 24.69, 23.89, 24.95, 23.27],
    ['2022/09/26', 23.71, 23.79, 24.35, 23.36],
    ['2022/09/27', 24.23, 23.68, 24.98, 23.6],
    ['2022/09/28', 23.76, 24.37, 24.6, 23.48],
    ['2022/09/29', 23.99, 23.91, 24.02, 23.01],
    ['2022/09/30', 23.73, 23.85, 24.28, 23.0],
    ['2022/10/03', 24.12, 23.38, 24.12, 22.93],
    ['2022/10/04', 23.94, 25.81, 25.82, 23.94],
    ['2022/10/05', 25.08, 26.44, 26.5, 25.08],
    ['2022/10/06', 26.45, 26.08, 27.42, 26.02],
    ['2022/10/07', 25.68, 25.15, 25.78, 24.66],
    ['2022/10/10', 25.17, 24.41, 25.35, 24.29],
    ['2022/10/11', 24.38, 25.44, 25.56, 23.55],
    ['2022/10/12', 25.36, 26.58, 26.78, 25.29],
    ['2022/10/13', 26.03, 26.7, 26.83, 25.55],
    ['2022/10/14', 26.98, 26.14, 27.26, 26.08],
    ['2022/10/17', 26.76, 27.18, 27.26, 26.59],
    ['2022/10/18', 27.8, 27.7, 28.2, 27.06],
    ['2022/10/19', 27.22, 27.55, 27.85, 26.93],
    ['2022/10/20', 27.36, 26.88, 28.01, 26.67],
    ['2022/10/21', 28.68, 28.1, 29.13, 27.23],
    ['2022/10/24', 28.6, 28.43, 29.82, 28.13],
    ['2022/10/25', 28.3, 28.53, 28.75, 27.75],
    ['2022/10/26', 28.54, 28.21, 29.55, 28.18],
    ['2022/10/27', 28.49, 30.22, 30.62, 28.45],
    ['2022/10/28', 30.37, 32.59, 32.69, 29.8],
    ['2022/10/31', 32.59, 32.85, 33.28, 32.13],
    ['2022/11/01', 33.22, 31.17, 33.4, 30.9],
    ['2022/11/02', 31.42, 30.77, 32.18, 30.54],
    ['2022/11/03', 30.51, 30.87, 31.12, 30.0],
    ['2022/11/04', 31.31, 31.25, 31.49, 30.49],
    ['2022/11/07', 31.17, 30.65, 31.44, 29.69],
    ['2022/11/08', 30.96, 31.11, 31.69, 30.65],
    ['2022/11/09', 30.79, 29.35, 30.79, 29.23],
    ['2022/11/10', 30.7, 32.46, 32.55, 30.7],
    ['2022/11/11', 32.36, 31.75, 32.65, 31.72],
    ['2022/11/14', 31.59, 31.91, 32.36, 31.17],
    ['2022/11/15', 32.68, 32.06, 33.28, 31.71],
    ['2022/11/16', 31.52, 32.62, 32.7, 31.01],
    ['2022/11/17', 31.92, 32.76, 33.59, 31.92],
    ['2022/11/18', 33.26, 32.2, 33.68, 32.01],
    ['2022/11/21', 32.12, 31.55, 32.23, 31.33],
    ['2022/11/22', 31.74, 32.32, 32.49, 31.21],
    ['2022/11/23', 32.18, 31.91, 32.65, 31.74],
    ['2022/11/25', 31.97, 32.06, 32.55, 31.89],
    ['2022/11/28', 31.84, 31.4, 32.12, 31.36],
    ['2022/11/29', 31.25, 31.07, 31.3, 30.33],
    ['2022/11/30', 31.29, 32.08, 32.13, 30.62],
    ['2022/12/01', 32.32, 32.41, 32.53, 31.73],
    ['2022/12/02', 31.68, 31.64, 31.88, 31.06],
    ['2022/12/05', 31.36, 30.24, 31.36, 30.09],
    ['2022/12/06', 30.24, 29.71, 30.63, 29.53],
    ['2022/12/07', 29.56, 28.92, 29.84, 28.74],
    ['2022/12/08', 29.23, 30.09, 30.17, 29.12],
    ['2022/12/09', 29.96, 29.74, 30.81, 29.58],
    ['2022/12/12', 29.52, 29.52, 29.65, 28.88],
    ['2022/12/13', 30.77, 29.4, 30.77, 29.16],
    ['2022/12/14', 29.31, 29.65, 30.0, 29.03],
    ['2022/12/15', 29.21, 29.41, 29.68, 28.94],
    ['2022/12/16', 29.06, 28.28, 29.06, 27.63],
    ['2022/12/19', 28.26, 27.15, 28.26, 27.03],
    ['2022/12/20', 27.54, 27.44, 28.54, 27.04],
    ['2022/12/21', 27.74, 27.37, 27.87, 27.16],
    ['2022/12/22', 27.15, 27.44, 27.48, 26.48],
    ['2022/12/23', 27.41, 27.75, 28.08, 26.88],
    ['2022/12/27', 27.89, 27.15, 28.0, 27.05],
    ['2022/12/28', 27.14, 26.41, 27.14, 26.1],
    ['2022/12/29', 26.73, 26.81, 27.2, 26.73],
    ['2022/12/30', 26.69, 26.38, 26.82, 26.32],
    ['2023/01/03', 26.7, 26.85, 27.08, 26.21],
    ['2023/01/04', 27.16, 27.86, 28.15, 26.98],
    ['2023/01/05', 27.95, 27.31, 28.0, 27.14],
    ['2023/01/06', 27.5, 27.94, 28.15, 27.18],
    ['2023/01/09', 28.13, 29.12, 29.13, 28.01],
    ['2023/01/10', 29.0, 30.68, 30.7, 28.56],
    ['2023/01/11', 30.85, 30.62, 31.93, 30.52],
    ['2023/01/12', 30.82, 30.63, 31.54, 30.41],
    ['2023/01/13', 30.27, 31.34, 31.47, 30.09],
    ['2023/01/17', 31.25, 31.6, 31.71, 31.17],
    ['2023/01/18', 31.34, 31.23, 31.77, 30.76],
    ['2023/01/19', 31.05, 30.68, 31.05, 30.09],
    ['2023/01/20', 31.01, 32.17, 32.66, 30.48],
    ['2023/01/23', 32.07, 32.19, 32.59, 32.01],
    ['2023/01/24', 31.75, 30.58, 32.06, 30.49],
    ['2023/01/25', 30.34, 31.25, 31.36, 30.06],
    ['2023/01/26', 31.48, 31.56, 31.81, 31.06],
    ['2023/01/27', 31.59, 31.2, 31.77, 31.19],
    ['2023/01/30', 30.98, 31.01, 31.48, 30.86],
    ['2023/01/31', 31.07, 31.57, 32.17, 31.06],
    ['2023/02/01', 31.51, 31.33, 31.75, 30.1],
    ['2023/02/02', 31.56, 33.17, 33.59, 31.47],
    ['2023/02/03', 33.06, 32.79, 33.37, 32.49],
    ['2023/02/06', 32.75, 33.59, 33.95, 32.25],
    ['2023/02/07', 33.36, 34.16, 34.28, 33.23],
    ['2023/02/08', 33.99, 33.9, 34.18, 33.35],
    ['2023/02/09', 34.32, 33.22, 34.49, 32.88],
    ['2023/02/10', 32.99, 32.48, 33.31, 31.94],
    ['2023/02/13', 32.4, 32.1, 32.81, 31.06],
    ['2023/02/14', 32.2, 33.29, 33.36, 31.65],
    ['2023/02/15', 33.21, 33.85, 34.09, 32.8],
    ['2023/02/16', 33.36, 34.58, 35.5, 33.36],
    ['2023/02/17', 33.9, 33.66, 33.9, 32.15],
    ['2023/02/21', 33.25, 34.33, 34.89, 33.2],
    ['2023/02/22', 34.38, 35.8, 35.85, 33.78],
    ['2023/02/23', 35.94, 35.07, 36.14, 34.4],
    ['2023/02/24', 34.6, 33.61, 35.17, 33.42],
    ['2023/02/27', 33.76, 32.83, 34.3, 32.78],
    ['2023/02/28', 32.79, 32.0, 33.12, 31.95],
    ['2023/03/01', 32.0, 32.19, 32.84, 31.76],
    ['2023/03/02', 31.72, 32.82, 33.16, 31.54],
    ['2023/03/03', 32.95, 32.31, 33.55, 32.05],
    ['2023/03/06', 32.44, 32.08, 32.47, 31.44],
    ['2023/03/07', 32.21, 31.69, 32.74, 31.62],
    ['2023/03/08', 31.74, 31.36, 31.74, 30.97],
    ['2023/03/09', 31.38, 30.19, 31.94, 30.17],
    ['2023/03/10', 30.28, 29.47, 31.14, 29.1],
    ['2023/03/13', 28.79, 28.61, 28.85, 27.32],
    ['2023/03/14', 29.54, 28.82, 29.64, 28.54],
    ['2023/03/15', 28.31, 29.45, 29.52, 28.09],
    ['2023/03/16', 28.98, 30.3, 30.38, 28.64],
    ['2023/03/17', 29.89, 29.52, 30.01, 29.12],
    ['2023/03/20', 29.57, 29.53, 30.57, 29.19],
    ['2023/03/21', 29.77, 29.52, 30.4, 29.46],
    ['2023/03/22', 29.51, 29.09, 30.06, 29.08],
    ['2023/03/23', 29.29, 28.6, 29.31, 28.03],
    ['2023/03/24', 28.45, 28.58, 29.14, 28.09],
    ['2023/03/27', 28.89, 28.55, 29.1, 28.48],
    ['2023/03/28', 28.38, 29.24, 29.37, 28.35],
    ['2023/03/29', 29.53, 29.57, 29.59, 28.83],
    ['2023/03/30', 29.71, 29.4, 29.87, 29.09],
    ['2023/03/31', 29.68, 29.14, 29.91, 28.88],
    ['2023/04/03', 29.11, 28.92, 29.55, 28.68],
    ['2023/04/04', 28.92, 28.65, 28.96, 28.12],
    ['2023/04/05', 28.59, 28.64, 28.67, 28.13],
    ['2023/04/06', 28.65, 28.35, 28.65, 28.1],
    ['2023/04/10', 28.2, 29.04, 29.4, 28.2],
    ['2023/04/11', 29.1, 29.16, 29.53, 28.6],
    ['2023/04/12', 29.44, 27.9, 29.68, 27.86],
    ['2023/04/13', 28.06, 27.92, 28.43, 27.66],
    ['2023/04/14', 27.94, 27.74, 28.68, 27.42],
    ['2023/04/17', 27.88, 27.7, 28.04, 27.18],
    ['2023/04/18', 28.94, 28.63, 29.42, 28.42],
    ['2023/04/19', 28.43, 28.69, 28.82, 28.16],
    ['2023/04/20', 28.43, 29.16, 29.62, 28.41],
    ['2023/04/21', 29.32, 31.34, 31.72, 29.32],
    ['2023/04/24', 31.03, 29.4, 31.12, 28.98],
    ['2023/04/25', 29.01, 28.52, 29.16, 28.5],
    ['2023/04/26', 28.39, 28.37, 28.85, 28.21],
    ['2023/04/27', 28.59, 28.9, 28.96, 28.36],
    ['2023/04/28', 31.0, 32.54, 32.58, 29.78],
    ['2023/05/01', 32.54, 32.21, 33.68, 32.11],
    ['2023/05/02', 32.1, 32.1, 32.22, 31.32],
    ['2023/05/03', 32.28, 31.71, 32.31, 31.42],
    ['2023/05/04', 31.34, 31.41, 31.94, 30.37],
    ['2023/05/05', 31.91, 30.86, 32.11, 30.53],
    ['2023/05/08', 30.95, 29.97, 31.07, 29.85],
    ['2023/05/09', 29.92, 30.95, 31.16, 29.62],
    ['2023/05/10', 31.37, 30.65, 31.43, 30.22],
    ['2023/05/11', 30.54, 30.0, 30.65, 29.92],
    ['2023/05/12', 30.11, 29.92, 30.34, 29.55],
    ['2023/05/15', 29.92, 30.4, 30.48, 29.82],
    ['2023/05/16', 30.33, 30.46, 30.52, 29.9],
    ['2023/05/17', 30.75, 32.57, 32.67, 30.75],
    ['2023/05/18', 32.55, 33.39, 33.46, 32.37],
    ['2023/05/19', 33.7, 32.34, 33.7, 32.01],
    ['2023/05/22', 32.33, 30.98, 32.52, 30.9],
    ['2023/05/23', 30.82, 30.85, 31.6, 30.73],
    ['2023/05/24', 30.8, 31.72, 31.73, 30.49],
    ['2023/05/25', 31.7, 31.62, 31.77, 31.32],
    ['2023/05/26', 31.39, 30.99, 31.66, 30.7],
    ['2023/05/30', 31.21, 29.85, 31.46, 29.61],
    ['2023/05/31', 29.81, 29.78, 30.08, 29.28],
    ['2023/06/01', 29.75, 30.22, 30.35, 29.57],
    ['2023/06/02', 30.61, 31.65, 31.77, 30.37],
    ['2023/06/05', 31.34, 30.49, 31.34, 30.3],
    ['2023/06/06', 30.33, 30.76, 31.15, 30.11],
    ['2023/06/07', 31.05, 32.64, 32.79, 30.85],
    ['2023/06/08', 32.36, 31.89, 32.46, 31.75],
    ['2023/06/09', 31.85, 31.36, 32.0, 31.19],
    ['2023/06/12', 31.56, 31.27, 31.88, 31.24],
    ['2023/06/13', 31.4, 32.03, 32.54, 31.34],
    ['2023/06/14', 32.17, 31.68, 32.19, 31.11],
    ['2023/06/15', 31.58, 31.56, 32.31, 31.23],
    ['2023/06/16', 31.97, 30.64, 31.97, 30.49],
    ['2023/06/20', 30.6, 30.4, 30.75, 30.18],
    ['2023/06/21', 30.27, 31.03, 31.1, 30.19],
    ['2023/06/22', 30.98, 31.07, 31.32, 30.25],
    ['2023/06/23', 30.71, 30.37, 31.45, 30.02],
    ['2023/06/26', 30.7, 30.72, 31.42, 30.43],
    ['2023/06/27', 30.8, 31.24, 31.42, 30.25],
    ['2023/06/28', 31.29, 30.72, 31.34, 30.51],
    ['2023/06/29', 30.78, 31.43, 31.7, 30.78],
    ['2023/06/30', 31.64, 31.8, 32.28, 31.56],
    ['2023/07/03', 31.8, 32.43, 32.62, 31.8],
    ['2023/07/05', 32.3, 30.98, 32.3, 30.72],
    ['2023/07/06', 30.61, 30.62, 30.81, 30.04],
    ['2023/07/07', 30.74, 30.84, 31.24, 30.58],
    ['2023/07/10', 30.88, 31.81, 31.81, 30.88],
    ['2023/07/11', 31.98, 31.93, 32.33, 31.68],
    ['2023/07/12', 32.95, 34.33, 35.74, 32.52],
    ['2023/07/13', 34.38, 34.39, 34.8, 33.99],
    ['2023/07/14', 34.41, 34.26, 34.67, 33.92],
    ['2023/07/17', 34.35, 34.34, 34.91, 34.25],
    ['2023/07/18', 34.34, 35.05, 35.14, 34.03],
    ['2023/07/19', 35.19, 35.46, 35.66, 34.8],
    ['2023/07/20', 35.67, 35.23, 35.84, 35.18],
    ['2023/07/21', 35.54, 33.81, 35.54, 33.74],
    ['2023/07/24', 33.75, 33.76, 34.09, 33.33],
    ['2023/07/25', 33.6, 33.34, 33.6, 32.79],
    ['2023/07/26', 33.29, 33.58, 33.92, 32.95],
    ['2023/07/27', 33.69, 33.34, 33.95, 33.18],
    ['2023/07/28', 35.99, 36.46, 37.35, 35.53],
    ['2023/07/31', 36.66, 37.66, 37.83, 36.45],
    ['2023/08/01', 37.53, 36.58, 37.53, 36.12],
    ['2023/08/02', 36.44, 36.35, 36.75, 35.97],
    ['2023/08/03', 36.11, 36.23, 36.36, 35.75],
    ['2023/08/04', 36.47, 36.28, 36.72, 35.94],
    ['2023/08/07', 36.31, 35.89, 36.87, 35.76],
]);
var volumes = [
    308400.0,
    333900.0,
    321300.0,
    373800.0,
    543900.0,
    413000.0,
    382000.0,
    256900.0,
    231800.0,
    375800.0,
    315500.0,
    489100.0,
    280100.0,
    302300.0,
    317100.0,
    226800.0,
    221700.0,
    225100.0,
    263700.0,
    435400.0,
    363800.0,
    333000.0,
    314100.0,
    356500.0,
    242900.0,
    407600.0,
    291100.0,
    482500.0,
    406800.0,
    363900.0,
    350800.0,
    484800.0,
    356100.0,
    316700.0,
    360800.0,
    311800.0,
    298400.0,
    349300.0,
    335900.0,
    338300.0,
    385500.0,
    275900.0,
    213000.0,
    275700.0,
    322000.0,
    267200.0,
    326900.0,
    189600.0,
    192500.0,
    219200.0,
    263000.0,
    573400.0,
    765100.0,
    803700.0,
    494900.0,
    336000.0,
    604200.0,
    699400.0,
    546300.0,
    463700.0,
    272500.0,
    270700.0,
    222400.0,
    264400.0,
    272400.0,
    334200.0,
    278800.0,
    205300.0,
    229000.0,
    156000.0,
    230700.0,
    295500.0,
    203500.0,
    175500.0,
    228800.0,
    156300.0,
    106700.0,
    129400.0,
    153900.0,
    300300.0,
    250600.0,
    224300.0,
    211600.0,
    173400.0,
    273800.0,
    401600.0,
    221000.0,
    259200.0,
    287800.0,
    244300.0,
    255100.0,
    481000.0,
    283700.0,
    233800.0,
    177100.0,
    165700.0,
    142000.0,
    157300.0,
    211300.0,
    137600.0,
    195400.0,
    339300.0,
    296900.0,
    311400.0,
    288700.0,
    307600.0,
    228200.0,
    379400.0,
    190000.0,
    187300.0,
    216000.0,
    182100.0,
    157800.0,
    272500.0,
    189700.0,
    317100.0,
    282600.0,
    239900.0,
    163200.0,
    251600.0,
    271700.0,
    298900.0,
    276600.0,
    340000.0,
    363500.0,
    207500.0,
    264100.0,
    217200.0,
    186200.0,
    370700.0,
    382500.0,
    244300.0,
    608000.0,
    707200.0,
    629200.0,
    622200.0,
    436200.0,
    286000.0,
    334900.0,
    402000.0,
    328300.0,
    213500.0,
    346100.0,
    334200.0,
    274200.0,
    214800.0,
    223400.0,
    247500.0,
    375000.0,
    335300.0,
    296700.0,
    310200.0,
    533000.0,
    248400.0,
    220600.0,
    243600.0,
    326600.0,
    252400.0,
    428600.0,
    192900.0,
    137900.0,
    230200.0,
    377600.0,
    284100.0,
    275700.0,
    191300.0,
    114500.0,
    163800.0,
    181900.0,
    157900.0,
    164400.0,
    167100.0,
    216900.0,
    590600.0,
    257900.0,
    385100.0,
    723400.0,
    567900.0,
    382700.0,
    328900.0,
    307100.0,
    1033700.0,
    468700.0,
    313200.0,
    522100.0,
    507800.0,
    422100.0,
    323000.0,
    393700.0,
    255300.0,
    474100.0,
    238400.0,
    231600.0,
    198300.0,
    359600.0,
    364900.0,
    509700.0,
    306400.0,
    165800.0,
    246600.0,
    240900.0,
    198000.0,
    233500.0,
    236100.0,
    199300.0,
    243600.0,
    223700.0,
    293700.0,
    382700.0,
    168500.0,
    160100.0,
    237400.0,
    331000.0,
    344300.0,
    237900.0,
    467600.0,
    247300.0,
    359200.0,
    340200.0,
    810800.0,
    215900.0,
    241400.0,
    207700.0,
    276900.0,
    241500.0,
    96300.0,
    298200.0,
    173400.0,
    191400.0,
    221400.0,
    153500.0,
    546700.0,
    328700.0,
    346100.0,
    324600.0,
    313400.0,
    330100.0,
    228000.0,
    342500.0,
    314300.0,
    288900.0,
    211600.0,
    224700.0,
    717200.0,
    479500.0,
    372500.0,
    348200.0,
    285500.0,
    190200.0,
    234300.0,
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
     *     text: "BJRI",
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