import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { UsersService } from '../../services/users/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dash-board',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule,MatDividerModule],
  templateUrl: './dash-board.component.html',
  styleUrl: './dash-board.component.css'
})
export class DashBoardComponent {
  constructor(private userService:UsersService, private router:Router) { }

  deleteUser()
  {
    const userID = localStorage.getItem('userID');
    if(!userID) return;
    this.userService.deleteUser(parseInt(userID));
    localStorage.removeItem('userID');
    localStorage.removeItem('role');
    sessionStorage.removeItem('token');
  }

  showCourses()
  {
    this.router.navigate(['/courses']);
  }

  signOut()
  {
    localStorage.removeItem('userID');
    localStorage.removeItem('role');
    sessionStorage.removeItem('token');
    this.router.navigate(['/']);
  }


}
