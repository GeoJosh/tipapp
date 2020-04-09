import json
import os
import pytest
import sys

import app

@pytest.fixture
def client_fixtures():
  flask_app = app.create_app(dict(
      DATABASE_NAME=':memory:'
  ))
  client = flask_app.test_client()

  with flask_app.app_context():
    app.db.init_db()

  yield client, flask_app  

def test_create_application(client_fixtures):
  client, flask_app = client_fixtures

  assert client.post('/application', json=dict(
      first_name='Theborder',
      venmo_username='RunToTheBorder',
      email='the_border@example.com',
      employer='Taco Bell',
      employment_information='Head Chef',
  )).status_code == 201

def test_create_application_invalid_data_failure(client_fixtures):
  client, flask_app = client_fixtures

  assert client.post('/application', json=dict(
      first_name='Wendy',
      venmo_username='SquarePatty',
      email='nocir@example',
      employer='Wendy\'s',
      employment_information='Food scientist. No cutter of corners.',
  )).status_code == 400

def test_create_application_duplicate_failure(client_fixtures):
  client, flask_app = client_fixtures

  assert client.post('/application', json=dict(
      first_name='Border',
      venmo_username='RunToTheBorder',
      email='mr_border@example.com',
      employer='Taco Bell',
      employment_information='Head Chef',
  )).status_code == 201

  # duplicate Venmo username
  assert client.post('/application', json=dict(
      first_name='King',
      venmo_username='RunToTheBorder',
      email='TheKing@example.com',
      employer='Burger King',
      employment_information='King of Tender Crisp Bacon Cheddar Ranch',
  )).status_code == 400

  # duplicate email address
  assert client.post('/application', json=dict(
      first_name='King',
      venmo_username='TheKing',
      email='mr_border@example.com',
      employer='Burger King',
      employment_information='King of Tender Crisp Bacon Cheddar Ranch',
  )).status_code == 400

  assert client.post('/application', json=dict(
      first_name='King',
      venmo_username='TheKing',
      email='TheKing@example.com',
      employer='Burger King',
      employment_information='King of Tender Crisp Bacon Cheddar Ranch',
  )).status_code == 201

def test_get_application(client_fixtures):
  client, flask_app = client_fixtures

  assert client.get('/application').status_code == 404

  assert client.post('/application', json=dict(
      first_name='Cane',
      venmo_username='WoofWoofWoof',
      email='raisingcane@example.com',
      employer='Raising Canes',
      employment_information='Sturgeon Investor',
  )).status_code == 201

  result = client.get('/application')
  assert result.status_code == 200

  application = result.json

  assert application['first_name'] == 'Cane'
  assert application['venmo_username'] == 'WoofWoofWoof'
  assert application['employer'] == 'Raising Canes'
  assert application['employment_information'] == 'Sturgeon Investor'

  assert 'email' not in application

