/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_TDW");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/10', 18.45, 19.21, 19.37, 18.37],
    ['2022/08/11', 19.6, 20.28, 20.48, 19.2],
    ['2022/08/12', 20.23, 20.58, 20.58, 19.43],
    ['2022/08/15', 19.78, 20.01, 20.04, 19.31],
    ['2022/08/16', 20.24, 19.91, 20.61, 19.42],
    ['2022/08/17', 19.66, 20.37, 20.63, 19.61],
    ['2022/08/18', 20.74, 21.57, 21.57, 20.73],
    ['2022/08/19', 21.36, 21.1, 21.36, 20.39],
    ['2022/08/22', 20.73, 21.06, 21.13, 20.33],
    ['2022/08/23', 21.53, 21.99, 22.41, 21.53],
    ['2022/08/24', 22.02, 22.03, 22.28, 21.54],
    ['2022/08/25', 22.26, 22.21, 22.6, 22.06],
    ['2022/08/26', 22.08, 21.82, 22.21, 21.53],
    ['2022/08/29', 21.55, 22.39, 22.46, 21.52],
    ['2022/08/30', 22.01, 21.26, 22.43, 21.01],
    ['2022/08/31', 20.65, 22.16, 23.14, 20.54],
    ['2022/09/01', 22.06, 22.31, 22.34, 21.72],
    ['2022/09/02', 23.08, 23.38, 24.08, 22.79],
    ['2022/09/06', 23.89, 23.66, 24.58, 23.11],
    ['2022/09/07', 23.08, 23.75, 24.37, 22.44],
    ['2022/09/08', 23.79, 23.67, 24.26, 23.34],
    ['2022/09/09', 24.1, 24.43, 24.72, 24.09],
    ['2022/09/12', 24.69, 24.43, 24.82, 24.22],
    ['2022/09/13', 24.12, 24.49, 24.85, 24.12],
    ['2022/09/14', 24.74, 25.68, 26.24, 24.51],
    ['2022/09/15', 25.15, 25.59, 26.01, 24.89],
    ['2022/09/16', 25.3, 23.56, 25.35, 23.5],
    ['2022/09/19', 22.85, 24.26, 24.59, 22.76],
    ['2022/09/20', 23.97, 22.98, 23.97, 22.82],
    ['2022/09/21', 23.46, 22.48, 23.5, 22.21],
    ['2022/09/22', 23.07, 22.48, 23.45, 22.44],
    ['2022/09/23', 21.49, 21.41, 21.49, 20.7],
    ['2022/09/26', 21.29, 20.05, 21.87, 20.02],
    ['2022/09/27', 20.5, 21.3, 21.49, 20.34],
    ['2022/09/28', 21.7, 21.85, 22.03, 21.24],
    ['2022/09/29', 21.68, 22.0, 22.01, 20.64],
    ['2022/09/30', 21.85, 21.7, 22.45, 21.55],
    ['2022/10/03', 22.5, 22.88, 22.95, 21.86],
    ['2022/10/04', 23.46, 23.99, 24.37, 23.34],
    ['2022/10/05', 23.86, 24.24, 24.38, 23.4],
    ['2022/10/06', 24.0, 24.67, 24.87, 24.0],
    ['2022/10/07', 24.69, 24.86, 25.37, 24.42],
    ['2022/10/10', 24.73, 23.71, 25.18, 23.64],
    ['2022/10/11', 23.18, 23.36, 24.05, 22.62],
    ['2022/10/12', 23.14, 23.31, 23.62, 22.69],
    ['2022/10/13', 22.96, 24.2, 24.46, 22.87],
    ['2022/10/14', 24.02, 24.08, 24.49, 23.48],
    ['2022/10/17', 24.49, 25.57, 25.79, 24.49],
    ['2022/10/18', 25.87, 25.31, 26.43, 24.9],
    ['2022/10/19', 25.46, 26.8, 26.91, 25.21],
    ['2022/10/20', 26.92, 27.8, 27.87, 26.86],
    ['2022/10/21', 28.18, 29.37, 29.66, 27.7],
    ['2022/10/24', 29.33, 30.12, 30.13, 29.02],
    ['2022/10/25', 30.1, 31.01, 31.25, 29.64],
    ['2022/10/26', 31.43, 32.52, 33.32, 31.43],
    ['2022/10/27', 32.94, 33.03, 34.09, 32.81],
    ['2022/10/28', 33.31, 32.82, 33.5, 31.67],
    ['2022/10/31', 32.49, 33.9, 35.48, 32.34],
    ['2022/11/01', 34.28, 31.9, 34.39, 31.82],
    ['2022/11/02', 31.95, 32.19, 33.48, 31.23],
    ['2022/11/03', 31.95, 33.1, 33.47, 31.89],
    ['2022/11/04', 35.0, 33.44, 36.5, 32.8],
    ['2022/11/07', 34.0, 34.78, 35.74, 33.76],
    ['2022/11/08', 34.99, 33.32, 34.99, 32.25],
    ['2022/11/09', 31.97, 31.04, 32.45, 31.0],
    ['2022/11/10', 31.75, 31.71, 31.95, 31.0],
    ['2022/11/11', 32.41, 32.67, 33.69, 32.05],
    ['2022/11/14', 32.54, 32.32, 34.34, 32.11],
    ['2022/11/15', 32.43, 32.38, 32.95, 31.75],
    ['2022/11/16', 32.23, 31.84, 32.65, 31.39],
    ['2022/11/17', 31.62, 31.4, 31.92, 30.94],
    ['2022/11/18', 30.95, 30.32, 30.95, 29.62],
    ['2022/11/21', 29.65, 29.85, 30.03, 28.14],
    ['2022/11/22', 30.3, 30.79, 31.2, 30.3],
    ['2022/11/23', 30.21, 30.2, 30.55, 29.34],
    ['2022/11/25', 30.1, 30.24, 30.8, 30.1],
    ['2022/11/28', 29.23, 29.07, 30.05, 28.61],
    ['2022/11/29', 29.74, 30.67, 30.84, 29.52],
    ['2022/11/30', 31.8, 30.4, 32.18, 29.53],
    ['2022/12/01', 31.13, 30.78, 31.6, 30.54],
    ['2022/12/02', 30.55, 32.38, 32.39, 30.55],
    ['2022/12/05', 33.0, 31.81, 33.4, 31.52],
    ['2022/12/06', 31.79, 31.58, 33.05, 31.15],
    ['2022/12/07', 31.62, 30.79, 32.21, 30.16],
    ['2022/12/08', 31.76, 30.79, 31.89, 30.76],
    ['2022/12/09', 30.64, 29.4, 30.7, 28.59],
    ['2022/12/12', 29.67, 31.06, 31.27, 29.66],
    ['2022/12/13', 31.52, 32.15, 32.18, 31.16],
    ['2022/12/14', 32.36, 32.61, 32.96, 31.61],
    ['2022/12/15', 32.55, 32.27, 32.81, 31.47],
    ['2022/12/16', 31.36, 31.06, 31.71, 30.79],
    ['2022/12/19', 31.34, 32.37, 32.84, 31.34],
    ['2022/12/20', 32.34, 33.84, 34.85, 32.24],
    ['2022/12/21', 34.19, 33.94, 34.72, 32.82],
    ['2022/12/22', 34.29, 32.72, 34.34, 32.05],
    ['2022/12/23', 33.27, 34.89, 35.11, 32.93],
    ['2022/12/27', 35.1, 33.64, 35.14, 33.29],
    ['2022/12/28', 33.96, 34.33, 34.62, 33.36],
    ['2022/12/29', 34.26, 36.15, 36.18, 34.18],
    ['2022/12/30', 35.55, 36.85, 37.14, 35.54],
    ['2023/01/03', 36.85, 34.36, 36.91, 33.05],
    ['2023/01/04', 33.9, 34.02, 34.46, 32.65],
    ['2023/01/05', 33.99, 34.16, 34.48, 33.41],
    ['2023/01/06', 34.64, 35.8, 36.16, 34.64],
    ['2023/01/09', 36.87, 37.28, 39.38, 36.85],
    ['2023/01/10', 37.17, 37.95, 38.07, 37.05],
    ['2023/01/11', 38.2, 37.52, 38.35, 36.74],
    ['2023/01/12', 37.55, 38.17, 39.53, 37.55],
    ['2023/01/13', 38.2, 39.05, 39.45, 37.6],
    ['2023/01/17', 39.5, 41.0, 41.01, 38.63],
    ['2023/01/18', 41.68, 40.51, 43.16, 40.07],
    ['2023/01/19', 40.22, 41.0, 41.87, 39.65],
    ['2023/01/20', 41.69, 42.52, 42.55, 40.74],
    ['2023/01/23', 42.52, 42.6, 43.38, 42.09],
    ['2023/01/24', 42.36, 42.49, 42.67, 40.85],
    ['2023/01/25', 42.8, 43.33, 43.8, 41.97],
    ['2023/01/26', 43.74, 43.0, 44.21, 42.56],
    ['2023/01/27', 43.23, 43.25, 44.01, 42.84],
    ['2023/01/30', 42.99, 42.42, 43.52, 42.08],
    ['2023/01/31', 42.42, 43.4, 43.82, 42.09],
    ['2023/02/01', 43.19, 44.39, 44.82, 42.47],
    ['2023/02/02', 44.19, 42.03, 44.19, 41.23],
    ['2023/02/03', 41.85, 43.7, 44.69, 41.84],
    ['2023/02/06', 43.99, 43.7, 44.42, 43.04],
    ['2023/02/07', 43.73, 45.11, 45.23, 43.45],
    ['2023/02/08', 45.25, 45.82, 46.78, 45.21],
    ['2023/02/09', 45.57, 44.47, 45.81, 44.32],
    ['2023/02/10', 44.87, 45.28, 45.51, 44.59],
    ['2023/02/13', 44.67, 45.07, 45.25, 43.56],
    ['2023/02/14', 44.54, 46.01, 46.32, 44.03],
    ['2023/02/15', 45.58, 45.96, 46.34, 44.78],
    ['2023/02/16', 45.7, 45.06, 47.12, 45.04],
    ['2023/02/17', 44.43, 44.01, 45.75, 43.72],
    ['2023/02/21', 43.76, 42.87, 44.3, 42.48],
    ['2023/02/22', 42.53, 41.49, 43.08, 40.88],
    ['2023/02/23', 42.76, 43.39, 43.96, 42.53],
    ['2023/02/24', 42.63, 43.81, 44.15, 42.16],
    ['2023/02/27', 43.81, 45.25, 45.48, 43.5],
    ['2023/02/28', 46.27, 48.84, 51.65, 46.2],
    ['2023/03/01', 48.81, 48.88, 49.32, 47.56],
    ['2023/03/02', 48.51, 48.04, 49.09, 47.36],
    ['2023/03/03', 47.57, 49.5, 49.72, 47.45],
    ['2023/03/06', 49.06, 48.94, 49.58, 48.08],
    ['2023/03/07', 50.13, 51.78, 51.88, 50.0],
    ['2023/03/08', 51.57, 50.44, 51.71, 48.94],
    ['2023/03/09', 50.34, 47.11, 51.37, 47.11],
    ['2023/03/10', 47.36, 45.84, 48.35, 45.54],
    ['2023/03/13', 44.16, 42.71, 44.98, 42.45],
    ['2023/03/14', 43.09, 43.4, 45.29, 42.87],
    ['2023/03/15', 40.82, 39.27, 41.29, 38.32],
    ['2023/03/16', 38.55, 39.81, 40.14, 38.52],
    ['2023/03/17', 39.74, 39.71, 39.97, 37.76],
    ['2023/03/20', 40.0, 40.93, 41.26, 39.75],
    ['2023/03/21', 43.0, 43.22, 43.59, 41.89],
    ['2023/03/22', 43.33, 41.74, 43.72, 41.49],
    ['2023/03/23', 42.06, 41.12, 43.09, 40.4],
    ['2023/03/24', 39.71, 40.5, 40.9, 39.36],
    ['2023/03/27', 41.0, 42.51, 42.69, 40.67],
    ['2023/03/28', 41.99, 44.29, 44.31, 41.99],
    ['2023/03/29', 44.68, 45.8, 45.84, 44.2],
    ['2023/03/30', 46.32, 44.61, 46.32, 44.25],
    ['2023/03/31', 44.63, 44.08, 45.16, 43.91],
    ['2023/04/03', 47.0, 46.29, 48.18, 45.15],
    ['2023/04/04', 46.24, 44.0, 46.59, 43.0],
    ['2023/04/05', 43.79, 43.46, 44.37, 42.88],
    ['2023/04/06', 43.24, 43.32, 43.53, 42.61],
    ['2023/04/10', 43.34, 43.86, 44.48, 43.34],
    ['2023/04/11', 43.86, 43.79, 44.44, 43.17],
    ['2023/04/12', 44.0, 45.68, 46.06, 43.43],
    ['2023/04/13', 45.9, 46.3, 46.71, 45.61],
    ['2023/04/14', 46.43, 45.97, 46.9, 45.42],
    ['2023/04/17', 46.0, 46.92, 46.94, 45.82],
    ['2023/04/18', 46.64, 46.68, 47.4, 46.17],
    ['2023/04/19', 46.31, 47.05, 47.41, 45.98],
    ['2023/04/20', 46.44, 45.72, 46.69, 44.89],
    ['2023/04/21', 45.58, 44.49, 45.66, 43.81],
    ['2023/04/24', 44.48, 46.04, 46.44, 44.24],
    ['2023/04/25', 44.99, 43.75, 45.07, 43.26],
    ['2023/04/26', 43.75, 42.88, 44.52, 42.53],
    ['2023/04/27', 42.69, 44.24, 44.41, 42.6],
    ['2023/04/28', 44.24, 45.03, 45.48, 43.91],
    ['2023/05/01', 44.23, 44.78, 45.37, 43.85],
    ['2023/05/02', 43.99, 40.4, 44.34, 40.28],
    ['2023/05/03', 39.59, 39.6, 40.84, 39.41],
    ['2023/05/04', 39.72, 41.3, 41.79, 39.53],
    ['2023/05/05', 42.99, 43.19, 43.76, 42.62],
    ['2023/05/08', 43.77, 42.81, 44.25, 42.64],
    ['2023/05/09', 42.0, 45.32, 45.87, 40.65],
    ['2023/05/10', 45.56, 46.83, 47.11, 43.9],
    ['2023/05/11', 46.12, 44.44, 46.39, 43.83],
    ['2023/05/12', 44.9, 44.42, 45.65, 44.1],
    ['2023/05/15', 44.99, 44.72, 45.46, 44.59],
    ['2023/05/16', 44.43, 43.85, 45.37, 43.72],
    ['2023/05/17', 44.49, 44.67, 44.81, 42.61],
    ['2023/05/18', 44.3, 44.78, 45.06, 43.16],
    ['2023/05/19', 45.52, 45.05, 45.59, 44.1],
    ['2023/05/22', 45.43, 47.92, 49.25, 45.31],
    ['2023/05/23', 47.99, 48.01, 48.57, 47.02],
    ['2023/05/24', 48.38, 49.0, 49.68, 47.35],
    ['2023/05/25', 48.0, 47.31, 48.0, 46.4],
    ['2023/05/26', 47.86, 47.01, 48.35, 46.26],
    ['2023/05/30', 46.06, 45.98, 46.4, 44.92],
    ['2023/05/31', 45.2, 44.81, 45.8, 44.51],
    ['2023/06/01', 44.89, 47.58, 48.14, 44.89],
    ['2023/06/02', 49.04, 49.94, 50.16, 48.29],
    ['2023/06/05', 50.73, 49.59, 51.13, 48.97],
    ['2023/06/06', 48.72, 48.48, 50.38, 48.36],
    ['2023/06/07', 48.52, 48.7, 50.01, 48.52],
    ['2023/06/08', 48.59, 48.65, 50.25, 48.0],
    ['2023/06/09', 48.46, 47.7, 48.81, 47.47],
    ['2023/06/12', 46.66, 44.83, 46.92, 44.72],
    ['2023/06/13', 45.61, 43.74, 46.29, 43.74],
    ['2023/06/14', 44.01, 43.82, 44.17, 42.77],
    ['2023/06/15', 43.9, 43.99, 44.08, 42.62],
    ['2023/06/16', 44.75, 43.51, 45.21, 43.48],
    ['2023/06/20', 43.53, 45.63, 46.01, 43.15],
    ['2023/06/21', 46.18, 47.84, 49.32, 45.88],
    ['2023/06/22', 47.67, 48.13, 48.59, 47.1],
    ['2023/06/23', 46.92, 46.72, 47.07, 46.05],
    ['2023/06/26', 46.86, 47.03, 48.37, 46.25],
    ['2023/06/27', 47.11, 47.34, 47.99, 46.53],
    ['2023/06/28', 47.3, 47.89, 48.41, 46.41],
    ['2023/06/29', 48.71, 50.34, 50.82, 48.09],
    ['2023/06/30', 50.91, 55.44, 55.76, 50.82],
    ['2023/07/03', 55.58, 54.09, 56.19, 53.69],
    ['2023/07/05', 54.54, 54.32, 55.03, 53.57],
    ['2023/07/06', 53.96, 54.36, 54.49, 52.15],
    ['2023/07/07', 55.11, 58.61, 59.66, 54.9],
    ['2023/07/10', 58.22, 58.74, 59.85, 58.07],
    ['2023/07/11', 59.0, 59.25, 59.69, 58.2],
    ['2023/07/12', 59.94, 58.69, 60.27, 57.88],
    ['2023/07/13', 58.69, 59.65, 60.0, 58.69],
    ['2023/07/14', 60.28, 59.8, 61.31, 59.26],
    ['2023/07/17', 59.6, 59.44, 60.41, 59.25],
    ['2023/07/18', 59.61, 60.7, 61.97, 59.34],
    ['2023/07/19', 59.84, 58.87, 60.14, 57.74],
    ['2023/07/20', 59.58, 58.43, 59.58, 58.2],
    ['2023/07/21', 58.52, 58.46, 58.68, 57.58],
    ['2023/07/24', 58.35, 58.48, 58.95, 57.74],
    ['2023/07/25', 58.24, 59.3, 59.61, 58.0],
    ['2023/07/26', 58.58, 60.09, 61.08, 58.41],
    ['2023/07/27', 60.66, 58.48, 60.72, 57.71],
    ['2023/07/28', 58.65, 61.96, 62.59, 58.23],
    ['2023/07/31', 62.79, 63.11, 63.42, 61.93],
    ['2023/08/01', 62.89, 62.35, 62.89, 61.51],
    ['2023/08/02', 62.0, 62.73, 62.99, 61.09],
    ['2023/08/03', 64.0, 64.75, 65.79, 63.6],
    ['2023/08/04', 64.8, 64.14, 65.68, 63.85],
    ['2023/08/07', 64.6, 62.48, 64.62, 61.78],
    ['2023/08/08', 57.3, 63.42, 65.75, 56.21],
]);
var volumes = [
    2271500.0,
    792400.0,
    476700.0,
    400700.0,
    419600.0,
    292700.0,
    703600.0,
    339500.0,
    243900.0,
    365200.0,
    210900.0,
    169500.0,
    196300.0,
    253900.0,
    476800.0,
    823800.0,
    481400.0,
    468300.0,
    705000.0,
    698500.0,
    372000.0,
    554000.0,
    433700.0,
    605900.0,
    807500.0,
    379700.0,
    1134500.0,
    385000.0,
    391100.0,
    372700.0,
    154900.0,
    397100.0,
    441200.0,
    328900.0,
    236300.0,
    320300.0,
    799500.0,
    740200.0,
    407400.0,
    380800.0,
    365500.0,
    659900.0,
    230400.0,
    375300.0,
    256100.0,
    403500.0,
    325600.0,
    404700.0,
    247900.0,
    647600.0,
    454100.0,
    846200.0,
    613900.0,
    730200.0,
    699500.0,
    599000.0,
    538800.0,
    710500.0,
    614100.0,
    496000.0,
    528600.0,
    885400.0,
    576100.0,
    745100.0,
    3370400.0,
    1421200.0,
    833100.0,
    695300.0,
    734000.0,
    605200.0,
    354600.0,
    660600.0,
    1153000.0,
    489800.0,
    324400.0,
    339500.0,
    508100.0,
    1188500.0,
    1047200.0,
    409500.0,
    495700.0,
    498700.0,
    615900.0,
    482400.0,
    274500.0,
    861100.0,
    464300.0,
    267000.0,
    388200.0,
    351700.0,
    1040200.0,
    783000.0,
    1366200.0,
    688200.0,
    644200.0,
    511300.0,
    511700.0,
    486600.0,
    470800.0,
    1152200.0,
    1124500.0,
    788900.0,
    515800.0,
    703300.0,
    2201800.0,
    991000.0,
    497800.0,
    565700.0,
    546600.0,
    983600.0,
    1339000.0,
    806500.0,
    724500.0,
    885300.0,
    767600.0,
    736400.0,
    637200.0,
    474100.0,
    603700.0,
    659500.0,
    865400.0,
    1126400.0,
    614900.0,
    448300.0,
    709100.0,
    735400.0,
    536500.0,
    647300.0,
    426100.0,
    611700.0,
    524900.0,
    827500.0,
    603500.0,
    810900.0,
    870900.0,
    1457700.0,
    1031900.0,
    840200.0,
    1519200.0,
    750300.0,
    589600.0,
    743600.0,
    708100.0,
    1436400.0,
    950700.0,
    749100.0,
    724800.0,
    1265200.0,
    696200.0,
    1507900.0,
    994400.0,
    1584000.0,
    784500.0,
    1085600.0,
    803000.0,
    971500.0,
    745500.0,
    826800.0,
    621100.0,
    969500.0,
    658100.0,
    709800.0,
    1161000.0,
    572000.0,
    509500.0,
    434800.0,
    479500.0,
    485900.0,
    495200.0,
    594700.0,
    399100.0,
    385900.0,
    512200.0,
    736700.0,
    610300.0,
    521200.0,
    352600.0,
    523700.0,
    615000.0,
    518900.0,
    664600.0,
    528300.0,
    859600.0,
    847300.0,
    846200.0,
    427400.0,
    770600.0,
    943300.0,
    672100.0,
    452400.0,
    385800.0,
    347400.0,
    318800.0,
    699100.0,
    371900.0,
    354600.0,
    923500.0,
    781700.0,
    517300.0,
    368300.0,
    444100.0,
    508500.0,
    488400.0,
    638000.0,
    481200.0,
    472400.0,
    614600.0,
    483800.0,
    547700.0,
    628500.0,
    1114600.0,
    1139200.0,
    895400.0,
    815300.0,
    674200.0,
    765000.0,
    1410900.0,
    753700.0,
    2296700.0,
    376500.0,
    545700.0,
    443100.0,
    951100.0,
    1670700.0,
    573100.0,
    573300.0,
    721400.0,
    2130200.0,
    995700.0,
    805000.0,
    715400.0,
    814300.0,
    1393700.0,
    637100.0,
    1085500.0,
    1085600.0,
    555100.0,
    762400.0,
    875900.0,
    965900.0,
    978900.0,
    824200.0,
    1188300.0,
    844400.0,
    602200.0,
    709100.0,
    1223700.0,
    685400.0,
    1114700.0,
    1951000.0,
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
     *     text: "TDW",
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