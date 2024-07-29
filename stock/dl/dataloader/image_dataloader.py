"""
"""

import random
from pathlib import Path
from typing import Any, List

import cv2
import numpy as np
from pydantic import BaseModel, field_serializer, field_validator

import gnn
from ...constants import PROJECT_ROOT


def _to_relative(data_list: List[List[Path]]):
    return [[p.relative_to(PROJECT_ROOT).as_posix() for p in data] for data in data_list]


def _to_absolute(data_list: List[List[Path]]):
    def _convert(p: Path):
        if p.is_absolute():
            return p
        return PROJECT_ROOT / p

    return [[_convert(p) for p in data] for data in data_list]


class ImageDataloader(gnn.dataloader.BaseDataloader):

    class Dataset(BaseModel):
        train: List[List[Path]]
        valid: List[List[Path]]

        @classmethod
        def load_json(cls, filepath):
            with open(filepath, "r") as f:
                text = f.read()
            return cls.model_validate_json(text)

        @field_validator("train")
        def _validate_train(cls, value: List[List[Path]]):
            return _to_absolute(value)

        @field_validator("valid")
        def _validate_valid(cls, value: List[List[Path]]):
            return _to_absolute(value)

        @field_serializer("train")
        def _serialize_train(self, value: List[List[Path]], _):
            return _to_relative(value)

        @field_serializer("valid")
        def _serialize_valid(self, value: List[List[Path]], _):
            return _to_relative(value)

    class DataSchema(BaseModel):
        image_path: Path
        label: int  # 0 : negative, 1 : positive

        @classmethod
        def load_json(cls, filepath):
            with open(filepath, "r") as f:
                text = f.read()
            return cls.model_validate_json(text)

        def validate(self):
            assert self.image_path.exists()

        @field_validator("image_path")
        def _validate_image_path(cls, value: Path):
            if value.is_absolute():
                return value
            return PROJECT_ROOT / value

        @field_serializer("image_path")
        def _serialize_image_path(self, value: Path, _):
            return value.relative_to(PROJECT_ROOT).as_posix()

    class Params(BaseModel):
        batch_size: int = 32
        dataset_json_path: Path = Path()
        ratio_per_group: List[float] = []
        num_class: int = 2

        @field_validator("dataset_json_path")
        def _validate_filepath(cls, value: Path):
            if value.is_absolute():
                return value
            return PROJECT_ROOT / value

        @field_serializer("dataset_json_path")
        def _serialize_filepath(self, value: Path, _) -> str:
            if value.is_relative_to(PROJECT_ROOT):
                return value.relative_to(PROJECT_ROOT).as_posix()
            return value.as_posix()

    def __init__(self, params: Params, is_train: bool):
        self.params = params
        self.is_train = is_train
        dataset = self.Dataset.load_json(self.params.dataset_json_path)
        data_list = dataset.train if is_train else dataset.valid
        self.data_schema = self._load_and_validate_dataset(data_list)

    def _load_and_validate_dataset(self, data_list: List[List[Path]]) -> List[List[DataSchema]]:
        assert len(data_list) == len(self.params.ratio_per_group)
        for group in data_list:
            for data in group:
                assert data.exists()
        data_schema = [[self.DataSchema.load_json(d) for d in data] for data in data_list]
        [[s.validate() for s in data] for data in data_schema]
        return data_schema

    @property
    def steps_per_epoch(self):
        return max(
            [
                int(len(group) / (rate * self.params.batch_size))
                for rate, group in zip(self.params.ratio_per_group, self.data_schema)
            ]
        )

    def get_next(self) -> dict[str, Any]:
        """ """
        ratio_per_group = [
            rate / sum(self.params.ratio_per_group) for rate in self.params.ratio_per_group
        ]
        base_sample_per_group = [self.params.batch_size * rate for rate in ratio_per_group]
        sample_per_group = [int(n) for n in base_sample_per_group]
        residual = self.params.batch_size - sum(sample_per_group)
        res_rate = [f - i for i, f in zip(sample_per_group, base_sample_per_group)]
        if sum(res_rate) > 0.5:
            res_rate = [r / sum(res_rate) for r in res_rate]
            indices = np.random.choice([i for i in range(len(res_rate))], size=residual, p=res_rate)
            for i in indices:
                sample_per_group[i] += 1

        sample = [
            s
            for num_sample, group in zip(sample_per_group, self.data_schema)
            for s in random.sample(group, num_sample)
        ]
        image = (np.stack([cv2.imread(s.image_path) for s in sample]) / 255.0).astype(np.float32)
        mat = np.identity(self.params.num_class)
        label = np.stack([mat[s.label] for s in sample]).astype(np.float32)
        return {"input": image, "y_true": label}
