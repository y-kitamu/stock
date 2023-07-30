class DatasetBase:
    @property
    def num_input_features(self):
        raise NotImplementedError

    @property
    def num_output_features(self):
        raise NotImplementedError

    def get_train_val_test_dataset(self):
        raise NotImplementedError


from .dataset3 import Dataset, DatasetParams
