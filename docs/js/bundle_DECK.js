/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_DECK");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/03', 312.08, 316.15, 318.42, 310.9],
    ['2022/08/04', 313.48, 313.35, 315.59, 309.14],
    ['2022/08/05', 307.22, 317.32, 318.56, 307.22],
    ['2022/08/08', 320.6, 320.16, 328.12, 317.7],
    ['2022/08/09', 318.34, 312.31, 319.97, 307.64],
    ['2022/08/10', 322.84, 327.23, 328.07, 320.68],
    ['2022/08/11', 331.97, 329.05, 336.99, 328.66],
    ['2022/08/12', 329.37, 333.38, 333.52, 326.5],
    ['2022/08/15', 332.6, 338.63, 340.73, 332.43],
    ['2022/08/16', 338.85, 341.65, 345.98, 337.03],
    ['2022/08/17', 335.58, 336.7, 341.16, 333.29],
    ['2022/08/18', 334.71, 337.13, 337.74, 328.43],
    ['2022/08/19', 334.77, 327.31, 336.17, 326.13],
    ['2022/08/22', 322.08, 328.36, 329.94, 320.87],
    ['2022/08/23', 330.84, 326.43, 336.57, 326.12],
    ['2022/08/24', 325.31, 324.25, 330.84, 322.43],
    ['2022/08/25', 323.14, 332.94, 333.19, 323.14],
    ['2022/08/26', 332.67, 328.45, 334.08, 324.32],
    ['2022/08/29', 322.68, 327.9, 331.0, 322.05],
    ['2022/08/30', 330.88, 324.56, 334.0, 321.68],
    ['2022/08/31', 325.95, 321.57, 326.62, 318.68],
    ['2022/09/01', 317.47, 319.87, 320.78, 311.55],
    ['2022/09/02', 323.6, 317.32, 324.89, 315.29],
    ['2022/09/06', 319.79, 324.62, 325.86, 313.34],
    ['2022/09/07', 324.23, 339.42, 340.43, 324.23],
    ['2022/09/08', 334.12, 348.89, 351.34, 332.38],
    ['2022/09/09', 349.68, 348.7, 352.3, 345.88],
    ['2022/09/12', 349.5, 357.67, 358.91, 349.5],
    ['2022/09/13', 343.46, 333.68, 344.11, 331.72],
    ['2022/09/14', 334.5, 334.35, 336.49, 329.35],
    ['2022/09/15', 342.82, 339.3, 352.29, 338.9],
    ['2022/09/16', 334.36, 337.2, 337.49, 329.58],
    ['2022/09/19', 335.12, 342.93, 343.91, 335.12],
    ['2022/09/20', 336.9, 336.92, 341.06, 331.95],
    ['2022/09/21', 338.5, 329.7, 342.25, 329.45],
    ['2022/09/22', 328.0, 321.88, 330.46, 316.62],
    ['2022/09/23', 316.82, 319.98, 320.38, 313.44],
    ['2022/09/26', 320.76, 314.08, 326.07, 312.35],
    ['2022/09/27', 319.42, 319.01, 324.4, 315.98],
    ['2022/09/28', 320.82, 330.12, 331.93, 319.62],
    ['2022/09/29', 325.64, 323.1, 326.53, 318.73],
    ['2022/09/30', 305.55, 312.61, 317.75, 298.61],
    ['2022/10/03', 315.24, 322.99, 326.25, 312.71],
    ['2022/10/04', 331.45, 334.03, 339.18, 330.62],
    ['2022/10/05', 330.66, 341.02, 342.99, 329.97],
    ['2022/10/06', 339.11, 340.43, 346.43, 338.26],
    ['2022/10/07', 333.7, 334.89, 335.23, 329.25],
    ['2022/10/10', 336.67, 331.2, 337.04, 320.14],
    ['2022/10/11', 329.34, 337.52, 342.2, 327.06],
    ['2022/10/12', 337.08, 338.42, 343.76, 332.62],
    ['2022/10/13', 330.56, 343.19, 347.99, 325.06],
    ['2022/10/14', 345.77, 341.04, 351.73, 336.83],
    ['2022/10/17', 346.99, 353.32, 353.92, 344.77],
    ['2022/10/18', 363.7, 361.07, 365.43, 355.74],
    ['2022/10/19', 358.54, 354.55, 360.86, 352.65],
    ['2022/10/20', 358.69, 347.8, 365.82, 345.5],
    ['2022/10/21', 346.13, 363.28, 363.69, 345.02],
    ['2022/10/24', 362.69, 361.62, 363.88, 351.96],
    ['2022/10/25', 365.0, 369.19, 373.14, 364.0],
    ['2022/10/26', 364.9, 361.41, 368.5, 360.75],
    ['2022/10/27', 363.12, 359.93, 367.9, 349.02],
    ['2022/10/28', 346.74, 345.35, 353.26, 337.06],
    ['2022/10/31', 348.74, 349.93, 361.29, 347.48],
    ['2022/11/01', 355.0, 362.98, 367.55, 352.69],
    ['2022/11/02', 360.62, 346.61, 363.89, 346.0],
    ['2022/11/03', 347.33, 356.17, 360.93, 340.46],
    ['2022/11/04', 365.26, 353.64, 365.99, 345.43],
    ['2022/11/07', 358.59, 342.15, 358.59, 339.27],
    ['2022/11/08', 342.56, 333.35, 346.59, 331.12],
    ['2022/11/09', 329.3, 329.72, 337.68, 328.94],
    ['2022/11/10', 343.22, 350.74, 355.54, 342.98],
    ['2022/11/11', 352.16, 345.08, 353.99, 337.68],
    ['2022/11/14', 335.75, 326.23, 342.77, 326.1],
    ['2022/11/15', 335.3, 347.27, 347.55, 328.87],
    ['2022/11/16', 340.56, 347.0, 347.8, 334.25],
    ['2022/11/17', 340.41, 352.95, 355.71, 337.22],
    ['2022/11/18', 362.57, 375.4, 376.38, 360.0],
    ['2022/11/21', 373.23, 364.38, 377.43, 361.34],
    ['2022/11/22', 367.4, 370.13, 371.95, 362.45],
    ['2022/11/23', 370.84, 378.78, 382.42, 369.62],
    ['2022/11/25', 377.73, 381.18, 381.89, 376.0],
    ['2022/11/28', 380.39, 383.48, 389.43, 380.29],
    ['2022/11/29', 385.58, 388.71, 389.38, 383.31],
    ['2022/11/30', 392.45, 398.88, 399.54, 387.55],
    ['2022/12/01', 397.36, 390.41, 402.32, 386.11],
    ['2022/12/02', 385.86, 389.32, 394.81, 385.86],
    ['2022/12/05', 386.34, 377.1, 390.58, 375.43],
    ['2022/12/06', 378.07, 376.33, 378.07, 370.04],
    ['2022/12/07', 373.03, 377.85, 378.69, 369.82],
    ['2022/12/08', 380.3, 380.81, 384.38, 378.12],
    ['2022/12/09', 375.9, 373.09, 381.43, 368.36],
    ['2022/12/12', 374.99, 379.22, 381.56, 370.51],
    ['2022/12/13', 388.04, 380.18, 388.04, 375.04],
    ['2022/12/14', 380.44, 390.03, 392.74, 379.99],
    ['2022/12/15', 383.05, 377.61, 383.05, 375.7],
    ['2022/12/16', 373.36, 369.51, 376.49, 365.96],
    ['2022/12/19', 369.64, 366.82, 370.91, 364.28],
    ['2022/12/20', 364.22, 363.05, 367.73, 361.62],
    ['2022/12/21', 372.13, 382.24, 382.99, 372.13],
    ['2022/12/22', 381.3, 388.64, 391.96, 379.03],
    ['2022/12/23', 389.09, 390.87, 391.55, 384.45],
    ['2022/12/27', 390.66, 396.84, 401.08, 389.11],
    ['2022/12/28', 396.0, 391.18, 398.87, 385.51],
    ['2022/12/29', 395.55, 400.0, 400.22, 393.1],
    ['2022/12/30', 394.38, 399.16, 399.8, 391.4],
    ['2023/01/03', 404.58, 389.23, 404.65, 387.16],
    ['2023/01/04', 389.57, 389.94, 397.12, 387.06],
    ['2023/01/05', 388.3, 395.08, 397.78, 382.56],
    ['2023/01/06', 399.81, 397.57, 402.77, 395.21],
    ['2023/01/09', 394.09, 405.85, 412.95, 392.21],
    ['2023/01/10', 407.67, 406.0, 413.35, 402.25],
    ['2023/01/11', 406.15, 410.46, 411.32, 406.15],
    ['2023/01/12', 411.99, 416.72, 419.09, 408.61],
    ['2023/01/13', 413.18, 420.92, 422.69, 413.11],
    ['2023/01/17', 418.32, 420.0, 423.84, 417.99],
    ['2023/01/18', 420.35, 420.34, 427.01, 420.01],
    ['2023/01/19', 419.12, 416.94, 422.05, 415.72],
    ['2023/01/20', 418.0, 418.0, 420.42, 414.26],
    ['2023/01/23', 422.36, 422.28, 428.13, 419.88],
    ['2023/01/24', 419.0, 422.74, 425.2, 416.58],
    ['2023/01/25', 419.29, 420.55, 421.85, 411.07],
    ['2023/01/26', 426.28, 421.02, 428.03, 416.24],
    ['2023/01/27', 419.53, 426.51, 428.22, 419.53],
    ['2023/01/30', 424.33, 420.35, 430.72, 419.91],
    ['2023/01/31', 422.32, 427.48, 427.48, 417.23],
    ['2023/02/01', 424.08, 428.39, 430.63, 418.5],
    ['2023/02/02', 430.34, 421.33, 433.31, 417.16],
    ['2023/02/03', 415.29, 414.36, 424.92, 409.05],
    ['2023/02/06', 408.62, 416.22, 419.73, 408.61],
    ['2023/02/07', 414.76, 417.61, 418.65, 409.65],
    ['2023/02/08', 412.75, 414.77, 415.91, 408.13],
    ['2023/02/09', 420.0, 420.8, 424.03, 417.33],
    ['2023/02/10', 417.23, 414.53, 425.28, 411.45],
    ['2023/02/13', 418.31, 421.2, 423.34, 414.55],
    ['2023/02/14', 418.17, 423.33, 430.13, 418.04],
    ['2023/02/15', 420.29, 415.49, 422.33, 415.24],
    ['2023/02/16', 410.92, 407.01, 417.55, 405.52],
    ['2023/02/17', 407.26, 405.38, 410.91, 403.77],
    ['2023/02/21', 401.0, 399.48, 409.95, 398.69],
    ['2023/02/22', 399.43, 402.61, 403.36, 397.15],
    ['2023/02/23', 404.35, 404.04, 407.95, 402.26],
    ['2023/02/24', 401.35, 400.2, 403.16, 397.62],
    ['2023/02/27', 404.27, 406.38, 408.96, 403.29],
    ['2023/02/28', 406.58, 416.35, 420.5, 406.58],
    ['2023/03/01', 416.61, 415.59, 425.53, 412.5],
    ['2023/03/02', 414.41, 420.84, 421.59, 411.95],
    ['2023/03/03', 423.31, 428.41, 428.75, 420.73],
    ['2023/03/06', 428.5, 433.52, 435.7, 427.73],
    ['2023/03/07', 434.15, 431.42, 443.8, 431.19],
    ['2023/03/08', 430.78, 430.47, 433.7, 425.98],
    ['2023/03/09', 430.76, 423.61, 433.69, 421.22],
    ['2023/03/10', 424.36, 412.32, 424.36, 405.31],
    ['2023/03/13', 404.94, 409.73, 413.74, 401.27],
    ['2023/03/14', 415.76, 420.0, 425.27, 414.43],
    ['2023/03/15', 409.81, 406.39, 413.3, 395.91],
    ['2023/03/16', 403.24, 416.75, 418.62, 403.24],
    ['2023/03/17', 414.37, 412.24, 417.45, 405.54],
    ['2023/03/20', 414.44, 415.51, 419.91, 412.6],
    ['2023/03/21', 423.15, 439.88, 441.57, 423.15],
    ['2023/03/22', 436.45, 433.29, 446.89, 432.97],
    ['2023/03/23', 437.99, 442.24, 445.81, 435.5],
    ['2023/03/24', 439.48, 442.75, 444.57, 435.02],
    ['2023/03/27', 445.4, 448.14, 450.12, 441.1],
    ['2023/03/28', 451.26, 451.63, 457.66, 448.13],
    ['2023/03/29', 455.16, 451.73, 455.2, 447.88],
    ['2023/03/30', 452.83, 447.96, 456.92, 446.42],
    ['2023/03/31', 449.7, 449.55, 454.43, 446.52],
    ['2023/04/03', 450.08, 453.54, 454.09, 446.52],
    ['2023/04/04', 455.74, 455.26, 459.99, 448.21],
    ['2023/04/05', 451.42, 449.18, 452.27, 445.35],
    ['2023/04/06', 445.22, 446.39, 448.0, 439.27],
    ['2023/04/10', 444.66, 458.06, 459.39, 444.52],
    ['2023/04/11', 459.86, 457.23, 460.88, 455.92],
    ['2023/04/12', 457.95, 457.77, 462.92, 456.96],
    ['2023/04/13', 462.42, 463.11, 464.43, 457.2],
    ['2023/04/14', 465.5, 467.04, 471.53, 463.92],
    ['2023/04/17', 472.58, 467.9, 475.04, 464.16],
    ['2023/04/18', 469.24, 477.44, 480.15, 467.7],
    ['2023/04/19', 476.73, 480.69, 480.95, 476.34],
    ['2023/04/20', 479.07, 479.62, 485.07, 479.07],
    ['2023/04/21', 480.22, 486.68, 488.34, 477.44],
    ['2023/04/24', 486.88, 489.85, 492.44, 482.99],
    ['2023/04/25', 488.72, 476.27, 489.91, 475.0],
    ['2023/04/26', 475.17, 478.55, 481.04, 475.17],
    ['2023/04/27', 475.01, 475.35, 478.15, 460.81],
    ['2023/04/28', 470.12, 479.34, 480.0, 469.15],
    ['2023/05/01', 481.44, 485.96, 490.23, 479.61],
    ['2023/05/02', 483.62, 484.92, 486.0, 474.17],
    ['2023/05/03', 483.13, 484.91, 490.61, 480.16],
    ['2023/05/04', 480.9, 478.77, 484.02, 475.35],
    ['2023/05/05', 484.07, 485.24, 489.07, 480.12],
    ['2023/05/08', 486.0, 494.66, 497.0, 482.91],
    ['2023/05/09', 490.52, 496.91, 498.07, 489.77],
    ['2023/05/10', 503.48, 495.74, 503.48, 487.22],
    ['2023/05/11', 495.55, 490.44, 497.63, 489.43],
    ['2023/05/12', 490.59, 490.58, 495.96, 485.62],
    ['2023/05/15', 490.89, 491.52, 494.33, 487.62],
    ['2023/05/16', 484.33, 473.33, 488.7, 467.31],
    ['2023/05/17', 472.42, 470.37, 474.64, 464.42],
    ['2023/05/18', 469.75, 472.51, 479.99, 466.9],
    ['2023/05/19', 460.0, 454.79, 460.69, 441.74],
    ['2023/05/22', 459.0, 456.2, 460.42, 451.36],
    ['2023/05/23', 451.42, 448.79, 451.42, 443.67],
    ['2023/05/24', 449.32, 440.33, 449.94, 437.11],
    ['2023/05/25', 444.88, 450.01, 456.38, 441.17],
    ['2023/05/26', 435.01, 465.18, 472.23, 424.36],
    ['2023/05/30', 471.08, 489.12, 490.47, 470.18],
    ['2023/05/31', 484.99, 475.0, 485.89, 466.18],
    ['2023/06/01', 471.99, 465.01, 476.4, 464.25],
    ['2023/06/02', 472.48, 476.78, 481.89, 472.48],
    ['2023/06/05', 477.36, 485.76, 489.63, 477.36],
    ['2023/06/06', 485.42, 491.54, 497.8, 485.42],
    ['2023/06/07', 491.07, 498.13, 504.52, 491.07],
    ['2023/06/08', 495.89, 490.98, 500.47, 485.47],
    ['2023/06/09', 492.61, 488.33, 496.8, 485.8],
    ['2023/06/12', 490.88, 500.89, 503.08, 487.65],
    ['2023/06/13', 503.52, 490.72, 505.0, 489.36],
    ['2023/06/14', 492.0, 506.73, 512.0, 487.12],
    ['2023/06/15', 503.83, 512.02, 514.5, 502.44],
    ['2023/06/16', 517.22, 512.72, 517.22, 507.83],
    ['2023/06/20', 509.04, 508.35, 512.72, 501.99],
    ['2023/06/21', 508.78, 510.14, 518.49, 508.78],
    ['2023/06/22', 509.1, 503.55, 513.66, 501.74],
    ['2023/06/23', 498.55, 506.12, 510.6, 497.12],
    ['2023/06/26', 508.7, 509.44, 514.48, 505.15],
    ['2023/06/27', 512.59, 512.04, 519.21, 508.44],
    ['2023/06/28', 512.37, 520.12, 522.6, 512.37],
    ['2023/06/29', 521.03, 513.97, 522.02, 512.79],
    ['2023/06/30', 521.06, 527.66, 529.78, 517.99],
    ['2023/07/03', 529.18, 531.46, 538.32, 528.51],
    ['2023/07/05', 532.61, 534.59, 536.64, 526.98],
    ['2023/07/06', 529.96, 529.96, 532.05, 523.0],
    ['2023/07/07', 529.01, 527.18, 535.03, 525.45],
    ['2023/07/10', 528.79, 540.85, 544.28, 528.79],
    ['2023/07/11', 540.57, 551.42, 552.1, 540.57],
    ['2023/07/12', 555.94, 553.32, 562.97, 548.56],
    ['2023/07/13', 554.05, 539.39, 559.08, 538.85],
    ['2023/07/14', 542.95, 543.48, 546.39, 539.6],
    ['2023/07/17', 542.89, 547.45, 551.69, 542.12],
    ['2023/07/18', 546.59, 546.67, 553.13, 541.66],
    ['2023/07/19', 544.57, 543.72, 548.53, 543.06],
    ['2023/07/20', 542.81, 535.43, 545.3, 533.23],
    ['2023/07/21', 544.56, 537.55, 544.56, 533.82],
    ['2023/07/24', 542.71, 549.47, 551.22, 536.08],
    ['2023/07/25', 551.0, 555.35, 557.48, 548.63],
    ['2023/07/26', 552.07, 558.0, 558.28, 549.67],
    ['2023/07/27', 556.29, 537.02, 558.97, 534.46],
    ['2023/07/28', 517.98, 534.06, 542.7, 511.4],
    ['2023/07/31', 539.29, 543.69, 543.75, 537.51],
    ['2023/08/01', 540.25, 542.36, 548.2, 540.25],
    ['2023/08/02', 540.45, 540.92, 547.38, 539.18],
]);
var volumes = [
    321200.0,
    242600.0,
    361200.0,
    368200.0,
    313900.0,
    467300.0,
    359700.0,
    227900.0,
    297900.0,
    251200.0,
    185400.0,
    243200.0,
    264300.0,
    241800.0,
    204700.0,
    213200.0,
    214700.0,
    289100.0,
    260600.0,
    297500.0,
    176900.0,
    270700.0,
    198700.0,
    304500.0,
    302000.0,
    396100.0,
    234500.0,
    378100.0,
    405900.0,
    300200.0,
    437700.0,
    658700.0,
    258700.0,
    280100.0,
    244000.0,
    322600.0,
    329800.0,
    394500.0,
    283000.0,
    310400.0,
    331400.0,
    779100.0,
    371700.0,
    364600.0,
    312600.0,
    314800.0,
    190700.0,
    386800.0,
    293300.0,
    285300.0,
    372400.0,
    338300.0,
    515500.0,
    461300.0,
    339700.0,
    472800.0,
    521700.0,
    449700.0,
    677500.0,
    650300.0,
    714500.0,
    875900.0,
    538300.0,
    519400.0,
    522200.0,
    494700.0,
    491000.0,
    491200.0,
    509400.0,
    450100.0,
    500600.0,
    588800.0,
    638600.0,
    598000.0,
    552500.0,
    589100.0,
    870100.0,
    408700.0,
    289100.0,
    386400.0,
    107600.0,
    339900.0,
    251300.0,
    428800.0,
    385800.0,
    379800.0,
    414900.0,
    403900.0,
    211700.0,
    202000.0,
    363200.0,
    369300.0,
    434200.0,
    425300.0,
    237400.0,
    434400.0,
    536400.0,
    330600.0,
    278600.0,
    320600.0,
    194300.0,
    333000.0,
    250400.0,
    222900.0,
    186200.0,
    428700.0,
    454800.0,
    306600.0,
    307900.0,
    457900.0,
    360000.0,
    388600.0,
    322500.0,
    358800.0,
    253000.0,
    311200.0,
    346900.0,
    265300.0,
    288000.0,
    250500.0,
    347500.0,
    374000.0,
    514700.0,
    374900.0,
    475800.0,
    399100.0,
    699100.0,
    715800.0,
    403900.0,
    350100.0,
    378100.0,
    630900.0,
    525900.0,
    413200.0,
    324100.0,
    420400.0,
    479400.0,
    440100.0,
    464800.0,
    322200.0,
    334400.0,
    262800.0,
    399300.0,
    432300.0,
    271000.0,
    256700.0,
    267300.0,
    387000.0,
    428800.0,
    278100.0,
    245300.0,
    398000.0,
    495600.0,
    289400.0,
    388900.0,
    256500.0,
    462900.0,
    236900.0,
    497400.0,
    490800.0,
    378600.0,
    263200.0,
    335600.0,
    428300.0,
    294100.0,
    442500.0,
    488000.0,
    390700.0,
    336600.0,
    208700.0,
    374900.0,
    321100.0,
    206600.0,
    253100.0,
    225200.0,
    202100.0,
    301500.0,
    406700.0,
    357800.0,
    250900.0,
    321100.0,
    274300.0,
    392000.0,
    261400.0,
    579800.0,
    341700.0,
    268700.0,
    217200.0,
    363600.0,
    267500.0,
    204600.0,
    291900.0,
    313400.0,
    236700.0,
    276900.0,
    387200.0,
    368500.0,
    557900.0,
    498300.0,
    283300.0,
    909200.0,
    442900.0,
    484100.0,
    601800.0,
    877900.0,
    1344900.0,
    849100.0,
    2957600.0,
    554700.0,
    432100.0,
    361800.0,
    379200.0,
    572600.0,
    503800.0,
    391900.0,
    417400.0,
    536900.0,
    396500.0,
    340200.0,
    490400.0,
    356100.0,
    257900.0,
    322900.0,
    463800.0,
    273200.0,
    312300.0,
    321700.0,
    303200.0,
    493900.0,
    216500.0,
    349600.0,
    333600.0,
    253900.0,
    354800.0,
    352000.0,
    329400.0,
    401300.0,
    275600.0,
    262900.0,
    331100.0,
    249900.0,
    242400.0,
    376000.0,
    529300.0,
    457000.0,
    310300.0,
    658900.0,
    965300.0,
    426600.0,
    323200.0,
    326000.0,
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
        text: "DECK",
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