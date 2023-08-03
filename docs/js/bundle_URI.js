/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_URI");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/03', 313.57, 315.19, 316.71, 306.7],
    ['2022/08/04', 316.28, 316.79, 321.62, 312.9],
    ['2022/08/05', 311.62, 320.98, 322.14, 310.69],
    ['2022/08/08', 321.73, 319.7, 326.73, 317.58],
    ['2022/08/09', 318.57, 317.46, 320.03, 314.84],
    ['2022/08/10', 327.12, 325.46, 328.21, 324.3],
    ['2022/08/11', 328.42, 329.7, 331.62, 327.01],
    ['2022/08/12', 331.91, 334.0, 334.23, 329.73],
    ['2022/08/15', 330.04, 334.96, 335.74, 330.04],
    ['2022/08/16', 332.23, 336.74, 341.06, 332.23],
    ['2022/08/17', 329.3, 328.87, 331.25, 327.38],
    ['2022/08/18', 324.07, 320.78, 324.07, 314.56],
    ['2022/08/19', 316.64, 314.29, 318.32, 311.75],
    ['2022/08/22', 309.83, 305.22, 313.0, 304.51],
    ['2022/08/23', 304.17, 304.68, 311.14, 304.17],
    ['2022/08/24', 304.67, 305.66, 311.6, 301.96],
    ['2022/08/25', 307.48, 317.15, 317.38, 306.22],
    ['2022/08/26', 314.54, 304.1, 319.24, 303.93],
    ['2022/08/29', 299.48, 298.94, 302.89, 298.43],
    ['2022/08/30', 300.25, 290.7, 301.31, 285.57],
    ['2022/08/31', 291.68, 289.82, 293.18, 287.8],
    ['2022/09/01', 286.07, 286.5, 286.51, 279.38],
    ['2022/09/02', 291.63, 287.51, 294.58, 285.83],
    ['2022/09/06', 288.37, 289.86, 291.11, 282.09],
    ['2022/09/07', 287.96, 294.86, 295.45, 287.77],
    ['2022/09/08', 291.69, 302.62, 302.86, 289.37],
    ['2022/09/09', 305.59, 308.78, 309.46, 304.96],
    ['2022/09/12', 312.11, 311.02, 314.89, 306.7],
    ['2022/09/13', 299.12, 292.43, 300.32, 291.34],
    ['2022/09/14', 293.38, 287.8, 293.38, 283.11],
    ['2022/09/15', 283.71, 286.52, 293.94, 283.71],
    ['2022/09/16', 283.02, 283.87, 284.26, 276.14],
    ['2022/09/19', 281.96, 293.18, 293.66, 280.99],
    ['2022/09/20', 288.34, 287.56, 288.67, 283.04],
    ['2022/09/21', 290.66, 280.72, 293.73, 280.43],
    ['2022/09/22', 280.47, 271.2, 281.73, 268.42],
    ['2022/09/23', 266.55, 261.37, 267.7, 254.29],
    ['2022/09/26', 259.96, 258.04, 267.76, 255.65],
    ['2022/09/27', 262.31, 262.44, 268.58, 258.58],
    ['2022/09/28', 263.89, 274.92, 276.17, 262.69],
    ['2022/09/29', 270.73, 268.1, 272.1, 262.41],
    ['2022/09/30', 266.81, 268.07, 274.53, 262.99],
    ['2022/10/03', 274.29, 279.47, 281.79, 271.25],
    ['2022/10/04', 287.2, 292.03, 292.16, 287.15],
    ['2022/10/05', 286.6, 291.65, 294.69, 285.43],
    ['2022/10/06', 290.91, 291.35, 295.88, 289.73],
    ['2022/10/07', 286.08, 282.36, 288.58, 278.77],
    ['2022/10/10', 284.94, 279.88, 286.32, 279.02],
    ['2022/10/11', 277.94, 275.65, 280.43, 271.99],
    ['2022/10/12', 275.67, 274.48, 279.44, 272.22],
    ['2022/10/13', 267.5, 281.2, 284.63, 258.99],
    ['2022/10/14', 284.72, 274.9, 287.7, 273.31],
    ['2022/10/17', 281.85, 285.66, 287.26, 278.47],
    ['2022/10/18', 294.38, 293.13, 297.1, 287.45],
    ['2022/10/19', 289.75, 284.67, 291.35, 282.02],
    ['2022/10/20', 284.39, 273.29, 287.29, 271.96],
    ['2022/10/21', 272.25, 282.52, 283.71, 268.99],
    ['2022/10/24', 284.78, 288.52, 289.12, 279.96],
    ['2022/10/25', 286.29, 292.7, 294.73, 285.95],
    ['2022/10/26', 295.1, 293.98, 300.22, 290.16],
    ['2022/10/27', 299.63, 296.3, 302.64, 290.89],
    ['2022/10/28', 299.43, 307.24, 307.49, 296.73],
    ['2022/10/31', 307.22, 313.31, 317.21, 305.93],
    ['2022/11/01', 317.31, 318.76, 319.93, 311.89],
    ['2022/11/02', 317.33, 307.1, 321.64, 306.7],
    ['2022/11/03', 301.52, 313.93, 316.54, 301.01],
    ['2022/11/04', 321.47, 321.41, 323.96, 314.55],
    ['2022/11/07', 324.2, 320.54, 324.2, 314.19],
    ['2022/11/08', 322.31, 325.34, 327.7, 318.59],
    ['2022/11/09', 321.2, 315.27, 323.72, 314.96],
    ['2022/11/10', 330.47, 342.29, 345.59, 330.47],
    ['2022/11/11', 344.77, 346.66, 359.93, 343.62],
    ['2022/11/14', 342.38, 355.39, 361.45, 341.31],
    ['2022/11/15', 365.15, 352.2, 365.15, 348.89],
    ['2022/11/16', 351.49, 344.57, 351.49, 340.32],
    ['2022/11/17', 339.06, 344.78, 349.47, 333.39],
    ['2022/11/18', 350.8, 343.08, 352.26, 338.95],
    ['2022/11/21', 341.6, 346.44, 351.37, 340.18],
    ['2022/11/22', 356.68, 353.54, 357.25, 351.02],
    ['2022/11/23', 352.59, 355.72, 359.17, 351.77],
    ['2022/11/25', 357.27, 356.31, 359.24, 352.31],
    ['2022/11/28', 352.32, 344.95, 356.04, 343.03],
    ['2022/11/29', 345.51, 340.13, 346.3, 338.89],
    ['2022/11/30', 339.41, 350.35, 350.57, 334.88],
    ['2022/12/01', 351.31, 353.72, 355.73, 347.65],
    ['2022/12/02', 347.93, 353.86, 355.84, 344.93],
    ['2022/12/05', 348.97, 343.05, 351.78, 342.19],
    ['2022/12/06', 344.31, 344.65, 347.38, 340.99],
    ['2022/12/07', 342.69, 348.85, 354.45, 342.62],
    ['2022/12/08', 352.91, 358.9, 359.24, 351.8],
    ['2022/12/09', 358.86, 349.95, 360.71, 349.87],
    ['2022/12/12', 351.36, 357.72, 359.03, 348.34],
    ['2022/12/13', 368.46, 364.24, 369.18, 358.97],
    ['2022/12/14', 364.24, 365.35, 371.07, 361.87],
    ['2022/12/15', 357.32, 354.72, 358.84, 350.69],
    ['2022/12/16', 351.31, 350.83, 357.37, 349.01],
    ['2022/12/19', 351.53, 348.58, 354.07, 346.68],
    ['2022/12/20', 348.56, 347.95, 351.02, 346.61],
    ['2022/12/21', 350.76, 357.1, 357.64, 348.58],
    ['2022/12/22', 351.9, 348.22, 352.1, 340.61],
    ['2022/12/23', 347.77, 352.52, 353.04, 346.98],
    ['2022/12/27', 352.54, 355.96, 361.89, 351.35],
    ['2022/12/28', 356.61, 349.21, 358.34, 348.73],
    ['2022/12/29', 352.9, 353.51, 358.0, 351.67],
    ['2022/12/30', 350.28, 352.72, 353.92, 348.01],
    ['2023/01/03', 354.99, 354.0, 356.67, 349.52],
    ['2023/01/04', 357.79, 363.23, 364.74, 357.21],
    ['2023/01/05', 358.85, 361.33, 363.14, 356.44],
    ['2023/01/06', 364.86, 374.48, 376.89, 363.78],
    ['2023/01/09', 379.83, 373.15, 385.79, 371.97],
    ['2023/01/10', 372.38, 378.58, 380.6, 370.04],
    ['2023/01/11', 380.03, 381.06, 384.54, 378.13],
    ['2023/01/12', 381.81, 388.8, 390.99, 379.72],
    ['2023/01/13', 385.28, 389.26, 389.66, 383.43],
    ['2023/01/17', 388.63, 385.92, 389.86, 383.79],
    ['2023/01/18', 388.28, 383.08, 391.41, 381.65],
    ['2023/01/19', 378.21, 370.5, 379.95, 369.82],
    ['2023/01/20', 370.68, 380.76, 380.97, 367.21],
    ['2023/01/23', 383.35, 389.06, 389.93, 381.41],
    ['2023/01/24', 388.18, 390.81, 394.36, 384.33],
    ['2023/01/25', 383.09, 389.5, 391.61, 380.65],
    ['2023/01/26', 411.38, 428.21, 428.61, 401.32],
    ['2023/01/27', 428.72, 430.8, 434.89, 424.94],
    ['2023/01/30', 427.38, 425.78, 433.96, 425.31],
    ['2023/01/31', 426.75, 437.6, 437.82, 422.32],
    ['2023/02/01', 435.69, 451.45, 455.98, 435.04],
    ['2023/02/02', 457.3, 452.74, 462.47, 447.62],
    ['2023/02/03', 445.54, 451.62, 453.97, 443.25],
    ['2023/02/06', 447.58, 450.52, 452.07, 445.84],
    ['2023/02/07', 448.84, 453.92, 456.22, 443.75],
    ['2023/02/08', 452.34, 456.05, 457.45, 450.46],
    ['2023/02/09', 458.47, 448.07, 461.05, 446.48],
    ['2023/02/10', 446.14, 446.7, 448.35, 442.51],
    ['2023/02/13', 448.05, 457.51, 458.62, 447.15],
    ['2023/02/14', 454.63, 454.65, 459.97, 449.37],
    ['2023/02/15', 449.82, 468.61, 468.84, 449.77],
    ['2023/02/16', 461.01, 460.01, 467.11, 458.38],
    ['2023/02/17', 458.38, 459.25, 461.78, 457.21],
    ['2023/02/21', 453.02, 443.69, 458.61, 442.7],
    ['2023/02/22', 443.69, 440.16, 447.21, 438.15],
    ['2023/02/23', 445.36, 444.68, 448.8, 436.78],
    ['2023/02/24', 439.63, 448.47, 449.66, 437.16],
    ['2023/02/27', 452.43, 461.25, 462.97, 451.84],
    ['2023/02/28', 461.71, 466.5, 469.81, 460.56],
    ['2023/03/01', 465.39, 465.77, 473.27, 465.32],
    ['2023/03/02', 463.17, 468.56, 470.03, 457.13],
    ['2023/03/03', 469.33, 477.49, 479.5, 466.57],
    ['2023/03/06', 475.88, 472.96, 479.9, 472.94],
    ['2023/03/07', 474.62, 473.69, 478.91, 472.6],
    ['2023/03/08', 471.87, 475.29, 475.41, 468.46],
    ['2023/03/09', 475.43, 451.72, 477.91, 451.27],
    ['2023/03/10', 451.54, 427.42, 452.4, 423.82],
    ['2023/03/13', 417.18, 406.38, 418.92, 405.89],
    ['2023/03/14', 420.06, 414.28, 423.15, 407.7],
    ['2023/03/15', 400.82, 392.11, 403.49, 380.44],
    ['2023/03/16', 385.83, 395.44, 400.66, 380.65],
    ['2023/03/17', 389.83, 368.48, 390.75, 367.25],
    ['2023/03/20', 373.89, 376.81, 383.68, 373.45],
    ['2023/03/21', 386.92, 396.56, 399.09, 384.98],
    ['2023/03/22', 395.38, 387.52, 403.08, 386.81],
    ['2023/03/23', 389.89, 380.52, 395.65, 372.27],
    ['2023/03/24', 372.8, 369.17, 374.33, 360.07],
    ['2023/03/27', 367.51, 371.21, 373.69, 363.89],
    ['2023/03/28', 370.84, 373.34, 378.12, 369.48],
    ['2023/03/29', 379.66, 382.44, 382.61, 374.5],
    ['2023/03/30', 387.67, 384.52, 389.72, 383.1],
    ['2023/03/31', 388.52, 394.04, 394.22, 386.57],
    ['2023/04/03', 392.96, 387.38, 399.55, 384.06],
    ['2023/04/04', 388.46, 357.57, 388.46, 353.1],
    ['2023/04/05', 350.67, 349.74, 358.17, 345.47],
    ['2023/04/06', 348.47, 353.73, 358.88, 344.13],
    ['2023/04/10', 352.55, 363.34, 364.75, 351.77],
    ['2023/04/11', 365.82, 368.94, 373.36, 365.02],
    ['2023/04/12', 373.99, 374.44, 378.54, 369.66],
    ['2023/04/13', 373.44, 371.72, 375.81, 366.87],
    ['2023/04/14', 374.06, 376.41, 379.37, 371.45],
    ['2023/04/17', 377.81, 381.85, 383.87, 376.96],
    ['2023/04/18', 384.32, 385.6, 387.78, 382.35],
    ['2023/04/19', 381.24, 376.93, 382.35, 374.52],
    ['2023/04/20', 370.93, 373.85, 378.72, 369.77],
    ['2023/04/21', 372.37, 371.04, 372.38, 365.5],
    ['2023/04/24', 372.06, 381.94, 382.44, 372.06],
    ['2023/04/25', 377.85, 376.0, 379.97, 374.44],
    ['2023/04/26', 377.14, 373.38, 379.63, 371.0],
    ['2023/04/27', 354.45, 356.11, 356.43, 343.57],
    ['2023/04/28', 352.99, 359.54, 360.24, 348.72],
    ['2023/05/01', 359.39, 360.07, 366.74, 358.44],
    ['2023/05/02', 357.4, 353.88, 361.08, 346.84],
    ['2023/05/03', 352.94, 348.71, 361.42, 348.13],
    ['2023/05/04', 346.42, 326.95, 346.49, 323.74],
    ['2023/05/05', 336.98, 340.56, 341.56, 333.2],
    ['2023/05/08', 343.57, 339.41, 345.92, 336.13],
    ['2023/05/09', 336.95, 340.67, 343.45, 334.95],
    ['2023/05/10', 345.88, 336.05, 346.69, 328.66],
    ['2023/05/11', 331.45, 334.08, 334.57, 328.39],
    ['2023/05/12', 336.35, 331.66, 338.79, 325.91],
    ['2023/05/15', 332.79, 336.93, 339.95, 328.7],
    ['2023/05/16', 331.36, 326.53, 332.99, 326.41],
    ['2023/05/17', 331.45, 340.22, 344.93, 329.0],
    ['2023/05/18', 339.54, 344.64, 350.61, 338.05],
    ['2023/05/19', 348.83, 349.02, 350.56, 342.27],
    ['2023/05/22', 349.32, 346.21, 351.0, 339.25],
    ['2023/05/23', 343.51, 343.62, 349.33, 339.12],
    ['2023/05/24', 340.49, 333.84, 341.4, 331.68],
    ['2023/05/25', 336.51, 341.53, 343.61, 335.17],
    ['2023/05/26', 344.7, 350.97, 352.71, 344.14],
    ['2023/05/30', 352.59, 346.52, 355.91, 342.33],
    ['2023/05/31', 343.32, 333.79, 345.27, 333.01],
    ['2023/06/01', 335.28, 339.29, 342.42, 330.3],
    ['2023/06/02', 353.14, 361.6, 363.06, 347.23],
    ['2023/06/05', 363.0, 357.63, 363.28, 352.89],
    ['2023/06/06', 353.85, 371.16, 372.38, 353.49],
    ['2023/06/07', 376.21, 387.53, 391.57, 374.22],
    ['2023/06/08', 386.64, 389.61, 393.06, 384.41],
    ['2023/06/09', 390.92, 389.02, 392.44, 384.01],
    ['2023/06/12', 388.43, 390.57, 393.61, 382.24],
    ['2023/06/13', 389.85, 410.09, 414.4, 389.3],
    ['2023/06/14', 411.8, 405.98, 414.53, 401.77],
    ['2023/06/15', 402.47, 409.96, 413.31, 402.47],
    ['2023/06/16', 412.41, 403.09, 413.65, 402.73],
    ['2023/06/20', 399.3, 407.01, 408.96, 396.74],
    ['2023/06/21', 405.36, 414.06, 417.92, 404.8],
    ['2023/06/22', 411.85, 402.47, 411.85, 401.84],
    ['2023/06/23', 395.87, 404.38, 407.0, 392.77],
    ['2023/06/26', 404.33, 412.78, 417.77, 404.33],
    ['2023/06/27', 415.01, 423.27, 426.8, 412.93],
    ['2023/06/28', 421.5, 430.37, 431.81, 419.95],
    ['2023/06/29', 430.08, 435.63, 438.08, 429.4],
    ['2023/06/30', 440.0, 445.37, 448.45, 437.1],
    ['2023/07/03', 443.0, 448.63, 450.65, 442.96],
    ['2023/07/05', 443.0, 441.63, 448.18, 438.97],
    ['2023/07/06', 436.48, 428.28, 440.9, 423.54],
    ['2023/07/07', 428.1, 433.57, 440.26, 426.41],
    ['2023/07/10', 429.78, 444.97, 445.2, 429.78],
    ['2023/07/11', 447.0, 457.32, 459.17, 446.82],
    ['2023/07/12', 468.17, 467.17, 471.82, 460.46],
    ['2023/07/13', 466.7, 458.43, 469.73, 458.07],
    ['2023/07/14', 459.92, 445.45, 460.4, 439.08],
    ['2023/07/17', 444.08, 451.49, 455.4, 442.53],
    ['2023/07/18', 450.72, 464.5, 465.42, 450.72],
    ['2023/07/19', 460.64, 460.49, 469.35, 456.37],
    ['2023/07/20', 460.3, 458.74, 462.13, 454.08],
    ['2023/07/21', 461.34, 450.43, 462.0, 450.05],
    ['2023/07/24', 451.65, 450.21, 455.6, 447.66],
    ['2023/07/25', 448.44, 450.22, 454.39, 445.14],
    ['2023/07/26', 446.99, 445.0, 452.22, 441.26],
    ['2023/07/27', 438.36, 441.12, 445.55, 413.6],
    ['2023/07/28', 447.45, 446.07, 459.3, 440.71],
    ['2023/07/31', 450.13, 464.68, 465.28, 447.49],
    ['2023/08/01', 463.32, 474.0, 477.69, 460.71],
    ['2023/08/02', 468.91, 468.16, 475.44, 465.05],
]);
var volumes = [
    670400.0,
    536000.0,
    510500.0,
    409800.0,
    518400.0,
    558000.0,
    560700.0,
    321300.0,
    399800.0,
    465600.0,
    555000.0,
    1028000.0,
    675900.0,
    567700.0,
    634500.0,
    550600.0,
    457300.0,
    543300.0,
    902200.0,
    979500.0,
    861200.0,
    830700.0,
    657400.0,
    662800.0,
    500600.0,
    546700.0,
    469500.0,
    645400.0,
    833600.0,
    649700.0,
    715700.0,
    1048900.0,
    633300.0,
    608700.0,
    764100.0,
    1014300.0,
    1097500.0,
    728500.0,
    680700.0,
    860200.0,
    534400.0,
    930300.0,
    829200.0,
    478600.0,
    453600.0,
    672700.0,
    828000.0,
    598100.0,
    668700.0,
    668600.0,
    851300.0,
    582700.0,
    542900.0,
    610800.0,
    541300.0,
    956700.0,
    661900.0,
    653100.0,
    841700.0,
    757800.0,
    1047600.0,
    760000.0,
    907400.0,
    652600.0,
    757400.0,
    521300.0,
    579300.0,
    601700.0,
    651400.0,
    545500.0,
    1081800.0,
    1028500.0,
    1153400.0,
    889900.0,
    871400.0,
    795900.0,
    474600.0,
    500100.0,
    641900.0,
    515700.0,
    197700.0,
    674000.0,
    720400.0,
    1218800.0,
    523300.0,
    507600.0,
    470900.0,
    683000.0,
    664800.0,
    862400.0,
    428600.0,
    485900.0,
    731700.0,
    944200.0,
    981600.0,
    1089100.0,
    485500.0,
    555600.0,
    534400.0,
    680900.0,
    270600.0,
    617100.0,
    382400.0,
    404100.0,
    670400.0,
    492900.0,
    584600.0,
    549700.0,
    711400.0,
    806600.0,
    635400.0,
    581000.0,
    694100.0,
    471800.0,
    460600.0,
    583100.0,
    634500.0,
    689600.0,
    743100.0,
    790400.0,
    788300.0,
    1984600.0,
    1274900.0,
    725000.0,
    919500.0,
    1049900.0,
    1209100.0,
    639600.0,
    504300.0,
    751100.0,
    670700.0,
    526400.0,
    487400.0,
    553600.0,
    571600.0,
    738900.0,
    657100.0,
    485900.0,
    758500.0,
    719800.0,
    605100.0,
    463300.0,
    842400.0,
    979000.0,
    706200.0,
    577300.0,
    526700.0,
    647600.0,
    690400.0,
    524500.0,
    790300.0,
    1731400.0,
    1602400.0,
    1279500.0,
    1830600.0,
    1085800.0,
    2179100.0,
    1760600.0,
    1512500.0,
    1206900.0,
    1123200.0,
    1533500.0,
    1251600.0,
    665700.0,
    627500.0,
    715800.0,
    878100.0,
    713400.0,
    1997400.0,
    1839200.0,
    1495200.0,
    904400.0,
    781600.0,
    826000.0,
    1006100.0,
    716600.0,
    692800.0,
    677900.0,
    717400.0,
    787100.0,
    742400.0,
    848700.0,
    1357200.0,
    1771800.0,
    2002700.0,
    967000.0,
    797700.0,
    910100.0,
    878000.0,
    2703000.0,
    1005500.0,
    749400.0,
    631300.0,
    733700.0,
    574400.0,
    728300.0,
    684600.0,
    645100.0,
    876200.0,
    817300.0,
    1181400.0,
    803000.0,
    613100.0,
    745700.0,
    615700.0,
    946600.0,
    766200.0,
    1129300.0,
    953500.0,
    1353100.0,
    729900.0,
    821200.0,
    1631300.0,
    963800.0,
    821600.0,
    726900.0,
    1347500.0,
    1164900.0,
    881500.0,
    1133700.0,
    930900.0,
    948200.0,
    803300.0,
    1110000.0,
    745400.0,
    903100.0,
    880400.0,
    708900.0,
    782800.0,
    382800.0,
    842700.0,
    1013300.0,
    555400.0,
    516900.0,
    912500.0,
    851600.0,
    816400.0,
    1109100.0,
    509300.0,
    586000.0,
    650900.0,
    625700.0,
    523900.0,
    509700.0,
    633000.0,
    835000.0,
    1535300.0,
    704900.0,
    770700.0,
    847600.0,
    841700.0,
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
        text: "URI",
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