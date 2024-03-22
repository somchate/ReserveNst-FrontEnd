import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NavbarComponent } from './headerfooter/navbar/navbar.component';
import { MatSelectModule } from '@angular/material/select';
import { NgToastModule } from 'ng-angular-popup';
import { SpinnerComponent } from './spinners/spinner/spinner.component';
import { LoginComponent } from './login/login.component';
import { ItemsComponent } from './items/items.component';
// import { AuthInterceptor } from './services/auth.interceptor';
import { TokenInterceptorService } from './services/token-interceptor.service';
// import { CachingInterceptor } from './services/caching.interceptor';
import { PersonComponent } from './person/person.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { HistoryformComponent } from './historyform/historyform.component';
import { ListunitformComponent } from './listunitform/listunitform.component';
import { ThdatePipe } from './pipes/thdate.pipe';
import { RequestlistComponent } from './requests/requestlist/requestlist.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core'
import { RequestformComponent } from './requests/requestform/requestform.component';
import { AuthInterceptor } from './services/auth-interceptor.service';
import { FileComponent } from './file/file.component';
import { CheckInComponent } from './checkins/checkin/checkin.component';
import { ResultListComponent } from './results/result-list/result-list.component';
import { CheckInItemComponent } from './checkins/checkin-item/checkin-item.component';
import { ResultlistEditComponent } from './results/resultlist-edit/resultlist-edit.component';
import { ApprovedComponent } from './approves/approved/approved.component';
import { ApprovedItemComponent } from './approves/approved-item/approved-item.component';
import { CheckinApprovedComponent } from './checkins/checkin-approved/checkin-approved.component';
import { ListProvincesComponent } from './list-provinces/list-provinces.component';
import { ApprovedlistComponent } from './approves/approvedlist/approvedlist.component';
import { FooterComponent } from './headerfooter/footer/footer.component';
import { CachingInterceptor } from './interceptors/caching.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SpinnerComponent,
    LoginComponent,
    PersonComponent,
    HistoryformComponent,
    ListunitformComponent,
    ItemsComponent,
    ThdatePipe,
    RequestlistComponent,
    RequestformComponent,
    FileComponent,
    CheckInComponent,
    ResultListComponent,
    CheckInItemComponent,
    ResultlistEditComponent,
    ApprovedComponent,
    ApprovedItemComponent,
    CheckinApprovedComponent,
    ListProvincesComponent,
    ApprovedlistComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FlexLayoutModule,
    MatSelectModule,
    MatCardModule,
    NgToastModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatCheckboxModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      // useClass: TokenInterceptorService,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CachingInterceptor,
      multi: true,
    },
    // {
    //   provide: LOCALE_ID,
    //   useValue: "th-TH"
    // } //เพิ่ม LOCATE_ID เข้าไปครับ  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }