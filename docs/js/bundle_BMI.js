/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_BMI");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/12', 99.44, 100.42, 100.76, 98.22],
    ['2022/08/15', 101.26, 101.64, 102.45, 101.26],
    ['2022/08/16', 100.7, 102.42, 102.73, 100.28],
    ['2022/08/17', 101.46, 102.61, 102.91, 100.8],
    ['2022/08/18', 102.31, 102.45, 103.3, 101.24],
    ['2022/08/19', 101.59, 101.18, 102.06, 100.71],
    ['2022/08/22', 100.17, 99.39, 100.96, 99.11],
    ['2022/08/23', 99.18, 97.84, 100.3, 97.44],
    ['2022/08/24', 97.84, 98.17, 98.87, 97.09],
    ['2022/08/25', 98.28, 99.82, 99.92, 98.02],
    ['2022/08/26', 99.82, 97.07, 100.25, 96.88],
    ['2022/08/29', 96.24, 96.81, 97.23, 95.73],
    ['2022/08/30', 97.19, 94.61, 97.25, 94.11],
    ['2022/08/31', 94.98, 94.69, 95.72, 94.17],
    ['2022/09/01', 94.24, 94.83, 94.93, 92.98],
    ['2022/09/02', 95.93, 94.01, 96.33, 93.64],
    ['2022/09/06', 94.0, 93.17, 94.0, 92.16],
    ['2022/09/07', 93.56, 96.53, 96.85, 93.56],
    ['2022/09/08', 96.01, 96.49, 97.63, 95.51],
    ['2022/09/09', 97.07, 97.09, 98.44, 97.01],
    ['2022/09/12', 98.06, 98.33, 98.88, 97.52],
    ['2022/09/13', 96.37, 94.7, 96.63, 94.26],
    ['2022/09/14', 94.88, 94.25, 94.88, 93.07],
    ['2022/09/15', 93.74, 92.26, 94.29, 91.67],
    ['2022/09/16', 92.12, 93.21, 93.25, 90.09],
    ['2022/09/19', 92.56, 95.21, 95.39, 92.56],
    ['2022/09/20', 94.79, 94.08, 95.39, 92.71],
    ['2022/09/21', 94.94, 93.76, 96.41, 93.54],
    ['2022/09/22', 93.18, 92.78, 93.3, 91.91],
    ['2022/09/23', 92.0, 92.38, 93.28, 90.85],
    ['2022/09/26', 92.17, 92.22, 94.3, 91.68],
    ['2022/09/27', 93.0, 92.91, 94.04, 91.99],
    ['2022/09/28', 93.22, 94.71, 95.23, 92.27],
    ['2022/09/29', 94.01, 94.11, 94.21, 92.45],
    ['2022/09/30', 94.11, 92.39, 95.66, 92.35],
    ['2022/10/03', 93.0, 95.15, 95.37, 92.87],
    ['2022/10/04', 96.79, 96.13, 98.04, 95.53],
    ['2022/10/05', 94.98, 96.61, 97.13, 94.98],
    ['2022/10/06', 96.24, 96.52, 97.49, 95.96],
    ['2022/10/07', 95.24, 93.4, 95.24, 92.16],
    ['2022/10/10', 94.1, 93.47, 94.1, 92.04],
    ['2022/10/11', 92.91, 92.29, 93.6, 91.29],
    ['2022/10/12', 92.44, 90.6, 92.44, 90.6],
    ['2022/10/13', 89.11, 91.97, 92.27, 88.16],
    ['2022/10/14', 93.06, 91.05, 93.06, 90.42],
    ['2022/10/17', 92.55, 96.55, 97.14, 92.55],
    ['2022/10/18', 97.62, 96.97, 98.48, 96.0],
    ['2022/10/19', 96.21, 100.36, 101.46, 95.8],
    ['2022/10/20', 100.49, 97.68, 101.55, 96.34],
    ['2022/10/21', 98.94, 101.52, 101.58, 97.71],
    ['2022/10/24', 101.73, 103.93, 104.73, 101.54],
    ['2022/10/25', 104.34, 111.91, 112.07, 104.34],
    ['2022/10/26', 111.88, 108.0, 113.01, 107.86],
    ['2022/10/27', 109.14, 111.06, 111.41, 108.01],
    ['2022/10/28', 111.45, 111.73, 111.89, 109.88],
    ['2022/10/31', 115.18, 112.48, 115.18, 111.63],
    ['2022/11/01', 113.4, 115.1, 115.7, 112.85],
    ['2022/11/02', 114.29, 110.68, 114.99, 110.16],
    ['2022/11/03', 109.37, 109.29, 110.05, 108.4],
    ['2022/11/04', 110.71, 108.91, 111.46, 108.2],
    ['2022/11/07', 108.69, 112.61, 112.99, 108.61],
    ['2022/11/08', 112.97, 109.63, 112.97, 109.42],
    ['2022/11/09', 108.44, 108.28, 110.03, 107.95],
    ['2022/11/10', 112.43, 113.86, 113.9, 111.2],
    ['2022/11/11', 114.75, 111.26, 114.75, 111.1],
    ['2022/11/14', 110.19, 110.68, 112.7, 110.19],
    ['2022/11/15', 111.96, 116.01, 116.23, 111.64],
    ['2022/11/16', 116.0, 115.64, 117.33, 114.87],
    ['2022/11/17', 113.91, 115.78, 115.87, 113.42],
    ['2022/11/18', 117.97, 116.18, 117.97, 115.12],
    ['2022/11/21', 116.1, 115.86, 116.53, 115.27],
    ['2022/11/22', 116.66, 117.12, 117.3, 115.84],
    ['2022/11/23', 117.26, 116.79, 117.74, 116.04],
    ['2022/11/25', 116.9, 116.74, 117.47, 116.42],
    ['2022/11/28', 116.22, 113.54, 116.22, 112.6],
    ['2022/11/29', 113.41, 112.47, 116.41, 112.31],
    ['2022/11/30', 112.41, 115.82, 115.89, 111.07],
    ['2022/12/01', 116.06, 114.95, 116.3, 114.53],
    ['2022/12/02', 113.27, 115.27, 116.23, 112.92],
    ['2022/12/05', 114.02, 114.08, 114.73, 111.88],
    ['2022/12/06', 114.59, 112.62, 114.64, 112.29],
    ['2022/12/07', 111.92, 114.03, 114.17, 111.62],
    ['2022/12/08', 114.9, 117.06, 117.25, 114.53],
    ['2022/12/09', 116.77, 116.53, 118.38, 116.26],
    ['2022/12/12', 115.99, 117.32, 118.03, 115.99],
    ['2022/12/13', 119.6, 117.73, 120.54, 117.48],
    ['2022/12/14', 117.34, 116.43, 118.36, 114.88],
    ['2022/12/15', 115.47, 112.72, 115.47, 111.44],
    ['2022/12/16', 111.53, 110.13, 112.27, 108.64],
    ['2022/12/19', 110.46, 109.43, 111.42, 108.83],
    ['2022/12/20', 108.98, 111.37, 111.93, 108.91],
    ['2022/12/21', 111.87, 112.88, 113.31, 111.04],
    ['2022/12/22', 111.63, 110.14, 111.63, 108.76],
    ['2022/12/23', 110.35, 109.62, 110.65, 109.59],
    ['2022/12/27', 109.77, 110.33, 110.59, 108.82],
    ['2022/12/28', 110.4, 108.29, 111.28, 108.18],
    ['2022/12/29', 109.48, 110.68, 111.05, 109.48],
    ['2022/12/30', 109.84, 109.03, 109.84, 108.35],
    ['2023/01/03', 108.89, 109.67, 111.24, 108.1],
    ['2023/01/04', 110.68, 109.04, 111.06, 108.44],
    ['2023/01/05', 108.47, 107.37, 108.83, 107.18],
    ['2023/01/06', 108.69, 108.0, 109.43, 107.74],
    ['2023/01/09', 108.38, 105.73, 109.9, 105.43],
    ['2023/01/10', 105.84, 110.18, 110.27, 105.84],
    ['2023/01/11', 110.26, 113.26, 114.98, 109.52],
    ['2023/01/12', 113.27, 114.29, 114.76, 111.9],
    ['2023/01/13', 114.39, 116.07, 116.55, 113.67],
    ['2023/01/17', 116.07, 116.42, 117.94, 115.56],
    ['2023/01/18', 117.08, 115.95, 118.28, 115.11],
    ['2023/01/19', 115.76, 111.97, 115.76, 111.91],
    ['2023/01/20', 113.09, 115.02, 115.19, 112.21],
    ['2023/01/23', 114.78, 114.63, 115.94, 113.79],
    ['2023/01/24', 114.14, 114.14, 116.44, 113.68],
    ['2023/01/25', 112.84, 115.42, 115.43, 112.19],
    ['2023/01/26', 116.14, 116.15, 116.28, 114.62],
    ['2023/01/27', 105.01, 111.93, 115.99, 103.93],
    ['2023/01/30', 112.51, 112.42, 114.28, 111.42],
    ['2023/01/31', 112.75, 115.9, 116.99, 112.12],
    ['2023/02/01', 115.92, 119.03, 120.11, 115.58],
    ['2023/02/02', 120.31, 118.1, 120.31, 116.66],
    ['2023/02/03', 117.35, 121.05, 121.52, 117.35],
    ['2023/02/06', 120.03, 120.89, 121.71, 119.07],
    ['2023/02/07', 121.12, 122.86, 123.41, 119.39],
    ['2023/02/08', 122.28, 120.41, 123.28, 119.42],
    ['2023/02/09', 121.65, 119.89, 122.4, 118.88],
    ['2023/02/10', 119.43, 118.75, 120.79, 117.7],
    ['2023/02/13', 118.9, 121.26, 121.36, 118.9],
    ['2023/02/14', 121.22, 121.08, 122.27, 119.77],
    ['2023/02/15', 120.71, 121.21, 123.59, 120.71],
    ['2023/02/16', 119.91, 120.1, 122.0, 119.67],
    ['2023/02/17', 120.51, 120.29, 121.48, 119.44],
    ['2023/02/21', 118.82, 118.03, 119.12, 117.57],
    ['2023/02/22', 118.17, 118.1, 118.93, 116.69],
    ['2023/02/23', 118.6, 118.48, 119.37, 116.9],
    ['2023/02/24', 117.33, 117.39, 117.68, 115.46],
    ['2023/02/27', 118.74, 118.94, 120.07, 118.44],
    ['2023/02/28', 119.13, 121.62, 123.68, 118.9],
    ['2023/03/01', 121.0, 120.04, 121.59, 119.04],
    ['2023/03/02', 119.59, 121.46, 121.78, 119.43],
    ['2023/03/03', 122.06, 123.77, 124.35, 121.32],
    ['2023/03/06', 123.97, 119.76, 123.97, 118.84],
    ['2023/03/07', 119.98, 118.35, 120.25, 117.39],
    ['2023/03/08', 118.56, 119.08, 119.95, 117.18],
    ['2023/03/09', 119.5, 118.5, 119.9, 117.56],
    ['2023/03/10', 117.93, 115.51, 117.93, 114.98],
    ['2023/03/13', 114.0, 114.95, 116.58, 113.18],
    ['2023/03/14', 117.49, 119.1, 119.21, 116.27],
    ['2023/03/15', 116.49, 114.26, 116.79, 112.46],
    ['2023/03/16', 112.87, 116.2, 116.4, 112.87],
    ['2023/03/17', 115.57, 114.48, 118.4, 113.91],
    ['2023/03/20', 115.12, 117.58, 118.0, 115.03],
    ['2023/03/21', 119.39, 117.13, 120.69, 116.08],
    ['2023/03/22', 116.79, 116.19, 118.59, 116.04],
    ['2023/03/23', 116.86, 115.89, 118.14, 114.74],
    ['2023/03/24', 115.36, 116.97, 117.5, 114.75],
    ['2023/03/27', 118.05, 118.08, 118.62, 117.23],
    ['2023/03/28', 117.29, 118.73, 118.86, 117.07],
    ['2023/03/29', 120.12, 119.88, 120.77, 118.41],
    ['2023/03/30', 120.65, 119.75, 120.94, 118.98],
    ['2023/03/31', 120.5, 121.82, 122.48, 120.3],
    ['2023/04/03', 121.52, 123.6, 123.98, 120.21],
    ['2023/04/04', 123.63, 120.97, 124.13, 119.83],
    ['2023/04/05', 120.09, 119.08, 120.09, 118.14],
    ['2023/04/06', 118.56, 118.94, 119.5, 117.53],
    ['2023/04/10', 118.18, 120.68, 121.19, 118.18],
    ['2023/04/11', 121.1, 120.68, 121.97, 119.56],
    ['2023/04/12', 121.5, 122.17, 122.79, 120.6],
    ['2023/04/13', 122.67, 122.44, 122.72, 119.52],
    ['2023/04/14', 122.08, 121.32, 123.67, 120.71],
    ['2023/04/17', 121.15, 120.92, 121.72, 119.25],
    ['2023/04/18', 121.77, 120.85, 121.8, 119.54],
    ['2023/04/19', 120.27, 120.5, 122.31, 119.02],
    ['2023/04/20', 127.05, 133.34, 138.12, 126.66],
    ['2023/04/21', 133.93, 135.64, 137.37, 133.43],
    ['2023/04/24', 136.16, 134.3, 139.33, 134.04],
    ['2023/04/25', 133.87, 132.76, 134.49, 132.03],
    ['2023/04/26', 132.22, 130.17, 132.6, 128.94],
    ['2023/04/27', 130.75, 132.83, 133.43, 130.75],
    ['2023/04/28', 132.53, 132.33, 133.65, 131.49],
    ['2023/05/01', 132.99, 136.55, 137.76, 132.99],
    ['2023/05/02', 136.2, 137.66, 138.69, 135.33],
    ['2023/05/03', 138.1, 135.72, 138.59, 133.96],
    ['2023/05/04', 135.16, 137.38, 138.11, 135.1],
    ['2023/05/05', 138.16, 139.26, 139.87, 136.97],
    ['2023/05/08', 138.95, 137.77, 139.54, 136.79],
    ['2023/05/09', 137.43, 138.06, 139.4, 137.21],
    ['2023/05/10', 139.08, 139.08, 139.83, 136.74],
    ['2023/05/11', 138.74, 137.64, 138.74, 136.74],
    ['2023/05/12', 137.87, 137.68, 139.5, 136.11],
    ['2023/05/15', 137.68, 137.59, 137.9, 136.1],
    ['2023/05/16', 136.81, 137.32, 138.25, 135.88],
    ['2023/05/17', 137.56, 138.93, 139.8, 136.96],
    ['2023/05/18', 139.19, 140.65, 140.88, 138.82],
    ['2023/05/19', 142.09, 142.37, 143.37, 141.75],
    ['2023/05/22', 141.84, 140.91, 142.95, 140.65],
    ['2023/05/23', 140.39, 139.94, 142.57, 139.74],
    ['2023/05/24', 138.96, 138.4, 139.37, 136.68],
    ['2023/05/25', 139.06, 136.86, 139.08, 136.32],
    ['2023/05/26', 137.02, 139.19, 139.37, 137.02],
    ['2023/05/30', 139.3, 139.69, 141.91, 139.19],
    ['2023/05/31', 139.03, 137.87, 139.9, 136.73],
    ['2023/06/01', 138.4, 142.07, 142.19, 137.29],
    ['2023/06/02', 142.07, 145.0, 145.3, 140.19],
    ['2023/06/05', 143.45, 143.76, 144.78, 140.65],
    ['2023/06/06', 143.3, 146.33, 146.99, 142.05],
    ['2023/06/07', 146.77, 150.77, 151.09, 146.77],
    ['2023/06/08', 150.06, 151.03, 152.49, 148.66],
    ['2023/06/09', 151.69, 152.51, 153.31, 150.14],
    ['2023/06/12', 152.97, 153.6, 155.25, 151.44],
    ['2023/06/13', 153.6, 152.03, 156.15, 151.15],
    ['2023/06/14', 152.0, 150.24, 152.45, 149.81],
    ['2023/06/15', 149.64, 149.53, 150.73, 148.11],
    ['2023/06/16', 150.87, 149.5, 150.87, 147.83],
    ['2023/06/20', 149.5, 149.35, 151.92, 148.88],
    ['2023/06/21', 148.66, 150.95, 152.72, 148.12],
    ['2023/06/22', 150.52, 147.05, 150.8, 146.32],
    ['2023/06/23', 145.64, 143.66, 147.14, 143.55],
    ['2023/06/26', 144.19, 144.19, 145.77, 143.15],
    ['2023/06/27', 144.9, 144.71, 145.54, 143.88],
    ['2023/06/28', 144.41, 144.32, 145.56, 143.25],
    ['2023/06/29', 143.89, 147.31, 148.66, 143.43],
    ['2023/06/30', 148.12, 147.56, 149.24, 146.8],
    ['2023/07/03', 146.92, 146.98, 147.61, 145.8],
    ['2023/07/05', 145.94, 141.62, 146.45, 140.55],
    ['2023/07/06', 140.12, 140.3, 141.34, 138.71],
    ['2023/07/07', 140.32, 140.08, 142.6, 139.93],
    ['2023/07/10', 139.39, 143.7, 144.04, 139.39],
    ['2023/07/11', 144.26, 146.5, 146.71, 143.99],
    ['2023/07/12', 148.21, 143.9, 148.21, 143.84],
    ['2023/07/13', 143.74, 143.02, 144.67, 142.55],
    ['2023/07/14', 142.49, 142.38, 144.12, 142.13],
    ['2023/07/17', 142.88, 146.4, 148.6, 142.88],
    ['2023/07/18', 146.0, 147.07, 147.19, 144.93],
    ['2023/07/19', 147.51, 145.65, 147.51, 144.05],
    ['2023/07/20', 158.0, 157.04, 158.0, 149.18],
    ['2023/07/21', 158.99, 164.0, 164.6, 158.36],
    ['2023/07/24', 165.0, 163.51, 167.0, 162.26],
    ['2023/07/25', 163.62, 164.81, 166.96, 163.62],
    ['2023/07/26', 165.0, 163.2, 166.1, 162.28],
    ['2023/07/27', 163.08, 162.52, 164.07, 160.76],
    ['2023/07/28', 164.21, 162.26, 165.16, 161.52],
    ['2023/07/31', 162.99, 164.64, 165.51, 162.15],
    ['2023/08/01', 163.96, 162.63, 166.36, 161.43],
    ['2023/08/02', 162.33, 163.48, 165.16, 161.59],
    ['2023/08/03', 162.07, 163.61, 164.27, 161.76],
    ['2023/08/04', 162.78, 165.24, 166.94, 161.09],
    ['2023/08/07', 166.58, 165.29, 167.95, 164.72],
    ['2023/08/08', 164.9, 162.48, 164.9, 159.56],
    ['2023/08/09', 162.08, 162.05, 162.26, 159.01],
    ['2023/08/10', 162.47, 164.15, 165.12, 162.42],
]);
var volumes = [
    72400.0,
    102600.0,
    78000.0,
    68900.0,
    79900.0,
    90200.0,
    97200.0,
    89600.0,
    117300.0,
    64500.0,
    55600.0,
    80300.0,
    108700.0,
    217900.0,
    92000.0,
    83000.0,
    100600.0,
    106000.0,
    64100.0,
    70300.0,
    79000.0,
    95000.0,
    217300.0,
    90700.0,
    313700.0,
    94900.0,
    118900.0,
    90400.0,
    91400.0,
    157200.0,
    136200.0,
    131300.0,
    112600.0,
    109200.0,
    150400.0,
    114100.0,
    212800.0,
    91500.0,
    70300.0,
    100600.0,
    72900.0,
    150100.0,
    91700.0,
    119400.0,
    102400.0,
    237700.0,
    179600.0,
    247800.0,
    165100.0,
    402600.0,
    151200.0,
    396000.0,
    356900.0,
    219800.0,
    183200.0,
    482300.0,
    277600.0,
    208800.0,
    131200.0,
    159300.0,
    203900.0,
    120900.0,
    111100.0,
    147300.0,
    118100.0,
    86900.0,
    199800.0,
    111600.0,
    68000.0,
    114700.0,
    90000.0,
    67200.0,
    50800.0,
    32600.0,
    98400.0,
    87200.0,
    155100.0,
    92200.0,
    85400.0,
    126300.0,
    111700.0,
    91200.0,
    110300.0,
    282300.0,
    120600.0,
    131800.0,
    104600.0,
    160000.0,
    613000.0,
    130700.0,
    114000.0,
    96400.0,
    76700.0,
    67600.0,
    84600.0,
    79400.0,
    57300.0,
    70500.0,
    134100.0,
    87000.0,
    71100.0,
    142800.0,
    133100.0,
    261000.0,
    210200.0,
    97200.0,
    78500.0,
    109500.0,
    174400.0,
    160200.0,
    182900.0,
    188400.0,
    85200.0,
    124400.0,
    128700.0,
    293100.0,
    135700.0,
    329000.0,
    132300.0,
    178400.0,
    176000.0,
    98600.0,
    116500.0,
    89400.0,
    90000.0,
    90000.0,
    102200.0,
    76200.0,
    97100.0,
    101300.0,
    200200.0,
    87700.0,
    116100.0,
    87200.0,
    100000.0,
    93800.0,
    286400.0,
    177500.0,
    78900.0,
    97500.0,
    169100.0,
    93200.0,
    88500.0,
    81300.0,
    86400.0,
    99100.0,
    122000.0,
    157200.0,
    118300.0,
    478500.0,
    121100.0,
    124200.0,
    111300.0,
    109000.0,
    79000.0,
    49900.0,
    63400.0,
    88800.0,
    58100.0,
    110000.0,
    137700.0,
    107400.0,
    82500.0,
    92600.0,
    184900.0,
    121600.0,
    85600.0,
    96400.0,
    107100.0,
    125300.0,
    130600.0,
    193700.0,
    480800.0,
    614900.0,
    250400.0,
    186200.0,
    201600.0,
    137900.0,
    380600.0,
    163400.0,
    152400.0,
    259500.0,
    178600.0,
    135500.0,
    132100.0,
    174000.0,
    131000.0,
    106600.0,
    154900.0,
    122300.0,
    76500.0,
    104700.0,
    94000.0,
    183500.0,
    75800.0,
    104300.0,
    134600.0,
    194700.0,
    117000.0,
    123400.0,
    381100.0,
    188800.0,
    139900.0,
    149600.0,
    138200.0,
    270200.0,
    202600.0,
    163800.0,
    162900.0,
    197700.0,
    157500.0,
    178200.0,
    447700.0,
    144800.0,
    130800.0,
    163700.0,
    212300.0,
    167100.0,
    124000.0,
    195900.0,
    152200.0,
    151500.0,
    64700.0,
    200500.0,
    149600.0,
    179600.0,
    155200.0,
    232900.0,
    161000.0,
    174400.0,
    96900.0,
    193100.0,
    177600.0,
    203200.0,
    291700.0,
    580100.0,
    389300.0,
    188200.0,
    170800.0,
    145300.0,
    107100.0,
    267800.0,
    114300.0,
    117700.0,
    103100.0,
    284400.0,
    102800.0,
    176400.0,
    167600.0,
    136300.0,
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
     *     text: "BMI",
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