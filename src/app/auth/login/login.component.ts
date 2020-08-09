import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../services/api.service';
import {Location} from '@angular/common';
import {LoginModel} from './model/login-model';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  data: LoginModel;
  loginForm: FormGroup;
  errorMsg: any;
  submitted: boolean;
  response: any;

  constructor(private formBuilder: FormBuilder,
              private apiService: ApiService,
              private router: Router,
              private location: Location,
              private cookieService: CookieService) {
  }

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.data = new LoginModel();
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.submitted = true;
      return;
    }
    this.apiService.loginUser(this.loginForm.value).subscribe((res) => {
        this.location.replaceState('/'); // clears browser history so they can't navigate with back button
        // @ts-ignore
        this.cookieService.set('token', res.body.token, 1);
        this.errorMsg = res;
        this.router.navigate(['dashboard']).then();
        // @ts-ignore
        // localStorage.setItem('token', res.body.token);
      }
    );
  }

  onCancel() {
    this.router.navigate(['../']).then();
  }
}
