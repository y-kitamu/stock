/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_OII");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/11', 9.42, 9.33, 9.64, 9.27],
    ['2022/08/12', 9.31, 9.64, 9.64, 9.27],
    ['2022/08/15', 9.1, 9.21, 9.24, 8.86],
    ['2022/08/16', 9.3, 8.98, 9.44, 8.87],
    ['2022/08/17', 8.94, 8.97, 9.1, 8.78],
    ['2022/08/18', 9.05, 9.35, 9.41, 9.05],
    ['2022/08/19', 9.3, 9.16, 9.35, 9.02],
    ['2022/08/22', 9.03, 8.96, 9.08, 8.78],
    ['2022/08/23', 9.17, 9.4, 9.66, 9.17],
    ['2022/08/24', 9.34, 9.71, 9.77, 9.34],
    ['2022/08/25', 9.8, 9.86, 9.94, 9.69],
    ['2022/08/26', 9.76, 9.32, 9.78, 9.19],
    ['2022/08/29', 9.26, 9.45, 9.65, 9.26],
    ['2022/08/30', 9.22, 8.95, 9.22, 8.83],
    ['2022/08/31', 8.88, 8.85, 9.03, 8.66],
    ['2022/09/01', 8.79, 8.83, 8.96, 8.57],
    ['2022/09/02', 9.17, 9.38, 9.41, 9.04],
    ['2022/09/06', 9.46, 9.17, 9.63, 9.09],
    ['2022/09/07', 8.89, 8.98, 8.99, 8.59],
    ['2022/09/08', 9.0, 8.86, 9.1, 8.78],
    ['2022/09/09', 9.17, 9.86, 9.97, 9.13],
    ['2022/09/12', 9.98, 9.83, 10.02, 9.71],
    ['2022/09/13', 9.58, 9.2, 9.69, 9.03],
    ['2022/09/14', 9.3, 9.77, 9.78, 9.3],
    ['2022/09/15', 9.47, 9.52, 9.63, 9.33],
    ['2022/09/16', 9.41, 9.34, 9.49, 9.06],
    ['2022/09/19', 9.2, 9.19, 9.46, 9.04],
    ['2022/09/20', 9.06, 8.65, 9.06, 8.52],
    ['2022/09/21', 8.85, 8.39, 8.95, 8.39],
    ['2022/09/22', 8.57, 8.31, 8.69, 8.24],
    ['2022/09/23', 7.86, 7.63, 7.88, 7.43],
    ['2022/09/26', 7.59, 7.3, 7.66, 7.25],
    ['2022/09/27', 7.57, 7.71, 7.86, 7.52],
    ['2022/09/28', 7.75, 7.88, 8.05, 7.75],
    ['2022/09/29', 7.9, 8.1, 8.12, 7.69],
    ['2022/09/30', 7.97, 7.96, 8.12, 7.86],
    ['2022/10/03', 8.42, 8.99, 8.99, 8.35],
    ['2022/10/04', 9.1, 9.44, 9.52, 8.92],
    ['2022/10/05', 9.28, 9.59, 9.62, 9.21],
    ['2022/10/06', 9.2, 9.58, 9.71, 9.2],
    ['2022/10/07', 9.48, 9.33, 9.63, 9.21],
    ['2022/10/10', 9.32, 8.9, 9.44, 8.79],
    ['2022/10/11', 8.65, 8.73, 8.91, 8.55],
    ['2022/10/12', 8.6, 8.57, 8.67, 8.36],
    ['2022/10/13', 8.5, 9.0, 9.21, 8.49],
    ['2022/10/14', 9.0, 8.8, 9.17, 8.67],
    ['2022/10/17', 9.06, 9.0, 9.14, 8.9],
    ['2022/10/18', 9.19, 9.03, 9.42, 8.93],
    ['2022/10/19', 9.15, 9.64, 9.64, 9.06],
    ['2022/10/20', 9.71, 9.62, 9.9, 9.49],
    ['2022/10/21', 9.75, 10.15, 10.26, 9.66],
    ['2022/10/24', 10.13, 10.47, 10.5, 10.02],
    ['2022/10/25', 10.4, 10.68, 10.78, 10.27],
    ['2022/10/26', 10.87, 11.23, 11.45, 10.85],
    ['2022/10/27', 12.22, 13.08, 13.92, 12.12],
    ['2022/10/28', 13.12, 13.3, 13.45, 13.03],
    ['2022/10/31', 13.22, 13.99, 14.26, 13.22],
    ['2022/11/01', 14.17, 13.6, 14.22, 13.58],
    ['2022/11/02', 13.55, 13.0, 13.79, 12.94],
    ['2022/11/03', 12.99, 13.41, 13.52, 12.84],
    ['2022/11/04', 13.74, 13.7, 13.96, 13.42],
    ['2022/11/07', 13.73, 14.22, 14.31, 13.73],
    ['2022/11/08', 14.32, 14.66, 14.7, 14.06],
    ['2022/11/09', 14.32, 13.83, 14.59, 13.72],
    ['2022/11/10', 14.4, 14.14, 14.49, 13.97],
    ['2022/11/11', 14.5, 14.83, 15.06, 14.35],
    ['2022/11/14', 14.72, 14.31, 14.98, 14.27],
    ['2022/11/15', 14.52, 14.77, 14.9, 14.19],
    ['2022/11/16', 14.65, 14.82, 14.88, 14.5],
    ['2022/11/17', 14.44, 15.28, 15.29, 14.29],
    ['2022/11/18', 15.03, 15.06, 15.13, 14.73],
    ['2022/11/21', 14.51, 14.61, 14.85, 13.92],
    ['2022/11/22', 14.86, 14.86, 15.09, 14.57],
    ['2022/11/23', 14.43, 14.73, 14.84, 14.33],
    ['2022/11/25', 14.68, 14.85, 14.99, 14.68],
    ['2022/11/28', 14.28, 14.4, 14.71, 14.1],
    ['2022/11/29', 14.74, 14.7, 15.07, 14.62],
    ['2022/11/30', 14.94, 15.19, 15.32, 14.56],
    ['2022/12/01', 15.47, 15.28, 15.73, 15.16],
    ['2022/12/02', 15.03, 15.45, 15.6, 15.03],
    ['2022/12/05', 15.71, 14.95, 15.8, 14.87],
    ['2022/12/06', 14.86, 14.71, 15.06, 14.68],
    ['2022/12/07', 14.8, 14.4, 14.88, 14.27],
    ['2022/12/08', 14.84, 14.24, 14.95, 14.12],
    ['2022/12/09', 14.14, 13.43, 14.36, 13.43],
    ['2022/12/12', 13.45, 13.8, 13.93, 13.38],
    ['2022/12/13', 14.2, 14.83, 14.91, 14.1],
    ['2022/12/14', 14.85, 14.86, 15.2, 14.58],
    ['2022/12/15', 14.63, 14.83, 14.9, 14.36],
    ['2022/12/16', 14.31, 14.48, 14.54, 14.01],
    ['2022/12/19', 14.56, 14.64, 14.77, 14.45],
    ['2022/12/20', 14.65, 15.3, 15.5, 14.61],
    ['2022/12/21', 15.73, 16.22, 16.25, 15.5],
    ['2022/12/22', 16.39, 15.95, 16.46, 15.37],
    ['2022/12/23', 16.2, 16.81, 16.88, 16.06],
    ['2022/12/27', 17.03, 17.41, 17.53, 16.97],
    ['2022/12/28', 17.47, 16.58, 17.47, 16.28],
    ['2022/12/29', 16.47, 17.45, 17.45, 16.37],
    ['2022/12/30', 17.15, 17.49, 17.55, 17.13],
    ['2023/01/03', 17.62, 16.9, 17.79, 16.4],
    ['2023/01/04', 16.53, 16.87, 16.93, 16.48],
    ['2023/01/05', 16.78, 17.23, 17.38, 16.43],
    ['2023/01/06', 17.42, 17.31, 17.96, 17.23],
    ['2023/01/09', 17.7, 17.16, 17.7, 16.58],
    ['2023/01/10', 17.05, 18.19, 18.47, 16.85],
    ['2023/01/11', 18.21, 18.42, 18.81, 17.92],
    ['2023/01/12', 18.55, 19.13, 19.56, 18.37],
    ['2023/01/13', 19.16, 19.08, 19.31, 18.56],
    ['2023/01/17', 19.27, 20.01, 20.02, 19.19],
    ['2023/01/18', 20.16, 18.35, 20.21, 18.27],
    ['2023/01/19', 18.3, 18.57, 18.72, 18.1],
    ['2023/01/20', 18.74, 18.8, 18.97, 18.29],
    ['2023/01/23', 19.18, 19.08, 19.38, 18.93],
    ['2023/01/24', 19.21, 19.04, 19.27, 18.71],
    ['2023/01/25', 18.88, 19.8, 20.03, 18.63],
    ['2023/01/26', 19.95, 20.49, 20.51, 19.44],
    ['2023/01/27', 20.4, 20.93, 21.21, 20.31],
    ['2023/01/30', 20.31, 20.74, 20.86, 19.71],
    ['2023/01/31', 20.83, 21.35, 21.59, 20.69],
    ['2023/02/01', 21.04, 20.96, 21.39, 20.16],
    ['2023/02/02', 20.93, 20.14, 21.0, 19.92],
    ['2023/02/03', 20.2, 20.7, 21.4, 20.2],
    ['2023/02/06', 20.58, 20.69, 21.0, 20.26],
    ['2023/02/07', 20.87, 21.18, 21.39, 20.65],
    ['2023/02/08', 21.19, 21.64, 21.85, 21.14],
    ['2023/02/09', 21.53, 20.79, 21.58, 20.73],
    ['2023/02/10', 21.1, 21.35, 21.42, 20.99],
    ['2023/02/13', 21.08, 21.54, 21.7, 20.69],
    ['2023/02/14', 21.17, 21.33, 21.96, 21.01],
    ['2023/02/15', 20.92, 21.1, 21.2, 20.61],
    ['2023/02/16', 20.94, 21.07, 21.42, 20.88],
    ['2023/02/17', 20.64, 19.95, 20.9, 19.67],
    ['2023/02/21', 19.9, 19.64, 20.36, 19.58],
    ['2023/02/22', 19.5, 18.51, 19.71, 18.28],
    ['2023/02/23', 18.96, 19.14, 19.37, 18.77],
    ['2023/02/24', 18.79, 19.79, 19.82, 18.05],
    ['2023/02/27', 19.98, 21.49, 21.57, 19.94],
    ['2023/02/28', 21.75, 20.89, 21.91, 20.74],
    ['2023/03/01', 20.84, 21.34, 21.44, 20.72],
    ['2023/03/02', 21.53, 21.78, 21.92, 21.31],
    ['2023/03/03', 21.45, 22.11, 22.26, 21.32],
    ['2023/03/06', 22.03, 21.7, 22.1, 21.35],
    ['2023/03/07', 21.55, 21.26, 21.7, 21.0],
    ['2023/03/08', 21.16, 21.02, 21.33, 20.63],
    ['2023/03/09', 21.29, 19.49, 21.44, 19.43],
    ['2023/03/10', 19.45, 19.04, 19.74, 18.88],
    ['2023/03/13', 18.1, 17.84, 18.72, 17.7],
    ['2023/03/14', 18.25, 18.09, 18.77, 17.61],
    ['2023/03/15', 17.01, 16.87, 17.46, 16.41],
    ['2023/03/16', 16.27, 17.16, 17.38, 16.14],
    ['2023/03/17', 16.87, 16.55, 16.91, 16.35],
    ['2023/03/20', 16.78, 17.07, 17.3, 16.78],
    ['2023/03/21', 17.88, 17.79, 18.18, 17.6],
    ['2023/03/22', 17.79, 16.94, 17.79, 16.94],
    ['2023/03/23', 17.18, 16.43, 17.36, 16.2],
    ['2023/03/24', 15.95, 16.19, 16.38, 15.75],
    ['2023/03/27', 16.63, 17.02, 17.18, 16.27],
    ['2023/03/28', 16.73, 17.48, 17.65, 16.73],
    ['2023/03/29', 17.82, 17.54, 17.82, 17.25],
    ['2023/03/30', 17.71, 17.45, 17.77, 17.35],
    ['2023/03/31', 17.65, 17.63, 17.77, 17.43],
    ['2023/04/03', 18.66, 18.31, 19.0, 18.11],
    ['2023/04/04', 18.3, 17.45, 18.3, 17.15],
    ['2023/04/05', 17.5, 17.45, 17.62, 17.06],
    ['2023/04/06', 17.46, 17.19, 17.47, 17.14],
    ['2023/04/10', 17.21, 17.59, 17.91, 17.21],
    ['2023/04/11', 17.63, 17.77, 18.06, 17.36],
    ['2023/04/12', 17.96, 18.18, 18.33, 17.84],
    ['2023/04/13', 18.11, 18.05, 18.31, 18.04],
    ['2023/04/14', 18.24, 18.14, 18.32, 17.88],
    ['2023/04/17', 18.16, 18.19, 18.21, 17.95],
    ['2023/04/18', 18.15, 18.19, 18.26, 17.95],
    ['2023/04/19', 17.93, 17.85, 18.13, 17.47],
    ['2023/04/20', 17.5, 17.57, 17.74, 17.31],
    ['2023/04/21', 17.64, 17.04, 17.64, 17.04],
    ['2023/04/24', 17.01, 17.77, 17.85, 16.89],
    ['2023/04/25', 17.44, 17.06, 17.56, 17.04],
    ['2023/04/26', 16.82, 16.81, 17.48, 16.73],
    ['2023/04/27', 16.83, 17.22, 17.4, 16.71],
    ['2023/04/28', 17.07, 17.73, 17.88, 16.84],
    ['2023/05/01', 17.35, 17.19, 17.61, 16.98],
    ['2023/05/02', 16.91, 16.34, 16.92, 16.2],
    ['2023/05/03', 16.07, 16.39, 16.84, 16.01],
    ['2023/05/04', 16.27, 16.52, 16.63, 16.1],
    ['2023/05/05', 17.2, 17.04, 17.58, 16.91],
    ['2023/05/08', 17.46, 16.94, 17.51, 16.87],
    ['2023/05/09', 16.73, 16.94, 17.13, 16.65],
    ['2023/05/10', 17.18, 16.98, 17.18, 16.65],
    ['2023/05/11', 16.62, 16.17, 16.87, 15.99],
    ['2023/05/12', 16.27, 16.2, 16.55, 16.07],
    ['2023/05/15', 16.33, 16.46, 16.81, 16.31],
    ['2023/05/16', 16.29, 16.22, 16.39, 15.97],
    ['2023/05/17', 16.31, 16.4, 16.56, 16.07],
    ['2023/05/18', 16.13, 16.25, 16.26, 15.72],
    ['2023/05/19', 16.49, 16.28, 16.58, 16.08],
    ['2023/05/22', 16.32, 16.51, 16.74, 16.21],
    ['2023/05/23', 16.53, 16.67, 16.9, 16.35],
    ['2023/05/24', 16.67, 16.89, 16.98, 16.36],
    ['2023/05/25', 16.48, 16.1, 16.48, 15.88],
    ['2023/05/26', 16.24, 16.31, 16.38, 16.01],
    ['2023/05/30', 15.95, 15.81, 16.1, 15.71],
    ['2023/05/31', 15.44, 15.31, 15.72, 14.99],
    ['2023/06/01', 15.36, 16.17, 16.2, 15.31],
    ['2023/06/02', 16.59, 17.31, 17.53, 16.53],
    ['2023/06/05', 17.58, 17.01, 17.67, 16.68],
    ['2023/06/06', 16.72, 17.31, 17.64, 16.61],
    ['2023/06/07', 17.42, 17.93, 18.07, 17.41],
    ['2023/06/08', 17.86, 18.15, 18.55, 17.85],
    ['2023/06/09', 18.11, 17.81, 18.29, 17.71],
    ['2023/06/12', 17.44, 17.55, 17.63, 17.14],
    ['2023/06/13', 17.91, 17.67, 18.59, 17.66],
    ['2023/06/14', 17.88, 17.42, 17.93, 17.22],
    ['2023/06/15', 17.47, 17.8, 17.85, 17.46],
    ['2023/06/16', 17.98, 17.97, 18.02, 17.28],
    ['2023/06/20', 17.75, 17.7, 17.82, 17.17],
    ['2023/06/21', 17.52, 18.11, 18.48, 17.52],
    ['2023/06/22', 17.82, 17.4, 17.91, 17.33],
    ['2023/06/23', 16.95, 17.13, 17.24, 16.8],
    ['2023/06/26', 17.12, 17.81, 18.02, 17.07],
    ['2023/06/27', 17.72, 17.89, 18.17, 17.69],
    ['2023/06/28', 17.85, 17.9, 17.93, 17.57],
    ['2023/06/29', 18.1, 18.2, 18.45, 18.03],
    ['2023/06/30', 18.42, 18.7, 18.75, 18.12],
    ['2023/07/03', 18.82, 19.28, 19.29, 18.72],
    ['2023/07/05', 19.32, 19.21, 19.83, 19.15],
    ['2023/07/06', 18.93, 19.03, 19.2, 18.56],
    ['2023/07/07', 18.93, 21.53, 21.72, 18.93],
    ['2023/07/10', 21.56, 21.99, 22.84, 21.52],
    ['2023/07/11', 22.1, 22.44, 22.55, 21.8],
    ['2023/07/12', 22.75, 22.28, 22.9, 21.97],
    ['2023/07/13', 22.33, 22.33, 22.69, 21.97],
    ['2023/07/14', 22.3, 22.05, 22.32, 21.85],
    ['2023/07/17', 22.09, 22.28, 22.53, 21.86],
    ['2023/07/18', 22.02, 23.18, 23.56, 22.01],
    ['2023/07/19', 23.0, 23.16, 23.56, 22.85],
    ['2023/07/20', 23.29, 23.31, 23.55, 22.8],
    ['2023/07/21', 23.35, 23.12, 23.45, 22.87],
    ['2023/07/24', 23.29, 23.56, 23.75, 23.07],
    ['2023/07/25', 23.52, 23.66, 23.81, 23.34],
    ['2023/07/26', 23.29, 23.64, 23.75, 23.11],
    ['2023/07/27', 21.08, 21.08, 22.49, 20.57],
    ['2023/07/28', 21.34, 22.21, 22.23, 21.27],
    ['2023/07/31', 22.49, 22.45, 22.81, 22.2],
    ['2023/08/01', 22.16, 21.85, 22.34, 21.41],
    ['2023/08/02', 21.49, 21.5, 21.72, 20.99],
    ['2023/08/03', 21.45, 21.44, 21.73, 21.28],
    ['2023/08/04', 21.47, 21.42, 21.88, 21.19],
    ['2023/08/07', 21.34, 20.85, 21.46, 20.5],
    ['2023/08/08', 20.47, 21.12, 21.13, 20.2],
    ['2023/08/09', 21.34, 21.1, 21.94, 21.05],
]);
var volumes = [
    836800.0,
    546300.0,
    670000.0,
    711600.0,
    507900.0,
    439500.0,
    433600.0,
    481100.0,
    759200.0,
    974600.0,
    432400.0,
    672200.0,
    461000.0,
    731000.0,
    1135300.0,
    1141700.0,
    722300.0,
    876100.0,
    993100.0,
    1067700.0,
    1314100.0,
    981600.0,
    1099800.0,
    1012900.0,
    1154800.0,
    3539900.0,
    806300.0,
    1371800.0,
    823100.0,
    886800.0,
    1397300.0,
    1010000.0,
    973500.0,
    1206800.0,
    1717100.0,
    1224200.0,
    2500000.0,
    1387500.0,
    1124600.0,
    1039200.0,
    1131900.0,
    838000.0,
    833000.0,
    1116600.0,
    2576900.0,
    1723000.0,
    1089500.0,
    953600.0,
    1946700.0,
    1068000.0,
    1286700.0,
    1111200.0,
    1458800.0,
    1566700.0,
    3672700.0,
    1522600.0,
    2071400.0,
    1657600.0,
    1630500.0,
    899100.0,
    860300.0,
    973000.0,
    1027900.0,
    1044000.0,
    990900.0,
    803600.0,
    1082600.0,
    738600.0,
    782500.0,
    1308500.0,
    1429100.0,
    1972300.0,
    642400.0,
    949100.0,
    740800.0,
    1589100.0,
    646700.0,
    1251100.0,
    838100.0,
    529300.0,
    1391900.0,
    828600.0,
    1265000.0,
    852500.0,
    1301500.0,
    1163400.0,
    1207900.0,
    929200.0,
    871100.0,
    5053900.0,
    985700.0,
    943200.0,
    1036600.0,
    854200.0,
    945300.0,
    892100.0,
    866800.0,
    728200.0,
    891300.0,
    2048400.0,
    1113500.0,
    680500.0,
    942600.0,
    1915600.0,
    1385200.0,
    1976100.0,
    1736800.0,
    1215400.0,
    889100.0,
    1569700.0,
    978100.0,
    917100.0,
    723600.0,
    709400.0,
    1206900.0,
    1053400.0,
    1281300.0,
    860000.0,
    1501100.0,
    1402200.0,
    1414400.0,
    1263500.0,
    906200.0,
    715100.0,
    610100.0,
    772000.0,
    534000.0,
    812200.0,
    614300.0,
    1205200.0,
    754600.0,
    1101000.0,
    1124200.0,
    1518200.0,
    1282100.0,
    1984400.0,
    1596500.0,
    1520100.0,
    750700.0,
    1037000.0,
    701100.0,
    1277100.0,
    923000.0,
    748800.0,
    1240600.0,
    983200.0,
    1224800.0,
    977500.0,
    1462400.0,
    970300.0,
    2918900.0,
    1289000.0,
    1045200.0,
    1093500.0,
    1198800.0,
    870500.0,
    767000.0,
    698000.0,
    485400.0,
    734900.0,
    974800.0,
    1121600.0,
    895100.0,
    607900.0,
    462800.0,
    612400.0,
    593400.0,
    802300.0,
    628600.0,
    708900.0,
    418300.0,
    681700.0,
    523000.0,
    800700.0,
    725800.0,
    610400.0,
    764100.0,
    944600.0,
    1056400.0,
    680900.0,
    857100.0,
    1167600.0,
    701400.0,
    594100.0,
    676100.0,
    534200.0,
    341400.0,
    689900.0,
    579500.0,
    467000.0,
    446100.0,
    551300.0,
    567900.0,
    537400.0,
    410700.0,
    467400.0,
    851800.0,
    639500.0,
    589300.0,
    419600.0,
    453000.0,
    1048100.0,
    567500.0,
    823000.0,
    606000.0,
    614300.0,
    901700.0,
    729900.0,
    459800.0,
    886700.0,
    735300.0,
    528800.0,
    506400.0,
    1895200.0,
    806100.0,
    791200.0,
    551000.0,
    1252800.0,
    620600.0,
    477200.0,
    380900.0,
    423800.0,
    1012700.0,
    511900.0,
    1032900.0,
    761300.0,
    1913100.0,
    2180500.0,
    1361000.0,
    1352600.0,
    930000.0,
    642400.0,
    721700.0,
    1086300.0,
    861000.0,
    713800.0,
    776900.0,
    671800.0,
    645500.0,
    1099900.0,
    2687900.0,
    933400.0,
    885900.0,
    1147700.0,
    765600.0,
    761300.0,
    762800.0,
    804400.0,
    801600.0,
    943200.0,
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
     *     text: "OII",
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