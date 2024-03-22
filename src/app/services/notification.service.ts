import { Injectable } from '@angular/core';
// import { ToastrService } from 'ngx-toastr';
import { NgToastService } from 'ng-angular-popup'
import { IToast } from 'ng-angular-popup/lib/toast.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastservice: NgToastService) { }

  showSuccess(message: IToast) {
    const options= { positionClass:'toast-custom' };
    this.toastservice.success(message)
  }

  showError(message: IToast) {
    this.toastservice.error(message)
  }

  showInfo(message: IToast) {
    this.toastservice.info(message)
  }

  showWarning(message: IToast) {
    this.toastservice.warning(message)
  }
}