import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ItemsComponent } from './items/items.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { HistoryformComponent } from './historyform/historyform.component';
import { RequestlistComponent } from './requests/requestlist/requestlist.component';
import { ResultListComponent } from './results/result-list/result-list.component';
import { CheckInComponent } from './checkins/checkin/checkin.component';
import { ApprovedComponent } from './approves/approved/approved.component';
import { ApprovedlistComponent } from './approves/approvedlist/approvedlist.component';
import { VerifybynameComponent } from './verifies/verifybyname/verifybyname.component';
import { VerifybycidComponent } from './verifies/verifybycid/verifybycid.component';
import { SchoollistComponent } from './unittrain/schoollist/schoollist.component';
import { NstformiupdatelistComponent } from './unittrain/nstformiupdate-list/nstformiupdate-list.component';
import { SetListComponent } from './list/set-list/set-list.component';
import { DocumentforunittrainListComponent } from './unittrain/documentforunittrain-list/documentforunittrain-list.component';
import { RegisterdoclistComponent } from './recruits/registerdoc-list/registerdoc-list.component';
import { DocumentforunitListComponent } from './recruits/documentforunit-list/documentforunit-list.component';
import { NstforunittrainlistComponent } from './unittrain/nstforunittrain-list/nstforunittrain-list.component';
import { NstforunitListComponent } from './recruits/nstforunit-list/nstforunit-list.component';

const routes: Routes = [

  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'items',
    component: ItemsComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN'] }
  },
  {
    path: 'requestlist',
    component: RequestlistComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN', 'USER'] }
  },
  {
    path: 'schoollist',
    component: SchoollistComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN', 'USER'] }
  },
  {
    path: 'nstformiupdatelist',
    component: NstformiupdatelistComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN', 'USER'] }
  },
  {
    path: 'setlist',
    component: SetListComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN', 'USER'] }
  },
  {
    path: 'documentforunittrainlist',
    component: DocumentforunittrainListComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN', 'USER'] }
  },
  {
    path: 'registerdoclist',
    component: RegisterdoclistComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN', 'USER'] }
  },
  {
    path: 'documentforunitlist',
    component: DocumentforunitListComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN', 'USER'] }
  },
  {
    path: 'nstforunittrainlist',
    component: NstforunittrainlistComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN', 'USER'] }
  },
  {
    path: 'nstforunitlist',
    component: NstforunitListComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN', 'USER'] }
  },
  {
    path: 'approvedlist',
    component: ApprovedlistComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN', 'USER'] }
  },
  {
    path: 'checkin',
    component: CheckInComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN', 'USER'] }
  },
  {
    path: 'approved',
    component: ApprovedComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN'] }
  },
  {
    path: 'resultlist',
    component: ResultListComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN', 'USER'] }
  },
  {
    path: 'historyform',
    component: HistoryformComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN'] }
  },
  {
    path: 'verifybyname',
    component: VerifybynameComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN'] }
  },
  {
    path: 'verifybycid',
    component: VerifybycidComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN'] }
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
