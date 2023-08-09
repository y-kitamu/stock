/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_VICR");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/10', 74.02, 75.77, 75.85, 73.33],
    ['2022/08/11', 76.92, 74.51, 77.05, 74.0],
    ['2022/08/12', 75.5, 77.04, 78.0, 74.43],
    ['2022/08/15', 76.97, 80.97, 81.26, 76.05],
    ['2022/08/16', 80.24, 82.17, 82.4, 80.0],
    ['2022/08/17', 80.8, 80.12, 81.43, 79.23],
    ['2022/08/18', 79.75, 81.97, 81.98, 79.23],
    ['2022/08/19', 80.41, 79.48, 81.69, 78.78],
    ['2022/08/22', 77.48, 73.97, 77.79, 73.47],
    ['2022/08/23', 74.23, 72.73, 75.77, 72.49],
    ['2022/08/24', 72.87, 74.25, 75.08, 72.75],
    ['2022/08/25', 75.38, 76.77, 76.84, 75.13],
    ['2022/08/26', 76.77, 73.65, 76.77, 73.58],
    ['2022/08/29', 72.6, 73.06, 73.71, 72.6],
    ['2022/08/30', 73.72, 71.56, 73.83, 70.15],
    ['2022/08/31', 72.39, 71.14, 72.47, 70.52],
    ['2022/09/01', 66.72, 64.05, 69.94, 61.34],
    ['2022/09/02', 64.9, 63.57, 66.5, 63.25],
    ['2022/09/06', 63.98, 61.95, 63.98, 61.52],
    ['2022/09/07', 61.85, 64.38, 64.62, 61.06],
    ['2022/09/08', 63.35, 65.86, 66.0, 63.23],
    ['2022/09/09', 66.97, 68.73, 68.77, 66.93],
    ['2022/09/12', 69.45, 70.25, 70.62, 68.62],
    ['2022/09/13', 67.23, 65.27, 68.2, 65.08],
    ['2022/09/14', 65.68, 65.49, 65.78, 64.11],
    ['2022/09/15', 64.9, 64.42, 66.61, 64.19],
    ['2022/09/16', 62.82, 62.38, 63.24, 61.85],
    ['2022/09/19', 61.61, 61.85, 62.42, 60.6],
    ['2022/09/20', 61.12, 62.28, 62.67, 60.28],
    ['2022/09/21', 62.91, 61.95, 64.98, 61.88],
    ['2022/09/22', 61.39, 59.94, 61.55, 59.06],
    ['2022/09/23', 58.95, 58.75, 59.06, 57.56],
    ['2022/09/26', 58.75, 57.98, 60.1, 57.39],
    ['2022/09/27', 59.13, 59.62, 60.59, 58.49],
    ['2022/09/28', 59.02, 62.33, 62.94, 59.02],
    ['2022/09/29', 61.19, 59.95, 61.29, 59.0],
    ['2022/09/30', 59.94, 59.14, 61.53, 59.12],
    ['2022/10/03', 60.1, 62.63, 62.76, 59.45],
    ['2022/10/04', 64.27, 64.43, 65.35, 62.67],
    ['2022/10/05', 63.41, 63.68, 64.24, 62.35],
    ['2022/10/06', 63.16, 62.68, 64.62, 62.4],
    ['2022/10/07', 61.8, 57.54, 61.8, 57.02],
    ['2022/10/10', 57.96, 55.68, 57.96, 54.06],
    ['2022/10/11', 54.59, 50.55, 55.61, 50.11],
    ['2022/10/12', 50.29, 50.26, 50.92, 49.23],
    ['2022/10/13', 47.93, 51.95, 52.63, 46.55],
    ['2022/10/14', 52.48, 47.35, 52.9, 47.3],
    ['2022/10/17', 49.13, 50.36, 50.85, 48.83],
    ['2022/10/18', 52.0, 51.3, 53.17, 50.65],
    ['2022/10/19', 49.87, 48.5, 50.37, 47.77],
    ['2022/10/20', 48.23, 45.09, 48.81, 44.76],
    ['2022/10/21', 45.1, 46.31, 47.11, 42.9],
    ['2022/10/24', 46.3, 45.91, 46.39, 44.49],
    ['2022/10/25', 46.26, 48.62, 49.12, 46.26],
    ['2022/10/26', 53.84, 47.89, 53.84, 47.79],
    ['2022/10/27', 48.42, 48.3, 49.95, 47.94],
    ['2022/10/28', 48.56, 49.95, 49.98, 48.35],
    ['2022/10/31', 49.45, 47.77, 49.9, 47.72],
    ['2022/11/01', 48.96, 50.75, 51.16, 47.75],
    ['2022/11/02', 50.82, 48.52, 52.42, 48.52],
    ['2022/11/03', 47.91, 48.48, 49.1, 46.76],
    ['2022/11/04', 49.83, 48.45, 49.84, 46.52],
    ['2022/11/07', 49.19, 50.47, 51.26, 48.77],
    ['2022/11/08', 51.32, 50.8, 52.62, 50.19],
    ['2022/11/09', 50.24, 48.05, 50.48, 48.02],
    ['2022/11/10', 51.55, 53.0, 53.32, 51.54],
    ['2022/11/11', 53.0, 58.9, 59.36, 53.0],
    ['2022/11/14', 58.04, 55.72, 58.62, 55.65],
    ['2022/11/15', 57.52, 56.42, 58.87, 55.61],
    ['2022/11/16', 55.42, 53.59, 55.67, 53.05],
    ['2022/11/17', 51.84, 52.19, 52.89, 51.02],
    ['2022/11/18', 54.04, 53.47, 54.21, 52.5],
    ['2022/11/21', 52.85, 52.3, 52.93, 51.73],
    ['2022/11/22', 52.53, 53.25, 53.43, 51.91],
    ['2022/11/23', 53.41, 54.49, 54.94, 53.41],
    ['2022/11/25', 54.22, 54.07, 55.02, 54.07],
    ['2022/11/28', 53.2, 51.27, 54.86, 51.01],
    ['2022/11/29', 51.09, 51.14, 52.57, 51.05],
    ['2022/11/30', 51.2, 53.99, 54.12, 50.36],
    ['2022/12/01', 54.34, 53.9, 55.23, 52.61],
    ['2022/12/02', 52.66, 52.84, 53.32, 51.51],
    ['2022/12/05', 52.66, 52.02, 53.22, 51.5],
    ['2022/12/06', 52.36, 51.6, 52.36, 50.67],
    ['2022/12/07', 51.6, 52.44, 52.51, 51.02],
    ['2022/12/08', 52.72, 54.1, 54.12, 52.0],
    ['2022/12/09', 53.91, 53.39, 54.07, 53.02],
    ['2022/12/12', 54.43, 54.54, 54.82, 53.73],
    ['2022/12/13', 57.52, 55.33, 58.37, 54.93],
    ['2022/12/14', 55.24, 54.97, 55.8, 54.23],
    ['2022/12/15', 53.91, 53.12, 54.62, 52.7],
    ['2022/12/16', 52.24, 53.4, 53.55, 52.24],
    ['2022/12/19', 53.49, 52.46, 53.49, 52.09],
    ['2022/12/20', 52.05, 53.02, 54.25, 51.65],
    ['2022/12/21', 53.62, 54.82, 55.28, 53.47],
    ['2022/12/22', 53.73, 52.42, 54.43, 50.11],
    ['2022/12/23', 52.58, 52.57, 52.64, 51.4],
    ['2022/12/27', 52.57, 52.12, 52.57, 51.13],
    ['2022/12/28', 52.19, 51.26, 52.6, 51.0],
    ['2022/12/29', 52.13, 53.49, 53.7, 51.95],
    ['2022/12/30', 52.65, 53.75, 54.0, 52.65],
    ['2023/01/03', 54.45, 54.24, 55.62, 53.59],
    ['2023/01/04', 54.86, 55.17, 55.73, 54.47],
    ['2023/01/05', 54.52, 53.03, 54.52, 52.3],
    ['2023/01/06', 53.65, 56.25, 56.73, 52.76],
    ['2023/01/09', 56.88, 57.06, 57.97, 56.51],
    ['2023/01/10', 56.67, 57.17, 57.47, 55.87],
    ['2023/01/11', 57.48, 57.65, 57.86, 56.59],
    ['2023/01/12', 58.26, 60.75, 60.75, 57.17],
    ['2023/01/13', 59.92, 60.26, 60.5, 59.47],
    ['2023/01/17', 60.49, 61.7, 61.74, 59.23],
    ['2023/01/18', 62.13, 62.31, 63.1, 60.93],
    ['2023/01/19', 61.55, 62.57, 62.61, 61.5],
    ['2023/01/20', 63.57, 65.19, 65.75, 62.96],
    ['2023/01/23', 65.55, 70.01, 70.24, 65.42],
    ['2023/01/24', 69.36, 71.05, 71.65, 69.13],
    ['2023/01/25', 69.49, 71.06, 71.12, 68.48],
    ['2023/01/26', 71.88, 70.31, 72.31, 67.92],
    ['2023/01/27', 69.72, 71.01, 71.95, 69.51],
    ['2023/01/30', 69.47, 67.25, 70.39, 67.15],
    ['2023/01/31', 67.4, 69.43, 69.51, 67.31],
    ['2023/02/01', 69.48, 70.16, 71.79, 69.02],
    ['2023/02/02', 71.52, 71.9, 74.44, 70.7],
    ['2023/02/03', 70.47, 70.55, 71.71, 69.73],
    ['2023/02/06', 69.71, 70.01, 70.76, 68.95],
    ['2023/02/07', 69.89, 70.38, 70.77, 68.92],
    ['2023/02/08', 69.6, 69.13, 70.52, 68.17],
    ['2023/02/09', 70.11, 66.08, 71.03, 66.06],
    ['2023/02/10', 65.63, 63.34, 65.63, 63.18],
    ['2023/02/13', 63.53, 64.34, 65.67, 63.2],
    ['2023/02/14', 63.88, 64.34, 65.15, 62.9],
    ['2023/02/15', 64.19, 64.9, 65.52, 63.89],
    ['2023/02/16', 63.43, 62.21, 64.46, 62.19],
    ['2023/02/17', 62.0, 61.29, 62.0, 58.5],
    ['2023/02/21', 59.83, 56.57, 60.9, 56.26],
    ['2023/02/22', 56.81, 56.47, 57.58, 56.0],
    ['2023/02/23', 57.87, 56.32, 58.43, 55.6],
    ['2023/02/24', 43.15, 40.85, 44.36, 38.71],
    ['2023/02/27', 41.35, 44.72, 45.37, 41.31],
    ['2023/02/28', 44.72, 47.0, 48.42, 44.55],
    ['2023/03/01', 46.69, 47.86, 48.59, 45.97],
    ['2023/03/02', 46.61, 47.32, 47.69, 45.77],
    ['2023/03/03', 47.32, 45.75, 47.32, 45.72],
    ['2023/03/06', 45.74, 43.23, 45.75, 42.7],
    ['2023/03/07', 42.71, 43.0, 44.28, 42.71],
    ['2023/03/08', 42.99, 43.69, 43.9, 41.31],
    ['2023/03/09', 44.13, 43.9, 44.53, 43.44],
    ['2023/03/10', 43.93, 42.9, 44.09, 42.38],
    ['2023/03/13', 41.99, 43.37, 43.47, 41.01],
    ['2023/03/14', 44.95, 43.79, 45.02, 42.91],
    ['2023/03/15', 42.62, 42.19, 42.87, 41.21],
    ['2023/03/16', 42.08, 42.72, 43.03, 41.45],
    ['2023/03/17', 42.59, 41.56, 42.92, 41.13],
    ['2023/03/20', 41.86, 42.22, 42.44, 41.33],
    ['2023/03/21', 43.0, 43.59, 43.78, 42.88],
    ['2023/03/22', 43.43, 43.67, 44.54, 43.19],
    ['2023/03/23', 44.21, 43.81, 45.63, 43.38],
    ['2023/03/24', 43.27, 43.53, 43.84, 42.83],
    ['2023/03/27', 44.08, 43.91, 44.08, 43.15],
    ['2023/03/28', 43.47, 43.79, 43.95, 42.95],
    ['2023/03/29', 44.27, 45.87, 45.98, 43.83],
    ['2023/03/30', 46.52, 46.28, 47.29, 45.98],
    ['2023/03/31', 46.71, 46.94, 47.38, 46.36],
    ['2023/04/03', 46.59, 46.96, 47.23, 45.83],
    ['2023/04/04', 47.14, 46.61, 47.14, 46.25],
    ['2023/04/05', 46.11, 45.19, 46.15, 44.59],
    ['2023/04/06', 44.89, 46.02, 46.09, 44.39],
    ['2023/04/10', 45.39, 45.42, 45.7, 44.53],
    ['2023/04/11', 45.67, 45.47, 46.0, 45.37],
    ['2023/04/12', 46.12, 45.05, 46.12, 44.75],
    ['2023/04/13', 45.56, 45.77, 45.86, 44.46],
    ['2023/04/14', 45.55, 44.36, 45.87, 43.92],
    ['2023/04/17', 44.23, 45.17, 45.36, 44.03],
    ['2023/04/18', 45.52, 42.92, 45.52, 41.82],
    ['2023/04/19', 42.59, 43.03, 43.24, 42.25],
    ['2023/04/20', 42.53, 42.96, 43.05, 42.24],
    ['2023/04/21', 42.78, 42.44, 43.08, 42.12],
    ['2023/04/24', 42.3, 42.62, 42.81, 41.77],
    ['2023/04/25', 42.03, 41.44, 42.1, 41.2],
    ['2023/04/26', 43.99, 43.55, 47.26, 42.58],
    ['2023/04/27', 43.89, 42.99, 44.01, 42.35],
    ['2023/04/28', 42.83, 42.97, 43.06, 42.23],
    ['2023/05/01', 42.94, 42.87, 43.57, 42.39],
    ['2023/05/02', 42.68, 41.61, 43.13, 41.59],
    ['2023/05/03', 41.8, 41.73, 42.16, 40.71],
    ['2023/05/04', 41.36, 41.28, 42.56, 40.95],
    ['2023/05/05', 42.07, 44.74, 45.46, 41.74],
    ['2023/05/08', 44.91, 42.99, 44.91, 42.71],
    ['2023/05/09', 42.74, 42.8, 43.39, 42.08],
    ['2023/05/10', 43.65, 43.51, 43.71, 43.01],
    ['2023/05/11', 43.34, 43.58, 43.85, 42.61],
    ['2023/05/12', 43.72, 44.1, 44.12, 42.88],
    ['2023/05/15', 44.26, 44.26, 44.75, 43.75],
    ['2023/05/16', 44.0, 46.05, 46.4, 43.91],
    ['2023/05/17', 46.17, 48.61, 49.5, 45.44],
    ['2023/05/18', 48.56, 49.28, 49.36, 47.55],
    ['2023/05/19', 49.91, 48.46, 50.82, 48.45],
    ['2023/05/22', 48.68, 49.8, 49.88, 48.5],
    ['2023/05/23', 49.66, 48.87, 51.27, 48.83],
    ['2023/05/24', 48.02, 46.57, 48.27, 45.94],
    ['2023/05/25', 49.0, 54.0, 54.9, 49.0],
    ['2023/05/26', 54.25, 60.15, 60.59, 54.2],
    ['2023/05/30', 62.0, 60.5, 62.0, 58.14],
    ['2023/05/31', 59.8, 55.35, 60.58, 54.26],
    ['2023/06/01', 55.66, 57.9, 58.11, 54.49],
    ['2023/06/02', 58.0, 56.89, 58.09, 55.31],
    ['2023/06/05', 56.13, 54.71, 56.37, 54.01],
    ['2023/06/06', 54.36, 55.77, 56.2, 54.26],
    ['2023/06/07', 56.45, 58.32, 59.04, 56.3],
    ['2023/06/08', 58.15, 58.01, 59.26, 57.68],
    ['2023/06/09', 58.63, 57.37, 58.63, 57.06],
    ['2023/06/12', 57.5, 59.03, 59.38, 57.23],
    ['2023/06/13', 59.76, 60.26, 61.59, 58.84],
    ['2023/06/14', 60.26, 59.15, 60.77, 58.59],
    ['2023/06/15', 58.48, 56.33, 58.92, 56.04],
    ['2023/06/16', 57.4, 54.88, 57.4, 54.07],
    ['2023/06/20', 54.31, 54.54, 55.02, 53.31],
    ['2023/06/21', 53.85, 53.52, 54.18, 52.85],
    ['2023/06/22', 53.25, 52.79, 53.25, 52.39],
    ['2023/06/23', 52.01, 53.07, 53.58, 51.96],
    ['2023/06/26', 54.62, 55.35, 58.39, 54.4],
    ['2023/06/27', 55.36, 56.24, 56.77, 52.35],
    ['2023/06/28', 55.87, 54.98, 55.89, 53.52],
    ['2023/06/29', 55.0, 54.38, 55.33, 53.75],
    ['2023/06/30', 54.98, 54.0, 54.98, 53.62],
    ['2023/07/03', 54.25, 54.61, 55.01, 53.97],
    ['2023/07/05', 54.5, 53.27, 54.5, 52.61],
    ['2023/07/06', 52.69, 53.44, 53.46, 52.18],
    ['2023/07/07', 53.84, 53.29, 54.64, 53.15],
    ['2023/07/10', 53.31, 52.95, 54.94, 52.63],
    ['2023/07/11', 53.28, 54.46, 54.53, 52.31],
    ['2023/07/12', 55.62, 55.11, 55.62, 54.65],
    ['2023/07/13', 55.44, 58.22, 58.4, 55.26],
    ['2023/07/14', 58.39, 58.33, 58.76, 57.31],
    ['2023/07/17', 58.17, 59.69, 59.97, 58.0],
    ['2023/07/18', 59.49, 59.21, 59.93, 58.11],
    ['2023/07/19', 59.7, 59.56, 60.51, 58.96],
    ['2023/07/20', 59.4, 59.08, 60.27, 58.7],
    ['2023/07/21', 59.55, 58.65, 59.81, 58.2],
    ['2023/07/24', 58.61, 59.09, 59.89, 58.43],
    ['2023/07/25', 59.0, 59.41, 60.31, 58.41],
    ['2023/07/26', 77.4, 93.7, 93.84, 77.4],
    ['2023/07/27', 95.24, 95.14, 98.38, 92.45],
    ['2023/07/28', 95.29, 95.14, 96.74, 93.36],
    ['2023/07/31', 94.9, 92.27, 97.69, 92.04],
    ['2023/08/01', 90.65, 88.0, 91.0, 87.42],
    ['2023/08/02', 84.94, 78.35, 85.7, 76.1],
    ['2023/08/03', 77.78, 74.96, 78.53, 73.97],
    ['2023/08/04', 75.85, 77.67, 79.25, 75.69],
    ['2023/08/07', 77.52, 77.3, 78.01, 75.85],
    ['2023/08/08', 76.05, 78.08, 78.33, 74.54],
]);
var volumes = [
    142300.0,
    139100.0,
    161000.0,
    365200.0,
    237800.0,
    231200.0,
    222900.0,
    304900.0,
    223500.0,
    161400.0,
    138400.0,
    85100.0,
    208500.0,
    181200.0,
    168100.0,
    197800.0,
    504400.0,
    214500.0,
    189000.0,
    245500.0,
    138700.0,
    129600.0,
    195400.0,
    162300.0,
    159000.0,
    101200.0,
    266600.0,
    137500.0,
    154700.0,
    162600.0,
    180500.0,
    110900.0,
    134100.0,
    103200.0,
    210000.0,
    132300.0,
    137800.0,
    157000.0,
    157600.0,
    153400.0,
    113500.0,
    180100.0,
    176000.0,
    352900.0,
    326100.0,
    326700.0,
    243200.0,
    242600.0,
    209200.0,
    202300.0,
    539600.0,
    417700.0,
    328500.0,
    511100.0,
    971400.0,
    573900.0,
    518900.0,
    240500.0,
    356300.0,
    384500.0,
    196700.0,
    314700.0,
    304700.0,
    207000.0,
    307600.0,
    346000.0,
    394100.0,
    180500.0,
    299700.0,
    217100.0,
    245200.0,
    196700.0,
    118700.0,
    163900.0,
    102300.0,
    71200.0,
    240300.0,
    176000.0,
    163900.0,
    274600.0,
    248100.0,
    241300.0,
    176000.0,
    174600.0,
    366400.0,
    213500.0,
    156800.0,
    166200.0,
    201900.0,
    279100.0,
    480500.0,
    244200.0,
    176100.0,
    182600.0,
    310000.0,
    110500.0,
    131200.0,
    108300.0,
    136900.0,
    123600.0,
    261300.0,
    114100.0,
    140700.0,
    167300.0,
    242600.0,
    340400.0,
    222400.0,
    292400.0,
    155900.0,
    185900.0,
    177500.0,
    148100.0,
    206600.0,
    318700.0,
    331500.0,
    373900.0,
    204500.0,
    112400.0,
    192500.0,
    168200.0,
    354600.0,
    263000.0,
    272500.0,
    150400.0,
    190800.0,
    152500.0,
    293800.0,
    290100.0,
    323700.0,
    336400.0,
    190200.0,
    289500.0,
    443400.0,
    315900.0,
    409800.0,
    713400.0,
    2656300.0,
    1179000.0,
    692600.0,
    404200.0,
    401000.0,
    477600.0,
    735500.0,
    646900.0,
    425600.0,
    547900.0,
    469900.0,
    408200.0,
    357600.0,
    294600.0,
    348500.0,
    458500.0,
    278900.0,
    234800.0,
    292100.0,
    247900.0,
    156800.0,
    166200.0,
    176500.0,
    235600.0,
    323500.0,
    240100.0,
    235800.0,
    195000.0,
    298500.0,
    158500.0,
    137400.0,
    146200.0,
    175700.0,
    128800.0,
    183500.0,
    188700.0,
    315900.0,
    215600.0,
    167400.0,
    187100.0,
    147100.0,
    279600.0,
    563300.0,
    253900.0,
    204200.0,
    185700.0,
    199900.0,
    277900.0,
    178500.0,
    435800.0,
    187100.0,
    123800.0,
    169300.0,
    136500.0,
    158100.0,
    135700.0,
    281800.0,
    371500.0,
    262100.0,
    266500.0,
    193200.0,
    188200.0,
    321800.0,
    914000.0,
    720100.0,
    687000.0,
    510600.0,
    362900.0,
    417400.0,
    385900.0,
    388600.0,
    802500.0,
    530200.0,
    306200.0,
    319500.0,
    463800.0,
    216500.0,
    333600.0,
    428900.0,
    355200.0,
    247600.0,
    222400.0,
    591700.0,
    1159700.0,
    1013100.0,
    549500.0,
    428300.0,
    280300.0,
    126800.0,
    272900.0,
    256900.0,
    300500.0,
    231100.0,
    281200.0,
    184100.0,
    320900.0,
    453400.0,
    294800.0,
    300100.0,
    301400.0,
    447100.0,
    318400.0,
    369400.0,
    521300.0,
    4839800.0,
    1618700.0,
    685200.0,
    605400.0,
    757500.0,
    1505600.0,
    1104500.0,
    625500.0,
    347000.0,
    373000.0,
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
     *     text: "VICR",
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