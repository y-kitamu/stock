/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_PH");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/15', 305.07, 306.42, 307.01, 303.1],
    ['2022/08/16', 305.28, 306.11, 307.76, 303.65],
    ['2022/08/17', 301.17, 299.19, 302.11, 297.93],
    ['2022/08/18', 300.32, 300.74, 301.14, 297.28],
    ['2022/08/19', 298.72, 295.76, 298.72, 294.35],
    ['2022/08/22', 290.55, 285.06, 291.32, 284.58],
    ['2022/08/23', 285.21, 285.56, 289.3, 284.65],
    ['2022/08/24', 284.72, 285.4, 288.27, 283.07],
    ['2022/08/25', 286.77, 292.38, 292.52, 286.72],
    ['2022/08/26', 291.72, 276.2, 291.72, 276.07],
    ['2022/08/29', 273.84, 273.32, 277.7, 271.75],
    ['2022/08/30', 274.77, 269.61, 275.13, 267.64],
    ['2022/08/31', 269.77, 265.0, 271.02, 264.1],
    ['2022/09/01', 262.58, 267.65, 267.93, 262.23],
    ['2022/09/02', 271.69, 264.87, 272.0, 263.07],
    ['2022/09/06', 265.76, 266.53, 266.94, 262.6],
    ['2022/09/07', 266.59, 273.01, 273.92, 265.4],
    ['2022/09/08', 270.24, 274.76, 274.86, 268.4],
    ['2022/09/09', 276.41, 278.99, 280.16, 275.85],
    ['2022/09/12', 280.54, 282.55, 285.16, 280.44],
    ['2022/09/13', 274.73, 270.28, 276.77, 269.29],
    ['2022/09/14', 271.67, 270.77, 272.8, 267.35],
    ['2022/09/15', 271.14, 267.54, 273.57, 266.73],
    ['2022/09/16', 263.46, 260.1, 264.59, 258.64],
    ['2022/09/19', 258.6, 265.16, 265.77, 258.04],
    ['2022/09/20', 261.34, 258.96, 261.86, 257.32],
    ['2022/09/21', 261.49, 258.63, 266.09, 257.68],
    ['2022/09/22', 258.64, 250.43, 260.15, 249.99],
    ['2022/09/23', 247.6, 244.62, 248.51, 241.28],
    ['2022/09/26', 242.27, 239.98, 245.19, 237.54],
    ['2022/09/27', 243.14, 238.29, 244.53, 235.69],
    ['2022/09/28', 241.13, 247.85, 249.03, 238.98],
    ['2022/09/29', 245.0, 245.56, 246.26, 241.42],
    ['2022/09/30', 246.12, 242.31, 249.93, 242.03],
    ['2022/10/03', 246.34, 252.26, 254.33, 244.28],
    ['2022/10/04', 257.77, 263.03, 263.33, 257.77],
    ['2022/10/05', 258.49, 263.19, 264.87, 256.48],
    ['2022/10/06', 263.43, 260.93, 265.49, 260.72],
    ['2022/10/07', 257.87, 254.19, 258.76, 252.4],
    ['2022/10/10', 256.78, 252.87, 256.86, 250.84],
    ['2022/10/11', 250.6, 255.0, 258.87, 250.1],
    ['2022/10/12', 255.95, 253.17, 256.4, 252.45],
    ['2022/10/13', 247.82, 259.16, 260.67, 244.86],
    ['2022/10/14', 260.16, 254.24, 261.98, 252.55],
    ['2022/10/17', 264.72, 261.98, 267.3, 259.54],
    ['2022/10/18', 269.27, 266.83, 270.52, 263.25],
    ['2022/10/19', 266.33, 265.58, 268.18, 262.22],
    ['2022/10/20', 266.6, 259.91, 268.82, 258.93],
    ['2022/10/21', 261.02, 269.39, 271.26, 258.89],
    ['2022/10/24', 271.6, 277.09, 278.47, 271.0],
    ['2022/10/25', 276.52, 281.86, 282.61, 275.49],
    ['2022/10/26', 284.1, 278.9, 284.29, 276.71],
    ['2022/10/27', 281.66, 283.58, 287.23, 280.66],
    ['2022/10/28', 285.15, 291.65, 292.33, 282.93],
    ['2022/10/31', 288.76, 290.62, 292.95, 287.9],
    ['2022/11/01', 293.23, 288.94, 293.65, 287.71],
    ['2022/11/02', 286.29, 283.55, 295.12, 283.25],
    ['2022/11/03', 283.55, 286.17, 293.72, 278.76],
    ['2022/11/04', 292.41, 298.88, 300.06, 287.31],
    ['2022/11/07', 300.12, 300.64, 301.29, 298.13],
    ['2022/11/08', 302.76, 299.25, 303.43, 295.65],
    ['2022/11/09', 295.93, 289.23, 296.42, 288.22],
    ['2022/11/10', 300.67, 303.32, 304.63, 297.93],
    ['2022/11/11', 305.32, 308.57, 309.81, 302.2],
    ['2022/11/14', 306.63, 306.96, 312.81, 305.67],
    ['2022/11/15', 311.86, 311.06, 313.24, 307.5],
    ['2022/11/16', 310.04, 309.37, 310.69, 306.4],
    ['2022/11/17', 304.25, 304.14, 305.14, 295.48],
    ['2022/11/18', 307.78, 305.63, 307.78, 302.52],
    ['2022/11/21', 304.02, 307.41, 308.7, 304.02],
    ['2022/11/22', 309.51, 309.39, 311.58, 306.82],
    ['2022/11/23', 310.15, 306.35, 310.61, 305.35],
    ['2022/11/25', 307.73, 306.03, 308.35, 305.76],
    ['2022/11/28', 303.0, 295.07, 304.43, 293.79],
    ['2022/11/29', 295.17, 294.29, 299.07, 292.66],
    ['2022/11/30', 294.13, 298.94, 299.04, 288.69],
    ['2022/12/01', 301.09, 297.52, 302.05, 296.25],
    ['2022/12/02', 293.14, 297.38, 297.55, 292.25],
    ['2022/12/05', 293.1, 292.87, 294.21, 290.21],
    ['2022/12/06', 292.64, 290.09, 294.77, 287.1],
    ['2022/12/07', 288.99, 292.06, 292.25, 288.99],
    ['2022/12/08', 294.0, 292.11, 295.23, 290.94],
    ['2022/12/09', 291.91, 289.44, 294.31, 289.1],
    ['2022/12/12', 290.23, 295.84, 296.26, 288.42],
    ['2022/12/13', 304.59, 298.29, 304.59, 296.2],
    ['2022/12/14', 298.5, 296.99, 304.28, 294.94],
    ['2022/12/15', 292.76, 289.63, 292.9, 288.81],
    ['2022/12/16', 286.26, 285.75, 289.52, 284.54],
    ['2022/12/19', 285.77, 282.7, 288.59, 281.89],
    ['2022/12/20', 282.43, 286.62, 288.15, 281.19],
    ['2022/12/21', 289.59, 292.24, 292.81, 288.46],
    ['2022/12/22', 289.22, 290.52, 290.9, 284.15],
    ['2022/12/23', 289.87, 290.96, 291.19, 288.47],
    ['2022/12/27', 292.01, 292.57, 295.2, 289.61],
    ['2022/12/28', 293.0, 286.87, 294.25, 286.79],
    ['2022/12/29', 289.56, 292.0, 293.49, 287.59],
    ['2022/12/30', 290.79, 291.0, 291.79, 287.49],
    ['2023/01/03', 293.0, 291.76, 293.88, 288.61],
    ['2023/01/04', 294.68, 296.89, 296.9, 291.62],
    ['2023/01/05', 296.18, 298.1, 298.82, 293.66],
    ['2023/01/06', 302.84, 308.55, 310.5, 302.84],
    ['2023/01/09', 309.55, 309.52, 312.64, 308.84],
    ['2023/01/10', 309.44, 310.5, 311.18, 307.48],
    ['2023/01/11', 313.95, 311.32, 313.95, 307.75],
    ['2023/01/12', 313.56, 315.18, 317.0, 311.16],
    ['2023/01/13', 313.51, 317.49, 318.83, 312.03],
    ['2023/01/17', 317.54, 314.71, 319.0, 314.64],
    ['2023/01/18', 315.7, 307.81, 317.54, 307.45],
    ['2023/01/19', 305.48, 297.81, 305.61, 297.12],
    ['2023/01/20', 299.3, 305.32, 306.24, 297.49],
    ['2023/01/23', 305.64, 311.71, 312.15, 304.94],
    ['2023/01/24', 312.01, 312.69, 316.45, 306.72],
    ['2023/01/25', 307.66, 310.2, 310.31, 304.48],
    ['2023/01/26', 311.69, 314.41, 314.67, 307.83],
    ['2023/01/27', 313.15, 319.8, 321.64, 312.06],
    ['2023/01/30', 317.67, 317.3, 321.69, 316.83],
    ['2023/01/31', 319.51, 326.0, 326.25, 315.34],
    ['2023/02/01', 323.74, 328.69, 332.81, 322.86],
    ['2023/02/02', 340.0, 337.55, 344.92, 335.21],
    ['2023/02/03', 336.77, 350.0, 350.36, 336.17],
    ['2023/02/06', 348.25, 348.99, 352.74, 346.02],
    ['2023/02/07', 348.04, 349.02, 350.24, 339.83],
    ['2023/02/08', 346.41, 351.99, 352.75, 346.32],
    ['2023/02/09', 353.31, 351.62, 357.42, 349.06],
    ['2023/02/10', 350.26, 348.88, 351.48, 347.74],
    ['2023/02/13', 350.06, 352.04, 355.42, 346.81],
    ['2023/02/14', 349.79, 352.35, 354.65, 348.03],
    ['2023/02/15', 351.43, 361.16, 361.34, 351.01],
    ['2023/02/16', 356.66, 354.54, 361.17, 353.5],
    ['2023/02/17', 353.96, 355.48, 356.98, 349.72],
    ['2023/02/21', 352.55, 343.54, 354.34, 342.28],
    ['2023/02/22', 344.48, 345.32, 348.93, 343.17],
    ['2023/02/23', 347.85, 349.01, 349.57, 343.46],
    ['2023/02/24', 345.86, 348.03, 348.13, 339.78],
    ['2023/02/27', 352.76, 350.48, 354.0, 349.48],
    ['2023/02/28', 350.65, 351.85, 354.44, 348.97],
    ['2023/03/01', 351.08, 353.35, 355.8, 349.96],
    ['2023/03/02', 351.8, 355.5, 357.06, 350.32],
    ['2023/03/03', 356.87, 359.85, 360.3, 354.31],
    ['2023/03/06', 359.39, 360.5, 364.26, 359.17],
    ['2023/03/07', 361.28, 359.54, 363.09, 358.55],
    ['2023/03/08', 359.65, 362.67, 363.03, 358.28],
    ['2023/03/09', 364.42, 350.93, 364.57, 350.75],
    ['2023/03/10', 350.99, 338.47, 351.36, 337.42],
    ['2023/03/13', 333.91, 332.09, 335.78, 326.76],
    ['2023/03/14', 338.32, 334.22, 338.96, 327.98],
    ['2023/03/15', 326.11, 313.54, 329.84, 309.29],
    ['2023/03/16', 309.8, 314.0, 317.64, 304.75],
    ['2023/03/17', 310.64, 304.92, 310.64, 300.86],
    ['2023/03/20', 307.48, 315.83, 316.52, 307.48],
    ['2023/03/21', 322.58, 326.21, 328.75, 322.32],
    ['2023/03/22', 326.21, 322.12, 333.47, 321.89],
    ['2023/03/23', 321.51, 320.42, 327.69, 316.23],
    ['2023/03/24', 315.62, 320.87, 321.03, 310.78],
    ['2023/03/27', 325.62, 324.66, 325.94, 321.52],
    ['2023/03/28', 324.55, 327.74, 329.26, 324.55],
    ['2023/03/29', 331.0, 334.17, 334.42, 329.2],
    ['2023/03/30', 336.87, 336.57, 338.64, 335.2],
    ['2023/03/31', 338.5, 336.11, 339.51, 334.82],
    ['2023/04/03', 336.36, 339.17, 339.87, 331.69],
    ['2023/04/04', 339.52, 320.64, 339.52, 318.67],
    ['2023/04/05', 319.66, 312.58, 320.43, 308.78],
    ['2023/04/06', 311.49, 312.47, 314.49, 308.26],
    ['2023/04/10', 311.85, 315.17, 317.93, 310.48],
    ['2023/04/11', 316.62, 317.98, 321.9, 316.33],
    ['2023/04/12', 320.97, 324.52, 326.9, 319.9],
    ['2023/04/13', 323.71, 319.55, 323.71, 310.06],
    ['2023/04/14', 320.1, 319.11, 324.31, 317.1],
    ['2023/04/17', 320.57, 325.41, 325.73, 319.53],
    ['2023/04/18', 328.12, 324.7, 329.89, 323.09],
    ['2023/04/19', 322.83, 323.43, 324.52, 320.19],
    ['2023/04/20', 320.56, 319.33, 323.89, 318.76],
    ['2023/04/21', 320.68, 320.8, 321.65, 317.13],
    ['2023/04/24', 321.2, 322.96, 323.83, 320.45],
    ['2023/04/25', 320.61, 317.11, 323.33, 315.94],
    ['2023/04/26', 314.26, 311.65, 316.26, 309.89],
    ['2023/04/27', 314.31, 323.3, 324.09, 312.36],
    ['2023/04/28', 324.07, 324.88, 327.42, 321.92],
    ['2023/05/01', 324.87, 327.37, 330.22, 324.87],
    ['2023/05/02', 325.77, 325.02, 327.24, 318.32],
    ['2023/05/03', 326.4, 323.22, 330.31, 323.22],
    ['2023/05/04', 337.93, 322.29, 337.93, 322.19],
    ['2023/05/05', 328.87, 333.3, 335.23, 327.81],
    ['2023/05/08', 337.46, 334.84, 337.68, 330.58],
    ['2023/05/09', 334.13, 339.11, 340.11, 332.56],
    ['2023/05/10', 338.29, 326.88, 339.5, 322.87],
    ['2023/05/11', 323.19, 324.59, 326.74, 321.49],
    ['2023/05/12', 327.65, 323.99, 327.65, 320.64],
    ['2023/05/15', 325.16, 327.7, 328.17, 323.99],
    ['2023/05/16', 325.4, 321.54, 327.0, 321.51],
    ['2023/05/17', 324.29, 330.92, 332.98, 323.3],
    ['2023/05/18', 330.19, 335.15, 338.73, 329.47],
    ['2023/05/19', 339.57, 332.84, 341.27, 330.94],
    ['2023/05/22', 333.6, 334.14, 336.33, 329.11],
    ['2023/05/23', 331.84, 328.78, 333.48, 327.88],
    ['2023/05/24', 327.06, 322.01, 328.76, 321.15],
    ['2023/05/25', 323.94, 327.13, 328.58, 323.21],
    ['2023/05/26', 328.58, 332.88, 333.8, 328.4],
    ['2023/05/30', 334.81, 330.25, 335.78, 329.92],
    ['2023/05/31', 328.32, 320.44, 331.69, 319.14],
    ['2023/06/01', 322.33, 325.99, 326.76, 319.37],
    ['2023/06/02', 330.74, 340.73, 341.73, 329.42],
    ['2023/06/05', 341.38, 337.38, 341.38, 334.99],
    ['2023/06/06', 335.44, 346.58, 346.97, 334.09],
    ['2023/06/07', 348.33, 358.94, 359.24, 345.95],
    ['2023/06/08', 356.08, 355.83, 358.04, 352.31],
    ['2023/06/09', 357.14, 356.13, 357.4, 350.01],
    ['2023/06/12', 356.31, 358.59, 360.05, 353.63],
    ['2023/06/13', 359.67, 368.23, 369.72, 359.67],
    ['2023/06/14', 370.6, 367.55, 371.2, 363.13],
    ['2023/06/15', 369.34, 374.04, 374.64, 366.47],
    ['2023/06/16', 375.72, 369.1, 377.48, 368.75],
    ['2023/06/20', 366.08, 371.85, 373.08, 363.84],
    ['2023/06/21', 370.02, 374.25, 377.12, 366.77],
    ['2023/06/22', 374.07, 371.01, 374.46, 368.81],
    ['2023/06/23', 366.8, 370.12, 370.67, 364.7],
    ['2023/06/26', 370.36, 375.47, 377.95, 370.36],
    ['2023/06/27', 374.32, 380.19, 382.13, 374.32],
    ['2023/06/28', 380.57, 382.45, 382.98, 378.22],
    ['2023/06/29', 380.9, 386.75, 387.3, 378.49],
    ['2023/06/30', 389.77, 390.04, 392.81, 387.44],
    ['2023/07/03', 387.98, 391.01, 391.68, 385.48],
    ['2023/07/05', 385.0, 382.85, 385.68, 381.67],
    ['2023/07/06', 378.84, 378.96, 379.59, 373.69],
    ['2023/07/07', 378.38, 384.17, 388.59, 378.18],
    ['2023/07/10', 386.15, 392.64, 393.16, 384.68],
    ['2023/07/11', 394.18, 398.7, 400.09, 392.31],
    ['2023/07/12', 402.33, 397.09, 402.99, 395.36],
    ['2023/07/13', 398.52, 398.66, 401.97, 394.93],
    ['2023/07/14', 397.37, 396.2, 397.9, 393.23],
    ['2023/07/17', 394.81, 400.95, 401.37, 394.39],
    ['2023/07/18', 400.71, 408.56, 409.62, 395.06],
    ['2023/07/19', 402.61, 403.68, 407.99, 399.89],
    ['2023/07/20', 405.04, 402.81, 407.04, 401.36],
    ['2023/07/21', 403.08, 397.65, 403.08, 397.58],
    ['2023/07/24', 399.12, 397.87, 401.35, 397.0],
    ['2023/07/25', 394.74, 398.09, 399.31, 394.19],
    ['2023/07/26', 396.49, 393.76, 398.53, 391.35],
    ['2023/07/27', 396.26, 397.31, 399.0, 392.91],
    ['2023/07/28', 400.57, 399.57, 400.57, 396.04],
    ['2023/07/31', 401.47, 410.01, 410.15, 399.77],
    ['2023/08/01', 406.76, 414.17, 419.25, 406.09],
    ['2023/08/02', 410.81, 405.87, 417.47, 405.02],
    ['2023/08/03', 420.08, 418.18, 421.18, 397.01],
    ['2023/08/04', 419.47, 414.15, 421.9, 413.35],
    ['2023/08/07', 420.15, 424.95, 425.88, 417.57],
    ['2023/08/08', 421.16, 425.12, 425.69, 416.15],
    ['2023/08/09', 424.66, 422.26, 428.16, 421.91],
    ['2023/08/10', 420.99, 412.76, 424.78, 411.22],
    ['2023/08/11', 412.35, 416.51, 420.25, 412.21],
]);
var volumes = [
    486200.0,
    806200.0,
    924700.0,
    698300.0,
    516300.0,
    774800.0,
    439200.0,
    480000.0,
    472300.0,
    964300.0,
    798200.0,
    757600.0,
    972100.0,
    644200.0,
    491500.0,
    649700.0,
    432600.0,
    462600.0,
    662300.0,
    636800.0,
    719600.0,
    584600.0,
    501300.0,
    1041400.0,
    605100.0,
    830300.0,
    1346000.0,
    900400.0,
    845200.0,
    1351000.0,
    1334800.0,
    1562600.0,
    1312300.0,
    902100.0,
    871200.0,
    1262700.0,
    983300.0,
    774700.0,
    613000.0,
    711200.0,
    822200.0,
    697000.0,
    1357500.0,
    746000.0,
    906000.0,
    904300.0,
    662500.0,
    861400.0,
    1914000.0,
    916900.0,
    1028400.0,
    1088700.0,
    817800.0,
    939800.0,
    991500.0,
    856200.0,
    1124200.0,
    1807900.0,
    1580100.0,
    1019900.0,
    604900.0,
    1037400.0,
    1142100.0,
    819200.0,
    828200.0,
    1160800.0,
    668200.0,
    866700.0,
    732400.0,
    508900.0,
    677700.0,
    801500.0,
    344400.0,
    1345500.0,
    1115900.0,
    1660500.0,
    1028000.0,
    893700.0,
    659700.0,
    701500.0,
    685700.0,
    537700.0,
    504800.0,
    754800.0,
    1047300.0,
    697000.0,
    740800.0,
    1201300.0,
    676200.0,
    554400.0,
    569400.0,
    623700.0,
    325200.0,
    378200.0,
    314300.0,
    542500.0,
    324100.0,
    638800.0,
    757800.0,
    722300.0,
    1135000.0,
    878100.0,
    983000.0,
    866100.0,
    711500.0,
    567500.0,
    691600.0,
    863200.0,
    824700.0,
    864700.0,
    994000.0,
    680700.0,
    447400.0,
    569000.0,
    835300.0,
    786700.0,
    1056700.0,
    1188100.0,
    1711900.0,
    2096600.0,
    1053900.0,
    1154800.0,
    1500300.0,
    1446000.0,
    991400.0,
    946700.0,
    650500.0,
    1001600.0,
    1061400.0,
    822700.0,
    926200.0,
    497000.0,
    636300.0,
    587900.0,
    687400.0,
    712800.0,
    862800.0,
    649100.0,
    596300.0,
    699700.0,
    1077100.0,
    770900.0,
    1011600.0,
    1480000.0,
    1054200.0,
    1612300.0,
    2064800.0,
    1513500.0,
    1809500.0,
    1231600.0,
    1385300.0,
    1241800.0,
    841900.0,
    800500.0,
    693200.0,
    510400.0,
    631700.0,
    528400.0,
    1032900.0,
    1102200.0,
    1121500.0,
    1690200.0,
    714700.0,
    988700.0,
    869300.0,
    955200.0,
    1048000.0,
    947000.0,
    877300.0,
    682300.0,
    531600.0,
    716800.0,
    584700.0,
    478000.0,
    533700.0,
    583000.0,
    1021500.0,
    698800.0,
    852400.0,
    877100.0,
    1078900.0,
    1467900.0,
    1030800.0,
    759200.0,
    1195900.0,
    1452900.0,
    843100.0,
    753100.0,
    495400.0,
    470700.0,
    631100.0,
    736400.0,
    629100.0,
    762800.0,
    893000.0,
    748500.0,
    780300.0,
    558200.0,
    791800.0,
    1143800.0,
    678100.0,
    847900.0,
    533000.0,
    1268300.0,
    1643100.0,
    997700.0,
    590400.0,
    651500.0,
    934600.0,
    1251500.0,
    1015600.0,
    1037800.0,
    787500.0,
    671700.0,
    719900.0,
    1183800.0,
    778300.0,
    760200.0,
    669600.0,
    534100.0,
    607900.0,
    288200.0,
    831000.0,
    873600.0,
    546000.0,
    555600.0,
    743100.0,
    1184600.0,
    840900.0,
    522100.0,
    614400.0,
    634500.0,
    699900.0,
    627100.0,
    731000.0,
    744400.0,
    636800.0,
    725000.0,
    610700.0,
    465600.0,
    812700.0,
    989700.0,
    1174200.0,
    1569400.0,
    963300.0,
    697600.0,
    667000.0,
    654500.0,
    908600.0,
    564500.0,
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
     *     text: "PH",
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