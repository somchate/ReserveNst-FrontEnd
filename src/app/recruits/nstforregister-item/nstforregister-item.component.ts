import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AmphurlistComponent } from 'src/app/list/amphurlist/amphurlist.component';
import { corpslistComponent } from 'src/app/list/corpslist/corpslist.component';
import { departmentlistComponent } from 'src/app/list/departmentlist/departmentlist.component';
import { DistrictlistComponent } from 'src/app/list/districtlist/districtlist.component';
import { knowledgelistComponent } from 'src/app/list/knowledgelist/knowledgelist.component';
import { militarycirclelistComponent } from 'src/app/list/militarycirclelist/militarycirclelist.component';
import { nationalitylistComponent } from 'src/app/list/nationalitylist/nationalitylist.component';
import { ProvinceslistComponent } from 'src/app/list/provinceslist/provinceslist.component';
import { religionlistComponent } from 'src/app/list/religionlist/religionlist.component';
import { ThDatePipe } from 'src/app/pipes/th-date.pipe';
import { SpinnerStandaloneComponent } from 'src/app/spinners/spinner-standalone/spinner-standalone.component';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { map } from 'rxjs';
import { CheckInItemComponent } from 'src/app/checkins/checkin-item/checkin-item.component';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
import { ListService } from 'src/app/services/list.service';
import { ValidateService } from 'src/app/services/validate.service';
import { NumberOnlyDirective } from '../../directive/numberonly.directive';
import { waitForAsync } from '@angular/core/testing';
import { reservetypelistComponent } from "../../list/reservetypelist/reservetypelist.component";
import { sd3reasonlistComponent } from "../../list/sd3reasonlist/sd3reasonlist.component";

@Component({
  selector: 'app-nstforregister-item',
  standalone: true,
  templateUrl: './nstforregister-item.component.html',
  styleUrls: ['./nstforregister-item.component.scss'],
  imports: [CommonModule, MatIconModule, FormsModule, ReactiveFormsModule, MatFormFieldModule,
    MatTableModule, MatPaginatorModule, ThDatePipe, SpinnerStandaloneComponent, MatSortModule,
    MatCardModule, MatToolbarModule, MatIconModule, MatButtonModule, MatDialogModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatCheckboxModule, MatMenuModule, MatDatepickerModule,
    ProvinceslistComponent, AmphurlistComponent, DistrictlistComponent, nationalitylistComponent, religionlistComponent,
    militarycirclelistComponent, departmentlistComponent, corpslistComponent, knowledgelistComponent, NumberOnlyDirective, reservetypelistComponent, sd3reasonlistComponent]
})
export class NstforregisterItemComponent implements OnInit {
  nstFormGroup!: FormGroup;
  actionBtn: string = 'บันทึก';
  titleNstInfo: string = 'ข้อมูล -> นักศึกษาวิชาทหาร';
  titleMiAddr: string = 'ภูมิลำเนาทหาร';
  titleMiRegister: string = 'ข้อมูลการขึ้นทะเบียนกองประจำการ';
  titleMiReserve: string = 'ข้อมูลการนำปลดเป็นทหารกองหนุน';

  isDelete!: boolean;
  isSaveBtn: boolean = true;
  isEditBtn: boolean = false;
  isDeleteBtn: boolean = false;
  isReadOnly: boolean = false;

  nstInfo = [];
  selectedProvinceOutPut: any = null;
  selectedProvinceArmyOutPut: any = null;
  selectedProvinceNameOutPut!: any;
  selectedProvinceArmyNameOutPut!: any;
  selectedAmphurOutPut!: any;
  selectedAmphurArmyOutPut!: any;
  selectedAmphurNameOutPut!: any;
  selectedAmphurArmyNameOutPut!: any;
  selectedDistrictOutPut: any;
  selectedDistrictArmyOutPut: any;
  selectedDistrictNameOutPut: any;
  selectedDistrictArmyNameOutPut: any;
  selectedNationalityOutPut!: any;
  selectedFatherNatOutPut!: any;
  selectedReligionOutPut!: any;

  selectedMilitaryCircleOutPut: any;
  selectedDepartmentOutPut: any;
  selectedCorpsOutPut: any;
  selectedKnowledgeOutPut: any;
  selectedReserveTypeOutPut: any;
  selectedSd3ReasonOutPut: any;

