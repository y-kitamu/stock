/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_XNET");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/03', 1.61, 1.66, 1.66, 1.61],
    ['2022/08/04', 1.64, 1.72, 1.73, 1.62],
    ['2022/08/05', 1.71, 1.66, 1.73, 1.65],
    ['2022/08/08', 1.65, 1.65, 1.66, 1.6],
    ['2022/08/09', 1.63, 1.58, 1.63, 1.57],
    ['2022/08/10', 1.57, 1.6, 1.64, 1.57],
    ['2022/08/11', 1.59, 1.62, 1.64, 1.59],
    ['2022/08/12', 1.6, 1.62, 1.63, 1.57],
    ['2022/08/15', 1.62, 1.76, 1.83, 1.61],
    ['2022/08/16', 1.76, 1.71, 1.76, 1.63],
    ['2022/08/17', 1.72, 1.68, 1.72, 1.66],
    ['2022/08/18', 1.65, 1.62, 1.67, 1.6],
    ['2022/08/19', 1.6, 1.49, 1.65, 1.48],
    ['2022/08/22', 1.44, 1.41, 1.5, 1.41],
    ['2022/08/23', 1.41, 1.35, 1.43, 1.33],
    ['2022/08/24', 1.35, 1.39, 1.43, 1.34],
    ['2022/08/25', 1.42, 1.45, 1.49, 1.4],
    ['2022/08/26', 1.59, 1.43, 1.6, 1.4],
    ['2022/08/29', 1.48, 1.57, 1.62, 1.41],
    ['2022/08/30', 1.6, 1.58, 1.62, 1.55],
    ['2022/08/31', 1.6, 1.61, 1.63, 1.58],
    ['2022/09/01', 1.56, 1.57, 1.6, 1.52],
    ['2022/09/02', 1.59, 1.56, 1.59, 1.56],
    ['2022/09/06', 1.57, 1.47, 1.57, 1.45],
    ['2022/09/07', 1.47, 1.49, 1.5, 1.47],
    ['2022/09/08', 1.48, 1.54, 1.56, 1.46],
    ['2022/09/09', 1.55, 1.57, 1.58, 1.5],
    ['2022/09/12', 1.58, 1.66, 1.66, 1.54],
    ['2022/09/13', 1.6, 1.61, 1.63, 1.56],
    ['2022/09/14', 1.62, 1.61, 1.62, 1.59],
    ['2022/09/15', 1.57, 1.62, 1.65, 1.57],
    ['2022/09/16', 1.6, 1.55, 1.62, 1.54],
    ['2022/09/19', 1.54, 1.54, 1.54, 1.5],
    ['2022/09/20', 1.51, 1.51, 1.51, 1.47],
    ['2022/09/21', 1.51, 1.51, 1.52, 1.49],
    ['2022/09/22', 1.49, 1.45, 1.49, 1.45],
    ['2022/09/23', 1.41, 1.43, 1.48, 1.35],
    ['2022/09/26', 1.42, 1.42, 1.45, 1.38],
    ['2022/09/27', 1.43, 1.4, 1.47, 1.4],
    ['2022/09/28', 1.41, 1.43, 1.43, 1.39],
    ['2022/09/29', 1.4, 1.37, 1.4, 1.37],
    ['2022/09/30', 1.37, 1.39, 1.41, 1.37],
    ['2022/10/03', 1.38, 1.38, 1.39, 1.37],
    ['2022/10/04', 1.37, 1.4, 1.43, 1.37],
    ['2022/10/05', 1.4, 1.38, 1.4, 1.37],
    ['2022/10/06', 1.38, 1.36, 1.39, 1.36],
    ['2022/10/07', 1.37, 1.3, 1.37, 1.3],
    ['2022/10/10', 1.3, 1.25, 1.3, 1.24],
    ['2022/10/11', 1.21, 1.23, 1.26, 1.21],
    ['2022/10/12', 1.24, 1.25, 1.25, 1.21],
    ['2022/10/13', 1.2, 1.29, 1.32, 1.2],
    ['2022/10/14', 1.29, 1.26, 1.3, 1.25],
    ['2022/10/17', 1.26, 1.28, 1.31, 1.26],
    ['2022/10/18', 1.26, 1.3, 1.31, 1.26],
    ['2022/10/19', 1.28, 1.27, 1.3, 1.23],
    ['2022/10/20', 1.27, 1.29, 1.33, 1.26],
    ['2022/10/21', 1.28, 1.3, 1.32, 1.23],
    ['2022/10/24', 1.28, 1.2, 1.28, 1.1],
    ['2022/10/25', 1.2, 1.25, 1.29, 1.2],
    ['2022/10/26', 1.23, 1.29, 1.32, 1.23],
    ['2022/10/27', 1.29, 1.26, 1.31, 1.24],
    ['2022/10/28', 1.25, 1.07, 1.26, 1.05],
    ['2022/10/31', 1.06, 0.99, 1.1, 0.85],
    ['2022/11/01', 1.06, 1.0, 1.06, 0.96],
    ['2022/11/02', 1.0, 1.0, 1.08, 1.0],
    ['2022/11/03', 1.0, 0.99, 1.02, 0.97],
    ['2022/11/04', 1.03, 1.11, 1.12, 1.01],
    ['2022/11/07', 1.13, 1.12, 1.14, 1.07],
    ['2022/11/08', 1.1, 1.07, 1.13, 1.07],
    ['2022/11/09', 1.06, 1.08, 1.09, 1.04],
    ['2022/11/10', 1.29, 1.26, 1.3, 1.18],
    ['2022/11/11', 1.3, 1.5, 1.5, 1.3],
    ['2022/11/14', 1.53, 1.67, 1.7, 1.47],
    ['2022/11/15', 1.75, 1.79, 1.83, 1.61],
    ['2022/11/16', 1.79, 1.74, 1.79, 1.68],
    ['2022/11/17', 1.71, 1.77, 1.8, 1.64],
    ['2022/11/18', 1.75, 1.59, 1.75, 1.53],
    ['2022/11/21', 1.51, 1.63, 1.65, 1.51],
    ['2022/11/22', 1.65, 1.66, 1.68, 1.61],
    ['2022/11/23', 1.69, 1.62, 1.69, 1.53],
    ['2022/11/25', 1.6, 1.7, 1.74, 1.59],
    ['2022/11/28', 1.64, 1.7, 1.74, 1.61],
    ['2022/11/29', 1.71, 1.76, 1.78, 1.71],
    ['2022/11/30', 1.79, 1.88, 1.93, 1.76],
    ['2022/12/01', 1.91, 1.89, 1.91, 1.84],
    ['2022/12/02', 1.85, 2.03, 2.03, 1.84],
    ['2022/12/05', 2.08, 2.0, 2.11, 1.99],
    ['2022/12/06', 2.04, 2.01, 2.05, 1.95],
    ['2022/12/07', 1.95, 1.93, 1.96, 1.86],
    ['2022/12/08', 2.04, 2.07, 2.16, 1.99],
    ['2022/12/09', 2.07, 2.0, 2.08, 2.0],
    ['2022/12/12', 1.99, 1.97, 2.0, 1.95],
    ['2022/12/13', 2.0, 2.04, 2.13, 2.0],
    ['2022/12/14', 1.97, 1.95, 2.02, 1.92],
    ['2022/12/15', 1.95, 1.98, 2.05, 1.92],
    ['2022/12/16', 1.99, 2.13, 2.16, 1.94],
    ['2022/12/19', 2.16, 2.05, 2.16, 2.0],
    ['2022/12/20', 2.01, 1.98, 2.06, 1.95],
    ['2022/12/21', 2.02, 2.05, 2.1, 1.99],
    ['2022/12/22', 2.06, 1.98, 2.06, 1.96],
    ['2022/12/23', 1.98, 1.95, 2.06, 1.9],
    ['2022/12/27', 1.98, 1.91, 1.98, 1.91],
    ['2022/12/28', 1.9, 1.8, 1.95, 1.77],
    ['2022/12/29', 1.8, 1.88, 1.91, 1.77],
    ['2022/12/30', 1.8, 1.82, 1.9, 1.8],
    ['2023/01/03', 1.84, 1.88, 1.95, 1.84],
    ['2023/01/04', 1.98, 1.99, 2.01, 1.97],
    ['2023/01/05', 1.97, 2.0, 2.01, 1.9],
    ['2023/01/06', 1.99, 2.05, 2.05, 1.9],
    ['2023/01/09', 2.08, 2.14, 2.18, 2.07],
    ['2023/01/10', 2.15, 2.16, 2.2, 2.11],
    ['2023/01/11', 2.13, 2.16, 2.16, 2.08],
    ['2023/01/12', 2.12, 2.11, 2.13, 2.02],
    ['2023/01/13', 2.1, 2.22, 2.22, 2.1],
    ['2023/01/17', 2.22, 2.17, 2.22, 2.15],
    ['2023/01/18', 2.2, 2.03, 2.2, 2.02],
    ['2023/01/19', 2.0, 2.06, 2.07, 1.86],
    ['2023/01/20', 2.11, 2.12, 2.15, 2.01],
    ['2023/01/23', 2.14, 2.15, 2.17, 2.13],
    ['2023/01/24', 2.16, 2.13, 2.17, 2.12],
    ['2023/01/25', 2.1, 2.09, 2.12, 2.05],
    ['2023/01/26', 2.1, 2.13, 2.16, 2.09],
    ['2023/01/27', 2.14, 2.17, 2.17, 2.06],
    ['2023/01/30', 2.13, 2.07, 2.16, 2.07],
    ['2023/01/31', 2.08, 2.08, 2.14, 2.03],
    ['2023/02/01', 2.1, 2.14, 2.15, 2.05],
    ['2023/02/02', 2.15, 2.12, 2.15, 2.07],
    ['2023/02/03', 2.12, 2.01, 2.14, 2.01],
    ['2023/02/06', 2.0, 2.04, 2.12, 2.0],
    ['2023/02/07', 2.06, 2.04, 2.12, 2.01],
    ['2023/02/08', 2.01, 1.96, 2.05, 1.96],
    ['2023/02/09', 1.98, 1.82, 2.04, 1.8],
    ['2023/02/10', 1.8, 1.68, 1.88, 1.67],
    ['2023/02/13', 1.7, 1.86, 1.93, 1.7],
    ['2023/02/14', 1.86, 1.93, 1.98, 1.84],
    ['2023/02/15', 1.9, 2.0, 2.01, 1.84],
    ['2023/02/16', 1.97, 1.96, 2.03, 1.95],
    ['2023/02/17', 1.95, 1.92, 1.95, 1.88],
    ['2023/02/21', 1.88, 1.91, 1.93, 1.78],
    ['2023/02/22', 1.89, 1.87, 1.91, 1.85],
    ['2023/02/23', 1.87, 1.89, 1.95, 1.85],
    ['2023/02/24', 1.86, 1.9, 1.95, 1.83],
    ['2023/02/27', 1.87, 1.8, 1.94, 1.8],
    ['2023/02/28', 1.78, 1.77, 1.83, 1.77],
    ['2023/03/01', 1.86, 1.89, 1.97, 1.82],
    ['2023/03/02', 1.86, 1.86, 1.9, 1.8],
    ['2023/03/03', 1.84, 1.9, 1.95, 1.84],
    ['2023/03/06', 1.88, 1.83, 1.88, 1.83],
    ['2023/03/07', 1.81, 1.88, 1.9, 1.81],
    ['2023/03/08', 1.85, 1.97, 1.98, 1.85],
    ['2023/03/09', 1.96, 1.97, 2.0, 1.9],
    ['2023/03/10', 1.9, 1.9, 1.98, 1.9],
    ['2023/03/13', 1.88, 1.94, 1.99, 1.82],
    ['2023/03/14', 1.98, 1.98, 2.01, 1.95],
    ['2023/03/15', 1.99, 2.01, 2.02, 1.96],
    ['2023/03/16', 2.0, 1.97, 2.0, 1.82],
    ['2023/03/17', 1.97, 2.02, 2.02, 1.92],
    ['2023/03/20', 1.96, 1.81, 2.0, 1.78],
    ['2023/03/21', 1.82, 1.87, 1.9, 1.82],
    ['2023/03/22', 1.86, 1.85, 1.89, 1.83],
    ['2023/03/23', 1.88, 1.89, 1.94, 1.86],
    ['2023/03/24', 1.86, 1.87, 1.87, 1.83],
    ['2023/03/27', 1.87, 1.82, 1.88, 1.82],
    ['2023/03/28', 1.82, 1.75, 1.87, 1.75],
    ['2023/03/29', 1.75, 1.8, 1.82, 1.75],
    ['2023/03/30', 1.79, 1.82, 1.87, 1.78],
    ['2023/03/31', 1.83, 1.84, 1.86, 1.82],
    ['2023/04/03', 1.86, 1.82, 1.86, 1.78],
    ['2023/04/04', 1.84, 1.76, 1.85, 1.73],
    ['2023/04/05', 1.8, 1.71, 1.83, 1.7],
    ['2023/04/06', 1.71, 1.75, 1.82, 1.7],
    ['2023/04/10', 1.7, 1.69, 1.74, 1.68],
    ['2023/04/11', 1.71, 1.72, 1.75, 1.68],
    ['2023/04/12', 1.73, 1.67, 1.73, 1.66],
    ['2023/04/13', 1.67, 1.64, 1.7, 1.6],
    ['2023/04/14', 1.61, 1.66, 1.69, 1.61],
    ['2023/04/17', 1.66, 1.72, 1.73, 1.66],
    ['2023/04/18', 1.75, 1.7, 1.75, 1.67],
    ['2023/04/19', 1.68, 1.67, 1.7, 1.66],
    ['2023/04/20', 1.69, 1.7, 1.74, 1.66],
    ['2023/04/21', 1.7, 1.61, 1.7, 1.58],
    ['2023/04/24', 1.6, 1.57, 1.6, 1.55],
    ['2023/04/25', 1.55, 1.55, 1.57, 1.53],
    ['2023/04/26', 1.59, 1.55, 1.61, 1.54],
    ['2023/04/27', 1.53, 1.56, 1.6, 1.53],
    ['2023/04/28', 1.56, 1.58, 1.6, 1.56],
    ['2023/05/01', 1.6, 1.58, 1.67, 1.55],
    ['2023/05/02', 1.6, 1.55, 1.65, 1.55],
    ['2023/05/03', 1.55, 1.53, 1.58, 1.53],
    ['2023/05/04', 1.53, 1.57, 1.58, 1.51],
    ['2023/05/05', 1.55, 1.58, 1.64, 1.54],
    ['2023/05/08', 1.58, 1.6, 1.62, 1.56],
    ['2023/05/09', 1.57, 1.56, 1.6, 1.55],
    ['2023/05/10', 1.58, 1.57, 1.6, 1.57],
    ['2023/05/11', 1.55, 1.61, 1.62, 1.55],
    ['2023/05/12', 1.63, 1.6, 1.63, 1.57],
    ['2023/05/15', 1.63, 1.6, 1.68, 1.59],
    ['2023/05/16', 1.69, 1.66, 1.69, 1.61],
    ['2023/05/17', 1.69, 1.73, 1.74, 1.64],
    ['2023/05/18', 1.71, 1.64, 1.73, 1.62],
    ['2023/05/19', 1.65, 1.62, 1.71, 1.61],
    ['2023/05/22', 1.61, 1.53, 1.62, 1.52],
    ['2023/05/23', 1.53, 1.51, 1.53, 1.5],
    ['2023/05/24', 1.51, 1.45, 1.52, 1.42],
    ['2023/05/25', 1.39, 1.32, 1.43, 1.28],
    ['2023/05/26', 1.33, 1.35, 1.4, 1.31],
    ['2023/05/30', 1.32, 1.34, 1.37, 1.32],
    ['2023/05/31', 1.32, 1.34, 1.39, 1.32],
    ['2023/06/01', 1.37, 1.37, 1.4, 1.34],
    ['2023/06/02', 1.41, 1.44, 1.55, 1.41],
    ['2023/06/05', 1.44, 1.35, 1.46, 1.34],
    ['2023/06/06', 1.48, 1.68, 1.93, 1.43],
    ['2023/06/07', 1.65, 1.63, 1.65, 1.57],
    ['2023/06/08', 1.58, 1.62, 1.69, 1.55],
    ['2023/06/09', 1.68, 1.59, 1.68, 1.57],
    ['2023/06/12', 1.59, 1.62, 1.63, 1.52],
    ['2023/06/13', 1.6, 1.76, 1.78, 1.6],
    ['2023/06/14', 1.76, 1.74, 1.8, 1.74],
    ['2023/06/15', 1.76, 1.9, 1.92, 1.76],
    ['2023/06/16', 1.93, 1.86, 1.95, 1.8],
    ['2023/06/20', 1.87, 1.94, 1.97, 1.87],
    ['2023/06/21', 1.94, 1.84, 1.94, 1.81],
    ['2023/06/22', 1.84, 1.87, 1.89, 1.8],
    ['2023/06/23', 1.82, 1.83, 1.89, 1.78],
    ['2023/06/26', 1.8, 1.84, 1.91, 1.78],
    ['2023/06/27', 1.92, 1.98, 2.0, 1.85],
    ['2023/06/28', 1.99, 2.07, 2.09, 1.9],
    ['2023/06/29', 2.02, 2.02, 2.04, 1.97],
    ['2023/06/30', 2.06, 1.98, 2.09, 1.97],
    ['2023/07/03', 2.01, 1.99, 2.09, 1.99],
    ['2023/07/05', 1.94, 1.98, 2.02, 1.89],
    ['2023/07/06', 1.94, 1.97, 1.99, 1.86],
    ['2023/07/07', 1.91, 1.98, 2.05, 1.86],
    ['2023/07/10', 1.98, 1.9, 1.98, 1.82],
    ['2023/07/11', 1.9, 1.92, 1.96, 1.89],
    ['2023/07/12', 1.95, 1.96, 2.0, 1.93],
    ['2023/07/13', 2.01, 2.05, 2.05, 2.0],
    ['2023/07/14', 2.04, 2.01, 2.04, 1.98],
    ['2023/07/17', 1.99, 1.99, 2.03, 1.98],
    ['2023/07/18', 1.99, 2.01, 2.03, 1.98],
    ['2023/07/19', 1.98, 1.96, 2.03, 1.96],
    ['2023/07/20', 2.01, 2.0, 2.01, 1.97],
    ['2023/07/21', 2.02, 1.99, 2.02, 1.95],
    ['2023/07/24', 1.98, 2.01, 2.03, 1.94],
    ['2023/07/25', 1.94, 1.95, 2.04, 1.92],
    ['2023/07/26', 1.93, 1.98, 1.99, 1.93],
    ['2023/07/27', 1.95, 1.94, 2.0, 1.94],
    ['2023/07/28', 1.98, 2.01, 2.03, 1.93],
    ['2023/07/31', 2.02, 2.05, 2.06, 2.01],
    ['2023/08/01', 2.05, 2.03, 2.05, 1.99],
    ['2023/08/02', 2.02, 1.97, 2.02, 1.95],
]);
var volumes = [
    59300.0,
    82500.0,
    116200.0,
    62000.0,
    94000.0,
    72100.0,
    86700.0,
    59900.0,
    606100.0,
    219900.0,
    90700.0,
    105600.0,
    224800.0,
    181600.0,
    169500.0,
    182800.0,
    102700.0,
    406400.0,
    203700.0,
    115900.0,
    90700.0,
    77800.0,
    55600.0,
    103600.0,
    41800.0,
    73000.0,
    27800.0,
    244100.0,
    89500.0,
    45900.0,
    58400.0,
    60800.0,
    69200.0,
    34600.0,
    33000.0,
    70100.0,
    208900.0,
    35400.0,
    75500.0,
    102400.0,
    31200.0,
    19600.0,
    25100.0,
    19400.0,
    79500.0,
    33100.0,
    96300.0,
    86500.0,
    55600.0,
    63600.0,
    67500.0,
    33400.0,
    59500.0,
    58900.0,
    69500.0,
    28900.0,
    28000.0,
    238400.0,
    52100.0,
    38600.0,
    25700.0,
    687500.0,
    434800.0,
    548900.0,
    366700.0,
    130400.0,
    415900.0,
    146300.0,
    105300.0,
    118500.0,
    1467600.0,
    491300.0,
    503400.0,
    605700.0,
    218700.0,
    197100.0,
    394900.0,
    146100.0,
    122100.0,
    178900.0,
    124400.0,
    76200.0,
    100300.0,
    265700.0,
    115800.0,
    239700.0,
    183200.0,
    73200.0,
    133000.0,
    186600.0,
    101300.0,
    36900.0,
    88600.0,
    78900.0,
    113800.0,
    297900.0,
    130600.0,
    62000.0,
    80700.0,
    59800.0,
    78000.0,
    52200.0,
    155400.0,
    81900.0,
    87300.0,
    83200.0,
    71800.0,
    103900.0,
    37700.0,
    176600.0,
    108100.0,
    284300.0,
    81700.0,
    167500.0,
    80300.0,
    88400.0,
    107300.0,
    69800.0,
    188800.0,
    50400.0,
    28500.0,
    50900.0,
    187800.0,
    84700.0,
    85900.0,
    89800.0,
    107800.0,
    89700.0,
    88300.0,
    109100.0,
    70100.0,
    227400.0,
    184100.0,
    172800.0,
    73400.0,
    71200.0,
    80100.0,
    40900.0,
    170200.0,
    27000.0,
    60900.0,
    58800.0,
    113100.0,
    16600.0,
    71300.0,
    63900.0,
    30200.0,
    30200.0,
    56800.0,
    68300.0,
    97600.0,
    77500.0,
    67900.0,
    71100.0,
    84900.0,
    171200.0,
    189900.0,
    146700.0,
    85400.0,
    59800.0,
    42800.0,
    9000.0,
    66100.0,
    90200.0,
    48200.0,
    90600.0,
    44800.0,
    78400.0,
    75100.0,
    86200.0,
    91900.0,
    50000.0,
    120100.0,
    68100.0,
    107200.0,
    33500.0,
    10500.0,
    35800.0,
    59500.0,
    61400.0,
    114300.0,
    40100.0,
    36500.0,
    34500.0,
    48100.0,
    14200.0,
    35700.0,
    94400.0,
    25600.0,
    44400.0,
    41800.0,
    18900.0,
    37500.0,
    26700.0,
    32700.0,
    37700.0,
    51400.0,
    49600.0,
    59400.0,
    29800.0,
    82500.0,
    109600.0,
    32400.0,
    140100.0,
    290000.0,
    64900.0,
    29000.0,
    53900.0,
    68800.0,
    159100.0,
    123300.0,
    5684700.0,
    287500.0,
    322300.0,
    120500.0,
    126800.0,
    213700.0,
    122700.0,
    249000.0,
    253400.0,
    232800.0,
    223000.0,
    70700.0,
    151200.0,
    84000.0,
    136300.0,
    149300.0,
    83700.0,
    54100.0,
    41700.0,
    90900.0,
    106600.0,
    82900.0,
    189000.0,
    65500.0,
    70900.0,
    74400.0,
    42300.0,
    36700.0,
    93700.0,
    70600.0,
    53200.0,
    52500.0,
    82800.0,
    61200.0,
    45900.0,
    59800.0,
    139800.0,
    80100.0,
    38000.0,
    40600.0,
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
        text: "XNET",
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