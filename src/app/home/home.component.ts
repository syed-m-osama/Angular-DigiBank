import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  selectedNavItem: string = ''; // Variable to store the selected navigation item

  // Function to set the selected navigation item
  selectNavItem(item: string): void {
    this.selectedNavItem = item;
  }

  constructor (
    private authService: AuthService
  ) {}

  logout(): void {
    this.authService.logout();
  }

}
