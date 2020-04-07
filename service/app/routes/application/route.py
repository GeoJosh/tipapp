import bcrypt
import hashlib
import logging
import os
import sys
import time

from typing import Dict, Tuple

from flask import Blueprint, Response, jsonify, request
from marshmallow import ValidationError
from peewee import DoesNotExist, IntegrityError, fn
from playhouse.shortcuts import model_to_dict

sys.path.append('.')
from .model import Application
from .schema import ApplicationCreationRequestSchema

bp: Blueprint = Blueprint('application', __name__, url_prefix='/application')

logging.basicConfig(format='%(asctime)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S', level=logging.INFO)
logger = logging.getLogger(__name__)

def projection(application: Dict, keys: Tuple[str] ) -> Dict:    
    return {k: v for k, v in application.items() if k in keys}

@bp.route('', methods=['GET'])
def getApplication() -> Response:
    application_data = ('first_name', 'venmo_username', 'employer', 'employment_information')
    try:
        application: Application = Application.select().order_by(fn.Random()).limit(1).get()
        return jsonify(projection(model_to_dict(application), application_data))
    except (DoesNotExist) as ex:
        logger.warning('getApplication error', exc_info=True)
        return 'Application does not exist.', 404

@bp.route('', methods=['POST'])
def createApplication() -> Response:
    schema = ApplicationCreationRequestSchema()

    try:
        creation_data: ApplicationCreationRequest = schema.load(request.get_json())

        application: Application = Application.create(
            first_name = creation_data.first_name,
            venmo_username = creation_data.venmo_username,
            email = hashlib.sha512(creation_data.email.encode('utf8')).hexdigest(),
            employer = creation_data.employer,
            employment_information = creation_data.employment_information,
            update_nonce = bcrypt.gensalt(),
            enabled = True,
        )

        return Response(status=201)
    except (IntegrityError) as ex:
        logger.warning('createApplication error', exc_info=True)
        return 'Application information already exists.', 400
    except (ValidationError) as ex:
        logger.warning('createApplication error', exc_info=True)
        return 'Invalid application information.', 400
