import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../types/user';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private httpClient : HttpClient) { 

  }

  signIn(user: Partial<User>): Observable<Partial<User>> {
    return this.httpClient.post<Partial<User>>("http://localhost:3000/api/auth/login", {
      email: user.email,
      password: user.password
    }).pipe(
      catchError((error) => {
        console.error('שגיאה בהתחברות:', error);
        return throwError(() => new Error(error.error?.message || 'שגיאה כללית בהתחברות'));
      })
    );
  }

  signUp(user: Partial<User>): Observable<Partial<User>> {  
    return this.httpClient.post<Partial<User>>("http://localhost:3000/api/auth/register", {  
      email: user.email,  
      password: user.password,  
      name: user.name,  
      role: user.role  
    }).pipe(
      catchError((error) => {
        console.error('שגיאה בהרשמה:', error);
        return throwError(() => new Error(error.error?.message || 'שגיאה כללית בהרשמה'));
      })
    );
  }
  signOut() {
    sessionStorage.removeItem('token');
    localStorage.removeItem('userID');
    localStorage.removeItem('role');
  }

  getUsers() {
    return this.httpClient.get<User[]>("http://localhost:3000/api/users");
  }

  getUserById(userId: number) {
    return this.httpClient.get<User>(`http://localhost:3000/api/users/${userId}`);
  }

}
