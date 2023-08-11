/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_STNE");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/12', 11.66, 12.06, 12.11, 11.48],
    ['2022/08/15', 11.87, 12.1, 12.23, 11.77],
    ['2022/08/16', 12.33, 11.79, 12.39, 11.62],
    ['2022/08/17', 11.55, 11.72, 11.96, 11.33],
    ['2022/08/18', 11.6, 11.66, 11.73, 11.31],
    ['2022/08/19', 9.76, 9.06, 9.87, 8.25],
    ['2022/08/22', 8.51, 8.72, 9.09, 8.5],
    ['2022/08/23', 8.75, 9.35, 9.37, 8.53],
    ['2022/08/24', 9.39, 9.9, 10.2, 9.35],
    ['2022/08/25', 10.0, 9.99, 10.12, 9.79],
    ['2022/08/26', 9.93, 9.6, 10.24, 9.47],
    ['2022/08/29', 9.37, 9.54, 9.94, 9.35],
    ['2022/08/30', 9.8, 9.51, 9.96, 9.39],
    ['2022/08/31', 9.65, 9.48, 9.84, 9.26],
    ['2022/09/01', 9.38, 9.19, 9.4, 8.79],
    ['2022/09/02', 9.34, 8.9, 9.4, 8.82],
    ['2022/09/06', 8.51, 8.26, 8.52, 8.07],
    ['2022/09/07', 8.25, 8.76, 8.78, 8.15],
    ['2022/09/08', 8.55, 8.74, 8.75, 8.46],
    ['2022/09/09', 8.97, 9.45, 9.5, 8.97],
    ['2022/09/12', 9.58, 9.79, 9.92, 9.52],
    ['2022/09/13', 9.06, 9.28, 9.46, 8.92],
    ['2022/09/14', 9.27, 9.43, 9.45, 8.96],
    ['2022/09/15', 9.24, 9.48, 9.79, 9.18],
    ['2022/09/16', 9.14, 9.04, 9.29, 8.88],
    ['2022/09/19', 8.91, 9.38, 9.4, 8.86],
    ['2022/09/20', 9.23, 9.68, 9.77, 9.09],
    ['2022/09/21', 9.8, 9.94, 10.3, 9.55],
    ['2022/09/22', 9.88, 9.57, 10.03, 9.36],
    ['2022/09/23', 9.3, 9.27, 9.4, 8.99],
    ['2022/09/26', 9.17, 8.73, 9.57, 8.71],
    ['2022/09/27', 9.0, 9.1, 9.79, 8.95],
    ['2022/09/28', 9.17, 9.81, 9.92, 9.02],
    ['2022/09/29', 9.51, 9.07, 9.53, 8.86],
    ['2022/09/30', 8.97, 9.53, 9.74, 8.94],
    ['2022/10/03', 9.81, 10.55, 10.65, 9.61],
    ['2022/10/04', 11.05, 11.69, 11.73, 10.99],
    ['2022/10/05', 11.32, 11.75, 11.9, 11.18],
    ['2022/10/06', 11.72, 11.88, 12.25, 11.67],
    ['2022/10/07', 11.51, 11.64, 12.07, 11.39],
    ['2022/10/10', 11.69, 11.33, 11.82, 11.09],
    ['2022/10/11', 11.23, 10.61, 11.3, 10.41],
    ['2022/10/12', 10.64, 10.75, 10.8, 10.3],
    ['2022/10/13', 10.15, 10.77, 11.02, 9.94],
    ['2022/10/14', 11.06, 10.01, 11.17, 9.98],
    ['2022/10/17', 10.41, 10.69, 10.99, 10.39],
    ['2022/10/18', 11.13, 10.8, 11.35, 10.6],
    ['2022/10/19', 10.51, 10.42, 10.83, 10.39],
    ['2022/10/20', 10.42, 10.1, 10.71, 9.95],
    ['2022/10/21', 10.02, 10.42, 10.49, 9.84],
    ['2022/10/24', 10.39, 10.29, 10.41, 9.98],
    ['2022/10/25', 10.32, 10.45, 10.9, 10.32],
    ['2022/10/26', 10.25, 10.22, 10.79, 10.11],
    ['2022/10/27', 10.26, 9.89, 10.5, 9.81],
    ['2022/10/28', 9.86, 10.17, 10.17, 9.63],
    ['2022/10/31', 10.09, 10.5, 10.51, 9.95],
    ['2022/11/01', 10.87, 11.01, 11.11, 10.65],
    ['2022/11/02', 10.96, 10.49, 11.14, 10.48],
    ['2022/11/03', 10.25, 12.04, 12.16, 10.21],
    ['2022/11/04', 11.99, 10.81, 12.1, 10.69],
    ['2022/11/07', 10.93, 10.7, 10.95, 10.43],
    ['2022/11/08', 10.69, 10.75, 11.22, 10.58],
    ['2022/11/09', 10.5, 10.23, 10.54, 10.23],
    ['2022/11/10', 10.97, 10.22, 11.21, 10.19],
    ['2022/11/11', 10.34, 11.05, 11.32, 10.31],
    ['2022/11/14', 10.92, 10.95, 11.27, 10.72],
    ['2022/11/15', 11.39, 11.39, 11.67, 11.1],
    ['2022/11/16', 11.15, 10.47, 11.24, 10.41],
    ['2022/11/17', 10.12, 9.87, 10.29, 9.75],
    ['2022/11/18', 11.33, 11.53, 11.76, 10.96],
    ['2022/11/21', 11.41, 11.18, 11.75, 10.89],
    ['2022/11/22', 11.11, 11.24, 11.41, 10.73],
    ['2022/11/23', 11.09, 10.44, 11.2, 10.24],
    ['2022/11/25', 10.35, 10.31, 10.41, 10.09],
    ['2022/11/28', 10.77, 10.58, 11.05, 10.5],
    ['2022/11/29', 10.65, 10.92, 11.09, 10.65],
    ['2022/11/30', 11.04, 11.68, 11.72, 10.99],
    ['2022/12/01', 11.97, 11.75, 12.29, 11.55],
    ['2022/12/02', 11.49, 11.91, 11.98, 11.42],
    ['2022/12/05', 11.82, 11.27, 11.98, 11.11],
    ['2022/12/06', 11.31, 10.96, 11.42, 10.78],
    ['2022/12/07', 10.66, 10.27, 10.66, 10.01],
    ['2022/12/08', 10.4, 10.28, 10.73, 10.22],
    ['2022/12/09', 10.2, 9.86, 10.22, 9.78],
    ['2022/12/12', 9.81, 9.5, 9.82, 9.23],
    ['2022/12/13', 9.98, 9.41, 10.28, 9.39],
    ['2022/12/14', 9.45, 9.52, 9.73, 9.09],
    ['2022/12/15', 9.34, 9.16, 9.4, 9.09],
    ['2022/12/16', 9.04, 8.99, 9.31, 8.88],
    ['2022/12/19', 8.96, 9.3, 9.36, 8.82],
    ['2022/12/20', 9.3, 9.26, 9.52, 9.17],
    ['2022/12/21', 9.33, 9.47, 9.52, 9.12],
    ['2022/12/22', 9.38, 9.24, 9.38, 8.87],
    ['2022/12/23', 9.27, 9.6, 9.78, 9.27],
    ['2022/12/27', 9.54, 9.14, 9.55, 9.07],
    ['2022/12/28', 9.08, 9.17, 9.21, 8.85],
    ['2022/12/29', 9.27, 9.5, 9.52, 9.09],
    ['2022/12/30', 9.32, 9.44, 9.49, 9.23],
    ['2023/01/03', 9.47, 8.47, 9.59, 8.42],
    ['2023/01/04', 8.58, 8.76, 8.96, 8.48],
    ['2023/01/05', 8.6, 9.01, 9.04, 8.47],
    ['2023/01/06', 9.03, 9.29, 9.45, 8.72],
    ['2023/01/09', 9.44, 9.33, 9.49, 9.22],
    ['2023/01/10', 9.33, 9.6, 9.7, 9.31],
    ['2023/01/11', 9.63, 9.91, 9.93, 9.44],
    ['2023/01/12', 10.0, 9.99, 10.05, 9.34],
    ['2023/01/13', 9.87, 9.68, 9.88, 9.57],
    ['2023/01/17', 9.7, 9.73, 10.13, 9.41],
    ['2023/01/18', 9.85, 9.76, 10.08, 9.53],
    ['2023/01/19', 9.54, 9.62, 9.68, 9.39],
    ['2023/01/20', 9.72, 9.76, 9.88, 9.41],
    ['2023/01/23', 9.85, 10.15, 10.4, 9.72],
    ['2023/01/24', 10.1, 10.67, 10.81, 9.97],
    ['2023/01/25', 10.62, 11.19, 11.22, 10.43],
    ['2023/01/26', 11.42, 11.6, 11.64, 11.21],
    ['2023/01/27', 11.54, 11.53, 11.77, 11.43],
    ['2023/01/30', 11.3, 11.13, 11.37, 10.96],
    ['2023/01/31', 11.15, 11.16, 11.52, 11.1],
    ['2023/02/01', 11.21, 11.35, 11.4, 10.79],
    ['2023/02/02', 11.75, 11.47, 11.86, 11.32],
    ['2023/02/03', 11.11, 10.7, 11.32, 10.64],
    ['2023/02/06', 10.51, 10.17, 10.7, 10.12],
    ['2023/02/07', 10.16, 10.2, 10.3, 9.93],
    ['2023/02/08', 10.15, 10.15, 10.46, 9.94],
    ['2023/02/09', 10.25, 9.89, 10.33, 9.68],
    ['2023/02/10', 9.79, 9.62, 9.86, 9.52],
    ['2023/02/13', 9.63, 9.64, 9.91, 9.5],
    ['2023/02/14', 9.54, 9.76, 9.98, 9.41],
    ['2023/02/15', 9.71, 10.09, 10.12, 9.63],
    ['2023/02/16', 9.83, 9.72, 10.09, 9.67],
    ['2023/02/17', 9.59, 9.29, 9.63, 9.2],
    ['2023/02/21', 9.16, 9.07, 9.28, 9.02],
    ['2023/02/22', 9.11, 9.07, 9.3, 9.01],
    ['2023/02/23', 9.18, 8.96, 9.24, 8.88],
    ['2023/02/24', 8.8, 8.65, 8.89, 8.58],
    ['2023/02/27', 8.8, 8.69, 8.82, 8.61],
    ['2023/02/28', 8.68, 8.51, 8.78, 8.5],
    ['2023/03/01', 8.6, 8.4, 8.66, 8.27],
    ['2023/03/02', 8.27, 8.24, 8.41, 8.13],
    ['2023/03/03', 8.35, 8.51, 8.7, 8.31],
    ['2023/03/06', 8.59, 9.11, 9.21, 8.55],
    ['2023/03/07', 9.04, 9.1, 9.24, 8.91],
    ['2023/03/08', 9.2, 9.57, 9.63, 9.17],
    ['2023/03/09', 9.51, 8.92, 9.6, 8.92],
    ['2023/03/10', 8.89, 8.72, 9.0, 8.55],
    ['2023/03/13', 8.49, 8.59, 8.83, 8.09],
    ['2023/03/14', 8.92, 9.09, 9.42, 8.87],
    ['2023/03/15', 8.88, 9.2, 9.84, 8.84],
    ['2023/03/16', 9.2, 9.41, 9.42, 8.89],
    ['2023/03/17', 9.41, 8.87, 9.45, 8.63],
    ['2023/03/20', 8.79, 8.93, 9.14, 8.67],
    ['2023/03/21', 9.08, 9.57, 9.68, 9.02],
    ['2023/03/22', 9.59, 9.15, 9.6, 9.14],
    ['2023/03/23', 9.2, 8.83, 9.37, 8.63],
    ['2023/03/24', 8.75, 8.94, 8.98, 8.69],
    ['2023/03/27', 9.11, 9.18, 9.31, 9.0],
    ['2023/03/28', 9.25, 9.23, 9.42, 9.12],
    ['2023/03/29', 9.38, 9.45, 9.5, 9.22],
    ['2023/03/30', 9.59, 9.48, 9.79, 9.38],
    ['2023/03/31', 9.49, 9.54, 9.77, 9.4],
    ['2023/04/03', 9.5, 9.23, 9.62, 9.15],
    ['2023/04/04', 9.31, 8.95, 9.38, 8.9],
    ['2023/04/05', 8.84, 8.97, 9.03, 8.73],
    ['2023/04/06', 8.9, 8.95, 9.02, 8.81],
    ['2023/04/10', 8.86, 9.07, 9.14, 8.73],
    ['2023/04/11', 9.28, 10.18, 10.37, 9.27],
    ['2023/04/12', 10.35, 10.51, 10.86, 10.28],
    ['2023/04/13', 10.6, 11.39, 11.6, 10.53],
    ['2023/04/14', 11.37, 11.84, 11.88, 11.31],
    ['2023/04/17', 11.85, 11.41, 11.87, 11.41],
    ['2023/04/18', 11.44, 11.64, 11.66, 11.26],
    ['2023/04/19', 11.44, 11.3, 11.65, 11.01],
    ['2023/04/20', 11.15, 11.6, 11.68, 11.05],
    ['2023/04/21', 11.58, 11.74, 11.75, 11.41],
    ['2023/04/24', 11.73, 11.73, 12.1, 11.68],
    ['2023/04/25', 11.48, 11.8, 12.02, 11.41],
    ['2023/04/26', 11.88, 11.72, 12.09, 11.69],
    ['2023/04/27', 11.9, 11.8, 12.16, 11.51],
    ['2023/04/28', 11.72, 12.32, 12.53, 11.68],
    ['2023/05/01', 12.32, 12.44, 12.51, 12.19],
    ['2023/05/02', 12.4, 12.06, 12.4, 11.74],
    ['2023/05/03', 12.19, 12.21, 12.5, 12.02],
    ['2023/05/04', 12.27, 12.68, 13.0, 12.22],
    ['2023/05/05', 12.83, 13.6, 13.65, 12.8],
    ['2023/05/08', 13.62, 13.81, 14.23, 13.62],
    ['2023/05/09', 13.66, 13.46, 13.89, 13.42],
    ['2023/05/10', 13.66, 13.4, 13.93, 13.09],
    ['2023/05/11', 13.39, 13.94, 14.07, 13.22],
    ['2023/05/12', 13.94, 13.81, 14.07, 13.52],
    ['2023/05/15', 13.85, 14.1, 14.41, 13.66],
    ['2023/05/16', 14.03, 14.02, 14.25, 13.83],
    ['2023/05/17', 14.02, 14.5, 14.6, 13.86],
    ['2023/05/18', 13.9, 13.62, 13.94, 13.05],
    ['2023/05/19', 13.73, 13.36, 14.06, 13.33],
    ['2023/05/22', 13.55, 13.79, 14.03, 13.38],
    ['2023/05/23', 13.77, 13.27, 14.11, 13.25],
    ['2023/05/24', 13.15, 12.66, 13.26, 12.58],
    ['2023/05/25', 12.77, 12.97, 13.16, 12.53],
    ['2023/05/26', 12.95, 12.26, 12.97, 12.13],
    ['2023/05/30', 12.37, 12.52, 12.67, 12.17],
    ['2023/05/31', 12.48, 12.53, 12.62, 12.23],
    ['2023/06/01', 12.45, 13.11, 13.36, 12.41],
    ['2023/06/02', 13.3, 12.99, 13.43, 12.88],
    ['2023/06/05', 12.92, 12.77, 12.98, 12.58],
    ['2023/06/06', 12.73, 13.15, 13.24, 12.66],
    ['2023/06/07', 13.3, 12.88, 13.57, 12.74],
    ['2023/06/08', 12.88, 12.78, 13.13, 12.72],
    ['2023/06/09', 12.91, 12.7, 12.97, 12.58],
    ['2023/06/12', 12.79, 13.25, 13.32, 12.68],
    ['2023/06/13', 13.85, 13.54, 14.0, 13.33],
    ['2023/06/14', 13.52, 13.07, 13.62, 13.04],
    ['2023/06/15', 13.04, 13.21, 13.41, 12.38],
    ['2023/06/16', 13.35, 13.52, 13.77, 13.18],
    ['2023/06/20', 13.41, 14.19, 14.29, 13.24],
    ['2023/06/21', 14.19, 14.22, 14.3, 13.66],
    ['2023/06/22', 14.03, 13.57, 14.24, 13.56],
    ['2023/06/23', 13.41, 13.55, 13.87, 13.32],
    ['2023/06/26', 13.5, 12.8, 13.71, 12.62],
    ['2023/06/27', 12.91, 12.81, 12.99, 12.63],
    ['2023/06/28', 12.71, 12.75, 13.0, 12.47],
    ['2023/06/29', 12.91, 12.47, 12.91, 12.37],
    ['2023/06/30', 12.61, 12.74, 12.95, 12.61],
    ['2023/07/03', 12.77, 12.66, 12.77, 12.41],
    ['2023/07/05', 12.46, 11.98, 12.5, 11.86],
    ['2023/07/06', 11.75, 11.33, 11.8, 11.18],
    ['2023/07/07', 11.33, 11.31, 11.65, 11.28],
    ['2023/07/10', 11.21, 11.41, 11.58, 11.08],
    ['2023/07/11', 11.38, 11.39, 11.5, 11.21],
    ['2023/07/12', 11.7, 12.27, 12.42, 11.65],
    ['2023/07/13', 12.35, 12.85, 13.09, 12.33],
    ['2023/07/14', 12.86, 12.17, 12.93, 12.11],
    ['2023/07/17', 12.23, 12.43, 12.5, 12.06],
    ['2023/07/18', 12.45, 12.33, 12.64, 12.2],
    ['2023/07/19', 12.43, 12.17, 12.54, 12.13],
    ['2023/07/20', 12.06, 12.44, 12.52, 12.03],
    ['2023/07/21', 12.56, 13.09, 13.22, 12.48],
    ['2023/07/24', 13.2, 13.41, 13.75, 12.93],
    ['2023/07/25', 13.53, 13.29, 13.82, 13.23],
    ['2023/07/26', 13.4, 13.44, 13.68, 13.12],
    ['2023/07/27', 13.6, 13.26, 13.76, 13.1],
    ['2023/07/28', 13.45, 13.81, 13.9, 13.27],
    ['2023/07/31', 14.16, 14.49, 14.69, 13.95],
    ['2023/08/01', 14.35, 14.65, 14.83, 14.32],
    ['2023/08/02', 14.25, 13.6, 14.3, 13.33],
    ['2023/08/03', 13.92, 13.83, 14.36, 13.78],
    ['2023/08/04', 13.9, 13.49, 14.07, 13.46],
    ['2023/08/07', 13.5, 14.13, 14.17, 13.4],
    ['2023/08/08', 13.74, 13.77, 13.79, 13.43],
    ['2023/08/09', 13.81, 13.63, 13.96, 13.41],
    ['2023/08/10', 13.85, 13.68, 14.11, 13.54],
]);
var volumes = [
    5434000.0,
    4748400.0,
    8304200.0,
    6016000.0,
    8566600.0,
    33897000.0,
    9513300.0,
    8440100.0,
    7806300.0,
    5674500.0,
    7025400.0,
    4143400.0,
    4216600.0,
    4490800.0,
    5494600.0,
    5558600.0,
    8212200.0,
    4832300.0,
    3703900.0,
    5247900.0,
    3928300.0,
    4845200.0,
    3128700.0,
    3163300.0,
    7926900.0,
    4664500.0,
    7812100.0,
    7713400.0,
    8478500.0,
    4869500.0,
    8952800.0,
    8598300.0,
    6346100.0,
    8730400.0,
    8242200.0,
    9247800.0,
    8268300.0,
    5478000.0,
    4588600.0,
    7225500.0,
    5172900.0,
    6768900.0,
    4270200.0,
    6988300.0,
    5401600.0,
    4637800.0,
    4182400.0,
    3498400.0,
    5192900.0,
    5618700.0,
    3590800.0,
    3669500.0,
    5135600.0,
    5623600.0,
    6243800.0,
    4580500.0,
    3114700.0,
    5414500.0,
    12149300.0,
    11433200.0,
    4298200.0,
    4857800.0,
    3430900.0,
    8625600.0,
    6931400.0,
    4596200.0,
    5177300.0,
    7804100.0,
    9739900.0,
    16937100.0,
    6402200.0,
    4458400.0,
    10255800.0,
    3464900.0,
    4239400.0,
    3586800.0,
    7279700.0,
    9848200.0,
    5113300.0,
    4878800.0,
    4672800.0,
    7027200.0,
    7060300.0,
    6838700.0,
    9969200.0,
    7224800.0,
    7820900.0,
    4092000.0,
    5433600.0,
    4537000.0,
    4873900.0,
    4516200.0,
    6407500.0,
    4592200.0,
    2390400.0,
    3573900.0,
    2291100.0,
    2713500.0,
    9879300.0,
    5143600.0,
    4559600.0,
    5085700.0,
    2640800.0,
    2935300.0,
    2988500.0,
    5356500.0,
    3320100.0,
    4236700.0,
    3524400.0,
    2102000.0,
    3430200.0,
    7293900.0,
    4535500.0,
    4358600.0,
    6154600.0,
    3905700.0,
    2898200.0,
    3833800.0,
    4772700.0,
    8208100.0,
    4801300.0,
    4711700.0,
    3608200.0,
    3435600.0,
    5797000.0,
    3787400.0,
    2610500.0,
    3514700.0,
    3168900.0,
    3817500.0,
    4098900.0,
    7114900.0,
    3640300.0,
    3753600.0,
    4165300.0,
    4130200.0,
    4992300.0,
    7966200.0,
    6010800.0,
    9209400.0,
    6137600.0,
    4373500.0,
    5432400.0,
    6299700.0,
    4865800.0,
    5801400.0,
    9835300.0,
    15941900.0,
    8053700.0,
    9984400.0,
    6907800.0,
    5813500.0,
    3876100.0,
    5806400.0,
    3261400.0,
    3638600.0,
    2998700.0,
    2943700.0,
    5938700.0,
    6696100.0,
    3608300.0,
    4526000.0,
    4925700.0,
    3585200.0,
    2756400.0,
    13618300.0,
    10746600.0,
    10747700.0,
    8116400.0,
    5664200.0,
    4854500.0,
    4425300.0,
    5224000.0,
    4157700.0,
    7907200.0,
    6473100.0,
    4170100.0,
    3548600.0,
    5119600.0,
    2631600.0,
    3622000.0,
    3021500.0,
    5991700.0,
    7051000.0,
    7330600.0,
    3393500.0,
    5653100.0,
    3782900.0,
    3452100.0,
    4442600.0,
    4807800.0,
    7955800.0,
    13237400.0,
    4883300.0,
    5601700.0,
    4126700.0,
    4594600.0,
    4384500.0,
    7444300.0,
    5152600.0,
    4841800.0,
    6249000.0,
    4144300.0,
    2843300.0,
    3080300.0,
    6853200.0,
    3465700.0,
    2499500.0,
    4775400.0,
    4508100.0,
    8457600.0,
    5138500.0,
    5050500.0,
    7061300.0,
    4700500.0,
    6044200.0,
    7063800.0,
    6091800.0,
    3365700.0,
    3479000.0,
    4190500.0,
    3183200.0,
    2200900.0,
    9572900.0,
    5243100.0,
    4278300.0,
    3760700.0,
    2672700.0,
    6685600.0,
    6244700.0,
    5330800.0,
    3082400.0,
    2546100.0,
    3344100.0,
    2847700.0,
    5483800.0,
    5827500.0,
    4072900.0,
    3011400.0,
    4184300.0,
    4308300.0,
    6922000.0,
    4336000.0,
    6193200.0,
    6262600.0,
    4162600.0,
    3636700.0,
    2948400.0,
    2950700.0,
    5451500.0,
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
     *     text: "STNE",
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