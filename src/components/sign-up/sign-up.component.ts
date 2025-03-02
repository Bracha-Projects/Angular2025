import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login/login.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {MatSelectModule} from '@angular/material/select';


@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, ReactiveFormsModule, MatButtonModule, CommonModule, RouterModule,MatFormFieldModule, MatSelectModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  form: FormGroup;
  roles = ["student", "teacher", "admin"];
  constructor(private fb: FormBuilder, private loginService: LoginService) {
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
      this.loginService.signUp({
        name: this.form.get('name')?.value,
        email: this.form.get('email')?.value,
        password: this.form.get('password')?.value,
        role: this.form.get('role')?.value
      })
      this.form.reset();
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
