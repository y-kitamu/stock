/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_ACLS");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/08', 77.42, 75.5, 78.11, 73.26],
    ['2022/08/09', 73.29, 68.35, 73.38, 66.7],
    ['2022/08/10', 70.7, 70.73, 71.24, 68.54],
    ['2022/08/11', 71.31, 70.65, 73.38, 70.39],
    ['2022/08/12', 71.66, 76.87, 77.08, 71.44],
    ['2022/08/15', 76.89, 76.35, 77.69, 74.01],
    ['2022/08/16', 74.89, 71.69, 75.6, 71.46],
    ['2022/08/17', 70.4, 69.38, 70.57, 67.46],
    ['2022/08/18', 70.83, 75.19, 75.62, 69.65],
    ['2022/08/19', 73.46, 74.22, 74.33, 72.26],
    ['2022/08/22', 72.3, 70.68, 73.72, 70.29],
    ['2022/08/23', 70.81, 72.22, 73.0, 70.79],
    ['2022/08/24', 72.4, 72.39, 73.69, 70.84],
    ['2022/08/25', 72.75, 81.73, 82.59, 72.75],
    ['2022/08/26', 83.01, 72.29, 83.39, 71.63],
    ['2022/08/29', 70.56, 70.26, 72.25, 69.01],
    ['2022/08/30', 71.0, 67.35, 71.63, 65.68],
    ['2022/08/31', 67.58, 66.94, 67.58, 64.68],
    ['2022/09/01', 64.7, 63.55, 64.87, 61.4],
    ['2022/09/02', 64.32, 63.39, 65.69, 62.71],
    ['2022/09/06', 63.8, 62.16, 64.46, 61.9],
    ['2022/09/07', 62.15, 62.55, 63.07, 61.43],
    ['2022/09/08', 61.26, 64.19, 64.19, 60.7],
    ['2022/09/09', 65.0, 65.61, 66.13, 64.72],
    ['2022/09/12', 66.19, 66.32, 66.53, 64.41],
    ['2022/09/13', 62.79, 62.92, 64.23, 62.11],
    ['2022/09/14', 63.25, 63.15, 64.13, 61.83],
    ['2022/09/15', 62.35, 61.74, 63.29, 60.74],
    ['2022/09/16', 60.25, 61.25, 61.42, 59.09],
    ['2022/09/19', 60.11, 61.4, 62.18, 59.41],
    ['2022/09/20', 60.28, 61.34, 61.78, 59.99],
    ['2022/09/21', 61.43, 61.1, 63.59, 60.94],
    ['2022/09/22', 60.69, 58.47, 61.0, 57.88],
    ['2022/09/23', 57.5, 57.34, 58.01, 56.29],
    ['2022/09/26', 57.2, 57.57, 59.22, 57.2],
    ['2022/09/27', 59.65, 59.67, 60.65, 58.11],
    ['2022/09/28', 59.33, 62.58, 62.99, 58.89],
    ['2022/09/29', 61.95, 62.62, 62.7, 60.32],
    ['2022/09/30', 60.62, 60.56, 62.65, 59.04],
    ['2022/10/03', 61.63, 63.25, 64.38, 61.28],
    ['2022/10/04', 66.14, 66.95, 67.5, 65.0],
    ['2022/10/05', 65.5, 67.22, 67.83, 65.1],
    ['2022/10/06', 67.13, 66.48, 68.83, 66.23],
    ['2022/10/07', 64.04, 61.46, 64.54, 61.18],
    ['2022/10/10', 61.71, 59.29, 61.71, 56.94],
    ['2022/10/11', 57.98, 56.01, 58.84, 55.19],
    ['2022/10/12', 55.75, 54.08, 56.29, 53.75],
    ['2022/10/13', 51.9, 55.87, 57.22, 51.0],
    ['2022/10/14', 56.3, 51.71, 56.8, 51.55],
    ['2022/10/17', 53.2, 52.05, 54.0, 51.54],
    ['2022/10/18', 53.77, 50.79, 54.65, 49.78],
    ['2022/10/19', 50.66, 51.04, 51.89, 50.09],
    ['2022/10/20', 51.59, 53.18, 55.54, 51.59],
    ['2022/10/21', 53.3, 55.36, 55.63, 52.82],
    ['2022/10/24', 55.44, 55.43, 55.82, 53.71],
    ['2022/10/25', 55.75, 57.87, 59.3, 55.75],
    ['2022/10/26', 57.0, 58.65, 60.67, 56.02],
    ['2022/10/27', 59.29, 57.33, 60.05, 57.03],
    ['2022/10/28', 57.44, 59.87, 60.39, 57.34],
    ['2022/10/31', 59.16, 58.0, 59.63, 57.57],
    ['2022/11/01', 59.63, 58.76, 59.99, 58.74],
    ['2022/11/02', 58.8, 57.36, 60.67, 57.18],
    ['2022/11/03', 57.54, 59.84, 62.55, 57.11],
    ['2022/11/04', 62.33, 65.05, 65.14, 61.3],
    ['2022/11/07', 64.5, 69.17, 69.89, 64.49],
    ['2022/11/08', 70.84, 69.92, 71.27, 68.5],
    ['2022/11/09', 68.55, 69.83, 70.42, 67.62],
    ['2022/11/10', 73.11, 75.06, 75.21, 72.18],
    ['2022/11/11', 75.0, 77.09, 78.0, 74.6],
    ['2022/11/14', 75.64, 76.41, 78.0, 75.29],
    ['2022/11/15', 78.55, 78.1, 80.24, 77.7],
    ['2022/11/16', 76.4, 74.39, 76.4, 73.01],
    ['2022/11/17', 72.28, 76.51, 76.61, 71.43],
    ['2022/11/18', 78.35, 76.59, 78.77, 76.04],
    ['2022/11/21', 75.13, 77.16, 77.38, 75.07],
    ['2022/11/22', 77.74, 78.7, 78.72, 75.92],
    ['2022/11/23', 78.62, 79.07, 81.06, 78.59],
    ['2022/11/25', 78.17, 79.38, 79.59, 78.05],
    ['2022/11/28', 78.37, 76.69, 78.52, 75.97],
    ['2022/11/29', 76.99, 76.31, 78.77, 76.17],
    ['2022/11/30', 76.99, 79.86, 79.86, 74.21],
    ['2022/12/01', 80.37, 79.21, 80.5, 77.55],
    ['2022/12/02', 77.12, 78.76, 79.8, 76.61],
    ['2022/12/05', 78.58, 80.11, 80.21, 76.67],
    ['2022/12/06', 79.75, 78.04, 80.2, 77.25],
    ['2022/12/07', 77.0, 78.11, 79.09, 76.98],
    ['2022/12/08', 78.42, 81.93, 82.5, 77.68],
    ['2022/12/09', 81.08, 81.95, 82.5, 79.47],
    ['2022/12/12', 81.4, 83.34, 84.11, 81.02],
    ['2022/12/13', 86.6, 86.52, 88.73, 84.64],
    ['2022/12/14', 86.0, 85.41, 87.44, 84.44],
    ['2022/12/15', 83.1, 82.76, 84.39, 81.59],
    ['2022/12/16', 81.2, 81.43, 82.75, 80.2],
    ['2022/12/19', 80.83, 78.6, 81.43, 77.3],
    ['2022/12/20', 77.74, 80.48, 80.58, 77.32],
    ['2022/12/21', 81.42, 82.65, 83.25, 80.75],
    ['2022/12/22', 80.65, 80.43, 81.0, 75.73],
    ['2022/12/23', 79.59, 80.27, 80.67, 78.68],
    ['2022/12/27', 79.97, 79.22, 80.19, 78.59],
    ['2022/12/28', 78.36, 77.38, 79.73, 77.06],
    ['2022/12/29', 78.76, 79.37, 80.21, 78.67],
    ['2022/12/30', 78.05, 79.36, 79.49, 77.0],
    ['2023/01/03', 80.68, 78.2, 81.28, 76.97],
    ['2023/01/04', 79.69, 78.69, 80.33, 77.99],
    ['2023/01/05', 78.78, 82.42, 83.31, 78.56],
    ['2023/01/06', 83.78, 87.54, 88.81, 82.81],
    ['2023/01/09', 89.01, 92.24, 93.75, 89.01],
    ['2023/01/10', 91.5, 93.08, 94.54, 91.21],
    ['2023/01/11', 94.21, 95.44, 96.71, 92.51],
    ['2023/01/12', 96.5, 97.67, 99.23, 94.84],
    ['2023/01/13', 96.87, 100.51, 100.6, 96.19],
    ['2023/01/17', 100.5, 102.0, 102.13, 99.32],
    ['2023/01/18', 102.91, 102.02, 103.66, 100.39],
    ['2023/01/19', 100.5, 98.18, 101.3, 95.95],
    ['2023/01/20', 99.88, 102.31, 102.65, 98.34],
    ['2023/01/23', 102.75, 107.24, 109.5, 102.16],
    ['2023/01/24', 106.25, 107.88, 108.19, 105.01],
    ['2023/01/25', 105.52, 110.59, 111.75, 105.21],
    ['2023/01/26', 111.5, 113.73, 113.81, 107.81],
    ['2023/01/27', 112.28, 110.44, 112.75, 109.85],
    ['2023/01/30', 108.35, 107.83, 110.64, 106.76],
    ['2023/01/31', 107.22, 109.95, 110.91, 107.01],
    ['2023/02/01', 110.98, 115.15, 116.99, 110.44],
    ['2023/02/02', 116.32, 118.97, 120.34, 116.0],
    ['2023/02/03', 116.0, 118.04, 121.58, 116.0],
    ['2023/02/06', 116.04, 115.94, 117.49, 114.15],
    ['2023/02/07', 115.83, 118.73, 119.27, 114.03],
    ['2023/02/08', 118.61, 117.57, 120.71, 116.33],
    ['2023/02/09', 118.27, 124.41, 128.42, 115.0],
    ['2023/02/10', 123.7, 123.36, 124.77, 119.37],
    ['2023/02/13', 125.02, 128.33, 128.34, 121.7],
    ['2023/02/14', 126.46, 127.47, 129.71, 124.4],
    ['2023/02/15', 125.34, 128.85, 129.7, 124.51],
    ['2023/02/16', 126.27, 127.3, 129.53, 125.4],
    ['2023/02/17', 127.0, 121.93, 127.0, 118.5],
    ['2023/02/21', 118.78, 120.85, 122.35, 118.5],
    ['2023/02/22', 121.0, 122.28, 122.86, 119.77],
    ['2023/02/23', 126.0, 124.71, 127.14, 122.48],
    ['2023/02/24', 121.31, 123.47, 123.85, 120.5],
    ['2023/02/27', 125.34, 125.29, 126.9, 123.44],
    ['2023/02/28', 126.0, 128.54, 131.56, 125.42],
    ['2023/03/01', 129.72, 132.24, 132.98, 129.51],
    ['2023/03/02', 123.8, 129.17, 129.67, 108.43],
    ['2023/03/03', 129.34, 129.91, 130.44, 127.61],
    ['2023/03/06', 130.0, 128.85, 131.63, 127.44],
    ['2023/03/07', 128.94, 128.0, 130.43, 126.59],
    ['2023/03/08', 129.04, 131.09, 133.48, 128.91],
    ['2023/03/09', 130.88, 129.57, 135.96, 129.0],
    ['2023/03/10', 129.75, 123.69, 130.46, 122.77],
    ['2023/03/13', 119.77, 122.54, 125.77, 118.09],
    ['2023/03/14', 125.87, 128.84, 129.8, 125.5],
    ['2023/03/15', 125.76, 123.86, 127.84, 121.1],
    ['2023/03/16', 122.47, 129.96, 130.38, 122.04],
    ['2023/03/17', 130.02, 128.22, 131.94, 127.4],
    ['2023/03/20', 128.62, 131.51, 131.84, 128.11],
    ['2023/03/21', 133.63, 133.45, 136.26, 129.42],
    ['2023/03/22', 133.23, 131.41, 136.32, 131.21],
    ['2023/03/23', 133.21, 131.38, 136.38, 128.4],
    ['2023/03/24', 129.2, 128.69, 130.01, 125.59],
    ['2023/03/27', 130.3, 129.18, 131.2, 127.55],
    ['2023/03/28', 128.61, 124.73, 130.02, 122.89],
    ['2023/03/29', 127.36, 132.19, 132.57, 126.62],
    ['2023/03/30', 133.74, 133.44, 136.3, 132.35],
    ['2023/03/31', 132.61, 133.25, 135.25, 132.48],
    ['2023/04/03', 132.22, 132.42, 133.47, 128.73],
    ['2023/04/04', 132.58, 128.74, 132.58, 127.56],
    ['2023/04/05', 126.75, 126.92, 127.52, 124.19],
    ['2023/04/06', 125.36, 125.34, 128.11, 123.18],
    ['2023/04/10', 123.65, 127.28, 127.89, 123.4],
    ['2023/04/11', 127.83, 125.84, 129.59, 125.51],
    ['2023/04/12', 127.24, 124.8, 128.23, 123.94],
    ['2023/04/13', 125.37, 127.11, 127.93, 124.0],
    ['2023/04/14', 127.32, 127.68, 132.18, 126.3],
    ['2023/04/17', 125.69, 128.05, 128.55, 124.42],
    ['2023/04/18', 130.0, 128.97, 131.6, 127.77],
    ['2023/04/19', 127.24, 126.51, 128.0, 125.35],
    ['2023/04/20', 124.19, 125.34, 129.54, 123.47],
    ['2023/04/21', 124.34, 125.37, 125.98, 121.15],
    ['2023/04/24', 125.1, 126.0, 127.51, 123.14],
    ['2023/04/25', 124.19, 118.94, 125.08, 118.79],
    ['2023/04/26', 119.97, 118.01, 121.1, 117.44],
    ['2023/04/27', 117.82, 116.41, 118.01, 111.05],
    ['2023/04/28', 116.39, 118.3, 118.46, 115.54],
    ['2023/05/01', 119.0, 123.09, 123.44, 119.0],
    ['2023/05/02', 123.9, 121.73, 125.36, 121.28],
    ['2023/05/03', 122.06, 122.61, 124.83, 121.0],
    ['2023/05/04', 122.1, 113.54, 123.53, 105.28],
    ['2023/05/05', 114.78, 120.2, 121.01, 111.42],
    ['2023/05/08', 120.2, 120.04, 121.73, 117.76],
    ['2023/05/09', 118.33, 119.9, 120.29, 117.81],
    ['2023/05/10', 122.0, 126.24, 126.46, 120.71],
    ['2023/05/11', 125.0, 125.14, 126.05, 121.21],
    ['2023/05/12', 125.46, 122.11, 127.25, 121.22],
    ['2023/05/15', 122.44, 127.99, 128.55, 122.42],
    ['2023/05/16', 127.24, 129.92, 131.12, 125.63],
    ['2023/05/17', 130.86, 137.69, 138.3, 129.62],
    ['2023/05/18', 138.69, 144.52, 145.74, 138.48],
    ['2023/05/19', 144.82, 141.59, 145.88, 139.94],
    ['2023/05/22', 140.65, 143.98, 144.6, 140.48],
    ['2023/05/23', 142.93, 142.49, 145.13, 141.28],
    ['2023/05/24', 139.01, 141.05, 141.37, 136.53],
    ['2023/05/25', 148.0, 151.89, 153.33, 145.61],
    ['2023/05/26', 153.0, 160.96, 162.53, 152.26],
    ['2023/05/30', 166.07, 160.36, 167.36, 159.01],
    ['2023/05/31', 157.23, 157.55, 159.91, 155.4],
    ['2023/06/01', 157.86, 162.09, 164.29, 156.35],
    ['2023/06/02', 163.04, 162.36, 164.19, 157.12],
    ['2023/06/05', 160.31, 162.83, 164.78, 158.41],
    ['2023/06/06', 160.36, 165.09, 166.64, 160.0],
    ['2023/06/07', 166.71, 170.5, 175.0, 166.71],
    ['2023/06/08', 170.0, 173.28, 174.32, 169.32],
    ['2023/06/09', 175.0, 172.61, 176.89, 171.92],
    ['2023/06/12', 174.6, 180.89, 182.57, 173.93],
    ['2023/06/13', 182.28, 180.28, 184.41, 178.18],
    ['2023/06/14', 175.6, 172.92, 176.72, 169.39],
    ['2023/06/15', 169.4, 170.97, 173.37, 165.87],
    ['2023/06/16', 173.26, 169.08, 174.29, 167.3],
    ['2023/06/20', 168.77, 166.4, 171.1, 165.6],
    ['2023/06/21', 165.0, 165.86, 166.97, 162.78],
    ['2023/06/22', 164.69, 170.03, 172.22, 163.69],
    ['2023/06/23', 166.05, 168.47, 169.52, 165.0],
    ['2023/06/26', 169.6, 168.24, 175.42, 168.21],
    ['2023/06/27', 167.97, 174.17, 174.94, 167.69],
    ['2023/06/28', 170.54, 174.67, 177.56, 170.25],
    ['2023/06/29', 176.68, 179.03, 181.23, 175.17],
    ['2023/06/30', 181.01, 183.33, 186.68, 181.0],
    ['2023/07/03', 183.95, 181.74, 184.7, 179.0],
    ['2023/07/05', 181.37, 178.58, 182.57, 176.66],
    ['2023/07/06', 174.74, 172.99, 176.01, 171.09],
    ['2023/07/07', 172.99, 173.07, 177.37, 172.54],
    ['2023/07/10', 172.74, 177.93, 178.79, 171.95],
    ['2023/07/11', 178.97, 174.12, 180.0, 170.64],
    ['2023/07/12', 177.4, 175.35, 177.8, 173.28],
    ['2023/07/13', 176.88, 182.07, 184.29, 176.88],
    ['2023/07/14', 182.76, 179.85, 186.19, 178.18],
    ['2023/07/17', 183.01, 192.27, 193.61, 181.94],
    ['2023/07/18', 191.55, 191.62, 192.42, 185.74],
    ['2023/07/19', 191.62, 185.18, 191.97, 181.83],
    ['2023/07/20', 181.02, 175.81, 182.38, 173.53],
    ['2023/07/21', 178.78, 175.52, 180.14, 174.35],
    ['2023/07/24', 175.79, 174.47, 178.23, 171.34],
    ['2023/07/25', 175.01, 177.91, 181.81, 175.01],
    ['2023/07/26', 176.28, 176.56, 178.64, 173.0],
    ['2023/07/27', 182.5, 182.75, 186.97, 181.27],
    ['2023/07/28', 186.53, 192.9, 193.69, 185.31],
    ['2023/07/31', 194.51, 200.48, 200.73, 194.51],
    ['2023/08/01', 196.4, 196.21, 201.0, 193.53],
    ['2023/08/02', 193.28, 189.02, 194.45, 185.37],
    ['2023/08/03', 187.96, 186.61, 195.95, 183.22],
    ['2023/08/04', 185.0, 175.74, 185.31, 172.3],
]);
var volumes = [
    494200.0,
    852700.0,
    553000.0,
    476100.0,
    747200.0,
    700600.0,
    601700.0,
    505300.0,
    651900.0,
    438800.0,
    399200.0,
    341300.0,
    430200.0,
    1925100.0,
    1640400.0,
    790400.0,
    883800.0,
    481500.0,
    741900.0,
    364400.0,
    426100.0,
    282400.0,
    383600.0,
    354100.0,
    343000.0,
    327600.0,
    209800.0,
    230800.0,
    489500.0,
    248600.0,
    221500.0,
    237300.0,
    301500.0,
    356200.0,
    343500.0,
    334900.0,
    397800.0,
    314400.0,
    627700.0,
    277500.0,
    343700.0,
    607500.0,
    262900.0,
    381200.0,
    357000.0,
    519500.0,
    387900.0,
    485700.0,
    462500.0,
    504900.0,
    749100.0,
    528600.0,
    409800.0,
    273500.0,
    241600.0,
    347500.0,
    302500.0,
    258800.0,
    214500.0,
    296100.0,
    293200.0,
    383500.0,
    582100.0,
    593800.0,
    580700.0,
    380100.0,
    302400.0,
    572900.0,
    343500.0,
    361400.0,
    315300.0,
    402700.0,
    422400.0,
    261100.0,
    450800.0,
    428300.0,
    330800.0,
    93600.0,
    277800.0,
    316200.0,
    376500.0,
    245800.0,
    217600.0,
    303200.0,
    455500.0,
    220900.0,
    432600.0,
    355400.0,
    401700.0,
    551100.0,
    388100.0,
    520800.0,
    775600.0,
    525000.0,
    346600.0,
    312700.0,
    719200.0,
    234100.0,
    178600.0,
    157100.0,
    211700.0,
    230100.0,
    375500.0,
    324900.0,
    499800.0,
    565900.0,
    779100.0,
    484700.0,
    702000.0,
    514900.0,
    406800.0,
    416300.0,
    739900.0,
    560500.0,
    447000.0,
    608100.0,
    384000.0,
    519100.0,
    481400.0,
    432100.0,
    552300.0,
    506200.0,
    757200.0,
    681200.0,
    666300.0,
    599500.0,
    665700.0,
    645700.0,
    1116400.0,
    659500.0,
    747500.0,
    761600.0,
    525000.0,
    516100.0,
    1158500.0,
    741900.0,
    504000.0,
    605700.0,
    490500.0,
    358700.0,
    860300.0,
    582100.0,
    2025400.0,
    562800.0,
    495900.0,
    443300.0,
    505600.0,
    893600.0,
    844700.0,
    716600.0,
    663800.0,
    672800.0,
    625600.0,
    993500.0,
    613800.0,
    664900.0,
    496300.0,
    877700.0,
    586000.0,
    540700.0,
    587700.0,
    634600.0,
    394100.0,
    368200.0,
    387900.0,
    330300.0,
    546300.0,
    398600.0,
    582700.0,
    442100.0,
    380800.0,
    403000.0,
    589600.0,
    427200.0,
    364900.0,
    292000.0,
    624800.0,
    584200.0,
    362700.0,
    569500.0,
    379900.0,
    789400.0,
    337400.0,
    495100.0,
    458000.0,
    474500.0,
    1422800.0,
    575700.0,
    295500.0,
    369300.0,
    493400.0,
    431600.0,
    386500.0,
    476000.0,
    581700.0,
    604400.0,
    682200.0,
    463100.0,
    459100.0,
    434200.0,
    515700.0,
    712900.0,
    711200.0,
    543400.0,
    680200.0,
    651400.0,
    356900.0,
    488400.0,
    392200.0,
    707500.0,
    395600.0,
    376900.0,
    604200.0,
    504100.0,
    981100.0,
    685100.0,
    912200.0,
    660200.0,
    609200.0,
    427300.0,
    503800.0,
    538500.0,
    419400.0,
    442200.0,
    458400.0,
    725600.0,
    314200.0,
    475000.0,
    441300.0,
    341900.0,
    362200.0,
    460900.0,
    487700.0,
    470200.0,
    440600.0,
    845600.0,
    461600.0,
    550600.0,
    709900.0,
    380700.0,
    430000.0,
    390000.0,
    214400.0,
    498400.0,
    768000.0,
    776700.0,
    695300.0,
    768000.0,
    765000.0,
    814700.0,
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
        text: "ACLS",
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