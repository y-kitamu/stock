/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_BVH");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/03', 24.48, 23.17, 24.48, 22.96],
    ['2022/08/04', 22.92, 23.36, 23.48, 22.81],
    ['2022/08/05', 22.75, 23.06, 23.49, 22.55],
    ['2022/08/08', 23.43, 23.42, 23.85, 23.1],
    ['2022/08/09', 23.35, 23.36, 23.41, 23.02],
    ['2022/08/10', 23.89, 23.49, 24.1, 23.19],
    ['2022/08/11', 23.85, 23.16, 23.86, 22.97],
    ['2022/08/12', 23.45, 23.18, 23.45, 22.64],
    ['2022/08/15', 22.98, 23.0, 23.39, 22.47],
    ['2022/08/16', 22.83, 23.03, 23.18, 22.72],
    ['2022/08/17', 22.71, 22.78, 23.09, 22.47],
    ['2022/08/18', 22.71, 23.45, 23.49, 22.42],
    ['2022/08/19', 23.2, 23.04, 23.53, 22.81],
    ['2022/08/22', 22.77, 22.66, 22.98, 22.55],
    ['2022/08/23', 22.54, 22.77, 22.99, 22.54],
    ['2022/08/24', 22.69, 22.61, 22.84, 22.58],
    ['2022/08/25', 22.67, 22.83, 23.15, 22.57],
    ['2022/08/26', 22.89, 21.82, 22.99, 21.82],
    ['2022/08/29', 21.8, 21.51, 21.82, 21.44],
    ['2022/08/30', 21.7, 20.97, 21.7, 20.95],
    ['2022/08/31', 20.95, 20.45, 20.96, 20.42],
    ['2022/09/01', 20.44, 20.11, 20.44, 19.38],
    ['2022/09/02', 20.36, 19.6, 20.36, 19.48],
    ['2022/09/06', 19.73, 19.48, 19.9, 18.93],
    ['2022/09/07', 19.48, 19.53, 19.54, 18.76],
    ['2022/09/08', 19.42, 19.34, 19.67, 19.14],
    ['2022/09/09', 19.34, 19.95, 20.16, 19.15],
    ['2022/09/12', 20.08, 20.31, 20.53, 20.08],
    ['2022/09/13', 19.95, 18.79, 19.95, 18.69],
    ['2022/09/14', 18.79, 18.68, 18.84, 18.12],
    ['2022/09/15', 18.67, 18.83, 19.45, 18.67],
    ['2022/09/16', 18.83, 18.68, 18.95, 18.29],
    ['2022/09/19', 18.68, 19.0, 19.39, 18.68],
    ['2022/09/20', 18.92, 19.26, 19.36, 18.92],
    ['2022/09/21', 19.47, 18.46, 19.47, 18.42],
    ['2022/09/22', 18.35, 17.23, 18.35, 17.17],
    ['2022/09/23', 16.96, 17.18, 17.22, 16.68],
    ['2022/09/26', 17.05, 16.87, 17.52, 16.74],
    ['2022/09/27', 17.12, 16.64, 17.48, 16.42],
    ['2022/09/28', 16.64, 16.93, 17.18, 16.52],
    ['2022/09/29', 16.68, 16.4, 16.68, 16.24],
    ['2022/09/30', 16.4, 16.21, 16.77, 16.16],
    ['2022/10/03', 16.51, 16.87, 16.94, 16.21],
    ['2022/10/04', 16.93, 17.79, 18.02, 16.93],
    ['2022/10/05', 17.56, 17.76, 17.84, 17.41],
    ['2022/10/06', 17.7, 17.27, 17.88, 17.18],
    ['2022/10/07', 16.97, 16.72, 17.03, 16.58],
    ['2022/10/10', 16.86, 16.82, 16.97, 16.59],
    ['2022/10/11', 16.71, 16.89, 17.0, 16.48],
    ['2022/10/12', 17.05, 17.1, 17.21, 16.74],
    ['2022/10/13', 16.71, 17.57, 17.75, 16.71],
    ['2022/10/14', 17.65, 17.15, 17.65, 17.03],
    ['2022/10/17', 17.62, 17.59, 17.97, 17.36],
    ['2022/10/18', 17.88, 17.55, 17.94, 17.38],
    ['2022/10/19', 17.34, 17.36, 17.57, 17.26],
    ['2022/10/20', 17.21, 16.04, 17.27, 16.04],
    ['2022/10/21', 16.28, 16.57, 16.74, 16.04],
    ['2022/10/24', 16.75, 16.19, 16.75, 15.93],
    ['2022/10/25', 16.02, 16.38, 16.63, 16.02],
    ['2022/10/26', 16.42, 16.43, 16.77, 16.36],
    ['2022/10/27', 16.56, 16.43, 16.63, 16.35],
    ['2022/10/28', 16.49, 17.25, 17.36, 16.43],
    ['2022/10/31', 17.1, 16.98, 17.28, 16.85],
    ['2022/11/01', 17.14, 17.28, 17.65, 17.02],
    ['2022/11/02', 17.03, 16.73, 17.4, 16.68],
    ['2022/11/03', 19.99, 20.52, 20.87, 19.99],
    ['2022/11/04', 20.78, 20.66, 20.8, 20.33],
    ['2022/11/07', 20.5, 20.45, 20.6, 19.75],
    ['2022/11/08', 20.43, 20.52, 20.85, 20.43],
    ['2022/11/09', 20.45, 20.51, 21.2, 20.27],
    ['2022/11/10', 20.9, 21.21, 21.39, 20.63],
    ['2022/11/11', 21.42, 21.09, 21.6, 20.9],
    ['2022/11/14', 20.83, 20.6, 21.1, 20.59],
    ['2022/11/15', 20.8, 20.91, 21.12, 20.58],
    ['2022/11/16', 20.76, 20.81, 20.95, 20.62],
    ['2022/11/17', 20.59, 20.76, 20.91, 20.59],
    ['2022/11/18', 21.17, 21.0, 21.17, 20.87],
    ['2022/11/21', 20.85, 21.04, 21.13, 20.8],
    ['2022/11/22', 21.0, 21.15, 21.39, 21.0],
    ['2022/11/23', 21.13, 21.19, 21.27, 21.1],
    ['2022/11/25', 21.16, 21.15, 21.38, 21.05],
    ['2022/11/28', 21.1, 21.37, 21.5, 21.1],
    ['2022/11/29', 21.33, 21.34, 21.54, 21.25],
    ['2022/11/30', 21.4, 21.29, 21.51, 21.2],
    ['2022/12/01', 21.27, 21.51, 21.61, 20.96],
    ['2022/12/02', 21.22, 21.69, 21.77, 21.22],
    ['2022/12/05', 21.77, 21.66, 21.94, 21.45],
    ['2022/12/06', 21.55, 21.62, 21.8, 21.5],
    ['2022/12/07', 21.49, 21.63, 21.85, 21.36],
    ['2022/12/08', 21.74, 21.81, 21.84, 21.51],
    ['2022/12/09', 21.67, 21.48, 21.86, 21.36],
    ['2022/12/12', 23.84, 24.56, 24.71, 23.81],
    ['2022/12/13', 24.56, 24.19, 24.59, 24.07],
    ['2022/12/14', 24.09, 24.57, 24.58, 24.09],
    ['2022/12/15', 24.17, 24.43, 24.75, 24.16],
    ['2022/12/16', 24.12, 24.32, 24.58, 24.12],
    ['2022/12/19', 24.3, 24.38, 24.65, 24.3],
    ['2022/12/20', 24.38, 24.26, 24.41, 24.14],
    ['2022/12/21', 24.42, 23.9, 24.52, 23.82],
    ['2022/12/22', 23.94, 23.99, 24.1, 23.57],
    ['2022/12/23', 24.04, 24.35, 24.42, 23.81],
    ['2022/12/27', 24.7, 24.16, 25.55, 23.72],
    ['2022/12/28', 24.21, 23.81, 24.22, 23.58],
    ['2022/12/29', 23.96, 24.41, 24.55, 23.82],
    ['2022/12/30', 24.44, 24.66, 24.89, 24.39],
    ['2023/01/03', 24.67, 25.08, 25.49, 24.64],
    ['2023/01/04', 25.09, 25.33, 25.66, 25.06],
    ['2023/01/05', 25.22, 25.56, 25.57, 25.09],
    ['2023/01/06', 25.72, 25.58, 26.55, 25.45],
    ['2023/01/09', 25.64, 25.73, 25.9, 25.45],
    ['2023/01/10', 25.77, 26.24, 26.24, 25.61],
    ['2023/01/11', 26.26, 26.93, 26.96, 26.26],
    ['2023/01/12', 27.06, 27.44, 27.82, 26.89],
    ['2023/01/13', 27.27, 27.74, 27.8, 27.19],
    ['2023/01/17', 27.67, 28.3, 28.46, 27.59],
    ['2023/01/18', 28.31, 27.66, 28.7, 27.61],
    ['2023/01/19', 27.52, 27.95, 28.07, 27.39],
    ['2023/01/20', 28.18, 29.2, 29.26, 27.79],
    ['2023/01/23', 29.15, 29.12, 29.6, 29.03],
    ['2023/01/24', 28.84, 29.9, 30.05, 28.84],
    ['2023/01/25', 29.8, 30.48, 30.84, 29.8],
    ['2023/01/26', 30.51, 30.31, 30.64, 30.0],
    ['2023/01/27', 30.07, 30.77, 31.09, 30.07],
    ['2023/01/30', 30.64, 30.87, 31.13, 30.53],
    ['2023/01/31', 31.03, 32.06, 32.19, 30.98],
    ['2023/02/01', 32.02, 32.69, 33.09, 31.92],
    ['2023/02/02', 32.73, 33.7, 33.77, 32.6],
    ['2023/02/03', 33.5, 34.15, 34.17, 33.31],
    ['2023/02/06', 33.9, 32.4, 34.08, 32.29],
    ['2023/02/07', 32.21, 32.19, 32.43, 31.72],
    ['2023/02/08', 31.95, 31.99, 32.15, 31.53],
    ['2023/02/09', 32.01, 31.86, 32.77, 31.71],
    ['2023/02/10', 31.81, 31.83, 31.89, 31.29],
    ['2023/02/13', 31.92, 32.53, 32.59, 31.92],
    ['2023/02/14', 32.26, 32.5, 32.78, 32.26],
    ['2023/02/15', 32.19, 32.93, 32.94, 32.19],
    ['2023/02/16', 32.57, 32.67, 32.95, 32.48],
    ['2023/02/17', 32.79, 31.99, 32.79, 31.92],
    ['2023/02/21', 31.69, 31.16, 31.9, 31.15],
    ['2023/02/22', 31.29, 31.53, 31.76, 31.13],
    ['2023/02/23', 31.79, 32.51, 32.55, 31.79],
    ['2023/02/24', 32.15, 32.55, 32.85, 31.72],
    ['2023/02/27', 32.84, 33.29, 33.3, 32.52],
    ['2023/02/28', 33.11, 32.78, 33.86, 32.36],
    ['2023/03/01', 32.71, 32.14, 32.85, 31.72],
    ['2023/03/02', 31.96, 32.6, 32.65, 31.68],
    ['2023/03/03', 32.79, 32.52, 33.03, 32.23],
    ['2023/03/06', 32.64, 32.7, 33.36, 32.4],
    ['2023/03/07', 32.65, 33.74, 33.97, 32.65],
    ['2023/03/08', 33.81, 33.36, 33.94, 33.13],
    ['2023/03/09', 33.45, 32.73, 33.67, 32.65],
    ['2023/03/10', 32.53, 31.37, 32.67, 31.17],
    ['2023/03/13', 30.38, 25.33, 30.38, 23.67],
    ['2023/03/14', 26.57, 23.85, 26.69, 23.49],
    ['2023/03/15', 23.41, 25.31, 25.35, 23.21],
    ['2023/03/16', 24.88, 26.66, 26.72, 24.53],
    ['2023/03/17', 26.52, 26.16, 26.52, 25.54],
    ['2023/03/20', 26.09, 25.73, 26.09, 25.44],
    ['2023/03/21', 26.48, 26.58, 26.92, 26.13],
    ['2023/03/22', 26.51, 25.93, 26.51, 25.68],
    ['2023/03/23', 26.17, 24.85, 26.17, 24.69],
    ['2023/03/24', 24.62, 25.02, 25.22, 24.37],
    ['2023/03/27', 25.52, 25.43, 25.52, 24.83],
    ['2023/03/28', 25.21, 25.41, 25.59, 25.17],
    ['2023/03/29', 25.76, 26.31, 26.37, 25.62],
    ['2023/03/30', 26.6, 26.57, 26.8, 26.44],
    ['2023/03/31', 26.83, 27.22, 27.34, 26.83],
    ['2023/04/03', 27.32, 27.18, 27.44, 26.75],
    ['2023/04/04', 27.28, 27.34, 27.38, 26.63],
    ['2023/04/05', 27.31, 27.25, 27.31, 26.93],
    ['2023/04/06', 27.35, 27.45, 27.45, 26.81],
    ['2023/04/10', 27.46, 27.37, 28.1, 27.3],
    ['2023/04/11', 27.37, 27.39, 27.6, 26.62],
    ['2023/04/12', 27.68, 27.33, 27.98, 27.07],
    ['2023/04/13', 27.5, 28.32, 28.38, 27.15],
    ['2023/04/14', 28.5, 28.59, 29.16, 28.5],
    ['2023/04/17', 28.59, 28.54, 28.76, 28.3],
    ['2023/04/18', 28.66, 28.98, 29.1, 28.57],
    ['2023/04/19', 28.89, 29.48, 29.67, 28.83],
    ['2023/04/20', 29.3, 29.63, 29.66, 29.3],
    ['2023/04/21', 29.67, 29.45, 29.8, 29.29],
    ['2023/04/24', 29.52, 29.64, 29.7, 29.34],
    ['2023/04/25', 29.5, 28.92, 29.54, 28.82],
    ['2023/04/26', 28.79, 27.97, 29.49, 27.67],
    ['2023/04/27', 28.12, 27.98, 28.25, 27.46],
    ['2023/04/28', 27.92, 28.62, 28.7, 27.92],
    ['2023/05/01', 28.89, 29.43, 30.24, 28.89],
    ['2023/05/02', 29.32, 28.41, 29.32, 28.23],
    ['2023/05/03', 28.66, 28.25, 29.09, 28.12],
    ['2023/05/04', 28.8, 24.65, 28.8, 24.39],
    ['2023/05/05', 24.97, 26.24, 26.51, 24.97],
    ['2023/05/08', 26.35, 25.63, 26.35, 25.35],
    ['2023/05/09', 25.59, 25.53, 26.21, 25.25],
    ['2023/05/10', 26.0, 25.51, 26.0, 24.95],
    ['2023/05/11', 25.27, 25.46, 25.73, 25.12],
    ['2023/05/12', 25.36, 25.27, 25.6, 24.97],
    ['2023/05/15', 25.25, 26.0, 26.3, 25.25],
    ['2023/05/16', 26.49, 27.53, 27.62, 26.49],
    ['2023/05/17', 27.75, 28.33, 28.46, 27.69],
    ['2023/05/18', 28.33, 29.02, 29.24, 28.33],
    ['2023/05/19', 29.34, 29.19, 29.34, 28.83],
    ['2023/05/22', 29.46, 30.07, 30.22, 29.39],
    ['2023/05/23', 30.23, 29.83, 30.52, 29.63],
    ['2023/05/24', 29.47, 29.57, 29.82, 29.28],
    ['2023/05/25', 29.72, 29.52, 29.85, 29.12],
    ['2023/05/26', 29.36, 30.09, 30.11, 29.26],
    ['2023/05/30', 30.09, 29.16, 30.11, 28.92],
    ['2023/05/31', 29.01, 28.41, 29.04, 27.84],
    ['2023/06/01', 28.41, 29.69, 29.9, 28.12],
    ['2023/06/02', 30.16, 32.18, 32.21, 30.16],
    ['2023/06/05', 31.9, 31.84, 32.11, 31.08],
    ['2023/06/06', 31.52, 33.5, 33.55, 31.52],
    ['2023/06/07', 33.64, 34.67, 35.0, 33.64],
    ['2023/06/08', 34.36, 33.23, 34.61, 32.78],
    ['2023/06/09', 33.08, 33.34, 33.89, 32.84],
    ['2023/06/12', 33.58, 34.02, 34.02, 33.48],
    ['2023/06/13', 34.13, 34.4, 34.76, 33.58],
    ['2023/06/14', 34.61, 34.18, 34.96, 33.93],
    ['2023/06/15', 34.12, 33.69, 34.12, 33.48],
    ['2023/06/16', 34.01, 34.16, 34.27, 33.43],
    ['2023/06/20', 34.32, 34.29, 34.84, 33.71],
    ['2023/06/21', 34.03, 34.43, 34.93, 34.03],
    ['2023/06/22', 34.43, 33.92, 34.49, 33.73],
    ['2023/06/23', 33.14, 33.15, 33.72, 32.42],
    ['2023/06/26', 32.98, 33.25, 33.89, 32.77],
    ['2023/06/27', 33.43, 33.86, 34.28, 33.33],
    ['2023/06/28', 33.79, 33.78, 33.93, 33.46],
    ['2023/06/29', 33.93, 34.94, 34.96, 33.86],
    ['2023/06/30', 35.0, 35.65, 35.94, 34.64],
    ['2023/07/03', 35.74, 35.83, 36.06, 35.54],
    ['2023/07/05', 35.49, 35.35, 35.78, 35.14],
    ['2023/07/06', 34.67, 35.47, 35.52, 34.41],
    ['2023/07/07', 35.58, 37.35, 37.41, 35.58],
    ['2023/07/10', 37.3, 37.73, 38.12, 37.3],
    ['2023/07/11', 37.82, 37.93, 38.08, 37.56],
    ['2023/07/12', 38.61, 38.35, 39.38, 38.13],
    ['2023/07/13', 38.61, 37.78, 38.61, 37.61],
    ['2023/07/14', 37.7, 36.48, 38.59, 36.11],
    ['2023/07/17', 36.08, 37.14, 37.59, 36.08],
    ['2023/07/18', 37.33, 37.5, 37.95, 37.26],
    ['2023/07/19', 37.68, 37.01, 37.68, 36.78],
    ['2023/07/20', 37.04, 37.26, 37.27, 36.55],
    ['2023/07/21', 37.58, 37.0, 37.58, 36.78],
    ['2023/07/24', 36.82, 36.45, 36.87, 36.2],
    ['2023/07/25', 36.21, 36.49, 37.66, 36.12],
    ['2023/07/26', 36.39, 37.31, 37.38, 36.39],
    ['2023/07/27', 37.62, 37.57, 37.96, 37.23],
    ['2023/07/28', 38.0, 38.79, 38.97, 38.0],
    ['2023/07/31', 38.98, 39.09, 39.57, 37.84],
    ['2023/08/01', 38.66, 38.5, 38.84, 37.13],
    ['2023/08/02', 38.92, 38.78, 40.93, 38.69],
]);
var volumes = [
    87300.0,
    67000.0,
    35500.0,
    44800.0,
    31900.0,
    40000.0,
    45600.0,
    86800.0,
    69200.0,
    56100.0,
    38300.0,
    60700.0,
    33400.0,
    42300.0,
    21200.0,
    19600.0,
    29700.0,
    37100.0,
    40700.0,
    32400.0,
    45200.0,
    54100.0,
    50700.0,
    68300.0,
    47300.0,
    33200.0,
    46400.0,
    36000.0,
    56200.0,
    105400.0,
    105000.0,
    291400.0,
    91100.0,
    80800.0,
    44600.0,
    88300.0,
    57500.0,
    59300.0,
    55200.0,
    60100.0,
    50400.0,
    182000.0,
    75200.0,
    40400.0,
    36400.0,
    28800.0,
    42400.0,
    30500.0,
    37900.0,
    22100.0,
    24700.0,
    25300.0,
    29600.0,
    21900.0,
    28600.0,
    44200.0,
    44100.0,
    39900.0,
    31500.0,
    23800.0,
    34400.0,
    46500.0,
    48600.0,
    34600.0,
    59000.0,
    133300.0,
    98900.0,
    93700.0,
    80200.0,
    148100.0,
    95600.0,
    42700.0,
    56800.0,
    81500.0,
    77300.0,
    40600.0,
    41000.0,
    51200.0,
    68100.0,
    47600.0,
    11900.0,
    63400.0,
    52200.0,
    84500.0,
    53400.0,
    44800.0,
    174500.0,
    99900.0,
    90500.0,
    55200.0,
    233400.0,
    92600.0,
    300800.0,
    108400.0,
    70400.0,
    91900.0,
    136700.0,
    236100.0,
    176300.0,
    174700.0,
    172600.0,
    184800.0,
    203500.0,
    55800.0,
    51700.0,
    75500.0,
    53800.0,
    54100.0,
    132900.0,
    49400.0,
    38700.0,
    119600.0,
    123500.0,
    47600.0,
    69300.0,
    53000.0,
    62200.0,
    68600.0,
    59100.0,
    59200.0,
    75500.0,
    55700.0,
    56000.0,
    52200.0,
    76100.0,
    94100.0,
    71900.0,
    50800.0,
    63200.0,
    76000.0,
    61500.0,
    54300.0,
    55100.0,
    33500.0,
    31200.0,
    48800.0,
    54600.0,
    58800.0,
    79300.0,
    48100.0,
    52900.0,
    52600.0,
    70600.0,
    234700.0,
    71200.0,
    54700.0,
    82700.0,
    124400.0,
    77600.0,
    42500.0,
    68500.0,
    95800.0,
    311100.0,
    280300.0,
    192900.0,
    170600.0,
    378300.0,
    129800.0,
    112600.0,
    95700.0,
    91300.0,
    91200.0,
    43800.0,
    44800.0,
    39500.0,
    30700.0,
    68100.0,
    36100.0,
    53800.0,
    34500.0,
    42000.0,
    60900.0,
    73700.0,
    25300.0,
    54500.0,
    46900.0,
    27300.0,
    41100.0,
    37900.0,
    39800.0,
    39000.0,
    24700.0,
    40900.0,
    33600.0,
    41000.0,
    37500.0,
    44800.0,
    45600.0,
    58600.0,
    72300.0,
    64300.0,
    49300.0,
    36700.0,
    69200.0,
    42100.0,
    34500.0,
    26700.0,
    42400.0,
    43500.0,
    33400.0,
    22000.0,
    48300.0,
    60600.0,
    49800.0,
    33900.0,
    33900.0,
    42700.0,
    124900.0,
    22000.0,
    34300.0,
    30600.0,
    36900.0,
    41800.0,
    47300.0,
    36600.0,
    36200.0,
    43900.0,
    81700.0,
    72300.0,
    127700.0,
    86900.0,
    69500.0,
    31500.0,
    379100.0,
    36200.0,
    36500.0,
    42800.0,
    53100.0,
    64800.0,
    16900.0,
    26600.0,
    33100.0,
    69100.0,
    47800.0,
    30400.0,
    44500.0,
    23100.0,
    29100.0,
    43400.0,
    48600.0,
    24800.0,
    30200.0,
    26400.0,
    19600.0,
    26300.0,
    24400.0,
    49200.0,
    36500.0,
    38700.0,
    43200.0,
    60400.0,
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
        text: "BVH",
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