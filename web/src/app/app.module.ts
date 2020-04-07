import {
  HttpClientModule,
  HttpClient,
} from '@angular/common/http';

import {
  NgModule,
} from '@angular/core';

import {
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';

import {
  BrowserModule,
} from '@angular/platform-browser';

import {
  BrowserAnimationsModule,
} from '@angular/platform-browser/animations';

import {
  AlertModule,
} from 'ngx-bootstrap/alert';

import {
  ModalModule,
} from 'ngx-bootstrap/modal';

import {
  TooltipModule,
} from 'ngx-bootstrap/tooltip';

import {
  AppComponent,
} from './app.component';

import {
  AppRoutingModule,
} from './app-routing.module';

import {
  ApplicationFormComponent
} from './components/application-form/application-form.component';

import {
  ApplicationService,
  applicationServiceFactory,
} from './service/application/application.service';

import {
  IndexViewComponent,
} from './views/index';

@NgModule({
  declarations: [
    AppComponent,
    ApplicationFormComponent,
    IndexViewComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    AppRoutingModule,

    AlertModule.forRoot(),
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
  ],
  providers: [
    {
      provide: ApplicationService,
      useFactory: applicationServiceFactory,
      deps: [HttpClient]
    },
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    ApplicationFormComponent,
  ]
})
export class AppModule { }
