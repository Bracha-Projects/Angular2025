import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../types/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private httpClient : HttpClient) { 

  }

  signIn(user: Partial<User>) {
    this.httpClient.post("http://localhost:3000/api/auth/login", {
      email: user.email,
      password: user.password
    }).subscribe({
      next: (response) => {
        // טיפול במקרה של הצלחה
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
      next: (response) => {
        // טיפול במקרה של הצלחה
        console.log('התחברות הצליחה:', response);
      },
      error: (error) => {        
        // טיפול במקרה של שגיאה
        console.error('שגיאה בהתחברות:', error);
      }
    });
  }

}
