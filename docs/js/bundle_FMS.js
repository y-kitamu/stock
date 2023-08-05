/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_FMS");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/08', 18.59, 18.66, 18.78, 18.53],
    ['2022/08/09', 18.59, 18.66, 18.84, 18.59],
    ['2022/08/10', 19.04, 18.75, 19.09, 18.74],
    ['2022/08/11', 18.96, 18.85, 19.17, 18.84],
    ['2022/08/12', 18.9, 18.88, 18.94, 18.72],
    ['2022/08/15', 18.76, 18.65, 18.8, 18.61],
    ['2022/08/16', 18.95, 18.97, 19.06, 18.85],
    ['2022/08/17', 18.63, 18.39, 18.7, 18.34],
    ['2022/08/18', 18.37, 18.16, 18.38, 18.05],
    ['2022/08/19', 18.17, 18.12, 18.25, 18.06],
    ['2022/08/22', 18.19, 17.85, 18.21, 17.77],
    ['2022/08/23', 17.95, 18.02, 18.09, 17.79],
    ['2022/08/24', 17.26, 17.71, 17.82, 17.01],
    ['2022/08/25', 17.59, 17.67, 17.75, 17.5],
    ['2022/08/26', 17.72, 17.0, 17.73, 17.0],
    ['2022/08/29', 17.04, 17.08, 17.13, 16.98],
    ['2022/08/30', 17.16, 17.07, 17.19, 16.99],
    ['2022/08/31', 17.11, 17.1, 17.28, 17.06],
    ['2022/09/01', 16.74, 16.89, 16.89, 16.57],
    ['2022/09/02', 16.99, 16.81, 17.2, 16.73],
    ['2022/09/06', 16.84, 16.87, 17.05, 16.77],
    ['2022/09/07', 16.63, 17.05, 17.09, 16.61],
    ['2022/09/08', 16.16, 16.31, 16.38, 16.06],
    ['2022/09/09', 16.59, 16.81, 16.89, 16.58],
    ['2022/09/12', 17.27, 17.56, 17.68, 17.27],
    ['2022/09/13', 17.49, 17.22, 17.62, 17.17],
    ['2022/09/14', 16.69, 16.82, 16.9, 16.53],
    ['2022/09/15', 16.65, 16.79, 16.95, 16.63],
    ['2022/09/16', 16.61, 16.67, 16.72, 16.56],
    ['2022/09/19', 16.36, 16.5, 16.52, 16.24],
    ['2022/09/20', 16.01, 15.89, 16.07, 15.8],
    ['2022/09/21', 15.66, 15.41, 15.7, 15.4],
    ['2022/09/22', 15.02, 15.05, 15.16, 14.87],
    ['2022/09/23', 14.57, 14.39, 14.65, 14.16],
    ['2022/09/26', 14.33, 14.16, 14.4, 14.08],
    ['2022/09/27', 13.94, 13.76, 14.08, 13.69],
    ['2022/09/28', 13.84, 14.13, 14.19, 13.73],
    ['2022/09/29', 13.9, 13.96, 14.01, 13.75],
    ['2022/09/30', 14.21, 14.04, 14.25, 14.02],
    ['2022/10/03', 13.88, 14.22, 14.26, 13.7],
    ['2022/10/04', 14.62, 14.85, 14.91, 14.6],
    ['2022/10/05', 14.17, 14.14, 14.23, 13.95],
    ['2022/10/06', 13.89, 13.64, 13.89, 13.57],
    ['2022/10/07', 13.47, 13.3, 13.51, 13.21],
    ['2022/10/10', 12.98, 12.81, 12.98, 12.79],
    ['2022/10/11', 12.97, 13.13, 13.34, 12.9],
    ['2022/10/12', 12.95, 12.84, 13.07, 12.82],
    ['2022/10/13', 12.92, 13.34, 13.46, 12.91],
    ['2022/10/14', 13.23, 13.33, 13.43, 13.2],
    ['2022/10/17', 13.56, 13.56, 13.72, 13.51],
    ['2022/10/18', 13.69, 13.66, 13.78, 13.57],
    ['2022/10/19', 13.84, 13.84, 14.03, 13.77],
    ['2022/10/20', 13.73, 13.69, 13.89, 13.65],
    ['2022/10/21', 13.53, 13.65, 13.69, 13.4],
    ['2022/10/24', 13.48, 13.66, 13.7, 13.44],
    ['2022/10/25', 13.84, 14.18, 14.23, 13.83],
    ['2022/10/26', 14.28, 14.31, 14.5, 14.25],
    ['2022/10/27', 14.48, 14.36, 14.56, 14.32],
    ['2022/10/28', 13.72, 13.18, 13.72, 13.07],
    ['2022/10/31', 13.6, 13.87, 13.99, 13.55],
    ['2022/11/01', 13.54, 13.69, 13.9, 13.54],
    ['2022/11/02', 13.72, 14.2, 14.31, 13.7],
    ['2022/11/03', 13.71, 13.85, 13.87, 13.42],
    ['2022/11/04', 14.05, 14.28, 14.47, 14.0],
    ['2022/11/07', 14.17, 14.38, 14.41, 14.17],
    ['2022/11/08', 14.33, 14.25, 14.45, 14.2],
    ['2022/11/09', 14.05, 14.04, 14.22, 13.95],
    ['2022/11/10', 14.59, 14.77, 14.79, 14.57],
    ['2022/11/11', 15.16, 15.44, 15.47, 15.08],
    ['2022/11/14', 15.42, 15.37, 15.68, 15.36],
    ['2022/11/15', 15.51, 15.44, 15.76, 15.28],
    ['2022/11/16', 15.36, 15.24, 15.47, 15.2],
    ['2022/11/17', 14.94, 15.08, 15.12, 14.91],
    ['2022/11/18', 15.26, 15.35, 15.48, 15.25],
    ['2022/11/21', 15.14, 15.09, 15.19, 15.0],
    ['2022/11/22', 15.09, 14.86, 15.17, 14.82],
    ['2022/11/23', 14.95, 15.35, 15.35, 14.92],
    ['2022/11/25', 15.46, 15.59, 15.63, 15.44],
    ['2022/11/28', 15.64, 15.34, 15.71, 15.3],
    ['2022/11/29', 15.31, 15.43, 15.54, 15.29],
    ['2022/11/30', 15.44, 15.62, 15.67, 15.29],
    ['2022/12/01', 15.98, 15.98, 16.12, 15.91],
    ['2022/12/02', 16.23, 16.38, 16.38, 16.17],
    ['2022/12/05', 16.29, 16.21, 16.36, 16.17],
    ['2022/12/06', 15.65, 15.58, 15.76, 15.48],
    ['2022/12/07', 15.83, 15.81, 15.95, 15.79],
    ['2022/12/08', 15.86, 15.93, 16.02, 15.79],
    ['2022/12/09', 15.96, 15.86, 16.03, 15.85],
    ['2022/12/12', 15.65, 15.63, 15.71, 15.56],
    ['2022/12/13', 16.25, 16.15, 16.36, 16.05],
    ['2022/12/14', 16.13, 16.19, 16.28, 16.07],
    ['2022/12/15', 16.07, 15.8, 16.09, 15.8],
    ['2022/12/16', 15.67, 15.57, 15.71, 15.41],
    ['2022/12/19', 15.73, 15.59, 15.73, 15.49],
    ['2022/12/20', 15.4, 15.47, 15.56, 15.35],
    ['2022/12/21', 15.54, 15.75, 15.8, 15.54],
    ['2022/12/22', 15.57, 15.65, 15.66, 15.41],
    ['2022/12/23', 15.72, 16.0, 16.03, 15.69],
    ['2022/12/27', 15.91, 15.86, 15.91, 15.8],
    ['2022/12/28', 15.86, 15.65, 15.91, 15.63],
    ['2022/12/29', 15.82, 16.32, 16.33, 15.79],
    ['2022/12/30', 16.28, 16.34, 16.38, 16.23],
    ['2023/01/03', 15.89, 16.11, 16.13, 15.76],
    ['2023/01/04', 16.59, 16.85, 16.93, 16.57],
    ['2023/01/05', 16.92, 16.92, 16.97, 16.74],
    ['2023/01/06', 17.1, 17.38, 17.41, 16.91],
    ['2023/01/09', 17.45, 17.09, 17.51, 17.08],
    ['2023/01/10', 17.61, 17.62, 17.71, 17.45],
    ['2023/01/11', 17.7, 17.61, 17.72, 17.5],
    ['2023/01/12', 17.94, 17.76, 17.99, 17.63],
    ['2023/01/13', 17.63, 17.83, 17.88, 17.61],
    ['2023/01/17', 18.18, 18.18, 18.27, 18.04],
    ['2023/01/18', 18.3, 17.97, 18.34, 17.97],
    ['2023/01/19', 17.93, 18.04, 18.09, 17.86],
    ['2023/01/20', 18.14, 18.32, 18.33, 18.11],
    ['2023/01/23', 18.16, 18.37, 18.43, 18.14],
    ['2023/01/24', 18.2, 18.04, 18.23, 18.01],
    ['2023/01/25', 17.69, 17.78, 17.91, 17.63],
    ['2023/01/26', 17.94, 18.06, 18.14, 17.94],
    ['2023/01/27', 18.37, 18.74, 18.81, 18.34],
    ['2023/01/30', 19.01, 18.87, 19.11, 18.86],
    ['2023/01/31', 18.65, 18.73, 18.73, 18.56],
    ['2023/02/01', 18.75, 18.94, 19.03, 18.66],
    ['2023/02/02', 19.46, 19.25, 19.56, 19.2],
    ['2023/02/03', 19.11, 18.98, 19.31, 18.96],
    ['2023/02/06', 19.34, 19.08, 19.38, 19.04],
    ['2023/02/07', 19.14, 19.35, 19.4, 19.05],
    ['2023/02/08', 19.79, 19.69, 19.95, 19.61],
    ['2023/02/09', 19.67, 19.05, 19.7, 18.93],
    ['2023/02/10', 19.43, 19.45, 19.61, 19.29],
    ['2023/02/13', 19.61, 19.91, 19.91, 19.57],
    ['2023/02/14', 19.99, 20.04, 20.18, 19.87],
    ['2023/02/15', 19.57, 19.84, 19.87, 19.51],
    ['2023/02/16', 19.73, 19.85, 20.05, 19.69],
    ['2023/02/17', 19.87, 19.98, 20.02, 19.85],
    ['2023/02/21', 20.09, 20.67, 20.88, 19.29],
    ['2023/02/22', 21.63, 20.8, 21.86, 20.59],
    ['2023/02/23', 20.34, 19.87, 20.36, 19.6],
    ['2023/02/24', 19.94, 19.98, 19.98, 19.68],
    ['2023/02/27', 20.11, 20.06, 20.25, 19.94],
    ['2023/02/28', 19.85, 19.66, 19.85, 19.45],
    ['2023/03/01', 19.12, 18.87, 19.19, 18.84],
    ['2023/03/02', 18.89, 18.94, 19.01, 18.84],
    ['2023/03/03', 19.25, 19.58, 19.6, 19.22],
    ['2023/03/06', 20.04, 19.82, 20.11, 19.77],
    ['2023/03/07', 19.35, 19.03, 19.38, 18.93],
    ['2023/03/08', 18.97, 19.14, 19.14, 18.89],
    ['2023/03/09', 19.14, 18.93, 19.26, 18.88],
    ['2023/03/10', 19.57, 19.54, 19.78, 19.4],
    ['2023/03/13', 19.83, 19.81, 20.05, 19.76],
    ['2023/03/14', 19.93, 19.96, 20.0, 19.74],
    ['2023/03/15', 19.19, 19.58, 19.61, 19.17],
    ['2023/03/16', 19.36, 19.32, 19.52, 19.25],
    ['2023/03/17', 19.38, 19.44, 19.67, 19.01],
    ['2023/03/20', 19.58, 19.44, 19.61, 19.36],
    ['2023/03/21', 19.93, 20.06, 20.1, 19.81],
    ['2023/03/22', 20.31, 20.1, 20.47, 20.1],
    ['2023/03/23', 20.46, 20.29, 20.68, 20.14],
    ['2023/03/24', 19.85, 20.06, 20.07, 19.74],
    ['2023/03/27', 20.6, 20.77, 20.81, 20.6],
    ['2023/03/28', 20.46, 20.66, 20.72, 20.43],
    ['2023/03/29', 20.78, 20.64, 20.86, 20.57],
    ['2023/03/30', 21.04, 21.1, 21.18, 21.02],
    ['2023/03/31', 21.46, 21.26, 21.5, 21.17],
    ['2023/04/03', 21.52, 21.54, 21.69, 21.44],
    ['2023/04/04', 21.22, 21.46, 21.47, 21.22],
    ['2023/04/05', 21.53, 21.69, 21.73, 21.52],
    ['2023/04/06', 22.12, 22.23, 22.25, 22.03],
    ['2023/04/10', 22.23, 22.28, 22.29, 22.02],
    ['2023/04/11', 22.2, 22.33, 22.5, 22.19],
    ['2023/04/12', 22.6, 21.85, 22.62, 21.83],
    ['2023/04/13', 22.29, 22.61, 22.62, 22.29],
    ['2023/04/14', 23.54, 23.26, 23.58, 23.09],
    ['2023/04/17', 22.83, 22.63, 22.87, 22.57],
    ['2023/04/18', 22.54, 22.41, 22.61, 22.35],
    ['2023/04/19', 22.37, 22.38, 22.52, 22.17],
    ['2023/04/20', 21.59, 21.8, 21.96, 21.57],
    ['2023/04/21', 22.67, 22.85, 22.87, 22.61],
    ['2023/04/24', 23.49, 23.28, 23.58, 23.2],
    ['2023/04/25', 23.12, 23.16, 23.39, 23.09],
    ['2023/04/26', 23.32, 23.14, 23.33, 23.1],
    ['2023/04/27', 23.4, 23.58, 23.6, 23.32],
    ['2023/04/28', 24.09, 24.22, 24.37, 24.06],
    ['2023/05/01', 24.15, 24.0, 24.15, 23.86],
    ['2023/05/02', 23.47, 23.64, 23.68, 23.41],
    ['2023/05/03', 23.57, 23.62, 23.82, 23.57],
    ['2023/05/04', 23.36, 23.15, 23.41, 23.06],
    ['2023/05/05', 23.3, 23.42, 23.52, 23.21],
    ['2023/05/08', 23.36, 23.2, 23.42, 23.19],
    ['2023/05/09', 23.15, 23.18, 23.33, 22.95],
    ['2023/05/10', 24.36, 24.54, 24.56, 24.28],
    ['2023/05/11', 23.99, 23.86, 24.05, 23.82],
    ['2023/05/12', 23.83, 23.51, 23.86, 23.49],
    ['2023/05/15', 23.52, 23.83, 23.84, 23.5],
    ['2023/05/16', 23.85, 23.79, 23.87, 23.73],
    ['2023/05/17', 23.2, 23.18, 23.27, 23.08],
    ['2023/05/18', 23.1, 22.74, 23.11, 22.57],
    ['2023/05/19', 23.19, 23.27, 23.45, 23.18],
    ['2023/05/22', 23.21, 23.12, 23.24, 22.94],
    ['2023/05/23', 22.98, 22.68, 23.02, 22.66],
    ['2023/05/24', 22.23, 22.18, 22.23, 22.02],
    ['2023/05/25', 21.94, 21.83, 21.94, 21.68],
    ['2023/05/26', 21.51, 21.58, 21.64, 21.44],
    ['2023/05/30', 21.58, 21.47, 21.74, 21.42],
    ['2023/05/31', 21.3, 21.43, 21.48, 21.28],
    ['2023/06/01', 21.49, 21.53, 21.62, 21.48],
    ['2023/06/02', 21.71, 21.83, 21.85, 21.7],
    ['2023/06/05', 21.8, 21.92, 21.96, 21.78],
    ['2023/06/06', 22.12, 22.27, 22.28, 22.08],
    ['2023/06/07', 22.59, 22.78, 22.83, 22.47],
    ['2023/06/08', 22.97, 23.25, 23.26, 22.92],
    ['2023/06/09', 22.78, 22.86, 22.96, 22.69],
    ['2023/06/12', 22.9, 22.84, 22.94, 22.76],
    ['2023/06/13', 22.72, 22.95, 23.0, 22.68],
    ['2023/06/14', 23.44, 23.25, 23.53, 23.19],
    ['2023/06/15', 23.6, 23.57, 23.64, 23.37],
    ['2023/06/16', 23.63, 23.57, 23.84, 23.51],
    ['2023/06/20', 23.49, 23.45, 23.51, 23.31],
    ['2023/06/21', 23.42, 23.65, 23.69, 23.33],
    ['2023/06/22', 23.63, 23.85, 23.88, 23.63],
    ['2023/06/23', 24.23, 24.3, 24.46, 24.2],
    ['2023/06/26', 24.24, 23.97, 24.26, 23.94],
    ['2023/06/27', 23.03, 23.01, 23.09, 22.57],
    ['2023/06/28', 23.45, 23.65, 23.7, 23.41],
    ['2023/06/29', 23.45, 23.43, 23.52, 23.4],
    ['2023/06/30', 23.9, 23.93, 23.99, 23.83],
    ['2023/07/03', 23.99, 23.75, 24.06, 23.73],
    ['2023/07/05', 23.9, 23.95, 24.06, 23.8],
    ['2023/07/06', 23.52, 23.43, 23.56, 23.09],
    ['2023/07/07', 23.48, 23.57, 23.63, 23.38],
    ['2023/07/10', 23.64, 23.81, 23.85, 23.62],
    ['2023/07/11', 24.11, 24.25, 24.29, 24.11],
    ['2023/07/12', 25.59, 25.7, 25.71, 25.41],
    ['2023/07/13', 26.01, 26.26, 26.32, 25.99],
    ['2023/07/14', 26.19, 26.21, 26.48, 26.09],
    ['2023/07/17', 26.64, 26.76, 26.85, 26.57],
    ['2023/07/18', 27.01, 27.34, 27.47, 26.97],
    ['2023/07/19', 27.32, 27.37, 27.49, 27.18],
    ['2023/07/20', 27.53, 27.56, 27.72, 27.48],
    ['2023/07/21', 27.2, 27.05, 27.29, 27.05],
    ['2023/07/24', 26.89, 26.61, 26.99, 26.61],
    ['2023/07/25', 26.08, 26.1, 26.17, 25.97],
    ['2023/07/26', 26.11, 26.4, 26.48, 26.11],
    ['2023/07/27', 26.71, 26.33, 26.71, 26.28],
    ['2023/07/28', 25.98, 26.28, 26.3, 25.93],
    ['2023/07/31', 26.12, 26.11, 26.2, 25.81],
    ['2023/08/01', 26.07, 25.83, 26.23, 25.75],
    ['2023/08/02', 25.47, 25.25, 25.57, 25.16],
    ['2023/08/03', 25.97, 25.75, 26.06, 25.66],
    ['2023/08/04', 25.55, 25.85, 26.04, 25.55],
]);
var volumes = [
    668600.0,
    578200.0,
    546200.0,
    595700.0,
    384900.0,
    632800.0,
    702800.0,
    531200.0,
    736600.0,
    525700.0,
    1225700.0,
    1586200.0,
    5070100.0,
    778400.0,
    708200.0,
    683600.0,
    724200.0,
    661400.0,
    657400.0,
    623500.0,
    589200.0,
    600600.0,
    1217300.0,
    740500.0,
    1066600.0,
    1057900.0,
    825000.0,
    877000.0,
    1785800.0,
    915800.0,
    1035900.0,
    777000.0,
    743400.0,
    1108800.0,
    691800.0,
    1148500.0,
    687100.0,
    674900.0,
    674900.0,
    1646100.0,
    1348400.0,
    1222200.0,
    897700.0,
    876000.0,
    1029400.0,
    1100800.0,
    903400.0,
    1171800.0,
    2106800.0,
    969100.0,
    1113600.0,
    3495100.0,
    1243000.0,
    2892400.0,
    2753900.0,
    1436800.0,
    1622100.0,
    812100.0,
    4232500.0,
    2709900.0,
    1398900.0,
    4064100.0,
    4239900.0,
    1307700.0,
    1767600.0,
    1021800.0,
    819000.0,
    940600.0,
    803500.0,
    848500.0,
    1245100.0,
    747800.0,
    610700.0,
    555300.0,
    1130800.0,
    1792400.0,
    880800.0,
    274500.0,
    605700.0,
    694200.0,
    770200.0,
    692300.0,
    519900.0,
    925300.0,
    1221900.0,
    708700.0,
    661900.0,
    456900.0,
    482200.0,
    712900.0,
    527100.0,
    862700.0,
    1714000.0,
    1103300.0,
    1005600.0,
    571700.0,
    627600.0,
    702900.0,
    404700.0,
    465100.0,
    812600.0,
    592300.0,
    1307800.0,
    873200.0,
    473400.0,
    561100.0,
    604400.0,
    774100.0,
    502600.0,
    500100.0,
    483300.0,
    760900.0,
    444200.0,
    368200.0,
    382300.0,
    517500.0,
    302700.0,
    391700.0,
    380100.0,
    764000.0,
    609700.0,
    516100.0,
    376700.0,
    1254700.0,
    779500.0,
    1329400.0,
    977300.0,
    870700.0,
    2122100.0,
    820900.0,
    660400.0,
    510500.0,
    532500.0,
    504600.0,
    850300.0,
    3661200.0,
    2808000.0,
    1835800.0,
    1139200.0,
    798900.0,
    1418800.0,
    896900.0,
    606400.0,
    560400.0,
    671900.0,
    1190600.0,
    545600.0,
    889400.0,
    856400.0,
    1102200.0,
    1028300.0,
    835300.0,
    3496900.0,
    2549200.0,
    1996600.0,
    1254000.0,
    864500.0,
    770200.0,
    514600.0,
    360800.0,
    364200.0,
    395200.0,
    314000.0,
    565600.0,
    569500.0,
    455900.0,
    489000.0,
    575000.0,
    351900.0,
    656900.0,
    3423600.0,
    794200.0,
    1295600.0,
    709300.0,
    398500.0,
    573200.0,
    799300.0,
    896100.0,
    733600.0,
    478200.0,
    394200.0,
    448300.0,
    465500.0,
    315600.0,
    351200.0,
    362900.0,
    880500.0,
    1624900.0,
    713200.0,
    602200.0,
    730500.0,
    467000.0,
    546400.0,
    415000.0,
    331900.0,
    543200.0,
    444400.0,
    447600.0,
    484800.0,
    453800.0,
    526600.0,
    503100.0,
    418500.0,
    388900.0,
    433100.0,
    330700.0,
    319000.0,
    236300.0,
    309600.0,
    553300.0,
    590800.0,
    619500.0,
    1167200.0,
    528700.0,
    382000.0,
    490000.0,
    1865200.0,
    627600.0,
    597600.0,
    668500.0,
    465700.0,
    454100.0,
    877200.0,
    415600.0,
    320100.0,
    338600.0,
    224700.0,
    376500.0,
    374300.0,
    234700.0,
    324200.0,
    445300.0,
    675200.0,
    723100.0,
    562500.0,
    455900.0,
    420200.0,
    299600.0,
    373900.0,
    449500.0,
    750300.0,
    583200.0,
    430500.0,
    389200.0,
    414700.0,
    527700.0,
    239900.0,
    334500.0,
    328300.0,
    237500.0,
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
        text: "FMS",
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