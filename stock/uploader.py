"""uploader.py
Google Driveへfileをuploadする
Author : Yusuke Kitamura
Create Date : 2021-11-19 21:38:02
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""
import shutil
import traceback
from pathlib import Path

import googleapiclient.discovery
from google.oauth2 import service_account
from googleapiclient.http import MediaFileUpload

from stock import logger


class Uploader():
    """
    Args:
        input_dir (Path):
        cert_file (Path) : google service account certificat file.
    """
    SCOPES = ['https://www.googleapis.com/auth/drive']
    SERVICE_ACCOUNT_FILE = '../cert/stockdata-332410-704571e36294.json'

    def __init__(self, input_dir: Path, cert_file: Path):
        self.input_dir = input_dir
        self.upload_file = self.collectUploadFiles()
        credentials = service_account.Credentials.from_service_account_file(str(cert_file),
                                                                            scopes=self.SCOPES)
        self.service = googleapiclient.discovery.build('drive', 'v3', credentials=credentials)

    def collectUploadFiles(self) -> Path:
        shutil.make_archive(str(self.input_dir), format="zip", root_dir=str(self.input_dir))
        return self.input_dir.parent / f"{self.input_dir.name}.zip"

    def upload(self) -> bool:
        file_metadata = {"name": self.upload_file.name}
        media = MediaFileUpload(str(self.upload_file), mimetype="application/zip")
        try:
            self.service.files().create(body=file_metadata,
                                        media_body=media,
                                        uploadType="resumable",
                                        fields='id, name').execute()
        except Exception:
            logger.error("Failed to upload file : {}\n{}".format(str(self.upload_file),
                                                                 traceback.print_exc()))
            return False
        logger.info("Upload success : {}".format(str(self.upload_file)))
        return True
