import pdb
import platform
import traceback


def run_debug(func, *args, **kwargs):
    """エラーが発生したときにpdbを起動する"""
    try:
        return func(*args, **kwargs)
    except:
        extype, value, tb = sys.exc_info()
        traceback.print_exc()
        pdb.post_mortem(tb)
