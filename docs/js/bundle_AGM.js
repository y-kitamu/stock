/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_AGM");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/08', 109.35, 109.98, 111.17, 108.72],
    ['2022/08/09', 110.57, 111.43, 111.92, 109.22],
    ['2022/08/10', 113.07, 112.06, 113.9, 112.04],
    ['2022/08/11', 112.36, 113.38, 113.92, 111.81],
    ['2022/08/12', 113.98, 115.82, 116.07, 113.17],
    ['2022/08/15', 114.99, 114.68, 115.82, 114.42],
    ['2022/08/16', 114.73, 116.47, 116.71, 114.49],
    ['2022/08/17', 115.09, 116.23, 116.68, 114.57],
    ['2022/08/18', 116.78, 116.46, 116.78, 115.31],
    ['2022/08/19', 115.82, 114.28, 115.82, 113.28],
    ['2022/08/22', 113.13, 113.09, 113.88, 112.15],
    ['2022/08/23', 112.75, 113.0, 113.62, 112.35],
    ['2022/08/24', 113.0, 113.78, 114.08, 112.51],
    ['2022/08/25', 113.7, 115.08, 115.2, 113.7],
    ['2022/08/26', 115.1, 111.23, 115.1, 111.17],
    ['2022/08/29', 110.67, 110.63, 111.78, 109.71],
    ['2022/08/30', 111.45, 110.3, 111.45, 109.18],
    ['2022/08/31', 111.24, 109.24, 111.24, 109.01],
    ['2022/09/01', 108.96, 108.93, 109.47, 107.5],
    ['2022/09/02', 108.93, 108.18, 111.01, 107.85],
    ['2022/09/06', 107.95, 106.32, 107.95, 106.07],
    ['2022/09/07', 106.2, 107.59, 107.91, 106.04],
    ['2022/09/08', 106.56, 107.04, 108.05, 106.5],
    ['2022/09/09', 107.45, 106.46, 108.56, 106.11],
    ['2022/09/12', 106.94, 107.6, 107.6, 106.18],
    ['2022/09/13', 106.76, 103.91, 106.76, 103.67],
    ['2022/09/14', 103.03, 103.94, 103.94, 101.99],
    ['2022/09/15', 104.0, 105.14, 105.51, 103.53],
    ['2022/09/16', 104.51, 105.02, 105.82, 103.37],
    ['2022/09/19', 103.82, 108.03, 108.03, 103.82],
    ['2022/09/20', 106.69, 106.94, 106.94, 104.54],
    ['2022/09/21', 108.01, 108.13, 111.25, 107.78],
    ['2022/09/22', 107.35, 107.29, 108.58, 104.22],
    ['2022/09/23', 104.97, 103.55, 105.96, 102.24],
    ['2022/09/26', 104.0, 102.87, 104.82, 102.83],
    ['2022/09/27', 103.93, 100.92, 103.97, 100.83],
    ['2022/09/28', 101.98, 101.82, 103.19, 101.34],
    ['2022/09/29', 103.6, 98.36, 103.6, 97.76],
    ['2022/09/30', 98.91, 99.14, 101.06, 98.5],
    ['2022/10/03', 100.29, 101.15, 101.38, 98.24],
    ['2022/10/04', 102.26, 106.11, 106.68, 102.06],
    ['2022/10/05', 104.57, 104.36, 105.07, 103.16],
    ['2022/10/06', 103.83, 103.23, 105.01, 102.6],
    ['2022/10/07', 103.26, 101.12, 104.14, 100.4],
    ['2022/10/10', 101.61, 101.45, 102.45, 101.03],
    ['2022/10/11', 101.1, 101.61, 102.62, 100.01],
    ['2022/10/12', 101.95, 102.87, 103.21, 100.69],
    ['2022/10/13', 100.92, 107.39, 107.39, 100.92],
    ['2022/10/14', 107.7, 104.86, 109.4, 104.71],
    ['2022/10/17', 107.18, 107.32, 107.92, 106.38],
    ['2022/10/18', 108.38, 107.58, 108.79, 107.23],
    ['2022/10/19', 106.27, 106.62, 107.99, 104.72],
    ['2022/10/20', 107.17, 105.05, 108.11, 104.94],
    ['2022/10/21', 105.6, 107.71, 107.97, 104.97],
    ['2022/10/24', 108.6, 107.32, 108.6, 107.16],
    ['2022/10/25', 106.77, 110.08, 110.78, 106.65],
    ['2022/10/26', 111.23, 110.53, 111.47, 109.93],
    ['2022/10/27', 111.84, 112.09, 115.69, 111.78],
    ['2022/10/28', 112.07, 114.46, 115.4, 112.07],
    ['2022/10/31', 114.17, 115.2, 116.47, 113.67],
    ['2022/11/01', 116.08, 116.94, 117.97, 115.68],
    ['2022/11/02', 116.1, 113.94, 117.81, 113.8],
    ['2022/11/03', 112.36, 113.6, 114.74, 111.64],
    ['2022/11/04', 115.42, 115.33, 115.8, 113.2],
    ['2022/11/07', 114.8, 114.9, 116.01, 113.94],
    ['2022/11/08', 113.49, 117.34, 118.81, 113.2],
    ['2022/11/09', 117.71, 115.5, 118.84, 115.26],
    ['2022/11/10', 119.58, 122.48, 123.73, 118.44],
    ['2022/11/11', 122.6, 121.51, 123.86, 119.45],
    ['2022/11/14', 120.87, 121.6, 123.42, 120.74],
    ['2022/11/15', 123.48, 123.26, 124.71, 121.83],
    ['2022/11/16', 123.87, 123.57, 123.92, 120.91],
    ['2022/11/17', 123.31, 123.28, 123.47, 121.18],
    ['2022/11/18', 124.92, 124.19, 124.92, 122.7],
    ['2022/11/21', 123.37, 125.92, 126.28, 123.24],
    ['2022/11/22', 125.4, 125.51, 126.53, 124.82],
    ['2022/11/23', 125.9, 125.59, 126.29, 124.96],
    ['2022/11/25', 126.1, 126.82, 127.88, 125.28],
    ['2022/11/28', 124.66, 124.76, 125.46, 124.1],
    ['2022/11/29', 125.61, 124.78, 126.36, 124.26],
    ['2022/11/30', 125.39, 125.85, 126.75, 122.75],
    ['2022/12/01', 126.26, 125.0, 126.7, 124.83],
    ['2022/12/02', 123.28, 125.25, 126.33, 123.28],
    ['2022/12/05', 124.29, 120.96, 124.29, 120.54],
    ['2022/12/06', 120.03, 121.69, 122.11, 118.87],
    ['2022/12/07', 120.23, 118.78, 121.45, 118.26],
    ['2022/12/08', 120.0, 119.8, 121.32, 118.21],
    ['2022/12/09', 118.49, 119.06, 120.03, 117.88],
    ['2022/12/12', 119.49, 120.09, 120.94, 118.72],
    ['2022/12/13', 123.38, 121.21, 123.38, 119.61],
    ['2022/12/14', 119.97, 117.31, 121.06, 116.16],
    ['2022/12/15', 115.26, 115.42, 116.94, 114.47],
    ['2022/12/16', 113.58, 115.23, 116.09, 113.47],
    ['2022/12/19', 115.17, 114.42, 117.09, 113.54],
    ['2022/12/20', 115.03, 115.34, 116.54, 112.08],
    ['2022/12/21', 116.29, 115.02, 117.02, 114.64],
    ['2022/12/22', 115.55, 113.8, 115.89, 111.8],
    ['2022/12/23', 114.59, 113.99, 115.38, 112.93],
    ['2022/12/27', 115.03, 113.46, 115.54, 113.1],
    ['2022/12/28', 114.08, 111.28, 114.26, 111.28],
    ['2022/12/29', 112.58, 113.49, 114.44, 111.4],
    ['2022/12/30', 113.0, 112.71, 113.56, 112.12],
    ['2023/01/03', 113.84, 113.53, 114.26, 112.47],
    ['2023/01/04', 113.55, 115.63, 117.01, 113.55],
    ['2023/01/05', 115.34, 114.79, 115.34, 112.91],
    ['2023/01/06', 116.07, 120.75, 121.85, 115.31],
    ['2023/01/09', 120.98, 118.55, 122.07, 118.31],
    ['2023/01/10', 118.06, 120.12, 120.16, 117.94],
    ['2023/01/11', 120.96, 123.35, 124.57, 119.75],
    ['2023/01/12', 123.57, 124.72, 126.53, 122.96],
    ['2023/01/13', 123.71, 124.8, 125.86, 122.37],
    ['2023/01/17', 125.6, 122.56, 125.75, 122.4],
    ['2023/01/18', 122.01, 120.35, 122.72, 120.13],
    ['2023/01/19', 119.51, 121.79, 121.8, 118.43],
    ['2023/01/20', 122.73, 123.93, 124.22, 121.18],
    ['2023/01/23', 124.76, 127.11, 127.91, 123.76],
    ['2023/01/24', 125.8, 126.0, 127.05, 125.11],
    ['2023/01/25', 125.37, 131.24, 131.39, 124.43],
    ['2023/01/26', 132.53, 132.71, 134.5, 130.53],
    ['2023/01/27', 131.92, 132.22, 134.74, 131.92],
    ['2023/01/30', 131.79, 128.43, 132.62, 128.31],
    ['2023/01/31', 128.15, 132.97, 132.97, 128.15],
    ['2023/02/01', 132.86, 132.8, 134.94, 131.26],
    ['2023/02/02', 132.91, 133.54, 134.45, 132.61],
    ['2023/02/03', 133.17, 134.72, 135.96, 132.53],
    ['2023/02/06', 133.96, 134.38, 135.46, 132.76],
    ['2023/02/07', 133.47, 136.86, 137.15, 132.92],
    ['2023/02/08', 135.41, 135.5, 136.87, 134.82],
    ['2023/02/09', 135.98, 135.88, 137.29, 134.73],
    ['2023/02/10', 135.6, 138.68, 139.21, 135.1],
    ['2023/02/13', 138.36, 138.63, 139.16, 137.67],
    ['2023/02/14', 138.2, 137.17, 139.63, 136.74],
    ['2023/02/15', 135.77, 139.1, 139.98, 135.5],
    ['2023/02/16', 137.57, 138.27, 140.37, 134.8],
    ['2023/02/17', 138.66, 139.44, 140.11, 137.52],
    ['2023/02/21', 137.94, 136.57, 138.72, 136.2],
    ['2023/02/22', 136.88, 137.04, 138.35, 136.05],
    ['2023/02/23', 135.03, 135.54, 137.84, 134.3],
    ['2023/02/24', 135.6, 141.08, 141.9, 132.58],
    ['2023/02/27', 141.94, 141.29, 143.87, 139.88],
    ['2023/02/28', 141.76, 141.86, 144.49, 140.65],
    ['2023/03/01', 142.23, 145.07, 146.32, 140.98],
    ['2023/03/02', 144.33, 145.14, 146.15, 143.13],
    ['2023/03/03', 146.14, 147.5, 148.5, 144.96],
    ['2023/03/06', 147.51, 147.2, 149.37, 146.32],
    ['2023/03/07', 146.72, 143.37, 147.17, 142.82],
    ['2023/03/08', 143.87, 142.94, 145.32, 142.12],
    ['2023/03/09', 142.63, 135.2, 142.89, 135.11],
    ['2023/03/10', 133.57, 130.21, 134.65, 128.29],
    ['2023/03/13', 125.65, 126.01, 130.81, 122.39],
    ['2023/03/14', 131.12, 129.04, 133.07, 127.31],
    ['2023/03/15', 123.99, 125.93, 127.23, 123.08],
    ['2023/03/16', 123.82, 131.21, 132.95, 122.6],
    ['2023/03/17', 129.68, 126.14, 130.95, 123.5],
    ['2023/03/20', 128.34, 127.14, 130.24, 126.83],
    ['2023/03/21', 129.74, 130.88, 133.3, 129.74],
    ['2023/03/22', 131.18, 125.2, 131.18, 125.19],
    ['2023/03/23', 125.58, 124.64, 127.74, 123.89],
    ['2023/03/24', 122.88, 125.35, 125.92, 122.1],
    ['2023/03/27', 127.54, 127.88, 128.96, 126.25],
    ['2023/03/28', 127.72, 126.74, 128.34, 126.0],
    ['2023/03/29', 129.87, 132.29, 132.59, 128.61],
    ['2023/03/30', 133.07, 130.46, 134.89, 129.65],
    ['2023/03/31', 131.72, 133.19, 133.88, 129.88],
    ['2023/04/03', 133.77, 133.19, 136.0, 131.07],
    ['2023/04/04', 134.01, 131.37, 134.01, 130.0],
    ['2023/04/05', 129.95, 130.21, 131.55, 129.55],
    ['2023/04/06', 130.27, 133.09, 133.9, 128.57],
    ['2023/04/10', 132.81, 131.94, 134.13, 131.34],
    ['2023/04/11', 132.41, 131.3, 133.6, 131.17],
    ['2023/04/12', 132.18, 131.03, 132.54, 130.73],
    ['2023/04/13', 131.33, 131.29, 132.54, 130.47],
    ['2023/04/14', 132.25, 131.05, 133.22, 130.67],
    ['2023/04/17', 131.0, 132.92, 133.0, 130.39],
    ['2023/04/18', 133.22, 134.0, 134.02, 132.31],
    ['2023/04/19', 133.99, 137.86, 137.9, 132.73],
    ['2023/04/20', 136.61, 135.39, 136.69, 134.97],
    ['2023/04/21', 135.32, 135.87, 137.08, 134.46],
    ['2023/04/24', 135.42, 135.24, 137.36, 135.16],
    ['2023/04/25', 133.91, 132.63, 135.11, 132.56],
    ['2023/04/26', 131.09, 131.94, 132.97, 131.0],
    ['2023/04/27', 132.04, 133.09, 133.39, 132.04],
    ['2023/04/28', 131.92, 133.29, 134.0, 131.92],
    ['2023/05/01', 132.97, 132.69, 135.0, 132.11],
    ['2023/05/02', 131.69, 129.04, 131.69, 128.35],
    ['2023/05/03', 129.15, 126.92, 131.13, 126.72],
    ['2023/05/04', 125.48, 126.9, 127.57, 124.57],
    ['2023/05/05', 129.15, 129.88, 130.4, 128.41],
    ['2023/05/08', 130.07, 130.07, 130.67, 129.4],
    ['2023/05/09', 128.89, 129.67, 130.92, 127.82],
    ['2023/05/10', 129.7, 123.66, 133.02, 123.42],
    ['2023/05/11', 123.2, 128.83, 130.98, 122.96],
    ['2023/05/12', 128.63, 128.76, 129.23, 125.9],
    ['2023/05/15', 130.1, 136.71, 136.94, 130.1],
    ['2023/05/16', 135.18, 133.81, 136.17, 133.65],
    ['2023/05/17', 135.09, 136.57, 137.36, 134.07],
    ['2023/05/18', 136.27, 140.41, 140.86, 136.05],
    ['2023/05/19', 141.78, 140.93, 143.02, 139.49],
    ['2023/05/22', 141.34, 139.85, 142.15, 139.22],
    ['2023/05/23', 139.26, 139.46, 141.7, 138.74],
    ['2023/05/24', 138.22, 137.25, 138.22, 136.5],
    ['2023/05/25', 137.43, 135.36, 137.64, 135.14],
    ['2023/05/26', 135.69, 136.37, 137.61, 135.69],
    ['2023/05/30', 136.88, 135.39, 137.31, 134.83],
    ['2023/05/31', 134.9, 133.81, 135.86, 132.47],
    ['2023/06/01', 135.0, 136.31, 138.26, 134.03],
    ['2023/06/02', 138.55, 140.81, 140.94, 137.45],
    ['2023/06/05', 140.08, 138.25, 140.62, 137.21],
    ['2023/06/06', 138.11, 145.92, 146.16, 138.11],
    ['2023/06/07', 146.64, 148.29, 148.52, 144.6],
    ['2023/06/08', 148.28, 150.45, 151.02, 147.32],
    ['2023/06/09', 150.07, 150.59, 150.61, 147.74],
    ['2023/06/12', 150.03, 150.35, 153.54, 149.4],
    ['2023/06/13', 150.46, 150.0, 151.75, 149.29],
    ['2023/06/14', 150.07, 149.82, 150.77, 148.56],
    ['2023/06/15', 148.96, 149.55, 150.28, 147.28],
    ['2023/06/16', 150.9, 148.5, 151.0, 146.9],
    ['2023/06/20', 148.39, 146.64, 148.54, 146.59],
    ['2023/06/21', 146.37, 144.61, 147.0, 144.5],
    ['2023/06/22', 145.05, 143.72, 145.05, 142.01],
    ['2023/06/23', 141.67, 140.97, 143.67, 139.64],
    ['2023/06/26', 141.14, 140.23, 142.6, 140.08],
    ['2023/06/27', 140.46, 140.82, 143.0, 140.28],
    ['2023/06/28', 140.77, 141.95, 143.04, 140.55],
    ['2023/06/29', 142.66, 141.64, 143.44, 141.45],
    ['2023/06/30', 143.45, 143.74, 145.41, 142.0],
    ['2023/07/03', 143.26, 144.66, 145.3, 143.26],
    ['2023/07/05', 142.62, 141.06, 143.63, 140.85],
    ['2023/07/06', 139.52, 138.51, 139.53, 137.17],
    ['2023/07/07', 139.01, 139.69, 140.82, 137.84],
    ['2023/07/10', 139.62, 141.64, 142.1, 139.52],
    ['2023/07/11', 141.91, 143.03, 143.83, 141.91],
    ['2023/07/12', 145.72, 144.59, 145.72, 143.65],
    ['2023/07/13', 145.47, 147.29, 147.29, 144.25],
    ['2023/07/14', 147.79, 149.97, 150.0, 146.28],
    ['2023/07/17', 149.95, 153.11, 153.12, 149.95],
    ['2023/07/18', 153.1, 155.93, 156.26, 153.1],
    ['2023/07/19', 155.08, 156.27, 156.97, 155.08],
    ['2023/07/20', 156.17, 156.33, 157.5, 153.46],
    ['2023/07/21', 157.15, 156.38, 157.23, 155.19],
    ['2023/07/24', 156.5, 157.4, 159.11, 156.5],
    ['2023/07/25', 157.19, 158.43, 159.2, 156.47],
    ['2023/07/26', 158.32, 159.23, 160.49, 158.1],
    ['2023/07/27', 159.79, 158.58, 160.49, 157.97],
    ['2023/07/28', 160.4, 160.06, 161.15, 158.71],
    ['2023/07/31', 160.78, 160.75, 162.34, 159.63],
    ['2023/08/01', 160.25, 162.84, 163.51, 160.25],
    ['2023/08/02', 162.54, 165.73, 166.14, 162.54],
    ['2023/08/03', 165.41, 165.82, 166.17, 164.43],
    ['2023/08/04', 165.82, 165.9, 168.13, 165.13],
]);
var volumes = [
    26200.0,
    24200.0,
    22700.0,
    17000.0,
    24800.0,
    26900.0,
    25600.0,
    22800.0,
    22800.0,
    41500.0,
    29400.0,
    24900.0,
    23300.0,
    17200.0,
    20200.0,
    16900.0,
    22500.0,
    30300.0,
    24900.0,
    18600.0,
    23900.0,
    26600.0,
    18200.0,
    17700.0,
    22100.0,
    27800.0,
    30200.0,
    34000.0,
    56500.0,
    28900.0,
    33000.0,
    42800.0,
    39600.0,
    29800.0,
    28200.0,
    35400.0,
    39500.0,
    40900.0,
    40700.0,
    31500.0,
    29100.0,
    23700.0,
    33200.0,
    28500.0,
    15200.0,
    19700.0,
    33300.0,
    34100.0,
    34600.0,
    35500.0,
    26700.0,
    28200.0,
    22400.0,
    23800.0,
    26200.0,
    29700.0,
    19900.0,
    38800.0,
    52500.0,
    33100.0,
    51300.0,
    26700.0,
    14700.0,
    13900.0,
    34600.0,
    49000.0,
    27600.0,
    60500.0,
    37200.0,
    25600.0,
    38700.0,
    23300.0,
    25500.0,
    32500.0,
    25600.0,
    29400.0,
    23500.0,
    17800.0,
    28700.0,
    26900.0,
    46700.0,
    27000.0,
    24700.0,
    30800.0,
    37600.0,
    39400.0,
    37800.0,
    41400.0,
    31700.0,
    57200.0,
    46700.0,
    46900.0,
    78400.0,
    47400.0,
    35600.0,
    70300.0,
    101700.0,
    40300.0,
    44000.0,
    62600.0,
    46600.0,
    38900.0,
    49200.0,
    51700.0,
    49400.0,
    71700.0,
    46500.0,
    58000.0,
    146600.0,
    55300.0,
    60000.0,
    73100.0,
    62400.0,
    56000.0,
    51700.0,
    48600.0,
    37100.0,
    58500.0,
    84000.0,
    80500.0,
    60800.0,
    60400.0,
    59700.0,
    50300.0,
    53900.0,
    49400.0,
    58900.0,
    42000.0,
    65800.0,
    50700.0,
    40700.0,
    56200.0,
    56500.0,
    46500.0,
    58900.0,
    64700.0,
    62200.0,
    80600.0,
    130800.0,
    99700.0,
    124800.0,
    66100.0,
    77900.0,
    46800.0,
    76400.0,
    79500.0,
    85300.0,
    128700.0,
    111600.0,
    144400.0,
    90300.0,
    104100.0,
    150400.0,
    292000.0,
    81600.0,
    129600.0,
    120400.0,
    111700.0,
    55500.0,
    51200.0,
    75000.0,
    77400.0,
    102000.0,
    99600.0,
    81000.0,
    70000.0,
    78100.0,
    72400.0,
    146100.0,
    71000.0,
    56000.0,
    53200.0,
    39100.0,
    40700.0,
    42700.0,
    100300.0,
    61800.0,
    52000.0,
    41800.0,
    54800.0,
    43500.0,
    32700.0,
    47500.0,
    48700.0,
    55300.0,
    48700.0,
    63100.0,
    36200.0,
    38200.0,
    127600.0,
    146400.0,
    64900.0,
    45300.0,
    69700.0,
    47900.0,
    48400.0,
    50600.0,
    49200.0,
    32100.0,
    26200.0,
    27700.0,
    44200.0,
    28600.0,
    23500.0,
    57900.0,
    37500.0,
    44100.0,
    36300.0,
    55900.0,
    46400.0,
    66800.0,
    29500.0,
    67300.0,
    47100.0,
    40600.0,
    42800.0,
    75000.0,
    37000.0,
    51900.0,
    41800.0,
    242700.0,
    50300.0,
    38700.0,
    44000.0,
    25500.0,
    64000.0,
    18900.0,
    26900.0,
    45100.0,
    40700.0,
    32400.0,
    36000.0,
    35400.0,
    78800.0,
    38900.0,
    53700.0,
    52500.0,
    46000.0,
    49700.0,
    36300.0,
    41000.0,
    41200.0,
    41300.0,
    60600.0,
    69900.0,
    42900.0,
    34800.0,
    44800.0,
    50400.0,
    63000.0,
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
        text: "AGM",
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