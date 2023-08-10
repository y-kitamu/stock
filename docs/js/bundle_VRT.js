/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_VRT");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/11', 13.14, 12.83, 13.4, 12.74],
    ['2022/08/12', 13.06, 13.52, 13.54, 12.88],
    ['2022/08/15', 13.42, 13.34, 13.68, 13.1],
    ['2022/08/16', 13.15, 13.39, 13.65, 13.07],
    ['2022/08/17', 12.99, 13.11, 13.25, 12.73],
    ['2022/08/18', 13.11, 13.06, 13.25, 12.91],
    ['2022/08/19', 12.84, 12.33, 12.97, 12.3],
    ['2022/08/22', 11.96, 12.05, 12.27, 11.84],
    ['2022/08/23', 12.05, 12.05, 12.19, 11.94],
    ['2022/08/24', 12.12, 12.21, 12.32, 11.98],
    ['2022/08/25', 12.39, 12.51, 12.65, 12.24],
    ['2022/08/26', 12.48, 11.83, 12.48, 11.79],
    ['2022/08/29', 11.55, 11.88, 12.1, 11.52],
    ['2022/08/30', 12.03, 11.75, 12.17, 11.58],
    ['2022/08/31', 11.81, 11.53, 11.87, 11.31],
    ['2022/09/01', 11.35, 11.49, 11.53, 11.0],
    ['2022/09/02', 11.72, 11.21, 11.72, 11.15],
    ['2022/09/06', 11.27, 11.18, 11.29, 11.02],
    ['2022/09/07', 11.14, 11.71, 11.84, 11.1],
    ['2022/09/08', 11.52, 12.23, 12.26, 11.52],
    ['2022/09/09', 12.38, 13.37, 13.45, 12.38],
    ['2022/09/12', 13.25, 13.43, 13.52, 13.14],
    ['2022/09/13', 12.84, 12.72, 13.18, 12.64],
    ['2022/09/14', 12.67, 13.06, 13.1, 12.22],
    ['2022/09/15', 12.92, 13.02, 13.35, 12.89],
    ['2022/09/16', 12.66, 12.33, 12.69, 12.11],
    ['2022/09/19', 12.1, 12.51, 12.56, 12.06],
    ['2022/09/20', 12.32, 12.2, 12.44, 12.08],
    ['2022/09/21', 12.3, 11.75, 12.42, 11.7],
    ['2022/09/22', 11.68, 11.03, 11.76, 10.98],
    ['2022/09/23', 10.53, 9.95, 10.74, 9.76],
    ['2022/09/26', 9.82, 9.79, 10.25, 9.64],
    ['2022/09/27', 9.98, 9.68, 10.2, 9.6],
    ['2022/09/28', 9.71, 10.34, 10.46, 9.67],
    ['2022/09/29', 9.99, 9.69, 10.09, 9.48],
    ['2022/09/30', 9.66, 9.72, 10.1, 9.6],
    ['2022/10/03', 9.93, 11.25, 11.65, 9.89],
    ['2022/10/04', 11.66, 11.96, 12.32, 11.57],
    ['2022/10/05', 11.62, 11.99, 12.06, 11.38],
    ['2022/10/06', 11.98, 11.86, 12.22, 11.77],
    ['2022/10/07', 11.62, 10.95, 11.76, 10.92],
    ['2022/10/10', 11.01, 11.24, 11.36, 10.98],
    ['2022/10/11', 11.15, 11.08, 11.33, 10.77],
    ['2022/10/12', 11.11, 10.91, 11.23, 10.83],
    ['2022/10/13', 10.44, 10.88, 11.03, 10.23],
    ['2022/10/14', 10.92, 10.22, 11.15, 10.21],
    ['2022/10/17', 10.51, 10.86, 10.89, 10.46],
    ['2022/10/18', 11.35, 11.48, 11.58, 11.23],
    ['2022/10/19', 11.33, 11.4, 11.47, 11.1],
    ['2022/10/20', 12.14, 12.37, 13.18, 12.08],
    ['2022/10/21', 12.31, 13.21, 13.39, 12.17],
    ['2022/10/24', 13.26, 13.78, 13.89, 12.99],
    ['2022/10/25', 13.89, 14.13, 14.36, 13.85],
    ['2022/10/26', 14.22, 14.6, 14.75, 13.69],
    ['2022/10/27', 15.25, 14.79, 15.74, 14.49],
    ['2022/10/28', 14.78, 14.96, 15.01, 14.15],
    ['2022/10/31', 14.88, 14.31, 15.03, 14.26],
    ['2022/11/01', 14.65, 14.84, 14.93, 14.2],
    ['2022/11/02', 14.72, 14.08, 14.85, 14.05],
    ['2022/11/03', 13.8, 13.92, 14.36, 13.74],
    ['2022/11/04', 14.31, 14.18, 14.4, 13.64],
    ['2022/11/07', 14.83, 14.6, 14.94, 14.01],
    ['2022/11/08', 14.63, 14.66, 14.81, 14.28],
    ['2022/11/09', 14.36, 14.64, 14.76, 14.22],
    ['2022/11/10', 15.6, 15.28, 16.07, 15.15],
    ['2022/11/11', 15.41, 15.36, 16.02, 15.26],
    ['2022/11/14', 15.14, 14.93, 15.45, 14.92],
    ['2022/11/15', 15.43, 14.7, 15.74, 14.44],
    ['2022/11/16', 14.44, 13.88, 14.59, 13.39],
    ['2022/11/17', 13.52, 13.99, 14.1, 13.46],
    ['2022/11/18', 14.19, 13.84, 14.24, 13.57],
    ['2022/11/21', 13.79, 14.03, 14.2, 13.66],
    ['2022/11/22', 14.07, 13.81, 14.19, 13.57],
    ['2022/11/23', 13.83, 13.86, 14.09, 13.82],
    ['2022/11/25', 13.83, 13.74, 13.95, 13.6],
    ['2022/11/28', 13.49, 13.1, 14.06, 13.02],
    ['2022/11/29', 13.16, 13.2, 13.27, 13.03],
    ['2022/11/30', 13.26, 13.85, 13.91, 13.08],
    ['2022/12/01', 14.25, 14.2, 14.57, 14.05],
    ['2022/12/02', 13.88, 14.76, 14.92, 13.82],
    ['2022/12/05', 14.49, 14.35, 14.61, 14.16],
    ['2022/12/06', 14.42, 13.93, 14.49, 13.82],
    ['2022/12/07', 13.87, 13.66, 14.03, 13.49],
    ['2022/12/08', 13.81, 14.24, 14.52, 13.7],
    ['2022/12/09', 14.17, 13.64, 14.44, 13.64],
    ['2022/12/12', 13.58, 13.62, 13.66, 13.34],
    ['2022/12/13', 14.28, 14.08, 14.49, 13.76],
    ['2022/12/14', 14.01, 13.91, 14.26, 13.77],
    ['2022/12/15', 13.57, 13.25, 13.75, 13.14],
    ['2022/12/16', 13.08, 13.14, 13.27, 12.89],
    ['2022/12/19', 13.16, 12.68, 13.16, 12.61],
    ['2022/12/20', 12.55, 12.85, 12.98, 12.33],
    ['2022/12/21', 13.0, 13.14, 13.27, 12.91],
    ['2022/12/22', 12.92, 12.78, 13.0, 12.53],
    ['2022/12/23', 12.77, 12.82, 12.89, 12.55],
    ['2022/12/27', 12.85, 12.58, 13.01, 12.56],
    ['2022/12/28', 12.63, 12.35, 12.81, 12.3],
    ['2022/12/29', 12.58, 13.53, 13.77, 12.58],
    ['2022/12/30', 13.26, 13.66, 13.68, 13.24],
    ['2023/01/03', 13.86, 13.3, 14.11, 13.21],
    ['2023/01/04', 13.51, 13.5, 13.61, 13.14],
    ['2023/01/05', 13.35, 13.53, 13.57, 13.14],
    ['2023/01/06', 13.74, 14.12, 14.2, 13.53],
    ['2023/01/09', 14.26, 14.82, 15.1, 14.2],
    ['2023/01/10', 14.72, 14.52, 14.76, 14.05],
    ['2023/01/11', 14.7, 14.64, 14.79, 14.37],
    ['2023/01/12', 14.71, 14.98, 15.0, 14.48],
    ['2023/01/13', 14.82, 14.97, 15.0, 14.66],
    ['2023/01/17', 14.95, 14.96, 15.0, 14.76],
    ['2023/01/18', 15.02, 14.48, 15.39, 14.47],
    ['2023/01/19', 14.22, 13.94, 14.38, 13.91],
    ['2023/01/20', 14.11, 14.52, 14.6, 13.9],
    ['2023/01/23', 14.65, 15.53, 15.62, 14.61],
    ['2023/01/24', 15.54, 15.25, 15.57, 15.11],
    ['2023/01/25', 14.81, 14.35, 14.84, 14.29],
    ['2023/01/26', 14.61, 14.05, 14.67, 13.65],
    ['2023/01/27', 13.9, 14.38, 14.51, 13.86],
    ['2023/01/30', 14.09, 13.96, 14.19, 13.77],
    ['2023/01/31', 14.03, 14.22, 14.3, 13.89],
    ['2023/02/01', 14.18, 14.7, 14.9, 13.98],
    ['2023/02/02', 14.93, 15.04, 15.36, 14.84],
    ['2023/02/03', 14.63, 14.59, 15.23, 14.48],
    ['2023/02/06', 14.32, 14.2, 14.47, 14.08],
    ['2023/02/07', 14.29, 15.25, 15.29, 14.19],
    ['2023/02/08', 15.09, 15.73, 15.85, 14.98],
    ['2023/02/09', 16.05, 15.65, 16.29, 15.44],
    ['2023/02/10', 15.56, 14.46, 15.67, 14.36],
    ['2023/02/13', 14.47, 15.22, 15.23, 14.35],
    ['2023/02/14', 15.05, 15.63, 15.7, 14.9],
    ['2023/02/15', 15.63, 16.07, 16.1, 15.44],
    ['2023/02/16', 15.74, 16.15, 16.22, 15.62],
    ['2023/02/17', 15.82, 16.06, 16.08, 15.67],
    ['2023/02/21', 15.83, 15.26, 16.0, 15.2],
    ['2023/02/22', 17.01, 15.52, 17.88, 15.23],
    ['2023/02/23', 15.9, 16.46, 16.49, 15.54],
    ['2023/02/24', 16.24, 15.81, 16.24, 15.39],
    ['2023/02/27', 16.03, 15.76, 16.09, 15.68],
    ['2023/02/28', 15.66, 16.25, 16.34, 15.62],
    ['2023/03/01', 16.17, 16.13, 16.46, 15.98],
    ['2023/03/02', 15.78, 15.83, 15.92, 15.6],
    ['2023/03/03', 15.88, 16.36, 16.45, 15.74],
    ['2023/03/06', 16.39, 16.19, 16.61, 16.02],
    ['2023/03/07', 16.14, 15.84, 16.34, 15.79],
    ['2023/03/08', 15.87, 15.74, 15.97, 15.68],
    ['2023/03/09', 15.87, 15.38, 15.94, 15.35],
    ['2023/03/10', 15.39, 14.24, 15.39, 14.06],
    ['2023/03/13', 13.94, 13.83, 14.09, 13.49],
    ['2023/03/14', 14.19, 13.95, 14.39, 13.77],
    ['2023/03/15', 13.43, 13.32, 13.56, 12.9],
    ['2023/03/16', 13.1, 13.6, 13.75, 13.03],
    ['2023/03/17', 13.48, 13.12, 13.66, 13.09],
    ['2023/03/20', 13.33, 13.22, 13.36, 12.97],
    ['2023/03/21', 13.68, 13.77, 13.82, 13.59],
    ['2023/03/22', 13.79, 13.45, 14.05, 13.44],
    ['2023/03/23', 13.6, 13.23, 14.05, 12.99],
    ['2023/03/24', 13.04, 13.09, 13.17, 12.69],
    ['2023/03/27', 13.3, 13.19, 13.36, 13.04],
    ['2023/03/28', 13.19, 13.21, 13.35, 13.04],
    ['2023/03/29', 13.53, 13.71, 13.81, 13.39],
    ['2023/03/30', 13.99, 13.8, 14.15, 13.78],
    ['2023/03/31', 13.96, 14.31, 14.44, 13.89],
    ['2023/04/03', 14.24, 13.97, 14.45, 13.73],
    ['2023/04/04', 13.98, 13.1, 14.1, 12.95],
    ['2023/04/05', 12.92, 12.92, 13.0, 12.72],
    ['2023/04/06', 12.85, 12.38, 12.89, 12.26],
    ['2023/04/10', 12.3, 12.55, 12.62, 12.23],
    ['2023/04/11', 12.6, 12.55, 12.75, 12.47],
    ['2023/04/12', 12.67, 12.25, 12.67, 12.19],
    ['2023/04/13', 12.28, 12.43, 12.48, 12.05],
    ['2023/04/14', 12.36, 12.43, 12.63, 12.19],
    ['2023/04/17', 12.44, 12.57, 12.72, 12.34],
    ['2023/04/18', 12.65, 12.36, 12.73, 12.12],
    ['2023/04/19', 12.14, 12.49, 12.51, 12.02],
    ['2023/04/20', 12.28, 12.27, 12.52, 12.16],
    ['2023/04/21', 12.23, 12.18, 12.34, 11.95],
    ['2023/04/24', 12.26, 12.73, 12.77, 12.2],
    ['2023/04/25', 12.55, 12.23, 12.67, 12.22],
    ['2023/04/26', 14.33, 13.59, 15.15, 13.06],
    ['2023/04/27', 14.0, 14.49, 14.69, 13.73],
    ['2023/04/28', 14.51, 14.92, 15.09, 14.4],
    ['2023/05/01', 14.78, 14.82, 15.01, 14.64],
    ['2023/05/02', 14.84, 14.92, 14.99, 14.49],
    ['2023/05/03', 14.98, 14.93, 15.55, 14.89],
    ['2023/05/04', 14.9, 14.31, 14.92, 14.27],
    ['2023/05/05', 14.44, 14.98, 15.23, 14.28],
    ['2023/05/08', 15.18, 15.08, 15.22, 14.68],
    ['2023/05/09', 14.91, 15.26, 15.41, 14.84],
    ['2023/05/10', 15.48, 15.29, 15.57, 15.05],
    ['2023/05/11', 15.23, 15.33, 15.41, 15.07],
    ['2023/05/12', 15.31, 15.1, 15.46, 14.95],
    ['2023/05/15', 15.1, 15.32, 15.51, 15.07],
    ['2023/05/16', 15.26, 15.13, 15.26, 15.0],
    ['2023/05/17', 15.31, 15.63, 15.68, 15.18],
    ['2023/05/18', 15.51, 15.96, 16.05, 15.4],
    ['2023/05/19', 16.07, 15.56, 16.09, 15.5],
    ['2023/05/22', 15.77, 16.51, 16.76, 15.64],
    ['2023/05/23', 16.31, 16.29, 16.72, 16.17],
    ['2023/05/24', 16.0, 16.24, 16.39, 15.75],
    ['2023/05/25', 18.3, 18.51, 19.19, 17.94],
    ['2023/05/26', 18.72, 19.74, 20.0, 18.49],
    ['2023/05/30', 20.43, 20.14, 20.53, 19.83],
    ['2023/05/31', 19.87, 19.3, 19.91, 18.74],
    ['2023/06/01', 19.37, 19.4, 19.65, 19.1],
    ['2023/06/02', 19.84, 19.8, 19.96, 19.38],
    ['2023/06/05', 19.44, 20.07, 20.14, 19.36],
    ['2023/06/06', 19.83, 20.0, 20.39, 19.82],
    ['2023/06/07', 20.0, 20.56, 20.61, 19.89],
    ['2023/06/08', 20.39, 20.58, 20.67, 20.06],
    ['2023/06/09', 21.23, 21.19, 21.35, 20.85],
    ['2023/06/12', 21.3, 21.11, 21.54, 21.02],
    ['2023/06/13', 21.44, 22.45, 22.51, 21.4],
    ['2023/06/14', 22.5, 22.55, 22.8, 22.24],
    ['2023/06/15', 22.42, 22.6, 22.77, 22.15],
    ['2023/06/16', 22.8, 22.54, 23.09, 22.36],
    ['2023/06/20', 22.45, 23.34, 23.41, 22.39],
    ['2023/06/21', 23.01, 22.97, 23.18, 22.31],
    ['2023/06/22', 22.76, 23.31, 23.43, 22.6],
    ['2023/06/23', 22.84, 23.64, 23.73, 22.82],
    ['2023/06/26', 23.5, 23.45, 24.26, 23.38],
    ['2023/06/27', 23.51, 23.8, 24.01, 23.27],
    ['2023/06/28', 23.59, 23.35, 23.77, 23.07],
    ['2023/06/29', 23.96, 24.13, 24.33, 23.78],
    ['2023/06/30', 24.34, 24.77, 25.01, 24.03],
    ['2023/07/03', 24.8, 24.87, 24.91, 24.44],
    ['2023/07/05', 24.73, 24.3, 24.78, 24.29],
    ['2023/07/06', 24.06, 24.08, 24.17, 23.51],
    ['2023/07/07', 24.57, 24.65, 25.0, 24.46],
    ['2023/07/10', 24.73, 25.38, 25.5, 24.66],
    ['2023/07/11', 25.31, 25.31, 25.59, 25.19],
    ['2023/07/12', 25.63, 25.76, 25.98, 25.27],
    ['2023/07/13', 25.94, 26.51, 27.03, 25.77],
    ['2023/07/14', 26.52, 26.35, 26.8, 26.03],
    ['2023/07/17', 26.3, 26.35, 26.72, 26.11],
    ['2023/07/18', 26.4, 26.73, 26.82, 26.04],
    ['2023/07/19', 26.52, 26.69, 26.78, 26.28],
    ['2023/07/20', 26.4, 26.17, 26.7, 26.07],
    ['2023/07/21', 26.43, 25.68, 26.47, 25.34],
    ['2023/07/24', 25.52, 25.78, 25.95, 25.23],
    ['2023/07/25', 25.67, 25.99, 26.27, 25.58],
    ['2023/07/26', 25.7, 25.34, 26.08, 25.09],
    ['2023/07/27', 25.85, 25.32, 26.03, 25.09],
    ['2023/07/28', 25.69, 25.95, 26.22, 25.61],
    ['2023/07/31', 25.77, 26.01, 26.1, 25.41],
    ['2023/08/01', 25.67, 26.53, 26.63, 25.48],
    ['2023/08/02', 33.0, 34.29, 35.38, 31.57],
    ['2023/08/03', 34.1, 34.5, 34.59, 33.06],
    ['2023/08/04', 34.96, 35.71, 36.6, 34.76],
    ['2023/08/07', 35.0, 35.72, 36.41, 34.86],
    ['2023/08/08', 35.55, 36.22, 36.47, 34.96],
    ['2023/08/09', 36.37, 34.82, 36.69, 34.67],
]);
var volumes = [
    3215200.0,
    3879600.0,
    3469700.0,
    4084900.0,
    3508300.0,
    2982500.0,
    2441800.0,
    4354400.0,
    2899900.0,
    1583300.0,
    2570600.0,
    2808500.0,
    2213400.0,
    1515300.0,
    3630000.0,
    4762200.0,
    2851000.0,
    1548100.0,
    1378400.0,
    2343000.0,
    4838400.0,
    4121400.0,
    3496900.0,
    4740900.0,
    2073900.0,
    3532400.0,
    2385200.0,
    2641800.0,
    2627800.0,
    5368400.0,
    4132200.0,
    5170900.0,
    3914100.0,
    2642400.0,
    2322900.0,
    2685600.0,
    7401600.0,
    4771200.0,
    3558000.0,
    3685000.0,
    2473300.0,
    5607900.0,
    6192100.0,
    3354300.0,
    9816700.0,
    4166000.0,
    5278400.0,
    16244000.0,
    8678400.0,
    11496700.0,
    5760900.0,
    4174400.0,
    5039100.0,
    7201100.0,
    6037500.0,
    4651600.0,
    4395200.0,
    4321200.0,
    3673200.0,
    5025900.0,
    3230800.0,
    3503300.0,
    3478600.0,
    3066500.0,
    5087200.0,
    3802000.0,
    2306400.0,
    5622600.0,
    5325600.0,
    3607900.0,
    2389400.0,
    2597400.0,
    2076400.0,
    1497400.0,
    1138800.0,
    2479200.0,
    1933700.0,
    2282900.0,
    2557100.0,
    3201300.0,
    2045500.0,
    3117100.0,
    2911900.0,
    2774200.0,
    2469000.0,
    2398700.0,
    2798900.0,
    1893800.0,
    1879200.0,
    4501500.0,
    2309400.0,
    1624400.0,
    1621200.0,
    1663200.0,
    1282300.0,
    2087400.0,
    1633200.0,
    3452000.0,
    2354000.0,
    3458300.0,
    2505300.0,
    2951600.0,
    2504700.0,
    4388600.0,
    2425000.0,
    1817900.0,
    1886400.0,
    1840500.0,
    1798000.0,
    2442900.0,
    2197000.0,
    1491000.0,
    4017500.0,
    2496700.0,
    3616400.0,
    4217200.0,
    3144100.0,
    1808100.0,
    2066500.0,
    2065700.0,
    2340500.0,
    3013600.0,
    3748500.0,
    4991300.0,
    5075000.0,
    3937700.0,
    3260200.0,
    2269400.0,
    2557300.0,
    3354500.0,
    2939900.0,
    3823900.0,
    4883400.0,
    11976700.0,
    7040300.0,
    3492300.0,
    2715300.0,
    3105900.0,
    3630400.0,
    3145900.0,
    3580800.0,
    3333600.0,
    1725800.0,
    2076900.0,
    2730100.0,
    4830100.0,
    4944600.0,
    3306200.0,
    3688700.0,
    2995000.0,
    4399400.0,
    4987600.0,
    2253100.0,
    2532900.0,
    2125000.0,
    1880400.0,
    2611300.0,
    1967800.0,
    3241600.0,
    2696500.0,
    3137000.0,
    2261300.0,
    2943100.0,
    3206800.0,
    3482100.0,
    3449700.0,
    2925500.0,
    2689300.0,
    4092600.0,
    2621000.0,
    2362000.0,
    3716200.0,
    4485600.0,
    1937500.0,
    2575300.0,
    5059300.0,
    6829700.0,
    16760500.0,
    6112600.0,
    5048600.0,
    3492900.0,
    3744800.0,
    5293100.0,
    3302300.0,
    4187300.0,
    2130000.0,
    3253100.0,
    2510000.0,
    1672000.0,
    1711300.0,
    2162400.0,
    1630200.0,
    2741100.0,
    4900300.0,
    3661200.0,
    7543800.0,
    5738800.0,
    4048800.0,
    29409700.0,
    15999900.0,
    9997500.0,
    5854900.0,
    4783200.0,
    4021700.0,
    4166700.0,
    2966800.0,
    5017800.0,
    3695200.0,
    3982700.0,
    4766800.0,
    6638700.0,
    4516600.0,
    4453300.0,
    7713600.0,
    5143100.0,
    4860800.0,
    4356900.0,
    6516500.0,
    7315200.0,
    3704700.0,
    5087900.0,
    8865500.0,
    5215500.0,
    1881900.0,
    3535200.0,
    3810100.0,
    2532500.0,
    2523000.0,
    3047500.0,
    3120000.0,
    5184500.0,
    3135200.0,
    3027400.0,
    4121200.0,
    6889800.0,
    6023900.0,
    5709800.0,
    3872100.0,
    2741700.0,
    5117700.0,
    4690000.0,
    4622600.0,
    5874900.0,
    9983200.0,
    38471500.0,
    12836000.0,
    9937000.0,
    14131800.0,
    7777700.0,
    7515000.0,
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
     *     text: "VRT",
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