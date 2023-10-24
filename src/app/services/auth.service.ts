import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Util } from '../common/util';
import { User } from '../models/user';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {}

  public login(loginData: User) {
    const url = Util.apiPublicUrl(`login`)
    return this.http.post(url, loginData).pipe(tap((response: any) => {
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.user.username);
      }
    }))
  }

  public signUp(loginData: User ) {
    const url = Util.apiPublicUrl(`signup`)
    return this.http.post(url, loginData)
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.router.navigate(['/']);
  }
}
