/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_BOSC");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/03', 2.34, 2.45, 2.51, 2.34],
    ['2022/08/04', 2.54, 2.4, 2.54, 2.39],
    ['2022/08/05', 2.4, 2.4, 2.45, 2.39],
    ['2022/08/08', 2.49, 2.53, 2.64, 2.4],
    ['2022/08/09', 2.44, 2.44, 2.44, 2.44],
    ['2022/08/10', 2.47, 2.47, 2.63, 2.45],
    ['2022/08/11', 2.57, 2.46, 2.57, 2.46],
    ['2022/08/12', 2.5, 2.5, 2.57, 2.45],
    ['2022/08/15', 2.51, 2.55, 2.74, 2.51],
    ['2022/08/16', 2.5, 2.51, 2.62, 2.5],
    ['2022/08/17', 2.51, 2.55, 2.55, 2.51],
    ['2022/08/18', 2.47, 2.5, 2.5, 2.47],
    ['2022/08/19', 2.51, 2.5, 2.52, 2.5],
    ['2022/08/22', 2.6, 2.48, 2.64, 2.45],
    ['2022/08/23', 2.47, 2.23, 2.47, 2.11],
    ['2022/08/24', 2.2, 2.25, 2.48, 2.18],
    ['2022/08/25', 2.25, 2.31, 2.35, 2.25],
    ['2022/08/26', 2.31, 2.27, 2.35, 2.25],
    ['2022/08/29', 2.24, 2.39, 2.43, 2.12],
    ['2022/08/30', 2.42, 2.4, 2.48, 2.32],
    ['2022/08/31', 2.43, 2.33, 2.49, 2.32],
    ['2022/09/01', 2.4, 2.33, 2.4, 2.31],
    ['2022/09/02', 2.31, 2.36, 2.49, 2.3],
    ['2022/09/06', 2.51, 2.63, 2.89, 2.4],
    ['2022/09/07', 2.57, 2.66, 2.76, 2.57],
    ['2022/09/08', 2.58, 2.39, 2.68, 2.27],
    ['2022/09/09', 2.37, 2.43, 2.46, 2.35],
    ['2022/09/12', 2.4, 2.35, 2.4, 2.33],
    ['2022/09/13', 2.34, 2.26, 2.5, 2.26],
    ['2022/09/14', 2.39, 2.42, 2.57, 2.34],
    ['2022/09/15', 2.46, 2.36, 2.46, 2.35],
    ['2022/09/16', 2.29, 2.36, 2.37, 2.29],
    ['2022/09/19', 2.27, 2.29, 2.32, 2.27],
    ['2022/09/20', 2.34, 2.34, 2.34, 2.31],
    ['2022/09/21', 2.3, 2.28, 2.31, 2.28],
    ['2022/09/22', 2.26, 2.26, 2.27, 2.25],
    ['2022/09/23', 2.25, 2.19, 2.26, 2.16],
    ['2022/09/26', 2.16, 2.2, 2.21, 2.13],
    ['2022/09/27', 2.2, 2.19, 2.25, 2.15],
    ['2022/09/28', 2.15, 2.19, 2.25, 2.15],
    ['2022/09/29', 2.18, 2.22, 2.31, 2.18],
    ['2022/09/30', 2.22, 2.21, 2.22, 2.18],
    ['2022/10/03', 2.19, 2.17, 2.2, 2.15],
    ['2022/10/04', 2.17, 2.2, 2.26, 2.15],
    ['2022/10/05', 2.23, 2.25, 2.25, 2.18],
    ['2022/10/06', 2.25, 2.18, 2.25, 2.16],
    ['2022/10/07', 2.2, 2.16, 2.21, 2.11],
    ['2022/10/10', 2.14, 2.14, 2.17, 2.12],
    ['2022/10/11', 2.13, 2.11, 2.14, 2.1],
    ['2022/10/12', 2.11, 2.13, 2.13, 2.09],
    ['2022/10/13', 2.12, 2.12, 2.12, 2.1],
    ['2022/10/14', 2.11, 2.22, 2.22, 2.11],
    ['2022/10/17', 2.13, 2.17, 2.2, 2.13],
    ['2022/10/18', 2.17, 2.17, 2.17, 2.17],
    ['2022/10/19', 2.18, 2.15, 2.26, 2.15],
    ['2022/10/20', 2.13, 2.19, 2.19, 2.13],
    ['2022/10/21', 2.08, 2.16, 2.18, 2.08],
    ['2022/10/24', 2.25, 2.26, 2.28, 2.2],
    ['2022/10/25', 2.26, 2.28, 2.29, 2.21],
    ['2022/10/26', 2.23, 2.26, 2.34, 2.23],
    ['2022/10/27', 2.3, 2.32, 2.41, 2.3],
    ['2022/10/28', 2.32, 2.32, 2.36, 2.32],
    ['2022/10/31', 2.32, 2.3, 2.36, 2.29],
    ['2022/11/01', 2.31, 2.31, 2.33, 2.29],
    ['2022/11/02', 2.35, 2.31, 2.35, 2.28],
    ['2022/11/03', 2.21, 2.23, 2.25, 2.21],
    ['2022/11/04', 2.21, 2.27, 2.27, 2.2],
    ['2022/11/07', 2.29, 2.24, 2.34, 2.24],
    ['2022/11/08', 2.24, 2.3, 2.3, 2.23],
    ['2022/11/09', 2.23, 2.34, 2.34, 2.23],
    ['2022/11/10', 2.26, 2.3, 2.34, 2.21],
    ['2022/11/11', 2.25, 2.27, 2.33, 2.24],
    ['2022/11/14', 2.24, 2.27, 2.28, 2.24],
    ['2022/11/15', 2.31, 2.32, 2.34, 2.31],
    ['2022/11/16', 2.33, 2.35, 2.35, 2.33],
    ['2022/11/17', 2.33, 2.35, 2.35, 2.33],
    ['2022/11/18', 2.32, 2.32, 2.35, 2.32],
    ['2022/11/21', 2.32, 2.37, 2.44, 2.29],
    ['2022/11/22', 2.36, 2.44, 2.55, 2.36],
    ['2022/11/23', 2.47, 2.51, 2.54, 2.39],
    ['2022/11/25', 2.46, 2.31, 2.48, 2.31],
    ['2022/11/28', 2.38, 2.39, 2.48, 2.38],
    ['2022/11/29', 2.37, 2.39, 2.45, 2.37],
    ['2022/11/30', 2.39, 2.19, 2.39, 2.18],
    ['2022/12/01', 2.26, 2.24, 2.27, 2.24],
    ['2022/12/02', 2.2, 2.24, 2.26, 2.2],
    ['2022/12/05', 2.17, 2.19, 2.25, 2.17],
    ['2022/12/06', 2.24, 2.16, 2.25, 2.13],
    ['2022/12/07', 2.15, 2.15, 2.18, 2.13],
    ['2022/12/08', 2.16, 2.23, 2.23, 2.16],
    ['2022/12/09', 2.22, 2.2, 2.22, 2.16],
    ['2022/12/12', 2.13, 2.19, 2.2, 2.11],
    ['2022/12/13', 2.21, 2.23, 2.23, 2.17],
    ['2022/12/14', 2.2, 2.15, 2.25, 2.14],
    ['2022/12/15', 2.22, 2.2, 2.22, 2.2],
    ['2022/12/16', 2.13, 2.17, 2.2, 2.13],
    ['2022/12/19', 2.13, 2.07, 2.14, 2.07],
    ['2022/12/20', 2.05, 2.08, 2.08, 2.05],
    ['2022/12/21', 2.1, 2.09, 2.1, 2.05],
    ['2022/12/22', 2.1, 2.12, 2.12, 2.03],
    ['2022/12/23', 2.07, 2.11, 2.11, 2.03],
    ['2022/12/27', 2.07, 2.07, 2.1, 2.05],
    ['2022/12/28', 2.13, 1.98, 2.13, 1.85],
    ['2022/12/29', 1.97, 2.05, 2.11, 1.97],
    ['2022/12/30', 2.05, 2.09, 2.18, 2.02],
    ['2023/01/03', 2.09, 2.06, 2.1, 1.99],
    ['2023/01/04', 2.11, 2.0, 2.11, 1.96],
    ['2023/01/05', 1.96, 2.0, 2.03, 1.96],
    ['2023/01/06', 2.0, 2.01, 2.05, 1.98],
    ['2023/01/09', 1.99, 2.08, 2.11, 1.99],
    ['2023/01/10', 2.14, 2.1, 2.15, 2.05],
    ['2023/01/11', 2.12, 2.08, 2.12, 2.08],
    ['2023/01/12', 2.06, 2.16, 2.16, 2.06],
    ['2023/01/13', 2.17, 2.19, 2.19, 2.15],
    ['2023/01/17', 2.15, 2.15, 2.19, 2.14],
    ['2023/01/18', 2.15, 2.14, 2.19, 2.14],
    ['2023/01/19', 2.14, 2.14, 2.14, 2.14],
    ['2023/01/20', 2.16, 2.2, 2.2, 2.16],
    ['2023/01/23', 2.16, 2.25, 2.27, 2.16],
    ['2023/01/24', 2.18, 2.18, 2.18, 2.18],
    ['2023/01/25', 2.18, 2.18, 2.18, 2.18],
    ['2023/01/26', 2.21, 2.21, 2.21, 2.21],
    ['2023/01/27', 2.21, 2.21, 2.21, 2.21],
    ['2023/01/30', 2.23, 2.23, 2.23, 2.23],
    ['2023/01/31', 2.25, 2.28, 2.28, 2.25],
    ['2023/02/01', 2.25, 2.33, 2.34, 2.25],
    ['2023/02/02', 2.34, 2.35, 2.36, 2.26],
    ['2023/02/03', 2.31, 2.33, 2.35, 2.3],
    ['2023/02/06', 2.3, 2.3, 2.33, 2.3],
    ['2023/02/07', 2.3, 2.41, 2.45, 2.28],
    ['2023/02/08', 2.41, 2.57, 2.62, 2.41],
    ['2023/02/09', 2.59, 2.58, 2.62, 2.5],
    ['2023/02/10', 2.6, 2.52, 2.6, 2.5],
    ['2023/02/13', 2.51, 2.5, 2.51, 2.43],
    ['2023/02/14', 2.4, 2.51, 2.53, 2.4],
    ['2023/02/15', 2.42, 2.45, 2.45, 2.42],
    ['2023/02/16', 2.52, 2.46, 2.52, 2.44],
    ['2023/02/17', 2.48, 2.48, 2.48, 2.48],
    ['2023/02/21', 2.42, 2.44, 2.53, 2.42],
    ['2023/02/22', 2.32, 2.39, 2.42, 2.32],
    ['2023/02/23', 2.34, 2.52, 2.52, 2.34],
    ['2023/02/24', 2.51, 2.49, 2.51, 2.39],
    ['2023/02/27', 2.48, 2.48, 2.49, 2.48],
    ['2023/02/28', 2.47, 2.44, 2.49, 2.33],
    ['2023/03/01', 2.4, 2.41, 2.43, 2.4],
    ['2023/03/02', 2.4, 2.4, 2.45, 2.4],
    ['2023/03/03', 2.4, 2.4, 2.45, 2.4],
    ['2023/03/06', 2.4, 2.42, 2.5, 2.4],
    ['2023/03/07', 2.4, 2.4, 2.42, 2.4],
    ['2023/03/08', 2.41, 2.4, 2.42, 2.4],
    ['2023/03/09', 2.4, 2.38, 2.4, 2.38],
    ['2023/03/10', 2.31, 2.27, 2.33, 2.26],
    ['2023/03/13', 2.25, 2.34, 2.37, 2.22],
    ['2023/03/14', 2.25, 2.34, 2.36, 2.25],
    ['2023/03/15', 2.29, 2.33, 2.33, 2.24],
    ['2023/03/16', 2.26, 2.32, 2.33, 2.26],
    ['2023/03/17', 2.26, 2.26, 2.29, 2.25],
    ['2023/03/20', 2.33, 2.26, 2.34, 2.25],
    ['2023/03/21', 2.23, 2.36, 2.38, 2.23],
    ['2023/03/22', 2.38, 2.35, 2.38, 2.35],
    ['2023/03/23', 2.31, 2.31, 2.34, 2.31],
    ['2023/03/24', 2.32, 2.32, 2.32, 2.32],
    ['2023/03/27', 2.28, 2.44, 2.44, 2.28],
    ['2023/03/28', 2.4, 2.32, 2.4, 2.32],
    ['2023/03/29', 2.4, 2.47, 2.6, 2.39],
    ['2023/03/30', 2.46, 2.48, 2.52, 2.46],
    ['2023/03/31', 2.49, 2.67, 2.67, 2.49],
    ['2023/04/03', 2.66, 2.65, 2.68, 2.62],
    ['2023/04/04', 2.65, 2.59, 2.67, 2.56],
    ['2023/04/05', 2.5, 2.6, 2.62, 2.5],
    ['2023/04/06', 2.6, 2.6, 2.6, 2.6],
    ['2023/04/10', 2.69, 2.57, 2.69, 2.57],
    ['2023/04/11', 2.6, 2.6, 2.61, 2.6],
    ['2023/04/12', 2.7, 2.7, 2.7, 2.47],
    ['2023/04/13', 2.65, 2.71, 2.74, 2.65],
    ['2023/04/14', 2.74, 2.65, 2.75, 2.62],
    ['2023/04/17', 2.64, 2.73, 2.73, 2.64],
    ['2023/04/18', 2.66, 2.69, 2.7, 2.62],
    ['2023/04/19', 2.67, 2.82, 2.91, 2.67],
    ['2023/04/20', 2.85, 2.87, 2.97, 2.85],
    ['2023/04/21', 2.84, 2.8, 2.84, 2.8],
    ['2023/04/24', 2.96, 2.83, 2.96, 2.75],
    ['2023/04/25', 2.81, 2.83, 2.86, 2.78],
    ['2023/04/26', 2.79, 2.8, 2.81, 2.79],
    ['2023/04/27', 2.8, 2.85, 2.86, 2.79],
    ['2023/04/28', 2.88, 2.83, 2.91, 2.79],
    ['2023/05/01', 2.8, 2.8, 2.83, 2.8],
    ['2023/05/02', 2.84, 2.8, 2.84, 2.79],
    ['2023/05/03', 2.8, 2.8, 2.8, 2.73],
    ['2023/05/04', 2.76, 2.62, 2.81, 2.44],
    ['2023/05/05', 2.72, 2.74, 2.74, 2.63],
    ['2023/05/08', 2.69, 2.71, 2.74, 2.65],
    ['2023/05/09', 2.65, 2.65, 2.73, 2.62],
    ['2023/05/10', 2.64, 2.72, 2.72, 2.64],
    ['2023/05/11', 2.67, 2.58, 2.67, 2.57],
    ['2023/05/12', 2.53, 2.53, 2.53, 2.53],
    ['2023/05/15', 2.53, 2.53, 2.53, 2.53],
    ['2023/05/16', 2.51, 2.55, 2.58, 2.51],
    ['2023/05/17', 2.53, 2.5, 2.53, 2.5],
    ['2023/05/18', 2.58, 2.61, 2.61, 2.57],
    ['2023/05/19', 2.58, 2.57, 2.58, 2.57],
    ['2023/05/22', 2.57, 2.57, 2.57, 2.57],
    ['2023/05/23', 2.61, 2.48, 2.61, 2.44],
    ['2023/05/24', 2.58, 2.67, 2.7, 2.51],
    ['2023/05/25', 2.77, 2.67, 2.77, 2.55],
    ['2023/05/26', 2.6, 2.57, 2.65, 2.56],
    ['2023/05/30', 3.02, 2.94, 3.08, 2.8],
    ['2023/05/31', 2.94, 2.91, 2.95, 2.8],
    ['2023/06/01', 2.8, 3.15, 3.17, 2.8],
    ['2023/06/02', 3.17, 3.12, 3.25, 3.05],
    ['2023/06/05', 3.27, 3.14, 3.37, 3.0],
    ['2023/06/06', 3.17, 3.03, 3.21, 3.03],
    ['2023/06/07', 3.02, 2.93, 3.17, 2.82],
    ['2023/06/08', 2.86, 3.03, 3.05, 2.84],
    ['2023/06/09', 3.09, 3.13, 3.15, 3.04],
    ['2023/06/12', 3.13, 3.12, 3.22, 3.06],
    ['2023/06/13', 3.18, 3.25, 3.32, 3.09],
    ['2023/06/14', 3.3, 3.1, 3.3, 3.08],
    ['2023/06/15', 3.19, 3.11, 3.21, 3.1],
    ['2023/06/16', 3.11, 3.14, 3.15, 3.1],
    ['2023/06/20', 3.1, 3.18, 3.18, 3.1],
    ['2023/06/21', 3.19, 3.19, 3.25, 3.17],
    ['2023/06/22', 3.18, 3.27, 3.34, 3.18],
    ['2023/06/23', 3.27, 3.31, 3.34, 3.22],
    ['2023/06/26', 3.4, 3.36, 3.59, 3.31],
    ['2023/06/27', 3.33, 3.36, 3.4, 3.32],
    ['2023/06/28', 3.37, 3.33, 3.45, 3.33],
    ['2023/06/29', 3.34, 3.36, 3.43, 3.32],
    ['2023/06/30', 3.41, 3.37, 3.41, 3.27],
    ['2023/07/03', 3.33, 3.37, 3.37, 3.29],
    ['2023/07/05', 3.33, 3.33, 3.41, 3.32],
    ['2023/07/06', 3.32, 3.31, 3.32, 3.29],
    ['2023/07/07', 3.3, 3.2, 3.35, 3.18],
    ['2023/07/10', 3.09, 3.21, 3.27, 3.09],
    ['2023/07/11', 3.22, 3.16, 3.27, 3.16],
    ['2023/07/12', 3.18, 3.18, 3.18, 3.15],
    ['2023/07/13', 3.19, 3.18, 3.26, 3.18],
    ['2023/07/14', 3.19, 3.2, 3.2, 3.19],
    ['2023/07/17', 3.16, 3.13, 3.27, 3.1],
    ['2023/07/18', 3.13, 3.56, 3.68, 3.12],
    ['2023/07/19', 3.65, 3.6, 3.65, 3.55],
    ['2023/07/20', 3.6, 3.6, 3.6, 3.4],
    ['2023/07/21', 3.57, 3.64, 3.64, 3.44],
    ['2023/07/24', 3.6, 3.77, 3.83, 3.53],
    ['2023/07/25', 3.75, 3.71, 3.78, 3.71],
    ['2023/07/26', 3.64, 3.67, 3.73, 3.64],
    ['2023/07/27', 3.67, 3.62, 3.69, 3.53],
    ['2023/07/28', 3.61, 3.8, 3.8, 3.58],
    ['2023/07/31', 3.77, 3.71, 3.78, 3.68],
    ['2023/08/01', 3.68, 3.73, 3.76, 3.62],
    ['2023/08/02', 3.73, 3.7, 3.75, 3.6],
]);
var volumes = [
    18400.0,
    2600.0,
    3000.0,
    9100.0,
    100.0,
    6800.0,
    6600.0,
    1800.0,
    4700.0,
    2900.0,
    600.0,
    700.0,
    2100.0,
    8000.0,
    140200.0,
    62800.0,
    12600.0,
    13600.0,
    57600.0,
    26700.0,
    38200.0,
    8600.0,
    55500.0,
    449700.0,
    121700.0,
    194300.0,
    38000.0,
    14300.0,
    37200.0,
    94400.0,
    21200.0,
    27800.0,
    1000.0,
    3400.0,
    2500.0,
    5800.0,
    16200.0,
    13800.0,
    10200.0,
    8000.0,
    7900.0,
    2600.0,
    16000.0,
    10300.0,
    5400.0,
    5900.0,
    5700.0,
    21300.0,
    5600.0,
    10400.0,
    5300.0,
    800.0,
    1900.0,
    500.0,
    900.0,
    1500.0,
    1700.0,
    24500.0,
    43900.0,
    34000.0,
    3300.0,
    900.0,
    7500.0,
    2200.0,
    11200.0,
    3300.0,
    1200.0,
    1600.0,
    1800.0,
    4900.0,
    35600.0,
    7100.0,
    1500.0,
    5300.0,
    700.0,
    400.0,
    800.0,
    2100.0,
    33100.0,
    8200.0,
    1200.0,
    2800.0,
    1100.0,
    41900.0,
    6300.0,
    1900.0,
    13100.0,
    26800.0,
    2600.0,
    5300.0,
    4100.0,
    25000.0,
    23800.0,
    19100.0,
    1000.0,
    6800.0,
    19400.0,
    3300.0,
    11000.0,
    5800.0,
    8400.0,
    56000.0,
    81900.0,
    63800.0,
    24400.0,
    137900.0,
    54500.0,
    8700.0,
    13100.0,
    2900.0,
    2500.0,
    5000.0,
    7700.0,
    2000.0,
    2200.0,
    800.0,
    200.0,
    1800.0,
    18700.0,
    100.0,
    500.0,
    700.0,
    2400.0,
    900.0,
    30400.0,
    13900.0,
    8900.0,
    3600.0,
    1300.0,
    21200.0,
    56000.0,
    24900.0,
    6300.0,
    1500.0,
    2400.0,
    1000.0,
    5100.0,
    300.0,
    19100.0,
    800.0,
    4000.0,
    4600.0,
    500.0,
    3800.0,
    7700.0,
    5400.0,
    3500.0,
    7900.0,
    6600.0,
    2100.0,
    1600.0,
    7800.0,
    18200.0,
    2500.0,
    5500.0,
    1400.0,
    5100.0,
    17500.0,
    7800.0,
    800.0,
    800.0,
    300.0,
    1800.0,
    4100.0,
    37400.0,
    4700.0,
    9900.0,
    9300.0,
    15200.0,
    7000.0,
    0.0,
    3100.0,
    8400.0,
    3700.0,
    20000.0,
    20900.0,
    1400.0,
    6300.0,
    80800.0,
    19600.0,
    1100.0,
    12100.0,
    11800.0,
    8900.0,
    23100.0,
    7400.0,
    6200.0,
    5300.0,
    11600.0,
    42600.0,
    1800.0,
    1500.0,
    3500.0,
    500.0,
    5300.0,
    800.0,
    300.0,
    600.0,
    5800.0,
    1900.0,
    2700.0,
    0.0,
    2900.0,
    1500.0,
    1700.0,
    8800.0,
    105800.0,
    15200.0,
    48900.0,
    116800.0,
    87300.0,
    87700.0,
    48200.0,
    39500.0,
    37800.0,
    43400.0,
    34100.0,
    15200.0,
    19800.0,
    7900.0,
    11100.0,
    17700.0,
    21700.0,
    47800.0,
    99800.0,
    9100.0,
    10500.0,
    7600.0,
    4900.0,
    22300.0,
    10200.0,
    4200.0,
    21200.0,
    41900.0,
    10300.0,
    3900.0,
    5600.0,
    3700.0,
    68000.0,
    221900.0,
    12300.0,
    56900.0,
    38300.0,
    60700.0,
    9500.0,
    8900.0,
    7800.0,
    21200.0,
    18600.0,
    43600.0,
    5600.0,
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
        text: "BOSC",
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