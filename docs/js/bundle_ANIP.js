/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_ANIP");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/11', 35.33, 35.39, 35.48, 34.82],
    ['2022/08/12', 35.46, 37.47, 37.96, 35.18],
    ['2022/08/15', 36.98, 37.84, 38.19, 36.73],
    ['2022/08/16', 39.99, 38.01, 39.99, 36.76],
    ['2022/08/17', 37.23, 35.87, 37.77, 35.79],
    ['2022/08/18', 35.81, 35.84, 35.99, 34.59],
    ['2022/08/19', 35.38, 35.8, 36.14, 35.04],
    ['2022/08/22', 35.46, 35.33, 35.72, 34.63],
    ['2022/08/23', 35.43, 35.78, 36.15, 35.23],
    ['2022/08/24', 35.56, 36.48, 37.66, 35.56],
    ['2022/08/25', 36.44, 37.78, 38.03, 35.74],
    ['2022/08/26', 37.68, 38.0, 38.6, 37.32],
    ['2022/08/29', 37.13, 37.18, 37.98, 36.22],
    ['2022/08/30', 37.02, 36.03, 37.09, 35.77],
    ['2022/08/31', 36.09, 36.89, 37.06, 35.29],
    ['2022/09/01', 36.66, 37.0, 37.35, 35.92],
    ['2022/09/02', 37.44, 36.57, 37.44, 35.65],
    ['2022/09/06', 36.43, 34.94, 36.43, 34.25],
    ['2022/09/07', 35.45, 37.13, 37.23, 34.9],
    ['2022/09/08', 36.72, 37.61, 38.0, 36.61],
    ['2022/09/09', 37.8, 37.09, 38.12, 36.66],
    ['2022/09/12', 36.71, 36.42, 37.44, 36.14],
    ['2022/09/13', 35.69, 36.06, 36.48, 34.78],
    ['2022/09/14', 35.94, 36.46, 36.81, 35.62],
    ['2022/09/15', 36.12, 36.42, 37.06, 35.99],
    ['2022/09/16', 35.91, 35.8, 36.21, 34.86],
    ['2022/09/19', 35.37, 34.65, 35.66, 34.39],
    ['2022/09/20', 34.45, 35.32, 35.49, 33.71],
    ['2022/09/21', 35.47, 33.46, 36.14, 33.4],
    ['2022/09/22', 33.72, 33.28, 33.72, 32.25],
    ['2022/09/23', 32.72, 31.71, 32.72, 31.08],
    ['2022/09/26', 31.53, 31.22, 32.04, 30.86],
    ['2022/09/27', 31.4, 31.1, 32.28, 30.53],
    ['2022/09/28', 31.89, 32.19, 32.7, 30.96],
    ['2022/09/29', 31.85, 31.63, 33.05, 31.09],
    ['2022/09/30', 31.48, 32.14, 33.69, 31.48],
    ['2022/10/03', 32.36, 31.9, 32.84, 31.67],
    ['2022/10/04', 32.13, 32.96, 33.66, 31.68],
    ['2022/10/05', 32.42, 32.84, 32.99, 31.97],
    ['2022/10/06', 32.55, 33.49, 33.83, 32.33],
    ['2022/10/07', 33.18, 32.26, 33.44, 32.09],
    ['2022/10/10', 32.3, 32.11, 32.6, 31.94],
    ['2022/10/11', 32.56, 32.96, 33.19, 31.21],
    ['2022/10/12', 33.02, 32.46, 33.1, 32.3],
    ['2022/10/13', 31.94, 33.75, 33.9, 31.81],
    ['2022/10/14', 33.97, 33.22, 34.11, 32.9],
    ['2022/10/17', 33.77, 34.71, 34.95, 33.72],
    ['2022/10/18', 35.2, 35.34, 35.91, 34.5],
    ['2022/10/19', 35.26, 35.2, 35.37, 34.79],
    ['2022/10/20', 35.02, 34.89, 35.32, 34.33],
    ['2022/10/21', 35.2, 36.12, 36.42, 34.87],
    ['2022/10/24', 35.96, 36.92, 37.16, 35.96],
    ['2022/10/25', 36.78, 36.61, 37.99, 36.57],
    ['2022/10/26', 37.05, 37.77, 38.38, 37.05],
    ['2022/10/27', 37.92, 38.04, 38.97, 36.29],
    ['2022/10/28', 38.45, 38.93, 39.16, 37.74],
    ['2022/10/31', 38.75, 38.59, 39.03, 36.77],
    ['2022/11/01', 38.97, 38.99, 39.45, 38.38],
    ['2022/11/02', 38.83, 38.15, 39.5, 37.99],
    ['2022/11/03', 37.71, 38.08, 38.59, 37.3],
    ['2022/11/04', 38.38, 38.34, 38.94, 37.9],
    ['2022/11/07', 38.25, 38.24, 39.0, 37.65],
    ['2022/11/08', 38.06, 38.26, 38.58, 36.58],
    ['2022/11/09', 39.04, 34.74, 39.46, 32.16],
    ['2022/11/10', 35.98, 36.29, 36.76, 35.56],
    ['2022/11/11', 36.12, 37.6, 38.22, 35.35],
    ['2022/11/14', 37.65, 36.48, 37.74, 36.34],
    ['2022/11/15', 36.7, 36.6, 37.27, 35.65],
    ['2022/11/16', 37.39, 37.86, 38.41, 36.74],
    ['2022/11/17', 37.24, 39.69, 39.75, 37.14],
    ['2022/11/18', 40.0, 39.56, 40.75, 39.05],
    ['2022/11/21', 39.59, 38.58, 39.95, 37.81],
    ['2022/11/22', 38.68, 40.17, 40.28, 38.41],
    ['2022/11/23', 39.67, 40.19, 40.87, 39.15],
    ['2022/11/25', 39.95, 41.66, 41.66, 39.49],
    ['2022/11/28', 41.46, 40.01, 41.5, 39.43],
    ['2022/11/29', 39.77, 40.66, 41.67, 39.77],
    ['2022/11/30', 40.84, 41.95, 42.09, 40.24],
    ['2022/12/01', 41.8, 38.85, 42.33, 37.52],
    ['2022/12/02', 37.79, 38.83, 39.82, 37.79],
    ['2022/12/05', 39.23, 38.0, 39.23, 37.45],
    ['2022/12/06', 37.53, 37.31, 37.68, 36.36],
    ['2022/12/07', 37.28, 37.65, 38.06, 37.1],
    ['2022/12/08', 37.73, 39.59, 40.18, 36.8],
    ['2022/12/09', 39.57, 39.5, 39.9, 38.13],
    ['2022/12/12', 39.65, 40.0, 40.75, 39.07],
    ['2022/12/13', 41.27, 40.1, 41.82, 39.95],
    ['2022/12/14', 40.31, 40.66, 41.33, 39.8],
    ['2022/12/15', 40.49, 39.24, 40.9, 39.15],
    ['2022/12/16', 38.71, 38.07, 39.52, 37.49],
    ['2022/12/19', 38.0, 38.11, 38.72, 37.2],
    ['2022/12/20', 38.27, 39.27, 39.58, 37.96],
    ['2022/12/21', 39.75, 39.68, 40.98, 39.53],
    ['2022/12/22', 39.42, 39.57, 40.3, 39.03],
    ['2022/12/23', 39.54, 39.45, 40.0, 38.82],
    ['2022/12/27', 39.44, 38.86, 39.83, 38.42],
    ['2022/12/28', 38.89, 39.18, 39.9, 38.89],
    ['2022/12/29', 39.0, 40.93, 41.68, 38.5],
    ['2022/12/30', 40.65, 40.23, 41.56, 39.57],
    ['2023/01/03', 40.85, 40.04, 41.29, 39.43],
    ['2023/01/04', 40.1, 39.35, 40.4, 38.89],
    ['2023/01/05', 39.23, 39.83, 40.57, 39.0],
    ['2023/01/06', 40.47, 43.92, 44.86, 40.1],
    ['2023/01/09', 43.92, 42.25, 44.0, 41.12],
    ['2023/01/10', 41.92, 42.26, 42.42, 40.87],
    ['2023/01/11', 42.25, 41.21, 42.95, 40.79],
    ['2023/01/12', 41.1, 43.0, 43.08, 41.1],
    ['2023/01/13', 42.35, 43.95, 44.22, 42.35],
    ['2023/01/17', 43.93, 41.85, 43.93, 41.84],
    ['2023/01/18', 42.35, 41.64, 42.95, 41.22],
    ['2023/01/19', 41.42, 41.63, 41.72, 40.97],
    ['2023/01/20', 42.14, 42.02, 42.16, 41.35],
    ['2023/01/23', 41.92, 42.98, 43.34, 40.96],
    ['2023/01/24', 41.89, 43.53, 43.89, 41.89],
    ['2023/01/25', 43.3, 43.6, 43.74, 42.74],
    ['2023/01/26', 43.81, 43.53, 44.32, 42.98],
    ['2023/01/27', 43.13, 43.61, 43.79, 42.8],
    ['2023/01/30', 43.47, 42.75, 43.95, 42.09],
    ['2023/01/31', 42.77, 44.73, 44.74, 42.77],
    ['2023/02/01', 44.92, 44.31, 45.5, 43.39],
    ['2023/02/02', 44.22, 45.21, 45.35, 44.0],
    ['2023/02/03', 44.82, 44.67, 45.5, 44.09],
    ['2023/02/06', 44.68, 45.08, 45.09, 44.0],
    ['2023/02/07', 44.81, 45.72, 45.99, 44.27],
    ['2023/02/08', 45.42, 44.85, 45.65, 44.65],
    ['2023/02/09', 44.96, 44.53, 45.09, 44.24],
    ['2023/02/10', 44.22, 45.0, 45.16, 44.12],
    ['2023/02/13', 44.95, 45.08, 45.63, 44.6],
    ['2023/02/14', 44.97, 45.0, 45.63, 44.72],
    ['2023/02/15', 44.81, 45.04, 45.33, 44.25],
    ['2023/02/16', 44.54, 42.82, 44.79, 42.58],
    ['2023/02/17', 43.04, 43.08, 43.74, 42.67],
    ['2023/02/21', 43.08, 40.22, 43.08, 40.04],
    ['2023/02/22', 40.2, 41.01, 41.85, 40.0],
    ['2023/02/23', 41.46, 41.22, 41.89, 40.71],
    ['2023/02/24', 40.71, 41.13, 41.35, 40.08],
    ['2023/02/27', 41.39, 41.83, 42.7, 41.23],
    ['2023/02/28', 41.54, 41.84, 42.21, 41.25],
    ['2023/03/01', 43.18, 43.82, 44.02, 42.5],
    ['2023/03/02', 44.16, 44.4, 44.79, 43.51],
    ['2023/03/03', 44.6, 45.46, 45.7, 44.31],
    ['2023/03/06', 45.52, 44.43, 45.7, 43.76],
    ['2023/03/07', 44.51, 44.23, 44.81, 43.11],
    ['2023/03/08', 44.21, 43.13, 44.73, 42.69],
    ['2023/03/09', 43.58, 43.17, 44.01, 42.61],
    ['2023/03/10', 43.07, 40.86, 43.13, 38.58],
    ['2023/03/13', 40.84, 41.01, 41.6, 40.3],
    ['2023/03/14', 41.94, 40.54, 41.94, 39.31],
    ['2023/03/15', 39.64, 40.01, 40.18, 38.22],
    ['2023/03/16', 39.48, 39.75, 40.23, 38.89],
    ['2023/03/17', 39.36, 39.35, 39.85, 39.03],
    ['2023/03/20', 39.65, 39.35, 40.05, 39.2],
    ['2023/03/21', 39.99, 39.85, 40.63, 39.61],
    ['2023/03/22', 39.8, 38.76, 40.02, 38.51],
    ['2023/03/23', 38.76, 37.82, 39.48, 37.52],
    ['2023/03/24', 37.49, 37.61, 37.88, 36.54],
    ['2023/03/27', 38.09, 38.38, 39.34, 38.09],
    ['2023/03/28', 38.5, 38.62, 39.98, 37.27],
    ['2023/03/29', 38.97, 39.33, 39.43, 38.29],
    ['2023/03/30', 39.66, 39.53, 39.8, 38.81],
    ['2023/03/31', 39.83, 39.72, 40.1, 39.05],
    ['2023/04/03', 39.37, 38.82, 40.15, 38.33],
    ['2023/04/04', 39.2, 37.72, 39.26, 37.27],
    ['2023/04/05', 37.65, 38.38, 38.57, 37.11],
    ['2023/04/06', 38.34, 38.16, 38.47, 38.0],
    ['2023/04/10', 38.01, 38.5, 38.86, 37.91],
    ['2023/04/11', 38.3, 38.63, 39.2, 38.26],
    ['2023/04/12', 39.0, 37.98, 39.3, 37.59],
    ['2023/04/13', 38.23, 38.94, 39.19, 37.7],
    ['2023/04/14', 39.01, 38.42, 39.3, 38.0],
    ['2023/04/17', 38.78, 38.7, 38.86, 37.85],
    ['2023/04/18', 38.96, 37.99, 39.08, 37.74],
    ['2023/04/19', 37.9, 39.26, 39.52, 37.6],
    ['2023/04/20', 38.99, 39.6, 40.03, 38.69],
    ['2023/04/21', 39.63, 39.52, 40.18, 39.23],
    ['2023/04/24', 40.53, 38.71, 40.67, 38.6],
    ['2023/04/25', 38.35, 37.58, 38.85, 37.02],
    ['2023/04/26', 37.32, 37.61, 37.76, 36.99],
    ['2023/04/27', 37.67, 37.29, 38.02, 37.06],
    ['2023/04/28', 37.12, 37.72, 38.3, 37.06],
    ['2023/05/01', 37.74, 38.12, 38.79, 37.4],
    ['2023/05/02', 37.86, 37.99, 38.69, 37.62],
    ['2023/05/03', 38.03, 38.32, 38.62, 37.75],
    ['2023/05/04', 38.02, 38.04, 38.29, 37.64],
    ['2023/05/05', 38.34, 39.14, 39.48, 37.87],
    ['2023/05/08', 48.47, 42.58, 52.23, 42.4],
    ['2023/05/09', 43.83, 44.41, 46.07, 42.96],
    ['2023/05/10', 44.41, 43.78, 45.0, 42.71],
    ['2023/05/11', 43.65, 43.95, 44.64, 43.43],
    ['2023/05/12', 40.61, 41.67, 41.98, 38.91],
    ['2023/05/15', 41.92, 40.88, 43.28, 40.0],
    ['2023/05/16', 40.55, 44.28, 44.94, 40.55],
    ['2023/05/17', 44.54, 44.5, 45.18, 43.32],
    ['2023/05/18', 44.54, 46.41, 46.49, 44.07],
    ['2023/05/19', 45.97, 45.97, 46.96, 45.5],
    ['2023/05/22', 46.06, 46.29, 46.5, 45.02],
    ['2023/05/23', 46.29, 46.68, 46.86, 45.96],
    ['2023/05/24', 46.27, 46.66, 46.94, 45.61],
    ['2023/05/25', 46.63, 46.15, 46.63, 45.22],
    ['2023/05/26', 46.08, 46.15, 46.95, 45.93],
    ['2023/05/30', 46.2, 44.95, 46.7, 44.88],
    ['2023/05/31', 44.81, 45.14, 45.7, 44.27],
    ['2023/06/01', 45.06, 46.42, 46.69, 44.66],
    ['2023/06/02', 46.79, 48.0, 48.04, 46.13],
    ['2023/06/05', 47.74, 48.4, 48.95, 47.44],
    ['2023/06/06', 48.52, 48.95, 49.32, 48.52],
    ['2023/06/07', 49.2, 49.4, 49.87, 48.65],
    ['2023/06/08', 49.21, 49.86, 49.88, 48.96],
    ['2023/06/09', 49.69, 49.49, 49.99, 49.21],
    ['2023/06/12', 49.75, 49.65, 50.28, 49.32],
    ['2023/06/13', 49.57, 49.67, 50.65, 49.51],
    ['2023/06/14', 49.8, 49.67, 49.84, 49.1],
    ['2023/06/15', 49.5, 50.71, 51.25, 49.47],
    ['2023/06/16', 51.17, 51.35, 52.0, 50.7],
    ['2023/06/20', 51.13, 52.67, 52.8, 50.63],
    ['2023/06/21', 52.56, 52.12, 52.67, 51.0],
    ['2023/06/22', 51.84, 51.54, 51.84, 50.81],
    ['2023/06/23', 51.1, 51.73, 52.08, 50.94],
    ['2023/06/26', 51.42, 53.17, 53.5, 51.33],
    ['2023/06/27', 53.5, 53.35, 53.85, 52.43],
    ['2023/06/28', 53.32, 53.15, 53.86, 52.74],
    ['2023/06/29', 53.08, 53.51, 54.0, 52.87],
    ['2023/06/30', 53.84, 53.83, 54.62, 53.4],
    ['2023/07/03', 53.52, 54.02, 54.3, 52.76],
    ['2023/07/05', 53.91, 53.46, 54.37, 53.26],
    ['2023/07/06', 53.23, 53.5, 53.57, 52.23],
    ['2023/07/07', 53.41, 52.03, 53.93, 51.98],
    ['2023/07/10', 52.01, 51.13, 52.19, 50.65],
    ['2023/07/11', 51.14, 51.3, 51.53, 50.37],
    ['2023/07/12', 51.61, 51.12, 51.88, 51.06],
    ['2023/07/13', 51.24, 50.55, 51.34, 50.47],
    ['2023/07/14', 50.52, 50.28, 50.87, 49.98],
    ['2023/07/17', 50.35, 51.34, 51.75, 49.77],
    ['2023/07/18', 51.62, 51.89, 52.51, 51.45],
    ['2023/07/19', 51.76, 51.5, 52.28, 50.95],
    ['2023/07/20', 51.49, 51.68, 52.08, 51.0],
    ['2023/07/21', 52.1, 52.19, 53.5, 52.1],
    ['2023/07/24', 52.41, 52.79, 53.6, 52.41],
    ['2023/07/25', 52.81, 52.76, 53.26, 52.53],
    ['2023/07/26', 52.68, 52.19, 52.94, 51.89],
    ['2023/07/27', 52.57, 51.54, 52.67, 51.27],
    ['2023/07/28', 51.79, 52.36, 52.66, 51.75],
    ['2023/07/31', 52.59, 52.55, 53.51, 52.02],
    ['2023/08/01', 52.33, 50.78, 52.58, 50.52],
    ['2023/08/02', 50.45, 51.13, 51.43, 50.13],
    ['2023/08/03', 51.1, 52.18, 52.98, 50.87],
    ['2023/08/04', 52.45, 53.77, 53.83, 52.09],
    ['2023/08/07', 53.57, 53.77, 54.65, 52.79],
    ['2023/08/08', 53.59, 55.93, 56.47, 53.28],
    ['2023/08/09', 61.05, 61.08, 63.1, 58.0],
]);
var volumes = [
    96800.0,
    91700.0,
    107200.0,
    102300.0,
    81100.0,
    39700.0,
    52200.0,
    57500.0,
    32500.0,
    59100.0,
    78100.0,
    73100.0,
    70400.0,
    89000.0,
    55000.0,
    63200.0,
    41900.0,
    125000.0,
    79600.0,
    57800.0,
    54300.0,
    75700.0,
    78300.0,
    59100.0,
    77200.0,
    334300.0,
    47100.0,
    70300.0,
    47900.0,
    46600.0,
    61300.0,
    55000.0,
    55400.0,
    65000.0,
    105800.0,
    103800.0,
    42100.0,
    63400.0,
    33600.0,
    44600.0,
    47400.0,
    25400.0,
    56200.0,
    36000.0,
    60500.0,
    33800.0,
    39000.0,
    47700.0,
    63800.0,
    38000.0,
    44900.0,
    25400.0,
    48700.0,
    44100.0,
    36700.0,
    55100.0,
    63400.0,
    35900.0,
    39800.0,
    42300.0,
    30600.0,
    50500.0,
    91500.0,
    211600.0,
    146400.0,
    82500.0,
    83300.0,
    59300.0,
    77300.0,
    69900.0,
    53500.0,
    93400.0,
    57800.0,
    43000.0,
    48900.0,
    46500.0,
    54400.0,
    71300.0,
    146500.0,
    64000.0,
    68700.0,
    38200.0,
    79200.0,
    88400.0,
    55500.0,
    88800.0,
    116000.0,
    79600.0,
    84600.0,
    200800.0,
    80100.0,
    72900.0,
    45000.0,
    44100.0,
    43200.0,
    49000.0,
    24000.0,
    85800.0,
    69200.0,
    44600.0,
    63300.0,
    101000.0,
    226200.0,
    80700.0,
    78900.0,
    70800.0,
    83800.0,
    77700.0,
    48400.0,
    62700.0,
    67400.0,
    72500.0,
    67800.0,
    30100.0,
    19600.0,
    39500.0,
    32800.0,
    44300.0,
    73000.0,
    68200.0,
    54700.0,
    70500.0,
    57300.0,
    52000.0,
    53800.0,
    43200.0,
    30200.0,
    45600.0,
    48800.0,
    44900.0,
    65100.0,
    37500.0,
    67700.0,
    68600.0,
    64800.0,
    54900.0,
    44300.0,
    64000.0,
    47300.0,
    47800.0,
    61300.0,
    66300.0,
    109800.0,
    125700.0,
    182700.0,
    125500.0,
    89400.0,
    178800.0,
    77200.0,
    49900.0,
    140800.0,
    47400.0,
    78300.0,
    50000.0,
    64300.0,
    60300.0,
    69200.0,
    74000.0,
    58700.0,
    63500.0,
    78500.0,
    89500.0,
    61200.0,
    35700.0,
    24700.0,
    38900.0,
    30700.0,
    39200.0,
    42500.0,
    57600.0,
    76500.0,
    63400.0,
    48900.0,
    39400.0,
    78800.0,
    29100.0,
    36100.0,
    44800.0,
    30300.0,
    43900.0,
    33300.0,
    58800.0,
    41400.0,
    35800.0,
    51000.0,
    405700.0,
    159200.0,
    128900.0,
    53300.0,
    1192000.0,
    235700.0,
    240500.0,
    206500.0,
    153500.0,
    117500.0,
    114600.0,
    216300.0,
    164600.0,
    102500.0,
    74600.0,
    63800.0,
    90000.0,
    148600.0,
    165700.0,
    121400.0,
    147000.0,
    121300.0,
    68000.0,
    52400.0,
    94700.0,
    92500.0,
    101700.0,
    133500.0,
    535200.0,
    163300.0,
    103300.0,
    148600.0,
    510000.0,
    163400.0,
    104900.0,
    105500.0,
    64500.0,
    127400.0,
    103600.0,
    69600.0,
    83200.0,
    106800.0,
    124800.0,
    114000.0,
    61800.0,
    55500.0,
    92600.0,
    102400.0,
    80200.0,
    69300.0,
    68500.0,
    82400.0,
    77400.0,
    78800.0,
    59700.0,
    55500.0,
    49500.0,
    65500.0,
    104000.0,
    67900.0,
    90500.0,
    80300.0,
    73800.0,
    148500.0,
    345900.0,
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
     *     text: "ANIP",
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