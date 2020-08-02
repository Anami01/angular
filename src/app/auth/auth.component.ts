import {Component, NgModule, OnInit} from '@angular/core';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

@NgModule({
    declarations: [
      LoginComponent,
      RegisterComponent
    ],
    imports: [
      ReactiveFormsModule
    ]
  }
)
export class AuthComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
