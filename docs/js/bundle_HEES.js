/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_HEES");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/09', 34.5, 34.37, 34.54, 33.83],
    ['2022/08/10', 35.26, 35.04, 35.93, 34.97],
    ['2022/08/11', 35.34, 35.36, 36.0, 35.09],
    ['2022/08/12', 35.21, 35.2, 35.71, 34.85],
    ['2022/08/15', 35.14, 35.64, 35.78, 34.84],
    ['2022/08/16', 35.64, 35.54, 36.02, 35.33],
    ['2022/08/17', 35.03, 34.93, 35.03, 34.56],
    ['2022/08/18', 34.84, 35.18, 35.43, 34.53],
    ['2022/08/19', 34.7, 34.41, 35.26, 34.15],
    ['2022/08/22', 33.77, 33.34, 34.04, 33.19],
    ['2022/08/23', 33.32, 33.59, 34.18, 33.28],
    ['2022/08/24', 33.49, 33.93, 34.28, 33.38],
    ['2022/08/25', 33.85, 35.11, 35.19, 33.85],
    ['2022/08/26', 35.18, 33.54, 35.37, 33.51],
    ['2022/08/29', 33.15, 33.17, 33.55, 32.82],
    ['2022/08/30', 33.11, 31.87, 33.15, 31.72],
    ['2022/08/31', 32.11, 31.66, 32.2, 31.34],
    ['2022/09/01', 31.27, 31.02, 31.62, 30.42],
    ['2022/09/02', 31.33, 30.91, 31.82, 30.75],
    ['2022/09/06', 31.01, 31.12, 31.19, 30.2],
    ['2022/09/07', 30.81, 31.96, 32.03, 30.64],
    ['2022/09/08', 31.43, 32.26, 32.39, 30.84],
    ['2022/09/09', 32.52, 33.0, 33.67, 32.49],
    ['2022/09/12', 33.4, 33.39, 33.74, 32.99],
    ['2022/09/13', 32.37, 31.42, 32.81, 31.21],
    ['2022/09/14', 31.55, 31.28, 31.66, 30.74],
    ['2022/09/15', 31.08, 31.01, 31.83, 30.73],
    ['2022/09/16', 30.32, 30.45, 30.73, 29.87],
    ['2022/09/19', 30.89, 31.77, 31.95, 30.61],
    ['2022/09/20', 31.28, 31.15, 31.44, 30.55],
    ['2022/09/21', 31.36, 30.55, 31.75, 30.46],
    ['2022/09/22', 30.67, 29.34, 30.67, 29.31],
    ['2022/09/23', 28.81, 28.08, 29.06, 27.62],
    ['2022/09/26', 27.68, 27.46, 28.29, 26.94],
    ['2022/09/27', 27.77, 27.56, 28.33, 27.14],
    ['2022/09/28', 27.9, 28.91, 29.15, 27.81],
    ['2022/09/29', 28.25, 28.52, 28.65, 27.7],
    ['2022/09/30', 28.55, 28.34, 29.38, 28.26],
    ['2022/10/03', 28.79, 29.51, 29.88, 28.31],
    ['2022/10/04', 30.56, 31.4, 31.45, 30.42],
    ['2022/10/05', 30.99, 31.27, 31.45, 30.45],
    ['2022/10/06', 30.87, 30.82, 31.63, 30.62],
    ['2022/10/07', 30.51, 29.32, 30.53, 29.12],
    ['2022/10/10', 29.51, 29.2, 29.65, 28.83],
    ['2022/10/11', 28.88, 29.17, 29.67, 28.61],
    ['2022/10/12', 29.21, 28.65, 29.29, 28.63],
    ['2022/10/13', 28.1, 29.69, 29.89, 27.38],
    ['2022/10/14', 29.9, 28.87, 30.01, 28.8],
    ['2022/10/17', 29.46, 30.12, 30.23, 29.3],
    ['2022/10/18', 31.04, 30.98, 31.4, 30.38],
    ['2022/10/19', 30.3, 30.3, 30.95, 29.83],
    ['2022/10/20', 30.48, 29.21, 30.69, 28.95],
    ['2022/10/21', 29.36, 30.6, 30.89, 29.08],
    ['2022/10/24', 30.86, 31.18, 31.47, 29.94],
    ['2022/10/25', 31.17, 31.7, 32.28, 31.0],
    ['2022/10/26', 31.73, 31.72, 32.39, 31.22],
    ['2022/10/27', 32.94, 32.91, 33.5, 32.23],
    ['2022/10/28', 33.47, 36.78, 37.32, 33.47],
    ['2022/10/31', 36.65, 37.76, 38.0, 36.16],
    ['2022/11/01', 38.06, 38.77, 39.28, 37.8],
    ['2022/11/02', 38.72, 37.62, 39.53, 37.42],
    ['2022/11/03', 37.02, 39.32, 39.64, 36.85],
    ['2022/11/04', 39.36, 40.6, 40.76, 39.35],
    ['2022/11/07', 41.07, 40.42, 41.15, 39.58],
    ['2022/11/08', 40.59, 40.73, 40.99, 40.03],
    ['2022/11/09', 40.21, 39.61, 40.44, 39.36],
    ['2022/11/10', 41.36, 41.49, 41.9, 40.8],
    ['2022/11/11', 41.96, 41.9, 42.82, 41.44],
    ['2022/11/14', 41.52, 41.75, 42.48, 41.04],
    ['2022/11/15', 42.4, 41.8, 42.69, 41.4],
    ['2022/11/16', 41.6, 41.23, 42.01, 41.04],
    ['2022/11/17', 40.13, 40.86, 40.86, 39.51],
    ['2022/11/18', 41.64, 40.92, 41.96, 40.49],
    ['2022/11/21', 40.87, 41.49, 41.59, 40.73],
    ['2022/11/22', 41.9, 42.6, 42.62, 41.47],
    ['2022/11/23', 42.3, 42.53, 42.73, 41.87],
    ['2022/11/25', 42.17, 41.93, 42.26, 41.6],
    ['2022/11/28', 41.45, 40.93, 41.62, 40.54],
    ['2022/11/29', 40.88, 40.19, 41.09, 39.99],
    ['2022/11/30', 40.32, 41.93, 41.95, 39.09],
    ['2022/12/01', 42.39, 42.56, 42.72, 41.58],
    ['2022/12/02', 41.61, 42.88, 43.45, 41.24],
    ['2022/12/05', 42.68, 41.75, 42.68, 41.47],
    ['2022/12/06', 41.71, 42.77, 42.9, 41.71],
    ['2022/12/07', 42.77, 44.73, 44.91, 42.64],
    ['2022/12/08', 44.98, 43.45, 45.24, 42.8],
    ['2022/12/09', 43.11, 42.82, 43.74, 42.79],
    ['2022/12/12', 42.95, 45.56, 45.61, 42.26],
    ['2022/12/13', 46.09, 45.96, 46.81, 45.12],
    ['2022/12/14', 45.93, 46.19, 47.17, 45.58],
    ['2022/12/15', 45.66, 43.62, 45.66, 43.27],
    ['2022/12/16', 43.31, 43.7, 43.77, 42.32],
    ['2022/12/19', 44.05, 43.8, 44.37, 43.23],
    ['2022/12/20', 43.88, 44.37, 44.53, 43.61],
    ['2022/12/21', 45.13, 44.92, 45.43, 44.65],
    ['2022/12/22', 44.63, 44.22, 45.48, 43.17],
    ['2022/12/23', 44.14, 45.2, 45.29, 44.14],
    ['2022/12/27', 45.45, 45.77, 46.33, 44.97],
    ['2022/12/28', 45.91, 45.01, 46.09, 44.71],
    ['2022/12/29', 45.28, 46.11, 46.44, 45.27],
    ['2022/12/30', 45.7, 45.4, 46.0, 45.03],
    ['2023/01/03', 45.94, 45.36, 46.15, 44.9],
    ['2023/01/04', 45.6, 45.43, 46.21, 45.16],
    ['2023/01/05', 45.19, 45.9, 45.96, 44.26],
    ['2023/01/06', 46.17, 47.94, 48.23, 46.17],
    ['2023/01/09', 48.37, 47.44, 48.74, 47.34],
    ['2023/01/10', 47.68, 48.73, 48.9, 47.14],
    ['2023/01/11', 49.0, 47.96, 49.24, 47.94],
    ['2023/01/12', 48.04, 48.07, 48.84, 47.67],
    ['2023/01/13', 47.68, 47.24, 48.22, 47.09],
    ['2023/01/17', 47.24, 47.57, 47.8, 46.87],
    ['2023/01/18', 47.72, 47.7, 48.15, 46.99],
    ['2023/01/19', 47.26, 47.45, 47.85, 46.61],
    ['2023/01/20', 47.8, 48.19, 48.22, 47.0],
    ['2023/01/23', 48.35, 49.32, 49.51, 48.25],
    ['2023/01/24', 48.92, 49.45, 49.93, 48.86],
    ['2023/01/25', 49.01, 48.96, 49.2, 48.41],
    ['2023/01/26', 49.35, 50.18, 50.28, 48.93],
    ['2023/01/27', 49.91, 50.78, 51.0, 49.75],
    ['2023/01/30', 50.3, 49.84, 50.84, 49.83],
    ['2023/01/31', 49.94, 50.89, 50.95, 49.42],
    ['2023/02/01', 50.64, 51.4, 51.84, 50.07],
    ['2023/02/02', 51.79, 51.0, 51.82, 50.35],
    ['2023/02/03', 50.5, 51.16, 51.83, 50.28],
    ['2023/02/06', 50.99, 50.68, 51.32, 50.56],
    ['2023/02/07', 50.42, 51.09, 51.18, 49.8],
    ['2023/02/08', 50.9, 50.85, 51.2, 50.61],
    ['2023/02/09', 51.33, 49.75, 51.52, 49.56],
    ['2023/02/10', 49.66, 49.62, 49.85, 48.95],
    ['2023/02/13', 49.72, 50.11, 50.37, 49.45],
    ['2023/02/14', 49.94, 49.89, 50.71, 49.21],
    ['2023/02/15', 49.46, 50.71, 50.9, 49.25],
    ['2023/02/16', 50.08, 50.84, 51.5, 50.08],
    ['2023/02/17', 51.0, 51.46, 51.9, 50.9],
    ['2023/02/21', 50.98, 49.61, 51.46, 49.61],
    ['2023/02/22', 51.37, 49.36, 51.85, 49.3],
    ['2023/02/23', 49.93, 51.34, 51.57, 49.72],
    ['2023/02/24', 50.77, 53.36, 53.54, 50.12],
    ['2023/02/27', 53.79, 53.74, 54.43, 53.3],
    ['2023/02/28', 53.6, 55.5, 56.17, 53.6],
    ['2023/03/01', 55.24, 54.49, 56.25, 54.21],
    ['2023/03/02', 54.24, 55.19, 55.66, 53.88],
    ['2023/03/03', 55.46, 55.8, 56.03, 54.76],
    ['2023/03/06', 56.13, 55.42, 56.47, 54.97],
    ['2023/03/07', 55.27, 55.31, 56.23, 54.87],
    ['2023/03/08', 55.34, 54.93, 55.76, 54.41],
    ['2023/03/09', 55.02, 53.28, 55.3, 53.0],
    ['2023/03/10', 53.16, 48.62, 53.16, 48.3],
    ['2023/03/13', 47.79, 45.7, 48.16, 45.08],
    ['2023/03/14', 47.36, 47.07, 48.03, 46.1],
    ['2023/03/15', 45.57, 44.79, 46.03, 43.55],
    ['2023/03/16', 44.32, 44.27, 45.1, 43.48],
    ['2023/03/17', 43.54, 41.91, 44.01, 41.14],
    ['2023/03/20', 42.6, 42.43, 43.5, 42.25],
    ['2023/03/21', 44.07, 44.4, 44.74, 43.55],
    ['2023/03/22', 44.4, 43.12, 46.04, 43.06],
    ['2023/03/23', 43.35, 42.65, 45.54, 41.82],
    ['2023/03/24', 41.94, 42.26, 42.27, 40.77],
    ['2023/03/27', 42.91, 43.12, 43.44, 42.12],
    ['2023/03/28', 42.83, 42.89, 43.69, 42.22],
    ['2023/03/29', 43.37, 42.92, 43.47, 42.1],
    ['2023/03/30', 43.46, 43.43, 43.86, 43.03],
    ['2023/03/31', 43.86, 44.23, 44.62, 43.71],
    ['2023/04/03', 44.52, 44.0, 44.86, 43.24],
    ['2023/04/04', 44.15, 41.41, 44.15, 40.99],
    ['2023/04/05', 40.87, 39.75, 41.36, 39.52],
    ['2023/04/06', 39.92, 40.09, 40.61, 39.5],
    ['2023/04/10', 40.01, 40.99, 41.45, 39.7],
    ['2023/04/11', 41.25, 41.01, 41.79, 41.0],
    ['2023/04/12', 41.77, 41.92, 42.3, 41.44],
    ['2023/04/13', 42.16, 41.86, 42.25, 41.26],
    ['2023/04/14', 41.93, 41.98, 42.6, 41.59],
    ['2023/04/17', 42.0, 42.7, 42.86, 42.0],
    ['2023/04/18', 42.92, 42.95, 43.44, 42.64],
    ['2023/04/19', 42.65, 42.38, 42.94, 41.97],
    ['2023/04/20', 42.16, 42.31, 42.89, 41.98],
    ['2023/04/21', 42.18, 41.55, 42.49, 41.27],
    ['2023/04/24', 41.72, 42.38, 42.66, 41.72],
    ['2023/04/25', 41.74, 41.55, 42.04, 41.34],
    ['2023/04/26', 41.2, 41.36, 41.71, 40.89],
    ['2023/04/27', 40.41, 36.16, 40.54, 35.0],
    ['2023/04/28', 35.84, 36.5, 36.69, 35.51],
    ['2023/05/01', 36.37, 36.98, 37.41, 36.33],
    ['2023/05/02', 36.7, 35.13, 36.9, 35.02],
    ['2023/05/03', 35.12, 34.35, 36.08, 34.29],
    ['2023/05/04', 33.92, 32.62, 34.3, 32.33],
    ['2023/05/05', 33.43, 33.6, 34.35, 33.24],
    ['2023/05/08', 33.99, 34.5, 34.53, 33.65],
    ['2023/05/09', 34.39, 34.81, 35.06, 33.92],
    ['2023/05/10', 35.49, 35.62, 35.74, 35.16],
    ['2023/05/11', 35.24, 35.25, 35.43, 34.96],
    ['2023/05/12', 35.73, 34.99, 35.84, 34.73],
    ['2023/05/15', 35.1, 35.75, 36.21, 34.75],
    ['2023/05/16', 35.43, 35.0, 35.43, 34.86],
    ['2023/05/17', 35.42, 37.0, 37.4, 35.16],
    ['2023/05/18', 36.81, 37.56, 37.78, 36.81],
    ['2023/05/19', 38.2, 37.31, 38.3, 36.86],
    ['2023/05/22', 37.56, 38.29, 38.33, 36.91],
    ['2023/05/23', 38.29, 38.14, 39.09, 37.76],
    ['2023/05/24', 37.68, 36.8, 37.68, 36.6],
    ['2023/05/25', 36.57, 37.03, 37.84, 36.24],
    ['2023/05/26', 37.22, 37.82, 38.17, 37.22],
    ['2023/05/30', 37.83, 37.57, 38.25, 37.35],
    ['2023/05/31', 37.23, 35.96, 37.7, 35.86],
    ['2023/06/01', 36.04, 36.48, 36.71, 35.57],
    ['2023/06/02', 37.39, 39.52, 39.77, 37.2],
    ['2023/06/05', 39.46, 38.82, 39.5, 38.5],
    ['2023/06/06', 38.71, 40.77, 40.93, 38.41],
    ['2023/06/07', 41.21, 43.14, 43.35, 40.98],
    ['2023/06/08', 42.88, 43.75, 43.81, 42.5],
    ['2023/06/09', 43.77, 42.39, 43.77, 42.08],
    ['2023/06/12', 42.43, 42.86, 43.58, 42.15],
    ['2023/06/13', 43.0, 43.84, 44.49, 43.0],
    ['2023/06/14', 43.7, 42.97, 44.18, 42.25],
    ['2023/06/15', 42.62, 44.08, 44.17, 42.62],
    ['2023/06/16', 44.07, 43.88, 44.11, 43.01],
    ['2023/06/20', 43.58, 45.04, 45.24, 42.81],
    ['2023/06/21', 44.71, 44.95, 45.85, 44.52],
    ['2023/06/22', 44.81, 43.67, 44.83, 43.55],
    ['2023/06/23', 42.84, 42.38, 43.51, 42.18],
    ['2023/06/26', 42.27, 43.16, 43.89, 42.27],
    ['2023/06/27', 43.27, 44.22, 44.53, 42.93],
    ['2023/06/28', 44.29, 44.72, 44.83, 43.84],
    ['2023/06/29', 44.83, 45.73, 45.8, 44.83],
    ['2023/06/30', 46.14, 45.75, 46.58, 45.72],
    ['2023/07/03', 45.51, 45.6, 46.1, 45.15],
    ['2023/07/05', 45.33, 44.49, 45.33, 44.46],
    ['2023/07/06', 43.98, 43.21, 44.34, 42.95],
    ['2023/07/07', 43.43, 44.49, 45.01, 43.43],
    ['2023/07/10', 44.53, 44.94, 45.64, 44.03],
    ['2023/07/11', 45.16, 46.45, 46.5, 44.9],
    ['2023/07/12', 47.29, 46.69, 47.42, 46.55],
    ['2023/07/13', 46.98, 46.78, 47.21, 46.24],
    ['2023/07/14', 46.66, 45.98, 46.66, 45.47],
    ['2023/07/17', 45.68, 46.39, 46.66, 45.65],
    ['2023/07/18', 46.23, 47.67, 47.67, 45.99],
    ['2023/07/19', 47.6, 48.27, 48.57, 47.58],
    ['2023/07/20', 48.27, 47.97, 48.95, 47.79],
    ['2023/07/21', 48.45, 46.64, 48.45, 46.59],
    ['2023/07/24', 46.92, 47.45, 47.76, 46.92],
    ['2023/07/25', 46.98, 47.09, 47.87, 46.84],
    ['2023/07/26', 47.14, 46.71, 48.0, 46.52],
    ['2023/07/27', 48.3, 43.97, 48.8, 43.5],
    ['2023/07/28', 45.61, 46.69, 47.19, 44.84],
    ['2023/07/31', 47.21, 48.58, 49.95, 47.21],
    ['2023/08/01', 48.58, 49.78, 50.36, 48.53],
    ['2023/08/02', 49.12, 48.9, 49.92, 48.61],
    ['2023/08/03', 48.46, 48.77, 49.07, 47.7],
    ['2023/08/04', 48.81, 48.71, 49.74, 48.6],
    ['2023/08/07', 48.78, 49.86, 50.14, 48.56],
]);
var volumes = [
    156200.0,
    161000.0,
    189000.0,
    156100.0,
    166100.0,
    160800.0,
    135800.0,
    483600.0,
    131600.0,
    193700.0,
    125100.0,
    224400.0,
    124600.0,
    109900.0,
    150400.0,
    114600.0,
    131100.0,
    142500.0,
    165500.0,
    171400.0,
    318900.0,
    110800.0,
    103500.0,
    108600.0,
    113300.0,
    130000.0,
    95800.0,
    281100.0,
    170900.0,
    109100.0,
    129100.0,
    109000.0,
    169100.0,
    257900.0,
    173500.0,
    137700.0,
    157000.0,
    148700.0,
    146000.0,
    154700.0,
    85600.0,
    85100.0,
    105400.0,
    84700.0,
    125300.0,
    137200.0,
    128600.0,
    97000.0,
    122000.0,
    109900.0,
    179600.0,
    177100.0,
    171100.0,
    163000.0,
    204700.0,
    116700.0,
    186300.0,
    346200.0,
    228700.0,
    365300.0,
    219700.0,
    210100.0,
    202000.0,
    249700.0,
    207200.0,
    158900.0,
    394400.0,
    185700.0,
    126600.0,
    154600.0,
    105800.0,
    173000.0,
    123200.0,
    153000.0,
    160000.0,
    124400.0,
    58100.0,
    150500.0,
    132900.0,
    320100.0,
    217100.0,
    172900.0,
    157800.0,
    234800.0,
    434900.0,
    266800.0,
    249100.0,
    329700.0,
    452400.0,
    415200.0,
    351600.0,
    372800.0,
    202800.0,
    214200.0,
    184100.0,
    223300.0,
    143600.0,
    185400.0,
    193100.0,
    150000.0,
    270300.0,
    198100.0,
    152600.0,
    173800.0,
    378900.0,
    323200.0,
    270200.0,
    277300.0,
    361800.0,
    265100.0,
    198400.0,
    265000.0,
    319500.0,
    239200.0,
    298000.0,
    208800.0,
    178200.0,
    334600.0,
    172600.0,
    257300.0,
    260700.0,
    195900.0,
    260800.0,
    175300.0,
    249000.0,
    212700.0,
    210000.0,
    191700.0,
    150900.0,
    306200.0,
    271000.0,
    151700.0,
    340100.0,
    216500.0,
    284000.0,
    464600.0,
    323100.0,
    475400.0,
    346800.0,
    647100.0,
    346800.0,
    226000.0,
    187300.0,
    179700.0,
    198800.0,
    161900.0,
    453200.0,
    479900.0,
    409900.0,
    201600.0,
    682000.0,
    301100.0,
    745100.0,
    177900.0,
    172500.0,
    213600.0,
    200200.0,
    222000.0,
    141200.0,
    270800.0,
    287800.0,
    203900.0,
    203400.0,
    227700.0,
    402400.0,
    400900.0,
    201800.0,
    187300.0,
    218400.0,
    140700.0,
    128400.0,
    124800.0,
    157000.0,
    180000.0,
    126200.0,
    140100.0,
    246600.0,
    158400.0,
    173400.0,
    300600.0,
    986400.0,
    310000.0,
    263800.0,
    406500.0,
    472100.0,
    354200.0,
    297300.0,
    256300.0,
    527400.0,
    781300.0,
    146700.0,
    151900.0,
    667200.0,
    263400.0,
    593600.0,
    333700.0,
    141700.0,
    173200.0,
    182200.0,
    161300.0,
    185700.0,
    222600.0,
    253000.0,
    138800.0,
    180100.0,
    169500.0,
    239000.0,
    271900.0,
    278100.0,
    217100.0,
    379100.0,
    171600.0,
    203000.0,
    184500.0,
    205400.0,
    439400.0,
    417200.0,
    231600.0,
    156800.0,
    382500.0,
    186800.0,
    209100.0,
    305700.0,
    209400.0,
    215200.0,
    84200.0,
    130400.0,
    203100.0,
    426000.0,
    148400.0,
    134800.0,
    141400.0,
    124400.0,
    97500.0,
    186500.0,
    128000.0,
    252900.0,
    245100.0,
    277000.0,
    220200.0,
    244900.0,
    343500.0,
    534500.0,
    396600.0,
    553000.0,
    248600.0,
    181500.0,
    146900.0,
    114500.0,
    94400.0,
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
     *     text: "HEES",
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