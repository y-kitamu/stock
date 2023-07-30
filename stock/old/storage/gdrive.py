"""gdrive.py

Author : Yusuke Kitamura
Create Date : 2022-08-28 12:13:18
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""
import io
import sys
from pathlib import Path
from typing import List, Optional

from google.auth.exceptions import MutualTLSChannelError
from google.oauth2 import service_account
from googleapiclient.discovery import Resource, build
from googleapiclient.errors import HttpError
from googleapiclient.http import MediaIoBaseDownload

try:
    from .. import CREDENTIAL_FILE_PATH, logger
except:
    from stock import CREDENTIAL_FILE_PATH, logger


# If modifying these scopes, delete the file token.json.
SCOPES = [
    # "https://www.googleapis.com/auth/drive.resource",
    "https://www.googleapis.com/auth/drive.metadata.readonly",
]
# Collected data is stored in Google Drive of `MyDrive/${ROOT_FOLDER_NAME}/`.
ROOT_FOLDER_NAME = "stock"


def get_root_folder_id(service: Resource) -> Optional[str]:
    """Get root folder id"""
    folder = (
        service.files()
        .list(
            q=f"mimeType = 'application/vnd.google-apps.folder' and name = '{ROOT_FOLDER_NAME}' and sharedWithMe",
            fileds="files(id)",
            pageSize=10,
        )
        .execute()
    )
    items = folder.get("files", [])
    if len(items) > 1:
        logger.error(f"Multiple root folders found: {items}")
        return None

    if len(items) == 0:
        logger.info(f"Root folder not found in Google Drive. name = {ROOT_FOLDER_NAME}")
        return None

    return items[0]["id"]


def get_path(service: Resource, file_id: str) -> Optional[Path]:
    """ """
    file = service.files().get(fileId=file_id, fileds="id, name, parents").execute()
    filepath = Path(file.get("name"))
    parent = file.get("parents")
    while parent:
        file = service.files().get(fileId=file_id, fileds="id, name, parents").execute()
        file_id = file.get("id")
        filepath = Path(file.get("name")) / filepath
        parent = file.get("parents")
    return filepath


def delete_all(service: Resource):
    """ """
    results = service.files().list(pageSize=10, fields="nextPageToken, files(id, name)").execute()

    while True:
        items = results.get("files", [])
        for item in items:
            service.files().delete(fileId=item["id"]).execute()
            print(f"{item['name']} ({item['id']}) deleted")

        nextPageToken = results.get("nextPageToken", "")
        if nextPageToken == "":
            break

        results = (
            service.files()
            .list(pageSize=10, fields="nextPageToken", pageToken=nextPageToken)
            .execute()
        )


def download_file(service: Resource, file_id: str, filepath: Path):
    try:
        file_id = file_id

        request = service.files().get_media(fileId=file_id)
        file = io.BytesIO()
        downloader = MediaIoBaseDownload(file, request)
        done = False
        while done is False:
            status, done = downloader.next_chunk()
            print(f"Download {int(status.progress() * 100)}.")

    except HttpError as error:
        print(f"An error occurred: {error}")
        file = None


def download_all(service: Resource):
    """Download all files from Google Drive to `${PROJECT_ROOT}/data`"""

    results = service.files().list(pageSize=10, fields="nextPageToken, files(id, name)").execute()
    items = results.get("files", [])

    while True:
        items = results.get("files", [])
        for item in items:
            print(f"{item['name']} ({item['id']})")

        nextPageToken = results.get("nextPageToken", "")
        if nextPageToken == "":
            break

        results = (
            service.files()
            .list(pageSize=10, fields="nextPageToken", pageToken=nextPageToken)
            .execute()
        )


def upload_all(service: Resource):
    """Upload all files from `${PROJECT_ROOT}/data` to Google Drive"""


def get_service(
    cred_file_path: Path = CREDENTIAL_FILE_PATH, scopes: List[str] = SCOPES
) -> Optional[Resource]:
    if not cred_file_path.exists():
        logger.error(f"Credential file not found: {cred_file_path}")
        raise FileNotFoundError(f"{cred_file_path} not found")

    creds = service_account.Credentials.from_service_account_file(
        str(cred_file_path), scopes=scopes
    )

    try:
        service = build("drive", "v3", credentials=creds)
        return service
    except MutualTLSChannelError as error:
        logger.error(f"An error occurred: {error}")
    return None


if __name__ == "__main__":
    service = get_service()
    if service is None:
        logger.error("Failed to get service")
        sys.exit(1)

    download_all(service)
