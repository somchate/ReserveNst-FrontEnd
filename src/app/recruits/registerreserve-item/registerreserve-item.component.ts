import { Component, Inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DateAdapter, MAT_DATE_LOCALE, MatNativeDateModule, ThemePalette } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ProvinceslistComponent } from 'src/app/list/provinceslist/provinceslist.component';
import { UnittrainlistComponent } from 'src/app/list/unittrainlist/unittrainlist.component';
import { ThDatePipe } from 'src/app/pipes/th-date.pipe';
import { SpinnerStandaloneComponent } from 'src/app/spinners/spinner-standalone/spinner-standalone.component';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { map } from 'rxjs';
import { FileComponent } from 'src/app/file/file.component';
import { SchoolResponse } from 'src/app/payload/response/schoolResponse';
import { RequestformComponent } from 'src/app/requests/requestform/requestform.component';
import { ResultListComponent } from 'src/app/results/result-list/result-list.component';
import { ResultlistEditComponent } from 'src/app/results/resultlist-edit/resultlist-edit.component';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
import { CheckInItemComponent } from 'src/app/checkins/checkin-item/checkin-item.component';
import { ListService } from 'src/app/services/list.service';
import { ValidateService } from 'src/app/services/validate.service';
import { AmphurlistComponent } from "../../list/amphurlist/amphurlist.component";
import { DistrictlistComponent } from "../../list/districtlist/districtlist.component";

@Component({
  selector: 'app-registerreserve-item',
  standalone: true,
  templateUrl: './registerreserve-item.component.html',
  styleUrls: ['./registerreserve-item.component.scss'],
  imports: [CommonModule, MatIconModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, FlexLayoutModule,
    MatTableModule, MatPaginatorModule, ThDatePipe, SpinnerStandaloneComponent, MatSortModule,
    MatCardModule, MatToolbarModule, MatIconModule, MatButtonModule, MatDialogModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatCheckboxModule, MatMenuModule, MatDatepickerModule, MatNativeDateModule, ProvinceslistComponent, UnittrainlistComponent, AmphurlistComponent, DistrictlistComponent]
})
export class RegisterreserveItemComponent {
  nstFormGroup!: FormGroup;
  actionBtn: string = 'บันทึก';
  titleNstInfo: string = 'ข้อมูล -> นักศึกษาวิชาทหาร';
  titleMiAddr: string = 'ภูมิลำเนาทหาร';
  titleMiRegister: string = 'การขึ้นทะเบียนกองประจำการและนำปลดฯ';

  isDelete!: boolean;
  isSaveBtn: boolean = true;
  isEditBtn: boolean = false;
  isDeleteBtn: boolean = false;
  isReadOnly: boolean = false;

  provincesList!: any[];
  nstInfo = [];
  selectedProvinceOutPut!: any;
  selectedAmphurOutPut!: any;
  selectedDocProvince!: any;
  selectedOwnerProvince!: any;
  selectedDistrictOutPut: any;
  getAmphurByProvince: any;
  getDistrictsByAmphur: any;
  provinceSelectDisable: string = "false";
  amphurSelectDisable: string = "true";
  districtSelectDisable: string = "true";

