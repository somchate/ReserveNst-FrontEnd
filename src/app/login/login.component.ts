import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { IsloginService } from '../services/islogin.service';
import { NotificationService } from '../services/notification.service';
import { TokenStorageService } from '../services/token.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  title = "ระบบงานขึ้นทะเบียนกองประจำการและนำปลดฯ (แบบ สด.42)";


  responsedata: any = null;
  isdisablevalue = true;

  constructor(private formBuilder: FormBuilder, private service: AuthService, private islogin: IsloginService, private router: Router,
    private notification: NotificationService, private tokenstorage: TokenStorageService) {

    this.tokenstorage.signOut();
    this.loginForm = this.formBuilder.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
    })
  }

  ngOnInit(): void {
  }

  loginCheck() {
    if (this.loginForm.valid) {
      this.service.processLogin(this.loginForm.value)
        .subscribe({
          next: (data) => {
            if (data != null) {
              this.responsedata = data;
              this.notification.showSuccess({ detail: "Success", summary: "Login successfully", duration: 1000 }),
                this.tokenstorage.saveToken(this.responsedata.token);
              this.tokenstorage.saveRefreshToken(this.responsedata.refreshToken);
              this.tokenstorage.saveUser(this.responsedata.username);
              this.tokenstorage.saveRole(this.responsedata.roles)
              this.tokenstorage.saveName(this.responsedata.first_name, this.responsedata.last_name);

              this.router.navigate(['schoollist']);
            }
          },
          error: (err: any) => {
            if (err.status === 401) {
              this.notification.showWarning({ detail: "Warning", summary: "Check username or password", duration: 3000 });
              this.loginForm.reset();
            } else {
              this.notification.showWarning({ detail: "Warning", summary: "Connection or API has error ", duration: 3000 });
              this.loginForm.reset();
            }
          }
        })
    }
  }

  initializeForm() {
    this.loginForm.setValue({
      username: '',
      password: ''

    })
  }
}