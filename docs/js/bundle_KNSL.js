/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_KNSL");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/09', 261.3, 264.31, 264.87, 259.0],
    ['2022/08/10', 265.0, 271.8, 272.91, 264.89],
    ['2022/08/11', 270.9, 276.11, 277.92, 270.9],
    ['2022/08/12', 276.25, 277.7, 284.99, 275.83],
    ['2022/08/15', 273.01, 280.68, 281.08, 270.87],
    ['2022/08/16', 279.71, 284.45, 285.26, 279.71],
    ['2022/08/17', 284.41, 283.0, 284.41, 278.94],
    ['2022/08/18', 280.56, 278.24, 282.89, 268.33],
    ['2022/08/19', 277.06, 277.25, 280.63, 273.43],
    ['2022/08/22', 273.76, 269.54, 274.65, 268.32],
    ['2022/08/23', 266.85, 265.71, 269.0, 261.93],
    ['2022/08/24', 267.16, 265.45, 270.62, 265.12],
    ['2022/08/25', 264.5, 269.25, 269.48, 263.85],
    ['2022/08/26', 270.75, 262.07, 271.78, 259.11],
    ['2022/08/29', 259.07, 261.83, 266.58, 257.43],
    ['2022/08/30', 262.38, 261.85, 263.61, 258.63],
    ['2022/08/31', 261.73, 253.58, 263.8, 251.3],
    ['2022/09/01', 253.58, 255.69, 257.0, 249.8],
    ['2022/09/02', 258.83, 254.59, 260.94, 252.78],
    ['2022/09/06', 253.13, 253.17, 255.45, 250.87],
    ['2022/09/07', 253.64, 258.2, 259.44, 253.64],
    ['2022/09/08', 256.1, 253.61, 258.9, 251.96],
    ['2022/09/09', 253.06, 245.88, 253.87, 244.51],
    ['2022/09/12', 246.69, 248.14, 249.74, 243.26],
    ['2022/09/13', 244.11, 242.73, 245.95, 241.49],
    ['2022/09/14', 243.08, 248.01, 249.22, 239.82],
    ['2022/09/15', 246.31, 243.56, 246.31, 241.34],
    ['2022/09/16', 243.71, 246.37, 247.1, 240.93],
    ['2022/09/19', 242.78, 251.24, 252.16, 241.35],
    ['2022/09/20', 249.66, 254.3, 255.33, 248.78],
    ['2022/09/21', 256.55, 254.54, 262.37, 254.28],
    ['2022/09/22', 254.23, 251.87, 254.3, 247.82],
    ['2022/09/23', 248.05, 245.75, 252.15, 243.49],
    ['2022/09/26', 243.02, 248.43, 251.37, 243.02],
    ['2022/09/27', 251.1, 245.38, 251.99, 240.35],
    ['2022/09/28', 248.19, 256.18, 257.82, 240.52],
    ['2022/09/29', 254.09, 258.72, 261.55, 251.4],
    ['2022/09/30', 258.46, 255.42, 267.66, 255.41],
    ['2022/10/03', 256.64, 261.1, 263.37, 254.21],
    ['2022/10/04', 264.77, 269.85, 271.2, 264.77],
    ['2022/10/05', 269.74, 271.61, 275.0, 268.44],
    ['2022/10/06', 271.5, 268.18, 273.99, 266.68],
    ['2022/10/07', 265.34, 262.28, 268.43, 261.0],
    ['2022/10/10', 263.95, 271.95, 273.13, 262.44],
    ['2022/10/11', 272.35, 274.56, 278.76, 270.87],
    ['2022/10/12', 274.17, 270.03, 274.17, 268.87],
    ['2022/10/13', 264.98, 282.6, 283.37, 262.14],
    ['2022/10/14', 284.11, 275.73, 284.75, 273.28],
    ['2022/10/17', 277.98, 278.12, 280.2, 273.23],
    ['2022/10/18', 282.39, 282.53, 285.66, 277.87],
    ['2022/10/19', 281.04, 281.13, 283.06, 275.04],
    ['2022/10/20', 280.41, 269.75, 281.0, 265.67],
    ['2022/10/21', 272.08, 276.74, 278.49, 270.2],
    ['2022/10/24', 279.09, 275.01, 280.76, 273.13],
    ['2022/10/25', 273.85, 268.2, 273.85, 260.04],
    ['2022/10/26', 270.76, 271.4, 276.35, 268.17],
    ['2022/10/27', 272.65, 272.01, 280.08, 271.01],
    ['2022/10/28', 285.41, 313.4, 314.74, 283.0],
    ['2022/10/31', 314.35, 315.17, 318.37, 308.28],
    ['2022/11/01', 318.46, 323.03, 325.27, 314.63],
    ['2022/11/02', 319.71, 308.24, 320.84, 305.16],
    ['2022/11/03', 303.16, 319.2, 322.16, 302.54],
    ['2022/11/04', 317.16, 324.39, 325.0, 315.02],
    ['2022/11/07', 323.93, 330.22, 331.26, 320.07],
    ['2022/11/08', 332.33, 330.85, 334.99, 324.69],
    ['2022/11/09', 327.14, 318.3, 327.57, 318.28],
    ['2022/11/10', 323.04, 317.83, 326.02, 313.14],
    ['2022/11/11', 309.38, 283.21, 312.05, 281.87],
    ['2022/11/14', 283.0, 290.67, 294.98, 280.21],
    ['2022/11/15', 293.74, 286.1, 294.74, 282.83],
    ['2022/11/16', 287.31, 296.47, 300.49, 286.03],
    ['2022/11/17', 291.91, 300.35, 300.35, 290.26],
    ['2022/11/18', 304.54, 308.01, 308.01, 302.83],
    ['2022/11/21', 309.0, 308.3, 311.42, 306.71],
    ['2022/11/22', 308.87, 310.21, 312.0, 305.82],
    ['2022/11/23', 311.04, 304.41, 312.23, 301.86],
    ['2022/11/25', 307.88, 311.13, 314.87, 306.28],
    ['2022/11/28', 310.63, 307.12, 312.05, 306.68],
    ['2022/11/29', 305.75, 301.71, 311.02, 300.94],
    ['2022/11/30', 300.83, 308.21, 309.46, 290.13],
    ['2022/12/01', 308.51, 301.86, 309.6, 301.72],
    ['2022/12/02', 300.44, 302.33, 307.14, 296.32],
    ['2022/12/05', 298.75, 289.24, 298.75, 286.22],
    ['2022/12/06', 289.0, 290.57, 294.04, 286.54],
    ['2022/12/07', 289.54, 289.73, 295.3, 287.88],
    ['2022/12/08', 291.32, 291.91, 296.12, 288.77],
    ['2022/12/09', 290.62, 284.47, 292.42, 283.8],
    ['2022/12/12', 285.99, 284.17, 286.68, 280.36],
    ['2022/12/13', 290.79, 279.87, 290.79, 278.49],
    ['2022/12/14', 279.81, 273.64, 285.57, 272.22],
    ['2022/12/15', 271.47, 270.31, 273.82, 265.9],
    ['2022/12/16', 268.62, 276.46, 278.15, 267.43],
    ['2022/12/19', 274.64, 261.55, 277.95, 258.78],
    ['2022/12/20', 264.91, 273.06, 273.95, 263.83],
    ['2022/12/21', 275.56, 280.78, 282.78, 274.14],
    ['2022/12/22', 279.28, 276.45, 279.28, 271.79],
    ['2022/12/23', 272.42, 273.8, 275.34, 270.03],
    ['2022/12/27', 274.6, 272.57, 274.9, 270.62],
    ['2022/12/28', 272.98, 261.45, 273.0, 260.5],
    ['2022/12/29', 264.49, 264.38, 266.13, 262.14],
    ['2022/12/30', 261.99, 261.52, 263.36, 256.92],
    ['2023/01/03', 262.73, 260.29, 265.38, 257.04],
    ['2023/01/04', 262.48, 257.68, 264.29, 257.26],
    ['2023/01/05', 257.68, 256.9, 261.54, 255.2],
    ['2023/01/06', 258.45, 271.9, 273.73, 255.67],
    ['2023/01/09', 269.49, 272.89, 280.77, 269.49],
    ['2023/01/10', 274.63, 281.13, 283.7, 273.9],
    ['2023/01/11', 280.99, 283.97, 286.93, 280.65],
    ['2023/01/12', 285.25, 289.02, 290.37, 280.4],
    ['2023/01/13', 289.0, 291.0, 297.13, 286.65],
    ['2023/01/17', 291.02, 286.11, 292.5, 281.42],
    ['2023/01/18', 286.11, 279.94, 288.94, 279.62],
    ['2023/01/19', 278.83, 276.41, 279.81, 274.29],
    ['2023/01/20', 272.78, 264.47, 277.09, 250.9],
    ['2023/01/23', 264.45, 267.11, 267.12, 256.7],
    ['2023/01/24', 265.79, 274.87, 275.56, 265.58],
    ['2023/01/25', 274.92, 270.54, 276.68, 269.75],
    ['2023/01/26', 272.0, 272.27, 274.84, 269.77],
    ['2023/01/27', 271.29, 273.08, 273.4, 265.48],
    ['2023/01/30', 271.71, 273.02, 277.37, 271.71],
    ['2023/01/31', 275.22, 278.44, 279.4, 274.5],
    ['2023/02/01', 276.22, 282.41, 287.16, 276.22],
    ['2023/02/02', 281.76, 283.0, 283.54, 264.57],
    ['2023/02/03', 284.43, 290.5, 293.0, 281.15],
    ['2023/02/06', 291.95, 297.0, 303.42, 291.95],
    ['2023/02/07', 297.0, 302.87, 303.31, 294.79],
    ['2023/02/08', 302.12, 299.0, 305.1, 298.99],
    ['2023/02/09', 300.1, 294.39, 302.87, 294.28],
    ['2023/02/10', 294.93, 290.29, 296.79, 290.0],
    ['2023/02/13', 293.0, 297.83, 299.86, 291.96],
    ['2023/02/14', 297.83, 290.5, 299.81, 289.86],
    ['2023/02/15', 290.0, 299.63, 301.29, 290.0],
    ['2023/02/16', 296.96, 292.01, 299.34, 292.01],
    ['2023/02/17', 311.04, 334.31, 337.11, 311.04],
    ['2023/02/21', 327.64, 320.13, 327.64, 314.03],
    ['2023/02/22', 323.24, 322.4, 327.16, 318.89],
    ['2023/02/23', 322.39, 321.44, 327.47, 312.09],
    ['2023/02/24', 320.37, 316.54, 321.84, 315.29],
    ['2023/02/27', 316.75, 317.04, 325.24, 316.06],
    ['2023/02/28', 317.99, 318.7, 326.22, 316.55],
    ['2023/03/01', 318.38, 317.4, 323.65, 315.48],
    ['2023/03/02', 315.98, 316.75, 319.11, 314.07],
    ['2023/03/03', 317.08, 316.82, 317.75, 310.7],
    ['2023/03/06', 316.99, 320.1, 320.11, 312.62],
    ['2023/03/07', 317.3, 312.46, 319.73, 310.08],
    ['2023/03/08', 313.66, 313.29, 316.27, 310.7],
    ['2023/03/09', 313.31, 307.69, 313.8, 304.7],
    ['2023/03/10', 304.12, 294.19, 305.8, 291.9],
    ['2023/03/13', 287.94, 288.03, 297.62, 285.34],
    ['2023/03/14', 294.94, 295.26, 297.68, 289.01],
    ['2023/03/15', 287.53, 288.12, 290.17, 277.9],
    ['2023/03/16', 285.64, 298.91, 300.73, 283.03],
    ['2023/03/17', 296.74, 281.91, 298.61, 278.11],
    ['2023/03/20', 284.6, 290.41, 292.6, 283.41],
    ['2023/03/21', 296.92, 295.95, 299.05, 294.05],
    ['2023/03/22', 293.02, 287.29, 296.48, 286.8],
    ['2023/03/23', 286.34, 285.32, 291.39, 282.2],
    ['2023/03/24', 281.47, 288.2, 289.04, 280.71],
    ['2023/03/27', 293.16, 293.5, 296.32, 290.83],
    ['2023/03/28', 292.4, 296.96, 297.48, 291.75],
    ['2023/03/29', 299.99, 300.76, 302.91, 298.65],
    ['2023/03/30', 301.6, 296.28, 304.37, 295.1],
    ['2023/03/31', 299.61, 300.15, 301.37, 295.26],
    ['2023/04/03', 299.7, 301.61, 303.19, 296.06],
    ['2023/04/04', 302.88, 296.58, 302.88, 292.37],
    ['2023/04/05', 294.76, 300.37, 300.51, 293.84],
    ['2023/04/06', 302.12, 305.96, 309.35, 301.0],
    ['2023/04/10', 305.94, 309.87, 311.48, 303.92],
    ['2023/04/11', 311.35, 313.53, 314.52, 309.89],
    ['2023/04/12', 314.0, 317.64, 320.83, 313.37],
    ['2023/04/13', 316.82, 317.38, 318.99, 313.68],
    ['2023/04/14', 317.08, 311.38, 317.48, 308.58],
    ['2023/04/17', 311.89, 317.54, 318.2, 311.76],
    ['2023/04/18', 318.2, 320.79, 322.45, 318.2],
    ['2023/04/19', 322.25, 316.56, 323.3, 316.3],
    ['2023/04/20', 315.83, 327.32, 328.47, 315.83],
    ['2023/04/21', 327.29, 330.8, 330.86, 317.52],
    ['2023/04/24', 329.79, 331.48, 339.58, 329.79],
    ['2023/04/25', 326.47, 333.15, 335.11, 326.47],
    ['2023/04/26', 329.43, 329.68, 336.32, 327.91],
    ['2023/04/27', 328.68, 336.74, 339.36, 326.98],
    ['2023/04/28', 339.99, 326.71, 345.75, 321.66],
    ['2023/05/01', 326.46, 327.42, 338.74, 323.9],
    ['2023/05/02', 326.93, 328.55, 331.72, 322.51],
    ['2023/05/03', 332.3, 329.79, 337.03, 329.52],
    ['2023/05/04', 327.29, 321.46, 329.87, 318.85],
    ['2023/05/05', 322.69, 328.43, 330.83, 322.69],
    ['2023/05/08', 329.68, 333.73, 334.55, 328.91],
    ['2023/05/09', 333.31, 331.9, 337.43, 331.22],
    ['2023/05/10', 333.27, 332.37, 335.45, 325.34],
    ['2023/05/11', 331.47, 331.68, 334.46, 326.12],
    ['2023/05/12', 333.87, 329.69, 338.24, 325.05],
    ['2023/05/15', 329.66, 333.38, 333.99, 327.52],
    ['2023/05/16', 332.76, 329.78, 332.76, 327.43],
    ['2023/05/17', 329.78, 322.59, 332.15, 320.6],
    ['2023/05/18', 322.33, 323.81, 327.96, 316.08],
    ['2023/05/19', 326.25, 321.17, 328.51, 319.37],
    ['2023/05/22', 321.34, 324.19, 326.39, 317.0],
    ['2023/05/23', 321.86, 312.67, 322.05, 308.99],
    ['2023/05/24', 309.48, 303.43, 309.48, 303.0],
    ['2023/05/25', 302.36, 302.1, 304.71, 297.33],
    ['2023/05/26', 302.1, 307.21, 309.53, 299.89],
    ['2023/05/30', 307.21, 312.78, 314.14, 304.84],
    ['2023/05/31', 312.72, 302.98, 313.34, 301.74],
    ['2023/06/01', 304.7, 312.48, 312.5, 301.79],
    ['2023/06/02', 320.57, 337.65, 340.62, 320.57],
    ['2023/06/05', 334.16, 344.14, 345.32, 332.32],
    ['2023/06/06', 345.71, 354.13, 356.34, 344.0],
    ['2023/06/07', 355.0, 355.82, 358.72, 353.36],
    ['2023/06/08', 356.36, 356.94, 358.22, 351.55],
    ['2023/06/09', 357.49, 356.24, 358.96, 352.18],
    ['2023/06/12', 357.03, 348.77, 358.46, 346.57],
    ['2023/06/13', 349.63, 352.64, 354.63, 347.4],
    ['2023/06/14', 349.94, 344.08, 353.5, 343.65],
    ['2023/06/15', 344.47, 350.09, 350.12, 343.52],
    ['2023/06/16', 355.1, 355.55, 360.95, 351.07],
    ['2023/06/20', 356.05, 355.5, 358.61, 350.87],
    ['2023/06/21', 356.09, 362.6, 364.96, 355.38],
    ['2023/06/22', 363.56, 362.28, 364.92, 357.45],
    ['2023/06/23', 357.26, 358.31, 365.14, 355.13],
    ['2023/06/26', 361.2, 360.58, 369.68, 358.67],
    ['2023/06/27', 361.5, 366.47, 369.46, 361.5],
    ['2023/06/28', 365.96, 364.14, 369.33, 362.43],
    ['2023/06/29', 364.14, 371.97, 373.34, 363.66],
    ['2023/06/30', 374.99, 374.2, 378.71, 374.07],
    ['2023/07/03', 374.08, 369.67, 376.37, 369.0],
    ['2023/07/05', 368.6, 368.46, 369.38, 364.88],
    ['2023/07/06', 367.33, 368.88, 372.46, 365.86],
    ['2023/07/07', 368.7, 367.66, 370.42, 365.23],
    ['2023/07/10', 367.23, 367.02, 370.46, 364.8],
    ['2023/07/11', 365.26, 371.74, 372.2, 365.26],
    ['2023/07/12', 373.03, 364.51, 374.82, 364.36],
    ['2023/07/13', 363.24, 362.37, 365.75, 360.0],
    ['2023/07/14', 364.26, 367.16, 368.39, 361.64],
    ['2023/07/17', 369.21, 375.25, 380.86, 369.21],
    ['2023/07/18', 374.44, 377.16, 380.54, 374.44],
    ['2023/07/19', 375.61, 376.39, 378.98, 372.92],
    ['2023/07/20', 378.8, 384.76, 385.63, 377.44],
    ['2023/07/21', 387.41, 382.55, 387.41, 381.73],
    ['2023/07/24', 382.04, 383.64, 385.67, 379.49],
    ['2023/07/25', 380.9, 381.31, 384.68, 380.15],
    ['2023/07/26', 381.6, 385.22, 388.48, 381.6],
    ['2023/07/27', 386.77, 378.57, 388.87, 377.76],
    ['2023/07/28', 381.23, 376.56, 381.98, 370.01],
    ['2023/07/31', 377.47, 372.63, 380.85, 371.62],
    ['2023/08/01', 372.0, 373.5, 375.76, 371.39],
    ['2023/08/02', 372.06, 374.44, 375.33, 370.26],
    ['2023/08/03', 372.16, 376.77, 377.94, 372.08],
    ['2023/08/04', 377.0, 373.18, 381.79, 372.26],
    ['2023/08/07', 376.89, 377.2, 380.5, 375.28],
]);
var volumes = [
    135100.0,
    111900.0,
    121800.0,
    132100.0,
    171100.0,
    126000.0,
    177300.0,
    201800.0,
    160500.0,
    106500.0,
    88400.0,
    74200.0,
    96300.0,
    88800.0,
    59700.0,
    103400.0,
    139900.0,
    79200.0,
    88500.0,
    63100.0,
    110800.0,
    218100.0,
    165900.0,
    116800.0,
    92600.0,
    134200.0,
    81200.0,
    348000.0,
    119900.0,
    145700.0,
    131000.0,
    104900.0,
    195100.0,
    152300.0,
    132400.0,
    233300.0,
    252600.0,
    463900.0,
    208800.0,
    169800.0,
    144500.0,
    127900.0,
    82900.0,
    92600.0,
    193800.0,
    190500.0,
    197000.0,
    228600.0,
    104700.0,
    103400.0,
    101300.0,
    149500.0,
    121400.0,
    175000.0,
    276700.0,
    107500.0,
    219300.0,
    349700.0,
    244200.0,
    129700.0,
    201600.0,
    167800.0,
    149900.0,
    123800.0,
    124800.0,
    125300.0,
    254500.0,
    465800.0,
    219900.0,
    276300.0,
    124600.0,
    127600.0,
    120000.0,
    126700.0,
    91200.0,
    92500.0,
    59300.0,
    68100.0,
    117500.0,
    198200.0,
    135700.0,
    128000.0,
    151900.0,
    143400.0,
    83900.0,
    123000.0,
    113500.0,
    100500.0,
    170600.0,
    136500.0,
    166300.0,
    304100.0,
    184200.0,
    144200.0,
    157700.0,
    121000.0,
    95900.0,
    100000.0,
    119100.0,
    109300.0,
    256900.0,
    123600.0,
    140000.0,
    132400.0,
    199600.0,
    232800.0,
    156200.0,
    156400.0,
    135700.0,
    199700.0,
    133300.0,
    134200.0,
    140600.0,
    451000.0,
    179500.0,
    126400.0,
    109400.0,
    73900.0,
    139200.0,
    86600.0,
    117100.0,
    166700.0,
    378900.0,
    227400.0,
    178500.0,
    130600.0,
    134500.0,
    118800.0,
    208900.0,
    116400.0,
    114300.0,
    121300.0,
    178300.0,
    428600.0,
    326400.0,
    162200.0,
    141200.0,
    128200.0,
    117000.0,
    223700.0,
    156800.0,
    181600.0,
    149800.0,
    158800.0,
    148300.0,
    134500.0,
    194600.0,
    188400.0,
    205100.0,
    159800.0,
    211800.0,
    149100.0,
    238900.0,
    70600.0,
    102300.0,
    159100.0,
    164300.0,
    133500.0,
    88900.0,
    81200.0,
    115100.0,
    143600.0,
    190600.0,
    127700.0,
    73300.0,
    121000.0,
    102700.0,
    141800.0,
    106500.0,
    118500.0,
    107200.0,
    85700.0,
    71000.0,
    99100.0,
    77400.0,
    129000.0,
    166500.0,
    146400.0,
    194500.0,
    214800.0,
    171300.0,
    305900.0,
    282800.0,
    160600.0,
    121700.0,
    122900.0,
    127600.0,
    74700.0,
    87900.0,
    97200.0,
    78900.0,
    128200.0,
    85800.0,
    77900.0,
    169200.0,
    142300.0,
    129800.0,
    162400.0,
    226600.0,
    183600.0,
    122500.0,
    206600.0,
    124200.0,
    205900.0,
    157000.0,
    348200.0,
    187300.0,
    204400.0,
    238200.0,
    179000.0,
    143000.0,
    206300.0,
    128600.0,
    141600.0,
    126100.0,
    302500.0,
    191600.0,
    130400.0,
    195200.0,
    2701500.0,
    213100.0,
    202400.0,
    187900.0,
    142600.0,
    109300.0,
    88300.0,
    114300.0,
    213000.0,
    142800.0,
    143700.0,
    88400.0,
    102600.0,
    154900.0,
    93000.0,
    202600.0,
    111500.0,
    112200.0,
    109100.0,
    79100.0,
    91400.0,
    88700.0,
    118500.0,
    173500.0,
    176100.0,
    128200.0,
    115900.0,
    91200.0,
    77800.0,
    71800.0,
    78000.0,
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
     *     text: "KNSL",
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