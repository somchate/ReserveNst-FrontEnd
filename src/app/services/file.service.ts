import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FileService {
  // api on intellij
  apiUrl = 'http://localhost:8443/api';

  // api on localhost
  // apiUrl = 'http://localhost:8442/logbackend/api';

  constructor(private http: HttpClient) { }




  downloadSumarizeFile(data: any): Observable<any> {
    var obj = {
      // "template": "requestRpt.jasper"
      "template": "summarize.jasper"
      // "template": "check_sd43.jasper"
    };
    // return this.http.post(this.apiUrl + '/v1/report', obj), {responseType: 'blob'};
    return this.http.post(this.apiUrl + '/v1/requests/' + data.requestid + '/approved/report', obj, {
      responseType: "blob",
      headers: new HttpHeaders().append("Content-Type", "application/pdf")
    });
  }

  downloadSd3PdfFile(citizenId: String): Observable<any> {
    var obj = {
      "fileName": "SD3",
      "template": "SD3.jasper",
      "citizenId": citizenId
    };
    return this.http.post(this.apiUrl + '/v1/reports/sd3', obj, {
      responseType: "blob",
      headers: new HttpHeaders().append("Content-Type", "application/pdf")
    });
  }

  downloadSd42PdfFile(docId: String): Observable<any> {
    var obj = {
      "fileName": "SD42",
      "template": "SD42.jasper",
      "docId": docId,
      "DOCUMENT_NO": "กห 1234/2515",
    };
    return this.http.post(this.apiUrl + '/v1/reports/sd42', obj, {
      responseType: "blob",
      headers: new HttpHeaders().append("Content-Type", "application/pdf")
    });
  }

}