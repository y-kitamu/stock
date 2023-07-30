from typing import Any, List, Optional, Union

from pydantic import BaseModel

from . import constants


class BaseOrder(BaseModel):
    """注文の基底クラス。
    クラス名はexcelの関数名と一致させること。(`get_formula_str`で参照するため)
    """

    def get_api_arg_list(self) -> List[Any]:
        """関数の引数リストを取得する"""
        raise NotImplementedError

    def get_formula_str(self) -> str:
        """excelの関数の式(文字列)を取得する"""
        args_str = ",".join([str(arg) for arg in self.get_api_arg_list()])
        formula_str = f"={self.__class__.__name__}({args_str})"
        return formula_str


class RssStockOrder(BaseOrder):
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
    account_type: constants.AccountType  # 口座区分
    stop_condition_price: Optional[int] = None  # 逆指値条件価格
    stop_condition_type: Optional[constants.StopType] = None  # 逆指値条件区分
    stop_price_type: Optional[constants.PriceType] = None  # 逆指値価格区分
    stop_price: Optional[int] = None  # 逆指値価格
    pair_order: constants.PairOrder = constants.PairOrder.NO  # セット注文区分
    pair_order_price: Optional[int] = None  # セット注文価格
    pair_order_condition: Optional[constants.OrderCondition] = None  # セット注文執行条件
    pair_order_limit: Optional[str] = None  # セット注文期限

    def get_api_arg_list(self) -> List[any]:
        """ """
        # 注文の種類を判定(注文の種類によって引数が変わるため)
        is_normal_type = (
            self.order_type == constants.OrderType.Normal
            or self.order_type == constants.OrderType.NormalWithStop
        )
        is_with_stop = (
            self.order_type == constants.OrderType.NormalWithStop
            or self.order_type == constants.OrderType.Stop
        )
        is_with_pair = self.pair_order == constants.PairOrder.YES
        is_with_pair_limit = is_with_stop and self.stop_price_type == constants.PriceType.Limit
        # assertion check
        if self.price_type is not None:
            assert is_normal_type
        if self.price is not None:
            assert is_normal_type and self.price_type == constants.PriceType.Limit

        # 通常注文の設定
        args = [
            self.unique_id,
            self.trigger.value,
            f'"{self.code}{self.market.value}"',
            self.trading_type.value,
            self.order_type.value,
            self.sor_type.value,
            self.quantity,
            self.price_type.value if self.price_type is not None else "",
            self.price or "",
            self.order_condition.value,
            self.order_limit or "",
            self.account_type.value,
        ]
        # 逆指値の設定
        args += [
            self.stop_condition_price if is_with_stop else "",
            self.stop_condition_type.value if is_with_stop else "",
            self.stop_price_type.value if is_with_stop else "",
            self.stop_price if is_with_pair_limit else "",
        ]
        # セット注文の設定
        args += [
            self.pair_order_price if is_with_pair else "",
            self.pair_order_condition.value if is_with_pair else "",
            self.pair_order_limit if is_with_pair else "",
        ]
        return args


class RssMarginOpenOrder(RssStockOrder):
    margin_type: constants.MarginType  # 信用区分
    pair_order_price_type: Optional[constants.PairOrderPriceType] = None  # セット注文価格区分

    def get_api_arg_list(self):
        """ """
        i_mt = 6  # 信用区分の挿入位置
        i_popt = -3  # セット注文価格区分の挿入位置
        args = super().get_api_arg_list()
        return (
            args[:i_mt]
            + [self.margin_type.value]
            + args[i_mt:i_popt]
            + [self.pair_order_price_type.value or ""]
            + args[i_popt:]
        )


