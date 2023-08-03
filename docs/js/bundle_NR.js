/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_NR");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/03', 3.25, 2.8, 3.28, 2.75],
    ['2022/08/04', 2.7, 2.65, 2.75, 2.59],
    ['2022/08/05', 2.6, 2.55, 2.71, 2.53],
    ['2022/08/08', 2.54, 2.5, 2.62, 2.46],
    ['2022/08/09', 2.56, 2.5, 2.6, 2.47],
    ['2022/08/10', 2.6, 2.64, 2.72, 2.5],
    ['2022/08/11', 2.74, 2.77, 2.82, 2.73],
    ['2022/08/12', 2.78, 2.84, 2.85, 2.7],
    ['2022/08/15', 2.69, 2.72, 2.75, 2.62],
    ['2022/08/16', 2.72, 2.66, 2.8, 2.64],
    ['2022/08/17', 2.63, 2.64, 2.7, 2.62],
    ['2022/08/18', 2.81, 3.01, 3.03, 2.79],
    ['2022/08/19', 2.98, 2.91, 2.98, 2.85],
    ['2022/08/22', 2.89, 2.89, 2.92, 2.81],
    ['2022/08/23', 2.93, 3.11, 3.14, 2.93],
    ['2022/08/24', 3.1, 3.04, 3.13, 3.01],
    ['2022/08/25', 3.07, 3.14, 3.15, 3.06],
    ['2022/08/26', 3.12, 3.04, 3.16, 3.0],
    ['2022/08/29', 3.01, 3.1, 3.18, 3.01],
    ['2022/08/30', 3.05, 2.9, 3.05, 2.86],
    ['2022/08/31', 2.8, 2.88, 3.01, 2.78],
    ['2022/09/01', 2.81, 2.75, 2.86, 2.73],
    ['2022/09/02', 2.84, 2.91, 2.94, 2.8],
    ['2022/09/06', 2.93, 2.88, 3.0, 2.85],
    ['2022/09/07', 2.78, 2.87, 2.88, 2.72],
    ['2022/09/08', 2.86, 2.85, 2.9, 2.82],
    ['2022/09/09', 2.95, 2.99, 3.01, 2.91],
    ['2022/09/12', 3.04, 3.04, 3.05, 2.98],
    ['2022/09/13', 3.01, 2.84, 3.06, 2.83],
    ['2022/09/14', 2.87, 2.96, 3.03, 2.87],
    ['2022/09/15', 2.94, 2.92, 2.97, 2.84],
    ['2022/09/16', 2.89, 2.92, 2.93, 2.82],
    ['2022/09/19', 2.8, 2.92, 2.95, 2.74],
    ['2022/09/20', 2.87, 2.82, 2.88, 2.8],
    ['2022/09/21', 2.9, 2.74, 2.92, 2.73],
    ['2022/09/22', 2.82, 2.7, 2.85, 2.69],
    ['2022/09/23', 2.6, 2.51, 2.61, 2.44],
    ['2022/09/26', 2.53, 2.4, 2.53, 2.38],
    ['2022/09/27', 2.46, 2.46, 2.55, 2.42],
    ['2022/09/28', 2.51, 2.59, 2.62, 2.45],
    ['2022/09/29', 2.53, 2.63, 2.64, 2.48],
    ['2022/09/30', 2.59, 2.52, 2.67, 2.52],
    ['2022/10/03', 2.66, 2.7, 2.76, 2.64],
    ['2022/10/04', 2.78, 2.81, 2.87, 2.73],
    ['2022/10/05', 2.82, 2.97, 2.99, 2.81],
    ['2022/10/06', 2.92, 3.0, 3.05, 2.92],
    ['2022/10/07', 3.01, 3.01, 3.07, 2.93],
    ['2022/10/10', 2.99, 2.85, 3.02, 2.81],
    ['2022/10/11', 2.79, 2.92, 2.99, 2.78],
    ['2022/10/12', 2.96, 2.98, 2.99, 2.86],
    ['2022/10/13', 2.97, 3.12, 3.14, 2.94],
    ['2022/10/14', 3.09, 2.98, 3.11, 2.97],
    ['2022/10/17', 3.0, 3.06, 3.13, 3.0],
    ['2022/10/18', 3.1, 3.07, 3.14, 2.99],
    ['2022/10/19', 3.1, 3.21, 3.23, 3.1],
    ['2022/10/20', 3.25, 3.25, 3.29, 3.22],
    ['2022/10/21', 3.35, 3.35, 3.37, 3.26],
    ['2022/10/24', 3.35, 3.35, 3.39, 3.32],
    ['2022/10/25', 3.32, 3.37, 3.41, 3.29],
    ['2022/10/26', 3.41, 3.53, 3.58, 3.41],
    ['2022/10/27', 3.63, 3.51, 3.67, 3.48],
    ['2022/10/28', 3.54, 3.53, 3.57, 3.42],
    ['2022/10/31', 3.47, 3.66, 3.73, 3.47],
    ['2022/11/01', 3.72, 3.47, 3.72, 3.44],
    ['2022/11/02', 3.3, 3.43, 3.54, 3.13],
    ['2022/11/03', 3.4, 3.51, 3.53, 3.4],
    ['2022/11/04', 3.65, 3.7, 3.72, 3.58],
    ['2022/11/07', 3.69, 3.86, 3.91, 3.69],
    ['2022/11/08', 3.86, 3.94, 3.97, 3.8],
    ['2022/11/09', 3.89, 3.9, 3.93, 3.8],
    ['2022/11/10', 3.9, 3.94, 4.04, 3.85],
    ['2022/11/11', 4.03, 4.03, 4.11, 4.0],
    ['2022/11/14', 4.04, 3.9, 4.04, 3.81],
    ['2022/11/15', 3.92, 4.07, 4.12, 3.87],
    ['2022/11/16', 4.06, 4.09, 4.11, 3.96],
    ['2022/11/17', 3.96, 4.13, 4.13, 3.94],
    ['2022/11/18', 4.13, 3.91, 4.13, 3.88],
    ['2022/11/21', 3.86, 3.92, 3.97, 3.62],
    ['2022/11/22', 4.06, 4.13, 4.21, 4.04],
    ['2022/11/23', 3.98, 4.0, 4.07, 3.98],
    ['2022/11/25', 4.01, 4.02, 4.09, 3.96],
    ['2022/11/28', 3.87, 3.91, 4.03, 3.85],
    ['2022/11/29', 3.95, 3.94, 4.01, 3.86],
    ['2022/11/30', 3.96, 4.01, 4.04, 3.89],
    ['2022/12/01', 4.05, 3.98, 4.13, 3.97],
    ['2022/12/02', 3.96, 4.09, 4.16, 3.92],
    ['2022/12/05', 4.15, 3.98, 4.24, 3.97],
    ['2022/12/06', 4.03, 3.98, 4.14, 3.93],
    ['2022/12/07', 4.0, 3.94, 4.06, 3.91],
    ['2022/12/08', 4.12, 3.97, 4.14, 3.95],
    ['2022/12/09', 3.97, 3.82, 4.0, 3.81],
    ['2022/12/12', 3.89, 3.87, 3.96, 3.81],
    ['2022/12/13', 4.03, 3.96, 4.05, 3.91],
    ['2022/12/14', 3.98, 4.01, 4.06, 3.92],
    ['2022/12/15', 3.97, 3.97, 4.0, 3.9],
    ['2022/12/16', 3.81, 3.81, 3.9, 3.79],
    ['2022/12/19', 3.84, 3.79, 3.87, 3.74],
    ['2022/12/20', 3.78, 3.81, 3.89, 3.74],
    ['2022/12/21', 3.91, 3.84, 3.98, 3.8],
    ['2022/12/22', 3.83, 3.82, 3.97, 3.75],
    ['2022/12/23', 3.86, 3.91, 3.91, 3.81],
    ['2022/12/27', 4.0, 4.06, 4.1, 3.87],
    ['2022/12/28', 4.04, 3.86, 4.06, 3.85],
    ['2022/12/29', 3.89, 4.11, 4.15, 3.84],
    ['2022/12/30', 4.07, 4.15, 4.2, 4.04],
    ['2023/01/03', 4.14, 4.07, 4.19, 4.01],
    ['2023/01/04', 4.06, 4.3, 4.3, 4.06],
    ['2023/01/05', 4.32, 4.46, 4.49, 4.29],
    ['2023/01/06', 4.5, 4.57, 4.64, 4.47],
    ['2023/01/09', 4.66, 4.54, 4.7, 4.52],
    ['2023/01/10', 4.5, 4.61, 4.69, 4.41],
    ['2023/01/11', 4.64, 4.58, 4.71, 4.53],
    ['2023/01/12', 4.6, 4.89, 4.91, 4.52],
    ['2023/01/13', 4.88, 4.87, 4.89, 4.75],
    ['2023/01/17', 4.83, 4.81, 4.89, 4.75],
    ['2023/01/18', 4.82, 4.52, 4.9, 4.49],
    ['2023/01/19', 4.49, 4.66, 4.67, 4.49],
    ['2023/01/20', 4.71, 4.74, 4.79, 4.6],
    ['2023/01/23', 4.8, 4.74, 4.8, 4.68],
    ['2023/01/24', 4.76, 4.58, 4.76, 4.54],
    ['2023/01/25', 4.53, 4.57, 4.64, 4.46],
    ['2023/01/26', 4.64, 4.37, 4.68, 4.25],
    ['2023/01/27', 4.33, 4.24, 4.37, 4.21],
    ['2023/01/30', 4.12, 4.25, 4.35, 4.08],
    ['2023/01/31', 4.25, 4.54, 4.56, 4.21],
    ['2023/02/01', 4.53, 4.53, 4.6, 4.31],
    ['2023/02/02', 4.51, 4.34, 4.57, 4.26],
    ['2023/02/03', 4.33, 4.35, 4.49, 4.33],
    ['2023/02/06', 4.35, 4.39, 4.4, 4.23],
    ['2023/02/07', 4.44, 4.45, 4.5, 4.36],
    ['2023/02/08', 4.43, 4.47, 4.55, 4.42],
    ['2023/02/09', 4.49, 4.36, 4.53, 4.34],
    ['2023/02/10', 4.41, 4.63, 4.64, 4.36],
    ['2023/02/13', 4.56, 4.68, 4.72, 4.52],
    ['2023/02/14', 4.64, 4.61, 4.77, 4.53],
    ['2023/02/15', 4.53, 4.41, 4.57, 4.22],
    ['2023/02/16', 4.45, 4.4, 4.45, 4.29],
    ['2023/02/17', 4.73, 4.27, 4.82, 4.22],
    ['2023/02/21', 4.29, 4.17, 4.38, 4.17],
    ['2023/02/22', 4.17, 4.19, 4.24, 4.08],
    ['2023/02/23', 4.25, 4.22, 4.37, 4.18],
    ['2023/02/24', 4.13, 4.24, 4.26, 4.06],
    ['2023/02/27', 4.25, 4.38, 4.43, 4.21],
    ['2023/02/28', 4.4, 4.43, 4.52, 4.34],
    ['2023/03/01', 4.42, 4.61, 4.66, 4.42],
    ['2023/03/02', 4.6, 4.74, 4.76, 4.57],
    ['2023/03/03', 4.66, 4.81, 4.83, 4.56],
    ['2023/03/06', 4.79, 4.75, 4.82, 4.68],
    ['2023/03/07', 4.74, 4.8, 4.85, 4.71],
    ['2023/03/08', 4.79, 4.77, 4.88, 4.65],
    ['2023/03/09', 4.78, 4.58, 4.86, 4.58],
    ['2023/03/10', 4.57, 4.53, 4.67, 4.51],
    ['2023/03/13', 4.32, 4.4, 4.54, 4.31],
    ['2023/03/14', 4.45, 4.36, 4.56, 4.31],
    ['2023/03/15', 4.17, 3.99, 4.25, 3.87],
    ['2023/03/16', 3.83, 4.0, 4.07, 3.76],
    ['2023/03/17', 3.93, 3.75, 3.99, 3.7],
    ['2023/03/20', 3.8, 3.9, 4.04, 3.78],
    ['2023/03/21', 4.0, 4.0, 4.11, 3.9],
    ['2023/03/22', 4.0, 3.91, 4.07, 3.89],
    ['2023/03/23', 3.96, 3.79, 4.04, 3.74],
    ['2023/03/24', 3.74, 3.76, 3.81, 3.65],
    ['2023/03/27', 3.83, 3.88, 3.94, 3.71],
    ['2023/03/28', 3.85, 4.01, 4.01, 3.84],
    ['2023/03/29', 4.05, 3.91, 4.08, 3.9],
    ['2023/03/30', 3.97, 3.84, 4.02, 3.81],
    ['2023/03/31', 3.84, 3.85, 3.9, 3.82],
    ['2023/04/03', 4.06, 4.19, 4.25, 4.05],
    ['2023/04/04', 4.22, 4.13, 4.23, 4.03],
    ['2023/04/05', 4.1, 4.05, 4.14, 3.96],
    ['2023/04/06', 4.01, 4.0, 4.06, 3.9],
    ['2023/04/10', 3.99, 4.03, 4.07, 3.94],
    ['2023/04/11', 4.05, 4.06, 4.12, 3.99],
    ['2023/04/12', 4.1, 4.1, 4.13, 4.03],
    ['2023/04/13', 4.1, 3.97, 4.12, 3.96],
    ['2023/04/14', 3.97, 3.95, 4.01, 3.91],
    ['2023/04/17', 3.95, 3.95, 4.0, 3.93],
    ['2023/04/18', 3.93, 3.94, 4.0, 3.85],
    ['2023/04/19', 3.86, 4.02, 4.04, 3.85],
    ['2023/04/20', 3.97, 3.95, 3.98, 3.9],
    ['2023/04/21', 3.97, 3.97, 4.05, 3.93],
    ['2023/04/24', 3.94, 4.12, 4.16, 3.94],
    ['2023/04/25', 4.05, 4.04, 4.16, 4.03],
    ['2023/04/26', 4.0, 4.03, 4.13, 4.0],
    ['2023/04/27', 4.01, 3.9, 4.07, 3.84],
    ['2023/04/28', 3.9, 4.0, 4.02, 3.87],
    ['2023/05/01', 3.95, 4.0, 4.02, 3.92],
    ['2023/05/02', 3.94, 3.78, 3.94, 3.72],
    ['2023/05/03', 3.88, 4.08, 4.13, 3.73],
    ['2023/05/04', 4.07, 3.87, 4.14, 3.84],
    ['2023/05/05', 4.04, 3.92, 4.08, 3.89],
    ['2023/05/08', 3.98, 3.87, 4.0, 3.86],
    ['2023/05/09', 3.84, 3.91, 3.95, 3.8],
    ['2023/05/10', 3.97, 3.91, 3.97, 3.83],
    ['2023/05/11', 3.83, 3.83, 3.87, 3.77],
    ['2023/05/12', 3.82, 3.81, 3.89, 3.78],
    ['2023/05/15', 3.78, 3.81, 3.9, 3.78],
    ['2023/05/16', 3.81, 3.74, 3.81, 3.73],
    ['2023/05/17', 3.7, 3.81, 3.82, 3.67],
    ['2023/05/18', 3.8, 3.89, 3.89, 3.75],
    ['2023/05/19', 3.97, 3.9, 4.01, 3.86],
    ['2023/05/22', 3.88, 3.91, 3.97, 3.88],
    ['2023/05/23', 3.92, 4.01, 4.09, 3.89],
    ['2023/05/24', 4.04, 4.05, 4.1, 4.0],
    ['2023/05/25', 3.94, 3.89, 4.0, 3.85],
    ['2023/05/26', 3.9, 3.82, 3.91, 3.8],
    ['2023/05/30', 3.76, 3.61, 3.81, 3.61],
    ['2023/05/31', 3.55, 3.46, 3.59, 3.4],
    ['2023/06/01', 3.47, 3.67, 3.69, 3.47],
    ['2023/06/02', 3.84, 4.13, 4.14, 3.75],
    ['2023/06/05', 4.15, 4.12, 4.2, 4.04],
    ['2023/06/06', 4.05, 4.26, 4.28, 4.05],
    ['2023/06/07', 4.29, 4.4, 4.47, 4.28],
    ['2023/06/08', 4.35, 4.38, 4.43, 4.31],
    ['2023/06/09', 4.29, 4.22, 4.31, 4.21],
    ['2023/06/12', 4.1, 4.11, 4.21, 4.09],
    ['2023/06/13', 4.21, 4.17, 4.32, 4.15],
    ['2023/06/14', 4.21, 4.2, 4.3, 4.15],
    ['2023/06/15', 4.21, 4.49, 4.49, 4.21],
    ['2023/06/16', 4.45, 4.54, 4.55, 4.41],
    ['2023/06/20', 4.54, 4.63, 5.01, 4.53],
    ['2023/06/21', 4.6, 4.78, 4.86, 4.57],
    ['2023/06/22', 4.72, 4.81, 4.81, 4.66],
    ['2023/06/23', 4.71, 4.78, 4.87, 4.61],
    ['2023/06/26', 4.8, 4.83, 4.91, 4.75],
    ['2023/06/27', 4.88, 5.06, 5.06, 4.87],
    ['2023/06/28', 5.04, 5.27, 5.29, 5.0],
    ['2023/06/29', 5.3, 5.41, 5.45, 5.27],
    ['2023/06/30', 5.45, 5.23, 5.45, 5.22],
    ['2023/07/03', 5.26, 5.22, 5.3, 5.19],
    ['2023/07/05', 5.25, 5.19, 5.25, 5.11],
    ['2023/07/06', 5.14, 5.09, 5.17, 5.01],
    ['2023/07/07', 5.11, 5.29, 5.33, 5.07],
    ['2023/07/10', 5.29, 5.29, 5.44, 5.21],
    ['2023/07/11', 5.32, 5.36, 5.41, 5.25],
    ['2023/07/12', 5.46, 5.34, 5.48, 5.33],
    ['2023/07/13', 5.32, 5.27, 5.33, 5.2],
    ['2023/07/14', 5.24, 5.26, 5.28, 5.18],
    ['2023/07/17', 5.25, 5.36, 5.41, 5.2],
    ['2023/07/18', 5.37, 5.35, 5.47, 5.32],
    ['2023/07/19', 5.32, 5.33, 5.37, 5.26],
    ['2023/07/20', 5.36, 5.3, 5.38, 5.27],
    ['2023/07/21', 5.34, 5.33, 5.44, 5.31],
    ['2023/07/24', 5.36, 5.48, 5.5, 5.32],
    ['2023/07/25', 5.48, 5.5, 5.59, 5.4],
    ['2023/07/26', 5.47, 5.52, 5.71, 5.47],
    ['2023/07/27', 5.53, 5.41, 5.55, 5.29],
    ['2023/07/28', 5.42, 5.5, 5.52, 5.41],
    ['2023/07/31', 5.55, 5.52, 5.64, 5.5],
    ['2023/08/01', 5.51, 5.57, 5.57, 5.46],
    ['2023/08/02', 5.24, 5.27, 5.52, 4.99],
]);
var volumes = [
    1545300.0,
    868800.0,
    1114700.0,
    1130900.0,
    509000.0,
    757800.0,
    345500.0,
    252400.0,
    265200.0,
    341200.0,
    402100.0,
    877100.0,
    407100.0,
    527900.0,
    396000.0,
    190700.0,
    239600.0,
    606700.0,
    287000.0,
    514000.0,
    408700.0,
    312400.0,
    306300.0,
    454000.0,
    405300.0,
    350600.0,
    454600.0,
    305800.0,
    432300.0,
    501700.0,
    487300.0,
    1098900.0,
    432200.0,
    595600.0,
    475400.0,
    429800.0,
    1032300.0,
    676400.0,
    581500.0,
    765100.0,
    373100.0,
    497100.0,
    656000.0,
    602500.0,
    227800.0,
    256000.0,
    420400.0,
    412800.0,
    311100.0,
    457100.0,
    725200.0,
    448000.0,
    268200.0,
    353200.0,
    581100.0,
    354300.0,
    380200.0,
    223900.0,
    299900.0,
    607300.0,
    458200.0,
    266600.0,
    523100.0,
    638800.0,
    428100.0,
    300200.0,
    413600.0,
    780000.0,
    380500.0,
    573700.0,
    668400.0,
    366000.0,
    744800.0,
    424900.0,
    383500.0,
    314800.0,
    937500.0,
    725600.0,
    551900.0,
    574500.0,
    274500.0,
    446400.0,
    1633600.0,
    411200.0,
    216600.0,
    576100.0,
    378200.0,
    848000.0,
    469600.0,
    462100.0,
    1904900.0,
    835200.0,
    708600.0,
    625100.0,
    450000.0,
    962300.0,
    498200.0,
    997700.0,
    1136600.0,
    876700.0,
    1093400.0,
    719100.0,
    397400.0,
    711500.0,
    567300.0,
    629100.0,
    804900.0,
    604600.0,
    439900.0,
    497200.0,
    432800.0,
    275900.0,
    1278900.0,
    460800.0,
    272900.0,
    717600.0,
    335200.0,
    550800.0,
    366200.0,
    284100.0,
    373900.0,
    894800.0,
    1015000.0,
    778800.0,
    711100.0,
    651400.0,
    452200.0,
    549900.0,
    684000.0,
    883900.0,
    312900.0,
    363700.0,
    757200.0,
    587100.0,
    920500.0,
    903900.0,
    557100.0,
    752000.0,
    499900.0,
    741800.0,
    743600.0,
    450500.0,
    386700.0,
    461100.0,
    2452400.0,
    464400.0,
    382600.0,
    642900.0,
    467600.0,
    492600.0,
    393300.0,
    518200.0,
    808800.0,
    1795300.0,
    986800.0,
    709600.0,
    1060900.0,
    671800.0,
    623400.0,
    542200.0,
    1714600.0,
    659100.0,
    597800.0,
    632100.0,
    488700.0,
    342000.0,
    591800.0,
    1811800.0,
    638100.0,
    837100.0,
    463200.0,
    1209400.0,
    673900.0,
    444600.0,
    455400.0,
    371600.0,
    389900.0,
    766000.0,
    772600.0,
    792900.0,
    835300.0,
    359100.0,
    578900.0,
    482700.0,
    430500.0,
    422900.0,
    330500.0,
    619500.0,
    982700.0,
    452700.0,
    367900.0,
    256900.0,
    213300.0,
    233600.0,
    367100.0,
    304100.0,
    265600.0,
    298800.0,
    414800.0,
    324500.0,
    334100.0,
    385300.0,
    523300.0,
    246400.0,
    286900.0,
    252300.0,
    335800.0,
    494600.0,
    471400.0,
    842600.0,
    277200.0,
    398000.0,
    476300.0,
    308500.0,
    352800.0,
    431300.0,
    448100.0,
    428300.0,
    888700.0,
    1998600.0,
    1918500.0,
    718200.0,
    517200.0,
    2364500.0,
    531300.0,
    722000.0,
    1199300.0,
    1018500.0,
    947200.0,
    253100.0,
    459300.0,
    430000.0,
    1754300.0,
    555800.0,
    564500.0,
    405600.0,
    350200.0,
    309900.0,
    1008600.0,
    584500.0,
    616800.0,
    734700.0,
    618600.0,
    677800.0,
    741200.0,
    1152500.0,
    821000.0,
    316300.0,
    810500.0,
    964100.0,
    828200.0,
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
        text: "NR",
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