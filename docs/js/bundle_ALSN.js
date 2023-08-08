/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_ALSN");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/09', 38.1, 37.49, 38.27, 37.33],
    ['2022/08/10', 37.96, 38.52, 38.84, 37.79],
    ['2022/08/11', 38.75, 38.8, 39.18, 38.42],
    ['2022/08/12', 38.9, 38.77, 39.15, 38.53],
    ['2022/08/15', 38.64, 39.26, 39.55, 38.51],
    ['2022/08/16', 39.09, 39.05, 39.68, 39.0],
    ['2022/08/17', 38.58, 38.8, 39.03, 38.53],
    ['2022/08/18', 38.88, 39.27, 39.45, 38.76],
    ['2022/08/19', 38.88, 38.69, 39.1, 38.5],
    ['2022/08/22', 38.2, 37.47, 38.44, 37.39],
    ['2022/08/23', 37.43, 37.43, 38.0, 37.41],
    ['2022/08/24', 37.32, 37.38, 37.6, 37.03],
    ['2022/08/25', 37.5, 38.38, 38.4, 37.44],
    ['2022/08/26', 38.46, 37.14, 38.55, 37.11],
    ['2022/08/29', 36.87, 37.09, 37.43, 36.55],
    ['2022/08/30', 37.09, 36.73, 37.09, 36.59],
    ['2022/08/31', 36.84, 36.26, 36.84, 36.09],
    ['2022/09/01', 35.96, 36.22, 36.3, 35.71],
    ['2022/09/02', 36.69, 36.15, 36.86, 35.98],
    ['2022/09/06', 35.86, 35.9, 36.27, 35.84],
    ['2022/09/07', 35.83, 36.36, 36.54, 35.73],
    ['2022/09/08', 36.07, 36.16, 36.29, 35.55],
    ['2022/09/09', 36.5, 37.03, 37.14, 36.5],
    ['2022/09/12', 37.2, 37.37, 37.78, 37.2],
    ['2022/09/13', 36.56, 35.41, 36.82, 35.32],
    ['2022/09/14', 35.44, 35.29, 35.68, 35.09],
    ['2022/09/15', 35.04, 35.3, 35.7, 34.86],
    ['2022/09/16', 34.84, 35.11, 35.56, 34.75],
    ['2022/09/19', 34.93, 36.05, 36.1, 34.93],
    ['2022/09/20', 35.81, 35.5, 35.88, 35.26],
    ['2022/09/21', 35.74, 34.92, 36.12, 34.92],
    ['2022/09/22', 34.93, 34.51, 35.07, 34.47],
    ['2022/09/23', 34.01, 33.44, 34.1, 33.12],
    ['2022/09/26', 33.06, 32.63, 33.54, 32.63],
    ['2022/09/27', 32.99, 33.61, 33.7, 32.8],
    ['2022/09/28', 33.85, 34.75, 34.97, 33.71],
    ['2022/09/29', 34.37, 34.23, 34.54, 33.83],
    ['2022/09/30', 34.2, 33.76, 34.63, 33.74],
    ['2022/10/03', 34.21, 34.54, 34.8, 33.68],
    ['2022/10/04', 35.1, 36.03, 36.08, 34.94],
    ['2022/10/05', 35.41, 35.79, 36.34, 35.27],
    ['2022/10/06', 35.74, 35.42, 36.08, 35.37],
    ['2022/10/07', 35.14, 35.18, 35.24, 34.61],
    ['2022/10/10', 35.36, 35.33, 35.67, 35.07],
    ['2022/10/11', 35.33, 35.75, 36.25, 35.19],
    ['2022/10/12', 35.7, 35.75, 36.17, 35.41],
    ['2022/10/13', 35.23, 36.85, 36.92, 35.06],
    ['2022/10/14', 36.77, 36.04, 36.87, 35.97],
    ['2022/10/17', 36.49, 36.47, 36.98, 36.05],
    ['2022/10/18', 37.02, 37.01, 37.51, 36.71],
    ['2022/10/19', 36.87, 36.74, 37.29, 36.46],
    ['2022/10/20', 36.59, 36.07, 36.88, 35.92],
    ['2022/10/21', 36.27, 37.61, 37.72, 36.03],
    ['2022/10/24', 37.69, 38.41, 38.63, 37.56],
    ['2022/10/25', 38.38, 39.03, 39.33, 38.25],
    ['2022/10/26', 39.37, 39.02, 39.59, 38.69],
    ['2022/10/27', 41.22, 41.28, 42.67, 39.53],
    ['2022/10/28', 41.25, 41.85, 42.1, 41.08],
    ['2022/10/31', 41.49, 42.25, 42.31, 41.42],
    ['2022/11/01', 42.45, 42.65, 42.8, 42.01],
    ['2022/11/02', 42.34, 41.6, 42.7, 41.47],
    ['2022/11/03', 40.97, 41.75, 42.23, 40.7],
    ['2022/11/04', 42.33, 42.84, 42.96, 42.08],
    ['2022/11/07', 42.95, 43.17, 43.38, 42.72],
    ['2022/11/08', 43.27, 42.51, 43.54, 42.27],
    ['2022/11/09', 42.24, 42.26, 42.74, 41.95],
    ['2022/11/10', 43.33, 42.36, 43.41, 42.25],
    ['2022/11/11', 42.49, 42.79, 43.12, 42.19],
    ['2022/11/14', 42.61, 42.73, 43.94, 42.61],
    ['2022/11/15', 42.94, 42.9, 43.64, 42.73],
    ['2022/11/16', 42.58, 43.24, 43.43, 42.39],
    ['2022/11/17', 42.54, 44.04, 44.07, 42.52],
    ['2022/11/18', 44.02, 43.56, 44.3, 43.16],
    ['2022/11/21', 43.45, 43.25, 43.63, 43.01],
    ['2022/11/22', 43.52, 44.1, 44.27, 43.45],
    ['2022/11/23', 44.16, 44.5, 44.7, 44.14],
    ['2022/11/25', 44.57, 44.05, 44.62, 43.84],
    ['2022/11/28', 43.88, 44.51, 44.68, 43.88],
    ['2022/11/29', 44.78, 44.66, 45.24, 44.3],
    ['2022/11/30', 44.75, 44.8, 44.94, 44.3],
    ['2022/12/01', 44.96, 44.84, 45.33, 44.37],
    ['2022/12/02', 44.66, 44.82, 44.96, 44.42],
    ['2022/12/05', 44.56, 43.97, 44.56, 43.8],
    ['2022/12/06', 43.98, 43.75, 44.34, 43.45],
    ['2022/12/07', 43.65, 43.76, 44.18, 43.46],
    ['2022/12/08', 44.09, 43.07, 44.43, 42.84],
    ['2022/12/09', 42.82, 42.53, 43.02, 42.5],
    ['2022/12/12', 42.56, 42.68, 42.93, 42.06],
    ['2022/12/13', 43.5, 42.77, 43.61, 42.39],
    ['2022/12/14', 43.0, 43.02, 43.72, 42.9],
    ['2022/12/15', 42.6, 42.37, 42.91, 42.04],
    ['2022/12/16', 41.98, 42.28, 42.49, 41.77],
    ['2022/12/19', 42.48, 42.13, 42.88, 42.06],
    ['2022/12/20', 42.15, 42.28, 42.68, 42.05],
    ['2022/12/21', 42.6, 42.98, 43.21, 42.36],
    ['2022/12/22', 42.63, 42.13, 42.63, 41.7],
    ['2022/12/23', 42.15, 42.25, 42.41, 41.89],
    ['2022/12/27', 42.45, 42.13, 42.57, 42.02],
    ['2022/12/28', 42.18, 41.44, 42.42, 41.34],
    ['2022/12/29', 41.59, 41.53, 41.87, 41.39],
    ['2022/12/30', 41.32, 41.6, 41.79, 41.12],
    ['2023/01/03', 41.82, 41.51, 41.82, 41.08],
    ['2023/01/04', 41.64, 41.59, 41.92, 41.34],
    ['2023/01/05', 41.59, 41.71, 41.97, 41.44],
    ['2023/01/06', 41.96, 42.25, 42.56, 41.88],
    ['2023/01/09', 42.4, 42.24, 42.71, 42.12],
    ['2023/01/10', 42.26, 42.73, 42.85, 41.85],
    ['2023/01/11', 42.83, 43.19, 43.44, 42.77],
    ['2023/01/12', 43.12, 43.2, 43.53, 43.12],
    ['2023/01/13', 42.89, 43.33, 43.46, 42.74],
    ['2023/01/17', 43.35, 43.03, 43.68, 43.0],
    ['2023/01/18', 43.37, 42.68, 43.6, 42.67],
    ['2023/01/19', 42.51, 41.54, 42.65, 41.54],
    ['2023/01/20', 41.74, 41.63, 42.14, 41.43],
    ['2023/01/23', 41.75, 42.49, 42.71, 41.75],
    ['2023/01/24', 42.74, 43.68, 44.08, 42.5],
    ['2023/01/25', 43.51, 43.79, 43.92, 43.11],
    ['2023/01/26', 44.04, 44.66, 44.98, 43.64],
    ['2023/01/27', 44.74, 44.43, 44.81, 44.17],
    ['2023/01/30', 44.38, 44.25, 44.63, 44.23],
    ['2023/01/31', 44.41, 45.08, 45.08, 44.04],
    ['2023/02/01', 45.0, 45.53, 45.96, 44.81],
    ['2023/02/02', 45.57, 45.8, 46.03, 45.28],
    ['2023/02/03', 45.43, 45.95, 46.1, 45.43],
    ['2023/02/06', 45.91, 46.04, 46.22, 45.74],
    ['2023/02/07', 45.83, 45.93, 46.06, 45.4],
    ['2023/02/08', 45.74, 45.52, 45.93, 45.49],
    ['2023/02/09', 45.76, 45.35, 46.2, 45.26],
    ['2023/02/10', 45.11, 45.32, 45.42, 44.99],
    ['2023/02/13', 45.25, 45.6, 45.68, 45.1],
    ['2023/02/14', 45.6, 45.53, 45.73, 45.0],
    ['2023/02/15', 45.39, 45.58, 46.01, 45.33],
    ['2023/02/16', 47.5, 50.23, 50.46, 47.11],
    ['2023/02/17', 50.38, 49.7, 50.64, 49.19],
    ['2023/02/21', 49.33, 48.59, 49.54, 47.65],
    ['2023/02/22', 48.91, 47.35, 48.91, 47.22],
    ['2023/02/23', 47.49, 47.57, 47.99, 47.38],
    ['2023/02/24', 47.47, 47.54, 47.65, 46.93],
    ['2023/02/27', 47.7, 47.68, 48.03, 47.49],
    ['2023/02/28', 47.66, 47.5, 48.03, 47.49],
    ['2023/03/01', 47.5, 48.01, 48.54, 47.34],
    ['2023/03/02', 47.73, 48.73, 48.73, 47.43],
    ['2023/03/03', 48.59, 48.65, 49.0, 47.93],
    ['2023/03/06', 48.65, 48.52, 49.17, 48.35],
    ['2023/03/07', 48.4, 48.18, 48.88, 48.05],
    ['2023/03/08', 48.36, 48.12, 48.56, 47.77],
    ['2023/03/09', 48.26, 47.29, 48.45, 47.28],
    ['2023/03/10', 47.21, 45.75, 47.32, 45.56],
    ['2023/03/13', 45.01, 43.92, 45.17, 43.86],
    ['2023/03/14', 44.63, 44.43, 45.77, 44.14],
    ['2023/03/15', 43.63, 43.36, 43.89, 42.48],
    ['2023/03/16', 42.94, 43.59, 43.81, 42.54],
    ['2023/03/17', 43.26, 41.87, 43.26, 41.61],
    ['2023/03/20', 41.88, 42.69, 43.38, 41.74],
    ['2023/03/21', 43.51, 43.97, 44.51, 43.42],
    ['2023/03/22', 43.87, 43.18, 44.17, 43.16],
    ['2023/03/23', 43.25, 42.77, 43.92, 42.52],
    ['2023/03/24', 42.36, 43.04, 43.06, 41.83],
    ['2023/03/27', 43.31, 43.47, 43.81, 42.94],
    ['2023/03/28', 43.55, 44.31, 44.34, 43.52],
    ['2023/03/29', 44.8, 44.59, 44.8, 44.2],
    ['2023/03/30', 44.98, 44.57, 45.0, 44.41],
    ['2023/03/31', 44.78, 45.24, 45.35, 44.77],
    ['2023/04/03', 45.17, 45.28, 45.54, 44.65],
    ['2023/04/04', 45.25, 44.6, 45.29, 43.89],
    ['2023/04/05', 44.27, 43.96, 44.65, 43.26],
    ['2023/04/06', 44.05, 43.11, 44.23, 43.05],
    ['2023/04/10', 43.02, 44.09, 44.28, 43.02],
    ['2023/04/11', 44.16, 44.66, 44.96, 44.07],
    ['2023/04/12', 44.87, 45.55, 45.66, 44.84],
    ['2023/04/13', 45.48, 45.91, 45.91, 44.77],
    ['2023/04/14', 46.05, 46.25, 46.39, 45.74],
    ['2023/04/17', 46.3, 46.17, 46.83, 46.01],
    ['2023/04/18', 46.47, 47.0, 47.06, 46.3],
    ['2023/04/19', 46.95, 46.48, 46.97, 46.23],
    ['2023/04/20', 46.46, 46.59, 46.8, 46.29],
    ['2023/04/21', 46.54, 46.35, 46.85, 45.81],
    ['2023/04/24', 46.26, 46.88, 47.02, 46.09],
    ['2023/04/25', 46.77, 46.47, 47.01, 46.17],
    ['2023/04/26', 46.15, 45.42, 46.68, 45.36],
    ['2023/04/27', 44.97, 45.59, 45.64, 44.68],
    ['2023/04/28', 47.86, 48.79, 49.95, 47.24],
    ['2023/05/01', 48.57, 48.42, 49.53, 48.32],
    ['2023/05/02', 48.54, 48.07, 48.57, 47.29],
    ['2023/05/03', 48.12, 47.47, 48.8, 47.47],
    ['2023/05/04', 47.47, 46.08, 47.58, 45.36],
    ['2023/05/05', 46.53, 47.24, 47.29, 46.47],
    ['2023/05/08', 47.54, 48.1, 48.27, 47.19],
    ['2023/05/09', 47.81, 48.16, 48.19, 47.51],
    ['2023/05/10', 48.55, 48.09, 48.55, 47.6],
    ['2023/05/11', 47.6, 47.61, 47.81, 47.27],
    ['2023/05/12', 47.69, 47.81, 47.98, 47.46],
    ['2023/05/15', 48.0, 48.54, 48.62, 47.78],
    ['2023/05/16', 48.33, 47.89, 48.41, 47.67],
    ['2023/05/17', 48.12, 48.63, 48.84, 47.83],
    ['2023/05/18', 48.5, 49.26, 49.37, 48.24],
    ['2023/05/19', 49.67, 49.34, 49.87, 48.88],
    ['2023/05/22', 49.22, 49.06, 49.58, 48.53],
    ['2023/05/23', 49.0, 48.33, 49.43, 48.33],
    ['2023/05/24', 48.05, 47.57, 48.11, 47.22],
    ['2023/05/25', 47.64, 48.41, 48.49, 47.45],
    ['2023/05/26', 48.64, 48.57, 48.98, 48.18],
    ['2023/05/30', 49.0, 48.78, 49.22, 48.4],
    ['2023/05/31', 48.5, 47.3, 48.79, 47.23],
    ['2023/06/01', 47.57, 48.36, 48.4, 47.35],
    ['2023/06/02', 49.0, 50.89, 50.95, 49.0],
    ['2023/06/05', 50.78, 50.04, 50.93, 49.93],
    ['2023/06/06', 50.0, 51.26, 51.4, 49.95],
    ['2023/06/07', 51.25, 52.55, 52.62, 51.14],
    ['2023/06/08', 52.76, 53.23, 53.39, 52.45],
    ['2023/06/09', 53.2, 53.04, 53.45, 52.69],
    ['2023/06/12', 53.1, 53.55, 53.81, 52.59],
    ['2023/06/13', 53.9, 54.51, 54.82, 53.87],
    ['2023/06/14', 54.55, 53.43, 54.81, 53.27],
    ['2023/06/15', 53.31, 54.12, 54.18, 53.31],
    ['2023/06/16', 54.38, 54.11, 54.53, 53.64],
    ['2023/06/20', 53.68, 53.25, 53.74, 52.95],
    ['2023/06/21', 52.95, 53.54, 53.69, 52.65],
    ['2023/06/22', 53.54, 54.09, 54.16, 53.41],
    ['2023/06/23', 53.64, 53.94, 54.01, 53.1],
    ['2023/06/26', 54.15, 54.38, 54.83, 54.12],
    ['2023/06/27', 54.37, 55.64, 55.77, 54.24],
    ['2023/06/28', 55.62, 55.58, 56.19, 55.24],
    ['2023/06/29', 55.64, 56.39, 56.58, 55.64],
    ['2023/06/30', 56.89, 56.46, 56.99, 56.35],
    ['2023/07/03', 56.48, 57.15, 57.21, 56.32],
    ['2023/07/05', 56.63, 56.0, 56.74, 55.74],
    ['2023/07/06', 55.57, 55.99, 56.01, 55.17],
    ['2023/07/07', 56.12, 56.67, 57.31, 56.11],
    ['2023/07/10', 56.67, 57.34, 57.54, 56.67],
    ['2023/07/11', 57.99, 57.68, 58.42, 57.45],
    ['2023/07/12', 58.24, 57.96, 58.31, 57.75],
    ['2023/07/13', 57.87, 58.4, 58.59, 57.68],
    ['2023/07/14', 58.55, 57.87, 58.65, 57.17],
    ['2023/07/17', 57.85, 58.52, 58.73, 57.69],
    ['2023/07/18', 58.47, 59.23, 59.46, 58.47],
    ['2023/07/19', 58.98, 59.14, 59.89, 58.38],
    ['2023/07/20', 59.26, 58.97, 59.52, 58.66],
    ['2023/07/21', 59.11, 58.25, 59.11, 58.19],
    ['2023/07/24', 58.21, 58.38, 58.92, 58.19],
    ['2023/07/25', 57.93, 58.19, 58.45, 57.73],
    ['2023/07/26', 58.19, 57.85, 58.74, 57.43],
    ['2023/07/27', 58.03, 57.61, 58.2, 57.15],
    ['2023/07/28', 60.0, 58.84, 60.17, 57.8],
    ['2023/07/31', 59.19, 58.69, 59.37, 57.97],
    ['2023/08/01', 58.61, 59.68, 59.77, 58.61],
    ['2023/08/02', 59.39, 59.51, 59.79, 58.77],
    ['2023/08/03', 59.13, 58.84, 59.39, 58.24],
    ['2023/08/04', 58.63, 58.19, 59.0, 58.0],
    ['2023/08/07', 58.48, 58.98, 59.47, 58.48],
]);
var volumes = [
    607700.0,
    1052200.0,
    909100.0,
    607800.0,
    557700.0,
    1237500.0,
    1136700.0,
    1126700.0,
    3393800.0,
    1036700.0,
    872100.0,
    627400.0,
    1304700.0,
    661100.0,
    785500.0,
    638500.0,
    847700.0,
    790200.0,
    589700.0,
    812300.0,
    515900.0,
    619200.0,
    495000.0,
    518600.0,
    831500.0,
    927100.0,
    955400.0,
    1416400.0,
    830500.0,
    1174100.0,
    1140700.0,
    1023600.0,
    876100.0,
    1158400.0,
    1101400.0,
    1242500.0,
    834400.0,
    1030900.0,
    1097900.0,
    920400.0,
    1033500.0,
    1213100.0,
    771800.0,
    499100.0,
    921700.0,
    710600.0,
    986200.0,
    765100.0,
    764000.0,
    791600.0,
    668400.0,
    702000.0,
    549400.0,
    855800.0,
    823200.0,
    704300.0,
    1727400.0,
    769700.0,
    717200.0,
    691700.0,
    623400.0,
    826100.0,
    1110200.0,
    638100.0,
    674400.0,
    621300.0,
    1041300.0,
    945200.0,
    1086100.0,
    525200.0,
    744000.0,
    1199800.0,
    780700.0,
    576400.0,
    520400.0,
    527900.0,
    245500.0,
    1144400.0,
    1463100.0,
    1298300.0,
    945800.0,
    1038700.0,
    972800.0,
    1223100.0,
    698100.0,
    1091700.0,
    480400.0,
    671200.0,
    1166600.0,
    721300.0,
    823000.0,
    1450000.0,
    977600.0,
    875100.0,
    634000.0,
    1048400.0,
    640300.0,
    665400.0,
    601400.0,
    433000.0,
    446700.0,
    1194400.0,
    545300.0,
    1082200.0,
    802400.0,
    1294900.0,
    832100.0,
    708000.0,
    599200.0,
    555300.0,
    973400.0,
    1143700.0,
    804600.0,
    813400.0,
    656300.0,
    882900.0,
    802000.0,
    875100.0,
    585800.0,
    535300.0,
    616700.0,
    682400.0,
    603300.0,
    539000.0,
    668200.0,
    617500.0,
    439800.0,
    894800.0,
    583600.0,
    1048300.0,
    895400.0,
    790700.0,
    2246000.0,
    992200.0,
    1535700.0,
    1205500.0,
    683900.0,
    638900.0,
    569500.0,
    754300.0,
    733900.0,
    486400.0,
    609500.0,
    812200.0,
    636400.0,
    514700.0,
    1143600.0,
    687100.0,
    873000.0,
    923800.0,
    849800.0,
    640800.0,
    1011900.0,
    698700.0,
    784900.0,
    567100.0,
    595300.0,
    698100.0,
    503100.0,
    728900.0,
    1009900.0,
    647900.0,
    541900.0,
    546800.0,
    1257100.0,
    1041200.0,
    809000.0,
    869400.0,
    589800.0,
    515300.0,
    839300.0,
    1046700.0,
    649700.0,
    681100.0,
    430200.0,
    468700.0,
    634800.0,
    840600.0,
    851400.0,
    612700.0,
    1041400.0,
    2196300.0,
    1301800.0,
    926500.0,
    1001200.0,
    971100.0,
    578300.0,
    700700.0,
    603200.0,
    716900.0,
    475600.0,
    525700.0,
    569900.0,
    749000.0,
    666200.0,
    767800.0,
    776600.0,
    1398800.0,
    535500.0,
    618900.0,
    997100.0,
    543400.0,
    781000.0,
    974000.0,
    620700.0,
    940000.0,
    589700.0,
    1099600.0,
    940000.0,
    926500.0,
    439400.0,
    707200.0,
    781400.0,
    694500.0,
    561800.0,
    886400.0,
    765500.0,
    735100.0,
    626200.0,
    2558100.0,
    641500.0,
    649200.0,
    672900.0,
    523900.0,
    746100.0,
    337200.0,
    724000.0,
    679900.0,
    814400.0,
    486400.0,
    591500.0,
    468500.0,
    423200.0,
    422500.0,
    523200.0,
    506700.0,
    665300.0,
    553500.0,
    507500.0,
    525000.0,
    750600.0,
    602200.0,
    646600.0,
    1466900.0,
    860500.0,
    786800.0,
    698100.0,
    528200.0,
    706100.0,
    869500.0,
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
     *     text: "ALSN",
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