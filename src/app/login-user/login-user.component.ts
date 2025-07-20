import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {

  Email: string = "";
  Password: string = "";

  constructor(private ApiServices: ApiService, private router: Router, private toaster: ToastrService) { }
  ngOnInit(): void {
    this.ApiServices.IsloginCheack();
  }
  onSubmitLogin() {
    debugger
    var LoginObj = {
      Email: this.Email,
      Password: this.Password
    }
    if (LoginObj.Email.length > 0 && LoginObj.Password.length > 0) {

      if (LoginObj.Email == "Admin" && LoginObj.Password == "1122") {
        this.router.navigateByUrl("Product");
      } else {
        this.ApiServices.LoginUser(LoginObj).subscribe(
          (res) => {
            if (res == null) {
              this.toaster.error('Wrong input', 'Login Faild', {
                timeOut: 3000,
              });
            }
            console.log("Login response ", res)
            localStorage.setItem("UserData", JSON.stringify(res));
            localStorage.setItem("Token", res.token);
            if (this.ApiServices.IsloginCheack()) {
              this.router.navigateByUrl("productList");
              debugger
              this.ApiServices.isloginSubject.next(true);
              this.toaster.success('Login Success', 'Successful', {
                timeOut: 3000,
              });
            }
          }
        )
      }

    } else {
      this.toaster.error('Insart Email or Password', 'Input Error', {
        timeOut: 3000,
      });
    }
  }
  SineUpMethod() {
    this.router.navigate(["sineup"]);
  }
}