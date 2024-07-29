import gnn
from .dataloader import DataLoader
from .image_dataloader import ImageDataloader

gnn.dataloader.dataloader_list["stock_dataloader"] = DataLoader
gnn.dataloader.dataloader_list["stock_image_dataloader"] = ImageDataloader
