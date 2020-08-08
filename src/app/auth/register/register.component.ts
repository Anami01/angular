import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../services/api.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {RegisterModel} from './model/register-model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  data: RegisterModel;
  registrationForm: FormGroup;
  registerRes: any;
  submited: boolean;

  constructor(private formBuilder: FormBuilder,
              private apiService: ApiService,
              private router: Router,
              private location: Location) {
  }

  get f() {
    return this.registrationForm.controls;
  }

  ngOnInit(): void {
    this.data = new RegisterModel();
    this.registrationForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmitRegister() {
    if (this.registrationForm.invalid) {
      this.submited = true;
      return;
    }
    this.apiService.createUser(this.registrationForm.value).subscribe(() => {
      this.location.replaceState('/'); // clears browser history so they can't navigate with back button
      this.router.navigate(['../']).then();
    });
  }

  onCancel() {
    this.router.navigate(['../']).then();
  }
}
