import { Component, Inject, OnInit } from '@angular/core';
import { FileService } from '../services/file.service';
import { saveAs } from 'file-saver-es';
import { MatDialog, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
	selector: 'app-file',
	standalone: true,
	templateUrl: './file.component.html',
	styleUrls: ['./file.component.scss'],
	imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatDialogModule, MatDialogModule, MatFormFieldModule, ReactiveFormsModule, MatButtonModule],
})
export class FileComponent implements OnInit {

	title = '';
	btnText = '';
	reportType!: String;
	citizenId: String = '';
	docId: String = '';
	nstSd42Value: any;


	constructor(private fileService: FileService, private dialog: MatDialog,
		@Inject(MAT_DIALOG_DATA) public data: any) { }

	ngOnInit(): void {

		this.title = this.data.title;
		this.btnText = this.data.btnText;
		this.reportType = this.data.reportType;
		this.citizenId = this.data.citizenId;
		this.docId = this.data.docId;
		this.nstSd42Value = this.data.nstSd42Value;

	}

	downloadSd3File() {
		this.fileService.downloadSd3PdfFile(this.citizenId).subscribe((response: any) => {
			let blob: any = new Blob([response], { type: 'text/pdf; charset=utf-8' });
			const url = window.URL.createObjectURL(blob);
			// window.open(url);
			saveAs(blob, 'sd3Rpt.pdf');
		}), (error: any) => console.log('Error downloading the file'),
			() => console.info('File downloaded successfully');

		this.dialog.closeAll();
	}

	downloadSd42File() {
		this.fileService.downloadSd42PdfFile(this.docId, this.nstSd42Value).subscribe((response: any) => {
			let blob: any = new Blob([response], { type: 'text/pdf; charset=utf-8' });
			const url = window.URL.createObjectURL(blob);
			// window.open(url);
			saveAs(blob, 'sd42Rpt.pdf');
		}), (error: any) => console.log('Error downloading the file');
		() => console.info('File downloaded successfully');

		this.dialog.closeAll();
	}

	onClose() {
		this.dialog.closeAll();
	}

}
