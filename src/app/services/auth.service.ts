import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;

  constructor(private router: Router) {
    this.router.events.subscribe(val => {
      this.token = localStorage.getItem('token');
      console.log(this.token);
      if (this.token === null) {
        console.log('asd');
        this.router.navigate(['../']).then();
      }
    });
  }
}
