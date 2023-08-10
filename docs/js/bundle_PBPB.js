/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_PBPB");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/11', 5.57, 5.53, 5.64, 5.5],
    ['2022/08/12', 5.67, 5.8, 5.81, 5.59],
    ['2022/08/15', 5.9, 6.0, 6.0, 5.88],
    ['2022/08/16', 5.96, 6.46, 6.55, 5.96],
    ['2022/08/17', 6.4, 6.37, 6.59, 6.28],
    ['2022/08/18', 6.26, 6.35, 6.36, 6.23],
    ['2022/08/19', 6.41, 6.23, 6.59, 6.05],
    ['2022/08/22', 6.26, 5.97, 6.26, 5.8],
    ['2022/08/23', 6.11, 6.01, 6.2, 5.81],
    ['2022/08/24', 6.0, 6.11, 6.23, 6.0],
    ['2022/08/25', 6.06, 6.15, 6.24, 6.06],
    ['2022/08/26', 6.21, 6.0, 6.25, 5.92],
    ['2022/08/29', 5.91, 5.69, 6.02, 5.65],
    ['2022/08/30', 5.69, 5.5, 5.85, 5.48],
    ['2022/08/31', 5.59, 5.44, 5.6, 5.43],
    ['2022/09/01', 5.5, 5.61, 5.64, 5.36],
    ['2022/09/02', 5.68, 5.61, 5.7, 5.52],
    ['2022/09/06', 5.51, 5.44, 5.58, 5.36],
    ['2022/09/07', 5.44, 5.6, 5.64, 5.44],
    ['2022/09/08', 5.59, 5.45, 5.7, 5.38],
    ['2022/09/09', 5.57, 5.65, 5.65, 5.36],
    ['2022/09/12', 5.61, 5.75, 5.85, 5.61],
    ['2022/09/13', 5.74, 5.52, 5.77, 5.46],
    ['2022/09/14', 5.6, 5.41, 5.6, 5.34],
    ['2022/09/15', 5.47, 5.28, 5.53, 5.26],
    ['2022/09/16', 5.17, 5.05, 5.27, 5.0],
    ['2022/09/19', 5.0, 4.97, 5.17, 4.91],
    ['2022/09/20', 4.91, 4.92, 4.98, 4.7],
    ['2022/09/21', 4.97, 4.85, 5.0, 4.75],
    ['2022/09/22', 4.79, 4.94, 5.0, 4.75],
    ['2022/09/23', 4.85, 4.53, 4.89, 4.42],
    ['2022/09/26', 4.44, 4.48, 4.59, 4.31],
    ['2022/09/27', 4.57, 4.51, 4.61, 4.44],
    ['2022/09/28', 4.51, 4.78, 4.84, 4.51],
    ['2022/09/29', 4.79, 4.68, 4.82, 4.49],
    ['2022/09/30', 4.44, 4.53, 4.72, 4.44],
    ['2022/10/03', 4.56, 4.55, 4.7, 4.53],
    ['2022/10/04', 4.67, 4.8, 4.9, 4.67],
    ['2022/10/05', 4.8, 4.7, 4.89, 4.55],
    ['2022/10/06', 4.67, 4.64, 4.7, 4.55],
    ['2022/10/07', 4.6, 4.57, 4.64, 4.47],
    ['2022/10/10', 4.61, 4.6, 4.71, 4.45],
    ['2022/10/11', 4.74, 4.61, 4.83, 4.57],
    ['2022/10/12', 4.83, 4.75, 4.87, 4.62],
    ['2022/10/13', 4.74, 4.99, 5.05, 4.7],
    ['2022/10/14', 5.1, 5.04, 5.14, 4.98],
    ['2022/10/17', 5.07, 5.06, 5.17, 4.92],
    ['2022/10/18', 5.17, 4.91, 5.17, 4.9],
    ['2022/10/19', 4.91, 4.8, 5.01, 4.75],
    ['2022/10/20', 4.77, 4.9, 4.9, 4.76],
    ['2022/10/21', 4.89, 4.9, 5.0, 4.89],
    ['2022/10/24', 4.9, 4.75, 4.99, 4.75],
    ['2022/10/25', 4.76, 4.83, 4.89, 4.73],
    ['2022/10/26', 4.8, 4.75, 5.02, 4.57],
    ['2022/10/27', 4.75, 4.87, 4.87, 4.68],
    ['2022/10/28', 4.81, 4.99, 4.99, 4.81],
    ['2022/10/31', 4.98, 4.98, 5.08, 4.74],
    ['2022/11/01', 5.01, 5.08, 5.17, 4.97],
    ['2022/11/02', 5.16, 5.12, 5.16, 5.05],
    ['2022/11/03', 5.13, 5.07, 5.13, 4.95],
    ['2022/11/04', 5.05, 5.27, 5.27, 4.99],
    ['2022/11/07', 5.24, 5.34, 5.38, 5.2],
    ['2022/11/08', 5.28, 5.25, 5.5, 5.2],
    ['2022/11/09', 5.27, 5.5, 5.78, 5.25],
    ['2022/11/10', 5.67, 5.61, 5.78, 5.47],
    ['2022/11/11', 5.69, 5.71, 5.88, 5.63],
    ['2022/11/14', 5.56, 5.43, 5.72, 5.43],
    ['2022/11/15', 5.36, 5.69, 5.89, 5.36],
    ['2022/11/16', 5.67, 5.65, 5.7, 5.52],
    ['2022/11/17', 5.77, 5.56, 5.88, 5.46],
    ['2022/11/18', 5.59, 5.69, 5.86, 5.58],
    ['2022/11/21', 5.65, 5.6, 5.82, 5.48],
    ['2022/11/22', 5.64, 5.82, 5.99, 5.62],
    ['2022/11/23', 5.77, 5.81, 5.95, 5.66],
    ['2022/11/25', 5.77, 5.7, 5.84, 5.61],
    ['2022/11/28', 5.61, 5.46, 5.84, 5.46],
    ['2022/11/29', 5.37, 5.46, 5.66, 5.35],
    ['2022/11/30', 5.48, 5.57, 5.74, 5.48],
    ['2022/12/01', 5.64, 5.46, 5.64, 5.34],
    ['2022/12/02', 5.39, 5.39, 5.59, 5.34],
    ['2022/12/05', 5.5, 5.5, 5.5, 5.37],
    ['2022/12/06', 5.28, 5.18, 5.42, 5.17],
    ['2022/12/07', 5.15, 5.27, 5.39, 5.1],
    ['2022/12/08', 5.3, 5.51, 5.62, 5.21],
    ['2022/12/09', 5.95, 5.33, 5.95, 5.31],
    ['2022/12/12', 5.37, 5.62, 5.7, 5.22],
    ['2022/12/13', 5.71, 5.52, 5.87, 5.52],
    ['2022/12/14', 5.63, 5.46, 5.7, 5.45],
    ['2022/12/15', 5.47, 5.45, 5.65, 5.25],
    ['2022/12/16', 5.45, 5.31, 5.45, 5.2],
    ['2022/12/19', 5.31, 5.3, 5.45, 5.2],
    ['2022/12/20', 5.3, 5.39, 5.49, 5.27],
    ['2022/12/21', 5.41, 5.47, 5.5, 5.32],
    ['2022/12/22', 5.45, 5.55, 5.55, 5.42],
    ['2022/12/23', 5.46, 5.59, 5.65, 5.46],
    ['2022/12/27', 5.52, 5.38, 5.65, 5.36],
    ['2022/12/28', 5.37, 5.44, 5.56, 5.2],
    ['2022/12/29', 5.44, 5.59, 5.6, 5.4],
    ['2022/12/30', 5.58, 5.57, 5.64, 5.34],
    ['2023/01/03', 5.65, 5.5, 5.76, 5.31],
    ['2023/01/04', 5.56, 5.49, 5.64, 5.41],
    ['2023/01/05', 5.44, 5.51, 5.51, 5.39],
    ['2023/01/06', 5.51, 5.44, 5.63, 5.41],
    ['2023/01/09', 5.5, 5.94, 6.11, 5.5],
    ['2023/01/10', 5.94, 6.15, 6.15, 5.85],
    ['2023/01/11', 6.23, 6.6, 6.63, 6.22],
    ['2023/01/12', 6.68, 7.0, 7.0, 6.66],
    ['2023/01/13', 7.04, 7.14, 7.3, 7.0],
    ['2023/01/17', 7.3, 7.13, 7.34, 6.95],
    ['2023/01/18', 7.16, 7.3, 7.4, 7.16],
    ['2023/01/19', 7.3, 7.39, 7.45, 6.96],
    ['2023/01/20', 7.4, 7.47, 7.55, 7.36],
    ['2023/01/23', 7.44, 7.77, 7.89, 7.08],
    ['2023/01/24', 7.75, 7.78, 7.94, 7.63],
    ['2023/01/25', 7.74, 7.72, 7.77, 7.55],
    ['2023/01/26', 7.77, 7.92, 7.92, 7.57],
    ['2023/01/27', 7.91, 8.19, 8.19, 7.89],
    ['2023/01/30', 8.11, 8.09, 8.14, 7.98],
    ['2023/01/31', 8.04, 7.99, 8.14, 7.9],
    ['2023/02/01', 8.0, 7.86, 8.05, 7.86],
    ['2023/02/02', 7.88, 7.54, 7.95, 7.42],
    ['2023/02/03', 7.41, 7.7, 7.8, 7.35],
    ['2023/02/06', 7.58, 7.65, 7.76, 7.58],
    ['2023/02/07', 7.61, 7.62, 7.7, 7.52],
    ['2023/02/08', 7.57, 7.54, 7.64, 7.42],
    ['2023/02/09', 7.58, 7.67, 7.77, 7.5],
    ['2023/02/10', 7.66, 7.68, 7.75, 7.55],
    ['2023/02/13', 7.63, 7.5, 7.7, 7.29],
    ['2023/02/14', 7.42, 7.44, 7.63, 7.33],
    ['2023/02/15', 7.37, 7.58, 7.64, 7.37],
    ['2023/02/16', 7.48, 7.6, 7.65, 7.48],
    ['2023/02/17', 7.6, 7.6, 7.6, 7.53],
    ['2023/02/21', 7.43, 7.37, 7.55, 7.23],
    ['2023/02/22', 7.37, 7.39, 7.49, 7.33],
    ['2023/02/23', 7.46, 7.52, 7.55, 7.43],
    ['2023/02/24', 7.43, 7.32, 7.43, 7.31],
    ['2023/02/27', 7.41, 7.36, 7.43, 7.25],
    ['2023/02/28', 7.36, 7.2, 7.39, 7.17],
    ['2023/03/01', 7.18, 7.26, 7.32, 7.09],
    ['2023/03/02', 7.15, 7.34, 7.44, 7.15],
    ['2023/03/03', 7.26, 7.94, 7.94, 7.15],
    ['2023/03/06', 7.99, 8.22, 8.45, 7.95],
    ['2023/03/07', 8.29, 8.47, 8.53, 8.12],
    ['2023/03/08', 8.4, 8.84, 8.88, 8.37],
    ['2023/03/09', 8.83, 8.75, 8.89, 8.55],
    ['2023/03/10', 8.51, 8.35, 8.7, 8.22],
    ['2023/03/13', 8.51, 8.3, 8.51, 7.8],
    ['2023/03/14', 8.38, 7.89, 8.4, 7.82],
    ['2023/03/15', 7.85, 7.7, 7.88, 7.5],
    ['2023/03/16', 7.66, 7.93, 7.98, 7.66],
    ['2023/03/17', 7.91, 7.78, 8.25, 7.71],
    ['2023/03/20', 7.71, 7.74, 7.76, 7.62],
    ['2023/03/21', 7.76, 7.93, 8.0, 7.76],
    ['2023/03/22', 7.93, 7.93, 8.02, 7.88],
    ['2023/03/23', 7.94, 7.89, 8.01, 7.79],
    ['2023/03/24', 7.84, 7.78, 7.84, 7.72],
    ['2023/03/27', 7.91, 7.67, 7.91, 7.65],
    ['2023/03/28', 7.64, 7.62, 7.74, 7.43],
    ['2023/03/29', 7.6, 7.8, 7.81, 7.41],
    ['2023/03/30', 7.84, 8.08, 8.2, 7.81],
    ['2023/03/31', 8.18, 8.33, 8.46, 8.15],
    ['2023/04/03', 8.31, 7.9, 8.37, 7.62],
    ['2023/04/04', 7.85, 7.71, 7.92, 7.51],
    ['2023/04/05', 7.66, 7.68, 7.84, 7.61],
    ['2023/04/06', 7.64, 8.02, 8.02, 7.62],
    ['2023/04/10', 8.05, 8.4, 8.44, 8.0],
    ['2023/04/11', 8.41, 9.28, 9.4, 8.38],
    ['2023/04/12', 9.3, 9.25, 9.64, 9.2],
    ['2023/04/13', 9.27, 9.33, 9.54, 9.07],
    ['2023/04/14', 9.35, 9.56, 9.68, 9.19],
    ['2023/04/17', 9.71, 10.06, 10.29, 9.54],
    ['2023/04/18', 10.03, 10.24, 10.25, 9.84],
    ['2023/04/19', 10.12, 10.15, 10.3, 10.05],
    ['2023/04/20', 10.15, 10.09, 10.19, 9.93],
    ['2023/04/21', 10.15, 10.14, 10.29, 9.94],
    ['2023/04/24', 10.12, 10.21, 10.23, 10.0],
    ['2023/04/25', 10.19, 10.18, 10.25, 10.0],
    ['2023/04/26', 10.15, 10.85, 11.14, 9.92],
    ['2023/04/27', 11.0, 10.45, 11.11, 10.3],
    ['2023/04/28', 10.37, 10.48, 10.67, 10.33],
    ['2023/05/01', 10.53, 10.7, 10.87, 10.5],
    ['2023/05/02', 10.7, 10.64, 10.75, 10.37],
    ['2023/05/03', 10.64, 10.59, 10.8, 10.52],
    ['2023/05/04', 10.73, 10.58, 10.74, 10.28],
    ['2023/05/05', 10.95, 9.03, 10.95, 9.0],
    ['2023/05/08', 8.98, 8.3, 9.05, 8.16],
    ['2023/05/09', 8.35, 8.01, 8.44, 7.82],
    ['2023/05/10', 8.12, 8.29, 8.35, 7.93],
    ['2023/05/11', 8.25, 8.84, 8.93, 8.24],
    ['2023/05/12', 8.82, 8.62, 9.0, 8.62],
    ['2023/05/15', 8.71, 8.4, 8.77, 8.32],
    ['2023/05/16', 8.37, 8.24, 8.52, 8.16],
    ['2023/05/17', 8.4, 8.41, 8.58, 8.24],
    ['2023/05/18', 8.36, 8.34, 8.49, 8.06],
    ['2023/05/19', 8.31, 8.37, 8.43, 8.24],
    ['2023/05/22', 8.37, 8.21, 8.47, 8.17],
    ['2023/05/23', 8.23, 8.04, 8.47, 8.03],
    ['2023/05/24', 7.97, 7.95, 8.02, 7.72],
    ['2023/05/25', 7.93, 7.79, 7.97, 7.72],
    ['2023/05/26', 7.75, 7.69, 8.04, 7.6],
    ['2023/05/30', 7.6, 7.59, 7.73, 7.45],
    ['2023/05/31', 7.56, 7.78, 7.8, 7.55],
    ['2023/06/01', 7.78, 7.98, 8.05, 7.77],
    ['2023/06/02', 8.08, 8.32, 8.41, 8.05],
    ['2023/06/05', 8.23, 8.1, 8.25, 7.96],
    ['2023/06/06', 8.05, 8.37, 8.55, 8.05],
    ['2023/06/07', 8.43, 8.72, 8.82, 8.37],
    ['2023/06/08', 8.75, 8.21, 8.91, 8.16],
    ['2023/06/09', 8.19, 8.11, 8.38, 7.99],
    ['2023/06/12', 8.16, 8.03, 8.36, 7.93],
    ['2023/06/13', 8.12, 8.4, 8.49, 8.1],
    ['2023/06/14', 8.42, 8.28, 8.64, 8.25],
    ['2023/06/15', 8.3, 8.27, 8.47, 8.23],
    ['2023/06/16', 8.28, 8.1, 8.45, 8.08],
    ['2023/06/20', 8.1, 8.2, 8.35, 8.05],
    ['2023/06/21', 8.19, 8.15, 8.3, 8.09],
    ['2023/06/22', 8.15, 8.23, 8.28, 8.03],
    ['2023/06/23', 8.15, 7.91, 8.26, 7.86],
    ['2023/06/26', 7.88, 8.46, 8.48, 7.88],
    ['2023/06/27', 8.5, 8.41, 8.57, 8.29],
    ['2023/06/28', 8.38, 8.42, 8.44, 8.24],
    ['2023/06/29', 8.42, 8.68, 8.84, 8.42],
    ['2023/06/30', 8.72, 8.78, 8.89, 8.63],
    ['2023/07/03', 8.82, 9.19, 9.2, 8.69],
    ['2023/07/05', 9.17, 8.81, 9.24, 8.81],
    ['2023/07/06', 8.79, 8.75, 8.88, 8.48],
    ['2023/07/07', 8.74, 8.8, 8.95, 8.74],
    ['2023/07/10', 8.76, 9.15, 9.16, 8.76],
    ['2023/07/11', 9.19, 9.13, 9.22, 8.98],
    ['2023/07/12', 9.29, 9.13, 9.38, 9.11],
    ['2023/07/13', 9.17, 9.04, 9.17, 8.96],
    ['2023/07/14', 8.96, 8.99, 9.22, 8.82],
    ['2023/07/17', 8.99, 8.86, 9.02, 8.78],
    ['2023/07/18', 8.87, 9.0, 9.06, 8.87],
    ['2023/07/19', 9.01, 9.32, 9.34, 8.93],
    ['2023/07/20', 9.34, 9.21, 9.38, 9.1],
    ['2023/07/21', 9.29, 9.15, 9.35, 9.03],
    ['2023/07/24', 9.12, 9.19, 9.27, 9.09],
    ['2023/07/25', 9.16, 9.36, 9.47, 8.96],
    ['2023/07/26', 9.51, 9.62, 9.72, 9.44],
    ['2023/07/27', 9.67, 9.52, 9.87, 9.49],
    ['2023/07/28', 9.55, 9.49, 9.68, 9.47],
    ['2023/07/31', 9.47, 9.55, 9.65, 9.37],
    ['2023/08/01', 9.55, 9.45, 9.59, 9.32],
    ['2023/08/02', 9.39, 9.34, 9.48, 9.33],
    ['2023/08/03', 9.32, 9.27, 9.46, 9.22],
    ['2023/08/04', 9.34, 8.9, 9.49, 8.5],
    ['2023/08/07', 8.95, 8.75, 8.95, 8.31],
    ['2023/08/08', 8.75, 8.67, 8.9, 8.55],
    ['2023/08/09', 8.69, 8.87, 8.98, 8.58],
]);
var volumes = [
    363200.0,
    240500.0,
    106600.0,
    80100.0,
    54200.0,
    38500.0,
    59200.0,
    78300.0,
    28900.0,
    22500.0,
    38200.0,
    34200.0,
    59400.0,
    78000.0,
    115200.0,
    27400.0,
    45600.0,
    90300.0,
    50900.0,
    38700.0,
    28100.0,
    50200.0,
    44900.0,
    45500.0,
    20000.0,
    126900.0,
    39300.0,
    56600.0,
    63700.0,
    58800.0,
    38100.0,
    30700.0,
    62500.0,
    26700.0,
    33700.0,
    23700.0,
    21100.0,
    23500.0,
    18400.0,
    19100.0,
    14600.0,
    51800.0,
    15900.0,
    36800.0,
    16400.0,
    27300.0,
    25400.0,
    58100.0,
    16100.0,
    10600.0,
    6600.0,
    11700.0,
    25400.0,
    27200.0,
    9200.0,
    13800.0,
    14000.0,
    16900.0,
    20300.0,
    14100.0,
    28300.0,
    36000.0,
    28200.0,
    77400.0,
    78200.0,
    36600.0,
    56000.0,
    153900.0,
    14000.0,
    14100.0,
    22400.0,
    48500.0,
    41200.0,
    16600.0,
    3200.0,
    26800.0,
    42400.0,
    28600.0,
    43000.0,
    33700.0,
    22700.0,
    61800.0,
    34500.0,
    60800.0,
    43900.0,
    31200.0,
    41400.0,
    18700.0,
    35800.0,
    41000.0,
    25000.0,
    33900.0,
    13600.0,
    16600.0,
    13800.0,
    72700.0,
    30900.0,
    8300.0,
    23300.0,
    33600.0,
    53200.0,
    42900.0,
    292100.0,
    130000.0,
    97900.0,
    196200.0,
    178600.0,
    191500.0,
    195100.0,
    118100.0,
    112300.0,
    137100.0,
    169700.0,
    160400.0,
    104000.0,
    94700.0,
    185000.0,
    119500.0,
    110600.0,
    100500.0,
    171400.0,
    101400.0,
    116000.0,
    146500.0,
    86200.0,
    73100.0,
    66900.0,
    106000.0,
    73700.0,
    49700.0,
    31700.0,
    33900.0,
    61700.0,
    33600.0,
    34000.0,
    47800.0,
    40100.0,
    44400.0,
    75200.0,
    47900.0,
    216800.0,
    251900.0,
    260300.0,
    262300.0,
    205000.0,
    238000.0,
    288300.0,
    136500.0,
    133900.0,
    179000.0,
    122600.0,
    177400.0,
    136700.0,
    85900.0,
    74600.0,
    84900.0,
    90500.0,
    284300.0,
    191500.0,
    123800.0,
    105000.0,
    440500.0,
    486200.0,
    85100.0,
    88300.0,
    156200.0,
    429600.0,
    193700.0,
    122900.0,
    330500.0,
    453400.0,
    306000.0,
    137100.0,
    107300.0,
    165400.0,
    165700.0,
    167300.0,
    676800.0,
    318700.0,
    176800.0,
    212400.0,
    202900.0,
    160500.0,
    503500.0,
    598100.0,
    461600.0,
    487200.0,
    311800.0,
    363500.0,
    223400.0,
    196600.0,
    153000.0,
    279800.0,
    246800.0,
    143200.0,
    203400.0,
    146400.0,
    142500.0,
    99800.0,
    164300.0,
    196200.0,
    93900.0,
    115600.0,
    152300.0,
    132400.0,
    174600.0,
    268500.0,
    240200.0,
    208400.0,
    266500.0,
    142400.0,
    108600.0,
    118600.0,
    165500.0,
    171700.0,
    181600.0,
    187100.0,
    3415700.0,
    242500.0,
    139500.0,
    96100.0,
    132100.0,
    120800.0,
    107100.0,
    168000.0,
    161100.0,
    191800.0,
    154500.0,
    93000.0,
    86100.0,
    72500.0,
    170500.0,
    124200.0,
    71900.0,
    168300.0,
    79000.0,
    132600.0,
    90500.0,
    409200.0,
    170100.0,
    146600.0,
    64500.0,
    164300.0,
    85400.0,
    109700.0,
    146400.0,
    448500.0,
    212900.0,
    472600.0,
    153100.0,
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
     *     text: "PBPB",
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