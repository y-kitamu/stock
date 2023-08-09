/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_WLDN");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/10', 28.21, 27.89, 28.21, 27.34],
    ['2022/08/11', 28.2, 28.1, 28.52, 27.73],
    ['2022/08/12', 28.46, 28.6, 28.75, 27.72],
    ['2022/08/15', 28.39, 28.23, 28.62, 27.49],
    ['2022/08/16', 28.39, 28.0, 28.49, 27.72],
    ['2022/08/17', 27.7, 28.24, 28.41, 27.7],
    ['2022/08/18', 27.88, 28.37, 28.5, 27.88],
    ['2022/08/19', 28.05, 27.65, 28.1, 27.6],
    ['2022/08/22', 26.94, 26.54, 27.46, 26.45],
    ['2022/08/23', 26.4, 26.52, 27.11, 26.35],
    ['2022/08/24', 26.5, 26.71, 27.0, 26.38],
    ['2022/08/25', 26.93, 27.02, 27.41, 26.92],
    ['2022/08/26', 27.03, 25.45, 27.2, 25.39],
    ['2022/08/29', 25.16, 24.7, 25.22, 24.67],
    ['2022/08/30', 24.11, 23.56, 24.18, 23.54],
    ['2022/08/31', 23.73, 22.76, 24.21, 22.6],
    ['2022/09/01', 22.64, 22.4, 22.64, 21.73],
    ['2022/09/02', 22.59, 21.65, 22.87, 21.42],
    ['2022/09/06', 21.65, 21.19, 22.03, 21.07],
    ['2022/09/07', 21.11, 21.26, 21.4, 20.64],
    ['2022/09/08', 21.03, 20.23, 21.65, 19.95],
    ['2022/09/09', 20.54, 20.76, 21.01, 19.96],
    ['2022/09/12', 20.76, 20.9, 21.14, 19.88],
    ['2022/09/13', 20.07, 19.16, 20.35, 18.66],
    ['2022/09/14', 19.1, 18.15, 19.39, 17.83],
    ['2022/09/15', 18.08, 17.79, 18.14, 17.1],
    ['2022/09/16', 17.57, 17.97, 18.2, 17.09],
    ['2022/09/19', 17.95, 18.04, 18.32, 17.6],
    ['2022/09/20', 17.98, 17.6, 18.12, 17.15],
    ['2022/09/21', 17.61, 17.38, 17.79, 17.1],
    ['2022/09/22', 17.18, 16.98, 17.39, 16.59],
    ['2022/09/23', 16.62, 16.52, 17.1, 16.4],
    ['2022/09/26', 16.57, 16.02, 16.58, 15.86],
    ['2022/09/27', 16.23, 15.69, 16.43, 15.46],
    ['2022/09/28', 15.77, 15.57, 15.9, 15.46],
    ['2022/09/29', 15.34, 14.9, 15.9, 14.3],
    ['2022/09/30', 14.75, 14.81, 15.35, 14.75],
    ['2022/10/03', 14.83, 15.07, 15.36, 14.65],
    ['2022/10/04', 15.41, 15.23, 16.51, 15.17],
    ['2022/10/05', 14.98, 14.55, 15.01, 14.32],
    ['2022/10/06', 14.54, 14.2, 14.64, 13.95],
    ['2022/10/07', 13.93, 13.34, 14.25, 13.17],
    ['2022/10/10', 13.36, 13.35, 13.9, 13.15],
    ['2022/10/11', 13.27, 13.21, 13.87, 13.13],
    ['2022/10/12', 13.29, 12.76, 13.72, 12.37],
    ['2022/10/13', 12.35, 11.63, 12.35, 11.6],
    ['2022/10/14', 11.65, 11.59, 11.73, 10.98],
    ['2022/10/17', 11.9, 12.5, 12.55, 11.69],
    ['2022/10/18', 12.79, 12.4, 13.09, 12.3],
    ['2022/10/19', 12.18, 12.35, 12.47, 11.61],
    ['2022/10/20', 12.28, 12.75, 13.24, 12.1],
    ['2022/10/21', 12.83, 13.11, 13.26, 12.67],
    ['2022/10/24', 13.15, 12.81, 13.15, 12.72],
    ['2022/10/25', 12.81, 13.68, 13.86, 12.81],
    ['2022/10/26', 13.61, 13.68, 14.2, 13.48],
    ['2022/10/27', 13.73, 13.65, 14.05, 13.6],
    ['2022/10/28', 13.71, 14.26, 14.37, 13.62],
    ['2022/10/31', 14.16, 13.82, 14.36, 13.76],
    ['2022/11/01', 13.86, 13.95, 14.09, 13.64],
    ['2022/11/02', 13.85, 13.13, 13.93, 13.07],
    ['2022/11/03', 12.87, 12.97, 13.39, 12.77],
    ['2022/11/04', 12.78, 16.77, 16.78, 12.77],
    ['2022/11/07', 16.68, 16.48, 17.1, 15.92],
    ['2022/11/08', 16.54, 16.5, 17.51, 16.18],
    ['2022/11/09', 16.35, 15.96, 16.53, 15.91],
    ['2022/11/10', 16.73, 16.38, 17.29, 16.14],
    ['2022/11/11', 16.49, 16.18, 16.65, 15.72],
    ['2022/11/14', 15.99, 16.39, 16.69, 15.65],
    ['2022/11/15', 16.68, 17.17, 17.9, 16.47],
    ['2022/11/16', 16.97, 16.7, 16.97, 15.54],
    ['2022/11/17', 16.44, 16.31, 16.44, 15.8],
    ['2022/11/18', 16.6, 16.27, 16.82, 15.87],
    ['2022/11/21', 16.11, 16.13, 16.55, 15.93],
    ['2022/11/22', 16.34, 16.31, 16.52, 16.07],
    ['2022/11/23', 16.31, 16.28, 16.45, 15.5],
    ['2022/11/25', 16.17, 16.27, 16.45, 16.13],
    ['2022/11/28', 16.16, 16.83, 17.13, 16.16],
    ['2022/11/29', 16.63, 17.21, 17.43, 16.63],
    ['2022/11/30', 17.31, 17.54, 18.2, 16.91],
    ['2022/12/01', 17.52, 16.09, 17.63, 15.96],
    ['2022/12/02', 15.95, 15.83, 15.97, 15.51],
    ['2022/12/05', 15.56, 15.88, 16.02, 15.56],
    ['2022/12/06', 15.7, 15.72, 16.07, 15.44],
    ['2022/12/07', 15.55, 15.1, 15.55, 15.04],
    ['2022/12/08', 15.12, 15.23, 15.84, 14.94],
    ['2022/12/09', 15.01, 14.76, 15.17, 14.51],
    ['2022/12/12', 14.54, 15.3, 15.44, 14.52],
    ['2022/12/13', 15.52, 16.28, 16.64, 15.52],
    ['2022/12/14', 16.26, 16.65, 16.91, 16.23],
    ['2022/12/15', 16.78, 17.35, 17.47, 16.6],
    ['2022/12/16', 16.87, 18.4, 18.99, 16.87],
    ['2022/12/19', 18.28, 17.7, 18.28, 17.27],
    ['2022/12/20', 17.7, 17.93, 18.21, 17.66],
    ['2022/12/21', 18.15, 18.17, 18.68, 16.83],
    ['2022/12/22', 17.85, 17.84, 18.23, 17.53],
    ['2022/12/23', 17.84, 17.09, 17.84, 16.95],
    ['2022/12/27', 17.25, 17.91, 18.03, 17.22],
    ['2022/12/28', 17.81, 17.8, 17.87, 17.49],
    ['2022/12/29', 17.92, 17.83, 18.27, 17.81],
    ['2022/12/30', 17.66, 17.85, 18.1, 17.35],
    ['2023/01/03', 18.03, 17.84, 18.03, 17.32],
    ['2023/01/04', 17.87, 18.06, 18.3, 17.87],
    ['2023/01/05', 17.9, 17.94, 18.3, 17.79],
    ['2023/01/06', 18.24, 18.12, 18.42, 18.0],
    ['2023/01/09', 18.32, 17.86, 18.5, 17.81],
    ['2023/01/10', 17.71, 18.18, 18.37, 17.05],
    ['2023/01/11', 18.06, 18.4, 18.54, 18.06],
    ['2023/01/12', 18.4, 18.5, 18.81, 17.86],
    ['2023/01/13', 18.48, 19.32, 19.37, 18.48],
    ['2023/01/17', 18.95, 18.78, 19.32, 18.65],
    ['2023/01/18', 18.72, 17.86, 19.33, 17.81],
    ['2023/01/19', 17.85, 17.27, 17.99, 17.0],
    ['2023/01/20', 17.37, 17.38, 17.89, 16.95],
    ['2023/01/23', 17.38, 17.44, 18.02, 17.18],
    ['2023/01/24', 17.33, 18.54, 18.69, 17.04],
    ['2023/01/25', 18.5, 18.1, 18.91, 17.38],
    ['2023/01/26', 18.0, 18.99, 19.18, 17.77],
    ['2023/01/27', 19.0, 18.96, 19.59, 18.87],
    ['2023/01/30', 18.87, 18.73, 19.11, 18.2],
    ['2023/01/31', 18.95, 19.04, 19.34, 17.28],
    ['2023/02/01', 19.05, 20.82, 21.06, 19.05],
    ['2023/02/02', 20.87, 21.45, 22.08, 20.87],
    ['2023/02/03', 21.33, 21.12, 21.74, 21.07],
    ['2023/02/06', 21.06, 20.21, 21.15, 20.17],
    ['2023/02/07', 20.28, 19.41, 20.28, 19.01],
    ['2023/02/08', 19.27, 19.09, 19.54, 18.96],
    ['2023/02/09', 19.12, 18.79, 19.63, 18.65],
    ['2023/02/10', 18.61, 19.44, 19.65, 18.59],
    ['2023/02/13', 19.54, 19.73, 20.27, 19.09],
    ['2023/02/14', 19.68, 19.33, 20.56, 19.18],
    ['2023/02/15', 19.34, 20.09, 20.09, 19.24],
    ['2023/02/16', 19.69, 19.97, 20.51, 19.69],
    ['2023/02/17', 20.14, 19.62, 20.14, 19.36],
    ['2023/02/21', 19.36, 19.74, 20.59, 19.36],
    ['2023/02/22', 20.08, 19.62, 20.14, 19.49],
    ['2023/02/23', 19.92, 19.16, 20.22, 19.03],
    ['2023/02/24', 18.71, 17.97, 19.07, 17.9],
    ['2023/02/27', 18.33, 17.75, 18.7, 17.55],
    ['2023/02/28', 17.8, 18.06, 18.41, 17.77],
    ['2023/03/01', 17.94, 18.08, 19.21, 17.88],
    ['2023/03/02', 18.06, 17.64, 18.27, 17.53],
    ['2023/03/03', 17.74, 17.64, 18.01, 17.17],
    ['2023/03/06', 17.49, 17.61, 18.19, 17.45],
    ['2023/03/07', 17.77, 17.83, 17.94, 17.49],
    ['2023/03/08', 17.94, 17.23, 18.36, 17.16],
    ['2023/03/09', 17.47, 17.05, 17.77, 16.8],
    ['2023/03/10', 17.0, 15.63, 17.18, 14.5],
    ['2023/03/13', 15.5, 16.65, 17.04, 15.11],
    ['2023/03/14', 16.83, 17.06, 18.18, 16.83],
    ['2023/03/15', 16.53, 16.7, 17.02, 16.22],
    ['2023/03/16', 16.36, 16.94, 17.18, 16.29],
    ['2023/03/17', 16.78, 16.19, 17.22, 15.99],
    ['2023/03/20', 16.45, 16.01, 17.16, 15.76],
    ['2023/03/21', 16.2, 16.23, 16.4, 16.02],
    ['2023/03/22', 16.61, 15.58, 16.72, 15.51],
    ['2023/03/23', 15.59, 14.57, 15.76, 14.44],
    ['2023/03/24', 14.53, 14.56, 15.01, 14.08],
    ['2023/03/27', 14.57, 14.97, 15.26, 14.24],
    ['2023/03/28', 15.17, 15.27, 15.54, 14.86],
    ['2023/03/29', 15.54, 15.39, 15.93, 15.0],
    ['2023/03/30', 15.31, 14.89, 15.51, 14.59],
    ['2023/03/31', 15.2, 15.62, 15.63, 14.99],
    ['2023/04/03', 15.07, 15.05, 15.99, 14.8],
    ['2023/04/04', 14.54, 14.27, 15.4, 14.1],
    ['2023/04/05', 14.27, 14.36, 14.5, 13.98],
    ['2023/04/06', 14.38, 15.05, 15.27, 14.38],
    ['2023/04/10', 15.22, 15.51, 15.93, 15.09],
    ['2023/04/11', 15.67, 16.01, 16.33, 15.67],
    ['2023/04/12', 16.21, 15.37, 16.36, 15.35],
    ['2023/04/13', 15.46, 15.33, 15.86, 14.94],
    ['2023/04/14', 15.4, 15.32, 15.44, 15.08],
    ['2023/04/17', 15.36, 15.64, 15.65, 15.19],
    ['2023/04/18', 15.53, 15.26, 15.83, 15.21],
    ['2023/04/19', 14.86, 15.58, 15.67, 14.63],
    ['2023/04/20', 15.54, 15.63, 16.27, 15.03],
    ['2023/04/21', 15.53, 14.93, 15.89, 14.87],
    ['2023/04/24', 14.81, 15.26, 15.5, 14.74],
    ['2023/04/25', 15.17, 14.68, 15.35, 14.43],
    ['2023/04/26', 14.4, 14.08, 14.57, 13.9],
    ['2023/04/27', 14.25, 14.38, 14.4, 13.86],
    ['2023/04/28', 14.45, 14.65, 15.03, 14.09],
    ['2023/05/01', 14.48, 14.18, 14.74, 13.94],
    ['2023/05/02', 14.24, 14.34, 14.77, 14.0],
    ['2023/05/03', 14.43, 14.67, 15.16, 14.29],
    ['2023/05/04', 14.21, 14.35, 14.4, 14.1],
    ['2023/05/05', 17.1, 15.89, 17.1, 14.8],
    ['2023/05/08', 15.99, 16.96, 17.12, 15.53],
    ['2023/05/09', 16.75, 17.24, 17.43, 15.42],
    ['2023/05/10', 17.62, 17.35, 17.75, 15.88],
    ['2023/05/11', 17.04, 17.73, 17.88, 17.04],
    ['2023/05/12', 17.94, 17.51, 18.12, 17.16],
    ['2023/05/15', 17.45, 18.25, 18.5, 17.45],
    ['2023/05/16', 18.1, 17.94, 18.46, 17.79],
    ['2023/05/17', 17.91, 17.96, 18.22, 17.46],
    ['2023/05/18', 18.09, 17.5, 18.09, 17.27],
    ['2023/05/19', 17.69, 16.98, 17.77, 16.89],
    ['2023/05/22', 17.03, 17.88, 18.14, 16.91],
    ['2023/05/23', 18.05, 18.09, 18.41, 17.86],
    ['2023/05/24', 17.99, 17.82, 18.34, 17.58],
    ['2023/05/25', 17.75, 17.02, 17.94, 16.65],
    ['2023/05/26', 17.1, 16.95, 17.13, 16.69],
    ['2023/05/30', 17.21, 17.01, 17.52, 16.6],
    ['2023/05/31', 16.97, 16.66, 17.17, 16.47],
    ['2023/06/01', 16.66, 16.2, 16.66, 15.87],
    ['2023/06/02', 16.5, 17.47, 17.56, 16.0],
    ['2023/06/05', 17.32, 18.32, 18.75, 16.38],
    ['2023/06/06', 18.51, 19.92, 20.21, 18.43],
    ['2023/06/07', 20.04, 19.53, 20.3, 19.39],
    ['2023/06/08', 19.54, 18.92, 19.78, 18.69],
    ['2023/06/09', 18.69, 18.83, 19.2, 18.3],
    ['2023/06/12', 18.73, 18.92, 19.6, 18.73],
    ['2023/06/13', 18.82, 18.96, 19.54, 18.82],
    ['2023/06/14', 18.82, 18.01, 19.06, 17.78],
    ['2023/06/15', 18.3, 18.73, 18.83, 18.11],
    ['2023/06/16', 18.98, 18.3, 19.38, 18.18],
    ['2023/06/20', 18.4, 17.59, 18.52, 17.51],
    ['2023/06/21', 17.41, 18.06, 18.25, 17.41],
    ['2023/06/22', 17.85, 17.58, 17.86, 17.48],
    ['2023/06/23', 17.22, 17.59, 17.87, 17.2],
    ['2023/06/26', 17.33, 18.07, 18.46, 17.33],
    ['2023/06/27', 18.04, 17.8, 18.33, 17.54],
    ['2023/06/28', 17.86, 18.64, 18.78, 17.5],
    ['2023/06/29', 18.58, 18.79, 19.4, 18.54],
    ['2023/06/30', 18.86, 19.16, 19.38, 18.85],
    ['2023/07/03', 18.93, 18.66, 19.2, 18.11],
    ['2023/07/05', 18.64, 18.3, 18.75, 18.17],
    ['2023/07/06', 18.15, 17.8, 18.22, 17.27],
    ['2023/07/07', 17.95, 19.08, 19.54, 17.48],
    ['2023/07/10', 18.84, 18.76, 19.26, 18.53],
    ['2023/07/11', 18.8, 19.04, 19.12, 18.53],
    ['2023/07/12', 19.22, 19.52, 19.65, 17.98],
    ['2023/07/13', 19.59, 19.72, 19.82, 19.41],
    ['2023/07/14', 19.53, 19.02, 19.84, 18.76],
    ['2023/07/17', 19.12, 19.27, 19.75, 18.83],
    ['2023/07/18', 19.18, 19.19, 19.4, 19.0],
    ['2023/07/19', 19.11, 19.36, 19.49, 19.1],
    ['2023/07/20', 19.23, 19.4, 19.49, 18.95],
    ['2023/07/21', 19.46, 19.66, 19.8, 19.38],
    ['2023/07/24', 19.55, 19.14, 19.61, 19.02],
    ['2023/07/25', 19.16, 19.24, 19.47, 18.95],
    ['2023/07/26', 19.2, 19.81, 20.3, 19.19],
    ['2023/07/27', 19.83, 19.2, 19.83, 19.12],
    ['2023/07/28', 19.46, 19.68, 19.83, 18.92],
    ['2023/07/31', 19.61, 20.18, 20.49, 19.06],
    ['2023/08/01', 20.2, 20.36, 20.94, 20.03],
    ['2023/08/02', 20.29, 19.86, 20.73, 19.77],
    ['2023/08/03', 20.22, 20.25, 21.13, 19.35],
    ['2023/08/04', 20.74, 24.48, 25.06, 20.72],
    ['2023/08/07', 24.45, 24.38, 25.38, 23.19],
    ['2023/08/08', 23.98, 24.34, 24.42, 23.25],
]);
var volumes = [
    62400.0,
    26600.0,
    57000.0,
    25900.0,
    47700.0,
    30700.0,
    28400.0,
    34300.0,
    36300.0,
    27900.0,
    44200.0,
    18300.0,
    24600.0,
    18000.0,
    21300.0,
    41300.0,
    60800.0,
    16600.0,
    19300.0,
    44800.0,
    30400.0,
    74700.0,
    61900.0,
    54500.0,
    46400.0,
    61400.0,
    245200.0,
    58900.0,
    61800.0,
    54200.0,
    105300.0,
    37400.0,
    64300.0,
    42500.0,
    64500.0,
    75400.0,
    43400.0,
    105600.0,
    97000.0,
    49700.0,
    59500.0,
    72600.0,
    66800.0,
    72800.0,
    119000.0,
    57600.0,
    86100.0,
    87300.0,
    65400.0,
    68700.0,
    85100.0,
    33800.0,
    39200.0,
    31600.0,
    31100.0,
    16100.0,
    28600.0,
    72000.0,
    27800.0,
    38100.0,
    26200.0,
    100400.0,
    52400.0,
    38700.0,
    28400.0,
    72900.0,
    41600.0,
    64600.0,
    63100.0,
    36100.0,
    33900.0,
    31600.0,
    27800.0,
    24100.0,
    18500.0,
    13100.0,
    34200.0,
    54500.0,
    290700.0,
    32800.0,
    22600.0,
    25300.0,
    42700.0,
    29800.0,
    39800.0,
    20800.0,
    80000.0,
    123900.0,
    89300.0,
    48500.0,
    154300.0,
    49100.0,
    37800.0,
    93300.0,
    45300.0,
    9600.0,
    51700.0,
    35600.0,
    16900.0,
    17100.0,
    24500.0,
    17300.0,
    20200.0,
    23700.0,
    20800.0,
    35400.0,
    41700.0,
    16700.0,
    16300.0,
    30400.0,
    40600.0,
    33200.0,
    56700.0,
    44500.0,
    62000.0,
    97400.0,
    98400.0,
    64500.0,
    88400.0,
    504100.0,
    53200.0,
    40400.0,
    31200.0,
    36500.0,
    52200.0,
    35100.0,
    26100.0,
    40500.0,
    28500.0,
    38900.0,
    30100.0,
    30300.0,
    24300.0,
    34100.0,
    28500.0,
    21800.0,
    29100.0,
    27200.0,
    23400.0,
    17700.0,
    11700.0,
    156300.0,
    70400.0,
    34400.0,
    31600.0,
    77600.0,
    99000.0,
    82300.0,
    53400.0,
    35800.0,
    29100.0,
    115300.0,
    68600.0,
    43200.0,
    57400.0,
    47300.0,
    39900.0,
    49900.0,
    18000.0,
    19000.0,
    44200.0,
    26600.0,
    27200.0,
    28900.0,
    27000.0,
    37100.0,
    41400.0,
    32300.0,
    44800.0,
    44400.0,
    40300.0,
    47800.0,
    14600.0,
    34200.0,
    21200.0,
    52600.0,
    45900.0,
    13500.0,
    33000.0,
    13500.0,
    23500.0,
    22700.0,
    32100.0,
    22200.0,
    27400.0,
    82100.0,
    66900.0,
    50400.0,
    48700.0,
    35300.0,
    19400.0,
    28500.0,
    20700.0,
    27900.0,
    19000.0,
    35300.0,
    63500.0,
    63800.0,
    26900.0,
    16800.0,
    21000.0,
    22800.0,
    12500.0,
    22200.0,
    29400.0,
    29200.0,
    31600.0,
    45100.0,
    32200.0,
    21200.0,
    19100.0,
    43100.0,
    57000.0,
    22600.0,
    35400.0,
    27900.0,
    12700.0,
    14300.0,
    160700.0,
    57500.0,
    111400.0,
    74600.0,
    18800.0,
    21200.0,
    18300.0,
    15400.0,
    14700.0,
    81900.0,
    26600.0,
    23600.0,
    21100.0,
    13400.0,
    12100.0,
    12000.0,
    14900.0,
    10600.0,
    11500.0,
    16000.0,
    20300.0,
    10300.0,
    27300.0,
    13400.0,
    11600.0,
    21800.0,
    24500.0,
    23700.0,
    433000.0,
    98100.0,
    94100.0,
    73200.0,
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
     *     text: "WLDN",
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