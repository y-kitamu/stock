"""__init__.py
Utility for Google API.
Author : Yusuke Kitamura
Create Date : 2021-12-04 17:03:27
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""
from pathlib import Path
from typing import List

from googleapiclient.discovery import Resource, build
from googleapiclient.http import MediaFileUpload, MediaIoBaseDownload
from oauth2client.service_account import ServiceAccountCredentials
from stock import PROJECT_ROOT, logger

SCOPES = ['https://www.googleapis.com/auth/drive']
CERT_FILE = Path("stock") / "cert" / "stockdata-332410-704571e36294.json"
STOCK_FOLDER_ID = "17KV7NK7DZA7MHLsuDG9VeV-lalizcE3I"


class GDRException(Exception):
    """Google Drive APIに関連するerror
    """

    def __init__(self, message):
        super().__init__(message)


def get_service(project_root: Path = PROJECT_ROOT, scopes: List[str] = SCOPES) -> Resource:
    """Google APIを初期化、`Resource` objectを取得する
    Args:
        project_root (Path) :
    """
    cert_file = project_root / CERT_FILE
    # setup google drive api
    if not cert_file.exists():
        raise GDRException("Cert file does not exist : {}".format(cert_file))
    creds = ServiceAccountCredentials.from_json_keyfile_name(cert_file, scopes=scopes)
    if creds.invalid:
        raise GDRException("Credential is invalid : {}".format(cert_file))
    service = build('drive', 'v3', credentials=creds)
    return service


def get_quota():
    """Google Driveの最大容量、使用量を取得する
    Return:
        limit (int) : 最大容量(Bytes)
        used (int) : 使用量(Bytes)
    """
    service = get_service()
    result = service.about().get(fields='storageQuota').execute()
    sq = result.get('storageQuota')
    limit = int(sq.get('limit'))
    used = int(sq.get('usage'))
    logger.info("Storage Quota : ")
    logger.info("  limit = {:.2f} GB".format(limit / 1024 / 1024 / 1024))
    logger.info("  usage = {:.2f} GB".format(used / 1024 / 1024 / 1024))
    logger.info("    usage in drive = {:.2f} KB".format(int(sq.get('usageInDrive')) / 1024))
    logger.info("    usage in trash = {:.2f} KB".format(int(sq.get('usageInDriveTrash')) / 1024))
    return limit, used


def upload(file_path: Path, folder_id: str = STOCK_FOLDER_ID) -> str:
    """Upload file to Google Drive
    Args:
        file_path (Path) : path to upload file
        folder_id (str) : ID of destination folder.
    Return:
        (str) : google drive file id of the uploaded file.
    """
    service = get_service()
    file_metadata = {
        "name": file_path.name,
        "parents": [folder_id],
    }
    media = MediaFileUpload(str(file_path), resumable=True)
    result = service.files().create(body=file_metadata, media_body=media, fields='id').execute()
    logger.info("Upload file of id = {} to Google Drive".format(result.get('id')))
    return result.get('id')


def download(fname: str, save_dir: Path) -> Path:
    """ファイル名が`fname`のfileをgoogle driveからdownload, `save_dir`に保存する
    Args:
        fname (str) :
        save_dir (Path) :
    """
    service = get_service()
    result = service.files().list(q="name = '{}'".format(fname),
                                  fields='files(id, modifiedTime)').execute()
    items = result.get('files', [])
    if len(items) == 0:
        raise GDRException("File not found in Google Drive : {}".format(fname))
    # 複数ファイル見つかった場合は最新のファイルをdownloadする
    fid = sorted(items, key=lambda item: item.get('modifiedTime'))[-1].get('id')
    request = service.files().get_media(fileId=fid)
    save_file = save_dir / fname
    with open(save_file, 'wb') as f:
        downloader = MediaIoBaseDownload(f, request)
        done = False
        while done is False:
            status, done = downloader.next_chunk()
            logger.debug("Download {} %".format(int(status.progress() * 100)))
    logger.info("Finish download from Google Drive. Save to {}".format(save_file))
    return save_file


def delete_file(fname: str) -> List[str]:
    """Google Drive上のファイル名が`fname`と一致するファイルを削除する
    Args:
        fname (str) : filename to be deleted.
    Return:
        (List[str]) : List of google drive file id which is deleted.
    """
    service = get_service()
    result = service.files().list(q="name = '{}'".format(fname), fields='files(id, owners)').execute()
    items = result.get('files', [])
    batch = service.new_batch_http_request()
    delete_ids = []
    for f in items:
        for owner in f['owners']:
            if owner['me']:
                fid = f['id']
                batch.add(service.files().delete(fileId=fid))
                delete_ids.append(fid)
                break
    batch.execute()
    logger.info("Delete file of filename = {} from Google Drive".format(fname))
    return delete_ids


def delete_all() -> List[str]:
    """Google Drive上のすべてのファイルを削除する
    Return:
        (List[str]) : List of google drive file ids which is deleted.
    """
    service = get_service()
    page_token = None
    deleted_ids = []
    while True:
        results = service.files().list(fields='nextPageToken, files(id)', pageToken=page_token).execute()
        page_token = results.get("nextPageToken", None)
        items = results.get("files", [])
        batch = service.new_batch_http_request()
        for item in items:
            fid = item.get('id')
            batch.add(service.files().delete(fileId=fid))
            deleted_ids.append(fid)
        batch.execute()

        logger.info("delete {} files".format(len(items)))

        if page_token is None:
            break
    logger.info("Finish delete files. Number of deleted files : {}".format(len(deleted_ids)))
    return deleted_ids
