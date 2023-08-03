/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_SKX");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/03', 37.88, 38.56, 38.87, 37.8],
    ['2022/08/04', 38.55, 39.38, 39.41, 38.2],
    ['2022/08/05', 39.0, 39.33, 39.61, 38.87],
    ['2022/08/08', 39.56, 39.48, 40.37, 39.41],
    ['2022/08/09', 39.2, 38.24, 39.27, 37.8],
    ['2022/08/10', 39.25, 39.25, 40.13, 39.09],
    ['2022/08/11', 39.75, 40.0, 40.48, 39.35],
    ['2022/08/12', 40.44, 40.21, 40.44, 39.85],
    ['2022/08/15', 40.01, 40.2, 40.38, 39.83],
    ['2022/08/16', 40.0, 41.54, 41.62, 39.99],
    ['2022/08/17', 41.22, 40.51, 41.28, 40.05],
    ['2022/08/18', 40.08, 40.32, 40.54, 39.8],
    ['2022/08/19', 40.13, 39.49, 40.2, 39.29],
    ['2022/08/22', 38.74, 38.91, 39.16, 38.42],
    ['2022/08/23', 39.24, 38.69, 39.49, 38.55],
    ['2022/08/24', 38.62, 38.99, 39.3, 38.48],
    ['2022/08/25', 39.08, 39.69, 40.23, 38.94],
    ['2022/08/26', 39.78, 38.52, 39.84, 38.41],
    ['2022/08/29', 38.02, 38.67, 39.03, 37.86],
    ['2022/08/30', 39.12, 38.28, 39.29, 38.26],
    ['2022/08/31', 38.31, 37.8, 38.7, 37.78],
    ['2022/09/01', 37.5, 37.53, 37.65, 36.81],
    ['2022/09/02', 37.94, 37.16, 38.17, 36.89],
    ['2022/09/06', 37.32, 37.03, 37.49, 36.03],
    ['2022/09/07', 36.86, 37.76, 38.02, 36.86],
    ['2022/09/08', 37.27, 37.09, 37.49, 35.9],
    ['2022/09/09', 37.47, 38.07, 38.33, 37.45],
    ['2022/09/12', 38.49, 38.94, 39.4, 38.49],
    ['2022/09/13', 37.31, 36.35, 37.65, 36.11],
    ['2022/09/14', 36.5, 36.34, 36.77, 35.9],
    ['2022/09/15', 36.0, 36.16, 36.8, 35.87],
    ['2022/09/16', 35.72, 35.86, 36.48, 35.37],
    ['2022/09/19', 35.57, 36.85, 37.0, 35.57],
    ['2022/09/20', 36.29, 36.29, 36.72, 36.09],
    ['2022/09/21', 36.59, 35.89, 37.11, 35.85],
    ['2022/09/22', 36.09, 35.28, 36.21, 35.16],
    ['2022/09/23', 34.53, 33.92, 34.67, 33.4],
    ['2022/09/26', 33.68, 32.95, 33.99, 32.66],
    ['2022/09/27', 33.35, 33.34, 33.68, 32.64],
    ['2022/09/28', 33.6, 34.39, 34.59, 33.52],
    ['2022/09/29', 33.83, 34.1, 34.16, 33.23],
    ['2022/09/30', 32.09, 31.72, 33.03, 31.28],
    ['2022/10/03', 32.16, 32.15, 32.7, 31.91],
    ['2022/10/04', 32.99, 34.09, 34.09, 32.99],
    ['2022/10/05', 33.59, 34.94, 35.09, 33.59],
    ['2022/10/06', 34.88, 34.88, 35.27, 34.41],
    ['2022/10/07', 34.23, 34.38, 34.44, 33.89],
    ['2022/10/10', 34.28, 33.62, 34.44, 32.94],
    ['2022/10/11', 33.4, 34.12, 34.7, 33.33],
    ['2022/10/12', 34.24, 34.61, 34.82, 33.97],
    ['2022/10/13', 33.97, 34.93, 35.38, 33.4],
    ['2022/10/14', 35.23, 34.7, 35.58, 34.34],
    ['2022/10/17', 35.48, 35.42, 35.64, 34.85],
    ['2022/10/18', 36.51, 35.93, 36.96, 35.46],
    ['2022/10/19', 35.65, 35.7, 36.18, 35.24],
    ['2022/10/20', 36.15, 33.83, 36.47, 33.71],
    ['2022/10/21', 33.83, 34.9, 35.17, 33.63],
    ['2022/10/24', 34.9, 34.68, 35.17, 34.15],
    ['2022/10/25', 34.65, 35.93, 36.08, 34.65],
    ['2022/10/26', 33.7, 32.41, 34.78, 32.3],
    ['2022/10/27', 32.82, 32.64, 33.2, 32.01],
    ['2022/10/28', 32.61, 33.36, 33.67, 32.16],
    ['2022/10/31', 33.29, 34.43, 34.75, 33.17],
    ['2022/11/01', 34.4, 35.23, 35.34, 34.23],
    ['2022/11/02', 35.03, 34.86, 36.08, 34.78],
    ['2022/11/03', 34.52, 34.82, 35.36, 33.77],
    ['2022/11/04', 35.75, 36.52, 36.83, 35.63],
    ['2022/11/07', 36.88, 35.73, 36.88, 35.1],
    ['2022/11/08', 36.13, 35.83, 36.4, 35.29],
    ['2022/11/09', 35.35, 35.55, 35.94, 35.11],
    ['2022/11/10', 36.92, 37.75, 37.75, 36.89],
    ['2022/11/11', 38.1, 39.57, 39.85, 38.02],
    ['2022/11/14', 39.21, 39.18, 39.78, 39.07],
    ['2022/11/15', 40.3, 40.24, 41.3, 40.06],
    ['2022/11/16', 39.5, 39.78, 40.04, 39.31],
    ['2022/11/17', 39.07, 39.89, 39.97, 38.81],
    ['2022/11/18', 40.7, 39.84, 40.9, 39.62],
    ['2022/11/21', 39.5, 39.09, 39.75, 38.62],
    ['2022/11/22', 39.25, 40.14, 40.22, 38.99],
    ['2022/11/23', 39.97, 40.1, 40.6, 39.76],
    ['2022/11/25', 40.09, 40.1, 40.38, 40.0],
    ['2022/11/28', 39.69, 39.75, 40.39, 39.57],
    ['2022/11/29', 39.71, 40.37, 40.56, 39.63],
    ['2022/11/30', 40.89, 42.17, 42.29, 40.78],
    ['2022/12/01', 42.33, 42.98, 43.49, 42.13],
    ['2022/12/02', 42.46, 43.23, 43.45, 42.46],
    ['2022/12/05', 42.89, 41.75, 42.89, 41.63],
    ['2022/12/06', 42.01, 42.94, 42.96, 41.97],
    ['2022/12/07', 42.68, 42.51, 43.05, 42.29],
    ['2022/12/08', 42.86, 43.36, 43.45, 42.43],
    ['2022/12/09', 42.85, 42.25, 42.98, 42.02],
    ['2022/12/12', 42.52, 42.56, 42.75, 42.24],
    ['2022/12/13', 43.66, 42.34, 44.34, 41.94],
    ['2022/12/14', 42.63, 42.39, 42.89, 41.95],
    ['2022/12/15', 41.54, 41.9, 42.07, 40.84],
    ['2022/12/16', 41.34, 41.08, 41.75, 40.72],
    ['2022/12/19', 41.0, 40.96, 41.34, 40.73],
    ['2022/12/20', 40.84, 40.39, 41.2, 40.25],
    ['2022/12/21', 41.8, 42.07, 43.0, 41.8],
    ['2022/12/22', 41.69, 42.18, 42.28, 41.4],
    ['2022/12/23', 41.96, 42.0, 42.18, 41.44],
    ['2022/12/27', 42.29, 42.51, 42.66, 41.98],
    ['2022/12/28', 42.56, 41.62, 42.63, 41.41],
    ['2022/12/29', 41.61, 41.89, 42.22, 41.55],
    ['2022/12/30', 41.35, 41.95, 42.01, 41.22],
    ['2023/01/03', 42.42, 41.83, 42.55, 41.54],
    ['2023/01/04', 42.38, 43.45, 43.94, 42.2],
    ['2023/01/05', 42.81, 43.22, 43.55, 42.07],
    ['2023/01/06', 44.06, 44.59, 44.73, 43.58],
    ['2023/01/09', 44.53, 45.78, 46.05, 43.97],
    ['2023/01/10', 45.88, 46.22, 46.37, 45.44],
    ['2023/01/11', 46.3, 46.48, 46.72, 46.05],
    ['2023/01/12', 46.59, 46.19, 46.83, 45.74],
    ['2023/01/13', 45.94, 46.56, 46.68, 45.73],
    ['2023/01/17', 46.23, 46.22, 46.89, 46.15],
    ['2023/01/18', 45.56, 46.06, 46.41, 45.41],
    ['2023/01/19', 45.46, 45.88, 45.98, 45.06],
    ['2023/01/20', 46.54, 46.62, 46.99, 45.85],
    ['2023/01/23', 48.94, 48.75, 49.4, 48.02],
    ['2023/01/24', 48.23, 48.49, 49.03, 48.01],
    ['2023/01/25', 47.89, 48.11, 48.44, 47.29],
    ['2023/01/26', 48.63, 47.89, 49.0, 47.48],
    ['2023/01/27', 47.85, 47.48, 48.21, 47.41],
    ['2023/01/30', 46.88, 47.65, 48.18, 46.8],
    ['2023/01/31', 47.66, 48.15, 48.38, 47.65],
    ['2023/02/01', 48.16, 49.22, 49.55, 47.65],
    ['2023/02/02', 49.16, 49.18, 49.56, 48.48],
    ['2023/02/03', 45.8, 44.68, 47.18, 44.47],
    ['2023/02/06', 44.45, 44.79, 45.38, 44.15],
    ['2023/02/07', 44.38, 45.01, 45.08, 43.75],
    ['2023/02/08', 44.47, 44.19, 44.53, 43.22],
    ['2023/02/09', 44.83, 44.11, 45.34, 43.95],
    ['2023/02/10', 43.7, 43.78, 44.14, 43.27],
    ['2023/02/13', 43.95, 44.75, 44.8, 43.8],
    ['2023/02/14', 44.26, 45.07, 45.2, 44.08],
    ['2023/02/15', 44.6, 45.33, 45.6, 44.56],
    ['2023/02/16', 45.23, 44.58, 45.67, 44.58],
    ['2023/02/17', 44.5, 44.72, 45.0, 44.34],
    ['2023/02/21', 44.47, 43.54, 44.58, 43.52],
    ['2023/02/22', 43.55, 43.89, 44.1, 43.55],
    ['2023/02/23', 44.32, 44.24, 44.52, 43.63],
    ['2023/02/24', 43.59, 43.88, 44.03, 43.24],
    ['2023/02/27', 44.5, 43.94, 44.69, 43.89],
    ['2023/02/28', 44.11, 44.51, 44.71, 43.99],
    ['2023/03/01', 44.66, 45.32, 45.43, 44.66],
    ['2023/03/02', 45.0, 45.94, 46.08, 44.66],
    ['2023/03/03', 45.93, 45.87, 46.06, 45.5],
    ['2023/03/06', 45.76, 45.04, 45.85, 44.85],
    ['2023/03/07', 45.04, 44.51, 45.49, 44.44],
    ['2023/03/08', 44.34, 44.34, 44.61, 43.97],
    ['2023/03/09', 44.42, 43.34, 44.68, 43.25],
    ['2023/03/10', 43.6, 42.98, 43.9, 42.4],
    ['2023/03/13', 42.22, 41.66, 42.76, 41.58],
    ['2023/03/14', 42.55, 43.08, 43.31, 42.43],
    ['2023/03/15', 42.09, 43.22, 43.28, 41.56],
    ['2023/03/16', 43.05, 44.71, 44.83, 42.78],
    ['2023/03/17', 44.46, 44.44, 44.73, 43.94],
    ['2023/03/20', 44.78, 44.0, 45.04, 43.48],
    ['2023/03/21', 44.92, 45.27, 45.49, 44.85],
    ['2023/03/22', 45.07, 44.34, 45.41, 44.32],
    ['2023/03/23', 44.8, 44.46, 45.64, 44.09],
    ['2023/03/24', 43.84, 44.91, 45.05, 43.67],
    ['2023/03/27', 45.29, 44.67, 45.29, 44.13],
    ['2023/03/28', 44.79, 45.75, 45.78, 44.43],
    ['2023/03/29', 46.26, 46.15, 46.68, 45.64],
    ['2023/03/30', 46.46, 46.53, 46.96, 46.44],
    ['2023/03/31', 46.71, 47.52, 47.7, 46.71],
    ['2023/04/03', 47.26, 47.5, 47.57, 46.88],
    ['2023/04/04', 47.42, 46.83, 47.51, 46.43],
    ['2023/04/05', 46.18, 46.31, 46.44, 45.99],
    ['2023/04/06', 46.05, 46.17, 46.22, 45.64],
    ['2023/04/10', 45.99, 47.08, 47.14, 45.67],
    ['2023/04/11', 47.43, 48.7, 49.14, 47.42],
    ['2023/04/12', 49.17, 48.5, 49.41, 48.43],
    ['2023/04/13', 48.94, 48.52, 48.95, 48.19],
    ['2023/04/14', 48.8, 49.5, 49.69, 48.66],
    ['2023/04/17', 49.6, 49.26, 49.98, 49.1],
    ['2023/04/18', 49.4, 49.96, 50.1, 49.16],
    ['2023/04/19', 50.05, 49.8, 50.17, 49.25],
    ['2023/04/20', 49.91, 49.99, 50.79, 49.71],
    ['2023/04/21', 49.91, 50.29, 50.43, 49.72],
    ['2023/04/24', 50.14, 50.17, 50.3, 49.66],
    ['2023/04/25', 50.3, 49.17, 50.52, 48.97],
    ['2023/04/26', 48.87, 50.02, 50.33, 48.87],
    ['2023/04/27', 48.81, 49.87, 50.09, 47.0],
    ['2023/04/28', 51.26, 53.19, 53.39, 50.78],
    ['2023/05/01', 53.5, 53.14, 54.36, 52.82],
    ['2023/05/02', 53.12, 53.01, 53.22, 51.82],
    ['2023/05/03', 52.8, 53.53, 54.27, 52.66],
    ['2023/05/04', 53.13, 51.97, 53.27, 51.32],
    ['2023/05/05', 52.47, 51.84, 52.91, 51.71],
    ['2023/05/08', 52.07, 52.41, 52.82, 51.69],
    ['2023/05/09', 52.3, 52.71, 52.89, 52.13],
    ['2023/05/10', 53.23, 52.57, 53.45, 51.92],
    ['2023/05/11', 52.56, 52.5, 52.88, 52.13],
    ['2023/05/12', 52.51, 53.22, 53.29, 52.38],
    ['2023/05/15', 53.32, 54.74, 54.77, 53.22],
    ['2023/05/16', 54.03, 53.45, 54.58, 53.17],
    ['2023/05/17', 53.59, 53.83, 53.93, 53.42],
    ['2023/05/18', 53.9, 54.02, 54.44, 53.79],
    ['2023/05/19', 53.03, 51.94, 53.35, 50.96],
    ['2023/05/22', 51.81, 51.22, 52.41, 51.21],
    ['2023/05/23', 51.0, 51.12, 51.72, 50.82],
    ['2023/05/24', 51.29, 50.84, 51.4, 50.34],
    ['2023/05/25', 51.0, 51.67, 51.92, 50.74],
    ['2023/05/26', 51.46, 51.07, 51.87, 50.86],
    ['2023/05/30', 51.36, 51.46, 52.18, 51.24],
    ['2023/05/31', 51.09, 51.37, 51.55, 50.7],
    ['2023/06/01', 51.03, 50.44, 51.18, 50.25],
    ['2023/06/02', 51.41, 51.99, 52.2, 50.8],
    ['2023/06/05', 51.59, 51.59, 52.36, 51.21],
    ['2023/06/06', 51.7, 53.28, 53.96, 51.7],
    ['2023/06/07', 53.15, 54.19, 54.35, 52.9],
    ['2023/06/08', 54.29, 53.61, 54.69, 53.33],
    ['2023/06/09', 53.81, 53.8, 54.21, 53.51],
    ['2023/06/12', 54.09, 52.79, 54.09, 52.57],
    ['2023/06/13', 52.83, 52.2, 52.83, 51.64],
    ['2023/06/14', 52.18, 53.08, 53.54, 52.17],
    ['2023/06/15', 52.61, 52.57, 52.8, 51.73],
    ['2023/06/16', 52.96, 51.78, 53.2, 51.4],
    ['2023/06/20', 51.49, 50.49, 51.79, 50.45],
    ['2023/06/21', 50.84, 51.26, 51.37, 50.65],
    ['2023/06/22', 51.14, 51.51, 51.52, 50.82],
    ['2023/06/23', 50.86, 50.78, 51.22, 50.48],
    ['2023/06/26', 51.09, 50.27, 51.38, 50.18],
    ['2023/06/27', 50.87, 50.32, 51.15, 50.02],
    ['2023/06/28', 50.35, 50.45, 50.88, 50.31],
    ['2023/06/29', 50.62, 50.33, 51.11, 49.78],
    ['2023/06/30', 50.5, 52.66, 52.91, 50.26],
    ['2023/07/03', 52.73, 53.5, 54.47, 52.69],
    ['2023/07/05', 53.42, 52.54, 53.67, 52.36],
    ['2023/07/06', 51.78, 52.45, 52.62, 51.65],
    ['2023/07/07', 52.35, 51.5, 52.79, 51.33],
    ['2023/07/10', 51.55, 51.9, 52.39, 51.42],
    ['2023/07/11', 52.07, 52.03, 52.48, 51.64],
    ['2023/07/12', 52.5, 52.22, 52.77, 51.58],
    ['2023/07/13', 52.15, 52.52, 52.83, 51.77],
    ['2023/07/14', 52.62, 52.23, 52.68, 51.6],
    ['2023/07/17', 52.2, 52.9, 53.43, 51.94],
    ['2023/07/18', 52.9, 53.9, 55.01, 52.8],
    ['2023/07/19', 53.84, 54.26, 54.82, 53.84],
    ['2023/07/20', 54.26, 53.25, 55.52, 53.18],
    ['2023/07/21', 53.73, 52.02, 53.73, 52.01],
    ['2023/07/24', 52.21, 53.21, 53.49, 52.21],
    ['2023/07/25', 53.36, 52.17, 53.4, 52.16],
    ['2023/07/26', 52.03, 52.78, 53.15, 51.76],
    ['2023/07/27', 52.41, 51.11, 52.71, 50.78],
    ['2023/07/28', 54.5, 56.11, 56.29, 54.0],
    ['2023/07/31', 56.47, 55.58, 56.53, 55.0],
    ['2023/08/01', 55.36, 55.58, 56.47, 55.21],
    ['2023/08/02', 55.15, 54.19, 55.46, 54.12],
]);
var volumes = [
    1052900.0,
    1060400.0,
    808100.0,
    938200.0,
    1250500.0,
    1454300.0,
    1567200.0,
    1098900.0,
    1629000.0,
    1299100.0,
    897000.0,
    930500.0,
    845300.0,
    992200.0,
    1085800.0,
    939600.0,
    1291100.0,
    835900.0,
    858400.0,
    735400.0,
    1313800.0,
    1117300.0,
    1151400.0,
    2022700.0,
    1618100.0,
    1535500.0,
    1387000.0,
    1327100.0,
    1585000.0,
    1383900.0,
    1136800.0,
    2226300.0,
    1346800.0,
    994200.0,
    844100.0,
    876100.0,
    1708300.0,
    1741200.0,
    1288000.0,
    1837300.0,
    1049800.0,
    3717700.0,
    1950000.0,
    2049000.0,
    1499200.0,
    790300.0,
    983900.0,
    1445000.0,
    1302100.0,
    1495400.0,
    1648700.0,
    1369200.0,
    2062300.0,
    1916100.0,
    1289500.0,
    3371900.0,
    2200400.0,
    2481000.0,
    3715000.0,
    7211000.0,
    2785900.0,
    2048300.0,
    2702600.0,
    2468400.0,
    3509800.0,
    1402700.0,
    2314700.0,
    1302700.0,
    1052400.0,
    1300600.0,
    1399200.0,
    2414400.0,
    1550300.0,
    1913800.0,
    1061000.0,
    1419300.0,
    1274500.0,
    1112000.0,
    1383900.0,
    690400.0,
    467700.0,
    1380800.0,
    1357300.0,
    3042600.0,
    2074300.0,
    1017600.0,
    835800.0,
    1770400.0,
    770600.0,
    1187000.0,
    1188400.0,
    929100.0,
    1773300.0,
    750200.0,
    1027700.0,
    2340600.0,
    1012500.0,
    1291800.0,
    1935000.0,
    1163500.0,
    832500.0,
    978400.0,
    954800.0,
    961000.0,
    1024000.0,
    1550600.0,
    1858500.0,
    1360700.0,
    1612000.0,
    2245800.0,
    1698100.0,
    1088100.0,
    2299700.0,
    2423800.0,
    1902900.0,
    2150500.0,
    1702800.0,
    1246000.0,
    3174300.0,
    1156500.0,
    1599500.0,
    912800.0,
    1672300.0,
    1786000.0,
    2295900.0,
    3165100.0,
    2288000.0,
    6590400.0,
    2799200.0,
    2041000.0,
    2534200.0,
    1609100.0,
    2228200.0,
    1694600.0,
    1969000.0,
    1306600.0,
    1377900.0,
    1136300.0,
    1387000.0,
    1160100.0,
    1180300.0,
    1200500.0,
    1020500.0,
    1381000.0,
    1184300.0,
    1189200.0,
    1507900.0,
    1549300.0,
    1228400.0,
    1530300.0,
    1635100.0,
    1939500.0,
    1701300.0,
    1562500.0,
    1834600.0,
    1908000.0,
    1847900.0,
    1243600.0,
    1233900.0,
    1144500.0,
    1368500.0,
    1455400.0,
    1236800.0,
    1788400.0,
    1553600.0,
    965500.0,
    1605300.0,
    1113000.0,
    1908800.0,
    1265000.0,
    1479200.0,
    1277200.0,
    2477100.0,
    1838400.0,
    1544100.0,
    1567800.0,
    1924100.0,
    2562500.0,
    1404600.0,
    1236400.0,
    1437600.0,
    1614500.0,
    2815500.0,
    2565200.0,
    3511400.0,
    5623000.0,
    3078100.0,
    2319800.0,
    1954900.0,
    2334200.0,
    1890400.0,
    1480300.0,
    1195100.0,
    1322600.0,
    1700900.0,
    2201600.0,
    2500000.0,
    1767000.0,
    1169000.0,
    1441100.0,
    3183400.0,
    1725500.0,
    1439000.0,
    1668500.0,
    1379500.0,
    1759900.0,
    1805100.0,
    1796100.0,
    1357200.0,
    1749600.0,
    1313900.0,
    2415800.0,
    2490900.0,
    1692600.0,
    1079700.0,
    1634800.0,
    2214600.0,
    2031900.0,
    2529900.0,
    2109800.0,
    2641400.0,
    1287800.0,
    1052500.0,
    1344800.0,
    1574600.0,
    1495000.0,
    1630600.0,
    1701900.0,
    3321900.0,
    1364000.0,
    1450700.0,
    1383600.0,
    1467400.0,
    2011900.0,
    1304400.0,
    1617900.0,
    1158000.0,
    1281900.0,
    1568800.0,
    3105600.0,
    1687300.0,
    1898000.0,
    2026100.0,
    2210400.0,
    1843500.0,
    1653100.0,
    3230100.0,
    6143700.0,
    2127600.0,
    2182600.0,
    1394800.0,
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
        text: "SKX",
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