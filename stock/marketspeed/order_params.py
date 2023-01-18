from typing import Optional, Union

from pydantic import BaseModel

from . import constants


class OrderParams(BaseModel):
    """ """

    unique_id: int  # 発注ID
    trigger: constants.OrderTrigger  # 発注トリガー
    code: Union[str, int]  # 銘柄コード
    market: constants.Market = constants.Market.TOSHO  # 市場
    trading_type: constants.TradingType  # 売買区分
    order_type: constants.OrderType  # 注文区分
    sor_type: constants.SORType  # SOR区分
    quantity: int  # 注文数量
    price_type: Optional[constants.PriceType] = None  # 価格区分
    price: Optional[int] = None  # 注文価格
    order_condition: constants.OrderCondition  # 執行条件
    order_limit: Optional[str] = None  # 注文期限
    account_type: constants.AcccountType  # 口座区分
    stop_condition_price: Optional[int] = None  # 逆指値条件価格
    stop_condition_type: Optional[constants.StopType] = None  # 逆指値条件区分
    stop_price_type: Optional[constants.PriceType] = None  # 逆指値価格
    pair_order: constants.PairOrder = constants.PairOrder.NO  # セット注文区分
    pair_order_price_type: Optional[constants.PairOrderPriceType] = None  # セット注文価格区分
    pair_order_price: Optional[int] = None  # セット注文価格
    pair_order_condition: Optional[constants.OrderCondition] = None  # セット注文執行条件
    pair_order_limit: Optional[str] = None  # セット注文期限
