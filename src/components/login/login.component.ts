import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { User } from '../../types/user';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, ReactiveFormsModule, MatButtonModule, CommonModule, RouterModule,MatCardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]]
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
      this.authenticationService.signIn({
        email: this.form.get('email')?.value,
        password: this.form.get('password')?.value
      }).subscribe({
        next: (user) => {
          sessionStorage.setItem('token', user.token || '');
          localStorage.setItem('userID', JSON.stringify(user.userId));
          localStorage.setItem('role', JSON.stringify(user.role));
          this.router.navigate(['/dashboard']); // מעבר רק אם ההתחברות הצליחה
        },
        error: (err) => {
          alert("login failed: " + err.message);
        }
        });
    } else {
        const emailErrors = this.form.get('email')?.errors;
        const passwordErrors = this.form.get('password')?.errors;

        if (emailErrors) {
          if (emailErrors['required']) {
            alert("email is required");
          } else if (emailErrors['email']) {
            alert("email is invalid");
          }
        }

        if (passwordErrors && passwordErrors['required']) {
          alert("email is required");
        }
      }
    }
  }
