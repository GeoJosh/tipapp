# TipApp

## Overview

TipApp is an application developed in conjunction with [Northshore Parent](http://northshoreparent.com) to allow for direct tipping between community members and participating individuals. The platform was initially developed to allow community members to provide additional support to service professionals impacted by the COVID-19 pandemic.

TipApp allows individuals to participate by quickly signing up themselves via the provided interface. Community members are then presented with a random individual from the particpant pool and given a link to provide support directly through the Venmo platform.

Feel free to use TipApp for your own community's needs. If you would like to help with TipApp's development participation is always welcome.

## Quickstart

A reference quickstart stack is included utilizing [Docker](https://www.docker.com/) and the [Docker Compose](https://docs.docker.com/compose/) platform. Once you have Docker and Docker Compose installed clone the repository and run the following from the project root:

```
docker-compose up --build
```

When the Docker Compose stack has finished starting you can then access TipApp using a web browser at:

http://localhost:8000

## Modules

### Web Application

The TipApp Web Application is developed as an [Angular](https://angular.io/) 8 application utilizing the [Bootstrap](https://getbootstrap.com/) 4 framework with [ngx-bootstrap](https://valor-software.com/ngx-bootstrap/#/) for Angular and Boostrap interoperability.

#### Components

The main components of the Web Application are as follows:

**`views/index`**

The main view component for the application

**`components/application-form`**

TipApp application form component to enable participation on TipApp

**`component/tip-content`**

Reusable tip information component to display applicant information to the user

**`service/application`**

Application service to communicate with the TipAll Service API to enable application creation and retrieval.

### Service API

The TipApp Service API is developed as a [Flask](https://palletsprojects.com/p/flask/) application providing REST endpoints to enable creation and retrieval of application data.

The Service API can be configured to store its information in a [PostgreSQL](https://www.postgresql.org/) database. However, if this configuration information is not provided a [SQLite](https://sqlite.org/index.html) database will be generated.

#### Endpoints

The endpoints provided by the Service API are as follows:

**`[HTTP GET] /application`**
Returns a random application from the current application pool

**`[HTTP POST] /application`**
Enabled creation of a new application for inclusion in the current application pool

#### Configuration

Several configuration options can be provided through environment variables to modify the Service API behavior:

**`CORS_ALLOWED_ORIGINS`**

Comma-separated list of external request origins that will be allowed to communicate with the Service API that would otherwise be blocked by [Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) rules.

***Example***
```
CORS_ALLOWED_ORIGINS=http://northshoreparent.com,http://localhost:4200
```


---


**`CORS_ALLOWED_METHODS`**

Comma-separated list of HTTP request methods allowed to communicate with the Service API that would otherwise be blocked by [Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) rules.

***Example***
```
CORS_ALLOWED_METHODS=GET,POST
```

---


**`DATABASE_HOST`**

Host name for the Postgresql database to utilize. If not specified a SQLite database will be generated for use with the application.

***Example***
```
DATABASE_HOST=postgres.tipnorthshore.net
```

---

**`DATABASE_NAME`**

Database name to utilize within Postgresql.

***Example***
```
DATABASE_NAME=tipapp_db
```

---


**`DATABASE_USER`**

Database user to connect to Postgresql.

***Example***
```
DATABASE_USER=tipapp_user
```

---


**`DATABASE_PASSWORD`**

Database password to connect to Postgresql.

***Example***
```
DATABASE_PASSWORD=password
```

## Development

### Web Application

#### Prerequisites
* Node JS 10 or greater

#### Instructions
A live instance of the Web Application can be launched with [Angular CLI](https://cli.angular.io/) either by first installing Anglur CLI separately or allowing the included version to be installed in the application `node_modules`.

```
cd tipapp/web
ng serve
```

The application can be loaded in your web browser at http://localhost:4200. As the application is modified the changes will be instantly reloaded in the browser.

To create a distributable version of the TipApp Web Application run a production built using Angular CLI:

```
cd tipapp/web
ng build --configuration=production
```

### Service API

#### Prerequisites
* Python 3.6 or greater
* virtualenv

#### Instructions

Create a python virtual environment near your service directory and install the requirements:

```
cd tipapp/service
python -m venv venv
pip install -r requirements.txt
```

If you would like to run unit tests also install the testing requirements:

```
pip install -r test/requirements.txt
```

To start the Service API invoke Flask. Note that if you are attempting to use the Service API with the live version of the Web Application you will need to allow the Web Application origin for CORS compliance: 

```
cd tipapp/service
CORS_ALLOWED_ORIGINS=http://localhost:4200 CORS_ALLOWED_METHODS=GET,POST flask run
```
