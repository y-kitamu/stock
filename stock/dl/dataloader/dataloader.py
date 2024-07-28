"""dataloader.py

Author : Yusuke Kitamura
Create Date : 2024-07-15 18:32:56
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""

from pathlib import Path
from typing import Any

import numpy as np
from pydantic import BaseModel, field_serializer, field_validator

import gnn
from ...constants import PROJECT_ROOT, TRAIN_DATA_DIR


class DataLoader(gnn.dataloader.BaseDataloader):
    class Params(BaseModel):
        batch_size: int = 1000
        pos_ratio: float = 0.3  # batch内のTrue positiveデータの割合
        filepath: Path = TRAIN_DATA_DIR / "20240714.npz"
        tp_thresh: float = 20
        tn_thresh: float = 10
        train_step_factor: int = 100

        @field_validator("filepath")
        def _validate_filepath(cls, value: Path):
            if value.is_absolute():
                return value
            return PROJECT_ROOT / value

        @field_serializer("filepath")
        def _serialize_filepath(self, value: Path, _) -> str:
            return value.relative_to(PROJECT_ROOT).as_posix()

    def __init__(self, params: Params, is_train: bool):
        self.params = params
        self.is_train = is_train
        npz = np.load(params.filepath)
        train_input, train_true, valid_input, valid_true = (
            npz["arr_0"],
            npz["arr_1"],
            npz["arr_2"],
            npz["arr_3"],
        )

        if self.is_train:
            x, y = train_input, train_true
            self.positive_num = int(params.batch_size * params.pos_ratio)
            self.negative_num = params.batch_size - self.positive_num
        else:
            x, y = valid_input, valid_true
            self.positive_num = np.sum(y > params.tp_thresh)
            self.negative_num = np.sum(y < params.tn_thresh)

        self.positive_x = x[(y > params.tp_thresh).reshape(-1)]
        self.negative_x = x[(y < params.tn_thresh).reshape(-1)]
        self.y = np.concatenate(
            [
                np.ones((self.positive_num, 1), dtype=np.float32),
                np.zeros((self.negative_num, 1), dtype=np.float32),
            ]
        )

    @property
    def steps_per_epoch(self):
        if self.is_train:
            return (
                (len(self.positive_x) + len(self.negative_x)) // self.params.batch_size
            ) * self.params.train_step_factor
        else:
            return 1

    def get_next(self) -> dict[str, Any]:
        if self.is_train:
            positive_idx = np.random.choice(len(self.positive_x), self.positive_num)
            negative_idx = np.random.choice(len(self.negative_x), self.negative_num)
            x = np.concatenate([self.positive_x[positive_idx], self.negative_x[negative_idx]])
            y = self.y
        else:
            x = np.concatenate([self.positive_x, self.negative_x])
            y = self.y
        return {"input": x, "y_true": y}
