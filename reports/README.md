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
- https://aifx.tech/fx%E3%81%AE%E9%81%8E%E5%8E%BB%E3%83%87%E3%83%BC%E3%82%BF%E3%82%92%E3%83%80%E3%82%A6%E3%83%B3%E3%83%AD%E3%83%BC%E3%83%89%E3%81%99%E3%82%8B/ : fxデータをダウンロードする方法

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
- 単純にohlcvデータを突っ込んでも精度はでない
  Feature selection and deep neural networks for stock price direction forecasting using technical analysis indicators
- 優位性のある条件を考えてそれベースで売買アルゴリズムを組むのが良いのか？


# アルゴリズムの評価
- シャープレシオを上げる ((ポートフォリオの収益率 - 無リスク資産の収益率) / ポートフォリオの収益率の標準偏差)
- 綿密なvalidation
- 特徴量の時間依存を下げる (Adversarial validationを使うとか)


# 優位性のアイデア
- 取引所を変える : bitflyerが儲かりやすいらしい

## 値動きに関係するすべての情報を織り込ませて学習させる
- closeだけでなくohlcvすべて使う
- 季節性・曜日などを考慮する

## 逆張り戦略
決めること
- 売り買いの指値を推論するか決め打ちにするか
- ベースの売買戦略（売り買いタイミング）は?


## 順張り戦略
tick単位で見て大きく値が動いたときはその方向に動きやすい？

