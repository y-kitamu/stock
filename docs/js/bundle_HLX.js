/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_HLX");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/03', 4.08, 3.97, 4.13, 3.92],
    ['2022/08/04', 3.92, 3.8, 4.0, 3.77],
    ['2022/08/05', 3.76, 3.99, 4.08, 3.74],
    ['2022/08/08', 3.93, 3.96, 4.0, 3.87],
    ['2022/08/09', 4.04, 3.98, 4.1, 3.96],
    ['2022/08/10', 4.04, 4.01, 4.04, 3.87],
    ['2022/08/11', 4.14, 4.11, 4.3, 4.09],
    ['2022/08/12', 4.08, 4.23, 4.24, 4.03],
    ['2022/08/15', 4.07, 4.11, 4.12, 3.91],
    ['2022/08/16', 4.12, 3.95, 4.17, 3.93],
    ['2022/08/17', 3.95, 3.94, 4.0, 3.88],
    ['2022/08/18', 3.99, 4.18, 4.2, 3.96],
    ['2022/08/19', 4.13, 4.1, 4.17, 4.06],
    ['2022/08/22', 4.05, 4.05, 4.14, 3.96],
    ['2022/08/23', 4.16, 4.27, 4.4, 4.16],
    ['2022/08/24', 4.28, 4.37, 4.42, 4.25],
    ['2022/08/25', 4.4, 4.49, 4.51, 4.35],
    ['2022/08/26', 4.49, 4.39, 4.54, 4.34],
    ['2022/08/29', 4.36, 4.58, 4.58, 4.36],
    ['2022/08/30', 4.47, 4.37, 4.47, 4.25],
    ['2022/08/31', 4.21, 4.32, 4.5, 4.18],
    ['2022/09/01', 4.21, 4.16, 4.28, 4.07],
    ['2022/09/02', 4.32, 4.44, 4.47, 4.24],
    ['2022/09/06', 4.44, 4.25, 4.55, 4.22],
    ['2022/09/07', 4.13, 4.24, 4.24, 4.07],
    ['2022/09/08', 4.23, 4.16, 4.29, 4.11],
    ['2022/09/09', 4.3, 4.4, 4.43, 4.27],
    ['2022/09/12', 4.4, 4.41, 4.46, 4.34],
    ['2022/09/13', 4.29, 4.32, 4.4, 4.13],
    ['2022/09/14', 4.34, 4.61, 4.62, 4.33],
    ['2022/09/15', 4.46, 4.54, 4.56, 4.29],
    ['2022/09/16', 4.48, 4.5, 4.61, 4.34],
    ['2022/09/19', 4.34, 4.48, 4.56, 4.32],
    ['2022/09/20', 4.43, 4.38, 4.47, 4.28],
    ['2022/09/21', 4.49, 4.26, 4.54, 4.26],
    ['2022/09/22', 4.32, 4.22, 4.43, 4.2],
    ['2022/09/23', 3.99, 3.73, 4.02, 3.7],
    ['2022/09/26', 3.67, 3.72, 3.81, 3.57],
    ['2022/09/27', 3.82, 3.66, 3.87, 3.65],
    ['2022/09/28', 3.73, 3.99, 4.02, 3.68],
    ['2022/09/29', 3.94, 3.93, 3.95, 3.8],
    ['2022/09/30', 3.88, 3.86, 3.99, 3.84],
    ['2022/10/03', 4.07, 4.12, 4.15, 3.99],
    ['2022/10/04', 4.21, 4.35, 4.37, 4.15],
    ['2022/10/05', 4.32, 4.39, 4.44, 4.26],
    ['2022/10/06', 4.36, 4.5, 4.54, 4.33],
    ['2022/10/07', 4.58, 4.5, 4.61, 4.46],
    ['2022/10/10', 4.53, 4.35, 4.59, 4.3],
    ['2022/10/11', 4.24, 4.31, 4.41, 4.18],
    ['2022/10/12', 4.27, 4.39, 4.45, 4.18],
    ['2022/10/13', 4.29, 4.46, 4.49, 4.23],
    ['2022/10/14', 4.41, 4.3, 4.41, 4.27],
    ['2022/10/17', 4.38, 4.37, 4.54, 4.32],
    ['2022/10/18', 4.42, 4.44, 4.51, 4.31],
    ['2022/10/19', 4.4, 4.57, 4.58, 4.4],
    ['2022/10/20', 4.62, 4.68, 4.74, 4.62],
    ['2022/10/21', 4.75, 4.74, 4.82, 4.64],
    ['2022/10/24', 4.72, 4.8, 4.8, 4.61],
    ['2022/10/25', 4.9, 5.18, 5.29, 4.9],
    ['2022/10/26', 5.49, 6.16, 6.23, 5.48],
    ['2022/10/27', 6.2, 6.33, 6.54, 6.14],
    ['2022/10/28', 6.37, 6.5, 6.56, 6.34],
    ['2022/10/31', 6.48, 7.0, 7.11, 6.45],
    ['2022/11/01', 7.15, 6.94, 7.18, 6.86],
    ['2022/11/02', 6.84, 6.77, 7.08, 6.73],
    ['2022/11/03', 6.66, 6.75, 6.84, 6.55],
    ['2022/11/04', 6.93, 6.84, 7.02, 6.77],
    ['2022/11/07', 6.94, 7.0, 7.14, 6.82],
    ['2022/11/08', 6.97, 6.85, 7.0, 6.77],
    ['2022/11/09', 6.68, 6.58, 6.82, 6.54],
    ['2022/11/10', 6.7, 6.74, 6.8, 6.58],
    ['2022/11/11', 6.91, 6.86, 6.99, 6.78],
    ['2022/11/14', 6.86, 6.73, 7.11, 6.72],
    ['2022/11/15', 6.8, 6.81, 6.83, 6.57],
    ['2022/11/16', 6.74, 6.67, 6.79, 6.63],
    ['2022/11/17', 6.53, 6.79, 6.8, 6.42],
    ['2022/11/18', 6.67, 6.66, 6.71, 6.49],
    ['2022/11/21', 6.46, 6.38, 6.57, 6.0],
    ['2022/11/22', 6.52, 6.53, 6.63, 6.41],
    ['2022/11/23', 6.36, 6.29, 6.4, 6.18],
    ['2022/11/25', 6.25, 6.26, 6.43, 6.22],
    ['2022/11/28', 6.04, 6.12, 6.27, 6.0],
    ['2022/11/29', 6.24, 6.3, 6.3, 6.14],
    ['2022/11/30', 6.41, 6.38, 6.47, 6.21],
    ['2022/12/01', 6.5, 6.42, 6.56, 6.4],
    ['2022/12/02', 6.32, 6.54, 6.56, 6.32],
    ['2022/12/05', 6.61, 6.18, 6.67, 6.1],
    ['2022/12/06', 6.18, 6.2, 6.33, 6.12],
    ['2022/12/07', 6.27, 5.97, 6.3, 5.9],
    ['2022/12/08', 6.18, 6.02, 6.26, 5.98],
    ['2022/12/09', 5.98, 5.79, 6.07, 5.78],
    ['2022/12/12', 5.84, 6.04, 6.08, 5.76],
    ['2022/12/13', 6.17, 6.22, 6.29, 6.11],
    ['2022/12/14', 6.25, 6.37, 6.45, 6.18],
    ['2022/12/15', 6.27, 6.2, 6.33, 6.07],
    ['2022/12/16', 6.0, 6.24, 6.26, 5.94],
    ['2022/12/19', 6.31, 6.17, 6.46, 6.07],
    ['2022/12/20', 6.19, 6.68, 6.71, 6.16],
    ['2022/12/21', 6.82, 6.78, 6.91, 6.65],
    ['2022/12/22', 6.79, 6.66, 6.82, 6.5],
    ['2022/12/23', 6.81, 7.08, 7.09, 6.77],
    ['2022/12/27', 7.15, 7.41, 7.48, 7.09],
    ['2022/12/28', 7.37, 6.97, 7.41, 6.79],
    ['2022/12/29', 6.94, 7.32, 7.4, 6.88],
    ['2022/12/30', 7.21, 7.38, 7.44, 7.18],
    ['2023/01/03', 7.36, 7.01, 7.43, 6.81],
    ['2023/01/04', 6.92, 6.95, 7.13, 6.86],
    ['2023/01/05', 6.95, 7.16, 7.19, 6.86],
    ['2023/01/06', 7.3, 7.26, 7.54, 7.21],
    ['2023/01/09', 7.48, 7.45, 7.62, 7.32],
    ['2023/01/10', 7.47, 7.69, 7.76, 7.31],
    ['2023/01/11', 7.72, 7.67, 7.88, 7.59],
    ['2023/01/12', 7.73, 7.9, 8.0, 7.64],
    ['2023/01/13', 7.95, 7.93, 7.98, 7.76],
    ['2023/01/17', 7.96, 8.04, 8.07, 7.89],
    ['2023/01/18', 8.12, 7.58, 8.14, 7.54],
    ['2023/01/19', 7.58, 7.67, 7.76, 7.51],
    ['2023/01/20', 7.75, 7.7, 7.84, 7.56],
    ['2023/01/23', 7.74, 7.66, 7.86, 7.63],
    ['2023/01/24', 7.65, 7.58, 7.65, 7.48],
    ['2023/01/25', 7.58, 7.89, 7.95, 7.49],
    ['2023/01/26', 7.92, 8.02, 8.02, 7.77],
    ['2023/01/27', 7.99, 7.78, 8.06, 7.72],
    ['2023/01/30', 7.63, 7.81, 7.88, 7.56],
    ['2023/01/31', 7.81, 7.93, 8.04, 7.73],
    ['2023/02/01', 7.95, 7.77, 7.98, 7.47],
    ['2023/02/02', 7.76, 7.63, 7.77, 7.43],
    ['2023/02/03', 7.63, 7.71, 7.97, 7.54],
    ['2023/02/06', 7.72, 7.76, 7.82, 7.53],
    ['2023/02/07', 7.84, 7.79, 7.88, 7.66],
    ['2023/02/08', 7.79, 7.91, 7.95, 7.7],
    ['2023/02/09', 7.91, 7.7, 7.91, 7.69],
    ['2023/02/10', 7.8, 8.23, 8.24, 7.79],
    ['2023/02/13', 8.17, 8.13, 8.27, 7.97],
    ['2023/02/14', 8.03, 8.08, 8.24, 7.93],
    ['2023/02/15', 7.96, 7.99, 8.02, 7.76],
    ['2023/02/16', 7.94, 7.98, 8.08, 7.84],
    ['2023/02/17', 7.91, 7.62, 7.91, 7.55],
    ['2023/02/21', 8.32, 8.54, 9.16, 8.32],
    ['2023/02/22', 8.55, 7.97, 8.85, 7.92],
    ['2023/02/23', 8.04, 8.12, 8.25, 7.96],
    ['2023/02/24', 8.03, 8.21, 8.25, 7.94],
    ['2023/02/27', 8.18, 8.37, 8.53, 8.15],
    ['2023/02/28', 8.47, 8.28, 8.7, 8.23],
    ['2023/03/01', 8.24, 8.47, 8.52, 8.22],
    ['2023/03/02', 8.32, 8.41, 8.5, 8.27],
    ['2023/03/03', 8.32, 8.73, 8.84, 8.32],
    ['2023/03/06', 8.65, 8.7, 8.73, 8.5],
    ['2023/03/07', 8.66, 8.47, 8.67, 8.38],
    ['2023/03/08', 8.44, 8.48, 8.51, 8.2],
    ['2023/03/09', 8.53, 7.99, 8.56, 7.97],
    ['2023/03/10', 7.98, 7.87, 8.2, 7.78],
    ['2023/03/13', 7.51, 7.61, 7.84, 7.45],
    ['2023/03/14', 7.72, 7.76, 8.08, 7.64],
    ['2023/03/15', 7.37, 7.34, 7.61, 7.19],
    ['2023/03/16', 7.16, 7.39, 7.47, 6.98],
    ['2023/03/17', 7.23, 7.21, 7.26, 7.05],
    ['2023/03/20', 7.37, 7.3, 7.52, 7.29],
    ['2023/03/21', 7.58, 7.63, 7.78, 7.52],
    ['2023/03/22', 7.63, 7.42, 7.68, 7.4],
    ['2023/03/23', 7.49, 7.34, 7.63, 7.23],
    ['2023/03/24', 7.09, 7.19, 7.25, 7.02],
    ['2023/03/27', 7.35, 7.6, 7.67, 7.3],
    ['2023/03/28', 7.54, 7.74, 7.8, 7.5],
    ['2023/03/29', 7.85, 7.82, 7.9, 7.68],
    ['2023/03/30', 7.87, 7.69, 7.87, 7.61],
    ['2023/03/31', 7.76, 7.74, 7.8, 7.63],
    ['2023/04/03', 8.25, 8.06, 8.34, 7.94],
    ['2023/04/04', 8.04, 7.87, 8.09, 7.73],
    ['2023/04/05', 7.85, 7.81, 7.93, 7.71],
    ['2023/04/06', 7.7, 7.58, 7.74, 7.56],
    ['2023/04/10', 7.61, 7.75, 7.9, 7.61],
    ['2023/04/11', 7.73, 7.84, 7.94, 7.65],
    ['2023/04/12', 7.9, 7.79, 7.9, 7.73],
    ['2023/04/13', 7.76, 7.78, 7.91, 7.74],
    ['2023/04/14', 7.77, 7.71, 7.84, 7.63],
    ['2023/04/17', 7.68, 7.68, 7.72, 7.58],
    ['2023/04/18', 7.65, 7.64, 7.67, 7.49],
    ['2023/04/19', 7.51, 7.65, 7.66, 7.44],
    ['2023/04/20', 7.56, 7.65, 7.7, 7.37],
    ['2023/04/21', 7.67, 7.66, 7.68, 7.45],
    ['2023/04/24', 7.6, 7.86, 7.88, 7.54],
    ['2023/04/25', 7.58, 7.21, 7.58, 6.73],
    ['2023/04/26', 7.12, 7.13, 7.45, 7.01],
    ['2023/04/27', 7.12, 7.01, 7.26, 6.94],
    ['2023/04/28', 7.02, 7.25, 7.32, 6.93],
    ['2023/05/01', 7.14, 7.13, 7.24, 7.03],
    ['2023/05/02', 6.99, 6.79, 7.03, 6.63],
    ['2023/05/03', 6.65, 6.62, 6.74, 6.44],
    ['2023/05/04', 6.6, 6.87, 6.92, 6.55],
    ['2023/05/05', 7.06, 7.01, 7.18, 6.99],
    ['2023/05/08', 7.09, 6.92, 7.17, 6.9],
    ['2023/05/09', 6.82, 7.0, 7.09, 6.73],
    ['2023/05/10', 7.09, 6.99, 7.12, 6.88],
    ['2023/05/11', 6.85, 6.72, 6.93, 6.66],
    ['2023/05/12', 6.82, 6.73, 6.91, 6.68],
    ['2023/05/15', 6.81, 6.71, 6.87, 6.68],
    ['2023/05/16', 6.61, 6.6, 6.69, 6.55],
    ['2023/05/17', 6.67, 6.69, 6.7, 6.55],
    ['2023/05/18', 6.62, 6.72, 6.74, 6.52],
    ['2023/05/19', 6.79, 6.69, 6.82, 6.63],
    ['2023/05/22', 6.67, 6.76, 6.85, 6.67],
    ['2023/05/23', 6.76, 6.82, 6.92, 6.74],
    ['2023/05/24', 6.79, 6.82, 6.92, 6.72],
    ['2023/05/25', 6.66, 6.58, 6.67, 6.52],
    ['2023/05/26', 6.63, 6.61, 6.69, 6.54],
    ['2023/05/30', 6.48, 6.45, 6.51, 6.37],
    ['2023/05/31', 6.37, 6.28, 6.44, 6.19],
    ['2023/06/01', 6.25, 6.63, 6.64, 6.25],
    ['2023/06/02', 6.76, 7.03, 7.15, 6.75],
    ['2023/06/05', 7.11, 7.01, 7.15, 6.83],
    ['2023/06/06', 6.9, 7.07, 7.19, 6.86],
    ['2023/06/07', 7.18, 7.28, 7.31, 7.13],
    ['2023/06/08', 7.25, 7.35, 7.49, 7.25],
    ['2023/06/09', 7.38, 7.29, 7.41, 7.2],
    ['2023/06/12', 7.09, 6.88, 7.09, 6.87],
    ['2023/06/13', 7.0, 6.96, 7.19, 6.96],
    ['2023/06/14', 7.03, 6.79, 7.03, 6.75],
    ['2023/06/15', 6.75, 6.87, 6.92, 6.75],
    ['2023/06/16', 6.96, 6.75, 6.96, 6.67],
    ['2023/06/20', 6.68, 6.8, 6.8, 6.6],
    ['2023/06/21', 6.74, 6.97, 7.02, 6.71],
    ['2023/06/22', 6.85, 6.87, 6.89, 6.7],
    ['2023/06/23', 6.75, 6.93, 6.93, 6.67],
    ['2023/06/26', 6.97, 7.07, 7.22, 6.97],
    ['2023/06/27', 7.02, 7.11, 7.18, 6.98],
    ['2023/06/28', 7.06, 7.1, 7.16, 7.01],
    ['2023/06/29', 7.13, 7.23, 7.28, 7.1],
    ['2023/06/30', 7.34, 7.38, 7.47, 7.25],
    ['2023/07/03', 7.38, 7.49, 7.57, 7.38],
    ['2023/07/05', 7.58, 7.49, 7.58, 7.43],
    ['2023/07/06', 7.41, 7.45, 7.5, 7.24],
    ['2023/07/07', 7.47, 7.93, 7.98, 7.45],
    ['2023/07/10', 7.89, 8.0, 8.02, 7.84],
    ['2023/07/11', 8.02, 8.2, 8.24, 7.98],
    ['2023/07/12', 8.31, 8.11, 8.32, 8.03],
    ['2023/07/13', 8.14, 8.21, 8.27, 8.08],
    ['2023/07/14', 8.22, 8.14, 8.23, 8.08],
    ['2023/07/17', 8.06, 8.28, 8.29, 8.04],
    ['2023/07/18', 8.28, 8.43, 8.56, 8.25],
    ['2023/07/19', 8.38, 8.35, 8.49, 8.24],
    ['2023/07/20', 8.43, 8.38, 8.48, 8.36],
    ['2023/07/21', 8.4, 8.37, 8.45, 8.3],
    ['2023/07/24', 8.35, 8.49, 8.58, 8.35],
    ['2023/07/25', 8.42, 8.53, 8.56, 8.31],
    ['2023/07/26', 8.42, 8.64, 8.68, 8.39],
    ['2023/07/27', 9.67, 9.4, 9.88, 9.11],
    ['2023/07/28', 9.48, 9.56, 9.69, 9.39],
    ['2023/07/31', 9.78, 9.6, 10.04, 9.5],
    ['2023/08/01', 9.56, 9.55, 9.6, 9.34],
    ['2023/08/02', 9.4, 9.38, 9.44, 9.2],
]);
var volumes = [
    1744200.0,
    2474900.0,
    1923100.0,
    1475500.0,
    1250400.0,
    1576400.0,
    1236000.0,
    928400.0,
    1194200.0,
    2408200.0,
    792600.0,
    967600.0,
    922300.0,
    1282800.0,
    1553100.0,
    1269600.0,
    1503100.0,
    1432500.0,
    1382300.0,
    2423100.0,
    4727800.0,
    1821600.0,
    1416200.0,
    1448300.0,
    1693400.0,
    1437500.0,
    1493200.0,
    1590200.0,
    1964400.0,
    1587900.0,
    2242100.0,
    3981900.0,
    1301600.0,
    1325300.0,
    1613400.0,
    1568700.0,
    2491100.0,
    2078200.0,
    1861400.0,
    2340500.0,
    1324900.0,
    1123300.0,
    1524700.0,
    1589600.0,
    1646300.0,
    1200900.0,
    959900.0,
    1449500.0,
    1737600.0,
    2236000.0,
    1306600.0,
    1321700.0,
    1247800.0,
    757900.0,
    1507800.0,
    1741700.0,
    1590800.0,
    1755500.0,
    3605700.0,
    9268300.0,
    5028600.0,
    3557100.0,
    5062800.0,
    2894300.0,
    2208300.0,
    1635300.0,
    1573500.0,
    2636300.0,
    2044000.0,
    1664500.0,
    1362500.0,
    1287800.0,
    1729000.0,
    1342900.0,
    1240900.0,
    1391200.0,
    812900.0,
    2677300.0,
    1095600.0,
    1355000.0,
    793800.0,
    1409000.0,
    2254100.0,
    1723700.0,
    950300.0,
    843200.0,
    1402300.0,
    1450100.0,
    1206100.0,
    1165500.0,
    1455700.0,
    1639100.0,
    1565100.0,
    1508400.0,
    1295300.0,
    3727000.0,
    1329700.0,
    2026300.0,
    1695300.0,
    1152300.0,
    1487600.0,
    2556300.0,
    1653500.0,
    1616400.0,
    2496700.0,
    1623600.0,
    2113400.0,
    1455000.0,
    1483500.0,
    1533800.0,
    3195800.0,
    1342900.0,
    2328800.0,
    1556200.0,
    1772900.0,
    1449100.0,
    1013400.0,
    1106000.0,
    1071900.0,
    905100.0,
    1583900.0,
    1839100.0,
    1631000.0,
    958900.0,
    1642900.0,
    1921600.0,
    2128700.0,
    1736400.0,
    2422600.0,
    994700.0,
    1104800.0,
    2345800.0,
    2223000.0,
    2646600.0,
    2096200.0,
    1630500.0,
    1555600.0,
    1575900.0,
    6964100.0,
    3304200.0,
    1833600.0,
    1666600.0,
    1678700.0,
    3156200.0,
    1247500.0,
    2792300.0,
    2502200.0,
    1721800.0,
    1791300.0,
    1352200.0,
    1600800.0,
    1868800.0,
    2673700.0,
    2920600.0,
    3753000.0,
    2025700.0,
    4744700.0,
    1580000.0,
    1622200.0,
    1542100.0,
    1661700.0,
    1785200.0,
    1532600.0,
    1107600.0,
    1208200.0,
    805300.0,
    1515900.0,
    2546400.0,
    1576300.0,
    1060700.0,
    971100.0,
    2812100.0,
    827900.0,
    705300.0,
    1225000.0,
    985900.0,
    1143600.0,
    1075900.0,
    2044300.0,
    2094400.0,
    1914900.0,
    1538000.0,
    6804600.0,
    3132800.0,
    2354500.0,
    2292100.0,
    1778600.0,
    3959100.0,
    2609200.0,
    1707000.0,
    1508000.0,
    1098800.0,
    1148600.0,
    1144400.0,
    1275500.0,
    1497500.0,
    1422200.0,
    1022700.0,
    1355200.0,
    1325700.0,
    1175500.0,
    836000.0,
    1150400.0,
    826100.0,
    1340100.0,
    983400.0,
    1424300.0,
    2311000.0,
    1743500.0,
    1906600.0,
    1090900.0,
    1323300.0,
    2133600.0,
    1738000.0,
    931100.0,
    1552900.0,
    1220000.0,
    1431400.0,
    1315200.0,
    2872300.0,
    1357000.0,
    1434700.0,
    1177600.0,
    2174200.0,
    1536700.0,
    912800.0,
    957800.0,
    1282700.0,
    1948000.0,
    674200.0,
    1488600.0,
    1192200.0,
    2336000.0,
    1612600.0,
    1454900.0,
    1274100.0,
    1091700.0,
    876400.0,
    1487900.0,
    1819500.0,
    1272000.0,
    910900.0,
    969500.0,
    1448900.0,
    851000.0,
    2104700.0,
    6376400.0,
    2113900.0,
    4514000.0,
    1853700.0,
    2158600.0,
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
        text: "HLX",
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