# はじめに
このディレクトリにはこれまでの検討結果を体系的にまとめた文書群を置くことにする。  
体系的にまとめることで重複した検討を回避するとともに、新しいアイデアを考えられるようにする。  
ディレクトリ構成は徐々に拡張していく方針で進める。

# 参考文献・URL
- https://kjtradingsystems.com : 「アルゴリズムトレード完全攻略への近道」の著者のホームページ。アルゴリズムの検証結果などがのっている。
- https://alvarezquanttrading.com : 「アルゴリズムトレード完全攻略への近道」で紹介されていたwebサイト。様々なアルゴリズム（アイデア）が載っている（らしい）
- 価格変動パターンを用いた 株価予測手法の実証研究(中川 慧) : アルゴリズムトレードの研究に関する日本語文献
- https://github.com/Waterkin/stock-top-papers/tree/waterking?tab=readme-ov-file : 自動取引に関する論文のawesome集
- https://www.multicharts.com/ : tradeをsimulationするアプリケーション

# アイデア
- BTC/JPYだけでなく、BTC/USDやJPY/USDのデータも使う
  [binance](https://data.binance.vision/?prefix=data/spot/daily/trades/)から過去データダウンロードできる(BTCUSDCとか)。[github](https://github.com/binance/binance-public-data/)も参照する
- Deep Learning and Time Series-to-Image Encoding for Financial Forecastingで提案されている手法（時系列データを画像に変換して学習する）は良さそう。
  ただし、そのまま適用するのはいまいち(https://towardsdatascience.com/rgb-gaf-image-a-possible-solution-to-one-weak-point-of-gramian-angular-field-imaging-ffc6b31edfbe)
  closeだけでなくohlcとvolumeの情報も入れたい。
- lossはEnhancing stockmarket trading performance with ANNsが良さそう？

- 季節性も考慮したほうが良いかも。月の何日目か、何月かをcos, sinで表すとか

- RL系はまだまだ発展途上。DLと組み合わせて使うのが良い？

- CNN系の手法は一通り調べたので、それ以外の手法（timeseries系、機械学習系、RL系）をもっと調査する
- diffusion modelを使う方法もありそう

# 方針
- deep learningを使って推論する
  - まずはbaselineの論文を決めて、再現実験をする
