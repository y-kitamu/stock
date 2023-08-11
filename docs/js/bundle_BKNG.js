/* var echarts = require("echarts"); */

var chartDom = document.getElementById("main_BKNG");
var myChart = echarts.init(chartDom);
var option;

var upColor = "#ec0000";
var upBorderColor = "#8A0000";
var downColor = "#00da3c";
var downBorderColor = "#008F28";

// Each item: open，close，lowest，highest
var data = splitData([
    ['2022/08/12', 2083.96, 2120.98, 2122.99, 2072.35],
    ['2022/08/15', 2102.0, 2129.76, 2157.97, 2100.0],
    ['2022/08/16', 2116.27, 2151.34, 2161.05, 2115.2],
    ['2022/08/17', 2112.62, 2129.65, 2143.06, 2101.64],
    ['2022/08/18', 2118.87, 2144.73, 2154.73, 2108.71],
    ['2022/08/19', 2121.79, 2086.92, 2129.3, 2083.92],
    ['2022/08/22', 2018.43, 1972.67, 2042.06, 1969.08],
    ['2022/08/23', 1975.97, 1992.83, 2012.1, 1975.64],
    ['2022/08/24', 1971.98, 1990.96, 2019.16, 1970.49],
    ['2022/08/25', 2000.0, 2008.54, 2033.95, 1994.96],
    ['2022/08/26', 2013.53, 1910.96, 2020.84, 1908.0],
    ['2022/08/29', 1897.0, 1898.66, 1921.37, 1886.1],
    ['2022/08/30', 1921.0, 1880.23, 1924.99, 1869.89],
    ['2022/08/31', 1891.62, 1875.81, 1916.9, 1873.42],
    ['2022/09/01', 1859.0, 1852.51, 1873.53, 1801.91],
    ['2022/09/02', 1863.86, 1837.91, 1872.9, 1818.96],
    ['2022/09/06', 1837.91, 1814.85, 1848.56, 1780.09],
    ['2022/09/07', 1824.19, 1872.45, 1880.79, 1807.15],
    ['2022/09/08', 1843.3, 1906.02, 1912.35, 1829.79],
    ['2022/09/09', 1920.0, 1981.03, 1984.99, 1918.05],
    ['2022/09/12', 2010.21, 2013.32, 2030.95, 2000.26],
    ['2022/09/13', 1941.0, 1920.8, 1967.79, 1913.48],
    ['2022/09/14', 1916.78, 1967.38, 1970.04, 1897.12],
    ['2022/09/15', 1955.62, 1956.77, 2015.05, 1947.24],
    ['2022/09/16', 1934.0, 1876.45, 1934.62, 1854.39],
    ['2022/09/19', 1849.1, 1902.99, 1910.0, 1849.1],
    ['2022/09/20', 1887.73, 1896.63, 1926.45, 1878.83],
    ['2022/09/21', 1888.21, 1806.7, 1890.84, 1805.89],
    ['2022/09/22', 1806.0, 1720.58, 1806.08, 1715.0],
    ['2022/09/23', 1696.15, 1669.88, 1698.9, 1646.04],
    ['2022/09/26', 1677.68, 1669.25, 1714.3, 1669.0],
    ['2022/09/27', 1696.5, 1669.16, 1710.63, 1655.39],
    ['2022/09/28', 1661.88, 1726.88, 1735.99, 1652.94],
    ['2022/09/29', 1690.55, 1678.92, 1697.5, 1659.69],
    ['2022/09/30', 1658.97, 1643.21, 1701.76, 1641.87],
    ['2022/10/03', 1672.44, 1678.93, 1694.0, 1626.22],
    ['2022/10/04', 1728.99, 1759.04, 1765.53, 1727.2],
    ['2022/10/05', 1726.81, 1726.71, 1745.0, 1709.57],
    ['2022/10/06', 1723.67, 1709.73, 1732.91, 1692.61],
    ['2022/10/07', 1680.77, 1685.16, 1699.03, 1668.12],
    ['2022/10/10', 1699.25, 1671.33, 1701.65, 1657.61],
    ['2022/10/11', 1671.33, 1634.61, 1671.33, 1620.84],
    ['2022/10/12', 1643.98, 1675.62, 1682.56, 1629.01],
    ['2022/10/13', 1626.23, 1692.13, 1710.91, 1616.85],
    ['2022/10/14', 1715.27, 1670.49, 1735.86, 1667.25],
    ['2022/10/17', 1703.26, 1747.49, 1751.99, 1701.34],
    ['2022/10/18', 1800.11, 1773.96, 1815.59, 1750.48],
    ['2022/10/19', 1750.87, 1771.82, 1799.98, 1750.87],
    ['2022/10/20', 1769.61, 1773.62, 1827.0, 1763.57],
    ['2022/10/21', 1772.03, 1822.79, 1829.3, 1760.02],
    ['2022/10/24', 1813.02, 1808.56, 1828.64, 1764.0],
    ['2022/10/25', 1802.28, 1874.61, 1880.23, 1802.28],
    ['2022/10/26', 1874.61, 1851.52, 1918.05, 1847.52],
    ['2022/10/27', 1869.37, 1833.74, 1875.85, 1823.12],
    ['2022/10/28', 1839.01, 1871.72, 1874.72, 1813.54],
    ['2022/10/31', 1870.91, 1869.48, 1885.34, 1837.84],
    ['2022/11/01', 1891.25, 1889.52, 1927.0, 1886.04],
    ['2022/11/02', 1862.79, 1778.18, 1884.73, 1771.32],
    ['2022/11/03', 1849.0, 1825.73, 1902.7, 1822.76],
    ['2022/11/04', 1884.83, 1874.4, 1916.15, 1852.1],
    ['2022/11/07', 1876.01, 1833.82, 1886.83, 1797.92],
    ['2022/11/08', 1835.79, 1859.19, 1892.95, 1830.57],
    ['2022/11/09', 1840.0, 1865.82, 1882.34, 1830.07],
    ['2022/11/10', 1946.86, 1946.51, 1955.3, 1916.4],
    ['2022/11/11', 1936.31, 2015.77, 2033.38, 1936.31],
    ['2022/11/14', 1996.51, 1979.25, 2019.52, 1974.01],
    ['2022/11/15', 2029.62, 2001.9, 2061.96, 1975.22],
    ['2022/11/16', 2008.95, 2013.78, 2028.83, 1990.0],
    ['2022/11/17', 1960.92, 1940.76, 1972.45, 1902.46],
    ['2022/11/18', 1959.77, 1940.28, 1972.2, 1925.5],
    ['2022/11/21', 1922.94, 1919.49, 1948.42, 1900.01],
    ['2022/11/22', 1930.0, 1946.97, 1950.05, 1899.31],
    ['2022/11/23', 1954.88, 1969.45, 2002.0, 1951.74],
    ['2022/11/25', 1968.48, 1984.63, 1996.28, 1963.22],
    ['2022/11/28', 1986.02, 1984.9, 2004.9, 1978.06],
    ['2022/11/29', 1985.21, 2017.16, 2027.57, 1985.21],
    ['2022/11/30', 2032.0, 2079.45, 2084.7, 2012.2],
    ['2022/12/01', 2083.7, 2060.29, 2100.64, 2048.0],
    ['2022/12/02', 2031.64, 2085.44, 2094.49, 2024.73],
    ['2022/12/05', 2056.07, 2056.52, 2086.88, 2046.77],
    ['2022/12/06', 2058.04, 2042.19, 2074.95, 2023.51],
    ['2022/12/07', 1976.3, 1955.56, 1987.64, 1940.26],
    ['2022/12/08', 1962.39, 2010.76, 2020.79, 1948.64],
    ['2022/12/09', 2001.65, 2019.98, 2031.21, 1991.29],
    ['2022/12/12', 2020.04, 2080.0, 2081.9, 2015.0],
    ['2022/12/13', 2152.37, 2047.83, 2152.37, 2038.32],
    ['2022/12/14', 2057.04, 2006.8, 2069.66, 1988.01],
    ['2022/12/15', 1966.84, 1965.69, 1976.22, 1952.31],
    ['2022/12/16', 1949.38, 1938.55, 1972.28, 1928.01],
    ['2022/12/19', 1952.06, 1931.44, 1959.45, 1919.6],
    ['2022/12/20', 1924.72, 1958.51, 1963.11, 1924.72],
    ['2022/12/21', 1975.58, 1970.9, 1997.49, 1967.84],
    ['2022/12/22', 1947.7, 1932.99, 1947.7, 1907.38],
    ['2022/12/23', 1926.42, 1971.52, 1973.34, 1918.72],
    ['2022/12/27', 1977.88, 1998.27, 2012.39, 1962.19],
    ['2022/12/28', 2007.49, 1958.84, 2030.0, 1955.35],
    ['2022/12/29', 1984.8, 2003.51, 2013.07, 1974.58],
    ['2022/12/30', 1979.29, 2015.28, 2017.6, 1978.0],
    ['2023/01/03', 2038.83, 2032.21, 2049.0, 2005.57],
    ['2023/01/04', 2068.83, 2110.44, 2113.59, 2056.78],
    ['2023/01/05', 2085.49, 2144.94, 2153.47, 2085.49],
    ['2023/01/06', 2165.12, 2179.25, 2191.2, 2151.16],
    ['2023/01/09', 2195.0, 2208.41, 2222.52, 2184.92],
    ['2023/01/10', 2200.56, 2220.95, 2220.96, 2179.32],
    ['2023/01/11', 2223.35, 2224.81, 2246.27, 2215.5],
    ['2023/01/12', 2225.53, 2256.77, 2267.66, 2214.65],
    ['2023/01/13', 2223.35, 2301.34, 2302.01, 2222.16],
    ['2023/01/17', 2297.91, 2334.02, 2336.33, 2297.91],
    ['2023/01/18', 2360.0, 2296.45, 2374.72, 2293.44],
    ['2023/01/19', 2270.0, 2315.4, 2322.34, 2268.36],
    ['2023/01/20', 2327.12, 2344.29, 2350.49, 2320.28],
    ['2023/01/23', 2340.0, 2401.58, 2403.78, 2329.8],
    ['2023/01/24', 2402.62, 2402.34, 2430.86, 2393.87],
    ['2023/01/25', 2298.25, 2390.75, 2392.99, 2289.69],
    ['2023/01/26', 2400.0, 2431.15, 2433.86, 2397.51],
    ['2023/01/27', 2421.78, 2464.51, 2474.59, 2421.78],
    ['2023/01/30', 2433.95, 2436.98, 2456.3, 2413.87],
    ['2023/01/31', 2419.84, 2434.1, 2435.99, 2403.44],
    ['2023/02/01', 2422.34, 2445.74, 2462.24, 2390.15],
    ['2023/02/02', 2455.85, 2454.69, 2484.79, 2438.96],
    ['2023/02/03', 2422.69, 2455.07, 2472.22, 2409.88],
    ['2023/02/06', 2429.81, 2469.95, 2474.87, 2425.91],
    ['2023/02/07', 2464.82, 2487.19, 2489.98, 2412.88],
    ['2023/02/08', 2462.8, 2425.08, 2485.97, 2420.15],
    ['2023/02/09', 2461.82, 2436.12, 2490.7, 2435.58],
    ['2023/02/10', 2383.71, 2348.37, 2404.64, 2331.23],
    ['2023/02/13', 2376.94, 2423.03, 2432.84, 2366.59],
    ['2023/02/14', 2418.13, 2471.05, 2481.13, 2409.96],
    ['2023/02/15', 2500.0, 2516.58, 2519.42, 2482.02],
    ['2023/02/16', 2474.8, 2493.18, 2537.0, 2469.5],
    ['2023/02/17', 2465.64, 2462.01, 2474.67, 2442.51],
    ['2023/02/21', 2415.06, 2425.49, 2449.71, 2415.06],
    ['2023/02/22', 2423.27, 2426.71, 2449.67, 2418.6],
    ['2023/02/23', 2429.74, 2426.49, 2454.04, 2382.55],
    ['2023/02/24', 2430.0, 2452.48, 2489.21, 2405.04],
    ['2023/02/27', 2480.39, 2521.08, 2528.76, 2475.12],
    ['2023/02/28', 2511.84, 2524.0, 2548.89, 2501.15],
    ['2023/03/01', 2530.0, 2552.32, 2554.25, 2524.91],
    ['2023/03/02', 2539.66, 2577.83, 2583.6, 2527.82],
    ['2023/03/03', 2600.0, 2620.4, 2628.25, 2589.3],
    ['2023/03/06', 2574.66, 2613.43, 2626.46, 2574.66],
    ['2023/03/07', 2599.77, 2578.9, 2630.0, 2571.43],
    ['2023/03/08', 2577.4, 2582.87, 2600.04, 2563.69],
    ['2023/03/09', 2571.41, 2505.39, 2587.37, 2503.55],
    ['2023/03/10', 2508.89, 2480.49, 2524.59, 2461.47],
    ['2023/03/13', 2459.85, 2438.89, 2467.66, 2432.94],
    ['2023/03/14', 2499.02, 2475.75, 2513.36, 2460.0],
    ['2023/03/15', 2418.64, 2415.73, 2434.52, 2383.18],
    ['2023/03/16', 2403.98, 2439.91, 2452.44, 2401.01],
    ['2023/03/17', 2439.91, 2440.85, 2445.61, 2392.81],
    ['2023/03/20', 2450.53, 2493.73, 2503.89, 2438.13],
    ['2023/03/21', 2517.81, 2571.32, 2581.7, 2517.81],
    ['2023/03/22', 2577.37, 2558.24, 2611.99, 2557.0],
    ['2023/03/23', 2573.01, 2538.76, 2615.63, 2523.85],
    ['2023/03/24', 2510.09, 2499.33, 2513.88, 2466.02],
    ['2023/03/27', 2525.0, 2508.31, 2542.8, 2504.48],
    ['2023/03/28', 2520.0, 2545.12, 2554.18, 2508.31],
    ['2023/03/29', 2581.43, 2571.77, 2584.51, 2555.14],
    ['2023/03/30', 2588.4, 2609.76, 2624.49, 2580.5],
    ['2023/03/31', 2625.7, 2652.41, 2660.86, 2621.99],
    ['2023/04/03', 2644.79, 2665.19, 2677.18, 2630.0],
    ['2023/04/04', 2672.14, 2638.33, 2674.95, 2625.0],
    ['2023/04/05', 2633.02, 2615.6, 2635.15, 2590.0],
    ['2023/04/06', 2605.75, 2583.85, 2605.75, 2552.0],
    ['2023/04/10', 2565.06, 2572.57, 2585.08, 2552.19],
    ['2023/04/11', 2581.81, 2566.47, 2588.68, 2561.06],
    ['2023/04/12', 2587.86, 2547.25, 2587.92, 2534.52],
    ['2023/04/13', 2569.0, 2629.63, 2631.1, 2560.5],
    ['2023/04/14', 2626.45, 2649.86, 2657.98, 2615.62],
    ['2023/04/17', 2631.97, 2676.05, 2676.18, 2631.97],
    ['2023/04/18', 2696.13, 2696.68, 2721.85, 2687.81],
    ['2023/04/19', 2683.85, 2676.28, 2694.86, 2672.56],
    ['2023/04/20', 2664.25, 2660.77, 2699.7, 2656.81],
    ['2023/04/21', 2662.62, 2687.33, 2689.72, 2633.0],
    ['2023/04/24', 2697.75, 2679.69, 2707.0, 2666.86],
    ['2023/04/25', 2675.51, 2645.02, 2675.51, 2641.2],
    ['2023/04/26', 2643.44, 2597.37, 2660.05, 2585.81],
    ['2023/04/27', 2622.0, 2639.44, 2640.85, 2577.31],
    ['2023/04/28', 2631.19, 2686.31, 2693.92, 2620.7],
    ['2023/05/01', 2680.32, 2691.09, 2719.98, 2678.72],
    ['2023/05/02', 2686.85, 2716.05, 2731.75, 2686.85],
    ['2023/05/03', 2721.63, 2646.21, 2721.63, 2635.78],
    ['2023/05/04', 2610.92, 2603.57, 2646.0, 2600.59],
    ['2023/05/05', 2630.32, 2569.3, 2650.15, 2524.34],
    ['2023/05/08', 2573.12, 2639.47, 2648.15, 2573.12],
    ['2023/05/09', 2625.44, 2634.91, 2664.59, 2608.58],
    ['2023/05/10', 2634.91, 2645.92, 2663.98, 2598.63],
    ['2023/05/11', 2636.87, 2656.58, 2668.4, 2635.39],
    ['2023/05/12', 2679.73, 2630.82, 2679.73, 2625.0],
    ['2023/05/15', 2626.99, 2646.07, 2653.09, 2620.95],
    ['2023/05/16', 2660.0, 2646.32, 2692.29, 2646.31],
    ['2023/05/17', 2661.89, 2696.7, 2699.74, 2640.63],
    ['2023/05/18', 2698.71, 2780.98, 2786.85, 2694.34],
    ['2023/05/19', 2780.97, 2765.26, 2780.97, 2753.52],
    ['2023/05/22', 2764.33, 2695.62, 2786.19, 2693.02],
    ['2023/05/23', 2676.25, 2637.49, 2680.08, 2623.11],
    ['2023/05/24', 2622.25, 2625.83, 2643.16, 2595.38],
    ['2023/05/25', 2637.46, 2597.37, 2637.64, 2571.13],
    ['2023/05/26', 2614.98, 2591.13, 2664.3, 2588.37],
    ['2023/05/30', 2595.22, 2528.77, 2606.24, 2520.13],
    ['2023/05/31', 2516.77, 2508.77, 2523.04, 2456.93],
    ['2023/06/01', 2503.12, 2550.0, 2568.2, 2500.35],
    ['2023/06/02', 2577.31, 2625.65, 2634.48, 2568.48],
    ['2023/06/05', 2617.38, 2670.76, 2674.62, 2617.38],
    ['2023/06/06', 2688.65, 2708.1, 2729.27, 2684.51],
    ['2023/06/07', 2710.32, 2644.18, 2725.88, 2636.57],
    ['2023/06/08', 2617.0, 2647.46, 2679.24, 2617.0],
    ['2023/06/09', 2647.46, 2606.13, 2672.74, 2604.0],
    ['2023/06/12', 2626.23, 2605.34, 2627.26, 2580.1],
    ['2023/06/13', 2629.92, 2614.05, 2629.92, 2584.82],
    ['2023/06/14', 2595.37, 2609.79, 2623.5, 2579.36],
    ['2023/06/15', 2595.54, 2671.7, 2678.36, 2587.18],
    ['2023/06/16', 2702.21, 2640.99, 2702.21, 2632.16],
    ['2023/06/20', 2620.0, 2636.65, 2669.97, 2613.97],
    ['2023/06/21', 2636.65, 2643.8, 2665.2, 2620.0],
    ['2023/06/22', 2642.27, 2677.9, 2682.18, 2641.0],
    ['2023/06/23', 2638.05, 2623.93, 2658.1, 2619.24],
    ['2023/06/26', 2613.98, 2615.76, 2651.57, 2605.0],
    ['2023/06/27', 2647.54, 2700.36, 2722.89, 2647.54],
    ['2023/06/28', 2697.99, 2666.47, 2722.68, 2663.05],
    ['2023/06/29', 2671.42, 2655.91, 2675.91, 2633.0],
    ['2023/06/30', 2685.62, 2700.33, 2720.0, 2676.91],
    ['2023/07/03', 2693.7, 2720.79, 2743.07, 2683.32],
    ['2023/07/05', 2715.39, 2674.0, 2723.13, 2667.68],
    ['2023/07/06', 2651.18, 2632.69, 2660.0, 2624.5],
    ['2023/07/07', 2628.0, 2636.91, 2661.84, 2628.0],
    ['2023/07/10', 2637.0, 2728.83, 2733.48, 2637.0],
    ['2023/07/11', 2739.92, 2783.4, 2789.18, 2733.62],
    ['2023/07/12', 2804.2, 2788.47, 2821.46, 2781.11],
    ['2023/07/13', 2825.0, 2834.53, 2853.02, 2823.95],
    ['2023/07/14', 2844.79, 2866.92, 2867.76, 2828.06],
    ['2023/07/17', 2857.23, 2949.66, 2954.99, 2857.23],
    ['2023/07/18', 2936.62, 2981.61, 2984.57, 2920.0],
    ['2023/07/19', 2980.46, 2927.88, 2998.0, 2926.77],
    ['2023/07/20', 2920.2, 2917.5, 2972.87, 2916.14],
    ['2023/07/21', 2939.11, 2923.24, 2973.0, 2923.13],
    ['2023/07/24', 2906.38, 2893.76, 2919.68, 2871.01],
    ['2023/07/25', 2885.51, 2942.43, 2960.62, 2885.51],
    ['2023/07/26', 2942.43, 2958.16, 2966.21, 2923.29],
    ['2023/07/27', 2974.42, 2955.9, 2992.37, 2952.19],
    ['2023/07/28', 2988.01, 3012.25, 3016.23, 2981.25],
    ['2023/07/31', 3000.0, 2970.8, 3017.61, 2965.44],
    ['2023/08/01', 2942.2, 2914.31, 2951.22, 2913.87],
    ['2023/08/02', 2890.0, 2884.92, 2910.06, 2870.0],
    ['2023/08/03', 2814.98, 2839.91, 2850.0, 2794.36],
    ['2023/08/04', 3155.0, 3063.16, 3166.76, 2950.01],
    ['2023/08/07', 3084.55, 3243.01, 3246.79, 3079.5],
    ['2023/08/08', 3192.59, 3225.97, 3239.91, 3170.38],
    ['2023/08/09', 3251.47, 3204.66, 3251.47, 3188.6],
    ['2023/08/10', 3215.0, 3223.19, 3251.71, 3204.99],
]);
var volumes = [
    329700.0,
    377600.0,
    263700.0,
    256400.0,
    215900.0,
    236300.0,
    465000.0,
    323400.0,
    229100.0,
    250400.0,
    383800.0,
    320400.0,
    325300.0,
    389600.0,
    576900.0,
    337600.0,
    338400.0,
    395100.0,
    461800.0,
    526900.0,
    411500.0,
    396000.0,
    303000.0,
    380900.0,
    792000.0,
    267500.0,
    310500.0,
    372600.0,
    578800.0,
    629000.0,
    448900.0,
    401300.0,
    381900.0,
    344800.0,
    498400.0,
    386900.0,
    466100.0,
    350300.0,
    371300.0,
    443400.0,
    278300.0,
    304700.0,
    290800.0,
    477700.0,
    389000.0,
    318800.0,
    367400.0,
    313600.0,
    345100.0,
    306900.0,
    313800.0,
    324800.0,
    375600.0,
    375600.0,
    460700.0,
    358200.0,
    348900.0,
    605900.0,
    742600.0,
    438700.0,
    433900.0,
    317700.0,
    359500.0,
    516200.0,
    442800.0,
    415700.0,
    411200.0,
    302500.0,
    494900.0,
    306100.0,
    279900.0,
    327100.0,
    254400.0,
    168800.0,
    331400.0,
    284700.0,
    444100.0,
    291900.0,
    270400.0,
    279000.0,
    262800.0,
    415400.0,
    314100.0,
    242000.0,
    335000.0,
    418900.0,
    401500.0,
    342300.0,
    807900.0,
    278500.0,
    245300.0,
    251000.0,
    252700.0,
    157800.0,
    231500.0,
    240900.0,
    206600.0,
    196700.0,
    266900.0,
    368100.0,
    376000.0,
    350400.0,
    271600.0,
    216700.0,
    289900.0,
    292100.0,
    290700.0,
    344000.0,
    307100.0,
    284200.0,
    303700.0,
    340900.0,
    237100.0,
    304300.0,
    238000.0,
    299000.0,
    317200.0,
    338100.0,
    411200.0,
    346000.0,
    287300.0,
    246100.0,
    428200.0,
    350600.0,
    349000.0,
    567600.0,
    269000.0,
    263600.0,
    299300.0,
    341200.0,
    287000.0,
    225200.0,
    166000.0,
    419600.0,
    563700.0,
    362900.0,
    340000.0,
    328900.0,
    328700.0,
    419100.0,
    448000.0,
    297200.0,
    211400.0,
    326300.0,
    383600.0,
    418200.0,
    378900.0,
    425600.0,
    337600.0,
    798800.0,
    322900.0,
    282500.0,
    273100.0,
    352500.0,
    329600.0,
    246400.0,
    235800.0,
    236700.0,
    265400.0,
    365800.0,
    223100.0,
    260700.0,
    260900.0,
    272700.0,
    205800.0,
    236700.0,
    276200.0,
    334600.0,
    185400.0,
    175700.0,
    245000.0,
    198500.0,
    247700.0,
    210100.0,
    243600.0,
    283600.0,
    357400.0,
    376900.0,
    295300.0,
    252300.0,
    291500.0,
    399900.0,
    487800.0,
    788200.0,
    344900.0,
    339500.0,
    411800.0,
    212300.0,
    220300.0,
    198700.0,
    225200.0,
    297600.0,
    337600.0,
    343600.0,
    282800.0,
    289700.0,
    270100.0,
    380300.0,
    465300.0,
    485700.0,
    823200.0,
    319100.0,
    327400.0,
    312800.0,
    314700.0,
    314300.0,
    237800.0,
    318400.0,
    317500.0,
    267100.0,
    234300.0,
    398400.0,
    828900.0,
    292500.0,
    244900.0,
    225100.0,
    324600.0,
    226000.0,
    388200.0,
    242200.0,
    224000.0,
    306600.0,
    179300.0,
    276800.0,
    309200.0,
    268900.0,
    401100.0,
    278100.0,
    306900.0,
    311100.0,
    238600.0,
    251600.0,
    308000.0,
    299900.0,
    257200.0,
    698800.0,
    255100.0,
    245700.0,
    166900.0,
    223500.0,
    189100.0,
    368500.0,
    305000.0,
    283500.0,
    655400.0,
    974800.0,
    512100.0,
    332000.0,
    298000.0,
    259600.0,
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
     *     text: "BKNG",
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