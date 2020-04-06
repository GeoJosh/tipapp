import {
  HttpClient, HttpResponseBase,
  } from '@angular/common/http';

import {
  InjectionToken,
} from '@angular/core';

import {
  Observable,
} from 'rxjs';

import {
  CreateApplicationRequest,
  GetApplicationResponse,
} from './application.model';

import {
  ApplicationServiceMock,
} from './application.service.mock';

import {
  ApplicationServiceRest,
} from './application.service.rest';

import {
  environment,
} from '../../../environments/environment';

export const ApplicationService = new InjectionToken('ApplicationService');

export interface IApplicationService {
  createApplication(request: CreateApplicationRequest): Observable<HttpResponseBase>;
  getApplication(): Observable<GetApplicationResponse>;
}

class ApplicationServiceFactory {
  private static instance: IApplicationService;

  static getInstance(
    http: HttpClient,
  ): IApplicationService {
    if (!ApplicationServiceFactory.instance) {
      // tslint:disable-next-line:no-console
      console.info(`Current Payment endpoint URL: ${environment.endpoints.application}`);
      ApplicationServiceFactory.instance = environment.endpoints.application ?
      new ApplicationServiceRest(http) :
      new ApplicationServiceMock();
    }

    return ApplicationServiceFactory.instance;
  }
}

export let applicationServiceFactory = ApplicationServiceFactory.getInstance;
