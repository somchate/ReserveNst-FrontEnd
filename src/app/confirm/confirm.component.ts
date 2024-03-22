import { Component, Inject, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from '../services/api.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { DocumentforunittrainListComponent } from '../unittrain/documentforunittrain-list/documentforunittrain-list.component';

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatDialogModule, MatDialogModule, MatFormFieldModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.scss'
})
export class ConfirmComponent implements OnInit {
  confirmForm !: FormGroup;
  title = '';
  btnText = '';
  docArray: any = [];

  constructor(private api: ApiService, private dialog: MatDialog, private ngToastService: NgToastService,
    @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder, private dialogRef: MatDialogRef<DocumentforunittrainListComponent>) { }

  ngOnInit(): void {
    this.title = this.data.title;
    this.btnText = this.data.btnText;
    this.docArray = this.data.docArray;

  }

  ConfirmChangeDocStatus() {
    this.api.updateDocumentStatusByDocArray(this.docArray).subscribe({
      next: (res) => {
        this.ngToastService.success({ detail: "Success", summary: "updated successfully", duration: 1000 });
        this.docArray = [];
        this.dialogRef.close('save');
      },
      error: () => {
        this.ngToastService.error({ detail: "Error", summary: "Error while update the items", duration: 1000 });
        this.docArray = [];
        this.dialogRef.close('error');
      }
    });
  }

  onClose() {
    this.dialog.closeAll();
  }
}

