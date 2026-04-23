import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.html'
})
export class LoginComponent {

  user = {
    email: '',
    password: ''
  };

  constructor(private auth: AuthService, private router: Router) {}

  login() {

    if (!this.user.email || !this.user.password) {
      alert("Please enter email and password!");
      return;
    }

    this.auth.login(this.user).subscribe({
      next: (res: any) => {
        alert("Login Successful 🎉");

        localStorage.setItem("user", JSON.stringify(res));

        this.router.navigate(['/profile']);
      },
      error: () => {
        alert("Invalid Credentials!");
      }
    });
  }
}