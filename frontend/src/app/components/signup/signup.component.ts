import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user = {
    email:'',
    password: ''
  }

  token: any;

  constructor(private authservice : AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  signUp(){

    this.authservice.signUp(this.user)
      .subscribe(
        res => {
          this.token = res
          console.log(res)
     localStorage.setItem('token', this.token.token);
     this.router.navigate(['/private']);
        },
        err => console.log(err)
      )
  }

}
