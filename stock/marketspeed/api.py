from . import constants
from .order_params import OrderParams


def rss_stock_order(params: OrderParams) -> str:
    """ """
    is_normal_type = (
        params.order_type == constants.OrderType.Normal
        or params.order_type == constants.OrderType.NormalWithStop
    )
    is_with_stop = (
        params.order_type == constants.OrderType.NormalWithStop
        or params.order_type == constants.OrderType.Stop
    )

    # 通常注文の設定
    formula_str = f"=RssStockOrder({params.unique_id},{params.trigger},{params.code}{params.market}"
    formula_str += f",{params.trading_type},{params.order_type},{params.sor_type},{params.quantity}"
    if params.price_type is not None:
        assert is_normal_type
        formula_str += f",{params.price_type}"
    if params.price is not None:
        assert is_normal_type and params.price_type == constants.PriceType.Limit
        formula_str += f",{params.price}"
    formula_str += f",{params.order_condition},{params.order_limit},{params.account_type}"
    # 逆指値の設定

    # セット注文の設定

    formula_str += ")"
    return formula_str
