import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import {MatSelectModule} from '@angular/material/select';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, ReactiveFormsModule, MatButtonModule, CommonModule, RouterModule,MatFormFieldModule, MatSelectModule,MatCardModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  form: FormGroup;
  roles = ["student", "teacher"];
  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService, private router:Router) {
    this.form = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      name:['',Validators.compose([Validators.required,Validators.minLength(2)])],
      role:['',[Validators.required]]
    });
  }
  
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  loginToApi(e: Event) {
    e.preventDefault();
    console.log(this.form);
    if (this.form.valid) {
      this.authenticationService.signUp({
        email: this.form.get('email')?.value,
        password: this.form.get('password')?.value,
        name: this.form.get('name')?.value,
        role: this.form.get('role')?.value
      }).subscribe({
        next: (user) => {
          sessionStorage.setItem('token', user.token || '');
          localStorage.setItem('userID', JSON.stringify(user.userId));
          localStorage.setItem('role', JSON.stringify(user.role));
          this.router.navigate(['/dashboard']); // מעבר לדשבורד אם ההרשמה הצליחה
        },
        error: (err) => {
          alert("הרשמה נכשלה: " + err.message);
        }
      });
    }
    else{
      const emailErrors = this.form.get('email')?.errors;
      const passwordErrors = this.form.get('password')?.errors;
      const nameErrors = this.form.get('name')?.errors;
      const roleErrors = this.form.get('role')?.errors;

      if (emailErrors) {
        if (emailErrors['required']) {
          alert("שדה האימייל נדרש.");
        } else if (emailErrors['email']) {
          alert("האימייל שהוזן אינו תקין.");
        }
      }
  
      if (passwordErrors && passwordErrors['required']) {
        alert("שדה הסיסמה נדרש.");
      }

      if(nameErrors){
        if(nameErrors['required']){
          alert("שדה השם נדרש")
        }
        else if (nameErrors['minlength']) {
          console.log(`אורך השם חייב להיות לפחות ${nameErrors['minlength'].requiredLength} תווים.`);
        }
      }

      if(roleErrors && roleErrors['required']){
        alert("שדה התפקיד נדרש")
      }
    }
  }
}
