/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_ARCO");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/05', 7.77, 7.87, 7.88, 7.71],
    ['2022/08/08', 7.93, 7.94, 8.09, 7.89],
    ['2022/08/09', 7.98, 7.91, 8.03, 7.86],
    ['2022/08/10', 8.06, 7.88, 8.24, 7.76],
    ['2022/08/11', 7.95, 7.38, 7.95, 7.31],
    ['2022/08/12', 7.35, 7.49, 7.52, 7.35],
    ['2022/08/15', 7.48, 7.47, 7.51, 7.3],
    ['2022/08/16', 7.45, 7.36, 7.45, 7.26],
    ['2022/08/17', 7.41, 7.32, 7.42, 7.21],
    ['2022/08/18', 7.32, 7.34, 7.36, 7.23],
    ['2022/08/19', 7.27, 7.42, 7.46, 7.19],
    ['2022/08/22', 7.37, 7.42, 7.45, 7.25],
    ['2022/08/23', 7.47, 7.51, 7.6, 7.44],
    ['2022/08/24', 7.43, 7.79, 7.8, 7.41],
    ['2022/08/25', 7.87, 7.89, 7.92, 7.71],
    ['2022/08/26', 7.95, 7.67, 7.95, 7.61],
    ['2022/08/29', 7.59, 7.73, 7.76, 7.59],
    ['2022/08/30', 7.73, 7.39, 7.8, 7.35],
    ['2022/08/31', 7.37, 7.3, 7.48, 7.28],
    ['2022/09/01', 7.25, 7.29, 7.3, 7.16],
    ['2022/09/02', 7.31, 7.31, 7.45, 7.15],
    ['2022/09/06', 7.35, 7.25, 7.38, 7.1],
    ['2022/09/07', 7.25, 7.37, 7.41, 7.22],
    ['2022/09/08', 7.32, 7.48, 7.49, 7.28],
    ['2022/09/09', 7.52, 7.58, 7.66, 7.45],
    ['2022/09/12', 7.66, 7.72, 7.78, 7.65],
    ['2022/09/13', 7.6, 7.51, 7.79, 7.5],
    ['2022/09/14', 7.51, 7.52, 7.64, 7.45],
    ['2022/09/15', 7.49, 7.44, 7.56, 7.43],
    ['2022/09/16', 7.3, 7.42, 7.49, 7.24],
    ['2022/09/19', 7.39, 7.59, 7.66, 7.36],
    ['2022/09/20', 7.49, 7.52, 7.65, 7.49],
    ['2022/09/21', 7.36, 7.22, 7.54, 7.13],
    ['2022/09/22', 7.25, 7.26, 7.33, 7.1],
    ['2022/09/23', 7.1, 7.0, 7.14, 6.84],
    ['2022/09/26', 6.94, 6.75, 7.01, 6.73],
    ['2022/09/27', 6.91, 6.92, 7.08, 6.88],
    ['2022/09/28', 6.91, 7.12, 7.19, 6.88],
    ['2022/09/29', 7.06, 7.06, 7.1, 6.64],
    ['2022/09/30', 7.06, 7.29, 7.35, 6.97],
    ['2022/10/03', 7.45, 7.66, 7.92, 7.34],
    ['2022/10/04', 7.79, 7.84, 7.89, 7.66],
    ['2022/10/05', 7.76, 7.8, 7.9, 7.74],
    ['2022/10/06', 7.77, 7.72, 7.87, 7.71],
    ['2022/10/07', 7.64, 7.57, 7.66, 7.5],
    ['2022/10/10', 7.55, 7.46, 7.61, 7.38],
    ['2022/10/11', 7.4, 7.25, 7.49, 7.2],
    ['2022/10/12', 7.27, 7.25, 7.34, 7.2],
    ['2022/10/13', 7.08, 7.34, 7.46, 7.06],
    ['2022/10/14', 7.44, 7.16, 7.48, 7.06],
    ['2022/10/17', 7.31, 7.31, 7.43, 7.25],
    ['2022/10/18', 7.42, 7.32, 7.52, 7.28],
    ['2022/10/19', 7.29, 7.4, 7.5, 7.29],
    ['2022/10/20', 7.39, 7.31, 7.42, 7.26],
    ['2022/10/21', 7.24, 7.16, 7.32, 7.01],
    ['2022/10/24', 7.16, 6.9, 7.16, 6.83],
    ['2022/10/25', 6.96, 7.01, 7.17, 6.94],
    ['2022/10/26', 7.1, 7.28, 7.36, 7.09],
    ['2022/10/27', 7.32, 7.35, 7.44, 7.29],
    ['2022/10/28', 7.38, 7.47, 7.53, 7.38],
    ['2022/10/31', 7.43, 7.54, 7.56, 7.35],
    ['2022/11/01', 7.6, 7.71, 7.77, 7.5],
    ['2022/11/02', 7.71, 7.35, 7.71, 7.35],
    ['2022/11/03', 7.26, 7.43, 7.53, 7.24],
    ['2022/11/04', 7.6, 7.51, 7.6, 7.46],
    ['2022/11/07', 7.58, 7.51, 7.63, 7.34],
    ['2022/11/08', 7.49, 7.41, 7.51, 7.34],
    ['2022/11/09', 7.37, 7.27, 7.42, 7.25],
    ['2022/11/10', 7.45, 6.86, 7.45, 6.74],
    ['2022/11/11', 6.91, 7.01, 7.09, 6.73],
    ['2022/11/14', 7.05, 7.05, 7.17, 6.88],
    ['2022/11/15', 7.18, 7.3, 7.41, 7.15],
    ['2022/11/16', 7.75, 7.21, 8.15, 7.16],
    ['2022/11/17', 7.15, 7.51, 7.55, 7.09],
    ['2022/11/18', 7.59, 7.29, 7.67, 7.27],
    ['2022/11/21', 7.24, 7.28, 7.4, 7.13],
    ['2022/11/22', 7.26, 7.21, 7.36, 7.19],
    ['2022/11/23', 7.21, 7.26, 7.27, 7.02],
    ['2022/11/25', 7.33, 7.25, 7.38, 7.22],
    ['2022/11/28', 7.21, 7.36, 7.4, 7.17],
    ['2022/11/29', 7.35, 7.41, 7.5, 7.26],
    ['2022/11/30', 7.45, 7.49, 7.5, 7.37],
    ['2022/12/01', 7.46, 7.34, 7.49, 7.25],
    ['2022/12/02', 7.3, 7.58, 7.81, 7.3],
    ['2022/12/05', 7.57, 7.45, 7.58, 7.34],
    ['2022/12/06', 7.51, 7.44, 7.51, 7.36],
    ['2022/12/07', 7.36, 7.42, 7.53, 7.35],
    ['2022/12/08', 7.44, 7.31, 7.47, 7.26],
    ['2022/12/09', 7.27, 7.26, 7.36, 7.21],
    ['2022/12/12', 7.3, 7.36, 7.46, 7.16],
    ['2022/12/13', 7.48, 7.42, 7.54, 7.36],
    ['2022/12/14', 7.41, 7.55, 7.57, 7.29],
    ['2022/12/15', 7.5, 7.55, 7.69, 7.43],
    ['2022/12/16', 7.54, 7.54, 7.6, 7.49],
    ['2022/12/19', 7.55, 7.95, 8.02, 7.52],
    ['2022/12/20', 7.85, 7.84, 8.24, 7.76],
    ['2022/12/21', 7.86, 8.08, 8.2, 7.86],
    ['2022/12/22', 8.03, 7.97, 8.15, 7.88],
    ['2022/12/23', 7.96, 8.32, 8.32, 7.88],
    ['2022/12/27', 8.34, 8.14, 8.34, 8.11],
    ['2022/12/28', 8.16, 8.2, 8.25, 8.1],
    ['2022/12/29', 8.27, 8.35, 8.4, 8.24],
    ['2022/12/30', 8.34, 8.36, 8.41, 8.27],
    ['2023/01/03', 8.36, 7.78, 8.4, 7.76],
    ['2023/01/04', 7.8, 7.81, 7.93, 7.78],
    ['2023/01/05', 7.72, 7.86, 7.89, 7.68],
    ['2023/01/06', 7.91, 8.14, 8.17, 7.86],
    ['2023/01/09', 8.19, 8.16, 8.3, 8.09],
    ['2023/01/10', 8.15, 8.33, 8.34, 8.14],
    ['2023/01/11', 8.32, 8.59, 8.73, 8.3],
    ['2023/01/12', 8.57, 8.5, 8.59, 8.37],
    ['2023/01/13', 8.48, 8.73, 8.81, 8.48],
    ['2023/01/17', 8.73, 8.57, 8.78, 8.52],
    ['2023/01/18', 8.61, 8.56, 8.69, 8.46],
    ['2023/01/19', 8.59, 8.56, 8.61, 8.43],
    ['2023/01/20', 8.58, 8.69, 8.73, 8.57],
    ['2023/01/23', 8.74, 8.69, 8.86, 8.66],
    ['2023/01/24', 8.79, 8.91, 9.04, 8.6],
    ['2023/01/25', 8.85, 9.0, 9.04, 8.68],
    ['2023/01/26', 9.0, 8.79, 9.0, 8.78],
    ['2023/01/27', 8.76, 8.68, 8.82, 8.64],
    ['2023/01/30', 8.6, 8.38, 8.64, 8.38],
    ['2023/01/31', 8.45, 8.5, 8.57, 8.41],
    ['2023/02/01', 8.47, 8.52, 8.61, 8.38],
    ['2023/02/02', 8.49, 8.19, 8.49, 8.12],
    ['2023/02/03', 8.24, 8.4, 8.47, 8.24],
    ['2023/02/06', 8.5, 8.61, 8.77, 8.47],
    ['2023/02/07', 8.59, 8.47, 8.59, 8.31],
    ['2023/02/08', 8.43, 8.37, 8.47, 8.28],
    ['2023/02/09', 8.41, 8.12, 8.42, 8.05],
    ['2023/02/10', 8.15, 8.15, 8.21, 8.1],
    ['2023/02/13', 8.17, 8.29, 8.34, 8.16],
    ['2023/02/14', 8.27, 8.36, 8.46, 8.24],
    ['2023/02/15', 8.33, 8.48, 8.49, 8.33],
    ['2023/02/16', 8.44, 8.48, 8.6, 8.39],
    ['2023/02/17', 8.45, 8.5, 8.59, 8.4],
    ['2023/02/21', 8.43, 8.38, 8.51, 8.37],
    ['2023/02/22', 8.37, 8.53, 8.58, 8.37],
    ['2023/02/23', 8.54, 8.55, 8.65, 8.45],
    ['2023/02/24', 8.5, 8.31, 8.5, 8.21],
    ['2023/02/27', 8.35, 8.16, 8.43, 8.15],
    ['2023/02/28', 8.17, 8.26, 8.28, 8.15],
    ['2023/03/01', 8.29, 8.25, 8.29, 8.11],
    ['2023/03/02', 8.2, 8.21, 8.29, 8.18],
    ['2023/03/03', 8.21, 8.29, 8.3, 8.19],
    ['2023/03/06', 8.3, 8.31, 8.45, 8.27],
    ['2023/03/07', 8.29, 8.23, 8.33, 8.17],
    ['2023/03/08', 8.25, 8.43, 8.44, 8.23],
    ['2023/03/09', 8.46, 8.09, 8.47, 8.08],
    ['2023/03/10', 8.06, 7.86, 8.09, 7.81],
    ['2023/03/13', 7.75, 7.85, 7.89, 7.71],
    ['2023/03/14', 7.87, 8.03, 8.14, 7.87],
    ['2023/03/15', 8.21, 7.83, 8.38, 7.2],
    ['2023/03/16', 7.68, 7.94, 7.94, 7.55],
    ['2023/03/17', 7.8, 7.81, 7.88, 7.71],
    ['2023/03/20', 7.84, 7.71, 7.9, 7.69],
    ['2023/03/21', 7.73, 7.76, 7.87, 7.72],
    ['2023/03/22', 7.8, 7.76, 7.89, 7.71],
    ['2023/03/23', 7.82, 7.5, 7.91, 7.44],
    ['2023/03/24', 7.38, 7.35, 7.46, 7.27],
    ['2023/03/27', 7.4, 7.38, 7.45, 7.25],
    ['2023/03/28', 7.41, 7.53, 7.63, 7.41],
    ['2023/03/29', 7.55, 7.62, 7.63, 7.53],
    ['2023/03/30', 7.69, 7.65, 7.76, 7.6],
    ['2023/03/31', 7.73, 7.71, 7.78, 7.65],
    ['2023/04/03', 7.72, 7.6, 7.74, 7.55],
    ['2023/04/04', 7.61, 7.25, 7.61, 7.19],
    ['2023/04/05', 7.26, 7.17, 7.29, 7.05],
    ['2023/04/06', 7.16, 7.12, 7.2, 7.02],
    ['2023/04/10', 7.08, 7.21, 7.23, 7.04],
    ['2023/04/11', 7.26, 7.44, 7.5, 7.22],
    ['2023/04/12', 7.52, 7.46, 7.62, 7.41],
    ['2023/04/13', 7.47, 7.5, 7.52, 7.44],
    ['2023/04/14', 7.47, 7.72, 7.77, 7.46],
    ['2023/04/17', 7.83, 8.08, 8.09, 7.8],
    ['2023/04/18', 8.08, 8.13, 8.3, 8.04],
    ['2023/04/19', 8.13, 7.97, 8.14, 7.9],
    ['2023/04/20', 7.94, 7.95, 8.04, 7.83],
    ['2023/04/21', 7.94, 7.83, 7.95, 7.77],
    ['2023/04/24', 7.91, 8.03, 8.25, 7.9],
    ['2023/04/25', 8.0, 7.9, 8.04, 7.84],
    ['2023/04/26', 7.91, 7.83, 7.96, 7.8],
    ['2023/04/27', 7.86, 7.91, 7.97, 7.8],
    ['2023/04/28', 7.86, 7.94, 7.99, 7.82],
    ['2023/05/01', 7.93, 7.96, 8.09, 7.87],
    ['2023/05/02', 7.95, 7.91, 7.98, 7.81],
    ['2023/05/03', 7.86, 7.92, 7.96, 7.83],
    ['2023/05/04', 7.95, 7.96, 7.97, 7.78],
    ['2023/05/05', 8.0, 8.31, 8.36, 7.93],
    ['2023/05/08', 8.35, 8.35, 8.45, 8.3],
    ['2023/05/09', 8.34, 8.36, 8.42, 8.28],
    ['2023/05/10', 8.41, 8.59, 8.6, 8.37],
    ['2023/05/11', 8.54, 8.5, 8.55, 8.36],
    ['2023/05/12', 8.5, 8.48, 8.56, 8.35],
    ['2023/05/15', 8.48, 8.47, 8.54, 8.34],
    ['2023/05/16', 8.4, 8.4, 8.59, 8.39],
    ['2023/05/17', 8.9, 9.1, 9.2, 8.73],
    ['2023/05/18', 9.17, 9.13, 9.26, 8.94],
    ['2023/05/19', 9.19, 9.01, 9.19, 8.97],
    ['2023/05/22', 9.06, 8.99, 9.11, 8.98],
    ['2023/05/23', 8.97, 8.66, 8.97, 8.64],
    ['2023/05/24', 8.62, 8.71, 8.74, 8.49],
    ['2023/05/25', 8.71, 8.64, 8.81, 8.63],
    ['2023/05/26', 8.72, 8.89, 8.93, 8.7],
    ['2023/05/30', 8.91, 8.75, 8.95, 8.58],
    ['2023/05/31', 8.71, 8.45, 8.72, 8.32],
    ['2023/06/01', 8.48, 8.73, 8.81, 8.48],
    ['2023/06/02', 8.87, 8.83, 8.93, 8.78],
    ['2023/06/05', 8.77, 8.75, 8.82, 8.68],
    ['2023/06/06', 8.76, 8.96, 8.97, 8.71],
    ['2023/06/07', 9.0, 8.94, 9.18, 8.91],
    ['2023/06/08', 8.94, 8.9, 9.08, 8.89],
    ['2023/06/09', 9.01, 9.0, 9.12, 8.95],
    ['2023/06/12', 8.99, 9.02, 9.05, 8.96],
    ['2023/06/13', 9.06, 9.05, 9.12, 9.02],
    ['2023/06/14', 9.07, 9.22, 9.23, 9.03],
    ['2023/06/15', 9.2, 9.34, 9.37, 9.2],
    ['2023/06/16', 9.36, 9.09, 9.36, 9.07],
    ['2023/06/20', 9.1, 9.46, 9.56, 9.1],
    ['2023/06/21', 9.49, 9.56, 9.72, 9.45],
    ['2023/06/22', 9.48, 9.68, 9.82, 9.4],
    ['2023/06/23', 9.57, 9.95, 10.0, 9.57],
    ['2023/06/26', 9.95, 9.96, 10.2, 9.67],
    ['2023/06/27', 9.95, 10.02, 10.08, 9.87],
    ['2023/06/28', 10.03, 9.82, 10.03, 9.79],
    ['2023/06/29', 9.85, 9.98, 10.0, 9.85],
    ['2023/06/30', 10.11, 10.25, 10.3, 10.09],
    ['2023/07/03', 10.21, 10.24, 10.26, 10.1],
    ['2023/07/05', 10.13, 10.32, 10.33, 10.13],
    ['2023/07/06', 10.26, 10.19, 10.54, 10.11],
    ['2023/07/07', 10.18, 10.49, 10.51, 10.17],
    ['2023/07/10', 10.46, 10.76, 10.82, 10.45],
    ['2023/07/11', 10.75, 10.73, 10.76, 10.44],
    ['2023/07/12', 10.87, 10.46, 10.97, 10.38],
    ['2023/07/13', 10.47, 10.68, 10.81, 10.43],
    ['2023/07/14', 10.66, 10.37, 10.66, 10.3],
    ['2023/07/17', 10.34, 10.42, 10.51, 10.29],
    ['2023/07/18', 10.42, 10.55, 10.64, 10.31],
    ['2023/07/19', 10.54, 10.5, 10.67, 10.38],
    ['2023/07/20', 10.49, 10.48, 10.52, 10.38],
    ['2023/07/21', 10.58, 10.56, 10.62, 10.49],
    ['2023/07/24', 10.66, 11.1, 11.12, 10.62],
    ['2023/07/25', 11.16, 11.13, 11.25, 11.01],
    ['2023/07/26', 11.14, 11.3, 11.32, 11.13],
    ['2023/07/27', 11.3, 11.3, 11.47, 11.23],
    ['2023/07/28', 11.44, 11.22, 11.44, 11.17],
    ['2023/07/31', 11.24, 11.3, 11.33, 11.16],
    ['2023/08/01', 11.22, 11.07, 11.33, 10.99],
    ['2023/08/02', 11.01, 10.8, 11.03, 10.66],
    ['2023/08/03', 10.76, 10.77, 10.92, 10.69],
]);
var volumes = [
    369900.0,
    1088800.0,
    1161700.0,
    2153300.0,
    1133600.0,
    520600.0,
    965500.0,
    1114600.0,
    777500.0,
    487900.0,
    949900.0,
    765500.0,
    653200.0,
    835600.0,
    450700.0,
    704800.0,
    437100.0,
    832800.0,
    621000.0,
    533600.0,
    593900.0,
    427200.0,
    467400.0,
    546400.0,
    455100.0,
    825500.0,
    888300.0,
    529700.0,
    603400.0,
    740500.0,
    315300.0,
    419600.0,
    1624200.0,
    700200.0,
    1685300.0,
    910100.0,
    717500.0,
    442800.0,
    1748000.0,
    1067300.0,
    2039600.0,
    2614700.0,
    898100.0,
    495600.0,
    535200.0,
    481000.0,
    824000.0,
    317400.0,
    826000.0,
    962000.0,
    436000.0,
    500200.0,
    573000.0,
    327700.0,
    832400.0,
    704700.0,
    967100.0,
    1394100.0,
    881100.0,
    758700.0,
    576700.0,
    832000.0,
    455900.0,
    587800.0,
    462700.0,
    608400.0,
    387800.0,
    289900.0,
    1019900.0,
    1820400.0,
    983500.0,
    1049400.0,
    2814700.0,
    2309500.0,
    381000.0,
    630200.0,
    457700.0,
    613900.0,
    416700.0,
    707100.0,
    817400.0,
    596400.0,
    1463300.0,
    1344500.0,
    771900.0,
    439200.0,
    455700.0,
    457000.0,
    337600.0,
    1004400.0,
    1307100.0,
    1495500.0,
    1338500.0,
    1910900.0,
    1364600.0,
    1580800.0,
    1369600.0,
    858100.0,
    925100.0,
    559600.0,
    815700.0,
    449600.0,
    357200.0,
    861200.0,
    840100.0,
    632000.0,
    1242800.0,
    322900.0,
    874500.0,
    2011100.0,
    823500.0,
    929400.0,
    551600.0,
    558400.0,
    408000.0,
    458800.0,
    1409400.0,
    811200.0,
    696500.0,
    607800.0,
    352400.0,
    446300.0,
    538700.0,
    661200.0,
    1420700.0,
    809400.0,
    1017800.0,
    644800.0,
    393400.0,
    655900.0,
    366000.0,
    457100.0,
    509500.0,
    667600.0,
    898100.0,
    413800.0,
    668100.0,
    1287100.0,
    840800.0,
    656000.0,
    431400.0,
    1063800.0,
    624200.0,
    661300.0,
    610500.0,
    543700.0,
    397500.0,
    752200.0,
    468500.0,
    819400.0,
    1510100.0,
    784100.0,
    2148200.0,
    738500.0,
    1105100.0,
    503200.0,
    756100.0,
    424700.0,
    757000.0,
    849400.0,
    645700.0,
    786200.0,
    409300.0,
    470700.0,
    582100.0,
    479100.0,
    831800.0,
    905200.0,
    845000.0,
    829600.0,
    773300.0,
    1210500.0,
    1152900.0,
    976100.0,
    1070500.0,
    1309400.0,
    845500.0,
    499000.0,
    489100.0,
    862000.0,
    593800.0,
    686300.0,
    758800.0,
    703800.0,
    342500.0,
    566500.0,
    560700.0,
    780100.0,
    855200.0,
    530400.0,
    367700.0,
    842700.0,
    1274200.0,
    962900.0,
    821300.0,
    918400.0,
    3058500.0,
    1466100.0,
    1418500.0,
    690500.0,
    816300.0,
    1094900.0,
    986300.0,
    1172300.0,
    1337500.0,
    4261100.0,
    1085500.0,
    816700.0,
    613500.0,
    825700.0,
    705100.0,
    992600.0,
    686000.0,
    710100.0,
    1452500.0,
    1532700.0,
    1639200.0,
    840000.0,
    1499300.0,
    1920000.0,
    2986500.0,
    3749500.0,
    2775000.0,
    1935400.0,
    1122400.0,
    1439600.0,
    1839300.0,
    535400.0,
    1242100.0,
    3271400.0,
    1711400.0,
    2703200.0,
    2272700.0,
    4916200.0,
    1457100.0,
    807800.0,
    1061000.0,
    1228600.0,
    601100.0,
    540400.0,
    691700.0,
    1600100.0,
    1053400.0,
    951400.0,
    1922500.0,
    691200.0,
    674300.0,
    698500.0,
    908200.0,
    1154800.0,
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
        text: "ARCO",
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