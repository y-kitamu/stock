/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_CRS");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/09', 33.21, 33.67, 33.7, 32.95],
    ['2022/08/10', 34.45, 35.08, 35.2, 33.95],
    ['2022/08/11', 35.74, 36.49, 36.87, 35.51],
    ['2022/08/12', 36.46, 37.3, 37.87, 36.37],
    ['2022/08/15', 36.53, 37.32, 37.34, 35.61],
    ['2022/08/16', 37.51, 39.05, 39.36, 36.96],
    ['2022/08/17', 38.25, 37.56, 38.25, 37.01],
    ['2022/08/18', 37.47, 38.46, 38.67, 37.47],
    ['2022/08/19', 37.94, 38.16, 38.23, 37.22],
    ['2022/08/22', 37.21, 36.36, 37.21, 36.11],
    ['2022/08/23', 36.8, 36.9, 38.25, 36.48],
    ['2022/08/24', 36.81, 38.22, 38.44, 36.48],
    ['2022/08/25', 38.43, 38.86, 39.31, 38.32],
    ['2022/08/26', 38.66, 37.36, 38.73, 37.13],
    ['2022/08/29', 36.69, 36.5, 37.25, 36.39],
    ['2022/08/30', 36.39, 35.17, 36.77, 34.66],
    ['2022/08/31', 35.1, 33.97, 35.1, 33.96],
    ['2022/09/01', 33.41, 32.79, 33.49, 32.41],
    ['2022/09/02', 33.4, 32.63, 33.91, 32.28],
    ['2022/09/06', 33.05, 32.4, 33.1, 32.09],
    ['2022/09/07', 32.16, 33.54, 33.58, 31.9],
    ['2022/09/08', 33.16, 33.87, 34.12, 32.86],
    ['2022/09/09', 34.52, 35.89, 35.99, 34.1],
    ['2022/09/12', 38.1, 39.06, 39.43, 37.49],
    ['2022/09/13', 37.74, 37.51, 38.4, 37.08],
    ['2022/09/14', 37.25, 36.69, 37.25, 35.84],
    ['2022/09/15', 36.31, 36.82, 37.26, 36.17],
    ['2022/09/16', 36.38, 36.03, 37.01, 35.83],
    ['2022/09/19', 35.24, 37.77, 38.16, 35.24],
    ['2022/09/20', 37.04, 36.88, 37.46, 36.34],
    ['2022/09/21', 37.46, 35.58, 37.52, 35.56],
    ['2022/09/22', 35.91, 34.92, 35.91, 34.64],
    ['2022/09/23', 33.9, 33.33, 33.94, 32.95],
    ['2022/09/26', 32.98, 32.92, 33.99, 32.86],
    ['2022/09/27', 33.46, 32.93, 33.97, 32.51],
    ['2022/09/28', 33.15, 34.03, 34.32, 32.87],
    ['2022/09/29', 33.65, 32.43, 33.76, 31.89],
    ['2022/09/30', 32.08, 31.14, 32.65, 31.02],
    ['2022/10/03', 31.81, 33.26, 33.6, 31.81],
    ['2022/10/04', 34.34, 35.86, 35.89, 34.18],
    ['2022/10/05', 34.76, 34.95, 35.38, 34.29],
    ['2022/10/06', 34.31, 34.48, 34.99, 34.31],
    ['2022/10/07', 34.24, 33.94, 34.44, 33.7],
    ['2022/10/10', 34.42, 34.52, 34.89, 33.99],
    ['2022/10/11', 34.09, 34.3, 34.87, 33.73],
    ['2022/10/12', 34.16, 34.37, 34.69, 33.17],
    ['2022/10/13', 33.48, 35.09, 35.47, 32.85],
    ['2022/10/14', 35.25, 33.47, 35.62, 33.43],
    ['2022/10/17', 34.19, 34.48, 35.0, 34.17],
    ['2022/10/18', 35.17, 35.11, 36.03, 34.52],
    ['2022/10/19', 34.79, 34.8, 35.15, 34.19],
    ['2022/10/20', 34.53, 34.86, 35.73, 34.22],
    ['2022/10/21', 35.24, 36.29, 36.77, 35.22],
    ['2022/10/24', 36.07, 36.16, 36.26, 35.41],
    ['2022/10/25', 35.81, 36.9, 36.97, 35.22],
    ['2022/10/26', 37.08, 37.02, 38.15, 36.63],
    ['2022/10/27', 36.41, 35.83, 37.72, 34.93],
    ['2022/10/28', 35.89, 36.04, 36.34, 35.33],
    ['2022/10/31', 35.79, 37.4, 37.8, 35.47],
    ['2022/11/01', 38.24, 38.05, 38.92, 37.46],
    ['2022/11/02', 37.75, 35.4, 37.75, 35.36],
    ['2022/11/03', 34.72, 36.21, 36.64, 34.1],
    ['2022/11/04', 37.21, 38.77, 39.5, 37.09],
    ['2022/11/07', 39.29, 39.45, 39.73, 38.46],
    ['2022/11/08', 39.65, 39.18, 39.75, 38.5],
    ['2022/11/09', 38.8, 38.99, 40.27, 38.51],
    ['2022/11/10', 40.98, 40.82, 40.99, 40.14],
    ['2022/11/11', 41.05, 39.97, 42.22, 39.92],
    ['2022/11/14', 39.39, 40.43, 41.0, 39.22],
    ['2022/11/15', 41.16, 41.55, 41.76, 40.59],
    ['2022/11/16', 41.16, 41.29, 41.38, 40.41],
    ['2022/11/17', 40.43, 40.95, 40.97, 39.74],
    ['2022/11/18', 41.7, 40.99, 41.75, 40.53],
    ['2022/11/21', 40.53, 41.23, 41.67, 40.1],
    ['2022/11/22', 41.59, 41.57, 41.73, 41.0],
    ['2022/11/23', 41.25, 41.09, 41.5, 40.85],
    ['2022/11/25', 41.12, 40.95, 41.49, 40.95],
    ['2022/11/28', 40.33, 39.71, 40.4, 39.58],
    ['2022/11/29', 40.07, 40.06, 40.33, 39.97],
    ['2022/11/30', 40.25, 41.06, 41.15, 39.62],
    ['2022/12/01', 41.03, 41.28, 41.53, 40.17],
    ['2022/12/02', 40.45, 42.85, 43.15, 40.45],
    ['2022/12/05', 43.03, 41.47, 43.32, 41.4],
    ['2022/12/06', 41.55, 41.87, 42.25, 41.11],
    ['2022/12/07', 41.67, 41.36, 41.97, 41.2],
    ['2022/12/08', 42.04, 41.43, 42.65, 40.91],
    ['2022/12/09', 41.21, 39.32, 41.39, 39.3],
    ['2022/12/12', 39.02, 40.18, 40.18, 38.6],
    ['2022/12/13', 41.36, 40.35, 41.41, 39.75],
    ['2022/12/14', 40.04, 39.78, 40.75, 39.44],
    ['2022/12/15', 38.88, 37.43, 39.03, 36.78],
    ['2022/12/16', 36.76, 37.43, 37.76, 36.53],
    ['2022/12/19', 37.74, 36.59, 37.81, 36.46],
    ['2022/12/20', 36.76, 38.36, 38.6, 36.76],
    ['2022/12/21', 38.92, 38.82, 39.57, 38.35],
    ['2022/12/22', 38.59, 37.94, 38.59, 36.55],
    ['2022/12/23', 37.77, 37.8, 38.05, 37.57],
    ['2022/12/27', 38.0, 37.88, 38.47, 37.64],
    ['2022/12/28', 37.94, 36.53, 38.22, 36.51],
    ['2022/12/29', 36.92, 37.33, 37.45, 36.82],
    ['2022/12/30', 37.09, 36.94, 37.51, 36.74],
    ['2023/01/03', 37.13, 35.88, 37.59, 35.72],
    ['2023/01/04', 35.98, 36.93, 37.67, 35.98],
    ['2023/01/05', 36.99, 37.17, 37.87, 36.23],
    ['2023/01/06', 37.85, 38.99, 39.82, 37.82],
    ['2023/01/09', 39.41, 39.58, 40.76, 39.15],
    ['2023/01/10', 39.61, 41.84, 41.96, 39.03],
    ['2023/01/11', 41.98, 42.97, 43.33, 41.33],
    ['2023/01/12', 43.4, 43.75, 43.89, 42.47],
    ['2023/01/13', 43.72, 44.6, 44.97, 43.2],
    ['2023/01/17', 44.55, 43.75, 44.79, 43.37],
    ['2023/01/18', 44.29, 43.48, 44.69, 43.09],
    ['2023/01/19', 43.3, 43.27, 44.1, 42.43],
    ['2023/01/20', 43.6, 44.28, 44.31, 42.79],
    ['2023/01/23', 44.07, 44.13, 44.87, 43.69],
    ['2023/01/24', 43.77, 42.91, 44.29, 42.84],
    ['2023/01/25', 42.49, 43.94, 44.33, 42.39],
    ['2023/01/26', 43.46, 46.48, 46.72, 41.06],
    ['2023/01/27', 47.44, 49.14, 49.99, 46.53],
    ['2023/01/30', 48.34, 48.39, 48.46, 46.44],
    ['2023/01/31', 48.59, 48.29, 48.82, 46.95],
    ['2023/02/01', 47.76, 49.82, 50.19, 47.36],
    ['2023/02/02', 49.97, 50.78, 51.32, 49.67],
    ['2023/02/03', 50.43, 50.95, 51.71, 50.06],
    ['2023/02/06', 50.63, 49.64, 50.63, 49.12],
    ['2023/02/07', 49.6, 50.92, 51.02, 49.27],
    ['2023/02/08', 50.38, 50.21, 50.69, 49.36],
    ['2023/02/09', 50.6, 49.28, 51.24, 48.96],
    ['2023/02/10', 48.87, 49.34, 49.65, 48.87],
    ['2023/02/13', 49.09, 50.34, 50.36, 48.49],
    ['2023/02/14', 49.97, 50.34, 51.0, 49.37],
    ['2023/02/15', 49.67, 51.33, 51.53, 49.44],
    ['2023/02/16', 50.43, 50.43, 50.9, 50.02],
    ['2023/02/17', 50.53, 50.25, 50.82, 50.04],
    ['2023/02/21', 49.63, 48.02, 50.05, 47.88],
    ['2023/02/22', 48.08, 48.35, 48.89, 47.84],
    ['2023/02/23', 48.76, 47.68, 48.8, 47.05],
    ['2023/02/24', 46.39, 47.3, 47.3, 45.76],
    ['2023/02/27', 47.72, 48.02, 48.61, 47.31],
    ['2023/02/28', 47.99, 48.33, 49.02, 47.55],
    ['2023/03/01', 48.7, 50.48, 50.79, 48.7],
    ['2023/03/02', 49.96, 50.79, 50.95, 49.62],
    ['2023/03/03', 51.0, 52.03, 52.5, 50.25],
    ['2023/03/06', 51.61, 50.08, 51.64, 49.51],
    ['2023/03/07', 50.08, 49.28, 50.48, 49.06],
    ['2023/03/08', 49.51, 48.86, 49.91, 48.71],
    ['2023/03/09', 48.86, 47.28, 49.66, 47.03],
    ['2023/03/10', 47.29, 45.11, 47.29, 44.5],
    ['2023/03/13', 43.95, 44.6, 45.74, 43.71],
    ['2023/03/14', 46.52, 45.56, 46.83, 45.0],
    ['2023/03/15', 43.61, 41.77, 43.87, 40.8],
    ['2023/03/16', 40.92, 42.16, 42.63, 40.38],
    ['2023/03/17', 41.77, 38.39, 41.9, 38.24],
    ['2023/03/20', 39.4, 40.35, 40.77, 39.07],
    ['2023/03/21', 41.59, 40.8, 41.86, 40.76],
    ['2023/03/22', 40.75, 39.97, 40.96, 39.91],
    ['2023/03/23', 40.02, 40.24, 41.58, 39.45],
    ['2023/03/24', 39.6, 41.0, 41.11, 39.21],
    ['2023/03/27', 41.72, 41.38, 41.83, 41.02],
    ['2023/03/28', 41.23, 42.05, 42.51, 40.98],
    ['2023/03/29', 42.6, 43.14, 43.19, 42.48],
    ['2023/03/30', 43.73, 43.48, 43.88, 43.08],
    ['2023/03/31', 44.03, 44.76, 44.82, 43.31],
    ['2023/04/03', 44.74, 44.66, 45.25, 43.85],
    ['2023/04/04', 44.47, 42.82, 44.55, 42.11],
    ['2023/04/05', 42.08, 41.6, 42.7, 40.57],
    ['2023/04/06', 41.71, 41.67, 42.31, 41.02],
    ['2023/04/10', 41.59, 42.29, 42.68, 41.59],
    ['2023/04/11', 42.84, 43.7, 43.77, 42.84],
    ['2023/04/12', 44.28, 43.64, 44.52, 43.46],
    ['2023/04/13', 43.92, 45.2, 45.22, 43.57],
    ['2023/04/14', 45.26, 45.01, 45.26, 44.33],
    ['2023/04/17', 45.05, 46.09, 46.54, 44.82],
    ['2023/04/18', 46.05, 47.77, 47.92, 46.05],
    ['2023/04/19', 47.17, 47.36, 47.42, 46.45],
    ['2023/04/20', 46.64, 47.38, 47.88, 46.64],
    ['2023/04/21', 47.18, 46.87, 47.25, 45.7],
    ['2023/04/24', 47.5, 48.61, 49.99, 47.44],
    ['2023/04/25', 47.51, 47.93, 47.93, 46.59],
    ['2023/04/26', 47.91, 48.24, 49.47, 47.62],
    ['2023/04/27', 50.0, 53.93, 54.18, 48.91],
    ['2023/04/28', 53.42, 52.74, 53.59, 51.95],
    ['2023/05/01', 52.81, 51.6, 53.1, 51.12],
    ['2023/05/02', 51.62, 54.34, 54.39, 50.79],
    ['2023/05/03', 54.45, 52.13, 54.89, 51.96],
    ['2023/05/04', 51.68, 49.72, 51.68, 49.4],
    ['2023/05/05', 50.81, 50.27, 51.41, 49.84],
    ['2023/05/08', 51.29, 50.87, 51.65, 50.05],
    ['2023/05/09', 50.46, 51.08, 51.91, 50.21],
    ['2023/05/10', 52.2, 50.31, 52.2, 49.72],
    ['2023/05/11', 49.03, 49.54, 50.01, 48.71],
    ['2023/05/12', 49.7, 48.67, 49.94, 48.53],
    ['2023/05/15', 49.11, 50.1, 50.47, 48.69],
    ['2023/05/16', 49.55, 45.88, 49.87, 45.85],
    ['2023/05/17', 46.01, 46.83, 47.31, 45.67],
    ['2023/05/18', 46.9, 47.4, 48.2, 46.57],
    ['2023/05/19', 48.2, 47.78, 48.32, 47.0],
    ['2023/05/22', 47.93, 48.07, 49.03, 47.45],
    ['2023/05/23', 47.53, 47.01, 48.14, 46.69],
    ['2023/05/24', 46.56, 45.55, 46.56, 44.94],
    ['2023/05/25', 45.55, 45.89, 46.19, 45.23],
    ['2023/05/26', 46.27, 45.86, 46.46, 45.17],
    ['2023/05/30', 45.88, 44.91, 46.0, 44.87],
    ['2023/05/31', 44.72, 45.61, 45.86, 44.4],
    ['2023/06/01', 45.81, 46.2, 46.99, 45.55],
    ['2023/06/02', 48.15, 49.0, 49.82, 47.71],
    ['2023/06/05', 48.03, 48.15, 48.56, 46.65],
    ['2023/06/06', 47.85, 50.16, 50.75, 47.85],
    ['2023/06/07', 50.76, 52.02, 52.24, 50.71],
    ['2023/06/08', 51.75, 51.84, 52.43, 50.84],
    ['2023/06/09', 51.73, 50.94, 51.84, 50.51],
    ['2023/06/12', 50.84, 51.46, 51.91, 50.18],
    ['2023/06/13', 51.99, 52.58, 53.6, 51.68],
    ['2023/06/14', 53.19, 51.59, 53.51, 51.01],
    ['2023/06/15', 50.93, 52.03, 52.35, 50.93],
    ['2023/06/16', 52.63, 51.95, 53.0, 51.02],
    ['2023/06/20', 51.45, 52.1, 52.2, 50.61],
    ['2023/06/21', 51.71, 53.09, 53.37, 51.71],
    ['2023/06/22', 52.74, 52.19, 52.92, 51.11],
    ['2023/06/23', 51.06, 51.43, 52.03, 50.63],
    ['2023/06/26', 51.45, 51.83, 52.62, 51.45],
    ['2023/06/27', 52.0, 52.64, 52.97, 51.34],
    ['2023/06/28', 52.18, 54.05, 54.49, 52.0],
    ['2023/06/29', 54.08, 55.63, 56.05, 54.08],
    ['2023/06/30', 56.18, 56.13, 56.34, 55.48],
    ['2023/07/03', 56.0, 56.29, 57.23, 56.0],
    ['2023/07/05', 55.39, 55.19, 55.92, 54.43],
    ['2023/07/06', 54.61, 53.52, 55.02, 51.94],
    ['2023/07/07', 53.81, 54.13, 55.64, 53.55],
    ['2023/07/10', 53.62, 55.21, 55.35, 53.62],
    ['2023/07/11', 55.7, 56.36, 56.46, 54.67],
    ['2023/07/12', 57.6, 57.38, 58.24, 56.64],
    ['2023/07/13', 57.94, 58.3, 58.43, 56.97],
    ['2023/07/14', 58.18, 56.82, 58.18, 56.8],
    ['2023/07/17', 56.83, 55.91, 57.12, 55.58],
    ['2023/07/18', 56.42, 57.8, 57.83, 55.59],
    ['2023/07/19', 57.53, 56.95, 57.8, 56.63],
    ['2023/07/20', 57.36, 57.41, 57.79, 56.56],
    ['2023/07/21', 57.7, 56.29, 57.7, 55.96],
    ['2023/07/24', 56.22, 56.58, 57.53, 55.75],
    ['2023/07/25', 56.58, 56.86, 57.42, 56.02],
    ['2023/07/26', 56.33, 57.18, 57.6, 55.92],
    ['2023/07/27', 58.58, 58.88, 60.95, 56.98],
    ['2023/07/28', 58.9, 58.68, 59.62, 57.4],
    ['2023/07/31', 59.07, 59.86, 61.02, 59.07],
    ['2023/08/01', 60.13, 60.29, 60.86, 59.61],
    ['2023/08/02', 59.2, 58.49, 59.39, 58.1],
    ['2023/08/03', 57.77, 57.68, 58.4, 56.81],
    ['2023/08/04', 57.5, 58.05, 58.73, 57.2],
    ['2023/08/07', 58.89, 59.98, 60.03, 58.26],
]);
var volumes = [
    255700.0,
    799400.0,
    531700.0,
    371700.0,
    417800.0,
    367400.0,
    164600.0,
    219700.0,
    291200.0,
    221100.0,
    349300.0,
    189100.0,
    204500.0,
    187600.0,
    167100.0,
    221700.0,
    252900.0,
    489900.0,
    257900.0,
    297100.0,
    266300.0,
    160300.0,
    339400.0,
    638800.0,
    407000.0,
    308700.0,
    411400.0,
    647300.0,
    421300.0,
    420600.0,
    197800.0,
    185900.0,
    207400.0,
    197900.0,
    267000.0,
    216400.0,
    209900.0,
    340200.0,
    248000.0,
    334800.0,
    148600.0,
    170000.0,
    150100.0,
    148900.0,
    197100.0,
    173200.0,
    297500.0,
    217700.0,
    204700.0,
    189800.0,
    146800.0,
    181700.0,
    239000.0,
    162400.0,
    208600.0,
    275600.0,
    310200.0,
    306100.0,
    397000.0,
    345100.0,
    299700.0,
    256200.0,
    268600.0,
    232700.0,
    218500.0,
    222500.0,
    273300.0,
    335900.0,
    208600.0,
    218300.0,
    151300.0,
    147300.0,
    177500.0,
    162400.0,
    233100.0,
    111900.0,
    57400.0,
    191200.0,
    166400.0,
    289200.0,
    200000.0,
    195300.0,
    214100.0,
    139800.0,
    183800.0,
    204700.0,
    229500.0,
    261200.0,
    431400.0,
    275600.0,
    464400.0,
    1722700.0,
    273500.0,
    367900.0,
    215000.0,
    216400.0,
    131500.0,
    168700.0,
    138800.0,
    167500.0,
    181100.0,
    217100.0,
    483100.0,
    209000.0,
    297000.0,
    300000.0,
    273300.0,
    379800.0,
    226300.0,
    288800.0,
    318500.0,
    244000.0,
    289800.0,
    350000.0,
    537300.0,
    669200.0,
    617300.0,
    810600.0,
    881800.0,
    594500.0,
    1312000.0,
    385400.0,
    423000.0,
    440500.0,
    262300.0,
    363700.0,
    272700.0,
    247200.0,
    223300.0,
    213800.0,
    294400.0,
    369300.0,
    299500.0,
    231800.0,
    326400.0,
    342500.0,
    322300.0,
    358400.0,
    168800.0,
    240200.0,
    354600.0,
    231600.0,
    277300.0,
    402100.0,
    240000.0,
    296500.0,
    287000.0,
    366500.0,
    312600.0,
    379400.0,
    454500.0,
    595700.0,
    1828600.0,
    426600.0,
    392500.0,
    332500.0,
    290700.0,
    356200.0,
    229100.0,
    224700.0,
    331400.0,
    187700.0,
    721700.0,
    260700.0,
    270000.0,
    462400.0,
    182700.0,
    211000.0,
    347100.0,
    417300.0,
    368800.0,
    403200.0,
    435000.0,
    369600.0,
    284500.0,
    430800.0,
    389100.0,
    717100.0,
    507400.0,
    673600.0,
    1078300.0,
    672200.0,
    509400.0,
    597700.0,
    701800.0,
    550600.0,
    399800.0,
    383000.0,
    393900.0,
    352500.0,
    424200.0,
    373800.0,
    649100.0,
    1230800.0,
    813300.0,
    450900.0,
    333100.0,
    287100.0,
    373400.0,
    386000.0,
    221000.0,
    211400.0,
    267800.0,
    402900.0,
    337600.0,
    505900.0,
    346400.0,
    415600.0,
    465800.0,
    314000.0,
    310800.0,
    303500.0,
    344600.0,
    368700.0,
    340000.0,
    864000.0,
    295300.0,
    330000.0,
    310300.0,
    714700.0,
    292200.0,
    265400.0,
    436700.0,
    369800.0,
    353100.0,
    130200.0,
    257100.0,
    417900.0,
    347200.0,
    318200.0,
    301100.0,
    366000.0,
    365100.0,
    209000.0,
    353600.0,
    332100.0,
    198600.0,
    188400.0,
    229600.0,
    168000.0,
    364600.0,
    383300.0,
    714100.0,
    413700.0,
    474600.0,
    593600.0,
    326600.0,
    335200.0,
    266700.0,
    260900.0,
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
     *     text: "CRS",
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