/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_CLH");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/03', 106.41, 108.15, 110.64, 105.63],
    ['2022/08/04', 109.95, 106.92, 112.35, 106.48],
    ['2022/08/05', 106.11, 110.09, 110.1, 106.05],
    ['2022/08/08', 111.0, 111.74, 113.19, 111.0],
    ['2022/08/09', 111.96, 109.69, 112.08, 108.91],
    ['2022/08/10', 111.1, 112.65, 113.1, 110.82],
    ['2022/08/11', 114.21, 114.98, 115.87, 113.2],
    ['2022/08/12', 116.23, 118.79, 118.92, 114.81],
    ['2022/08/15', 118.11, 116.33, 118.33, 115.87],
    ['2022/08/16', 115.02, 118.13, 118.16, 115.02],
    ['2022/08/17', 116.68, 117.48, 118.0, 116.68],
    ['2022/08/18', 117.37, 118.22, 118.39, 116.8],
    ['2022/08/19', 117.55, 117.04, 117.64, 116.16],
    ['2022/08/22', 114.97, 115.01, 116.15, 114.24],
    ['2022/08/23', 115.23, 117.32, 117.9, 114.5],
    ['2022/08/24', 117.7, 122.28, 122.82, 117.38],
    ['2022/08/25', 122.8, 122.34, 124.33, 121.6],
    ['2022/08/26', 122.36, 118.95, 122.57, 118.76],
    ['2022/08/29', 117.78, 119.03, 120.33, 117.28],
    ['2022/08/30', 119.45, 117.73, 119.67, 116.41],
    ['2022/08/31', 117.7, 117.42, 118.89, 117.19],
    ['2022/09/01', 116.52, 116.51, 118.12, 115.15],
    ['2022/09/02', 118.77, 116.78, 120.14, 116.18],
    ['2022/09/06', 116.75, 116.32, 117.57, 115.26],
    ['2022/09/07', 115.84, 119.62, 120.07, 115.53],
    ['2022/09/08', 118.98, 121.82, 122.31, 118.76],
    ['2022/09/09', 122.46, 122.41, 123.34, 121.66],
    ['2022/09/12', 123.44, 123.66, 124.49, 123.15],
    ['2022/09/13', 120.98, 119.78, 122.4, 119.78],
    ['2022/09/14', 120.08, 120.57, 122.07, 119.54],
    ['2022/09/15', 120.12, 120.31, 121.56, 119.53],
    ['2022/09/16', 118.67, 115.99, 118.67, 114.41],
    ['2022/09/19', 114.35, 118.09, 118.12, 114.21],
    ['2022/09/20', 117.59, 116.55, 117.92, 115.57],
    ['2022/09/21', 117.39, 115.7, 118.78, 115.58],
    ['2022/09/22', 115.61, 112.46, 116.08, 110.69],
    ['2022/09/23', 110.57, 109.62, 111.16, 108.1],
    ['2022/09/26', 109.08, 107.65, 109.81, 106.92],
    ['2022/09/27', 108.84, 107.8, 110.02, 106.71],
    ['2022/09/28', 108.48, 111.85, 112.69, 107.78],
    ['2022/09/29', 110.5, 109.35, 110.56, 108.31],
    ['2022/09/30', 109.49, 109.98, 112.22, 109.15],
    ['2022/10/03', 111.45, 115.03, 115.23, 111.02],
    ['2022/10/04', 117.03, 117.1, 119.18, 117.02],
    ['2022/10/05', 115.64, 119.13, 119.44, 114.82],
    ['2022/10/06', 118.51, 118.41, 119.42, 116.49],
    ['2022/10/07', 117.49, 115.94, 117.6, 115.0],
    ['2022/10/10', 116.26, 114.77, 116.47, 113.71],
    ['2022/10/11', 114.01, 114.15, 115.77, 112.9],
    ['2022/10/12', 114.56, 112.46, 114.56, 111.98],
    ['2022/10/13', 110.27, 115.98, 116.55, 109.07],
    ['2022/10/14', 117.18, 114.36, 117.96, 113.6],
    ['2022/10/17', 116.45, 114.86, 116.68, 113.92],
    ['2022/10/18', 117.33, 118.95, 119.18, 116.04],
    ['2022/10/19', 118.52, 117.45, 119.57, 116.86],
    ['2022/10/20', 117.03, 115.42, 117.41, 114.6],
    ['2022/10/21', 115.53, 118.55, 118.83, 113.82],
    ['2022/10/24', 119.27, 118.5, 120.82, 117.64],
    ['2022/10/25', 118.36, 118.6, 120.18, 117.89],
    ['2022/10/26', 119.55, 117.99, 119.82, 117.05],
    ['2022/10/27', 119.21, 119.5, 121.68, 118.23],
    ['2022/10/28', 119.74, 122.88, 123.98, 119.16],
    ['2022/10/31', 122.18, 122.46, 123.28, 120.82],
    ['2022/11/01', 123.72, 121.47, 123.8, 121.11],
    ['2022/11/02', 122.0, 119.22, 122.97, 115.9],
    ['2022/11/03', 116.84, 111.73, 117.49, 110.85],
    ['2022/11/04', 113.72, 111.93, 115.64, 111.44],
    ['2022/11/07', 112.53, 111.44, 113.33, 110.06],
    ['2022/11/08', 111.88, 114.72, 115.04, 111.3],
    ['2022/11/09', 113.27, 112.29, 114.99, 112.22],
    ['2022/11/10', 116.99, 118.35, 118.35, 115.5],
    ['2022/11/11', 119.31, 115.56, 119.74, 115.52],
    ['2022/11/14', 115.02, 111.18, 116.02, 111.09],
    ['2022/11/15', 112.75, 111.86, 113.47, 111.18],
    ['2022/11/16', 111.75, 115.7, 115.82, 111.71],
    ['2022/11/17', 114.74, 116.33, 117.63, 113.83],
    ['2022/11/18', 117.66, 117.0, 118.25, 114.66],
    ['2022/11/21', 116.83, 118.03, 118.25, 116.07],
    ['2022/11/22', 118.93, 120.72, 120.92, 118.35],
    ['2022/11/23', 120.74, 122.62, 122.78, 120.66],
    ['2022/11/25', 122.13, 123.37, 123.37, 122.13],
    ['2022/11/28', 122.58, 119.63, 123.22, 119.46],
    ['2022/11/29', 118.89, 115.46, 119.68, 114.86],
    ['2022/11/30', 115.31, 120.0, 120.12, 115.31],
    ['2022/12/01', 120.97, 120.7, 122.07, 119.57],
    ['2022/12/02', 119.37, 124.02, 125.41, 119.37],
    ['2022/12/05', 122.79, 117.6, 123.5, 117.41],
    ['2022/12/06', 117.6, 117.13, 118.62, 115.7],
    ['2022/12/07', 117.17, 118.77, 119.81, 116.76],
    ['2022/12/08', 119.03, 118.49, 119.84, 117.31],
    ['2022/12/09', 118.56, 116.16, 119.1, 116.12],
    ['2022/12/12', 116.7, 118.16, 118.23, 116.41],
    ['2022/12/13', 122.39, 120.2, 122.68, 118.23],
    ['2022/12/14', 119.4, 118.76, 120.62, 118.27],
    ['2022/12/15', 117.77, 116.5, 118.24, 116.01],
    ['2022/12/16', 115.27, 115.0, 116.47, 114.45],
    ['2022/12/19', 114.64, 112.55, 114.64, 109.36],
    ['2022/12/20', 112.23, 112.95, 113.74, 111.47],
    ['2022/12/21', 114.1, 116.31, 116.32, 113.07],
    ['2022/12/22', 115.26, 113.61, 115.26, 112.47],
    ['2022/12/23', 113.58, 114.78, 114.91, 112.8],
    ['2022/12/27', 114.68, 114.99, 115.04, 113.89],
    ['2022/12/28', 115.39, 113.14, 115.49, 113.0],
    ['2022/12/29', 113.83, 115.09, 115.76, 113.47],
    ['2022/12/30', 113.99, 114.12, 115.03, 113.13],
    ['2023/01/03', 114.92, 113.74, 115.63, 112.64],
    ['2023/01/04', 114.06, 113.29, 114.92, 112.13],
    ['2023/01/05', 112.69, 111.02, 113.5, 110.96],
    ['2023/01/06', 111.92, 115.05, 115.77, 111.18],
    ['2023/01/09', 116.17, 117.16, 118.61, 115.65],
    ['2023/01/10', 115.74, 116.2, 116.22, 113.57],
    ['2023/01/11', 116.96, 119.71, 120.44, 116.8],
    ['2023/01/12', 120.09, 118.64, 120.23, 117.87],
    ['2023/01/13', 117.96, 121.38, 121.83, 117.0],
    ['2023/01/17', 121.29, 122.5, 122.98, 120.73],
    ['2023/01/18', 122.57, 121.99, 124.47, 121.0],
    ['2023/01/19', 120.95, 121.58, 122.71, 120.95],
    ['2023/01/20', 122.19, 124.81, 124.9, 122.03],
    ['2023/01/23', 125.0, 128.2, 128.94, 124.8],
    ['2023/01/24', 128.29, 128.36, 130.13, 127.52],
    ['2023/01/25', 127.73, 129.43, 129.5, 127.12],
    ['2023/01/26', 130.25, 127.72, 131.08, 126.68],
    ['2023/01/27', 127.3, 127.39, 128.12, 126.81],
    ['2023/01/30', 126.89, 128.27, 129.53, 126.53],
    ['2023/01/31', 129.19, 130.3, 130.31, 128.31],
    ['2023/02/01', 129.09, 130.59, 131.35, 128.01],
    ['2023/02/02', 131.07, 130.89, 131.58, 129.83],
    ['2023/02/03', 130.19, 131.91, 132.63, 129.3],
    ['2023/02/06', 130.95, 131.16, 132.32, 130.72],
    ['2023/02/07', 130.58, 132.65, 133.2, 130.11],
    ['2023/02/08', 131.99, 133.75, 134.5, 131.99],
    ['2023/02/09', 133.93, 132.98, 134.33, 132.35],
    ['2023/02/10', 132.64, 134.14, 134.47, 132.05],
    ['2023/02/13', 134.27, 134.27, 135.0, 133.79],
    ['2023/02/14', 133.59, 133.34, 135.1, 132.71],
    ['2023/02/15', 132.05, 133.41, 135.07, 131.54],
    ['2023/02/16', 132.2, 134.81, 136.48, 132.2],
    ['2023/02/17', 134.87, 134.73, 135.69, 133.59],
    ['2023/02/21', 134.01, 133.31, 135.17, 132.64],
    ['2023/02/22', 133.45, 134.68, 136.74, 133.29],
    ['2023/02/23', 135.02, 133.48, 135.63, 131.43],
    ['2023/02/24', 132.59, 132.17, 133.18, 130.93],
    ['2023/02/27', 133.0, 133.09, 134.51, 131.8],
    ['2023/02/28', 132.94, 132.07, 133.57, 131.05],
    ['2023/03/01', 129.87, 133.31, 133.83, 125.57],
    ['2023/03/02', 135.25, 136.31, 137.28, 133.4],
    ['2023/03/03', 135.75, 136.47, 136.81, 134.4],
    ['2023/03/06', 136.33, 135.02, 136.99, 134.96],
    ['2023/03/07', 135.4, 136.03, 136.15, 133.91],
    ['2023/03/08', 136.32, 138.23, 138.99, 136.32],
    ['2023/03/09', 138.7, 137.59, 140.69, 137.29],
    ['2023/03/10', 137.37, 134.49, 137.57, 133.98],
    ['2023/03/13', 133.06, 130.16, 134.25, 130.07],
    ['2023/03/14', 132.0, 136.4, 137.01, 131.43],
    ['2023/03/15', 134.55, 133.07, 135.02, 131.08],
    ['2023/03/16', 132.22, 135.98, 136.44, 131.64],
    ['2023/03/17', 136.1, 134.32, 136.57, 133.45],
    ['2023/03/20', 134.73, 135.02, 136.59, 134.38],
    ['2023/03/21', 136.83, 137.89, 139.45, 136.06],
    ['2023/03/22', 137.36, 133.63, 137.99, 133.41],
    ['2023/03/23', 133.46, 132.72, 136.0, 131.89],
    ['2023/03/24', 131.99, 131.11, 131.99, 129.93],
    ['2023/03/27', 132.27, 132.28, 134.44, 132.01],
    ['2023/03/28', 131.87, 133.0, 133.67, 131.87],
    ['2023/03/29', 134.14, 135.15, 135.98, 133.52],
    ['2023/03/30', 136.2, 138.76, 139.86, 135.19],
    ['2023/03/31', 139.99, 142.56, 144.2, 138.49],
    ['2023/04/03', 141.8, 140.92, 143.79, 139.87],
    ['2023/04/04', 141.47, 136.25, 141.47, 135.7],
    ['2023/04/05', 135.89, 134.07, 136.19, 132.96],
    ['2023/04/06', 134.96, 133.94, 135.71, 133.27],
    ['2023/04/10', 133.39, 137.05, 137.14, 133.39],
    ['2023/04/11', 137.25, 138.4, 139.29, 136.51],
    ['2023/04/12', 139.17, 140.89, 141.59, 139.17],
    ['2023/04/13', 141.83, 143.63, 143.79, 141.46],
    ['2023/04/14', 143.48, 143.54, 144.79, 142.76],
    ['2023/04/17', 143.54, 143.31, 145.04, 142.35],
    ['2023/04/18', 145.53, 143.2, 146.05, 143.14],
    ['2023/04/19', 142.96, 144.27, 145.55, 142.44],
    ['2023/04/20', 143.68, 144.06, 146.03, 142.79],
    ['2023/04/21', 143.96, 143.92, 145.68, 143.24],
    ['2023/04/24', 143.82, 144.27, 145.71, 143.82],
    ['2023/04/25', 144.18, 142.22, 144.18, 141.81],
    ['2023/04/26', 141.72, 142.3, 142.62, 140.68],
    ['2023/04/27', 142.65, 144.26, 144.51, 141.3],
    ['2023/04/28', 143.63, 145.16, 145.76, 143.63],
    ['2023/05/01', 145.16, 146.15, 147.76, 145.16],
    ['2023/05/02', 145.62, 146.06, 146.44, 144.01],
    ['2023/05/03', 144.33, 137.51, 144.69, 129.7],
    ['2023/05/04', 137.39, 136.54, 138.35, 135.88],
    ['2023/05/05', 136.87, 135.7, 138.13, 135.29],
    ['2023/05/08', 136.54, 136.77, 137.16, 134.39],
    ['2023/05/09', 136.67, 139.04, 139.49, 136.14],
    ['2023/05/10', 140.56, 139.2, 141.52, 137.92],
    ['2023/05/11', 138.78, 139.96, 140.22, 137.09],
    ['2023/05/12', 140.05, 138.51, 140.73, 137.53],
    ['2023/05/15', 138.6, 139.53, 140.39, 137.99],
    ['2023/05/16', 138.81, 140.6, 141.15, 137.07],
    ['2023/05/17', 141.75, 141.5, 142.18, 140.6],
    ['2023/05/18', 140.62, 140.08, 141.22, 138.55],
    ['2023/05/19', 141.13, 138.65, 141.33, 138.35],
    ['2023/05/22', 139.32, 145.62, 146.15, 138.79],
    ['2023/05/23', 144.54, 143.81, 144.54, 141.45],
    ['2023/05/24', 143.56, 144.6, 145.47, 142.57],
    ['2023/05/25', 145.0, 143.78, 145.47, 142.61],
    ['2023/05/26', 143.99, 145.08, 145.39, 143.67],
    ['2023/05/30', 145.28, 144.17, 145.95, 142.18],
    ['2023/05/31', 143.79, 140.4, 144.64, 139.14],
    ['2023/06/01', 141.1, 143.49, 143.55, 140.69],
    ['2023/06/02', 144.21, 150.91, 151.3, 144.21],
    ['2023/06/05', 149.56, 149.06, 150.5, 146.16],
    ['2023/06/06', 149.29, 153.28, 153.87, 149.06],
    ['2023/06/07', 153.83, 156.08, 156.47, 153.45],
    ['2023/06/08', 155.43, 157.36, 158.72, 154.82],
    ['2023/06/09', 157.0, 156.38, 157.39, 153.38],
    ['2023/06/12', 156.11, 157.62, 158.39, 154.97],
    ['2023/06/13', 157.68, 155.36, 158.32, 155.05],
    ['2023/06/14', 154.98, 153.97, 157.26, 153.27],
    ['2023/06/15', 153.83, 156.02, 156.42, 152.92],
    ['2023/06/16', 156.83, 156.67, 157.03, 155.12],
    ['2023/06/20', 155.81, 158.19, 159.19, 154.79],
    ['2023/06/21', 157.76, 159.54, 160.5, 156.29],
    ['2023/06/22', 158.63, 154.26, 158.98, 153.2],
    ['2023/06/23', 153.78, 155.42, 156.65, 152.14],
    ['2023/06/26', 155.08, 156.11, 156.83, 153.81],
    ['2023/06/27', 156.65, 158.17, 159.56, 156.43],
    ['2023/06/28', 157.87, 160.02, 160.2, 157.52],
    ['2023/06/29', 160.04, 162.04, 162.89, 159.69],
    ['2023/06/30', 163.61, 164.43, 164.8, 162.82],
    ['2023/07/03', 163.49, 163.17, 164.57, 162.7],
    ['2023/07/05', 162.26, 165.02, 165.88, 160.37],
    ['2023/07/06', 163.82, 164.2, 165.55, 162.36],
    ['2023/07/07', 163.47, 167.68, 168.87, 163.47],
    ['2023/07/10', 167.31, 171.87, 172.08, 165.87],
    ['2023/07/11', 172.02, 168.08, 172.54, 166.7],
    ['2023/07/12', 169.56, 166.13, 170.74, 166.07],
    ['2023/07/13', 166.36, 165.38, 167.27, 164.63],
    ['2023/07/14', 165.67, 165.27, 165.67, 163.09],
    ['2023/07/17', 165.63, 167.22, 167.75, 165.0],
    ['2023/07/18', 166.55, 165.56, 167.57, 164.88],
    ['2023/07/19', 166.47, 165.54, 166.5, 163.32],
    ['2023/07/20', 165.28, 170.08, 170.73, 165.19],
    ['2023/07/21', 171.04, 169.14, 171.04, 168.95],
    ['2023/07/24', 169.14, 169.32, 170.26, 168.86],
    ['2023/07/25', 169.11, 170.0, 170.86, 167.97],
    ['2023/07/26', 169.0, 167.48, 170.08, 167.28],
    ['2023/07/27', 168.03, 165.49, 168.1, 164.65],
    ['2023/07/28', 166.59, 165.19, 167.04, 164.39],
    ['2023/07/31', 165.62, 166.26, 167.05, 164.64],
    ['2023/08/01', 166.47, 166.74, 169.27, 165.9],
    ['2023/08/02', 165.67, 167.8, 174.1, 164.38],
]);
var volumes = [
    821300.0,
    836200.0,
    474800.0,
    451800.0,
    327600.0,
    439900.0,
    435100.0,
    684400.0,
    337100.0,
    275600.0,
    225100.0,
    230300.0,
    193000.0,
    250500.0,
    380500.0,
    643100.0,
    361100.0,
    294000.0,
    234200.0,
    198300.0,
    283200.0,
    380300.0,
    282800.0,
    264600.0,
    489500.0,
    503800.0,
    379900.0,
    445600.0,
    433400.0,
    588200.0,
    467100.0,
    839500.0,
    328600.0,
    343200.0,
    349000.0,
    523300.0,
    656500.0,
    404900.0,
    377600.0,
    370300.0,
    458900.0,
    415500.0,
    689200.0,
    368100.0,
    662800.0,
    422100.0,
    381100.0,
    436300.0,
    378500.0,
    226900.0,
    314600.0,
    428600.0,
    424300.0,
    357200.0,
    327900.0,
    484100.0,
    260200.0,
    286500.0,
    313700.0,
    278600.0,
    338000.0,
    450200.0,
    592500.0,
    688200.0,
    878500.0,
    882500.0,
    505300.0,
    392800.0,
    417700.0,
    368100.0,
    506900.0,
    460500.0,
    444300.0,
    410000.0,
    422300.0,
    514700.0,
    365700.0,
    224500.0,
    297700.0,
    225400.0,
    117900.0,
    601700.0,
    523600.0,
    501700.0,
    331000.0,
    380500.0,
    341400.0,
    336100.0,
    255000.0,
    257000.0,
    225800.0,
    292100.0,
    402200.0,
    281700.0,
    316700.0,
    994000.0,
    519400.0,
    279700.0,
    220900.0,
    172000.0,
    119900.0,
    91100.0,
    153500.0,
    193700.0,
    127100.0,
    301100.0,
    246700.0,
    206600.0,
    213800.0,
    236700.0,
    237000.0,
    349400.0,
    194200.0,
    238000.0,
    302600.0,
    498700.0,
    259800.0,
    309000.0,
    433500.0,
    332000.0,
    248200.0,
    235600.0,
    153100.0,
    287600.0,
    305900.0,
    227200.0,
    319000.0,
    357700.0,
    423400.0,
    346200.0,
    399700.0,
    384900.0,
    199400.0,
    222700.0,
    265600.0,
    363400.0,
    335100.0,
    176400.0,
    190800.0,
    469300.0,
    522200.0,
    748900.0,
    469700.0,
    518300.0,
    527500.0,
    565700.0,
    379500.0,
    462100.0,
    473200.0,
    689300.0,
    441100.0,
    925700.0,
    632800.0,
    644900.0,
    823700.0,
    392600.0,
    745200.0,
    313600.0,
    400700.0,
    477500.0,
    298400.0,
    436200.0,
    342300.0,
    326100.0,
    418600.0,
    500900.0,
    671800.0,
    468400.0,
    277600.0,
    374200.0,
    420200.0,
    263300.0,
    463900.0,
    280600.0,
    288800.0,
    309400.0,
    248800.0,
    295900.0,
    385600.0,
    325400.0,
    344000.0,
    250100.0,
    177000.0,
    413600.0,
    382800.0,
    204400.0,
    272300.0,
    327100.0,
    1519800.0,
    473900.0,
    481300.0,
    381200.0,
    346700.0,
    280600.0,
    289500.0,
    208900.0,
    250100.0,
    449100.0,
    241300.0,
    192200.0,
    184100.0,
    466200.0,
    400200.0,
    310000.0,
    368000.0,
    501500.0,
    386400.0,
    648700.0,
    307300.0,
    502400.0,
    267300.0,
    542300.0,
    421600.0,
    417700.0,
    448200.0,
    287000.0,
    343800.0,
    644300.0,
    322000.0,
    576700.0,
    417500.0,
    341600.0,
    530200.0,
    628900.0,
    305500.0,
    239900.0,
    383700.0,
    387100.0,
    359600.0,
    223100.0,
    404300.0,
    321000.0,
    490800.0,
    410400.0,
    670600.0,
    451400.0,
    289500.0,
    228800.0,
    173200.0,
    209000.0,
    371000.0,
    506100.0,
    503100.0,
    310400.0,
    243200.0,
    307300.0,
    324200.0,
    304400.0,
    284300.0,
    385900.0,
    593400.0,
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
        text: "CLH",
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