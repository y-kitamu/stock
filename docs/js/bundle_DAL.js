/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_DAL");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/10', 34.19, 33.93, 34.53, 33.89],
    ['2022/08/11', 34.5, 33.96, 34.79, 33.85],
    ['2022/08/12', 34.38, 34.5, 34.6, 34.08],
    ['2022/08/15', 34.59, 35.0, 35.48, 34.48],
    ['2022/08/16', 35.08, 35.34, 35.79, 34.71],
    ['2022/08/17', 34.77, 34.54, 34.92, 34.06],
    ['2022/08/18', 34.53, 34.49, 34.61, 34.03],
    ['2022/08/19', 33.88, 33.25, 34.06, 33.06],
    ['2022/08/22', 32.5, 32.38, 32.5, 31.85],
    ['2022/08/23', 32.39, 32.87, 33.02, 32.27],
    ['2022/08/24', 32.88, 33.31, 33.41, 32.67],
    ['2022/08/25', 33.58, 33.99, 34.16, 33.52],
    ['2022/08/26', 33.95, 32.68, 34.26, 32.65],
    ['2022/08/29', 32.2, 32.03, 32.35, 31.85],
    ['2022/08/30', 32.25, 31.72, 32.45, 31.47],
    ['2022/08/31', 31.97, 31.07, 32.02, 31.06],
    ['2022/09/01', 30.65, 31.09, 31.14, 29.94],
    ['2022/09/02', 31.44, 30.94, 31.83, 30.7],
    ['2022/09/06', 31.34, 31.19, 31.65, 30.66],
    ['2022/09/07', 31.29, 32.23, 32.34, 31.27],
    ['2022/09/08', 31.72, 32.12, 32.49, 31.55],
    ['2022/09/09', 32.43, 32.66, 32.76, 32.24],
    ['2022/09/12', 33.0, 33.15, 33.45, 32.72],
    ['2022/09/13', 32.03, 31.74, 32.37, 31.59],
    ['2022/09/14', 31.59, 32.66, 32.69, 30.82],
    ['2022/09/15', 32.47, 33.28, 33.74, 32.45],
    ['2022/09/16', 32.72, 32.11, 32.82, 31.79],
    ['2022/09/19', 31.94, 32.94, 33.11, 31.83],
    ['2022/09/20', 32.86, 32.75, 33.27, 32.26],
    ['2022/09/21', 32.4, 31.16, 32.46, 31.08],
    ['2022/09/22', 31.12, 29.96, 31.2, 29.73],
    ['2022/09/23', 29.39, 29.02, 29.58, 28.48],
    ['2022/09/26', 28.94, 28.02, 29.13, 28.02],
    ['2022/09/27', 28.61, 28.5, 28.93, 27.8],
    ['2022/09/28', 28.5, 29.49, 29.64, 28.26],
    ['2022/09/29', 28.87, 28.44, 28.93, 28.08],
    ['2022/09/30', 28.12, 28.06, 28.59, 27.89],
    ['2022/10/03', 27.98, 28.26, 28.5, 27.2],
    ['2022/10/04', 29.25, 30.75, 30.82, 29.25],
    ['2022/10/05', 30.0, 30.52, 30.75, 29.8],
    ['2022/10/06', 30.29, 30.62, 30.92, 30.15],
    ['2022/10/07', 30.2, 29.39, 30.22, 29.06],
    ['2022/10/10', 29.41, 29.42, 29.72, 28.98],
    ['2022/10/11', 30.59, 28.84, 30.76, 28.37],
    ['2022/10/12', 28.52, 29.21, 29.44, 28.21],
    ['2022/10/13', 29.33, 30.38, 31.02, 28.52],
    ['2022/10/14', 31.59, 31.08, 31.92, 30.86],
    ['2022/10/17', 31.98, 31.13, 32.12, 30.72],
    ['2022/10/18', 31.96, 32.17, 32.19, 31.34],
    ['2022/10/19', 32.58, 32.52, 32.94, 32.08],
    ['2022/10/20', 32.4, 32.15, 33.1, 32.11],
    ['2022/10/21', 32.06, 32.58, 32.81, 31.77],
    ['2022/10/24', 32.85, 33.27, 33.42, 32.58],
    ['2022/10/25', 33.08, 33.9, 33.99, 32.92],
    ['2022/10/26', 33.7, 33.9, 34.6, 33.7],
    ['2022/10/27', 34.4, 34.09, 35.08, 34.04],
    ['2022/10/28', 34.07, 34.67, 34.75, 33.7],
    ['2022/10/31', 34.67, 33.93, 34.93, 33.89],
    ['2022/11/01', 34.33, 33.63, 34.43, 33.53],
    ['2022/11/02', 33.2, 32.06, 33.38, 32.03],
    ['2022/11/03', 31.54, 31.97, 32.39, 30.98],
    ['2022/11/04', 32.7, 32.76, 33.22, 32.16],
    ['2022/11/07', 33.37, 33.36, 33.64, 32.57],
    ['2022/11/08', 33.42, 33.59, 33.9, 33.1],
    ['2022/11/09', 33.27, 33.46, 34.03, 33.15],
    ['2022/11/10', 34.53, 35.49, 35.83, 34.31],
    ['2022/11/11', 35.69, 35.44, 36.0, 35.26],
    ['2022/11/14', 34.75, 34.69, 35.49, 34.6],
    ['2022/11/15', 35.27, 34.9, 35.58, 34.46],
    ['2022/11/16', 34.42, 34.12, 34.65, 33.89],
    ['2022/11/17', 33.44, 34.06, 34.13, 33.3],
    ['2022/11/18', 35.0, 34.47, 35.38, 34.17],
    ['2022/11/21', 34.3, 34.23, 34.69, 34.05],
    ['2022/11/22', 34.37, 34.23, 34.51, 33.75],
    ['2022/11/23', 34.36, 34.49, 34.86, 34.2],
    ['2022/11/25', 34.5, 35.1, 35.39, 34.36],
    ['2022/11/28', 34.7, 33.87, 34.92, 33.87],
    ['2022/11/29', 34.02, 34.61, 34.73, 33.88],
    ['2022/11/30', 34.51, 35.37, 35.38, 34.21],
    ['2022/12/01', 35.45, 35.38, 35.74, 35.1],
    ['2022/12/02', 35.0, 35.71, 35.72, 34.88],
    ['2022/12/05', 35.73, 35.79, 36.88, 35.68],
    ['2022/12/06', 35.9, 35.91, 36.24, 35.2],
    ['2022/12/07', 35.64, 34.33, 35.65, 34.3],
    ['2022/12/08', 34.57, 33.53, 34.74, 33.3],
    ['2022/12/09', 33.31, 33.8, 33.82, 33.16],
    ['2022/12/12', 33.69, 34.77, 34.79, 33.6],
    ['2022/12/13', 35.52, 33.38, 35.72, 32.81],
    ['2022/12/14', 34.65, 34.31, 34.78, 33.73],
    ['2022/12/15', 33.65, 33.25, 34.06, 32.83],
    ['2022/12/16', 33.25, 33.11, 33.74, 32.62],
    ['2022/12/19', 33.31, 32.92, 33.69, 32.85],
    ['2022/12/20', 32.86, 32.9, 33.28, 32.75],
    ['2022/12/21', 33.24, 33.67, 33.99, 33.2],
    ['2022/12/22', 33.6, 32.92, 33.63, 32.29],
    ['2022/12/23', 32.83, 33.16, 33.17, 32.37],
    ['2022/12/27', 32.86, 32.9, 33.33, 32.59],
    ['2022/12/28', 32.84, 31.99, 33.02, 31.92],
    ['2022/12/29', 31.95, 32.73, 32.76, 31.82],
    ['2022/12/30', 32.44, 32.86, 33.05, 32.35],
    ['2023/01/03', 33.25, 32.61, 33.55, 32.34],
    ['2023/01/04', 32.95, 34.39, 34.47, 32.94],
    ['2023/01/05', 34.69, 35.23, 35.57, 34.52],
    ['2023/01/06', 35.19, 36.03, 36.07, 35.1],
    ['2023/01/09', 36.54, 36.77, 37.42, 36.35],
    ['2023/01/10', 36.67, 38.09, 38.17, 36.66],
    ['2023/01/11', 37.92, 38.18, 38.7, 37.82],
    ['2023/01/12', 38.84, 39.6, 39.62, 38.32],
    ['2023/01/13', 36.55, 38.2, 38.29, 36.52],
    ['2023/01/17', 38.2, 38.26, 38.36, 37.56],
    ['2023/01/18', 39.07, 38.38, 39.32, 38.31],
    ['2023/01/19', 37.85, 38.35, 38.44, 37.03],
    ['2023/01/20', 38.52, 39.03, 39.2, 38.34],
    ['2023/01/23', 39.2, 39.08, 39.31, 38.73],
    ['2023/01/24', 39.25, 38.8, 39.46, 38.45],
    ['2023/01/25', 38.73, 39.38, 39.5, 38.62],
    ['2023/01/26', 39.42, 39.22, 39.51, 38.62],
    ['2023/01/27', 39.0, 38.73, 39.22, 38.7],
    ['2023/01/30', 38.43, 38.4, 39.39, 38.26],
    ['2023/01/31', 38.81, 39.1, 39.11, 38.37],
    ['2023/02/01', 38.84, 39.89, 40.08, 38.6],
    ['2023/02/02', 40.21, 39.9, 40.34, 39.51],
    ['2023/02/03', 39.3, 39.58, 40.01, 39.29],
    ['2023/02/06', 39.27, 39.64, 39.84, 39.08],
    ['2023/02/07', 39.5, 39.59, 39.77, 38.67],
    ['2023/02/08', 40.0, 39.44, 40.31, 39.16],
    ['2023/02/09', 39.72, 39.01, 39.97, 38.88],
    ['2023/02/10', 38.5, 38.17, 38.54, 37.82],
    ['2023/02/13', 38.15, 38.6, 38.74, 37.98],
    ['2023/02/14', 38.53, 39.1, 39.25, 38.25],
    ['2023/02/15', 38.67, 39.02, 39.26, 38.61],
    ['2023/02/16', 38.62, 38.28, 38.79, 38.22],
    ['2023/02/17', 38.17, 38.36, 38.43, 37.67],
    ['2023/02/21', 37.9, 37.1, 38.09, 36.82],
    ['2023/02/22', 37.0, 37.01, 37.46, 36.84],
    ['2023/02/23', 37.63, 37.53, 38.14, 37.16],
    ['2023/02/24', 36.8, 37.36, 37.4, 36.66],
    ['2023/02/27', 37.81, 37.84, 38.21, 37.56],
    ['2023/02/28', 37.64, 38.34, 38.73, 37.64],
    ['2023/03/01', 38.34, 38.51, 38.67, 38.01],
    ['2023/03/02', 38.11, 38.42, 38.55, 37.85],
    ['2023/03/03', 38.99, 38.85, 39.24, 38.58],
    ['2023/03/06', 38.99, 38.46, 39.27, 38.36],
    ['2023/03/07', 38.91, 39.07, 39.77, 38.7],
    ['2023/03/08', 39.21, 39.73, 39.74, 39.17],
    ['2023/03/09', 39.74, 38.49, 40.3, 38.32],
    ['2023/03/10', 38.92, 37.25, 38.92, 36.58],
    ['2023/03/13', 36.41, 35.68, 36.56, 35.39],
    ['2023/03/14', 36.38, 35.47, 36.49, 35.1],
    ['2023/03/15', 34.37, 33.23, 34.5, 32.58],
    ['2023/03/16', 33.12, 33.71, 33.89, 32.63],
    ['2023/03/17', 33.26, 32.96, 33.35, 32.51],
    ['2023/03/20', 33.08, 33.14, 33.52, 32.92],
    ['2023/03/21', 33.72, 33.89, 34.14, 33.65],
    ['2023/03/22', 33.89, 32.77, 34.02, 32.73],
    ['2023/03/23', 33.0, 32.14, 33.35, 31.81],
    ['2023/03/24', 31.74, 31.59, 31.86, 31.04],
    ['2023/03/27', 32.18, 32.13, 32.3, 31.74],
    ['2023/03/28', 32.0, 32.47, 32.53, 31.97],
    ['2023/03/29', 32.83, 33.32, 33.42, 32.52],
    ['2023/03/30', 33.71, 34.11, 34.29, 33.71],
    ['2023/03/31', 34.5, 34.92, 34.94, 34.37],
    ['2023/04/03', 34.48, 34.39, 34.85, 34.16],
    ['2023/04/04', 34.57, 33.92, 34.7, 33.5],
    ['2023/04/05', 33.56, 33.46, 33.63, 32.85],
    ['2023/04/06', 33.58, 33.69, 33.82, 33.22],
    ['2023/04/10', 33.69, 33.97, 34.16, 33.62],
    ['2023/04/11', 33.97, 34.58, 34.78, 33.94],
    ['2023/04/12', 34.32, 33.74, 34.47, 33.14],
    ['2023/04/13', 34.05, 33.37, 34.11, 32.44],
    ['2023/04/14', 33.71, 33.77, 34.0, 33.02],
    ['2023/04/17', 33.81, 34.59, 34.61, 33.67],
    ['2023/04/18', 34.94, 35.36, 35.47, 34.54],
    ['2023/04/19', 35.15, 35.93, 36.19, 35.12],
    ['2023/04/20', 35.59, 34.64, 35.65, 34.59],
    ['2023/04/21', 34.68, 34.33, 34.69, 33.86],
    ['2023/04/24', 34.42, 34.12, 34.47, 33.46],
    ['2023/04/25', 33.9, 33.11, 33.99, 33.09],
    ['2023/04/26', 33.18, 32.75, 33.47, 32.69],
    ['2023/04/27', 33.05, 33.33, 33.45, 32.73],
    ['2023/04/28', 33.45, 34.31, 34.39, 33.24],
    ['2023/05/01', 34.43, 34.72, 35.16, 34.18],
    ['2023/05/02', 34.5, 34.53, 34.67, 33.89],
    ['2023/05/03', 34.53, 34.13, 34.81, 34.05],
    ['2023/05/04', 33.95, 33.08, 33.98, 32.68],
    ['2023/05/05', 33.44, 33.94, 34.19, 33.32],
    ['2023/05/08', 34.24, 34.2, 34.43, 33.73],
    ['2023/05/09', 33.94, 34.2, 34.42, 33.7],
    ['2023/05/10', 34.65, 33.8, 34.73, 33.11],
    ['2023/05/11', 33.55, 33.22, 33.64, 33.01],
    ['2023/05/12', 33.38, 33.23, 33.55, 32.85],
    ['2023/05/15', 33.35, 33.72, 33.73, 33.06],
    ['2023/05/16', 33.65, 33.82, 34.24, 33.36],
    ['2023/05/17', 34.3, 35.93, 36.18, 34.22],
    ['2023/05/18', 35.89, 35.89, 36.12, 35.54],
    ['2023/05/19', 35.93, 35.59, 36.0, 35.01],
    ['2023/05/22', 36.07, 35.46, 36.34, 35.21],
    ['2023/05/23', 35.74, 35.91, 36.64, 35.31],
    ['2023/05/24', 35.56, 34.93, 35.74, 34.51],
    ['2023/05/25', 35.1, 35.75, 35.82, 35.03],
    ['2023/05/26', 35.75, 35.89, 36.25, 35.71],
    ['2023/05/30', 36.29, 36.28, 36.93, 36.1],
    ['2023/05/31', 36.87, 36.33, 36.92, 35.88],
    ['2023/06/01', 36.42, 36.38, 36.81, 36.0],
    ['2023/06/02', 36.91, 37.01, 37.64, 36.63],
    ['2023/06/05', 37.08, 37.1, 37.22, 36.55],
    ['2023/06/06', 36.65, 37.64, 37.67, 36.61],
    ['2023/06/07', 37.84, 38.23, 38.26, 37.6],
    ['2023/06/08', 38.24, 39.11, 39.21, 38.24],
    ['2023/06/09', 39.12, 39.28, 39.9, 39.08],
    ['2023/06/12', 39.58, 40.2, 40.22, 39.54],
    ['2023/06/13', 40.39, 41.56, 41.65, 40.2],
    ['2023/06/14', 41.71, 42.19, 42.23, 41.48],
    ['2023/06/15', 41.74, 42.88, 43.02, 41.65],
    ['2023/06/16', 42.86, 42.79, 43.16, 42.55],
    ['2023/06/20', 42.42, 42.48, 42.64, 42.13],
    ['2023/06/21', 42.49, 42.79, 43.04, 42.36],
    ['2023/06/22', 42.61, 42.94, 43.1, 42.48],
    ['2023/06/23', 42.25, 42.86, 43.0, 42.09],
    ['2023/06/26', 42.85, 43.14, 43.58, 42.66],
    ['2023/06/27', 43.68, 46.09, 46.27, 43.37],
    ['2023/06/28', 46.27, 46.71, 46.91, 46.05],
    ['2023/06/29', 46.75, 46.31, 47.41, 46.22],
    ['2023/06/30', 46.65, 47.54, 47.73, 46.49],
    ['2023/07/03', 47.44, 47.96, 48.17, 47.44],
    ['2023/07/05', 47.72, 48.52, 48.82, 47.66],
    ['2023/07/06', 47.99, 47.33, 48.45, 47.24],
    ['2023/07/07', 47.49, 47.88, 48.39, 47.15],
    ['2023/07/10', 47.83, 48.46, 48.61, 47.66],
    ['2023/07/11', 48.58, 48.66, 48.79, 48.01],
    ['2023/07/12', 48.7, 47.95, 49.04, 47.88],
    ['2023/07/13', 49.75, 47.71, 49.81, 47.23],
    ['2023/07/14', 47.78, 46.49, 47.82, 45.94],
    ['2023/07/17', 46.49, 46.8, 47.19, 46.32],
    ['2023/07/18', 46.81, 48.37, 48.39, 46.72],
    ['2023/07/19', 48.11, 48.55, 48.62, 47.9],
    ['2023/07/20', 48.13, 48.69, 48.8, 47.7],
    ['2023/07/21', 48.9, 48.55, 49.1, 48.29],
    ['2023/07/24', 48.11, 47.48, 48.25, 47.33],
    ['2023/07/25', 46.66, 46.44, 46.79, 45.45],
    ['2023/07/26', 46.44, 46.43, 46.78, 45.97],
    ['2023/07/27', 46.03, 45.75, 46.16, 45.39],
    ['2023/07/28', 46.06, 45.72, 46.15, 45.49],
    ['2023/07/31', 45.81, 46.26, 46.33, 45.72],
    ['2023/08/01', 45.74, 45.4, 45.75, 44.26],
    ['2023/08/02', 44.91, 44.8, 45.08, 44.63],
    ['2023/08/03', 44.32, 44.19, 44.64, 44.02],
    ['2023/08/04', 44.47, 44.59, 44.81, 44.21],
    ['2023/08/07', 44.69, 45.24, 45.42, 44.49],
    ['2023/08/08', 44.62, 45.79, 45.94, 44.6],
]);
var volumes = [
    10465700.0,
    7598700.0,
    7142000.0,
    9042000.0,
    8757400.0,
    7976000.0,
    5687500.0,
    9874900.0,
    9246500.0,
    7974300.0,
    5742000.0,
    6785000.0,
    6917100.0,
    8758400.0,
    7506400.0,
    7450000.0,
    8572700.0,
    8629600.0,
    7630800.0,
    9035900.0,
    11085400.0,
    10958900.0,
    8295100.0,
    9508100.0,
    11048000.0,
    11539700.0,
    13830200.0,
    8929700.0,
    7618900.0,
    13704400.0,
    11105300.0,
    12887500.0,
    12130600.0,
    13177600.0,
    10325700.0,
    11040300.0,
    9632400.0,
    11053600.0,
    16308100.0,
    8523000.0,
    10688100.0,
    11051700.0,
    10400100.0,
    17037900.0,
    11868600.0,
    27099400.0,
    22499400.0,
    15306200.0,
    13590500.0,
    14208800.0,
    14786500.0,
    11173100.0,
    10388300.0,
    7755600.0,
    9418900.0,
    8440400.0,
    7315400.0,
    10301300.0,
    9195500.0,
    13959700.0,
    10291100.0,
    9712000.0,
    6998500.0,
    7679400.0,
    7765400.0,
    11959400.0,
    9130000.0,
    8299600.0,
    8391700.0,
    7329200.0,
    5522200.0,
    6364200.0,
    5733000.0,
    4823800.0,
    5420600.0,
    4352600.0,
    6061200.0,
    6778200.0,
    7404100.0,
    6371600.0,
    6566300.0,
    12131800.0,
    8832900.0,
    10996500.0,
    8918400.0,
    5989400.0,
    7163700.0,
    15029400.0,
    23497700.0,
    11682500.0,
    12861400.0,
    8440100.0,
    5995900.0,
    8164600.0,
    6806000.0,
    5955600.0,
    7613000.0,
    7687300.0,
    7388000.0,
    6957600.0,
    8640200.0,
    11318800.0,
    11332500.0,
    11110400.0,
    11251300.0,
    10283500.0,
    14336700.0,
    20052100.0,
    29120400.0,
    17803900.0,
    18661200.0,
    17006100.0,
    11998700.0,
    12459300.0,
    7679600.0,
    10181800.0,
    7618400.0,
    7298400.0,
    8982000.0,
    7919200.0,
    10781400.0,
    10322700.0,
    8279400.0,
    6453800.0,
    7994700.0,
    8942300.0,
    5840000.0,
    8190200.0,
    7842200.0,
    7286000.0,
    4151600.0,
    6273300.0,
    5961400.0,
    7276600.0,
    6220000.0,
    7620100.0,
    5482500.0,
    7961500.0,
    8203600.0,
    5983200.0,
    5295200.0,
    7160300.0,
    5238300.0,
    11338800.0,
    7836500.0,
    9930000.0,
    12931100.0,
    14734000.0,
    14902900.0,
    18703300.0,
    13436300.0,
    12989700.0,
    9241000.0,
    8366000.0,
    10330400.0,
    10506900.0,
    12647300.0,
    7194500.0,
    6752000.0,
    9977900.0,
    10614900.0,
    9177200.0,
    9275500.0,
    8551700.0,
    8679600.0,
    6291800.0,
    8534800.0,
    9801200.0,
    21581700.0,
    37172700.0,
    15803000.0,
    12113600.0,
    13113100.0,
    11774200.0,
    11195600.0,
    9579200.0,
    8452700.0,
    9119000.0,
    9237500.0,
    9561500.0,
    11108900.0,
    9901400.0,
    10014900.0,
    11166100.0,
    11694300.0,
    8694400.0,
    8726300.0,
    5845700.0,
    9025300.0,
    7620000.0,
    8929900.0,
    7586600.0,
    8646700.0,
    16957300.0,
    9786300.0,
    8997500.0,
    9021000.0,
    10602100.0,
    8803900.0,
    6880100.0,
    6703600.0,
    8652600.0,
    9972100.0,
    7769000.0,
    8924900.0,
    8285200.0,
    5744700.0,
    10268900.0,
    14879500.0,
    14940000.0,
    10953500.0,
    14333300.0,
    13048900.0,
    14463100.0,
    12213000.0,
    12208700.0,
    9063100.0,
    7195500.0,
    19580500.0,
    10820000.0,
    25947100.0,
    17184100.0,
    15246600.0,
    13325700.0,
    6305700.0,
    10488400.0,
    15081900.0,
    14595500.0,
    10141000.0,
    9937300.0,
    15383400.0,
    32909200.0,
    18153400.0,
    9712500.0,
    11647000.0,
    9050800.0,
    10591000.0,
    8908000.0,
    9434100.0,
    13411000.0,
    8056600.0,
    8835300.0,
    8272200.0,
    7190000.0,
    9002800.0,
    7641900.0,
    7096100.0,
    7241400.0,
    5994000.0,
    5889300.0,
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
     *     text: "DAL",
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