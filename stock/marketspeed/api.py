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
    is_with_pair = params.pair_order == constants.PairOrder.Yes
    is_with_pair_limit = is_with_stop and params.stop_price_type == constants.PriceType.Limit
    if params.price_type is not None:
        assert is_normal_type
    if params.price is not None:
        assert is_normal_type and params.price_type == constants.PriceType.Limit

    args = []
    # 通常注文の設定
    args += [
        params.unique_id,
        params.trigger,
        params.code,
        params.market,
        params.trading_type,
        params.order_type,
        params.sor_type,
        params.quantity,
        params.price_type or "",
        params.price or "",
        params.order_condition,
        params.order_limit,
        params.account_type,
    ]
    # 逆指値の設定
    args += [
        params.stop_condition_price if is_with_stop else "",
        params.stop_condition_type if is_with_stop else "",
        params.stop_price_type if is_with_stop else "",
        params.stop_price if is_with_pair_limit else "",
    ]
    # セット注文の設定
    args += [
        params.pair_order_price if is_with_pair else "",
        params.pair_order_condition if is_with_pair else "",
        params.pair_order_limit if is_with_pair else "",
    ]

    args_str = ",".join(args)
    formula_str = f"=RssStockOrder({args_str})"
    return formula_str


def rss_margin_open_order():
    """ """
