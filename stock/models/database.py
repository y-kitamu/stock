"""database.py

Author : Yusuke Kitamura
Create Date : 2022-08-25 21:26:39
Copyright (c) 2019- Yusuke Kitamura <ymyk6602@gmail.com>
"""
from contextlib import contextmanager

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, scoped_session, sessionmaker


class _Database:
    def __init__(self, db_url: str = "sqlite:///:memory:"):
        self.update_db_url(db_url)

    def update_db_url(self, db_url: str):
        self.url = db_url
        self.engine = create_engine(db_url, future=True, echo=__debug__)

        session_factory = sessionmaker(autocommit=False, autoflush=False, bind=self.engine)
        self.SessionLocal = scoped_session(session_factory)

    def create_all(self):
        # initialize database
        Base.metadata.create_all(bind=self.engine)

    def get_db(self):
        db = self.SessionLocal()
        try:
            yield db
        finally:
            db.close()

    @contextmanager
    def context(self):
        db = self.SessionLocal()
        try:
            yield db
        finally:
            db.close()


DATABASE = _Database()
Base = declarative_base()
