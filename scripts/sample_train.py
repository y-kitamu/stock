from pathlib import Path

import stock

if __name__ == "__main__":
    output_dir = Path("./tmp")
    params = stock.dl.train.TrainerParams(
        dataset_params=stock.dl.dataset.DatasetParams(),
        model_params=stock.dl.models.ModelParams(),
        loss_params=stock.dl.losses.LossParams(),
        output_dir=output_dir,
    )
    trainer = stock.dl.train.Trainer(params)
    trainer.build()

    stock.run_debug(trainer.train)
