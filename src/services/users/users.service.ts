import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../types/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private usersSubject = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject.asObservable();
  constructor(private http: HttpClient) { }

  getUserById(userId: number) {
    const token = sessionStorage.getItem('token');
    if(!token) {
      return;
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<User>(`http://localhost:3000/api/users/${userId}`, { headers });
  }


  updateUser(user: User) {
    const token = sessionStorage.getItem('token');
    if(!token) {
      return;
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.put(`http://localhost:3000/api/courses/${user.userId}`, user, { headers })
      .subscribe();
  }

  deleteUser(userId: number) {
    const token = sessionStorage.getItem('token');
    if(!token) {
      return;
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.delete(`http://localhost:3000/api/courses/${userId}`, { headers })
      .subscribe();
  }

}
