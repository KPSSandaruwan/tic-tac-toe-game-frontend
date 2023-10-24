import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  public login() {
    const credentials = { username: this.username, password: this.password };

    // Send the credentials to the server for authentication
    this.authService.login(credentials).subscribe((res: any) => {
      console.log('res', res)
      if (res.success) {
        // Swal.fire(
        //   'Success',
        //   res.message,
        //   'success'
        // )
        this.router.navigate(['/game-board']);
      } else {
        // Swal.fire({
        //   icon: 'error',
        //   title: 'Oops...',
        //   text: 'Something went wrong!'
        // })
      }
    });
  }
}
