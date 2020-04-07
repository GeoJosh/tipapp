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
  Application,
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

  public createApplication(request: Application): Observable<HttpResponseBase> {
    return this.http.post<HttpResponseBase>(`${environment.endpoints.application}`, request);
  }

  public getApplication(): Observable<Application> {
    return this.http.get<Application>(`${environment.endpoints.application}`);
  }
}
