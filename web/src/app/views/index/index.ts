import {
  Component,
} from '@angular/core';

import {
  BsModalService,
} from 'ngx-bootstrap/modal';

import {
  ApplicationFormComponent
} from '../../components/application-form/application-form.component';

@Component({
  selector: 'app-index-view',
  templateUrl: './index.html',
  styleUrls: ['./index.css']
})
export class IndexViewComponent {
  constructor(
    private modalService: BsModalService
  ) { }

  public openApplication() {
    this.modalService.show(ApplicationFormComponent);
  }
}
