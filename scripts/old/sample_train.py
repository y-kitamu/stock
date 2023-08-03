from datetime import datetime
from pathlib import Path

import stock

if __name__ == "__main__":
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    output_dir = Path(f"./tmp/{timestamp}")
    params = stock.dl.train.TrainerParams(
        dataset_params=stock.dl.dataset.DatasetParams(),
        model_params=stock.dl.models.ModelParams(),
        loss_params=stock.dl.losses.LossParams(),
        output_dir=output_dir,
    )

    def run():
        trainer = stock.dl.train.Trainer(params)
        trainer.build()

        trainer.train()

    stock.run_debug(run)
