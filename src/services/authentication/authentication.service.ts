import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../types/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private httpClient : HttpClient) { 

  }

  signIn(user: Partial<User>) {
    this.httpClient.post("http://localhost:3000/api/auth/login", {
      email: user.email,
      password: user.password
    }).subscribe({
      next: (response : Partial<User>) => {
        sessionStorage.setItem('token', response.token? response.token : '');
        localStorage.setItem('userID', JSON.stringify(response.userId));
        localStorage.setItem('role', JSON.stringify(response.role));
        return response
      },
      error: (error) => {        
        // טיפול במקרה של שגיאה
        console.error('שגיאה בהתחברות:', error);
      }
    });
  }

  signUp(user:Partial<User>)
  {    
    this.httpClient.post("http://localhost:3000/api/auth/register", {
      email: user.email,
      password: user.password,
      name: user.name,
      role: user.role
    }).subscribe({
      next: (response : Partial<User>) => {
        // טיפול במקרה של הצלחה
        console.log('התחברות הצליחה:', response);
        sessionStorage.setItem('token', response.token? response.token : '');
        localStorage.setItem('userID', JSON.stringify(response.userId));
        localStorage.setItem('role', JSON.stringify(response.role));
      },
      error: (error) => {        
        // טיפול במקרה של שגיאה
        console.error('שגיאה בהתחברות:', error);

      }
    });
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
