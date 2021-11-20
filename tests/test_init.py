"""test_init.py

Author : Yusuke Kitamura
Create Date : 2021-11-20 12:01:23
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""
from stock import enable_logging_to_file, enable_logging_to_stdout, logger


def test_enable_logging_to_file(tmp_path):
    out1 = tmp_path / "test1.log"
    enable_logging_to_file(str(out1), remove_old_handler=False)
    logger.debug("test message1")
    assert out1.exists()
    with open(out1, 'r') as f:
        assert "test message1" in f.read()

    out2 = tmp_path / "test2.log"
    enable_logging_to_file(str(out2), remove_old_handler=False)
    message = "test message2"
    logger.debug(message)
    assert out2.exists()
    with open(out1, 'r') as f:
        assert message in f.read()
    with open(out2, 'r') as f:
        assert message in f.read()

    out3 = tmp_path / "foo" / "test3.log"
    enable_logging_to_file(str(out3), remove_old_handler=True)
    message = "test message3"
    logger.debug(message)
    assert out3.exists()
    with open(out1, 'r') as f:
        assert message not in f.read()
    with open(out2, 'r') as f:
        assert message not in f.read()
    with open(out3, 'r') as f:
        assert message in f.read()

    enable_logging_to_stdout()
