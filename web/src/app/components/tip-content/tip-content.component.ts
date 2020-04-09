import {
    Component,
    Input,
} from '@angular/core';

import {
    Application,
} from '../../service/application/application.model';

@Component({
    selector: 'app-tip-content',
    templateUrl: './tip-content.component.html',
    styleUrls: ['./tip-content.component.css']
})
export class TipContentComponent {
  @Input()
  public application: Application;
}
