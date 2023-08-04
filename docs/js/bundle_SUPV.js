/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_SUPV");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/05', 1.62, 1.81, 1.83, 1.61],
    ['2022/08/08', 1.83, 1.79, 1.87, 1.78],
    ['2022/08/09', 1.76, 1.71, 1.78, 1.68],
    ['2022/08/10', 1.8, 1.8, 1.81, 1.72],
    ['2022/08/11', 1.79, 1.76, 1.84, 1.76],
    ['2022/08/12', 1.77, 1.83, 1.84, 1.76],
    ['2022/08/15', 1.78, 1.82, 1.83, 1.77],
    ['2022/08/16', 1.78, 1.9, 1.91, 1.75],
    ['2022/08/17', 1.91, 1.89, 1.94, 1.83],
    ['2022/08/18', 1.86, 1.75, 1.95, 1.74],
    ['2022/08/19', 1.7, 1.7, 1.72, 1.67],
    ['2022/08/22', 1.65, 1.77, 1.82, 1.63],
    ['2022/08/23', 1.77, 1.89, 1.9, 1.72],
    ['2022/08/24', 1.87, 1.91, 1.93, 1.82],
    ['2022/08/25', 1.94, 1.93, 1.94, 1.84],
    ['2022/08/26', 1.92, 1.86, 1.97, 1.84],
    ['2022/08/29', 1.86, 1.9, 1.95, 1.82],
    ['2022/08/30', 1.9, 1.93, 2.0, 1.85],
    ['2022/08/31', 1.89, 1.8, 1.99, 1.8],
    ['2022/09/01', 1.79, 1.85, 1.87, 1.75],
    ['2022/09/02', 1.83, 1.87, 1.95, 1.8],
    ['2022/09/06', 1.85, 1.85, 1.91, 1.82],
    ['2022/09/07', 1.85, 1.92, 1.95, 1.85],
    ['2022/09/08', 1.92, 1.92, 1.96, 1.86],
    ['2022/09/09', 2.0, 1.95, 2.0, 1.89],
    ['2022/09/12', 1.99, 1.96, 2.05, 1.92],
    ['2022/09/13', 1.94, 1.91, 2.0, 1.89],
    ['2022/09/14', 1.94, 1.96, 1.97, 1.91],
    ['2022/09/15', 1.96, 1.85, 1.99, 1.85],
    ['2022/09/16', 1.81, 1.83, 1.85, 1.78],
    ['2022/09/19', 1.81, 1.9, 1.92, 1.81],
    ['2022/09/20', 1.86, 1.87, 1.92, 1.85],
    ['2022/09/21', 1.91, 1.82, 1.91, 1.81],
    ['2022/09/22', 1.8, 1.82, 1.84, 1.78],
    ['2022/09/23', 1.78, 1.77, 1.8, 1.66],
    ['2022/09/26', 1.75, 1.71, 1.77, 1.66],
    ['2022/09/27', 1.72, 1.7, 1.77, 1.67],
    ['2022/09/28', 1.72, 1.73, 1.75, 1.69],
    ['2022/09/29', 1.68, 1.72, 1.76, 1.66],
    ['2022/09/30', 1.69, 1.75, 1.78, 1.69],
    ['2022/10/03', 1.75, 1.88, 1.9, 1.74],
    ['2022/10/04', 1.92, 1.92, 1.96, 1.9],
    ['2022/10/05', 1.93, 1.94, 1.97, 1.87],
    ['2022/10/06', 1.92, 1.88, 1.96, 1.87],
    ['2022/10/07', 1.85, 1.82, 1.88, 1.81],
    ['2022/10/10', 1.84, 1.81, 1.84, 1.79],
    ['2022/10/11', 1.82, 1.79, 1.87, 1.75],
    ['2022/10/12', 1.77, 1.77, 1.81, 1.75],
    ['2022/10/13', 1.76, 1.82, 1.85, 1.75],
    ['2022/10/14', 1.81, 1.78, 1.82, 1.77],
    ['2022/10/17', 1.82, 1.81, 1.85, 1.81],
    ['2022/10/18', 1.89, 1.87, 1.89, 1.8],
    ['2022/10/19', 1.87, 1.81, 1.87, 1.75],
    ['2022/10/20', 1.81, 1.77, 1.86, 1.77],
    ['2022/10/21', 1.78, 1.83, 1.83, 1.78],
    ['2022/10/24', 1.8, 1.88, 1.91, 1.76],
    ['2022/10/25', 1.87, 1.91, 1.92, 1.85],
    ['2022/10/26', 1.86, 1.9, 1.96, 1.86],
    ['2022/10/27', 1.87, 1.85, 1.92, 1.84],
    ['2022/10/28', 1.82, 1.84, 1.85, 1.79],
    ['2022/10/31', 1.8, 1.86, 1.88, 1.76],
    ['2022/11/01', 1.87, 1.93, 1.94, 1.83],
    ['2022/11/02', 1.9, 1.91, 1.92, 1.86],
    ['2022/11/03', 1.89, 1.89, 1.94, 1.88],
    ['2022/11/04', 1.92, 1.93, 1.94, 1.89],
    ['2022/11/07', 1.93, 1.89, 1.95, 1.89],
    ['2022/11/08', 1.89, 1.91, 1.92, 1.85],
    ['2022/11/09', 1.89, 1.88, 1.9, 1.83],
    ['2022/11/10', 1.83, 1.78, 1.85, 1.77],
    ['2022/11/11', 1.82, 1.83, 1.83, 1.78],
    ['2022/11/14', 1.8, 1.79, 1.84, 1.78],
    ['2022/11/15', 1.8, 1.78, 1.85, 1.77],
    ['2022/11/16', 1.78, 1.72, 1.8, 1.72],
    ['2022/11/17', 1.68, 1.63, 1.72, 1.55],
    ['2022/11/18', 1.6, 1.61, 1.64, 1.58],
    ['2022/11/21', 1.63, 1.56, 1.63, 1.54],
    ['2022/11/22', 1.55, 1.62, 1.65, 1.55],
    ['2022/11/23', 1.62, 1.67, 1.67, 1.61],
    ['2022/11/25', 1.65, 1.78, 1.79, 1.61],
    ['2022/11/28', 1.75, 1.72, 1.78, 1.71],
    ['2022/11/29', 1.72, 1.72, 1.79, 1.7],
    ['2022/11/30', 1.72, 1.76, 1.77, 1.68],
    ['2022/12/01', 1.75, 1.81, 1.84, 1.72],
    ['2022/12/02', 1.76, 1.78, 1.79, 1.74],
    ['2022/12/05', 1.77, 1.74, 1.78, 1.73],
    ['2022/12/06', 1.73, 1.75, 1.75, 1.7],
    ['2022/12/07', 1.76, 1.82, 1.83, 1.75],
    ['2022/12/08', 1.83, 1.73, 1.83, 1.73],
    ['2022/12/09', 1.7, 1.7, 1.76, 1.7],
    ['2022/12/12', 1.7, 1.72, 1.84, 1.69],
    ['2022/12/13', 1.78, 1.76, 1.8, 1.74],
    ['2022/12/14', 1.72, 1.8, 1.8, 1.7],
    ['2022/12/15', 1.75, 1.75, 1.77, 1.73],
    ['2022/12/16', 1.73, 1.75, 1.76, 1.73],
    ['2022/12/19', 1.73, 1.8, 1.81, 1.73],
    ['2022/12/20', 1.76, 1.83, 1.91, 1.76],
    ['2022/12/21', 1.8, 1.92, 1.95, 1.8],
    ['2022/12/22', 1.87, 2.06, 2.07, 1.87],
    ['2022/12/23', 2.08, 2.16, 2.17, 2.01],
    ['2022/12/27', 2.19, 2.18, 2.28, 2.16],
    ['2022/12/28', 2.08, 2.12, 2.26, 2.0],
    ['2022/12/29', 2.1, 2.16, 2.24, 2.07],
    ['2022/12/30', 2.18, 2.16, 2.24, 2.11],
    ['2023/01/03', 2.17, 2.16, 2.23, 2.13],
    ['2023/01/04', 2.15, 2.2, 2.23, 2.15],
    ['2023/01/05', 2.22, 2.39, 2.39, 2.18],
    ['2023/01/06', 2.4, 2.37, 2.54, 2.31],
    ['2023/01/09', 2.41, 2.5, 2.54, 2.41],
    ['2023/01/10', 2.55, 2.55, 2.55, 2.47],
    ['2023/01/11', 2.53, 2.69, 2.76, 2.53],
    ['2023/01/12', 2.75, 2.87, 2.87, 2.67],
    ['2023/01/13', 2.81, 2.93, 2.95, 2.73],
    ['2023/01/17', 2.93, 3.1, 3.14, 2.84],
    ['2023/01/18', 3.13, 2.7, 3.22, 2.68],
    ['2023/01/19', 2.63, 2.64, 2.7, 2.43],
    ['2023/01/20', 2.65, 2.83, 2.9, 2.64],
    ['2023/01/23', 2.77, 2.71, 2.88, 2.7],
    ['2023/01/24', 2.69, 2.68, 2.76, 2.65],
    ['2023/01/25', 2.65, 2.89, 2.91, 2.64],
    ['2023/01/26', 2.9, 2.79, 2.92, 2.79],
    ['2023/01/27', 2.79, 2.69, 2.81, 2.69],
    ['2023/01/30', 2.66, 2.63, 2.69, 2.61],
    ['2023/01/31', 2.65, 2.77, 2.79, 2.65],
    ['2023/02/01', 2.76, 2.66, 2.77, 2.64],
    ['2023/02/02', 2.67, 2.63, 2.71, 2.57],
    ['2023/02/03', 2.61, 2.56, 2.66, 2.49],
    ['2023/02/06', 2.53, 2.56, 2.58, 2.46],
    ['2023/02/07', 2.56, 2.6, 2.7, 2.52],
    ['2023/02/08', 2.56, 2.6, 2.65, 2.56],
    ['2023/02/09', 2.61, 2.53, 2.66, 2.52],
    ['2023/02/10', 2.51, 2.6, 2.6, 2.48],
    ['2023/02/13', 2.6, 2.75, 2.78, 2.55],
    ['2023/02/14', 2.7, 2.86, 2.89, 2.69],
    ['2023/02/15', 2.9, 2.82, 2.9, 2.81],
    ['2023/02/16', 2.87, 2.97, 3.0, 2.83],
    ['2023/02/17', 2.95, 2.7, 2.97, 2.69],
    ['2023/02/21', 2.72, 2.68, 2.79, 2.64],
    ['2023/02/22', 2.66, 2.66, 2.73, 2.65],
    ['2023/02/23', 2.71, 2.8, 2.83, 2.7],
    ['2023/02/24', 2.76, 2.76, 2.81, 2.69],
    ['2023/02/27', 2.75, 2.89, 2.94, 2.72],
    ['2023/02/28', 3.0, 2.9, 3.0, 2.81],
    ['2023/03/01', 2.89, 2.82, 2.89, 2.78],
    ['2023/03/02', 2.79, 2.67, 2.8, 2.66],
    ['2023/03/03', 2.68, 2.81, 2.84, 2.68],
    ['2023/03/06', 2.8, 2.9, 2.92, 2.77],
    ['2023/03/07', 2.9, 2.77, 2.9, 2.76],
    ['2023/03/08', 2.76, 2.82, 2.87, 2.76],
    ['2023/03/09', 2.8, 2.69, 2.85, 2.68],
    ['2023/03/10', 2.66, 2.56, 2.69, 2.53],
    ['2023/03/13', 2.5, 2.47, 2.56, 2.44],
    ['2023/03/14', 2.51, 2.41, 2.56, 2.4],
    ['2023/03/15', 2.34, 2.18, 2.36, 2.13],
    ['2023/03/16', 2.14, 2.26, 2.3, 2.13],
    ['2023/03/17', 2.23, 2.1, 2.24, 2.1],
    ['2023/03/20', 2.12, 2.14, 2.22, 2.1],
    ['2023/03/21', 2.2, 2.29, 2.33, 2.2],
    ['2023/03/22', 2.25, 2.18, 2.3, 2.18],
    ['2023/03/23', 2.19, 2.17, 2.23, 2.12],
    ['2023/03/24', 2.16, 2.22, 2.23, 2.14],
    ['2023/03/27', 2.22, 2.29, 2.33, 2.2],
    ['2023/03/28', 2.3, 2.34, 2.38, 2.26],
    ['2023/03/29', 2.35, 2.39, 2.41, 2.34],
    ['2023/03/30', 2.39, 2.35, 2.41, 2.32],
    ['2023/03/31', 2.35, 2.25, 2.39, 2.23],
    ['2023/04/03', 2.21, 2.34, 2.35, 2.2],
    ['2023/04/04', 2.38, 2.29, 2.38, 2.24],
    ['2023/04/05', 2.24, 2.3, 2.33, 2.21],
    ['2023/04/06', 2.29, 2.25, 2.37, 2.24],
    ['2023/04/10', 2.24, 2.33, 2.35, 2.24],
    ['2023/04/11', 2.36, 2.41, 2.43, 2.35],
    ['2023/04/12', 2.43, 2.53, 2.54, 2.41],
    ['2023/04/13', 2.53, 2.48, 2.55, 2.46],
    ['2023/04/14', 2.5, 2.64, 2.64, 2.5],
    ['2023/04/17', 2.64, 2.65, 2.69, 2.56],
    ['2023/04/18', 2.65, 2.53, 2.66, 2.49],
    ['2023/04/19', 2.45, 2.33, 2.48, 2.32],
    ['2023/04/20', 2.32, 2.35, 2.41, 2.32],
    ['2023/04/21', 2.35, 2.37, 2.42, 2.34],
    ['2023/04/24', 2.37, 2.33, 2.41, 2.31],
    ['2023/04/25', 2.29, 2.25, 2.37, 2.19],
    ['2023/04/26', 2.23, 2.26, 2.3, 2.23],
    ['2023/04/27', 2.24, 2.24, 2.29, 2.22],
    ['2023/04/28', 2.21, 2.23, 2.24, 2.15],
    ['2023/05/01', 2.2, 2.12, 2.26, 2.06],
    ['2023/05/02', 2.1, 2.1, 2.11, 2.05],
    ['2023/05/03', 2.09, 2.08, 2.13, 2.08],
    ['2023/05/04', 2.08, 2.05, 2.09, 2.0],
    ['2023/05/05', 2.09, 2.13, 2.17, 2.07],
    ['2023/05/08', 2.11, 2.28, 2.29, 2.11],
    ['2023/05/09', 2.26, 2.27, 2.34, 2.2],
    ['2023/05/10', 2.32, 2.35, 2.37, 2.27],
    ['2023/05/11', 2.28, 2.37, 2.41, 2.28],
    ['2023/05/12', 2.37, 2.34, 2.41, 2.32],
    ['2023/05/15', 2.31, 2.3, 2.35, 2.28],
    ['2023/05/16', 2.27, 2.16, 2.37, 2.16],
    ['2023/05/17', 2.19, 2.23, 2.24, 2.16],
    ['2023/05/18', 2.19, 2.18, 2.22, 2.15],
    ['2023/05/19', 2.2, 2.25, 2.25, 2.16],
    ['2023/05/22', 2.27, 2.15, 2.28, 2.15],
    ['2023/05/23', 2.22, 2.2, 2.3, 2.15],
    ['2023/05/24', 2.18, 2.2, 2.21, 2.12],
    ['2023/05/25', 2.18, 2.14, 2.19, 2.13],
    ['2023/05/26', 2.14, 2.18, 2.21, 2.13],
    ['2023/05/30', 2.17, 2.18, 2.18, 2.11],
    ['2023/05/31', 2.15, 2.24, 2.24, 2.13],
    ['2023/06/01', 2.22, 2.26, 2.31, 2.22],
    ['2023/06/02', 2.3, 2.25, 2.32, 2.24],
    ['2023/06/05', 2.22, 2.33, 2.34, 2.21],
    ['2023/06/06', 2.34, 2.66, 2.7, 2.34],
    ['2023/06/07', 2.64, 2.64, 2.76, 2.62],
    ['2023/06/08', 2.63, 2.6, 2.69, 2.55],
    ['2023/06/09', 2.56, 2.6, 2.66, 2.56],
    ['2023/06/12', 2.58, 2.55, 2.62, 2.52],
    ['2023/06/13', 2.56, 2.63, 2.66, 2.56],
    ['2023/06/14', 2.64, 2.62, 2.67, 2.57],
    ['2023/06/15', 2.61, 2.81, 2.82, 2.61],
    ['2023/06/16', 2.87, 3.01, 3.05, 2.76],
    ['2023/06/20', 2.97, 3.1, 3.13, 2.95],
    ['2023/06/21', 3.1, 3.22, 3.23, 3.07],
    ['2023/06/22', 3.2, 2.92, 3.22, 2.92],
    ['2023/06/23', 2.92, 2.96, 2.99, 2.83],
    ['2023/06/26', 3.1, 3.12, 3.17, 2.98],
    ['2023/06/27', 3.14, 3.01, 3.14, 2.96],
    ['2023/06/28', 3.03, 3.07, 3.21, 3.02],
    ['2023/06/29', 3.06, 3.11, 3.13, 2.98],
    ['2023/06/30', 3.13, 3.11, 3.14, 3.02],
    ['2023/07/03', 3.07, 3.13, 3.21, 3.07],
    ['2023/07/05', 3.11, 3.22, 3.23, 3.08],
    ['2023/07/06', 3.23, 2.9, 3.23, 2.88],
    ['2023/07/07', 2.9, 2.95, 3.0, 2.9],
    ['2023/07/10', 2.95, 2.94, 2.97, 2.8],
    ['2023/07/11', 2.93, 2.95, 2.99, 2.85],
    ['2023/07/12', 2.99, 3.01, 3.03, 2.94],
    ['2023/07/13', 3.02, 3.17, 3.21, 2.99],
    ['2023/07/14', 3.17, 2.98, 3.17, 2.96],
    ['2023/07/17', 2.97, 3.18, 3.19, 2.97],
    ['2023/07/18', 3.17, 3.17, 3.27, 3.14],
    ['2023/07/19', 3.17, 3.09, 3.23, 3.07],
    ['2023/07/20', 3.11, 3.15, 3.16, 3.05],
    ['2023/07/21', 3.16, 3.36, 3.4, 3.09],
    ['2023/07/24', 3.4, 3.25, 3.57, 3.23],
    ['2023/07/25', 3.23, 3.27, 3.31, 3.18],
    ['2023/07/26', 3.26, 3.37, 3.37, 3.24],
    ['2023/07/27', 3.36, 3.08, 3.37, 3.05],
    ['2023/07/28', 3.16, 3.23, 3.23, 3.12],
    ['2023/07/31', 3.17, 3.17, 3.28, 3.16],
    ['2023/08/01', 3.15, 3.08, 3.17, 3.01],
    ['2023/08/02', 3.07, 2.95, 3.07, 2.93],
    ['2023/08/03', 2.92, 2.96, 3.03, 2.91],
]);
var volumes = [
    392700.0,
    312700.0,
    186200.0,
    378500.0,
    173000.0,
    124200.0,
    24600.0,
    230200.0,
    288600.0,
    822100.0,
    254400.0,
    246200.0,
    299100.0,
    311900.0,
    228500.0,
    372500.0,
    353900.0,
    452200.0,
    259400.0,
    206300.0,
    226500.0,
    312300.0,
    476600.0,
    329200.0,
    276300.0,
    249200.0,
    252000.0,
    260800.0,
    256000.0,
    212400.0,
    190000.0,
    126600.0,
    234400.0,
    182700.0,
    858300.0,
    389400.0,
    281900.0,
    329400.0,
    181600.0,
    271300.0,
    234900.0,
    222800.0,
    367000.0,
    95600.0,
    139000.0,
    96300.0,
    168200.0,
    96200.0,
    160800.0,
    356700.0,
    104300.0,
    219700.0,
    218200.0,
    102700.0,
    242500.0,
    264900.0,
    321600.0,
    479900.0,
    239900.0,
    192100.0,
    257400.0,
    407000.0,
    289700.0,
    183300.0,
    160500.0,
    190000.0,
    145800.0,
    257300.0,
    188000.0,
    56400.0,
    63900.0,
    71200.0,
    121000.0,
    598200.0,
    156900.0,
    65000.0,
    109500.0,
    86500.0,
    185700.0,
    118100.0,
    206300.0,
    94000.0,
    119300.0,
    46200.0,
    334400.0,
    31500.0,
    89200.0,
    85100.0,
    11100.0,
    268000.0,
    197300.0,
    80000.0,
    113600.0,
    37800.0,
    111400.0,
    388900.0,
    264100.0,
    504800.0,
    400600.0,
    531700.0,
    479500.0,
    441700.0,
    402800.0,
    294200.0,
    208500.0,
    786400.0,
    915800.0,
    493300.0,
    290700.0,
    908300.0,
    728100.0,
    673800.0,
    1925500.0,
    1825900.0,
    2059400.0,
    638700.0,
    858000.0,
    351800.0,
    535400.0,
    423100.0,
    231500.0,
    338900.0,
    363800.0,
    266200.0,
    770300.0,
    692200.0,
    522400.0,
    630400.0,
    202000.0,
    426300.0,
    216000.0,
    678400.0,
    523500.0,
    214800.0,
    855700.0,
    760500.0,
    317000.0,
    253000.0,
    324000.0,
    347400.0,
    443500.0,
    675800.0,
    338300.0,
    415000.0,
    390500.0,
    299600.0,
    317500.0,
    228100.0,
    197000.0,
    298300.0,
    436700.0,
    326700.0,
    1019100.0,
    512900.0,
    150700.0,
    330200.0,
    316000.0,
    518200.0,
    369200.0,
    47900.0,
    552200.0,
    305900.0,
    332300.0,
    266000.0,
    342500.0,
    321000.0,
    182800.0,
    349200.0,
    136000.0,
    195800.0,
    461200.0,
    476500.0,
    435100.0,
    665400.0,
    382000.0,
    287800.0,
    649200.0,
    275600.0,
    368600.0,
    235100.0,
    498300.0,
    336400.0,
    284900.0,
    422100.0,
    207800.0,
    383600.0,
    198300.0,
    287200.0,
    252700.0,
    496700.0,
    367300.0,
    421000.0,
    432900.0,
    293600.0,
    181700.0,
    447400.0,
    359000.0,
    219400.0,
    215200.0,
    395200.0,
    460100.0,
    402400.0,
    120900.0,
    134800.0,
    480800.0,
    220100.0,
    267900.0,
    260400.0,
    298500.0,
    1322400.0,
    806500.0,
    401600.0,
    431000.0,
    364800.0,
    534200.0,
    326100.0,
    701800.0,
    939500.0,
    832600.0,
    1196400.0,
    1257200.0,
    572800.0,
    1286800.0,
    801800.0,
    891700.0,
    501500.0,
    456200.0,
    250600.0,
    419700.0,
    705100.0,
    282600.0,
    733900.0,
    528200.0,
    533500.0,
    471500.0,
    905100.0,
    436400.0,
    392000.0,
    297800.0,
    365100.0,
    878800.0,
    820400.0,
    302500.0,
    290100.0,
    879200.0,
    460600.0,
    193900.0,
    341600.0,
    461700.0,
    282300.0,
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
        text: "SUPV",
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