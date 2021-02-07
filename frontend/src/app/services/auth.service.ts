import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URL = 'http://localhost:3000/api'

  constructor(private http: HttpClient,
    private router: Router) { }

  signUp(user){
    return this.http.post<any>(this.URL + '/signup', user)
  }

  signIn(user){
    return this.http.post<any>(this.URL + '/signin', user)
  }

  transaction(transaction, userId){
    
    
    const body = { transaction: transaction, userId:userId };
    console.log(body);
    return this.http.post<any>(this.URL + '/transaction', body)
  }

  loggedIn(){
    return !!localStorage.getItem('token');

    }
  
    getToken(){
      return localStorage.getItem('token');
    }

    logout(){
      localStorage.removeItem('token');
      this.router.navigate(['/signin']);
    }

    // getUserId(){
    //   return this.http.get<any>(this.URL + '/userId')
    // }

    getTransacciones(){
      return this.http.get(this.URL + '/getTransacciones');
    }

    getGiros(){
      return this.http.get<any>(this.URL + '/getGiros');
    }

    getAbonos(){
      return this.http.get(this.URL + '/getAbonos');
    }

    getUserId(){
      return this.http.get(this.URL + '/userId');
    }
}