  toSd3SaveDate!: any;

  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
    private ngtoastservice: NgToastService,
    private list: ListService,
    private dataService: DataService,
    private router: Router,
    private validate: ValidateService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CheckInItemComponent>,
    private _adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private _locale: string

  ) {

    this._adapter.setLocale('th-TH');


    this.nstFormGroup = this.formBuilder.group({

      nstRd25: [{ value: '', readonly: true }, Validators.required],
      regPid: [{ value: '', readonly: true }, Validators.required],
      nstId: [{ value: '', readonly: true }, Validators.required],
      rd3No: [{ value: '', }, Validators.required], // เลขที่ รด.3
      regTitle: [{ value: '', }],
      regFname: [{ value: '', }, Validators.required],
      regMname: [{ value: '', }], // ชื่อกลาง
      regLname: [{ value: '', }, Validators.required],
      regSchoolId: [{ value: '', }, Validators.required],
      nstAtClass: [{ value: '', readonly: true }, Validators.required],
      atYear: [{ value: '', }, Validators.required],
      nstStatusId: [{ value: '', readonly: true }, Validators.required],
      nstApproveDate: [{ value: '' }, Validators.required],
      regSex: [{ value: '' }],
      regBirthday: [{ value: '', }, Validators.required],
      regHeight: [{ value: '' }, Validators.required],
      regAround: [{ value: '' }, Validators.required],
      fatherName: [{ value: '', }, Validators.required],// ชื่อ-สกุล บิดา
      motherName: [{ value: '', }, Validators.required],// ชื่อ-สกุล มารดา
      regFNat: [{ value: '', }, Validators.required], // สัญชาติบิดา
      fatherCareer: [{ value: '', }, Validators.required], // อาชีพบิดา
      motherCareer: [{ value: '', }], // อาชีพมารดา
      regArmyAddress: [{ value: '', }, Validators.required],
      regArmyDistrict: [{ value: '', }, Validators.required],
      regArmyAmphur: [{ value: '', }, Validators.required],
      regArmyProvince: [{ value: '', }, Validators.required],
      toSd3AtYear: [{ value: '', }],
      toSd3: [{ value: '', }, Validators.required], // ลำดับและชุดที่
      toSd3MiSignNo: [{ value: '', }], // เลขเครื่องหมาย
      toSd3Edu: [{ value: '', }, Validators.required], // รู้วิชา
      toSd3MiDept: [{ value: '', }, Validators.required],
      toSd3MiCorps: [{ value: '', }, Validators.required],
      toSd3Scar: [{ value: '', }, Validators.required],
      toSd3SaveDate: [{ value: '', }, Validators.required],
      regArmyNote: [''],
      regNat: [{ value: '', }, Validators.required], // สัญชาติ
      regReleg: [{ value: '', }, Validators.required], // ศาสนา
      regSchoolName: [{ value: '', }],
      reserveMtb: [{ value: '', }, Validators.required], // กองหนุนสังกัด

    });

    this.nstFormGroup.controls['nstRd25'].setValue("");
    this.nstFormGroup.controls['regPid'].setValue("");
    this.nstFormGroup.controls['nstId'].setValue('');
    this.nstFormGroup.controls['rd3No'].setValue('');
    this.nstFormGroup.controls['regTitle'].setValue('');
    this.nstFormGroup.controls['regFname'].setValue('');
    this.nstFormGroup.controls['regMname'].setValue('');
    this.nstFormGroup.controls['regLname'].setValue('');
    this.nstFormGroup.controls['regNat'].setValue('');
    this.nstFormGroup.controls['regReleg'].setValue('');
    this.nstFormGroup.controls['nstAtClass'].setValue('');
    this.nstFormGroup.controls['atYear'].setValue('');
    this.nstFormGroup.controls['nstStatusId'].setValue('');
    this.nstFormGroup.controls['nstApproveDate'].setValue('');
    this.nstFormGroup.controls['regSex'].setValue('');
    this.nstFormGroup.controls['regBirthday'].setValue('');
    this.nstFormGroup.controls['regHeight'].setValue('');
    this.nstFormGroup.controls['regAround'].setValue('');
    this.nstFormGroup.controls['fatherName'].setValue('');
    this.nstFormGroup.controls['regFNat'].setValue('');
    this.nstFormGroup.controls['motherName'].setValue('');
    this.nstFormGroup.controls['fatherCareer'].setValue('');
    this.nstFormGroup.controls['motherCareer'].setValue('');
    this.nstFormGroup.controls['regSchoolId'].setValue('');
    this.nstFormGroup.controls['regSchoolName'].setValue('');
    this.nstFormGroup.controls['regArmyAddress'].setValue('');
    this.nstFormGroup.controls['regArmyDistrict'].setValue('');
    this.nstFormGroup.controls['regArmyAmphur'].setValue('');
    this.nstFormGroup.controls['regArmyProvince'].setValue('');
    this.nstFormGroup.controls['toSd3AtYear'].setValue('');
    this.nstFormGroup.controls['toSd3'].setValue('');
    this.nstFormGroup.controls['toSd3MiSignNo'].setValue('');
    this.nstFormGroup.controls['toSd3SaveDate'].setValue('');
    this.nstFormGroup.controls['toSd3Edu'].setValue('');
    this.nstFormGroup.controls['toSd3MiDept'].setValue('');
    this.nstFormGroup.controls['toSd3MiCorps'].setValue('');
    this.nstFormGroup.controls['toSd3Scar'].setValue('');
    this.nstFormGroup.controls['regArmyNote'].setValue('');
    this.nstFormGroup.controls['reserveMtb'].setValue('');

  }

  ngOnInit(): void {

    if (this.data.regPid) {
      this.findNstByRegPid(this.data.regPid);

    }

    this.isSaveBtn = !this.data.isSaveDisable;
    this.isEditBtn = this.data.isEditBtn;
    this.isDeleteBtn = this.data.isDeleteBtn;

  }

  findNstByRegPid(regPid: string) {
    this.api.getNstByRegPid(this.data.regPid).subscribe(res => {
      this.nstFormGroup.controls['nstRd25'].setValue(res.nst.nst_RD25);
      this.nstFormGroup.controls['regPid'].setValue(res.nst.reg_PID);
      this.nstFormGroup.controls['nstId'].setValue(res.nst.nst_ID);
      this.nstFormGroup.controls['rd3No'].setValue(res.nst.rd3_NO);
      this.nstFormGroup.controls['regTitle'].setValue(res.nst.reg_TITLE);
      this.nstFormGroup.controls['regFname'].setValue(res.nst.reg_FNAME);
      this.nstFormGroup.controls['regMname'].setValue(res.nst.reg_MNAME);
      this.nstFormGroup.controls['regLname'].setValue(res.nst.reg_LNAME);
      this.nstFormGroup.controls['regNat'].setValue(res.nst.reg_NAT);
      this.nstFormGroup.controls['regReleg'].setValue(res.nst.reg_RELEG);
      this.nstFormGroup.controls['regSchoolId'].setValue(res.nst.reg_SCHOOL_ID);
      this.nstFormGroup.controls['nstAtClass'].setValue(res.nst.nst_AT_CLASS);
      this.nstFormGroup.controls['atYear'].setValue(res.nst.at_YEAR);
      this.nstFormGroup.controls['nstStatusId'].setValue(res.nst.nstStatusCode[0].nst_STATUS_DESC);
      this.nstFormGroup.controls['nstApproveDate'].setValue(res.nst.nst_APPROVE_DATE == null ? new Date() : res.nst.nst_APPROVE_DATE);
      this.nstFormGroup.controls['regSex'].setValue(res.nst.reg_SEX == 'M' ? 'ชาย' : 'หญิง');
      this.nstFormGroup.controls['regBirthday'].setValue(res.nst.reg_BIRTHDAY);
      this.nstFormGroup.controls['regHeight'].setValue(res.nst.reg_HEIGHT);
      this.nstFormGroup.controls['regAround'].setValue(res.nst.reg_AROUND);
      this.nstFormGroup.controls['fatherName'].setValue(res.nst.father_NAME);
      this.nstFormGroup.controls['regFNat'].setValue(res.nst.reg_FNAT);
      this.nstFormGroup.controls['motherName'].setValue(res.nst.mother_NAME);
      this.nstFormGroup.controls['fatherCareer'].setValue(res.nst.father_CAREER);
      this.nstFormGroup.controls['motherCareer'].setValue(res.nst.mother_CAREER);
      this.nstFormGroup.controls['regArmyAddress'].setValue(res.nst.reg_ARMY_ADDR == null ? res.nst.reg_ADDR : res.nst.reg_ARMY_ADDR);
      this.nstFormGroup.controls['regArmyDistrict'].setValue(res.nst.reg_ARMY_DISTRIC_ID == null ? res.nst.reg_DISTRIC_ID : res.nst.reg_ARMY_DISTRIC_ID);
      this.nstFormGroup.controls['regArmyAmphur'].setValue(res.nst.reg_ARMY_AMPHUR_ID == null ? res.nst.reg_AMPHUR_ID : res.nst.reg_ARMY_AMPHUR_ID);
      this.nstFormGroup.controls['regArmyProvince'].setValue(res.nst.reg_ARMY_PROVINCE_CID == null ? res.nst.reg_PROVINCE_CID : res.nst.reg_ARMY_PROVINCE_CID);
      this.nstFormGroup.controls['toSd3AtYear'].setValue((new Date()).getFullYear() + 543);
      this.nstFormGroup.controls['toSd3'].setValue(res.nst.to_SD3);
      this.nstFormGroup.controls['toSd3MiSignNo'].setValue(res.nst.to_SD3_SIGN_NO);
      this.nstFormGroup.controls['toSd3Edu'].setValue(res.nst.to_SD3_EDU);
      this.nstFormGroup.controls['toSd3MiDept'].setValue(res.nst.to_SD3_MI_DEPT);
      this.nstFormGroup.controls['toSd3MiCorps'].setValue(res.nst.to_SD3_MI_CORPS);
      this.nstFormGroup.controls['toSd3Scar'].setValue(res.nst.to_SD3_SCAR);
      this.nstFormGroup.controls['toSd3SaveDate'].setValue(res.nst.to_SD3_SAVE_DATE == null ? new Date() : new Date(res.nst.to_SD3_SAVE_DATE));
      this.nstFormGroup.controls['regArmyNote'].setValue(res.nst.reg_ARMY_NOTE);
      this.nstFormGroup.controls['reserveMtb'].setValue(res.nst.reserve_MTB_ID);

      if (res.nst.reg_SCHOOL_ID) {
        this.api.getSchoolByIdWithResponse(res.nst.reg_SCHOOL_ID).subscribe(item => {
          this.nstFormGroup.controls['regSchoolName'].setValue(item.school.school_SHORTNAME);
        })
      }
    })
  }

  saveNstMiINfo(nstMiInfo: any) {

    if (this.nstFormGroup.valid) {
      this.api.updateNstMiInfoWithPatch(nstMiInfo).subscribe({
        next: (nstInfo) => {
          this.ngtoastservice.success({
            detail: 'Success',
            summary: 'Items add successfully',
            duration: 1500,
          });

          setTimeout(() => {
            this.isSaveBtn = false;
            this.nstFormGroup.reset();
            this.dialogRef.close('save');
          },
            1000);
        },
        error: () => {
          this.ngtoastservice.error({
            detail: 'Error',
            summary: 'Error while adding the items',
            duration: 1500,
          });
          console.log(this.nstFormGroup.value);
        },
      });
    }
  }

  updateCheckIn() {
    this.api.putCheckIn(this.nstFormGroup.value).subscribe({
      next: (nstInfo) => {
        this.ngtoastservice.success({
          detail: 'Success',
          summary: 'Update successfully',
          duration: 1500,
        });
        this.nstFormGroup.reset();
        this.dialogRef.close('update');
      },
      error: () => {
        this.ngtoastservice.error({
          detail: 'Error',
          summary: 'Error while updating the check in',
          duration: 1500,
        });
      },
    });
  }

  deleteCheckIn() {
    this.api.deleteCheckIn(this.nstFormGroup.value).subscribe({
      next: (nstInfo) => {
        this.ngtoastservice.success({
          detail: 'Success',
          summary: 'Delete successfully',
          duration: 1500,
        });
        this.nstFormGroup.reset();
        this.dialogRef.close('delete');
      },
      error: () => {
        this.ngtoastservice.error({
          detail: 'Error',
          summary: 'Error while deleting',
          duration: 1500,
        });
        console.log(this.nstFormGroup.value);
      },
    });
  }

  onClear() {
    this.nstFormGroup.reset();
    this.initializeForm();
  }

  onClose() {
    this.dialog.closeAll();
  }

  initializeForm() {
    this.nstFormGroup.setValue({
      RequestID: '',
      BookRequest: '',
      RequestDate: '',
      RequestUnit: '',
      VerifyUser: '',
      Comment: '',
    });
  }

  getProvinces() {
    this.api.getAllProvinces().pipe(
      map((nstInfo: any) => this.provincesList = nstInfo)
    ).subscribe();
  }

  getProvinceById(id: string) {
    this.api.getProvinceById(id).pipe(
      map((nstInfo: any) => this.provincesList = nstInfo.nstInfoponse)
    ).subscribe();
  }

  getSelectProvinceChangeValue(selectChangeValue: any) {
    // this.selectValue= selectChangeValue;
    this.data.provinceId = null;
    this.selectedAmphurOutPut = '';
    this.nstFormGroup.controls['regArmyProvince'].setValue(selectChangeValue);
    this.selectedProvinceOutPut = selectChangeValue;
    this.getAmphurByProvince = selectChangeValue;
    this.provinceSelectDisable = "false";
    this.amphurSelectDisable = "false";
  }

  getSelectAmphurChangeValue(selectChangeValue: any) {
    this.selectedDistrictOutPut = '';
    this.nstFormGroup.controls['regArmyAmphur'].setValue(selectChangeValue);
    this.selectedAmphurOutPut = selectChangeValue;
    this.getDistrictsByAmphur = selectChangeValue;
    this.districtSelectDisable = "false";
  }

  getSelectDistrictChangeValue(selectChangeValue: any) {
    this.nstFormGroup.controls['regArmyDistrict'].setValue(selectChangeValue);
    this.selectedDistrictOutPut = selectChangeValue;
  }

}
