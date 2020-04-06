import os
import sys

from typing import Dict

from flask import Flask
from flask_cors import CORS

sys.path.append('.')

def create_app(test_config: Dict = None) -> Flask:

    app = Flask(__name__, instance_relative_config=True)
    CORS(app)

    app.config.from_mapping(
        DATABASE_NAME = os.environ.get('DATABASE_NAME') or 'app',
        DATABASE_URL = os.environ.get('DATABASE_URL'),
        DATABASE_USER = os.environ.get('DATABASE_USER'),
        DATABASE_PASSWORD = os.environ.get('DATABASE_PASSWORD'),
        DATABASE_HOST = os.environ.get('DATABASE_HOST'),
        DATABASE_PORT = os.environ.get('DATABASE_PORT'),
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass
    
    from . import db
    db.init_app(app)

    from .routes.application import route as application
    app.register_blueprint(application.bp)

    return app