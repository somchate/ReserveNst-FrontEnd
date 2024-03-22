export interface Document {

  ID: Number; //รหัส
  DOC_NO: String;//เลขที่หนังสือ
  DOC_NAME: String //ชื่อหนังสือ
  DOC_DATE: Date;//ลงวันที่
  RECRUIT_UNIT_ID: String; //ถึง รหัสสัสดีจังหวัด
  RECRUIT_UNIT_SHORTNAME: String; //ถึง สัสดีจังหวัด
  RECRUIT_PROVINCE_ID: String; // จังหวัด มท. ที่หน่วยสัสดีรับผิดชอบ
  DOC_DEPARTMENT_ID: String; //รหัสแผนก ทบ. ทร. ทอ. ตร.
  UNIT_TRAIN_ID: String; //รหัสหน่วยฝึก นศท.
  UNIT_TRAIN_SHORTNAME: String; // หน่วยฝึก นศท.
  AT_YEAR: String; //ปีที่ขึ้นทะเบียนกองประจำการ
  USER_VERIFY: String; //ผู้จัดทำหนังสือ
  DOC_NOTE: String; //หมายเหตุ
  AMOUNT_IN_SD3: Number; //จำนวนคนของหนังสือใน สด.3

}