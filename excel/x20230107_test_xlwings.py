import numpy as np
import xlwings as xw

def main():
    wb = xw.Book.caller()
    wb.sheets[0].range('A1').value = 'Hello World!'


@xw.func
def double_sum(x, y):
    """Returns twice the sum of the two arguments"""
    return 2 * (x + y)    