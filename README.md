# Stock

## モジュール構成

stock以下
- models : データベースのデータ構造の定義を行う。models以下のファイル以外に依存しない
- scraping: データ収集用のスクリプト。scarping以下のファイル以外に依存しない
- adapter: scrapingモジュールで収集したデータをmodelsモジュールのデータ構造に合うように変換するスクリプト。models, scraping以外に依存しない
- server: データベースのデータを取り出したり、データベースを定期的にアップデートするためのサーバー。stockモジュールに依存するが、sqlalchemyなどstockモジュール内部で使用している外部ライブラリには直接依存しないようにする（stockモジュールの内部構成を変更する場合でも影響範囲を狭くするため）。ライブラリとして使用することは想定しないので`__init__.py`は配置せず、他のモジュールからインポートもしない。

