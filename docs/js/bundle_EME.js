/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_EME");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/03', 115.94, 115.55, 115.94, 113.45],
    ['2022/08/04', 115.94, 113.94, 115.97, 113.92],
    ['2022/08/05', 112.8, 113.91, 114.16, 112.43],
    ['2022/08/08', 114.5, 114.35, 115.26, 113.58],
    ['2022/08/09', 115.13, 114.55, 115.46, 113.81],
    ['2022/08/10', 117.51, 116.92, 117.67, 116.14],
    ['2022/08/11', 117.97, 117.78, 118.76, 117.28],
    ['2022/08/12', 118.51, 120.73, 120.83, 117.88],
    ['2022/08/15', 120.18, 120.87, 121.11, 119.3],
    ['2022/08/16', 119.93, 121.87, 122.47, 119.93],
    ['2022/08/17', 120.48, 121.67, 122.37, 119.99],
    ['2022/08/18', 121.97, 123.19, 123.71, 121.67],
    ['2022/08/19', 122.69, 121.08, 122.8, 120.91],
    ['2022/08/22', 119.64, 119.39, 120.49, 119.23],
    ['2022/08/23', 119.39, 119.41, 121.23, 119.39],
    ['2022/08/24', 119.83, 121.24, 121.65, 119.57],
    ['2022/08/25', 121.43, 123.48, 123.6, 121.43],
    ['2022/08/26', 123.46, 120.2, 123.73, 119.96],
    ['2022/08/29', 119.35, 120.18, 121.22, 118.54],
    ['2022/08/30', 120.11, 118.08, 120.11, 117.78],
    ['2022/08/31', 118.02, 118.41, 119.19, 117.79],
    ['2022/09/01', 117.73, 116.73, 117.76, 116.08],
    ['2022/09/02', 118.14, 115.87, 119.39, 115.72],
    ['2022/09/06', 116.23, 115.49, 116.23, 114.42],
    ['2022/09/07', 115.78, 117.94, 118.2, 115.25],
    ['2022/09/08', 117.11, 119.89, 119.9, 116.39],
    ['2022/09/09', 120.95, 121.54, 121.94, 120.11],
    ['2022/09/12', 122.09, 121.9, 122.69, 121.23],
    ['2022/09/13', 119.04, 117.29, 119.95, 116.72],
    ['2022/09/14', 116.97, 118.02, 118.45, 116.35],
    ['2022/09/15', 116.94, 118.12, 119.08, 116.4],
    ['2022/09/16', 117.02, 117.54, 117.87, 116.53],
    ['2022/09/19', 116.71, 119.15, 119.29, 116.71],
    ['2022/09/20', 118.08, 118.46, 118.9, 117.12],
    ['2022/09/21', 120.26, 118.26, 121.46, 118.03],
    ['2022/09/22', 118.52, 117.13, 118.68, 116.91],
    ['2022/09/23', 115.94, 114.66, 116.04, 113.61],
    ['2022/09/26', 114.51, 114.41, 116.52, 113.9],
    ['2022/09/27', 115.48, 113.36, 115.66, 112.36],
    ['2022/09/28', 114.33, 116.83, 117.56, 113.77],
    ['2022/09/29', 115.59, 115.46, 116.77, 113.64],
    ['2022/09/30', 115.77, 114.98, 117.79, 114.8],
    ['2022/10/03', 116.9, 118.11, 118.64, 115.34],
    ['2022/10/04', 119.62, 121.73, 122.19, 119.62],
    ['2022/10/05', 120.26, 120.94, 121.68, 120.22],
    ['2022/10/06', 120.2, 121.27, 121.64, 119.81],
    ['2022/10/07', 120.67, 119.76, 120.67, 118.71],
    ['2022/10/10', 120.66, 121.41, 122.13, 120.03],
    ['2022/10/11', 120.94, 122.44, 123.28, 120.67],
    ['2022/10/12', 122.49, 120.88, 122.66, 120.84],
    ['2022/10/13', 118.91, 123.17, 123.92, 118.61],
    ['2022/10/14', 123.88, 121.42, 123.92, 120.92],
    ['2022/10/17', 123.5, 127.04, 127.19, 123.22],
    ['2022/10/18', 129.6, 127.59, 131.16, 125.89],
    ['2022/10/19', 126.98, 127.45, 127.97, 125.93],
    ['2022/10/20', 127.47, 124.44, 128.1, 123.87],
    ['2022/10/21', 124.83, 126.29, 127.32, 123.41],
    ['2022/10/24', 127.1, 127.7, 128.77, 126.15],
    ['2022/10/25', 127.83, 129.71, 130.59, 127.83],
    ['2022/10/26', 130.32, 128.72, 131.51, 128.46],
    ['2022/10/27', 133.62, 134.03, 136.89, 131.32],
    ['2022/10/28', 135.17, 139.6, 141.64, 135.13],
    ['2022/10/31', 138.81, 140.67, 141.43, 138.22],
    ['2022/11/01', 141.14, 143.9, 144.18, 140.65],
    ['2022/11/02', 142.21, 139.91, 144.2, 139.72],
    ['2022/11/03', 138.85, 141.9, 143.35, 138.1],
    ['2022/11/04', 144.63, 143.91, 145.45, 141.68],
    ['2022/11/07', 145.29, 145.25, 145.57, 143.19],
    ['2022/11/08', 145.88, 145.45, 147.84, 144.09],
    ['2022/11/09', 143.54, 146.04, 146.54, 143.54],
    ['2022/11/10', 149.54, 151.59, 151.65, 148.08],
    ['2022/11/11', 151.25, 150.33, 152.95, 149.81],
    ['2022/11/14', 150.24, 149.06, 153.11, 148.9],
    ['2022/11/15', 149.97, 152.36, 152.95, 149.11],
    ['2022/11/16', 152.53, 153.9, 154.81, 152.09],
    ['2022/11/17', 152.18, 152.37, 153.32, 150.73],
    ['2022/11/18', 154.17, 154.85, 155.06, 151.45],
    ['2022/11/21', 153.92, 154.28, 155.49, 153.56],
    ['2022/11/22', 155.12, 154.31, 156.19, 151.4],
    ['2022/11/23', 153.48, 153.12, 155.27, 152.85],
    ['2022/11/25', 153.8, 154.92, 155.47, 153.8],
    ['2022/11/28', 154.03, 152.34, 155.1, 151.59],
    ['2022/11/29', 152.05, 151.65, 153.45, 151.31],
    ['2022/11/30', 151.44, 154.42, 154.44, 149.28],
    ['2022/12/01', 155.07, 153.54, 155.67, 153.09],
    ['2022/12/02', 152.29, 153.42, 154.75, 151.66],
    ['2022/12/05', 151.57, 148.65, 151.57, 146.7],
    ['2022/12/06', 149.26, 148.52, 150.03, 146.84],
    ['2022/12/07', 148.12, 148.87, 150.18, 147.67],
    ['2022/12/08', 150.06, 150.37, 151.06, 148.75],
    ['2022/12/09', 150.0, 148.1, 150.09, 148.06],
    ['2022/12/12', 148.22, 148.97, 149.22, 147.49],
    ['2022/12/13', 152.77, 149.76, 152.77, 148.84],
    ['2022/12/14', 150.64, 147.11, 150.84, 145.98],
    ['2022/12/15', 146.34, 145.28, 146.88, 143.71],
    ['2022/12/16', 143.56, 147.71, 147.76, 143.24],
    ['2022/12/19', 147.73, 146.45, 148.35, 145.67],
    ['2022/12/20', 146.05, 146.18, 147.84, 146.03],
    ['2022/12/21', 147.04, 148.88, 150.17, 146.45],
    ['2022/12/22', 147.69, 148.62, 149.11, 145.86],
    ['2022/12/23', 148.45, 149.39, 150.01, 148.22],
    ['2022/12/27', 149.34, 149.62, 150.93, 148.81],
    ['2022/12/28', 149.73, 147.15, 150.29, 147.12],
    ['2022/12/29', 148.21, 148.66, 149.54, 147.85],
    ['2022/12/30', 148.38, 147.65, 148.47, 146.89],
    ['2023/01/03', 148.4, 147.85, 148.86, 145.94],
    ['2023/01/04', 148.67, 144.99, 149.29, 144.09],
    ['2023/01/05', 144.05, 141.96, 145.13, 141.45],
    ['2023/01/06', 143.98, 147.19, 147.26, 143.08],
    ['2023/01/09', 147.35, 144.59, 148.85, 143.99],
    ['2023/01/10', 143.99, 146.6, 146.88, 143.27],
    ['2023/01/11', 147.32, 147.33, 149.23, 147.2],
    ['2023/01/12', 147.49, 151.38, 151.44, 147.0],
    ['2023/01/13', 151.5, 152.37, 152.66, 150.42],
    ['2023/01/17', 150.03, 148.09, 152.27, 148.02],
    ['2023/01/18', 147.95, 146.92, 150.49, 146.54],
    ['2023/01/19', 146.15, 143.73, 146.52, 142.98],
    ['2023/01/20', 144.68, 145.02, 145.03, 142.33],
    ['2023/01/23', 144.88, 144.08, 145.38, 143.6],
    ['2023/01/24', 143.8, 146.24, 147.44, 143.02],
    ['2023/01/25', 145.18, 145.91, 146.94, 144.39],
    ['2023/01/26', 147.16, 146.04, 147.58, 144.97],
    ['2023/01/27', 145.28, 146.27, 146.88, 145.28],
    ['2023/01/30', 145.93, 145.15, 148.25, 144.79],
    ['2023/01/31', 145.62, 147.94, 148.21, 145.62],
    ['2023/02/01', 147.71, 148.77, 150.45, 146.84],
    ['2023/02/02', 149.15, 149.27, 149.59, 147.03],
    ['2023/02/03', 148.79, 148.33, 150.35, 148.11],
    ['2023/02/06', 147.69, 147.1, 148.67, 145.67],
    ['2023/02/07', 146.18, 147.82, 147.98, 144.34],
    ['2023/02/08', 146.77, 147.3, 148.18, 146.62],
    ['2023/02/09', 148.19, 144.85, 149.01, 144.82],
    ['2023/02/10', 144.86, 145.56, 145.61, 143.55],
    ['2023/02/13', 145.87, 146.95, 147.82, 145.48],
    ['2023/02/14', 146.6, 146.7, 148.14, 145.54],
    ['2023/02/15', 145.25, 148.33, 148.67, 145.17],
    ['2023/02/16', 146.54, 148.45, 150.42, 146.54],
    ['2023/02/17', 149.02, 150.87, 151.91, 148.89],
    ['2023/02/21', 149.45, 146.17, 149.52, 145.46],
    ['2023/02/22', 146.83, 146.23, 147.76, 145.91],
    ['2023/02/23', 155.07, 161.78, 165.47, 153.15],
    ['2023/02/24', 165.59, 165.17, 169.53, 160.66],
    ['2023/02/27', 165.77, 165.69, 166.59, 164.41],
    ['2023/02/28', 165.81, 166.87, 168.55, 165.81],
    ['2023/03/01', 167.12, 166.64, 168.03, 165.65],
    ['2023/03/02', 165.94, 166.51, 167.63, 165.43],
    ['2023/03/03', 167.45, 168.6, 169.11, 165.01],
    ['2023/03/06', 168.03, 166.14, 168.45, 165.24],
    ['2023/03/07', 166.85, 165.46, 168.01, 165.28],
    ['2023/03/08', 165.87, 167.62, 167.67, 164.37],
    ['2023/03/09', 168.34, 164.54, 168.48, 164.45],
    ['2023/03/10', 163.73, 158.16, 163.73, 156.79],
    ['2023/03/13', 155.43, 155.35, 158.42, 154.45],
    ['2023/03/14', 158.8, 158.06, 159.79, 157.12],
    ['2023/03/15', 154.63, 155.58, 155.62, 152.43],
    ['2023/03/16', 153.94, 160.2, 160.3, 153.63],
    ['2023/03/17', 159.73, 160.06, 160.76, 156.84],
    ['2023/03/20', 161.15, 161.31, 163.34, 160.57],
    ['2023/03/21', 163.53, 161.68, 165.09, 160.87],
    ['2023/03/22', 160.56, 159.57, 162.81, 158.96],
    ['2023/03/23', 159.46, 157.31, 160.21, 155.69],
    ['2023/03/24', 155.56, 156.37, 157.33, 153.24],
    ['2023/03/27', 157.69, 158.84, 159.62, 155.45],
    ['2023/03/28', 158.47, 159.19, 159.57, 157.61],
    ['2023/03/29', 160.19, 160.22, 160.88, 158.84],
    ['2023/03/30', 160.62, 160.6, 161.94, 159.02],
    ['2023/03/31', 161.33, 162.25, 162.5, 160.39],
    ['2023/04/03', 162.48, 164.18, 164.59, 162.44],
    ['2023/04/04', 164.64, 158.37, 164.64, 157.76],
    ['2023/04/05', 157.32, 153.92, 157.77, 151.29],
    ['2023/04/06', 153.82, 152.5, 153.97, 151.2],
    ['2023/04/10', 151.84, 156.4, 156.94, 151.84],
    ['2023/04/11', 157.08, 154.6, 158.04, 154.31],
    ['2023/04/12', 155.63, 154.45, 155.97, 153.91],
    ['2023/04/13', 154.45, 155.66, 156.07, 153.68],
    ['2023/04/14', 155.01, 155.76, 157.16, 154.8],
    ['2023/04/17', 156.11, 157.03, 157.06, 155.2],
    ['2023/04/18', 157.58, 156.54, 159.35, 155.25],
    ['2023/04/19', 156.24, 155.79, 157.01, 154.99],
    ['2023/04/20', 155.2, 158.78, 159.07, 155.2],
    ['2023/04/21', 158.83, 157.63, 159.47, 156.86],
    ['2023/04/24', 157.98, 159.58, 160.39, 157.98],
    ['2023/04/25', 157.8, 159.85, 160.48, 157.8],
    ['2023/04/26', 158.22, 157.71, 159.11, 155.32],
    ['2023/04/27', 161.94, 171.28, 171.42, 161.65],
    ['2023/04/28', 171.06, 170.84, 173.89, 169.35],
    ['2023/05/01', 170.69, 167.46, 171.83, 166.88],
    ['2023/05/02', 167.18, 166.58, 167.18, 164.67],
    ['2023/05/03', 167.49, 165.8, 168.71, 165.41],
    ['2023/05/04', 164.86, 165.11, 166.35, 164.15],
    ['2023/05/05', 166.87, 167.72, 168.62, 166.53],
    ['2023/05/08', 168.19, 166.31, 168.61, 165.58],
    ['2023/05/09', 166.3, 166.2, 166.73, 164.95],
    ['2023/05/10', 167.02, 166.15, 168.09, 164.78],
    ['2023/05/11', 164.77, 164.88, 166.11, 164.55],
    ['2023/05/12', 165.16, 164.94, 166.87, 164.54],
    ['2023/05/15', 165.19, 165.44, 166.41, 164.39],
    ['2023/05/16', 164.84, 164.13, 165.09, 162.34],
    ['2023/05/17', 164.87, 165.3, 166.02, 164.77],
    ['2023/05/18', 164.77, 166.55, 166.74, 164.4],
    ['2023/05/19', 167.68, 164.79, 167.68, 164.6],
    ['2023/05/22', 165.04, 164.75, 166.23, 163.09],
    ['2023/05/23', 163.37, 162.95, 164.91, 162.53],
    ['2023/05/24', 163.62, 161.53, 164.74, 161.34],
    ['2023/05/25', 162.07, 167.32, 167.72, 161.8],
    ['2023/05/26', 167.75, 170.7, 171.49, 167.75],
    ['2023/05/30', 171.51, 170.86, 173.62, 170.19],
    ['2023/05/31', 170.0, 164.68, 172.09, 163.25],
    ['2023/06/01', 164.69, 165.3, 165.78, 163.29],
    ['2023/06/02', 166.42, 173.03, 173.04, 166.17],
    ['2023/06/05', 172.03, 170.16, 172.53, 167.84],
    ['2023/06/06', 170.33, 174.49, 175.08, 169.95],
    ['2023/06/07', 174.84, 176.55, 176.63, 174.34],
    ['2023/06/08', 175.76, 176.35, 176.73, 174.52],
    ['2023/06/09', 175.03, 174.43, 175.38, 172.67],
    ['2023/06/12', 174.5, 174.55, 176.08, 172.64],
    ['2023/06/13', 174.49, 176.97, 178.29, 174.49],
    ['2023/06/14', 176.4, 175.6, 176.91, 173.61],
    ['2023/06/15', 175.19, 176.66, 176.81, 173.04],
    ['2023/06/16', 178.44, 175.56, 178.74, 174.94],
    ['2023/06/20', 174.84, 174.58, 174.85, 173.08],
    ['2023/06/21', 174.32, 177.75, 177.85, 173.95],
    ['2023/06/22', 177.67, 177.19, 179.09, 176.24],
    ['2023/06/23', 175.85, 175.38, 177.76, 173.85],
    ['2023/06/26', 176.63, 177.39, 178.82, 176.09],
    ['2023/06/27', 177.83, 179.71, 180.06, 177.79],
    ['2023/06/28', 180.24, 179.19, 180.68, 178.67],
    ['2023/06/29', 179.08, 183.27, 183.77, 178.35],
    ['2023/06/30', 184.02, 184.61, 185.48, 182.17],
    ['2023/07/03', 184.18, 184.1, 184.59, 182.77],
    ['2023/07/05', 182.78, 182.48, 183.94, 181.48],
    ['2023/07/06', 181.51, 182.95, 183.24, 180.46],
    ['2023/07/07', 182.39, 184.18, 184.93, 182.39],
    ['2023/07/10', 184.17, 186.0, 187.32, 184.17],
    ['2023/07/11', 186.02, 186.08, 187.48, 184.62],
    ['2023/07/12', 187.58, 187.38, 188.28, 186.31],
    ['2023/07/13', 187.63, 187.46, 188.23, 186.55],
    ['2023/07/14', 187.74, 187.5, 187.82, 185.82],
    ['2023/07/17', 187.81, 188.9, 189.49, 186.87],
    ['2023/07/18', 188.9, 190.77, 192.45, 188.9],
    ['2023/07/19', 192.31, 191.23, 192.38, 187.8],
    ['2023/07/20', 191.78, 190.68, 191.78, 189.04],
    ['2023/07/21', 191.88, 190.35, 191.9, 190.02],
    ['2023/07/24', 191.31, 190.47, 192.13, 189.11],
    ['2023/07/25', 190.13, 189.81, 191.46, 189.55],
    ['2023/07/26', 189.07, 189.2, 190.8, 187.53],
    ['2023/07/27', 195.0, 200.56, 200.6, 193.04],
    ['2023/07/28', 202.21, 211.82, 212.71, 201.85],
    ['2023/07/31', 212.7, 215.04, 215.93, 212.59],
    ['2023/08/01', 214.57, 214.38, 218.03, 213.82],
    ['2023/08/02', 213.6, 216.18, 216.66, 213.3],
]);
var volumes = [
    231700.0,
    195100.0,
    185200.0,
    156900.0,
    268200.0,
    270100.0,
    168000.0,
    189000.0,
    227500.0,
    331400.0,
    248600.0,
    308900.0,
    315100.0,
    313400.0,
    328000.0,
    247600.0,
    270300.0,
    252500.0,
    199800.0,
    318600.0,
    291800.0,
    455700.0,
    317800.0,
    358800.0,
    350300.0,
    340400.0,
    201200.0,
    196200.0,
    243800.0,
    366900.0,
    351000.0,
    1106100.0,
    248800.0,
    172200.0,
    265000.0,
    327600.0,
    350100.0,
    335800.0,
    301800.0,
    239900.0,
    246800.0,
    303900.0,
    216400.0,
    233500.0,
    265000.0,
    161300.0,
    177800.0,
    205600.0,
    285100.0,
    246400.0,
    282200.0,
    194700.0,
    321700.0,
    386800.0,
    336200.0,
    171800.0,
    325900.0,
    288400.0,
    245700.0,
    507300.0,
    588000.0,
    682800.0,
    559800.0,
    373300.0,
    454200.0,
    277200.0,
    333100.0,
    359200.0,
    320500.0,
    398200.0,
    511700.0,
    478100.0,
    470500.0,
    440000.0,
    508100.0,
    404800.0,
    695400.0,
    318500.0,
    364700.0,
    214200.0,
    119000.0,
    224200.0,
    209500.0,
    348700.0,
    149800.0,
    207200.0,
    376000.0,
    298200.0,
    194200.0,
    160400.0,
    194800.0,
    232000.0,
    306600.0,
    433000.0,
    462800.0,
    2007700.0,
    267600.0,
    339900.0,
    307100.0,
    311100.0,
    130800.0,
    132500.0,
    132800.0,
    161500.0,
    157700.0,
    188300.0,
    375800.0,
    261200.0,
    221900.0,
    290100.0,
    244300.0,
    177100.0,
    229600.0,
    175400.0,
    278600.0,
    197600.0,
    130200.0,
    191700.0,
    202200.0,
    213300.0,
    152900.0,
    137000.0,
    153500.0,
    176200.0,
    331900.0,
    247600.0,
    189000.0,
    263800.0,
    284800.0,
    301100.0,
    212900.0,
    428700.0,
    207200.0,
    256600.0,
    154800.0,
    183900.0,
    294500.0,
    268400.0,
    203200.0,
    239200.0,
    743200.0,
    576900.0,
    472600.0,
    555400.0,
    347700.0,
    217500.0,
    209200.0,
    367000.0,
    346900.0,
    320900.0,
    216800.0,
    417200.0,
    272700.0,
    363400.0,
    460600.0,
    453100.0,
    898100.0,
    337600.0,
    314800.0,
    374800.0,
    327200.0,
    339500.0,
    435100.0,
    185100.0,
    205600.0,
    239700.0,
    302900.0,
    776300.0,
    288700.0,
    444900.0,
    245100.0,
    620300.0,
    256700.0,
    287400.0,
    179500.0,
    192600.0,
    174400.0,
    193600.0,
    292900.0,
    403700.0,
    480100.0,
    467200.0,
    690100.0,
    928700.0,
    630900.0,
    623500.0,
    414800.0,
    335400.0,
    318600.0,
    271600.0,
    232200.0,
    237700.0,
    210700.0,
    333000.0,
    237200.0,
    267300.0,
    171100.0,
    335500.0,
    240100.0,
    323000.0,
    372300.0,
    245400.0,
    413200.0,
    539800.0,
    386500.0,
    373800.0,
    276600.0,
    619100.0,
    363300.0,
    499200.0,
    201800.0,
    388800.0,
    310800.0,
    273500.0,
    258300.0,
    379800.0,
    486500.0,
    339900.0,
    366800.0,
    530100.0,
    341400.0,
    448500.0,
    577500.0,
    5885600.0,
    450400.0,
    314800.0,
    567300.0,
    368900.0,
    383200.0,
    114400.0,
    238800.0,
    429500.0,
    583600.0,
    291800.0,
    274500.0,
    218000.0,
    192200.0,
    252300.0,
    213800.0,
    231100.0,
    275900.0,
    250200.0,
    300100.0,
    296400.0,
    302600.0,
    450300.0,
    796800.0,
    857200.0,
    550300.0,
    545400.0,
    368000.0,
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
        text: "EME",
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