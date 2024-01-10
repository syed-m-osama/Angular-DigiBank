import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
    ) {}

  login(): void {
    this.authService.login(this.username, this.password).subscribe(
      (loggedIn) => {
        if (loggedIn) {
          // Redirect or perform any actions on successful login
          console.log('Login successful');
          this.router.navigate([`home/${this.username}/account-summary`]);
        } else {
          this.errorMessage = 'Invalid username or password';
        }
      },
      (error) => {
        console.error('Error during login:', error);
      }
    );
  }

}
