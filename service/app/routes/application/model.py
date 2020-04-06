import bcrypt
import datetime
import sys

from peewee import (
    BlobField,
    CharField,
    DateTimeField,
    Model,
    Proxy,
)

from typing import List

from playhouse.hybrid import hybrid_method

sys.path.append('.')
from ...db import get_db

class BaseModel(Model):
    class Meta:
        database: Proxy = get_db()

class Application(BaseModel):
    creation_date = DateTimeField(default=datetime.datetime.now)

    first_name = CharField(null=False)
    last_name = CharField(null=False)
    venmo_username = CharField(null=False, unique=True)
    email = CharField(null=False, unique=True)
    employer = CharField(null=False)
    verification_information = CharField(null=False)
    update_nonce = BlobField(null=False)

def get_models() -> List[BaseModel]:
    return [Application]
