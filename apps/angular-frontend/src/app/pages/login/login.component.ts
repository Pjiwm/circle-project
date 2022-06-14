import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup | undefined;
  sub: Subscription | undefined;
  noUserFound = false;
  submitted = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.initForm();
    this.authService.getUserFromLocalStorage().subscribe((user: User) => {
      if (user) {
        console.log('User already logged in');
        console.log(user);
        this.router.navigate(['/']);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  initForm(): void {
    this.loginForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(): void {
    if (this.loginForm!.valid) {
      this.submitted = true;
      const name = this.loginForm!.value.email;
      this.authService
        .login(name)
        .subscribe((user) => {
          if (user) {
            console.log('Logged in');
            this.router.navigate(['/browse']);
          } else {
            this.noUserFound = true;
            console.log(this.noUserFound);
          }
          this.submitted = false;
        });
      this.noUserFound = true;
      console.log(this.noUserFound);
    } else {
      this.submitted = false;
    }
  }
}
