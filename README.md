# Stock

## 売買ルール
- 買値の8%下に損切りをおく
- 20%上昇した場合は高値から10%下に損切りポイントを設定し直す
- その後は高値更新するたびに損切りポイントを設定し直す

## ルーティーン
- 毎週末に四季報でスクリーニング検索をかけて、高成長銘柄を探す
- 毎日年初来高値銘柄を株探で確認し、高成長銘柄をチェックする

## モジュール構成

cert : google driveへのアップロード用のcertificationファイル。暗号化済みなのでgithubにアップロードok 

stock以下
- models : データベースのデータ構造の定義を行う。models以下のファイル以外に依存しない
- scraping: データ収集用のスクリプト。scarping以下のファイル以外に依存しない
- adapter: scrapingモジュールで収集したデータをmodelsモジュールのデータ構造に合うように変換するスクリプト。models, scraping以外に依存しない
- server: データベースのデータを取り出したり、データベースを定期的にアップデートするためのサーバー。stockモジュールに依存するが、sqlalchemyなどstockモジュール内部で使用している外部ライブラリには直接依存しないようにする（stockモジュールの内部構成を変更する場合でも影響範囲を狭くするため）。ライブラリとして使用することは想定しないので`__init__.py`は配置せず、他のモジュールからインポートもしない。AWSで使用する予定だが、利用料金が気になるので、一旦運用延期


現状はDynamoDBを利用するので上記のmodels, adapterは使用しない方針。(TODO: これらのモジュールの削除)

## バージョン管理

- Jupyter notebookは出力をすべて消してcommitする (nbstripoutを使用する)。
  以下を実行するとcommit時にnotebookの出力を削除するように設定される。
```bash
poetry install  # nbstripoutをインストール
poetry run nbstripout --install --attributes .gitattributes

```


## データ収集方針

米国株データはyahoo financeからスクレイピングで取得。ローカルファイル + mongo dbで保存する。  
日本株データをMarket SpeedからPower Automateで半自動取得。Google Driveにcsvをアップする。


##  スクリーニングの実施手順
以下の作業を自動（または手動）で実施する
1. 楽天証券の取り扱い銘柄一覧を取得する
   https://www.trkd-asia.com/rakutensec/exportcsvus?all=on&vall=on&forwarding=na&target=0&theme=na&returns=na&head_office=na&name=&code=&sector=na&pageNo=&c=us&p=result&r1=on
2. yahoo financeから取得した情報をもとに自動（スクリプト）でスクリーニングする
   (情報が足りない場合はEDGAR(https://www.sec.gov/edgar/search)で手動で調べる)
3. 抽出した銘柄のスクリーニングを行う
