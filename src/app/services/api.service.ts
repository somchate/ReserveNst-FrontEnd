
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { API_URL } from '../constants/api.constant';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  // MAT_DATE_LOCALE,
  MatNativeDateModule,
  MatOption,
} from '@angular/material/core';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // on docker
  // logUrl = 'http://localhost:8442/logbackend/api/'
  // on 8080
  logUrl = API_URL.log_verify
  // nstUrl = 'http://localhost:8442/recruit-backend/api'  // tomcat on localhost port 8442
  nstUrl = API_URL.nst
  recruitApiUrl = API_URL.recruit

  constructor(private http: HttpClient) { }

  getAllVerifyWithPage(page: number, size: number): Observable<any> {
    let params = new HttpParams();

    // params = params.append('page', String(page));
    // params = params.append('limit', String(size));

    return this.http.get(this.logUrl + '/v1/requestverify/pagination/' + page + '/' + size).pipe(
      map((requestVerifyData: any) => requestVerifyData),
      catchError(err => (err))
    )
  }

  getAllRequests(): Observable<any> {
    return this.http.get<any>(this.logUrl + 'requestverify');
  }

  getAllSchoolWithPage(page: number, size: number): Observable<any> {

    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('limit', String(size));

    return this.http.get(this.nstUrl + '/v1/schools/provinces/' + 0, { params }).pipe(
      map((requestVerifyData: any) => requestVerifyData),
      catchError(err => (err))
    )
  }

  getSchoolBySchoolId(schoolId: string): Observable<any> {


    return this.http.get(this.nstUrl + '/v1/schools/' + schoolId).pipe(
      map((requestVerifyData: any) => requestVerifyData),
      catchError(err => (err))
    )
  }

  getSchoolByIdWithResponse(schoolId: string): Observable<any> {
    return this.http.get(this.nstUrl + '/v1/schools/schoolResponse/' + schoolId).pipe(
      map((requestVerifyData: any) => requestVerifyData),
      catchError(err => (err))
    )
  }

  getSchoolByUnitIdWithPage(unit_id: string, page: number, size: number): Observable<any> {

    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('limit', String(size));

    return this.http.get(this.nstUrl + '/v1/schools/provinces/' + 0, { params }).pipe(
      map((requestVerifyData: any) => requestVerifyData),
      catchError(err => (err))
    )

  }

  getSchoolByProvinceCidWithPage(province_cid: string, page: number, size: number): Observable<any> {
    let params = new HttpParams();

    params = params.append('page', String(page));
    params = params.append('limit', String(size));

    return this.http.get(this.nstUrl + '/v1/schools/provinces/' + province_cid, { params }).pipe(
      map((requestVerifyData: any) => requestVerifyData),
      catchError(err => (err))
    )
  }

  getSchoolListByProvinceCid(provinceId: string): Observable<any> {
    return this.http.get(this.nstUrl + '/v1/schoolsforlist/' + provinceId).pipe(
      map((data: any) => data),
      catchError(err => (err))
    )
  }

  getAllSchoolWithPageFilter(page: number, size: number, school_name: string): Observable<any> {
    let params = new HttpParams();

    params = params.append('page', String(page));
    params = params.append('limit', String(size));
    params = params.append('school_name', school_name);

    return this.http.get(this.nstUrl + '/v1/schools/pagewithparams', { params }).pipe(
      map((requestVerifyData: any) => requestVerifyData),
      catchError(err => (err))
    )
  }

  getNstBySchoolAndStatusWithPage(page: number, size: number, schoolId: string, nstStatus: string): Observable<any> {
    let params = new HttpParams();

    params = params.append('page', String(page));
    params = params.append('limit', String(size));
    params = params.append('school_id', schoolId);
    params = params.append('status_id', nstStatus);

    return this.http.get(this.nstUrl + '/v1/nsts/nst_pagewithparams', { params }).pipe(
      map((nstData: any) => nstData),
      catchError(err => (err))
    )
  }

  getNstAtYearForListBySchoolIdAndStatusId(schoolId: string, statusId: string): Observable<any> {
    return this.http.get(this.nstUrl + '/v1/nsts/atyearforlist/' + schoolId + '/' + statusId).pipe(
      map((res: any) => res),
      catchError(err => (err))
    );
  }

  getNstBySchoolAndStatusWithPageFilter(page: number, size: number, schoolId: string, nstStatus: string, regName: string): Observable<any> {

    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('limit', String(size));
    params = params.append('school_id', schoolId);
    params = params.append('status_id', nstStatus);
    params = params.append('reg_name', regName);

    return this.http.get(this.nstUrl + '/v1/nsts/nst_pagewithparams_filter', { params }).pipe(
      map((nstData: any) => nstData),
      catchError(err => (err))
    )
  }

  getNstBySchoolStatusAtYear(page: number, size: number, atYear: string, schoolId: string, statusId: string): Observable<any> {

    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('limit', String(size));

    return this.http.get(this.nstUrl + '/v1/nsts/' + atYear + '/' + schoolId + '/' + statusId, { params }).pipe(
      map((nstData: any) => nstData),
      catchError(err => (err))
    )
  }

  getNstBySchoolStatusProvinceAtYear(page: number, size: number, atYear: string, schoolId: string, provinceId: string,
    statusId: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('limit', String(size));
    return this.http.get(this.nstUrl + '/v1/nsts/' + atYear + '/' + schoolId + '/' + provinceId + '/' + statusId, { params }).pipe(
      map((nstData: any) => nstData),
      catchError(err => (err))
    )
  }

  getNstByDocId(page: number, size: number, docId: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('limit', String(size));
    return this.http.get(this.nstUrl + '/v1/nsts/documents/' + docId, { params }).pipe(
      map((nstData: any) => nstData),
      catchError(err => (err))
    )
  }

  getNstByRegPid(regId: string): Observable<any> {
    return this.http.get<any>(this.nstUrl + '/v1/nsts/' + regId);
  }

  updateNstMiInfoWithPut(nstMiInfo: any): Observable<any> {

    let saveDate = new Date(nstMiInfo.toSd3SaveDate);
    // let saveDateUtc = new Date(saveDate.getTime() + 86400000);
    let saveDateUtc = new Date(saveDate.getTime() + 25200000);
    // let testDate = new Date(saveDate.getTime() + (new Date(nstMiInfo.toSd3SaveDate).getTimezoneOffset() * 60000));
    // let testDate = new Date(new Date(saveDate).toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' }))


    var data = {
      "nstRegisterMiInfo": {
        "reg_PID": nstMiInfo.regPid,
        "rd3_NO": nstMiInfo.rd3No,
        "reg_MNAME": nstMiInfo.regMname,
        "reg_HEIGHT": nstMiInfo.regHeight,
        "reg_AROUND": nstMiInfo.regAround,
        "reg_NAT": nstMiInfo.regNat,
        "reg_RELEG": nstMiInfo.regReleg,
        "reg_FNAT": nstMiInfo.regFNat,
        "father_NAME": nstMiInfo.fatherName,
        "mother_NAME": nstMiInfo.motherName,
        "father_CAREER": nstMiInfo.fatherCareer,
        "mother_CAREER": nstMiInfo.motherCareer,
        "sd9_NO": nstMiInfo.sd9No,
        "reg_ARMY_ADDR": nstMiInfo.regArmyAddress,
        "reg_ARMY_PROVINCE_CID": nstMiInfo.regArmyProvince,
        "reg_ARMY_AMPHUR_ID": nstMiInfo.regArmyAmphur,
        "reg_ARMY_DISTRIC_ID": nstMiInfo.regArmyDistrict,
        "reg_ARMY_NOTE": nstMiInfo.regArmyNote,
        "to_SD3_AT_YEAR": nstMiInfo.toSd3AtYear.toString(),
        "to_SD3": nstMiInfo.toSd3,
        "to_SD3_EDU": nstMiInfo.toSd3Edu,
        "to_SD3_MI_DEPT": nstMiInfo.toSd3MiDept,
        "to_SD3_MI_CORPS": nstMiInfo.toSd3MiCorps,
        "to_SD3_SCAR": nstMiInfo.toSd3Scar,
        "reserve_MTB_ID": nstMiInfo.reserveMtb,
        "to_SD3_SAVE_DATE": saveDateUtc,
      }
    };
    return this.http.put(this.nstUrl + '/v1/nsts/' + nstMiInfo.regPid, data);
  }

  updateNstMiInfoWithPatch(nstMiInfo: any): Observable<any> {

    let saveDate = new Date(nstMiInfo.toSd3SaveDate);
    let saveDateUtc = new Date(saveDate.getTime() + 25200000);
    var data = {
      "REG_PID": nstMiInfo.regPid,
      "RD3_NO": nstMiInfo.rd3No,
      "REG_MNAME": nstMiInfo.regMname,
      "REG_HEIGHT": nstMiInfo.regHeight,
      "REG_AROUND": nstMiInfo.regAround,
      "NAT_ID": nstMiInfo.natId,
      "NAT_NAME": nstMiInfo.natName,
      "REG_RELEG": nstMiInfo.regReligion,
      "REG_RELEG_NAME": nstMiInfo.regReligionName,
      "REG_FNAT": nstMiInfo.regFNat,
      "REG_FNAT_NAME": nstMiInfo.regFNatName,
      "FATHER_NAME": nstMiInfo.fatherName,
      "MOTHER_NAME": nstMiInfo.motherName,
      "FATHER_CAREER": nstMiInfo.fatherCareer,
      "MOTHER_CAREER": nstMiInfo.motherCareer,
      "WIFE_NAME": nstMiInfo.wifeName,
      "GRAND_FATHER_NAME": nstMiInfo.grandFatherName,
      "GRAND_FATHER_NAT_ID": nstMiInfo.grandFatherNatId,
      "GRAND_FATHER_NAT_NAME": nstMiInfo.grandFatherNatName,
      "SD9_NO": nstMiInfo.sd9No,
      "REG_ADDR": nstMiInfo.regAddress,
      "REG_PROVINCE_CID": nstMiInfo.regProvince,
      "REG_PROVINCE_NAME": nstMiInfo.regProvinceName,
      "REG_AMPHUR_ID": nstMiInfo.regAmphur,
      "REG_AMPHUR_NAME": nstMiInfo.regAmphurName,
      "REG_DISTRIC_ID": nstMiInfo.regDistrict,
      "REG_DISTRIC_NAME": nstMiInfo.regDistrictName,
      "REG_ARMY_ADDR": nstMiInfo.regArmyAddress,
      "REG_ARMY_PROVINCE_CID": nstMiInfo.regArmyProvince,
      "REG_ARMY_PROVINCE_NAME": nstMiInfo.regArmyProvinceName,
      "REG_ARMY_PROVINCE_SHORTNAME": nstMiInfo.regArmyProvinceShortName,
      "REG_ARMY_AMPHUR_ID": nstMiInfo.regArmyAmphur,
      "REG_ARMY_AMPHUR_NAME": nstMiInfo.regArmyAmphurName,
      "REG_ARMY_DISTRIC_ID": nstMiInfo.regArmyDistrict,
      "REG_ARMY_DISTRIC_NAME": nstMiInfo.regArmyDistrictName,
      "TO_SD3_AT_YEAR": nstMiInfo.toSd3AtYear.toString(),
      "TO_SD3": nstMiInfo.toSd3,
      "TO_SD3_EDU": nstMiInfo.toSd3Edu,
      "TO_SD3_EDU_NAME": nstMiInfo.toSd3EduName,
      "TO_SD3_MI_DEPT": nstMiInfo.toSd3MiDept,
      "TO_SD3_MI_DEPT_NAME": nstMiInfo.toSd3MiDeptName,
      "TO_SD3_MI_DEPT_ABBR": nstMiInfo.toSd3MiDeptAbbr,
      "TO_SD3_MI_SIGN_NO": nstMiInfo.toSd3MiSignNo,
      "TO_SD3_MI_CORPS": nstMiInfo.toSd3MiCorps,
      "TO_SD3_MI_CORPS_NAME": nstMiInfo.toSd3MiCorpsName,
      "TO_SD3_SCAR": nstMiInfo.toSd3Scar,
      "TO_SD3_REASON_ID": nstMiInfo.toSd3ReasonId,
      "TO_SD3_REASON_NAME": nstMiInfo.toSd3ReasonName,
      "RESERVE_MTB_ID": nstMiInfo.reserveMiCircle,
      "RESERVE_MTB_NAME": nstMiInfo.reserveMiCircleName,
      "RESERVE_TYPE": nstMiInfo.reserveType,
      "RESERVE_TYPE_NAME": nstMiInfo.reserveTypeName,
      "TO_SD3_SAVE_DATE": saveDateUtc,
      "REG_ARMY_NOTE": nstMiInfo.regArmyNote,
      // "RESERVE_DATE": nstMiInfo.reserveDate,
      // "SAVE_DATE": new Date((nstMiInfo.saveDate).getTime() + 25200000),

    };
    return this.http.patch(this.nstUrl + '/v1/nsts/' + nstMiInfo.regPid, data);
  }

  updateNstWithPatchAndInsertToSd3(nstMiInfo: any): Observable<any> {

    let birthDate = new Date(nstMiInfo.regBirthday);
    let birthDateUtc = new Date(birthDate.getTime() + 25200000);
    var data = {

      "REG_PID": nstMiInfo.regPid,
      "REG_FNAME": nstMiInfo.regFname,
      "REG_MNAME": nstMiInfo.regMname,
      "REG_LNAME": nstMiInfo.regLname,
      "REG_BIRTHDAY": birthDateUtc,
      "NAT_ID": nstMiInfo.natId,
      "NAT_NAME": nstMiInfo.natName,
      "REG_RELEG": nstMiInfo.regReligion,
      "REG_RELEG_NAME": nstMiInfo.regReligionName,
      "FATHER_NAME": nstMiInfo.fatherName,
      "REG_FNAT": nstMiInfo.regFNat,
      "REG_FNAT_NAME": nstMiInfo.regFNatName,
      "FATHER_CAREER": nstMiInfo.fatherCareer,
      "MOTHER_NAME": nstMiInfo.motherName,
      "MOTHER_CAREER": nstMiInfo.motherCareer,
      "WIFE_NAME": nstMiInfo.wifeName,
      "GRAND_FATHER_NAME": nstMiInfo.grandFatherName,
      "GRAND_FATHER_NAT_NAME": nstMiInfo.grandFatherNatName,
      "GRAND_FATHER_NAT_ID": nstMiInfo.grandFatherNatId,
      "SD9_NO": nstMiInfo.sd9No,
      "SD3_NO": nstMiInfo.sd3No,
      "SD3_DATE": new Date((nstMiInfo.sd3Date).getTime() + 25200000),
      "SD3_YEAR": nstMiInfo.sd3Year,
      "TO_SD3_AT_YEAR": nstMiInfo.toSd3AtYear.toString(),
      "REG_ADDR": nstMiInfo.regAddress,
      "REG_DISTRIC_ID": nstMiInfo.regDistrict,
      "REG_DISTRIC_NAME": nstMiInfo.regDistrictName,
      "REG_AMPHUR_ID": nstMiInfo.regAmphur,
      "REG_AMPHUR_NAME": nstMiInfo.regAmphurName,
      "REG_PROVINCE_CID": nstMiInfo.regProvince,
      "REG_PROVINCE_NAME": nstMiInfo.regProvinceName,
      "REG_ARMY_ADDR": nstMiInfo.regArmyAddress,
      "REG_ARMY_DISTRIC_ID": nstMiInfo.regArmyDistrict,
      "REG_ARMY_DISTRIC_NAME": nstMiInfo.regArmyDistrictName,
      "REG_ARMY_AMPHUR_ID": nstMiInfo.regArmyAmphur,
      "REG_ARMY_AMPHUR_NAME": nstMiInfo.regArmyAmphurName,
      "REG_ARMY_PROVINCE_CID": nstMiInfo.regArmyProvince,
      "REG_ARMY_PROVINCE_NAME": nstMiInfo.regArmyProvinceName,
      "REG_ARMY_PROVINCE_SHORTNAME": nstMiInfo.regArmyProvinceShortName,
      "TO_SD3_REASON_ID": nstMiInfo.toSd3ReasonId,
      "TO_SD3_REASON_NAME": nstMiInfo.toSd3ReasonName,
      "TO_SD3_DOC_ID": nstMiInfo.documentId,
      "TO_SD3_MI_DEPT": nstMiInfo.toSd3MiDept,
      "TO_SD3_MI_DEPT_NAME": nstMiInfo.toSd3MiDeptName,
      "TO_SD3_MI_DEPT_ABBR": nstMiInfo.toSd3MiDeptAbbr,
      "TO_SD3_MI_CORPS": nstMiInfo.toSd3MiCorps,
      "TO_SD3_MI_CORPS_NAME": nstMiInfo.toSd3MiCorpsName,
      "TO_SD3_SAVE_DATE": nstMiInfo.toSd3SaveDate,
      "TO_SD3_EDU": nstMiInfo.toSd3Edu,
      "TO_SD3_EDU_NAME": nstMiInfo.toSd3EduName,
      "TO_SD3_SCAR": nstMiInfo.toSd3Scar,
      "REG_HEIGHT": nstMiInfo.regHeight,
      "REG_AROUND": nstMiInfo.regAround,
      "TO_SD3_MI_SIGN_NO": nstMiInfo.toSd3MiSignNo,
      "RESERVE_DATE": new Date((nstMiInfo.reserveDate).getTime() + 25200000),
      "RESERVE_MTB_ID": nstMiInfo.reserveMiCircle,
      "RESERVE_MTB_NAME": nstMiInfo.reserveMiCircleName,
      "RESERVE_TYPE": nstMiInfo.reserveType,
      "RESERVE_TYPE_NAME": nstMiInfo.reserveTypeName,
      "REG_ARMY_NOTE": nstMiInfo.regArmyNote,
      "SAVE_DATE": new Date((nstMiInfo.saveDate).getTime() + 25200000),


      //ยังหาที่ลงไม่ได้
      // "RD3_NO": nstMiInfo.rd3No,
      // "TO_SD3": nstMiInfo.toSd3,


    };
    return this.http.patch(this.recruitApiUrl + '/v1/nsts/sd3/' + nstMiInfo.regPid, data);
  }

  updateNstWithPatchAndDeleteFromSd3(nstMiInfo: any): Observable<any> {

    var data = {

      "SD3_NO": null,
      "SD3_DATE": null,
      "SD3_YEAR": null,
      "TO_SD3_MI_SIGN_NO": null,
      "RESERVE_DATE": null,
      "SAVE_DATE": null,
      "TO_SD3_DOC_ID": nstMiInfo.documentId,

    };
    return this.http.patch(this.recruitApiUrl + '/v1/nsts/' + nstMiInfo.regPid, data);
  }

  getAllRequestsWithPageFilter(page: number, size: number, agency: string): Observable<any> {
    let params = new HttpParams();

    params = params.append('page', String(page));
    params = params.append('limit', String(size));
    params = params.append('agency', agency);

    return this.http.get(this.logUrl + '/v1/requestverify/pagewithparams', { params }).pipe(
      map((requestVerifyData: any) => requestVerifyData),
      catchError(err => (err))
    )
  }

  postRequest(data: any) {
    return this.http.post(this.logUrl + '/v1/requestverify', data);
  }

  putRequest(data: any) {
    return this.http.put<any>(this.logUrl + '/v1/requestverify/' + data.id, data);
  }

  deleteRequest(data: any) {
    return this.http.delete<any>(this.logUrl + '/v1/requestverify/' + data.id);
  }

  getAllVerifyResultsWithPage(page: number, size: number): Observable<any> {
    let params = new HttpParams();

    // params = params.append('page', String(page));
    // params = params.append('limit', String(size));

    return this.http.get(this.nstUrl + '/v1/results/pagination/' + page + '/' + size).pipe(
      map((requestVerifyData: any) => requestVerifyData),
      catchError(err => (err))
    )
  }

  getAllVerifyByNameResultsWithPageFilter(page: number, size: number, firstName: string, lastName: string): Observable<any> {
    let params = new HttpParams();

    params = params.append('page', String(page));
    params = params.append('limit', String(size));
    params = params.append('firstName', firstName);
    params = params.append('lastName', lastName);

    return this.http.get(this.nstUrl + '/v1/results/pagewithparams', { params }).pipe(
      map((requestVerifyData: any) => requestVerifyData),
      catchError(err => (err))
    )
  }

  getAllVerifyByCidResultsWithPageFilter(page: number, size: number, citizen_id: string): Observable<any> {

    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('limit', String(size));
    params = params.append('citizen_id', citizen_id);

    return this.http.get(this.nstUrl + '/v1/results/cid_pagewithparams', { params }).pipe(
      map((requestVerifyData: any) => requestVerifyData),
      catchError(err => (err))
    )
  }

  postCheckIn(data: any) {
    return this.http.post(this.logUrl + '/v1/requests/' + data.request_id + '/checkin', data);
  }

  postApproved(data: any) {
    return this.http.post(this.logUrl + '/v1/requests/' + data.request_id + '/checkin/' + data.checkin_id + '/approved', data);
  }

  putCheckIn(data: any) {
    return this.http.put(this.logUrl + '/v1/checkin/' + data.id, data);
  }

  putApproved(data: any) {
    return this.http.put(this.logUrl + '/v1/approved/' + data.checkin_id, data);
  }

  deleteCheckIn(data: any) {
    return this.http.delete<any>(this.logUrl + '/v1/checkin/' + data.id);
  }

  deleteApproved(data: any) {
    return this.http.delete<any>(this.logUrl + '/v1/approved/' + data.id);
  }

  getItems(): Observable<any> {
    return this.http.get<any>("https://localhost:7272/api/items");
  }

  postHistory(data: any) {
    return this.http.post("https://localhost:7272/api/history/", data);
  }

  getUser(User_name: any) {
    return this.http.get<any>("https://localhost:3000/allowuser/" + User_name);
  }

  getTypeBudget() {
    return this.http.get<any>("https://localhost:7272/api/Type/info");
  }

  getUnit() {
    return this.http.get<any>("https://localhost:7272/api/Unit/list");
  }

  getPersonList(unitid: string, wid: string): Observable<any> {
    console.log("api unitid :" + unitid);
    return this.http.get<any>("https://localhost:7272/api/Person/" + unitid + "/" + wid);
  }

  getPersonToSelect(unitid: string): Observable<any> {
    console.log("api unitid :" + unitid);
    return this.http.delete<any>("https://localhost:7272/api/Person/" + unitid);
  }

  getReport() {
    return this.http.get<any>(this.logUrl + 'rpt/');
  }

  getAllVerify(): Observable<any> {
    return this.http.get<any>(this.nstUrl + '/requestverify');
  }

  getAllCheckIn(): Observable<any> {
    return this.http.get<any>(this.nstUrl + '/checkin');
  }

  getCheckInById(id: number): Observable<any> {
    return this.http.get<any>(this.logUrl + '/v1/checkin/' + id);
  }

  getAllApproved(): Observable<any> {
    return this.http.get<any>(this.nstUrl + '/checkin');
  }

  getApprovedById(id: number): Observable<any> {
    return this.http.get<any>(this.logUrl + '/v1/approved/' + id);
  }

  getApprovedByRequestId(request_id: number): Observable<any> {
    return this.http.get<any>(this.logUrl + '/v1/requests/' + request_id + '/approved');
  }

  getVerifyResultByCitizen_id(citizen_id: string): Observable<any> {
    return this.http.get<any>(this.nstUrl + '/v1/results/' + citizen_id);
  }

  getVerifyResultByCitizen_idAndResult_year(citizen_id: string, result_year: string): Observable<any> {
    return this.http.get<any>(this.nstUrl + '/v1/results/' + result_year + '/citizen/' + citizen_id);
  }


  getCheckInByRequestId(id: number): Observable<any> {
    return this.http.get<any>(this.logUrl + '/v1/requests/' + id + '/checkin');
  }

  getCheckInByRequestIdNotIn(id: number): Observable<any> {
    return this.http.get<any>(this.logUrl + '/v1/requests/' + id + '/checkInNotInApproved');
  }

  getResultByRequestId(request_id: number): Observable<any> {
    return this.http.get<any>(this.logUrl + '/v1/requests/' + request_id + '/approved');
  }

  getAllProvinces(): Observable<any> {
    return this.http.get<any>(this.nstUrl + '/v1/provinces');
  }

  getProvinceById(id: string): Observable<any> {
    return this.http.get<any>(this.nstUrl + '/v1/provinces/' + id);
  }

  getProvinceByUnitId(unit_id: string): Observable<any> {
    return this.http.get<any>(this.nstUrl + '/v1/provinces/unitstrain/' + unit_id);
  }

  getAllAmphurs(): Observable<any> {
    return this.http.get<any>(this.nstUrl + '/v1/amphurs');
  }

  getAmphursByProvinceId(province_cid: string): Observable<any> {
    return this.http.get<any>(this.nstUrl + '/v1/provinces/' + province_cid + '/amphurs');
  }

  getAllDistricts(): Observable<any> {
    return this.http.get<any>(this.nstUrl + '/v1/districts');
  }

  getDistrictsByAmphurId(amphur_id: string): Observable<any> {
    return this.http.get<any>(this.nstUrl + '/v1/amphurs/' + amphur_id + '/districts');
  }

  getAllUnitTrain(): Observable<any> {
    return this.http.get<any>(this.nstUrl + '/v1/unitstrain');
  }

  getUnitsTrainById(unit_id: string): Observable<any> {
    return this.http.get<any>(this.nstUrl + '/v1/unitstrain/' + unit_id);
  }

  getAllUnitTrainProvince(): Observable<any> {
    return this.http.get<any>(this.nstUrl + '/v1/unitstrainprovince');
  }

  getUnitsTrainProvinceByUnitId(unit_id: string): Observable<any> {
    return this.http.get<any>(this.nstUrl + '/v1/unitstrainprovince/' + unit_id);
  }

  getNationalityByCode(nationalityCode: string): Observable<any> {
    return this.http.get<any>(this.nstUrl + '/v1/nationality/' + nationalityCode);
  }

  getAllNationality(): Observable<any> {
    return this.http.get<any>(this.nstUrl + '/v1/nationality');
  }

  getReligionById(religionId: string): Observable<any> {
    return this.http.get<any>(this.nstUrl + '/v1/religions/' + religionId);
  }

  getAllReligion(): Observable<any> {
    return this.http.get<any>(this.nstUrl + '/v1/religions');
  }

  getDepartmentById(departmentId: string): Observable<any> {
    return this.http.get<any>(this.nstUrl + '/v1/departments/' + departmentId);
  }

  getAllDepartment(): Observable<any> {
    return this.http.get<any>(this.nstUrl + '/v1/departments');
  }

  getCorsById(corpsId: string): Observable<any> {
    return this.http.get<any>(this.nstUrl + '/v1/corps/' + corpsId);
  }

  getAllCorps(): Observable<any> {
    return this.http.get<any>(this.nstUrl + '/v1/corps');
  }

  getReserveTypeById(reserveTypeId: string): Observable<any> {
    return this.http.get<any>(this.recruitApiUrl + '/v1/reservetype/' + reserveTypeId);
  }

  getAllReserveType(): Observable<any> {
    return this.http.get<any>(this.recruitApiUrl + '/v1/reservetype');
  }

  getKnowledgeById(knowledgeId: string): Observable<any> {
    return this.http.get<any>(this.nstUrl + '/v1/knowledge/' + knowledgeId);
  }

  getAllKnowledge(): Observable<any> {
    return this.http.get<any>(this.nstUrl + '/v1/knowledge');
  }


  getMilitaryCircleById(militaryCircleId: string): Observable<any> {
    return this.http.get<any>(this.nstUrl + '/v1/militarycircle/' + militaryCircleId);
  }

  getAllMilitaryCircle(): Observable<any> {
    return this.http.get<any>(this.nstUrl + '/v1/militarycircle');
  }

  getAllUnitByLevel(): Observable<any> {
    return this.http.get<any>(this.recruitApiUrl + '/v1/units/2');
  }

  createDocument(data: any) {
    return this.http.post(this.recruitApiUrl + '/v1/documents', data);
  }

  updateDocument(data: any) {
    return this.http.put(this.recruitApiUrl + '/v1/documents/id/' + data.id, data);
  }

  getDocumentByYear(page: number, size: number, atYear: String): Observable<any> {
    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('limit', String(size));
    return this.http.get(this.recruitApiUrl + '/v1/documents/' + atYear, { params }).pipe(
      map((res: any) => res),
      catchError(err => (err))
    );
  }

  getDocumentByUnitAndYearAndStatus(page: number, size: number, unitTrainId: String, unitId: String, atYear: String): Observable<any> {
    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('limit', String(size));
    params = params.append('unitTrainId', String(unitTrainId));
    params = params.append('unitId', String(unitId));
    return this.http.get(this.recruitApiUrl + '/v1/documentsbyunit/' + atYear, { params }).pipe(
      map((res: any) => res),
      catchError(err => (err))
    );
  }

  getDocumentByUnitAndYearAndDocStatus(page: number, size: number, unitTrainId: String, unitId: String, atYear: String, docStatus: String): Observable<any> {
    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('limit', String(size));
    params = params.append('unitTrainId', String(unitTrainId));
    params = params.append('unitId', String(unitId));
    params = params.append('docStatus', String(docStatus));
    return this.http.get(this.recruitApiUrl + '/v1/documents/units/' + atYear, { params }).pipe(
      map((res: any) => res),
      catchError(err => (err))
    );
  }

  getDocumentById(docId: number): Observable<any> {
    return this.http.get(this.recruitApiUrl + '/v1/documents/id/' + docId).pipe(
      map((res: any) => res),
      catchError(err => (err))
    );
  }

  getDocumentYearByUnitId(unitTrainId: number, recruitUnitId: number): Observable<any> {
    return this.http.get(this.recruitApiUrl + '/v1/documents/' + unitTrainId + '/' + recruitUnitId).pipe(
      map((res: any) => res),
      catchError(err => (err))
    );
  }

  deleteDocumentById(docId: number): Observable<any> {
    return this.http.delete(this.recruitApiUrl + '/v1/documents/' + docId).pipe(
      map((res: any) => res),
      catchError(err => (err))
    );
  }

  postDocumentSd3ByDocSd3Request(data: any): Observable<any> {
    return this.http.post(this.recruitApiUrl + '/v1/documentsd3', data).pipe(
      map((res: any) => res),
      catchError(err => (err))
    );
  }


  deleteDocumentSd3ByDocSd3Request(data: any): Observable<any> {

    var reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
    });

    const options = {
      headers: reqHeader,
      body: data
    };

    return this.http.delete<any>(this.recruitApiUrl + '/v1/documentsd3', options).pipe(
      map((res: any) => res),
      catchError(err => (err))
    );
  }

  getAllSd3Reason(): Observable<any> {
    return this.http.get(this.recruitApiUrl + '/v1/sd3reason').pipe(
      map((res: any) => res),
      catchError(err => (err))
    );
  }

  getSd3ReasonById(sd3ReasonId: string): Observable<any> {
    return this.http.get(this.recruitApiUrl + '/v1/sd3reason/' + sd3ReasonId).pipe(
      map((res: any) => res),
      catchError(err => (err))
    );
  }

  insertToSd3(miInfo: any) {
    let saveDate = new Date(miInfo.toSd3SaveDate);
    let saveDateUtc = new Date(saveDate.getTime() + 25200000);
    var data = {

      "citizen_ID": miInfo.regPid,//เลขประจำตัวประชาชน
      "nat_ID": miInfo.natId,//รหัสสัญชาติ
      "religion_ID": miInfo.regReligion,//รหัสศาสนา
      "sd9_NO": miInfo.sd9No,//สด.9 เลขที่
      "sd3_YEAR": miInfo.toSd3AtYear.toString(),//ปีที่ขึ้นทะเบียนกองประจำการ
      "mi_ADDRESS": miInfo.regArmyAddress,//บ้านเลขที่ ตามภูมิลำเนาทหาร
      "mi_PROVINCE_ID": miInfo.regArmyProvince,//รหัสจังหวัดภูมิลำเนาทหาร
      "mi_AMPHUR_ID": miInfo.regArmyAmphur,//รหัสอำเภอภูมิลำเนาทหาร
      "mi_DISTRICT_ID": miInfo.regArmyDistrict,//รหัสตำบลภูมิลำเนาทหาร
      "father_NAME": miInfo.fatherName,//ชื่อบิดา
      "father_NAT_ID": miInfo.regFNat,//รหัสสัญชาติบิดา
      "father_CAREER": miInfo.fatherCareer,//อาชีพบิดา
      "mother_NAME": miInfo.motherName,//ชื่อมารดา
      "mi_CORPS": miInfo.toSd3MiCorps,//เหล่า
      "mi_DEPARTMENT": miInfo.toSd3MiDept,//แผนก ทบ. ทร. ทอ. ตร.
      "mi_SIGN_NO": miInfo.toSd3MiSignNo,//เลขเครื่องหมายทหาร
      "reserve_CRCL_ID": miInfo.reserveMiCircle,//รหัสมณฑลทหารบกที่สังกัดกองหนุน
      "knowledge_EDU": miInfo.toSd3Edu,//รู้วิชาพลเรือน
      "scar": miInfo.toSd3Scar,//ตำหนิแผลเป็น
      "scale_HEIGHT": miInfo.regHeight,//ขนาดสูง
      "scale_AROUND": miInfo.regAround,//ขนาดรอบตัว หายใจออก/หายใจเข้า
      "note": miInfo.regArmyNote,//หมายเหตุ

    };
    return this.http.post(this.recruitApiUrl + '/v1/sd3', data).pipe(
      map((res: any) => res),
      catchError(err => (err))
    );
  }

  updateDocumentStatusByDocArray(data: any): Observable<any> {
    return this.http.put(this.recruitApiUrl + '/v1/documents', data).pipe(
      map((res: any) => res),
      catchError(err => (err))
    );
  }

}