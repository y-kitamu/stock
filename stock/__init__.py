"""Top-level package for stock."""

__author__ = "Yusuke Kitamura"
__email__ = 'ymyk6602@gmail.com'
__version__ = (0, 1, 0)

import logging
import os
import sys
from pathlib import Path

VERSION = (1, 0, 0)
PROJECT_ROOT = Path(__file__).parent.parent

logging.getLogger().setLevel(logging.DEBUG)

LOGGER_NAME = __name__
DEFAULT_LOGLEVEL = logging.DEBUG
SHORT_FORMATTER = logging.Formatter(
    fmt="[%(asctime)s %(levelname)s module %(module)s at line %(lineno)d] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S")
LONG_FORMATTER = logging.Formatter(
    fmt="[%(asctime)s %(levelname)s %(pathname)s in %(funcName)s at line %(lineno)d] %(message)s")
logger = logging.getLogger(LOGGER_NAME)


def enable_logging_to_stdout(log_level: int = DEFAULT_LOGLEVEL,
                             formatter: logging.Formatter = SHORT_FORMATTER) -> None:
    """標準出力へのlogging。
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


def enable_logging_to_file(filename: str,
                           remove_old_handler: bool = True,
                           log_level: int = DEFAULT_LOGLEVEL,
                           formatter: logging.Formatter = LONG_FORMATTER) -> None:
    """ファイルへのlogging
    Args:
        filename (str) :
        remove_old_handler (bool) : Trueの場合、loggerに紐付いた古い`logging.FileHandler`クラスの
            インスタンスを削除する。
        log_level (int) :
        format (logging.Formatter) :
    """
    # remove old handler
    if remove_old_handler:
        for handler in list(logger.handlers):
            if isinstance(handler, logging.FileHandler):
                logger.removeHandler(handler)

    # add new handler
    dirname = os.path.abspath(os.path.dirname(filename))
    if not os.path.exists(dirname):
        os.makedirs(dirname)
        logger.warning("Directory does not exist. Create directory = {}".format(dirname))
    fh = logging.FileHandler(filename, encoding='utf-8')
    fh.setLevel(log_level)
    fh.setFormatter(formatter)
    logger.addHandler(fh)
    logger.info("Set new `FileHandler` instance to the logger. output file = {}".format(
        os.path.abspath(filename)))


enable_logging_to_stdout()

from . import downloader  # noqa: E402 F401
