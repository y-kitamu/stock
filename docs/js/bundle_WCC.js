/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_WCC");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/03', 128.19, 129.11, 129.68, 126.11],
    ['2022/08/04', 127.46, 129.88, 132.09, 124.77],
    ['2022/08/05', 129.56, 131.82, 132.5, 127.54],
    ['2022/08/08', 133.37, 132.56, 134.93, 132.26],
    ['2022/08/09', 133.42, 131.95, 134.69, 131.63],
    ['2022/08/10', 135.55, 134.77, 136.61, 134.38],
    ['2022/08/11', 136.57, 136.72, 138.37, 135.72],
    ['2022/08/12', 136.84, 139.58, 139.64, 136.36],
    ['2022/08/15', 137.78, 141.66, 142.67, 136.92],
    ['2022/08/16', 140.4, 142.94, 143.74, 140.4],
    ['2022/08/17', 140.79, 141.36, 141.58, 139.61],
    ['2022/08/18', 141.82, 141.12, 143.3, 140.82],
    ['2022/08/19', 139.34, 136.62, 139.61, 135.87],
    ['2022/08/22', 133.26, 132.59, 134.41, 132.37],
    ['2022/08/23', 132.81, 133.64, 135.43, 131.77],
    ['2022/08/24', 133.5, 134.37, 135.31, 132.78],
    ['2022/08/25', 134.78, 140.58, 140.9, 134.78],
    ['2022/08/26', 140.34, 134.97, 141.67, 134.74],
    ['2022/08/29', 133.45, 135.97, 137.23, 132.8],
    ['2022/08/30', 136.61, 131.43, 136.61, 130.73],
    ['2022/08/31', 131.92, 131.06, 132.91, 129.97],
    ['2022/09/01', 129.22, 130.85, 131.12, 126.9],
    ['2022/09/02', 133.0, 131.24, 134.05, 130.25],
    ['2022/09/06', 132.42, 132.95, 133.87, 129.9],
    ['2022/09/07', 133.37, 137.37, 137.65, 132.73],
    ['2022/09/08', 135.07, 137.61, 137.76, 133.49],
    ['2022/09/09', 139.55, 143.96, 144.96, 139.06],
    ['2022/09/12', 145.36, 141.86, 146.36, 141.2],
    ['2022/09/13', 137.37, 137.33, 139.35, 136.63],
    ['2022/09/14', 137.17, 133.53, 137.77, 131.62],
    ['2022/09/15', 132.66, 132.22, 135.6, 131.52],
    ['2022/09/16', 128.27, 126.67, 129.27, 125.37],
    ['2022/09/19', 124.88, 129.37, 130.75, 124.88],
    ['2022/09/20', 128.4, 127.62, 128.81, 126.53],
    ['2022/09/21', 129.06, 124.73, 130.27, 124.6],
    ['2022/09/22', 124.62, 120.24, 124.65, 120.24],
    ['2022/09/23', 117.86, 115.36, 118.59, 113.07],
    ['2022/09/26', 113.74, 111.66, 115.83, 111.55],
    ['2022/09/27', 113.62, 114.56, 115.78, 111.73],
    ['2022/09/28', 114.16, 118.44, 119.2, 114.16],
    ['2022/09/29', 116.22, 116.35, 117.36, 113.79],
    ['2022/09/30', 117.53, 118.82, 122.7, 116.4],
    ['2022/10/03', 120.2, 122.32, 123.8, 120.11],
    ['2022/10/04', 125.64, 129.04, 129.37, 125.64],
    ['2022/10/05', 127.2, 129.85, 130.61, 125.8],
    ['2022/10/06', 128.35, 127.43, 130.54, 127.23],
    ['2022/10/07', 125.65, 123.76, 126.47, 123.05],
    ['2022/10/10', 124.5, 122.63, 125.21, 121.86],
    ['2022/10/11', 121.86, 122.43, 124.77, 120.4],
    ['2022/10/12', 122.47, 120.66, 122.47, 120.01],
    ['2022/10/13', 117.94, 124.81, 125.48, 116.11],
    ['2022/10/14', 125.84, 117.25, 126.67, 117.01],
    ['2022/10/17', 121.62, 124.13, 124.83, 120.73],
    ['2022/10/18', 128.19, 126.85, 130.31, 125.09],
    ['2022/10/19', 125.04, 123.89, 125.54, 122.49],
    ['2022/10/20', 123.41, 120.3, 124.98, 118.91],
    ['2022/10/21', 120.65, 126.36, 126.36, 119.33],
    ['2022/10/24', 127.75, 130.11, 130.19, 126.56],
    ['2022/10/25', 129.56, 132.78, 133.39, 129.56],
    ['2022/10/26', 132.78, 133.37, 135.62, 130.75],
    ['2022/10/27', 136.17, 133.57, 136.53, 133.33],
    ['2022/10/28', 134.59, 137.17, 137.98, 132.95],
    ['2022/10/31', 136.12, 137.12, 139.04, 135.24],
    ['2022/11/01', 139.34, 139.64, 141.36, 137.08],
    ['2022/11/02', 138.57, 136.63, 143.09, 136.06],
    ['2022/11/03', 127.07, 115.92, 127.4, 113.46],
    ['2022/11/04', 117.15, 119.4, 122.02, 114.96],
    ['2022/11/07', 120.73, 119.43, 120.89, 116.24],
    ['2022/11/08', 119.57, 121.48, 124.41, 118.62],
    ['2022/11/09', 119.56, 120.06, 121.26, 118.86],
    ['2022/11/10', 127.74, 126.06, 130.05, 125.28],
    ['2022/11/11', 127.04, 131.51, 132.64, 126.41],
    ['2022/11/14', 130.1, 130.74, 134.24, 130.1],
    ['2022/11/15', 133.69, 128.17, 133.69, 126.53],
    ['2022/11/16', 126.88, 127.89, 128.2, 125.4],
    ['2022/11/17', 125.75, 123.9, 125.79, 123.58],
    ['2022/11/18', 126.72, 126.25, 126.72, 123.04],
    ['2022/11/21', 126.11, 124.95, 126.32, 123.7],
    ['2022/11/22', 126.46, 126.54, 127.84, 124.74],
    ['2022/11/23', 125.69, 126.27, 127.84, 125.69],
    ['2022/11/25', 126.09, 127.2, 128.59, 125.43],
    ['2022/11/28', 125.45, 123.43, 126.47, 122.85],
    ['2022/11/29', 123.71, 125.45, 125.87, 122.95],
    ['2022/11/30', 125.26, 128.31, 128.55, 123.42],
    ['2022/12/01', 128.64, 126.85, 130.27, 126.49],
    ['2022/12/02', 124.9, 127.29, 128.21, 124.58],
    ['2022/12/05', 125.72, 121.07, 125.72, 120.29],
    ['2022/12/06', 121.55, 120.64, 121.98, 118.78],
    ['2022/12/07', 119.33, 122.6, 123.92, 119.33],
    ['2022/12/08', 123.62, 122.71, 124.92, 122.6],
    ['2022/12/09', 121.8, 120.72, 123.2, 120.47],
    ['2022/12/12', 120.7, 123.73, 124.18, 120.16],
    ['2022/12/13', 129.22, 127.63, 129.43, 126.91],
    ['2022/12/14', 126.72, 125.95, 128.47, 124.81],
    ['2022/12/15', 123.53, 120.57, 123.74, 120.49],
    ['2022/12/16', 118.94, 119.74, 120.41, 117.74],
    ['2022/12/19', 119.99, 121.21, 122.48, 119.13],
    ['2022/12/20', 121.34, 120.63, 123.93, 120.53],
    ['2022/12/21', 122.31, 124.13, 124.18, 121.34],
    ['2022/12/22', 122.36, 120.26, 123.75, 116.57],
    ['2022/12/23', 120.5, 122.61, 122.62, 119.72],
    ['2022/12/27', 123.21, 123.38, 124.59, 122.16],
    ['2022/12/28', 122.86, 119.19, 124.45, 119.19],
    ['2022/12/29', 120.85, 123.67, 124.08, 120.85],
    ['2022/12/30', 122.82, 124.61, 125.26, 121.83],
    ['2023/01/03', 125.67, 124.14, 125.9, 120.96],
    ['2023/01/04', 125.54, 127.43, 127.62, 123.81],
    ['2023/01/05', 126.7, 125.14, 126.8, 123.83],
    ['2023/01/06', 127.36, 129.62, 130.08, 125.68],
    ['2023/01/09', 130.54, 131.84, 133.16, 130.38],
    ['2023/01/10', 130.98, 136.21, 136.61, 130.61],
    ['2023/01/11', 136.62, 134.93, 138.23, 134.04],
    ['2023/01/12', 135.36, 136.2, 138.25, 135.36],
    ['2023/01/13', 134.74, 136.38, 136.99, 133.21],
    ['2023/01/17', 135.8, 135.67, 138.83, 135.19],
    ['2023/01/18', 136.05, 133.29, 138.43, 133.03],
    ['2023/01/19', 131.17, 131.38, 132.09, 127.54],
    ['2023/01/20', 132.06, 135.42, 135.76, 130.92],
    ['2023/01/23', 136.81, 137.35, 137.56, 136.2],
    ['2023/01/24', 135.89, 137.61, 137.89, 134.97],
    ['2023/01/25', 135.17, 138.08, 138.65, 134.26],
    ['2023/01/26', 139.34, 142.47, 142.65, 137.47],
    ['2023/01/27', 142.6, 144.77, 145.25, 141.09],
    ['2023/01/30', 143.25, 143.37, 145.01, 142.24],
    ['2023/01/31', 143.89, 148.31, 148.72, 143.32],
    ['2023/02/01', 147.03, 150.95, 151.54, 146.43],
    ['2023/02/02', 152.48, 151.25, 153.73, 150.14],
    ['2023/02/03', 149.66, 152.06, 154.27, 149.66],
    ['2023/02/06', 150.59, 151.99, 152.6, 149.79],
    ['2023/02/07', 151.02, 153.46, 154.26, 150.52],
    ['2023/02/08', 152.7, 150.96, 153.67, 150.02],
    ['2023/02/09', 151.91, 148.16, 152.57, 147.47],
    ['2023/02/10', 147.3, 148.08, 148.96, 146.39],
    ['2023/02/13', 147.99, 152.46, 153.07, 147.36],
    ['2023/02/14', 158.02, 164.96, 167.92, 157.29],
    ['2023/02/15', 168.43, 171.39, 171.58, 165.18],
    ['2023/02/16', 170.51, 171.15, 172.09, 168.66],
    ['2023/02/17', 170.85, 167.91, 171.15, 167.72],
    ['2023/02/21', 165.15, 161.6, 166.94, 161.03],
    ['2023/02/22', 161.05, 161.05, 162.54, 159.52],
    ['2023/02/23', 162.84, 161.95, 163.39, 160.16],
    ['2023/02/24', 159.43, 163.11, 164.08, 159.33],
    ['2023/02/27', 164.1, 165.41, 166.2, 164.1],
    ['2023/02/28', 165.09, 164.8, 167.54, 164.79],
    ['2023/03/01', 164.39, 167.76, 168.84, 164.39],
    ['2023/03/02', 165.99, 169.32, 169.58, 164.4],
    ['2023/03/03', 169.82, 171.88, 172.18, 168.3],
    ['2023/03/06', 172.56, 170.47, 174.18, 170.37],
    ['2023/03/07', 170.04, 169.72, 172.49, 168.38],
    ['2023/03/08', 169.4, 171.45, 171.66, 168.78],
    ['2023/03/09', 171.28, 165.56, 172.53, 165.47],
    ['2023/03/10', 164.82, 157.89, 164.82, 156.37],
    ['2023/03/13', 154.01, 151.37, 155.54, 148.01],
    ['2023/03/14', 157.68, 154.91, 159.57, 153.06],
    ['2023/03/15', 149.88, 144.27, 150.13, 140.68],
    ['2023/03/16', 142.04, 146.92, 147.68, 140.46],
    ['2023/03/17', 144.28, 138.31, 145.07, 137.91],
    ['2023/03/20', 140.54, 141.4, 144.37, 138.78],
    ['2023/03/21', 145.3, 147.23, 148.3, 144.67],
    ['2023/03/22', 146.96, 143.79, 148.65, 143.58],
    ['2023/03/23', 144.49, 140.6, 147.33, 138.25],
    ['2023/03/24', 138.22, 137.83, 139.59, 135.42],
    ['2023/03/27', 139.84, 141.4, 142.84, 139.03],
    ['2023/03/28', 141.06, 142.66, 145.08, 140.28],
    ['2023/03/29', 145.01, 148.26, 149.04, 144.68],
    ['2023/03/30', 149.93, 150.5, 153.31, 149.52],
    ['2023/03/31', 151.98, 154.19, 154.4, 151.25],
    ['2023/04/03', 154.21, 151.67, 156.31, 150.51],
    ['2023/04/04', 152.06, 142.22, 152.57, 139.9],
    ['2023/04/05', 140.33, 138.28, 141.75, 135.45],
    ['2023/04/06', 137.08, 133.63, 138.21, 133.22],
    ['2023/04/10', 133.8, 136.59, 137.51, 133.8],
    ['2023/04/11', 136.82, 136.09, 138.15, 135.58],
    ['2023/04/12', 137.96, 136.63, 139.28, 136.02],
    ['2023/04/13', 135.59, 136.73, 137.84, 132.83],
    ['2023/04/14', 137.57, 137.11, 139.24, 135.55],
    ['2023/04/17', 137.86, 139.09, 139.26, 137.28],
    ['2023/04/18', 139.9, 143.08, 143.37, 139.9],
    ['2023/04/19', 142.45, 141.62, 143.63, 139.2],
    ['2023/04/20', 139.99, 142.58, 144.05, 139.64],
    ['2023/04/21', 142.12, 141.78, 143.69, 141.05],
    ['2023/04/24', 142.26, 142.62, 143.93, 141.21],
    ['2023/04/25', 142.73, 141.58, 146.45, 140.9],
    ['2023/04/26', 140.35, 136.61, 141.05, 136.39],
    ['2023/04/27', 138.15, 142.58, 143.14, 137.8],
    ['2023/04/28', 141.87, 143.68, 145.17, 140.72],
    ['2023/05/01', 143.45, 143.25, 145.64, 142.55],
    ['2023/05/02', 143.16, 142.96, 143.69, 139.08],
    ['2023/05/03', 143.33, 143.76, 147.68, 143.33],
    ['2023/05/04', 125.09, 122.59, 135.59, 121.64],
    ['2023/05/05', 126.79, 129.68, 131.35, 125.23],
    ['2023/05/08', 131.68, 129.59, 132.88, 127.95],
    ['2023/05/09', 128.66, 130.44, 131.04, 127.96],
    ['2023/05/10', 132.91, 128.66, 132.91, 127.0],
    ['2023/05/11', 126.87, 127.62, 128.71, 125.61],
    ['2023/05/12', 128.73, 127.9, 129.84, 126.49],
    ['2023/05/15', 128.64, 131.94, 133.33, 127.59],
    ['2023/05/16', 130.21, 127.77, 131.31, 127.49],
    ['2023/05/17', 129.36, 132.12, 133.98, 128.89],
    ['2023/05/18', 131.97, 135.95, 136.78, 131.29],
    ['2023/05/19', 137.63, 133.91, 137.63, 132.99],
    ['2023/05/22', 133.67, 133.91, 135.0, 132.28],
    ['2023/05/23', 132.81, 130.25, 134.38, 130.14],
    ['2023/05/24', 129.05, 127.44, 129.16, 125.49],
    ['2023/05/25', 127.92, 133.31, 133.51, 127.92],
    ['2023/05/26', 135.99, 145.75, 146.63, 134.98],
    ['2023/05/30', 146.38, 143.75, 147.95, 143.38],
    ['2023/05/31', 142.44, 137.07, 143.58, 136.34],
    ['2023/06/01', 136.33, 135.98, 137.81, 132.61],
    ['2023/06/02', 139.4, 145.81, 147.03, 138.7],
    ['2023/06/05', 147.95, 147.96, 148.98, 142.82],
    ['2023/06/06', 146.29, 148.49, 151.32, 146.29],
    ['2023/06/07', 149.59, 153.27, 156.12, 149.37],
    ['2023/06/08', 152.53, 155.31, 155.69, 152.52],
    ['2023/06/09', 156.24, 154.37, 156.3, 153.61],
    ['2023/06/12', 154.51, 160.66, 161.17, 153.95],
    ['2023/06/13', 161.34, 166.01, 166.98, 161.34],
    ['2023/06/14', 166.11, 164.01, 167.39, 163.03],
    ['2023/06/15', 162.48, 168.67, 169.0, 161.52],
    ['2023/06/16', 168.96, 168.05, 170.33, 166.0],
    ['2023/06/20', 166.38, 170.22, 170.76, 164.78],
    ['2023/06/21', 171.23, 173.39, 174.81, 170.79],
    ['2023/06/22', 171.99, 167.6, 172.61, 167.49],
    ['2023/06/23', 165.07, 167.9, 168.07, 163.68],
    ['2023/06/26', 167.51, 166.75, 171.67, 166.62],
    ['2023/06/27', 167.37, 173.4, 173.83, 167.17],
    ['2023/06/28', 173.05, 176.21, 176.36, 171.01],
    ['2023/06/29', 176.31, 175.54, 178.01, 174.93],
    ['2023/06/30', 178.15, 179.06, 180.08, 175.35],
    ['2023/07/03', 178.14, 177.92, 179.0, 177.22],
    ['2023/07/05', 176.04, 176.72, 178.33, 174.76],
    ['2023/07/06', 174.77, 175.2, 175.57, 172.13],
    ['2023/07/07', 175.49, 178.41, 180.02, 175.49],
    ['2023/07/10', 177.43, 183.1, 183.17, 176.95],
    ['2023/07/11', 183.58, 179.0, 185.23, 176.01],
    ['2023/07/12', 182.13, 178.11, 182.89, 177.57],
    ['2023/07/13', 178.91, 178.13, 180.81, 176.67],
    ['2023/07/14', 177.9, 172.31, 177.9, 170.67],
    ['2023/07/17', 172.0, 172.24, 173.97, 171.18],
    ['2023/07/18', 171.71, 176.02, 176.77, 171.35],
    ['2023/07/19', 175.09, 174.95, 177.95, 174.02],
    ['2023/07/20', 175.88, 176.18, 176.88, 173.31],
    ['2023/07/21', 178.51, 174.69, 178.51, 173.0],
    ['2023/07/24', 174.75, 175.08, 176.57, 173.75],
    ['2023/07/25', 174.0, 175.37, 176.27, 172.0],
    ['2023/07/26', 174.11, 169.55, 175.11, 169.04],
    ['2023/07/27', 169.5, 169.13, 171.59, 168.15],
    ['2023/07/28', 170.85, 171.49, 171.71, 169.37],
    ['2023/07/31', 172.86, 175.57, 175.84, 171.72],
    ['2023/08/01', 173.98, 180.31, 182.81, 173.51],
    ['2023/08/02', 178.16, 179.46, 183.39, 177.39],
]);
var volumes = [
    495600.0,
    1000800.0,
    581300.0,
    421000.0,
    543400.0,
    258000.0,
    425500.0,
    289900.0,
    395000.0,
    394300.0,
    505800.0,
    598200.0,
    507800.0,
    336000.0,
    200800.0,
    246400.0,
    342700.0,
    302900.0,
    306900.0,
    341700.0,
    313100.0,
    454200.0,
    294900.0,
    459200.0,
    336800.0,
    458000.0,
    729700.0,
    492700.0,
    491100.0,
    533000.0,
    312300.0,
    1107400.0,
    345900.0,
    381400.0,
    307100.0,
    343300.0,
    540800.0,
    588500.0,
    655000.0,
    357000.0,
    239600.0,
    852800.0,
    340300.0,
    518500.0,
    432200.0,
    278000.0,
    160100.0,
    359500.0,
    320700.0,
    219900.0,
    493400.0,
    397700.0,
    413000.0,
    287200.0,
    229800.0,
    444600.0,
    411600.0,
    583100.0,
    254700.0,
    331900.0,
    310200.0,
    339300.0,
    351400.0,
    505500.0,
    849600.0,
    1808400.0,
    1316800.0,
    599600.0,
    414900.0,
    379700.0,
    688200.0,
    851800.0,
    711500.0,
    704500.0,
    404200.0,
    451500.0,
    535900.0,
    364100.0,
    431900.0,
    179700.0,
    82700.0,
    286600.0,
    337200.0,
    392200.0,
    397300.0,
    244900.0,
    455800.0,
    465200.0,
    235300.0,
    264800.0,
    305800.0,
    367900.0,
    617200.0,
    346600.0,
    371800.0,
    460600.0,
    505300.0,
    390000.0,
    340300.0,
    404300.0,
    135900.0,
    288400.0,
    239800.0,
    226900.0,
    258900.0,
    530600.0,
    473500.0,
    630900.0,
    383200.0,
    372400.0,
    456800.0,
    510400.0,
    512900.0,
    250400.0,
    374300.0,
    649400.0,
    500800.0,
    283100.0,
    367400.0,
    335800.0,
    379200.0,
    325800.0,
    338000.0,
    397900.0,
    563300.0,
    353200.0,
    626600.0,
    614500.0,
    278600.0,
    336700.0,
    451100.0,
    570300.0,
    753100.0,
    839500.0,
    1384800.0,
    781100.0,
    481000.0,
    710200.0,
    565900.0,
    422800.0,
    395300.0,
    308700.0,
    379000.0,
    408000.0,
    378600.0,
    426000.0,
    419300.0,
    401900.0,
    518600.0,
    343500.0,
    427100.0,
    737000.0,
    887000.0,
    512100.0,
    1110700.0,
    1071000.0,
    850600.0,
    719700.0,
    674200.0,
    544600.0,
    515800.0,
    733700.0,
    312900.0,
    466500.0,
    606300.0,
    622700.0,
    489800.0,
    457300.0,
    817600.0,
    781900.0,
    700000.0,
    698100.0,
    581600.0,
    617200.0,
    551100.0,
    315600.0,
    235000.0,
    515200.0,
    364400.0,
    326500.0,
    407000.0,
    268300.0,
    562000.0,
    574700.0,
    419000.0,
    511500.0,
    372300.0,
    615700.0,
    915100.0,
    2231000.0,
    1396400.0,
    842700.0,
    657200.0,
    665600.0,
    511100.0,
    434700.0,
    771900.0,
    729700.0,
    615500.0,
    652900.0,
    666300.0,
    354500.0,
    476300.0,
    546500.0,
    662500.0,
    1238700.0,
    848200.0,
    922300.0,
    783600.0,
    1011900.0,
    990800.0,
    816800.0,
    869300.0,
    718800.0,
    590100.0,
    935200.0,
    882700.0,
    717100.0,
    922200.0,
    7823100.0,
    961100.0,
    927500.0,
    738900.0,
    1408000.0,
    434500.0,
    666500.0,
    607900.0,
    507300.0,
    598000.0,
    216400.0,
    427700.0,
    438300.0,
    422800.0,
    517300.0,
    907700.0,
    591900.0,
    869500.0,
    889200.0,
    501500.0,
    547100.0,
    544100.0,
    426600.0,
    504500.0,
    299800.0,
    496900.0,
    781700.0,
    588400.0,
    398000.0,
    425000.0,
    705200.0,
    771800.0,
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
        text: "WCC",
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