class RssMarginCloseOrder(BaseOrder):
    """ """

    unique_id: int  # 発注ID
    trigger: constants.OrderTrigger  # 発注トリガー
    code: Union[str, int]  # 銘柄コード
    market: constants.Market = constants.Market.TOSHO  # 市場
    trading_type: constants.TradingType  # 売買区分
    order_type: constants.OrderType  # 注文区分
    sor_type: constants.SORType  # SOR区分
    margin_type: constants.MarginType  # 信用区分
    quantity: int  # 注文数量
    price_type: Optional[constants.PriceType] = None  # 価格区分
    price: Optional[int] = None  # 注文価格
    order_condition: constants.OrderCondition  # 執行条件
    order_limit: Optional[str] = None  # 注文期限
    account_type: constants.AccountType  # 口座区分
    position_day: str  # 建日
    position_price: int  # 建値
    position_market: constants.Market  # 建市場
    stop_condition_price: Optional[int] = None  # 逆指値条件価格
    stop_condition_type: Optional[constants.StopType] = None  # 逆指値条件区分
    stop_price_type: Optional[constants.PriceType] = None  # 逆指値価格区分
    stop_price: Optional[int] = None  # 逆指値価格

    def get_api_arg_list(self):

        # 注文の種類を判定(注文の種類によって引数が変わるため)
        is_normal_type = (
            self.order_type == constants.OrderType.Normal
            or self.order_type == constants.OrderType.NormalWithStop
        )
        is_with_stop = (
            self.order_type == constants.OrderType.NormalWithStop
            or self.order_type == constants.OrderType.Stop
        )
        # assertion check
        if self.price_type is not None:
            assert is_normal_type
        if self.price is not None:
            assert is_normal_type and self.price_type == constants.PriceType.Limit

        # 通常注文の設定
        args = [
            self.unique_id,
            self.trigger.value,
            f'"{self.code}{self.market.value}"',
            self.trading_type.value,
            self.order_type.value,
            self.sor_type.value,
            self.quantity,
            self.price_type.value if self.price_type is not None else "",
            self.price or "",
            self.order_condition.value,
            self.order_limit or "",
            self.account_type.value,
            self.position_day,
            self.position_price,
            self.position_market.value,
        ]
        # 逆指値の設定
        args += [
            self.stop_condition_price if is_with_stop else "",
            self.stop_condition_type.value if is_with_stop else "",
            self.stop_price_type.value if is_with_stop else "",
            self.stop_price if is_with_stop else "",
        ]
        return args


class RssModifyOrder(BaseOrder):
    unique_id: int  # 発注ID
    trigger: constants.OrderTrigger  # 発注トリガー
    order_number: int  # 注文番号
    order_type: constants.OrderType  # 注文区分
    quantity: int  # 注文数量
    price_type: Optional[constants.PriceType] = None  # 価格区分
    price: Optional[int] = None  # 注文価格
    order_condition: constants.OrderCondition  # 執行条件
    order_limit: Optional[str] = None  # 注文期限
    stop_condition_price: Optional[int] = None  # 逆指値条件価格
    stop_condition_type: Optional[constants.StopType] = None  # 逆指値条件区分
    stop_price_type: Optional[constants.PriceType] = None  # 逆指値価格区分
    stop_price: Optional[int] = None  # 逆指値価格
    pair_order: constants.PairOrder = constants.PairOrder.NO  # セット注文区分
    pair_order_price: Optional[int] = None  # セット注文価格
    pair_order_condition: Optional[constants.OrderCondition] = None  # セット注文執行条件
    pair_order_limit: Optional[str] = None  # セット注文期限

    def get_api_arg_list(self) -> List[Any]:
        # 注文の種類を判定(注文の種類によって引数が変わるため)
        is_normal_type = (
            self.order_type == constants.OrderType.Normal
            or self.order_type == constants.OrderType.NormalWithStop
        )
        is_with_stop = (
            self.order_type == constants.OrderType.NormalWithStop
            or self.order_type == constants.OrderType.Stop
        )
        is_with_pair = self.pair_order == constants.PairOrder.YES
        is_with_pair_limit = is_with_stop and self.stop_price_type == constants.PriceType.Limit
        # assertion check
        if self.price_type is not None:
            assert is_normal_type
        if self.price is not None:
            assert is_normal_type and self.price_type == constants.PriceType.Limit

        # 通常注文の設定
        args = [
            self.unique_id,
            self.trigger.value,
            self.order_number,
            self.order_type.value,
            self.quantity,
            self.price_type.value if self.price_type is not None else "",
            self.price or "",
            self.order_condition.value,
            self.order_limit or "",
        ]
        # 逆指値の設定
        args += [
            self.stop_condition_price if is_with_stop else "",
            self.stop_condition_type.value if is_with_stop else "",
            self.stop_price_type.value if is_with_stop else "",
            self.stop_price if is_with_pair_limit else "",
        ]
        # セット注文の設定
        args += [
            self.pair_order_price if is_with_pair else "",
            self.pair_order_condition.value if is_with_pair else "",
            self.pair_order_limit if is_with_pair else "",
        ]
        return args


class RssCancelOrder(BaseOrder):

    unique_id: int  # 発注ID
    trigger: constants.OrderTrigger = constants.OrderTrigger.Wait  # 発注トリガー
    order_number: int  # 注文番号

    def get_api_arg_list(self) -> List[Any]:
        return [self.unique_id, self.trigger.value, self.order_number]
