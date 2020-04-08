import {
  Component,
  Inject,
} from '@angular/core';

import {
  BsModalService,
} from 'ngx-bootstrap/modal';

import {
  ApplicationFormComponent
} from '../../components/application-form/application-form.component';

import {
  Application,
} from '../../service/application/application.model';

import {
  ApplicationService,
  IApplicationService,
} from '../../service/application/application.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-index-view',
  templateUrl: './index.html',
  styleUrls: ['./index.css']
})
export class IndexViewComponent {

  public currentApplication: Application;

  constructor(
    private modalService: BsModalService,
    @Inject(ApplicationService) private applicationService: IApplicationService,
  ) { }

  public startTip() {
    this.applicationService.getApplication().subscribe(
      (response: Application) => {
        this.currentApplication = response;
      },
      (error: HttpErrorResponse) => {
        // TODO
      }
    );
  }

  public openApplication() {
    this.modalService.show(ApplicationFormComponent);
  }
}
