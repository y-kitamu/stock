/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_FTNT");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/03', 61.19, 62.88, 63.16, 60.83],
    ['2022/08/04', 56.83, 52.61, 56.96, 52.0],
    ['2022/08/05', 52.0, 53.39, 53.45, 51.24],
    ['2022/08/08', 53.52, 53.32, 54.37, 53.17],
    ['2022/08/09', 52.91, 52.19, 53.36, 51.9],
    ['2022/08/10', 54.04, 53.89, 54.32, 53.34],
    ['2022/08/11', 54.29, 52.52, 54.87, 52.41],
    ['2022/08/12', 53.07, 54.29, 54.41, 52.79],
    ['2022/08/15', 53.9, 54.08, 54.53, 53.76],
    ['2022/08/16', 53.84, 52.94, 54.27, 52.32],
    ['2022/08/17', 52.33, 51.93, 52.64, 51.63],
    ['2022/08/18', 52.07, 52.27, 52.56, 51.82],
    ['2022/08/19', 51.87, 51.29, 52.16, 51.07],
    ['2022/08/22', 50.28, 50.32, 50.79, 49.71],
    ['2022/08/23', 50.91, 50.59, 52.32, 50.51],
    ['2022/08/24', 50.74, 50.16, 50.9, 49.98],
    ['2022/08/25', 50.67, 50.87, 50.97, 50.18],
    ['2022/08/26', 51.22, 49.57, 51.22, 49.42],
    ['2022/08/29', 49.35, 48.69, 49.49, 48.57],
    ['2022/08/30', 49.19, 49.04, 49.36, 48.31],
    ['2022/08/31', 49.45, 48.69, 50.18, 48.49],
    ['2022/09/01', 48.04, 48.55, 48.6, 47.37],
    ['2022/09/02', 49.08, 48.6, 49.55, 48.34],
    ['2022/09/06', 48.68, 49.65, 49.94, 48.03],
    ['2022/09/07', 49.88, 50.45, 50.64, 49.29],
    ['2022/09/08', 50.21, 51.71, 51.84, 49.98],
    ['2022/09/09', 52.08, 53.59, 53.69, 52.08],
    ['2022/09/12', 53.78, 55.84, 55.94, 53.75],
    ['2022/09/13', 53.23, 51.87, 53.62, 51.8],
    ['2022/09/14', 52.25, 51.94, 52.32, 51.05],
    ['2022/09/15', 51.92, 50.82, 52.48, 50.54],
    ['2022/09/16', 50.19, 50.42, 50.64, 49.6],
    ['2022/09/19', 49.61, 50.74, 50.84, 49.61],
    ['2022/09/20', 50.33, 50.77, 51.1, 50.17],
    ['2022/09/21', 51.11, 49.8, 51.8, 49.76],
    ['2022/09/22', 49.51, 48.74, 50.17, 48.64],
    ['2022/09/23', 48.5, 48.59, 48.92, 47.95],
    ['2022/09/26', 48.77, 48.29, 49.54, 48.21],
    ['2022/09/27', 49.01, 48.5, 49.74, 47.87],
    ['2022/09/28', 48.94, 49.97, 50.23, 48.4],
    ['2022/09/29', 49.5, 49.63, 49.86, 48.49],
    ['2022/09/30', 49.59, 49.13, 50.59, 49.06],
    ['2022/10/03', 49.58, 50.96, 51.39, 49.33],
    ['2022/10/04', 52.27, 52.68, 53.08, 52.11],
    ['2022/10/05', 51.7, 53.59, 53.85, 51.69],
    ['2022/10/06', 53.79, 53.74, 54.75, 53.56],
    ['2022/10/07', 52.68, 51.47, 53.16, 50.95],
    ['2022/10/10', 53.31, 51.23, 53.84, 50.83],
    ['2022/10/11', 50.81, 48.58, 51.06, 48.29],
    ['2022/10/12', 48.81, 48.21, 48.95, 47.4],
    ['2022/10/13', 46.46, 49.2, 49.63, 45.74],
    ['2022/10/14', 50.06, 48.13, 50.27, 48.07],
    ['2022/10/17', 49.67, 50.46, 50.74, 49.67],
    ['2022/10/18', 52.19, 51.56, 52.75, 50.66],
    ['2022/10/19', 51.17, 51.79, 52.74, 51.09],
    ['2022/10/20', 52.02, 51.59, 53.13, 51.3],
    ['2022/10/21', 51.72, 53.75, 53.87, 50.94],
    ['2022/10/24', 54.34, 54.9, 55.5, 52.83],
    ['2022/10/25', 54.98, 55.92, 56.75, 54.98],
    ['2022/10/26', 55.09, 55.49, 57.25, 54.8],
    ['2022/10/27', 56.2, 56.01, 57.0, 55.51],
    ['2022/10/28', 56.36, 57.1, 57.16, 55.27],
    ['2022/10/31', 56.39, 57.16, 57.34, 55.9],
    ['2022/11/01', 57.86, 56.42, 58.29, 56.39],
    ['2022/11/02', 56.2, 53.23, 56.33, 53.09],
    ['2022/11/03', 45.55, 45.93, 47.34, 42.61],
    ['2022/11/04', 46.21, 47.1, 47.31, 45.15],
    ['2022/11/07', 47.22, 47.86, 48.27, 45.94],
    ['2022/11/08', 48.51, 50.6, 51.24, 48.15],
    ['2022/11/09', 50.25, 49.88, 50.52, 49.59],
    ['2022/11/10', 53.27, 54.39, 54.74, 52.78],
    ['2022/11/11', 54.0, 56.13, 56.23, 53.76],
    ['2022/11/14', 55.7, 55.52, 56.91, 54.8],
    ['2022/11/15', 56.9, 56.2, 57.39, 55.66],
    ['2022/11/16', 55.68, 54.69, 55.98, 54.51],
    ['2022/11/17', 53.46, 54.14, 54.54, 52.68],
    ['2022/11/18', 55.8, 52.15, 55.8, 51.26],
    ['2022/11/21', 51.56, 52.32, 52.59, 51.4],
    ['2022/11/22', 52.78, 52.28, 52.85, 51.22],
    ['2022/11/23', 52.25, 53.35, 53.58, 51.84],
    ['2022/11/25', 53.08, 52.91, 53.48, 52.87],
    ['2022/11/28', 52.97, 52.08, 53.24, 51.89],
    ['2022/11/29', 52.25, 51.59, 52.3, 50.84],
    ['2022/11/30', 51.23, 53.16, 53.19, 50.48],
    ['2022/12/01', 53.63, 55.38, 55.55, 53.35],
    ['2022/12/02', 54.11, 53.61, 54.36, 52.96],
    ['2022/12/05', 52.72, 51.67, 52.83, 51.14],
    ['2022/12/06', 51.77, 50.85, 51.89, 50.63],
    ['2022/12/07', 50.74, 51.6, 51.77, 50.37],
    ['2022/12/08', 51.92, 52.91, 53.39, 51.17],
    ['2022/12/09', 52.78, 52.13, 52.95, 51.88],
    ['2022/12/12', 52.46, 53.64, 54.06, 52.3],
    ['2022/12/13', 56.65, 54.71, 56.71, 53.81],
    ['2022/12/14', 55.01, 54.27, 55.8, 53.68],
    ['2022/12/15', 53.54, 52.17, 54.0, 52.01],
    ['2022/12/16', 51.54, 51.92, 52.5, 51.37],
    ['2022/12/19', 51.74, 49.98, 51.74, 49.67],
    ['2022/12/20', 49.52, 50.47, 50.73, 49.26],
    ['2022/12/21', 50.3, 50.01, 50.3, 47.04],
    ['2022/12/22', 49.64, 49.15, 49.99, 48.45],
    ['2022/12/23', 48.97, 48.73, 49.22, 48.29],
    ['2022/12/27', 48.44, 48.55, 49.23, 47.9],
    ['2022/12/28', 48.5, 47.86, 49.03, 47.8],
    ['2022/12/29', 48.1, 49.21, 49.37, 48.0],
    ['2022/12/30', 48.55, 48.89, 48.92, 48.15],
    ['2023/01/03', 49.53, 48.52, 50.25, 48.02],
    ['2023/01/04', 49.02, 48.3, 49.47, 47.96],
    ['2023/01/05', 47.77, 47.45, 48.18, 46.55],
    ['2023/01/06', 48.32, 48.69, 48.86, 47.08],
    ['2023/01/09', 49.41, 49.41, 50.67, 49.3],
    ['2023/01/10', 49.12, 48.42, 50.15, 48.1],
    ['2023/01/11', 48.84, 48.8, 49.06, 48.15],
    ['2023/01/12', 48.13, 48.4, 48.64, 47.19],
    ['2023/01/13', 46.25, 48.87, 49.04, 45.88],
    ['2023/01/17', 48.76, 50.1, 50.45, 48.43],
    ['2023/01/18', 50.68, 48.38, 51.52, 48.31],
    ['2023/01/19', 48.11, 48.42, 49.02, 47.78],
    ['2023/01/20', 48.55, 49.27, 49.36, 48.5],
    ['2023/01/23', 49.27, 50.51, 50.55, 48.89],
    ['2023/01/24', 50.47, 51.09, 51.45, 50.1],
    ['2023/01/25', 50.21, 51.76, 51.91, 49.43],
    ['2023/01/26', 53.33, 53.21, 54.57, 51.94],
    ['2023/01/27', 51.9, 52.7, 53.13, 51.71],
    ['2023/01/30', 52.34, 51.05, 52.41, 50.92],
    ['2023/01/31', 51.09, 52.34, 52.53, 50.92],
    ['2023/02/01', 52.15, 53.09, 53.59, 51.42],
    ['2023/02/02', 53.01, 53.85, 54.33, 53.0],
    ['2023/02/03', 52.87, 53.0, 53.74, 52.54],
    ['2023/02/06', 52.47, 51.99, 53.47, 51.88],
    ['2023/02/07', 52.55, 53.78, 54.19, 51.79],
    ['2023/02/08', 60.75, 59.64, 61.45, 58.72],
    ['2023/02/09', 60.76, 57.82, 60.83, 57.65],
    ['2023/02/10', 57.42, 59.61, 59.69, 57.1],
    ['2023/02/13', 59.76, 60.15, 60.46, 59.33],
    ['2023/02/14', 60.15, 61.19, 61.5, 59.88],
    ['2023/02/15', 60.99, 62.81, 63.02, 60.71],
    ['2023/02/16', 62.0, 61.39, 62.61, 61.23],
    ['2023/02/17', 60.87, 60.64, 61.3, 60.29],
    ['2023/02/21', 59.79, 59.71, 60.37, 59.3],
    ['2023/02/22', 60.6, 60.21, 61.25, 59.77],
    ['2023/02/23', 60.61, 60.58, 60.79, 59.34],
    ['2023/02/24', 59.39, 58.86, 59.85, 58.57],
    ['2023/02/27', 59.68, 59.62, 60.14, 59.38],
    ['2023/02/28', 59.63, 59.44, 60.09, 59.08],
    ['2023/03/01', 59.54, 58.44, 59.54, 58.3],
    ['2023/03/02', 58.41, 59.64, 60.04, 58.16],
    ['2023/03/03', 59.68, 60.84, 60.9, 59.53],
    ['2023/03/06', 61.11, 61.31, 61.76, 60.66],
    ['2023/03/07', 61.0, 60.37, 61.99, 60.11],
    ['2023/03/08', 60.66, 61.79, 61.99, 59.75],
    ['2023/03/09', 61.46, 59.95, 62.08, 59.86],
    ['2023/03/10', 60.02, 58.76, 60.47, 58.6],
    ['2023/03/13', 58.22, 59.27, 60.17, 57.63],
    ['2023/03/14', 60.35, 60.89, 61.09, 59.89],
    ['2023/03/15', 60.61, 60.39, 61.22, 59.72],
    ['2023/03/16', 60.34, 61.88, 61.97, 59.9],
    ['2023/03/17', 61.72, 61.22, 62.47, 60.7],
    ['2023/03/20', 60.91, 61.54, 61.58, 60.76],
    ['2023/03/21', 61.75, 62.46, 62.61, 60.87],
    ['2023/03/22', 62.3, 61.21, 63.2, 61.17],
    ['2023/03/23', 62.1, 63.25, 63.95, 62.0],
    ['2023/03/24', 62.92, 62.99, 63.25, 62.02],
    ['2023/03/27', 63.26, 63.98, 64.33, 63.17],
    ['2023/03/28', 63.73, 64.27, 64.6, 63.51],
    ['2023/03/29', 65.04, 64.81, 65.1, 64.36],
    ['2023/03/30', 65.2, 65.81, 65.88, 65.09],
    ['2023/03/31', 66.02, 66.46, 66.57, 65.55],
    ['2023/04/03', 65.82, 66.31, 66.38, 65.65],
    ['2023/04/04', 66.57, 65.97, 66.72, 65.53],
    ['2023/04/05', 65.68, 65.15, 66.26, 64.71],
    ['2023/04/06', 64.75, 65.52, 65.58, 64.26],
    ['2023/04/10', 64.8, 66.91, 67.44, 64.65],
    ['2023/04/11', 66.71, 67.0, 67.64, 66.55],
    ['2023/04/12', 67.57, 67.19, 68.18, 66.96],
    ['2023/04/13', 67.67, 68.39, 68.85, 67.51],
    ['2023/04/14', 68.27, 68.07, 69.07, 67.42],
    ['2023/04/17', 68.36, 67.71, 68.77, 67.07],
    ['2023/04/18', 68.51, 67.82, 68.7, 67.55],
    ['2023/04/19', 67.37, 67.32, 67.51, 66.92],
    ['2023/04/20', 66.84, 66.9, 67.63, 66.53],
    ['2023/04/21', 67.32, 66.78, 67.32, 66.51],
    ['2023/04/24', 67.08, 66.25, 67.21, 65.7],
    ['2023/04/25', 65.36, 63.17, 65.93, 63.1],
    ['2023/04/26', 63.27, 63.4, 64.13, 63.09],
    ['2023/04/27', 64.08, 63.06, 64.2, 62.33],
    ['2023/04/28', 62.67, 63.05, 63.08, 61.73],
    ['2023/05/01', 62.3, 62.81, 63.3, 61.66],
    ['2023/05/02', 62.6, 61.44, 62.83, 61.01],
    ['2023/05/03', 61.64, 60.49, 61.7, 60.33],
    ['2023/05/04', 61.29, 61.18, 61.61, 60.37],
    ['2023/05/05', 60.75, 64.59, 65.45, 60.5],
    ['2023/05/08', 65.74, 66.08, 66.48, 64.6],
    ['2023/05/09', 66.46, 66.4, 67.0, 66.06],
    ['2023/05/10', 66.97, 67.01, 67.8, 66.54],
    ['2023/05/11', 67.29, 67.5, 67.76, 66.96],
    ['2023/05/12', 67.68, 67.77, 68.18, 66.96],
    ['2023/05/15', 67.68, 68.56, 68.78, 67.46],
    ['2023/05/16', 68.49, 68.31, 68.97, 68.22],
    ['2023/05/17', 68.4, 68.43, 68.99, 67.64],
    ['2023/05/18', 68.68, 68.14, 68.76, 67.75],
    ['2023/05/19', 68.5, 69.63, 69.68, 68.19],
    ['2023/05/22', 69.75, 69.52, 71.29, 69.47],
    ['2023/05/23', 69.37, 68.09, 69.46, 67.46],
    ['2023/05/24', 68.5, 66.59, 69.46, 66.01],
    ['2023/05/25', 66.89, 67.17, 67.88, 64.46],
    ['2023/05/26', 67.36, 67.77, 68.82, 67.3],
    ['2023/05/30', 68.11, 68.54, 69.1, 67.41],
    ['2023/05/31', 68.34, 68.33, 69.27, 67.86],
    ['2023/06/01', 67.64, 68.64, 69.11, 66.93],
    ['2023/06/02', 68.64, 68.13, 69.37, 67.85],
    ['2023/06/05', 67.98, 71.27, 71.63, 67.95],
    ['2023/06/06', 71.35, 69.54, 71.38, 68.84],
    ['2023/06/07', 69.54, 67.06, 69.93, 66.84],
    ['2023/06/08', 67.07, 69.0, 69.35, 67.02],
    ['2023/06/09', 68.95, 68.01, 69.8, 67.01],
    ['2023/06/12', 68.2, 69.84, 69.98, 68.13],
    ['2023/06/13', 70.5, 70.49, 70.75, 69.36],
    ['2023/06/14', 70.07, 71.48, 71.59, 69.7],
    ['2023/06/15', 71.29, 73.59, 73.85, 71.15],
    ['2023/06/16', 74.46, 72.78, 74.77, 72.37],
    ['2023/06/20', 72.45, 71.66, 72.77, 70.92],
    ['2023/06/21', 71.66, 71.11, 71.84, 70.58],
    ['2023/06/22', 71.11, 71.86, 72.24, 70.81],
    ['2023/06/23', 71.11, 71.59, 71.76, 70.15],
    ['2023/06/26', 71.69, 71.06, 72.72, 70.9],
    ['2023/06/27', 71.64, 73.66, 73.89, 71.55],
    ['2023/06/28', 73.49, 74.33, 74.93, 72.95],
    ['2023/06/29', 74.54, 75.09, 75.3, 73.9],
    ['2023/06/30', 75.55, 75.59, 76.27, 75.26],
    ['2023/07/03', 75.3, 74.66, 75.36, 73.65],
    ['2023/07/05', 74.42, 74.31, 74.71, 74.01],
    ['2023/07/06', 73.84, 74.65, 74.77, 72.45],
    ['2023/07/07', 74.41, 74.68, 75.46, 73.99],
    ['2023/07/10', 74.79, 77.86, 78.66, 74.79],
    ['2023/07/11', 78.61, 78.32, 78.63, 77.22],
    ['2023/07/12', 78.87, 76.72, 79.03, 75.51],
    ['2023/07/13', 77.4, 78.25, 78.29, 76.73],
    ['2023/07/14', 78.55, 78.92, 80.03, 78.34],
    ['2023/07/17', 78.72, 80.28, 80.6, 78.58],
    ['2023/07/18', 79.96, 80.24, 80.44, 79.16],
    ['2023/07/19', 80.45, 78.69, 81.24, 78.3],
    ['2023/07/20', 78.67, 77.7, 79.37, 77.53],
    ['2023/07/21', 78.37, 78.16, 79.14, 78.06],
    ['2023/07/24', 78.69, 77.27, 78.82, 76.32],
    ['2023/07/25', 77.73, 78.34, 78.62, 77.41],
    ['2023/07/26', 77.56, 77.26, 78.75, 76.86],
    ['2023/07/27', 78.39, 76.58, 78.52, 76.31],
    ['2023/07/28', 77.24, 76.8, 77.63, 76.15],
    ['2023/07/31', 77.09, 77.72, 77.75, 76.79],
    ['2023/08/01', 77.64, 78.03, 78.58, 76.91],
    ['2023/08/02', 77.24, 74.32, 77.24, 74.01],
]);
var volumes = [
    6500500.0,
    19687500.0,
    11779800.0,
    6171000.0,
    4391000.0,
    6173500.0,
    5496400.0,
    5007700.0,
    3109700.0,
    4902300.0,
    4814200.0,
    3793700.0,
    4369400.0,
    6160800.0,
    6809900.0,
    3366000.0,
    4258900.0,
    7008600.0,
    5837100.0,
    6129900.0,
    5860000.0,
    5723800.0,
    6405100.0,
    7441800.0,
    5120600.0,
    4492200.0,
    5488200.0,
    7382400.0,
    7693700.0,
    4542200.0,
    6011900.0,
    10405500.0,
    3593400.0,
    3590100.0,
    4367600.0,
    4057600.0,
    4248100.0,
    3514600.0,
    4214800.0,
    3878500.0,
    3470000.0,
    4727200.0,
    5040400.0,
    3892400.0,
    3368100.0,
    4983300.0,
    5489900.0,
    6975000.0,
    6377600.0,
    4970400.0,
    5114200.0,
    4751700.0,
    5594600.0,
    5122000.0,
    4373800.0,
    4433500.0,
    5512200.0,
    5905900.0,
    5524300.0,
    5972700.0,
    4246200.0,
    3795400.0,
    5405900.0,
    4765900.0,
    9976900.0,
    16959800.0,
    9579800.0,
    6168100.0,
    7081000.0,
    4717300.0,
    7428200.0,
    6267100.0,
    5687800.0,
    4498100.0,
    4280700.0,
    5429300.0,
    6357000.0,
    3731600.0,
    4935600.0,
    2997200.0,
    2117800.0,
    3905800.0,
    5729100.0,
    11465700.0,
    4410200.0,
    4685400.0,
    3644100.0,
    3714300.0,
    3172400.0,
    4109000.0,
    3784700.0,
    3808500.0,
    4640600.0,
    3709400.0,
    4501600.0,
    14845300.0,
    4871600.0,
    4342100.0,
    6803100.0,
    4906400.0,
    2958800.0,
    2804500.0,
    2633100.0,
    2668100.0,
    2338900.0,
    4647500.0,
    4674800.0,
    6585100.0,
    5223700.0,
    4539700.0,
    5314100.0,
    4111100.0,
    4932500.0,
    6281700.0,
    5436600.0,
    4894800.0,
    4631900.0,
    5372900.0,
    5771300.0,
    4698000.0,
    5872700.0,
    6410600.0,
    5257100.0,
    5248800.0,
    6031300.0,
    9170600.0,
    6790000.0,
    5467600.0,
    4853600.0,
    9785500.0,
    18344600.0,
    9973100.0,
    5564400.0,
    4507500.0,
    5190100.0,
    5235100.0,
    4033900.0,
    3687200.0,
    4515500.0,
    5662900.0,
    4123800.0,
    3730400.0,
    3597100.0,
    3962300.0,
    3353000.0,
    3442100.0,
    3870900.0,
    2542900.0,
    5258100.0,
    5047400.0,
    4940400.0,
    4381600.0,
    4772300.0,
    3887400.0,
    3450400.0,
    3994000.0,
    8197000.0,
    4768300.0,
    3661900.0,
    2859400.0,
    4429700.0,
    3384500.0,
    5029800.0,
    3993200.0,
    4280300.0,
    3681600.0,
    5714900.0,
    3343000.0,
    3401900.0,
    3864900.0,
    2772200.0,
    5934700.0,
    3107900.0,
    3890200.0,
    4195300.0,
    4049500.0,
    3342300.0,
    3526700.0,
    2458400.0,
    2702500.0,
    2876500.0,
    2933600.0,
    5726600.0,
    3650200.0,
    5012000.0,
    5597600.0,
    3827300.0,
    5430000.0,
    6497300.0,
    5939300.0,
    9353100.0,
    5872800.0,
    4814400.0,
    4056000.0,
    4397000.0,
    3702900.0,
    4580000.0,
    3399100.0,
    3466300.0,
    4576200.0,
    4744700.0,
    4493100.0,
    5495400.0,
    9000600.0,
    8565600.0,
    5343700.0,
    4419600.0,
    6605100.0,
    4694400.0,
    4185800.0,
    8966800.0,
    5113000.0,
    5446400.0,
    4742700.0,
    4212700.0,
    5487200.0,
    4761600.0,
    4875400.0,
    5438000.0,
    10915700.0,
    4286100.0,
    7128100.0,
    3234000.0,
    14856000.0,
    3416400.0,
    4602500.0,
    5834400.0,
    6114400.0,
    4578400.0,
    2253900.0,
    3763800.0,
    4329100.0,
    4011700.0,
    8176700.0,
    4295200.0,
    6147900.0,
    4709500.0,
    4913400.0,
    4185300.0,
    4586200.0,
    5985000.0,
    3623900.0,
    12134100.0,
    3870200.0,
    3679000.0,
    3378500.0,
    3957700.0,
    3544400.0,
    3543600.0,
    2619600.0,
    5674300.0,
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
        text: "FTNT",
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