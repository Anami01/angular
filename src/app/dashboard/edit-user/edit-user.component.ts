import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../services/api.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  editForm: FormGroup;
  editRes: any;
  submited: boolean;
  id: number;


  constructor(private formBuilder: FormBuilder,
              private apiService: ApiService,
              private router: Router,
              private actRoute: ActivatedRoute) {
  }

  get f() {
    return this.editForm.controls;
  }

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe(params => {
      // tslint:disable-next-line:radix
      this.id = parseInt(params.get('id'));
      this.apiService.getUser(this.id).subscribe((res) => {
        // @ts-ignore
        this.f.name.setValue(res.body.data.name);
        // @ts-ignore
        this.f.address.setValue(res.body.data.address);
        // @ts-ignore
        this.f.email.setValue(res.body.data.email);
      });
    });
    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmitUpdate() {
    if (this.editForm.invalid) {
      this.submited = true;
      return;
    }
    this.apiService.updateUser(this.editForm.value, this.id).subscribe(() => {
      this.router.navigate(['dashboard']).then();
    });
  }

  onCancel() {
    this.router.navigate(['dashboard']).then();
  }

}
