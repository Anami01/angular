import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  registrationForm: FormGroup;
  registerRes: any;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {
  }

  get f() {
    return this.registrationForm.controls;
  }

  ngOnInit(): void {
    this.get_all_data();

    this.registrationForm = this.formBuilder.group({
      name: [null, Validators.required],
      address: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }

  onSubmitRegister() {
    this.apiService.createUser(this.registrationForm.value).subscribe(() => {
      this.get_all_data();
    });
    if (this.registrationForm.invalid) {
      return;
    }
  }

  get_all_data() {
    this.apiService.getUsers().subscribe((res) => {
      this.registerRes = res.body;
    });
  }

}
