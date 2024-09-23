"""portfolio.py

Author : Yusuke Kitamura
Create Date : 2024-09-14 15:54:39
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""

import math
from enum import Enum
from typing import Any, override

import gymnasium as gym
import numpy as np
import numpy.typing as npt
from pydantic import BaseModel


class Action:
    class ActionEnum(Enum):
        BUY = 0
        SELL = 1

    def __init__(self, action: dict[str, Any]):
        self.action = Action.ActionEnum(action["action"])
        # self.portion: float = action["portion"][0]
        self.portion: float = 1.0


class Portfolio:
    """cryptoのポートフォリオを表すクラス"""

    class Params(BaseModel):
        initial_cash: float = 100000.0
        market_impact: float = 0.0001
        maker_fee: float = -0.0001
        taker_fee: float = 0.0005

    def __init__(self, params: Params):
        self.initial_cash = params.initial_cash
        self.cash = params.initial_cash  # 現金
        self.num_unit = 0  # 保有数量（取引単位）
        self.acquision_price = 0  # 現在の保有株の取得総額
        self.total = params.initial_cash  # 現在の総資産
        self.prev_total = self.total

        self.market_impact = params.market_impact  # 取引時の市場インパクト
        self.maker_fee = params.maker_fee  # メーカー手数料
        self.taker_fee = params.taker_fee  # テイカー手数料

        self.min_transaction_unit = 0.0001
        self.max_transaction_unit = 5.0
        self.max_loss_rate = 0.1

        self.history = []

        self.action_space = gym.spaces.Dict(
            {
                "action": gym.spaces.Discrete(2),
                # "portion": gym.spaces.Box(low=0.0, high=1.0, shape=(1,), dtype=np.float32),
            }
        )

    @property
    def equity_value(self) -> float:
        return self.total - self.cash

    def reset(self):
        print("reset!")
        self.cash = self.initial_cash
        self.num_unit = 0
        self.acquision_price = 0
        self.prev_total = self.initial_cash

    def action(self, ohlcv: npt.NDArray[np.float32], action: Action) -> float:
        if self.num_unit > 0:  # 保有株がある場合, loss cutの条件を満たしているか確認
            loss_cut_price = (
                (1 - self.max_loss_rate)
                * self.acquision_price
                / (self.num_unit * self.min_transaction_unit)
            )
            if ohlcv[2] < loss_cut_price:  # loss cutに引っかかったら売る
                print("loss cut!, {}, {}".format(loss_cut_price, ohlcv[2]))
                price = max(ohlcv[0], loss_cut_price)
                self.sell(price, 1.0)

        if action.action == Action.ActionEnum.BUY:
            self.buy(ohlcv[3], action.portion)
        elif action.action == Action.ActionEnum.SELL:
            self.sell(ohlcv[3], action.portion)

        self.prev_total = self.total
        self.total = self.cash + self.num_unit * self.min_transaction_unit * ohlcv[3]

        return self.reward()

    def reward(self) -> float:
        return self.total - self.prev_total

    def buy(self, price: float, portion: float):
        price = price * (1 + self.market_impact + self.taker_fee)
        units = math.floor(min(self.total * portion, self.cash) / (price * self.min_transaction_unit))
        if units < 1:
            return
        amount_price = price * self.min_transaction_unit * units

        self.cash -= amount_price
        self.num_unit += units
        self.acquision_price += amount_price

        self.history.append([units, price])

    def sell(self, price: float, portion: float):
        if self.num_unit == 0:
            return
        price = price * (1 - self.market_impact)
        units = round(
            min(self.total * portion, self.num_unit * self.min_transaction_unit * price)
            / (price * self.min_transaction_unit)
        )
        if units < 1:
            return
        amount_price = price * self.min_transaction_unit * units

        self.cash += amount_price * (1.0 - self.maker_fee)
        self.acquision_price *= 1.0 - units / self.num_unit
        self.num_unit -= units

        self.history.append([-units, price])

    @override
    def __str__(self):
        return f"cash: {self.cash}, num_unit: {self.num_unit}, total: {self.total}"
