import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './register.html'
})
export class RegisterComponent {

  user = {
    name: '',
    email: '',
    phone: '',
    gender: '',
    dob: '',
    address: '',
    password: ''
  };

  confirmPassword = '';

  constructor(private auth: AuthService, private router: Router) {}

  register() {

    // Validate empty fields
    if (!this.user.name || !this.user.email || !this.user.password) {
      alert("Please fill all required fields!");
      return;
    }

    // Password match
    if (this.user.password !== this.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Password length
    if (this.user.password.length < 6) {
      alert("Password must be at least 6 characters!");
      return;
    }

    // ✅ SINGLE API CALL
    this.auth.register(this.user).subscribe({
      next: (res) => {
        alert("Registered Successfully 🎉");
        this.router.navigate(['/']);
      },
      error: (err) => {
        alert("Registration Failed");
      }
    });
  }
}