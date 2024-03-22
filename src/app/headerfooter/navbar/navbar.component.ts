import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IsloginService } from '../../services/islogin.service';
import { NgToastService } from 'ng-angular-popup'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RequestformComponent } from '../../requests/requestform/requestform.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() isdisable !: string;
  islogout: boolean = false;
  title = " ระบบงานขึ้นทะเบียนกองประจำการและนำปลดเป็นทหารกองหนุน";

  constructor(private router: Router, private loginService: IsloginService, private ngtoastservice: NgToastService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.islogout = this.loginService.isLoginStatus();
    console.log(this.isdisable);
  }
  addPerson() {
  }

  openRequestCreateDialog() {
    const dialogConfig = new MatDialogConfig();
    this.dialog.open(RequestformComponent, {
      width: '60%'
    });
  }

  homeBtn() {
    this.router.navigate(['schoollist']);
  }

  refreshBtn() {
    window.location.reload();
  }

  openSetList() {
    this.router.navigate(['setlist']);
  }

  openNstDocumenttList() {
    this.router.navigate(['documentforunittrainlist']);
  }

  openDocumentForUnitList() {
    this.router.navigate(['documentforunitlist']);
  }

  openVerifyByName() {
    this.router.navigate(['verifybyname']);
  }

  openVerifyByCid() {
    this.router.navigate(['verifybycid']);
  }

  openRequest() {
    this.router.navigate(['requestlist']);
  }

  logout() {
    localStorage.clear();
    this.islogout = this.loginService.isLoginStatus();
    this.router.navigate(['login']);
    this.ngtoastservice.success({ detail: "Success", summary: "Logout successfully", duration: 2000 })
  }
}