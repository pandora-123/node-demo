import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  url = 'http://localhost:5000/';
  constructor(private http: HttpClient) { }

      // get user details by id
      getUserlist() {
        const tempUrl = this.url + 'getuserlist';
        return this.http.get(tempUrl);
      }
      
      registerUser(data) {
        const tempUrl = this.url + 'add_user';
        return this.http.post(tempUrl, data);
      }

      adminLogin(data) {
        const tempUrl = this.url + 'admin_login';
        return this.http.post(tempUrl, data);
      }
}
