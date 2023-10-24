import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService) { }


  public signup() {
    const credentials = { username: this.username, password: this.password };

    // Send the credentials to the server for user registration
    this.authService.signUp(credentials).subscribe((res: any) => {
      console.log('res', res)
      if (res.success) {
        // Swal.fire(
        //   'Success',
        //   res.message,
        //   'success'
        // )
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
