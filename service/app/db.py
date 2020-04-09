import click
import os
import sys
import time

from flask import Flask, current_app
from flask.cli import with_appcontext

from peewee import Database, OperationalError, PostgresqlDatabase, Proxy, SqliteDatabase
# from playhouse.db_url import connect

from .config import db_proxy

def init_app(app: Flask) -> None:
    db_proxy.initialize(connect_database(app))
    app.cli.add_command(init_db_command)

@click.command('init-db')
@with_appcontext
def init_db_command() -> None:
    init_db()
    click.echo('Initialized the database.')

def init_db(retries: int = 3, delay: int = 5) -> bool:
    from .routes.application import model as application_models

    while True:
        retries -= 1
        try:
            db_proxy.create_tables(application_models.get_models(), safe=True)
        except OperationalError:
            if retries == 0:
                raise
            time.sleep(delay)
        else:
            return True

def connect_database(app: Flask) -> Database:
    if app.config['DATABASE_HOST'] is None:
        if app.config['DATABASE_NAME'] == ':memory:':
            return SqliteDatabase(':memory:')
        else:
            return SqliteDatabase("{}.sqlite".format(app.config['DATABASE_NAME']))
    else:
        return PostgresqlDatabase(
            app.config['DATABASE_NAME'],
            user=app.config['DATABASE_USER'] or 'tipapp',
            password=app.config['DATABASE_PASSWORD'] or 'tipapp',
            host=app.config['DATABASE_HOST'] or 'localhost',
            port=app.config['DATABASE_PORT'] or 5432,
        )
def get_db() -> Proxy:
    return db_proxy