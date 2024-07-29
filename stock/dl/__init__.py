"""__init__.py

Author : Yusuke Kitamura
Create Date : 2024-07-13 22:07:43
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""

try:
    import gnn
    from . import dataloader
    from .network import Network

    gnn.layers.network_list["stock_network"] = Network
except:
    print("Failed to load gnn module.")
