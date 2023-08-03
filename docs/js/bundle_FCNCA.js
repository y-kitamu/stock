/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_FCNCA");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/03', 760.41, 781.01, 789.4, 760.41],
    ['2022/08/04', 780.86, 787.44, 788.5, 770.94],
    ['2022/08/05', 788.72, 796.45, 805.54, 787.53],
    ['2022/08/08', 797.5, 789.42, 801.41, 789.14],
    ['2022/08/09', 789.89, 801.28, 802.43, 782.11],
    ['2022/08/10', 803.4, 816.32, 821.28, 803.4],
    ['2022/08/11', 822.72, 824.92, 828.48, 818.54],
    ['2022/08/12', 830.45, 841.19, 841.76, 828.54],
    ['2022/08/15', 837.64, 848.6, 853.39, 835.7],
    ['2022/08/16', 845.12, 854.51, 861.91, 845.12],
    ['2022/08/17', 844.23, 849.8, 856.02, 837.4],
    ['2022/08/18', 850.37, 848.49, 853.14, 842.58],
    ['2022/08/19', 842.6, 837.16, 842.6, 830.22],
    ['2022/08/22', 826.87, 825.9, 833.21, 820.3],
    ['2022/08/23', 828.2, 819.11, 831.04, 818.63],
    ['2022/08/24', 817.1, 826.62, 830.2, 813.38],
    ['2022/08/25', 827.61, 834.12, 836.99, 822.46],
    ['2022/08/26', 835.02, 811.23, 839.04, 811.23],
    ['2022/08/29', 806.23, 809.68, 817.19, 802.16],
    ['2022/08/30', 813.73, 812.63, 816.91, 801.33],
    ['2022/08/31', 813.94, 809.89, 824.34, 808.69],
    ['2022/09/01', 807.79, 801.71, 808.49, 792.8],
    ['2022/09/02', 806.31, 797.28, 819.82, 793.61],
    ['2022/09/06', 805.69, 795.33, 805.69, 783.34],
    ['2022/09/07', 782.84, 814.79, 820.28, 782.84],
    ['2022/09/08', 808.02, 843.4, 843.4, 808.02],
    ['2022/09/09', 846.04, 844.1, 853.11, 843.56],
    ['2022/09/12', 846.8, 861.55, 867.44, 846.2],
    ['2022/09/13', 847.84, 843.98, 853.22, 839.83],
    ['2022/09/14', 847.73, 855.93, 856.01, 836.59],
    ['2022/09/15', 853.22, 847.97, 866.29, 847.97],
    ['2022/09/16', 829.74, 824.49, 835.24, 814.93],
    ['2022/09/19', 821.63, 849.93, 852.47, 821.63],
    ['2022/09/20', 847.81, 847.84, 856.99, 842.67],
    ['2022/09/21', 848.84, 837.19, 854.67, 835.95],
    ['2022/09/22', 840.83, 815.26, 840.83, 811.53],
    ['2022/09/23', 805.71, 807.02, 808.56, 788.23],
    ['2022/09/26', 800.16, 789.51, 820.31, 788.88],
    ['2022/09/27', 798.52, 788.59, 808.95, 775.52],
    ['2022/09/28', 789.18, 809.4, 816.03, 787.38],
    ['2022/09/29', 801.9, 788.75, 801.9, 776.34],
    ['2022/09/30', 789.58, 795.4, 811.3, 784.66],
    ['2022/10/03', 804.83, 823.34, 827.92, 791.09],
    ['2022/10/04', 833.31, 853.36, 856.72, 833.31],
    ['2022/10/05', 843.24, 850.82, 852.46, 841.95],
    ['2022/10/06', 840.32, 841.31, 847.87, 832.59],
    ['2022/10/07', 835.87, 823.56, 835.87, 820.1],
    ['2022/10/10', 828.4, 829.51, 839.29, 824.4],
    ['2022/10/11', 827.05, 826.08, 846.53, 818.22],
    ['2022/10/12', 826.95, 822.7, 835.18, 814.27],
    ['2022/10/13', 812.78, 851.28, 855.73, 801.64],
    ['2022/10/14', 857.81, 847.96, 866.25, 845.06],
    ['2022/10/17', 858.8, 865.54, 866.55, 855.88],
    ['2022/10/18', 872.77, 871.54, 883.13, 860.13],
    ['2022/10/19', 861.9, 864.88, 874.77, 854.78],
    ['2022/10/20', 864.04, 844.13, 868.44, 839.54],
    ['2022/10/21', 840.66, 844.36, 851.96, 831.38],
    ['2022/10/24', 850.52, 845.3, 855.68, 844.19],
    ['2022/10/25', 839.76, 845.76, 852.65, 839.76],
    ['2022/10/26', 845.12, 852.54, 865.88, 845.12],
    ['2022/10/27', 872.26, 788.29, 881.08, 781.56],
    ['2022/10/28', 798.2, 805.62, 812.76, 788.96],
    ['2022/10/31', 803.94, 820.03, 824.58, 801.03],
    ['2022/11/01', 825.69, 810.73, 825.69, 805.29],
    ['2022/11/02', 810.75, 798.96, 821.03, 795.75],
    ['2022/11/03', 791.8, 808.58, 812.01, 785.3],
    ['2022/11/04', 817.41, 818.14, 826.52, 805.51],
    ['2022/11/07', 825.0, 826.3, 827.39, 813.64],
    ['2022/11/08', 827.47, 841.52, 843.85, 821.26],
    ['2022/11/09', 834.03, 819.81, 845.14, 818.41],
    ['2022/11/10', 842.65, 845.32, 854.32, 841.29],
    ['2022/11/11', 853.34, 830.11, 857.33, 822.47],
    ['2022/11/14', 828.11, 813.77, 841.82, 813.77],
    ['2022/11/15', 828.43, 818.36, 843.38, 816.92],
    ['2022/11/16', 811.9, 788.29, 814.04, 785.68],
    ['2022/11/17', 785.0, 789.23, 796.76, 778.05],
    ['2022/11/18', 807.39, 787.13, 814.38, 779.61],
    ['2022/11/21', 788.02, 798.89, 799.81, 787.1],
    ['2022/11/22', 805.69, 805.69, 816.96, 799.34],
    ['2022/11/23', 799.6, 803.22, 806.92, 797.3],
    ['2022/11/25', 796.64, 810.46, 813.7, 791.29],
    ['2022/11/28', 808.83, 793.43, 810.51, 791.61],
    ['2022/11/29', 799.71, 798.34, 808.66, 794.46],
    ['2022/11/30', 792.6, 815.15, 823.68, 777.89],
    ['2022/12/01', 816.66, 808.9, 823.38, 802.62],
    ['2022/12/02', 803.28, 813.37, 815.62, 802.25],
    ['2022/12/05', 805.69, 795.78, 805.69, 774.59],
    ['2022/12/06', 793.84, 781.25, 793.84, 771.98],
    ['2022/12/07', 782.42, 783.75, 785.74, 773.47],
    ['2022/12/08', 787.38, 788.09, 793.36, 781.34],
    ['2022/12/09', 780.95, 776.18, 790.72, 773.8],
    ['2022/12/12', 771.36, 773.84, 781.37, 766.67],
    ['2022/12/13', 793.41, 757.72, 793.41, 755.27],
    ['2022/12/14', 760.91, 743.63, 760.91, 734.55],
    ['2022/12/15', 737.91, 733.44, 738.55, 721.74],
    ['2022/12/16', 722.15, 728.51, 734.17, 722.15],
    ['2022/12/19', 734.39, 729.01, 738.55, 722.61],
    ['2022/12/20', 732.74, 733.05, 736.19, 729.69],
    ['2022/12/21', 737.84, 745.89, 750.45, 737.84],
    ['2022/12/22', 739.32, 741.21, 743.24, 728.55],
    ['2022/12/23', 742.13, 749.92, 751.28, 736.76],
    ['2022/12/27', 751.07, 749.76, 753.05, 742.14],
    ['2022/12/28', 753.28, 746.88, 755.75, 743.71],
    ['2022/12/29', 745.96, 756.86, 759.06, 744.6],
    ['2022/12/30', 749.92, 757.14, 757.73, 744.95],
    ['2023/01/03', 757.28, 750.22, 757.28, 742.41],
    ['2023/01/04', 753.79, 754.54, 764.08, 748.51],
    ['2023/01/05', 752.22, 754.74, 757.09, 740.2],
    ['2023/01/06', 763.61, 786.8, 791.47, 762.28],
    ['2023/01/09', 788.28, 787.12, 792.97, 783.07],
    ['2023/01/10', 789.31, 800.69, 808.5, 780.28],
    ['2023/01/11', 800.46, 807.36, 815.25, 800.46],
    ['2023/01/12', 809.79, 818.22, 825.77, 804.6],
    ['2023/01/13', 813.69, 828.67, 832.24, 806.8],
    ['2023/01/17', 834.46, 822.68, 839.46, 819.9],
    ['2023/01/18', 821.18, 792.11, 821.18, 792.01],
    ['2023/01/19', 784.3, 788.96, 790.1, 750.37],
    ['2023/01/20', 797.74, 795.94, 803.84, 788.06],
    ['2023/01/23', 801.32, 815.38, 817.84, 797.43],
    ['2023/01/24', 813.57, 798.01, 813.57, 797.41],
    ['2023/01/25', 791.05, 793.79, 796.72, 787.33],
    ['2023/01/26', 787.84, 766.7, 787.84, 726.17],
    ['2023/01/27', 761.08, 768.29, 772.85, 747.57],
    ['2023/01/30', 763.07, 759.28, 777.72, 754.95],
    ['2023/01/31', 765.3, 776.43, 777.78, 753.99],
    ['2023/02/01', 778.8, 779.35, 791.01, 772.58],
    ['2023/02/02', 779.99, 778.91, 787.1, 770.96],
    ['2023/02/03', 773.84, 776.88, 787.4, 771.76],
    ['2023/02/06', 777.65, 777.05, 783.08, 771.76],
    ['2023/02/07', 771.47, 790.08, 792.48, 771.47],
    ['2023/02/08', 793.86, 781.54, 796.51, 777.73],
    ['2023/02/09', 787.11, 766.38, 795.77, 764.78],
    ['2023/02/10', 763.07, 762.97, 768.37, 758.79],
    ['2023/02/13', 764.39, 772.53, 777.85, 763.77],
    ['2023/02/14', 768.26, 767.17, 776.4, 763.54],
    ['2023/02/15', 761.66, 772.88, 774.31, 761.44],
    ['2023/02/16', 765.77, 747.96, 767.86, 746.42],
    ['2023/02/17', 747.96, 760.28, 762.04, 740.45],
    ['2023/02/21', 758.78, 742.51, 759.89, 740.89],
    ['2023/02/22', 741.17, 733.51, 744.99, 725.49],
    ['2023/02/23', 738.4, 741.48, 744.59, 728.05],
    ['2023/02/24', 736.25, 738.37, 742.89, 732.72],
    ['2023/02/27', 750.42, 740.84, 751.43, 735.98],
    ['2023/02/28', 739.65, 733.33, 744.47, 731.78],
    ['2023/03/01', 726.9, 723.31, 730.13, 721.57],
    ['2023/03/02', 715.87, 697.46, 715.87, 685.37],
    ['2023/03/03', 698.0, 701.59, 705.35, 690.1],
    ['2023/03/06', 698.82, 702.3, 708.14, 698.82],
    ['2023/03/07', 696.73, 680.82, 696.73, 673.9],
    ['2023/03/08', 680.73, 679.22, 691.35, 673.1],
    ['2023/03/09', 679.22, 642.29, 682.35, 637.09],
    ['2023/03/10', 628.63, 615.82, 636.93, 598.99],
    ['2023/03/13', 582.15, 588.47, 632.57, 564.12],
    ['2023/03/14', 622.49, 565.47, 623.85, 564.02],
    ['2023/03/15', 538.0, 539.62, 553.66, 527.91],
    ['2023/03/16', 534.68, 547.14, 563.05, 515.7],
    ['2023/03/17', 534.26, 508.76, 537.63, 505.54],
    ['2023/03/20', 526.08, 562.01, 576.56, 525.21],
    ['2023/03/21', 589.98, 589.33, 599.08, 563.15],
    ['2023/03/22', 587.18, 589.81, 616.72, 579.74],
    ['2023/03/23', 598.07, 588.71, 604.65, 583.46],
    ['2023/03/24', 578.82, 582.21, 588.66, 570.44],
    ['2023/03/27', 867.49, 895.08, 909.46, 823.74],
    ['2023/03/28', 884.49, 915.58, 959.42, 883.52],
    ['2023/03/29', 919.45, 940.72, 942.66, 909.71],
    ['2023/03/30', 942.86, 933.25, 964.41, 927.85],
    ['2023/03/31', 944.44, 972.53, 980.46, 924.36],
    ['2023/04/03', 981.12, 950.23, 987.42, 938.32],
    ['2023/04/04', 957.68, 955.84, 960.61, 941.64],
    ['2023/04/05', 967.43, 996.27, 1016.06, 966.6],
    ['2023/04/06', 981.74, 998.27, 998.57, 981.74],
    ['2023/04/10', 992.41, 993.14, 1005.14, 985.95],
    ['2023/04/11', 999.37, 982.62, 999.37, 980.92],
    ['2023/04/12', 986.37, 976.07, 991.29, 969.94],
    ['2023/04/13', 984.41, 988.71, 1005.17, 974.96],
    ['2023/04/14', 999.41, 976.4, 999.41, 974.36],
    ['2023/04/17', 969.46, 997.4, 1006.16, 964.44],
    ['2023/04/18', 1003.3, 1013.25, 1021.02, 990.86],
    ['2023/04/19', 1011.2, 1062.77, 1065.78, 1000.71],
    ['2023/04/20', 1054.38, 1039.43, 1091.35, 1026.42],
    ['2023/04/21', 1035.74, 1035.06, 1051.26, 1021.7],
    ['2023/04/24', 1031.43, 1015.84, 1032.74, 1015.81],
    ['2023/04/25', 1006.57, 989.48, 1015.41, 984.12],
    ['2023/04/26', 980.19, 1000.6, 1009.42, 980.19],
    ['2023/04/27', 1003.2, 998.51, 1015.28, 994.41],
    ['2023/04/28', 993.91, 1006.59, 1007.18, 986.18],
    ['2023/05/01', 1007.69, 1014.46, 1032.2, 999.77],
    ['2023/05/02', 1008.43, 993.03, 1008.43, 974.55],
    ['2023/05/03', 986.74, 998.55, 1024.19, 986.74],
    ['2023/05/04', 985.77, 956.96, 987.42, 944.76],
    ['2023/05/05', 979.42, 1003.14, 1004.49, 965.43],
    ['2023/05/08', 1049.38, 1089.55, 1100.65, 1042.08],
    ['2023/05/09', 1085.36, 1093.22, 1106.99, 1073.43],
    ['2023/05/10', 1214.94, 1174.66, 1251.35, 1149.32],
    ['2023/05/11', 1192.79, 1233.16, 1251.92, 1151.99],
    ['2023/05/12', 1247.22, 1235.45, 1259.24, 1216.79],
    ['2023/05/15', 1243.16, 1265.21, 1284.01, 1238.37],
    ['2023/05/16', 1253.01, 1260.59, 1282.79, 1253.01],
    ['2023/05/17', 1274.25, 1317.93, 1317.93, 1271.07],
    ['2023/05/18', 1321.9, 1320.33, 1344.65, 1308.75],
    ['2023/05/19', 1324.22, 1305.26, 1334.17, 1296.2],
    ['2023/05/22', 1312.12, 1306.1, 1313.36, 1293.99],
    ['2023/05/23', 1299.23, 1297.5, 1319.18, 1284.24],
    ['2023/05/24', 1293.31, 1291.98, 1301.18, 1279.35],
    ['2023/05/25', 1293.3, 1267.54, 1298.17, 1266.02],
    ['2023/05/26', 1264.26, 1272.4, 1274.85, 1244.27],
    ['2023/05/30', 1282.9, 1269.14, 1282.9, 1247.71],
    ['2023/05/31', 1267.23, 1247.2, 1276.89, 1228.39],
    ['2023/06/01', 1254.89, 1269.83, 1273.47, 1246.04],
    ['2023/06/02', 1281.04, 1298.03, 1320.0, 1281.04],
    ['2023/06/05', 1298.03, 1256.66, 1298.03, 1250.58],
    ['2023/06/06', 1259.75, 1288.71, 1305.33, 1255.0],
    ['2023/06/07', 1283.16, 1276.62, 1303.96, 1272.16],
    ['2023/06/08', 1268.18, 1283.46, 1287.38, 1258.79],
    ['2023/06/09', 1272.77, 1284.97, 1295.18, 1262.81],
    ['2023/06/12', 1274.77, 1268.63, 1291.55, 1248.42],
    ['2023/06/13', 1280.26, 1304.9, 1307.25, 1272.97],
    ['2023/06/14', 1304.7, 1280.7, 1317.84, 1274.11],
    ['2023/06/15', 1273.47, 1298.64, 1306.68, 1273.47],
    ['2023/06/16', 1301.9, 1282.99, 1301.9, 1272.08],
    ['2023/06/20', 1282.9, 1275.74, 1289.27, 1264.14],
    ['2023/06/21', 1275.0, 1252.17, 1276.73, 1250.19],
    ['2023/06/22', 1243.19, 1219.53, 1248.39, 1215.9],
    ['2023/06/23', 1207.9, 1208.38, 1223.12, 1196.74],
    ['2023/06/26', 1208.38, 1189.18, 1234.97, 1185.7],
    ['2023/06/27', 1191.01, 1183.76, 1207.02, 1181.71],
    ['2023/06/28', 1195.09, 1225.28, 1230.45, 1189.38],
    ['2023/06/29', 1241.28, 1273.36, 1277.98, 1232.0],
    ['2023/06/30', 1287.01, 1283.45, 1298.21, 1274.78],
    ['2023/07/03', 1279.87, 1290.61, 1294.61, 1264.92],
    ['2023/07/05', 1288.67, 1277.05, 1299.85, 1263.71],
    ['2023/07/06', 1260.0, 1264.04, 1269.82, 1241.05],
    ['2023/07/07', 1266.54, 1284.88, 1302.49, 1266.54],
    ['2023/07/10', 1284.88, 1286.0, 1299.75, 1278.42],
    ['2023/07/11', 1294.79, 1280.86, 1301.1, 1277.2],
    ['2023/07/12', 1294.97, 1297.24, 1325.0, 1294.14],
    ['2023/07/13', 1309.09, 1311.43, 1321.53, 1297.37],
    ['2023/07/14', 1323.0, 1317.77, 1341.4, 1304.57],
    ['2023/07/17', 1318.98, 1364.0, 1369.77, 1318.98],
    ['2023/07/18', 1368.27, 1367.35, 1386.07, 1358.44],
    ['2023/07/19', 1373.37, 1374.37, 1385.34, 1359.91],
    ['2023/07/20', 1373.19, 1372.39, 1382.96, 1350.12],
    ['2023/07/21', 1376.67, 1365.52, 1378.74, 1354.17],
    ['2023/07/24', 1384.49, 1386.73, 1402.77, 1376.28],
    ['2023/07/25', 1392.99, 1385.35, 1405.77, 1381.6],
    ['2023/07/26', 1403.26, 1414.46, 1428.14, 1403.01],
    ['2023/07/27', 1426.12, 1420.8, 1457.98, 1408.11],
    ['2023/07/28', 1427.82, 1429.28, 1431.97, 1416.72],
    ['2023/07/31', 1441.91, 1431.3, 1441.91, 1399.05],
    ['2023/08/01', 1428.0, 1424.15, 1429.0, 1392.99],
    ['2023/08/02', 1410.0, 1421.32, 1428.65, 1398.47],
]);
var volumes = [
    128500.0,
    89500.0,
    130800.0,
    81800.0,
    120000.0,
    121200.0,
    115000.0,
    105800.0,
    137500.0,
    141500.0,
    109700.0,
    86700.0,
    121500.0,
    121000.0,
    111100.0,
    85800.0,
    162700.0,
    88000.0,
    114300.0,
    124600.0,
    147000.0,
    116700.0,
    97900.0,
    115300.0,
    117700.0,
    94600.0,
    68100.0,
    88200.0,
    99300.0,
    79800.0,
    94700.0,
    314800.0,
    110700.0,
    162400.0,
    166600.0,
    133400.0,
    151500.0,
    168900.0,
    164300.0,
    295400.0,
    159900.0,
    126400.0,
    132100.0,
    126500.0,
    140200.0,
    143000.0,
    128700.0,
    124900.0,
    140300.0,
    130500.0,
    139700.0,
    85600.0,
    87900.0,
    116600.0,
    103200.0,
    141800.0,
    254300.0,
    141700.0,
    269000.0,
    191400.0,
    312000.0,
    140200.0,
    151500.0,
    103400.0,
    74700.0,
    94900.0,
    50100.0,
    58900.0,
    73100.0,
    87900.0,
    91400.0,
    103200.0,
    65200.0,
    54800.0,
    88600.0,
    80100.0,
    43300.0,
    60100.0,
    49100.0,
    35900.0,
    27800.0,
    62600.0,
    63400.0,
    145800.0,
    81900.0,
    67900.0,
    216200.0,
    84800.0,
    57300.0,
    78200.0,
    74100.0,
    74500.0,
    117300.0,
    144700.0,
    146500.0,
    292900.0,
    109100.0,
    77600.0,
    59000.0,
    48400.0,
    53000.0,
    44800.0,
    44300.0,
    48500.0,
    69300.0,
    60600.0,
    89100.0,
    59600.0,
    67400.0,
    53300.0,
    67300.0,
    64100.0,
    71500.0,
    52400.0,
    85300.0,
    84800.0,
    105600.0,
    65200.0,
    69200.0,
    49300.0,
    67000.0,
    175700.0,
    80700.0,
    105200.0,
    113400.0,
    88100.0,
    110900.0,
    81400.0,
    62200.0,
    49500.0,
    60100.0,
    73700.0,
    70300.0,
    61900.0,
    60800.0,
    47700.0,
    75500.0,
    83900.0,
    77800.0,
    102600.0,
    94500.0,
    64000.0,
    60200.0,
    160000.0,
    85900.0,
    126800.0,
    86700.0,
    76300.0,
    130000.0,
    67100.0,
    191600.0,
    358800.0,
    303300.0,
    237400.0,
    286500.0,
    353000.0,
    475400.0,
    414600.0,
    327700.0,
    456300.0,
    246900.0,
    237200.0,
    1721400.0,
    615500.0,
    331700.0,
    264400.0,
    399300.0,
    239100.0,
    161100.0,
    359700.0,
    233000.0,
    150500.0,
    144400.0,
    145500.0,
    163000.0,
    94800.0,
    150500.0,
    188700.0,
    201300.0,
    185200.0,
    185000.0,
    148200.0,
    193700.0,
    188900.0,
    123200.0,
    177300.0,
    158800.0,
    209100.0,
    138100.0,
    255500.0,
    201400.0,
    276900.0,
    183500.0,
    422000.0,
    298000.0,
    218200.0,
    211100.0,
    149600.0,
    232800.0,
    220900.0,
    115500.0,
    165400.0,
    160600.0,
    167800.0,
    128900.0,
    109600.0,
    133900.0,
    171300.0,
    101800.0,
    86000.0,
    131400.0,
    122400.0,
    115100.0,
    79100.0,
    67100.0,
    152700.0,
    125900.0,
    130900.0,
    111600.0,
    182300.0,
    74500.0,
    97400.0,
    101300.0,
    140500.0,
    126600.0,
    98600.0,
    94600.0,
    93200.0,
    85300.0,
    41300.0,
    73400.0,
    54200.0,
    64700.0,
    57600.0,
    99700.0,
    87500.0,
    72500.0,
    88600.0,
    95400.0,
    68200.0,
    89600.0,
    76000.0,
    48800.0,
    64800.0,
    48200.0,
    55200.0,
    130700.0,
    83400.0,
    104100.0,
    99200.0,
    90600.0,
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
        text: "FCNCA",
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