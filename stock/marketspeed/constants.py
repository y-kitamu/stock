from enum import Enum

# RSSの関数の引数に使用する定数


class OrderTrigger(Enum):
    Wait = 0
    Order = 1


class Market(Enum):
    TOSHO = ".T"
    JNX = ".JNX"
    Chi_x = ".CHJ"


class TradingType(Enum):
    Sell = 1
    Buy = 3


class OrderType(Enum):
    Normal = 0
    NormalWitStop = 1
    Stop = 2


class SORType(Enum):
    Normal = 0
    SOR = 1


class PriceType(Enum):
    Market = 0
    Limit = 1


class OrderCondition(Enum):
    Today = 1
    ThisWeek = 2
    Open = 3
    Close = 4
    Period = 5
    MarketClose = 6
    UnsuccessfulOnMarketClose = 7
    UnsuccessfulOnClose = 8


class AcccountType(Enum):
    Specific = 0
    Normal = 1
    NISA = 2


class StopType(Enum):
    GreaterEqual = 1
    LessEqual = 2


class PairOrder(Enum):
    NO = 0
    YES = 1