  selectedDocProvince!: any;
  selectedOwnerProvince!: any;

  getAmphurByProvince: any;
  getAmphurArmyByProvinceArmy: any;
  getDistrictsByAmphur: any;
  getDistrictsArmyByAmphurArmy: any;

  provinceSelectDisable: string = "false";
  provinceArmySelectDisable: string = "true";
  amphurSelectDisable: string = "true";
  amphurArmySelectDisable: string = "true";
  districtSelectDisable: string = "true";
  districtArmySelectDisable: string = "true";
  nationalitySelectDisable: string = "false";
  religionSelectDisable: string = "false";
  militaryCircleSelectDisable: string = "false";
  departmentSelectDisable: string = "false";
  corpsSelectDisable: string = "false";
  reserveTypeSelectDisable: string = "false";
  sd3ReasonSelectDisable: string = "false";
  knowledgeSelectDisable: string = "false";
  miSignNo!: String
  isunAssignMiSignNo!: string;
  documentId!: string;

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
      documentId: [{ value: '', }, Validators.required],
      rd3No: [{ value: '', }, Validators.required], // เลขที่ รด.3
      sd3No: [{ value: '', }], // สด.3 เล่มที่
      sd3Date: [{ value: '', }], // วันที่ขึ้นทะเบียนกองประจำการ แบบ สด.3
      sd3Year: [{ value: '', }], // ปีที่ขึ้นทะเบียนกองประจำการ แบบ สด.3
      regTitle: [{ value: '', }], // คำนำหน้าชื่อ
      regFname: [{ value: '', }, Validators.required], // ชื่อ
      regMname: [{ value: '', }], // ชื่อกลาง
      regLname: [{ value: '', }, Validators.required], // นามสกุล
      regSchoolId: [{ value: '', }, Validators.required],
      regSchoolName: [{ value: '', }],
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
      wifeName: [{ value: '', }],// ชื่อ-สกุล ภรรยา
      grandFatherName: [{ value: '', }],// ชื่อ-สกุล ปู่
      grandFatherNatId: [{ value: '', }],// รหัสสัญชาติ ปู่
      grandFatherNatName: [{ value: '', }],// ชื่อสัญชาติ ปู่
      regFNat: [{ value: '', }, Validators.required], // สัญชาติบิดา
      regFNatName: [{ value: '', }, Validators.required], // ชื่อสัญชาติบิดา
      fatherCareer: [{ value: '', }, Validators.required], // อาชีพบิดา
      motherCareer: [{ value: '', }], // อาชีพมารดา
      regAddress: [{ value: '', }, Validators.required],
      regDistrict: [{ value: '', }, Validators.required],
      regDistrictName: [{ value: '', }, Validators.required],
      regAmphur: [{ value: '', }, Validators.required],
      regAmphurName: [{ value: '', }, Validators.required],
      regProvince: [{ value: '', }, Validators.required],
      regProvinceName: [{ value: '', }, Validators.required],
      sd9No: [{ value: '', }, Validators.required], // สด.9 เลขที่
      regArmyAddress: [{ value: '', }, Validators.required],
      regArmyDistrict: [{ value: '', }, Validators.required],
      regArmyDistrictName: [{ value: '', }, Validators.required],
      regArmyAmphur: [{ value: '', }, Validators.required],
      regArmyAmphurName: [{ value: '', }, Validators.required],
      regArmyProvince: [{ value: '', }, Validators.required],
      regArmyProvinceName: [{ value: '', }, Validators.required],
      regArmyProvinceShortName: [{ value: '', }, Validators.required],
      toSd3DocId: [{ value: '', }],
      toSd3ReasonId: [{ value: '', }, Validators.required], // รหัสเหตุผลขอนำตัวขึ้นทะเบียนกองประจำการ
      toSd3ReasonName: [{ value: '', }, Validators.required], // ชื่อเหตุผลขอนำตัวขึ้นทะเบียนกองประจำการ
      toSd3AtYear: [{ value: '', }],
      toSd3: [{ value: '', }, Validators.required], // ลำดับและชุดที่
      toSd3MiSignNo: [{ value: null, },], // เลขเครื่องหมาย
      toSd3Edu: [{ value: '', }, Validators.required], // รหัสชื่อรู้วิชา
      toSd3EduName: [{ value: '', }, Validators.required], // ชื่อรู้วิชา
      toSd3MiDept: [{ value: '', }, Validators.required],
      toSd3MiDeptName: [{ value: '', }, Validators.required],
      toSd3MiDeptAbbr: [{ value: '', }, Validators.required],
      toSd3MiCorps: [{ value: '', }, Validators.required],
      toSd3MiCorpsName: [{ value: '', }, Validators.required],
      toSd3Scar: [{ value: '', }, Validators.required],
      toSd3SaveDate: [{ value: '', }, Validators.required], // วันที่่ขอนำตัวขึ้นทะเบียนกองประจำการ
      natId: [{ value: '', }, Validators.required], // สัญชาติ
      natName: [{ value: '', }, Validators.required], // ชื่อสัญชาติ
      regReligion: [{ value: '', }, Validators.required], // ศาสนา
      regReligionName: [{ value: '', }, Validators.required], // ชื่อศาสนา
      reserveDate: [{ value: '', }],
      reserveMiCircle: [{ value: '', }, Validators.required], // รหัสกองหนุนสังกัด
      reserveMiCircleName: [{ value: '', }, Validators.required], // กองหนุนสังกัด
      reserveType: [{ value: '', }], // รหัสประเภทกองหนุนสังกัด มทบ.
      reserveTypeName: [{ value: '', }], // ชื่อประเภทกองหนุนสังกัด มทบ.
      regArmyNote: [''], // หมายเหตุ
      saveDate: [{ value: '', }], // วันที่บันทึกข้อมูลทะเบียนกองประจำการ


    });

    this.nstFormGroup.controls['documentId'].setValue(this.data.id);
    this.nstFormGroup.controls['nstRd25'].setValue("");
    this.nstFormGroup.controls['regPid'].setValue("");
    this.nstFormGroup.controls['nstId'].setValue('');
    this.nstFormGroup.controls['rd3No'].setValue('');
    this.nstFormGroup.controls['regTitle'].setValue('');
    this.nstFormGroup.controls['regFname'].setValue('');
    this.nstFormGroup.controls['regMname'].setValue('');
    this.nstFormGroup.controls['regLname'].setValue('');
    this.nstFormGroup.controls['natId'].setValue('');
    this.nstFormGroup.controls['regReligion'].setValue('');
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
    this.nstFormGroup.controls['regProvince'].setValue('');
    this.nstFormGroup.controls['sd9No'].setValue('');
    this.nstFormGroup.controls['regArmyAddress'].setValue('');
    this.nstFormGroup.controls['regArmyDistrict'].setValue('');
    this.nstFormGroup.controls['regArmyAmphur'].setValue('');
    this.nstFormGroup.controls['regArmyProvince'].setValue('');
    this.nstFormGroup.controls['toSd3AtYear'].setValue('');
    this.nstFormGroup.controls['toSd3'].setValue('');
    this.nstFormGroup.controls['toSd3MiSignNo'].setValue(null);
    this.nstFormGroup.controls['toSd3SaveDate'].setValue('');
    this.nstFormGroup.controls['toSd3Edu'].setValue('');
    this.nstFormGroup.controls['toSd3MiDept'].setValue('');
    this.nstFormGroup.controls['toSd3MiCorps'].setValue('');
    this.nstFormGroup.controls['toSd3Scar'].setValue('');
    this.nstFormGroup.controls['regArmyNote'].setValue('');
    this.nstFormGroup.controls['reserveMiCircle'].setValue('');

  }

  ngOnInit(): void {
    this.documentId = this.data.docId.toString();

    if (this.data.regPid) {
      this.findNstByRegPid(this.data.regPid);

    }

    this.isSaveBtn = !this.data.isSaveDisable;
    this.isEditBtn = this.data.isEditBtn;
    this.isDeleteBtn = this.data.isDeleteBtn;

  }

  findNstByRegPid(regPid: string) {

    this.api.getNstByRegPid(regPid).subscribe(res => {
      this.nstFormGroup.controls['documentId'].setValue(this.documentId);
      this.nstFormGroup.controls['nstRd25'].setValue(res.nst.nst_RD25);
      this.nstFormGroup.controls['regPid'].setValue(res.nst.reg_PID);
      this.nstFormGroup.controls['nstId'].setValue(res.nst.nst_ID);
      this.nstFormGroup.controls['rd3No'].setValue(res.nst.rd3_NO);
      this.nstFormGroup.controls['regTitle'].setValue(res.nst.reg_TITLE);
      this.nstFormGroup.controls['regFname'].setValue(res.nst.reg_FNAME);
      this.nstFormGroup.controls['regMname'].setValue(res.nst.reg_MNAME);
      this.nstFormGroup.controls['regLname'].setValue(res.nst.reg_LNAME);
      this.nstFormGroup.controls['natId'].setValue(res.nst.nat_ID);
      this.nstFormGroup.controls['natName'].setValue(res.nst.nat_NAME);
      this.nstFormGroup.controls['regReligion'].setValue(res.nst.reg_RELEG);
      this.nstFormGroup.controls['regReligionName'].setValue(res.nst.reg_RELEG_NAME);
      this.nstFormGroup.controls['regSchoolId'].setValue(res.nst.reg_SCHOOL_ID);
      this.nstFormGroup.controls['nstAtClass'].setValue(res.nst.nst_AT_CLASS);
      this.nstFormGroup.controls['atYear'].setValue(res.nst.at_YEAR);
      this.nstFormGroup.controls['nstStatusId'].setValue(res.nst.nstStatusCode[0].nst_STATUS_DESC);
      this.nstFormGroup.controls['nstApproveDate'].setValue(res.nst.nst_APPROVE_DATE == null ? new Date() : res.nst.nst_APPROVE_DATE);
      this.nstFormGroup.controls['regSex'].setValue(res.nst.reg_SEX == 'M' ? 'ชาย' : 'หญิง');
      this.nstFormGroup.controls['regBirthday'].setValue(res.nst.reg_BIRTHDAY == null ? new Date() : new Date(res.nst.reg_BIRTHDAY));
      this.nstFormGroup.controls['regHeight'].setValue(res.nst.reg_HEIGHT);
      this.nstFormGroup.controls['regAround'].setValue(res.nst.reg_AROUND);
      this.nstFormGroup.controls['fatherName'].setValue(res.nst.father_NAME);
      this.nstFormGroup.controls['regFNat'].setValue(res.nst.reg_FNAT);
      this.nstFormGroup.controls['regFNatName'].setValue(res.nst.reg_FNAT_NAME);
      this.nstFormGroup.controls['motherName'].setValue(res.nst.mother_NAME);
      this.nstFormGroup.controls['fatherCareer'].setValue(res.nst.father_CAREER);
      this.nstFormGroup.controls['motherCareer'].setValue(res.nst.mother_CAREER);
      this.nstFormGroup.controls['wifeName'].setValue(res.nst.wife_NAME);
      this.nstFormGroup.controls['grandFatherName'].setValue(res.nst.grand_FATHER_NAME);
      this.nstFormGroup.controls['grandFatherNatId'].setValue(res.nst.grand_FATHER_NAT_ID);
      this.nstFormGroup.controls['grandFatherNatName'].setValue(res.nst.grand_FATHER_NAT_NAME);
      this.nstFormGroup.controls['regAddress'].setValue(res.nst.reg_ADDR);
      this.nstFormGroup.controls['regDistrict'].setValue(res.nst.reg_DISTRIC_ID);
      this.nstFormGroup.controls['regDistrictName'].setValue(res.nst.reg_DISTRIC_NAME);
      this.nstFormGroup.controls['regAmphur'].setValue(res.nst.reg_AMPHUR_ID);
      this.nstFormGroup.controls['regAmphurName'].setValue(res.nst.reg_AMPHUR_NAME);
      this.nstFormGroup.controls['regProvince'].setValue(res.nst.reg_PROVINCE_CID);
      this.nstFormGroup.controls['regProvinceName'].setValue(res.nst.reg_PROVINCE_NAME);
      this.nstFormGroup.controls['sd9No'].setValue(res.nst.sd9_NO);
      this.nstFormGroup.controls['regArmyAddress'].setValue(res.nst.reg_ARMY_ADDR);
      this.nstFormGroup.controls['regArmyDistrict'].setValue(res.nst.reg_ARMY_DISTRIC_ID);
      this.nstFormGroup.controls['regArmyDistrictName'].setValue(res.nst.reg_ARMY_DISTRIC_NAME);
      this.nstFormGroup.controls['regArmyAmphur'].setValue(res.nst.reg_ARMY_AMPHUR_ID);
      this.nstFormGroup.controls['regArmyAmphurName'].setValue(res.nst.reg_ARMY_AMPHUR_NAME);
      this.nstFormGroup.controls['regArmyProvince'].setValue(res.nst.reg_ARMY_PROVINCE_CID);
      this.nstFormGroup.controls['regArmyProvinceName'].setValue(res.nst.reg_ARMY_PROVINCE_NAME);
      this.nstFormGroup.controls['regArmyProvinceShortName'].setValue(res.nst.reg_ARMY_PROVINCE_SHORTNAME);
      this.nstFormGroup.controls['toSd3DocId'].setValue(res.nst.to_SD3_DOC_ID);
      this.nstFormGroup.controls['toSd3ReasonId'].setValue(res.nst.to_SD3_REASON_ID);
      this.nstFormGroup.controls['toSd3ReasonName'].setValue(res.nst.to_SD3_REASON_NAME);
      this.nstFormGroup.controls['toSd3AtYear'].setValue((new Date()).getFullYear() + 543);
      // this.nstFormGroup.controls['toSd3AtYear'].setValue(new Date(res.nst.to_SD3_SAVE_DATE));
      this.nstFormGroup.controls['toSd3'].setValue(res.nst.to_SD3);
      this.nstFormGroup.controls['toSd3MiSignNo'].setValue(res.nst.to_SD3_MI_SIGN_NO);
      this.nstFormGroup.controls['toSd3Edu'].setValue(res.nst.to_SD3_EDU);
      this.nstFormGroup.controls['toSd3EduName'].setValue(res.nst.to_SD3_EDU_NAME);
      this.nstFormGroup.controls['toSd3MiDept'].setValue(res.nst.to_SD3_MI_DEPT);
      this.nstFormGroup.controls['toSd3MiDeptName'].setValue(res.nst.to_SD3_MI_DEPT_NAME);
      this.nstFormGroup.controls['toSd3MiDeptAbbr'].setValue(res.nst.to_SD3_MI_DEPT_ABBR);
      this.nstFormGroup.controls['toSd3MiCorps'].setValue(res.nst.to_SD3_MI_CORPS);
      this.nstFormGroup.controls['toSd3MiCorpsName'].setValue(res.nst.to_SD3_MI_CORPS_NAME);
      this.nstFormGroup.controls['toSd3Scar'].setValue(res.nst.to_SD3_SCAR);
      this.nstFormGroup.controls['toSd3SaveDate'].setValue(res.nst.to_SD3_SAVE_DATE == null ? new Date() : new Date(res.nst.to_SD3_SAVE_DATE));
      this.nstFormGroup.controls['reserveMiCircle'].setValue(res.nst.reserve_MTB_ID);
      this.nstFormGroup.controls['sd3No'].setValue(res.nst.sd3_NO);
      this.nstFormGroup.controls['sd3Date'].setValue(res.nst.sd3_DATE == null ? new Date() : new Date(res.nst.sd3_DATE));
      this.nstFormGroup.controls['sd3Year'].setValue(res.nst.sd3_YEAR == null ? res.nst.to_SD3_AT_YEAR : res.nst.sd3_YEAR);
      this.nstFormGroup.controls['reserveDate'].setValue(res.nst.reserve_DATE == null ? new Date() : new Date(res.nst.reserve_DATE));
      this.nstFormGroup.controls['reserveMiCircle'].setValue(res.nst.reserve_MTB_ID);
      this.nstFormGroup.controls['reserveMiCircleName'].setValue(res.nst.reserve_MTB_NAME);
      this.nstFormGroup.controls['reserveType'].setValue(res.nst.reserve_TYPE);
      this.nstFormGroup.controls['reserveTypeName'].setValue(res.nst.reserve_TYPE_NAME);
      this.nstFormGroup.controls['regArmyNote'].setValue(res.nst.reg_ARMY_NOTE);
      this.nstFormGroup.controls['saveDate'].setValue(res.nst.save_DATE == null ? new Date() : new Date(res.nst.save_DATE));
      this.miSignNo = res.nst.to_SD3_MI_SIGN_NO;

      if (res.nst.reg_SCHOOL_ID) {
        this.api.getSchoolByIdWithResponse(res.nst.reg_SCHOOL_ID).subscribe(item => {
          this.nstFormGroup.controls['regSchoolName'].setValue(item.school.school_SHORTNAME);
        });
      }
    })
  }


  updateNstAndInsertToSd3(nstMiInfo: any) {
    if (this.nstFormGroup.valid) {
      this.api.updateNstWithPatchAndInsertToSd3(nstMiInfo).subscribe({
        next: () => {
          this.ngtoastservice.success({
            detail: 'Success',
            summary: 'Items add successfully',
            duration: 600,
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
            duration: 600,
          });
          console.log(this.nstFormGroup.value);
        },
      });

    }

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

  unAssignMiSignNo(nstMiInfo: any) {
    // if (nstMiInfo.reg_PID) {
    this.api.updateNstWithPatchAndDeleteFromSd3(nstMiInfo).subscribe({
      next: () => {
        this.ngtoastservice.success({
          detail: 'Success',
          summary: 'Items add successfully',
          duration: 600,
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
          duration: 600,
        });
        console.log(this.nstFormGroup.value);
      },
    });

    // }

  }


  getSelectProvinceChangeValue(selectChangeValue: any) {
    // this.selectValue= selectChangeValue;
    this.data.provinceId = null;
    this.selectedAmphurOutPut = '';
    this.selectedDistrictOutPut = '';
    this.nstFormGroup.controls['regProvince'].setValue(selectChangeValue);
    // this.nstFormGroup.controls['reserveMiCircle'].setValue(this.dataService.GetData().crcl_ID); //ส่งข้อมูลรหัส มทบ.ให้ form
    this.nstFormGroup.controls['regProvinceName'].setValue(this.dataService.GetData().province_NAME); //ส่งข้อมูลชื่อจังหวัด ให้ form
    this.selectedProvinceOutPut = selectChangeValue;
    this.getAmphurByProvince = selectChangeValue;
    this.provinceSelectDisable = "false";
    this.amphurSelectDisable = "false";
  }

  getSelectAmphurChangeValue(selectChangeValue: any) {
    // this.selectedDistrictOutPut = '';
    this.nstFormGroup.controls['regAmphur'].setValue(selectChangeValue);
    this.nstFormGroup.controls['regAmphurName'].setValue(this.dataService.GetData().amphur_NAME); //ส่งข้อมูลชื่ออำเภอ ให้ form
    this.selectedAmphurOutPut = selectChangeValue;
    this.getDistrictsByAmphur = selectChangeValue;
    this.districtSelectDisable = "false";
  }

  getSelectDistrictChangeValue(selectChangeValue: any) {
    this.nstFormGroup.controls['regDistrict'].setValue(selectChangeValue);
    this.nstFormGroup.controls['regDistrictName'].setValue(this.dataService.GetData().district_NAME); //ส่งข้อมูลชื่อตำบล ให้ form
    this.selectedDistrictOutPut = selectChangeValue;
  }

  getSelectProvinceArmyChangeValue(selectChangeValue: any) {
    this.data.provinceId = null;
    this.selectedAmphurArmyOutPut = '';
    this.nstFormGroup.controls['regArmyProvince'].setValue(selectChangeValue);
    this.nstFormGroup.controls['reserveMiCircle'].setValue(this.dataService.GetData().crcl_ID); //ส่งข้อมูลรหัส มทบ.ให้ form
    this.nstFormGroup.controls['regArmyProvinceName'].setValue(this.dataService.GetData().province_NAME); //ส่งข้อมูลชื่อจังหวัด ให้ form
    this.nstFormGroup.controls['regArmyProvinceShortName'].setValue(this.dataService.GetData().province_SHORTNAME); //ส่งข้อมูลชื่อจังหวัด ให้ form
    this.selectedProvinceArmyOutPut = selectChangeValue;
    this.getAmphurArmyByProvinceArmy = selectChangeValue;
    this.provinceArmySelectDisable = "false";
    this.amphurArmySelectDisable = "false";
  }

  getSelectAmphurArmyChangeValue(selectChangeValue: any) {
    this.selectedDistrictOutPut = '';
    this.nstFormGroup.controls['regArmyAmphur'].setValue(selectChangeValue);
    this.nstFormGroup.controls['regArmyAmphurName'].setValue(this.dataService.GetData().amphur_NAME); //ส่งข้อมูลชื่ออำเภอ ให้ form
    this.selectedAmphurOutPut = selectChangeValue;
    this.getDistrictsArmyByAmphurArmy = selectChangeValue;
    this.districtArmySelectDisable = "false";
  }

  getSelectDistrictArmyChangeValue(selectChangeValue: any) {
    this.nstFormGroup.controls['regArmyDistrict'].setValue(selectChangeValue);
    this.nstFormGroup.controls['regArmyDistrictName'].setValue(this.dataService.GetData().district_NAME); //ส่งข้อมูลชื่อตำบล ให้ form
    this.selectedDistrictArmyOutPut = selectChangeValue;
  }

  getSelectNationalityChangeValue(selectChangeValue: any) {

    this.nstFormGroup.controls['natId'].setValue(selectChangeValue);
    this.selectedNationalityOutPut = selectChangeValue;
    this.nationalitySelectDisable = "false";

  }

  getSelectFatherNationalityChangeValue(selectChangeValue: any) {

    this.nstFormGroup.controls['regFNat'].setValue(selectChangeValue);
    this.selectedFatherNatOutPut = selectChangeValue;
    this.nationalitySelectDisable = "false";

  }

  getSelectReligionChangeValue(selectChangeValue: any) {

    this.nstFormGroup.controls['regReligion'].setValue(selectChangeValue);
    this.selectedReligionOutPut = selectChangeValue;
    this.religionSelectDisable = "false";

  }

  getSelectMilitaryCircleChangeValue(selectChangeValue: any) {

    this.nstFormGroup.controls['reserveMiCircle'].setValue(selectChangeValue);
    this.selectedMilitaryCircleOutPut = selectChangeValue;
    this.militaryCircleSelectDisable = "false";

  }

  getSelectDepartmentChangeValue(selectChangeValue: any) {

    this.nstFormGroup.controls['toSd3MiDept'].setValue(selectChangeValue);
    this.nstFormGroup.controls['toSd3MiDeptName'].setValue(this.dataService.GetData().department_NAME);
    this.nstFormGroup.controls['toSd3MiDeptAbbr'].setValue(this.dataService.GetData().department_ABBR);
    this.selectedDepartmentOutPut = selectChangeValue;
    this.departmentSelectDisable = "false";

  }

  getSelectCorpsChangeValue(selectChangeValue: any) {

    this.nstFormGroup.controls['toSd3MiCorps'].setValue(selectChangeValue);
    this.selectedCorpsOutPut = selectChangeValue;
    this.corpsSelectDisable = "false";

  }

  getSelectKnowledgeChangeValue(selectChangeValue: any) {

    this.nstFormGroup.controls['toSd3Edu'].setValue(selectChangeValue);
    this.selectedKnowledgeOutPut = selectChangeValue;
    this.knowledgeSelectDisable = "false";

  }

  getSelectReserveTypeChangeValue(selectChangeValue: any) {

    this.nstFormGroup.controls['reserveType'].setValue(selectChangeValue);
    this.nstFormGroup.controls['reserveTypeName'].setValue(this.dataService.GetData().typeabbrname);
    this.selectedReserveTypeOutPut = selectChangeValue;
    this.reserveTypeSelectDisable = "false";

  }

  getSelectSd3ReasonChangeValue(selectChangeValue: any) {

    this.nstFormGroup.controls['toSd3ReasonId'].setValue(selectChangeValue);
    this.nstFormGroup.controls['toSd3ReasonName'].setValue(this.dataService.GetData().reasonname);
    this.selectedSd3ReasonOutPut = selectChangeValue;
    this.sd3ReasonSelectDisable = "false";

  }

}