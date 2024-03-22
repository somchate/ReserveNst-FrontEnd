import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, filter } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ListService {


  listData!: any[];

  constructor(public api: ApiService) { }

  getTypeBudgetList(): Observable<any> {
    return this.api.getTypeBudget();
  }

  getUnitList(): Observable<any> {
    return this.api.getUnit();
  }

  getProvincesList(): Observable<any> {
    return this.api.getAllProvinces();
  }

  getProvincesById(id: any): Observable<any> {
    return this.api.getProvinceById(id);
  }

  getProvincesByUnitId(unit_id: any): Observable<any> {
    return this.api.getProvinceByUnitId(unit_id);
  }

  getAmphursList(): Observable<any> {
    return this.api.getAllAmphurs();
  }

  getAmphursByProvinceId(province_id: string): Observable<any> {
    return this.api.getAmphursByProvinceId(province_id);
  }

  getDistrictList(): Observable<any> {
    return this.api.getAllDistricts();
  }

  getDistrictByAmphurId(district_id: string): Observable<any> {
    return this.api.getDistrictsByAmphurId(district_id);
  }

  getUnitTrainList(): Observable<any> {
    return this.api.getAllUnitTrain();
  }

  getUnitTrainById(unit_id: string): Observable<any> {
    return this.api.getUnitsTrainById(unit_id);
  }

  getUnitByLevelForList(): Observable<any> {
    return this.api.getAllUnitByLevel();
  }

  getDocumentYearByUnitId(unitTrainId: number, recruitUnitId: number): Observable<any> {
    return this.api.getDocumentYearByUnitId(unitTrainId, recruitUnitId);
  }

  getSchoolListByProvinceId(provinceId: string): Observable<any> {
    return this.api.getSchoolListByProvinceCid(provinceId);
  }

  getNstsAtYearBySchoolIdAndStatusId(schoolId: string, statusId: string): Observable<any> {
    return this.api.getNstAtYearForListBySchoolIdAndStatusId(schoolId, statusId);
  }

  getAllNationality(): Observable<any> {
    return this.api.getAllNationality();
  }

  getAllReligion(): Observable<any> {
    return this.api.getAllReligion();
  }

  getAllMilitaryCircle(): Observable<any> {
    return this.api.getAllMilitaryCircle();
  }

  getAllDepartment(): Observable<any> {
    return this.api.getAllDepartment();
  }

  getAllCorps(): Observable<any> {
    return this.api.getAllCorps();
  }

  getAllReserveType(): Observable<any> {
    return this.api.getAllReserveType();
  }

  getAllKnowledge(): Observable<any> {
    return this.api.getAllKnowledge();
  }

  getAllSd3Reason(): Observable<any> {
    return this.api.getAllSd3Reason();
  }

  getSd3ReasonById(sd3ReasonId: string): Observable<any> {
    return this.api.getSd3ReasonById(sd3ReasonId);
  }

}
