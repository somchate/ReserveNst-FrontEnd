import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from './services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgToastService } from 'ng-angular-popup';
import { IsloginService } from './services/islogin.service';
import { DataService } from './services/data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DataService]
})
export class AppComponent implements OnInit {
  title = 'TDC'; 

  constructor(private dialog: MatDialog, private api: ApiService, private ngtoastservice : NgToastService,
              private isloginservice:IsloginService, private dataService:DataService) {
  }

  ngOnInit(): void {   
  }  

  isdisablevalue() {  
    return (this.isloginservice.isLoginStatus())
  }

}