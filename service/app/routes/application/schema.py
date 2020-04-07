from typing import Dict

from marshmallow import Schema, fields, post_load

class ApplicationCreationRequest:
    def __init__(self, first_name: str, venmo_username: str, email: str, employer: str, employment_information: str) -> None:
        self.first_name = first_name
        self.venmo_username = venmo_username
        self.email = email
        self.employer = employer
        self.employment_information = employment_information

class ApplicationCreationRequestSchema(Schema):
    first_name = fields.String(required=True)
    venmo_username = fields.String(required=True)
    email = fields.Email(required=True)
    employer = fields.String(required=True)
    employment_information = fields.String(required=True)

    @post_load
    def make_obj(self, data: Dict, **kwargs) -> ApplicationCreationRequest:
        return ApplicationCreationRequest(**data)
