#!/bin/bash

flask init-db

# /usr/local/bin/gunicorn --workers 2 --bind :8000 "app:create_app()"
supervisord -n -c /opt/supervisor/supervisord.conf 