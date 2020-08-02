import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../services/api.service';
import {Location} from '@angular/common';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMsg: any;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private router: Router, private location: Location) {
  }

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit() {
    this.apiService.loginUser(this.loginForm.value.email, this.loginForm.value.password).subscribe((res) => {
      this.location.replaceState('/'); // clears browser history so they can't navigate with back button
      this.router.navigate(['dashboard']);
      this.errorMsg = res;
    });
    if (this.loginForm.invalid) {
      return;
    }
  }

}
