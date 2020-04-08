#!/bin/bash

flask init-db
supervisord -n -c /opt/supervisor/supervisord.conf 