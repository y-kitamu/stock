"""__init__.py

Author : Yusuke Kitamura
Create Date : 2022-05-06 13:53:21
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""
import logging
import pdb
import platform
import sys
import traceback
from pathlib import Path

from .constants import *

## Logger settings
logging.getLogger().setLevel(logging.DEBUG)

LOGGER_NAME = __name__
DEFAULT_LOGLEVEL = logging.DEBUG
SHORT_FORMATTER = logging.Formatter(
    fmt="[%(asctime)s %(levelname)s %(pathname)s at line %(lineno)d] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
LONG_FORMATTER = logging.Formatter(
    fmt="[%(asctime)s %(levelname)s %(pathname)s in %(funcName)s at line %(lineno)d] %(message)s"
)
logger = logging.getLogger(LOGGER_NAME)


def enable_logging_to_stdout(
    log_level: int = DEFAULT_LOGLEVEL, formatter: logging.Formatter = SHORT_FORMATTER
):
    """logging to stdout。
    Args:
        log_level (int) : log level
        formatter (logging.Formatter) : log format
    """
    # remove old handler
    for handler in list(logger.handlers):
        if isinstance(handler, logging.StreamHandler):
            logger.removeHandler(handler)

    # add new handler
    ch = logging.StreamHandler(sys.stdout)
    ch.setLevel(log_level)
    ch.setFormatter(formatter)
    logger.addHandler(ch)
    logger.info("Set new `StreamHandler` instance to the logger.")


def enable_logging_to_file(
    filepath: Path,
    remove_old_handler: bool = True,
    log_level: int = DEFAULT_LOGLEVEL,
    formatter: logging.Formatter = LONG_FORMATTER,
):
    """Logging to file.
    Args:
        filepath (str) :
        remove_old_handler (bool) : If True、remove old instance of `logging.FileHandler` from `logger`
        log_level (int) :
        format (logging.Formatter) :
    """
    # remove old handler
    if remove_old_handler:
        for handler in list(logger.handlers):
            if isinstance(handler, logging.FileHandler):
                logger.removeHandler(handler)

    # add new handler
    filepath.parent.mkdir(parents=True, exist_ok=True)
    fh = logging.FileHandler(filepath, encoding="utf-8")
    fh.setLevel(log_level)
    fh.setFormatter(formatter)
    logger.addHandler(fh)
    logger.info(
        "Set new `FileHandler` instance to the logger. output file = {}".format(filepath.absolute())
    )


def remove_logfile(logdir: Path, max_save: int = 10):
    logs = sorted(logdir.glob("*.log"))
    if len(logs) > max_save:
        for logfile in logs[:-max_save]:
            try:
                logfile.unlink()
            except Exception:
                continue


enable_logging_to_stdout(log_level=logging.DEBUG)


def run_debug(func, *args, **kwargs):
    """エラーが発生したときにpdbを起動する"""
    try:
        return func(*args, **kwargs)
    except:
        extype, value, tb = sys.exc_info()
        traceback.print_exc()
        pdb.post_mortem(tb)


if platform.system() == "Linux":
    # windowsだとtensorflowのエラーが出て動かないので、linuxのときだけimportする
    from . import dl

from . import autotrade, chart, marketspeed, scraping, storage, visualize
