"""__init__.py
各ディレクトリのbase_{dirname}.pyがinterfaceを定義している。
ディレクトリをまたいでそれ以外のファイルをimportするのは禁止。
"""

try:
    from . import agent, base, callback, network, replay_buffer, trainer
    from .trainer import Trainer
except:
    print("Failed to load rl module.")
