/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_JFIN");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/10', 2.28, 2.4, 2.4, 2.28],
    ['2022/08/11', 2.3, 2.5, 2.5, 2.3],
    ['2022/08/12', 2.5, 2.62, 2.66, 2.42],
    ['2022/08/15', 2.6, 2.59, 2.74, 2.51],
    ['2022/08/16', 2.56, 2.71, 2.79, 2.52],
    ['2022/08/17', 2.72, 2.98, 2.98, 2.71],
    ['2022/08/18', 2.71, 2.76, 2.87, 2.7],
    ['2022/08/19', 2.7, 2.42, 2.7, 2.4],
    ['2022/08/22', 2.46, 2.42, 2.51, 2.35],
    ['2022/08/23', 2.45, 2.41, 2.45, 2.37],
    ['2022/08/24', 2.39, 2.47, 2.54, 2.39],
    ['2022/08/25', 2.45, 2.54, 2.6, 2.45],
    ['2022/08/26', 2.57, 2.62, 2.65, 2.57],
    ['2022/08/29', 2.86, 2.75, 2.86, 2.62],
    ['2022/08/30', 2.67, 2.77, 2.95, 2.67],
    ['2022/08/31', 2.77, 2.7, 2.88, 2.7],
    ['2022/09/01', 2.62, 2.38, 2.75, 2.37],
    ['2022/09/02', 2.43, 2.43, 2.53, 2.38],
    ['2022/09/06', 2.4, 2.37, 2.42, 2.37],
    ['2022/09/07', 2.38, 2.49, 2.51, 2.38],
    ['2022/09/08', 2.45, 2.41, 2.45, 2.37],
    ['2022/09/09', 2.42, 2.5, 2.51, 2.38],
    ['2022/09/12', 2.49, 2.43, 2.5, 2.37],
    ['2022/09/13', 2.4, 2.43, 2.47, 2.39],
    ['2022/09/14', 2.38, 2.47, 2.5, 2.38],
    ['2022/09/15', 2.47, 2.44, 2.49, 2.39],
    ['2022/09/16', 2.4, 2.44, 2.48, 2.38],
    ['2022/09/19', 2.41, 2.44, 2.53, 2.38],
    ['2022/09/20', 2.44, 2.46, 2.48, 2.4],
    ['2022/09/21', 2.43, 2.45, 2.47, 2.42],
    ['2022/09/22', 2.45, 2.37, 2.46, 2.18],
    ['2022/09/23', 2.35, 2.4, 2.41, 2.29],
    ['2022/09/26', 2.39, 2.21, 2.4, 2.19],
    ['2022/09/27', 2.3, 2.22, 2.3, 2.11],
    ['2022/09/28', 2.24, 2.24, 2.25, 2.17],
    ['2022/09/29', 2.26, 2.19, 2.3, 2.14],
    ['2022/09/30', 2.19, 2.17, 2.23, 2.16],
    ['2022/10/03', 2.14, 2.17, 2.18, 2.12],
    ['2022/10/04', 2.19, 2.23, 2.23, 2.19],
    ['2022/10/05', 2.12, 2.23, 2.25, 2.12],
    ['2022/10/06', 2.31, 2.33, 2.33, 2.24],
    ['2022/10/07', 2.31, 2.25, 2.39, 2.25],
    ['2022/10/10', 2.26, 2.22, 2.32, 2.21],
    ['2022/10/11', 2.25, 2.21, 2.33, 2.21],
    ['2022/10/12', 2.22, 2.27, 2.3, 2.2],
    ['2022/10/13', 2.29, 2.31, 2.32, 2.28],
    ['2022/10/14', 2.29, 2.27, 2.35, 2.25],
    ['2022/10/17', 2.27, 2.36, 2.36, 2.27],
    ['2022/10/18', 2.39, 2.42, 2.44, 2.37],
    ['2022/10/19', 2.38, 2.3, 2.43, 2.3],
    ['2022/10/20', 2.35, 2.27, 2.35, 2.27],
    ['2022/10/21', 2.23, 2.27, 2.27, 2.2],
    ['2022/10/24', 2.26, 2.22, 2.28, 2.22],
    ['2022/10/25', 2.22, 2.28, 2.3, 2.21],
    ['2022/10/26', 2.28, 2.26, 2.29, 2.26],
    ['2022/10/27', 2.26, 2.33, 2.34, 2.25],
    ['2022/10/28', 2.36, 2.35, 2.42, 2.35],
    ['2022/10/31', 2.36, 2.39, 2.5, 2.36],
    ['2022/11/01', 2.46, 2.48, 2.5, 2.44],
    ['2022/11/02', 2.48, 2.43, 2.48, 2.43],
    ['2022/11/03', 2.44, 2.49, 2.49, 2.42],
    ['2022/11/04', 2.47, 2.42, 2.49, 2.41],
    ['2022/11/07', 2.41, 2.38, 2.48, 2.38],
    ['2022/11/08', 2.38, 2.3, 2.39, 2.3],
    ['2022/11/09', 2.31, 2.35, 2.46, 2.31],
    ['2022/11/10', 2.41, 2.39, 2.43, 2.29],
    ['2022/11/11', 2.39, 2.29, 2.4, 2.26],
    ['2022/11/14', 2.32, 2.3, 2.41, 2.3],
    ['2022/11/15', 2.37, 2.36, 2.42, 2.35],
    ['2022/11/16', 2.38, 2.35, 2.42, 2.35],
    ['2022/11/17', 2.36, 2.45, 2.5, 2.32],
    ['2022/11/18', 2.48, 2.47, 2.52, 2.4],
    ['2022/11/21', 2.47, 2.46, 2.47, 2.46],
    ['2022/11/22', 2.45, 2.16, 2.51, 2.04],
    ['2022/11/23', 2.5, 1.97, 2.51, 1.91],
    ['2022/11/25', 2.0, 2.02, 2.05, 1.97],
    ['2022/11/28', 2.0, 2.0, 2.05, 1.99],
    ['2022/11/29', 2.01, 2.04, 2.09, 2.01],
    ['2022/11/30', 2.08, 2.02, 2.15, 1.86],
    ['2022/12/01', 2.03, 2.12, 2.15, 2.02],
    ['2022/12/02', 2.11, 2.17, 2.2, 2.11],
    ['2022/12/05', 2.21, 2.2, 2.24, 2.13],
    ['2022/12/06', 2.19, 2.22, 2.22, 2.12],
    ['2022/12/07', 2.13, 2.09, 2.13, 2.07],
    ['2022/12/08', 2.12, 2.13, 2.14, 2.1],
    ['2022/12/09', 2.14, 2.18, 2.21, 2.13],
    ['2022/12/12', 2.1, 2.18, 2.19, 2.1],
    ['2022/12/13', 2.19, 2.14, 2.19, 2.09],
    ['2022/12/14', 2.13, 2.14, 2.14, 2.12],
    ['2022/12/15', 2.14, 2.11, 2.14, 2.07],
    ['2022/12/16', 2.1, 2.13, 2.14, 2.1],
    ['2022/12/19', 2.09, 2.08, 2.14, 2.07],
    ['2022/12/20', 2.06, 2.09, 2.15, 2.05],
    ['2022/12/21', 2.08, 2.1, 2.15, 2.07],
    ['2022/12/22', 2.1, 2.14, 2.18, 2.1],
    ['2022/12/23', 2.14, 2.18, 2.18, 2.14],
    ['2022/12/27', 2.23, 2.23, 2.3, 2.15],
    ['2022/12/28', 2.26, 2.23, 2.31, 2.15],
    ['2022/12/29', 2.2, 2.3, 2.3, 2.18],
    ['2022/12/30', 2.24, 2.3, 2.3, 2.2],
    ['2023/01/03', 2.26, 2.43, 2.61, 2.26],
    ['2023/01/04', 2.53, 2.71, 2.86, 2.53],
    ['2023/01/05', 2.7, 2.77, 2.85, 2.64],
    ['2023/01/06', 2.72, 2.81, 2.93, 2.63],
    ['2023/01/09', 2.88, 3.14, 3.15, 2.81],
    ['2023/01/10', 3.15, 3.6, 3.6, 3.15],
    ['2023/01/11', 3.55, 3.57, 3.79, 3.47],
    ['2023/01/12', 3.78, 3.48, 3.78, 3.38],
    ['2023/01/13', 3.46, 3.33, 3.46, 3.3],
    ['2023/01/17', 3.25, 3.16, 3.25, 3.0],
    ['2023/01/18', 3.08, 3.01, 3.18, 2.99],
    ['2023/01/19', 3.09, 3.15, 3.45, 3.09],
    ['2023/01/20', 3.11, 3.17, 3.3, 3.05],
    ['2023/01/23', 3.11, 3.21, 3.29, 3.11],
    ['2023/01/24', 3.24, 3.19, 3.33, 3.14],
    ['2023/01/25', 3.2, 3.17, 3.2, 3.16],
    ['2023/01/26', 3.22, 3.3, 3.34, 3.18],
    ['2023/01/27', 3.34, 3.4, 3.53, 3.26],
    ['2023/01/30', 3.52, 3.39, 3.52, 3.3],
    ['2023/01/31', 3.47, 3.4, 3.47, 3.3],
    ['2023/02/01', 3.36, 3.49, 3.52, 3.31],
    ['2023/02/02', 3.44, 3.55, 3.65, 3.38],
    ['2023/02/03', 3.46, 3.43, 3.59, 3.39],
    ['2023/02/06', 3.39, 3.43, 3.51, 3.2],
    ['2023/02/07', 3.53, 3.46, 3.6, 3.45],
    ['2023/02/08', 3.46, 3.34, 3.46, 3.21],
    ['2023/02/09', 3.36, 3.22, 3.36, 3.2],
    ['2023/02/10', 3.22, 3.08, 3.3, 3.05],
    ['2023/02/13', 3.03, 3.03, 3.13, 2.98],
    ['2023/02/14', 3.02, 3.09, 3.13, 3.02],
    ['2023/02/15', 3.04, 3.2, 3.36, 3.03],
    ['2023/02/16', 3.23, 3.21, 3.23, 3.12],
    ['2023/02/17', 3.19, 3.14, 3.23, 3.06],
    ['2023/02/21', 3.07, 3.02, 3.1, 3.02],
    ['2023/02/22', 3.09, 3.01, 3.09, 2.79],
    ['2023/02/23', 3.0, 3.03, 3.09, 2.96],
    ['2023/02/24', 3.0, 2.98, 3.05, 2.93],
    ['2023/02/27', 2.95, 2.95, 2.98, 2.92],
    ['2023/02/28', 2.86, 2.96, 2.97, 2.86],
    ['2023/03/01', 2.96, 2.9, 2.96, 2.9],
    ['2023/03/02', 2.9, 2.94, 2.96, 2.9],
    ['2023/03/03', 2.94, 2.93, 2.97, 2.92],
    ['2023/03/06', 2.91, 2.92, 3.04, 2.9],
    ['2023/03/07', 2.9, 2.94, 3.09, 2.9],
    ['2023/03/08', 2.96, 2.92, 2.96, 2.92],
    ['2023/03/09', 2.9, 2.82, 2.91, 2.81],
    ['2023/03/10', 2.81, 2.58, 2.81, 2.55],
    ['2023/03/13', 2.53, 2.49, 2.53, 2.41],
    ['2023/03/14', 2.54, 2.66, 2.83, 2.54],
    ['2023/03/15', 2.66, 2.61, 2.66, 2.54],
    ['2023/03/16', 2.52, 2.7, 2.7, 2.52],
    ['2023/03/17', 2.79, 2.72, 2.8, 2.6],
    ['2023/03/20', 2.75, 2.64, 2.75, 2.61],
    ['2023/03/21', 2.71, 2.89, 2.89, 2.61],
    ['2023/03/22', 2.87, 2.92, 2.99, 2.87],
    ['2023/03/23', 3.0, 3.17, 3.2, 3.0],
    ['2023/03/24', 3.18, 3.33, 3.33, 3.18],
    ['2023/03/27', 3.39, 3.31, 3.39, 3.1],
    ['2023/03/28', 3.41, 3.41, 3.41, 3.33],
    ['2023/03/29', 3.77, 3.99, 3.99, 3.35],
    ['2023/03/30', 3.98, 3.74, 4.1, 3.62],
    ['2023/03/31', 3.85, 3.73, 3.9, 3.61],
    ['2023/04/03', 3.82, 3.77, 4.3, 3.7],
    ['2023/04/04', 3.88, 4.0, 4.0, 3.73],
    ['2023/04/05', 3.89, 3.75, 3.89, 3.7],
    ['2023/04/06', 3.83, 3.85, 3.85, 3.78],
    ['2023/04/10', 3.92, 3.84, 3.92, 3.71],
    ['2023/04/11', 3.89, 3.78, 3.89, 3.71],
    ['2023/04/12', 3.91, 3.86, 4.03, 3.77],
    ['2023/04/13', 3.99, 3.87, 3.99, 3.81],
    ['2023/04/14', 3.97, 3.75, 3.97, 3.65],
    ['2023/04/17', 3.8, 4.33, 4.48, 3.8],
    ['2023/04/18', 4.4, 4.68, 4.68, 4.35],
    ['2023/04/19', 4.6, 4.46, 4.63, 4.32],
    ['2023/04/20', 4.45, 4.42, 4.45, 4.31],
    ['2023/04/21', 4.46, 4.41, 4.56, 4.35],
    ['2023/04/24', 4.49, 4.41, 4.49, 4.23],
    ['2023/04/25', 4.41, 4.19, 4.41, 4.15],
    ['2023/04/26', 4.18, 4.3, 4.38, 4.18],
    ['2023/04/27', 4.3, 3.94, 4.3, 3.9],
    ['2023/04/28', 3.92, 4.2, 4.23, 3.91],
    ['2023/05/01', 4.29, 4.53, 4.53, 4.08],
    ['2023/05/02', 4.65, 4.52, 4.65, 4.25],
    ['2023/05/03', 4.52, 4.34, 4.52, 4.26],
    ['2023/05/04', 4.3, 4.43, 4.54, 4.26],
    ['2023/05/05', 4.45, 4.74, 4.82, 4.45],
    ['2023/05/08', 4.86, 5.13, 5.15, 4.8],
    ['2023/05/09', 5.32, 5.64, 5.77, 5.04],
    ['2023/05/10', 5.75, 5.2, 5.9, 4.84],
    ['2023/05/11', 5.32, 5.36, 5.4, 4.94],
    ['2023/05/12', 5.52, 5.57, 5.71, 5.35],
    ['2023/05/15', 5.62, 5.88, 5.9, 5.37],
    ['2023/05/16', 5.9, 5.69, 6.16, 5.41],
    ['2023/05/17', 5.73, 5.38, 5.75, 5.11],
    ['2023/05/18', 5.45, 5.21, 5.72, 5.1],
    ['2023/05/19', 5.26, 5.44, 5.47, 4.92],
    ['2023/05/22', 5.58, 5.36, 5.63, 5.25],
    ['2023/05/23', 5.2, 4.82, 5.26, 4.81],
    ['2023/05/24', 5.0, 4.95, 5.05, 4.83],
    ['2023/05/25', 4.99, 4.81, 4.99, 4.7],
    ['2023/05/26', 5.04, 5.49, 5.59, 4.91],
    ['2023/05/30', 5.47, 6.16, 6.28, 5.42],
    ['2023/05/31', 6.2, 6.15, 6.2, 5.95],
    ['2023/06/01', 6.2, 6.3, 6.47, 6.01],
    ['2023/06/02', 6.47, 7.28, 7.35, 6.39],
    ['2023/06/05', 7.93, 8.0, 8.19, 7.3],
    ['2023/06/06', 8.0, 6.98, 8.09, 6.6],
    ['2023/06/07', 7.07, 7.3, 7.59, 7.07],
    ['2023/06/08', 7.5, 5.9, 7.5, 5.23],
    ['2023/06/09', 6.15, 6.02, 6.17, 5.2],
    ['2023/06/12', 5.8, 5.36, 5.8, 5.02],
    ['2023/06/13', 5.32, 5.27, 5.57, 5.1],
    ['2023/06/14', 5.27, 5.25, 5.32, 5.02],
    ['2023/06/15', 5.5, 5.85, 6.05, 5.34],
    ['2023/06/16', 5.85, 5.72, 5.85, 5.51],
    ['2023/06/20', 5.64, 6.28, 6.3, 5.63],
    ['2023/06/21', 6.25, 5.61, 6.25, 5.59],
    ['2023/06/22', 5.57, 5.46, 5.68, 5.2],
    ['2023/06/23', 5.4, 5.88, 6.0, 5.4],
    ['2023/06/26', 5.64, 5.56, 5.8, 5.53],
    ['2023/06/27', 5.56, 5.87, 5.92, 5.56],
    ['2023/06/28', 5.84, 5.76, 5.93, 5.74],
    ['2023/06/29', 5.77, 5.42, 5.89, 5.3],
    ['2023/06/30', 5.5, 5.28, 5.67, 5.25],
    ['2023/07/03', 5.26, 5.18, 5.41, 5.11],
    ['2023/07/05', 5.14, 4.91, 5.24, 4.65],
    ['2023/07/06', 4.7, 4.73, 4.89, 4.64],
    ['2023/07/07', 4.75, 4.92, 4.97, 4.75],
    ['2023/07/10', 5.03, 5.33, 5.44, 5.01],
    ['2023/07/11', 5.48, 5.19, 5.48, 5.08],
    ['2023/07/12', 5.17, 5.33, 5.49, 5.17],
    ['2023/07/13', 5.74, 6.64, 6.75, 5.56],
    ['2023/07/14', 6.94, 6.37, 6.94, 6.0],
    ['2023/07/17', 6.18, 7.35, 7.35, 5.94],
    ['2023/07/18', 7.35, 6.77, 7.35, 6.4],
    ['2023/07/19', 6.72, 6.68, 6.99, 6.62],
    ['2023/07/20', 6.75, 6.43, 6.82, 6.27],
    ['2023/07/21', 6.55, 6.48, 6.86, 6.3],
    ['2023/07/24', 6.59, 6.65, 6.95, 6.37],
    ['2023/07/25', 6.97, 6.8, 7.08, 6.62],
    ['2023/07/26', 6.66, 7.14, 7.35, 6.66],
    ['2023/07/27', 6.75, 6.67, 7.0, 6.61],
    ['2023/07/28', 6.72, 7.14, 7.4, 6.72],
    ['2023/07/31', 7.13, 7.19, 7.49, 7.13],
    ['2023/08/01', 7.24, 7.02, 7.24, 6.73],
    ['2023/08/02', 6.75, 6.43, 6.87, 6.29],
    ['2023/08/03', 6.4, 6.76, 6.76, 6.32],
    ['2023/08/04', 6.63, 6.61, 6.8, 6.5],
    ['2023/08/07', 6.61, 6.17, 6.61, 5.85],
    ['2023/08/08', 6.06, 6.26, 6.39, 6.06],
]);
var volumes = [
    23100.0,
    24800.0,
    31800.0,
    24600.0,
    28900.0,
    114600.0,
    50900.0,
    51100.0,
    19500.0,
    6400.0,
    23500.0,
    20000.0,
    38700.0,
    33200.0,
    65300.0,
    44100.0,
    34900.0,
    54700.0,
    26000.0,
    12300.0,
    30600.0,
    44300.0,
    5900.0,
    16800.0,
    14200.0,
    13100.0,
    10900.0,
    16500.0,
    9700.0,
    8700.0,
    28500.0,
    6700.0,
    74100.0,
    29700.0,
    10700.0,
    52300.0,
    8200.0,
    4300.0,
    6700.0,
    29500.0,
    14700.0,
    20800.0,
    21000.0,
    12500.0,
    2800.0,
    7500.0,
    15000.0,
    12000.0,
    6800.0,
    27900.0,
    1900.0,
    5300.0,
    38100.0,
    10400.0,
    3600.0,
    17800.0,
    20200.0,
    31900.0,
    5400.0,
    4400.0,
    7200.0,
    13300.0,
    20600.0,
    8700.0,
    20300.0,
    40500.0,
    25500.0,
    14400.0,
    10500.0,
    15100.0,
    32100.0,
    21100.0,
    5200.0,
    202900.0,
    186300.0,
    30900.0,
    23300.0,
    24000.0,
    39400.0,
    73200.0,
    20400.0,
    47700.0,
    11700.0,
    11300.0,
    7500.0,
    40300.0,
    28300.0,
    16100.0,
    11900.0,
    13300.0,
    10300.0,
    19200.0,
    16400.0,
    39500.0,
    34600.0,
    7600.0,
    91100.0,
    43000.0,
    67600.0,
    20200.0,
    78200.0,
    83200.0,
    29300.0,
    55000.0,
    108500.0,
    170700.0,
    115500.0,
    72300.0,
    50500.0,
    40800.0,
    26400.0,
    42700.0,
    23400.0,
    16700.0,
    21500.0,
    11600.0,
    36400.0,
    40700.0,
    37000.0,
    18500.0,
    68300.0,
    26400.0,
    40900.0,
    41700.0,
    18100.0,
    54000.0,
    16300.0,
    24900.0,
    15600.0,
    8800.0,
    14400.0,
    5300.0,
    5000.0,
    19300.0,
    18300.0,
    19700.0,
    20600.0,
    18400.0,
    8400.0,
    8200.0,
    6600.0,
    7600.0,
    9400.0,
    8000.0,
    3500.0,
    18000.0,
    36400.0,
    32200.0,
    55300.0,
    5600.0,
    7400.0,
    23000.0,
    18400.0,
    26900.0,
    3700.0,
    14500.0,
    29300.0,
    91500.0,
    16200.0,
    4678700.0,
    478500.0,
    159100.0,
    207700.0,
    91000.0,
    77800.0,
    54100.0,
    57600.0,
    47900.0,
    118600.0,
    73900.0,
    70200.0,
    257400.0,
    188900.0,
    138400.0,
    55400.0,
    103600.0,
    72700.0,
    65000.0,
    31000.0,
    78400.0,
    85200.0,
    225300.0,
    100300.0,
    91200.0,
    96700.0,
    109700.0,
    235700.0,
    238900.0,
    304100.0,
    102800.0,
    116800.0,
    177800.0,
    207800.0,
    220700.0,
    99500.0,
    97900.0,
    146500.0,
    118900.0,
    69000.0,
    88800.0,
    186300.0,
    288700.0,
    128400.0,
    126200.0,
    785300.0,
    758300.0,
    535700.0,
    241200.0,
    867600.0,
    235100.0,
    435400.0,
    173100.0,
    90800.0,
    542000.0,
    152100.0,
    221300.0,
    160200.0,
    92100.0,
    99500.0,
    102100.0,
    119800.0,
    80000.0,
    128500.0,
    99300.0,
    142200.0,
    319300.0,
    81400.0,
    43800.0,
    179700.0,
    104700.0,
    84700.0,
    743500.0,
    408300.0,
    562400.0,
    298600.0,
    102600.0,
    175700.0,
    100900.0,
    143400.0,
    204500.0,
    207200.0,
    159800.0,
    214500.0,
    95500.0,
    63500.0,
    141000.0,
    68900.0,
    48200.0,
    213600.0,
    61000.0,
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
     *     text: "JFIN",
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