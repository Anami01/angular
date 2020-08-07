import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../services/api.service';
import {Location} from '@angular/common';
import {LoginModel} from './model/login-model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  data: LoginModel;
  loginForm: FormGroup;
  errorMsg: any;
  submited: boolean;

  constructor(private formBuilder: FormBuilder,
              private apiService: ApiService,
              private router: Router,
              private location: Location) {
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
      this.submited = true;
      return;
    }
    this.apiService.loginUser(this.data).subscribe((res) => {
        this.location.replaceState('/'); // clears browser history so they can't navigate with back button
        this.router.navigate(['dashboard']);
        this.errorMsg = res;
      }
    );
  }

}
