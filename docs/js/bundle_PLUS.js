/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_PLUS");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/10', 47.67, 48.1, 48.72, 46.73],
    ['2022/08/11', 48.43, 48.6, 49.18, 48.41],
    ['2022/08/12', 48.8, 50.05, 50.18, 48.74],
    ['2022/08/15', 49.6, 51.95, 52.18, 49.6],
    ['2022/08/16', 51.94, 52.84, 52.96, 51.56],
    ['2022/08/17', 52.74, 53.02, 53.43, 52.61],
    ['2022/08/18', 53.1, 53.85, 54.04, 53.1],
    ['2022/08/19', 53.45, 53.38, 54.07, 52.83],
    ['2022/08/22', 53.1, 52.51, 53.1, 52.32],
    ['2022/08/23', 52.41, 51.05, 52.68, 51.05],
    ['2022/08/24', 50.88, 49.32, 51.23, 48.95],
    ['2022/08/25', 49.72, 51.11, 51.19, 49.34],
    ['2022/08/26', 51.29, 49.14, 51.29, 48.98],
    ['2022/08/29', 48.98, 48.69, 50.12, 48.08],
    ['2022/08/30', 48.69, 47.69, 48.98, 47.63],
    ['2022/08/31', 47.5, 47.12, 48.03, 46.55],
    ['2022/09/01', 46.77, 46.3, 47.12, 45.76],
    ['2022/09/02', 46.83, 45.97, 47.09, 45.62],
    ['2022/09/06', 45.92, 45.28, 45.92, 44.51],
    ['2022/09/07', 45.54, 45.76, 46.07, 44.74],
    ['2022/09/08', 45.72, 45.85, 46.12, 45.46],
    ['2022/09/09', 46.07, 46.87, 47.17, 45.98],
    ['2022/09/12', 47.17, 46.6, 47.52, 46.42],
    ['2022/09/13', 45.42, 43.57, 45.59, 43.47],
    ['2022/09/14', 43.47, 44.08, 44.25, 43.08],
    ['2022/09/15', 43.66, 43.93, 44.27, 43.56],
    ['2022/09/16', 43.55, 43.53, 43.77, 42.33],
    ['2022/09/19', 43.08, 43.69, 43.95, 43.08],
    ['2022/09/20', 43.34, 42.81, 43.34, 42.46],
    ['2022/09/21', 43.03, 42.75, 43.7, 42.73],
    ['2022/09/22', 42.5, 42.32, 42.8, 42.1],
    ['2022/09/23', 41.78, 41.17, 41.78, 40.91],
    ['2022/09/26', 40.86, 40.65, 41.37, 40.37],
    ['2022/09/27', 40.99, 41.05, 41.72, 40.69],
    ['2022/09/28', 41.25, 41.98, 42.31, 41.13],
    ['2022/09/29', 41.53, 41.48, 41.61, 40.62],
    ['2022/09/30', 41.48, 41.54, 42.6, 41.38],
    ['2022/10/03', 42.18, 42.52, 42.7, 41.56],
    ['2022/10/04', 43.21, 43.89, 44.55, 43.21],
    ['2022/10/05', 43.55, 43.65, 43.99, 42.89],
    ['2022/10/06', 43.23, 43.96, 44.23, 43.23],
    ['2022/10/07', 43.44, 42.78, 43.45, 42.52],
    ['2022/10/10', 42.86, 42.06, 43.18, 41.8],
    ['2022/10/11', 41.86, 41.58, 42.3, 41.22],
    ['2022/10/12', 41.8, 41.89, 42.59, 41.39],
    ['2022/10/13', 41.19, 43.32, 43.48, 40.88],
    ['2022/10/14', 43.29, 42.48, 43.41, 42.33],
    ['2022/10/17', 43.13, 44.21, 44.56, 43.13],
    ['2022/10/18', 44.99, 44.54, 45.36, 44.25],
    ['2022/10/19', 44.27, 43.77, 44.47, 43.2],
    ['2022/10/20', 43.67, 43.77, 44.58, 43.31],
    ['2022/10/21', 44.14, 45.15, 45.64, 43.31],
    ['2022/10/24', 45.44, 45.8, 45.94, 44.85],
    ['2022/10/25', 45.84, 47.12, 47.71, 45.84],
    ['2022/10/26', 47.34, 46.92, 47.86, 46.89],
    ['2022/10/27', 47.44, 47.29, 48.09, 46.81],
    ['2022/10/28', 47.72, 48.61, 49.23, 47.27],
    ['2022/10/31', 48.45, 48.72, 49.19, 48.31],
    ['2022/11/01', 49.23, 49.17, 49.23, 48.42],
    ['2022/11/02', 48.68, 47.27, 49.4, 47.13],
    ['2022/11/03', 46.7, 46.31, 46.71, 46.01],
    ['2022/11/04', 49.89, 48.88, 49.89, 46.48],
    ['2022/11/07', 48.68, 49.75, 50.84, 47.61],
    ['2022/11/08', 50.11, 49.48, 50.84, 48.5],
    ['2022/11/09', 48.98, 47.31, 49.23, 46.93],
    ['2022/11/10', 49.03, 50.77, 50.85, 48.77],
    ['2022/11/11', 50.71, 51.77, 52.51, 50.71],
    ['2022/11/14', 51.28, 51.66, 52.13, 50.98],
    ['2022/11/15', 52.21, 53.03, 53.54, 52.05],
    ['2022/11/16', 52.57, 52.81, 54.25, 52.34],
    ['2022/11/17', 52.0, 51.78, 52.4, 51.15],
    ['2022/11/18', 52.7, 52.45, 52.77, 51.73],
    ['2022/11/21', 52.45, 52.35, 52.7, 52.01],
    ['2022/11/22', 52.71, 52.5, 52.99, 52.18],
    ['2022/11/23', 52.33, 52.39, 52.73, 51.5],
    ['2022/11/25', 52.26, 51.83, 52.91, 51.81],
    ['2022/11/28', 51.29, 50.3, 51.81, 50.13],
    ['2022/11/29', 50.29, 49.04, 50.29, 48.94],
    ['2022/11/30', 49.33, 49.66, 49.66, 48.45],
    ['2022/12/01', 49.96, 49.58, 50.26, 49.2],
    ['2022/12/02', 48.83, 48.66, 49.16, 48.37],
    ['2022/12/05', 48.14, 47.33, 48.14, 46.88],
    ['2022/12/06', 47.43, 45.31, 47.43, 45.21],
    ['2022/12/07', 45.32, 44.92, 46.11, 44.76],
    ['2022/12/08', 45.13, 45.01, 45.64, 44.71],
    ['2022/12/09', 44.63, 45.21, 45.93, 44.5],
    ['2022/12/12', 45.59, 45.62, 46.39, 43.68],
    ['2022/12/13', 47.01, 46.76, 47.62, 46.28],
    ['2022/12/14', 46.8, 46.58, 47.37, 45.95],
    ['2022/12/15', 46.21, 44.03, 46.38, 43.96],
    ['2022/12/16', 43.35, 43.21, 43.82, 42.86],
    ['2022/12/19', 43.11, 43.27, 44.01, 42.75],
    ['2022/12/20', 43.02, 43.35, 44.45, 42.53],
    ['2022/12/21', 43.62, 44.31, 44.51, 43.48],
    ['2022/12/22', 44.04, 43.24, 44.4, 42.47],
    ['2022/12/23', 43.42, 43.62, 45.22, 42.58],
    ['2022/12/27', 43.61, 43.73, 44.16, 43.59],
    ['2022/12/28', 43.7, 42.6, 44.6, 42.55],
    ['2022/12/29', 43.1, 44.12, 44.42, 42.73],
    ['2022/12/30', 43.67, 44.28, 44.65, 43.13],
    ['2023/01/03', 44.72, 44.82, 45.35, 43.38],
    ['2023/01/04', 45.13, 43.74, 45.49, 43.31],
    ['2023/01/05', 43.68, 44.02, 44.24, 42.63],
    ['2023/01/06', 44.59, 45.47, 45.93, 44.59],
    ['2023/01/09', 45.94, 45.1, 45.95, 45.04],
    ['2023/01/10', 45.27, 45.71, 46.01, 44.82],
    ['2023/01/11', 45.96, 46.69, 46.99, 45.96],
    ['2023/01/12', 46.99, 47.49, 47.6, 46.1],
    ['2023/01/13', 46.83, 47.89, 48.04, 46.33],
    ['2023/01/17', 48.19, 48.82, 49.2, 48.18],
    ['2023/01/18', 49.28, 48.46, 51.12, 48.44],
    ['2023/01/19', 48.17, 49.34, 49.46, 48.17],
    ['2023/01/20', 49.83, 49.72, 50.11, 48.67],
    ['2023/01/23', 49.92, 50.06, 50.63, 49.3],
    ['2023/01/24', 49.78, 49.84, 50.37, 49.59],
    ['2023/01/25', 49.47, 49.45, 49.53, 48.51],
    ['2023/01/26', 49.75, 49.53, 49.75, 48.61],
    ['2023/01/27', 49.36, 49.44, 49.67, 48.92],
    ['2023/01/30', 49.02, 48.26, 49.5, 48.16],
    ['2023/01/31', 48.56, 49.78, 49.95, 48.35],
    ['2023/02/01', 49.85, 51.41, 52.05, 49.85],
    ['2023/02/02', 51.76, 53.47, 53.5, 50.8],
    ['2023/02/03', 52.64, 53.73, 54.24, 52.64],
    ['2023/02/06', 53.58, 52.67, 53.81, 52.05],
    ['2023/02/07', 52.68, 52.26, 52.76, 51.49],
    ['2023/02/08', 59.58, 57.04, 59.58, 55.76],
    ['2023/02/09', 57.68, 57.18, 58.58, 56.53],
    ['2023/02/10', 57.0, 55.57, 57.13, 55.12],
    ['2023/02/13', 56.04, 56.83, 56.98, 56.04],
    ['2023/02/14', 56.83, 56.6, 57.34, 56.05],
    ['2023/02/15', 56.47, 56.98, 57.41, 55.63],
    ['2023/02/16', 56.3, 55.97, 56.75, 55.96],
    ['2023/02/17', 56.15, 56.5, 56.89, 55.64],
    ['2023/02/21', 55.87, 54.27, 55.87, 54.17],
    ['2023/02/22', 54.36, 54.32, 55.03, 54.02],
    ['2023/02/23', 54.78, 54.72, 55.0, 53.85],
    ['2023/02/24', 53.74, 54.12, 54.71, 53.64],
    ['2023/02/27', 54.57, 54.72, 54.88, 53.87],
    ['2023/02/28', 54.45, 54.17, 54.99, 53.91],
    ['2023/03/01', 53.99, 54.39, 54.54, 53.95],
    ['2023/03/02', 53.88, 54.69, 54.69, 53.61],
    ['2023/03/03', 54.74, 54.81, 55.57, 53.96],
    ['2023/03/06', 54.88, 52.96, 55.5, 52.51],
    ['2023/03/07', 53.14, 51.89, 53.26, 51.77],
    ['2023/03/08', 51.84, 52.02, 52.08, 51.49],
    ['2023/03/09', 52.04, 51.01, 52.04, 50.97],
    ['2023/03/10', 50.94, 49.29, 50.94, 49.15],
    ['2023/03/13', 48.37, 48.15, 49.5, 48.08],
    ['2023/03/14', 49.44, 48.8, 49.86, 48.21],
    ['2023/03/15', 47.66, 47.68, 47.79, 46.85],
    ['2023/03/16', 46.98, 48.81, 49.11, 46.98],
    ['2023/03/17', 48.47, 48.15, 49.12, 47.83],
    ['2023/03/20', 48.57, 49.32, 49.68, 48.16],
    ['2023/03/21', 50.04, 49.97, 50.61, 49.04],
    ['2023/03/22', 49.94, 48.6, 50.35, 48.53],
    ['2023/03/23', 48.93, 48.43, 49.69, 47.99],
    ['2023/03/24', 47.99, 48.38, 48.66, 47.42],
    ['2023/03/27', 49.01, 48.8, 49.37, 48.52],
    ['2023/03/28', 48.56, 48.1, 48.64, 47.93],
    ['2023/03/29', 47.84, 47.88, 48.79, 47.69],
    ['2023/03/30', 48.18, 47.9, 48.41, 47.52],
    ['2023/03/31', 48.11, 49.04, 49.31, 47.76],
    ['2023/04/03', 49.12, 49.98, 50.1, 48.61],
    ['2023/04/04', 50.05, 48.72, 50.23, 48.19],
    ['2023/04/05', 49.0, 49.57, 49.72, 48.57],
    ['2023/04/06', 49.72, 50.39, 50.87, 49.58],
    ['2023/04/10', 50.29, 50.99, 51.36, 50.2],
    ['2023/04/11', 51.17, 50.84, 51.57, 50.61],
    ['2023/04/12', 51.27, 50.3, 51.48, 50.19],
    ['2023/04/13', 50.39, 50.53, 50.63, 48.34],
    ['2023/04/14', 50.25, 50.67, 51.25, 49.99],
    ['2023/04/17', 50.6, 50.53, 50.97, 50.12],
    ['2023/04/18', 50.63, 50.41, 51.19, 49.85],
    ['2023/04/19', 49.97, 48.02, 49.97, 47.85],
    ['2023/04/20', 47.56, 48.01, 48.35, 47.56],
    ['2023/04/21', 47.87, 47.25, 48.3, 46.87],
    ['2023/04/24', 47.27, 46.79, 47.54, 46.75],
    ['2023/04/25', 46.41, 45.25, 46.56, 45.17],
    ['2023/04/26', 45.17, 44.5, 45.44, 44.42],
    ['2023/04/27', 44.75, 43.58, 44.77, 43.37],
    ['2023/04/28', 43.45, 43.54, 43.9, 43.24],
    ['2023/05/01', 44.02, 44.85, 45.87, 44.02],
    ['2023/05/02', 44.52, 42.99, 44.63, 42.8],
    ['2023/05/03', 43.38, 42.79, 43.85, 42.69],
    ['2023/05/04', 42.39, 43.9, 44.1, 41.71],
    ['2023/05/05', 44.52, 43.72, 44.86, 43.37],
    ['2023/05/08', 43.69, 42.31, 44.17, 42.12],
    ['2023/05/09', 42.1, 42.0, 42.44, 41.85],
    ['2023/05/10', 42.52, 42.83, 43.08, 42.12],
    ['2023/05/11', 42.42, 42.78, 42.84, 42.09],
    ['2023/05/12', 43.07, 43.61, 43.73, 42.81],
    ['2023/05/15', 43.9, 43.45, 44.0, 43.23],
    ['2023/05/16', 43.11, 43.16, 43.5, 42.49],
    ['2023/05/17', 43.53, 44.27, 44.45, 43.16],
    ['2023/05/18', 44.02, 44.23, 44.8, 43.79],
    ['2023/05/19', 45.15, 45.0, 45.29, 44.28],
    ['2023/05/22', 44.89, 46.28, 46.32, 44.89],
    ['2023/05/23', 46.12, 46.49, 47.71, 45.9],
    ['2023/05/24', 46.09, 46.34, 46.66, 45.18],
    ['2023/05/25', 49.04, 48.79, 50.28, 48.05],
    ['2023/05/26', 48.9, 49.93, 50.95, 48.9],
    ['2023/05/30', 50.38, 49.73, 50.38, 49.43],
    ['2023/05/31', 49.62, 49.39, 50.28, 48.21],
    ['2023/06/01', 49.39, 49.18, 49.53, 48.16],
    ['2023/06/02', 49.66, 51.26, 51.39, 49.12],
    ['2023/06/05', 50.99, 50.49, 50.99, 49.25],
    ['2023/06/06', 50.45, 52.66, 53.03, 50.45],
    ['2023/06/07', 52.96, 54.84, 55.36, 52.96],
    ['2023/06/08', 54.61, 55.02, 55.45, 54.18],
    ['2023/06/09', 55.23, 54.99, 55.86, 54.79],
    ['2023/06/12', 54.85, 56.14, 56.2, 54.75],
    ['2023/06/13', 56.43, 56.43, 57.41, 55.92],
    ['2023/06/14', 56.27, 55.91, 56.75, 55.2],
    ['2023/06/15', 55.63, 56.13, 56.29, 55.25],
    ['2023/06/16', 56.66, 55.81, 56.66, 54.64],
    ['2023/06/20', 55.42, 56.62, 57.05, 55.31],
    ['2023/06/21', 56.39, 55.95, 56.74, 55.76],
    ['2023/06/22', 55.98, 54.98, 56.02, 54.83],
    ['2023/06/23', 54.19, 53.69, 55.05, 53.58],
    ['2023/06/26', 53.65, 54.05, 54.32, 53.21],
    ['2023/06/27', 54.15, 54.57, 54.93, 53.94],
    ['2023/06/28', 54.41, 54.03, 54.57, 53.19],
    ['2023/06/29', 54.39, 56.36, 56.37, 54.11],
    ['2023/06/30', 57.03, 56.3, 57.03, 56.1],
    ['2023/07/03', 56.21, 56.05, 56.79, 55.83],
    ['2023/07/05', 55.54, 55.53, 55.91, 54.79],
    ['2023/07/06', 54.85, 55.7, 55.75, 54.27],
    ['2023/07/07', 55.96, 56.28, 56.51, 55.96],
    ['2023/07/10', 55.98, 57.29, 57.29, 55.82],
    ['2023/07/11', 57.55, 57.21, 57.55, 56.86],
    ['2023/07/12', 58.12, 57.85, 58.54, 57.64],
    ['2023/07/13', 57.91, 58.06, 58.22, 57.56],
    ['2023/07/14', 57.79, 58.37, 58.49, 56.86],
    ['2023/07/17', 58.26, 58.67, 59.24, 57.9],
    ['2023/07/18', 58.8, 59.31, 59.53, 58.51],
    ['2023/07/19', 59.28, 60.23, 60.25, 58.68],
    ['2023/07/20', 60.08, 60.29, 60.43, 59.1],
    ['2023/07/21', 60.62, 59.6, 60.82, 59.49],
    ['2023/07/24', 59.53, 60.09, 60.28, 59.24],
    ['2023/07/25', 60.03, 60.69, 61.02, 60.03],
    ['2023/07/26', 60.37, 60.17, 61.2, 60.0],
    ['2023/07/27', 60.64, 57.83, 60.8, 57.31],
    ['2023/07/28', 58.43, 56.2, 59.74, 56.11],
    ['2023/07/31', 56.14, 56.35, 57.06, 55.94],
    ['2023/08/01', 56.04, 57.36, 57.46, 56.02],
    ['2023/08/02', 56.73, 58.24, 58.51, 56.73],
    ['2023/08/03', 57.81, 58.53, 58.86, 57.23],
    ['2023/08/04', 58.33, 58.32, 59.44, 57.8],
    ['2023/08/07', 58.21, 57.9, 59.08, 57.54],
    ['2023/08/08', 75.9, 66.7, 75.9, 64.47],
]);
var volumes = [
    108900.0,
    63300.0,
    84300.0,
    128500.0,
    127800.0,
    118500.0,
    136700.0,
    105500.0,
    145100.0,
    118300.0,
    92200.0,
    88700.0,
    94900.0,
    66400.0,
    76000.0,
    194900.0,
    78700.0,
    57900.0,
    104100.0,
    93700.0,
    123300.0,
    106900.0,
    79600.0,
    118400.0,
    90300.0,
    69300.0,
    214500.0,
    64600.0,
    59800.0,
    62300.0,
    75800.0,
    73900.0,
    105800.0,
    112600.0,
    87800.0,
    91800.0,
    258800.0,
    160300.0,
    110100.0,
    101200.0,
    114300.0,
    178500.0,
    84800.0,
    111500.0,
    72700.0,
    100000.0,
    65200.0,
    108200.0,
    74600.0,
    116000.0,
    76200.0,
    66900.0,
    69500.0,
    91900.0,
    49600.0,
    65900.0,
    66700.0,
    97600.0,
    73300.0,
    86500.0,
    70100.0,
    92900.0,
    79100.0,
    91900.0,
    86700.0,
    105300.0,
    80000.0,
    77200.0,
    99200.0,
    85600.0,
    66600.0,
    66900.0,
    51900.0,
    62200.0,
    51000.0,
    36600.0,
    52700.0,
    54300.0,
    237500.0,
    64600.0,
    68300.0,
    78100.0,
    88300.0,
    72900.0,
    60700.0,
    66500.0,
    64200.0,
    139800.0,
    102800.0,
    74700.0,
    537100.0,
    98100.0,
    76400.0,
    54000.0,
    78000.0,
    50800.0,
    39500.0,
    43700.0,
    62900.0,
    86800.0,
    76500.0,
    91300.0,
    49000.0,
    59100.0,
    38500.0,
    54700.0,
    43400.0,
    74800.0,
    60000.0,
    56500.0,
    70000.0,
    76700.0,
    85200.0,
    62200.0,
    54500.0,
    73800.0,
    58200.0,
    85400.0,
    64900.0,
    107300.0,
    95900.0,
    71300.0,
    86300.0,
    57600.0,
    61900.0,
    158700.0,
    138100.0,
    135700.0,
    68400.0,
    101100.0,
    81000.0,
    98200.0,
    114500.0,
    98800.0,
    82800.0,
    69400.0,
    97300.0,
    56000.0,
    217200.0,
    70300.0,
    51900.0,
    61000.0,
    104400.0,
    77900.0,
    62000.0,
    96700.0,
    77600.0,
    85000.0,
    82100.0,
    116500.0,
    90400.0,
    406600.0,
    82900.0,
    118800.0,
    61700.0,
    105300.0,
    66200.0,
    57600.0,
    84400.0,
    96900.0,
    61500.0,
    118200.0,
    139300.0,
    94500.0,
    114500.0,
    81700.0,
    108600.0,
    97200.0,
    49300.0,
    52700.0,
    74800.0,
    55300.0,
    54400.0,
    117300.0,
    76800.0,
    71300.0,
    78900.0,
    95300.0,
    113100.0,
    108500.0,
    160700.0,
    169600.0,
    102500.0,
    286500.0,
    348600.0,
    79000.0,
    79100.0,
    72500.0,
    85700.0,
    144400.0,
    79300.0,
    70200.0,
    184400.0,
    121200.0,
    202900.0,
    99000.0,
    105700.0,
    96800.0,
    111800.0,
    223900.0,
    188700.0,
    93800.0,
    643000.0,
    111800.0,
    168800.0,
    115700.0,
    134300.0,
    171400.0,
    146400.0,
    183500.0,
    88300.0,
    114000.0,
    96400.0,
    110500.0,
    310700.0,
    110700.0,
    107200.0,
    74200.0,
    712300.0,
    77400.0,
    83700.0,
    105200.0,
    84900.0,
    112200.0,
    33800.0,
    93600.0,
    79300.0,
    64700.0,
    83300.0,
    62200.0,
    67000.0,
    63700.0,
    95900.0,
    89300.0,
    61000.0,
    111400.0,
    75500.0,
    92500.0,
    67100.0,
    61600.0,
    37800.0,
    84800.0,
    112800.0,
    113900.0,
    86300.0,
    61500.0,
    72000.0,
    52200.0,
    81400.0,
    379500.0,
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
     *     text: "PLUS",
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