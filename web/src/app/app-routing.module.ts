import {
  NgModule,
} from '@angular/core';

import {
  Routes,
  RouterModule,
} from '@angular/router';

import { IndexViewComponent } from './views/index';

const routes: Routes = [
  {
    path: '',
    component: IndexViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
