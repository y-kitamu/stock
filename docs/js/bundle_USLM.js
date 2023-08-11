/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_USLM");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/12', 106.52, 105.2, 111.81, 104.31],
    ['2022/08/15', 104.99, 108.48, 111.29, 104.99],
    ['2022/08/16', 107.74, 105.26, 108.77, 105.26],
    ['2022/08/17', 106.11, 103.48, 106.22, 103.48],
    ['2022/08/18', 104.0, 106.99, 107.76, 104.0],
    ['2022/08/19', 105.1, 106.3, 107.0, 104.23],
    ['2022/08/22', 107.0, 107.65, 109.4, 107.0],
    ['2022/08/23', 111.67, 107.6, 111.67, 107.6],
    ['2022/08/24', 107.99, 107.51, 109.91, 107.24],
    ['2022/08/25', 107.78, 108.49, 108.98, 107.68],
    ['2022/08/26', 109.18, 107.72, 109.54, 106.67],
    ['2022/08/29', 106.86, 107.1, 108.56, 106.47],
    ['2022/08/30', 107.43, 104.54, 107.43, 104.54],
    ['2022/08/31', 105.02, 102.79, 105.02, 102.79],
    ['2022/09/01', 102.8, 105.45, 105.45, 102.8],
    ['2022/09/02', 107.0, 104.52, 109.55, 104.52],
    ['2022/09/06', 104.23, 105.02, 107.3, 104.1],
    ['2022/09/07', 107.81, 106.82, 107.81, 104.91],
    ['2022/09/08', 105.92, 105.95, 105.95, 105.65],
    ['2022/09/09', 107.62, 105.39, 107.62, 104.64],
    ['2022/09/12', 106.77, 107.72, 107.72, 106.58],
    ['2022/09/13', 108.0, 106.0, 108.25, 105.68],
    ['2022/09/14', 105.09, 103.62, 106.11, 103.62],
    ['2022/09/15', 104.35, 105.77, 106.5, 104.35],
    ['2022/09/16', 105.4, 106.41, 106.41, 105.16],
    ['2022/09/19', 104.79, 107.69, 107.69, 104.79],
    ['2022/09/20', 106.21, 108.14, 108.25, 105.81],
    ['2022/09/21', 109.04, 108.93, 109.04, 108.75],
    ['2022/09/22', 107.15, 106.26, 107.15, 106.03],
    ['2022/09/23', 103.1, 103.5, 104.11, 102.79],
    ['2022/09/26', 103.95, 104.49, 104.49, 103.95],
    ['2022/09/27', 104.94, 102.7, 104.94, 102.7],
    ['2022/09/28', 103.8, 104.12, 105.4, 103.76],
    ['2022/09/29', 102.85, 103.12, 103.12, 102.12],
    ['2022/09/30', 103.97, 102.2, 106.0, 102.2],
    ['2022/10/03', 105.09, 106.1, 106.1, 105.09],
    ['2022/10/04', 106.0, 106.4, 106.4, 106.0],
    ['2022/10/05', 106.4, 105.9, 106.4, 105.9],
    ['2022/10/06', 107.45, 107.45, 107.45, 107.45],
    ['2022/10/07', 107.3, 105.66, 107.3, 105.66],
    ['2022/10/10', 108.24, 106.31, 108.24, 106.31],
    ['2022/10/11', 106.0, 105.92, 106.0, 105.92],
    ['2022/10/12', 107.4, 107.4, 107.4, 107.4],
    ['2022/10/13', 106.59, 107.99, 109.7, 106.59],
    ['2022/10/14', 105.43, 106.0, 106.81, 105.02],
    ['2022/10/17', 108.0, 108.92, 108.99, 108.0],
    ['2022/10/18', 110.0, 109.19, 110.0, 109.12],
    ['2022/10/19', 107.28, 108.9, 108.9, 106.29],
    ['2022/10/20', 108.9, 107.51, 108.9, 106.9],
    ['2022/10/21', 108.06, 112.83, 112.83, 107.96],
    ['2022/10/24', 108.11, 116.25, 116.25, 108.11],
    ['2022/10/25', 115.5, 118.19, 118.19, 115.5],
    ['2022/10/26', 120.0, 119.11, 120.0, 118.82],
    ['2022/10/27', 120.0, 119.03, 120.86, 119.03],
    ['2022/10/28', 125.24, 126.5, 126.5, 125.24],
    ['2022/10/31', 125.98, 126.15, 126.15, 124.52],
    ['2022/11/01', 126.06, 126.63, 129.0, 124.34],
    ['2022/11/02', 123.93, 127.19, 128.81, 123.93],
    ['2022/11/03', 131.3, 129.6, 136.73, 129.6],
    ['2022/11/04', 130.0, 131.89, 131.89, 130.0],
    ['2022/11/07', 130.95, 130.55, 130.95, 127.41],
    ['2022/11/08', 130.52, 130.98, 131.1, 130.01],
    ['2022/11/09', 130.7, 130.7, 130.7, 130.7],
    ['2022/11/10', 132.92, 137.2, 137.2, 132.92],
    ['2022/11/11', 137.0, 135.5, 137.0, 134.66],
    ['2022/11/14', 130.0, 129.1, 131.39, 128.43],
    ['2022/11/15', 130.0, 129.17, 130.02, 129.17],
    ['2022/11/16', 128.14, 132.3, 132.99, 128.14],
    ['2022/11/17', 129.0, 134.39, 135.36, 129.0],
    ['2022/11/18', 135.94, 133.9, 135.94, 132.5],
    ['2022/11/21', 134.95, 133.8, 134.95, 133.8],
    ['2022/11/22', 135.0, 136.91, 137.11, 133.9],
    ['2022/11/23', 134.29, 134.74, 136.9, 134.29],
    ['2022/11/25', 134.76, 137.15, 137.15, 134.76],
    ['2022/11/28', 137.9, 137.3, 137.9, 136.85],
    ['2022/11/29', 137.3, 138.0, 138.0, 137.3],
    ['2022/11/30', 136.32, 138.98, 139.7, 135.43],
    ['2022/12/01', 138.0, 142.79, 142.79, 138.0],
    ['2022/12/02', 142.42, 142.2, 146.24, 140.13],
    ['2022/12/05', 137.36, 143.64, 143.64, 137.36],
    ['2022/12/06', 144.67, 146.78, 146.78, 144.67],
    ['2022/12/07', 147.05, 151.78, 152.77, 146.5],
    ['2022/12/08', 150.56, 149.81, 154.0, 149.81],
    ['2022/12/09', 150.5, 150.11, 151.23, 150.0],
    ['2022/12/12', 150.95, 146.51, 151.0, 144.04],
    ['2022/12/13', 146.56, 145.98, 148.76, 143.44],
    ['2022/12/14', 146.94, 145.01, 146.94, 145.01],
    ['2022/12/15', 143.31, 140.9, 143.31, 140.9],
    ['2022/12/16', 139.2, 138.97, 139.69, 138.97],
    ['2022/12/19', 139.96, 140.0, 141.4, 139.13],
    ['2022/12/20', 139.42, 142.5, 143.3, 139.42],
    ['2022/12/21', 142.29, 143.85, 146.41, 142.05],
    ['2022/12/22', 140.97, 136.03, 140.97, 129.29],
    ['2022/12/23', 137.69, 137.0, 139.0, 137.0],
    ['2022/12/27', 136.31, 136.0, 139.95, 135.95],
    ['2022/12/28', 135.32, 132.09, 137.37, 132.09],
    ['2022/12/29', 132.73, 137.94, 137.94, 132.73],
    ['2022/12/30', 139.94, 140.76, 140.76, 137.06],
    ['2023/01/03', 140.76, 137.02, 140.76, 137.02],
    ['2023/01/04', 134.7, 134.7, 134.7, 134.7],
    ['2023/01/05', 135.36, 139.47, 141.27, 135.36],
    ['2023/01/06', 143.8, 143.8, 143.8, 143.8],
    ['2023/01/09', 142.02, 143.35, 143.35, 142.0],
    ['2023/01/10', 144.97, 144.97, 144.97, 144.97],
    ['2023/01/11', 144.11, 148.33, 149.0, 144.11],
    ['2023/01/12', 148.0, 149.05, 149.05, 147.01],
    ['2023/01/13', 149.4, 146.2, 149.4, 143.99],
    ['2023/01/17', 141.2, 141.8, 143.42, 141.2],
    ['2023/01/18', 142.0, 140.1, 142.0, 140.1],
    ['2023/01/19', 140.71, 143.27, 143.27, 140.71],
    ['2023/01/20', 143.94, 147.38, 147.42, 143.94],
    ['2023/01/23', 145.53, 145.49, 145.53, 145.49],
    ['2023/01/24', 145.59, 147.38, 147.38, 145.59],
    ['2023/01/25', 147.19, 150.0, 150.0, 147.19],
    ['2023/01/26', 150.0, 151.96, 151.96, 149.08],
    ['2023/01/27', 152.45, 152.52, 152.52, 151.3],
    ['2023/01/30', 150.78, 151.54, 152.1, 150.78],
    ['2023/01/31', 152.76, 151.8, 152.76, 150.05],
    ['2023/02/01', 148.2, 148.2, 148.2, 148.2],
    ['2023/02/02', 147.0, 151.09, 151.09, 145.0],
    ['2023/02/03', 152.8, 152.8, 152.8, 152.8],
    ['2023/02/06', 152.8, 155.69, 155.69, 151.4],
    ['2023/02/07', 153.61, 156.5, 156.5, 153.15],
    ['2023/02/08', 154.17, 154.09, 156.75, 154.09],
    ['2023/02/09', 153.0, 152.14, 156.87, 152.14],
    ['2023/02/10', 152.0, 156.11, 157.3, 151.59],
    ['2023/02/13', 154.06, 161.5, 163.7, 154.06],
    ['2023/02/14', 161.45, 161.2, 161.46, 161.2],
    ['2023/02/15', 159.9, 161.02, 162.02, 159.9],
    ['2023/02/16', 159.32, 158.49, 159.32, 158.49],
    ['2023/02/17', 159.81, 163.18, 163.18, 159.81],
    ['2023/02/21', 163.35, 163.15, 168.76, 159.09],
    ['2023/02/22', 163.5, 160.06, 165.0, 160.06],
    ['2023/02/23', 163.2, 163.48, 164.8, 158.2],
    ['2023/02/24', 162.27, 162.75, 162.79, 160.25],
    ['2023/02/27', 162.04, 160.4, 165.04, 159.55],
    ['2023/02/28', 160.4, 161.3, 163.81, 160.4],
    ['2023/03/01', 162.9, 164.11, 165.0, 162.26],
    ['2023/03/02', 163.71, 161.46, 164.03, 161.46],
    ['2023/03/03', 160.34, 163.65, 163.65, 160.34],
    ['2023/03/06', 160.68, 156.24, 160.68, 156.24],
    ['2023/03/07', 156.94, 158.0, 158.0, 156.94],
    ['2023/03/08', 158.0, 159.47, 160.0, 157.3],
    ['2023/03/09', 159.99, 153.27, 159.99, 153.27],
    ['2023/03/10', 151.37, 150.1, 151.37, 150.04],
    ['2023/03/13', 143.4, 143.4, 143.4, 143.4],
    ['2023/03/14', 145.87, 148.01, 149.0, 141.59],
    ['2023/03/15', 147.19, 149.01, 149.01, 145.49],
    ['2023/03/16', 152.43, 154.19, 154.19, 152.2],
    ['2023/03/17', 152.78, 153.5, 153.5, 152.78],
    ['2023/03/20', 157.5, 152.83, 157.5, 152.4],
    ['2023/03/21', 152.0, 152.0, 152.0, 152.0],
    ['2023/03/22', 150.48, 150.12, 150.48, 150.12],
    ['2023/03/23', 147.45, 147.45, 147.45, 147.45],
    ['2023/03/24', 147.45, 149.99, 149.99, 147.45],
    ['2023/03/27', 151.91, 151.91, 151.91, 151.91],
    ['2023/03/28', 153.96, 154.7, 156.97, 153.96],
    ['2023/03/29', 157.69, 151.25, 157.69, 151.25],
    ['2023/03/30', 152.4, 152.0, 152.4, 148.73],
    ['2023/03/31', 152.0, 152.69, 152.69, 152.0],
    ['2023/04/03', 152.5, 155.01, 155.01, 152.5],
    ['2023/04/04', 155.51, 156.5, 158.29, 155.51],
    ['2023/04/05', 152.99, 148.98, 152.99, 148.98],
    ['2023/04/06', 147.28, 146.13, 147.28, 146.13],
    ['2023/04/10', 146.97, 150.2, 159.55, 145.34],
    ['2023/04/11', 155.53, 150.2, 155.53, 150.2],
    ['2023/04/12', 150.2, 155.16, 155.16, 150.2],
    ['2023/04/13', 155.0, 154.96, 155.0, 154.96],
    ['2023/04/14', 153.69, 153.55, 154.95, 153.55],
    ['2023/04/17', 151.15, 154.1, 155.78, 150.24],
    ['2023/04/18', 156.4, 154.35, 156.4, 154.35],
    ['2023/04/19', 157.18, 158.2, 158.2, 157.18],
    ['2023/04/20', 160.99, 160.98, 160.99, 160.86],
    ['2023/04/21', 159.7, 160.5, 160.66, 159.7],
    ['2023/04/24', 159.15, 159.15, 159.15, 159.15],
    ['2023/04/25', 159.72, 159.5, 159.72, 159.0],
    ['2023/04/26', 158.2, 159.94, 159.94, 158.2],
    ['2023/04/27', 158.68, 161.69, 161.87, 158.68],
    ['2023/04/28', 161.95, 160.9, 161.95, 158.6],
    ['2023/05/01', 161.78, 161.4, 161.8, 161.4],
    ['2023/05/02', 160.77, 161.63, 161.63, 159.54],
    ['2023/05/03', 161.5, 158.55, 162.61, 158.55],
    ['2023/05/04', 157.31, 160.35, 160.35, 157.31],
    ['2023/05/05', 164.98, 165.98, 168.84, 163.5],
    ['2023/05/08', 167.59, 164.25, 168.85, 164.25],
    ['2023/05/09', 165.93, 162.96, 167.54, 151.53],
    ['2023/05/10', 163.0, 164.82, 164.82, 163.0],
    ['2023/05/11', 165.31, 164.25, 165.31, 164.25],
    ['2023/05/12', 168.61, 167.99, 168.61, 167.99],
    ['2023/05/15', 168.44, 177.9, 177.9, 168.44],
    ['2023/05/16', 180.84, 180.95, 184.75, 179.22],
    ['2023/05/17', 178.82, 184.2, 184.2, 177.16],
    ['2023/05/18', 182.06, 189.0, 189.0, 182.06],
    ['2023/05/19', 190.19, 186.4, 192.0, 186.24],
    ['2023/05/22', 187.6, 186.41, 190.67, 186.01],
    ['2023/05/23', 188.0, 185.51, 189.19, 185.51],
    ['2023/05/24', 182.46, 182.46, 182.46, 182.46],
    ['2023/05/25', 184.98, 180.55, 184.98, 180.55],
    ['2023/05/26', 182.27, 182.0, 182.27, 182.0],
    ['2023/05/30', 183.66, 186.0, 186.0, 183.6],
    ['2023/05/31', 186.36, 181.42, 186.36, 177.96],
    ['2023/06/01', 179.91, 180.21, 181.5, 179.91],
    ['2023/06/02', 183.02, 186.2, 186.2, 182.98],
    ['2023/06/05', 185.48, 185.06, 185.48, 183.68],
    ['2023/06/06', 188.86, 188.4, 190.89, 188.12],
    ['2023/06/07', 189.48, 191.0, 193.2, 189.48],
    ['2023/06/08', 190.88, 191.95, 192.48, 187.48],
    ['2023/06/09', 190.04, 190.68, 192.5, 189.94],
    ['2023/06/12', 189.66, 192.85, 192.85, 188.86],
    ['2023/06/13', 192.75, 194.0, 196.8, 192.31],
    ['2023/06/14', 195.6, 193.62, 196.75, 192.06],
    ['2023/06/15', 193.5, 195.41, 195.41, 190.87],
    ['2023/06/16', 195.86, 194.0, 195.86, 194.0],
    ['2023/06/20', 194.77, 193.19, 194.77, 192.42],
    ['2023/06/21', 193.0, 192.01, 194.35, 192.01],
    ['2023/06/22', 193.32, 190.9, 193.8, 190.9],
    ['2023/06/23', 189.44, 192.29, 192.39, 189.44],
    ['2023/06/26', 194.0, 195.0, 195.41, 193.53],
    ['2023/06/27', 196.0, 198.97, 199.2, 193.5],
    ['2023/06/28', 198.46, 200.47, 200.47, 198.46],
    ['2023/06/29', 201.83, 205.83, 205.83, 201.83],
    ['2023/06/30', 207.0, 208.89, 210.4, 205.3],
    ['2023/07/03', 208.3, 206.98, 211.21, 206.2],
    ['2023/07/05', 206.96, 203.7, 206.96, 203.7],
    ['2023/07/06', 202.0, 195.51, 202.0, 194.9],
    ['2023/07/07', 198.0, 197.01, 200.24, 197.01],
    ['2023/07/10', 197.01, 198.52, 200.96, 197.01],
    ['2023/07/11', 199.83, 210.23, 212.36, 198.45],
    ['2023/07/12', 212.87, 208.99, 214.16, 208.23],
    ['2023/07/13', 211.49, 209.3, 211.49, 209.02],
    ['2023/07/14', 210.29, 209.42, 210.29, 204.04],
    ['2023/07/17', 210.06, 208.4, 210.53, 208.4],
    ['2023/07/18', 207.0, 209.67, 211.95, 207.0],
    ['2023/07/19', 210.01, 209.02, 210.2, 207.12],
    ['2023/07/20', 208.35, 209.5, 210.61, 208.35],
    ['2023/07/21', 208.48, 208.3, 209.55, 208.3],
    ['2023/07/24', 208.87, 205.79, 209.96, 205.05],
    ['2023/07/25', 206.56, 209.0, 209.0, 205.08],
    ['2023/07/26', 208.93, 208.29, 211.99, 207.57],
    ['2023/07/27', 208.38, 206.0, 208.38, 206.0],
    ['2023/07/28', 205.23, 203.65, 206.08, 203.65],
    ['2023/07/31', 205.47, 205.61, 206.02, 204.05],
    ['2023/08/01', 204.23, 204.24, 205.3, 203.61],
    ['2023/08/02', 204.71, 205.46, 206.3, 203.32],
    ['2023/08/03', 205.02, 209.51, 210.71, 204.54],
    ['2023/08/04', 211.23, 212.4, 215.4, 210.22],
    ['2023/08/07', 213.62, 215.48, 216.0, 213.62],
    ['2023/08/08', 215.8, 215.32, 215.8, 214.0],
    ['2023/08/09', 214.28, 214.53, 215.28, 213.21],
    ['2023/08/10', 214.85, 214.84, 215.34, 213.87],
]);
var volumes = [
    20800.0,
    10600.0,
    2200.0,
    5600.0,
    4600.0,
    5700.0,
    6700.0,
    3100.0,
    3200.0,
    6600.0,
    4800.0,
    7400.0,
    5300.0,
    5100.0,
    5900.0,
    8100.0,
    10700.0,
    4400.0,
    4500.0,
    7100.0,
    2900.0,
    8900.0,
    5600.0,
    6200.0,
    12600.0,
    4900.0,
    10000.0,
    8000.0,
    7600.0,
    6700.0,
    5400.0,
    5900.0,
    5500.0,
    3500.0,
    7600.0,
    2800.0,
    2200.0,
    2700.0,
    1900.0,
    4800.0,
    2500.0,
    1600.0,
    1200.0,
    10500.0,
    7200.0,
    3000.0,
    4500.0,
    5300.0,
    2100.0,
    7200.0,
    2400.0,
    3200.0,
    2900.0,
    3000.0,
    1800.0,
    2700.0,
    6000.0,
    4100.0,
    12400.0,
    3100.0,
    4800.0,
    4300.0,
    2200.0,
    6900.0,
    3200.0,
    5300.0,
    2200.0,
    3000.0,
    4100.0,
    3900.0,
    1900.0,
    3200.0,
    1600.0,
    1300.0,
    2900.0,
    1600.0,
    5400.0,
    6800.0,
    5800.0,
    5600.0,
    4100.0,
    13000.0,
    9700.0,
    4700.0,
    11900.0,
    24800.0,
    2300.0,
    1300.0,
    7600.0,
    5700.0,
    3600.0,
    8400.0,
    9000.0,
    5200.0,
    8100.0,
    4500.0,
    7000.0,
    11800.0,
    3600.0,
    800.0,
    4200.0,
    2700.0,
    4400.0,
    2000.0,
    1600.0,
    2800.0,
    5700.0,
    3200.0,
    1200.0,
    2400.0,
    2700.0,
    2000.0,
    4000.0,
    1900.0,
    2000.0,
    4700.0,
    1500.0,
    5900.0,
    2400.0,
    5100.0,
    1900.0,
    6300.0,
    5100.0,
    12200.0,
    7200.0,
    17800.0,
    13400.0,
    2400.0,
    1500.0,
    2300.0,
    2700.0,
    9800.0,
    9500.0,
    7200.0,
    3500.0,
    9800.0,
    9200.0,
    5100.0,
    5100.0,
    2600.0,
    3100.0,
    1400.0,
    1700.0,
    2700.0,
    2300.0,
    1400.0,
    6400.0,
    3300.0,
    3100.0,
    7600.0,
    6200.0,
    1700.0,
    1700.0,
    2400.0,
    4300.0,
    1600.0,
    2800.0,
    9400.0,
    2500.0,
    4200.0,
    2600.0,
    6400.0,
    4800.0,
    2300.0,
    12900.0,
    2300.0,
    5200.0,
    2200.0,
    1700.0,
    4100.0,
    1000.0,
    1900.0,
    1800.0,
    2600.0,
    1000.0,
    2000.0,
    1500.0,
    2800.0,
    2600.0,
    1500.0,
    3000.0,
    2900.0,
    3100.0,
    4600.0,
    6100.0,
    6200.0,
    5300.0,
    2500.0,
    1600.0,
    4000.0,
    3500.0,
    9700.0,
    6500.0,
    8100.0,
    13200.0,
    5500.0,
    1400.0,
    4500.0,
    2200.0,
    4000.0,
    12400.0,
    2600.0,
    6600.0,
    3800.0,
    6400.0,
    5900.0,
    5900.0,
    4000.0,
    2200.0,
    11000.0,
    3500.0,
    9900.0,
    8800.0,
    6200.0,
    4500.0,
    6600.0,
    28700.0,
    4700.0,
    9700.0,
    7300.0,
    8400.0,
    12600.0,
    5100.0,
    6300.0,
    14400.0,
    14500.0,
    9500.0,
    18900.0,
    9700.0,
    9100.0,
    5800.0,
    5800.0,
    7100.0,
    9600.0,
    11900.0,
    13900.0,
    7200.0,
    9200.0,
    11300.0,
    8200.0,
    9200.0,
    10200.0,
    9600.0,
    9600.0,
    9800.0,
    9900.0,
    19100.0,
    22300.0,
    14900.0,
    12600.0,
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
     *     text: "USLM",
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