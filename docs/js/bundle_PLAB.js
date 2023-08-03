/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_PLAB");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/03', 24.05, 24.43, 24.89, 23.75],
    ['2022/08/04', 24.29, 24.69, 24.74, 24.01],
    ['2022/08/05', 24.32, 24.23, 24.69, 23.85],
    ['2022/08/08', 24.18, 24.14, 24.57, 23.56],
    ['2022/08/09', 23.67, 22.72, 23.68, 21.78],
    ['2022/08/10', 23.05, 23.84, 24.02, 22.86],
    ['2022/08/11', 24.0, 23.71, 24.8, 23.67],
    ['2022/08/12', 23.8, 25.78, 25.81, 23.74],
    ['2022/08/15', 25.46, 24.99, 25.49, 24.42],
    ['2022/08/16', 24.79, 23.94, 24.9, 23.58],
    ['2022/08/17', 23.63, 23.33, 23.93, 22.66],
    ['2022/08/18', 23.45, 24.41, 24.7, 23.45],
    ['2022/08/19', 24.0, 23.62, 24.08, 23.51],
    ['2022/08/22', 23.01, 22.93, 23.36, 22.67],
    ['2022/08/23', 23.13, 23.28, 23.76, 23.1],
    ['2022/08/24', 23.16, 23.2, 23.45, 23.06],
    ['2022/08/25', 23.22, 25.21, 25.39, 23.22],
    ['2022/08/26', 25.3, 22.19, 25.39, 22.04],
    ['2022/08/29', 21.84, 21.77, 22.61, 21.37],
    ['2022/08/30', 19.03, 16.64, 19.08, 16.43],
    ['2022/08/31', 16.79, 16.8, 17.04, 16.2],
    ['2022/09/01', 16.47, 15.78, 16.47, 15.23],
    ['2022/09/02', 15.91, 15.37, 15.97, 15.25],
    ['2022/09/06', 15.34, 15.45, 15.95, 15.34],
    ['2022/09/07', 15.35, 15.45, 15.58, 15.16],
    ['2022/09/08', 15.31, 15.57, 15.72, 15.11],
    ['2022/09/09', 15.89, 15.9, 16.19, 15.76],
    ['2022/09/12', 15.97, 16.37, 16.47, 15.86],
    ['2022/09/13', 15.76, 15.74, 16.12, 15.59],
    ['2022/09/14', 15.85, 15.69, 16.03, 15.51],
    ['2022/09/15', 15.66, 15.47, 15.75, 15.33],
    ['2022/09/16', 15.25, 15.54, 15.6, 15.2],
    ['2022/09/19', 15.21, 15.38, 15.56, 15.14],
    ['2022/09/20', 15.25, 15.31, 15.46, 15.11],
    ['2022/09/21', 15.39, 15.1, 15.67, 15.05],
    ['2022/09/22', 15.18, 15.0, 15.26, 14.81],
    ['2022/09/23', 14.62, 14.66, 14.87, 14.4],
    ['2022/09/26', 14.6, 14.23, 14.89, 14.18],
    ['2022/09/27', 14.56, 14.63, 14.79, 14.35],
    ['2022/09/28', 14.55, 14.88, 14.98, 14.41],
    ['2022/09/29', 14.62, 14.94, 14.98, 14.38],
    ['2022/09/30', 14.83, 14.62, 15.09, 14.61],
    ['2022/10/03', 15.0, 15.19, 15.54, 14.91],
    ['2022/10/04', 15.75, 15.87, 15.91, 15.58],
    ['2022/10/05', 15.63, 16.08, 16.19, 15.55],
    ['2022/10/06', 15.98, 16.16, 16.4, 15.98],
    ['2022/10/07', 15.8, 15.52, 15.97, 15.36],
    ['2022/10/10', 15.52, 15.2, 15.56, 14.78],
    ['2022/10/11', 15.03, 14.99, 15.17, 14.69],
    ['2022/10/12', 14.9, 14.61, 14.98, 14.59],
    ['2022/10/13', 14.24, 15.2, 15.32, 13.87],
    ['2022/10/14', 15.23, 14.55, 15.36, 14.5],
    ['2022/10/17', 15.03, 14.89, 15.15, 14.67],
    ['2022/10/18', 15.15, 14.83, 15.53, 14.58],
    ['2022/10/19', 14.86, 14.89, 15.03, 14.6],
    ['2022/10/20', 15.0, 15.21, 15.46, 14.88],
    ['2022/10/21', 15.21, 15.75, 15.8, 15.06],
    ['2022/10/24', 15.75, 15.91, 15.97, 15.38],
    ['2022/10/25', 15.97, 16.34, 16.56, 15.97],
    ['2022/10/26', 16.26, 16.42, 16.72, 16.13],
    ['2022/10/27', 16.59, 16.16, 16.65, 16.09],
    ['2022/10/28', 16.13, 16.48, 16.5, 16.02],
    ['2022/10/31', 16.39, 16.22, 16.4, 15.93],
    ['2022/11/01', 16.53, 16.78, 16.82, 16.35],
    ['2022/11/02', 16.81, 16.33, 17.33, 16.33],
    ['2022/11/03', 16.01, 16.05, 16.33, 15.74],
    ['2022/11/04', 16.29, 16.57, 16.65, 16.29],
    ['2022/11/07', 16.76, 17.01, 17.02, 16.57],
    ['2022/11/08', 17.32, 17.12, 17.61, 16.94],
    ['2022/11/09', 16.88, 17.15, 17.41, 16.81],
    ['2022/11/10', 17.86, 18.4, 18.41, 17.76],
    ['2022/11/11', 18.57, 18.69, 19.2, 18.39],
    ['2022/11/14', 18.44, 18.63, 19.2, 18.42],
    ['2022/11/15', 19.24, 19.09, 19.32, 18.94],
    ['2022/11/16', 18.71, 18.35, 19.0, 18.17],
    ['2022/11/17', 17.95, 18.79, 18.87, 17.7],
    ['2022/11/18', 19.24, 19.02, 19.39, 18.77],
    ['2022/11/21', 18.91, 18.67, 18.93, 18.57],
    ['2022/11/22', 18.92, 18.88, 18.92, 18.57],
    ['2022/11/23', 18.86, 18.99, 19.14, 18.81],
    ['2022/11/25', 19.0, 18.69, 19.06, 18.68],
    ['2022/11/28', 18.48, 18.65, 18.82, 18.27],
    ['2022/11/29', 18.74, 18.46, 18.85, 18.43],
    ['2022/11/30', 18.44, 18.8, 18.8, 18.02],
    ['2022/12/01', 18.94, 18.75, 19.19, 18.67],
    ['2022/12/02', 18.35, 18.69, 18.71, 18.25],
    ['2022/12/05', 18.72, 18.28, 18.72, 18.1],
    ['2022/12/06', 18.21, 18.0, 18.38, 17.85],
    ['2022/12/07', 17.88, 18.21, 18.26, 17.69],
    ['2022/12/08', 18.29, 18.45, 18.54, 18.18],
    ['2022/12/09', 18.2, 18.27, 18.67, 18.14],
    ['2022/12/12', 18.25, 18.47, 18.58, 18.15],
    ['2022/12/13', 19.78, 19.18, 20.18, 19.01],
    ['2022/12/14', 19.0, 17.21, 19.12, 16.86],
    ['2022/12/15', 16.95, 17.35, 17.58, 16.88],
    ['2022/12/16', 17.19, 17.22, 17.4, 17.0],
    ['2022/12/19', 17.22, 17.07, 17.42, 16.99],
    ['2022/12/20', 16.98, 16.99, 17.22, 16.86],
    ['2022/12/21', 17.09, 16.99, 17.18, 16.76],
    ['2022/12/22', 16.7, 16.54, 16.81, 16.32],
    ['2022/12/23', 16.53, 16.41, 16.63, 16.24],
    ['2022/12/27', 16.41, 16.4, 16.51, 16.27],
    ['2022/12/28', 16.31, 16.17, 16.54, 16.04],
    ['2022/12/29', 16.41, 16.91, 16.93, 16.32],
    ['2022/12/30', 16.74, 16.83, 16.95, 16.63],
    ['2023/01/03', 17.28, 16.76, 17.5, 16.74],
    ['2023/01/04', 17.0, 16.65, 17.22, 16.65],
    ['2023/01/05', 16.53, 16.7, 17.03, 16.5],
    ['2023/01/06', 16.89, 17.5, 17.52, 16.58],
    ['2023/01/09', 17.76, 17.91, 18.35, 17.7],
    ['2023/01/10', 17.93, 17.96, 18.07, 17.82],
    ['2023/01/11', 17.96, 17.99, 18.15, 17.82],
    ['2023/01/12', 18.15, 18.26, 18.34, 17.96],
    ['2023/01/13', 18.15, 18.37, 18.47, 18.11],
    ['2023/01/17', 18.4, 18.33, 18.54, 18.16],
    ['2023/01/18', 18.42, 18.25, 18.83, 18.24],
    ['2023/01/19', 18.07, 17.53, 18.22, 17.53],
    ['2023/01/20', 17.75, 17.97, 17.99, 17.54],
    ['2023/01/23', 18.1, 18.42, 18.54, 17.96],
    ['2023/01/24', 18.3, 18.66, 18.73, 18.18],
    ['2023/01/25', 18.41, 18.74, 18.77, 18.27],
    ['2023/01/26', 18.79, 19.07, 19.08, 18.54],
    ['2023/01/27', 18.84, 18.82, 19.03, 18.69],
    ['2023/01/30', 18.5, 17.5, 18.53, 17.02],
    ['2023/01/31', 17.53, 18.12, 18.21, 17.31],
    ['2023/02/01', 18.15, 18.91, 19.05, 18.15],
    ['2023/02/02', 19.16, 19.29, 19.52, 19.0],
    ['2023/02/03', 18.98, 19.2, 19.49, 18.8],
    ['2023/02/06', 18.93, 18.68, 19.11, 18.49],
    ['2023/02/07', 18.64, 18.95, 19.05, 18.46],
    ['2023/02/08', 18.82, 18.73, 18.85, 18.6],
    ['2023/02/09', 19.05, 18.67, 19.09, 18.48],
    ['2023/02/10', 18.48, 18.32, 18.56, 18.13],
    ['2023/02/13', 18.39, 18.28, 18.51, 18.24],
    ['2023/02/14', 18.18, 18.41, 18.5, 17.97],
    ['2023/02/15', 18.2, 18.38, 18.68, 18.1],
    ['2023/02/16', 18.11, 18.1, 18.27, 18.01],
    ['2023/02/17', 17.98, 18.02, 18.2, 17.87],
    ['2023/02/21', 17.82, 16.4, 17.82, 15.44],
    ['2023/02/22', 16.5, 17.24, 17.33, 16.43],
    ['2023/02/23', 17.53, 17.69, 17.79, 17.25],
    ['2023/02/24', 17.41, 17.7, 17.7, 17.32],
    ['2023/02/27', 17.82, 17.79, 18.08, 17.74],
    ['2023/02/28', 17.79, 17.62, 18.15, 17.62],
    ['2023/03/01', 17.61, 17.78, 17.97, 17.51],
    ['2023/03/02', 17.4, 17.55, 17.62, 17.1],
    ['2023/03/03', 17.55, 17.64, 17.65, 17.38],
    ['2023/03/06', 17.64, 17.08, 17.69, 16.92],
    ['2023/03/07', 17.06, 16.89, 17.07, 16.72],
    ['2023/03/08', 17.01, 17.23, 17.3, 16.94],
    ['2023/03/09', 17.23, 17.08, 17.45, 17.07],
    ['2023/03/10', 17.08, 16.65, 17.2, 16.6],
    ['2023/03/13', 16.38, 16.15, 16.42, 16.01],
    ['2023/03/14', 16.5, 16.39, 16.71, 16.03],
    ['2023/03/15', 16.05, 16.41, 16.42, 15.94],
    ['2023/03/16', 16.21, 16.74, 16.77, 16.09],
    ['2023/03/17', 16.72, 16.47, 16.89, 16.43],
    ['2023/03/20', 16.57, 16.67, 16.88, 16.53],
    ['2023/03/21', 16.91, 16.91, 17.13, 16.69],
    ['2023/03/22', 16.89, 16.52, 17.14, 16.51],
    ['2023/03/23', 16.66, 16.6, 17.04, 16.38],
    ['2023/03/24', 16.47, 16.36, 16.47, 16.16],
    ['2023/03/27', 16.48, 16.33, 16.6, 16.2],
    ['2023/03/28', 16.21, 15.82, 16.24, 15.7],
    ['2023/03/29', 16.04, 16.48, 16.51, 16.01],
    ['2023/03/30', 16.58, 16.33, 16.73, 16.33],
    ['2023/03/31', 16.3, 16.58, 16.61, 16.25],
    ['2023/04/03', 16.57, 16.41, 16.57, 16.18],
    ['2023/04/04', 16.37, 15.73, 16.37, 15.59],
    ['2023/04/05', 15.54, 15.45, 15.56, 15.23],
    ['2023/04/06', 15.4, 15.35, 15.46, 15.05],
    ['2023/04/10', 15.2, 15.79, 15.88, 15.18],
    ['2023/04/11', 15.91, 15.79, 15.99, 15.63],
    ['2023/04/12', 15.95, 15.47, 16.02, 15.45],
    ['2023/04/13', 15.51, 15.55, 15.63, 15.43],
    ['2023/04/14', 15.64, 15.65, 15.82, 15.48],
    ['2023/04/17', 15.41, 15.41, 15.43, 14.95],
    ['2023/04/18', 15.43, 15.3, 15.64, 15.17],
    ['2023/04/19', 15.21, 15.13, 15.29, 15.05],
    ['2023/04/20', 15.0, 15.12, 15.41, 14.98],
    ['2023/04/21', 15.05, 15.06, 15.24, 14.99],
    ['2023/04/24', 15.04, 14.88, 15.07, 14.79],
    ['2023/04/25', 14.77, 14.27, 14.78, 14.23],
    ['2023/04/26', 14.31, 14.18, 14.4, 14.09],
    ['2023/04/27', 14.15, 14.28, 14.3, 13.86],
    ['2023/04/28', 14.33, 14.46, 14.54, 14.17],
    ['2023/05/01', 14.48, 14.6, 14.66, 14.48],
    ['2023/05/02', 14.54, 14.39, 14.65, 14.24],
    ['2023/05/03', 14.4, 14.45, 14.65, 14.38],
    ['2023/05/04', 14.31, 14.24, 14.44, 14.15],
    ['2023/05/05', 14.36, 14.92, 14.97, 14.33],
    ['2023/05/08', 14.9, 14.84, 14.92, 14.62],
    ['2023/05/09', 14.69, 14.55, 14.71, 14.48],
    ['2023/05/10', 14.77, 15.16, 15.18, 14.67],
    ['2023/05/11', 15.1, 15.22, 15.22, 14.75],
    ['2023/05/12', 15.26, 15.22, 15.57, 15.08],
    ['2023/05/15', 15.27, 16.27, 16.34, 15.25],
    ['2023/05/16', 16.15, 16.6, 16.62, 16.14],
    ['2023/05/17', 16.76, 16.87, 16.99, 16.56],
    ['2023/05/18', 16.89, 17.18, 17.3, 16.89],
    ['2023/05/19', 17.3, 17.37, 17.38, 17.11],
    ['2023/05/22', 16.75, 17.12, 17.58, 16.71],
    ['2023/05/23', 17.04, 17.21, 17.53, 16.98],
    ['2023/05/24', 18.92, 18.36, 19.73, 17.98],
    ['2023/05/25', 18.92, 20.25, 20.38, 18.71],
    ['2023/05/26', 20.36, 21.23, 21.46, 20.36],
    ['2023/05/30', 21.75, 21.11, 21.75, 20.91],
    ['2023/05/31', 20.81, 21.23, 21.41, 20.61],
    ['2023/06/01', 21.27, 21.39, 21.52, 20.85],
    ['2023/06/02', 21.63, 21.78, 21.8, 21.17],
    ['2023/06/05', 21.57, 21.55, 21.76, 20.94],
    ['2023/06/06', 21.44, 22.45, 22.55, 21.37],
    ['2023/06/07', 22.6, 22.97, 23.33, 22.6],
    ['2023/06/08', 22.98, 23.04, 23.24, 22.8],
    ['2023/06/09', 23.22, 22.86, 23.44, 22.79],
    ['2023/06/12', 23.0, 23.23, 23.41, 22.88],
    ['2023/06/13', 23.65, 23.57, 23.79, 23.31],
    ['2023/06/14', 23.4, 23.57, 23.85, 23.37],
    ['2023/06/15', 23.31, 23.59, 23.68, 23.24],
    ['2023/06/16', 23.75, 23.38, 23.89, 23.09],
    ['2023/06/20', 23.41, 24.05, 24.14, 22.89],
    ['2023/06/21', 24.05, 24.51, 25.07, 23.93],
    ['2023/06/22', 24.32, 24.07, 24.46, 24.03],
    ['2023/06/23', 23.79, 23.04, 23.82, 23.01],
    ['2023/06/26', 23.2, 23.06, 23.64, 23.04],
    ['2023/06/27', 23.14, 24.15, 24.18, 23.05],
    ['2023/06/28', 23.91, 24.5, 24.58, 23.91],
    ['2023/06/29', 24.73, 25.51, 25.93, 24.56],
    ['2023/06/30', 25.84, 25.79, 26.05, 25.59],
    ['2023/07/03', 25.99, 26.19, 26.69, 25.99],
    ['2023/07/05', 26.18, 25.46, 26.18, 25.46],
    ['2023/07/06', 25.07, 25.17, 25.56, 24.9],
    ['2023/07/07', 25.32, 25.13, 25.53, 25.07],
    ['2023/07/10', 25.15, 25.45, 25.58, 25.08],
    ['2023/07/11', 25.47, 25.38, 25.52, 24.73],
    ['2023/07/12', 25.7, 25.64, 25.8, 25.49],
    ['2023/07/13', 25.89, 26.32, 26.43, 25.74],
    ['2023/07/14', 26.39, 25.85, 26.42, 25.71],
    ['2023/07/17', 26.02, 26.4, 26.54, 25.96],
    ['2023/07/18', 26.4, 26.95, 26.98, 26.29],
    ['2023/07/19', 26.98, 26.39, 26.98, 26.24],
    ['2023/07/20', 26.08, 25.27, 26.31, 25.18],
    ['2023/07/21', 25.65, 25.33, 25.65, 25.2],
    ['2023/07/24', 25.33, 25.4, 25.64, 25.23],
    ['2023/07/25', 25.4, 25.48, 25.86, 25.4],
    ['2023/07/26', 25.18, 25.23, 25.47, 25.04],
    ['2023/07/27', 25.6, 25.43, 26.0, 25.31],
    ['2023/07/28', 25.94, 26.23, 26.26, 25.77],
    ['2023/07/31', 26.2, 26.45, 26.55, 25.98],
    ['2023/08/01', 26.08, 26.74, 26.86, 26.08],
    ['2023/08/02', 26.42, 26.08, 26.51, 25.92],
]);
var volumes = [
    976100.0,
    813600.0,
    703400.0,
    739500.0,
    1823800.0,
    895900.0,
    725100.0,
    1066300.0,
    922700.0,
    1020300.0,
    962000.0,
    1029500.0,
    625700.0,
    623600.0,
    730400.0,
    709100.0,
    1549800.0,
    1990500.0,
    1928600.0,
    10271200.0,
    2863600.0,
    2703500.0,
    1506500.0,
    1104200.0,
    965100.0,
    756700.0,
    875800.0,
    978600.0,
    1144100.0,
    794700.0,
    758600.0,
    2401900.0,
    619400.0,
    564000.0,
    782900.0,
    602300.0,
    691000.0,
    748800.0,
    542900.0,
    664000.0,
    749100.0,
    1153900.0,
    604200.0,
    669100.0,
    536700.0,
    434700.0,
    758100.0,
    486100.0,
    470000.0,
    399100.0,
    637800.0,
    499100.0,
    535700.0,
    477900.0,
    612200.0,
    369100.0,
    560600.0,
    442600.0,
    511400.0,
    378800.0,
    377000.0,
    525200.0,
    514700.0,
    494700.0,
    629200.0,
    377500.0,
    472500.0,
    437300.0,
    470000.0,
    358500.0,
    676900.0,
    781900.0,
    661600.0,
    467700.0,
    454300.0,
    469600.0,
    661400.0,
    446900.0,
    993600.0,
    468900.0,
    411500.0,
    494500.0,
    644200.0,
    802200.0,
    607300.0,
    416800.0,
    463900.0,
    605200.0,
    541300.0,
    341500.0,
    353900.0,
    651200.0,
    1466500.0,
    1333800.0,
    871200.0,
    2928100.0,
    555900.0,
    442700.0,
    569000.0,
    773900.0,
    494400.0,
    482600.0,
    508100.0,
    338500.0,
    692100.0,
    563900.0,
    547500.0,
    499900.0,
    513200.0,
    564300.0,
    333000.0,
    345000.0,
    371900.0,
    381600.0,
    432500.0,
    523000.0,
    526100.0,
    349200.0,
    387900.0,
    355100.0,
    331200.0,
    372200.0,
    474000.0,
    1825600.0,
    874800.0,
    838200.0,
    545400.0,
    532600.0,
    717200.0,
    461200.0,
    405700.0,
    569200.0,
    511100.0,
    396900.0,
    604200.0,
    457600.0,
    451500.0,
    562300.0,
    2303800.0,
    1440000.0,
    912600.0,
    560800.0,
    637800.0,
    735800.0,
    496600.0,
    666700.0,
    530600.0,
    581100.0,
    570900.0,
    575100.0,
    552600.0,
    466100.0,
    598100.0,
    750200.0,
    677000.0,
    395400.0,
    1436800.0,
    379700.0,
    399300.0,
    317400.0,
    344000.0,
    341400.0,
    308300.0,
    364000.0,
    427900.0,
    316200.0,
    621000.0,
    417600.0,
    506300.0,
    540400.0,
    335000.0,
    778800.0,
    387400.0,
    269400.0,
    251100.0,
    308400.0,
    385000.0,
    261100.0,
    255200.0,
    409400.0,
    275000.0,
    289400.0,
    300600.0,
    250500.0,
    318800.0,
    330000.0,
    249500.0,
    252700.0,
    449300.0,
    479800.0,
    379900.0,
    325800.0,
    354300.0,
    380200.0,
    273600.0,
    474800.0,
    686700.0,
    437000.0,
    662700.0,
    552700.0,
    503900.0,
    659400.0,
    627700.0,
    1654800.0,
    1325600.0,
    1017900.0,
    986800.0,
    1638800.0,
    552900.0,
    563000.0,
    527000.0,
    609500.0,
    905600.0,
    464700.0,
    349400.0,
    439700.0,
    618600.0,
    575100.0,
    517300.0,
    1276900.0,
    835600.0,
    858100.0,
    698000.0,
    2562400.0,
    727600.0,
    612700.0,
    432100.0,
    894300.0,
    668100.0,
    575200.0,
    643700.0,
    495800.0,
    448600.0,
    499300.0,
    574800.0,
    401500.0,
    712200.0,
    413800.0,
    444500.0,
    488200.0,
    576100.0,
    548200.0,
    388100.0,
    368000.0,
    470000.0,
    321000.0,
    495600.0,
    474200.0,
    443300.0,
    410000.0,
    462800.0,
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
        text: "PLAB",
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
            start: 40,
            end: 70,
            top: 30,
            height: 20,
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