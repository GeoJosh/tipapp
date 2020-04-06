import {
  HttpClient,
  HttpResponseBase,
} from '@angular/common/http';

import {
  Injectable,
} from '@angular/core';

import {
  Observable,
} from 'rxjs';

import {
  CreateApplicationRequest,
} from './application.model';

import {
  IApplicationService,
} from './application.service';

import {
  environment,
} from '../../../environments/environment';

@Injectable()
export class ApplicationServiceRest implements IApplicationService {
  constructor(
    private http: HttpClient,
  ) { }

  public createApplication(request: CreateApplicationRequest): Observable<HttpResponseBase> {
    return this.http.post<HttpResponseBase>(`${environment.endpoints.application}`, request);
  }
}