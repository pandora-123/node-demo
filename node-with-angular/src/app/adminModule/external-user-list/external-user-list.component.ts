import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../Services/api-service.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-external-user-list',
  templateUrl: './external-user-list.component.html',
  styleUrls: ['./external-user-list.component.css']
})
export class ExternalUserListComponent implements OnInit {
  response:any;
  userList: any;
  constructor(private apiService: ApiServiceService,
    private cookieService: CookieService,
    private router: Router) {

   }
//getUserlist
  ngOnInit() {
    var checksession  = this.cookieService.get('loginsession');
    if(checksession != '1')
    {
      alert("Session is expired, Please try again.");  
      this.router.navigate(['login']);
    }
    else
      this.getUserList();   
  }

  getUserList() {
    this.apiService.getUserlist().
    subscribe(
        resultArray => {this.response = resultArray;
                        //if (this.response.status === '200') {
                            this.userList = this.response;
                            console.log(this.userList);
                        // } else {
                           
                        //   }
      },
      error => { if  (error) {
       // this.message = 'Some Server Error Occured!';
      }});
  }

  logout() {
    this.cookieService.deleteAll('/');
    this.router.navigate(['/login']);
  }

}
