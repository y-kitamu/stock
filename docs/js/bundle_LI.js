/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_LI");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/03', 34.19, 33.98, 34.19, 32.48],
    ['2022/08/04', 34.23, 34.32, 35.17, 34.02],
    ['2022/08/05', 33.7, 33.63, 33.95, 32.58],
    ['2022/08/08', 34.11, 33.2, 34.14, 32.94],
    ['2022/08/09', 32.17, 30.87, 32.45, 30.24],
    ['2022/08/10', 31.58, 31.52, 31.66, 30.42],
    ['2022/08/11', 32.09, 32.71, 33.45, 31.72],
    ['2022/08/12', 31.47, 32.49, 32.6, 31.23],
    ['2022/08/15', 30.83, 32.56, 33.86, 29.91],
    ['2022/08/16', 31.83, 31.09, 31.87, 30.51],
    ['2022/08/17', 31.2, 30.91, 31.66, 30.75],
    ['2022/08/18', 30.51, 30.84, 31.06, 30.1],
    ['2022/08/19', 30.8, 29.94, 30.8, 29.71],
    ['2022/08/22', 30.0, 30.85, 31.53, 29.83],
    ['2022/08/23', 30.36, 29.36, 30.36, 28.85],
    ['2022/08/24', 28.78, 29.7, 30.09, 28.37],
    ['2022/08/25', 30.76, 31.07, 31.64, 29.92],
    ['2022/08/26', 31.84, 30.3, 32.15, 30.21],
    ['2022/08/29', 30.0, 29.11, 30.55, 29.06],
    ['2022/08/30', 29.25, 28.8, 29.39, 28.23],
    ['2022/08/31', 29.26, 28.77, 29.57, 28.39],
    ['2022/09/01', 27.68, 27.9, 28.38, 27.19],
    ['2022/09/02', 27.31, 26.58, 27.36, 26.26],
    ['2022/09/06', 26.48, 26.44, 27.08, 26.0],
    ['2022/09/07', 26.31, 26.66, 27.12, 26.16],
    ['2022/09/08', 26.06, 26.03, 26.57, 25.36],
    ['2022/09/09', 26.76, 26.33, 27.23, 26.23],
    ['2022/09/12', 26.72, 26.06, 26.8, 25.25],
    ['2022/09/13', 25.44, 26.8, 28.07, 25.25],
    ['2022/09/14', 26.85, 26.67, 27.03, 25.9],
    ['2022/09/15', 26.07, 25.81, 26.76, 25.68],
    ['2022/09/16', 25.05, 24.09, 25.05, 23.7],
    ['2022/09/19', 23.85, 25.23, 25.3, 23.74],
    ['2022/09/20', 25.5, 25.34, 25.74, 25.07],
    ['2022/09/21', 24.32, 23.1, 24.69, 22.9],
    ['2022/09/22', 24.41, 24.23, 25.4, 24.17],
    ['2022/09/23', 23.89, 25.0, 25.1, 23.67],
    ['2022/09/26', 25.2, 26.39, 27.1, 25.1],
    ['2022/09/27', 26.63, 25.72, 27.0, 25.54],
    ['2022/09/28', 24.67, 24.9, 25.6, 24.33],
    ['2022/09/29', 24.05, 23.37, 24.26, 22.8],
    ['2022/09/30', 22.54, 23.01, 23.58, 22.2],
    ['2022/10/03', 23.31, 23.46, 23.97, 22.82],
    ['2022/10/04', 24.39, 24.6, 25.43, 24.31],
    ['2022/10/05', 24.65, 23.9, 24.98, 23.5],
    ['2022/10/06', 23.87, 20.95, 24.02, 20.68],
    ['2022/10/07', 20.45, 19.57, 20.47, 19.33],
    ['2022/10/10', 19.62, 19.0, 19.62, 18.43],
    ['2022/10/11', 19.42, 19.68, 20.49, 18.46],
    ['2022/10/12', 20.48, 20.39, 21.18, 19.92],
    ['2022/10/13', 19.26, 20.04, 20.27, 19.09],
    ['2022/10/14', 20.05, 18.72, 20.25, 18.65],
    ['2022/10/17', 19.2, 18.95, 19.41, 18.51],
    ['2022/10/18', 19.45, 18.92, 19.69, 18.84],
    ['2022/10/19', 18.18, 16.8, 18.18, 16.54],
    ['2022/10/20', 17.28, 17.3, 17.76, 17.15],
    ['2022/10/21', 16.9, 17.77, 17.89, 16.61],
    ['2022/10/24', 16.11, 14.68, 16.11, 12.52],
    ['2022/10/25', 15.37, 15.9, 16.35, 15.15],
    ['2022/10/26', 15.87, 16.27, 16.57, 15.58],
    ['2022/10/27', 15.32, 14.98, 15.37, 14.64],
    ['2022/10/28', 13.93, 14.26, 14.51, 13.75],
    ['2022/10/31', 13.86, 13.62, 14.18, 13.09],
    ['2022/11/01', 15.02, 14.56, 15.15, 13.97],
    ['2022/11/02', 15.51, 16.32, 17.09, 15.37],
    ['2022/11/03', 15.92, 16.75, 17.37, 15.88],
    ['2022/11/04', 18.9, 18.31, 19.21, 17.67],
    ['2022/11/07', 19.05, 18.16, 19.39, 18.05],
    ['2022/11/08', 17.58, 18.47, 18.53, 17.4],
    ['2022/11/09', 17.42, 16.18, 17.8, 16.09],
    ['2022/11/10', 18.02, 17.41, 18.34, 17.07],
    ['2022/11/11', 18.23, 18.97, 19.41, 17.65],
    ['2022/11/14', 18.84, 17.96, 19.49, 17.96],
    ['2022/11/15', 19.05, 18.94, 19.63, 18.73],
    ['2022/11/16', 18.45, 17.77, 18.61, 17.56],
    ['2022/11/17', 17.23, 18.36, 18.39, 16.96],
    ['2022/11/18', 18.09, 17.88, 18.19, 17.65],
    ['2022/11/21', 17.46, 17.57, 17.58, 16.78],
    ['2022/11/22', 16.91, 16.73, 17.06, 16.25],
    ['2022/11/23', 17.2, 17.33, 17.83, 16.97],
    ['2022/11/25', 16.95, 16.81, 16.97, 16.22],
    ['2022/11/28', 16.3, 17.04, 17.62, 16.3],
    ['2022/11/29', 18.11, 18.53, 18.84, 17.8],
    ['2022/11/30', 20.13, 22.0, 23.04, 20.11],
    ['2022/12/01', 21.18, 21.3, 22.29, 20.82],
    ['2022/12/02', 20.93, 22.78, 23.5, 20.8],
    ['2022/12/05', 24.03, 22.11, 24.2, 21.46],
    ['2022/12/06', 22.58, 23.1, 23.63, 22.43],
    ['2022/12/07', 21.99, 22.59, 22.87, 21.58],
    ['2022/12/08', 23.88, 24.1, 24.41, 23.62],
    ['2022/12/09', 22.56, 21.12, 22.77, 20.96],
    ['2022/12/12', 20.52, 20.72, 21.53, 20.32],
    ['2022/12/13', 21.47, 20.34, 21.5, 19.86],
    ['2022/12/14', 21.16, 20.28, 21.22, 19.95],
    ['2022/12/15', 21.15, 20.43, 21.61, 20.0],
    ['2022/12/16', 21.14, 20.45, 21.75, 20.42],
    ['2022/12/19', 20.89, 20.04, 20.89, 19.26],
    ['2022/12/20', 19.46, 20.12, 20.68, 19.32],
    ['2022/12/21', 20.33, 20.8, 21.0, 19.68],
    ['2022/12/22', 21.26, 20.43, 21.57, 19.88],
    ['2022/12/23', 20.37, 18.77, 20.37, 18.54],
    ['2022/12/27', 18.36, 18.54, 18.72, 18.02],
    ['2022/12/28', 18.9, 18.43, 19.24, 17.9],
    ['2022/12/29', 19.25, 19.49, 19.74, 18.95],
    ['2022/12/30', 19.49, 20.4, 20.45, 19.44],
    ['2023/01/03', 21.76, 20.98, 21.86, 20.55],
    ['2023/01/04', 21.75, 22.98, 23.11, 21.44],
    ['2023/01/05', 22.55, 23.04, 23.31, 22.5],
    ['2023/01/06', 21.03, 20.93, 21.2, 19.81],
    ['2023/01/09', 21.51, 22.04, 22.42, 21.48],
    ['2023/01/10', 22.5, 22.37, 22.74, 21.9],
    ['2023/01/11', 22.35, 22.33, 22.57, 22.03],
    ['2023/01/12', 22.52, 22.66, 22.69, 21.59],
    ['2023/01/13', 21.96, 22.49, 22.8, 21.87],
    ['2023/01/17', 21.93, 21.86, 22.01, 21.22],
    ['2023/01/18', 22.22, 21.26, 22.46, 21.11],
    ['2023/01/19', 21.66, 21.32, 21.96, 21.28],
    ['2023/01/20', 21.86, 22.06, 22.75, 21.54],
    ['2023/01/23', 22.5, 23.57, 23.75, 22.47],
    ['2023/01/24', 23.29, 23.36, 23.8, 23.15],
    ['2023/01/25', 22.93, 23.16, 23.37, 22.72],
    ['2023/01/26', 24.08, 25.22, 25.28, 23.98],
    ['2023/01/27', 24.92, 24.97, 26.08, 24.53],
    ['2023/01/30', 24.0, 24.51, 24.88, 23.43],
    ['2023/01/31', 24.37, 24.9, 25.07, 24.11],
    ['2023/02/01', 26.42, 26.34, 26.93, 25.73],
    ['2023/02/02', 27.05, 26.67, 27.48, 26.27],
    ['2023/02/03', 25.61, 25.08, 26.21, 25.07],
    ['2023/02/06', 24.89, 25.02, 25.73, 24.29],
    ['2023/02/07', 25.53, 25.46, 25.91, 24.6],
    ['2023/02/08', 25.66, 25.17, 25.8, 24.86],
    ['2023/02/09', 26.38, 25.24, 26.55, 24.92],
    ['2023/02/10', 23.89, 23.85, 24.13, 23.45],
    ['2023/02/13', 24.52, 24.96, 25.95, 24.4],
    ['2023/02/14', 24.67, 25.64, 25.73, 24.3],
    ['2023/02/15', 24.95, 25.39, 25.42, 24.3],
    ['2023/02/16', 24.97, 24.74, 25.31, 24.69],
    ['2023/02/17', 24.13, 24.04, 24.43, 23.7],
    ['2023/02/21', 24.09, 24.3, 24.58, 23.9],
    ['2023/02/22', 23.99, 23.69, 24.23, 23.4],
    ['2023/02/23', 24.34, 24.17, 24.37, 23.56],
    ['2023/02/24', 23.38, 23.23, 23.62, 23.06],
    ['2023/02/27', 24.36, 23.3, 24.44, 22.85],
    ['2023/02/28', 23.3, 23.61, 24.0, 23.0],
    ['2023/03/01', 25.0, 24.51, 25.08, 23.74],
    ['2023/03/02', 24.63, 25.32, 25.36, 24.43],
    ['2023/03/03', 25.24, 25.1, 25.32, 24.91],
    ['2023/03/06', 25.11, 25.0, 25.23, 24.73],
    ['2023/03/07', 24.35, 23.59, 24.4, 23.34],
    ['2023/03/08', 23.0, 22.29, 23.05, 21.82],
    ['2023/03/09', 21.8, 21.43, 21.92, 21.1],
    ['2023/03/10', 21.22, 21.37, 21.73, 20.86],
    ['2023/03/13', 21.72, 22.28, 22.5, 21.56],
    ['2023/03/14', 22.06, 21.99, 22.17, 21.53],
    ['2023/03/15', 21.38, 21.35, 21.55, 20.8],
    ['2023/03/16', 21.3, 21.98, 22.11, 21.18],
    ['2023/03/17', 22.67, 22.59, 23.08, 22.01],
    ['2023/03/20', 21.76, 22.84, 23.52, 21.66],
    ['2023/03/21', 23.25, 23.53, 24.07, 23.25],
    ['2023/03/22', 23.89, 23.27, 23.89, 23.19],
    ['2023/03/23', 23.75, 23.7, 24.11, 23.38],
    ['2023/03/24', 23.0, 23.38, 23.5, 23.0],
    ['2023/03/27', 23.1, 23.21, 23.43, 22.93],
    ['2023/03/28', 24.0, 24.75, 25.1, 23.95],
    ['2023/03/29', 25.0, 24.9, 25.07, 24.53],
    ['2023/03/30', 24.9, 25.32, 25.45, 24.71],
    ['2023/03/31', 25.13, 24.95, 25.29, 24.91],
    ['2023/04/03', 25.0, 24.32, 25.16, 23.97],
    ['2023/04/04', 23.94, 23.83, 24.2, 23.56],
    ['2023/04/05', 23.69, 23.13, 23.7, 22.93],
    ['2023/04/06', 23.28, 23.67, 23.92, 23.2],
    ['2023/04/10', 23.4, 23.63, 23.7, 23.27],
    ['2023/04/11', 24.37, 23.83, 24.67, 23.82],
    ['2023/04/12', 23.96, 23.8, 24.22, 23.58],
    ['2023/04/13', 24.52, 24.22, 24.75, 24.1],
    ['2023/04/14', 24.38, 24.56, 24.61, 23.9],
    ['2023/04/17', 25.69, 26.13, 26.26, 25.17],
    ['2023/04/18', 25.5, 25.49, 25.73, 25.18],
    ['2023/04/19', 24.48, 24.65, 24.85, 24.31],
    ['2023/04/20', 23.37, 23.13, 23.69, 22.68],
    ['2023/04/21', 22.94, 22.93, 23.07, 22.52],
    ['2023/04/24', 22.99, 22.68, 23.44, 22.48],
    ['2023/04/25', 22.56, 22.03, 22.6, 21.48],
    ['2023/04/26', 22.71, 22.43, 23.12, 22.23],
    ['2023/04/27', 22.76, 23.24, 23.32, 22.59],
    ['2023/04/28', 23.2, 23.5, 23.62, 22.82],
    ['2023/05/01', 24.2, 23.62, 24.21, 23.36],
    ['2023/05/02', 23.17, 22.91, 23.32, 22.26],
    ['2023/05/03', 22.78, 22.74, 23.0, 22.62],
    ['2023/05/04', 23.31, 23.89, 23.94, 23.3],
    ['2023/05/05', 23.74, 23.93, 24.07, 23.42],
    ['2023/05/08', 24.73, 24.75, 25.18, 24.47],
    ['2023/05/09', 24.29, 24.77, 25.0, 24.23],
    ['2023/05/10', 26.28, 28.22, 29.0, 26.11],
    ['2023/05/11', 29.25, 29.26, 29.96, 28.74],
    ['2023/05/12', 29.05, 29.44, 29.77, 28.58],
    ['2023/05/15', 29.0, 30.0, 30.01, 28.86],
    ['2023/05/16', 29.84, 29.96, 30.11, 29.46],
    ['2023/05/17', 29.51, 28.85, 29.56, 28.8],
    ['2023/05/18', 29.18, 28.68, 29.25, 28.22],
    ['2023/05/19', 29.14, 29.1, 29.51, 28.8],
    ['2023/05/22', 29.8, 29.45, 30.04, 28.96],
    ['2023/05/23', 28.61, 28.74, 29.27, 28.51],
    ['2023/05/24', 28.35, 28.82, 29.73, 28.2],
    ['2023/05/25', 28.53, 28.23, 28.68, 28.11],
    ['2023/05/26', 28.64, 28.16, 28.65, 27.8],
    ['2023/05/30', 28.88, 29.15, 30.67, 28.88],
    ['2023/05/31', 28.85, 29.05, 29.08, 27.73],
    ['2023/06/01', 28.9, 29.15, 29.5, 28.2],
    ['2023/06/02', 30.48, 29.44, 31.33, 29.32],
    ['2023/06/05', 29.87, 30.1, 30.6, 29.69],
    ['2023/06/06', 30.72, 31.99, 32.02, 30.69],
    ['2023/06/07', 32.43, 31.81, 32.63, 31.49],
    ['2023/06/08', 31.87, 32.02, 32.41, 31.72],
    ['2023/06/09', 32.15, 31.78, 32.56, 31.62],
    ['2023/06/12', 31.02, 31.15, 31.56, 30.75],
    ['2023/06/13', 31.96, 31.49, 32.05, 31.16],
    ['2023/06/14', 32.49, 33.8, 34.2, 32.38],
    ['2023/06/15', 34.25, 34.46, 35.09, 33.88],
    ['2023/06/16', 34.7, 34.41, 34.85, 34.1],
    ['2023/06/20', 34.06, 33.74, 34.53, 33.59],
    ['2023/06/21', 34.85, 34.66, 35.97, 34.42],
    ['2023/06/22', 34.48, 34.4, 34.48, 33.8],
    ['2023/06/23', 33.6, 33.22, 33.86, 32.92],
    ['2023/06/26', 33.68, 33.88, 34.15, 33.44],
    ['2023/06/27', 34.28, 34.71, 34.93, 34.07],
    ['2023/06/28', 35.03, 35.07, 35.15, 34.43],
    ['2023/06/29', 34.62, 34.29, 34.79, 33.98],
    ['2023/06/30', 34.39, 35.1, 35.48, 34.39],
    ['2023/07/03', 36.87, 36.3, 38.14, 36.09],
    ['2023/07/05', 36.07, 35.75, 36.39, 35.42],
    ['2023/07/06', 35.5, 35.48, 36.41, 35.36],
    ['2023/07/07', 35.51, 35.89, 36.15, 35.09],
    ['2023/07/10', 35.05, 35.85, 35.96, 34.4],
    ['2023/07/11', 36.82, 37.06, 37.24, 36.43],
    ['2023/07/12', 37.7, 38.17, 38.22, 36.92],
    ['2023/07/13', 37.41, 37.36, 37.63, 36.63],
    ['2023/07/14', 36.88, 37.0, 37.03, 35.85],
    ['2023/07/17', 36.69, 38.19, 38.52, 36.56],
    ['2023/07/18', 37.94, 37.1, 38.02, 36.68],
    ['2023/07/19', 37.55, 37.42, 37.79, 37.11],
    ['2023/07/20', 36.98, 37.49, 37.7, 36.84],
    ['2023/07/21', 37.31, 36.97, 37.4, 36.87],
    ['2023/07/24', 36.65, 38.18, 38.73, 36.57],
    ['2023/07/25', 38.5, 37.96, 38.8, 37.51],
    ['2023/07/26', 38.59, 39.31, 40.36, 38.59],
    ['2023/07/27', 39.68, 38.99, 39.73, 38.85],
    ['2023/07/28', 40.74, 42.72, 42.83, 40.53],
    ['2023/07/31', 42.23, 42.8, 42.82, 41.82],
    ['2023/08/01', 43.39, 44.37, 44.69, 42.86],
    ['2023/08/02', 43.3, 44.4, 44.61, 43.16],
]);
var volumes = [
    8528800.0,
    5063200.0,
    4959600.0,
    6218800.0,
    13990800.0,
    6548800.0,
    9750900.0,
    6376400.0,
    16365300.0,
    8327900.0,
    5617900.0,
    5272800.0,
    5593700.0,
    8401800.0,
    8124800.0,
    4824500.0,
    8934700.0,
    7572100.0,
    5205400.0,
    6311700.0,
    6819700.0,
    10380600.0,
    9115100.0,
    7401100.0,
    5818300.0,
    7942400.0,
    7966300.0,
    9696300.0,
    17044600.0,
    8536100.0,
    5210000.0,
    12031200.0,
    7162700.0,
    5202900.0,
    9474800.0,
    18113000.0,
    13284400.0,
    15885100.0,
    9713200.0,
    9842400.0,
    7719000.0,
    5967900.0,
    5965500.0,
    6633500.0,
    7187500.0,
    25644800.0,
    15467900.0,
    10804900.0,
    19374400.0,
    12027400.0,
    9120300.0,
    7806500.0,
    11704300.0,
    6084200.0,
    14375000.0,
    12257400.0,
    7584900.0,
    37180000.0,
    20487800.0,
    12788700.0,
    14480700.0,
    12295500.0,
    14726000.0,
    21373900.0,
    38737400.0,
    18659300.0,
    21855300.0,
    13579600.0,
    9945300.0,
    15431800.0,
    14257600.0,
    14223800.0,
    10693000.0,
    12150100.0,
    8232800.0,
    10994700.0,
    5720700.0,
    5878400.0,
    9794200.0,
    7367600.0,
    3977400.0,
    8591800.0,
    11240700.0,
    46308600.0,
    15648200.0,
    21069700.0,
    16107500.0,
    12546300.0,
    9554500.0,
    15024100.0,
    19881400.0,
    11860400.0,
    18675900.0,
    8713000.0,
    10570100.0,
    10498600.0,
    7943600.0,
    7521400.0,
    7208700.0,
    6892800.0,
    8861200.0,
    8510600.0,
    9108900.0,
    8889000.0,
    9671200.0,
    15130800.0,
    10729500.0,
    6415100.0,
    14484700.0,
    9723900.0,
    7348200.0,
    7478700.0,
    7029100.0,
    8221500.0,
    7595800.0,
    4980000.0,
    3847900.0,
    6214700.0,
    6629000.0,
    3822800.0,
    2866500.0,
    11571500.0,
    10962200.0,
    8430400.0,
    7312800.0,
    10509000.0,
    8736200.0,
    6092500.0,
    6526400.0,
    5172400.0,
    4549000.0,
    6842900.0,
    8965300.0,
    10434700.0,
    7333700.0,
    7698100.0,
    4327800.0,
    4187700.0,
    5015300.0,
    4740100.0,
    4105100.0,
    7079100.0,
    13613200.0,
    12153500.0,
    12231600.0,
    9169700.0,
    4977500.0,
    4625500.0,
    7730100.0,
    12055500.0,
    12607300.0,
    7365500.0,
    8446300.0,
    4532000.0,
    7743300.0,
    6060200.0,
    13594100.0,
    5931000.0,
    5333300.0,
    4785400.0,
    5032000.0,
    2219100.0,
    2307300.0,
    7655600.0,
    8324600.0,
    7136100.0,
    4251200.0,
    6879600.0,
    4121100.0,
    6165400.0,
    5355200.0,
    4892400.0,
    5444900.0,
    6155700.0,
    4231900.0,
    3869400.0,
    8801600.0,
    5721800.0,
    4525700.0,
    10553300.0,
    5426600.0,
    5805800.0,
    8277500.0,
    5175600.0,
    4288100.0,
    5084300.0,
    6330700.0,
    6221800.0,
    3543900.0,
    6932700.0,
    5097600.0,
    5538900.0,
    7752300.0,
    27811900.0,
    14659300.0,
    11327100.0,
    6351200.0,
    5994300.0,
    8910700.0,
    6732400.0,
    5513800.0,
    8564000.0,
    5912600.0,
    8753400.0,
    4422700.0,
    6080600.0,
    13445900.0,
    7869100.0,
    7393600.0,
    9802000.0,
    7064400.0,
    12296900.0,
    6935000.0,
    4832900.0,
    6004400.0,
    7020800.0,
    7316800.0,
    16038100.0,
    11367900.0,
    7235400.0,
    6838000.0,
    9021800.0,
    3099100.0,
    4722900.0,
    4656600.0,
    5404900.0,
    5875200.0,
    3519100.0,
    5277400.0,
    10503300.0,
    5808300.0,
    4468000.0,
    3595300.0,
    5142900.0,
    7040400.0,
    8309600.0,
    9478400.0,
    11507900.0,
    6108100.0,
    5249400.0,
    3935200.0,
    3724300.0,
    3371500.0,
    7562900.0,
    6363100.0,
    10974600.0,
    6930900.0,
    13517200.0,
    6888400.0,
    8419100.0,
    7433300.0,
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
        text: "LI",
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