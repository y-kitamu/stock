# Stock

## モジュール構成

stock以下
- models : データベースのデータ構造の定義を行う。models以下のファイル以外に依存しない
- scraping: データ収集用のスクリプト。scarping以下のファイル以外に依存しない
- adapter: scrapingモジュールで収集したデータをmodelsモジュールのデータ構造に合うように変換するスクリプト。models, scraping以外に依存しない
