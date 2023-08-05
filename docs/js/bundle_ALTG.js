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
    ['2022/08/08', 11.76, 11.65, 11.9, 11.46],
    ['2022/08/09', 11.69, 11.34, 11.7, 11.32],
    ['2022/08/10', 13.2, 13.21, 13.47, 12.64],
    ['2022/08/11', 13.36, 13.19, 13.51, 13.13],
    ['2022/08/12', 13.24, 13.16, 13.3, 12.92],
    ['2022/08/15', 13.09, 13.41, 13.42, 13.09],
    ['2022/08/16', 13.32, 13.22, 13.47, 13.21],
    ['2022/08/17', 13.16, 12.96, 13.17, 12.8],
    ['2022/08/18', 12.86, 12.97, 13.11, 12.73],
    ['2022/08/19', 12.79, 12.7, 12.85, 12.55],
    ['2022/08/22', 12.48, 12.4, 12.7, 12.4],
    ['2022/08/23', 12.51, 12.57, 12.76, 12.51],
    ['2022/08/24', 12.63, 12.7, 12.94, 12.56],
    ['2022/08/25', 12.71, 12.48, 12.73, 12.37],
    ['2022/08/26', 12.56, 12.02, 12.56, 11.88],
    ['2022/08/29', 11.9, 11.95, 12.04, 11.9],
    ['2022/08/30', 11.93, 11.81, 12.02, 11.75],
    ['2022/08/31', 11.82, 11.77, 12.26, 11.7],
    ['2022/09/01', 11.67, 11.72, 11.78, 11.5],
    ['2022/09/02', 11.9, 11.91, 12.04, 11.72],
    ['2022/09/06', 11.92, 12.25, 12.28, 11.72],
    ['2022/09/07', 12.29, 12.74, 12.8, 12.29],
    ['2022/09/08', 12.64, 12.93, 12.99, 12.52],
    ['2022/09/09', 13.07, 13.19, 13.26, 13.04],
    ['2022/09/12', 13.36, 13.08, 13.38, 13.03],
    ['2022/09/13', 12.83, 12.93, 13.71, 12.64],
    ['2022/09/14', 13.02, 12.82, 13.02, 12.66],
    ['2022/09/15', 12.76, 12.64, 12.98, 12.51],
    ['2022/09/16', 12.53, 12.15, 12.53, 11.93],
    ['2022/09/19', 11.98, 12.06, 12.27, 11.9],
    ['2022/09/20', 11.95, 12.19, 12.27, 11.86],
    ['2022/09/21', 12.33, 11.83, 12.41, 11.81],
    ['2022/09/22', 11.77, 11.41, 11.77, 11.33],
    ['2022/09/23', 11.56, 11.23, 11.56, 10.99],
    ['2022/09/26', 11.08, 10.83, 11.38, 10.76],
    ['2022/09/27', 10.96, 10.89, 11.12, 10.77],
    ['2022/09/28', 11.03, 11.36, 11.47, 11.0],
    ['2022/09/29', 11.23, 10.97, 11.33, 10.86],
    ['2022/09/30', 10.85, 11.01, 11.06, 10.8],
    ['2022/10/03', 11.19, 11.33, 11.5, 11.15],
    ['2022/10/04', 11.52, 11.68, 11.82, 11.52],
    ['2022/10/05', 11.43, 11.48, 11.5, 11.3],
    ['2022/10/06', 11.45, 11.31, 11.53, 11.24],
    ['2022/10/07', 11.24, 11.04, 11.24, 10.85],
    ['2022/10/10', 11.1, 11.08, 11.23, 10.98],
    ['2022/10/11', 11.09, 11.21, 11.31, 10.92],
    ['2022/10/12', 11.14, 11.03, 11.19, 10.98],
    ['2022/10/13', 10.84, 11.41, 11.53, 10.64],
    ['2022/10/14', 11.41, 10.98, 11.43, 10.93],
    ['2022/10/17', 11.08, 10.83, 11.23, 10.67],
    ['2022/10/18', 10.99, 11.16, 11.3, 10.93],
    ['2022/10/19', 11.16, 11.02, 11.21, 10.89],
    ['2022/10/20', 11.09, 10.86, 11.23, 10.78],
    ['2022/10/21', 10.93, 11.33, 11.33, 10.74],
    ['2022/10/24', 11.43, 11.44, 11.58, 11.27],
    ['2022/10/25', 11.4, 11.86, 12.05, 11.4],
    ['2022/10/26', 11.96, 11.81, 12.04, 11.78],
    ['2022/10/27', 11.94, 11.8, 11.99, 11.72],
    ['2022/10/28', 11.87, 12.43, 12.47, 11.55],
    ['2022/10/31', 12.35, 12.23, 12.46, 12.19],
    ['2022/11/01', 12.34, 12.67, 12.77, 12.24],
    ['2022/11/02', 12.67, 12.0, 12.77, 11.97],
    ['2022/11/03', 11.8, 12.04, 12.11, 11.78],
    ['2022/11/04', 12.16, 12.25, 12.34, 11.92],
    ['2022/11/07', 12.4, 12.08, 12.4, 11.95],
    ['2022/11/08', 12.23, 12.14, 12.3, 11.98],
    ['2022/11/09', 12.15, 12.06, 12.21, 11.92],
    ['2022/11/10', 13.23, 13.08, 13.93, 12.6],
    ['2022/11/11', 13.2, 13.12, 13.53, 12.75],
    ['2022/11/14', 12.95, 12.7, 13.25, 12.6],
    ['2022/11/15', 12.84, 12.54, 13.08, 12.43],
    ['2022/11/16', 13.33, 12.29, 13.64, 12.24],
    ['2022/11/17', 12.19, 12.25, 12.41, 12.0],
    ['2022/11/18', 12.46, 12.36, 12.91, 12.27],
    ['2022/11/21', 12.16, 12.18, 12.38, 12.05],
    ['2022/11/22', 12.34, 12.27, 12.37, 12.21],
    ['2022/11/23', 12.22, 12.02, 12.31, 12.0],
    ['2022/11/25', 12.07, 12.03, 12.1, 11.96],
    ['2022/11/28', 11.94, 11.9, 11.99, 11.86],
    ['2022/11/29', 11.77, 11.75, 11.82, 11.73],
    ['2022/11/30', 11.85, 12.04, 12.14, 11.57],
    ['2022/12/01', 12.16, 12.26, 12.37, 12.04],
    ['2022/12/02', 12.16, 12.22, 12.34, 12.11],
    ['2022/12/05', 12.16, 12.16, 12.27, 11.95],
    ['2022/12/06', 12.14, 12.22, 12.26, 12.02],
    ['2022/12/07', 12.21, 12.02, 12.29, 11.96],
    ['2022/12/08', 12.0, 12.3, 12.35, 11.99],
    ['2022/12/09', 12.3, 12.18, 12.37, 12.14],
    ['2022/12/12', 12.18, 12.28, 12.45, 12.18],
    ['2022/12/13', 12.58, 12.59, 12.97, 12.22],
    ['2022/12/14', 12.49, 12.81, 12.99, 12.49],
    ['2022/12/15', 12.59, 12.57, 12.68, 12.47],
    ['2022/12/16', 12.54, 12.6, 12.82, 12.37],
    ['2022/12/19', 12.64, 12.52, 12.81, 12.3],
    ['2022/12/20', 12.46, 12.62, 12.66, 12.44],
    ['2022/12/21', 12.73, 12.44, 12.98, 12.4],
    ['2022/12/22', 12.34, 12.44, 12.49, 12.15],
    ['2022/12/23', 12.46, 12.47, 12.59, 12.35],
    ['2022/12/27', 12.53, 12.45, 12.57, 12.39],
    ['2022/12/28', 12.49, 12.52, 12.71, 12.3],
    ['2022/12/29', 12.63, 12.76, 12.85, 12.63],
    ['2022/12/30', 12.67, 13.19, 13.24, 12.67],
    ['2023/01/03', 13.36, 13.3, 13.5, 12.7],
    ['2023/01/04', 13.49, 14.23, 14.35, 13.37],
    ['2023/01/05', 14.27, 14.47, 14.72, 14.02],
    ['2023/01/06', 14.6, 15.02, 15.19, 14.4],
    ['2023/01/09', 15.29, 15.17, 16.04, 15.06],
    ['2023/01/10', 15.27, 15.51, 15.66, 15.26],
    ['2023/01/11', 15.3, 15.55, 15.84, 15.25],
    ['2023/01/12', 15.63, 15.61, 15.98, 15.44],
    ['2023/01/13', 15.42, 15.89, 15.95, 15.39],
    ['2023/01/17', 15.92, 16.13, 16.4, 15.86],
    ['2023/01/18', 16.34, 15.99, 16.47, 15.92],
    ['2023/01/19', 15.94, 16.02, 16.18, 15.9],
    ['2023/01/20', 16.08, 15.97, 16.13, 15.66],
    ['2023/01/23', 15.95, 16.07, 16.19, 15.74],
    ['2023/01/24', 16.12, 16.54, 16.77, 15.96],
    ['2023/01/25', 16.49, 16.6, 16.75, 16.38],
    ['2023/01/26', 16.82, 16.58, 16.87, 16.36],
    ['2023/01/27', 16.63, 16.6, 16.89, 16.47],
    ['2023/01/30', 16.51, 16.7, 16.78, 16.46],
    ['2023/01/31', 16.71, 16.95, 17.11, 16.71],
    ['2023/02/01', 17.0, 17.17, 17.3, 16.78],
    ['2023/02/02', 17.34, 17.19, 17.55, 16.86],
    ['2023/02/03', 16.94, 17.18, 17.28, 16.89],
    ['2023/02/06', 17.11, 17.28, 17.41, 17.08],
    ['2023/02/07', 17.23, 17.85, 17.87, 17.08],
    ['2023/02/08', 17.75, 17.56, 17.96, 17.48],
    ['2023/02/09', 17.62, 17.22, 17.83, 17.21],
    ['2023/02/10', 17.27, 17.23, 17.41, 17.16],
    ['2023/02/13', 17.26, 17.5, 17.7, 17.26],
    ['2023/02/14', 17.5, 17.99, 18.08, 17.39],
    ['2023/02/15', 17.9, 18.19, 18.52, 17.89],
    ['2023/02/16', 18.0, 17.79, 18.26, 17.77],
    ['2023/02/17', 17.81, 18.09, 18.19, 17.63],
    ['2023/02/21', 17.9, 17.99, 18.22, 17.68],
    ['2023/02/22', 18.1, 17.85, 18.43, 17.75],
    ['2023/02/23', 18.06, 18.1, 18.29, 17.97],
    ['2023/02/24', 17.95, 18.18, 18.26, 17.59],
    ['2023/02/27', 18.32, 18.58, 18.71, 18.32],
    ['2023/02/28', 18.62, 18.81, 19.26, 18.62],
    ['2023/03/01', 18.79, 18.86, 19.23, 18.76],
    ['2023/03/02', 18.74, 18.98, 19.3, 18.62],
    ['2023/03/03', 19.11, 19.35, 19.62, 19.0],
    ['2023/03/06', 19.39, 19.53, 19.66, 19.34],
    ['2023/03/07', 19.61, 19.81, 20.02, 19.5],
    ['2023/03/08', 19.98, 19.86, 20.23, 19.77],
    ['2023/03/09', 19.8, 19.27, 20.08, 19.09],
    ['2023/03/10', 20.6, 17.0, 20.6, 14.35],
    ['2023/03/13', 16.54, 15.71, 16.59, 15.0],
    ['2023/03/14', 16.12, 16.22, 16.58, 15.87],
    ['2023/03/15', 16.32, 16.13, 17.22, 15.91],
    ['2023/03/16', 15.89, 16.8, 17.36, 15.75],
    ['2023/03/17', 16.75, 15.08, 16.94, 15.01],
    ['2023/03/20', 15.14, 15.6, 15.81, 15.08],
    ['2023/03/21', 15.92, 15.4, 16.4, 15.34],
    ['2023/03/22', 15.45, 15.62, 16.04, 15.29],
    ['2023/03/23', 15.7, 15.52, 15.95, 15.33],
    ['2023/03/24', 15.45, 15.35, 15.46, 15.0],
    ['2023/03/27', 15.65, 15.44, 15.65, 15.21],
    ['2023/03/28', 15.33, 15.25, 15.75, 15.2],
    ['2023/03/29', 15.39, 15.66, 15.73, 15.18],
    ['2023/03/30', 15.81, 15.61, 15.97, 15.56],
    ['2023/03/31', 15.77, 15.85, 15.98, 15.51],
    ['2023/04/03', 15.87, 15.2, 15.91, 15.13],
    ['2023/04/04', 15.2, 14.1, 15.28, 14.02],
    ['2023/04/05', 14.1, 13.48, 14.1, 13.4],
    ['2023/04/06', 13.5, 13.39, 13.71, 13.23],
    ['2023/04/10', 13.54, 13.89, 13.98, 13.39],
    ['2023/04/11', 13.85, 13.96, 14.07, 13.7],
    ['2023/04/12', 14.11, 14.03, 14.13, 13.81],
    ['2023/04/13', 13.98, 13.83, 13.99, 13.65],
    ['2023/04/14', 13.79, 13.62, 13.94, 13.56],
    ['2023/04/17', 13.68, 14.21, 14.25, 13.59],
    ['2023/04/18', 14.21, 14.4, 15.17, 14.21],
    ['2023/04/19', 14.28, 14.22, 14.28, 13.78],
    ['2023/04/20', 14.11, 14.03, 14.24, 13.98],
    ['2023/04/21', 14.04, 14.0, 14.04, 13.71],
    ['2023/04/24', 13.96, 14.1, 14.16, 13.88],
    ['2023/04/25', 13.95, 14.02, 14.06, 13.86],
    ['2023/04/26', 13.87, 13.78, 13.94, 13.6],
    ['2023/04/27', 13.8, 14.01, 14.04, 13.41],
    ['2023/04/28', 13.94, 14.14, 14.29, 13.85],
    ['2023/05/01', 14.09, 13.87, 14.49, 13.8],
    ['2023/05/02', 13.86, 13.72, 13.9, 13.39],
    ['2023/05/03', 13.79, 13.7, 14.09, 13.63],
    ['2023/05/04', 13.56, 13.14, 13.56, 13.05],
    ['2023/05/05', 13.37, 13.37, 13.6, 13.22],
    ['2023/05/08', 13.42, 13.51, 13.71, 13.33],
    ['2023/05/09', 13.51, 13.75, 13.86, 13.36],
    ['2023/05/10', 13.93, 14.19, 14.3, 13.75],
    ['2023/05/11', 15.4, 14.3, 15.91, 13.69],
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
    ['2023/08/03', 16.81, 17.56, 17.96, 16.59],
    ['2023/08/04', 17.85, 16.91, 17.9, 16.88],
]);
var volumes = [
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
    1067700.0,
    326000.0,
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