"""__init__.py

Author : Yusuke Kitamura
Create Date : 2024-07-13 22:07:43
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""

try:
    import gnn

    from .dataloader import DataLoader
    from .network import Network

    gnn.dataloader.dataloader_list["stock_dataloader"] = DataLoader
    gnn.layers.network_list["stock_network"] = Network
except:
    print("Failed to load gnn module.")
