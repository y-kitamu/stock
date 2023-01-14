import time

import numpy as np
import xlwings as xw


def main():
    wb = xw.Book.caller()
    wb.sheets[0].range('A1').value = 'Hello World!'


@xw.func
def my_macro():
    """Writes the name of the Workbook into Range("A1") of Sheet 1"""
    wb = xw.Book.caller()
    print(wb.sheets[0].name, wb.name, wb.sheets[0].range('A1').value)
    wb.sheets[0].range('A5').value = wb.name
    return wb.name

@xw.func
def double_sum(x, y):
    """Returns twice the sum of the two arguments"""
    return 2 * (x + y)

if __name__ == "__main__":
    xw.serve()