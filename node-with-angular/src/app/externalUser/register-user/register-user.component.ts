import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from '../../Services/api-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
registerForm: any;
response: any;
  constructor(private formBuilder: FormBuilder,
    private apiService: ApiServiceService,
    private router: Router,) {

    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      teleno: ['', [Validators.required]],
      address: ['', [Validators.required]],
      ssn: ['', [Validators.required]],
    });
   }

  ngOnInit() {
  }

  get userinfo() { return this.registerForm.controls; }
  saveUser() {
    if (this.registerForm.invalid) {
      alert("All the fields are mandatory.");
      return false;
    } 
   const data = {firstName: this.userinfo.firstName.value, lastName:this.userinfo.lastName.value, telephone:this.userinfo.teleno.value, address:this.userinfo.address.value, ssn:this.userinfo.ssn.value}
    this.apiService.registerUser(data).
    subscribe(
        resultArray => {this.response = resultArray;
                        if (this.response.status === 200) {
                            this.registerForm.reset();
                            alert('User register successfully');
                        } else {
                          alert('User not register');
                         }
      },
      error => { if  (error) {
        alert('Some server error');
      }});
  }


}
