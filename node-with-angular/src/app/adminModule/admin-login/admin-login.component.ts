import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from '../../Services/api-service.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: any;
  message: any;
  response: any;
  constructor(private formBuilder: FormBuilder,
    private apiService: ApiServiceService,
    private router: Router,
    private cookieService: CookieService) {

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
   }

  ngOnInit() {
  }
  get f() { return this.loginForm.controls; }
  login() {
    
     this.submitted = true;
    // this.message = '';
    if (this.loginForm.invalid) {
      return false;
    } 
      const data = {email: this.f.email.value,  password:this.f.password.value}
      this.apiService.adminLogin(data).
      subscribe(
          resultArray => {this.response = resultArray;
                          if (this.response.status === 200) {
                            this.cookieService.set('loginsession', '1', 0, '/', '' , false, 'Lax');
                            this.router.navigate(['externar-user-list']);
                          } else {
                            alert('Invalid login credentials');
                          }
        },
        error => { if  (error) {
          alert('Some server error');
        }});
  }

}
