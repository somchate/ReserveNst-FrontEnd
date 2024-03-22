import { Component, Inject, OnInit } from '@angular/core';
import { FileService } from '../services/file.service';
import { saveAs } from 'file-saver-es';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
	selector: 'app-file',
	templateUrl: './file.component.html',
	styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {

	reportForm !: FormGroup;
	title = '';
	btnText = '';
	reportType!: String;
	citizenId!: String;

	constructor(private fileService: FileService, private dialog: MatDialog,
		@Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder) { }

	ngOnInit(): void {
		this.title= this.data.title;
		this.btnText = this.data.btnText;
		this.reportForm = this.formBuilder.group({
			requestid: [''],
			resultid: ['']
		})

		this.reportForm.controls['requestid'].setValue(this.data.data);
		this.reportForm.controls['resultid'].setValue(this.data.data);
		this.reportType = this.data.reportType;
		this.citizenId = this.data.citizenId;

	}


	downloadSd42File() {
		this.fileService.downloadCheck43File(this.reportForm.value).subscribe((response: any) => {
			let blob: any = new Blob([response], { type: 'text/pdf; charset=utf-8' });
			const url = window.URL.createObjectURL(blob);
			// window.open(url);
			saveAs(blob, 'check43Rpt.pdf');
		}), (error: any) => console.log('Error downloading the file');
		() => console.info('File downloaded successfully');

		this.dialog.closeAll();
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

	onClose() {
		this.dialog.closeAll();
	}

}
