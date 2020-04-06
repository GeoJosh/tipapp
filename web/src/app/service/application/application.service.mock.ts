import {
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

@Injectable()
export class ApplicationServiceMock implements IApplicationService {
  public createApplication(request: CreateApplicationRequest): Observable<HttpResponseBase> {
    throw new Error('Method not implemented.');
  }
}
