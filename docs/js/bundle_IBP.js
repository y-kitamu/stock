/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_IBP");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/03', 95.74, 95.8, 97.08, 94.63],
    ['2022/08/04', 98.64, 102.34, 103.83, 97.91],
    ['2022/08/05', 97.05, 96.88, 99.47, 94.55],
    ['2022/08/08', 98.7, 99.27, 100.98, 98.53],
    ['2022/08/09', 98.82, 96.01, 99.3, 95.03],
    ['2022/08/10', 98.9, 98.23, 100.71, 97.89],
    ['2022/08/11', 99.11, 100.46, 103.26, 99.11],
    ['2022/08/12', 101.15, 102.62, 102.64, 99.68],
    ['2022/08/15', 102.32, 101.69, 103.58, 100.57],
    ['2022/08/16', 101.57, 103.07, 104.34, 99.91],
    ['2022/08/17', 101.64, 101.8, 103.13, 100.6],
    ['2022/08/18', 101.26, 102.3, 103.37, 100.93],
    ['2022/08/19', 101.49, 98.18, 101.49, 97.63],
    ['2022/08/22', 97.0, 96.15, 98.21, 95.59],
    ['2022/08/23', 96.5, 96.45, 98.06, 95.76],
    ['2022/08/24', 95.06, 96.69, 97.92, 94.87],
    ['2022/08/25', 96.41, 98.15, 99.36, 96.41],
    ['2022/08/26', 98.94, 90.8, 98.94, 90.01],
    ['2022/08/29', 89.93, 91.25, 91.8, 89.93],
    ['2022/08/30', 91.37, 90.38, 92.34, 89.78],
    ['2022/08/31', 90.76, 88.67, 91.69, 88.0],
    ['2022/09/01', 87.32, 87.04, 87.41, 84.65],
    ['2022/09/02', 88.4, 87.56, 89.07, 86.57],
    ['2022/09/06', 87.32, 86.06, 88.09, 85.34],
    ['2022/09/07', 86.44, 89.33, 89.49, 86.44],
    ['2022/09/08', 88.27, 89.32, 89.35, 87.91],
    ['2022/09/09', 89.89, 89.21, 90.08, 88.78],
    ['2022/09/12', 89.79, 90.46, 91.43, 89.79],
    ['2022/09/13', 87.01, 85.82, 87.88, 85.15],
    ['2022/09/14', 85.55, 84.04, 86.93, 83.06],
    ['2022/09/15', 83.7, 82.38, 85.49, 81.99],
    ['2022/09/16', 81.34, 83.92, 84.12, 81.22],
    ['2022/09/19', 83.69, 84.73, 85.13, 83.29],
    ['2022/09/20', 83.61, 82.58, 83.61, 81.45],
    ['2022/09/21', 83.47, 82.44, 85.32, 82.24],
    ['2022/09/22', 81.45, 78.32, 81.84, 77.14],
    ['2022/09/23', 77.24, 77.82, 78.94, 76.35],
    ['2022/09/26', 77.56, 75.18, 79.0, 75.1],
    ['2022/09/27', 76.69, 77.55, 77.67, 75.32],
    ['2022/09/28', 78.85, 82.33, 82.77, 78.14],
    ['2022/09/29', 80.75, 80.13, 81.19, 79.41],
    ['2022/09/30', 79.86, 79.59, 82.14, 79.14],
    ['2022/10/03', 81.64, 83.47, 84.17, 80.95],
    ['2022/10/04', 85.76, 88.48, 88.95, 85.76],
    ['2022/10/05', 86.56, 87.16, 88.13, 85.08],
    ['2022/10/06', 87.08, 88.03, 88.35, 85.95],
    ['2022/10/07', 86.43, 84.9, 86.43, 84.12],
    ['2022/10/10', 85.44, 84.6, 86.06, 83.67],
    ['2022/10/11', 84.37, 85.22, 86.59, 83.11],
    ['2022/10/12', 85.05, 82.59, 85.05, 81.96],
    ['2022/10/13', 80.32, 82.15, 83.17, 77.77],
    ['2022/10/14', 82.93, 77.95, 83.45, 77.89],
    ['2022/10/17', 80.11, 80.75, 81.92, 79.35],
    ['2022/10/18', 82.84, 83.83, 84.44, 82.05],
    ['2022/10/19', 82.25, 78.31, 82.25, 77.55],
    ['2022/10/20', 77.9, 76.71, 80.5, 76.61],
    ['2022/10/21', 77.3, 80.33, 80.63, 77.13],
    ['2022/10/24', 80.81, 79.21, 80.89, 78.48],
    ['2022/10/25', 79.83, 84.54, 85.43, 79.83],
    ['2022/10/26', 84.76, 82.8, 85.48, 82.51],
    ['2022/10/27', 83.85, 82.95, 85.41, 82.39],
    ['2022/10/28', 82.69, 85.53, 85.66, 81.08],
    ['2022/10/31', 84.36, 84.51, 85.25, 83.41],
    ['2022/11/01', 86.72, 81.33, 86.72, 79.71],
    ['2022/11/02', 81.54, 77.71, 82.19, 77.02],
    ['2022/11/03', 75.67, 75.9, 77.12, 73.4],
    ['2022/11/04', 77.48, 78.95, 79.16, 76.0],
    ['2022/11/07', 79.24, 77.81, 79.45, 76.1],
    ['2022/11/08', 78.15, 76.86, 78.94, 76.01],
    ['2022/11/09', 75.65, 76.59, 78.54, 75.65],
    ['2022/11/10', 82.68, 83.02, 88.13, 82.1],
    ['2022/11/11', 83.42, 83.18, 85.24, 80.95],
    ['2022/11/14', 82.46, 78.1, 83.8, 77.9],
    ['2022/11/15', 81.35, 80.81, 82.84, 79.13],
    ['2022/11/16', 80.26, 78.02, 80.26, 77.85],
    ['2022/11/17', 76.05, 77.63, 77.67, 74.96],
    ['2022/11/18', 79.42, 76.74, 79.77, 76.25],
    ['2022/11/21', 76.93, 75.99, 76.94, 75.78],
    ['2022/11/22', 77.2, 77.68, 77.96, 76.28],
    ['2022/11/23', 77.15, 79.56, 79.94, 76.97],
    ['2022/11/25', 78.91, 80.18, 80.73, 78.9],
    ['2022/11/28', 79.5, 79.16, 80.8, 78.47],
    ['2022/11/29', 78.53, 81.22, 81.54, 78.44],
    ['2022/11/30', 80.83, 83.46, 83.98, 78.53],
    ['2022/12/01', 84.24, 86.36, 87.59, 84.24],
    ['2022/12/02', 84.3, 85.92, 86.89, 84.3],
    ['2022/12/05', 83.85, 84.53, 85.41, 83.51],
    ['2022/12/06', 85.51, 82.62, 87.22, 81.94],
    ['2022/12/07', 82.88, 85.09, 86.16, 82.88],
    ['2022/12/08', 85.02, 86.06, 88.04, 84.24],
    ['2022/12/09', 84.76, 86.02, 87.38, 84.76],
    ['2022/12/12', 85.96, 87.26, 87.77, 84.79],
    ['2022/12/13', 92.55, 90.5, 93.68, 88.76],
    ['2022/12/14', 89.45, 89.55, 90.72, 88.98],
    ['2022/12/15', 88.13, 91.16, 91.63, 87.99],
    ['2022/12/16', 89.7, 90.53, 90.95, 89.44],
    ['2022/12/19', 89.73, 88.07, 89.96, 87.7],
    ['2022/12/20', 87.26, 86.02, 87.8, 85.84],
    ['2022/12/21', 87.44, 87.08, 88.0, 86.67],
    ['2022/12/22', 86.08, 85.99, 86.27, 84.24],
    ['2022/12/23', 85.71, 86.31, 86.95, 85.21],
    ['2022/12/27', 86.32, 85.95, 89.46, 84.84],
    ['2022/12/28', 86.19, 82.89, 87.24, 82.85],
    ['2022/12/29', 83.92, 85.95, 86.48, 83.2],
    ['2022/12/30', 84.67, 84.41, 85.71, 84.09],
    ['2023/01/03', 86.35, 86.54, 87.29, 85.0],
    ['2023/01/04', 88.2, 89.39, 89.39, 87.46],
    ['2023/01/05', 88.73, 88.84, 89.94, 87.41],
    ['2023/01/06', 90.29, 91.43, 91.82, 89.04],
    ['2023/01/09', 92.21, 92.16, 92.92, 91.56],
    ['2023/01/10', 91.45, 91.45, 92.25, 90.49],
    ['2023/01/11', 94.65, 97.66, 97.66, 94.56],
    ['2023/01/12', 98.36, 98.1, 98.66, 94.18],
    ['2023/01/13', 96.91, 102.16, 102.51, 96.91],
    ['2023/01/17', 101.35, 99.95, 102.43, 99.54],
    ['2023/01/18', 100.7, 102.0, 102.45, 100.7],
    ['2023/01/19', 101.0, 97.0, 101.0, 96.43],
    ['2023/01/20', 97.96, 101.18, 101.18, 96.78],
    ['2023/01/23', 100.91, 101.59, 101.85, 100.65],
    ['2023/01/24', 101.52, 103.12, 103.12, 101.22],
    ['2023/01/25', 101.53, 102.94, 103.39, 101.27],
    ['2023/01/26', 103.99, 106.69, 107.01, 103.67],
    ['2023/01/27', 106.0, 106.64, 107.17, 105.05],
    ['2023/01/30', 105.32, 102.39, 106.65, 102.21],
    ['2023/01/31', 103.02, 108.56, 108.56, 103.02],
    ['2023/02/01', 107.79, 110.7, 111.73, 106.43],
    ['2023/02/02', 112.2, 115.62, 116.61, 112.12],
    ['2023/02/03', 112.64, 113.66, 115.2, 112.2],
    ['2023/02/06', 112.26, 111.86, 113.2, 111.08],
    ['2023/02/07', 110.72, 111.67, 112.2, 108.99],
    ['2023/02/08', 110.45, 108.67, 111.8, 108.27],
    ['2023/02/09', 110.0, 107.42, 111.12, 107.35],
    ['2023/02/10', 106.48, 105.99, 107.75, 105.92],
    ['2023/02/13', 106.28, 110.24, 111.23, 106.28],
    ['2023/02/14', 108.69, 111.51, 111.79, 107.75],
    ['2023/02/15', 110.02, 112.12, 112.3, 108.86],
    ['2023/02/16', 109.65, 110.35, 112.71, 109.64],
    ['2023/02/17', 110.1, 108.23, 110.1, 106.21],
    ['2023/02/21', 105.28, 102.74, 106.6, 101.92],
    ['2023/02/22', 107.52, 110.27, 113.83, 105.77],
    ['2023/02/23', 114.71, 113.7, 114.71, 108.28],
    ['2023/02/24', 111.82, 112.23, 113.34, 110.06],
    ['2023/02/27', 114.05, 115.09, 115.27, 112.65],
    ['2023/02/28', 114.33, 113.77, 115.5, 113.64],
    ['2023/03/01', 113.57, 116.21, 116.57, 113.12],
    ['2023/03/02', 114.14, 115.87, 116.13, 113.43],
    ['2023/03/03', 117.04, 119.15, 119.38, 114.93],
    ['2023/03/06', 119.81, 116.18, 119.9, 114.39],
    ['2023/03/07', 116.22, 113.26, 116.98, 113.1],
    ['2023/03/08', 113.88, 112.84, 113.88, 110.47],
    ['2023/03/09', 112.43, 112.86, 114.32, 112.28],
    ['2023/03/10', 112.83, 107.77, 112.83, 106.56],
    ['2023/03/13', 105.41, 107.91, 108.65, 103.2],
    ['2023/03/14', 111.48, 107.54, 111.72, 106.43],
    ['2023/03/15', 105.28, 104.97, 107.23, 103.21],
    ['2023/03/16', 103.41, 106.04, 107.35, 102.29],
    ['2023/03/17', 105.76, 103.44, 106.23, 103.16],
    ['2023/03/20', 104.21, 104.83, 106.32, 104.21],
    ['2023/03/21', 106.43, 108.42, 108.91, 106.43],
    ['2023/03/22', 108.15, 105.64, 108.92, 105.49],
    ['2023/03/23', 106.91, 105.66, 109.39, 104.45],
    ['2023/03/24', 104.96, 108.65, 108.99, 103.34],
    ['2023/03/27', 110.17, 107.88, 110.19, 106.95],
    ['2023/03/28', 107.81, 109.08, 110.88, 107.51],
    ['2023/03/29', 109.92, 110.46, 110.87, 108.98],
    ['2023/03/30', 111.35, 109.84, 112.09, 109.56],
    ['2023/03/31', 110.04, 113.72, 113.81, 109.51],
    ['2023/04/03', 113.21, 113.69, 114.37, 112.09],
    ['2023/04/04', 114.55, 109.23, 114.85, 107.97],
    ['2023/04/05', 108.3, 107.42, 108.81, 107.11],
    ['2023/04/06', 107.76, 106.58, 107.76, 104.06],
    ['2023/04/10', 105.98, 107.65, 108.87, 104.84],
    ['2023/04/11', 108.87, 111.25, 112.39, 108.84],
    ['2023/04/12', 113.06, 111.01, 113.69, 110.52],
    ['2023/04/13', 111.79, 111.31, 112.79, 110.39],
    ['2023/04/14', 111.14, 111.56, 112.5, 110.24],
    ['2023/04/17', 111.72, 112.47, 112.87, 111.13],
    ['2023/04/18', 113.95, 118.5, 119.92, 113.49],
    ['2023/04/19', 118.48, 119.34, 119.78, 116.5],
    ['2023/04/20', 119.2, 121.49, 125.53, 119.2],
    ['2023/04/21', 122.33, 121.89, 123.04, 121.12],
    ['2023/04/24', 121.72, 122.85, 123.23, 121.43],
    ['2023/04/25', 121.88, 120.26, 123.04, 120.26],
    ['2023/04/26', 119.79, 118.05, 120.62, 117.8],
    ['2023/04/27', 118.92, 121.63, 122.29, 118.92],
    ['2023/04/28', 121.01, 123.93, 124.2, 121.01],
    ['2023/05/01', 123.57, 122.36, 125.37, 122.06],
    ['2023/05/02', 121.35, 121.18, 121.46, 118.47],
    ['2023/05/03', 121.12, 122.33, 124.93, 121.12],
    ['2023/05/04', 119.67, 111.77, 122.11, 110.59],
    ['2023/05/05', 114.69, 116.84, 116.9, 113.52],
    ['2023/05/08', 117.43, 113.76, 117.43, 112.67],
    ['2023/05/09', 113.07, 114.03, 116.27, 111.81],
    ['2023/05/10', 116.03, 113.39, 116.03, 111.0],
    ['2023/05/11', 112.77, 114.22, 114.5, 111.58],
    ['2023/05/12', 114.21, 112.79, 116.07, 111.93],
    ['2023/05/15', 113.01, 114.33, 115.08, 112.16],
    ['2023/05/16', 113.36, 112.66, 113.42, 111.18],
    ['2023/05/17', 113.28, 113.76, 114.7, 112.16],
    ['2023/05/18', 113.23, 114.3, 114.64, 112.5],
    ['2023/05/19', 115.22, 111.07, 115.22, 110.99],
    ['2023/05/22', 111.05, 109.61, 112.69, 109.48],
    ['2023/05/23', 108.99, 107.84, 109.99, 107.08],
    ['2023/05/24', 107.25, 107.07, 107.93, 106.3],
    ['2023/05/25', 107.48, 106.76, 109.6, 106.52],
    ['2023/05/26', 106.74, 106.69, 107.33, 105.26],
    ['2023/05/30', 107.54, 106.52, 108.71, 105.84],
    ['2023/05/31', 105.94, 104.25, 107.71, 103.23],
    ['2023/06/01', 104.49, 106.14, 106.42, 103.25],
    ['2023/06/02', 107.49, 113.49, 114.08, 107.16],
    ['2023/06/05', 111.28, 111.74, 112.72, 109.66],
    ['2023/06/06', 111.74, 116.84, 117.1, 111.32],
    ['2023/06/07', 117.45, 119.79, 121.28, 117.45],
    ['2023/06/08', 119.3, 118.51, 122.3, 117.94],
    ['2023/06/09', 118.75, 116.2, 118.85, 115.89],
    ['2023/06/12', 116.41, 120.47, 120.91, 115.27],
    ['2023/06/13', 120.45, 120.5, 123.01, 120.03],
    ['2023/06/14', 121.02, 119.73, 122.48, 117.94],
    ['2023/06/15', 120.32, 127.12, 127.31, 120.15],
    ['2023/06/16', 129.11, 126.76, 129.11, 124.82],
    ['2023/06/20', 127.11, 127.83, 129.71, 126.76],
    ['2023/06/21', 127.1, 129.32, 130.89, 127.0],
    ['2023/06/22', 128.93, 129.22, 130.5, 126.74],
    ['2023/06/23', 127.78, 132.74, 134.18, 127.78],
    ['2023/06/26', 133.07, 133.02, 135.77, 132.51],
    ['2023/06/27', 132.85, 135.57, 136.58, 132.85],
    ['2023/06/28', 135.53, 134.09, 136.53, 133.1],
    ['2023/06/29', 133.8, 138.84, 139.42, 133.13],
    ['2023/06/30', 140.8, 140.16, 141.15, 138.54],
    ['2023/07/03', 139.42, 138.28, 140.68, 136.44],
    ['2023/07/05', 138.44, 137.05, 138.44, 134.56],
    ['2023/07/06', 134.95, 134.54, 136.15, 133.04],
    ['2023/07/07', 134.98, 135.11, 137.77, 134.31],
    ['2023/07/10', 134.28, 138.32, 138.66, 134.28],
    ['2023/07/11', 138.98, 139.71, 140.33, 138.6],
    ['2023/07/12', 142.65, 145.51, 146.88, 141.55],
    ['2023/07/13', 146.42, 146.44, 147.55, 143.91],
    ['2023/07/14', 146.31, 145.9, 146.79, 143.34],
    ['2023/07/17', 144.8, 146.24, 147.65, 144.55],
    ['2023/07/18', 146.25, 147.1, 148.72, 144.85],
    ['2023/07/19', 146.27, 148.29, 148.9, 146.13],
    ['2023/07/20', 149.14, 145.39, 149.92, 142.61],
    ['2023/07/21', 146.72, 144.07, 146.72, 144.05],
    ['2023/07/24', 143.69, 145.01, 146.95, 143.69],
    ['2023/07/25', 143.91, 147.42, 148.03, 143.34],
    ['2023/07/26', 146.7, 149.08, 149.44, 146.1],
    ['2023/07/27', 150.0, 146.17, 150.88, 145.16],
    ['2023/07/28', 147.94, 148.39, 150.46, 147.82],
    ['2023/07/31', 149.08, 148.02, 150.16, 146.68],
    ['2023/08/01', 148.92, 148.73, 150.56, 147.91],
    ['2023/08/02', 151.52, 151.78, 154.04, 149.16],
]);
var volumes = [
    103600.0,
    170300.0,
    150100.0,
    140000.0,
    152700.0,
    185100.0,
    146500.0,
    83300.0,
    81000.0,
    178100.0,
    66800.0,
    73100.0,
    106200.0,
    120800.0,
    71600.0,
    62000.0,
    86600.0,
    156400.0,
    90200.0,
    139600.0,
    178200.0,
    208900.0,
    139100.0,
    142600.0,
    165600.0,
    66600.0,
    123400.0,
    78000.0,
    137900.0,
    159800.0,
    123600.0,
    267900.0,
    109400.0,
    103000.0,
    119300.0,
    198000.0,
    148700.0,
    138300.0,
    267400.0,
    379900.0,
    180800.0,
    201500.0,
    183700.0,
    174100.0,
    157900.0,
    81200.0,
    127100.0,
    97200.0,
    141100.0,
    124300.0,
    83000.0,
    98100.0,
    97700.0,
    101600.0,
    107400.0,
    124200.0,
    145800.0,
    282400.0,
    202700.0,
    135200.0,
    140000.0,
    201500.0,
    103000.0,
    343700.0,
    227700.0,
    275900.0,
    198000.0,
    176800.0,
    146300.0,
    152500.0,
    382200.0,
    190400.0,
    184300.0,
    333900.0,
    108100.0,
    135800.0,
    96700.0,
    110200.0,
    121300.0,
    164700.0,
    83900.0,
    195100.0,
    160000.0,
    274000.0,
    244800.0,
    229200.0,
    162000.0,
    164100.0,
    205200.0,
    235200.0,
    198100.0,
    152600.0,
    256000.0,
    265100.0,
    248000.0,
    609900.0,
    333100.0,
    240500.0,
    138300.0,
    120300.0,
    119400.0,
    89600.0,
    101000.0,
    143900.0,
    83400.0,
    158300.0,
    339900.0,
    162300.0,
    155700.0,
    145900.0,
    133500.0,
    508300.0,
    382300.0,
    211400.0,
    181400.0,
    223600.0,
    233200.0,
    227700.0,
    135500.0,
    170700.0,
    125200.0,
    259300.0,
    105200.0,
    135900.0,
    173200.0,
    134000.0,
    303900.0,
    232700.0,
    163400.0,
    206300.0,
    131900.0,
    115100.0,
    112300.0,
    196800.0,
    193500.0,
    188400.0,
    200600.0,
    264700.0,
    354700.0,
    592500.0,
    285900.0,
    278900.0,
    192300.0,
    302400.0,
    386200.0,
    265200.0,
    322700.0,
    219200.0,
    313700.0,
    374300.0,
    363800.0,
    222700.0,
    412700.0,
    411100.0,
    221700.0,
    309600.0,
    693400.0,
    170600.0,
    223700.0,
    163400.0,
    244600.0,
    391600.0,
    228600.0,
    235100.0,
    209500.0,
    97700.0,
    176300.0,
    197800.0,
    269600.0,
    172500.0,
    186200.0,
    161700.0,
    162400.0,
    208800.0,
    240800.0,
    115900.0,
    101300.0,
    458700.0,
    239800.0,
    329500.0,
    203600.0,
    168500.0,
    189200.0,
    201800.0,
    180800.0,
    285600.0,
    171700.0,
    165500.0,
    252800.0,
    512800.0,
    312600.0,
    223100.0,
    251600.0,
    155100.0,
    155500.0,
    150300.0,
    99200.0,
    147100.0,
    165300.0,
    144000.0,
    145500.0,
    120500.0,
    190400.0,
    149000.0,
    99200.0,
    108200.0,
    116500.0,
    165700.0,
    122000.0,
    261900.0,
    144500.0,
    115500.0,
    235500.0,
    198200.0,
    223200.0,
    182000.0,
    220400.0,
    246300.0,
    304200.0,
    583400.0,
    181200.0,
    163300.0,
    182900.0,
    659800.0,
    320300.0,
    213300.0,
    167900.0,
    257700.0,
    202100.0,
    74900.0,
    186900.0,
    190900.0,
    180500.0,
    163500.0,
    138500.0,
    174100.0,
    152900.0,
    244000.0,
    95700.0,
    168000.0,
    206700.0,
    192600.0,
    150300.0,
    172400.0,
    174100.0,
    155300.0,
    233900.0,
    181300.0,
    153900.0,
    218000.0,
    356000.0,
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
        text: "IBP",
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