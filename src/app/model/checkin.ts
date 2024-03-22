export interface CheckIn {
    id: number;
    citizen_id: string;
    pre_name: string;
    first_name: string;
    last_name: string;
    dob: Date;
    mi_district: string;
    mi_amphoe: string;
    mi_province: string;
    weight: number;
    height: number;
    chest: string;
    document_code: string;
    issue_no: string;
    order_no: string;
    result_year: string;
    result_mean: string;
    description: string;
    verify_date: Date;
    result_comment: string;
  }