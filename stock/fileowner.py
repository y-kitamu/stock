"""fileowner.py
Script for changing file owner on Google drive.
Author : Yusuke Kitamura
Create Date : 2021-12-04 09:25:23
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""

from __future__ import print_function

import os.path

from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from oauth2client.service_account import ServiceAccountCredentials

from stock import PROJECT_ROOT, logger

# If modifying these scopes, delete the file token.json.
SCOPES = ['https://www.googleapis.com/auth/drive']
CERT_FILE = PROJECT_ROOT / "cert" / "stockdata-332410-704571e36294.json"


def callback(request_id, response, exception):
    if exception:
        # Handle error
        logger.error(exception)
    else:
        logger.debug("Request success : request_id = {}, permission_id = {}".format(
            request_id, response.get('id')))


def changeFileOwnerOnGDrive(cert_file=CERT_FILE):
    """
    """
    # check credential
    if not os.path.exists(cert_file):
        logger.error("Cert file does not exist : {}".format(cert_file))
    creds = ServiceAccountCredentials.from_json_keyfile_name(cert_file)
    service = build('drive', 'v3', credentials=creds)

    # get permissions
    stock_list_file_id = "1DeI8d9zDK65vIEzaVzic_H5Sl4vct2g5KFZs95erNVc"
    res = service.permissions().list(fileId=stock_list_file_id, fields='*').execute()
    owner_email = None
    owner_perm_id = None
    sa_email = None  # service account email
    sa_perm_id = None
    for perm in res.get("permissions"):
        if perm['role'] == 'owner':
            owner_email = perm['emailAddress']
            owner_perm_id = perm['id']
        elif perm['role'] == 'writer':
            sa_email = perm['emailAddress']
            sa_perm_id = perm['id']
    if owner_email is None or owner_perm_id is None or sa_email is None or sa_perm_id is None:
        logger.error("Failed to get permissions from {}".format(stock_list_file_id))
        return

    page_token = None
    while True:
        # get target files
        results = service.files().list(fields="nextPageToken, files(id, name, owners)",
                                       pageToken=page_token).execute()
        items = results.get('files', [])
        page_token = results.get('nextPageToken', None)

        # change file owner
        user_permission = {'role': 'owner'}
        batch = service.new_batch_http_request(callback=callback)
        for f in items:
            logger.debug("file = {}".format(f['name']))
            flag = False
            for owner in f['owners']:
                if owner['emailAddress'] == owner_email:
                    flag = True
                    break
            if flag:
                break
            # res = service.permissions().list(fileId=f['id'], fields='*').execute()
            # batch.add(service.permissions().update(fileId=f['id'],
            #                                        permissionId=perm_id,
            #                                        body=user_permission,
            #                                        transferOwnership=True))
            import pdb
            pdb.set_trace()
            service.permissions().update(fileId=f['id'],
                                         permissionId=owner_perm_id,
                                         body=user_permission,
                                         transferOwnership=True).execute()
        batch.execute()

        if page_token is None:  # if Finish process all file
            break


if __name__ == "__main__":
    changeFileOwnerOnGDrive()
