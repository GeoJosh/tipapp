import {
  HttpErrorResponse,
  HttpResponseBase,
} from '@angular/common/http';

import {
  Component,
  OnInit,
  Inject,
} from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import {
  ApplicationService,
  IApplicationService,
} from '../../service/application/application.service';

interface IUserForm {
  firstName: string;
  lastName: string;
  venmoUsername: string;
  email: string;
  employer: string;
  employmentInformation: string;
}

interface ErrorMessage {
  type: string;
  message: string;
}

enum FormStatus {
  INCOMPLETE,
  COMPLETE,
  ERROR,
}

@Component({
    selector: 'app-application-form',
    templateUrl: './application-form.component.html',
    styleUrls: ['./application-form.component.css']
})
export class ApplicationFormComponent implements OnInit {
  public applicationFormGroup: FormGroup;

  public formErrorMessage: ErrorMessage;
  public FormStatus = FormStatus;
  public formStatus: FormStatus = FormStatus.INCOMPLETE;

  constructor(
    private fb: FormBuilder,
    @Inject(ApplicationService) private applicationService: IApplicationService,
  ) { }

  public ngOnInit(): void {
    this.applicationFormGroup = this.fb.group({
      firstName: new FormControl('', [Validators.required]),
      venmoUsername: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      employer: new FormControl('', [Validators.required]),
      employmentInformation: new FormControl('', [Validators.required]),
    });
  }

  public submitApplication() {
    this.formErrorMessage = undefined;
    this.applicationFormGroup.disable();

    const data: IUserForm = this.applicationFormGroup.value;
    this.applicationService.createApplication({
      first_name: data.firstName,
      venmo_username: data.venmoUsername,
      email: data.email,
      employer: data.employer,
      employment_information: data.employmentInformation,
    }).subscribe(
    (response: HttpResponseBase) => {
      this.formStatus = FormStatus.COMPLETE;
      this.applicationFormGroup.reset();
    },
    (response: HttpErrorResponse) => {

      this.formErrorMessage = {
        type: (response.error && typeof(response.error) === 'string') ?
                'warning'
                  :
                'danger',
        message: (response.error && typeof(response.error) === 'string') ?
                response.error
                  :
                'Unexpected error during application submission.'
      };

      this.formStatus = FormStatus.ERROR;
      this.applicationFormGroup.enable();
    }
    );
  }
}
