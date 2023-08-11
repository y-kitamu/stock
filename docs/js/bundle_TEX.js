/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_TEX");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/12', 37.43, 37.58, 37.6, 36.84],
    ['2022/08/15', 37.04, 37.59, 37.67, 36.82],
    ['2022/08/16', 37.4, 38.06, 38.32, 37.32],
    ['2022/08/17', 37.26, 36.57, 37.26, 36.41],
    ['2022/08/18', 36.46, 36.91, 37.0, 36.26],
    ['2022/08/19', 36.48, 36.61, 36.8, 35.95],
    ['2022/08/22', 36.32, 35.9, 36.32, 35.54],
    ['2022/08/23', 36.07, 36.2, 37.1, 36.04],
    ['2022/08/24', 35.9, 35.81, 36.38, 35.63],
    ['2022/08/25', 35.82, 36.56, 36.73, 35.82],
    ['2022/08/26', 36.51, 34.89, 36.71, 34.82],
    ['2022/08/29', 34.36, 34.49, 34.88, 34.18],
    ['2022/08/30', 34.63, 34.04, 34.63, 33.6],
    ['2022/08/31', 34.07, 33.22, 34.25, 33.2],
    ['2022/09/01', 32.91, 33.19, 33.23, 32.41],
    ['2022/09/02', 33.68, 32.78, 33.81, 32.71],
    ['2022/09/06', 33.17, 32.94, 33.17, 32.38],
    ['2022/09/07', 32.7, 33.94, 34.07, 32.44],
    ['2022/09/08', 33.5, 34.16, 34.26, 33.39],
    ['2022/09/09', 34.62, 35.61, 35.66, 34.51],
    ['2022/09/12', 35.92, 35.97, 36.49, 35.65],
    ['2022/09/13', 34.6, 33.79, 35.45, 33.76],
    ['2022/09/14', 34.01, 33.83, 34.32, 33.12],
    ['2022/09/15', 33.58, 33.44, 34.14, 33.23],
    ['2022/09/16', 32.58, 32.68, 32.91, 31.94],
    ['2022/09/19', 32.29, 33.53, 33.69, 32.29],
    ['2022/09/20', 33.23, 32.8, 33.24, 32.63],
    ['2022/09/21', 33.24, 31.74, 33.24, 31.73],
    ['2022/09/22', 31.77, 31.14, 31.8, 31.04],
    ['2022/09/23', 30.62, 29.81, 30.63, 29.16],
    ['2022/09/26', 29.6, 29.39, 30.12, 29.06],
    ['2022/09/27', 29.86, 29.34, 30.11, 28.82],
    ['2022/09/28', 29.74, 30.3, 30.58, 29.39],
    ['2022/09/29', 29.7, 29.83, 29.88, 29.08],
    ['2022/09/30', 29.83, 29.74, 30.48, 29.43],
    ['2022/10/03', 30.43, 30.99, 31.43, 30.04],
    ['2022/10/04', 31.78, 33.09, 33.1, 31.78],
    ['2022/10/05', 32.35, 32.78, 32.96, 32.26],
    ['2022/10/06', 32.35, 32.17, 32.96, 32.05],
    ['2022/10/07', 31.74, 31.63, 31.85, 31.28],
    ['2022/10/10', 32.16, 31.61, 32.3, 31.23],
    ['2022/10/11', 31.35, 31.63, 32.08, 31.02],
    ['2022/10/12', 31.67, 31.78, 32.06, 31.16],
    ['2022/10/13', 30.83, 33.08, 33.2, 30.38],
    ['2022/10/14', 33.34, 31.89, 33.67, 31.76],
    ['2022/10/17', 32.75, 32.95, 33.2, 32.57],
    ['2022/10/18', 34.2, 34.22, 34.99, 33.92],
    ['2022/10/19', 33.84, 33.34, 34.25, 32.94],
    ['2022/10/20', 33.38, 32.42, 33.94, 32.24],
    ['2022/10/21', 32.79, 34.32, 34.47, 32.42],
    ['2022/10/24', 34.45, 34.13, 34.96, 33.99],
    ['2022/10/25', 33.83, 34.82, 34.97, 33.55],
    ['2022/10/26', 35.0, 35.52, 36.38, 34.62],
    ['2022/10/27', 36.31, 36.66, 37.54, 36.31],
    ['2022/10/28', 37.7, 38.37, 38.4, 35.89],
    ['2022/10/31', 38.4, 40.54, 40.66, 38.12],
    ['2022/11/01', 41.22, 40.97, 41.25, 39.81],
    ['2022/11/02', 40.57, 38.8, 41.08, 38.61],
    ['2022/11/03', 37.91, 39.6, 39.81, 37.27],
    ['2022/11/04', 40.54, 42.4, 42.44, 39.63],
    ['2022/11/07', 42.49, 42.67, 42.82, 41.95],
    ['2022/11/08', 43.0, 42.56, 43.84, 41.98],
    ['2022/11/09', 41.71, 41.98, 42.4, 41.51],
    ['2022/11/10', 43.77, 43.32, 43.95, 42.71],
    ['2022/11/11', 43.64, 45.21, 45.96, 43.39],
    ['2022/11/14', 44.79, 44.72, 46.18, 44.39],
    ['2022/11/15', 45.44, 45.2, 46.47, 44.74],
    ['2022/11/16', 44.99, 43.92, 45.39, 43.62],
    ['2022/11/17', 42.98, 44.22, 44.46, 42.51],
    ['2022/11/18', 45.18, 44.69, 45.25, 43.96],
    ['2022/11/21', 44.27, 44.91, 45.32, 44.05],
    ['2022/11/22', 45.28, 45.07, 45.94, 44.77],
    ['2022/11/23', 45.15, 45.26, 45.8, 45.13],
    ['2022/11/25', 45.26, 45.76, 45.95, 45.0],
    ['2022/11/28', 45.23, 44.38, 45.45, 43.66],
    ['2022/11/29', 44.61, 44.64, 45.1, 44.48],
    ['2022/11/30', 44.73, 45.91, 45.93, 44.16],
    ['2022/12/01', 45.9, 45.29, 46.3, 44.79],
    ['2022/12/02', 44.44, 46.04, 46.46, 44.13],
    ['2022/12/05', 45.13, 44.87, 45.2, 44.5],
    ['2022/12/06', 44.98, 44.32, 45.18, 43.45],
    ['2022/12/07', 44.33, 44.68, 45.16, 43.97],
    ['2022/12/08', 45.08, 44.78, 45.23, 44.44],
    ['2022/12/09', 45.0, 43.52, 45.29, 43.47],
    ['2022/12/12', 43.47, 43.92, 43.92, 42.73],
    ['2022/12/13', 45.7, 43.43, 45.7, 42.43],
    ['2022/12/14', 43.86, 43.21, 45.06, 43.09],
    ['2022/12/15', 42.33, 41.27, 42.36, 40.9],
    ['2022/12/16', 40.62, 41.55, 41.67, 40.5],
    ['2022/12/19', 43.09, 42.62, 43.46, 42.06],
    ['2022/12/20', 42.48, 43.04, 43.37, 42.25],
    ['2022/12/21', 43.63, 43.64, 43.89, 43.33],
    ['2022/12/22', 43.17, 42.55, 43.32, 41.68],
    ['2022/12/23', 42.45, 43.06, 43.13, 42.12],
    ['2022/12/27', 43.07, 43.0, 43.63, 42.83],
    ['2022/12/28', 43.25, 42.26, 43.27, 42.23],
    ['2022/12/29', 42.69, 43.04, 43.24, 42.56],
    ['2022/12/30', 42.66, 42.72, 42.93, 42.36],
    ['2023/01/03', 43.11, 41.96, 43.33, 41.74],
    ['2023/01/04', 42.46, 42.63, 43.14, 42.18],
    ['2023/01/05', 42.44, 42.23, 42.84, 41.69],
    ['2023/01/06', 42.98, 43.53, 44.06, 42.83],
    ['2023/01/09', 43.7, 44.13, 45.02, 43.38],
    ['2023/01/10', 44.13, 45.65, 45.68, 44.13],
    ['2023/01/11', 46.0, 46.9, 47.62, 45.79],
    ['2023/01/12', 47.5, 46.72, 47.72, 46.56],
    ['2023/01/13', 46.4, 48.04, 48.11, 46.07],
    ['2023/01/17', 48.12, 47.0, 48.5, 46.33],
    ['2023/01/18', 48.21, 47.34, 48.51, 47.22],
    ['2023/01/19', 46.72, 45.5, 47.08, 45.07],
    ['2023/01/20', 45.88, 46.94, 46.95, 45.42],
    ['2023/01/23', 46.97, 47.83, 47.96, 46.62],
    ['2023/01/24', 47.91, 49.14, 49.42, 47.32],
    ['2023/01/25', 48.5, 48.51, 48.8, 47.57],
    ['2023/01/26', 49.12, 49.64, 49.68, 48.53],
    ['2023/01/27', 49.48, 50.31, 50.55, 49.33],
    ['2023/01/30', 49.94, 50.37, 50.87, 49.74],
    ['2023/01/31', 50.22, 50.97, 51.22, 50.01],
    ['2023/02/01', 50.52, 51.7, 52.45, 50.31],
    ['2023/02/02', 51.8, 52.49, 52.5, 51.07],
    ['2023/02/03', 51.94, 52.8, 53.37, 51.79],
    ['2023/02/06', 52.51, 52.14, 52.84, 51.61],
    ['2023/02/07', 51.94, 52.28, 52.48, 51.31],
    ['2023/02/08', 51.58, 51.46, 52.24, 51.34],
    ['2023/02/09', 52.5, 51.47, 52.73, 51.18],
    ['2023/02/10', 51.5, 54.32, 54.69, 51.5],
    ['2023/02/13', 54.81, 57.47, 57.48, 54.32],
    ['2023/02/14', 56.9, 56.62, 57.17, 55.25],
    ['2023/02/15', 55.92, 56.15, 56.75, 55.28],
    ['2023/02/16', 55.39, 55.61, 56.39, 55.05],
    ['2023/02/17', 55.91, 56.93, 57.01, 55.5],
    ['2023/02/21', 56.15, 55.87, 56.41, 55.42],
    ['2023/02/22', 55.99, 55.75, 56.55, 55.52],
    ['2023/02/23', 56.0, 57.58, 57.88, 56.0],
    ['2023/02/24', 56.62, 58.35, 58.4, 56.43],
    ['2023/02/27', 58.97, 57.67, 59.16, 57.31],
    ['2023/02/28', 57.99, 59.21, 59.64, 57.78],
    ['2023/03/01', 58.97, 59.99, 60.01, 58.89],
    ['2023/03/02', 59.26, 59.91, 60.08, 59.08],
    ['2023/03/03', 59.92, 60.32, 60.39, 59.29],
    ['2023/03/06', 60.0, 59.4, 60.85, 59.16],
    ['2023/03/07', 59.34, 58.57, 59.97, 58.41],
    ['2023/03/08', 58.77, 59.2, 59.7, 57.59],
    ['2023/03/09', 59.53, 57.6, 60.15, 57.53],
    ['2023/03/10', 57.01, 53.23, 57.23, 52.95],
    ['2023/03/13', 52.0, 51.12, 52.57, 50.42],
    ['2023/03/14', 52.74, 52.84, 53.73, 51.99],
    ['2023/03/15', 51.01, 49.64, 51.54, 48.41],
    ['2023/03/16', 48.87, 49.68, 50.37, 48.09],
    ['2023/03/17', 48.39, 45.31, 48.39, 45.07],
    ['2023/03/20', 46.42, 47.04, 47.7, 46.19],
    ['2023/03/21', 48.68, 49.28, 49.71, 48.09],
    ['2023/03/22', 49.13, 47.45, 49.24, 47.3],
    ['2023/03/23', 47.51, 46.61, 48.83, 46.07],
    ['2023/03/24', 45.32, 46.0, 46.02, 44.25],
    ['2023/03/27', 46.3, 46.36, 46.9, 45.52],
    ['2023/03/28', 46.23, 46.74, 47.04, 45.93],
    ['2023/03/29', 47.44, 47.01, 47.57, 46.88],
    ['2023/03/30', 47.6, 47.36, 47.97, 47.14],
    ['2023/03/31', 47.98, 48.38, 48.75, 47.86],
    ['2023/04/03', 48.34, 47.73, 49.11, 47.29],
    ['2023/04/04', 47.93, 44.11, 47.93, 42.5],
    ['2023/04/05', 43.48, 42.88, 43.7, 42.44],
    ['2023/04/06', 42.86, 42.31, 42.97, 41.89],
    ['2023/04/10', 42.39, 42.85, 43.69, 42.33],
    ['2023/04/11', 43.03, 43.33, 43.99, 42.97],
    ['2023/04/12', 44.1, 44.82, 45.02, 43.9],
    ['2023/04/13', 44.98, 44.5, 45.57, 43.33],
    ['2023/04/14', 44.64, 44.84, 45.77, 44.42],
    ['2023/04/17', 45.09, 46.0, 46.27, 45.09],
    ['2023/04/18', 46.0, 46.14, 46.59, 46.0],
    ['2023/04/19', 45.89, 45.77, 46.29, 45.25],
    ['2023/04/20', 45.28, 45.33, 45.97, 44.98],
    ['2023/04/21', 45.12, 45.22, 45.27, 44.11],
    ['2023/04/24', 45.22, 46.35, 46.41, 45.22],
    ['2023/04/25', 45.7, 44.49, 46.02, 44.47],
    ['2023/04/26', 44.08, 44.11, 45.0, 43.96],
    ['2023/04/27', 43.98, 43.67, 44.24, 42.5],
    ['2023/04/28', 43.39, 44.59, 44.97, 43.39],
    ['2023/05/01', 44.73, 46.0, 46.19, 44.66],
    ['2023/05/02', 48.3, 48.25, 49.5, 45.75],
    ['2023/05/03', 49.45, 49.68, 51.19, 48.91],
    ['2023/05/04', 49.39, 45.78, 49.7, 45.6],
    ['2023/05/05', 47.08, 47.87, 48.13, 47.08],
    ['2023/05/08', 48.59, 47.51, 48.6, 46.39],
    ['2023/05/09', 46.97, 47.48, 47.91, 46.56],
    ['2023/05/10', 48.37, 47.67, 48.61, 46.57],
    ['2023/05/11', 46.76, 46.89, 47.43, 46.42],
    ['2023/05/12', 47.31, 46.86, 47.63, 46.22],
    ['2023/05/15', 47.09, 47.51, 47.96, 46.61],
    ['2023/05/16', 47.0, 46.0, 47.33, 45.97],
    ['2023/05/17', 46.59, 48.03, 48.58, 46.58],
    ['2023/05/18', 47.71, 48.71, 48.85, 47.34],
    ['2023/05/19', 49.55, 48.45, 49.7, 47.75],
    ['2023/05/22', 48.52, 48.57, 49.02, 47.53],
    ['2023/05/23', 48.25, 47.97, 49.38, 47.65],
    ['2023/05/24', 47.53, 47.2, 47.66, 46.61],
    ['2023/05/25', 46.84, 47.93, 48.07, 46.59],
    ['2023/05/26', 48.24, 48.23, 48.45, 47.51],
    ['2023/05/30', 48.31, 47.87, 48.63, 47.4],
    ['2023/05/31', 47.46, 46.37, 47.85, 45.91],
    ['2023/06/01', 46.43, 47.69, 48.11, 46.24],
    ['2023/06/02', 49.19, 51.91, 52.11, 49.19],
    ['2023/06/05', 51.18, 50.98, 51.6, 50.04],
    ['2023/06/06', 50.66, 54.35, 54.85, 50.56],
    ['2023/06/07', 54.73, 56.19, 56.51, 54.4],
    ['2023/06/08', 55.84, 55.67, 56.31, 54.87],
    ['2023/06/09', 55.78, 54.5, 55.96, 54.19],
    ['2023/06/12', 54.51, 55.87, 56.08, 54.2],
    ['2023/06/13', 56.08, 57.77, 58.27, 56.07],
    ['2023/06/14', 57.9, 57.23, 58.63, 56.24],
    ['2023/06/15', 56.63, 58.05, 58.11, 56.44],
    ['2023/06/16', 58.85, 58.1, 58.85, 57.04],
    ['2023/06/20', 57.6, 57.48, 57.87, 56.57],
    ['2023/06/21', 56.89, 57.36, 58.41, 56.51],
    ['2023/06/22', 57.2, 56.91, 57.46, 56.19],
    ['2023/06/23', 56.0, 55.78, 56.0, 55.2],
    ['2023/06/26', 55.93, 56.9, 57.73, 55.93],
    ['2023/06/27', 56.86, 58.73, 58.92, 56.56],
    ['2023/06/28', 58.62, 58.74, 59.23, 57.91],
    ['2023/06/29', 59.18, 59.37, 60.09, 58.89],
    ['2023/06/30', 60.25, 59.83, 60.35, 59.2],
    ['2023/07/03', 59.67, 61.01, 61.01, 59.67],
    ['2023/07/05', 60.35, 58.98, 60.59, 58.98],
    ['2023/07/06', 58.27, 57.56, 58.41, 56.74],
    ['2023/07/07', 57.38, 58.52, 59.48, 57.31],
    ['2023/07/10', 58.38, 58.99, 59.58, 58.36],
    ['2023/07/11', 59.32, 60.89, 60.97, 58.76],
    ['2023/07/12', 62.61, 62.93, 63.91, 62.02],
    ['2023/07/13', 62.91, 63.29, 63.61, 62.18],
    ['2023/07/14', 63.31, 62.03, 63.31, 60.97],
    ['2023/07/17', 61.62, 62.4, 63.08, 61.62],
    ['2023/07/18', 62.42, 65.38, 65.64, 62.42],
    ['2023/07/19', 64.98, 63.5, 65.58, 63.07],
    ['2023/07/20', 63.99, 61.91, 64.11, 61.83],
    ['2023/07/21', 62.37, 61.49, 62.37, 61.14],
    ['2023/07/24', 61.45, 61.12, 62.17, 60.91],
    ['2023/07/25', 60.71, 59.09, 60.85, 58.89],
    ['2023/07/26', 58.74, 57.7, 59.27, 56.96],
    ['2023/07/27', 57.94, 56.76, 58.05, 56.57],
    ['2023/07/28', 57.4, 57.39, 58.56, 56.94],
    ['2023/07/31', 57.75, 58.63, 58.75, 57.64],
    ['2023/08/01', 59.48, 62.03, 62.21, 59.45],
    ['2023/08/02', 60.95, 63.74, 64.94, 60.95],
    ['2023/08/03', 64.53, 63.33, 64.63, 62.21],
    ['2023/08/04', 63.58, 62.75, 63.7, 61.45],
    ['2023/08/07', 63.32, 63.11, 64.14, 62.41],
    ['2023/08/08', 62.18, 62.39, 62.65, 60.84],
    ['2023/08/09', 63.0, 61.24, 63.0, 61.03],
    ['2023/08/10', 61.85, 60.85, 62.39, 59.55],
]);
var volumes = [
    481300.0,
    473200.0,
    532400.0,
    347900.0,
    458500.0,
    617000.0,
    721500.0,
    518200.0,
    472800.0,
    297200.0,
    406300.0,
    359600.0,
    322100.0,
    432000.0,
    403800.0,
    502600.0,
    471100.0,
    543800.0,
    593100.0,
    314400.0,
    449400.0,
    619000.0,
    673000.0,
    490000.0,
    1171200.0,
    499600.0,
    487000.0,
    425400.0,
    438500.0,
    641400.0,
    662900.0,
    497700.0,
    467700.0,
    368200.0,
    632800.0,
    682000.0,
    554400.0,
    483500.0,
    363200.0,
    409300.0,
    382200.0,
    440000.0,
    402000.0,
    626300.0,
    421300.0,
    433000.0,
    813300.0,
    425100.0,
    459300.0,
    514200.0,
    813400.0,
    762600.0,
    755600.0,
    863800.0,
    1240500.0,
    1620800.0,
    835600.0,
    944900.0,
    819300.0,
    1129600.0,
    757800.0,
    626700.0,
    536000.0,
    805300.0,
    772900.0,
    967700.0,
    628500.0,
    639600.0,
    563200.0,
    636200.0,
    470600.0,
    454700.0,
    377300.0,
    202600.0,
    610200.0,
    426600.0,
    497500.0,
    418400.0,
    482600.0,
    554900.0,
    472200.0,
    467400.0,
    442700.0,
    749800.0,
    1098300.0,
    958700.0,
    860900.0,
    1005900.0,
    1101900.0,
    539400.0,
    463700.0,
    332300.0,
    367700.0,
    305600.0,
    278500.0,
    324400.0,
    290900.0,
    282300.0,
    488400.0,
    492700.0,
    378400.0,
    445200.0,
    729800.0,
    571300.0,
    1570700.0,
    1029400.0,
    683400.0,
    887200.0,
    1081900.0,
    441300.0,
    535000.0,
    715200.0,
    568300.0,
    606400.0,
    485600.0,
    611700.0,
    593700.0,
    859700.0,
    880900.0,
    765700.0,
    1023200.0,
    1166100.0,
    820300.0,
    576300.0,
    800800.0,
    1733200.0,
    1361400.0,
    1278600.0,
    780300.0,
    582800.0,
    991300.0,
    1200400.0,
    1476400.0,
    1479300.0,
    1261400.0,
    1339700.0,
    1315400.0,
    785800.0,
    682400.0,
    736600.0,
    690700.0,
    851500.0,
    731200.0,
    628700.0,
    1537200.0,
    1112900.0,
    852800.0,
    1231200.0,
    1081400.0,
    2280700.0,
    1344500.0,
    1346600.0,
    1284100.0,
    930800.0,
    983100.0,
    844300.0,
    814300.0,
    673500.0,
    506500.0,
    818300.0,
    1036700.0,
    3263800.0,
    1620700.0,
    1402400.0,
    1179200.0,
    1058200.0,
    1548000.0,
    1032300.0,
    663800.0,
    961000.0,
    767400.0,
    582300.0,
    701700.0,
    1070000.0,
    851200.0,
    781300.0,
    658900.0,
    873200.0,
    1012600.0,
    1744600.0,
    3263900.0,
    1936500.0,
    1637400.0,
    1174100.0,
    1301900.0,
    491300.0,
    598000.0,
    595800.0,
    431100.0,
    637800.0,
    649000.0,
    808800.0,
    591100.0,
    721500.0,
    648900.0,
    602700.0,
    390100.0,
    405800.0,
    375700.0,
    641800.0,
    692200.0,
    528900.0,
    954100.0,
    561500.0,
    1164900.0,
    773800.0,
    781900.0,
    809200.0,
    716900.0,
    946600.0,
    819400.0,
    674800.0,
    1092200.0,
    865800.0,
    596600.0,
    538600.0,
    1370600.0,
    658800.0,
    558100.0,
    413100.0,
    507200.0,
    616300.0,
    342000.0,
    572200.0,
    638700.0,
    572400.0,
    564700.0,
    706200.0,
    915500.0,
    656000.0,
    641500.0,
    479600.0,
    986200.0,
    992900.0,
    782600.0,
    601000.0,
    504500.0,
    1135700.0,
    1216200.0,
    825500.0,
    635100.0,
    580700.0,
    2321800.0,
    1947700.0,
    1193400.0,
    1139200.0,
    912300.0,
    684100.0,
    717200.0,
    1002600.0,
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
     *     text: "TEX",
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