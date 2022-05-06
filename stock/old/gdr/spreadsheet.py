"""spreadsheet.py

Author : Yusuke Kitamura
Create Date : 2021-12-05 11:17:42
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""
from typing import Any, List

from stock.gdr import get_service

UPLOAD_LOG_SS_GID = "1SRi3cDXctknMSMB1TrEctq4vVeqC4C3ZLEkmY-A1CII"
SCOPES = ['https://www.googleapis.com/auth/spreadsheets']


def update_row_to_ss(value: List[Any], sid: str = UPLOAD_LOG_SS_GID):
    """`sid`で指定したspreadsheetの末尾に`row`を追記する
    """
    service = get_service(scopes=SCOPES, api_name="sheets", api_ver="v4")
    body = {'values': [value]}
    service.spreadsheets().values().append(spreadsheetId=sid,
                                           range="A1:A2",
                                           body=body,
                                           valueInputOption="USER_ENTERED").execute()
