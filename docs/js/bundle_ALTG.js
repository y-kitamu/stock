/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_ALTG");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/03', 11.01, 11.14, 11.17, 10.95],
    ['2022/08/04', 11.19, 11.47, 11.48, 11.11],
    ['2022/08/05', 11.37, 11.37, 11.46, 11.27],
    ['2022/08/08', 11.57, 11.47, 11.71, 11.28],
    ['2022/08/09', 11.51, 11.16, 11.51, 11.14],
    ['2022/08/10', 12.99, 13.0, 13.26, 12.44],
    ['2022/08/11', 13.15, 12.98, 13.3, 12.92],
    ['2022/08/12', 13.09, 13.01, 13.15, 12.77],
    ['2022/08/15', 12.94, 13.26, 13.27, 12.94],
    ['2022/08/16', 13.17, 13.07, 13.31, 13.06],
    ['2022/08/17', 13.01, 12.81, 13.02, 12.65],
    ['2022/08/18', 12.71, 12.82, 12.96, 12.58],
    ['2022/08/19', 12.64, 12.55, 12.7, 12.4],
    ['2022/08/22', 12.34, 12.26, 12.55, 12.25],
    ['2022/08/23', 12.37, 12.42, 12.61, 12.37],
    ['2022/08/24', 12.48, 12.55, 12.79, 12.42],
    ['2022/08/25', 12.56, 12.34, 12.58, 12.23],
    ['2022/08/26', 12.42, 11.88, 12.42, 11.74],
    ['2022/08/29', 11.76, 11.81, 11.9, 11.76],
    ['2022/08/30', 11.79, 11.67, 11.88, 11.61],
    ['2022/08/31', 11.68, 11.63, 12.12, 11.56],
    ['2022/09/01', 11.54, 11.58, 11.64, 11.37],
    ['2022/09/02', 11.76, 11.77, 11.9, 11.58],
    ['2022/09/06', 11.78, 12.11, 12.14, 11.59],
    ['2022/09/07', 12.15, 12.59, 12.65, 12.15],
    ['2022/09/08', 12.49, 12.78, 12.84, 12.37],
    ['2022/09/09', 12.92, 13.04, 13.11, 12.89],
    ['2022/09/12', 13.21, 12.93, 13.23, 12.88],
    ['2022/09/13', 12.68, 12.78, 13.55, 12.49],
    ['2022/09/14', 12.87, 12.67, 12.87, 12.51],
    ['2022/09/15', 12.61, 12.49, 12.84, 12.37],
    ['2022/09/16', 12.39, 12.01, 12.39, 11.79],
    ['2022/09/19', 11.84, 11.92, 12.13, 11.76],
    ['2022/09/20', 11.81, 12.05, 12.13, 11.72],
    ['2022/09/21', 12.19, 11.69, 12.27, 11.67],
    ['2022/09/22', 11.63, 11.28, 11.63, 11.2],
    ['2022/09/23', 11.43, 11.1, 11.43, 10.86],
    ['2022/09/26', 10.95, 10.7, 11.25, 10.64],
    ['2022/09/27', 10.83, 10.76, 10.99, 10.65],
    ['2022/09/28', 10.9, 11.23, 11.34, 10.87],
    ['2022/09/29', 11.1, 10.84, 11.2, 10.73],
    ['2022/09/30', 10.72, 10.88, 10.93, 10.68],
    ['2022/10/03', 11.06, 11.2, 11.37, 11.02],
    ['2022/10/04', 11.39, 11.55, 11.69, 11.39],
    ['2022/10/05', 11.3, 11.35, 11.37, 11.17],
    ['2022/10/06', 11.32, 11.18, 11.4, 11.11],
    ['2022/10/07', 11.11, 10.91, 11.11, 10.72],
    ['2022/10/10', 10.97, 10.95, 11.1, 10.85],
    ['2022/10/11', 10.96, 11.08, 11.18, 10.79],
    ['2022/10/12', 11.01, 10.9, 11.06, 10.85],
    ['2022/10/13', 10.71, 11.28, 11.4, 10.52],
    ['2022/10/14', 11.28, 10.85, 11.3, 10.8],
    ['2022/10/17', 10.95, 10.7, 11.1, 10.55],
    ['2022/10/18', 10.86, 11.03, 11.17, 10.8],
    ['2022/10/19', 11.03, 10.89, 11.08, 10.76],
    ['2022/10/20', 10.96, 10.73, 11.1, 10.66],
    ['2022/10/21', 10.8, 11.2, 11.2, 10.62],
    ['2022/10/24', 11.3, 11.31, 11.45, 11.14],
    ['2022/10/25', 11.27, 11.72, 11.91, 11.27],
    ['2022/10/26', 11.82, 11.67, 11.9, 11.64],
    ['2022/10/27', 11.8, 11.66, 11.85, 11.58],
    ['2022/10/28', 11.73, 12.29, 12.33, 11.42],
    ['2022/10/31', 12.21, 12.09, 12.32, 12.05],
    ['2022/11/01', 12.2, 12.52, 12.62, 12.1],
    ['2022/11/02', 12.52, 11.86, 12.62, 11.83],
    ['2022/11/03', 11.66, 11.9, 11.97, 11.64],
    ['2022/11/04', 12.02, 12.11, 12.2, 11.78],
    ['2022/11/07', 12.26, 11.94, 12.26, 11.81],
    ['2022/11/08', 12.09, 12.0, 12.16, 11.84],
    ['2022/11/09', 12.01, 11.92, 12.07, 11.78],
    ['2022/11/10', 13.08, 12.93, 13.77, 12.46],
    ['2022/11/11', 13.05, 12.97, 13.37, 12.6],
    ['2022/11/14', 12.86, 12.61, 13.15, 12.51],
    ['2022/11/15', 12.75, 12.45, 12.99, 12.34],
    ['2022/11/16', 13.23, 12.2, 13.54, 12.15],
    ['2022/11/17', 12.1, 12.16, 12.32, 11.91],
    ['2022/11/18', 12.37, 12.27, 12.82, 12.18],
    ['2022/11/21', 12.07, 12.09, 12.29, 11.96],
    ['2022/11/22', 12.25, 12.18, 12.28, 12.12],
    ['2022/11/23', 12.13, 11.93, 12.22, 11.91],
    ['2022/11/25', 11.98, 11.94, 12.01, 11.87],
    ['2022/11/28', 11.85, 11.81, 11.9, 11.77],
    ['2022/11/29', 11.68, 11.67, 11.73, 11.65],
    ['2022/11/30', 11.76, 11.95, 12.05, 11.49],
    ['2022/12/01', 12.07, 12.17, 12.28, 11.95],
    ['2022/12/02', 12.07, 12.13, 12.25, 12.02],
    ['2022/12/05', 12.07, 12.07, 12.18, 11.86],
    ['2022/12/06', 12.05, 12.13, 12.17, 11.93],
    ['2022/12/07', 12.12, 11.93, 12.2, 11.87],
    ['2022/12/08', 11.91, 12.21, 12.26, 11.91],
    ['2022/12/09', 12.21, 12.09, 12.28, 12.05],
    ['2022/12/12', 12.09, 12.19, 12.36, 12.09],
    ['2022/12/13', 12.49, 12.5, 12.88, 12.13],
    ['2022/12/14', 12.4, 12.72, 12.89, 12.4],
    ['2022/12/15', 12.5, 12.48, 12.59, 12.38],
    ['2022/12/16', 12.45, 12.51, 12.73, 12.28],
    ['2022/12/19', 12.55, 12.43, 12.71, 12.21],
    ['2022/12/20', 12.37, 12.53, 12.57, 12.36],
    ['2022/12/21', 12.64, 12.35, 12.89, 12.31],
    ['2022/12/22', 12.25, 12.35, 12.4, 12.06],
    ['2022/12/23', 12.37, 12.38, 12.49, 12.26],
    ['2022/12/27', 12.44, 12.36, 12.48, 12.3],
    ['2022/12/28', 12.4, 12.43, 12.62, 12.21],
    ['2022/12/29', 12.54, 12.67, 12.76, 12.54],
    ['2022/12/30', 12.58, 13.09, 13.14, 12.58],
    ['2023/01/03', 13.26, 13.2, 13.4, 12.61],
    ['2023/01/04', 13.39, 14.13, 14.25, 13.27],
    ['2023/01/05', 14.17, 14.37, 14.61, 13.92],
    ['2023/01/06', 14.49, 14.91, 15.08, 14.3],
    ['2023/01/09', 15.18, 15.06, 15.92, 14.95],
    ['2023/01/10', 15.16, 15.4, 15.55, 15.15],
    ['2023/01/11', 15.19, 15.44, 15.73, 15.14],
    ['2023/01/12', 15.52, 15.5, 15.86, 15.33],
    ['2023/01/13', 15.31, 15.78, 15.83, 15.28],
    ['2023/01/17', 15.8, 16.01, 16.28, 15.75],
    ['2023/01/18', 16.22, 15.87, 16.35, 15.8],
    ['2023/01/19', 15.82, 15.9, 16.06, 15.78],
    ['2023/01/20', 15.96, 15.85, 16.01, 15.55],
    ['2023/01/23', 15.83, 15.95, 16.07, 15.63],
    ['2023/01/24', 16.0, 16.42, 16.65, 15.84],
    ['2023/01/25', 16.37, 16.48, 16.63, 16.26],
    ['2023/01/26', 16.7, 16.46, 16.75, 16.24],
    ['2023/01/27', 16.51, 16.48, 16.77, 16.35],
    ['2023/01/30', 16.39, 16.58, 16.66, 16.34],
    ['2023/01/31', 16.59, 16.83, 16.99, 16.59],
    ['2023/02/01', 16.88, 17.05, 17.17, 16.66],
    ['2023/02/02', 17.21, 17.07, 17.42, 16.74],
    ['2023/02/03', 16.82, 17.06, 17.16, 16.77],
    ['2023/02/06', 16.99, 17.16, 17.28, 16.96],
    ['2023/02/07', 17.11, 17.72, 17.74, 16.96],
    ['2023/02/08', 17.62, 17.43, 17.83, 17.35],
    ['2023/02/09', 17.49, 17.1, 17.7, 17.09],
    ['2023/02/10', 17.15, 17.11, 17.28, 17.04],
    ['2023/02/13', 17.14, 17.37, 17.57, 17.14],
    ['2023/02/14', 17.43, 17.92, 18.01, 17.32],
    ['2023/02/15', 17.83, 18.12, 18.45, 17.82],
    ['2023/02/16', 17.93, 17.72, 18.19, 17.7],
    ['2023/02/17', 17.74, 18.02, 18.12, 17.56],
    ['2023/02/21', 17.83, 17.92, 18.15, 17.61],
    ['2023/02/22', 18.03, 17.78, 18.35, 17.68],
    ['2023/02/23', 17.99, 18.03, 18.22, 17.89],
    ['2023/02/24', 17.88, 18.11, 18.19, 17.52],
    ['2023/02/27', 18.25, 18.51, 18.64, 18.25],
    ['2023/02/28', 18.55, 18.74, 19.18, 18.55],
    ['2023/03/01', 18.72, 18.78, 19.15, 18.69],
    ['2023/03/02', 18.67, 18.9, 19.22, 18.55],
    ['2023/03/03', 19.03, 19.27, 19.55, 18.92],
    ['2023/03/06', 19.31, 19.45, 19.58, 19.26],
    ['2023/03/07', 19.53, 19.73, 19.94, 19.43],
    ['2023/03/08', 19.9, 19.78, 20.15, 19.69],
    ['2023/03/09', 19.72, 19.19, 20.0, 19.01],
    ['2023/03/10', 20.52, 16.93, 20.52, 14.29],
    ['2023/03/13', 16.47, 15.65, 16.52, 14.94],
    ['2023/03/14', 16.06, 16.16, 16.51, 15.81],
    ['2023/03/15', 16.25, 16.07, 17.15, 15.85],
    ['2023/03/16', 15.83, 16.73, 17.29, 15.69],
    ['2023/03/17', 16.68, 15.02, 16.87, 14.95],
    ['2023/03/20', 15.08, 15.54, 15.75, 15.02],
    ['2023/03/21', 15.86, 15.34, 16.33, 15.28],
    ['2023/03/22', 15.39, 15.56, 15.98, 15.23],
    ['2023/03/23', 15.64, 15.46, 15.89, 15.27],
    ['2023/03/24', 15.39, 15.29, 15.4, 14.94],
    ['2023/03/27', 15.59, 15.38, 15.59, 15.15],
    ['2023/03/28', 15.27, 15.19, 15.69, 15.14],
    ['2023/03/29', 15.33, 15.6, 15.67, 15.12],
    ['2023/03/30', 15.75, 15.55, 15.91, 15.5],
    ['2023/03/31', 15.71, 15.79, 15.92, 15.45],
    ['2023/04/03', 15.81, 15.14, 15.85, 15.07],
    ['2023/04/04', 15.14, 14.04, 15.22, 13.96],
    ['2023/04/05', 14.04, 13.43, 14.04, 13.35],
    ['2023/04/06', 13.45, 13.34, 13.66, 13.18],
    ['2023/04/10', 13.49, 13.83, 13.92, 13.34],
    ['2023/04/11', 13.79, 13.9, 14.02, 13.65],
    ['2023/04/12', 14.05, 13.97, 14.07, 13.75],
    ['2023/04/13', 13.92, 13.77, 13.93, 13.6],
    ['2023/04/14', 13.74, 13.57, 13.88, 13.51],
    ['2023/04/17', 13.63, 14.15, 14.19, 13.54],
    ['2023/04/18', 14.15, 14.34, 15.11, 14.15],
    ['2023/04/19', 14.22, 14.16, 14.22, 13.73],
    ['2023/04/20', 14.05, 13.97, 14.18, 13.92],
    ['2023/04/21', 13.98, 13.94, 13.98, 13.66],
    ['2023/04/24', 13.9, 14.04, 14.1, 13.82],
    ['2023/04/25', 13.89, 13.96, 14.0, 13.8],
    ['2023/04/26', 13.81, 13.73, 13.89, 13.55],
    ['2023/04/27', 13.74, 13.95, 13.98, 13.36],
    ['2023/04/28', 13.88, 14.08, 14.23, 13.79],
    ['2023/05/01', 14.03, 13.81, 14.43, 13.74],
    ['2023/05/02', 13.8, 13.67, 13.84, 13.34],
    ['2023/05/03', 13.74, 13.65, 14.03, 13.58],
    ['2023/05/04', 13.51, 13.09, 13.51, 13.0],
    ['2023/05/05', 13.32, 13.32, 13.55, 13.17],
    ['2023/05/08', 13.37, 13.46, 13.66, 13.28],
    ['2023/05/09', 13.46, 13.7, 13.8, 13.31],
    ['2023/05/10', 13.87, 14.13, 14.24, 13.7],
    ['2023/05/11', 15.34, 14.24, 15.85, 13.64],
    ['2023/05/12', 14.32, 14.61, 14.79, 14.07],
    ['2023/05/15', 14.77, 15.28, 15.41, 14.68],
    ['2023/05/16', 15.15, 14.8, 15.19, 14.75],
    ['2023/05/17', 14.96, 15.11, 15.23, 14.76],
    ['2023/05/18', 15.1, 15.21, 15.32, 15.05],
    ['2023/05/19', 15.44, 15.13, 15.51, 14.91],
    ['2023/05/22', 15.28, 14.85, 15.28, 14.83],
    ['2023/05/23', 14.78, 14.67, 14.99, 14.6],
    ['2023/05/24', 14.53, 14.21, 14.56, 14.08],
    ['2023/05/25', 14.03, 14.28, 14.31, 13.76],
    ['2023/05/26', 14.25, 14.42, 14.54, 14.23],
    ['2023/05/30', 14.48, 14.22, 14.59, 14.07],
    ['2023/05/31', 14.22, 13.61, 14.27, 13.5],
    ['2023/06/01', 13.61, 13.52, 13.7, 13.34],
    ['2023/06/02', 13.79, 14.5, 14.6, 13.64],
    ['2023/06/05', 14.42, 14.16, 14.42, 14.04],
    ['2023/06/06', 14.56, 15.36, 15.65, 14.44],
    ['2023/06/07', 15.38, 15.8, 15.89, 15.38],
    ['2023/06/08', 15.71, 15.46, 15.71, 15.42],
    ['2023/06/09', 15.5, 15.36, 15.5, 15.0],
    ['2023/06/12', 15.5, 16.1, 16.25, 15.36],
    ['2023/06/13', 16.24, 16.43, 16.56, 16.14],
    ['2023/06/14', 16.57, 16.37, 16.57, 16.19],
    ['2023/06/15', 16.3, 16.68, 16.72, 16.22],
    ['2023/06/16', 16.85, 16.1, 16.85, 16.08],
    ['2023/06/20', 16.0, 16.24, 16.33, 15.67],
    ['2023/06/21', 16.21, 16.24, 16.35, 15.98],
    ['2023/06/22', 16.18, 15.96, 16.3, 15.89],
    ['2023/06/23', 15.63, 16.33, 16.35, 15.63],
    ['2023/06/26', 16.22, 16.24, 16.44, 16.05],
    ['2023/06/27', 16.24, 16.63, 16.85, 16.13],
    ['2023/06/28', 16.26, 16.81, 16.89, 16.23],
    ['2023/06/29', 16.81, 17.06, 17.26, 16.81],
    ['2023/06/30', 17.17, 17.33, 17.45, 17.06],
    ['2023/07/03', 17.43, 17.47, 17.68, 17.41],
    ['2023/07/05', 17.28, 16.92, 17.28, 16.9],
    ['2023/07/06', 16.71, 16.35, 16.93, 16.22],
    ['2023/07/07', 16.32, 16.57, 16.88, 16.32],
    ['2023/07/10', 16.5, 16.88, 16.9, 16.48],
    ['2023/07/11', 16.92, 16.8, 17.07, 16.63],
    ['2023/07/12', 17.06, 16.83, 17.09, 16.72],
    ['2023/07/13', 16.82, 17.1, 17.12, 16.67],
    ['2023/07/14', 17.09, 16.69, 17.11, 16.63],
    ['2023/07/17', 16.61, 17.08, 17.32, 16.61],
    ['2023/07/18', 17.16, 17.47, 17.49, 17.16],
    ['2023/07/19', 17.54, 17.66, 17.71, 17.22],
    ['2023/07/20', 17.83, 17.39, 17.98, 17.31],
    ['2023/07/21', 16.34, 16.14, 16.37, 15.42],
    ['2023/07/24', 16.16, 16.08, 16.34, 16.03],
    ['2023/07/25', 15.94, 16.17, 16.32, 15.89],
    ['2023/07/26', 16.17, 16.17, 16.26, 15.75],
    ['2023/07/27', 16.19, 15.99, 16.28, 15.81],
    ['2023/07/28', 16.08, 16.2, 16.29, 16.0],
    ['2023/07/31', 16.14, 16.15, 16.31, 16.05],
    ['2023/08/01', 16.16, 16.3, 16.4, 16.09],
    ['2023/08/02', 16.16, 17.02, 17.26, 16.1],
]);
var volumes = [
    37500.0,
    41800.0,
    24800.0,
    40600.0,
    110400.0,
    210500.0,
    97800.0,
    76700.0,
    87700.0,
    67500.0,
    33500.0,
    83200.0,
    48000.0,
    53400.0,
    55000.0,
    65500.0,
    96000.0,
    82900.0,
    53600.0,
    62200.0,
    70600.0,
    106900.0,
    70600.0,
    129600.0,
    105500.0,
    203800.0,
    52800.0,
    95900.0,
    114400.0,
    106300.0,
    112200.0,
    286200.0,
    120900.0,
    87800.0,
    92900.0,
    105600.0,
    131000.0,
    131800.0,
    91400.0,
    74100.0,
    69500.0,
    166600.0,
    50600.0,
    53900.0,
    33600.0,
    61500.0,
    50500.0,
    39800.0,
    42600.0,
    135200.0,
    79700.0,
    57500.0,
    115400.0,
    80400.0,
    41700.0,
    56900.0,
    71900.0,
    64800.0,
    50200.0,
    34000.0,
    45200.0,
    39700.0,
    36200.0,
    38800.0,
    55100.0,
    46300.0,
    33500.0,
    32600.0,
    37800.0,
    49300.0,
    172400.0,
    83100.0,
    55000.0,
    49000.0,
    78500.0,
    55300.0,
    30200.0,
    37600.0,
    51700.0,
    42100.0,
    24100.0,
    38400.0,
    40200.0,
    48900.0,
    61400.0,
    65300.0,
    72700.0,
    125700.0,
    48200.0,
    51300.0,
    29400.0,
    40900.0,
    346100.0,
    62900.0,
    78800.0,
    154100.0,
    74900.0,
    48100.0,
    32600.0,
    51600.0,
    39700.0,
    70800.0,
    137200.0,
    92600.0,
    49900.0,
    79500.0,
    140500.0,
    133200.0,
    174800.0,
    149800.0,
    123200.0,
    140700.0,
    110600.0,
    109800.0,
    154400.0,
    120000.0,
    106500.0,
    86700.0,
    175300.0,
    164000.0,
    105800.0,
    109500.0,
    117500.0,
    138500.0,
    241100.0,
    407000.0,
    244600.0,
    162200.0,
    148600.0,
    253200.0,
    142400.0,
    160800.0,
    194400.0,
    333800.0,
    251400.0,
    160200.0,
    137800.0,
    149400.0,
    218000.0,
    226100.0,
    331100.0,
    232500.0,
    339600.0,
    583400.0,
    143800.0,
    139300.0,
    148100.0,
    228600.0,
    179900.0,
    235900.0,
    486700.0,
    1409300.0,
    443800.0,
    300900.0,
    380000.0,
    319300.0,
    1362600.0,
    437900.0,
    250100.0,
    262600.0,
    202300.0,
    145300.0,
    184100.0,
    152600.0,
    211600.0,
    85800.0,
    266400.0,
    188400.0,
    382100.0,
    403800.0,
    292000.0,
    289100.0,
    349900.0,
    344400.0,
    209500.0,
    265200.0,
    220900.0,
    389200.0,
    190300.0,
    114500.0,
    155800.0,
    126800.0,
    139800.0,
    159100.0,
    165800.0,
    169800.0,
    164800.0,
    309900.0,
    188100.0,
    188100.0,
    149200.0,
    142600.0,
    165700.0,
    198600.0,
    478700.0,
    162500.0,
    201600.0,
    213300.0,
    189800.0,
    133600.0,
    170500.0,
    113800.0,
    128400.0,
    117200.0,
    158100.0,
    91800.0,
    167700.0,
    158600.0,
    94900.0,
    154800.0,
    116700.0,
    339700.0,
    172300.0,
    95700.0,
    63800.0,
    233900.0,
    122400.0,
    161300.0,
    172100.0,
    342400.0,
    162000.0,
    108000.0,
    93800.0,
    1115400.0,
    176300.0,
    182500.0,
    102500.0,
    96400.0,
    312400.0,
    70200.0,
    90500.0,
    79400.0,
    141900.0,
    69200.0,
    63000.0,
    124900.0,
    83500.0,
    152000.0,
    143100.0,
    79200.0,
    146400.0,
    140700.0,
    2303800.0,
    361300.0,
    347500.0,
    342100.0,
    232400.0,
    269600.0,
    312600.0,
    504800.0,
    503000.0,
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
        text: "ALTG",
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