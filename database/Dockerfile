FROM postgres:10-alpine

RUN mkdir -p /docker-entrypoint-initdb.d

COPY docker-entrypoint-initdb.d/* /docker-entrypoint-initdb.d
