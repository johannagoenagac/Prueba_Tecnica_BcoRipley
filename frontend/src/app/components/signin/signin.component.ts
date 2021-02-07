import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  user = {}
  messageError: String;

  constructor(private authservice : AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  signIn(){
    this.authservice.signIn(this.user)
    .subscribe(
      res=>{
        console.log(res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/private']);

      },
      err =>{
        console.log(err);
        this.messageError = err.error;
      }

     
    )}

}
