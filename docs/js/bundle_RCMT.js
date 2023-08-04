/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_RCMT");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/05', 17.27, 18.48, 18.49, 17.27],
    ['2022/08/08', 18.5, 19.5, 19.5, 18.5],
    ['2022/08/09', 19.48, 17.83, 19.56, 17.54],
    ['2022/08/10', 18.06, 18.96, 19.0, 17.76],
    ['2022/08/11', 17.41, 14.92, 17.91, 14.55],
    ['2022/08/12', 14.75, 13.61, 14.75, 13.01],
    ['2022/08/15', 14.23, 17.26, 17.79, 14.05],
    ['2022/08/16', 17.23, 18.31, 19.08, 17.03],
    ['2022/08/17', 18.25, 16.85, 18.26, 16.64],
    ['2022/08/18', 16.91, 17.04, 17.48, 16.8],
    ['2022/08/19', 17.04, 17.64, 17.77, 16.84],
    ['2022/08/22', 17.64, 17.04, 17.64, 16.56],
    ['2022/08/23', 17.1, 17.97, 18.48, 16.91],
    ['2022/08/24', 17.86, 18.16, 18.31, 17.37],
    ['2022/08/25', 18.19, 18.39, 18.66, 17.61],
    ['2022/08/26', 18.35, 17.75, 18.46, 17.62],
    ['2022/08/29', 17.72, 17.41, 18.1, 17.39],
    ['2022/08/30', 17.56, 17.77, 17.91, 17.3],
    ['2022/08/31', 17.76, 17.46, 18.53, 17.24],
    ['2022/09/01', 17.3, 16.26, 17.38, 15.61],
    ['2022/09/02', 16.46, 15.82, 16.6, 15.67],
    ['2022/09/06', 16.13, 16.01, 16.44, 15.88],
    ['2022/09/07', 15.76, 16.07, 16.25, 15.76],
    ['2022/09/08', 16.02, 16.19, 16.71, 15.8],
    ['2022/09/09', 16.55, 16.76, 16.86, 16.11],
    ['2022/09/12', 16.62, 16.32, 17.05, 16.18],
    ['2022/09/13', 16.09, 15.7, 16.2, 15.57],
    ['2022/09/14', 15.79, 15.88, 16.3, 15.37],
    ['2022/09/15', 15.76, 15.49, 15.93, 15.37],
    ['2022/09/16', 15.4, 15.44, 15.79, 14.95],
    ['2022/09/19', 15.41, 15.88, 16.0, 15.26],
    ['2022/09/20', 15.7, 16.07, 16.18, 15.29],
    ['2022/09/21', 16.12, 15.77, 16.51, 15.73],
    ['2022/09/22', 15.84, 15.62, 15.98, 15.5],
    ['2022/09/23', 15.24, 14.06, 15.3, 13.63],
    ['2022/09/26', 14.26, 15.12, 16.1, 14.22],
    ['2022/09/27', 14.84, 15.54, 15.98, 14.64],
    ['2022/09/28', 15.65, 16.27, 16.7, 15.65],
    ['2022/09/29', 16.2, 16.22, 16.8, 15.79],
    ['2022/09/30', 16.32, 16.69, 17.06, 16.21],
    ['2022/10/03', 17.25, 17.62, 17.86, 16.33],
    ['2022/10/04', 17.67, 17.49, 18.3, 16.88],
    ['2022/10/05', 17.44, 17.3, 17.94, 17.11],
    ['2022/10/06', 17.19, 16.61, 17.65, 16.36],
    ['2022/10/07', 16.73, 16.55, 16.96, 16.36],
    ['2022/10/10', 16.96, 16.6, 16.96, 16.36],
    ['2022/10/11', 16.32, 16.49, 16.77, 16.03],
    ['2022/10/12', 16.55, 16.13, 16.84, 16.02],
    ['2022/10/13', 15.55, 15.79, 16.04, 15.13],
    ['2022/10/14', 15.78, 15.19, 15.88, 15.19],
    ['2022/10/17', 15.41, 16.48, 16.74, 15.41],
    ['2022/10/18', 16.79, 16.66, 17.08, 16.44],
    ['2022/10/19', 16.56, 16.53, 16.83, 16.3],
    ['2022/10/20', 16.72, 16.74, 16.82, 16.43],
    ['2022/10/21', 16.76, 16.72, 16.77, 16.36],
    ['2022/10/24', 16.79, 17.52, 18.09, 16.69],
    ['2022/10/25', 17.5, 18.08, 18.35, 17.37],
    ['2022/10/26', 18.0, 18.16, 19.19, 17.9],
    ['2022/10/27', 18.26, 16.9, 18.33, 16.9],
    ['2022/10/28', 17.12, 17.44, 17.64, 16.62],
    ['2022/10/31', 17.21, 17.5, 17.71, 16.58],
    ['2022/11/01', 17.76, 17.1, 17.93, 17.06],
    ['2022/11/02', 17.26, 17.31, 17.99, 16.8],
    ['2022/11/03', 17.0, 18.38, 18.71, 17.0],
    ['2022/11/04', 18.32, 18.42, 19.66, 18.0],
    ['2022/11/07', 18.0, 17.91, 18.21, 16.7],
    ['2022/11/08', 18.14, 18.95, 19.06, 18.0],
    ['2022/11/09', 18.56, 17.41, 19.35, 17.38],
    ['2022/11/10', 17.57, 16.61, 18.0, 15.81],
    ['2022/11/11', 16.75, 14.77, 16.75, 14.66],
    ['2022/11/14', 15.58, 15.28, 16.98, 15.2],
    ['2022/11/15', 15.5, 15.64, 15.92, 15.41],
    ['2022/11/16', 15.71, 15.74, 16.11, 15.52],
    ['2022/11/17', 15.39, 15.62, 15.67, 15.0],
    ['2022/11/18', 15.75, 15.81, 15.91, 15.3],
    ['2022/11/21', 15.76, 15.04, 15.76, 14.8],
    ['2022/11/22', 15.03, 15.17, 15.34, 14.7],
    ['2022/11/23', 15.12, 15.06, 15.49, 14.87],
    ['2022/11/25', 14.99, 15.09, 15.31, 14.99],
    ['2022/11/28', 14.89, 15.06, 15.49, 14.81],
    ['2022/11/29', 15.08, 14.94, 15.12, 14.63],
    ['2022/11/30', 14.88, 15.28, 15.33, 14.74],
    ['2022/12/01', 15.49, 14.85, 15.59, 14.82],
    ['2022/12/02', 14.81, 14.75, 15.02, 14.61],
    ['2022/12/05', 14.58, 14.36, 14.59, 14.18],
    ['2022/12/06', 14.43, 14.04, 14.58, 13.85],
    ['2022/12/07', 13.94, 13.99, 14.15, 13.5],
    ['2022/12/08', 13.99, 13.92, 14.5, 13.9],
    ['2022/12/09', 13.92, 13.61, 14.31, 13.41],
    ['2022/12/12', 13.61, 14.0, 14.08, 13.38],
    ['2022/12/13', 14.18, 14.41, 14.5, 14.01],
    ['2022/12/14', 14.41, 14.79, 15.19, 14.3],
    ['2022/12/15', 14.64, 14.48, 14.69, 14.18],
    ['2022/12/16', 14.38, 14.49, 14.65, 14.18],
    ['2022/12/19', 14.43, 13.73, 14.43, 13.7],
    ['2022/12/20', 13.6, 13.83, 14.11, 13.39],
    ['2022/12/21', 13.89, 13.88, 14.17, 13.77],
    ['2022/12/22', 13.71, 13.4, 13.71, 13.05],
    ['2022/12/23', 13.14, 11.65, 13.14, 11.52],
    ['2022/12/27', 11.49, 11.96, 12.09, 11.13],
    ['2022/12/28', 11.95, 11.94, 12.06, 11.55],
    ['2022/12/29', 12.1, 12.25, 12.34, 11.95],
    ['2022/12/30', 12.11, 12.34, 12.59, 12.11],
    ['2023/01/03', 12.39, 12.5, 13.22, 12.34],
    ['2023/01/04', 12.37, 12.45, 12.85, 12.3],
    ['2023/01/05', 12.41, 12.56, 12.77, 12.19],
    ['2023/01/06', 12.6, 12.88, 13.11, 12.6],
    ['2023/01/09', 12.78, 12.9, 13.15, 12.73],
    ['2023/01/10', 12.85, 13.06, 13.24, 12.73],
    ['2023/01/11', 13.12, 12.98, 13.12, 12.73],
    ['2023/01/12', 12.9, 12.87, 13.09, 12.81],
    ['2023/01/13', 12.76, 13.06, 13.08, 12.7],
    ['2023/01/17', 13.06, 13.14, 13.45, 13.01],
    ['2023/01/18', 13.32, 12.83, 13.57, 12.67],
    ['2023/01/19', 12.66, 12.59, 12.87, 12.56],
    ['2023/01/20', 12.55, 12.85, 13.05, 12.52],
    ['2023/01/23', 12.98, 12.81, 13.11, 12.7],
    ['2023/01/24', 12.54, 13.04, 13.1, 12.5],
    ['2023/01/25', 13.0, 13.25, 13.25, 12.93],
    ['2023/01/26', 13.27, 13.33, 13.37, 13.12],
    ['2023/01/27', 13.28, 13.25, 13.48, 13.2],
    ['2023/01/30', 13.23, 13.1, 13.31, 13.08],
    ['2023/01/31', 13.17, 13.35, 13.39, 13.1],
    ['2023/02/01', 13.32, 13.52, 13.71, 13.25],
    ['2023/02/02', 13.53, 13.63, 13.85, 13.5],
    ['2023/02/03', 13.63, 13.9, 13.99, 13.63],
    ['2023/02/06', 13.78, 13.42, 13.89, 13.42],
    ['2023/02/07', 13.4, 13.55, 13.59, 13.27],
    ['2023/02/08', 13.45, 13.56, 13.66, 13.44],
    ['2023/02/09', 13.64, 13.55, 13.82, 13.45],
    ['2023/02/10', 13.43, 13.62, 13.82, 13.43],
    ['2023/02/13', 13.6, 13.69, 13.85, 13.37],
    ['2023/02/14', 13.58, 13.73, 13.93, 13.45],
    ['2023/02/15', 13.78, 13.81, 13.89, 13.47],
    ['2023/02/16', 13.58, 13.96, 14.25, 13.58],
    ['2023/02/17', 13.96, 14.05, 14.16, 13.82],
    ['2023/02/21', 14.0, 13.86, 14.04, 13.73],
    ['2023/02/22', 13.9, 14.24, 14.35, 13.9],
    ['2023/02/23', 14.34, 14.64, 14.96, 14.34],
    ['2023/02/24', 14.62, 14.61, 14.71, 14.33],
    ['2023/02/27', 14.76, 14.5, 14.89, 14.31],
    ['2023/02/28', 14.59, 14.42, 14.59, 14.32],
    ['2023/03/01', 14.48, 14.61, 14.75, 14.38],
    ['2023/03/02', 14.53, 14.76, 14.95, 14.47],
    ['2023/03/03', 14.93, 15.0, 15.15, 14.84],
    ['2023/03/06', 15.0, 14.62, 15.08, 14.55],
    ['2023/03/07', 14.5, 14.91, 14.94, 14.47],
    ['2023/03/08', 14.99, 15.08, 15.22, 14.79],
    ['2023/03/09', 14.98, 14.76, 15.13, 14.6],
    ['2023/03/10', 14.71, 13.93, 14.71, 13.53],
    ['2023/03/13', 13.66, 12.97, 13.66, 12.8],
    ['2023/03/14', 13.07, 12.94, 13.65, 12.88],
    ['2023/03/15', 12.69, 12.46, 12.75, 12.13],
    ['2023/03/16', 13.5, 12.98, 13.75, 12.81],
    ['2023/03/17', 13.08, 12.85, 13.09, 12.75],
    ['2023/03/20', 12.89, 12.36, 12.89, 12.06],
    ['2023/03/21', 12.6, 10.89, 12.74, 10.22],
    ['2023/03/22', 10.79, 10.48, 11.49, 10.47],
    ['2023/03/23', 10.48, 10.5, 10.78, 10.11],
    ['2023/03/24', 10.39, 10.32, 10.6, 10.19],
    ['2023/03/27', 10.27, 11.13, 11.29, 10.25],
    ['2023/03/28', 11.03, 11.19, 11.44, 10.99],
    ['2023/03/29', 11.18, 11.43, 11.54, 11.18],
    ['2023/03/30', 11.45, 11.61, 11.87, 11.45],
    ['2023/03/31', 11.61, 11.56, 11.85, 11.47],
    ['2023/04/03', 11.46, 11.41, 11.65, 11.26],
    ['2023/04/04', 11.37, 11.06, 11.48, 10.92],
    ['2023/04/05', 10.92, 11.17, 11.23, 10.68],
    ['2023/04/06', 11.26, 11.43, 11.6, 11.23],
    ['2023/04/10', 11.54, 11.73, 11.84, 11.49],
    ['2023/04/11', 11.68, 11.74, 11.83, 11.5],
    ['2023/04/12', 11.74, 12.0, 12.11, 11.66],
    ['2023/04/13', 12.05, 12.14, 12.2, 11.95],
    ['2023/04/14', 12.04, 12.12, 12.3, 12.02],
    ['2023/04/17', 12.08, 12.4, 12.61, 12.08],
    ['2023/04/18', 12.52, 12.5, 12.6, 12.41],
    ['2023/04/19', 12.49, 12.33, 12.49, 12.2],
    ['2023/04/20', 12.27, 12.15, 12.47, 12.08],
    ['2023/04/21', 12.09, 12.05, 12.19, 11.89],
    ['2023/04/24', 12.02, 11.95, 12.04, 11.91],
    ['2023/04/25', 11.9, 11.39, 12.01, 11.39],
    ['2023/04/26', 11.29, 11.67, 11.99, 11.29],
    ['2023/04/27', 11.67, 11.55, 11.87, 11.32],
    ['2023/04/28', 11.47, 11.24, 11.64, 11.14],
    ['2023/05/01', 11.44, 12.76, 12.95, 11.34],
    ['2023/05/02', 12.65, 12.11, 12.77, 12.05],
    ['2023/05/03', 12.15, 12.29, 12.49, 12.15],
    ['2023/05/04', 12.28, 12.28, 12.6, 12.19],
    ['2023/05/05', 12.28, 12.19, 12.58, 12.19],
    ['2023/05/08', 12.06, 12.21, 12.3, 11.49],
    ['2023/05/09', 12.29, 12.37, 12.45, 11.95],
    ['2023/05/10', 12.2, 12.83, 12.98, 11.99],
    ['2023/05/11', 12.85, 13.56, 14.05, 12.7],
    ['2023/05/12', 13.69, 14.07, 14.23, 13.57],
    ['2023/05/15', 13.93, 13.97, 14.36, 13.78],
    ['2023/05/16', 13.71, 14.0, 14.18, 13.59],
    ['2023/05/17', 14.02, 14.03, 14.19, 13.71],
    ['2023/05/18', 13.96, 15.0, 15.12, 13.96],
    ['2023/05/19', 15.22, 15.55, 15.7, 15.12],
    ['2023/05/22', 15.46, 15.79, 16.25, 15.46],
    ['2023/05/23', 15.26, 15.79, 15.99, 15.19],
    ['2023/05/24', 15.61, 15.95, 16.13, 15.41],
    ['2023/05/25', 15.71, 15.86, 15.98, 15.41],
    ['2023/05/26', 15.78, 16.07, 16.11, 15.69],
    ['2023/05/30', 16.04, 15.95, 16.65, 15.89],
    ['2023/05/31', 15.76, 16.21, 16.33, 15.73],
    ['2023/06/01', 16.16, 16.77, 16.85, 16.16],
    ['2023/06/02', 16.74, 17.08, 17.25, 16.62],
    ['2023/06/05', 17.02, 16.72, 17.11, 16.71],
    ['2023/06/06', 16.57, 16.5, 16.79, 16.15],
    ['2023/06/07', 16.56, 17.27, 17.43, 16.56],
    ['2023/06/08', 16.95, 17.0, 17.35, 16.8],
    ['2023/06/09', 17.24, 17.57, 17.97, 17.24],
    ['2023/06/12', 17.58, 17.7, 17.97, 17.5],
    ['2023/06/13', 17.7, 17.87, 18.06, 17.52],
    ['2023/06/14', 17.96, 17.62, 18.05, 17.43],
    ['2023/06/15', 17.5, 17.63, 17.66, 17.25],
    ['2023/06/16', 17.8, 17.84, 17.84, 17.55],
    ['2023/06/20', 17.8, 17.73, 17.8, 17.5],
    ['2023/06/21', 17.72, 18.39, 18.39, 17.66],
    ['2023/06/22', 18.25, 18.29, 18.85, 18.13],
    ['2023/06/23', 18.07, 17.95, 18.56, 17.79],
    ['2023/06/26', 17.95, 18.23, 18.44, 17.89],
    ['2023/06/27', 18.2, 18.51, 18.61, 18.2],
    ['2023/06/28', 18.41, 18.25, 18.7, 18.23],
    ['2023/06/29', 18.37, 18.44, 18.6, 18.21],
    ['2023/06/30', 18.51, 18.4, 18.85, 18.4],
    ['2023/07/03', 18.4, 18.79, 18.9, 18.4],
    ['2023/07/05', 18.85, 18.55, 18.85, 18.4],
    ['2023/07/06', 18.58, 18.75, 18.93, 18.5],
    ['2023/07/07', 18.6, 18.96, 19.25, 18.41],
    ['2023/07/10', 19.12, 19.29, 19.73, 19.0],
    ['2023/07/11', 19.44, 19.49, 19.85, 19.4],
    ['2023/07/12', 19.51, 19.48, 19.8, 19.32],
    ['2023/07/13', 19.45, 19.62, 19.99, 19.45],
    ['2023/07/14', 19.63, 19.51, 19.73, 19.36],
    ['2023/07/17', 19.65, 19.98, 19.98, 19.46],
    ['2023/07/18', 19.98, 19.54, 20.16, 19.54],
    ['2023/07/19', 19.47, 19.58, 19.78, 19.04],
    ['2023/07/20', 19.59, 19.44, 19.83, 19.43],
    ['2023/07/21', 19.43, 19.06, 19.55, 19.06],
    ['2023/07/24', 19.0, 19.7, 19.7, 18.7],
    ['2023/07/25', 19.59, 19.6, 19.81, 19.22],
    ['2023/07/26', 19.65, 19.69, 19.94, 19.54],
    ['2023/07/27', 19.77, 19.3, 19.77, 19.27],
    ['2023/07/28', 19.56, 19.83, 20.15, 19.42],
    ['2023/07/31', 20.0, 20.31, 20.49, 19.84],
    ['2023/08/01', 20.39, 20.51, 20.53, 20.05],
    ['2023/08/02', 20.5, 19.79, 20.6, 19.53],
    ['2023/08/03', 19.87, 20.11, 20.25, 19.74],
]);
var volumes = [
    60000.0,
    400300.0,
    183000.0,
    147400.0,
    655100.0,
    429200.0,
    893700.0,
    343900.0,
    190900.0,
    91000.0,
    127000.0,
    125600.0,
    131000.0,
    78400.0,
    75400.0,
    56600.0,
    72800.0,
    104300.0,
    120100.0,
    208000.0,
    108300.0,
    104600.0,
    57000.0,
    85600.0,
    83300.0,
    92400.0,
    59900.0,
    58300.0,
    52200.0,
    106900.0,
    47600.0,
    67000.0,
    60900.0,
    49000.0,
    249800.0,
    213500.0,
    145000.0,
    96600.0,
    139100.0,
    699800.0,
    163000.0,
    120700.0,
    55900.0,
    87600.0,
    74600.0,
    79900.0,
    77800.0,
    92500.0,
    175600.0,
    83900.0,
    102000.0,
    64800.0,
    67000.0,
    83400.0,
    87900.0,
    172400.0,
    87100.0,
    139800.0,
    88600.0,
    77700.0,
    87900.0,
    54300.0,
    88600.0,
    88500.0,
    123300.0,
    129300.0,
    104700.0,
    99500.0,
    246800.0,
    281500.0,
    299200.0,
    115700.0,
    88000.0,
    132100.0,
    101300.0,
    121700.0,
    89500.0,
    58800.0,
    21900.0,
    97800.0,
    112700.0,
    104700.0,
    129100.0,
    69800.0,
    81400.0,
    107400.0,
    108400.0,
    57400.0,
    84900.0,
    109800.0,
    108200.0,
    115200.0,
    83200.0,
    73500.0,
    62800.0,
    58600.0,
    70600.0,
    69400.0,
    174000.0,
    180800.0,
    154500.0,
    118800.0,
    446000.0,
    116600.0,
    92800.0,
    61400.0,
    59400.0,
    60000.0,
    92300.0,
    81000.0,
    70900.0,
    41200.0,
    48600.0,
    56500.0,
    54100.0,
    44800.0,
    78700.0,
    80300.0,
    53000.0,
    33800.0,
    27500.0,
    51500.0,
    42500.0,
    53400.0,
    46100.0,
    62600.0,
    63800.0,
    52400.0,
    35800.0,
    40400.0,
    33300.0,
    37700.0,
    29600.0,
    35300.0,
    44500.0,
    42300.0,
    42000.0,
    51700.0,
    71800.0,
    32600.0,
    38600.0,
    29400.0,
    25100.0,
    42600.0,
    40500.0,
    59100.0,
    33700.0,
    40400.0,
    42000.0,
    81400.0,
    75300.0,
    62900.0,
    92700.0,
    186200.0,
    93900.0,
    118900.0,
    947100.0,
    265200.0,
    191700.0,
    102600.0,
    313300.0,
    101400.0,
    115800.0,
    82200.0,
    70000.0,
    102000.0,
    84200.0,
    93800.0,
    67400.0,
    50300.0,
    49100.0,
    57500.0,
    53300.0,
    51800.0,
    66200.0,
    45600.0,
    43600.0,
    65200.0,
    76700.0,
    50000.0,
    66000.0,
    51500.0,
    39700.0,
    82800.0,
    211000.0,
    83900.0,
    62000.0,
    42100.0,
    66800.0,
    104100.0,
    69300.0,
    154900.0,
    213500.0,
    54200.0,
    127700.0,
    49700.0,
    58700.0,
    111500.0,
    134500.0,
    136700.0,
    67900.0,
    66700.0,
    115600.0,
    34000.0,
    74600.0,
    92400.0,
    70900.0,
    67800.0,
    65500.0,
    84700.0,
    62000.0,
    146300.0,
    97000.0,
    77100.0,
    69400.0,
    89700.0,
    48000.0,
    72800.0,
    50100.0,
    65900.0,
    67200.0,
    59600.0,
    43300.0,
    39600.0,
    31500.0,
    45400.0,
    36300.0,
    34800.0,
    85800.0,
    70300.0,
    89600.0,
    81700.0,
    55300.0,
    54400.0,
    49300.0,
    32600.0,
    44700.0,
    72200.0,
    60300.0,
    26200.0,
    61800.0,
    84800.0,
    53600.0,
    45900.0,
    42700.0,
    83300.0,
    71700.0,
    38300.0,
    64800.0,
    40600.0,
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
        text: "RCMT",
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