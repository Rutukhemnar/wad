import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './profile.html'
})
export class ProfileComponent implements OnInit {

  user: any;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    const data = JSON.parse(localStorage.getItem("user") || '{}');

    if (data && data._id) {
      this.auth.getUser(data._id).subscribe({
        next: (res) => {
          this.user = res;
        },
        error: () => {
          alert("Failed to load profile");
        }
      });
    }
  }
}