import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  userCount!: number;

  constructor(private authService: AuthService) {
    this.getUserCount();
  }

  getUserCount(): void {
    this.authService.Getall().subscribe((users: any) => {
      this.userCount = users.length;
    });
  }

  checkProfile(profile: string){

    let currentProfile = sessionStorage.getItem('profile');

    if (profile === currentProfile) {
      return true;
    } else {
      return false;
    }
  }

}
